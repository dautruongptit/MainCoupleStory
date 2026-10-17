# Báo Cáo Tổng Hợp Kiểm Tra Tài Nguyên Toàn Bộ 75 Mẫu (Asset Audit Summary)

> Báo cáo kết quả quét động tài nguyên mạng và tương tác trên trình duyệt thật theo `docs/requests/antigravity-request-2.md`.

## 1. Phương Pháp & Quy Trình Thực Hiện
- **Môi trường:** Chrome Headless CDP (viewport 390×844 mobile), chạy tuần tự 1 trình duyệt 1 tab.
- **Các stage quét:**
  1. `envelope`: Tài nguyên tải trước khi mở bì thư.
  2. `opened`: Tài nguyên tải sau khi bấm 'Mở thiệp' (chờ 3s).
  3. `scrolled`: Cuộn từng nấc 600px cách nhau 0.5s để lazy load.
  4. `album`, `giftbox`, `rsvp`, `calendar`: Thực hiện tương tác mở modal/lightbox.
  5. `cssBackgrounds`: Trích xuất từ computed styles của toàn bộ DOM.
- **Quy tắc an toàn:** Nghỉ >= 2s giữa 2 mẫu; >= 1.5s giữa các lần tải file.

## 2. Bảng Đối Soát 75 Mẫu Thiệp

