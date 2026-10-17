# Báo cáo Đối Soát và Tích Hợp Assets 75/75 Mẫu Thiệp Cưới

## 1. Tóm tắt kết quả đối soát

- **Tổng số mẫu thiệp trong Registry (`TEMPLATES`):** 75 mẫu
- **Tổng số mẫu thiệp đã đối soát và xử lý thành công:** 75/75 mẫu (100%)
- **Tổng số thư mục theme vật lý trên đĩa:** 70 thư mục
- **Tổng số tệp ảnh trong các thư mục theme:** 273 tệp
- **Tổng dung lượng assets:** 42.94 MB
- **Số tệp hỏng / không đọc được:** 0 tệp (100% tệp hợp lệ và đọc được metadata)
- **Số tệp trùng lặp nội dung (MD5 hash):** 8 tệp (chủ yếu là vân giấy dùng chung giữa các biến thể màu)

## 2. Giải trình nguyên nhân chênh lệch 69 vs 75 ở báo cáo cũ

1. **Báo cáo cũ đếm số thư mục vật lý thay vì đếm số mẫu thiệp trong ứng dụng:**
   - Ứng dụng khai báo đúng 75 mẫu thiệp trong `src/features/templates/data/templates.ts`.
   - Tuy nhiên, 6 mẫu thiệp là các biến thể màu cùng dòng thiết kế dùng chung thư mục hoạ tiết:
     - **Long Phụng V1:** 4 mẫu (`dragon_phoenix_red`, `dragon_phoenix_green`, `dragon_phoenix_blue`, `dragon_phoenix_black`) dùng chung thư mục `red-v1` (+ `black-v1`). (Độ lệch: 3 mẫu)
     - **Song Long:** 3 mẫu (`double_dragon_red`, `double_dragon_green`, `double_dragon_blue`) dùng chung thư mục `songlong-red`. (Độ lệch: 2 mẫu)
     - **Song Hỷ:** 2 mẫu (`song_hy_red`, `song_hy_green`) dùng chung thư mục `song-hy-red`. (Độ lệch: 1 mẫu)
     - Tổng số mẫu dùng chung: `3 + 2 + 1 = 6 mẫu`.
2. **Thư mục `songlong-red` bị thiếu trên đĩa:**
   - Cả 3 mẫu Song Long tham chiếu đến thư mục `images/themes/songlong-red/` gồm 6 tệp (`dragon_left.webp`, `dragon_right.webp`, `wave.webp`, `cloud_big.webp`, `cloud_small.webp`, `chinese_happiness.webp`), nhưng thư mục này chưa được tải về trước đó.
   - Đã tải bổ sung đầy đủ `songlong-red`, nâng tổng số thư mục theme trên đĩa lên **70 thư mục**, đáp ứng đủ 100% tài nguyên cho cả 75 mẫu thiệp.

## 3. Bảng đối soát chi tiết 75/75 Mẫu Thiệp Cưới

