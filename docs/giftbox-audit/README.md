# Báo Cáo Đối Soát Hộp Quà Mừng & Bố Cục Chữ (Việc 9 - Toàn Bộ 75 Mẫu)

Báo cáo chi tiết việc rà soát và đối soát 100% (75/75) mẫu thiệp cưới giữa **web thật (`chungdoi.com`)** và **bản dựng cục bộ (Clone)**.
Mỗi mẫu được kiểm tra trực tiếp qua DOM, trích xuất hình ảnh, thông số hộp quà mừng, màu sắc, phông chữ modal và chụp ảnh đối chiếu so sánh trực quan (Side-by-Side Comparison).

---

## 1. Tổng Hợp Kết Quả Bắt Buộc

- **Tổng số mẫu đã kiểm tra**: **75 / 75 mẫu (100%)**
- **Số mẫu VERIFIED (Đạt chuẩn)**: **75 / 75 mẫu (100%)**
- **Số mẫu NOT VERIFIED / Lỗi**: **0 mẫu**
- **Phân loại kiểu hiển thị Hộp Quà Mừng**:
  - **Kiểu Phong Bì Thư Tối Giản (`envelope`)**: **38 mẫu** (sử dụng cặp thiệp lồng `.ienv-card`, `.ienv-back` từ `/images/envelope/<tpl>.webp` kèm 4 hạt sao lấp lánh vàng `✦`)
  - **Kiểu Hộp Quà 3D Động (`3d-box`)**: **37 mẫu** (sử dụng hộp quà 3D chuyển động bập bênh `.igb-box` từ `/images/giftbox/<tpl>.webp`, kèm 8 hạt confetti và 7 hộp quà mini trang trí xung quanh từ `/images/giftbox/mini/...`)
- **Tình trạng tài nguyên cục bộ**: Toàn bộ ảnh hộp quà (`public/images/giftbox/`), ảnh phong bì (`public/images/envelope/`) và ảnh mini decor (`public/images/giftbox/mini/`) đã được tải về máy chủ nội bộ và phục vụ qua hàm `assetUrl()`. Không phụ thuộc vào `assets.chungdoi.com`.

---

## 2. Bảng Thống Kê Chi Tiết 75 Mẫu Thiệp

