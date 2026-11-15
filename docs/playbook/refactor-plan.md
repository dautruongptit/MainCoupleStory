# Kế hoạch tái cấu trúc frontend `web` (chưa sửa code — chờ duyệt)

Khảo sát ngày 2026-11-15 trên nhánh `fix/clone-match` (sau commit `91c787f`). Chỉ phạm vi `web/`; `api/` để nguyên.
Chấm điểm theo khung nợ kỹ thuật: **Ưu tiên = (Tác động + Rủi ro) × (6 − Công sức)**, mỗi thang 1–5.

## 1. Hiện trạng (số đo)

| Hạng mục | Số liệu |
|---|---|
| Mã nguồn `src/` | ~31 nghìn dòng TS/TSX + ~34 nghìn dòng CSS/dữ liệu sinh |
| Họ khối thiệp | 92 thư mục `shell/blocks/<họ>`, 856 tệp `.tsx` (nhiều họ chỉ khác màu) |
| Tệp lớn nhất | `themeManifest.ts` 18.8k dòng, `styles.css` 6.9k, `fonts.css` 2.3k, `pages.css` 2.2k, `Sections.tsx` 1.9k, `coverConfigs.ts` 1.8k, `giftboxConfigs.ts` 1.2k |
| Hai đường hiển thị thiệp | `shell/` (khuôn mới, 92/92 mẫu có spec) **và** `components/Preview.tsx` 1.4k dòng (đường cũ, còn được EditorPage/Demo gọi làm cửa vào) |
| Hai editor | `components/v2/SectionsV2.tsx` (đang dùng) và `components/Sections.tsx` 1.9k dòng (cũ) |
| CSS | 3 hệ: Tailwind v3 (app), Tailwind v4 + daisyUI biên dịch riêng trong `.inv-root`, CSS tay `styles.css`/`pages.css` (241 luật `sp-*`/`.theme-*` của đường cũ) |
| Scripts | `scripts/` ~435 tệp được git theo dõi (283 `.mjs`, 31 `.py`, kết quả JSON lẫn mã), thêm hàng chục `scripts/_*` tạm (đã gitignore) |
| Tài liệu | `docs/` 718 tệp (271 tệp `docs/survey/raw`), 50 MB |
| Kiểu | 163 chỗ `any`, 91 chỗ `as unknown as` (chủ yếu ép kiểu JSON spec) |
| Kiểm thử | 0 unit test; chỉ có script kiểm tra trình duyệt (`gift-modes`, `gift-geometry`, `editor-sync`, `diff_dump`) chạy tay |
| Phụ thuộc | Gọn: react, react-dom, qrcode-generator; dev: vite 5, TS, Tailwind v3 + v4 (song song) |

## 2. Danh sách nợ theo ưu tiên

| # | Hạng mục | Loại | Tác động | Rủi ro | Công sức | Ưu tiên |
|---|---|---|---|---|---|---|
| 1 | **Bỏ đường hiển thị cũ**: `Preview.tsx` chỉ còn là cửa vào → tách cửa vào mỏng `InvitationView`, xóa nhánh cũ + `HoaMocXanh/LongPhungV2/MinimalismDarkRed/generated/headers` nếu không còn ai gọi | Code/kiến trúc | 4 | 4 | 2 | **32** |
| 2 | **Bỏ editor cũ** `Sections.tsx` (1.9k dòng) nếu không còn import | Code | 3 | 3 | 1 | **30** |
| 3 | **Dọn `scripts/`**: chia `scripts/{clone,survey,check,tools}`, chuyển kết quả `.json` sang `docs/survey/`, gỡ các script một lần (audit_75_*, apply_* đã chạy) vào `scripts/archive/`; thêm `scripts/README.md` | Tài liệu/hạ tầng | 4 | 2 | 2 | **24** |
| 4 | **Mỗi mẫu một thư mục** (theo cách trang gốc: mỗi mẫu một module bố cục + dùng chung hộp quà/QR/bìa); bảng mẫu sinh tự động, tải theo nhu cầu | Kiến trúc | 5 | 3 | 3 | **24** |
| 5 | **Một nguồn cấu hình mẫu**: hiện rải ở `templates.ts`, `templateThemes.ts`, `coverConfigs.ts`, `giftboxConfigs.ts`, `editorSections.ts`, `themeManifest.ts`, `specs/<id>/*.json`, `giftSpecs`, `giftAssets` → gộp về `specs/<id>/` + 1 bộ sinh chỉ mục | Kiến trúc | 5 | 4 | 4 | **18** |
| 6 | **CSS cũ**: xóa luật `sp-*`/`.theme-*` của đường cũ sau #1; tách `styles.css` theo trang | Code | 3 | 2 | 3 | **15** |
| 7 | **Kiểu cho spec**: schema TS cho `theme/capabilities/demo.json` (bỏ `as unknown as`), giảm `any` | Code | 3 | 3 | 3 | **18** |
| 8 | **Kiểm thử tự động tối thiểu**: gom `gift-modes`, `editor-sync`, `tsc`, `build` vào `npm run check`; thêm Vitest cho `store.ts` (quy tắc một nháp, đổi mẫu giữ dữ liệu) | Kiểm thử | 4 | 4 | 3 | **24** |
| 9 | **`docs/` gọn**: tách `docs/survey/raw` (dữ liệu đo, 271 tệp) khỏi tài liệu đọc; mục lục `docs/README.md`; gộp các kế hoạch cũ (`clone-plan.md`, `brown-fix-plan.md`…) | Tài liệu | 2 | 1 | 1 | **15** |
| 10 | **Tailwind v3 + v4 song song**: về lâu dài đưa toàn app sang v4 + daisyUI (như trang gốc), bỏ `postcss` lọc trùng | Phụ thuộc | 3 | 2 | 5 | **5** |

