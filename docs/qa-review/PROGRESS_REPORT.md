# BÁO CÁO TIẾN ĐỘ KIỂM TRA GIAI ĐOẠN 1 (75 MẪU THIỆP CƯỚI)

> **Cập nhật ngày**: 20/10/2026  
> **Quy tắc bắt buộc**: CHỈ BÁO CÁO, CHƯA SỬA CODE cho đến khi người dùng duyệt.  
> **Thư mục lưu dữ liệu tham chiếu thủ công**: `docs/qa-review/reference/`

---

## I. TỔNG HỢP TIẾN ĐỘ THỰC TẾ

- **Tổng số mẫu trong dự án**: **75 / 75**
- **Đã so sánh trực tiếp cả 2 bên (Web gốc & Localhost)**: **14 / 75 mẫu (18.7%)**
- **Bị Cloudflare chặn web gốc - Chỉ kiểm tra một phần (Localhost)**: **61 / 75 mẫu (81.3%)**
- **Dùng dữ liệu tham chiếu thủ công**: **0 mẫu** (Đang chờ nạp file vào thư mục reference)
- **Số mẫu chưa kiểm tra hoàn toàn**: **0 / 75** (100% mẫu đã được kiểm tra tính toàn vẹn asset và responsive trên Localhost)

---

## II. BẢNG TIẾN ĐỘ CHI TIẾT 75 MẪU THIỆP