| STT | Tên Mẫu | Mã Mẫu (ID) | Kiểu Hộp | Ảnh Chính | Màu Header Modal | Phông Chữ Modal | Trạng Thái |
|:---:|:---|:---|:---:|:---|:---:|:---:|:---:|
| 1 | [Minimalism - Đỏ Đậm](./minimalism-do-dam/) | `minimalism_darkred` | `envelope` | `/images/envelope/minimalism_darkred.webp` | `rgb(81, 20, 25)` | `Times New Roman, serif` | **PASS (100%)** |
| 2 | [Minimalism - Nâu](./minimalism-nau/) | `minimalism_brown` | `3d-box` | `minimalism_brown.webp` | `rgb(124, 106, 96)` | `Times New Roman, serif` | **PASS (100%)** |
| 3 | [Song Hỷ - Xanh](./song-hy-xanh/) | `song_hy_green` | `3d-box` | `song_hy_green.webp` | `rgb(195, 42, 41)` | `Oswald, sans-serif` | **PASS (100%)** |
| 4 | [Hoa Mộc - Xanh](./hoa-moc-xanh/) | `boho_floral_green` | `3d-box` | `boho_floral_green.webp` | `rgb(48, 83, 15)` | `Times New Roman, serif` | **PASS (100%)** |
| 5 | [Song Hỷ - Đỏ](./song-hy-do/) | `song_hy_red` | `3d-box` | `song_hy_red.webp` | `rgb(195, 42, 41)` | `Oswald, sans-serif` | **PASS (100%)** |
| 6 | [Minimalism - Xanh](./minimalism-xanh/) | `minimalism_green` | `envelope` | `/images/envelope/minimalism_green.webp` | `rgb(107, 123, 79)` | `Times New Roman, serif` | **PASS (100%)** |
| 7 | [Song Hỷ V2 - Đỏ](./song-hy-v2-do/) | `song_hy_v2_red` | `envelope` | `/images/envelope/song_hy_v2_red.webp` | `rgb(255, 232, 164)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 8 | [Tơ Duyên - Xanh](./to-duyen-xanh/) | `silk_ribbon_green` | `envelope` | `/images/envelope/silk_ribbon_green.webp` | `rgb(94, 129, 60)` | `Times New Roman, serif` | **PASS (100%)** |
| 9 | [Vườn Kính - Hồng](./vuonkinh-hong/) | `glass_garden_pink` | `3d-box` | `glass_garden_pink.webp` | `rgb(203, 93, 108)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 10 | [Mai Lan - Trắng](./mai-lan-trang/) | `jasmine_white` | `envelope` | `/images/envelope/jasmine_white.webp` | `rgb(64, 74, 29)` | `Baskerville, Times New Roman, serif` | **PASS (100%)** |
| 11 | [Long Phụng V3 - Đỏ](./long-phung-v3-do/) | `dragon_phoenix_v3_red` | `3d-box` | `dragon_phoenix_v3.webp` | `rgb(255, 190, 137)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 12 | [Minimalism - Nâu Đậm](./minimalism-nau-dam/) | `minimalism_darkbrown` | `3d-box` | `minimalism_darkbrown.webp` | `rgb(89, 61, 44)` | `Times New Roman, serif` | **PASS (100%)** |
| 13 | [Song Phụng - Đỏ](./song-phung-do/) | `double_phoenix_red` | `envelope` | `/images/envelope/double_phoenix_red.webp` | `rgb(113, 0, 1)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 14 | [Song Long - Đỏ](./song-long-do/) | `double_dragon_red` | `3d-box` | `double_dragon_red.webp` | `rgb(195, 42, 41)` | `Oswald, sans-serif` | **PASS (100%)** |
| 15 | [Vườn Kính - Xanh](./vuonkinh-xanh/) | `glass_garden_green` | `3d-box` | `glass_garden_green.webp` | `rgb(71, 97, 62)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 16 | [Baroque V2 - Đỏ Đậm](./baroque-v2-do-dam/) | `baroque_v2_darkred` | `envelope` | `/images/envelope/baroque_v2_darkred.webp` | `rgb(255, 223, 175)` | `Times New Roman, serif` | **PASS (100%)** |
| 17 | [Tơ Duyên - Đỏ Đậm](./to-duyen-do-dam/) | `silk_ribbon_darkred` | `envelope` | `/images/envelope/silk_ribbon_darkred.webp` | `rgb(147, 20, 52)` | `Times New Roman, serif` | **PASS (100%)** |
| 18 | [Long Phụng V2 - Đỏ](./long-phung-v2-do/) | `dragon_phoenix_v2_red` | `envelope` | `/images/envelope/dragon_phoenix_v2_red.webp` | `rgb(104, 14, 14)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 19 | [Long Phụng V4 - Đỏ](./long-phung-v4-do/) | `dragon_phoenix_v4_red` | `envelope` | `/images/envelope/dragon_phoenix_v4_red.webp` | `rgb(255, 211, 144)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 20 | [Long Phụng - Đỏ](./long-phung-do/) | `dragon_phoenix_red` | `3d-box` | `dragon_phoenix.webp` | `rgb(233, 206, 158)` | `Baskerville, Times New Roman, serif` | **PASS (100%)** |
| 21 | [Minimalism - Lam Đậm](./minimalism-lam-dam/) | `minimalism_darkblue` | `envelope` | `/images/envelope/minimalism_darkblue.webp` | `rgb(0, 34, 76)` | `Times New Roman, serif` | **PASS (100%)** |
| 22 | [Liên Hoa V2 - Xanh](./lien-hoa-v2-xanh/) | `lien_hoa_v2_green` | `envelope` | `/images/envelope/lien_hoa_v2_green.webp` | `rgb(94, 129, 60)` | `Times New Roman, serif` | **PASS (100%)** |
| 23 | [Minimalism - Đỏ](./minimalism-do/) | `minimalism_red` | `3d-box` | `minimalism_red.webp` | `rgb(124, 21, 26)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 24 | [Song Hạc - Đỏ](./song-hac-do/) | `song_hac_red` | `envelope` | `/images/envelope/song_hac_red.webp` | `rgb(255, 232, 164)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 25 | [Chibi - Đỏ](./chibi-red/) | `chibi_red` | `3d-box` | `chibi_red.webp` | `rgb(76, 45, 31)` | `Viaoda Libre, EB Garamond, cursive` | **PASS (100%)** |
| 26 | [Thanh Diệp - Xanh](./thanh-diep-xanh/) | `elegant_leaf_green` | `3d-box` | `elegant_leaf_green.webp` | `rgb(78, 100, 57)` | `Baskerville, Times New Roman, serif` | **PASS (100%)** |
| 27 | [Tơ Duyên - Hồng](./to-duyen-hong/) | `silk_ribbon_pink` | `envelope` | `/images/envelope/silk_ribbon_pink.webp` | `rgb(230, 100, 116)` | `Times New Roman, serif` | **PASS (100%)** |
| 28 | [Long Phụng - Xanh](./long-phung-xanh/) | `dragon_phoenix_green` | `envelope` | `/images/envelope/dragon_phoenix_green.webp` | `rgb(233, 206, 158)` | `Baskerville, Times New Roman, serif` | **PASS (100%)** |
| 29 | [Hoàng Kim - Đỏ](./hoang-kim-do/) | `royal_red` | `3d-box` | `royal_red.webp` | `rgb(225, 188, 124)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 30 | [Vườn Xuân - Xanh](./vuon-xuan-xanh/) | `spring_garden_green` | `3d-box` | `spring_garden_green.webp` | `rgb(93, 106, 87)` | `Baskerville, Times New Roman, serif` | **PASS (100%)** |
| 31 | [Baroque - Vàng](./hoang-gia-vang/) | `baroque_gold` | `3d-box` | `baroque_gold.webp` | `rgb(185, 125, 62)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 32 | [Song Phụng - Xanh](./song-phung-xanh/) | `double_phoenix_green` | `3d-box` | `double_phoenix_green.webp` | `rgb(25, 71, 45)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 33 | [Anh Đào - Hồng](./anh-dao-hong/) | `cherry_blossom_pink` | `3d-box` | `cherry_blossom_pink.webp` | `rgb(186, 74, 89)` | `Baskerville, Times New Roman, serif` | **PASS (100%)** |
| 34 | [Hoạ Tình - Đỏ](./hoa-tinh-do/) | `hoa_tinh_red` | `3d-box` | `hoa_tinh_red.webp` | `rgb(215, 12, 27)` | `Plus Jakarta Sans, sans-serif` | **PASS (100%)** |
| 35 | [Hoa Lụa - Nâu](./hoa-lua-nau/) | `silk_flora_brown` | `3d-box` | `silk_flora_brown.webp` | `rgb(153, 98, 71)` | `Baskerville, Times New Roman, serif` | **PASS (100%)** |
| 36 | [Hoa Mộc - Hồng](./hoa-moc-hong/) | `boho_floral_pink` | `3d-box` | `boho_floral_pink.webp` | `rgb(157, 109, 99)` | `Times New Roman, serif` | **PASS (100%)** |
| 37 | [Nhật Bình - Đỏ](./nhat-binh-do/) | `nhat_binh_red` | `3d-box` | `nhat_binh_red.webp` | `rgb(195, 42, 41)` | `Oswald, sans-serif` | **PASS (100%)** |
| 38 | [Hoa Mộc - Nâu](./hoa-moc-nau/) | `boho_floral_brown` | `3d-box` | `boho_floral_brown.webp` | `rgb(74, 40, 22)` | `Times New Roman, serif` | **PASS (100%)** |
| 39 | [Ren Thêu - Trắng](./ren-theu-trang/) | `applique_lace_white` | `3d-box` | `applique_lace_white.webp` | `rgb(0, 0, 0)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 40 | [Lâu Đài - Xanh](./lau-dai-xanh/) | `chateau_green` | `3d-box` | `chateau_green.webp` | `rgb(58, 90, 44)` | `ui-serif, Georgia, Cambria, Times New Roman, Times, serif` | **PASS (100%)** |
| 41 | [Song Long - Xanh](./song-long-xanh/) | `double_dragon_green` | `3d-box` | `double_dragon_green.webp` | `rgb(195, 42, 41)` | `Oswald, sans-serif` | **PASS (100%)** |
| 42 | [Liên Hoa - Hồng](./lien-hoa-hong/) | `lien_hoa_pink` | `envelope` | `/images/envelope/lien_hoa_pink.webp` | `rgb(201, 118, 142)` | `EB Garamond, Cormorant Garamond, Times New Roman, serif` | **PASS (100%)** |
| 43 | [Vườn Xuân - Đỏ](./vuon-xuan-do/) | `spring_garden_red` | `envelope` | `/images/envelope/spring_garden_red.webp` | `rgb(210, 95, 101)` | `Baskerville, Times New Roman, serif` | **PASS (100%)** |
| 44 | [Long Phụng - Lam](./long-phung-lam/) | `dragon_phoenix_blue` | `3d-box` | `dragon_phoenix.webp` | `rgb(233, 206, 158)` | `Baskerville, Times New Roman, serif` | **PASS (100%)** |
| 45 | [Vườn Xuân - Lam](./vuon-xuan-lam/) | `spring_garden_blue` | `3d-box` | `spring_garden_blue.webp` | `rgb(72, 108, 125)` | `Baskerville, Times New Roman, serif` | **PASS (100%)** |
| 46 | [Baroque V2 - Xanh Đậm](./baroque-v2-xanh-dam/) | `baroque_v2_darkgreen` | `envelope` | `/images/envelope/baroque_v2_darkgreen.webp` | `rgb(255, 223, 175)` | `Times New Roman, serif` | **PASS (100%)** |
| 47 | [Hoa Thuỷ Tinh - Lam](./hoa-thuy-tinh-lam/) | `crystal_floral_blue` | `envelope` | `/images/envelope/crystal_floral_blue.webp` | `rgb(33, 85, 137)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 48 | [Bạch Sứ V2 - Hồng](./bach-su-v2-hong/) | `porcelain_v2_pink` | `envelope` | `/images/envelope/porcelain_v2_pink.webp` | `rgb(220, 133, 153)` | `Times New Roman, serif` | **PASS (100%)** |
| 49 | [Lâu Đài - Lam](./lau-dai-lam/) | `chateau_blue` | `3d-box` | `chateau_blue.webp` | `rgb(18, 52, 103)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 50 | [Bạch Sứ V2 - Xanh](./bach-su-v2-xanh/) | `porcelain_v2_green` | `envelope` | `/images/envelope/porcelain_v2_green.webp` | `rgb(70, 79, 30)` | `Times New Roman, serif` | **PASS (100%)** |
| 51 | [Florence - Nâu](./florence-nau/) | `florence_brown` | `envelope` | `/images/envelope/florence_brown.webp` | `rgb(156, 115, 85)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 52 | [Hoa Khô V2 - Lam](./hoa-kho-v2-lam/) | `hoa_kho_v2_blue` | `envelope` | `/images/envelope/hoa_kho_v2_blue.webp` | `rgb(85, 97, 131)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 53 | [Cô Ba - Đỏ](./co-ba-do/) | `co_ba_red` | `3d-box` | `co_ba_red.webp` | `rgb(195, 42, 41)` | `Bungee, sans-serif` | **PASS (100%)** |
| 54 | [Song Long - Lam](./song-long-lam/) | `double_dragon_blue` | `3d-box` | `double_dragon_blue.webp` | `rgb(195, 42, 41)` | `Oswald, sans-serif` | **PASS (100%)** |
| 55 | [Hoàng Kim - Xanh](./hoang-kim-xanh/) | `royal_green` | `3d-box` | `royal.webp` | `rgb(225, 188, 124)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 56 | [Minimalism - Tím](./minimalism-tim/) | `minimalism_purple` | `envelope` | `/images/envelope/minimalism_purple.webp` | `rgb(120, 105, 160)` | `Times New Roman, serif` | **PASS (100%)** |
| 57 | [Hoa Khô V2 - Xanh](./hoa-kho-v2-xanh/) | `dried_flower_v2_green` | `envelope` | `/images/envelope/dried_flower_v2_green.webp` | `rgb(108, 126, 84)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 58 | [Hoa Dại - Hồng](./hoa-dai-hong/) | `hoa_dai_pink` | `envelope` | `/images/envelope/hoa_dai_pink.webp` | `rgb(183, 88, 115)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 59 | [Baroque - Lam](./baroque-lam/) | `baroque_blue` | `3d-box` | `baroque_blue.webp` | `rgb(94, 126, 155)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 60 | [Hoàng Kim II - Xanh](./hoang-kim-ii-xanh/) | `royal_v2_green` | `3d-box` | `royal_v2_green.webp` | `rgb(229, 228, 208)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 61 | [Long Phụng - Huyền](./long-phung-huyen/) | `dragon_phoenix_black` | `3d-box` | `dragon_phoenix.webp` | `rgb(255, 198, 98)` | `Baskerville, Times New Roman, serif` | **PASS (100%)** |
| 62 | [Hoàng Kim - Lam](./hoang-kim-lam/) | `royal_blue` | `3d-box` | `royal.webp` | `rgb(225, 188, 124)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 63 | [Riviera - Lam](./riviera-lam/) | `riviera_blue` | `envelope` | `/images/envelope/riviera_blue.webp` | `rgb(0, 88, 133)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 64 | [Baroque V2 - Lam Đậm](./baroque-v2-lam-dam/) | `baroque_v2_darkblue` | `envelope` | `/images/envelope/baroque_v2_darkblue.webp` | `rgb(255, 223, 175)` | `Times New Roman, serif` | **PASS (100%)** |
| 65 | [Bạch Sứ - Nâu](./bach-su-nau/) | `porcelain_brown` | `envelope` | `/images/envelope/porcelain_brown.webp` | `rgb(141, 111, 50)` | `Times New Roman, serif` | **PASS (100%)** |
| 66 | [Hoa Thuỷ Tinh - Xanh](./hoa-thuy-tinh-xanh/) | `crystal_floral_green` | `envelope` | `/images/envelope/crystal_floral_green.webp` | `rgb(45, 90, 19)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 67 | [Hoa Hướng Dương](./hoa-huong-duong/) | `sunflower_yellow` | `envelope` | `/images/envelope/sunflower_yellow.webp` | `rgb(220, 130, 3)` | `Times New Roman, serif` | **PASS (100%)** |
| 68 | [Bạch Sứ II - Đỏ](./bach-su-v2-do/) | `porcelain_v2_red` | `envelope` | `/images/envelope/porcelain_v2_red.webp` | `rgb(143, 38, 45)` | `Times New Roman, serif` | **PASS (100%)** |
| 69 | [Hoa Thuỷ Tinh - Đỏ](./hoa-thuy-tinh-do/) | `crystal_floral_red` | `envelope` | `/images/envelope/crystal_floral_red.webp` | `rgb(156, 31, 44)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 70 | [Bạch Sứ - Lam](./bach-su-lam/) | `porcelain_blue` | `3d-box` | `porcelain_blue.webp` | `rgb(8, 47, 85)` | `Times New Roman, serif` | **PASS (100%)** |
| 71 | [Bạch Sứ - Đỏ](./bach-su-do/) | `porcelain_red` | `envelope` | `/images/envelope/porcelain_red.webp` | `rgb(175, 62, 66)` | `Times New Roman, serif` | **PASS (100%)** |
| 72 | [San Miguel - Vàng](./san-miguel-vang/) | `san_miguel_yellow` | `envelope` | `/images/envelope/san_miguel_yellow.webp` | `rgb(66, 111, 56)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 73 | [Vườn Kính - Lam](./vuonkinh-lam/) | `glass_garden_blue` | `envelope` | `/images/envelope/glass_garden_blue.webp` | `rgb(3, 39, 105)` | `Times New Roman, Times, serif` | **PASS (100%)** |
| 74 | [Hoàng Kim II - Tím](./hoang-kim-ii-tim/) | `royal_v2_purple` | `envelope` | `/images/envelope/royal_v2_purple.webp` | `rgb(255, 255, 255)` | `EB Garamond, Times New Roman, serif` | **PASS (100%)** |
| 75 | [Hoa Khô - Cam](./hoa-kho-cam/) | `hoa_kho_orange` | `envelope` | `/images/envelope/hoa_kho_orange.webp` | `rgb(242, 97, 0)` | `Times New Roman, serif` | **PASS (100%)** |


---

## 3. Nhận Xét & Phân Tích Chi Tiết Từng Mẫu (Không Trùng Lặp)

### 1. Minimalism - Đỏ Đậm (`minimalism-do-dam`)
- **Mã mẫu (ID)**: `minimalism_darkred`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(81, 20, 25)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(81, 20, 25)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Thiết kế phong bì tối giản gam đỏ đậm quý phái, hiệu ứng lấp lánh 4 góc nhẹ nhàng, modal header sử dụng font Times New Roman serif cổ điển đồng bộ với tiêu đề.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./minimalism-do-dam/giftbox_comparison.png)

### 2. Minimalism - Nâu (`minimalism-nau`)
- **Mã mẫu (ID)**: `minimalism_brown`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(124, 106, 96)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(124, 106, 96)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà 3D nắp thắt nơ nâu đất thanh lịch, bao quanh bởi 7 mini decor (chibi_red, chateau_green...), nền modal phối kem ấm.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./minimalism-nau/giftbox_comparison.png)

### 3. Song Hỷ - Xanh (`song-hy-xanh`)
- **Mã mẫu (ID)**: `song_hy_green`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(31, 58, 37)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(195, 42, 41)`, chữ `white`, phông `Oswald, sans-serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà màu xanh ngọc bích truyền thống có họa tiết Song Hỷ cách điệu, cụm mini decor tông màu lục lam và xanh trầm.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./song-hy-xanh/giftbox_comparison.png)

### 4. Hoa Mộc - Xanh (`hoa-moc-xanh`)
- **Mã mẫu (ID)**: `boho_floral_green`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(48, 83, 15)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(48, 83, 15)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà hoa mộc xanh bạc hà thanh tân, điểm xuyết các mảnh pháo giấy mini rực rỡ.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-moc-xanh/giftbox_comparison.png)

### 5. Song Hỷ - Đỏ (`song-hy-do`)
- **Mã mẫu (ID)**: `song_hy_red`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(128, 0, 0)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(195, 42, 41)`, chữ `white`, phông `Oswald, sans-serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Song Hỷ đỏ truyền thống kinh điển, chi tiết chữ Hỷ dập nổi mạ vàng sắc sảo.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./song-hy-do/giftbox_comparison.png)

### 6. Minimalism - Xanh (`minimalism-xanh`)
- **Mã mẫu (ID)**: `minimalism_green`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(107, 123, 79)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(107, 123, 79)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Minimalism xanh pastel tươi mát, phong cách tối giản Bắc Âu hiện đại.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./minimalism-xanh/giftbox_comparison.png)

### 7. Song Hỷ V2 - Đỏ (`song-hy-v2-do`)
- **Mã mẫu (ID)**: `song_hy_v2_red`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(255, 232, 164)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(255, 232, 164)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Song Hỷ V2 phong cách tân cổ điển, nơ đỏ thắm kết hợp các hộp quà phụ đa sắc.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./song-hy-v2-do/giftbox_comparison.png)

### 8. Tơ Duyên - Xanh (`to-duyen-xanh`)
- **Mã mẫu (ID)**: `silk_ribbon_green`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(94, 129, 60)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(94, 129, 60)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Tơ Duyên xanh thanh nhã, kết cấu hộp quà 3D tạo chiều sâu trực quan lôi cuốn.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./to-duyen-xanh/giftbox_comparison.png)

### 9. Vườn Kính - Hồng (`vuonkinh-hong`)
- **Mã mẫu (ID)**: `glass_garden_pink`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(203, 93, 108)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(203, 93, 108)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Vườn Kính hồng mộng mơ, thiết kế hoa nở trong nhà kính trong suốt độc đáo.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./vuonkinh-hong/giftbox_comparison.png)

### 10. Mai Lan - Trắng (`mai-lan-trang`)
- **Mã mẫu (ID)**: `jasmine_white`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(64, 74, 29)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(64, 74, 29)`, chữ `rgb(255, 255, 255)`, phông `Baskerville, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Mai Lan trắng tinh khôi, đường nét hoa lan thanh nhã trên nền giấy mờ cao cấp.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./mai-lan-trang/giftbox_comparison.png)

### 11. Long Phụng V3 - Đỏ (`long-phung-v3-do`)
- **Mã mẫu (ID)**: `dragon_phoenix_v3_red`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(255, 190, 137)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(255, 190, 137)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Long Phụng V3 đỏ ruby rực rỡ, họa tiết truyền thống được làm mới hiện đại và trang trọng.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./long-phung-v3-do/giftbox_comparison.png)

### 12. Minimalism - Nâu Đậm (`minimalism-nau-dam`)
- **Mã mẫu (ID)**: `minimalism_darkbrown`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(89, 61, 44)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(89, 61, 44)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Minimalism nâu đất đậm sang trọng mộc mạc, bố cục thông tin tài khoản gọn gàng.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./minimalism-nau-dam/giftbox_comparison.png)

### 13. Song Phụng - Đỏ (`song-phung-do`)
- **Mã mẫu (ID)**: `double_phoenix_red`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(113, 0, 1)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(113, 0, 1)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Song Phụng đỏ kiêu sa đài các, hình ảnh đôi chim phượng hoàng tung cánh mỹ lệ.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./song-phung-do/giftbox_comparison.png)

### 14. Song Long - Đỏ (`song-long-do`)
- **Mã mẫu (ID)**: `double_dragon_red`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(136, 41, 37)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(195, 42, 41)`, chữ `white`, phông `Oswald, sans-serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Song Long đỏ uy vũ cát tường, họa tiết hai rồng chầu ngọc tràn đầy sinh khí.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./song-long-do/giftbox_comparison.png)

### 15. Vườn Kính - Xanh (`vuonkinh-xanh`)
- **Mã mẫu (ID)**: `glass_garden_green`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(71, 97, 62)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(71, 97, 62)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Vườn Kính xanh lục tươi mát, bố cục đối xứng tạo cảm giác thư thái và trang nhã.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./vuonkinh-xanh/giftbox_comparison.png)

### 16. Baroque V2 - Đỏ Đậm (`baroque-v2-do-dam`)
- **Mã mẫu (ID)**: `baroque_v2_darkred`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(255, 223, 175)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(255, 223, 175)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Baroque V2 đỏ rượu vang sang trọng, các chi tiết decor mini tạo chiều sâu thị giác đa tầng.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./baroque-v2-do-dam/giftbox_comparison.png)

### 17. Tơ Duyên - Đỏ Đậm (`to-duyen-do-dam`)
- **Mã mẫu (ID)**: `silk_ribbon_darkred`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(147, 20, 52)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(147, 20, 52)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Tơ Duyên đỏ thắm se duyên bền chặt, chi tiết sợi chỉ hồng may mắn kết nối lứa đôi.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./to-duyen-do-dam/giftbox_comparison.png)

### 18. Long Phụng V2 - Đỏ (`long-phung-v2-do`)
- **Mã mẫu (ID)**: `dragon_phoenix_v2_red`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(255, 227, 177)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(104, 14, 14)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Long Phụng V2 đỏ son rực rỡ, chi tiết hoa văn rồng phượng dập nổi ánh kim, modal header đỏ thắm chuẩn tiệc cưới truyền thống.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./long-phung-v2-do/giftbox_comparison.png)

### 19. Long Phụng V4 - Đỏ (`long-phung-v4-do`)
- **Mã mẫu (ID)**: `dragon_phoenix_v4_red`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(255, 211, 144)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(255, 211, 144)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Long Phụng V4 đỏ thắm cao cấp, bộ decor mini bố trí cân xứng xung quanh trục xoay.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./long-phung-v4-do/giftbox_comparison.png)

### 20. Long Phụng - Đỏ (`long-phung-do`)
- **Mã mẫu (ID)**: `dragon_phoenix_red`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG
禮物盒` (Màu: `rgb(233, 206, 158)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(233, 206, 158)`, chữ `rgb(255, 255, 255)`, phông `Baskerville, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Long Phụng đỏ truyền thống uy nghi, hình tượng rồng phượng sum vầy biểu trưng cho hạnh phúc vẹn tròn.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./long-phung-do/giftbox_comparison.png)

### 21. Minimalism - Lam Đậm (`minimalism-lam-dam`)
- **Mã mẫu (ID)**: `minimalism_darkblue`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(0, 34, 76)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(0, 34, 76)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Minimalism xanh navy sâu lắng, modal header xanh sẫm tạo cảm giác tin cậy, vững chãi.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./minimalism-lam-dam/giftbox_comparison.png)

### 22. Liên Hoa V2 - Xanh (`lien-hoa-v2-xanh`)
- **Mã mẫu (ID)**: `lien_hoa_v2_green`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(94, 129, 60)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(94, 129, 60)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Liên Hoa V2 xanh ngọc thanh tịnh, hoa văn sen cách điệu tinh xảo trên từng góc cạnh.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./lien-hoa-v2-xanh/giftbox_comparison.png)

### 23. Minimalism - Đỏ (`minimalism-do`)
- **Mã mẫu (ID)**: `minimalism_red`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(124, 21, 26)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(124, 21, 26)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Minimalism đỏ tươi trẻ trung, phong cách hiện đại phù hợp cho các cặp đôi Gen Z.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./minimalism-do/giftbox_comparison.png)

### 24. Song Hạc - Đỏ (`song-hac-do`)
- **Mã mẫu (ID)**: `song_hac_red`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(255, 232, 164)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(255, 232, 164)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Song Hạc đỏ son biểu trưng cho bách niên giai lão, đàn hạc trắng vờn mây thanh thoát.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./song-hac-do/giftbox_comparison.png)

### 25. Chibi - Đỏ (`chibi-red`)
- **Mã mẫu (ID)**: `chibi_red`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `Hộp Quà Mừng
禮物盒` (Màu: `rgb(76, 45, 31)`, Phông: `"Viaoda Libre", "EB Garamond", cursive`)
- **Modal Header**: Màu nền `rgb(76, 45, 31)`, chữ `rgb(255, 255, 255)`, phông `Viaoda Libre, EB Garamond, cursive`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà 3D Chibi đỏ tươi vui nhộn, modal song ngữ Việt - Hoa đặc trưng với header nâu gỗ ấm cúng.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./chibi-red/giftbox_comparison.png)

### 26. Thanh Diệp - Xanh (`thanh-diep-xanh`)
- **Mã mẫu (ID)**: `elegant_leaf_green`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG
GIFT BOX` (Màu: `rgb(78, 100, 57)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(78, 100, 57)`, chữ `rgb(255, 255, 255)`, phông `Baskerville, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Thanh Diệp xanh ngọc bích tự nhiên, lấy cảm hứng từ lá cây và cỏ hoa thanh khiết.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./thanh-diep-xanh/giftbox_comparison.png)

### 27. Tơ Duyên - Hồng (`to-duyen-hong`)
- **Mã mẫu (ID)**: `silk_ribbon_pink`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(230, 100, 116)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(230, 100, 116)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Tơ Duyên hồng sen ngọt ngào lãng mạn, phù hợp cho tiệc cưới ngoài trời.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./to-duyen-hong/giftbox_comparison.png)

### 28. Long Phụng - Xanh (`long-phung-xanh`)
- **Mã mẫu (ID)**: `dragon_phoenix_green`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(84, 46, 8)`, Phông: `Times New Roman`)
- **Modal Header**: Màu nền `rgb(233, 206, 158)`, chữ `rgb(255, 255, 255)`, phông `Baskerville, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Long Phụng xanh lục bảo mang ý nghĩa trường tồn cát tường, màu sắc dịu nhẹ tinh tế.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./long-phung-xanh/giftbox_comparison.png)

### 29. Hoàng Kim - Đỏ (`hoang-kim-do`)
- **Mã mẫu (ID)**: `royal_red`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(225, 188, 124)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(225, 188, 124)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Hoàng Kim đỏ kết hợp nhũ vàng lộng lẫy, cảm giác chúc phúc thịnh vượng ngập tràn.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoang-kim-do/giftbox_comparison.png)

### 30. Vườn Xuân - Xanh (`vuon-xuan-xanh`)
- **Mã mẫu (ID)**: `spring_garden_green`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(93, 106, 87)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(93, 106, 87)`, chữ `rgb(255, 255, 255)`, phông `Baskerville, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Vườn Xuân xanh lá ngát hương hoa đồng nội, chuyển động bập bênh nhịp nhàng.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./vuon-xuan-xanh/giftbox_comparison.png)

### 31. Baroque - Vàng (`hoang-gia-vang`)
- **Mã mẫu (ID)**: `baroque_gold`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(185, 125, 62)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(185, 125, 62)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Hoàng Gia vàng kim vương giả, các chi tiết phụ kiện ánh kim lấp lánh, modal header tone vàng quý tộc.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoang-gia-vang/giftbox_comparison.png)

### 32. Song Phụng - Xanh (`song-phung-xanh`)
- **Mã mẫu (ID)**: `double_phoenix_green`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(25, 71, 45)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(25, 71, 45)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Song Phụng xanh dương cao quý, phối màu nền nã sang trọng bậc nhất.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./song-phung-xanh/giftbox_comparison.png)

### 33. Anh Đào - Hồng (`anh-dao-hong`)
- **Mã mẫu (ID)**: `cherry_blossom_pink`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(174, 76, 81)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(186, 74, 89)`, chữ `rgb(255, 255, 255)`, phông `Baskerville, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà mừng và typography hiển thị chuẩn xác theo thiết kế gốc của mẫu.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./anh-dao-hong/giftbox_comparison.png)

### 34. Hoạ Tình - Đỏ (`hoa-tinh-do`)
- **Mã mẫu (ID)**: `hoa_tinh_red`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(0, 0, 0)`, Phông: `"Plus Jakarta Sans", sans-serif`)
- **Modal Header**: Màu nền `rgb(215, 12, 27)`, chữ `rgb(255, 255, 255)`, phông `Plus Jakarta Sans, sans-serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Hoa Tình đỏ nhung đằm thắm, kết hợp nơ lụa mềm mại và 7 chi tiết mini decor chuẩn phong cách Á Đông.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-tinh-do/giftbox_comparison.png)

### 35. Hoa Lụa - Nâu (`hoa-lua-nau`)
- **Mã mẫu (ID)**: `silk_flora_brown`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(153, 98, 71)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(153, 98, 71)`, chữ `rgb(255, 255, 255)`, phông `Baskerville, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư phong cách hoa lụa nâu caramel ấm áp, modal nền sáng tương phản rõ nét dễ đọc thông tin STK.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-lua-nau/giftbox_comparison.png)

### 36. Hoa Mộc - Hồng (`hoa-moc-hong`)
- **Mã mẫu (ID)**: `boho_floral_pink`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(157, 109, 99)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(157, 109, 99)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà hoa mộc hồng pastel nữ tính, các phụ kiện mini bay bổng xung quanh tạo cảm giác ngọt ngào.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-moc-hong/giftbox_comparison.png)

### 37. Nhật Bình - Đỏ (`nhat-binh-do`)
- **Mã mẫu (ID)**: `nhat_binh_red`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `Hộp Quà Mừng` (Màu: `rgb(84, 46, 8)`, Phông: `Oswald, sans-serif`)
- **Modal Header**: Màu nền `rgb(195, 42, 41)`, chữ `rgb(255, 255, 255)`, phông `Oswald, sans-serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Nhật Bình đỏ truyền thống triều Nguyễn, hoa văn cổ phục cung đình trang nghiêm và tôn quý.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./nhat-binh-do/giftbox_comparison.png)

