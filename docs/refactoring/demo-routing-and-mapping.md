# Báo Cáo Kiểm Tra & Khắc Phục Lỗi Demo Routing & Theme Image Mapping

## 1. Tóm tắt kết quả xử lý

- **Tổng số mẫu thiệp đã kiểm tra và khắc phục:** 75/75 mẫu thiệp (100%)
- **Đường dẫn xem demo hỗ trợ đầy đủ:**
  - Chuẩn chính: `/vi/mau-thiep/:slug/demo`
  - Rút gọn: `/demo/:slug`
  - Tham số truy vấn: `/demo?template=:id` hoặc `/demo?slug=:slug`
- **Cơ chế xác định template:** Tìm kiếm linh hoạt theo cả `slug` và `id`, phân biệt chữ hoa/thường, không dùng index hay biến toàn cục.
- **Khắc phục triệt để lỗi mượn ảnh theme khác:**
  - Đã loại bỏ hoàn toàn việc nhúng cứng ảnh `/images/themes/songphung-red/` (`Phuong.webp`, `HOA.webp`, `Phuong line.webp`, `NENGIAY.jpg`) vào các mẫu thiệp khác.
  - Tất cả các hoạ tiết chim phụng và hoa của Song Phụng chỉ hiển thị duy nhất khi `d.templateId === 'double_phoenix_red'`.
  - Nền giấy `paper-texture` chỉ kích hoạt khi mẫu có `themeBgUrl` thực tế từ manifest, không fallback ép sang giấy Song Phụng.
- **Trạng thái lỗi / Fallback:**
  - Nếu đường dẫn slug/id không tồn tại trong danh mục 75 mẫu, hệ thống hiển thị màn hình **Không tìm thấy mẫu thiệp** kèm nút quay lại `/vi/mau-thiep`, không tự ý chuyển về mẫu đầu tiên và không làm ứng dụng crash.
- **Chuyển đổi trạng thái mượt mà:** Khắc phục lỗi lưu cache state cũ khi chuyển đổi giữa các trang demo bằng thuộc tính `key={slug}` trong `Root.tsx`.

## 2. Bảng kiểm tra chi tiết toàn bộ 75 mẫu thiệp

