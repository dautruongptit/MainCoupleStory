# Bàn giao cho agent khác (Antigravity / Codex / người)

Dự án: **clone giao diện thiệp cưới chungdoi.com sang bản chạy localhost**, khớp từng px (hình học + kiểu) theo từng mẫu. Ngôn ngữ làm việc với chủ dự án: tiếng Việt.

**Số mẫu (cập nhật 16/11/2026): trang thật công bố 92 mẫu (kho mẫu đo ngày 15/11/2026; danh mục trong mã trang thật có 94 mã, trong đó `DESERT_BLOOM_BROWN` chưa công bố); bản local có đủ 92 mẫu, đúng thứ tự.** Các con số 75 và 88 trong tài liệu cũ là số mẫu của trang thật ở thời điểm viết (75 → 88 ngày 01/11/2026 → 92).

## 1. Việc đang làm
- **Sổ đăng ký clone**: `docs/clone-registry.md` (đọc) + `docs/clone-registry.json` (hash từng file) cho biết mẫu nào đã/dở dang/chưa clone và file nào đã lưu. **Sau mỗi lần clone hoặc sửa mẫu: chạy `node scripts/clone/registry.mjs` rồi commit cùng.** Khi chủ dự án bảo "đồng bộ lại toàn bộ mẫu": chạy `--check` trước để thấy file mới/đã đổi/mất, rồi làm theo mục "Quy trình đồng bộ" trong sổ.
- **Sổ ảnh Hộp Mừng Quà**: `docs/survey/gift-assets.md` (+ `.json`, lịch sử ở `docs/survey/gift-asset-results/`) ghi ảnh hộp 3D/hộp nhỏ/phong bì từng mẫu cần, đã có, trang gốc không có, mẫu dùng ảnh tên chung của họ (giống trang gốc: vd `dragon_phoenix_red` → `dragon_phoenix.webp`, lưu đúng tên thật, không nhân bản theo id; code tra khóa `assets` trong `specs/<id>/gift.json` qua `blocks/shared/giftSpecs.ts`) và file thừa. **Sau mỗi lần tải ảnh hộp quà: chạy `node scripts/clone/gift_assets.mjs --result <kết quả>` rồi commit cùng.** Lấy danh sách cần tải: `--todo`. Dữ liệu khối hộp quà của 92 mẫu: `docs/survey/raw/gift_<id>.json` (thu bằng `scripts/survey/gift_crawl.js`, giãn ≥35 giây/mẫu — tải nhanh sẽ bị 403) → `node scripts/clone/gen_gift_sections.cjs` (ghi `specs/<id>/gift.json`) → `npm run gen:specs` → khối dùng chung `blocks/shared/GiftsGeneric.tsx`. Kiểm tra: `node scripts/check/gift-modes.mjs --all`, `node scripts/check/gift-geometry.mjs`.
- Nhánh `fix/clone-match`. Đã đạt: **minimalism_brown** (Nâu), **riviera_blue** (Riviera - Lam) và **dragon_phoenix_v4_red** (Long Phụng V4 - Đỏ) ở bìa, thiệp đã mở, hộp quà, RSVP; editor đã dựng theo markup gốc (16 thẻ) và khớp mẫu Nâu ở 390/768/1280.
- Còn lại (xem `docs/playbook/clone-playbook.md` mục 8): đo editor thật của Riviera; parallax khi cuộn của Riviera; nối `getCapabilities()` vào editor; các mẫu còn dở dang theo sổ đăng ký clone.
- Đọc theo thứ tự: `docs/playbook/clone-playbook.md` (quy trình) → `docs/playbook/clone-rules.md` (rule, capabilities) → `docs/playbook/clone-plan-88.md` (kế hoạch viết khi trang thật có 88 mẫu, nay 92; thay `clone-plan.md` cũ) → `docs/archive/brown-fix-plan.md` (ví dụ làm hết một mẫu).