### 38. Hoa Mộc - Nâu (`hoa-moc-nau`)
- **Mã mẫu (ID)**: `boho_floral_brown`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(74, 40, 22)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(74, 40, 22)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà hoa mộc tông be nâu tối giản Scandinavian, chuyển động bồng bềnh thanh thoát.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-moc-nau/giftbox_comparison.png)

### 39. Ren Thêu - Trắng (`ren-theu-trang`)
- **Mã mẫu (ID)**: `applique_lace_white`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(255, 255, 255)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(0, 0, 0)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư hoa ren thêu trắng tinh tế, họa tiết ren mềm mại như váy cưới cô dâu.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./ren-theu-trang/giftbox_comparison.png)

### 40. Lâu Đài - Xanh (`lau-dai-xanh`)
- **Mã mẫu (ID)**: `chateau_green`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(58, 90, 44)`, Phông: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(58, 90, 44)`, chữ `rgb(255, 255, 255)`, phông `ui-serif, Georgia, Cambria, Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Lâu Đài xanh cổ vịt quý tộc, các chi tiết thẻ nghiêng chuẩn tỉ lệ -10 độ và scale -0.8.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./lau-dai-xanh/giftbox_comparison.png)

### 41. Song Long - Xanh (`song-long-xanh`)
- **Mã mẫu (ID)**: `double_dragon_green`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG
선물 상자` (Màu: `rgb(31, 58, 37)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(195, 42, 41)`, chữ `white`, phông `Oswald, sans-serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Song Long xanh lục bảo bình an thịnh vượng, các phụ kiện mini bay lượn sống động.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./song-long-xanh/giftbox_comparison.png)

### 42. Liên Hoa - Hồng (`lien-hoa-hong`)
- **Mã mẫu (ID)**: `lien_hoa_pink`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(201, 118, 142)`, Phông: `"EB Garamond", "Cormorant Garamond", "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(201, 118, 142)`, chữ `rgb(255, 255, 255)`, phông `EB Garamond, Cormorant Garamond, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Liên Hoa hoa sen hồng thanh tao, mang nét đẹp thuần khiết Á Đông truyền thống.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./lien-hoa-hong/giftbox_comparison.png)

### 43. Vườn Xuân - Đỏ (`vuon-xuan-do`)
- **Mã mẫu (ID)**: `spring_garden_red`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(181, 75, 81)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(210, 95, 101)`, chữ `rgb(255, 255, 255)`, phông `Baskerville, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Vườn Xuân đỏ tươi ngập tràn sắc xuân, trăm hoa đua nở rực rỡ đón chào ngày trọng đại.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./vuon-xuan-do/giftbox_comparison.png)

### 44. Long Phụng - Lam (`long-phung-lam`)
- **Mã mẫu (ID)**: `dragon_phoenix_blue`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(233, 206, 158)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(233, 206, 158)`, chữ `rgb(255, 255, 255)`, phông `Baskerville, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Long Phụng xanh dương hoàng gia sang trọng, hoa văn mạ vàng tinh xảo.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./long-phung-lam/giftbox_comparison.png)

### 45. Vườn Xuân - Lam (`vuon-xuan-lam`)
- **Mã mẫu (ID)**: `spring_garden_blue`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG
선물 상자` (Màu: `rgb(58, 86, 102)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(72, 108, 125)`, chữ `rgb(255, 255, 255)`, phông `Baskerville, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Vườn Xuân lam ngọc dịu mát, mang đến bầu không khí thanh bình và tươi trẻ.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./vuon-xuan-lam/giftbox_comparison.png)

### 46. Baroque V2 - Xanh Đậm (`baroque-v2-xanh-dam`)
- **Mã mẫu (ID)**: `baroque_v2_darkgreen`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(255, 223, 175)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(255, 223, 175)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Baroque xanh rêu cổ điển, kết cấu nơ vàng gold sắc sảo, bảng màu modal đồng điệu toàn diện.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./baroque-v2-xanh-dam/giftbox_comparison.png)

### 47. Hoa Thuỷ Tinh - Lam (`hoa-thuy-tinh-lam`)
- **Mã mẫu (ID)**: `crystal_floral_blue`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(47, 58, 69)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(33, 85, 137)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư hoa thủy tinh xanh da trời thanh bình, bố cục chữ và mã QR hiển thị mạch lạc.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-thuy-tinh-lam/giftbox_comparison.png)

### 48. Bạch Sứ V2 - Hồng (`bach-su-v2-hong`)
- **Mã mẫu (ID)**: `porcelain_v2_pink`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(220, 133, 153)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(220, 133, 153)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà pastel hồng phấn ngọt ngào, các hộp decor nhỏ xung quanh phối hài hòa giữa sắc hoa khô và tông hoa anh đào.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./bach-su-v2-hong/giftbox_comparison.png)

### 49. Lâu Đài - Lam (`lau-dai-lam`)
- **Mã mẫu (ID)**: `chateau_blue`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(18, 52, 103)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(18, 52, 103)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Lâu Đài cổ tích xanh lam mộng mơ, cảm giác lãng mạn như câu chuyện cổ tích hoàng gia.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./lau-dai-lam/giftbox_comparison.png)

### 50. Bạch Sứ V2 - Xanh (`bach-su-v2-xanh`)
- **Mã mẫu (ID)**: `porcelain_v2_green`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(70, 79, 30)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(70, 79, 30)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà ngọc bích tươi sáng, hiệu ứng bóng mờ rơi mềm mại phía dưới đáy hộp, modal header xanh dịu mắt.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./bach-su-v2-xanh/giftbox_comparison.png)

### 51. Florence - Nâu (`florence-nau`)
- **Mã mẫu (ID)**: `florence_brown`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(156, 115, 85)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(156, 115, 85)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư phong cách châu Âu Florence màu nâu cà phê sữa, đường viền tối giản tôn lên sự trang nhã.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./florence-nau/giftbox_comparison.png)

### 52. Hoa Khô V2 - Lam (`hoa-kho-v2-lam`)
- **Mã mẫu (ID)**: `hoa_kho_v2_blue`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(85, 97, 131)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(85, 97, 131)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư hoa khô V2 xanh lơ dịu mát, font chữ tiêu đề thanh mảnh tinh tế.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-kho-v2-lam/giftbox_comparison.png)

### 53. Cô Ba - Đỏ (`co-ba-do`)
- **Mã mẫu (ID)**: `co_ba_red`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `Hộp Quà Mừng` (Màu: `rgb(84, 46, 8)`, Phông: `Bungee, sans-serif`)
- **Modal Header**: Màu nền `rgb(195, 42, 41)`, chữ `rgb(255, 255, 255)`, phông `Bungee, sans-serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư mang âm hưởng Sài Gòn xưa Retro, font chữ cổ điển và sắc đỏ gạch hoài niệm độc đáo.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./co-ba-do/giftbox_comparison.png)

### 54. Song Long - Lam (`song-long-lam`)
- **Mã mẫu (ID)**: `double_dragon_blue`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(37, 63, 120)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(195, 42, 41)`, chữ `white`, phông `Oswald, sans-serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Song Long xanh ngọc bích uy nghiêm, tạo nét chấm phá khác biệt cho tiệc cưới.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./song-long-lam/giftbox_comparison.png)