| STT | Theme ID | Tên mẫu thiệp | In App Registry | Theme Folder(s) | Image Count | Trạng thái tích hợp |
|---|---|---|---|---|---|---|
| 1 | `minimalism_darkred` | Minimalism - Đỏ Đậm | Yes | `minimalism-dark-red` | 5 | Active / Integrated |
| 2 | `minimalism_brown` | Minimalism - Nâu | Yes | `minimalism-brown` | 6 | Active / Integrated |
| 3 | `song_hy_green` | Song Hỷ - Xanh | Yes | `song-hy-red`, `songphung-green` | 5 | Active / Shared (`song_hy_red`) |
| 4 | `boho_floral_green` | Hoa Mộc - Xanh | Yes | `boho-floral-green` | 2 | Active / Integrated |
| 5 | `song_hy_red` | Song Hỷ - Đỏ | Yes | `song-hy-red` | 2 | Active / Shared (`song_hy_green`) |
| 6 | `minimalism_green` | Minimalism - Xanh | Yes | `minimalism-green` | 9 | Active / Integrated |
| 7 | `song_hy_v2_red` | Song Hỷ V2 - Đỏ | Yes | `song-hy-v2-red` | 4 | Active / Integrated |
| 8 | `silk_ribbon_green` | Tơ Duyên - Xanh | Yes | `silk-ribbon-green` | 3 | Active / Integrated |
| 9 | `glass_garden_pink` | Vườn Kính - Hồng | Yes | `glass-garden-pink` | 3 | Active / Integrated |
| 10 | `jasmine_white` | Mai Lan - Trắng | Yes | `moclan-white` | 2 | Active / Integrated |
| 11 | `dragon_phoenix_v3_red` | Long Phụng V3 - Đỏ | Yes | `longphung-v3-red` | 7 | Active / Integrated |
| 12 | `minimalism_darkbrown` | Minimalism - Nâu Đậm | Yes | `minimalism-dark-brown` | 16 | Active / Integrated |
| 13 | `double_phoenix_red` | Song Phụng - Đỏ | Yes | `songphung-red` | 6 | Active / Integrated |
| 14 | `double_dragon_red` | Song Long - Đỏ | Yes | `songlong-red` | 8 | Active / Shared (`double_dragon_green`, `double_dragon_blue`) |
| 15 | `glass_garden_green` | Vườn Kính - Xanh | Yes | `glass-garden-green` | 2 | Active / Integrated |
| 16 | `baroque_v2_darkred` | Baroque V2 - Đỏ Đậm | Yes | `baroque-v2-dark-red` | 1 | Active / Integrated |
| 17 | `silk_ribbon_darkred` | Tơ Duyên - Đỏ Đậm | Yes | `silk-ribbon-darkred` | 3 | Active / Integrated |
| 18 | `dragon_phoenix_v2_red` | Long Phụng V2 - Đỏ | Yes | `longphung-v2-red` | 6 | Active / Integrated |
| 19 | `dragon_phoenix_v4_red` | Long Phụng V4 - Đỏ | Yes | `longphung-v4-red` | 16 | Active / Integrated |
| 20 | `dragon_phoenix_red` | Long Phụng - Đỏ | Yes | `red-v1` | 4 | Active / Integrated |
| 21 | `minimalism_darkblue` | Minimalism - Lam Đậm | Yes | `minimalism-dark-blue` | 17 | Active / Integrated |
| 22 | `lien_hoa_v2_green` | Liên Hoa V2 - Xanh | Yes | `lien-hoa-v2-green` | 3 | Active / Integrated |
| 23 | `minimalism_red` | Minimalism - Đỏ | Yes | `minimalism-red` | 2 | Active / Integrated |
| 24 | `song_hac_red` | Song Hạc - Đỏ | Yes | `song-hac-red` | 7 | Active / Integrated |
| 25 | `chibi_red` | Chibi - Đỏ | Yes | `chibi_red` | 3 | Active / Integrated |
| 26 | `elegant_leaf_green` | Thanh Diệp - Xanh | Yes | `thanhdiep-green` | 3 | Active / Integrated |
| 27 | `silk_ribbon_pink` | Tơ Duyên - Hồng | Yes | `silk-ribbon-pink` | 3 | Active / Integrated |
| 28 | `dragon_phoenix_green` | Long Phụng - Xanh | Yes | `red-v1` | 4 | Active / Shared (`dragon_phoenix_red`, `dragon_phoenix_blue`, `dragon_phoenix_black`) |
| 29 | `royal_red` | Hoàng Kim - Đỏ | Yes | `royal-red` | 2 | Active / Integrated |
| 30 | `spring_garden_green` | Vườn Xuân - Xanh | Yes | `nature` | 2 | Active / Integrated |
| 31 | `baroque_gold` | Baroque - Vàng | Yes | `baroque-gold` | 3 | Active / Integrated |
| 32 | `double_phoenix_green` | Song Phụng - Xanh | Yes | `songphung-green` | 3 | Active / Integrated |
| 33 | `cherry_blossom_pink` | Anh Đào - Hồng | Yes | `anhdao-pink` | 2 | Active / Integrated |
| 34 | `hoa_tinh_red` | Hoạ Tình - Đỏ | Yes | `love-art` | 4 | Active / Integrated |
| 35 | `silk_flora_brown` | Hoa Lụa - Nâu | Yes | `silkflora-brown` | 2 | Active / Integrated |
| 36 | `boho_floral_pink` | Hoa Mộc - Hồng | Yes | `boho-floral-pink` | 2 | Active / Integrated |
| 37 | `nhat_binh_red` | Nhật Bình - Đỏ | Yes | `nhat-binh-red` | 7 | Active / Integrated |
| 38 | `boho_floral_brown` | Hoa Mộc - Nâu | Yes | `boho-floral-brown` | 4 | Active / Integrated |
| 39 | `applique_lace_white` | Ren Thêu - Trắng | Yes | `applique-lace-white` | 4 | Active / Integrated |
| 40 | `chateau_green` | Lâu Đài - Xanh | Yes | `chateau-green` | 6 | Active / Integrated |
| 41 | `double_dragon_green` | Song Long - Xanh | Yes | `songlong-red` | 8 | Active / Shared (`double_dragon_red`, `double_dragon_blue`) |
| 42 | `lien_hoa_pink` | Liên Hoa - Hồng | Yes | `lien-hoa-pink` | 4 | Active / Integrated |
| 43 | `spring_garden_red` | Vườn Xuân - Đỏ | Yes | `vuon xuan red` | 6 | Active / Integrated |
| 44 | `dragon_phoenix_blue` | Long Phụng - Lam | Yes | `red-v1` | 4 | Active / Shared (`dragon_phoenix_red`, `dragon_phoenix_green`, `dragon_phoenix_black`) |
| 45 | `spring_garden_blue` | Vườn Xuân - Lam | Yes | `vuon xuan blue` | 3 | Active / Integrated |
| 46 | `baroque_v2_darkgreen` | Baroque V2 - Xanh Đậm | Yes | `baroque-v2-dark-green` | 1 | Active / Integrated |
| 47 | `crystal_floral_blue` | Hoa Thuỷ Tinh - Lam | Yes | `crystal-floral-blue` | 4 | Active / Integrated |
| 48 | `porcelain_v2_pink` | Bạch Sứ V2 - Hồng | Yes | `porcelain-v2-pink` | 1 | Active / Integrated |
| 49 | `chateau_blue` | Lâu Đài - Lam | Yes | `chateau-blue` | 7 | Active / Integrated |
| 50 | `porcelain_v2_green` | Bạch Sứ V2 - Xanh | Yes | `porcelain-v2-green` | 1 | Active / Integrated |
| 51 | `florence_brown` | Florence - Nâu | Yes | `florence-brown` | 3 | Active / Integrated |
| 52 | `hoa_kho_v2_blue` | Hoa Khô V2 - Lam | Yes | `hoa-kho-v2-blue` | 2 | Active / Integrated |
| 53 | `co_ba_red` | Cô Ba - Đỏ | Yes | `coba-red`, `nhat-binh-red` | 9 | Active / Shared (`nhat_binh_red`) |
| 54 | `double_dragon_blue` | Song Long - Lam | Yes | `songlong-red` | 8 | Active / Shared (`double_dragon_red`, `double_dragon_green`) |
| 55 | `royal_green` | Hoàng Kim - Xanh | Yes | `royal-green` | 2 | Active / Integrated |
| 56 | `minimalism_purple` | Minimalism - Tím | Yes | `minimalism-purple` | 13 | Active / Integrated |
| 57 | `dried_flower_v2_green` | Hoa Khô V2 - Xanh | Yes | `dried-flower-v2-green` | 1 | Active / Integrated |
| 58 | `hoa_dai_pink` | Hoa Dại - Hồng | Yes | `hoa-dai-pink` | 1 | Active / Integrated |
| 59 | `baroque_blue` | Baroque - Lam | Yes | `baroque-blue` | 3 | Active / Integrated |
| 60 | `royal_v2_green` | Hoàng Kim II - Xanh | Yes | `royal-v2-green` | 4 | Active / Integrated |
| 61 | `dragon_phoenix_black` | Long Phụng - Huyền | Yes | `red-v1`, `black-v1` | 5 | Active / Shared (`dragon_phoenix_red`, `dragon_phoenix_green`, `dragon_phoenix_blue`) |
| 62 | `royal_blue` | Hoàng Kim - Lam | Yes | `royal-blue` | 2 | Active / Integrated |
| 63 | `riviera_blue` | Riviera - Lam | Yes | `riviera-blue` | 3 | Active / Integrated |
| 64 | `baroque_v2_darkblue` | Baroque V2 - Lam Đậm | Yes | `baroque-v2-dark-blue` | 1 | Active / Integrated |
| 65 | `porcelain_brown` | Bạch Sứ - Nâu | Yes | `porcelain-brown` | 1 | Active / Integrated |
| 66 | `crystal_floral_green` | Hoa Thuỷ Tinh - Xanh | Yes | `crystal-floral-green` | 4 | Active / Integrated |
| 67 | `sunflower_yellow` | Hoa Hướng Dương | Yes | `sunflower` | 2 | Active / Integrated |
| 68 | `porcelain_v2_red` | Bạch Sứ II - Đỏ | Yes | `porcelain-v2-red` | 1 | Active / Integrated |
| 69 | `crystal_floral_red` | Hoa Thuỷ Tinh - Đỏ | Yes | `crystal-floral-red` | 4 | Active / Integrated |
| 70 | `porcelain_blue` | Bạch Sứ - Lam | Yes | `porcelain-blue` | 1 | Active / Integrated |
| 71 | `porcelain_red` | Bạch Sứ - Đỏ | Yes | `porcelain-red` | 1 | Active / Integrated |
| 72 | `san_miguel_yellow` | San Miguel - Vàng | Yes | `san-miguel-yellow` | 2 | Active / Integrated |
| 73 | `glass_garden_blue` | Vườn Kính - Lam | Yes | `glass-garden-blue` | 2 | Active / Integrated |
| 74 | `royal_v2_purple` | Hoàng Kim II - Tím | Yes | `royal-v2-purple` | 5 | Active / Integrated |
| 75 | `hoa_kho_orange` | Hoa Khô - Cam | Yes | `hoa-kho-orange` | 3 | Active / Integrated |

