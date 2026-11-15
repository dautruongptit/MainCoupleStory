# Sổ đăng ký clone mẫu thiệp

> Sinh tự động bởi `node scripts/clone/registry.mjs` — **chạy lại sau mỗi lần clone/sửa mẫu rồi commit cùng**. Chi tiết máy đọc (hash từng file): `docs/clone-registry.json`.

Cập nhật: 2026-11-15 · Tổng **92** mẫu: ✅ đã clone **43** · 🟡 dở dang **49** · ⬜ chưa clone **0**

## Ý nghĩa trạng thái

- ✅ **đã clone**: có `specs/<id>/` (theme đã đo thật, không còn màu đen/trắng mặc định) và có mục trong `coverConfigs.ts`.
- 🟡 **dở dang**: có spec nhưng theme còn mặc định hoặc thiếu cấu hình bìa.
- ⬜ **chưa clone**: chưa có spec — đang chạy đường `Preview.tsx` cũ (lệch lớn so với gốc).
- Cột **Đã kiểm** là ô tích tay trong JSON (`verified`): bìa / mở thiệp / hộp quà / RSVP / editor / lệch hình học = 0. `clone` ≠ đã kiểm đủ.

## Quy trình đồng bộ lại toàn bộ mẫu

1. `node scripts/clone/registry.mjs --check` — so sổ đã lưu với code hiện tại (file nào mới / đã cập nhật / mất).
2. Lọc mẫu ⬜ và 🟡 trong bảng dưới → clone theo `docs/playbook/clone-playbook.md`.
3. Mẫu ✅: đo lại trang gốc, so với hash trong JSON để biết file nào thay đổi (ảnh theme mới tải về có hash khác → đã cập nhật).
4. Mỗi lần clone: lưu ảnh vào `public/images/themes/<thư mục theo tên gốc>/`, ảnh phong bì vào `public/images/envelope/<id>.webp`, HTML thô vào `docs/survey/raw/<id>_*.json`, khối tách vào `docs/survey/blocks/<id>/`; sau đó chạy lại registry và commit.
5. Ảnh xem trước `public/images/template-previews/` bị gitignore (bản quyền, chỉ localhost) nên **không** nằm trong sổ; tải lại bằng script khi cần.

## Bảng tổng hợp

| # | | id | slug | Tên | Họ khối | Ảnh theme | Phong bì | Generator | Đã kiểm | Còn thiếu |
|--:|:-:|---|---|---|---|--:|:-:|---|---|---|
| 1 | ✅ | `minimalism_darkred` | minimalism-do-dam | Minimalism - Đỏ Đậm | darkred | 9 | ✓ | — | — | — |
| 2 | ✅ | `minimalism_brown` | minimalism-nau | Minimalism - Nâu | minimalism (khối chung) | 10 | ✓ | — | 6/6 | — |
| 3 | ✅ | `song_hy_green` | song-hy-xanh | Song Hỷ - Xanh | song_hy | — | ✓ | — | — | — |
| 4 | ✅ | `boho_floral_green` | hoa-moc-xanh | Hoa Mộc - Xanh | boho_floral | — | ✓ | — | — | — |
| 5 | ✅ | `song_hy_v2_red` | song-hy-v2-do | Song Hỷ V2 - Đỏ | song_hy_v2_red | 11 | ✓ | — | — | — |
| 6 | ✅ | `song_hy_red` | song-hy-do | Song Hỷ - Đỏ | song_hy | — | ✓ | — | — | — |
| 7 | 🟡 | `silk_ribbon_green` | to-duyen-xanh | Tơ Duyên - Xanh | silk_ribbon_green | 6 | ✓ | — | — | theme |
| 8 | ✅ | `minimalism_green` | minimalism-xanh | Minimalism - Xanh | minimalism_green | 9 | ✓ | — | — | — |
| 9 | 🟡 | `jasmine_white` | mai-lan-trang | Mai Lan - Trắng | jasmine_white | 2 | ✓ | — | — | theme |
| 10 | 🟡 | `dragon_phoenix_v3_red` | long-phung-v3-do | Long Phụng V3 - Đỏ | dragon_phoenix_v3_red | 7 | — | — | — | theme |
| 11 | ✅ | `dragon_phoenix_red` | long-phung-do | Long Phụng - Đỏ | longphung_v1 | 4 | — | — | — | — |
| 12 | 🟡 | `silk_ribbon_darkred` | to-duyen-do-dam | Tơ Duyên - Đỏ Đậm | silk_ribbon_darkred | 6 | ✓ | — | — | theme |
| 13 | ✅ | `minimalism_darkbrown` | minimalism-nau-dam | Minimalism - Nâu Đậm | minimalism_darkbrown | — | ✓ | — | — | — |
| 14 | ✅ | `dragon_phoenix_v2_red` | long-phung-v2-do | Long Phụng V2 - Đỏ | dragon_phoenix_v2_red | 6 | — | — | 2/6 | — |
| 15 | ✅ | `double_dragon_red` | song-long-do | Song Long - Đỏ | double_dragon | — | ✓ | — | — | — |
| 16 | 🟡 | `glass_garden_green` | vuonkinh-xanh | Vườn Kính - Xanh | glass_garden_green | 10 | ✓ | — | — | theme |
| 17 | 🟡 | `double_phoenix_red` | song-phung-do | Song Phụng - Đỏ | double_phoenix_red | 6 | ✓ | — | — | theme |
| 18 | ✅ | `double_dragon_green` | song-long-xanh | Song Long - Xanh | double_dragon | — | ✓ | — | — | — |
| 19 | 🟡 | `glass_garden_pink` | vuonkinh-hong | Vườn Kính - Hồng | glass_garden_pink | 10 | ✓ | — | — | theme |
| 20 | 🟡 | `marble_yellow` | cam-thach-vang | Cẩm Thạch - Vàng | marble_yellow | 5 | — | — | — | theme, bìa |
| 21 | 🟡 | `elegant_leaf_green` | thanh-diep-xanh | Thanh Diệp - Xanh | elegant_leaf_green | 4 | ✓ | — | — | theme |
| 22 | 🟡 | `silk_ribbon_pink` | to-duyen-hong | Tơ Duyên - Hồng | silk_ribbon_pink | 6 | ✓ | — | — | theme |
| 23 | ✅ | `dragon_phoenix_v4_red` | long-phung-v4-do | Long Phụng V4 - Đỏ | traditional | 18 | ✓ | `gen_traditional.cjs` | 6/6 | — |
| 24 | ✅ | `lien_hoa_v2_green` | lien-hoa-v2-xanh | Liên Hoa V2 - Xanh | lien_hoa_v2 | 10 | ✓ | — | — | — |
| 25 | 🟡 | `chateau_green` | lau-dai-xanh | Lâu Đài - Xanh | chateau_green | 15 | ✓ | — | — | theme |
| 26 | ✅ | `spring_garden_green` | vuon-xuan-xanh | Vườn Xuân - Xanh | springgarden_v1 | 2 | ✓ | — | — | — |
| 27 | 🟡 | `chibi_red` | chibi-red | Chibi - Đỏ | chibi_red | 7 | ✓ | — | — | theme |
| 28 | 🟡 | `song_hac_red` | song-hac-do | Song Hạc - Đỏ | song_hac_red | 16 | ✓ | — | — | theme |
| 29 | 🟡 | `nhat_binh_red` | nhat-binh-do | Nhật Bình - Đỏ | nhat_binh_red | 9 | ✓ | — | — | theme |
| 30 | ✅ | `baroque_v2_darkgreen` | baroque-v2-xanh-dam | Baroque V2 - Xanh Đậm | baroque_v2 | 12 | ✓ | — | — | — |
| 31 | ✅ | `baroque_v2_darkred` | baroque-v2-do-dam | Baroque V2 - Đỏ Đậm | baroque_v2 | 12 | ✓ | — | — | — |
| 32 | 🟡 | `cherry_blossom_pink` | anh-dao-hong | Anh Đào - Hồng | cherry_blossom_pink | 4 | ✓ | — | — | theme |
| 33 | ✅ | `boho_floral_pink` | hoa-moc-hong | Hoa Mộc - Hồng | boho_floral | — | ✓ | — | — | — |
| 34 | ✅ | `applique_lace_white` | ren-theu-trang | Ren Thêu - Trắng | applique_lace_white | 11 | ✓ | — | — | — |
| 35 | 🟡 | `silk_flora_brown` | hoa-lua-nau | Hoa Lụa - Nâu | silk_flora_brown | 3 | ✓ | — | — | theme |
| 36 | 🟡 | `hoa_tinh_red` | hoa-tinh-do | Hoạ Tình - Đỏ | hoa_tinh_red | 13 | ✓ | — | — | theme |
| 37 | ✅ | `spring_garden_blue` | vuon-xuan-lam | Vườn Xuân - Lam | springgarden_v1 | 3 | ✓ | — | — | — |
| 38 | ✅ | `minimalism_darkblue` | minimalism-lam-dam | Minimalism - Lam Đậm | minimalism_darkblue | — | ✓ | — | — | — |
| 39 | 🟡 | `royal_red` | hoang-kim-do | Hoàng Kim - Đỏ | royal_red | 5 | — | — | — | theme |
| 40 | ✅ | `minimalism_red` | minimalism-do | Minimalism - Đỏ | minimalism_red | 2 | ✓ | — | — | — |
| 41 | ✅ | `spring_garden_red` | vuon-xuan-do | Vườn Xuân - Đỏ | springgarden_v1 | 6 | ✓ | — | — | — |
| 42 | ✅ | `dragon_phoenix_green` | long-phung-xanh | Long Phụng - Xanh | longphung_v1 | 4 | — | — | — | — |
| 43 | 🟡 | `baroque_gold` | hoang-gia-vang | Baroque - Vàng | baroque_gold | 8 | ✓ | — | — | theme |
| 44 | 🟡 | `chateau_blue` | lau-dai-lam | Lâu Đài - Lam | chateau_blue | 13 | ✓ | — | — | theme |
| 45 | 🟡 | `double_phoenix_green` | song-phung-xanh | Song Phụng - Xanh | double_phoenix_green | 6 | ✓ | — | — | theme |
| 46 | ✅ | `boho_floral_brown` | hoa-moc-nau | Hoa Mộc - Nâu | boho_floral | — | ✓ | — | — | — |
| 47 | ✅ | `double_dragon_blue` | song-long-lam | Song Long - Lam | double_dragon | — | ✓ | — | — | — |
| 48 | 🟡 | `glass_garden_light_green` | vuonkinh-xanh-nhat | Vườn Kính - Xanh Nhạt | glass_garden_light_green | 9 | ✓ | — | — | theme, bìa |
| 49 | ✅ | `crystal_floral_blue` | hoa-thuy-tinh-lam | Hoa Thuỷ Tinh - Lam | crystal_floral | 10 | ✓ | — | — | — |
| 50 | ✅ | `dragon_phoenix_blue` | long-phung-lam | Long Phụng - Lam | longphung_v1 | 4 | — | — | — | — |
| 51 | 🟡 | `co_ba_red` | co-ba-do | Cô Ba - Đỏ | co_ba_red | 2 | ✓ | — | — | theme |
| 52 | 🟡 | `lien_hoa_pink` | lien-hoa-hong | Liên Hoa - Hồng | lien_hoa_pink | 13 | ✓ | — | — | theme |
| 53 | ✅ | `minimalism_purple` | minimalism-tim | Minimalism - Tím | minimalism_purple | 13 | ✓ | — | — | — |
| 54 | ✅ | `porcelain_v2_green` | bach-su-v2-xanh | Bạch Sứ V2 - Xanh | porcelain_v2 | 6 | ✓ | — | — | — |
| 55 | 🟡 | `dried_flower_v2_green` | hoa-kho-v2-xanh | Hoa Khô V2 - Xanh | dried_flower_v2_green | 11 | ✓ | — | — | theme |
| 56 | ✅ | `porcelain_v2_pink` | bach-su-v2-hong | Bạch Sứ V2 - Hồng | porcelain_v2 | 6 | ✓ | — | — | — |
| 57 | 🟡 | `hoa_kho_v2_blue` | hoa-kho-v2-lam | Hoa Khô V2 - Lam | hoa_kho_v2_blue | 11 | ✓ | — | — | theme |
| 58 | ✅ | `dragon_phoenix_black` | long-phung-huyen | Long Phụng - Huyền | longphung_v1 | 4 | — | — | — | — |
| 59 | 🟡 | `royal_v2_green` | hoang-kim-ii-xanh | Hoàng Kim II - Xanh | royal_v2_green | 12 | ✓ | — | — | theme |
| 60 | 🟡 | `royal_green` | hoang-kim-xanh | Hoàng Kim - Xanh | royal_green | 5 | — | — | — | theme |
| 61 | 🟡 | `baroque_blue` | baroque-lam | Baroque - Lam | baroque_blue | 13 | ✓ | — | — | theme |
| 62 | 🟡 | `porcelain_brown` | bach-su-nau | Bạch Sứ - Nâu | porcelain_brown | 6 | ✓ | — | — | theme |
| 63 | ✅ | `crystal_floral_red` | hoa-thuy-tinh-do | Hoa Thuỷ Tinh - Đỏ | crystal_floral | 11 | ✓ | — | — | — |
| 64 | 🟡 | `royal_blue` | hoang-kim-lam | Hoàng Kim - Lam | royal_blue | 5 | — | — | — | theme |
| 65 | ✅ | `riviera_blue` | riviera-lam | Riviera - Lam | riviera | 24 | ✓ | `gen_riviera.cjs` | 6/6 | — |
| 66 | 🟡 | `florence_brown` | florence-nau | Florence - Nâu | florence_brown | 19 | ✓ | — | — | theme |
| 67 | ✅ | `baroque_v2_darkblue` | baroque-v2-lam-dam | Baroque V2 - Lam Đậm | baroque_v2 | 12 | ✓ | — | — | — |
| 68 | ✅ | `jasmine_green` | mai-lan-xanh | Mai Lan - Xanh | jasmine_green | 27 | ✓ | `gen_jasmine_green.cjs` | — | — |
| 69 | 🟡 | `sunflower_yellow` | hoa-huong-duong | Hoa Hướng Dương | sunflower_yellow | 7 | ✓ | — | — | theme |
| 70 | ✅ | `crystal_floral_green` | hoa-thuy-tinh-xanh | Hoa Thuỷ Tinh - Xanh | crystal_floral | 11 | ✓ | — | — | — |
| 71 | 🟡 | `santorini_blue` | santorini-lam | Santorini - Lam | santorini_blue | 18 | — | — | — | theme, bìa |
| 72 | ✅ | `porcelain_v2_red` | bach-su-v2-do | Bạch Sứ II - Đỏ | porcelain_v2 | 6 | ✓ | — | — | — |
| 73 | 🟡 | `porcelain_blue` | bach-su-lam | Bạch Sứ - Lam | porcelain_blue | 5 | ✓ | — | — | theme |
| 74 | 🟡 | `folk_floral_blue` | hoa-mau-lam | Hoa Màu - Lam | folk_floral_blue | 11 | ✓ | — | — | theme, bìa |
| 75 | 🟡 | `porcelain_red` | bach-su-do | Bạch Sứ - Đỏ | porcelain_red | 5 | ✓ | — | — | theme |
| 76 | 🟡 | `hoa_dai_pink` | hoa-dai-hong | Hoa Dại - Hồng | hoa_dai_pink | 9 | ✓ | — | — | theme |
| 77 | 🟡 | `qasr_blue` | thanhcung-lam | Thanh Cung - Lam | qasr_blue | 19 | ✓ | — | — | theme, bìa |
| 78 | 🟡 | `san_miguel_yellow` | san-miguel-vang | San Miguel - Vàng | san_miguel_yellow | 20 | ✓ | — | — | theme |
| 79 | 🟡 | `glass_garden_blue` | vuonkinh-lam | Vườn Kính - Lam | glass_garden_blue | 8 | ✓ | — | — | theme |
| 80 | 🟡 | `royal_v2_purple` | hoang-kim-ii-tim | Hoàng Kim II - Tím | royal_v2_purple | 15 | ✓ | — | — | theme |
| 81 | 🟡 | `hoa_kho_orange` | hoa-kho-cam | Hoa Khô - Cam | hoa_kho_orange | 8 | ✓ | — | — | theme |
| 82 | ✅ | `mahal_gold` | mahal-vang | Mahal - Vàng | mahal_gold | 18 | ✓ | — | 1/6 | — |
| 83 | 🟡 | `floral_fiesta_yellow` | floral-fiesta-vang | Lễ Hội Hoa - Vàng | floral_fiesta_yellow | 31 | ✓ | — | — | theme, bìa |
| 84 | 🟡 | `nomad_brown` | du-muc-nau | Du Mục - Nâu | nomad_brown | 18 | ✓ | — | — | theme, bìa |
| 85 | 🟡 | `saraya_gold` | kim-dien-vang | Kim Điện - Vàng | saraya_gold | 17 | ✓ | — | — | theme, bìa |
| 86 | 🟡 | `qasr_gold` | thanhcung-vang | Thanh Cung - Vàng | qasr_gold | 5 | ✓ | — | — | theme, bìa |
| 87 | 🟡 | `qasr_green` | thanhcung-xanh | Thanh Cung - Xanh | qasr_green | 12 | ✓ | — | — | theme, bìa |
| 88 | ✅ | `mandap_darkred` | mandap-do-dam | Mandap - Đỏ đậm | mandap_darkred | 17 | ✓ | — | 1/6 | — |
| 89 | 🟡 | `brocade_flower_red` | gam-hoa-do | Gấm Hoa - Đỏ | brocade_flower_red | 12 | ✓ | — | — | theme, bìa |
| 90 | ✅ | `calla_lily_white` | hoa-rum-trang | Hoa Rum - Trắng | calla_lily_white | 8 | ✓ | `gen_calla_lily_white.cjs` | 2/6 | — |
| 91 | ✅ | `mandap_yellow` | mandap-vang | Mandap - Vàng | mandap_yellow | 20 | ✓ | `gen_mandap_yellow.cjs` | 2/6 | — |
| 92 | ✅ | `mahal_pink` | mahal-hong | Mahal - Hồng | mahal_pink | 24 | ✓ | `gen_mahal_pink.cjs` | 2/6 | — |

## Chi tiết file theo mẫu

Chỉ liệt kê mẫu đã có spec. Hash (16 ký tự đầu sha256) nằm trong JSON.

<details><summary>✅ <b>Minimalism - Đỏ Đậm</b> — <code>minimalism_darkred</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo
- Họ khối: `darkred`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `minimalism_darkred`
- Thư mục ảnh theme: `public/images/themes/minimalism-dark-red/` (9 file)

**Spec** (3)

- `src/features/invitation/shell/specs/minimalism_darkred/capabilities.json`
- `src/features/invitation/shell/specs/minimalism_darkred/demo.json`
- `src/features/invitation/shell/specs/minimalism_darkred/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/darkred/Album.tsx`
- `src/features/invitation/shell/blocks/darkred/Banquet.tsx`
- `src/features/invitation/shell/blocks/darkred/Credit.tsx`
- `src/features/invitation/shell/blocks/darkred/Dress.tsx`
- `src/features/invitation/shell/blocks/darkred/Family.tsx`
- `src/features/invitation/shell/blocks/darkred/Gifts.tsx`
- `src/features/invitation/shell/blocks/darkred/Guestbook.tsx`
- `src/features/invitation/shell/blocks/darkred/Hero.tsx`
- `src/features/invitation/shell/blocks/darkred/index.ts`
- `src/features/invitation/shell/blocks/darkred/Lightbox.tsx`
- `src/features/invitation/shell/blocks/darkred/Paper.tsx`
- `src/features/invitation/shell/blocks/darkred/Schedule.tsx`
- `src/features/invitation/shell/blocks/darkred/Thanks.tsx`
- `src/features/invitation/shell/blocks/darkred/Venue.tsx`

**Ảnh theme** (9)

- `public/images/themes/minimalism-dark-red/cake.webp`
- `public/images/themes/minimalism-dark-red/camera.webp`
- `public/images/themes/minimalism-dark-red/castle-background.webp`
- `public/images/themes/minimalism-dark-red/cook.webp`
- `public/images/themes/minimalism-dark-red/envelope-background.webp`
- `public/images/themes/minimalism-dark-red/envelope-cover.webp`
- `public/images/themes/minimalism-dark-red/flower2-decoration.webp`
- `public/images/themes/minimalism-dark-red/paper.webp`
- `public/images/themes/minimalism-dark-red/papernote-background.webp`

**Phong bì** (1)

- `public/images/envelope/minimalism_darkred.webp`

**Dữ liệu khảo sát** (15)

- `docs/survey/blocks/minimalism_darkred/_full390.jsx`
- `docs/survey/blocks/minimalism_darkred/00.jsx`
- `docs/survey/blocks/minimalism_darkred/01.jsx`
- `docs/survey/blocks/minimalism_darkred/02.jsx`
- `docs/survey/blocks/minimalism_darkred/03.jsx`
- `docs/survey/blocks/minimalism_darkred/04.jsx`
- `docs/survey/blocks/minimalism_darkred/05.jsx`
- `docs/survey/blocks/minimalism_darkred/06.jsx`
- `docs/survey/blocks/minimalism_darkred/07.jsx`
- `docs/survey/blocks/minimalism_darkred/08.jsx`
- `docs/survey/blocks/minimalism_darkred/09.jsx`
- `docs/survey/blocks/minimalism_darkred/10.jsx`
- `docs/survey/blocks/minimalism_darkred/11.jsx`
- `docs/survey/raw/minimalism_darkred_dump.json`
- `docs/survey/raw/minimalism_darkred_dump_open_390.json`

</details>

<details><summary>✅ <b>Minimalism - Nâu</b> — <code>minimalism_brown</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo
- Họ khối: `minimalism` (dùng khối chung, không có thư mục riêng)
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `minimalism_brown`
- Thư mục ảnh theme: `public/images/themes/minimalism-brown/` (10 file)
- Ghi chú: Đạt 0 lệch hình học theo AGENTS.md

**Spec** (2)

- `src/features/invitation/shell/specs/minimalism_brown/capabilities.json`
- `src/features/invitation/shell/specs/minimalism_brown/theme.json`

**Ảnh theme** (10)

- `public/images/themes/minimalism-brown/cake.webp`
- `public/images/themes/minimalism-brown/couple.webp`
- `public/images/themes/minimalism-brown/flower2-decoration.webp`
- `public/images/themes/minimalism-brown/frame-avatar.webp`
- `public/images/themes/minimalism-brown/gate.webp`
- `public/images/themes/minimalism-brown/house-background.webp`
- `public/images/themes/minimalism-brown/leaf-background.webp`
- `public/images/themes/minimalism-brown/paper-note.webp`
- `public/images/themes/minimalism-brown/paper.webp`
- `public/images/themes/minimalism-brown/water.webp`

**Phong bì** (1)

- `public/images/envelope/minimalism_brown.webp`

**Dữ liệu khảo sát** (29)

- `docs/survey/raw/minimalism_brown_cover390.json`
- `docs/survey/raw/minimalism_brown_dump_cover_1440.json`
- `docs/survey/raw/minimalism_brown_dump_cover_390.json`
- `docs/survey/raw/minimalism_brown_dump_cover_768.json`
- `docs/survey/raw/minimalism_brown_dump_editor_1280.json`
- `docs/survey/raw/minimalism_brown_dump_editor_390.json`
- `docs/survey/raw/minimalism_brown_dump_editor_768.json`
- `docs/survey/raw/minimalism_brown_dump_gift_390.json`
- `docs/survey/raw/minimalism_brown_dump_gift_768.json`
- `docs/survey/raw/minimalism_brown_dump_open_1440.json`
- `docs/survey/raw/minimalism_brown_dump_open_390.json`
- `docs/survey/raw/minimalism_brown_dump_open_768.json`
- `docs/survey/raw/minimalism_brown_dump_rsvp_390.json`
- `docs/survey/raw/minimalism_brown_dump_rsvp_768.json`
- `docs/survey/raw/minimalism_brown_editor.json`
- `docs/survey/raw/minimalism_brown_editor_fixed.json`
- `docs/survey/raw/minimalism_brown_editor_html.json`
- `docs/survey/raw/minimalism_brown_editor_top.json`
- `docs/survey/raw/minimalism_brown_engine_css.json`
- `docs/survey/raw/minimalism_brown_engine_html.json`
- `docs/survey/raw/minimalism_brown_engine_probe.json`
- `docs/survey/raw/minimalism_brown_engine_style.json`
- `docs/survey/raw/minimalism_brown_gift.json`
- `docs/survey/raw/minimalism_brown_open1440.json`
- `docs/survey/raw/minimalism_brown_open390.json`
- `docs/survey/raw/minimalism_brown_open768.json`
- `docs/survey/raw/minimalism_brown_openSeq.json`
- `docs/survey/raw/minimalism_brown_rsvp_html.json`
- `docs/survey/raw/minimalism_brown_rsvp_states.json`

</details>

<details><summary>✅ <b>Song Hỷ - Xanh</b> — <code>song_hy_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/song-hy-xanh/demo
- Họ khối: `song_hy`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `song_hy_green`
- Thư mục ảnh theme: `public/song-hy-green/` (0 file)

**Spec** (3)

- `src/features/invitation/shell/specs/song_hy_green/capabilities.json`
- `src/features/invitation/shell/specs/song_hy_green/demo.json`
- `src/features/invitation/shell/specs/song_hy_green/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/song_hy/Album.tsx`
- `src/features/invitation/shell/blocks/song_hy/AlbumTitle.tsx`
- `src/features/invitation/shell/blocks/song_hy/Banquet.tsx`
- `src/features/invitation/shell/blocks/song_hy/BanquetTitle.tsx`
- `src/features/invitation/shell/blocks/song_hy/CeremonyTitle.tsx`
- `src/features/invitation/shell/blocks/song_hy/DressSchedule.tsx`
- `src/features/invitation/shell/blocks/song_hy/Family.tsx`
- `src/features/invitation/shell/blocks/song_hy/Footer.tsx`
- `src/features/invitation/shell/blocks/song_hy/Gifts.tsx`
- `src/features/invitation/shell/blocks/song_hy/Guestbook.tsx`
- `src/features/invitation/shell/blocks/song_hy/GuestbookTitle.tsx`
- `src/features/invitation/shell/blocks/song_hy/Hero.tsx`
- `src/features/invitation/shell/blocks/song_hy/index.ts`
- `src/features/invitation/shell/blocks/song_hy/themeVars.ts`
- `src/features/invitation/shell/blocks/song_hy/Venue.tsx`

**Phong bì** (1)

- `public/images/envelope/song_hy_green.webp`

**Dữ liệu khảo sát** (16)

- `docs/survey/blocks/song_hy_green/00.html`
- `docs/survey/blocks/song_hy_green/01.html`
- `docs/survey/blocks/song_hy_green/02.html`
- `docs/survey/blocks/song_hy_green/03.html`
- `docs/survey/blocks/song_hy_green/04.html`
- `docs/survey/blocks/song_hy_green/05.html`
- `docs/survey/blocks/song_hy_green/06.html`
- `docs/survey/blocks/song_hy_green/07.html`
- `docs/survey/blocks/song_hy_green/08.html`
- `docs/survey/blocks/song_hy_green/09.html`
- `docs/survey/blocks/song_hy_green/10.html`
- `docs/survey/blocks/song_hy_green/11.html`
- `docs/survey/blocks/song_hy_green/12.html`
- `docs/survey/blocks/song_hy_green/13.html`
- `docs/survey/raw/song_hy_green_demo_extracted.json`
- `docs/survey/raw/song_hy_green_dump_open_390.json`

</details>

<details><summary>✅ <b>Hoa Mộc - Xanh</b> — <code>boho_floral_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-moc-xanh/demo
- Họ khối: `boho_floral`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `boho_floral_green`
- Thư mục ảnh theme: `public/boho-floral-green/` (0 file)

**Spec** (3)

- `src/features/invitation/shell/specs/boho_floral_green/capabilities.json`
- `src/features/invitation/shell/specs/boho_floral_green/demo.json`
- `src/features/invitation/shell/specs/boho_floral_green/theme.json`

**Khối** (20)