| STT | Mã mẫu (Slug) | Tên mẫu | Truy cập web gốc | Màn đã kiểm tra | Kết quả kiểm tra | Ghi chú & Lỗi phát hiện |
|:---:|:---|:---|:---:|---|:---:|---|
| 1 | `minimalism-do-dam` | Minimalism - Đỏ Đậm | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Có lỗi (Đã xác định)** | Bì thư 268x309px (web gốc 261x301px), top lệch 77px |
| 2 | `minimalism-nau` | Minimalism - Nâu | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Có lỗi (Đã xác định)** | Card tràn viền 390px (web gốc 343px, left 23px) |
| 3 | `song-hy-xanh` | Song Hỷ - Xanh | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Có lỗi (Đã xác định)** | Container desktop bị co hẹp 640px (web gốc 900px) |
| 4 | `hoa-moc-xanh` | Hoa Mộc - Xanh | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Đạt** | Khớp layout và kích thước với web gốc |
| 5 | `song-hy-do` | Song Hỷ - Đỏ | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Có lỗi (Đã xác định)** | Container desktop bị co hẹp 640px (web gốc 900px) |
| 6 | `minimalism-xanh` | Minimalism - Xanh | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Đạt** | Khớp layout và kích thước với web gốc |
| 7 | `song-hy-v2-do` | Song Hỷ V2 - Đỏ | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Đạt** | Khớp layout và kích thước với web gốc |
| 8 | `to-duyen-xanh` | Tơ Duyên - Xanh | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Có lỗi (Đã xác định)** | Vị trí seal cover lệch 26px so với web gốc |
| 9 | `vuonkinh-hong` | Vườn Kính - Hồng | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Đạt** | Khớp layout và kích thước với web gốc |
| 10 | `mai-lan-trang` | Mai Lan - Trắng | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 11 | `long-phung-v3-do` | Long Phụng V3 - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 12 | `minimalism-nau-dam` | Minimalism - Nâu Đậm | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 13 | `song-phung-do` | Song Phụng - Đỏ | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Có lỗi (Đã xác định)** | Vị trí sáp cover top 227px (web gốc top 165px) |
| 14 | `song-long-do` | Song Long - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 15 | `vuonkinh-xanh` | Vườn Kính - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 16 | `baroque-v2-do-dam` | Baroque V2 - Đỏ Đậm | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Đạt** | Khớp layout và kích thước với web gốc |
| 17 | `to-duyen-do-dam` | Tơ Duyên - Đỏ Đậm | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 18 | `long-phung-v2-do` | Long Phụng V2 - Đỏ | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Có lỗi (Đã xác định)** | Render con dấu tròn trong khi web gốc không có seal tròn |
| 19 | `long-phung-v4-do` | Long Phụng V4 - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 20 | `long-phung-do` | Long Phụng - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 21 | `minimalism-lam-dam` | Minimalism - Lam Đậm | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 22 | `lien-hoa-v2-xanh` | Liên Hoa V2 - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 23 | `minimalism-do` | Minimalism - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 24 | `song-hac-do` | Song Hạc - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 25 | `chibi-red` | Chibi - Đỏ | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Đạt** | Khớp layout và kích thước với web gốc |
| 26 | `thanh-diep-xanh` | Thanh Diệp - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 27 | `to-duyen-hong` | Tơ Duyên - Hồng | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 28 | `long-phung-xanh` | Long Phụng - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 29 | `hoang-kim-do` | Hoàng Kim - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 30 | `vuon-xuan-xanh` | Vườn Xuân - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 31 | `hoang-gia-vang` | Baroque - Vàng | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 32 | `song-phung-xanh` | Song Phụng - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 33 | `anh-dao-hong` | Anh Đào - Hồng | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 34 | `hoa-tinh-do` | Hoạ Tình - Đỏ | **Được** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Đạt** | Khớp layout và kích thước với web gốc |
| 35 | `hoa-lua-nau` | Hoa Lụa - Nâu | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 36 | `hoa-moc-hong` | Hoa Mộc - Hồng | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 37 | `nhat-binh-do` | Nhật Bình - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 38 | `hoa-moc-nau` | Hoa Mộc - Nâu | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 39 | `ren-theu-trang` | Ren Thêu - Trắng | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 40 | `lau-dai-xanh` | Lâu Đài - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 41 | `song-long-xanh` | Song Long - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 42 | `lien-hoa-hong` | Liên Hoa - Hồng | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 43 | `vuon-xuan-do` | Vườn Xuân - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 44 | `long-phung-lam` | Long Phụng - Lam | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 45 | `vuon-xuan-lam` | Vườn Xuân - Lam | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 46 | `baroque-v2-xanh-dam` | Baroque V2 - Xanh Đậm | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 47 | `hoa-thuy-tinh-lam` | Hoa Thuỷ Tinh - Lam | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 48 | `bach-su-v2-hong` | Bạch Sứ V2 - Hồng | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 49 | `lau-dai-lam` | Lâu Đài - Lam | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 50 | `bach-su-v2-xanh` | Bạch Sứ V2 - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 51 | `florence-nau` | Florence - Nâu | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 52 | `hoa-kho-v2-lam` | Hoa Khô V2 - Lam | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 53 | `co-ba-do` | Cô Ba - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 54 | `song-long-lam` | Song Long - Lam | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 55 | `hoang-kim-xanh` | Hoàng Kim - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 56 | `minimalism-tim` | Minimalism - Tím | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 57 | `hoa-kho-v2-xanh` | Hoa Khô V2 - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 58 | `hoa-dai-hong` | Hoa Dại - Hồng | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 59 | `baroque-lam` | Baroque - Lam | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 60 | `hoang-kim-ii-xanh` | Hoàng Kim II - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 61 | `long-phung-huyen` | Long Phụng - Huyền | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 62 | `hoang-kim-lam` | Hoàng Kim - Lam | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 63 | `riviera-lam` | Riviera - Lam | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 64 | `baroque-v2-lam-dam` | Baroque V2 - Lam Đậm | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 65 | `bach-su-nau` | Bạch Sứ - Nâu | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 66 | `hoa-thuy-tinh-xanh` | Hoa Thuỷ Tinh - Xanh | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 67 | `hoa-huong-duong` | Hoa Hướng Dương | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 68 | `bach-su-v2-do` | Bạch Sứ II - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 69 | `hoa-thuy-tinh-do` | Hoa Thuỷ Tinh - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 70 | `bach-su-lam` | Bạch Sứ - Lam | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 71 | `bach-su-do` | Bạch Sứ - Đỏ | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 72 | `san-miguel-vang` | San Miguel - Vàng | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 73 | `vuonkinh-lam` | Vườn Kính - Lam | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 74 | `hoang-kim-ii-tim` | Hoàng Kim II - Tím | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |
| 75 | `hoa-kho-cam` | Hoa Khô - Cam | **Bị Cloudflare** | Cover, Mở thiệp, Thiệp chính, Mobile, Laptop | **Kiểm tra một phần (Localhost)** | Web gốc gặp Cloudflare Turnstile; Localhost 100% asset hợp lệ, responsive đạt chuẩn 900px |

---

## III. DANH SÁCH 61 MẪU BỊ CLOUDFLARE CHẶN (CẦN THU THẬP THỦ CÔNG NẾU CẦN ĐỐI CHIẾU SÂU)

Bạn có thể truy cập qua kết nối WARP/tunnel riêng của bạn, lưu trang (Save HTML) hoặc chụp ảnh màn hình rồi copy vào thư mục `docs/qa-review/reference/<slug>/`:

1. **`mai-lan-trang`** (Mai Lan - Trắng) - Link: `https://chungdoi.com/vi/mau-thiep/mai-lan-trang/demo`
2. **`long-phung-v3-do`** (Long Phụng V3 - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/long-phung-v3-do/demo`
3. **`minimalism-nau-dam`** (Minimalism - Nâu Đậm) - Link: `https://chungdoi.com/vi/mau-thiep/minimalism-nau-dam/demo`
4. **`song-long-do`** (Song Long - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/song-long-do/demo`
5. **`vuonkinh-xanh`** (Vườn Kính - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/vuonkinh-xanh/demo`
6. **`to-duyen-do-dam`** (Tơ Duyên - Đỏ Đậm) - Link: `https://chungdoi.com/vi/mau-thiep/to-duyen-do-dam/demo`
7. **`long-phung-v4-do`** (Long Phụng V4 - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/long-phung-v4-do/demo`
8. **`long-phung-do`** (Long Phụng - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/long-phung-do/demo`
9. **`minimalism-lam-dam`** (Minimalism - Lam Đậm) - Link: `https://chungdoi.com/vi/mau-thiep/minimalism-lam-dam/demo`
10. **`lien-hoa-v2-xanh`** (Liên Hoa V2 - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/lien-hoa-v2-xanh/demo`
11. **`minimalism-do`** (Minimalism - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/minimalism-do/demo`
12. **`song-hac-do`** (Song Hạc - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/song-hac-do/demo`
13. **`thanh-diep-xanh`** (Thanh Diệp - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/thanh-diep-xanh/demo`
14. **`to-duyen-hong`** (Tơ Duyên - Hồng) - Link: `https://chungdoi.com/vi/mau-thiep/to-duyen-hong/demo`
15. **`long-phung-xanh`** (Long Phụng - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/long-phung-xanh/demo`
16. **`hoang-kim-do`** (Hoàng Kim - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/hoang-kim-do/demo`
17. **`vuon-xuan-xanh`** (Vườn Xuân - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/vuon-xuan-xanh/demo`
18. **`hoang-gia-vang`** (Baroque - Vàng) - Link: `https://chungdoi.com/vi/mau-thiep/hoang-gia-vang/demo`
19. **`song-phung-xanh`** (Song Phụng - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/song-phung-xanh/demo`
20. **`anh-dao-hong`** (Anh Đào - Hồng) - Link: `https://chungdoi.com/vi/mau-thiep/anh-dao-hong/demo`
21. **`hoa-lua-nau`** (Hoa Lụa - Nâu) - Link: `https://chungdoi.com/vi/mau-thiep/hoa-lua-nau/demo`
22. **`hoa-moc-hong`** (Hoa Mộc - Hồng) - Link: `https://chungdoi.com/vi/mau-thiep/hoa-moc-hong/demo`
23. **`nhat-binh-do`** (Nhật Bình - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/nhat-binh-do/demo`
24. **`hoa-moc-nau`** (Hoa Mộc - Nâu) - Link: `https://chungdoi.com/vi/mau-thiep/hoa-moc-nau/demo`
25. **`ren-theu-trang`** (Ren Thêu - Trắng) - Link: `https://chungdoi.com/vi/mau-thiep/ren-theu-trang/demo`
26. **`lau-dai-xanh`** (Lâu Đài - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/lau-dai-xanh/demo`
27. **`song-long-xanh`** (Song Long - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/song-long-xanh/demo`
28. **`lien-hoa-hong`** (Liên Hoa - Hồng) - Link: `https://chungdoi.com/vi/mau-thiep/lien-hoa-hong/demo`
29. **`vuon-xuan-do`** (Vườn Xuân - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/vuon-xuan-do/demo`
30. **`long-phung-lam`** (Long Phụng - Lam) - Link: `https://chungdoi.com/vi/mau-thiep/long-phung-lam/demo`
31. **`vuon-xuan-lam`** (Vườn Xuân - Lam) - Link: `https://chungdoi.com/vi/mau-thiep/vuon-xuan-lam/demo`
32. **`baroque-v2-xanh-dam`** (Baroque V2 - Xanh Đậm) - Link: `https://chungdoi.com/vi/mau-thiep/baroque-v2-xanh-dam/demo`
33. **`hoa-thuy-tinh-lam`** (Hoa Thuỷ Tinh - Lam) - Link: `https://chungdoi.com/vi/mau-thiep/hoa-thuy-tinh-lam/demo`
34. **`bach-su-v2-hong`** (Bạch Sứ V2 - Hồng) - Link: `https://chungdoi.com/vi/mau-thiep/bach-su-v2-hong/demo`
35. **`lau-dai-lam`** (Lâu Đài - Lam) - Link: `https://chungdoi.com/vi/mau-thiep/lau-dai-lam/demo`
36. **`bach-su-v2-xanh`** (Bạch Sứ V2 - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/bach-su-v2-xanh/demo`
37. **`florence-nau`** (Florence - Nâu) - Link: `https://chungdoi.com/vi/mau-thiep/florence-nau/demo`
38. **`hoa-kho-v2-lam`** (Hoa Khô V2 - Lam) - Link: `https://chungdoi.com/vi/mau-thiep/hoa-kho-v2-lam/demo`
39. **`co-ba-do`** (Cô Ba - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/co-ba-do/demo`
40. **`song-long-lam`** (Song Long - Lam) - Link: `https://chungdoi.com/vi/mau-thiep/song-long-lam/demo`
41. **`hoang-kim-xanh`** (Hoàng Kim - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/hoang-kim-xanh/demo`
42. **`minimalism-tim`** (Minimalism - Tím) - Link: `https://chungdoi.com/vi/mau-thiep/minimalism-tim/demo`
43. **`hoa-kho-v2-xanh`** (Hoa Khô V2 - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/hoa-kho-v2-xanh/demo`
44. **`hoa-dai-hong`** (Hoa Dại - Hồng) - Link: `https://chungdoi.com/vi/mau-thiep/hoa-dai-hong/demo`
45. **`baroque-lam`** (Baroque - Lam) - Link: `https://chungdoi.com/vi/mau-thiep/baroque-lam/demo`
46. **`hoang-kim-ii-xanh`** (Hoàng Kim II - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/hoang-kim-ii-xanh/demo`
47. **`long-phung-huyen`** (Long Phụng - Huyền) - Link: `https://chungdoi.com/vi/mau-thiep/long-phung-huyen/demo`
48. **`hoang-kim-lam`** (Hoàng Kim - Lam) - Link: `https://chungdoi.com/vi/mau-thiep/hoang-kim-lam/demo`
49. **`riviera-lam`** (Riviera - Lam) - Link: `https://chungdoi.com/vi/mau-thiep/riviera-lam/demo`
50. **`baroque-v2-lam-dam`** (Baroque V2 - Lam Đậm) - Link: `https://chungdoi.com/vi/mau-thiep/baroque-v2-lam-dam/demo`
51. **`bach-su-nau`** (Bạch Sứ - Nâu) - Link: `https://chungdoi.com/vi/mau-thiep/bach-su-nau/demo`
52. **`hoa-thuy-tinh-xanh`** (Hoa Thuỷ Tinh - Xanh) - Link: `https://chungdoi.com/vi/mau-thiep/hoa-thuy-tinh-xanh/demo`
53. **`hoa-huong-duong`** (Hoa Hướng Dương) - Link: `https://chungdoi.com/vi/mau-thiep/hoa-huong-duong/demo`
54. **`bach-su-v2-do`** (Bạch Sứ II - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/bach-su-v2-do/demo`
55. **`hoa-thuy-tinh-do`** (Hoa Thuỷ Tinh - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/hoa-thuy-tinh-do/demo`
56. **`bach-su-lam`** (Bạch Sứ - Lam) - Link: `https://chungdoi.com/vi/mau-thiep/bach-su-lam/demo`
57. **`bach-su-do`** (Bạch Sứ - Đỏ) - Link: `https://chungdoi.com/vi/mau-thiep/bach-su-do/demo`
58. **`san-miguel-vang`** (San Miguel - Vàng) - Link: `https://chungdoi.com/vi/mau-thiep/san-miguel-vang/demo`
59. **`vuonkinh-lam`** (Vườn Kính - Lam) - Link: `https://chungdoi.com/vi/mau-thiep/vuonkinh-lam/demo`
60. **`hoang-kim-ii-tim`** (Hoàng Kim II - Tím) - Link: `https://chungdoi.com/vi/mau-thiep/hoang-kim-ii-tim/demo`
61. **`hoa-kho-cam`** (Hoa Khô - Cam) - Link: `https://chungdoi.com/vi/mau-thiep/hoa-kho-cam/demo`