## 3. Cấu trúc thư mục đích (đề xuất)

```
src/
  app/                 router, Root, theme, providers
  pages/               trang mỏng: Home, Templates, Dashboard, Demo, Guests…
  features/
    templates/         danh mục mẫu (data/templates.ts + chỉ mục sinh từ specs)
    editor/            EditorPage + components/v2 (bỏ bản cũ)
    invitation/
      view/            InvitationView (cửa vào duy nhất) — thay Preview.tsx
      shell/           InvitationShell, useInvitationCtx, theme
      templates/<id>/  mỗi mẫu một thư mục: Layout.tsx + theme/capabilities/demo/cover/gift/meta.json (như trang gốc)
      templates/_shared/<họ>/  khối của 8 họ đang dùng chung nhiều mẫu
      shared/          GiftsGeneric, Lightbox, AlbumGallery, RsvpDialog…
      covers/          engine bìa + configs (đọc từ specs)
      specs/<id>/      theme.json, capabilities.json, demo.json, cover.json, gift.json  ← một nguồn
      styles/          invitation.src.css (+ generated, gitignore)
  services/            api/, storage/
  components/          layout/, ui/, common/
  styles/              css app (tách theo trang)
scripts/
  clone/   survey/   check/   tools/   archive/   README.md
docs/
  README.md  playbook/  survey/(md)  survey/raw/(dữ liệu đo)  exports/
```

## 4. Lộ trình chi tiết

Mỗi giai đoạn: tạo nhánh riêng từ `fix/clone-match` → làm theo các bước → chạy **bộ kiểm tra chung** → commit theo nhóm → chờ duyệt → gộp. Có thể dừng sau bất kỳ giai đoạn nào; giai đoạn sau không bắt buộc.

### 4.0 Bộ kiểm tra chung (dùng ở cuối mọi giai đoạn)

| Kiểm tra | Lệnh | Đạt khi |
|---|---|---|
| Kiểu | `npx tsc --noEmit -p .` | 0 lỗi |
| Build | `npm run build` | build thành công |
| Hộp quà 3 kiểu | `node scripts/check/gift-modes.mjs --all` | 92/92 pass |
| Hình học hộp quà | `node scripts/check/gift-geometry.mjs` | ≥ 91/92 khớp (chibi_red đã biết) |
| Editor ↔ xem trước | `node scripts/check/editor-sync.mjs <id>` cho Nâu, Riviera, Long Phụng V4, Mai Lan - Xanh | 0 fail |
| Số đo không đổi | trước giai đoạn: `local_dump` mốc 3 mẫu chuẩn × 390/768/1280 × open/openfull; sau: `cmp_dumps <mốc>` | 0 khác biệt |
| Bằng mắt | mở demo + editor 5 mẫu đại diện (Nâu, Riviera, Long Phụng V4, Hoa Mộc, Mai Lan - Xanh) | không vỡ giao diện |