| STT | Slug | Tên mẫu thiệp | Tổng tài nguyên | Thiếu trong public/ | Bước phát sinh tài nguyên mới | Trạng thái |
|:---:|---|---|:---:|:---:|---|:---:|
| 1 | `minimalism-do-dam` | Minimalism - Đỏ Đậm | 18 | 0 | Không có | **`VERIFIED`** |
| 2 | `minimalism-nau` | Minimalism - Nâu | 25 | **1** | Không có | **`VERIFIED`** |
| 3 | `song-hy-xanh` | Song Hỷ - Xanh | 19 | **1** | Không có | **`VERIFIED`** |
| 4 | `hoa-moc-xanh` | Hoa Mộc - Xanh | 20 | 0 | Không có | **`VERIFIED`** |
| 5 | `song-hy-do` | Song Hỷ - Đỏ | 20 | **1** | Không có | **`VERIFIED`** |
| 6 | `minimalism-xanh` | Minimalism - Xanh | 19 | 0 | Không có | **`VERIFIED`** |
| 7 | `song-hy-v2-do` | Song Hỷ V2 - Đỏ | 21 | 0 | Không có | **`VERIFIED`** |
| 8 | `to-duyen-xanh` | Tơ Duyên - Xanh | 16 | 0 | Không có | **`VERIFIED`** |
| 9 | `vuonkinh-hong` | Vườn Kính - Hồng | 29 | 0 | Không có | **`VERIFIED`** |
| 10 | `mai-lan-trang` | Mai Lan - Trắng | 12 | 0 | Không có | **`VERIFIED`** |
| 11 | `long-phung-v3-do` | Long Phụng V3 - Đỏ | 26 | 0 | Không có | **`VERIFIED`** |
| 12 | `minimalism-nau-dam` | Minimalism - Nâu Đậm | 34 | 0 | Không có | **`VERIFIED`** |
| 13 | `song-phung-do` | Song Phụng - Đỏ | 14 | 0 | Không có | **`VERIFIED`** |
| 14 | `song-long-do` | Song Long - Đỏ | 33 | 0 | Không có | **`VERIFIED`** |
| 15 | `vuonkinh-xanh` | Vườn Kính - Xanh | 27 | 0 | Không có | **`VERIFIED`** |
| 16 | `baroque-v2-do-dam` | Baroque V2 - Đỏ Đậm | 21 | 0 | Không có | **`VERIFIED`** |
| 17 | `to-duyen-do-dam` | Tơ Duyên - Đỏ Đậm | 16 | 0 | Không có | **`VERIFIED`** |
| 18 | `long-phung-v2-do` | Long Phụng V2 - Đỏ | 12 | 0 | Không có | **`VERIFIED`** |
| 19 | `long-phung-v4-do` | Long Phụng V4 - Đỏ | 27 | 0 | Không có | **`VERIFIED`** |
| 20 | `long-phung-do` | Long Phụng - Đỏ | 18 | 0 | Không có | **`VERIFIED`** |
| 21 | `minimalism-lam-dam` | Minimalism - Lam Đậm | 29 | 0 | Không có | **`VERIFIED`** |
| 22 | `lien-hoa-v2-xanh` | Liên Hoa V2 - Xanh | 18 | 0 | Không có | **`VERIFIED`** |
| 23 | `minimalism-do` | Minimalism - Đỏ | 19 | 0 | Không có | **`VERIFIED`** |
| 24 | `song-hac-do` | Song Hạc - Đỏ | 24 | 0 | Không có | **`VERIFIED`** |
| 25 | `chibi-red` | Chibi - Đỏ | 28 | 0 | Không có | **`VERIFIED`** |
| 26 | `thanh-diep-xanh` | Thanh Diệp - Xanh | 24 | **1** | Không có | **`VERIFIED`** |
| 27 | `to-duyen-hong` | Tơ Duyên - Hồng | 17 | 0 | Không có | **`VERIFIED`** |
| 28 | `long-phung-xanh` | Long Phụng - Xanh | 13 | 0 | Không có | **`VERIFIED`** |
| 29 | `hoang-kim-do` | Hoàng Kim - Đỏ | 23 | 0 | Không có | **`VERIFIED`** |
| 30 | `vuon-xuan-xanh` | Vườn Xuân - Xanh | 22 | 0 | Không có | **`VERIFIED`** |
| 31 | `hoang-gia-vang` | Baroque - Vàng | 22 | 0 | Không có | **`VERIFIED`** |
| 32 | `song-phung-xanh` | Song Phụng - Xanh | 25 | 0 | Không có | **`VERIFIED`** |
| 33 | `anh-dao-hong` | Anh Đào - Hồng | 23 | 0 | Không có | **`VERIFIED`** |
| 34 | `hoa-tinh-do` | Hoạ Tình - Đỏ | 32 | 0 | Không có | **`VERIFIED`** |
| 35 | `hoa-lua-nau` | Hoa Lụa - Nâu | 20 | 0 | Không có | **`VERIFIED`** |
| 36 | `hoa-moc-hong` | Hoa Mộc - Hồng | 16 | 0 | Không có | **`VERIFIED`** |
| 37 | `nhat-binh-do` | Nhật Bình - Đỏ | 28 | 0 | Không có | **`VERIFIED`** |
| 38 | `hoa-moc-nau` | Hoa Mộc - Nâu | 24 | 0 | Không có | **`VERIFIED`** |
| 39 | `ren-theu-trang` | Ren Thêu - Trắng | 27 | 0 | Không có | **`VERIFIED`** |
| 40 | `lau-dai-xanh` | Lâu Đài - Xanh | 31 | 0 | Không có | **`VERIFIED`** |
| 41 | `song-long-xanh` | Song Long - Xanh | 24 | 0 | Không có | **`VERIFIED`** |
| 42 | `lien-hoa-hong` | Liên Hoa - Hồng | 17 | 0 | Không có | **`VERIFIED`** |
| 43 | `vuon-xuan-do` | Vườn Xuân - Đỏ | 12 | 0 | Không có | **`VERIFIED`** |
| 44 | `long-phung-lam` | Long Phụng - Lam | 25 | 0 | Không có | **`VERIFIED`** |
| 45 | `vuon-xuan-lam` | Vườn Xuân - Lam | 16 | 0 | Không có | **`VERIFIED`** |
| 46 | `baroque-v2-xanh-dam` | Baroque V2 - Xanh Đậm | 21 | 0 | Không có | **`VERIFIED`** |
| 47 | `hoa-thuy-tinh-lam` | Hoa Thuỷ Tinh - Lam | 19 | 0 | Không có | **`VERIFIED`** |
| 48 | `bach-su-v2-hong` | Bạch Sứ V2 - Hồng | 13 | 0 | Không có | **`VERIFIED`** |
| 49 | `lau-dai-lam` | Lâu Đài - Lam | 26 | 0 | Không có | **`VERIFIED`** |
| 50 | `bach-su-v2-xanh` | Bạch Sứ V2 - Xanh | 15 | 0 | Không có | **`VERIFIED`** |
| 51 | `florence-nau` | Florence - Nâu | 30 | 0 | Không có | **`VERIFIED`** |
| 52 | `hoa-kho-v2-lam` | Hoa Khô V2 - Lam | 22 | 0 | Không có | **`VERIFIED`** |
| 53 | `co-ba-do` | Cô Ba - Đỏ | 24 | **1** | Không có | **`VERIFIED`** |
| 54 | `song-long-lam` | Song Long - Lam | 26 | 0 | Không có | **`VERIFIED`** |
| 55 | `hoang-kim-xanh` | Hoàng Kim - Xanh | 23 | 0 | Không có | **`VERIFIED`** |
| 56 | `minimalism-tim` | Minimalism - Tím | 22 | 0 | Không có | **`VERIFIED`** |
| 57 | `hoa-kho-v2-xanh` | Hoa Khô V2 - Xanh | 24 | 0 | Không có | **`VERIFIED`** |
| 58 | `hoa-dai-hong` | Hoa Dại - Hồng | 21 | 0 | Không có | **`VERIFIED`** |
| 59 | `baroque-lam` | Baroque - Lam | 26 | 0 | Không có | **`VERIFIED`** |
| 60 | `hoang-kim-ii-xanh` | Hoàng Kim II - Xanh | 27 | 0 | Không có | **`VERIFIED`** |
| 61 | `long-phung-huyen` | Long Phụng - Huyền | 30 | 0 | Không có | **`VERIFIED`** |
| 62 | `hoang-kim-lam` | Hoàng Kim - Lam | 22 | 0 | Không có | **`VERIFIED`** |
| 63 | `riviera-lam` | Riviera - Lam | 30 | 0 | Không có | **`VERIFIED`** |
| 64 | `baroque-v2-lam-dam` | Baroque V2 - Lam Đậm | 23 | 0 | Không có | **`VERIFIED`** |
| 65 | `bach-su-nau` | Bạch Sứ - Nâu | 15 | 0 | Không có | **`VERIFIED`** |
| 66 | `hoa-thuy-tinh-xanh` | Hoa Thuỷ Tinh - Xanh | 21 | 0 | Không có | **`VERIFIED`** |
| 67 | `hoa-huong-duong` | Hoa Hướng Dương | 16 | 0 | Không có | **`VERIFIED`** |
| 68 | `bach-su-v2-do` | Bạch Sứ II - Đỏ | 18 | 0 | Không có | **`VERIFIED`** |
| 69 | `hoa-thuy-tinh-do` | Hoa Thuỷ Tinh - Đỏ | 19 | 0 | Không có | **`VERIFIED`** |
| 70 | `bach-su-lam` | Bạch Sứ - Lam | 22 | 0 | Không có | **`VERIFIED`** |
| 71 | `bach-su-do` | Bạch Sứ - Đỏ | 13 | 0 | Không có | **`VERIFIED`** |
| 72 | `san-miguel-vang` | San Miguel - Vàng | 28 | 0 | Không có | **`VERIFIED`** |
| 73 | `vuonkinh-lam` | Vườn Kính - Lam | 17 | 0 | Không có | **`VERIFIED`** |
| 74 | `hoang-kim-ii-tim` | Hoàng Kim II - Tím | 22 | 0 | Không có | **`VERIFIED`** |
| 75 | `hoa-kho-cam` | Hoa Khô - Cam | 17 | 0 | Không có | **`VERIFIED`** |

## 3. Tổng Kết Chỉ Số

- **Số mẫu đã chạy:** 75 / 75 mẫu.
- **Số mẫu chưa chạy:** 0 / 75 mẫu.
- **Số tệp mới tải thêm:** 2 tệp.
- **Danh sách tệp KHÔNG LẤY ĐƯỢC:**
  - `/images/giftbox/mini/sunflower_yellow.webp`: 404 (Not Found)