- `src/features/invitation/shell/blocks/boho_floral/Album.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Banquet.tsx`
- `src/features/invitation/shell/blocks/boho_floral/BanquetTitle.tsx`
- `src/features/invitation/shell/blocks/boho_floral/CeremonyTitle.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Credit.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Dresscode.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Family.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Footer.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Gifts.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Guestbook.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Hero.tsx`
- `src/features/invitation/shell/blocks/boho_floral/index.ts`
- `src/features/invitation/shell/blocks/boho_floral/Lightbox.tsx`
- `src/features/invitation/shell/blocks/boho_floral/MidDecor.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Rsvp.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Schedule.tsx`
- `src/features/invitation/shell/blocks/boho_floral/themeVars.ts`
- `src/features/invitation/shell/blocks/boho_floral/TopDecor.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Venue.tsx`
- `src/features/invitation/shell/blocks/boho_floral/VenueDecor.tsx`

**Phong bì** (1)

- `public/images/envelope/boho_floral_green.webp`

**Dữ liệu khảo sát** (7)

- `docs/survey/raw/boho_floral_green_cover390.json`
- `docs/survey/raw/boho_floral_green_editor.json`
- `docs/survey/raw/boho_floral_green_gift.json`
- `docs/survey/raw/boho_floral_green_open1440.json`
- `docs/survey/raw/boho_floral_green_open390.json`
- `docs/survey/raw/boho_floral_green_open768.json`
- `docs/survey/raw/boho_floral_green_openSeq.json`

</details>

<details><summary>✅ <b>Song Hỷ V2 - Đỏ</b> — <code>song_hy_v2_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/song-hy-v2-do/demo
- Họ khối: `song_hy_v2_red`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `song_hy_v2_red`
- Thư mục ảnh theme: `public/images/themes/song-hy-v2-red/` (11 file)

**Spec** (3)

- `src/features/invitation/shell/specs/song_hy_v2_red/capabilities.json`
- `src/features/invitation/shell/specs/song_hy_v2_red/demo.json`
- `src/features/invitation/shell/specs/song_hy_v2_red/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/song_hy_v2_red/Album.tsx`
- `src/features/invitation/shell/blocks/song_hy_v2_red/Banquet.tsx`
- `src/features/invitation/shell/blocks/song_hy_v2_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/song_hy_v2_red/Dress.tsx`
- `src/features/invitation/shell/blocks/song_hy_v2_red/Footer.tsx`
- `src/features/invitation/shell/blocks/song_hy_v2_red/Gifts.tsx`
- `src/features/invitation/shell/blocks/song_hy_v2_red/Guestbook.tsx`
- `src/features/invitation/shell/blocks/song_hy_v2_red/Hero.tsx`
- `src/features/invitation/shell/blocks/song_hy_v2_red/index.ts`
- `src/features/invitation/shell/blocks/song_hy_v2_red/Paper.tsx`
- `src/features/invitation/shell/blocks/song_hy_v2_red/Schedule.tsx`
- `src/features/invitation/shell/blocks/song_hy_v2_red/Venue.tsx`

**Ảnh theme** (11)

- `public/images/themes/song-hy-v2-red/cake.webp`
- `public/images/themes/song-hy-v2-red/cloud-pattern.webp`
- `public/images/themes/song-hy-v2-red/double-happiness-bg.webp`
- `public/images/themes/song-hy-v2-red/double-happiness-light.webp`
- `public/images/themes/song-hy-v2-red/double-happiness.webp`
- `public/images/themes/song-hy-v2-red/flower1.webp`
- `public/images/themes/song-hy-v2-red/heart.svg`
- `public/images/themes/song-hy-v2-red/hero-shape.svg`
- `public/images/themes/song-hy-v2-red/panel.webp`
- `public/images/themes/song-hy-v2-red/ring.webp`
- `public/images/themes/song-hy-v2-red/toast.webp`

**Phong bì** (1)

- `public/images/envelope/song_hy_v2_red.webp`

</details>

<details><summary>✅ <b>Song Hỷ - Đỏ</b> — <code>song_hy_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/song-hy-do/demo
- Họ khối: `song_hy`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `song_hy_red`
- Thư mục ảnh theme: `public/song-hy-red/` (0 file)

**Spec** (3)

- `src/features/invitation/shell/specs/song_hy_red/capabilities.json`
- `src/features/invitation/shell/specs/song_hy_red/demo.json`
- `src/features/invitation/shell/specs/song_hy_red/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/song_hy/Album.tsx`
- `src/features/invitation/shell/blocks/song_hy/AlbumTitle.tsx`
- `src/features/invitation/shell/blocks/song_hy/Banquet.tsx`
- `src/features/invitation/shell/blocks/song_hy/BanquetTitle.tsx`
- `src/features/invitation/shell/blocks/song_hy/CeremonyTitle.tsx`
- `src/features/invitation/shell/blocks/song_hy/DressSchedule.tsx`
- `src/features/invitation/shell/blocks/song_hy/Family.tsx`
- `src/features/invitation/shell/blocks/song_hy/Footer.tsx`
- `src/features/invitation/shell/blocks/song_hy/Gifts.tsx`
- `src/features/invitation/shell/blocks/song_hy/Guestbook.tsx`
- `src/features/invitation/shell/blocks/song_hy/GuestbookTitle.tsx`
- `src/features/invitation/shell/blocks/song_hy/Hero.tsx`
- `src/features/invitation/shell/blocks/song_hy/index.ts`
- `src/features/invitation/shell/blocks/song_hy/themeVars.ts`
- `src/features/invitation/shell/blocks/song_hy/Venue.tsx`

**Phong bì** (1)

- `public/images/envelope/song_hy_red.webp`

**Dữ liệu khảo sát** (23)

- `docs/survey/blocks/song_hy_red/00.html`
- `docs/survey/blocks/song_hy_red/01.html`
- `docs/survey/blocks/song_hy_red/02.html`
- `docs/survey/blocks/song_hy_red/03.html`
- `docs/survey/blocks/song_hy_red/04.html`
- `docs/survey/blocks/song_hy_red/05.html`
- `docs/survey/blocks/song_hy_red/06.html`
- `docs/survey/blocks/song_hy_red/07.html`
- `docs/survey/blocks/song_hy_red/08.html`
- `docs/survey/blocks/song_hy_red/09.html`
- `docs/survey/blocks/song_hy_red/10.html`
- `docs/survey/blocks/song_hy_red/11.html`
- `docs/survey/blocks/song_hy_red/12.html`
- `docs/survey/blocks/song_hy_red/13.html`
- `docs/survey/raw/song_hy_red_cover390.json`
- `docs/survey/raw/song_hy_red_demo_extracted.json`
- `docs/survey/raw/song_hy_red_dump_open_390.json`
- `docs/survey/raw/song_hy_red_editor.json`
- `docs/survey/raw/song_hy_red_gift.json`
- `docs/survey/raw/song_hy_red_open1440.json`
- `docs/survey/raw/song_hy_red_open390.json`
- `docs/survey/raw/song_hy_red_open768.json`
- `docs/survey/raw/song_hy_red_openSeq.json`

</details>