Bước chuẩn bị chung (làm 1 lần, đầu giai đoạn A): gom các lệnh trên vào `npm run check` (script `scripts/check/run-all.mjs`), để mỗi giai đoạn chỉ cần 1 lệnh. Mốc `local_dump` lưu ở `docs/survey/baseline/<ngày>/`.

---

### Giai đoạn A — Dọn an toàn (≈1 ngày, rủi ro thấp)

Mục tiêu: bớt rác và code chết, **không đổi giao diện**.

| Bước | Việc | Tệp chính | Ghi chú |
|---|---|---|---|
| A1 | Lập `npm run check` + chụp mốc số đo | `scripts/check/`, `package.json` | dùng cho mọi giai đoạn |
| A2 | Xác minh và xóa editor cũ | `features/editor/components/Sections.tsx` (1.9k dòng) | trước khi xóa: grep import, `tsc`; nếu còn chỗ dùng thì chuyển sang `v2/SectionsV2` |
| A3 | Xác minh và xóa component không ai import | `invitation/components/HoaMocXanh.tsx` (0 import); kiểm tra tiếp `LongPhungV2.tsx`, `MinimalismDarkRed.tsx`, `generated/headers.*`, `covers/SignatureCovers.tsx` (mỗi cái 1 import — chỉ từ `Preview.tsx` cũ thì để giai đoạn B) | chỉ xóa cái có 0 import |
| A4 | Sắp lại `scripts/` | tạo `scripts/clone/` (bộ sinh), `scripts/survey/` (đo trang gốc), `scripts/check/` (kiểm tra), `scripts/tools/` (tiện ích), `scripts/archive/` (script đã chạy một lần: `audit_75_*`, `apply_*`, `build_batch*`, `fix_*`, `.py` phân tích…) | chuyển kết quả `.json` lẫn trong scripts (vd `audit_75_full_results.json`) sang `docs/survey/archive/`; viết `scripts/README.md` liệt kê script còn dùng + cách chạy; sửa đường dẫn trong `AGENTS.md`, playbook |
| A5 | Sắp lại `docs/` | `docs/README.md` (mục lục), `docs/playbook/` (clone-playbook, clone-rules, refactor-plan), `docs/archive/` (kế hoạch cũ: `clone-plan.md`, `brown-fix-plan.md`…), giữ `docs/survey/raw/` | không xóa dữ liệu đo, chỉ di chuyển |

**Xong khi**: bộ kiểm tra chung đạt; `scripts/` cấp 1 chỉ còn các thư mục + README; mọi lệnh trong `AGENTS.md` vẫn chạy được.
**Quay lại**: revert nhánh (chỉ có xóa/di chuyển).

---

### Giai đoạn B — Một cửa vào hiển thị thiệp (≈1–2 ngày, rủi ro trung bình)

Mục tiêu: bỏ đường hiển thị cũ `Preview.tsx` (1.4k dòng). Hiện cả 92 mẫu đã có spec nên nhánh cũ không còn được vẽ, nhưng `Preview.tsx` vẫn là cửa vào của EditorPage và Demo.

| Bước | Việc | Tệp chính |
|---|---|---|
| B1 | Đo trên trình duyệt: với 92 mẫu, `Preview` có đi vào nhánh cũ lần nào không (log tạm) | `invitation/components/Preview.tsx` |
| B2 | Tạo cửa vào mỏng `invitation/view/InvitationView.tsx`: chọn bìa (`covers/`) → mở thiệp → `InvitationShell`; chuyển phần dùng chung còn sống trong Preview (nhạc, chuyển cảnh mở thiệp, khung thiết bị nếu có) sang đây | mới |
| B3 | EditorPage và Demo gọi `InvitationView` thay `Preview` | `editor/EditorPage.tsx`, `pages/Demo.tsx` |
| B4 | Xóa `Preview.tsx` và những gì chỉ nó dùng: `LongPhungV2`, `MinimalismDarkRed`, `generated/headers.*`, `SignatureCovers` (nếu chỉ Preview gọi) | `invitation/components/` |
| B5 | Dọn `Demo.tsx`: dữ liệu demo cứng theo từng mẫu (`isDarkRed`, `isBrown`, `lien_hoa_v2_green`…) chuyển hết vào `specs/<id>/demo.json` | `pages/Demo.tsx`, `specs/*/demo.json` |
| B6 | CSS cũ: tìm luật `sp-*`, `.theme-*` trong `styles.css` không còn class nào dùng (grep toàn `src/`) → xóa | `styles/styles.css` (241 luật nghi ngờ) |