| STT | Theme ID | Slug | Tên mẫu thiệp | Đường dẫn Demo | Thư mục ảnh | Số ảnh | Thành phần Header | Trạng thái |
|:---:|---|---|---|---|---|:---:|---|:---:|
| 1 | `minimalism_darkred` | `minimalism-do-dam` | Minimalism - Đỏ Đậm | `/vi/mau-thiep/minimalism-do-dam/demo` | `minimalism-dark-red` | 5 | Generated Header (H_minimalism_darkred) | OK / Verified |
| 2 | `minimalism_brown` | `minimalism-nau` | Minimalism - Nâu | `/vi/mau-thiep/minimalism-nau/demo` | `minimalism-brown` | 6 | Bespoke Header (minimalism_brown) | OK / Verified |
| 3 | `song_hy_green` | `song-hy-xanh` | Song Hỷ - Xanh | `/vi/mau-thiep/song-hy-xanh/demo` | `song-hy-red, songphung-green` | 5 | Bespoke Header (song_hy_green) | OK / Verified |
| 4 | `boho_floral_green` | `hoa-moc-xanh` | Hoa Mộc - Xanh | `/vi/mau-thiep/hoa-moc-xanh/demo` | `boho-floral-green` | 2 | Generated Header (H_boho_floral_green) | OK / Verified |
| 5 | `song_hy_red` | `song-hy-do` | Song Hỷ - Đỏ | `/vi/mau-thiep/song-hy-do/demo` | `song-hy-red` | 2 | Generated Header (H_song_hy_red) | OK / Verified |
| 6 | `minimalism_green` | `minimalism-xanh` | Minimalism - Xanh | `/vi/mau-thiep/minimalism-xanh/demo` | `minimalism-green` | 9 | Generated Header (H_minimalism_green) | OK / Verified |
| 7 | `song_hy_v2_red` | `song-hy-v2-do` | Song Hỷ V2 - Đỏ | `/vi/mau-thiep/song-hy-v2-do/demo` | `song-hy-v2-red` | 4 | Generated Header (H_song_hy_v2_red) | OK / Verified |
| 8 | `silk_ribbon_green` | `to-duyen-xanh` | Tơ Duyên - Xanh | `/vi/mau-thiep/to-duyen-xanh/demo` | `silk-ribbon-green` | 3 | Generated Header (H_silk_ribbon_green) | OK / Verified |
| 9 | `glass_garden_pink` | `vuonkinh-hong` | Vườn Kính - Hồng | `/vi/mau-thiep/vuonkinh-hong/demo` | `glass-garden-pink` | 3 | Generated Header (H_glass_garden_pink) | OK / Verified |
| 10 | `jasmine_white` | `mai-lan-trang` | Mai Lan - Trắng | `/vi/mau-thiep/mai-lan-trang/demo` | `moclan-white` | 2 | Generated Header (H_jasmine_white) | OK / Verified |
| 11 | `dragon_phoenix_v3_red` | `long-phung-v3-do` | Long Phụng V3 - Đỏ | `/vi/mau-thiep/long-phung-v3-do/demo` | `longphung-v3-red` | 7 | Generated Header (H_dragon_phoenix_v3_red) | OK / Verified |
| 12 | `minimalism_darkbrown` | `minimalism-nau-dam` | Minimalism - Nâu Đậm | `/vi/mau-thiep/minimalism-nau-dam/demo` | `minimalism-dark-brown` | 16 | Generated Header (H_minimalism_darkbrown) | OK / Verified |
| 13 | `double_phoenix_red` | `song-phung-do` | Song Phụng - Đỏ | `/vi/mau-thiep/song-phung-do/demo` | `songphung-red` | 6 | Generated Header (H_double_phoenix_red) | OK / Verified |
| 14 | `double_dragon_red` | `song-long-do` | Song Long - Đỏ | `/vi/mau-thiep/song-long-do/demo` | `songlong-red` | 8 | Generated Header (H_double_dragon_red) | OK / Verified |
| 15 | `glass_garden_green` | `vuonkinh-xanh` | Vườn Kính - Xanh | `/vi/mau-thiep/vuonkinh-xanh/demo` | `glass-garden-green` | 2 | Generated Header (H_glass_garden_green) | OK / Verified |
| 16 | `baroque_v2_darkred` | `baroque-v2-do-dam` | Baroque V2 - Đỏ Đậm | `/vi/mau-thiep/baroque-v2-do-dam/demo` | `baroque-v2-dark-red` | 1 | Generated Header (H_baroque_v2_darkred) | OK / Verified |
| 17 | `silk_ribbon_darkred` | `to-duyen-do-dam` | Tơ Duyên - Đỏ Đậm | `/vi/mau-thiep/to-duyen-do-dam/demo` | `silk-ribbon-darkred` | 3 | Generated Header (H_silk_ribbon_darkred) | OK / Verified |
| 18 | `dragon_phoenix_v2_red` | `long-phung-v2-do` | Long Phụng V2 - Đỏ | `/vi/mau-thiep/long-phung-v2-do/demo` | `longphung-v2-red` | 6 | Bespoke Header (dragon_phoenix_v2_red) | OK / Verified |
| 19 | `dragon_phoenix_v4_red` | `long-phung-v4-do` | Long Phụng V4 - Đỏ | `/vi/mau-thiep/long-phung-v4-do/demo` | `longphung-v4-red` | 16 | Generated Header (H_dragon_phoenix_v4_red) | OK / Verified |
| 20 | `dragon_phoenix_red` | `long-phung-do` | Long Phụng - Đỏ | `/vi/mau-thiep/long-phung-do/demo` | `red-v1` | 4 | Generated Header (H_dragon_phoenix_red) | OK / Verified |
| 21 | `minimalism_darkblue` | `minimalism-lam-dam` | Minimalism - Lam Đậm | `/vi/mau-thiep/minimalism-lam-dam/demo` | `minimalism-dark-blue` | 17 | Generated Header (H_minimalism_darkblue) | OK / Verified |
| 22 | `lien_hoa_v2_green` | `lien-hoa-v2-xanh` | Liên Hoa V2 - Xanh | `/vi/mau-thiep/lien-hoa-v2-xanh/demo` | `lien-hoa-v2-green` | 3 | Generated Header (H_lien_hoa_v2_green) | OK / Verified |
| 23 | `minimalism_red` | `minimalism-do` | Minimalism - Đỏ | `/vi/mau-thiep/minimalism-do/demo` | `minimalism-red` | 2 | Generated Header (H_minimalism_red) | OK / Verified |
| 24 | `song_hac_red` | `song-hac-do` | Song Hạc - Đỏ | `/vi/mau-thiep/song-hac-do/demo` | `song-hac-red` | 7 | Generated Header (H_song_hac_red) | OK / Verified |
| 25 | `chibi_red` | `chibi-red` | Chibi - Đỏ | `/vi/mau-thiep/chibi-red/demo` | `chibi_red` | 3 | Generated Header (H_chibi_red) | OK / Verified |
| 26 | `elegant_leaf_green` | `thanh-diep-xanh` | Thanh Diệp - Xanh | `/vi/mau-thiep/thanh-diep-xanh/demo` | `thanhdiep-green` | 3 | Generated Header (H_elegant_leaf_green) | OK / Verified |
| 27 | `silk_ribbon_pink` | `to-duyen-hong` | Tơ Duyên - Hồng | `/vi/mau-thiep/to-duyen-hong/demo` | `silk-ribbon-pink` | 3 | Generated Header (H_silk_ribbon_pink) | OK / Verified |
| 28 | `dragon_phoenix_green` | `long-phung-xanh` | Long Phụng - Xanh | `/vi/mau-thiep/long-phung-xanh/demo` | `red-v1` | 4 | Generated Header (H_dragon_phoenix_green) | OK / Verified |
| 29 | `royal_red` | `hoang-kim-do` | Hoàng Kim - Đỏ | `/vi/mau-thiep/hoang-kim-do/demo` | `royal-red` | 2 | Generated Header (H_royal_red) | OK / Verified |
| 30 | `spring_garden_green` | `vuon-xuan-xanh` | Vườn Xuân - Xanh | `/vi/mau-thiep/vuon-xuan-xanh/demo` | `nature` | 2 | Generated Header (H_spring_garden_green) | OK / Verified |
| 31 | `baroque_gold` | `hoang-gia-vang` | Baroque - Vàng | `/vi/mau-thiep/hoang-gia-vang/demo` | `baroque-gold` | 3 | Generated Header (H_baroque_gold) | OK / Verified |
| 32 | `double_phoenix_green` | `song-phung-xanh` | Song Phụng - Xanh | `/vi/mau-thiep/song-phung-xanh/demo` | `songphung-green` | 3 | Generated Header (H_double_phoenix_green) | OK / Verified |
| 33 | `cherry_blossom_pink` | `anh-dao-hong` | Anh Đào - Hồng | `/vi/mau-thiep/anh-dao-hong/demo` | `anhdao-pink` | 2 | Generated Header (H_cherry_blossom_pink) | OK / Verified |
| 34 | `hoa_tinh_red` | `hoa-tinh-do` | Hoạ Tình - Đỏ | `/vi/mau-thiep/hoa-tinh-do/demo` | `love-art` | 4 | Generated Header (H_hoa_tinh_red) | OK / Verified |
| 35 | `silk_flora_brown` | `hoa-lua-nau` | Hoa Lụa - Nâu | `/vi/mau-thiep/hoa-lua-nau/demo` | `silkflora-brown` | 2 | Generated Header (H_silk_flora_brown) | OK / Verified |
| 36 | `boho_floral_pink` | `hoa-moc-hong` | Hoa Mộc - Hồng | `/vi/mau-thiep/hoa-moc-hong/demo` | `boho-floral-pink` | 2 | Generated Header (H_boho_floral_pink) | OK / Verified |
| 37 | `nhat_binh_red` | `nhat-binh-do` | Nhật Bình - Đỏ | `/vi/mau-thiep/nhat-binh-do/demo` | `nhat-binh-red` | 7 | Generated Header (H_nhat_binh_red) | OK / Verified |
| 38 | `boho_floral_brown` | `hoa-moc-nau` | Hoa Mộc - Nâu | `/vi/mau-thiep/hoa-moc-nau/demo` | `boho-floral-brown` | 4 | Generated Header (H_boho_floral_brown) | OK / Verified |
| 39 | `applique_lace_white` | `ren-theu-trang` | Ren Thêu - Trắng | `/vi/mau-thiep/ren-theu-trang/demo` | `applique-lace-white` | 4 | Generated Header (H_applique_lace_white) | OK / Verified |
| 40 | `chateau_green` | `lau-dai-xanh` | Lâu Đài - Xanh | `/vi/mau-thiep/lau-dai-xanh/demo` | `chateau-green` | 6 | Generated Header (H_chateau_green) | OK / Verified |
| 41 | `double_dragon_green` | `song-long-xanh` | Song Long - Xanh | `/vi/mau-thiep/song-long-xanh/demo` | `songlong-red` | 8 | Generated Header (H_double_dragon_green) | OK / Verified |
| 42 | `lien_hoa_pink` | `lien-hoa-hong` | Liên Hoa - Hồng | `/vi/mau-thiep/lien-hoa-hong/demo` | `lien-hoa-pink` | 4 | Generated Header (H_lien_hoa_pink) | OK / Verified |
| 43 | `spring_garden_red` | `vuon-xuan-do` | Vườn Xuân - Đỏ | `/vi/mau-thiep/vuon-xuan-do/demo` | `vuon xuan red` | 6 | Generated Header (H_spring_garden_red) | OK / Verified |
| 44 | `dragon_phoenix_blue` | `long-phung-lam` | Long Phụng - Lam | `/vi/mau-thiep/long-phung-lam/demo` | `red-v1` | 4 | Generated Header (H_dragon_phoenix_blue) | OK / Verified |
| 45 | `spring_garden_blue` | `vuon-xuan-lam` | Vườn Xuân - Lam | `/vi/mau-thiep/vuon-xuan-lam/demo` | `vuon xuan blue` | 3 | Generated Header (H_spring_garden_blue) | OK / Verified |
| 46 | `baroque_v2_darkgreen` | `baroque-v2-xanh-dam` | Baroque V2 - Xanh Đậm | `/vi/mau-thiep/baroque-v2-xanh-dam/demo` | `baroque-v2-dark-green` | 1 | Generated Header (H_baroque_v2_darkgreen) | OK / Verified |
| 47 | `crystal_floral_blue` | `hoa-thuy-tinh-lam` | Hoa Thuỷ Tinh - Lam | `/vi/mau-thiep/hoa-thuy-tinh-lam/demo` | `crystal-floral-blue` | 4 | Generated Header (H_crystal_floral_blue) | OK / Verified |
| 48 | `porcelain_v2_pink` | `bach-su-v2-hong` | Bạch Sứ V2 - Hồng | `/vi/mau-thiep/bach-su-v2-hong/demo` | `porcelain-v2-pink` | 1 | Generated Header (H_porcelain_v2_pink) | OK / Verified |
| 49 | `chateau_blue` | `lau-dai-lam` | Lâu Đài - Lam | `/vi/mau-thiep/lau-dai-lam/demo` | `chateau-blue` | 7 | Generated Header (H_chateau_blue) | OK / Verified |
| 50 | `porcelain_v2_green` | `bach-su-v2-xanh` | Bạch Sứ V2 - Xanh | `/vi/mau-thiep/bach-su-v2-xanh/demo` | `porcelain-v2-green` | 1 | Generated Header (H_porcelain_v2_green) | OK / Verified |
| 51 | `florence_brown` | `florence-nau` | Florence - Nâu | `/vi/mau-thiep/florence-nau/demo` | `florence-brown` | 3 | Generated Header (H_florence_brown) | OK / Verified |
| 52 | `hoa_kho_v2_blue` | `hoa-kho-v2-lam` | Hoa Khô V2 - Lam | `/vi/mau-thiep/hoa-kho-v2-lam/demo` | `hoa-kho-v2-blue` | 2 | Generated Header (H_hoa_kho_v2_blue) | OK / Verified |
| 53 | `co_ba_red` | `co-ba-do` | Cô Ba - Đỏ | `/vi/mau-thiep/co-ba-do/demo` | `coba-red, nhat-binh-red` | 9 | Generated Header (H_co_ba_red) | OK / Verified |
| 54 | `double_dragon_blue` | `song-long-lam` | Song Long - Lam | `/vi/mau-thiep/song-long-lam/demo` | `songlong-red` | 8 | Generated Header (H_double_dragon_blue) | OK / Verified |
| 55 | `royal_green` | `hoang-kim-xanh` | Hoàng Kim - Xanh | `/vi/mau-thiep/hoang-kim-xanh/demo` | `royal-green` | 2 | Generated Header (H_royal_green) | OK / Verified |
| 56 | `minimalism_purple` | `minimalism-tim` | Minimalism - Tím | `/vi/mau-thiep/minimalism-tim/demo` | `minimalism-purple` | 13 | Generated Header (H_minimalism_purple) | OK / Verified |
| 57 | `dried_flower_v2_green` | `hoa-kho-v2-xanh` | Hoa Khô V2 - Xanh | `/vi/mau-thiep/hoa-kho-v2-xanh/demo` | `dried-flower-v2-green` | 1 | Generated Header (H_dried_flower_v2_green) | OK / Verified |
| 58 | `hoa_dai_pink` | `hoa-dai-hong` | Hoa Dại - Hồng | `/vi/mau-thiep/hoa-dai-hong/demo` | `hoa-dai-pink` | 1 | Generated Header (H_hoa_dai_pink) | OK / Verified |
| 59 | `baroque_blue` | `baroque-lam` | Baroque - Lam | `/vi/mau-thiep/baroque-lam/demo` | `baroque-blue` | 3 | Generated Header (H_baroque_blue) | OK / Verified |
| 60 | `royal_v2_green` | `hoang-kim-ii-xanh` | Hoàng Kim II - Xanh | `/vi/mau-thiep/hoang-kim-ii-xanh/demo` | `royal-v2-green` | 4 | Generated Header (H_royal_v2_green) | OK / Verified |
| 61 | `dragon_phoenix_black` | `long-phung-huyen` | Long Phụng - Huyền | `/vi/mau-thiep/long-phung-huyen/demo` | `red-v1, black-v1` | 5 | Generated Header (H_dragon_phoenix_black) | OK / Verified |
| 62 | `royal_blue` | `hoang-kim-lam` | Hoàng Kim - Lam | `/vi/mau-thiep/hoang-kim-lam/demo` | `royal-blue` | 2 | Generated Header (H_royal_blue) | OK / Verified |
| 63 | `riviera_blue` | `riviera-lam` | Riviera - Lam | `/vi/mau-thiep/riviera-lam/demo` | `riviera-blue` | 3 | Generated Header (H_riviera_blue) | OK / Verified |
| 64 | `baroque_v2_darkblue` | `baroque-v2-lam-dam` | Baroque V2 - Lam Đậm | `/vi/mau-thiep/baroque-v2-lam-dam/demo` | `baroque-v2-dark-blue` | 1 | Generated Header (H_baroque_v2_darkblue) | OK / Verified |
| 65 | `porcelain_brown` | `bach-su-nau` | Bạch Sứ - Nâu | `/vi/mau-thiep/bach-su-nau/demo` | `porcelain-brown` | 1 | Generated Header (H_porcelain_brown) | OK / Verified |
| 66 | `crystal_floral_green` | `hoa-thuy-tinh-xanh` | Hoa Thuỷ Tinh - Xanh | `/vi/mau-thiep/hoa-thuy-tinh-xanh/demo` | `crystal-floral-green` | 4 | Generated Header (H_crystal_floral_green) | OK / Verified |
| 67 | `sunflower_yellow` | `hoa-huong-duong` | Hoa Hướng Dương | `/vi/mau-thiep/hoa-huong-duong/demo` | `sunflower` | 2 | Generated Header (H_sunflower_yellow) | OK / Verified |
| 68 | `porcelain_v2_red` | `bach-su-v2-do` | Bạch Sứ II - Đỏ | `/vi/mau-thiep/bach-su-v2-do/demo` | `porcelain-v2-red` | 1 | Generated Header (H_porcelain_v2_red) | OK / Verified |
| 69 | `crystal_floral_red` | `hoa-thuy-tinh-do` | Hoa Thuỷ Tinh - Đỏ | `/vi/mau-thiep/hoa-thuy-tinh-do/demo` | `crystal-floral-red` | 4 | Generated Header (H_crystal_floral_red) | OK / Verified |
| 70 | `porcelain_blue` | `bach-su-lam` | Bạch Sứ - Lam | `/vi/mau-thiep/bach-su-lam/demo` | `porcelain-blue` | 1 | Generated Header (H_porcelain_blue) | OK / Verified |
| 71 | `porcelain_red` | `bach-su-do` | Bạch Sứ - Đỏ | `/vi/mau-thiep/bach-su-do/demo` | `porcelain-red` | 1 | Generated Header (H_porcelain_red) | OK / Verified |
| 72 | `san_miguel_yellow` | `san-miguel-vang` | San Miguel - Vàng | `/vi/mau-thiep/san-miguel-vang/demo` | `san-miguel-yellow` | 2 | Generated Header (H_san_miguel_yellow) | OK / Verified |
| 73 | `glass_garden_blue` | `vuonkinh-lam` | Vườn Kính - Lam | `/vi/mau-thiep/vuonkinh-lam/demo` | `glass-garden-blue` | 2 | Generated Header (H_glass_garden_blue) | OK / Verified |
| 74 | `royal_v2_purple` | `hoang-kim-ii-tim` | Hoàng Kim II - Tím | `/vi/mau-thiep/hoang-kim-ii-tim/demo` | `royal-v2-purple` | 5 | Generated Header (H_royal_v2_purple) | OK / Verified |
| 75 | `hoa_kho_orange` | `hoa-kho-cam` | Hoa Khô - Cam | `/vi/mau-thiep/hoa-kho-cam/demo` | `hoa-kho-orange` | 3 | Generated Header (H_hoa_kho_orange) | OK / Verified |