<details><summary>🟡 <b>Tơ Duyên - Xanh</b> — <code>silk_ribbon_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/to-duyen-xanh/demo
- Họ khối: `silk_ribbon_green`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `silk_ribbon_green`
- Thư mục ảnh theme: `public/images/themes/silk-ribbon-green/` (6 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/silk_ribbon_green/capabilities.json`
- `src/features/invitation/shell/specs/silk_ribbon_green/demo.json`
- `src/features/invitation/shell/specs/silk_ribbon_green/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/silk_ribbon_green/Album.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Banquet.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Ceremony.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Credit.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Dress.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Footer.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Gifts.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Guestbook.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Hero.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/index.ts`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Lightbox.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Paper.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Schedule.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Section12.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_green/Venue.tsx`

**Ảnh theme** (6)

- `public/images/themes/silk-ribbon-green/flower-decoration.webp`
- `public/images/themes/silk-ribbon-green/icon-cake.webp`
- `public/images/themes/silk-ribbon-green/icon-home.webp`
- `public/images/themes/silk-ribbon-green/icon-music.webp`
- `public/images/themes/silk-ribbon-green/line-decoration.webp`
- `public/images/themes/silk-ribbon-green/ribbon-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/silk_ribbon_green.webp`

</details>

<details><summary>✅ <b>Minimalism - Xanh</b> — <code>minimalism_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/minimalism-xanh/demo
- Họ khối: `minimalism_green`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `minimalism_green`
- Thư mục ảnh theme: `public/images/themes/minimalism-green/` (9 file)

**Spec** (3)

- `src/features/invitation/shell/specs/minimalism_green/capabilities.json`
- `src/features/invitation/shell/specs/minimalism_green/demo.json`
- `src/features/invitation/shell/specs/minimalism_green/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/minimalism_green/Album.tsx`
- `src/features/invitation/shell/blocks/minimalism_green/Banquet.tsx`
- `src/features/invitation/shell/blocks/minimalism_green/Ceremony.tsx`
- `src/features/invitation/shell/blocks/minimalism_green/Credit.tsx`
- `src/features/invitation/shell/blocks/minimalism_green/Dress.tsx`
- `src/features/invitation/shell/blocks/minimalism_green/Footer.tsx`
- `src/features/invitation/shell/blocks/minimalism_green/Gifts.tsx`
- `src/features/invitation/shell/blocks/minimalism_green/Guestbook.tsx`
- `src/features/invitation/shell/blocks/minimalism_green/Hero.tsx`
- `src/features/invitation/shell/blocks/minimalism_green/index.ts`
- `src/features/invitation/shell/blocks/minimalism_green/Lightbox.tsx`
- `src/features/invitation/shell/blocks/minimalism_green/Paper.tsx`
- `src/features/invitation/shell/blocks/minimalism_green/Schedule.tsx`
- `src/features/invitation/shell/blocks/minimalism_green/Venue.tsx`

**Ảnh theme** (9)

- `public/images/themes/minimalism-green/cake.webp`
- `public/images/themes/minimalism-green/envelope-cut.webp`
- `public/images/themes/minimalism-green/envelope.webp`
- `public/images/themes/minimalism-green/flower-background.webp`
- `public/images/themes/minimalism-green/flower-line.webp`
- `public/images/themes/minimalism-green/guestbook-background.webp`
- `public/images/themes/minimalism-green/home.webp`
- `public/images/themes/minimalism-green/music.webp`
- `public/images/themes/minimalism-green/paper.webp`

**Phong bì** (1)

- `public/images/envelope/minimalism_green.webp`

**Dữ liệu khảo sát** (1)

- `docs/survey/raw/minimalism_green_dump_open_390.json`

</details>

<details><summary>🟡 <b>Mai Lan - Trắng</b> — <code>jasmine_white</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/mai-lan-trang/demo
- Họ khối: `jasmine_white`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `jasmine_white`
- Thư mục ảnh theme: `public/images/themes/moclan-white/` (2 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/jasmine_white/capabilities.json`
- `src/features/invitation/shell/specs/jasmine_white/demo.json`
- `src/features/invitation/shell/specs/jasmine_white/theme.json`

**Khối** (13)

- `src/features/invitation/shell/blocks/jasmine_white/Ceremony.tsx`
- `src/features/invitation/shell/blocks/jasmine_white/Credit.tsx`
- `src/features/invitation/shell/blocks/jasmine_white/Dress.tsx`
- `src/features/invitation/shell/blocks/jasmine_white/Footer.tsx`
- `src/features/invitation/shell/blocks/jasmine_white/Gifts.tsx`
- `src/features/invitation/shell/blocks/jasmine_white/Guestbook.tsx`
- `src/features/invitation/shell/blocks/jasmine_white/Hero.tsx`
- `src/features/invitation/shell/blocks/jasmine_white/index.ts`
- `src/features/invitation/shell/blocks/jasmine_white/Lightbox.tsx`
- `src/features/invitation/shell/blocks/jasmine_white/Paper.tsx`
- `src/features/invitation/shell/blocks/jasmine_white/Schedule.tsx`
- `src/features/invitation/shell/blocks/jasmine_white/Section9.tsx`
- `src/features/invitation/shell/blocks/jasmine_white/Venue.tsx`

**Ảnh theme** (2)

- `public/images/themes/moclan-white/hoa.webp`
- `public/images/themes/moclan-white/khung-hoa.webp`

**Phong bì** (1)

- `public/images/envelope/jasmine_white.webp`

</details>

<details><summary>🟡 <b>Long Phụng V3 - Đỏ</b> — <code>dragon_phoenix_v3_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/long-phung-v3-do/demo
- Họ khối: `dragon_phoenix_v3_red`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `dragon_phoenix_v3_red`
- Thư mục ảnh theme: `public/images/themes/longphung-v3-red/` (7 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/dragon_phoenix_v3_red/capabilities.json`
- `src/features/invitation/shell/specs/dragon_phoenix_v3_red/demo.json`
- `src/features/invitation/shell/specs/dragon_phoenix_v3_red/theme.json`

**Khối** (11)

- `src/features/invitation/shell/blocks/dragon_phoenix_v3_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v3_red/Credit.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v3_red/Dress.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v3_red/Footer.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v3_red/Gifts.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v3_red/Guestbook.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v3_red/Hero.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v3_red/index.ts`
- `src/features/invitation/shell/blocks/dragon_phoenix_v3_red/Paper.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v3_red/Schedule.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v3_red/Venue.tsx`

**Ảnh theme** (7)

- `public/images/themes/longphung-v3-red/chim-en.webp`
- `public/images/themes/longphung-v3-red/chu-hy.webp`
- `public/images/themes/longphung-v3-red/frame-calendar.webp`
- `public/images/themes/longphung-v3-red/frame-title.svg`
- `public/images/themes/longphung-v3-red/frame.svg`
- `public/images/themes/longphung-v3-red/phung.webp`
- `public/images/themes/longphung-v3-red/rong.webp`

</details>

<details><summary>✅ <b>Long Phụng - Đỏ</b> — <code>dragon_phoenix_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/long-phung-do/demo
- Họ khối: `longphung_v1`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `dragon_phoenix_red`
- Thư mục ảnh theme: `public/images/themes/red-v1/` (4 file)

**Spec** (3)

- `src/features/invitation/shell/specs/dragon_phoenix_red/capabilities.json`
- `src/features/invitation/shell/specs/dragon_phoenix_red/demo.json`
- `src/features/invitation/shell/specs/dragon_phoenix_red/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/longphung_v1/Album.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Dress.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Family.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Footer.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Gifts.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Guestbook.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Hero.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/index.ts`
- `src/features/invitation/shell/blocks/longphung_v1/Lightbox.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Paper.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Schedule.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Venue.tsx`

**Ảnh theme** (4)

- `public/images/themes/red-v1/bg-main.webp`
- `public/images/themes/red-v1/line6.svg`
- `public/images/themes/red-v1/phuong.webp`
- `public/images/themes/red-v1/rong.webp`

**Dữ liệu khảo sát** (16)

- `docs/survey/blocks/dragon_phoenix_red/_full390.jsx`
- `docs/survey/blocks/dragon_phoenix_red/00.jsx`
- `docs/survey/blocks/dragon_phoenix_red/01.jsx`
- `docs/survey/blocks/dragon_phoenix_red/02.jsx`
- `docs/survey/blocks/dragon_phoenix_red/03.jsx`
- `docs/survey/blocks/dragon_phoenix_red/04.jsx`
- `docs/survey/blocks/dragon_phoenix_red/05.jsx`
- `docs/survey/blocks/dragon_phoenix_red/06.jsx`
- `docs/survey/blocks/dragon_phoenix_red/07.jsx`
- `docs/survey/blocks/dragon_phoenix_red/08.jsx`
- `docs/survey/blocks/dragon_phoenix_red/09.jsx`
- `docs/survey/blocks/dragon_phoenix_red/10.jsx`
- `docs/survey/blocks/dragon_phoenix_red/11.jsx`
- `docs/survey/blocks/dragon_phoenix_red/12.jsx`
- `docs/survey/raw/dragon_phoenix_red_demo_extracted.json`
- `docs/survey/raw/dragon_phoenix_red_dump_open_390.json`

</details>

<details><summary>🟡 <b>Tơ Duyên - Đỏ Đậm</b> — <code>silk_ribbon_darkred</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/to-duyen-do-dam/demo
- Họ khối: `silk_ribbon_darkred`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `silk_ribbon_darkred`
- Thư mục ảnh theme: `public/images/themes/silk-ribbon-darkred/` (6 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/silk_ribbon_darkred/capabilities.json`
- `src/features/invitation/shell/specs/silk_ribbon_darkred/demo.json`
- `src/features/invitation/shell/specs/silk_ribbon_darkred/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Album.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Banquet.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Ceremony.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Credit.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Dress.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Footer.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Gifts.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Guestbook.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Hero.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/index.ts`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Lightbox.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Paper.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Schedule.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Section12.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_darkred/Venue.tsx`

**Ảnh theme** (6)

- `public/images/themes/silk-ribbon-darkred/flower-decoration.webp`
- `public/images/themes/silk-ribbon-darkred/icon-alcohol.webp`
- `public/images/themes/silk-ribbon-darkred/icon-candle.webp`
- `public/images/themes/silk-ribbon-darkred/icon-ring.webp`
- `public/images/themes/silk-ribbon-darkred/line-decoration.webp`
- `public/images/themes/silk-ribbon-darkred/ribbon-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/silk_ribbon_darkred.webp`

</details>

<details><summary>✅ <b>Minimalism - Nâu Đậm</b> — <code>minimalism_darkbrown</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/minimalism-nau-dam/demo
- Họ khối: `minimalism_darkbrown`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `minimalism_darkbrown`
- Thư mục ảnh theme: `public/images/themes/minimalism-darkbrown/` (0 file)

**Spec** (3)

- `src/features/invitation/shell/specs/minimalism_darkbrown/capabilities.json`
- `src/features/invitation/shell/specs/minimalism_darkbrown/demo.json`
- `src/features/invitation/shell/specs/minimalism_darkbrown/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/minimalism_darkbrown/Album.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/Banquet.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/Ceremony.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/Credit.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/Dress.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/Footer.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/Gifts.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/Guestbook.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/Hero.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/index.ts`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/Lightbox.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/Paper.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/Schedule.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkbrown/Venue.tsx`

**Phong bì** (1)

- `public/images/envelope/minimalism_darkbrown.webp`

**Dữ liệu khảo sát** (1)

- `docs/survey/raw/minimalism_darkbrown_dump_open_390.json`

</details>

<details><summary>✅ <b>Long Phụng V2 - Đỏ</b> — <code>dragon_phoenix_v2_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/long-phung-v2-do/demo
- Họ khối: `dragon_phoenix_v2_red`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `dragon_phoenix_v2_red`
- Thư mục ảnh theme: `public/images/themes/longphung-v2-red/` (6 file)
- Ghi chú: Sửa theme/font/dữ liệu động Hero-Ceremony-Venue 2026-11-11

**Spec** (3)

- `src/features/invitation/shell/specs/dragon_phoenix_v2_red/capabilities.json`
- `src/features/invitation/shell/specs/dragon_phoenix_v2_red/demo.json`
- `src/features/invitation/shell/specs/dragon_phoenix_v2_red/theme.json`

**Khối** (6)

- `src/features/invitation/shell/blocks/dragon_phoenix_v2_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v2_red/Hero.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v2_red/index.ts`
- `src/features/invitation/shell/blocks/dragon_phoenix_v2_red/Lightbox.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v2_red/Paper.tsx`
- `src/features/invitation/shell/blocks/dragon_phoenix_v2_red/Venue.tsx`

**Ảnh theme** (6)

- `public/images/themes/longphung-v2-red/bg-frame.jpg`
- `public/images/themes/longphung-v2-red/chu-hy.webp`
- `public/images/themes/longphung-v2-red/cloud.webp`
- `public/images/themes/longphung-v2-red/phuong.webp`
- `public/images/themes/longphung-v2-red/rong-phuong.webp`
- `public/images/themes/longphung-v2-red/rong.webp`

</details>

<details><summary>✅ <b>Song Long - Đỏ</b> — <code>double_dragon_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/song-long-do/demo
- Họ khối: `double_dragon`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `double_dragon_red`
- Thư mục ảnh theme: `public/songlong-red/` (0 file)

**Spec** (3)

- `src/features/invitation/shell/specs/double_dragon_red/capabilities.json`
- `src/features/invitation/shell/specs/double_dragon_red/demo.json`
- `src/features/invitation/shell/specs/double_dragon_red/theme.json`

**Khối** (17)

- `src/features/invitation/shell/blocks/double_dragon/Album.tsx`
- `src/features/invitation/shell/blocks/double_dragon/AlbumTitle.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Banquet.tsx`
- `src/features/invitation/shell/blocks/double_dragon/BanquetTitle.tsx`
- `src/features/invitation/shell/blocks/double_dragon/CeremonyTitle.tsx`
- `src/features/invitation/shell/blocks/double_dragon/DressSchedule.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Family.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Footer.tsx`
- `src/features/invitation/shell/blocks/double_dragon/FooterDecor.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Gifts.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Guestbook.tsx`
- `src/features/invitation/shell/blocks/double_dragon/GuestbookTitle.tsx`
- `src/features/invitation/shell/blocks/double_dragon/HeaderDecor.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Hero.tsx`
- `src/features/invitation/shell/blocks/double_dragon/index.ts`
- `src/features/invitation/shell/blocks/double_dragon/themeVars.ts`
- `src/features/invitation/shell/blocks/double_dragon/Venue.tsx`

**Phong bì** (1)

- `public/images/envelope/double_dragon_red.webp`

**Dữ liệu khảo sát** (19)

- `docs/survey/blocks/double_dragon_red/00.html`
- `docs/survey/blocks/double_dragon_red/01.html`
- `docs/survey/blocks/double_dragon_red/02.html`
- `docs/survey/blocks/double_dragon_red/03.html`
- `docs/survey/blocks/double_dragon_red/04.html`
- `docs/survey/blocks/double_dragon_red/05.html`
- `docs/survey/blocks/double_dragon_red/06.html`
- `docs/survey/blocks/double_dragon_red/07.html`
- `docs/survey/blocks/double_dragon_red/08.html`
- `docs/survey/blocks/double_dragon_red/09.html`
- `docs/survey/blocks/double_dragon_red/10.html`
- `docs/survey/blocks/double_dragon_red/11.html`
- `docs/survey/blocks/double_dragon_red/12.html`
- `docs/survey/blocks/double_dragon_red/13.html`
- `docs/survey/blocks/double_dragon_red/14.html`
- `docs/survey/blocks/double_dragon_red/bg_decor.html`
- `docs/survey/blocks/double_dragon_red/modal.html`
- `docs/survey/raw/double_dragon_red_demo_extracted.json`
- `docs/survey/raw/double_dragon_red_dump_open_390.json`

</details>

<details><summary>🟡 <b>Vườn Kính - Xanh</b> — <code>glass_garden_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/vuonkinh-xanh/demo
- Họ khối: `glass_garden_green`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `glass_garden_green`
- Thư mục ảnh theme: `public/images/themes/glass-garden-green/` (10 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/glass_garden_green/capabilities.json`
- `src/features/invitation/shell/specs/glass_garden_green/demo.json`
- `src/features/invitation/shell/specs/glass_garden_green/theme.json`

**Khối** (5)

- `src/features/invitation/shell/blocks/glass_garden_green/Ceremony.tsx`
- `src/features/invitation/shell/blocks/glass_garden_green/index.ts`
- `src/features/invitation/shell/blocks/glass_garden_green/Lightbox.tsx`
- `src/features/invitation/shell/blocks/glass_garden_green/Paper.tsx`
- `src/features/invitation/shell/blocks/glass_garden_green/Section1.tsx`

**Ảnh theme** (10)

- `public/images/themes/glass-garden-green/cake.webp`
- `public/images/themes/glass-garden-green/calendar-heart.webp`
- `public/images/themes/glass-garden-green/dish.webp`
- `public/images/themes/glass-garden-green/floral-background.webp`
- `public/images/themes/glass-garden-green/flower1-decoration.webp`
- `public/images/themes/glass-garden-green/flower2-decoration.webp`
- `public/images/themes/glass-garden-green/flower3-decoration.webp`
- `public/images/themes/glass-garden-green/flower4-decoration.webp`
- `public/images/themes/glass-garden-green/flower5-bottom.webp`
- `public/images/themes/glass-garden-green/welcome.webp`

**Phong bì** (1)

- `public/images/envelope/glass_garden_green.webp`

</details>

<details><summary>🟡 <b>Song Phụng - Đỏ</b> — <code>double_phoenix_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/song-phung-do/demo
- Họ khối: `double_phoenix_red`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `double_phoenix_red`
- Thư mục ảnh theme: `public/images/themes/songphung-red/` (6 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/double_phoenix_red/capabilities.json`
- `src/features/invitation/shell/specs/double_phoenix_red/demo.json`
- `src/features/invitation/shell/specs/double_phoenix_red/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/double_phoenix_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/Credit.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/Dress.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/Footer.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/Gifts.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/Guestbook.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/Hero.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/index.ts`
- `src/features/invitation/shell/blocks/double_phoenix_red/Paper.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/Schedule.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/Section1.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/Section2.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/Section3.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/Section4.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_red/Venue.tsx`

**Ảnh theme** (6)

- `public/images/themes/songphung-red/CHU HY.webp`
- `public/images/themes/songphung-red/HOA.webp`
- `public/images/themes/songphung-red/NENGIAY.jpg`
- `public/images/themes/songphung-red/Phuong 2.webp`
- `public/images/themes/songphung-red/Phuong line.webp`
- `public/images/themes/songphung-red/Phuong.webp`

**Phong bì** (1)

- `public/images/envelope/double_phoenix_red.webp`

</details>

<details><summary>✅ <b>Song Long - Xanh</b> — <code>double_dragon_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/song-long-xanh/demo
- Họ khối: `double_dragon`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `double_dragon_green`
- Thư mục ảnh theme: `public/songlong-red/` (0 file)

**Spec** (3)

- `src/features/invitation/shell/specs/double_dragon_green/capabilities.json`
- `src/features/invitation/shell/specs/double_dragon_green/demo.json`
- `src/features/invitation/shell/specs/double_dragon_green/theme.json`

**Khối** (17)

- `src/features/invitation/shell/blocks/double_dragon/Album.tsx`
- `src/features/invitation/shell/blocks/double_dragon/AlbumTitle.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Banquet.tsx`
- `src/features/invitation/shell/blocks/double_dragon/BanquetTitle.tsx`
- `src/features/invitation/shell/blocks/double_dragon/CeremonyTitle.tsx`
- `src/features/invitation/shell/blocks/double_dragon/DressSchedule.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Family.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Footer.tsx`
- `src/features/invitation/shell/blocks/double_dragon/FooterDecor.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Gifts.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Guestbook.tsx`
- `src/features/invitation/shell/blocks/double_dragon/GuestbookTitle.tsx`
- `src/features/invitation/shell/blocks/double_dragon/HeaderDecor.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Hero.tsx`
- `src/features/invitation/shell/blocks/double_dragon/index.ts`
- `src/features/invitation/shell/blocks/double_dragon/themeVars.ts`
- `src/features/invitation/shell/blocks/double_dragon/Venue.tsx`

**Phong bì** (1)

- `public/images/envelope/double_dragon_green.webp`

**Dữ liệu khảo sát** (17)

- `docs/survey/blocks/double_dragon_green/00.html`
- `docs/survey/blocks/double_dragon_green/01.html`
- `docs/survey/blocks/double_dragon_green/02.html`
- `docs/survey/blocks/double_dragon_green/03.html`
- `docs/survey/blocks/double_dragon_green/04.html`
- `docs/survey/blocks/double_dragon_green/05.html`
- `docs/survey/blocks/double_dragon_green/06.html`
- `docs/survey/blocks/double_dragon_green/07.html`
- `docs/survey/blocks/double_dragon_green/08.html`
- `docs/survey/blocks/double_dragon_green/09.html`
- `docs/survey/blocks/double_dragon_green/10.html`
- `docs/survey/blocks/double_dragon_green/11.html`
- `docs/survey/blocks/double_dragon_green/12.html`
- `docs/survey/blocks/double_dragon_green/13.html`
- `docs/survey/blocks/double_dragon_green/14.html`
- `docs/survey/raw/double_dragon_green_demo_extracted.json`
- `docs/survey/raw/double_dragon_green_dump_open_390.json`

</details>

<details><summary>🟡 <b>Vườn Kính - Hồng</b> — <code>glass_garden_pink</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/vuonkinh-hong/demo
- Họ khối: `glass_garden_pink`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `glass_garden_pink`
- Thư mục ảnh theme: `public/images/themes/glass-garden-pink/` (10 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/glass_garden_pink/capabilities.json`
- `src/features/invitation/shell/specs/glass_garden_pink/demo.json`
- `src/features/invitation/shell/specs/glass_garden_pink/theme.json`

**Khối** (5)

- `src/features/invitation/shell/blocks/glass_garden_pink/Ceremony.tsx`
- `src/features/invitation/shell/blocks/glass_garden_pink/index.ts`
- `src/features/invitation/shell/blocks/glass_garden_pink/Lightbox.tsx`
- `src/features/invitation/shell/blocks/glass_garden_pink/Paper.tsx`
- `src/features/invitation/shell/blocks/glass_garden_pink/Section1.tsx`

**Ảnh theme** (10)

- `public/images/themes/glass-garden-pink/cake.webp`
- `public/images/themes/glass-garden-pink/calendar-heart.webp`
- `public/images/themes/glass-garden-pink/coming.webp`
- `public/images/themes/glass-garden-pink/floral-background.webp`
- `public/images/themes/glass-garden-pink/flower1-decoration.webp`
- `public/images/themes/glass-garden-pink/flower2-decoration.webp`
- `public/images/themes/glass-garden-pink/flower4-decoration.webp`
- `public/images/themes/glass-garden-pink/flower5-bottom.webp`
- `public/images/themes/glass-garden-pink/leaf1-bloom.webp`
- `public/images/themes/glass-garden-pink/water.webp`

**Phong bì** (1)

- `public/images/envelope/glass_garden_pink.webp`

</details>

<details><summary>🟡 <b>Cẩm Thạch - Vàng</b> — <code>marble_yellow</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/cam-thach-vang/demo
- Họ khối: `marble_yellow`
- Thư mục ảnh theme: `public/images/themes/marble-yellow/` (5 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo); thiếu cấu hình bìa trong coverConfigs.ts

**Spec** (3)

- `src/features/invitation/shell/specs/marble_yellow/capabilities.json`
- `src/features/invitation/shell/specs/marble_yellow/demo.json`
- `src/features/invitation/shell/specs/marble_yellow/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/marble_yellow/Album.tsx`
- `src/features/invitation/shell/blocks/marble_yellow/Banquet.tsx`
- `src/features/invitation/shell/blocks/marble_yellow/Ceremony.tsx`
- `src/features/invitation/shell/blocks/marble_yellow/Dress.tsx`
- `src/features/invitation/shell/blocks/marble_yellow/Footer.tsx`
- `src/features/invitation/shell/blocks/marble_yellow/Gifts.tsx`
- `src/features/invitation/shell/blocks/marble_yellow/Guestbook.tsx`
- `src/features/invitation/shell/blocks/marble_yellow/index.ts`
- `src/features/invitation/shell/blocks/marble_yellow/Lightbox.tsx`
- `src/features/invitation/shell/blocks/marble_yellow/Paper.tsx`
- `src/features/invitation/shell/blocks/marble_yellow/Schedule.tsx`
- `src/features/invitation/shell/blocks/marble_yellow/Section1.tsx`
- `src/features/invitation/shell/blocks/marble_yellow/Section5.tsx`
- `src/features/invitation/shell/blocks/marble_yellow/Venue.tsx`

**Ảnh theme** (5)

- `public/images/themes/marble-yellow/leaf-1.webp`
- `public/images/themes/marble-yellow/leaf-2.webp`
- `public/images/themes/marble-yellow/medallion-alcohol.webp`
- `public/images/themes/marble-yellow/medallion-birdcage.webp`
- `public/images/themes/marble-yellow/medallion-candle.webp`

</details>

<details><summary>🟡 <b>Thanh Diệp - Xanh</b> — <code>elegant_leaf_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/thanh-diep-xanh/demo
- Họ khối: `elegant_leaf_green`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `elegant_leaf_green`
- Thư mục ảnh theme: `public/images/themes/thanhdiep-green/` (4 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/elegant_leaf_green/capabilities.json`
- `src/features/invitation/shell/specs/elegant_leaf_green/demo.json`
- `src/features/invitation/shell/specs/elegant_leaf_green/theme.json`

**Khối** (9)

- `src/features/invitation/shell/blocks/elegant_leaf_green/Album.tsx`
- `src/features/invitation/shell/blocks/elegant_leaf_green/Ceremony.tsx`
- `src/features/invitation/shell/blocks/elegant_leaf_green/Credit.tsx`
- `src/features/invitation/shell/blocks/elegant_leaf_green/Guestbook.tsx`
- `src/features/invitation/shell/blocks/elegant_leaf_green/Hero.tsx`
- `src/features/invitation/shell/blocks/elegant_leaf_green/index.ts`
- `src/features/invitation/shell/blocks/elegant_leaf_green/Lightbox.tsx`
- `src/features/invitation/shell/blocks/elegant_leaf_green/Paper.tsx`
- `src/features/invitation/shell/blocks/elegant_leaf_green/Venue.tsx`

**Ảnh theme** (4)

- `public/images/themes/thanhdiep-green/la1.webp`
- `public/images/themes/thanhdiep-green/la2.webp`
- `public/images/themes/thanhdiep-green/la3.webp`
- `public/images/themes/thanhdiep-green/la4.webp`

**Phong bì** (1)

- `public/images/envelope/elegant_leaf_green.webp`

</details>

<details><summary>🟡 <b>Tơ Duyên - Hồng</b> — <code>silk_ribbon_pink</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/to-duyen-hong/demo
- Họ khối: `silk_ribbon_pink`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `silk_ribbon_pink`
- Thư mục ảnh theme: `public/images/themes/silk-ribbon-pink/` (6 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/silk_ribbon_pink/capabilities.json`
- `src/features/invitation/shell/specs/silk_ribbon_pink/demo.json`
- `src/features/invitation/shell/specs/silk_ribbon_pink/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/silk_ribbon_pink/Album.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Banquet.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Ceremony.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Credit.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Dress.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Footer.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Gifts.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Guestbook.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Hero.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/index.ts`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Lightbox.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Paper.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Schedule.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Section12.tsx`
- `src/features/invitation/shell/blocks/silk_ribbon_pink/Venue.tsx`

**Ảnh theme** (6)

- `public/images/themes/silk-ribbon-pink/flower-decoration.webp`
- `public/images/themes/silk-ribbon-pink/icon-alcohol.webp`
- `public/images/themes/silk-ribbon-pink/icon-candle.webp`
- `public/images/themes/silk-ribbon-pink/icon-ring.webp`
- `public/images/themes/silk-ribbon-pink/line-decoration.webp`
- `public/images/themes/silk-ribbon-pink/ribbon-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/silk_ribbon_pink.webp`

</details>

<details><summary>✅ <b>Long Phụng V4 - Đỏ</b> — <code>dragon_phoenix_v4_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/long-phung-v4-do/demo
- Họ khối: `traditional`
- Bộ sinh: `scripts/clone/gen_traditional.cjs`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `dragon_phoenix_v4_red`
- Thư mục ảnh theme: `public/images/themes/longphung-v4-red/` (18 file)
- Ghi chú: Đạt 0 lệch hình học theo AGENTS.md

**Spec** (3)

- `src/features/invitation/shell/specs/dragon_phoenix_v4_red/capabilities.json`
- `src/features/invitation/shell/specs/dragon_phoenix_v4_red/demo.json`
- `src/features/invitation/shell/specs/dragon_phoenix_v4_red/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/traditional/Album.tsx`
- `src/features/invitation/shell/blocks/traditional/Banquet.tsx`
- `src/features/invitation/shell/blocks/traditional/Dress.tsx`
- `src/features/invitation/shell/blocks/traditional/Family.tsx`
- `src/features/invitation/shell/blocks/traditional/Footer.tsx`
- `src/features/invitation/shell/blocks/traditional/Gifts.tsx`
- `src/features/invitation/shell/blocks/traditional/Guestbook.tsx`
- `src/features/invitation/shell/blocks/traditional/Hero.tsx`
- `src/features/invitation/shell/blocks/traditional/index.ts`
- `src/features/invitation/shell/blocks/traditional/Paper.tsx`
- `src/features/invitation/shell/blocks/traditional/Schedule.tsx`
- `src/features/invitation/shell/blocks/traditional/Venue.tsx`

**Ảnh theme** (18)

- `public/images/themes/longphung-v4-red/bg-texture.webp`
- `public/images/themes/longphung-v4-red/cake.webp`
- `public/images/themes/longphung-v4-red/cloud1.webp`
- `public/images/themes/longphung-v4-red/cloud2.webp`
- `public/images/themes/longphung-v4-red/cloud2b.webp`
- `public/images/themes/longphung-v4-red/cloud3.webp`
- `public/images/themes/longphung-v4-red/cloud4-bottom.webp`
- `public/images/themes/longphung-v4-red/double-happiness.webp`
- `public/images/themes/longphung-v4-red/dragon.webp`
- `public/images/themes/longphung-v4-red/dragon2.webp`
- `public/images/themes/longphung-v4-red/frame-avatar.webp`
- `public/images/themes/longphung-v4-red/heart.svg`
- `public/images/themes/longphung-v4-red/home.webp`
- `public/images/themes/longphung-v4-red/music.webp`
- `public/images/themes/longphung-v4-red/phoenix.webp`
- `public/images/themes/longphung-v4-red/phoenix2.webp`
- `public/images/themes/longphung-v4-red/songhy-background.webp`
- `public/images/themes/longphung-v4-red/title-frame.svg`

**Phong bì** (1)

- `public/images/envelope/dragon_phoenix_v4_red.webp`

**Dữ liệu khảo sát** (28)

- `docs/survey/blocks/dragon_phoenix_v4_red/_full390.jsx`
- `docs/survey/blocks/dragon_phoenix_v4_red/00.jsx`
- `docs/survey/blocks/dragon_phoenix_v4_red/01.jsx`
- `docs/survey/blocks/dragon_phoenix_v4_red/02.jsx`
- `docs/survey/blocks/dragon_phoenix_v4_red/03.jsx`
- `docs/survey/blocks/dragon_phoenix_v4_red/04.jsx`
- `docs/survey/blocks/dragon_phoenix_v4_red/05.jsx`
- `docs/survey/blocks/dragon_phoenix_v4_red/06.jsx`
- `docs/survey/blocks/dragon_phoenix_v4_red/07.jsx`
- `docs/survey/blocks/dragon_phoenix_v4_red/08.jsx`
- `docs/survey/blocks/dragon_phoenix_v4_red/09.jsx`
- `docs/survey/blocks/dragon_phoenix_v4_red/10.jsx`
- `docs/survey/raw/dragon_phoenix_v4_red_cover390.json`
- `docs/survey/raw/dragon_phoenix_v4_red_dump_cover_390.json`
- `docs/survey/raw/dragon_phoenix_v4_red_dump_gift_390.json`
- `docs/survey/raw/dragon_phoenix_v4_red_dump_openfull_1440.json`
- `docs/survey/raw/dragon_phoenix_v4_red_dump_openfull_390.json`
- `docs/survey/raw/dragon_phoenix_v4_red_dump_openfull_768.json`
- `docs/survey/raw/dragon_phoenix_v4_red_dump_open_1440.json`
- `docs/survey/raw/dragon_phoenix_v4_red_dump_open_390.json`
- `docs/survey/raw/dragon_phoenix_v4_red_dump_open_768.json`
- `docs/survey/raw/dragon_phoenix_v4_red_dump_rsvp_390.json`
- `docs/survey/raw/dragon_phoenix_v4_red_engine_css.json`
- `docs/survey/raw/dragon_phoenix_v4_red_engine_html.json`
- `docs/survey/raw/dragon_phoenix_v4_red_gift.json`
- `docs/survey/raw/dragon_phoenix_v4_red_open390.json`
- `docs/survey/raw/dragon_phoenix_v4_red_openSeq.json`
- `docs/survey/raw/dragon_phoenix_v4_red_open_html.json`

</details>

<details><summary>✅ <b>Liên Hoa V2 - Xanh</b> — <code>lien_hoa_v2_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/lien-hoa-v2-xanh/demo
- Họ khối: `lien_hoa_v2`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `lien_hoa_v2_green`
- Thư mục ảnh theme: `public/images/themes/lien-hoa-v2-green/` (10 file)

**Spec** (3)

- `src/features/invitation/shell/specs/lien_hoa_v2_green/capabilities.json`
- `src/features/invitation/shell/specs/lien_hoa_v2_green/demo.json`
- `src/features/invitation/shell/specs/lien_hoa_v2_green/theme.json`

**Khối** (16)

- `src/features/invitation/shell/blocks/lien_hoa_v2/Album.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Banquet.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/BottomDecor.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Credit.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Dress.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Family.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Footer.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Gifts.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Guestbook.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Hero.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/index.ts`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Lightbox.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Paper.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Rsvp.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Schedule.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_v2/Venue.tsx`

**Ảnh theme** (10)

- `public/images/themes/lien-hoa-v2-green/flower1.webp`
- `public/images/themes/lien-hoa-v2-green/flower10.webp`
- `public/images/themes/lien-hoa-v2-green/flower3.webp`
- `public/images/themes/lien-hoa-v2-green/flower4-bottom.webp`
- `public/images/themes/lien-hoa-v2-green/flower5.webp`
- `public/images/themes/lien-hoa-v2-green/flower6.webp`
- `public/images/themes/lien-hoa-v2-green/medallion-cake.webp`
- `public/images/themes/lien-hoa-v2-green/medallion-drink.webp`
- `public/images/themes/lien-hoa-v2-green/medallion-ring.webp`
- `public/images/themes/lien-hoa-v2-green/paper-texture.webp`

**Phong bì** (1)

- `public/images/envelope/lien_hoa_v2_green.webp`

**Dữ liệu khảo sát** (19)

- `docs/survey/blocks/lien_hoa_v2_green/00.html`
- `docs/survey/blocks/lien_hoa_v2_green/01.html`
- `docs/survey/blocks/lien_hoa_v2_green/02.html`
- `docs/survey/blocks/lien_hoa_v2_green/03.html`
- `docs/survey/blocks/lien_hoa_v2_green/04.html`
- `docs/survey/blocks/lien_hoa_v2_green/sub/00.html`
- `docs/survey/blocks/lien_hoa_v2_green/sub/01.html`
- `docs/survey/blocks/lien_hoa_v2_green/sub/02.html`
- `docs/survey/blocks/lien_hoa_v2_green/sub/03.html`
- `docs/survey/blocks/lien_hoa_v2_green/sub/04.html`
- `docs/survey/blocks/lien_hoa_v2_green/sub/05.html`
- `docs/survey/blocks/lien_hoa_v2_green/sub/06.html`
- `docs/survey/blocks/lien_hoa_v2_green/sub/07.html`
- `docs/survey/blocks/lien_hoa_v2_green/sub/08.html`
- `docs/survey/blocks/lien_hoa_v2_green/sub/09.html`
- `docs/survey/blocks/lien_hoa_v2_green/sub/10.html`
- `docs/survey/blocks/lien_hoa_v2_green/sub/11.html`
- `docs/survey/raw/lien_hoa_v2_green_dump_open_390.json`
- `docs/survey/raw/lien_hoa_v2_green_dump_open_768.json`

</details>

<details><summary>🟡 <b>Lâu Đài - Xanh</b> — <code>chateau_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/lau-dai-xanh/demo
- Họ khối: `chateau_green`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `chateau_green`
- Thư mục ảnh theme: `public/images/themes/chateau-green/` (15 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/chateau_green/capabilities.json`
- `src/features/invitation/shell/specs/chateau_green/demo.json`
- `src/features/invitation/shell/specs/chateau_green/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/chateau_green/Ceremony.tsx`
- `src/features/invitation/shell/blocks/chateau_green/Credit.tsx`
- `src/features/invitation/shell/blocks/chateau_green/Dress.tsx`
- `src/features/invitation/shell/blocks/chateau_green/Footer.tsx`
- `src/features/invitation/shell/blocks/chateau_green/Gifts.tsx`
- `src/features/invitation/shell/blocks/chateau_green/Guestbook.tsx`
- `src/features/invitation/shell/blocks/chateau_green/index.ts`
- `src/features/invitation/shell/blocks/chateau_green/Lightbox.tsx`
- `src/features/invitation/shell/blocks/chateau_green/Paper.tsx`
- `src/features/invitation/shell/blocks/chateau_green/Schedule.tsx`
- `src/features/invitation/shell/blocks/chateau_green/Section1.tsx`
- `src/features/invitation/shell/blocks/chateau_green/Venue.tsx`

**Ảnh theme** (15)

- `public/images/themes/chateau-green/barrier.webp`
- `public/images/themes/chateau-green/brick.webp`
- `public/images/themes/chateau-green/cay1-1.webp`
- `public/images/themes/chateau-green/cay2-1.webp`
- `public/images/themes/chateau-green/cay2-2.webp`
- `public/images/themes/chateau-green/chateau.webp`
- `public/images/themes/chateau-green/cloud-1.webp`
- `public/images/themes/chateau-green/cloud-2.webp`
- `public/images/themes/chateau-green/cloud-3.webp`
- `public/images/themes/chateau-green/divider-arrow.webp`
- `public/images/themes/chateau-green/fountain.webp`
- `public/images/themes/chateau-green/frame-lich.webp`
- `public/images/themes/chateau-green/hoanho2-1.webp`
- `public/images/themes/chateau-green/hoanho3-1.webp`
- `public/images/themes/chateau-green/ornament.webp`

**Phong bì** (1)

- `public/images/envelope/chateau_green.webp`

</details>

<details><summary>✅ <b>Vườn Xuân - Xanh</b> — <code>spring_garden_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/vuon-xuan-xanh/demo
- Họ khối: `springgarden_v1`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `spring_garden_green`
- Thư mục ảnh theme: `public/images/themes/nature/` (2 file)

**Spec** (3)

- `src/features/invitation/shell/specs/spring_garden_green/capabilities.json`
- `src/features/invitation/shell/specs/spring_garden_green/demo.json`
- `src/features/invitation/shell/specs/spring_garden_green/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/springgarden_v1/Album.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Dress.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Family.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Footer.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Gifts.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Guestbook.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Hero.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/index.ts`
- `src/features/invitation/shell/blocks/springgarden_v1/Lightbox.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Paper.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Schedule.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Venue.tsx`

**Ảnh theme** (2)

- `public/images/themes/nature/flower_paralax.webp`
- `public/images/themes/nature/flower_top.webp`

**Phong bì** (1)

- `public/images/envelope/spring_garden_green.webp`

**Dữ liệu khảo sát** (1)

- `docs/survey/raw/spring_garden_green_dump_open_390.json`

</details>

<details><summary>🟡 <b>Chibi - Đỏ</b> — <code>chibi_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/chibi-red/demo
- Họ khối: `chibi_red`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `chibi_red`
- Thư mục ảnh theme: `public/images/themes/chibi_red/` (7 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/chibi_red/capabilities.json`
- `src/features/invitation/shell/specs/chibi_red/demo.json`
- `src/features/invitation/shell/specs/chibi_red/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/chibi_red/Album.tsx`
- `src/features/invitation/shell/blocks/chibi_red/Banquet.tsx`
- `src/features/invitation/shell/blocks/chibi_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/chibi_red/Credit.tsx`
- `src/features/invitation/shell/blocks/chibi_red/Dress.tsx`
- `src/features/invitation/shell/blocks/chibi_red/Footer.tsx`
- `src/features/invitation/shell/blocks/chibi_red/Gifts.tsx`
- `src/features/invitation/shell/blocks/chibi_red/Guestbook.tsx`
- `src/features/invitation/shell/blocks/chibi_red/index.ts`
- `src/features/invitation/shell/blocks/chibi_red/Lightbox.tsx`
- `src/features/invitation/shell/blocks/chibi_red/Paper.tsx`
- `src/features/invitation/shell/blocks/chibi_red/Schedule.tsx`
- `src/features/invitation/shell/blocks/chibi_red/Section1.tsx`
- `src/features/invitation/shell/blocks/chibi_red/Venue.tsx`

**Ảnh theme** (7)

- `public/images/themes/chibi_red/cherry-blossom.webp`
- `public/images/themes/chibi_red/couple-main.webp`
- `public/images/themes/chibi_red/decorative-diamond.webp`
- `public/images/themes/chibi_red/decorative-dragon.webp`
- `public/images/themes/chibi_red/decorative-flowers.webp`
- `public/images/themes/chibi_red/decorative-header.webp`
- `public/images/themes/chibi_red/double-happiness.webp`

**Phong bì** (1)

- `public/images/envelope/chibi_red.webp`

</details>

<details><summary>🟡 <b>Song Hạc - Đỏ</b> — <code>song_hac_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/song-hac-do/demo
- Họ khối: `song_hac_red`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `song_hac_red`
- Thư mục ảnh theme: `public/images/themes/song-hac-red/` (16 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/song_hac_red/capabilities.json`
- `src/features/invitation/shell/specs/song_hac_red/demo.json`
- `src/features/invitation/shell/specs/song_hac_red/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/song_hac_red/Album.tsx`
- `src/features/invitation/shell/blocks/song_hac_red/Banquet.tsx`
- `src/features/invitation/shell/blocks/song_hac_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/song_hac_red/Dress.tsx`
- `src/features/invitation/shell/blocks/song_hac_red/Footer.tsx`
- `src/features/invitation/shell/blocks/song_hac_red/Gifts.tsx`
- `src/features/invitation/shell/blocks/song_hac_red/Guestbook.tsx`
- `src/features/invitation/shell/blocks/song_hac_red/Hero.tsx`
- `src/features/invitation/shell/blocks/song_hac_red/index.ts`
- `src/features/invitation/shell/blocks/song_hac_red/Paper.tsx`
- `src/features/invitation/shell/blocks/song_hac_red/Schedule.tsx`
- `src/features/invitation/shell/blocks/song_hac_red/Venue.tsx`

**Ảnh theme** (16)

- `public/images/themes/song-hac-red/bg-texture.webp`
- `public/images/themes/song-hac-red/bird-background.webp`
- `public/images/themes/song-hac-red/bird-decoration.webp`
- `public/images/themes/song-hac-red/cake.webp`
- `public/images/themes/song-hac-red/cloud-pattern.webp`
- `public/images/themes/song-hac-red/cloud1-bottom.webp`
- `public/images/themes/song-hac-red/cloud1-decoration.webp`
- `public/images/themes/song-hac-red/cloud2-decoration.webp`
- `public/images/themes/song-hac-red/double-happiness.webp`
- `public/images/themes/song-hac-red/flower1-decoration.webp`
- `public/images/themes/song-hac-red/heart.svg`
- `public/images/themes/song-hac-red/moon-decoration.webp`
- `public/images/themes/song-hac-red/ring.webp`
- `public/images/themes/song-hac-red/timeline-panel.webp`
- `public/images/themes/song-hac-red/water.webp`
- `public/images/themes/song-hac-red/white-frame.svg`

**Phong bì** (1)

- `public/images/envelope/song_hac_red.webp`

</details>

<details><summary>🟡 <b>Nhật Bình - Đỏ</b> — <code>nhat_binh_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/nhat-binh-do/demo
- Họ khối: `nhat_binh_red`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `nhat_binh_red`
- Thư mục ảnh theme: `public/images/themes/nhat-binh-red/` (9 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/nhat_binh_red/capabilities.json`
- `src/features/invitation/shell/specs/nhat_binh_red/demo.json`
- `src/features/invitation/shell/specs/nhat_binh_red/theme.json`

**Khối** (6)

- `src/features/invitation/shell/blocks/nhat_binh_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/nhat_binh_red/Credit.tsx`
- `src/features/invitation/shell/blocks/nhat_binh_red/Hero.tsx`
- `src/features/invitation/shell/blocks/nhat_binh_red/index.ts`
- `src/features/invitation/shell/blocks/nhat_binh_red/Lightbox.tsx`
- `src/features/invitation/shell/blocks/nhat_binh_red/Paper.tsx`

**Ảnh theme** (9)

- `public/images/themes/nhat-binh-red/chu-hy.webp`
- `public/images/themes/nhat-binh-red/corner.webp`
- `public/images/themes/nhat-binh-red/dau-re.webp`
- `public/images/themes/nhat-binh-red/hoa.webp`
- `public/images/themes/nhat-binh-red/long-den.webp`
- `public/images/themes/nhat-binh-red/may-to.webp`
- `public/images/themes/nhat-binh-red/may.webp`
- `public/images/themes/nhat-binh-red/paper.webp`
- `public/images/themes/nhat-binh-red/quat.webp`

**Phong bì** (1)

- `public/images/envelope/nhat_binh_red.webp`

</details>

<details><summary>✅ <b>Baroque V2 - Xanh Đậm</b> — <code>baroque_v2_darkgreen</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/baroque-v2-xanh-dam/demo
- Họ khối: `baroque_v2`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `baroque_v2_darkgreen`
- Thư mục ảnh theme: `public/images/themes/baroque-v2-dark-green/` (12 file)

**Spec** (3)

- `src/features/invitation/shell/specs/baroque_v2_darkgreen/capabilities.json`
- `src/features/invitation/shell/specs/baroque_v2_darkgreen/demo.json`
- `src/features/invitation/shell/specs/baroque_v2_darkgreen/theme.json`

**Khối** (17)

- `src/features/invitation/shell/blocks/baroque_v2/Album.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Banquet.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/BottomDecor.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Ceremony.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/DressCode.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Footer.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Gifts.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Guestbook.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Hero.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/index.ts`
- `src/features/invitation/shell/blocks/baroque_v2/Lightbox.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Paper.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/RsvpAction.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Schedule.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/ThankYou.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/themeVars.ts`
- `src/features/invitation/shell/blocks/baroque_v2/Venue.tsx`

**Ảnh theme** (12)

- `public/images/themes/baroque-v2-dark-green/alcohol.webp`
- `public/images/themes/baroque-v2-dark-green/bg.webp`
- `public/images/themes/baroque-v2-dark-green/bride-broom.webp`
- `public/images/themes/baroque-v2-dark-green/cake.webp`
- `public/images/themes/baroque-v2-dark-green/flower3-decoration.webp`
- `public/images/themes/baroque-v2-dark-green/flower4-decoration.webp`
- `public/images/themes/baroque-v2-dark-green/flower5-decoration.webp`
- `public/images/themes/baroque-v2-dark-green/frame.webp`
- `public/images/themes/baroque-v2-dark-green/golden-line-decoration.webp`
- `public/images/themes/baroque-v2-dark-green/line2-decoration.webp`
- `public/images/themes/baroque-v2-dark-green/line3-decoration.webp`
- `public/images/themes/baroque-v2-dark-green/line4-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/baroque_v2_darkgreen.webp`

**Dữ liệu khảo sát** (14)

- `docs/survey/blocks/baroque_v2_darkgreen/00.html`
- `docs/survey/blocks/baroque_v2_darkgreen/01.html`
- `docs/survey/blocks/baroque_v2_darkgreen/02.html`
- `docs/survey/blocks/baroque_v2_darkgreen/03.html`
- `docs/survey/blocks/baroque_v2_darkgreen/04.html`
- `docs/survey/blocks/baroque_v2_darkgreen/05.html`
- `docs/survey/blocks/baroque_v2_darkgreen/06.html`
- `docs/survey/blocks/baroque_v2_darkgreen/07.html`
- `docs/survey/blocks/baroque_v2_darkgreen/08.html`
- `docs/survey/blocks/baroque_v2_darkgreen/09.html`
- `docs/survey/blocks/baroque_v2_darkgreen/10.html`
- `docs/survey/blocks/baroque_v2_darkgreen/11.html`
- `docs/survey/raw/baroque_v2_darkgreen_demo_extracted.json`
- `docs/survey/raw/baroque_v2_darkgreen_dump_open_390.json`

</details>

<details><summary>✅ <b>Baroque V2 - Đỏ Đậm</b> — <code>baroque_v2_darkred</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/baroque-v2-do-dam/demo
- Họ khối: `baroque_v2`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `baroque_v2_darkred`
- Thư mục ảnh theme: `public/images/themes/baroque-v2-dark-red/` (12 file)

**Spec** (3)

- `src/features/invitation/shell/specs/baroque_v2_darkred/capabilities.json`
- `src/features/invitation/shell/specs/baroque_v2_darkred/demo.json`
- `src/features/invitation/shell/specs/baroque_v2_darkred/theme.json`

**Khối** (17)

- `src/features/invitation/shell/blocks/baroque_v2/Album.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Banquet.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/BottomDecor.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Ceremony.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/DressCode.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Footer.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Gifts.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Guestbook.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Hero.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/index.ts`
- `src/features/invitation/shell/blocks/baroque_v2/Lightbox.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Paper.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/RsvpAction.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Schedule.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/ThankYou.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/themeVars.ts`
- `src/features/invitation/shell/blocks/baroque_v2/Venue.tsx`

**Ảnh theme** (12)

- `public/images/themes/baroque-v2-dark-red/bg.webp`
- `public/images/themes/baroque-v2-dark-red/cake.webp`
- `public/images/themes/baroque-v2-dark-red/camera.webp`
- `public/images/themes/baroque-v2-dark-red/cook.webp`
- `public/images/themes/baroque-v2-dark-red/flower3-decoration.webp`
- `public/images/themes/baroque-v2-dark-red/flower4-decoration.webp`
- `public/images/themes/baroque-v2-dark-red/flower5-decoration.webp`
- `public/images/themes/baroque-v2-dark-red/frame.webp`
- `public/images/themes/baroque-v2-dark-red/golden-line-decoration.webp`
- `public/images/themes/baroque-v2-dark-red/line2-decoration.webp`
- `public/images/themes/baroque-v2-dark-red/line3-decoration.webp`
- `public/images/themes/baroque-v2-dark-red/line4-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/baroque_v2_darkred.webp`

**Dữ liệu khảo sát** (21)

- `docs/survey/blocks/baroque_v2_darkred/00.html`
- `docs/survey/blocks/baroque_v2_darkred/01.html`
- `docs/survey/blocks/baroque_v2_darkred/02.html`
- `docs/survey/blocks/baroque_v2_darkred/03.html`
- `docs/survey/blocks/baroque_v2_darkred/04.html`
- `docs/survey/blocks/baroque_v2_darkred/05.html`
- `docs/survey/blocks/baroque_v2_darkred/06.html`
- `docs/survey/blocks/baroque_v2_darkred/07.html`
- `docs/survey/blocks/baroque_v2_darkred/08.html`
- `docs/survey/blocks/baroque_v2_darkred/09.html`
- `docs/survey/blocks/baroque_v2_darkred/10.html`
- `docs/survey/blocks/baroque_v2_darkred/11.html`
- `docs/survey/raw/baroque_v2_darkred_cover390.json`
- `docs/survey/raw/baroque_v2_darkred_demo_extracted.json`
- `docs/survey/raw/baroque_v2_darkred_dump_open_390.json`
- `docs/survey/raw/baroque_v2_darkred_editor.json`
- `docs/survey/raw/baroque_v2_darkred_gift.json`
- `docs/survey/raw/baroque_v2_darkred_open1440.json`
- `docs/survey/raw/baroque_v2_darkred_open390.json`
- `docs/survey/raw/baroque_v2_darkred_open768.json`
- `docs/survey/raw/baroque_v2_darkred_openSeq.json`

</details>

<details><summary>🟡 <b>Anh Đào - Hồng</b> — <code>cherry_blossom_pink</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/anh-dao-hong/demo
- Họ khối: `cherry_blossom_pink`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `cherry_blossom_pink`
- Thư mục ảnh theme: `public/images/themes/anhdao-pink/` (4 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/cherry_blossom_pink/capabilities.json`
- `src/features/invitation/shell/specs/cherry_blossom_pink/demo.json`
- `src/features/invitation/shell/specs/cherry_blossom_pink/theme.json`

**Khối** (18)

- `src/features/invitation/shell/blocks/cherry_blossom_pink/Album.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Ceremony.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Credit.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Dress.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Footer.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Gifts.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Guestbook.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Hero.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/index.ts`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Lightbox.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Paper.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Schedule.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Section11.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Section12.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Section13.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Section14.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Section15.tsx`
- `src/features/invitation/shell/blocks/cherry_blossom_pink/Venue.tsx`

**Ảnh theme** (4)

- `public/images/themes/anhdao-pink/1.webp`
- `public/images/themes/anhdao-pink/2.webp`
- `public/images/themes/anhdao-pink/3.webp`
- `public/images/themes/anhdao-pink/bg-full.jpg`

**Phong bì** (1)

- `public/images/envelope/cherry_blossom_pink.webp`

</details>

<details><summary>✅ <b>Hoa Mộc - Hồng</b> — <code>boho_floral_pink</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-moc-hong/demo
- Họ khối: `boho_floral`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `boho_floral_pink`
- Thư mục ảnh theme: `public/boho-floral-pink/` (0 file)

**Spec** (3)

- `src/features/invitation/shell/specs/boho_floral_pink/capabilities.json`
- `src/features/invitation/shell/specs/boho_floral_pink/demo.json`
- `src/features/invitation/shell/specs/boho_floral_pink/theme.json`

**Khối** (20)

- `src/features/invitation/shell/blocks/boho_floral/Album.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Banquet.tsx`
- `src/features/invitation/shell/blocks/boho_floral/BanquetTitle.tsx`
- `src/features/invitation/shell/blocks/boho_floral/CeremonyTitle.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Credit.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Dresscode.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Family.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Footer.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Gifts.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Guestbook.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Hero.tsx`
- `src/features/invitation/shell/blocks/boho_floral/index.ts`
- `src/features/invitation/shell/blocks/boho_floral/Lightbox.tsx`
- `src/features/invitation/shell/blocks/boho_floral/MidDecor.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Rsvp.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Schedule.tsx`
- `src/features/invitation/shell/blocks/boho_floral/themeVars.ts`
- `src/features/invitation/shell/blocks/boho_floral/TopDecor.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Venue.tsx`
- `src/features/invitation/shell/blocks/boho_floral/VenueDecor.tsx`

**Phong bì** (1)

- `public/images/envelope/boho_floral_pink.webp`

</details>

<details><summary>✅ <b>Ren Thêu - Trắng</b> — <code>applique_lace_white</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/ren-theu-trang/demo
- Họ khối: `applique_lace_white`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `applique_lace_white`
- Thư mục ảnh theme: `public/images/themes/applique-lace-white/` (11 file)

**Spec** (3)

- `src/features/invitation/shell/specs/applique_lace_white/capabilities.json`
- `src/features/invitation/shell/specs/applique_lace_white/demo.json`
- `src/features/invitation/shell/specs/applique_lace_white/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/applique_lace_white/Album.tsx`
- `src/features/invitation/shell/blocks/applique_lace_white/Banquet.tsx`
- `src/features/invitation/shell/blocks/applique_lace_white/Ceremony.tsx`
- `src/features/invitation/shell/blocks/applique_lace_white/Credit.tsx`
- `src/features/invitation/shell/blocks/applique_lace_white/Dress.tsx`
- `src/features/invitation/shell/blocks/applique_lace_white/Footer.tsx`
- `src/features/invitation/shell/blocks/applique_lace_white/Gifts.tsx`
- `src/features/invitation/shell/blocks/applique_lace_white/Guestbook.tsx`
- `src/features/invitation/shell/blocks/applique_lace_white/index.ts`
- `src/features/invitation/shell/blocks/applique_lace_white/Lightbox.tsx`
- `src/features/invitation/shell/blocks/applique_lace_white/Paper.tsx`
- `src/features/invitation/shell/blocks/applique_lace_white/Schedule.tsx`
- `src/features/invitation/shell/blocks/applique_lace_white/Section1.tsx`
- `src/features/invitation/shell/blocks/applique_lace_white/Venue.tsx`

**Ảnh theme** (11)

- `public/images/themes/applique-lace-white/cake.webp`
- `public/images/themes/applique-lace-white/envelope-background.webp`
- `public/images/themes/applique-lace-white/envelope-cover.webp`
- `public/images/themes/applique-lace-white/flower.webp`
- `public/images/themes/applique-lace-white/guestbook-paper.webp`
- `public/images/themes/applique-lace-white/home.webp`
- `public/images/themes/applique-lace-white/lace1.webp`
- `public/images/themes/applique-lace-white/lace2.webp`
- `public/images/themes/applique-lace-white/lace3.webp`
- `public/images/themes/applique-lace-white/music.webp`
- `public/images/themes/applique-lace-white/satin-background.webp`

**Phong bì** (1)

- `public/images/envelope/applique_lace_white.webp`

**Dữ liệu khảo sát** (1)

- `docs/survey/raw/ren_theu_trang_real_cover.json`

</details>

<details><summary>🟡 <b>Hoa Lụa - Nâu</b> — <code>silk_flora_brown</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-lua-nau/demo
- Họ khối: `silk_flora_brown`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `silk_flora_brown`
- Thư mục ảnh theme: `public/images/themes/silkflora-brown/` (3 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/silk_flora_brown/capabilities.json`
- `src/features/invitation/shell/specs/silk_flora_brown/demo.json`
- `src/features/invitation/shell/specs/silk_flora_brown/theme.json`

**Khối** (13)

- `src/features/invitation/shell/blocks/silk_flora_brown/Ceremony.tsx`
- `src/features/invitation/shell/blocks/silk_flora_brown/Credit.tsx`
- `src/features/invitation/shell/blocks/silk_flora_brown/Dress.tsx`
- `src/features/invitation/shell/blocks/silk_flora_brown/Footer.tsx`
- `src/features/invitation/shell/blocks/silk_flora_brown/Gifts.tsx`
- `src/features/invitation/shell/blocks/silk_flora_brown/Guestbook.tsx`
- `src/features/invitation/shell/blocks/silk_flora_brown/index.ts`
- `src/features/invitation/shell/blocks/silk_flora_brown/Lightbox.tsx`
- `src/features/invitation/shell/blocks/silk_flora_brown/Paper.tsx`
- `src/features/invitation/shell/blocks/silk_flora_brown/Schedule.tsx`
- `src/features/invitation/shell/blocks/silk_flora_brown/Section1.tsx`
- `src/features/invitation/shell/blocks/silk_flora_brown/Section2.tsx`
- `src/features/invitation/shell/blocks/silk_flora_brown/Venue.tsx`

**Ảnh theme** (3)

- `public/images/themes/silkflora-brown/bottom.webp`
- `public/images/themes/silkflora-brown/middle.webp`
- `public/images/themes/silkflora-brown/top-flower.webp`

**Phong bì** (1)

- `public/images/envelope/silk_flora_brown.webp`

</details>

<details><summary>🟡 <b>Hoạ Tình - Đỏ</b> — <code>hoa_tinh_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-tinh-do/demo
- Họ khối: `hoa_tinh_red`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `hoa_tinh_red`
- Thư mục ảnh theme: `public/images/themes/love-art/` (13 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/hoa_tinh_red/capabilities.json`
- `src/features/invitation/shell/specs/hoa_tinh_red/demo.json`
- `src/features/invitation/shell/specs/hoa_tinh_red/theme.json`

**Khối** (5)

- `src/features/invitation/shell/blocks/hoa_tinh_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/hoa_tinh_red/Hero.tsx`
- `src/features/invitation/shell/blocks/hoa_tinh_red/index.ts`
- `src/features/invitation/shell/blocks/hoa_tinh_red/Lightbox.tsx`
- `src/features/invitation/shell/blocks/hoa_tinh_red/Paper.tsx`

**Ảnh theme** (13)

- `public/images/themes/love-art/3 tim.webp`
- `public/images/themes/love-art/bride frame.webp`
- `public/images/themes/love-art/dau ly.webp`
- `public/images/themes/love-art/dau.webp`
- `public/images/themes/love-art/groom frame.webp`
- `public/images/themes/love-art/hoa tim.webp`
- `public/images/themes/love-art/hy.webp`
- `public/images/themes/love-art/lich.webp`
- `public/images/themes/love-art/love.webp`
- `public/images/themes/love-art/re ly.webp`
- `public/images/themes/love-art/re.webp`
- `public/images/themes/love-art/thanks.webp`
- `public/images/themes/love-art/tim.webp`

**Phong bì** (1)

- `public/images/envelope/hoa_tinh_red.webp`

</details>

<details><summary>✅ <b>Vườn Xuân - Lam</b> — <code>spring_garden_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/vuon-xuan-lam/demo
- Họ khối: `springgarden_v1`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `spring_garden_blue`
- Thư mục ảnh theme: `public/images/themes/vuon xuan blue/` (3 file)

**Spec** (3)

- `src/features/invitation/shell/specs/spring_garden_blue/capabilities.json`
- `src/features/invitation/shell/specs/spring_garden_blue/demo.json`
- `src/features/invitation/shell/specs/spring_garden_blue/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/springgarden_v1/Album.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Dress.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Family.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Footer.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Gifts.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Guestbook.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Hero.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/index.ts`
- `src/features/invitation/shell/blocks/springgarden_v1/Lightbox.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Paper.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Schedule.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Venue.tsx`

**Ảnh theme** (3)

- `public/images/themes/vuon xuan blue/button.webp`
- `public/images/themes/vuon xuan blue/mid.webp`
- `public/images/themes/vuon xuan blue/top.webp`

**Phong bì** (1)

- `public/images/envelope/spring_garden_blue.webp`

**Dữ liệu khảo sát** (1)

- `docs/survey/raw/spring_garden_blue_dump_open_390.json`

</details>

<details><summary>✅ <b>Minimalism - Lam Đậm</b> — <code>minimalism_darkblue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/minimalism-lam-dam/demo
- Họ khối: `minimalism_darkblue`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `minimalism_darkblue`
- Thư mục ảnh theme: `public/images/themes/minimalism-darkblue/` (0 file)

**Spec** (3)

- `src/features/invitation/shell/specs/minimalism_darkblue/capabilities.json`
- `src/features/invitation/shell/specs/minimalism_darkblue/demo.json`
- `src/features/invitation/shell/specs/minimalism_darkblue/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/minimalism_darkblue/Album.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Banquet.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Ceremony.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Credit.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Dress.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Footer.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Gifts.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Guestbook.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Hero.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/index.ts`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Lightbox.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Paper.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Schedule.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Section11.tsx`
- `src/features/invitation/shell/blocks/minimalism_darkblue/Venue.tsx`

**Phong bì** (1)

- `public/images/envelope/minimalism_darkblue.webp`

**Dữ liệu khảo sát** (1)

- `docs/survey/raw/minimalism_darkblue_dump_open_390.json`

</details>

<details><summary>🟡 <b>Hoàng Kim - Đỏ</b> — <code>royal_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoang-kim-do/demo
- Họ khối: `royal_red`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `royal_red`
- Thư mục ảnh theme: `public/images/themes/royal-red/` (5 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/royal_red/capabilities.json`
- `src/features/invitation/shell/specs/royal_red/demo.json`
- `src/features/invitation/shell/specs/royal_red/theme.json`

**Khối** (13)

- `src/features/invitation/shell/blocks/royal_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/royal_red/Credit.tsx`
- `src/features/invitation/shell/blocks/royal_red/Dress.tsx`
- `src/features/invitation/shell/blocks/royal_red/Footer.tsx`
- `src/features/invitation/shell/blocks/royal_red/Gifts.tsx`
- `src/features/invitation/shell/blocks/royal_red/Guestbook.tsx`
- `src/features/invitation/shell/blocks/royal_red/Hero.tsx`
- `src/features/invitation/shell/blocks/royal_red/index.ts`
- `src/features/invitation/shell/blocks/royal_red/Lightbox.tsx`
- `src/features/invitation/shell/blocks/royal_red/Paper.tsx`
- `src/features/invitation/shell/blocks/royal_red/Schedule.tsx`
- `src/features/invitation/shell/blocks/royal_red/Section1.tsx`
- `src/features/invitation/shell/blocks/royal_red/Venue.tsx`

**Ảnh theme** (5)

- `public/images/themes/royal-red/background.webp`
- `public/images/themes/royal-red/flower.webp`
- `public/images/themes/royal-red/frame-corner-top-left.webp`
- `public/images/themes/royal-red/frame-middle-horizontal.webp`
- `public/images/themes/royal-red/frame-middle-vertical.webp`

</details>

<details><summary>✅ <b>Minimalism - Đỏ</b> — <code>minimalism_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/minimalism-do/demo
- Họ khối: `minimalism_red`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `minimalism_red`
- Thư mục ảnh theme: `public/images/themes/minimalism-red/` (2 file)

**Spec** (3)

- `src/features/invitation/shell/specs/minimalism_red/capabilities.json`
- `src/features/invitation/shell/specs/minimalism_red/demo.json`
- `src/features/invitation/shell/specs/minimalism_red/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/minimalism_red/Album.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/Banquet.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/BanquetBanner.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/CeremonyBanner.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/Credit.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/Dress.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/Footer.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/Gifts.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/Guestbook.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/Hero.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/index.ts`
- `src/features/invitation/shell/blocks/minimalism_red/Paper.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/Schedule.tsx`
- `src/features/invitation/shell/blocks/minimalism_red/Venue.tsx`

**Ảnh theme** (2)

- `public/images/themes/minimalism-red/header-bottom-01.png`
- `public/images/themes/minimalism-red/header-top-01.png`

**Phong bì** (1)

- `public/images/envelope/minimalism_red.webp`

**Dữ liệu khảo sát** (1)

- `docs/survey/raw/minimalism_red_dump_open_390.json`

</details>

<details><summary>✅ <b>Vườn Xuân - Đỏ</b> — <code>spring_garden_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/vuon-xuan-do/demo
- Họ khối: `springgarden_v1`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `spring_garden_red`
- Thư mục ảnh theme: `public/images/themes/vuon xuan red/` (6 file)

**Spec** (3)

- `src/features/invitation/shell/specs/spring_garden_red/capabilities.json`
- `src/features/invitation/shell/specs/spring_garden_red/demo.json`
- `src/features/invitation/shell/specs/spring_garden_red/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/springgarden_v1/Album.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Dress.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Family.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Footer.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Gifts.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Guestbook.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Hero.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/index.ts`
- `src/features/invitation/shell/blocks/springgarden_v1/Lightbox.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Paper.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Schedule.tsx`
- `src/features/invitation/shell/blocks/springgarden_v1/Venue.tsx`

**Ảnh theme** (6)

- `public/images/themes/vuon xuan red/1 left.webp`
- `public/images/themes/vuon xuan red/2 right.webp`
- `public/images/themes/vuon xuan red/3 left.webp`
- `public/images/themes/vuon xuan red/4 right.webp`
- `public/images/themes/vuon xuan red/button left.webp`
- `public/images/themes/vuon xuan red/top right.webp`

**Phong bì** (1)

- `public/images/envelope/spring_garden_red.webp`

**Dữ liệu khảo sát** (20)

- `docs/survey/blocks/spring_garden_red/00.html`
- `docs/survey/blocks/spring_garden_red/00.jsx`
- `docs/survey/blocks/spring_garden_red/01.html`
- `docs/survey/blocks/spring_garden_red/01.jsx`
- `docs/survey/blocks/spring_garden_red/02.html`
- `docs/survey/blocks/spring_garden_red/02.jsx`
- `docs/survey/blocks/spring_garden_red/03.html`
- `docs/survey/blocks/spring_garden_red/03.jsx`
- `docs/survey/blocks/spring_garden_red/04.html`
- `docs/survey/blocks/spring_garden_red/04.jsx`
- `docs/survey/blocks/spring_garden_red/05.html`
- `docs/survey/blocks/spring_garden_red/05.jsx`
- `docs/survey/blocks/spring_garden_red/06.html`
- `docs/survey/blocks/spring_garden_red/06.jsx`
- `docs/survey/blocks/spring_garden_red/07.html`
- `docs/survey/blocks/spring_garden_red/07.jsx`
- `docs/survey/blocks/spring_garden_red/08.html`
- `docs/survey/blocks/spring_garden_red/08.jsx`
- `docs/survey/raw/spring_garden_red_demo_extracted.json`
- `docs/survey/raw/spring_garden_red_dump_open_390.json`

</details>

<details><summary>✅ <b>Long Phụng - Xanh</b> — <code>dragon_phoenix_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/long-phung-xanh/demo
- Họ khối: `longphung_v1`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `dragon_phoenix_green`
- Thư mục ảnh theme: `public/images/themes/red-v1/` (4 file)

**Spec** (3)

- `src/features/invitation/shell/specs/dragon_phoenix_green/capabilities.json`
- `src/features/invitation/shell/specs/dragon_phoenix_green/demo.json`
- `src/features/invitation/shell/specs/dragon_phoenix_green/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/longphung_v1/Album.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Dress.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Family.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Footer.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Gifts.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Guestbook.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Hero.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/index.ts`
- `src/features/invitation/shell/blocks/longphung_v1/Lightbox.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Paper.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Schedule.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Venue.tsx`

**Ảnh theme** (4)

- `public/images/themes/red-v1/bg-main.webp`
- `public/images/themes/red-v1/line6.svg`
- `public/images/themes/red-v1/phuong.webp`
- `public/images/themes/red-v1/rong.webp`

**Dữ liệu khảo sát** (1)

- `docs/survey/raw/dragon_phoenix_green_dump_open_390.json`

</details>

<details><summary>🟡 <b>Baroque - Vàng</b> — <code>baroque_gold</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoang-gia-vang/demo
- Họ khối: `baroque_gold`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `baroque_gold`
- Thư mục ảnh theme: `public/images/themes/baroque-gold/` (8 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/baroque_gold/capabilities.json`
- `src/features/invitation/shell/specs/baroque_gold/demo.json`
- `src/features/invitation/shell/specs/baroque_gold/theme.json`

**Khối** (11)

- `src/features/invitation/shell/blocks/baroque_gold/Ceremony.tsx`
- `src/features/invitation/shell/blocks/baroque_gold/Credit.tsx`
- `src/features/invitation/shell/blocks/baroque_gold/Dress.tsx`
- `src/features/invitation/shell/blocks/baroque_gold/Footer.tsx`
- `src/features/invitation/shell/blocks/baroque_gold/Guestbook.tsx`
- `src/features/invitation/shell/blocks/baroque_gold/index.ts`
- `src/features/invitation/shell/blocks/baroque_gold/Lightbox.tsx`
- `src/features/invitation/shell/blocks/baroque_gold/Paper.tsx`
- `src/features/invitation/shell/blocks/baroque_gold/Schedule.tsx`
- `src/features/invitation/shell/blocks/baroque_gold/Section1.tsx`
- `src/features/invitation/shell/blocks/baroque_gold/Venue.tsx`

**Ảnh theme** (8)

- `public/images/themes/baroque-gold/bg.webp`
- `public/images/themes/baroque-gold/hoa-tiet-1.webp`
- `public/images/themes/baroque-gold/hoa-tiet-3.webp`
- `public/images/themes/baroque-gold/hoa.webp`
- `public/images/themes/baroque-gold/khung-lich.webp`
- `public/images/themes/baroque-gold/khung.webp`
- `public/images/themes/baroque-gold/pattern-decoration.webp`
- `public/images/themes/baroque-gold/tru.webp`

**Phong bì** (1)

- `public/images/envelope/baroque_gold.webp`

</details>

<details><summary>🟡 <b>Lâu Đài - Lam</b> — <code>chateau_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/lau-dai-lam/demo
- Họ khối: `chateau_blue`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `chateau_blue`
- Thư mục ảnh theme: `public/images/themes/chateau-blue/` (13 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/chateau_blue/capabilities.json`
- `src/features/invitation/shell/specs/chateau_blue/demo.json`
- `src/features/invitation/shell/specs/chateau_blue/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/chateau_blue/Ceremony.tsx`
- `src/features/invitation/shell/blocks/chateau_blue/Credit.tsx`
- `src/features/invitation/shell/blocks/chateau_blue/Dress.tsx`
- `src/features/invitation/shell/blocks/chateau_blue/Footer.tsx`
- `src/features/invitation/shell/blocks/chateau_blue/Gifts.tsx`
- `src/features/invitation/shell/blocks/chateau_blue/Guestbook.tsx`
- `src/features/invitation/shell/blocks/chateau_blue/index.ts`
- `src/features/invitation/shell/blocks/chateau_blue/Lightbox.tsx`
- `src/features/invitation/shell/blocks/chateau_blue/Paper.tsx`
- `src/features/invitation/shell/blocks/chateau_blue/Schedule.tsx`
- `src/features/invitation/shell/blocks/chateau_blue/Section1.tsx`
- `src/features/invitation/shell/blocks/chateau_blue/Section6.tsx`
- `src/features/invitation/shell/blocks/chateau_blue/Section9.tsx`
- `src/features/invitation/shell/blocks/chateau_blue/Venue.tsx`

**Ảnh theme** (13)

- `public/images/themes/chateau-blue/asset-1.webp`
- `public/images/themes/chateau-blue/asset-2.webp`
- `public/images/themes/chateau-blue/ban-tiec.webp`
- `public/images/themes/chateau-blue/chim.webp`
- `public/images/themes/chateau-blue/cloud-1.webp`
- `public/images/themes/chateau-blue/cloud-2.webp`
- `public/images/themes/chateau-blue/cloud-3.webp`
- `public/images/themes/chateau-blue/frame-lich.webp`
- `public/images/themes/chateau-blue/hoa-ngang.webp`
- `public/images/themes/chateau-blue/hoa.webp`
- `public/images/themes/chateau-blue/home.webp`
- `public/images/themes/chateau-blue/nen.webp`
- `public/images/themes/chateau-blue/nhan.webp`

**Phong bì** (1)

- `public/images/envelope/chateau_blue.webp`

</details>

<details><summary>🟡 <b>Song Phụng - Xanh</b> — <code>double_phoenix_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/song-phung-xanh/demo
- Họ khối: `double_phoenix_green`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `double_phoenix_green`
- Thư mục ảnh theme: `public/images/themes/songphung-green/` (6 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/double_phoenix_green/capabilities.json`
- `src/features/invitation/shell/specs/double_phoenix_green/demo.json`
- `src/features/invitation/shell/specs/double_phoenix_green/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/double_phoenix_green/Ceremony.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/Credit.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/Dress.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/Footer.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/Gifts.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/Guestbook.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/Hero.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/index.ts`
- `src/features/invitation/shell/blocks/double_phoenix_green/Paper.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/Schedule.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/Section1.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/Section2.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/Section3.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/Section4.tsx`
- `src/features/invitation/shell/blocks/double_phoenix_green/Venue.tsx`

**Ảnh theme** (6)

- `public/images/themes/songphung-green/CHU HY.webp`
- `public/images/themes/songphung-green/HOA.webp`
- `public/images/themes/songphung-green/NENGIAY.jpg`
- `public/images/themes/songphung-green/Phuong 2.webp`
- `public/images/themes/songphung-green/Phuong line.webp`
- `public/images/themes/songphung-green/Phuong.webp`

**Phong bì** (1)

- `public/images/envelope/double_phoenix_green.webp`

</details>

<details><summary>✅ <b>Hoa Mộc - Nâu</b> — <code>boho_floral_brown</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-moc-nau/demo
- Họ khối: `boho_floral`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `boho_floral_brown`
- Thư mục ảnh theme: `public/boho-floral-brown/` (0 file)

**Spec** (3)

- `src/features/invitation/shell/specs/boho_floral_brown/capabilities.json`
- `src/features/invitation/shell/specs/boho_floral_brown/demo.json`
- `src/features/invitation/shell/specs/boho_floral_brown/theme.json`

**Khối** (20)

- `src/features/invitation/shell/blocks/boho_floral/Album.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Banquet.tsx`
- `src/features/invitation/shell/blocks/boho_floral/BanquetTitle.tsx`
- `src/features/invitation/shell/blocks/boho_floral/CeremonyTitle.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Credit.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Dresscode.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Family.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Footer.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Gifts.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Guestbook.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Hero.tsx`
- `src/features/invitation/shell/blocks/boho_floral/index.ts`
- `src/features/invitation/shell/blocks/boho_floral/Lightbox.tsx`
- `src/features/invitation/shell/blocks/boho_floral/MidDecor.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Rsvp.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Schedule.tsx`
- `src/features/invitation/shell/blocks/boho_floral/themeVars.ts`
- `src/features/invitation/shell/blocks/boho_floral/TopDecor.tsx`
- `src/features/invitation/shell/blocks/boho_floral/Venue.tsx`
- `src/features/invitation/shell/blocks/boho_floral/VenueDecor.tsx`

**Phong bì** (1)

- `public/images/envelope/boho_floral_brown.webp`

</details>

<details><summary>✅ <b>Song Long - Lam</b> — <code>double_dragon_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/song-long-lam/demo
- Họ khối: `double_dragon`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `double_dragon_blue`
- Thư mục ảnh theme: `public/songlong-red/` (0 file)

**Spec** (3)

- `src/features/invitation/shell/specs/double_dragon_blue/capabilities.json`
- `src/features/invitation/shell/specs/double_dragon_blue/demo.json`
- `src/features/invitation/shell/specs/double_dragon_blue/theme.json`

**Khối** (17)

- `src/features/invitation/shell/blocks/double_dragon/Album.tsx`
- `src/features/invitation/shell/blocks/double_dragon/AlbumTitle.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Banquet.tsx`
- `src/features/invitation/shell/blocks/double_dragon/BanquetTitle.tsx`
- `src/features/invitation/shell/blocks/double_dragon/CeremonyTitle.tsx`
- `src/features/invitation/shell/blocks/double_dragon/DressSchedule.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Family.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Footer.tsx`
- `src/features/invitation/shell/blocks/double_dragon/FooterDecor.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Gifts.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Guestbook.tsx`
- `src/features/invitation/shell/blocks/double_dragon/GuestbookTitle.tsx`
- `src/features/invitation/shell/blocks/double_dragon/HeaderDecor.tsx`
- `src/features/invitation/shell/blocks/double_dragon/Hero.tsx`
- `src/features/invitation/shell/blocks/double_dragon/index.ts`
- `src/features/invitation/shell/blocks/double_dragon/themeVars.ts`
- `src/features/invitation/shell/blocks/double_dragon/Venue.tsx`

**Phong bì** (1)

- `public/images/envelope/double_dragon_blue.webp`

**Dữ liệu khảo sát** (17)

- `docs/survey/blocks/double_dragon_blue/00.html`
- `docs/survey/blocks/double_dragon_blue/01.html`
- `docs/survey/blocks/double_dragon_blue/02.html`
- `docs/survey/blocks/double_dragon_blue/03.html`
- `docs/survey/blocks/double_dragon_blue/04.html`
- `docs/survey/blocks/double_dragon_blue/05.html`
- `docs/survey/blocks/double_dragon_blue/06.html`
- `docs/survey/blocks/double_dragon_blue/07.html`
- `docs/survey/blocks/double_dragon_blue/08.html`
- `docs/survey/blocks/double_dragon_blue/09.html`
- `docs/survey/blocks/double_dragon_blue/10.html`
- `docs/survey/blocks/double_dragon_blue/11.html`
- `docs/survey/blocks/double_dragon_blue/12.html`
- `docs/survey/blocks/double_dragon_blue/13.html`
- `docs/survey/blocks/double_dragon_blue/14.html`
- `docs/survey/raw/double_dragon_blue_demo_extracted.json`
- `docs/survey/raw/double_dragon_blue_dump_open_390.json`

</details>

<details><summary>🟡 <b>Vườn Kính - Xanh Nhạt</b> — <code>glass_garden_light_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/vuonkinh-xanh-nhat/demo
- Họ khối: `glass_garden_light_green`
- Thư mục ảnh theme: `public/images/themes/glass-garden-light-green/` (9 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo); thiếu cấu hình bìa trong coverConfigs.ts

**Spec** (3)

- `src/features/invitation/shell/specs/glass_garden_light_green/capabilities.json`
- `src/features/invitation/shell/specs/glass_garden_light_green/demo.json`
- `src/features/invitation/shell/specs/glass_garden_light_green/theme.json`

**Khối** (5)

- `src/features/invitation/shell/blocks/glass_garden_light_green/Ceremony.tsx`
- `src/features/invitation/shell/blocks/glass_garden_light_green/index.ts`
- `src/features/invitation/shell/blocks/glass_garden_light_green/Lightbox.tsx`
- `src/features/invitation/shell/blocks/glass_garden_light_green/Paper.tsx`
- `src/features/invitation/shell/blocks/glass_garden_light_green/Section1.tsx`

**Ảnh theme** (9)

- `public/images/themes/glass-garden-light-green/cake.webp`
- `public/images/themes/glass-garden-light-green/calendar-heart.webp`
- `public/images/themes/glass-garden-light-green/coming.webp`
- `public/images/themes/glass-garden-light-green/leaf1-background.webp`
- `public/images/themes/glass-garden-light-green/leaf2-background.webp`
- `public/images/themes/glass-garden-light-green/leaf3-decoration.webp`
- `public/images/themes/glass-garden-light-green/leaf4-decoration.webp`
- `public/images/themes/glass-garden-light-green/leaf5-bottom.webp`
- `public/images/themes/glass-garden-light-green/water.webp`

**Phong bì** (1)

- `public/images/envelope/glass_garden_light_green.webp`

</details>

<details><summary>✅ <b>Hoa Thuỷ Tinh - Lam</b> — <code>crystal_floral_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-thuy-tinh-lam/demo
- Họ khối: `crystal_floral`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `crystal_floral_blue`
- Thư mục ảnh theme: `public/images/themes/crystal-floral-blue/` (10 file)

**Spec** (3)

- `src/features/invitation/shell/specs/crystal_floral_blue/capabilities.json`
- `src/features/invitation/shell/specs/crystal_floral_blue/demo.json`
- `src/features/invitation/shell/specs/crystal_floral_blue/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/crystal_floral/BottomDecor.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Ceremony.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/DressCode.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Footer.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Gifts.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Guestbook.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Hero.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/index.ts`
- `src/features/invitation/shell/blocks/crystal_floral/Lightbox.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Schedule.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/ThankYou.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/themeVars.ts`
- `src/features/invitation/shell/blocks/crystal_floral/TopDecor.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Venue.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Watermark.tsx`

**Ảnh theme** (10)

- `public/images/themes/crystal-floral-blue/cake.webp`
- `public/images/themes/crystal-floral-blue/calendar-frame.webp`
- `public/images/themes/crystal-floral-blue/filigree.webp`
- `public/images/themes/crystal-floral-blue/flower-frame.webp`
- `public/images/themes/crystal-floral-blue/flower1.webp`
- `public/images/themes/crystal-floral-blue/flower2.webp`
- `public/images/themes/crystal-floral-blue/flower3.webp`
- `public/images/themes/crystal-floral-blue/flower4.webp`
- `public/images/themes/crystal-floral-blue/flower5.webp`
- `public/images/themes/crystal-floral-blue/gift.webp`

**Phong bì** (1)

- `public/images/envelope/crystal_floral_blue.webp`

**Dữ liệu khảo sát** (20)

- `docs/survey/blocks/crystal_floral_blue/00.html`
- `docs/survey/blocks/crystal_floral_blue/01.html`
- `docs/survey/blocks/crystal_floral_blue/02.html`
- `docs/survey/blocks/crystal_floral_blue/03.html`
- `docs/survey/blocks/crystal_floral_blue/04.html`
- `docs/survey/blocks/crystal_floral_blue/05.html`
- `docs/survey/blocks/crystal_floral_blue/06.html`
- `docs/survey/blocks/crystal_floral_blue/07.html`
- `docs/survey/blocks/crystal_floral_blue/08.html`
- `docs/survey/blocks/crystal_floral_blue/09.html`
- `docs/survey/blocks/crystal_floral_blue/10.html`
- `docs/survey/blocks/crystal_floral_blue/11.html`
- `docs/survey/blocks/crystal_floral_blue/12.html`
- `docs/survey/blocks/crystal_floral_blue/13.html`
- `docs/survey/raw/crystal_floral_blue_accounts.json`
- `docs/survey/raw/crystal_floral_blue_demo_extracted.json`
- `docs/survey/raw/crystal_floral_blue_dump_open_390.json`
- `docs/survey/raw/crystal_floral_blue_photos.json`
- `docs/survey/raw/crystal_floral_blue_wishes.json`
- `docs/survey/raw/crystal_floral_blue_wm.json`

</details>

<details><summary>✅ <b>Long Phụng - Lam</b> — <code>dragon_phoenix_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/long-phung-lam/demo
- Họ khối: `longphung_v1`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `dragon_phoenix_blue`
- Thư mục ảnh theme: `public/images/themes/red-v1/` (4 file)

**Spec** (3)

- `src/features/invitation/shell/specs/dragon_phoenix_blue/capabilities.json`
- `src/features/invitation/shell/specs/dragon_phoenix_blue/demo.json`
- `src/features/invitation/shell/specs/dragon_phoenix_blue/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/longphung_v1/Album.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Dress.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Family.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Footer.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Gifts.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Guestbook.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Hero.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/index.ts`
- `src/features/invitation/shell/blocks/longphung_v1/Lightbox.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Paper.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Schedule.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Venue.tsx`

**Ảnh theme** (4)

- `public/images/themes/red-v1/bg-main.webp`
- `public/images/themes/red-v1/line6.svg`
- `public/images/themes/red-v1/phuong.webp`
- `public/images/themes/red-v1/rong.webp`

**Dữ liệu khảo sát** (1)

- `docs/survey/raw/dragon_phoenix_blue_dump_open_390.json`

</details>

<details><summary>🟡 <b>Cô Ba - Đỏ</b> — <code>co_ba_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/co-ba-do/demo
- Họ khối: `co_ba_red`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `co_ba_red`
- Thư mục ảnh theme: `public/images/themes/coba-red/` (2 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/co_ba_red/capabilities.json`
- `src/features/invitation/shell/specs/co_ba_red/demo.json`
- `src/features/invitation/shell/specs/co_ba_red/theme.json`

**Khối** (6)

- `src/features/invitation/shell/blocks/co_ba_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/co_ba_red/Credit.tsx`
- `src/features/invitation/shell/blocks/co_ba_red/Hero.tsx`
- `src/features/invitation/shell/blocks/co_ba_red/index.ts`
- `src/features/invitation/shell/blocks/co_ba_red/Lightbox.tsx`
- `src/features/invitation/shell/blocks/co_ba_red/Paper.tsx`

**Ảnh theme** (2)

- `public/images/themes/coba-red/cho-ben-thanh.webp`
- `public/images/themes/coba-red/dau-re.webp`

**Phong bì** (1)

- `public/images/envelope/co_ba_red.webp`

</details>

<details><summary>🟡 <b>Liên Hoa - Hồng</b> — <code>lien_hoa_pink</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/lien-hoa-hong/demo
- Họ khối: `lien_hoa_pink`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `lien_hoa_pink`
- Thư mục ảnh theme: `public/images/themes/lien-hoa-pink/` (13 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/lien_hoa_pink/capabilities.json`
- `src/features/invitation/shell/specs/lien_hoa_pink/demo.json`
- `src/features/invitation/shell/specs/lien_hoa_pink/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/lien_hoa_pink/Banquet.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_pink/Ceremony.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_pink/Dress.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_pink/Footer.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_pink/Gifts.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_pink/Guestbook.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_pink/index.ts`
- `src/features/invitation/shell/blocks/lien_hoa_pink/Lightbox.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_pink/Paper.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_pink/Schedule.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_pink/Section1.tsx`
- `src/features/invitation/shell/blocks/lien_hoa_pink/Venue.tsx`

**Ảnh theme** (13)

- `public/images/themes/lien-hoa-pink/calendar-frame.webp`
- `public/images/themes/lien-hoa-pink/flower-bottom.webp`
- `public/images/themes/lien-hoa-pink/flower2.webp`
- `public/images/themes/lien-hoa-pink/flower3.webp`
- `public/images/themes/lien-hoa-pink/flower4.webp`
- `public/images/themes/lien-hoa-pink/framegold1.webp`
- `public/images/themes/lien-hoa-pink/framegold2.webp`
- `public/images/themes/lien-hoa-pink/golden-line.webp`
- `public/images/themes/lien-hoa-pink/hoa-sen-bg.webp`
- `public/images/themes/lien-hoa-pink/leaf.webp`
- `public/images/themes/lien-hoa-pink/medallion-alcohol.webp`
- `public/images/themes/lien-hoa-pink/medallion-guest.webp`
- `public/images/themes/lien-hoa-pink/medallion-opening.webp`

**Phong bì** (1)

- `public/images/envelope/lien_hoa_pink.webp`

</details>

<details><summary>✅ <b>Minimalism - Tím</b> — <code>minimalism_purple</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/minimalism-tim/demo
- Họ khối: `minimalism_purple`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `minimalism_purple`
- Thư mục ảnh theme: `public/images/themes/minimalism-purple/` (13 file)

**Spec** (3)

- `src/features/invitation/shell/specs/minimalism_purple/capabilities.json`
- `src/features/invitation/shell/specs/minimalism_purple/demo.json`
- `src/features/invitation/shell/specs/minimalism_purple/theme.json`

**Khối** (16)

- `src/features/invitation/shell/blocks/minimalism_purple/Album.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/Banquet.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/BottomDecor.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/Credit.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/Dress.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/Family.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/Footer.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/Gifts.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/Guestbook.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/Hero.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/index.ts`
- `src/features/invitation/shell/blocks/minimalism_purple/Lightbox.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/Paper.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/Rsvp.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/Schedule.tsx`
- `src/features/invitation/shell/blocks/minimalism_purple/Venue.tsx`

**Ảnh theme** (13)

- `public/images/themes/minimalism-purple/cake.webp`
- `public/images/themes/minimalism-purple/church.webp`
- `public/images/themes/minimalism-purple/envelope-background.webp`
- `public/images/themes/minimalism-purple/envelope-cover.webp`
- `public/images/themes/minimalism-purple/flower-decoration.webp`
- `public/images/themes/minimalism-purple/flower1-decoration.webp`
- `public/images/themes/minimalism-purple/flower3-decoration.webp`
- `public/images/themes/minimalism-purple/flower4-decoration.webp`
- `public/images/themes/minimalism-purple/flower4b-decoration.webp`
- `public/images/themes/minimalism-purple/flowerbottom-decoration.webp`
- `public/images/themes/minimalism-purple/house-background.webp`
- `public/images/themes/minimalism-purple/music.webp`
- `public/images/themes/minimalism-purple/paper.webp`

**Phong bì** (1)

- `public/images/envelope/minimalism_purple.webp`

</details>

<details><summary>✅ <b>Bạch Sứ V2 - Xanh</b> — <code>porcelain_v2_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/bach-su-v2-xanh/demo
- Họ khối: `porcelain_v2`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `porcelain_v2_green`
- Thư mục ảnh theme: `public/images/themes/porcelain-v2-green/` (6 file)

**Spec** (3)

- `src/features/invitation/shell/specs/porcelain_v2_green/capabilities.json`
- `src/features/invitation/shell/specs/porcelain_v2_green/demo.json`
- `src/features/invitation/shell/specs/porcelain_v2_green/theme.json`

**Khối** (11)

- `src/features/invitation/shell/blocks/porcelain_v2/Album.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Banquet.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Dress.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Family.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Guestbook.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Hero.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/index.ts`
- `src/features/invitation/shell/blocks/porcelain_v2/Lightbox.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Paper.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Schedule.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Venue.tsx`

**Ảnh theme** (6)

- `public/images/themes/porcelain-v2-green/alcohol.webp`
- `public/images/themes/porcelain-v2-green/floral-tile.webp`
- `public/images/themes/porcelain-v2-green/flower.webp`
- `public/images/themes/porcelain-v2-green/heart.webp`
- `public/images/themes/porcelain-v2-green/hero-frame.webp`
- `public/images/themes/porcelain-v2-green/ring.webp`

**Phong bì** (1)

- `public/images/envelope/porcelain_v2_green.webp`

**Dữ liệu khảo sát** (22)

- `docs/survey/blocks/porcelain_v2_green/00.html`
- `docs/survey/blocks/porcelain_v2_green/00.jsx`
- `docs/survey/blocks/porcelain_v2_green/01.html`
- `docs/survey/blocks/porcelain_v2_green/01.jsx`
- `docs/survey/blocks/porcelain_v2_green/02.html`
- `docs/survey/blocks/porcelain_v2_green/02.jsx`
- `docs/survey/blocks/porcelain_v2_green/03.html`
- `docs/survey/blocks/porcelain_v2_green/03.jsx`
- `docs/survey/blocks/porcelain_v2_green/04.html`
- `docs/survey/blocks/porcelain_v2_green/04.jsx`
- `docs/survey/blocks/porcelain_v2_green/05.html`
- `docs/survey/blocks/porcelain_v2_green/05.jsx`
- `docs/survey/blocks/porcelain_v2_green/06.html`
- `docs/survey/blocks/porcelain_v2_green/06.jsx`
- `docs/survey/blocks/porcelain_v2_green/07.html`
- `docs/survey/blocks/porcelain_v2_green/07.jsx`
- `docs/survey/blocks/porcelain_v2_green/bg_decor.html`
- `docs/survey/blocks/porcelain_v2_green/bg_decor.jsx`
- `docs/survey/blocks/porcelain_v2_green/modal.html`
- `docs/survey/blocks/porcelain_v2_green/modal.jsx`
- `docs/survey/raw/porcelain_v2_green_dump_open_390.json`
- `docs/survey/raw/porcelain_v2_green_extracted_meta.json`

</details>

<details><summary>🟡 <b>Hoa Khô V2 - Xanh</b> — <code>dried_flower_v2_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-kho-v2-xanh/demo
- Họ khối: `dried_flower_v2_green`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `dried_flower_v2_green`
- Thư mục ảnh theme: `public/images/themes/dried-flower-v2-green/` (11 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/dried_flower_v2_green/capabilities.json`
- `src/features/invitation/shell/specs/dried_flower_v2_green/demo.json`
- `src/features/invitation/shell/specs/dried_flower_v2_green/theme.json`

**Khối** (13)

- `src/features/invitation/shell/blocks/dried_flower_v2_green/Album.tsx`
- `src/features/invitation/shell/blocks/dried_flower_v2_green/Banquet.tsx`
- `src/features/invitation/shell/blocks/dried_flower_v2_green/Ceremony.tsx`
- `src/features/invitation/shell/blocks/dried_flower_v2_green/Dress.tsx`
- `src/features/invitation/shell/blocks/dried_flower_v2_green/Footer.tsx`
- `src/features/invitation/shell/blocks/dried_flower_v2_green/Gifts.tsx`
- `src/features/invitation/shell/blocks/dried_flower_v2_green/Guestbook.tsx`
- `src/features/invitation/shell/blocks/dried_flower_v2_green/Hero.tsx`
- `src/features/invitation/shell/blocks/dried_flower_v2_green/index.ts`
- `src/features/invitation/shell/blocks/dried_flower_v2_green/Lightbox.tsx`
- `src/features/invitation/shell/blocks/dried_flower_v2_green/Paper.tsx`
- `src/features/invitation/shell/blocks/dried_flower_v2_green/Schedule.tsx`
- `src/features/invitation/shell/blocks/dried_flower_v2_green/Venue.tsx`

**Ảnh theme** (11)

- `public/images/themes/dried-flower-v2-green/cake.webp`
- `public/images/themes/dried-flower-v2-green/calendar-heart.svg`
- `public/images/themes/dried-flower-v2-green/flower.webp`
- `public/images/themes/dried-flower-v2-green/flower2.webp`
- `public/images/themes/dried-flower-v2-green/flower3.webp`
- `public/images/themes/dried-flower-v2-green/flower4.webp`
- `public/images/themes/dried-flower-v2-green/flower6.webp`
- `public/images/themes/dried-flower-v2-green/leaf.webp`
- `public/images/themes/dried-flower-v2-green/letter.webp`
- `public/images/themes/dried-flower-v2-green/paper.webp`
- `public/images/themes/dried-flower-v2-green/ring.webp`

**Phong bì** (1)

- `public/images/envelope/dried_flower_v2_green.webp`

</details>

<details><summary>✅ <b>Bạch Sứ V2 - Hồng</b> — <code>porcelain_v2_pink</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/bach-su-v2-hong/demo
- Họ khối: `porcelain_v2`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `porcelain_v2_pink`
- Thư mục ảnh theme: `public/images/themes/porcelain-v2-pink/` (6 file)

**Spec** (3)

- `src/features/invitation/shell/specs/porcelain_v2_pink/capabilities.json`
- `src/features/invitation/shell/specs/porcelain_v2_pink/demo.json`
- `src/features/invitation/shell/specs/porcelain_v2_pink/theme.json`

**Khối** (11)

- `src/features/invitation/shell/blocks/porcelain_v2/Album.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Banquet.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Dress.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Family.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Guestbook.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Hero.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/index.ts`
- `src/features/invitation/shell/blocks/porcelain_v2/Lightbox.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Paper.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Schedule.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Venue.tsx`

**Ảnh theme** (6)

- `public/images/themes/porcelain-v2-pink/bell.webp`
- `public/images/themes/porcelain-v2-pink/bird.webp`
- `public/images/themes/porcelain-v2-pink/floral-tile.webp`
- `public/images/themes/porcelain-v2-pink/flower.webp`
- `public/images/themes/porcelain-v2-pink/hero-frame.webp`
- `public/images/themes/porcelain-v2-pink/ring.webp`

**Phong bì** (1)

- `public/images/envelope/porcelain_v2_pink.webp`

**Dữ liệu khảo sát** (2)

- `docs/survey/raw/porcelain_v2_pink_dump_open_390.json`
- `docs/survey/raw/porcelain_v2_pink_extracted_meta.json`

</details>

<details><summary>🟡 <b>Hoa Khô V2 - Lam</b> — <code>hoa_kho_v2_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-kho-v2-lam/demo
- Họ khối: `hoa_kho_v2_blue`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `hoa_kho_v2_blue`
- Thư mục ảnh theme: `public/images/themes/hoa-kho-v2-blue/` (11 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/hoa_kho_v2_blue/capabilities.json`
- `src/features/invitation/shell/specs/hoa_kho_v2_blue/demo.json`
- `src/features/invitation/shell/specs/hoa_kho_v2_blue/theme.json`

**Khối** (13)

- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/Album.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/Banquet.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/Ceremony.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/Dress.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/Footer.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/Gifts.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/Guestbook.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/Hero.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/index.ts`
- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/Lightbox.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/Paper.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/Schedule.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_v2_blue/Venue.tsx`

**Ảnh theme** (11)

- `public/images/themes/hoa-kho-v2-blue/bird.webp`
- `public/images/themes/hoa-kho-v2-blue/butterfly.webp`
- `public/images/themes/hoa-kho-v2-blue/calendar-heart.svg`
- `public/images/themes/hoa-kho-v2-blue/flower.webp`
- `public/images/themes/hoa-kho-v2-blue/flower3.webp`
- `public/images/themes/hoa-kho-v2-blue/flower4.webp`
- `public/images/themes/hoa-kho-v2-blue/flower5.webp`
- `public/images/themes/hoa-kho-v2-blue/flower6.webp`
- `public/images/themes/hoa-kho-v2-blue/flower7.webp`
- `public/images/themes/hoa-kho-v2-blue/medallion-flower.webp`
- `public/images/themes/hoa-kho-v2-blue/ring.webp`

**Phong bì** (1)

- `public/images/envelope/hoa_kho_v2_blue.webp`

</details>

<details><summary>✅ <b>Long Phụng - Huyền</b> — <code>dragon_phoenix_black</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/long-phung-huyen/demo
- Họ khối: `longphung_v1`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `dragon_phoenix_black`
- Thư mục ảnh theme: `public/images/themes/red-v1/` (4 file)

**Spec** (3)

- `src/features/invitation/shell/specs/dragon_phoenix_black/capabilities.json`
- `src/features/invitation/shell/specs/dragon_phoenix_black/demo.json`
- `src/features/invitation/shell/specs/dragon_phoenix_black/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/longphung_v1/Album.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Dress.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Family.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Footer.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Gifts.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Guestbook.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Hero.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/index.ts`
- `src/features/invitation/shell/blocks/longphung_v1/Lightbox.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Paper.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Schedule.tsx`
- `src/features/invitation/shell/blocks/longphung_v1/Venue.tsx`

**Ảnh theme** (4)

- `public/images/themes/red-v1/bg-main.webp`
- `public/images/themes/red-v1/line6.svg`
- `public/images/themes/red-v1/phuong.webp`
- `public/images/themes/red-v1/rong.webp`

**Dữ liệu khảo sát** (1)

- `docs/survey/raw/dragon_phoenix_black_dump_open_390.json`

</details>

<details><summary>🟡 <b>Hoàng Kim II - Xanh</b> — <code>royal_v2_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoang-kim-ii-xanh/demo
- Họ khối: `royal_v2_green`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `royal_v2_green`
- Thư mục ảnh theme: `public/images/themes/royal-v2-green/` (12 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/royal_v2_green/capabilities.json`
- `src/features/invitation/shell/specs/royal_v2_green/demo.json`
- `src/features/invitation/shell/specs/royal_v2_green/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/royal_v2_green/Album.tsx`
- `src/features/invitation/shell/blocks/royal_v2_green/Banquet.tsx`
- `src/features/invitation/shell/blocks/royal_v2_green/Ceremony.tsx`
- `src/features/invitation/shell/blocks/royal_v2_green/Dress.tsx`
- `src/features/invitation/shell/blocks/royal_v2_green/Footer.tsx`
- `src/features/invitation/shell/blocks/royal_v2_green/Gifts.tsx`
- `src/features/invitation/shell/blocks/royal_v2_green/Guestbook.tsx`
- `src/features/invitation/shell/blocks/royal_v2_green/index.ts`
- `src/features/invitation/shell/blocks/royal_v2_green/Lightbox.tsx`
- `src/features/invitation/shell/blocks/royal_v2_green/Paper.tsx`
- `src/features/invitation/shell/blocks/royal_v2_green/Schedule.tsx`
- `src/features/invitation/shell/blocks/royal_v2_green/Section1.tsx`
- `src/features/invitation/shell/blocks/royal_v2_green/Section5.tsx`
- `src/features/invitation/shell/blocks/royal_v2_green/Venue.tsx`

**Ảnh theme** (12)

- `public/images/themes/royal-v2-green/background.webp`
- `public/images/themes/royal-v2-green/cake.webp`
- `public/images/themes/royal-v2-green/calendar-heart.webp`
- `public/images/themes/royal-v2-green/flower1-decoration.webp`
- `public/images/themes/royal-v2-green/flower2-decoration.webp`
- `public/images/themes/royal-v2-green/flower3-decoration.webp`
- `public/images/themes/royal-v2-green/flower4-bottom.webp`
- `public/images/themes/royal-v2-green/flower5-decoration.webp`
- `public/images/themes/royal-v2-green/golden-line.webp`
- `public/images/themes/royal-v2-green/leaf-decoration.webp`
- `public/images/themes/royal-v2-green/ring.webp`
- `public/images/themes/royal-v2-green/welcome.webp`

**Phong bì** (1)

- `public/images/envelope/royal_v2_green.webp`

</details>

<details><summary>🟡 <b>Hoàng Kim - Xanh</b> — <code>royal_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoang-kim-xanh/demo
- Họ khối: `royal_green`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `royal_green`
- Thư mục ảnh theme: `public/images/themes/royal-green/` (5 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/royal_green/capabilities.json`
- `src/features/invitation/shell/specs/royal_green/demo.json`
- `src/features/invitation/shell/specs/royal_green/theme.json`

**Khối** (13)

- `src/features/invitation/shell/blocks/royal_green/Ceremony.tsx`
- `src/features/invitation/shell/blocks/royal_green/Credit.tsx`
- `src/features/invitation/shell/blocks/royal_green/Dress.tsx`
- `src/features/invitation/shell/blocks/royal_green/Footer.tsx`
- `src/features/invitation/shell/blocks/royal_green/Gifts.tsx`
- `src/features/invitation/shell/blocks/royal_green/Guestbook.tsx`
- `src/features/invitation/shell/blocks/royal_green/Hero.tsx`
- `src/features/invitation/shell/blocks/royal_green/index.ts`
- `src/features/invitation/shell/blocks/royal_green/Lightbox.tsx`
- `src/features/invitation/shell/blocks/royal_green/Paper.tsx`
- `src/features/invitation/shell/blocks/royal_green/Schedule.tsx`
- `src/features/invitation/shell/blocks/royal_green/Section1.tsx`
- `src/features/invitation/shell/blocks/royal_green/Venue.tsx`

**Ảnh theme** (5)

- `public/images/themes/royal-green/background.webp`
- `public/images/themes/royal-green/flower.webp`
- `public/images/themes/royal-green/frame-corner-top-left.webp`
- `public/images/themes/royal-green/frame-middle-horizontal.webp`
- `public/images/themes/royal-green/frame-middle-vertical.webp`

</details>

<details><summary>🟡 <b>Baroque - Lam</b> — <code>baroque_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/baroque-lam/demo
- Họ khối: `baroque_blue`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `baroque_blue`
- Thư mục ảnh theme: `public/images/themes/baroque-blue/` (13 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/baroque_blue/capabilities.json`
- `src/features/invitation/shell/specs/baroque_blue/demo.json`
- `src/features/invitation/shell/specs/baroque_blue/theme.json`

**Khối** (13)

- `src/features/invitation/shell/blocks/baroque_blue/Album.tsx`
- `src/features/invitation/shell/blocks/baroque_blue/Banquet.tsx`
- `src/features/invitation/shell/blocks/baroque_blue/Ceremony.tsx`
- `src/features/invitation/shell/blocks/baroque_blue/Dress.tsx`
- `src/features/invitation/shell/blocks/baroque_blue/Footer.tsx`
- `src/features/invitation/shell/blocks/baroque_blue/Gifts.tsx`
- `src/features/invitation/shell/blocks/baroque_blue/Guestbook.tsx`
- `src/features/invitation/shell/blocks/baroque_blue/index.ts`
- `src/features/invitation/shell/blocks/baroque_blue/Lightbox.tsx`
- `src/features/invitation/shell/blocks/baroque_blue/Paper.tsx`
- `src/features/invitation/shell/blocks/baroque_blue/Schedule.tsx`
- `src/features/invitation/shell/blocks/baroque_blue/Section1.tsx`
- `src/features/invitation/shell/blocks/baroque_blue/Venue.tsx`

**Ảnh theme** (13)

- `public/images/themes/baroque-blue/bg-pattern.webp`
- `public/images/themes/baroque-blue/calendar-frame.webp`
- `public/images/themes/baroque-blue/frame-decoration.webp`
- `public/images/themes/baroque-blue/gold4-decoration.webp`
- `public/images/themes/baroque-blue/gold5-decoration.webp`
- `public/images/themes/baroque-blue/gold6-decoration.webp`
- `public/images/themes/baroque-blue/goldline-decoration.webp`
- `public/images/themes/baroque-blue/goldline2-decoration.webp`
- `public/images/themes/baroque-blue/line-decoration.webp`
- `public/images/themes/baroque-blue/medallion-bird.webp`
- `public/images/themes/baroque-blue/medallion-cake.webp`
- `public/images/themes/baroque-blue/medallion-ring.webp`
- `public/images/themes/baroque-blue/pillars-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/baroque_blue.webp`

</details>

<details><summary>🟡 <b>Bạch Sứ - Nâu</b> — <code>porcelain_brown</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/bach-su-nau/demo
- Họ khối: `porcelain_brown`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `porcelain_brown`
- Thư mục ảnh theme: `public/images/themes/porcelain-brown/` (6 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/porcelain_brown/capabilities.json`
- `src/features/invitation/shell/specs/porcelain_brown/demo.json`
- `src/features/invitation/shell/specs/porcelain_brown/theme.json`

**Khối** (4)

- `src/features/invitation/shell/blocks/porcelain_brown/Ceremony.tsx`
- `src/features/invitation/shell/blocks/porcelain_brown/index.ts`
- `src/features/invitation/shell/blocks/porcelain_brown/Lightbox.tsx`
- `src/features/invitation/shell/blocks/porcelain_brown/Paper.tsx`

**Ảnh theme** (6)

- `public/images/themes/porcelain-brown/cake.webp`
- `public/images/themes/porcelain-brown/calendar-texture.webp`
- `public/images/themes/porcelain-brown/floral-tile.webp`
- `public/images/themes/porcelain-brown/frame-background.webp`
- `public/images/themes/porcelain-brown/home.webp`
- `public/images/themes/porcelain-brown/music.webp`

**Phong bì** (1)

- `public/images/envelope/porcelain_brown.webp`

</details>

<details><summary>✅ <b>Hoa Thuỷ Tinh - Đỏ</b> — <code>crystal_floral_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-thuy-tinh-do/demo
- Họ khối: `crystal_floral`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `crystal_floral_red`
- Thư mục ảnh theme: `public/images/themes/crystal-floral-red/` (11 file)

**Spec** (3)

- `src/features/invitation/shell/specs/crystal_floral_red/capabilities.json`
- `src/features/invitation/shell/specs/crystal_floral_red/demo.json`
- `src/features/invitation/shell/specs/crystal_floral_red/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/crystal_floral/BottomDecor.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Ceremony.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/DressCode.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Footer.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Gifts.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Guestbook.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Hero.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/index.ts`
- `src/features/invitation/shell/blocks/crystal_floral/Lightbox.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Schedule.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/ThankYou.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/themeVars.ts`
- `src/features/invitation/shell/blocks/crystal_floral/TopDecor.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Venue.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Watermark.tsx`

**Ảnh theme** (11)

- `public/images/themes/crystal-floral-red/calendar-frame.webp`
- `public/images/themes/crystal-floral-red/filigree.webp`
- `public/images/themes/crystal-floral-red/flower-frame.webp`
- `public/images/themes/crystal-floral-red/flower1.webp`
- `public/images/themes/crystal-floral-red/flower2.webp`
- `public/images/themes/crystal-floral-red/flower3.webp`
- `public/images/themes/crystal-floral-red/flower4.webp`
- `public/images/themes/crystal-floral-red/flower5.webp`
- `public/images/themes/crystal-floral-red/flowericon.webp`
- `public/images/themes/crystal-floral-red/map.webp`
- `public/images/themes/crystal-floral-red/ring.webp`

**Phong bì** (1)

- `public/images/envelope/crystal_floral_red.webp`

**Dữ liệu khảo sát** (20)

- `docs/survey/blocks/crystal_floral_red/00.html`
- `docs/survey/blocks/crystal_floral_red/01.html`
- `docs/survey/blocks/crystal_floral_red/02.html`
- `docs/survey/blocks/crystal_floral_red/03.html`
- `docs/survey/blocks/crystal_floral_red/04.html`
- `docs/survey/blocks/crystal_floral_red/05.html`
- `docs/survey/blocks/crystal_floral_red/06.html`
- `docs/survey/blocks/crystal_floral_red/07.html`
- `docs/survey/blocks/crystal_floral_red/08.html`
- `docs/survey/blocks/crystal_floral_red/09.html`
- `docs/survey/blocks/crystal_floral_red/10.html`
- `docs/survey/blocks/crystal_floral_red/11.html`
- `docs/survey/blocks/crystal_floral_red/12.html`
- `docs/survey/blocks/crystal_floral_red/13.html`
- `docs/survey/raw/crystal_floral_red_accounts.json`
- `docs/survey/raw/crystal_floral_red_demo_extracted.json`
- `docs/survey/raw/crystal_floral_red_dump_open_390.json`
- `docs/survey/raw/crystal_floral_red_photos.json`
- `docs/survey/raw/crystal_floral_red_wishes.json`
- `docs/survey/raw/crystal_floral_red_wm.json`

</details>

<details><summary>🟡 <b>Hoàng Kim - Lam</b> — <code>royal_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoang-kim-lam/demo
- Họ khối: `royal_blue`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `royal_blue`
- Thư mục ảnh theme: `public/images/themes/royal-blue/` (5 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/royal_blue/capabilities.json`
- `src/features/invitation/shell/specs/royal_blue/demo.json`
- `src/features/invitation/shell/specs/royal_blue/theme.json`

**Khối** (13)

- `src/features/invitation/shell/blocks/royal_blue/Ceremony.tsx`
- `src/features/invitation/shell/blocks/royal_blue/Credit.tsx`
- `src/features/invitation/shell/blocks/royal_blue/Dress.tsx`
- `src/features/invitation/shell/blocks/royal_blue/Footer.tsx`
- `src/features/invitation/shell/blocks/royal_blue/Gifts.tsx`
- `src/features/invitation/shell/blocks/royal_blue/Guestbook.tsx`
- `src/features/invitation/shell/blocks/royal_blue/Hero.tsx`
- `src/features/invitation/shell/blocks/royal_blue/index.ts`
- `src/features/invitation/shell/blocks/royal_blue/Lightbox.tsx`
- `src/features/invitation/shell/blocks/royal_blue/Paper.tsx`
- `src/features/invitation/shell/blocks/royal_blue/Schedule.tsx`
- `src/features/invitation/shell/blocks/royal_blue/Section1.tsx`
- `src/features/invitation/shell/blocks/royal_blue/Venue.tsx`

**Ảnh theme** (5)

- `public/images/themes/royal-blue/background.webp`
- `public/images/themes/royal-blue/flower.webp`
- `public/images/themes/royal-blue/frame-corner-top-left.webp`
- `public/images/themes/royal-blue/frame-middle-horizontal.webp`
- `public/images/themes/royal-blue/frame-middle-vertical.webp`

</details>

<details><summary>✅ <b>Riviera - Lam</b> — <code>riviera_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/riviera-lam/demo
- Họ khối: `riviera`
- Bộ sinh: `scripts/clone/gen_riviera.cjs`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `riviera_blue`
- Thư mục ảnh theme: `public/images/themes/riviera-blue/` (24 file)
- Ghi chú: Đạt 0 lệch hình học theo AGENTS.md

**Spec** (3)

- `src/features/invitation/shell/specs/riviera_blue/capabilities.json`
- `src/features/invitation/shell/specs/riviera_blue/demo.json`
- `src/features/invitation/shell/specs/riviera_blue/theme.json`

**Khối** (17)

- `src/features/invitation/shell/blocks/riviera/Album.tsx`
- `src/features/invitation/shell/blocks/riviera/Banquet.tsx`
- `src/features/invitation/shell/blocks/riviera/Credit.tsx`
- `src/features/invitation/shell/blocks/riviera/Dress.tsx`
- `src/features/invitation/shell/blocks/riviera/Family.tsx`
- `src/features/invitation/shell/blocks/riviera/Gifts.tsx`
- `src/features/invitation/shell/blocks/riviera/Guestbook.tsx`
- `src/features/invitation/shell/blocks/riviera/Hero.tsx`
- `src/features/invitation/shell/blocks/riviera/index.ts`
- `src/features/invitation/shell/blocks/riviera/Lightbox.tsx`
- `src/features/invitation/shell/blocks/riviera/LineDecoration.tsx`
- `src/features/invitation/shell/blocks/riviera/Paper.tsx`
- `src/features/invitation/shell/blocks/riviera/RsvpBridge.tsx`
- `src/features/invitation/shell/blocks/riviera/Schedule.tsx`
- `src/features/invitation/shell/blocks/riviera/Stone.tsx`
- `src/features/invitation/shell/blocks/riviera/Thanks.tsx`
- `src/features/invitation/shell/blocks/riviera/Venue.tsx`

**Ảnh theme** (24)

- `public/images/themes/riviera-blue/bird.webp`
- `public/images/themes/riviera-blue/bridge.webp`
- `public/images/themes/riviera-blue/calendar-frame.webp`
- `public/images/themes/riviera-blue/cloud-2.webp`
- `public/images/themes/riviera-blue/cloud-3.webp`
- `public/images/themes/riviera-blue/envelope-scene.webp`
- `public/images/themes/riviera-blue/flower-dress.webp`
- `public/images/themes/riviera-blue/flower-hero.webp`
- `public/images/themes/riviera-blue/flower-spray.webp`
- `public/images/themes/riviera-blue/fountain.webp`
- `public/images/themes/riviera-blue/gate.webp`
- `public/images/themes/riviera-blue/guestbook-frame.webp`
- `public/images/themes/riviera-blue/lake.webp`
- `public/images/themes/riviera-blue/leaf.webp`
- `public/images/themes/riviera-blue/line-decoration-2.webp`
- `public/images/themes/riviera-blue/line-decoration-3.webp`
- `public/images/themes/riviera-blue/line-decoration.webp`
- `public/images/themes/riviera-blue/mountain.webp`
- `public/images/themes/riviera-blue/paper-background.webp`
- `public/images/themes/riviera-blue/ship.webp`
- `public/images/themes/riviera-blue/stone.webp`
- `public/images/themes/riviera-blue/swing.webp`
- `public/images/themes/riviera-blue/tree.webp`
- `public/images/themes/riviera-blue/village.webp`

**Phong bì** (1)

- `public/images/envelope/riviera_blue.webp`

**Dữ liệu khảo sát** (38)

- `docs/survey/blocks/riviera_blue/_full390.jsx`
- `docs/survey/blocks/riviera_blue/00.jsx`
- `docs/survey/blocks/riviera_blue/01.jsx`
- `docs/survey/blocks/riviera_blue/02.jsx`
- `docs/survey/blocks/riviera_blue/03.jsx`
- `docs/survey/blocks/riviera_blue/04.jsx`
- `docs/survey/blocks/riviera_blue/05.jsx`
- `docs/survey/blocks/riviera_blue/06.jsx`
- `docs/survey/blocks/riviera_blue/07.jsx`
- `docs/survey/blocks/riviera_blue/08.jsx`
- `docs/survey/blocks/riviera_blue/09.jsx`
- `docs/survey/blocks/riviera_blue/10.jsx`
- `docs/survey/blocks/riviera_blue/11.jsx`
- `docs/survey/blocks/riviera_blue/12.jsx`
- `docs/survey/blocks/riviera_blue/13.jsx`
- `docs/survey/blocks/riviera_blue/14.jsx`
- `docs/survey/blocks/riviera_blue/15.jsx`
- `docs/survey/raw/riviera_blue_cover390.json`
- `docs/survey/raw/riviera_blue_dump_cover_390.json`
- `docs/survey/raw/riviera_blue_dump_gift_390.json`
- `docs/survey/raw/riviera_blue_dump_openfull_1440.json`
- `docs/survey/raw/riviera_blue_dump_openfull_390.json`
- `docs/survey/raw/riviera_blue_dump_openfull_768.json`
- `docs/survey/raw/riviera_blue_dump_open_1440.json`
- `docs/survey/raw/riviera_blue_dump_open_390.json`
- `docs/survey/raw/riviera_blue_dump_open_768.json`
- `docs/survey/raw/riviera_blue_dump_rsvp_390.json`
- `docs/survey/raw/riviera_blue_engine_css.json`
- `docs/survey/raw/riviera_blue_engine_html.json`
- `docs/survey/raw/riviera_blue_gift.json`
- `docs/survey/raw/riviera_blue_open1440.json`
- `docs/survey/raw/riviera_blue_open390.json`
- `docs/survey/raw/riviera_blue_open768.json`
- `docs/survey/raw/riviera_blue_openSeq.json`
- `docs/survey/raw/riviera_blue_open_html.json`
- `docs/survey/raw/riviera_blue_parallax.json`
- `docs/survey/raw/riviera_blue_parallax2.json`
- `docs/survey/raw/riviera_blue_parallax2_1440.json`

</details>

<details><summary>🟡 <b>Florence - Nâu</b> — <code>florence_brown</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/florence-nau/demo
- Họ khối: `florence_brown`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `florence_brown`
- Thư mục ảnh theme: `public/images/themes/florence-brown/` (19 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/florence_brown/capabilities.json`
- `src/features/invitation/shell/specs/florence_brown/demo.json`
- `src/features/invitation/shell/specs/florence_brown/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/florence_brown/Album.tsx`
- `src/features/invitation/shell/blocks/florence_brown/Banquet.tsx`
- `src/features/invitation/shell/blocks/florence_brown/Ceremony.tsx`
- `src/features/invitation/shell/blocks/florence_brown/Credit.tsx`
- `src/features/invitation/shell/blocks/florence_brown/Dress.tsx`
- `src/features/invitation/shell/blocks/florence_brown/Footer.tsx`
- `src/features/invitation/shell/blocks/florence_brown/Gifts.tsx`
- `src/features/invitation/shell/blocks/florence_brown/Guestbook.tsx`
- `src/features/invitation/shell/blocks/florence_brown/index.ts`
- `src/features/invitation/shell/blocks/florence_brown/Lightbox.tsx`
- `src/features/invitation/shell/blocks/florence_brown/Paper.tsx`
- `src/features/invitation/shell/blocks/florence_brown/Schedule.tsx`
- `src/features/invitation/shell/blocks/florence_brown/Section1.tsx`
- `src/features/invitation/shell/blocks/florence_brown/Venue.tsx`

**Ảnh theme** (19)

- `public/images/themes/florence-brown/bird.webp`
- `public/images/themes/florence-brown/bridge-background.webp`
- `public/images/themes/florence-brown/bridge-decoration.webp`
- `public/images/themes/florence-brown/bridge-decoration3.webp`
- `public/images/themes/florence-brown/cake.webp`
- `public/images/themes/florence-brown/cathedral-envelope.webp`
- `public/images/themes/florence-brown/church-decoration.webp`
- `public/images/themes/florence-brown/church2-decoration.webp`
- `public/images/themes/florence-brown/cloud1-background.webp`
- `public/images/themes/florence-brown/cloud2-background.webp`
- `public/images/themes/florence-brown/cloud3-background.webp`
- `public/images/themes/florence-brown/house-decoration.webp`
- `public/images/themes/florence-brown/house2-background.webp`
- `public/images/themes/florence-brown/house2-decoration.webp`
- `public/images/themes/florence-brown/house4-decoration.webp`
- `public/images/themes/florence-brown/ring.webp`
- `public/images/themes/florence-brown/scene-decoration.webp`
- `public/images/themes/florence-brown/scene2-decoration.webp`
- `public/images/themes/florence-brown/tree-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/florence_brown.webp`

**Dữ liệu khảo sát** (7)

- `docs/survey/raw/florence_brown_cover390.json`
- `docs/survey/raw/florence_brown_editor.json`
- `docs/survey/raw/florence_brown_gift.json`
- `docs/survey/raw/florence_brown_open1440.json`
- `docs/survey/raw/florence_brown_open390.json`
- `docs/survey/raw/florence_brown_open768.json`
- `docs/survey/raw/florence_brown_openSeq.json`

</details>

<details><summary>✅ <b>Baroque V2 - Lam Đậm</b> — <code>baroque_v2_darkblue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/baroque-v2-lam-dam/demo
- Họ khối: `baroque_v2`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `baroque_v2_darkblue`
- Thư mục ảnh theme: `public/images/themes/baroque-v2-dark-blue/` (12 file)

**Spec** (3)

- `src/features/invitation/shell/specs/baroque_v2_darkblue/capabilities.json`
- `src/features/invitation/shell/specs/baroque_v2_darkblue/demo.json`
- `src/features/invitation/shell/specs/baroque_v2_darkblue/theme.json`

**Khối** (17)

- `src/features/invitation/shell/blocks/baroque_v2/Album.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Banquet.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/BottomDecor.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Ceremony.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/DressCode.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Footer.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Gifts.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Guestbook.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Hero.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/index.ts`
- `src/features/invitation/shell/blocks/baroque_v2/Lightbox.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Paper.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/RsvpAction.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/Schedule.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/ThankYou.tsx`
- `src/features/invitation/shell/blocks/baroque_v2/themeVars.ts`
- `src/features/invitation/shell/blocks/baroque_v2/Venue.tsx`

**Ảnh theme** (12)

- `public/images/themes/baroque-v2-dark-blue/bg.webp`
- `public/images/themes/baroque-v2-dark-blue/bird.webp`
- `public/images/themes/baroque-v2-dark-blue/cake.webp`
- `public/images/themes/baroque-v2-dark-blue/flower3-decoration.webp`
- `public/images/themes/baroque-v2-dark-blue/flower4-decoration.webp`
- `public/images/themes/baroque-v2-dark-blue/flower5-decoration.webp`
- `public/images/themes/baroque-v2-dark-blue/frame.webp`
- `public/images/themes/baroque-v2-dark-blue/golden-line-decoration.webp`
- `public/images/themes/baroque-v2-dark-blue/letter.webp`
- `public/images/themes/baroque-v2-dark-blue/line2-decoration.webp`
- `public/images/themes/baroque-v2-dark-blue/line3-decoration.webp`
- `public/images/themes/baroque-v2-dark-blue/line4-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/baroque_v2_darkblue.webp`

**Dữ liệu khảo sát** (14)

- `docs/survey/blocks/baroque_v2_darkblue/00.html`
- `docs/survey/blocks/baroque_v2_darkblue/01.html`
- `docs/survey/blocks/baroque_v2_darkblue/02.html`
- `docs/survey/blocks/baroque_v2_darkblue/03.html`
- `docs/survey/blocks/baroque_v2_darkblue/04.html`
- `docs/survey/blocks/baroque_v2_darkblue/05.html`
- `docs/survey/blocks/baroque_v2_darkblue/06.html`
- `docs/survey/blocks/baroque_v2_darkblue/07.html`
- `docs/survey/blocks/baroque_v2_darkblue/08.html`
- `docs/survey/blocks/baroque_v2_darkblue/09.html`
- `docs/survey/blocks/baroque_v2_darkblue/10.html`
- `docs/survey/blocks/baroque_v2_darkblue/11.html`
- `docs/survey/raw/baroque_v2_darkblue_demo_extracted.json`
- `docs/survey/raw/baroque_v2_darkblue_dump_open_390.json`

</details>

<details><summary>✅ <b>Mai Lan - Xanh</b> — <code>jasmine_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/mai-lan-xanh/demo
- Họ khối: `jasmine_green`
- Bộ sinh: `scripts/clone/gen_jasmine_green.cjs`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `jasmine_green`
- Thư mục ảnh theme: `public/images/themes/jasmine-green/` (27 file)

**Spec** (3)

- `src/features/invitation/shell/specs/jasmine_green/capabilities.json`
- `src/features/invitation/shell/specs/jasmine_green/demo.json`
- `src/features/invitation/shell/specs/jasmine_green/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/jasmine_green/Album.tsx`
- `src/features/invitation/shell/blocks/jasmine_green/Banquet.tsx`
- `src/features/invitation/shell/blocks/jasmine_green/Dress.tsx`
- `src/features/invitation/shell/blocks/jasmine_green/Family.tsx`
- `src/features/invitation/shell/blocks/jasmine_green/Footer.tsx`
- `src/features/invitation/shell/blocks/jasmine_green/Gifts.tsx`
- `src/features/invitation/shell/blocks/jasmine_green/Guestbook.tsx`
- `src/features/invitation/shell/blocks/jasmine_green/Hero.tsx`
- `src/features/invitation/shell/blocks/jasmine_green/index.ts`
- `src/features/invitation/shell/blocks/jasmine_green/Paper.tsx`
- `src/features/invitation/shell/blocks/jasmine_green/Schedule.tsx`
- `src/features/invitation/shell/blocks/jasmine_green/Venue.tsx`

**Ảnh theme** (27)

- `public/images/themes/jasmine-green/alcohol.webp`
- `public/images/themes/jasmine-green/bird.webp`
- `public/images/themes/jasmine-green/calendar-heart.webp`
- `public/images/themes/jasmine-green/flower-decoration.webp`
- `public/images/themes/jasmine-green/flower10.webp`
- `public/images/themes/jasmine-green/flower11.webp`
- `public/images/themes/jasmine-green/flower2.webp`
- `public/images/themes/jasmine-green/flower3.webp`
- `public/images/themes/jasmine-green/flower4.webp`
- `public/images/themes/jasmine-green/flower5.webp`
- `public/images/themes/jasmine-green/flower6.webp`
- `public/images/themes/jasmine-green/frame.webp`
- `public/images/themes/jasmine-green/goldheart.webp`
- `public/images/themes/jasmine-green/goldheart3.webp`
- `public/images/themes/jasmine-green/goldline.webp`
- `public/images/themes/jasmine-green/goldline2.webp`
- `public/images/themes/jasmine-green/leaf.webp`
- `public/images/themes/jasmine-green/leaf1.webp`
- `public/images/themes/jasmine-green/leaf2.webp`
- `public/images/themes/jasmine-green/leaf3.webp`
- `public/images/themes/jasmine-green/leaf4.webp`
- `public/images/themes/jasmine-green/leaf5.webp`
- `public/images/themes/jasmine-green/paper.webp`
- `public/images/themes/jasmine-green/ribbon.webp`
- `public/images/themes/jasmine-green/ribbon2.webp`
- `public/images/themes/jasmine-green/ribbon3.webp`
- `public/images/themes/jasmine-green/ring.webp`

**Phong bì** (1)

- `public/images/envelope/jasmine_green.webp`

**Dữ liệu khảo sát** (26)

- `docs/survey/blocks/jasmine_green/00.jsx`
- `docs/survey/blocks/jasmine_green/01.jsx`
- `docs/survey/blocks/jasmine_green/02.jsx`
- `docs/survey/blocks/jasmine_green/03.jsx`
- `docs/survey/blocks/jasmine_green/04.jsx`
- `docs/survey/blocks/jasmine_green/main/00.jsx`
- `docs/survey/blocks/jasmine_green/main/01.jsx`
- `docs/survey/blocks/jasmine_green/main/02.jsx`
- `docs/survey/blocks/jasmine_green/main/03.jsx`
- `docs/survey/blocks/jasmine_green/main/04.jsx`
- `docs/survey/blocks/jasmine_green/main/05.jsx`
- `docs/survey/blocks/jasmine_green/main/06.jsx`
- `docs/survey/blocks/jasmine_green/main/07.jsx`
- `docs/survey/blocks/jasmine_green/main/08.jsx`
- `docs/survey/blocks/jasmine_green/main/09.jsx`
- `docs/survey/blocks/jasmine_green/main/10.jsx`
- `docs/survey/raw/jasmine_green_cover_html.json`
- `docs/survey/raw/jasmine_green_dump_cover_1280.json`
- `docs/survey/raw/jasmine_green_dump_cover_390.json`
- `docs/survey/raw/jasmine_green_dump_gift_390.json`
- `docs/survey/raw/jasmine_green_dump_openfull_390.json`
- `docs/survey/raw/jasmine_green_dump_open_1280.json`
- `docs/survey/raw/jasmine_green_dump_open_390.json`
- `docs/survey/raw/jasmine_green_dump_open_768.json`
- `docs/survey/raw/jasmine_green_open_html.json`
- `docs/survey/raw/jasmine_green_open_html_390.json`

</details>

<details><summary>🟡 <b>Hoa Hướng Dương</b> — <code>sunflower_yellow</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-huong-duong/demo
- Họ khối: `sunflower_yellow`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `sunflower_yellow`
- Thư mục ảnh theme: `public/images/themes/sunflower/` (7 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/sunflower_yellow/capabilities.json`
- `src/features/invitation/shell/specs/sunflower_yellow/demo.json`
- `src/features/invitation/shell/specs/sunflower_yellow/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/sunflower_yellow/Album.tsx`
- `src/features/invitation/shell/blocks/sunflower_yellow/Banquet.tsx`
- `src/features/invitation/shell/blocks/sunflower_yellow/Ceremony.tsx`
- `src/features/invitation/shell/blocks/sunflower_yellow/Credit.tsx`
- `src/features/invitation/shell/blocks/sunflower_yellow/Dress.tsx`
- `src/features/invitation/shell/blocks/sunflower_yellow/Footer.tsx`
- `src/features/invitation/shell/blocks/sunflower_yellow/Gifts.tsx`
- `src/features/invitation/shell/blocks/sunflower_yellow/Guestbook.tsx`
- `src/features/invitation/shell/blocks/sunflower_yellow/Hero.tsx`
- `src/features/invitation/shell/blocks/sunflower_yellow/index.ts`
- `src/features/invitation/shell/blocks/sunflower_yellow/Lightbox.tsx`
- `src/features/invitation/shell/blocks/sunflower_yellow/Paper.tsx`
- `src/features/invitation/shell/blocks/sunflower_yellow/Schedule.tsx`
- `src/features/invitation/shell/blocks/sunflower_yellow/Venue.tsx`

**Ảnh theme** (7)

- `public/images/themes/sunflower/flower2.webp`
- `public/images/themes/sunflower/flower4.webp`
- `public/images/themes/sunflower/flower5.webp`
- `public/images/themes/sunflower/map.webp`
- `public/images/themes/sunflower/medallion-flower.webp`
- `public/images/themes/sunflower/paper.webp`
- `public/images/themes/sunflower/ring.webp`

**Phong bì** (1)

- `public/images/envelope/sunflower_yellow.webp`

</details>

<details><summary>✅ <b>Hoa Thuỷ Tinh - Xanh</b> — <code>crystal_floral_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-thuy-tinh-xanh/demo
- Họ khối: `crystal_floral`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `crystal_floral_green`
- Thư mục ảnh theme: `public/images/themes/crystal-floral-green/` (11 file)

**Spec** (3)

- `src/features/invitation/shell/specs/crystal_floral_green/capabilities.json`
- `src/features/invitation/shell/specs/crystal_floral_green/demo.json`
- `src/features/invitation/shell/specs/crystal_floral_green/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/crystal_floral/BottomDecor.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Ceremony.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/DressCode.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Footer.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Gifts.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Guestbook.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Hero.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/index.ts`
- `src/features/invitation/shell/blocks/crystal_floral/Lightbox.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Schedule.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/ThankYou.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/themeVars.ts`
- `src/features/invitation/shell/blocks/crystal_floral/TopDecor.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Venue.tsx`
- `src/features/invitation/shell/blocks/crystal_floral/Watermark.tsx`

**Ảnh theme** (11)

- `public/images/themes/crystal-floral-green/calendar-frame.webp`
- `public/images/themes/crystal-floral-green/filigree.webp`
- `public/images/themes/crystal-floral-green/flower-frame.webp`
- `public/images/themes/crystal-floral-green/flower1.webp`
- `public/images/themes/crystal-floral-green/flower2.webp`
- `public/images/themes/crystal-floral-green/flower3.webp`
- `public/images/themes/crystal-floral-green/flower4.webp`
- `public/images/themes/crystal-floral-green/flower5.webp`
- `public/images/themes/crystal-floral-green/flowericon.webp`
- `public/images/themes/crystal-floral-green/map.webp`
- `public/images/themes/crystal-floral-green/ring.webp`

**Phong bì** (1)

- `public/images/envelope/crystal_floral_green.webp`

**Dữ liệu khảo sát** (20)

- `docs/survey/blocks/crystal_floral_green/00.html`
- `docs/survey/blocks/crystal_floral_green/01.html`
- `docs/survey/blocks/crystal_floral_green/02.html`
- `docs/survey/blocks/crystal_floral_green/03.html`
- `docs/survey/blocks/crystal_floral_green/04.html`
- `docs/survey/blocks/crystal_floral_green/05.html`
- `docs/survey/blocks/crystal_floral_green/06.html`
- `docs/survey/blocks/crystal_floral_green/07.html`
- `docs/survey/blocks/crystal_floral_green/08.html`
- `docs/survey/blocks/crystal_floral_green/09.html`
- `docs/survey/blocks/crystal_floral_green/10.html`
- `docs/survey/blocks/crystal_floral_green/11.html`
- `docs/survey/blocks/crystal_floral_green/12.html`
- `docs/survey/blocks/crystal_floral_green/13.html`
- `docs/survey/raw/crystal_floral_green_accounts.json`
- `docs/survey/raw/crystal_floral_green_demo_extracted.json`
- `docs/survey/raw/crystal_floral_green_dump_open_390.json`
- `docs/survey/raw/crystal_floral_green_photos.json`
- `docs/survey/raw/crystal_floral_green_wishes.json`
- `docs/survey/raw/crystal_floral_green_wm.json`

</details>

<details><summary>🟡 <b>Santorini - Lam</b> — <code>santorini_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/santorini-lam/demo
- Họ khối: `santorini_blue`
- Thư mục ảnh theme: `public/images/themes/santorini-blue/` (18 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo); thiếu cấu hình bìa trong coverConfigs.ts

**Spec** (3)

- `src/features/invitation/shell/specs/santorini_blue/capabilities.json`
- `src/features/invitation/shell/specs/santorini_blue/demo.json`
- `src/features/invitation/shell/specs/santorini_blue/theme.json`

**Khối** (15)

- `src/features/invitation/shell/blocks/santorini_blue/Album.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/Banquet.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/Ceremony.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/Credit.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/Dress.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/Footer.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/Gifts.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/Guestbook.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/index.ts`
- `src/features/invitation/shell/blocks/santorini_blue/Lightbox.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/Paper.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/Schedule.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/Section1.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/Section5.tsx`
- `src/features/invitation/shell/blocks/santorini_blue/Venue.tsx`

**Ảnh theme** (18)

- `public/images/themes/santorini-blue/cliffside.webp`
- `public/images/themes/santorini-blue/cloud-1.webp`
- `public/images/themes/santorini-blue/cloud-2.webp`
- `public/images/themes/santorini-blue/cloud-3.webp`
- `public/images/themes/santorini-blue/doorway-2.webp`
- `public/images/themes/santorini-blue/doorway-3.webp`
- `public/images/themes/santorini-blue/flower-2.webp`
- `public/images/themes/santorini-blue/flower.webp`
- `public/images/themes/santorini-blue/medallion-cake.webp`
- `public/images/themes/santorini-blue/medallion-drink.webp`
- `public/images/themes/santorini-blue/medallion-locate.webp`
- `public/images/themes/santorini-blue/scene-2.webp`
- `public/images/themes/santorini-blue/scene.webp`
- `public/images/themes/santorini-blue/terrace-sea.webp`
- `public/images/themes/santorini-blue/villa-strip.webp`
- `public/images/themes/santorini-blue/village-wash.webp`
- `public/images/themes/santorini-blue/village.webp`
- `public/images/themes/santorini-blue/water.webp`

</details>

<details><summary>✅ <b>Bạch Sứ II - Đỏ</b> — <code>porcelain_v2_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/bach-su-v2-do/demo
- Họ khối: `porcelain_v2`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `porcelain_v2_red`
- Thư mục ảnh theme: `public/images/themes/porcelain-v2-red/` (6 file)

**Spec** (3)

- `src/features/invitation/shell/specs/porcelain_v2_red/capabilities.json`
- `src/features/invitation/shell/specs/porcelain_v2_red/demo.json`
- `src/features/invitation/shell/specs/porcelain_v2_red/theme.json`

**Khối** (11)

- `src/features/invitation/shell/blocks/porcelain_v2/Album.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Banquet.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Dress.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Family.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Guestbook.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Hero.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/index.ts`
- `src/features/invitation/shell/blocks/porcelain_v2/Lightbox.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Paper.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Schedule.tsx`
- `src/features/invitation/shell/blocks/porcelain_v2/Venue.tsx`

**Ảnh theme** (6)

- `public/images/themes/porcelain-v2-red/cake.webp`
- `public/images/themes/porcelain-v2-red/floral-tile.webp`
- `public/images/themes/porcelain-v2-red/flower.webp`
- `public/images/themes/porcelain-v2-red/hero-frame.webp`
- `public/images/themes/porcelain-v2-red/lamp.webp`
- `public/images/themes/porcelain-v2-red/ring.webp`

**Phong bì** (1)

- `public/images/envelope/porcelain_v2_red.webp`

**Dữ liệu khảo sát** (2)

- `docs/survey/raw/porcelain_v2_red_dump_open_390.json`
- `docs/survey/raw/porcelain_v2_red_extracted_meta.json`

</details>

<details><summary>🟡 <b>Bạch Sứ - Lam</b> — <code>porcelain_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/bach-su-lam/demo
- Họ khối: `porcelain_blue`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `porcelain_blue`
- Thư mục ảnh theme: `public/images/themes/porcelain-blue/` (5 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/porcelain_blue/capabilities.json`
- `src/features/invitation/shell/specs/porcelain_blue/demo.json`
- `src/features/invitation/shell/specs/porcelain_blue/theme.json`

**Khối** (4)

- `src/features/invitation/shell/blocks/porcelain_blue/Ceremony.tsx`
- `src/features/invitation/shell/blocks/porcelain_blue/index.ts`
- `src/features/invitation/shell/blocks/porcelain_blue/Lightbox.tsx`
- `src/features/invitation/shell/blocks/porcelain_blue/Paper.tsx`

**Ảnh theme** (5)

- `public/images/themes/porcelain-blue/cake.webp`
- `public/images/themes/porcelain-blue/floral-tile.webp`
- `public/images/themes/porcelain-blue/frame-decoration.webp`
- `public/images/themes/porcelain-blue/home.webp`
- `public/images/themes/porcelain-blue/music.webp`

**Phong bì** (1)

- `public/images/envelope/porcelain_blue.webp`

</details>

<details><summary>🟡 <b>Hoa Màu - Lam</b> — <code>folk_floral_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-mau-lam/demo
- Họ khối: `folk_floral_blue`
- Thư mục ảnh theme: `public/images/themes/folk-floral-blue/` (11 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo); thiếu cấu hình bìa trong coverConfigs.ts

**Spec** (3)

- `src/features/invitation/shell/specs/folk_floral_blue/capabilities.json`
- `src/features/invitation/shell/specs/folk_floral_blue/demo.json`
- `src/features/invitation/shell/specs/folk_floral_blue/theme.json`

**Khối** (4)

- `src/features/invitation/shell/blocks/folk_floral_blue/Ceremony.tsx`
- `src/features/invitation/shell/blocks/folk_floral_blue/index.ts`
- `src/features/invitation/shell/blocks/folk_floral_blue/Lightbox.tsx`
- `src/features/invitation/shell/blocks/folk_floral_blue/Paper.tsx`

**Ảnh theme** (11)

- `public/images/themes/folk-floral-blue/alcohol.webp`
- `public/images/themes/folk-floral-blue/bird.webp`
- `public/images/themes/folk-floral-blue/cake.webp`
- `public/images/themes/folk-floral-blue/calendar-heart.webp`
- `public/images/themes/folk-floral-blue/flower-frame.webp`
- `public/images/themes/folk-floral-blue/flower2-background.webp`
- `public/images/themes/folk-floral-blue/flower3-decoration.webp`
- `public/images/themes/folk-floral-blue/flower4-decoration.webp`
- `public/images/themes/folk-floral-blue/flower5-decoration.webp`
- `public/images/themes/folk-floral-blue/flower6-decoration.webp`
- `public/images/themes/folk-floral-blue/flower7-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/folk_floral_blue.webp`

</details>

<details><summary>🟡 <b>Bạch Sứ - Đỏ</b> — <code>porcelain_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/bach-su-do/demo
- Họ khối: `porcelain_red`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `porcelain_red`
- Thư mục ảnh theme: `public/images/themes/porcelain-red/` (5 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/porcelain_red/capabilities.json`
- `src/features/invitation/shell/specs/porcelain_red/demo.json`
- `src/features/invitation/shell/specs/porcelain_red/theme.json`

**Khối** (4)

- `src/features/invitation/shell/blocks/porcelain_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/porcelain_red/index.ts`
- `src/features/invitation/shell/blocks/porcelain_red/Lightbox.tsx`
- `src/features/invitation/shell/blocks/porcelain_red/Paper.tsx`

**Ảnh theme** (5)

- `public/images/themes/porcelain-red/cake.webp`
- `public/images/themes/porcelain-red/floral-tile.webp`
- `public/images/themes/porcelain-red/frame-decoration.webp`
- `public/images/themes/porcelain-red/home.webp`
- `public/images/themes/porcelain-red/music.webp`

**Phong bì** (1)

- `public/images/envelope/porcelain_red.webp`

</details>

<details><summary>🟡 <b>Hoa Dại - Hồng</b> — <code>hoa_dai_pink</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-dai-hong/demo
- Họ khối: `hoa_dai_pink`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `hoa_dai_pink`
- Thư mục ảnh theme: `public/images/themes/hoa-dai-pink/` (9 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/hoa_dai_pink/capabilities.json`
- `src/features/invitation/shell/specs/hoa_dai_pink/demo.json`
- `src/features/invitation/shell/specs/hoa_dai_pink/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/hoa_dai_pink/Album.tsx`
- `src/features/invitation/shell/blocks/hoa_dai_pink/Banquet.tsx`
- `src/features/invitation/shell/blocks/hoa_dai_pink/Ceremony.tsx`
- `src/features/invitation/shell/blocks/hoa_dai_pink/Credit.tsx`
- `src/features/invitation/shell/blocks/hoa_dai_pink/Dress.tsx`
- `src/features/invitation/shell/blocks/hoa_dai_pink/Footer.tsx`
- `src/features/invitation/shell/blocks/hoa_dai_pink/Gifts.tsx`
- `src/features/invitation/shell/blocks/hoa_dai_pink/Guestbook.tsx`
- `src/features/invitation/shell/blocks/hoa_dai_pink/index.ts`
- `src/features/invitation/shell/blocks/hoa_dai_pink/Lightbox.tsx`
- `src/features/invitation/shell/blocks/hoa_dai_pink/Paper.tsx`
- `src/features/invitation/shell/blocks/hoa_dai_pink/Schedule.tsx`
- `src/features/invitation/shell/blocks/hoa_dai_pink/Section1.tsx`
- `src/features/invitation/shell/blocks/hoa_dai_pink/Venue.tsx`

**Ảnh theme** (9)

- `public/images/themes/hoa-dai-pink/bird.webp`
- `public/images/themes/hoa-dai-pink/cake.webp`
- `public/images/themes/hoa-dai-pink/flower-decoration.webp`
- `public/images/themes/hoa-dai-pink/flower2-decoration.webp`
- `public/images/themes/hoa-dai-pink/flower3-decoration.webp`
- `public/images/themes/hoa-dai-pink/flower4-decoration.webp`
- `public/images/themes/hoa-dai-pink/flower5-decoration.webp`
- `public/images/themes/hoa-dai-pink/letter.webp`
- `public/images/themes/hoa-dai-pink/water-flowers.webp`

**Phong bì** (1)

- `public/images/envelope/hoa_dai_pink.webp`

</details>

<details><summary>🟡 <b>Thanh Cung - Lam</b> — <code>qasr_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/thanhcung-lam/demo
- Họ khối: `qasr_blue`
- Thư mục ảnh theme: `public/images/themes/qasr-blue/` (19 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo); thiếu cấu hình bìa trong coverConfigs.ts

**Spec** (3)

- `src/features/invitation/shell/specs/qasr_blue/capabilities.json`
- `src/features/invitation/shell/specs/qasr_blue/demo.json`
- `src/features/invitation/shell/specs/qasr_blue/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/qasr_blue/Album.tsx`
- `src/features/invitation/shell/blocks/qasr_blue/Banquet.tsx`
- `src/features/invitation/shell/blocks/qasr_blue/Ceremony.tsx`
- `src/features/invitation/shell/blocks/qasr_blue/Dress.tsx`
- `src/features/invitation/shell/blocks/qasr_blue/Footer.tsx`
- `src/features/invitation/shell/blocks/qasr_blue/Guestbook.tsx`
- `src/features/invitation/shell/blocks/qasr_blue/index.ts`
- `src/features/invitation/shell/blocks/qasr_blue/Lightbox.tsx`
- `src/features/invitation/shell/blocks/qasr_blue/Paper.tsx`
- `src/features/invitation/shell/blocks/qasr_blue/Schedule.tsx`
- `src/features/invitation/shell/blocks/qasr_blue/Section1.tsx`
- `src/features/invitation/shell/blocks/qasr_blue/Venue.tsx`

**Ảnh theme** (19)

- `public/images/themes/qasr-blue/archframe1-decoration.webp`
- `public/images/themes/qasr-blue/archframe2-decoration.webp`
- `public/images/themes/qasr-blue/cake.webp`
- `public/images/themes/qasr-blue/calendar-frame.webp`
- `public/images/themes/qasr-blue/curtain-decoration.webp`
- `public/images/themes/qasr-blue/flower-decoration.webp`
- `public/images/themes/qasr-blue/flower3-decoration.webp`
- `public/images/themes/qasr-blue/frame-decoration.webp`
- `public/images/themes/qasr-blue/goldenline-decoration.webp`
- `public/images/themes/qasr-blue/heart.webp`
- `public/images/themes/qasr-blue/house-background.webp`
- `public/images/themes/qasr-blue/house2-decoration.webp`
- `public/images/themes/qasr-blue/lamp-decoration.webp`
- `public/images/themes/qasr-blue/line-decoration.webp`
- `public/images/themes/qasr-blue/opening.webp`
- `public/images/themes/qasr-blue/ring.webp`
- `public/images/themes/qasr-blue/scene-decoration.webp`
- `public/images/themes/qasr-blue/tree-decoration.webp`
- `public/images/themes/qasr-blue/wallframe-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/qasr_blue.webp`

</details>

<details><summary>🟡 <b>San Miguel - Vàng</b> — <code>san_miguel_yellow</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/san-miguel-vang/demo
- Họ khối: `san_miguel_yellow`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `san_miguel_yellow`
- Thư mục ảnh theme: `public/images/themes/san-miguel-yellow/` (20 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/san_miguel_yellow/capabilities.json`
- `src/features/invitation/shell/specs/san_miguel_yellow/demo.json`
- `src/features/invitation/shell/specs/san_miguel_yellow/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/san_miguel_yellow/Album.tsx`
- `src/features/invitation/shell/blocks/san_miguel_yellow/Banquet.tsx`
- `src/features/invitation/shell/blocks/san_miguel_yellow/Ceremony.tsx`
- `src/features/invitation/shell/blocks/san_miguel_yellow/Credit.tsx`
- `src/features/invitation/shell/blocks/san_miguel_yellow/Dress.tsx`
- `src/features/invitation/shell/blocks/san_miguel_yellow/Footer.tsx`
- `src/features/invitation/shell/blocks/san_miguel_yellow/Gifts.tsx`
- `src/features/invitation/shell/blocks/san_miguel_yellow/Guestbook.tsx`
- `src/features/invitation/shell/blocks/san_miguel_yellow/index.ts`
- `src/features/invitation/shell/blocks/san_miguel_yellow/Lightbox.tsx`
- `src/features/invitation/shell/blocks/san_miguel_yellow/Paper.tsx`
- `src/features/invitation/shell/blocks/san_miguel_yellow/Schedule.tsx`
- `src/features/invitation/shell/blocks/san_miguel_yellow/Section1.tsx`
- `src/features/invitation/shell/blocks/san_miguel_yellow/Venue.tsx`

**Ảnh theme** (20)

- `public/images/themes/san-miguel-yellow/bird.webp`
- `public/images/themes/san-miguel-yellow/church-decoration.webp`
- `public/images/themes/san-miguel-yellow/city-envelope.webp`
- `public/images/themes/san-miguel-yellow/cloud-background.webp`
- `public/images/themes/san-miguel-yellow/cloud2-background.webp`
- `public/images/themes/san-miguel-yellow/flower-decoration.webp`
- `public/images/themes/san-miguel-yellow/flower-gift.webp`
- `public/images/themes/san-miguel-yellow/flower.webp`
- `public/images/themes/san-miguel-yellow/heart.webp`
- `public/images/themes/san-miguel-yellow/house-decoration.webp`
- `public/images/themes/san-miguel-yellow/light-decoration.webp`
- `public/images/themes/san-miguel-yellow/paper-background.webp`
- `public/images/themes/san-miguel-yellow/scene-background.webp`
- `public/images/themes/san-miguel-yellow/scene-decoration.webp`
- `public/images/themes/san-miguel-yellow/scene2-decoration.webp`
- `public/images/themes/san-miguel-yellow/stair-background.webp`
- `public/images/themes/san-miguel-yellow/tree-decoration.webp`
- `public/images/themes/san-miguel-yellow/wall-decoration.webp`
- `public/images/themes/san-miguel-yellow/wall2-decoration.webp`
- `public/images/themes/san-miguel-yellow/water-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/san_miguel_yellow.webp`

</details>

<details><summary>🟡 <b>Vườn Kính - Lam</b> — <code>glass_garden_blue</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/vuonkinh-lam/demo
- Họ khối: `glass_garden_blue`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `glass_garden_blue`
- Thư mục ảnh theme: `public/images/themes/glass-garden-blue/` (8 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/glass_garden_blue/capabilities.json`
- `src/features/invitation/shell/specs/glass_garden_blue/demo.json`
- `src/features/invitation/shell/specs/glass_garden_blue/theme.json`

**Khối** (5)

- `src/features/invitation/shell/blocks/glass_garden_blue/Ceremony.tsx`
- `src/features/invitation/shell/blocks/glass_garden_blue/index.ts`
- `src/features/invitation/shell/blocks/glass_garden_blue/Lightbox.tsx`
- `src/features/invitation/shell/blocks/glass_garden_blue/Paper.tsx`
- `src/features/invitation/shell/blocks/glass_garden_blue/Section1.tsx`

**Ảnh theme** (8)

- `public/images/themes/glass-garden-blue/calendar-heart.webp`
- `public/images/themes/glass-garden-blue/floral-background.webp`
- `public/images/themes/glass-garden-blue/flower2-decoration.webp`
- `public/images/themes/glass-garden-blue/flower3-decoration.webp`
- `public/images/themes/glass-garden-blue/flower5-bottom.webp`
- `public/images/themes/glass-garden-blue/map.webp`
- `public/images/themes/glass-garden-blue/ring.webp`
- `public/images/themes/glass-garden-blue/song.webp`

**Phong bì** (1)

- `public/images/envelope/glass_garden_blue.webp`

</details>

<details><summary>🟡 <b>Hoàng Kim II - Tím</b> — <code>royal_v2_purple</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoang-kim-ii-tim/demo
- Họ khối: `royal_v2_purple`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `royal_v2_purple`
- Thư mục ảnh theme: `public/images/themes/royal-v2-purple/` (15 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/royal_v2_purple/capabilities.json`
- `src/features/invitation/shell/specs/royal_v2_purple/demo.json`
- `src/features/invitation/shell/specs/royal_v2_purple/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/royal_v2_purple/Album.tsx`
- `src/features/invitation/shell/blocks/royal_v2_purple/Banquet.tsx`
- `src/features/invitation/shell/blocks/royal_v2_purple/Ceremony.tsx`
- `src/features/invitation/shell/blocks/royal_v2_purple/Dress.tsx`
- `src/features/invitation/shell/blocks/royal_v2_purple/Footer.tsx`
- `src/features/invitation/shell/blocks/royal_v2_purple/Gifts.tsx`
- `src/features/invitation/shell/blocks/royal_v2_purple/Guestbook.tsx`
- `src/features/invitation/shell/blocks/royal_v2_purple/index.ts`
- `src/features/invitation/shell/blocks/royal_v2_purple/Lightbox.tsx`
- `src/features/invitation/shell/blocks/royal_v2_purple/Paper.tsx`
- `src/features/invitation/shell/blocks/royal_v2_purple/Schedule.tsx`
- `src/features/invitation/shell/blocks/royal_v2_purple/Section1.tsx`
- `src/features/invitation/shell/blocks/royal_v2_purple/Section5.tsx`
- `src/features/invitation/shell/blocks/royal_v2_purple/Venue.tsx`

**Ảnh theme** (15)

- `public/images/themes/royal-v2-purple/background.webp`
- `public/images/themes/royal-v2-purple/cake.webp`
- `public/images/themes/royal-v2-purple/calendar-heart.webp`
- `public/images/themes/royal-v2-purple/decorframe.webp`
- `public/images/themes/royal-v2-purple/decorframe2.webp`
- `public/images/themes/royal-v2-purple/flower-decoration.webp`
- `public/images/themes/royal-v2-purple/flower2-decoration.webp`
- `public/images/themes/royal-v2-purple/flower4-decoration.webp`
- `public/images/themes/royal-v2-purple/flower5-decoration.webp`
- `public/images/themes/royal-v2-purple/flowerbottom-decoration.webp`
- `public/images/themes/royal-v2-purple/frame.webp`
- `public/images/themes/royal-v2-purple/golden-line.webp`
- `public/images/themes/royal-v2-purple/leafline-decoration.webp`
- `public/images/themes/royal-v2-purple/ring.webp`
- `public/images/themes/royal-v2-purple/welcome.webp`

**Phong bì** (1)

- `public/images/envelope/royal_v2_purple.webp`

</details>

<details><summary>🟡 <b>Hoa Khô - Cam</b> — <code>hoa_kho_orange</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-kho-cam/demo
- Họ khối: `hoa_kho_orange`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `hoa_kho_orange`
- Thư mục ảnh theme: `public/images/themes/hoa-kho-orange/` (8 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo)

**Spec** (3)

- `src/features/invitation/shell/specs/hoa_kho_orange/capabilities.json`
- `src/features/invitation/shell/specs/hoa_kho_orange/demo.json`
- `src/features/invitation/shell/specs/hoa_kho_orange/theme.json`

**Khối** (13)

- `src/features/invitation/shell/blocks/hoa_kho_orange/Album.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_orange/Banquet.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_orange/Ceremony.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_orange/Credit.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_orange/Dress.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_orange/Footer.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_orange/Gifts.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_orange/Hero.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_orange/index.ts`
- `src/features/invitation/shell/blocks/hoa_kho_orange/Lightbox.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_orange/Paper.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_orange/Schedule.tsx`
- `src/features/invitation/shell/blocks/hoa_kho_orange/Venue.tsx`

**Ảnh theme** (8)

- `public/images/themes/hoa-kho-orange/cake.webp`
- `public/images/themes/hoa-kho-orange/calendar-heart.svg`
- `public/images/themes/hoa-kho-orange/flower2.webp`
- `public/images/themes/hoa-kho-orange/flower3.webp`
- `public/images/themes/hoa-kho-orange/flower4.webp`
- `public/images/themes/hoa-kho-orange/paper.webp`
- `public/images/themes/hoa-kho-orange/ring.webp`
- `public/images/themes/hoa-kho-orange/water.webp`

**Phong bì** (1)

- `public/images/envelope/hoa_kho_orange.webp`

</details>

<details><summary>✅ <b>Mahal - Vàng</b> — <code>mahal_gold</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/mahal-vang/demo
- Họ khối: `mahal_gold`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `mahal_gold`
- Thư mục ảnh theme: `public/images/themes/mahal-gold/` (18 file)
- Ghi chú: Theme+bìa+ảnh đo lại 2026-11-11; Lightbox riêng còn ghi cứng ảnh demo

**Spec** (3)

- `src/features/invitation/shell/specs/mahal_gold/capabilities.json`
- `src/features/invitation/shell/specs/mahal_gold/demo.json`
- `src/features/invitation/shell/specs/mahal_gold/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/mahal_gold/Album.tsx`
- `src/features/invitation/shell/blocks/mahal_gold/Banquet.tsx`
- `src/features/invitation/shell/blocks/mahal_gold/Ceremony.tsx`
- `src/features/invitation/shell/blocks/mahal_gold/Dress.tsx`
- `src/features/invitation/shell/blocks/mahal_gold/Footer.tsx`
- `src/features/invitation/shell/blocks/mahal_gold/Guestbook.tsx`
- `src/features/invitation/shell/blocks/mahal_gold/index.ts`
- `src/features/invitation/shell/blocks/mahal_gold/Lightbox.tsx`
- `src/features/invitation/shell/blocks/mahal_gold/Paper.tsx`
- `src/features/invitation/shell/blocks/mahal_gold/Schedule.tsx`
- `src/features/invitation/shell/blocks/mahal_gold/Section1.tsx`
- `src/features/invitation/shell/blocks/mahal_gold/Venue.tsx`

**Ảnh theme** (18)

- `public/images/themes/mahal-gold/arch-frame.webp`
- `public/images/themes/mahal-gold/bells.webp`
- `public/images/themes/mahal-gold/calendar-frame.webp`
- `public/images/themes/mahal-gold/castle.webp`
- `public/images/themes/mahal-gold/castle2.webp`
- `public/images/themes/mahal-gold/fence.webp`
- `public/images/themes/mahal-gold/flower1.webp`
- `public/images/themes/mahal-gold/flower2.webp`
- `public/images/themes/mahal-gold/flower3-decoration.webp`
- `public/images/themes/mahal-gold/ganesha.webp`
- `public/images/themes/mahal-gold/gold-line.webp`
- `public/images/themes/mahal-gold/medallion-cake.webp`
- `public/images/themes/mahal-gold/medallion-coming.webp`
- `public/images/themes/mahal-gold/medallion-gift.webp`
- `public/images/themes/mahal-gold/paper.webp`
- `public/images/themes/mahal-gold/pattern.webp`
- `public/images/themes/mahal-gold/sandstone-flower.webp`
- `public/images/themes/mahal-gold/sandstone.webp`

**Phong bì** (1)

- `public/images/envelope/mahal_gold.webp`

</details>

<details><summary>🟡 <b>Lễ Hội Hoa - Vàng</b> — <code>floral_fiesta_yellow</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/floral-fiesta-vang/demo
- Họ khối: `floral_fiesta_yellow`
- Thư mục ảnh theme: `public/images/themes/floral-fiesta-yellow/` (31 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo); thiếu cấu hình bìa trong coverConfigs.ts

**Spec** (3)

- `src/features/invitation/shell/specs/floral_fiesta_yellow/capabilities.json`
- `src/features/invitation/shell/specs/floral_fiesta_yellow/demo.json`
- `src/features/invitation/shell/specs/floral_fiesta_yellow/theme.json`

**Khối** (16)

- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Album.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Banquet.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Ceremony.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Credit.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Dress.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Footer.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Gifts.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Guestbook.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/index.ts`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Lightbox.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Paper.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Schedule.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Section1.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Section13.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Section5.tsx`
- `src/features/invitation/shell/blocks/floral_fiesta_yellow/Venue.tsx`

**Ảnh theme** (31)

- `public/images/themes/floral-fiesta-yellow/bird.webp`
- `public/images/themes/floral-fiesta-yellow/cake.webp`
- `public/images/themes/floral-fiesta-yellow/ceramicvase-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/circleblue-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/circlecolor-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/circlecolor2-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/circlegreen-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/circlepink-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/circleviolet-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/cord-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/flower-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/flower2-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/flower3-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/flower4-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/flower5-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/flower6-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/flower7-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/flower7b-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/flower8-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/flowerline-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/hat-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/leaf-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/leaf2-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/letter.webp`
- `public/images/themes/floral-fiesta-yellow/maraca-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/pattern2-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/pattern3b-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/pattern4-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/pattern5-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/patternleaf-decoration.webp`
- `public/images/themes/floral-fiesta-yellow/serape-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/floral_fiesta_yellow.webp`

</details>

<details><summary>🟡 <b>Du Mục - Nâu</b> — <code>nomad_brown</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/du-muc-nau/demo
- Họ khối: `nomad_brown`
- Thư mục ảnh theme: `public/images/themes/nomad-brown/` (18 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo); thiếu cấu hình bìa trong coverConfigs.ts

**Spec** (3)

- `src/features/invitation/shell/specs/nomad_brown/capabilities.json`
- `src/features/invitation/shell/specs/nomad_brown/demo.json`
- `src/features/invitation/shell/specs/nomad_brown/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/nomad_brown/Album.tsx`
- `src/features/invitation/shell/blocks/nomad_brown/Banquet.tsx`
- `src/features/invitation/shell/blocks/nomad_brown/Ceremony.tsx`
- `src/features/invitation/shell/blocks/nomad_brown/Dress.tsx`
- `src/features/invitation/shell/blocks/nomad_brown/Footer.tsx`
- `src/features/invitation/shell/blocks/nomad_brown/Gifts.tsx`
- `src/features/invitation/shell/blocks/nomad_brown/Guestbook.tsx`
- `src/features/invitation/shell/blocks/nomad_brown/index.ts`
- `src/features/invitation/shell/blocks/nomad_brown/Lightbox.tsx`
- `src/features/invitation/shell/blocks/nomad_brown/Paper.tsx`
- `src/features/invitation/shell/blocks/nomad_brown/Schedule.tsx`
- `src/features/invitation/shell/blocks/nomad_brown/Section1.tsx`
- `src/features/invitation/shell/blocks/nomad_brown/Section5.tsx`
- `src/features/invitation/shell/blocks/nomad_brown/Venue.tsx`

**Ảnh theme** (18)

- `public/images/themes/nomad-brown/calendar-frame.webp`
- `public/images/themes/nomad-brown/circlepattern-background.webp`
- `public/images/themes/nomad-brown/frame-decoration.webp`
- `public/images/themes/nomad-brown/goldline-decoration.webp`
- `public/images/themes/nomad-brown/kazakh-decoration.webp`
- `public/images/themes/nomad-brown/mountain-decoration.webp`
- `public/images/themes/nomad-brown/musical.webp`
- `public/images/themes/nomad-brown/pastries.webp`
- `public/images/themes/nomad-brown/pattern-decoration.webp`
- `public/images/themes/nomad-brown/saddle-decoration.webp`
- `public/images/themes/nomad-brown/scene-decoration.webp`
- `public/images/themes/nomad-brown/scene2-decoration.webp`
- `public/images/themes/nomad-brown/scene3-decoration.webp`
- `public/images/themes/nomad-brown/tea.webp`
- `public/images/themes/nomad-brown/tent-decoration.webp`
- `public/images/themes/nomad-brown/towel-decoration.webp`
- `public/images/themes/nomad-brown/towel2-decoration.webp`
- `public/images/themes/nomad-brown/tussock-decoration.webp`

**Phong bì** (1)

- `public/images/envelope/nomad_brown.webp`

</details>

<details><summary>🟡 <b>Kim Điện - Vàng</b> — <code>saraya_gold</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/kim-dien-vang/demo
- Họ khối: `saraya_gold`
- Thư mục ảnh theme: `public/images/themes/saraya-gold/` (17 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo); thiếu cấu hình bìa trong coverConfigs.ts

**Spec** (3)

- `src/features/invitation/shell/specs/saraya_gold/capabilities.json`
- `src/features/invitation/shell/specs/saraya_gold/demo.json`
- `src/features/invitation/shell/specs/saraya_gold/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/saraya_gold/Album.tsx`
- `src/features/invitation/shell/blocks/saraya_gold/Banquet.tsx`
- `src/features/invitation/shell/blocks/saraya_gold/Ceremony.tsx`
- `src/features/invitation/shell/blocks/saraya_gold/Dress.tsx`
- `src/features/invitation/shell/blocks/saraya_gold/Footer.tsx`
- `src/features/invitation/shell/blocks/saraya_gold/Guestbook.tsx`
- `src/features/invitation/shell/blocks/saraya_gold/index.ts`
- `src/features/invitation/shell/blocks/saraya_gold/Lightbox.tsx`
- `src/features/invitation/shell/blocks/saraya_gold/Paper.tsx`
- `src/features/invitation/shell/blocks/saraya_gold/Schedule.tsx`
- `src/features/invitation/shell/blocks/saraya_gold/Section1.tsx`
- `src/features/invitation/shell/blocks/saraya_gold/Venue.tsx`

**Ảnh theme** (17)

- `public/images/themes/saraya-gold/cake.webp`
- `public/images/themes/saraya-gold/calendar-frame.webp`
- `public/images/themes/saraya-gold/calligraphy.webp`
- `public/images/themes/saraya-gold/castle-background.webp`
- `public/images/themes/saraya-gold/flower-bottom.webp`
- `public/images/themes/saraya-gold/flower-decoration.webp`
- `public/images/themes/saraya-gold/flower2-top.webp`
- `public/images/themes/saraya-gold/flower3-decoration.webp`
- `public/images/themes/saraya-gold/frame.webp`
- `public/images/themes/saraya-gold/golden-frame.webp`
- `public/images/themes/saraya-gold/golden-line.webp`
- `public/images/themes/saraya-gold/heart.webp`
- `public/images/themes/saraya-gold/lanterns1.webp`
- `public/images/themes/saraya-gold/lanterns2-top.webp`
- `public/images/themes/saraya-gold/leaf-decoration.webp`
- `public/images/themes/saraya-gold/music.webp`
- `public/images/themes/saraya-gold/opening.webp`

**Phong bì** (1)

- `public/images/envelope/saraya_gold.webp`

</details>

<details><summary>🟡 <b>Thanh Cung - Vàng</b> — <code>qasr_gold</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/thanhcung-vang/demo
- Họ khối: `qasr_gold`
- Thư mục ảnh theme: `public/images/themes/qasr-gold/` (5 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo); thiếu cấu hình bìa trong coverConfigs.ts

**Spec** (3)

- `src/features/invitation/shell/specs/qasr_gold/capabilities.json`
- `src/features/invitation/shell/specs/qasr_gold/demo.json`
- `src/features/invitation/shell/specs/qasr_gold/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/qasr_gold/Album.tsx`
- `src/features/invitation/shell/blocks/qasr_gold/Banquet.tsx`
- `src/features/invitation/shell/blocks/qasr_gold/Ceremony.tsx`
- `src/features/invitation/shell/blocks/qasr_gold/Dress.tsx`
- `src/features/invitation/shell/blocks/qasr_gold/Footer.tsx`
- `src/features/invitation/shell/blocks/qasr_gold/Guestbook.tsx`
- `src/features/invitation/shell/blocks/qasr_gold/index.ts`
- `src/features/invitation/shell/blocks/qasr_gold/Lightbox.tsx`
- `src/features/invitation/shell/blocks/qasr_gold/Paper.tsx`
- `src/features/invitation/shell/blocks/qasr_gold/Schedule.tsx`
- `src/features/invitation/shell/blocks/qasr_gold/Section1.tsx`
- `src/features/invitation/shell/blocks/qasr_gold/Venue.tsx`

**Ảnh theme** (5)

- `public/images/themes/qasr-gold/bush5.webp`
- `public/images/themes/qasr-gold/castle.webp`
- `public/images/themes/qasr-gold/couple.webp`
- `public/images/themes/qasr-gold/frame-lich.webp`
- `public/images/themes/qasr-gold/golden-line.webp`

**Phong bì** (1)

- `public/images/envelope/qasr_gold.webp`

</details>

<details><summary>🟡 <b>Thanh Cung - Xanh</b> — <code>qasr_green</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/thanhcung-xanh/demo
- Họ khối: `qasr_green`
- Thư mục ảnh theme: `public/images/themes/qasr-green/` (12 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo); thiếu cấu hình bìa trong coverConfigs.ts

**Spec** (3)

- `src/features/invitation/shell/specs/qasr_green/capabilities.json`
- `src/features/invitation/shell/specs/qasr_green/demo.json`
- `src/features/invitation/shell/specs/qasr_green/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/qasr_green/Album.tsx`
- `src/features/invitation/shell/blocks/qasr_green/Banquet.tsx`
- `src/features/invitation/shell/blocks/qasr_green/Ceremony.tsx`
- `src/features/invitation/shell/blocks/qasr_green/Dress.tsx`
- `src/features/invitation/shell/blocks/qasr_green/Footer.tsx`
- `src/features/invitation/shell/blocks/qasr_green/Guestbook.tsx`
- `src/features/invitation/shell/blocks/qasr_green/index.ts`
- `src/features/invitation/shell/blocks/qasr_green/Lightbox.tsx`
- `src/features/invitation/shell/blocks/qasr_green/Paper.tsx`
- `src/features/invitation/shell/blocks/qasr_green/Schedule.tsx`
- `src/features/invitation/shell/blocks/qasr_green/Section1.tsx`
- `src/features/invitation/shell/blocks/qasr_green/Venue.tsx`

**Ảnh theme** (12)

- `public/images/themes/qasr-green/cake.webp`
- `public/images/themes/qasr-green/castle.webp`
- `public/images/themes/qasr-green/couple.webp`
- `public/images/themes/qasr-green/flower-bottom.webp`
- `public/images/themes/qasr-green/flower-decoration.webp`
- `public/images/themes/qasr-green/flower-top.webp`
- `public/images/themes/qasr-green/food.webp`
- `public/images/themes/qasr-green/frame-lich.webp`
- `public/images/themes/qasr-green/golden-line.webp`
- `public/images/themes/qasr-green/heart.webp`
- `public/images/themes/qasr-green/ring.webp`
- `public/images/themes/qasr-green/side-frame.webp`

**Phong bì** (1)

- `public/images/envelope/qasr_green.webp`

</details>

<details><summary>✅ <b>Mandap - Đỏ đậm</b> — <code>mandap_darkred</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/mandap-do-dam/demo
- Họ khối: `mandap_darkred`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `mandap_darkred`
- Thư mục ảnh theme: `public/images/themes/mandap-darkred/` (17 file)
- Ghi chú: Theme+bìa+ảnh đo lại 2026-11-11; thiếu Lightbox

**Spec** (3)

- `src/features/invitation/shell/specs/mandap_darkred/capabilities.json`
- `src/features/invitation/shell/specs/mandap_darkred/demo.json`
- `src/features/invitation/shell/specs/mandap_darkred/theme.json`

**Khối** (14)

- `src/features/invitation/shell/blocks/mandap_darkred/Album.tsx`
- `src/features/invitation/shell/blocks/mandap_darkred/Banquet.tsx`
- `src/features/invitation/shell/blocks/mandap_darkred/Ceremony.tsx`
- `src/features/invitation/shell/blocks/mandap_darkred/Dress.tsx`
- `src/features/invitation/shell/blocks/mandap_darkred/Footer.tsx`
- `src/features/invitation/shell/blocks/mandap_darkred/Gifts.tsx`
- `src/features/invitation/shell/blocks/mandap_darkred/Guestbook.tsx`
- `src/features/invitation/shell/blocks/mandap_darkred/index.ts`
- `src/features/invitation/shell/blocks/mandap_darkred/Lightbox.tsx`
- `src/features/invitation/shell/blocks/mandap_darkred/Paper.tsx`
- `src/features/invitation/shell/blocks/mandap_darkred/Schedule.tsx`
- `src/features/invitation/shell/blocks/mandap_darkred/Section1.tsx`
- `src/features/invitation/shell/blocks/mandap_darkred/Section5.tsx`
- `src/features/invitation/shell/blocks/mandap_darkred/Venue.tsx`

**Ảnh theme** (17)

- `public/images/themes/mandap-darkred/arch-frame.webp`
- `public/images/themes/mandap-darkred/background-texture.webp`
- `public/images/themes/mandap-darkred/bell-decoration.webp`
- `public/images/themes/mandap-darkred/calendar-frame.webp`
- `public/images/themes/mandap-darkred/chair.webp`
- `public/images/themes/mandap-darkred/column-decoration.webp`
- `public/images/themes/mandap-darkred/flower-decoration.webp`
- `public/images/themes/mandap-darkred/golden-frame-decoration.webp`
- `public/images/themes/mandap-darkred/goldenfloral-decoration.webp`
- `public/images/themes/mandap-darkred/goldenline-decoration.webp`
- `public/images/themes/mandap-darkred/heart.svg`
- `public/images/themes/mandap-darkred/kolam-decoration.webp`
- `public/images/themes/mandap-darkred/line-decoration.webp`
- `public/images/themes/mandap-darkred/om-decoration.webp`
- `public/images/themes/mandap-darkred/swan.webp`
- `public/images/themes/mandap-darkred/temple-decoration.webp`
- `public/images/themes/mandap-darkred/wreath.webp`

**Phong bì** (1)

- `public/images/envelope/mandap_darkred.webp`

</details>

<details><summary>🟡 <b>Gấm Hoa - Đỏ</b> — <code>brocade_flower_red</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/gam-hoa-do/demo
- Họ khối: `brocade_flower_red`
- Thư mục ảnh theme: `public/images/themes/brocade-flower-red/` (12 file)
- Còn thiếu: theme.json còn màu mặc định (chưa đo); thiếu cấu hình bìa trong coverConfigs.ts

**Spec** (3)

- `src/features/invitation/shell/specs/brocade_flower_red/capabilities.json`
- `src/features/invitation/shell/specs/brocade_flower_red/demo.json`
- `src/features/invitation/shell/specs/brocade_flower_red/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/brocade_flower_red/Ceremony.tsx`
- `src/features/invitation/shell/blocks/brocade_flower_red/Credit.tsx`
- `src/features/invitation/shell/blocks/brocade_flower_red/Dress.tsx`
- `src/features/invitation/shell/blocks/brocade_flower_red/Footer.tsx`
- `src/features/invitation/shell/blocks/brocade_flower_red/Gifts.tsx`
- `src/features/invitation/shell/blocks/brocade_flower_red/Guestbook.tsx`
- `src/features/invitation/shell/blocks/brocade_flower_red/index.ts`
- `src/features/invitation/shell/blocks/brocade_flower_red/Lightbox.tsx`
- `src/features/invitation/shell/blocks/brocade_flower_red/Paper.tsx`
- `src/features/invitation/shell/blocks/brocade_flower_red/Schedule.tsx`
- `src/features/invitation/shell/blocks/brocade_flower_red/Section1.tsx`
- `src/features/invitation/shell/blocks/brocade_flower_red/Venue.tsx`

**Ảnh theme** (12)

- `public/images/themes/brocade-flower-red/calendar-floral.webp`
- `public/images/themes/brocade-flower-red/corner-floral.webp`
- `public/images/themes/brocade-flower-red/dai-hoa.webp`
- `public/images/themes/brocade-flower-red/floral-big.webp`
- `public/images/themes/brocade-flower-red/flower-corner.webp`
- `public/images/themes/brocade-flower-red/hoa-hong.webp`
- `public/images/themes/brocade-flower-red/hoa-kim-cuong.webp`
- `public/images/themes/brocade-flower-red/hoa-trang.webp`
- `public/images/themes/brocade-flower-red/la-xanh.webp`
- `public/images/themes/brocade-flower-red/main-pattern.webp`
- `public/images/themes/brocade-flower-red/seal.webp`
- `public/images/themes/brocade-flower-red/tru.webp`

**Phong bì** (1)

- `public/images/envelope/brocade_flower_red.webp`

</details>

<details><summary>✅ <b>Hoa Rum - Trắng</b> — <code>calla_lily_white</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/hoa-rum-trang/demo
- Họ khối: `calla_lily_white`
- Bộ sinh: `scripts/clone/gen_calla_lily_white.cjs`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `calla_lily_white`
- Thư mục ảnh theme: `public/images/themes/calla-lily-white/` (8 file)
- Ghi chú: Họ mới, dựng 2026-11-11; so mắt bìa + thiệp mở, chưa chạy diff_dump/editor-sync

**Spec** (3)

- `src/features/invitation/shell/specs/calla_lily_white/capabilities.json`
- `src/features/invitation/shell/specs/calla_lily_white/demo.json`
- `src/features/invitation/shell/specs/calla_lily_white/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/calla_lily_white/Album.tsx`
- `src/features/invitation/shell/blocks/calla_lily_white/Banquet.tsx`
- `src/features/invitation/shell/blocks/calla_lily_white/Dress.tsx`
- `src/features/invitation/shell/blocks/calla_lily_white/Family.tsx`
- `src/features/invitation/shell/blocks/calla_lily_white/Footer.tsx`
- `src/features/invitation/shell/blocks/calla_lily_white/Gifts.tsx`
- `src/features/invitation/shell/blocks/calla_lily_white/Guestbook.tsx`
- `src/features/invitation/shell/blocks/calla_lily_white/Hero.tsx`
- `src/features/invitation/shell/blocks/calla_lily_white/index.ts`
- `src/features/invitation/shell/blocks/calla_lily_white/Paper.tsx`
- `src/features/invitation/shell/blocks/calla_lily_white/Schedule.tsx`
- `src/features/invitation/shell/blocks/calla_lily_white/Venue.tsx`

**Ảnh theme** (8)

- `public/images/themes/calla-lily-white/cake.webp`
- `public/images/themes/calla-lily-white/flower-background.webp`
- `public/images/themes/calla-lily-white/flower1-background.webp`
- `public/images/themes/calla-lily-white/leaf-background.webp`
- `public/images/themes/calla-lily-white/letter.webp`
- `public/images/themes/calla-lily-white/ring.webp`
- `public/images/themes/calla-lily-white/rum-background.webp`
- `public/images/themes/calla-lily-white/template-background.webp`

**Phong bì** (1)

- `public/images/envelope/calla_lily_white.webp`

**Dữ liệu khảo sát** (2)

- `docs/survey/raw/hoa_rum_trang_footer_html.json`
- `docs/survey/raw/hoa_rum_trang_open_html.json`

</details>

<details><summary>✅ <b>Mandap - Vàng</b> — <code>mandap_yellow</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/mandap-vang/demo
- Họ khối: `mandap_yellow`
- Bộ sinh: `scripts/clone/gen_mandap_yellow.cjs`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `mandap_yellow`
- Thư mục ảnh theme: `public/images/themes/mandap-yellow/` (20 file)
- Ghi chú: Họ mới, dựng 2026-11-11; stWidth=min(100vw,900px); chưa chạy diff_dump/editor-sync

**Spec** (3)

- `src/features/invitation/shell/specs/mandap_yellow/capabilities.json`
- `src/features/invitation/shell/specs/mandap_yellow/demo.json`
- `src/features/invitation/shell/specs/mandap_yellow/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/mandap_yellow/Album.tsx`
- `src/features/invitation/shell/blocks/mandap_yellow/Banquet.tsx`
- `src/features/invitation/shell/blocks/mandap_yellow/Dress.tsx`
- `src/features/invitation/shell/blocks/mandap_yellow/Family.tsx`
- `src/features/invitation/shell/blocks/mandap_yellow/Footer.tsx`
- `src/features/invitation/shell/blocks/mandap_yellow/Gifts.tsx`
- `src/features/invitation/shell/blocks/mandap_yellow/Guestbook.tsx`
- `src/features/invitation/shell/blocks/mandap_yellow/Hero.tsx`
- `src/features/invitation/shell/blocks/mandap_yellow/index.ts`
- `src/features/invitation/shell/blocks/mandap_yellow/Paper.tsx`
- `src/features/invitation/shell/blocks/mandap_yellow/Schedule.tsx`
- `src/features/invitation/shell/blocks/mandap_yellow/Venue.tsx`

**Ảnh theme** (20)

- `public/images/themes/mandap-yellow/arch-frame.webp`
- `public/images/themes/mandap-yellow/background-texture.webp`
- `public/images/themes/mandap-yellow/calendar-frame.webp`
- `public/images/themes/mandap-yellow/drum.webp`
- `public/images/themes/mandap-yellow/flower-decoration.webp`
- `public/images/themes/mandap-yellow/flower-garland.webp`
- `public/images/themes/mandap-yellow/flower2-decoration.webp`
- `public/images/themes/mandap-yellow/goldenline-decoration.webp`
- `public/images/themes/mandap-yellow/heart.svg`
- `public/images/themes/mandap-yellow/icon-decoration.webp`
- `public/images/themes/mandap-yellow/jar.webp`
- `public/images/themes/mandap-yellow/kalash-decoration.webp`
- `public/images/themes/mandap-yellow/kalash2-decoration.webp`
- `public/images/themes/mandap-yellow/kalash3-decoration.webp`
- `public/images/themes/mandap-yellow/kalash4-decoration.webp`
- `public/images/themes/mandap-yellow/leaf1-decoration.webp`
- `public/images/themes/mandap-yellow/line-decoration.webp`
- `public/images/themes/mandap-yellow/sceneindian-decoration.webp`
- `public/images/themes/mandap-yellow/tree-decoration.webp`
- `public/images/themes/mandap-yellow/wreath.webp`

**Phong bì** (1)

- `public/images/envelope/mandap_yellow.webp`

**Dữ liệu khảo sát** (15)

- `docs/survey/blocks/mandap_yellow/00.jsx`
- `docs/survey/blocks/mandap_yellow/01.jsx`
- `docs/survey/blocks/mandap_yellow/02.jsx`
- `docs/survey/blocks/mandap_yellow/03.jsx`
- `docs/survey/blocks/mandap_yellow/04.jsx`
- `docs/survey/blocks/mandap_yellow/05.jsx`
- `docs/survey/blocks/mandap_yellow/06.jsx`
- `docs/survey/blocks/mandap_yellow/07.jsx`
- `docs/survey/blocks/mandap_yellow/08.jsx`
- `docs/survey/blocks/mandap_yellow/09.jsx`
- `docs/survey/blocks/mandap_yellow/10.jsx`
- `docs/survey/blocks/mandap_yellow/11.jsx`
- `docs/survey/blocks/mandap_yellow/12.jsx`
- `docs/survey/raw/mandap_yellow_footer_html.json`
- `docs/survey/raw/mandap_yellow_open_html.json`

</details>

<details><summary>✅ <b>Mahal - Hồng</b> — <code>mahal_pink</code></summary>

- Nguồn: https://chungdoi.com/vi/mau-thiep/mahal-hong/demo
- Họ khối: `mahal_pink`
- Bộ sinh: `scripts/clone/gen_mahal_pink.cjs`
- Bìa: `src/features/invitation/components/covers/coverConfigs.ts` → khóa `mahal_pink`
- Thư mục ảnh theme: `public/images/themes/mahal-pink/` (24 file)
- Ghi chú: Họ mới, dựng 2026-11-11; chưa chạy diff_dump/editor-sync

**Spec** (3)

- `src/features/invitation/shell/specs/mahal_pink/capabilities.json`
- `src/features/invitation/shell/specs/mahal_pink/demo.json`
- `src/features/invitation/shell/specs/mahal_pink/theme.json`

**Khối** (12)

- `src/features/invitation/shell/blocks/mahal_pink/Album.tsx`
- `src/features/invitation/shell/blocks/mahal_pink/Banquet.tsx`
- `src/features/invitation/shell/blocks/mahal_pink/Dress.tsx`
- `src/features/invitation/shell/blocks/mahal_pink/Family.tsx`
- `src/features/invitation/shell/blocks/mahal_pink/Footer.tsx`
- `src/features/invitation/shell/blocks/mahal_pink/Gifts.tsx`
- `src/features/invitation/shell/blocks/mahal_pink/Guestbook.tsx`
- `src/features/invitation/shell/blocks/mahal_pink/Hero.tsx`
- `src/features/invitation/shell/blocks/mahal_pink/index.ts`
- `src/features/invitation/shell/blocks/mahal_pink/Paper.tsx`
- `src/features/invitation/shell/blocks/mahal_pink/Schedule.tsx`
- `src/features/invitation/shell/blocks/mahal_pink/Venue.tsx`

**Ảnh theme** (24)

- `public/images/themes/mahal-pink/arch-frame.webp`
- `public/images/themes/mahal-pink/bird.webp`
- `public/images/themes/mahal-pink/bird2.webp`
- `public/images/themes/mahal-pink/calendar-frame.webp`
- `public/images/themes/mahal-pink/envelope-bg.webp`
- `public/images/themes/mahal-pink/family-divider.webp`
- `public/images/themes/mahal-pink/flower1.webp`
- `public/images/themes/mahal-pink/flower2.webp`
- `public/images/themes/mahal-pink/flower3.webp`
- `public/images/themes/mahal-pink/flower4.webp`
- `public/images/themes/mahal-pink/flower5.webp`
- `public/images/themes/mahal-pink/flower6.webp`
- `public/images/themes/mahal-pink/gold-frame.webp`
- `public/images/themes/mahal-pink/gold-line.webp`
- `public/images/themes/mahal-pink/house.webp`
- `public/images/themes/mahal-pink/house2.webp`
- `public/images/themes/mahal-pink/house3.webp`
- `public/images/themes/mahal-pink/medallion-candle.webp`
- `public/images/themes/mahal-pink/medallion-gate.webp`
- `public/images/themes/mahal-pink/medallion-pen.webp`
- `public/images/themes/mahal-pink/paper.webp`
- `public/images/themes/mahal-pink/scene.webp`
- `public/images/themes/mahal-pink/tree-background.webp`
- `public/images/themes/mahal-pink/tree.webp`

**Phong bì** (1)

- `public/images/envelope/mahal_pink.webp`

**Dữ liệu khảo sát** (12)

- `docs/survey/blocks/mahal_pink/00.jsx`
- `docs/survey/blocks/mahal_pink/01.jsx`
- `docs/survey/blocks/mahal_pink/02.jsx`
- `docs/survey/blocks/mahal_pink/03.jsx`
- `docs/survey/blocks/mahal_pink/04.jsx`
- `docs/survey/blocks/mahal_pink/05.jsx`
- `docs/survey/blocks/mahal_pink/06.jsx`
- `docs/survey/blocks/mahal_pink/07.jsx`
- `docs/survey/blocks/mahal_pink/08.jsx`
- `docs/survey/blocks/mahal_pink/09.jsx`
- `docs/survey/blocks/mahal_pink/10.jsx`
- `docs/survey/raw/mahal_pink_open_html.json`

</details>

## Thay đổi ở lần quét gần nhất

- **jasmine_green** — file đã cập nhật
  - `src/features/invitation/shell/blocks/jasmine_green/Gifts.tsx`

## Lịch sử các lần quét

- 2026-11-15 15:37 — 1 thay đổi: jasmine_green: file đã cập nhật
- 2026-11-15 15:30 — 1 thay đổi: jasmine_green: file đã cập nhật
- 2026-11-15 14:38 — 33 thay đổi: minimalism_brown: file mới; song_hy_green: file mới; boho_floral_green: file mới; song_hy_red: file mới; minimalism_darkbrown: file mới; double_dragon_red: file mới…
- 2026-11-11 18:08 — 91 thay đổi: minimalism_darkred: file đã cập nhật; song_hy_green: file đã cập nhật; boho_floral_green: file đã cập nhật; song_hy_v2_red: file đã cập nhật; song_hy_red: file đã cập nhật; silk_ribbon_green: file đã cập nhật…
- 2026-11-11 12:52 — 0 thay đổi
- 2026-11-11 12:45 — 1 thay đổi: jasmine_green: file đã cập nhật
- 2026-11-11 12:43 — 2 thay đổi: jasmine_green: mẫu mới vào sổ; mahal_pink: file đã cập nhật
- 2026-11-11 08:49 — 0 thay đổi
- 2026-11-11 08:35 — 3 thay đổi: calla_lily_white: file đã cập nhật; mandap_yellow: file đã cập nhật; mahal_pink: file đã cập nhật
- 2026-11-11 08:35 — 0 thay đổi
- 2026-11-11 08:35 — 0 thay đổi
- 2026-11-11 08:35 — 91 thay đổi: minimalism_darkred: mẫu mới vào sổ; minimalism_brown: mẫu mới vào sổ; song_hy_green: mẫu mới vào sổ; boho_floral_green: mẫu mới vào sổ; song_hy_v2_red: mẫu mới vào sổ; song_hy_red: mẫu mới vào sổ…