**Xong khi**: bộ kiểm tra chung đạt, **thêm** `diff_dump` 3 mẫu chuẩn × 390/768/1280 vẫn 0 lệch như trước; `grep Preview src/` = 0.
**Rủi ro**: Preview có thể còn xử lý thứ mà shell chưa làm (vd nhạc, mã khách mời trên URL). B1 + B2 để phát hiện trước khi xóa.

---

### Giai đoạn C — Một nguồn cấu hình + kiểu dữ liệu + test (≈3–4 ngày, rủi ro trung bình)

Mục tiêu: thêm mẫu mới chỉ cần **một thư mục `specs/<id>/`**; hiện cấu hình một mẫu rải ở 8–9 nơi.

Bản đồ chuyển:

| Nơi hiện tại | Nội dung | Chuyển tới |
|---|---|---|
| `templates/data/templates.ts` | slug, tên, mô tả, ảnh danh sách, tag, nhãn | `specs/<id>/meta.json` (+ chỉ mục sinh, giữ thứ tự trang gốc) |
| `invitation/config/templateThemes.ts` | màu cho dress code mặc định | `theme.json` |
| `covers/coverConfigs.ts` (1.8k dòng) + `covers/index.ts` | cấu hình bìa, bìa riêng | `specs/<id>/cover.json` (+ tên component bìa riêng nếu có) |
| `config/giftboxConfigs.ts` (1.2k dòng) | hộp quà kiểu cũ | bỏ (đã thay bằng `giftSpecs` + `giftAssets`), hoặc gộp vào `gift.json` |
| `giftSpecs.generated.ts`, `giftAssets.generated.ts` | hộp quà đo thật, ảnh | `specs/<id>/gift.json` (bộ sinh ghi thẳng vào đây) |
| `editor/config/editorSections.ts` | cờ thẻ editor | `capabilities.json` (`editor`) |
| `templates/data/themeManifest.ts` (18.8k dòng), `referenceCovers.ts`, `referenceCouples.ts`, `previewFocal.ts` | dữ liệu đo cũ | xác minh còn ai đọc; còn thì chuyển vào spec, không thì xóa |

| Bước | Việc |
|---|---|
| C1 | Viết schema TS cho từng tệp spec (`specs/schema.ts`) + kiểm tra khi sinh chỉ mục (báo lỗi thiếu trường) |
| C2 | Bộ sinh `scripts/clone/gen_spec_index.mjs`: đọc `specs/*/` → `specs/index.generated.ts` (thay đăng ký tay trong `specs/index.ts` và `blocks/index.ts`) |
| C3 | Chuyển từng bảng theo bản đồ trên, **mỗi bảng một commit**; chuyển xong xóa bảng cũ |
| C4 | Bỏ `as unknown as` khi đọc spec (nhờ schema); giảm `any` ở `shell/` và `services/` |
| C5 | Thêm Vitest: `store.ts` (một nháp, đổi mẫu giữ dữ liệu, giữ kiểu hộp quà), `giftDefaults`, bộ sinh chỉ mục |
| C6 | Cập nhật `AGENTS.md`, playbook: "thêm mẫu = tạo `specs/<id>/` + chạy bộ sinh" |

**Xong khi**: bộ kiểm tra chung + `npm test` đạt; thêm một mẫu thử chỉ cần thư mục spec; số tệp phải sửa khi thêm mẫu giảm từ ~8 xuống 1.

---

### Giai đoạn D — Mỗi mẫu một thư mục gọn, theo cách trang gốc (≈4–5 ngày, rủi ro trung bình)

**Căn cứ (khảo sát gói JS trang gốc 2026-11-15)**: chungdoi.com (Next.js App Router) để **mỗi mẫu một module bố cục riêng** (gói ~1,8 MB, ~100 module, kèm theme của mẫu), một **bảng danh mục mẫu** (94 mã, có `DESERT_BLOOM_BROWN` chưa công bố) và một **gói khối dùng chung** (hộp quà 3D/phong bì, QR, sao chép, chọn kiểu hiển thị) + gói bìa. Trang gốc **không** gom các mẫu khác màu về một bộ khối. Vì mục tiêu là khớp trang thật, ta theo đúng cách đó thay vì gom họ.