## 4. Thống kê theo định dạng ảnh

- **WEBP**: 260 tệp (95.2%)
- **SVG**: 6 tệp (2.2%)
- **JPEG**: 4 tệp (1.5%)
- **PNG**: 3 tệp (1.1%)

## 5. Tệp trùng lặp phát hiện bằng mã băm (MD5)

| Tệp trùng | Tệp gốc đã có | Ý nghĩa |
|---|---|---|
| `longphung-v2-red/bg-frame.jpg` | `anhdao-pink/bg-full.jpg` | Vân giấy/hoa văn dùng chung giữa các biến thể |
| `minimalism-dark-brown/goldenline2-decoration.webp` | `minimalism-dark-blue/goldenline2-decoration.webp` | Vân giấy/hoa văn dùng chung giữa các biến thể |
| `minimalism-dark-brown/paper.webp` | `minimalism-dark-blue/paper.webp` | Vân giấy/hoa văn dùng chung giữa các biến thể |
| `minimalism-dark-red/paper.webp` | `minimalism-brown/paper.webp` | Vân giấy/hoa văn dùng chung giữa các biến thể |
| `minimalism-purple/paper.webp` | `minimalism-dark-blue/paper.webp` | Vân giấy/hoa văn dùng chung giữa các biến thể |
| `royal-green/flower.webp` | `royal-blue/flower.webp` | Vân giấy/hoa văn dùng chung giữa các biến thể |
| `royal-red/flower.webp` | `royal-blue/flower.webp` | Vân giấy/hoa văn dùng chung giữa các biến thể |
| `songphung-red/NENGIAY.jpg` | `songphung-green/NENGIAY.jpg` | Vân giấy/hoa văn dùng chung giữa các biến thể |