## 2. Kiến trúc cần biết
- Stack: React 18 + Vite 5 + TypeScript; router tự viết; dữ liệu thiệp ở localStorage (`Inv` trong `src/types/invitation.ts`).
- **Khuôn thiệp đã mở** `src/features/invitation/shell/`: `InvitationShell` + `useInvitationCtx` + `blocks/<họ>/*` + `specs/<id>/{meta,theme,capabilities,demo}.json`. **Mỗi mẫu một thư mục `specs/<id>/`**: `meta.json` (slug, tên, mô tả, ảnh danh mục, thứ tự `order` như trang gốc, bảng màu `palette`, `previewFocal`, `introDefault`), `theme.json`, `capabilities.json`, `demo.json` (mọi dữ liệu demo riêng của mẫu: tên cặp đôi, ngày, lời mời bìa, ảnh, dress code…). Chỉ mục do `node scripts/clone/gen_spec_index.mjs` (`npm run gen:specs`) sinh ra `specs/index.generated.ts` và `src/features/templates/data/templates.generated.ts` — **không đăng ký tay, không sửa tệp sinh**; `templates.ts`, `templateThemes.ts`, `previewFocal.ts` chỉ còn là lớp đọc. Dữ liệu demo dựng ở `src/features/invitation/demo/buildDemoInv.ts` (phần chung + `demo.json`). Cửa vào hiển thị duy nhất: `src/features/invitation/view/InvitationView.tsx` (bìa → mở → khuôn); `Preview.tsx` cũ đã xóa. Không viết `if (templateId === ...)` trong khối.
- **CSS thiệp/editor** theo trang gốc (Tailwind v4 + daisyUI v5) biên dịch riêng, cô lập trong `.inv-root`: nguồn `src/features/invitation/styles/invitation.src.css` → `npm run css:inv` → `invitation.generated.css` (gitignore). **Chạy lại `css:inv` mỗi khi thêm class Tailwind mới.** Phần còn lại của app dùng Tailwind v3 + CSS cũ (`src/styles/*.css`); `postcss.config.js` loại các luật cũ trùng tên khỏi `.inv-root`.
- Bìa/mở thiệp: engine chung `src/features/invitation/components/covers/` (cấu hình theo mẫu ở `shell/specs/<id>/cover.json`; `coverConfigs.ts` chỉ còn là lớp đọc; component bìa của mẫu ghi ở `cover.json#component`, bảng tên → component ở `covers/index.ts`). Editor: `src/features/editor/` (`components/v2/*` là markup gốc).

## 3. Lệnh
```
npm run check            # bộ kiểm tra chung (tsc, chỉ mục spec, vitest, số đo so mốc, hộp quà, editor-sync); --full / --baseline xem scripts/README.md
npm test                 # test đơn vị (Vitest): store — một nháp, đổi mẫu giữ dữ liệu, giữ kiểu hộp quà
npm run gen:specs        # sinh lại chỉ mục sau khi thêm/sửa specs/<id>/*.json (--check: chỉ kiểm tra)
node scripts/check/demo-data.mjs   --save|--compare <tệp>   # dữ liệu demo 92 mẫu trước/sau khi chuyển cấu hình (không cần trình duyệt)
node scripts/check/config-data.mjs --save|--compare <tệp>   # mọi giá trị cấu hình tra theo mẫu (bảng mẫu, màu, bìa, thẻ editor…) trước/sau
node scripts/check/dump-all.mjs    --save|--compare <dir> [open:390 open:1280]   # số đo cả 92 mẫu trước/sau một thay đổi lớn
node scripts/check/page-prints.mjs --save|--compare <dir>   # bố cục các trang app (không phải thiệp) trước/sau
node scripts/tools/localize-assets.mjs [--write]   # đổi URL máy chủ trang gốc trong src/ sang đường dẫn local; báo ảnh local còn thiếu
node scripts/check/no-remote.mjs [<id> ...]        # mở thiệp demo trên trình duyệt: không tải gì từ trang gốc, không ảnh hỏng
npm install
npm run dev            # tự chạy css:inv rồi vite (cổng 5173)
npx tsc --noEmit -p .  # kiểm kiểu
npm run build
node scripts/survey/local_dump.mjs <id> <cover|open|openfull|gift|rsvp|editor> <390|768|1280|1440>
node scripts/survey/diff_dump.mjs  <id> <state> <width>     # ghi docs/survey/diff-<id>-<state>-<width>.md
node scripts/check/cmp_dumps.mjs <thư mục mốc> <id> open:390 ...   # chứng minh refactor không đổi số đo
node scripts/check/editor-sync.mjs <id>   # sửa field → xem trước đổi; bật/tắt; tải lại giữ dữ liệu
node scripts/check/audit.mjs <id>
node scripts/clone/gen_riviera.cjs      # sinh lại block Riviera từ docs/survey/blocks/riviera_blue
node scripts/clone/gen_traditional.cjs  # sinh lại block họ traditional (Long Phụng V4) — dùng scripts/clone/genkit.cjs
```
Tiêu chí đạt một màn: lệch hình học **0** (dung sai 1px) và lệch kiểu 0, trừ phần tử đổi theo thời gian (đếm ngược, hạt rơi, ảnh lazy ở cuối trang). Mẫu Nâu không được đổi số đo (kiểm bằng `cmp_dumps`).