Mục tiêu: mỗi mẫu = một thư mục tự đủ; chỉ dùng chung những gì trang gốc dùng chung.

```
src/features/invitation/templates/<id>/
  Layout.tsx          bố cục của mẫu (gộp các khối Hero/Family/... hiện tại, hoặc re-export khối của họ dùng chung)
  theme.json  capabilities.json  demo.json  cover.json  gift.json  meta.json   (từ giai đoạn C)
src/features/invitation/shared/   GiftsGeneric, GiftWidgets, Lightbox, AlbumGallery, RsvpDialog, covers/ (engine bìa)
src/features/invitation/registry.generated.ts   bảng mẫu (sinh từ thư mục templates/)
```

| Bước | Việc |
|---|---|
| D1 | Bộ sinh `scripts/clone/gen_registry.mjs`: quét `templates/<id>/` → `registry.generated.ts` (id → lazy import Layout + spec). Thay hẳn hai chuỗi `family === ...` dài trong `blocks/index.ts` và đăng ký tay trong `specs/index.ts` |
| D2 | Di chuyển theo từng lô ~10 mẫu: `shell/blocks/<họ>/` + `shell/specs/<id>/` → `templates/<id>/`. Mẫu dùng chung họ (baroque_v2 ×3, boho_floral ×3, crystal_floral ×3, double_dragon ×3, longphung_v1 ×4, porcelain_v2 ×3, song_hy ×2, springgarden_v1 ×3) giữ khối chung ở `templates/_shared/<họ>/`, mỗi mẫu một `Layout.tsx` mỏng trỏ vào — **không gom thêm** họ nào khác |
| D3 | Tải mẫu theo nhu cầu (`React.lazy`): mỗi mẫu một chunk riêng, trang demo/editor chỉ tải mẫu đang xem (hiện tải hết 92) |
| D4 | Cập nhật bộ sinh (`gen_riviera`, `gen_traditional`, `gen_<id>`, `genkit`, `giftkit`) ghi vào đường dẫn mới; `registry.mjs` (sổ đăng ký clone) đọc cấu trúc mới |
| D5 | Thêm mẫu mới = tạo `templates/<id>/` + chạy bộ sinh (áp dụng ngay cho `desert_bloom_brown` khi trang gốc công bố) |

Mỗi lô: chụp mốc `local_dump` các mẫu trong lô → di chuyển → `cmp_dumps` = 0 khác biệt, `gift-modes` lô = pass → commit lô.

**Xong khi**: `shell/blocks/` và `shell/specs/` không còn; mỗi mẫu một thư mục; bundle demo chỉ tải mẫu đang xem; bộ kiểm tra chung đạt.
**Rủi ro**: đường dẫn import trong ~860 tệp → di chuyển bằng script + `tsc` sau mỗi lô; tệp sinh phải đổi trong bộ sinh trước.

---

### Để sau — Tailwind toàn app sang v4 (#10)

Khi A–D ổn định: chuyển phần app (trang, header, editor) từ Tailwind v3 + CSS tay sang v4 + daisyUI như trang gốc, bỏ lớp `postcss` lọc trùng và CSS cũ còn lại. Ước 3–5 ngày; làm riêng vì ảnh hưởng mọi trang.

### Tổng hợp

| Giai đoạn | Thời gian | Rủi ro | Kết quả chính |
|---|---|---|---|
| A | ~1 ngày | thấp | `npm run check`; bỏ editor cũ; scripts/docs gọn |
| B | 1–2 ngày | trung bình | một cửa vào hiển thị; bỏ ~1.4k dòng Preview + CSS cũ |
| C | 3–4 ngày | trung bình | một nguồn cấu hình `specs/<id>/`; schema; test đầu tiên |
| D | 4–5 ngày | trung bình | mỗi mẫu một thư mục, bảng mẫu sinh tự động, tải theo nhu cầu |
| Sau | 3–5 ngày | trung bình | Tailwind v4 toàn app |


## 5. Nguyên tắc khi làm
- Không đổi số đo đã khớp: chụp mốc `local_dump` trước mỗi giai đoạn, so `cmp_dumps` sau.
- Tệp sinh (`blocks/riviera|traditional/*`, `giftSpecs.generated.ts`, `giftAssets.generated.ts`) sửa bằng bộ sinh, không sửa tay.
- Mỗi giai đoạn: nhánh riêng từ `fix/clone-match`, commit theo nhóm, chờ duyệt trước khi push.