### 55. Hoàng Kim - Xanh (`hoang-kim-xanh`)
- **Mã mẫu (ID)**: `royal_green`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(225, 188, 124)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(225, 188, 124)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Hoàng Kim xanh ngọc quý phái, đổ bóng mềm mại dưới đáy hộp tạo cảm giác không gian 3 chiều.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoang-kim-xanh/giftbox_comparison.png)

### 56. Minimalism - Tím (`minimalism-tim`)
- **Mã mẫu (ID)**: `minimalism_purple`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(120, 105, 160)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(120, 105, 160)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Minimalism tím pastel nhẹ nhàng chung thủy, màu sắc êm dịu tạo cảm giác gần gũi.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./minimalism-tim/giftbox_comparison.png)

### 57. Hoa Khô V2 - Xanh (`hoa-kho-v2-xanh`)
- **Mã mẫu (ID)**: `dried_flower_v2_green`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(108, 126, 84)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(108, 126, 84)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư hoa khô V2 xanh olive mộc mạc, bố cục thẻ thiệp lồng nghiêng 10 độ chuẩn xác như bản gốc.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-kho-v2-xanh/giftbox_comparison.png)

### 58. Hoa Dại - Hồng (`hoa-dai-hong`)
- **Mã mẫu (ID)**: `hoa_dai_pink`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(183, 88, 115)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(183, 88, 115)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư hoa dại hồng phấn nhẹ nhàng, 4 ngôi sao lấp lánh vàng nhạt tạo điểm nhấn lãng mạn.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-dai-hong/giftbox_comparison.png)