## 4. Đo trang gốc (cần trình duyệt)
- Chạy collector: `node scripts/survey/collector.mjs` (cổng 5199, ghi `docs/survey/raw/<tên>.json`).
- Trong một tab Chrome đang mở chungdoi.com, nạp `scripts/survey/probe.js`, `run.js` (đã có sẵn `P.dumpReal`, `P.dumpEditorReal`, `P.stepCover/stepOpened/stepGift`, `P.engineDump`), rồi gọi ví dụ `await P.dumpReal("riviera-lam","riviera_blue",390,"open")`. Với nhiều mẫu/độ rộng, mỗi lệnh phải xong dưới ~45 giây.
- Chrome có thể hỏi quyền truy cập mạng nội bộ cho localhost khi gửi dữ liệu lần đầu: chọn Cho phép.

## 5. Quy tắc cứng (đừng vi phạm)
- Số đo phải **đo thật** từ trang gốc, không đoán.
- **Không** nhập mật khẩu / tạo tài khoản / gửi form trên trang gốc; không vượt Cloudflare; ít request. Áp mẫu vào bản nháp tài khoản của chủ dự án (để đo editor) là thao tác thay đổi tài khoản: **hỏi chủ dự án trước**.
- **Bản local không được tải tài nguyên nào từ trang gốc** (ảnh, nhạc, QR, favicon): mọi URL `assets.<trang gốc>/…` lấy về từ dump/HTML thật phải đổi sang đường dẫn local bằng `node scripts/tools/localize-assets.mjs --write`, ảnh còn thiếu thì tải về `public/images/photo-library/` (qua tab Chrome mở thẳng máy chủ ảnh, giãn vài giây mỗi ảnh; `fetch` từ trang chính bị CORS chặn). `npm run check` kiểm cả hai (mã nguồn + `no-remote`). Liên kết hiển thị tới trang gốc (dòng ghi công cuối thiệp, đường dẫn chia sẻ) không tính.
- Ảnh/nhạc bản quyền của trang gốc chỉ để ở `public/assets/_reference/` (gitignore, chỉ localhost). Không đưa khóa API, mã tài khoản, email thật vào repo (dump thô đã che `AIzaSy_REDACTED`, `cdc-REDACTED`).
- **Không commit/push khi chưa được chủ dự án duyệt.** Commit chia theo nhóm (xem lịch sử).
- Sửa tay không phải cách làm với file sinh: `blocks/riviera/*`, `blocks/traditional/*` do `scripts/clone/gen_*.cjs` sinh; sửa bộ sinh rồi chạy lại.

## 6. Bẫy đã gặp
1. Công cụ shell có thể làm mất dấu `\` trong lệnh/heredoc (regex hỏng) → tạo file chứa backslash bằng công cụ ghi file, không dùng heredoc.
2. Vite có thể cache bản rỗng của một file vừa ghi → khởi động lại dev server.
3. Class Tailwind v4 (vd `h-130`) không có ngoài `.inv-root` → dùng dạng tùy ý `h-[520px]`.
4. CSS cũ cộng dồn (`.space-y-*`, rule `!important` theo `data-bot-screenshot-id`) → xem playbook mục 5.
5. Ảnh `loading="lazy"` có chiều cao 0 khi chưa tải → so sánh bằng trạng thái `openfull`.
6. `npm run css:inv` dò Tailwind v4 theo phiên bản vì vị trí trong `node_modules` đổi theo máy; nếu báo không thấy, chạy `npm install`.
7. Mẫu mới thêm họ khối: chạy `npm run css:inv` (class Tailwind arbitrary mới), tạo thư mục `blocks/<họ>/` có `index.ts` (tên thư mục = `capabilities.family`; không cần đăng ký tay), tạo `specs/<id>/{meta,theme,capabilities,demo}.json` rồi chạy `npm run gen:specs` (thay cho việc thêm tay vào `specs/index.ts` và `templates.ts`), kèm `cover.json` (cấu hình bìa); chưa chạy bộ sinh thì thiệp báo "chưa được hỗ trợ" và `npm run check` báo chỉ mục cũ.
10. Kiểm tra bằng trình duyệt (`gift-modes`, `gift-geometry`, `dump-all`…) có thể **treo** nếu sửa file trong `src/` giữa lúc đang chạy (trang tự tải lại, lệnh đo không trả về). Đừng sửa `src/` khi đang chạy; nếu treo thì dừng tiến trình và chạy lại.
11. Lệnh shell/`node -e` làm mất `\n`, `\r` trong chuỗi (giống bẫy 1): sửa file có ký tự thoát bằng công cụ sửa file.
8. Thu dữ liệu từ trang gốc về `localhost:5199/5299` cần Chrome cho phép truy cập mạng nội bộ (chrome://settings/content/all); nếu `fetch` lỗi ngay lập tức, đó là chặn này. Dump không được chứa khóa API: che `AIzaSy…` thành `AIzaSy_REDACTED` trước khi commit.
9. Font: gốc không nạp Libre Baskerville; thêm font vào `index.html` làm chữ rộng hơn gốc.