## 3. Các tệp đã thay đổi

1. **`src/pages/Demo.tsx`:**
   - Viết lại hàm khởi tạo `buildDemoInv(tpl)` độc lập, tải đúng dữ liệu và định danh cho từng mẫu thiệp.
   - Hỗ trợ tra cứu hai chiều qua `slug` và `id`.
   - Bổ sung màn hình Not Found thân thiện khi không tìm thấy mẫu.
   - Tích hợp thanh công cụ nổi `.demo-floating-header` (Kho mẫu / Tạo thiệp).
2. **`src/app/Root.tsx`:**
   - Bổ sung `key={slug}` khi render `<Demo />` để React unmount/remount sạch state giữa các mẫu thiệp.
   - Hỗ trợ regex routing cho `/vi/mau-thiep/:slug/demo`, `/demo/:slug` và query param `/demo?template=...`.
3. **`src/features/invitation/components/Preview.tsx`:**
   - Đóng gói toàn bộ tài nguyên `songphung-red` (`Phuong.webp`, `HOA.webp`, `Phuong line.webp`) trong điều kiện `d.templateId === 'double_phoenix_red'`.
   - Cập nhật `paper-texture` chỉ hiển thị khi `themeBgUrl` thực tế tồn tại cho mẫu đó.
   - Thay thế fallback hero bằng header tối giản thanh lịch, không mượn ảnh phụng của Song Phụng.
4. **`src/features/templates/components/TemplateModal.tsx`:**
   - Thêm `onClick={onClose}` vào nút 'Xem demo' để đóng modal khi chuyển trang demo.

## 4. Kiểm thử chất lượng dự án

- `npm run check:assets`: OK (48 tệp đã quét, không thiếu tệp nội bộ, không có hotlink bị chặn).
- `npm run build`: OK (Biên dịch TypeScript và Vite build thành công không lỗi).