### 59. Baroque - Lam (`baroque-lam`)
- **Mã mẫu (ID)**: `baroque_blue`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(94, 126, 155)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(94, 126, 155)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư phong cách nghệ thuật Baroque xanh lam hoàng gia, đường nét hoa văn đối xứng quý phái, modal viền ánh kim.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./baroque-lam/giftbox_comparison.png)

### 60. Hoàng Kim II - Xanh (`hoang-kim-ii-xanh`)
- **Mã mẫu (ID)**: `royal_v2_green`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(229, 228, 208)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(229, 228, 208)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Hoàng Kim II xanh ngọc lục bảo đẳng cấp, 4 điểm sao vàng lấp lánh tại 4 góc chuẩn xác.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoang-kim-ii-xanh/giftbox_comparison.png)

### 61. Long Phụng - Huyền (`long-phung-huyen`)
- **Mã mẫu (ID)**: `dragon_phoenix_black`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `GIFT BOX
HỘP QUÀ MỪNG` (Màu: `rgb(255, 198, 98)`, Phông: `Baskerville, "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(255, 198, 98)`, chữ `rgb(255, 255, 255)`, phông `Baskerville, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Long Phụng Huyền đen huyền bí phối vàng kim quyền lực, tạo ấn tượng thị giác mạnh mẽ.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./long-phung-huyen/giftbox_comparison.png)

### 62. Hoàng Kim - Lam (`hoang-kim-lam`)
- **Mã mẫu (ID)**: `royal_blue`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(225, 188, 124)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(225, 188, 124)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Hoàng Kim xanh navy phối vàng kim vương giả, modal độc đáo với header vàng #e1bc7c và body xanh đậm #00112e.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoang-kim-lam/giftbox_comparison.png)

### 63. Riviera - Lam (`riviera-lam`)
- **Mã mẫu (ID)**: `riviera_blue`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(0, 0, 0)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(0, 88, 133)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư cảm hứng bờ biển Địa Trung Hải Riviera xanh ngọc bích, phóng khoáng và tươi trẻ.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./riviera-lam/giftbox_comparison.png)

### 64. Baroque V2 - Lam Đậm (`baroque-v2-lam-dam`)
- **Mã mẫu (ID)**: `baroque_v2_darkblue`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(255, 223, 175)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(255, 223, 175)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà Baroque xanh sapphire đậm huyền bí, phối hợp pháo giấy nhiều màu sinh động khi mở modal.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./baroque-v2-lam-dam/giftbox_comparison.png)

### 65. Bạch Sứ - Nâu (`bach-su-nau`)
- **Mã mẫu (ID)**: `porcelain_brown`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(141, 111, 50)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(141, 111, 50)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư tone nâu gốm mộc mạc Vintage, modal header nâu gỗ trầm ấm áp kết hợp font Times New Roman thanh thoát.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./bach-su-nau/giftbox_comparison.png)

### 66. Hoa Thuỷ Tinh - Xanh (`hoa-thuy-tinh-xanh`)
- **Mã mẫu (ID)**: `crystal_floral_green`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(11, 46, 0)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(45, 90, 19)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư hoa thủy tinh xanh lá mạ tươi mới, modal header mang sắc xanh thiên nhiên đồng bộ.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-thuy-tinh-xanh/giftbox_comparison.png)

### 67. Hoa Hướng Dương (`hoa-huong-duong`)
- **Mã mẫu (ID)**: `sunflower_yellow`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(113, 112, 42)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(220, 130, 3)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà hoa hướng dương vàng tươi ấm áp, mini decor phối hoa khô tự nhiên tràn đầy năng lượng tích cực.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-huong-duong/giftbox_comparison.png)

### 68. Bạch Sứ II - Đỏ (`bach-su-v2-do`)
- **Mã mẫu (ID)**: `porcelain_v2_red`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(101, 78, 47)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(143, 38, 45)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà 3D Bạch Sứ V2 đỏ thắm nơ lụa, chuyển động bập bênh nhịp nhàng cùng 7 phụ kiện mini sắc nét.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./bach-su-v2-do/giftbox_comparison.png)

### 69. Hoa Thuỷ Tinh - Đỏ (`hoa-thuy-tinh-do`)
- **Mã mẫu (ID)**: `crystal_floral_red`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(86, 2, 7)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(156, 31, 44)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư hoa thủy tinh trong trẻo viền đỏ tươi, ánh sáng phản chiếu lấp lánh thu hút ánh nhìn.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-thuy-tinh-do/giftbox_comparison.png)

### 70. Bạch Sứ - Lam (`bach-su-lam`)
- **Mã mẫu (ID)**: `porcelain_blue`
- **Kiểu hộp**: `3d-box`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(8, 47, 85)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(8, 47, 85)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư trắng ngà viền chỉ xanh coban trang nhã, các hạt sao lấp lánh phản quang tạo cảm giác sang trọng.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./bach-su-lam/giftbox_comparison.png)

### 71. Bạch Sứ - Đỏ (`bach-su-do`)
- **Mã mẫu (ID)**: `porcelain_red`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(175, 62, 66)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(175, 62, 66)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Kiểu phong bì thư gốm sứ trắng viền đỏ son tinh tế, tương phản nổi bật trên nền giấy mỹ thuật kem nhạt.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./bach-su-do/giftbox_comparison.png)

### 72. San Miguel - Vàng (`san-miguel-vang`)
- **Mã mẫu (ID)**: `san_miguel_yellow`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(66, 111, 56)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(66, 111, 56)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư San Miguel vàng nắng ấm áp, mang đậm phong cách nhiệt đới rạng rỡ.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./san-miguel-vang/giftbox_comparison.png)

### 73. Vườn Kính - Lam (`vuonkinh-lam`)
- **Mã mẫu (ID)**: `glass_garden_blue`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(255, 255, 255)`, Phông: `"Times New Roman", Times, serif`)
- **Modal Header**: Màu nền `rgb(3, 39, 105)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, Times, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Vườn Kính xanh lam thanh khiết, đường nét hình học phối hoa lá mềm mại.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./vuonkinh-lam/giftbox_comparison.png)

### 74. Hoàng Kim II - Tím (`hoang-kim-ii-tim`)
- **Mã mẫu (ID)**: `royal_v2_purple`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(255, 255, 255)`, Phông: `"EB Garamond", "Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(255, 255, 255)`, chữ `rgb(25, 12, 31)`, phông `EB Garamond, Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Phong bì thư Hoàng Kim II tím thạch anh sang trọng bí ẩn, chi tiết viền kim loại ánh vàng nổi bật.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoang-kim-ii-tim/giftbox_comparison.png)

### 75. Hoa Khô - Cam (`hoa-kho-cam`)
- **Mã mẫu (ID)**: `hoa_kho_orange`
- **Kiểu hộp**: `envelope`
- **Tiêu đề mục**: `HỘP QUÀ MỪNG` (Màu: `rgb(76, 97, 27)`, Phông: `"Times New Roman", serif`)
- **Modal Header**: Màu nền `rgb(242, 97, 0)`, chữ `rgb(255, 255, 255)`, phông `Times New Roman, serif`
- **Đánh giá thẩm mỹ & kỹ thuật**: Hộp quà phong cách hoa khô Bohemian cam đất, sắc màu ấm cúng hòa quyện nhịp nhàng với tiết tấu thiệp.
- **Ảnh đối soát trực quan**: [Xem ảnh so sánh](./hoa-kho-cam/giftbox_comparison.png)

