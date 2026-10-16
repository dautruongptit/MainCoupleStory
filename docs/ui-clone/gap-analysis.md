# Gap analysis — ảnh chuẩn vs project hiện tại

Phạm vi kiểm tra và mức chắc chắn:
- **[B]** = đã chạy app và chụp màn hình để so (chỉ có Dashboard đã đăng nhập, khung 1900px).
- **[C]** = chỉ đối chiếu chuỗi chữ và cấu trúc trong mã nguồn `src/`, chưa chạy. Có thể còn lệch về pixel.
- **[?]** = chưa kiểm tra.

Quy ước ưu tiên: P0 chặn luồng chính, P1 lệch lớn hoặc thiếu chức năng lõi, P2 lệch vừa, P3 chỉnh nhỏ.

Trạng thái repo khi lập tài liệu: các thay đổi chưa commit từ phiên làm việc này nằm ở `src/Root.tsx`, `src/TopNav.tsx`, `src/pages.css`, `src/pages/Dashboard.tsx`, `src/pages/Guests.tsx` (mới). Thư mục `.playwright-mcp/` (ảnh chụp tạm) cũng chưa theo dõi.

## 1. Bảng khác biệt

| ID | Trang/Thành phần | Ảnh chuẩn | Hiện tại | Khác biệt và cách sửa | Ưu tiên | Kiểm tra |
|---|---|---|---|---|---|---|
| G01 | Khách Mời: tab Tổng quan | Có tab nhưng không có ảnh nội dung | Số liệu tự dựng (tổng, đã xem, chưa xem) | Nội dung không có bằng chứng. Giữ hoặc để trống theo xác nhận của bạn | P2 | [C] |
| G02 | Khách Mời: tab Lời chúc | Có tab, không có ảnh nội dung | Trạng thái rỗng tự viết | Cần ảnh chuẩn để làm đúng | P2 | [C] |
| G03 | Khách Mời: thanh thiệp | Tên thiệp + chấm, nền ảnh thiệp mờ bên phải, nút "Chỉnh sửa" | Tên + chấm + nút, **chưa có ảnh nền mờ** | Thêm ảnh mẫu thiệp làm nền bên phải của thanh | P2 | [C] |
| G04 | Khách Mời: form "Thêm khách", "Thêm nhiều khách" | Không có ảnh | Form tự dựng (một ô tên / textarea mỗi dòng) | UNKNOWN. Cần ảnh | P2 | [C] |
| G05 | Khách Mời: layout 1280px | Khối tìm kiếm rộng 1280px nền `#1d1917` | Dùng `min(1280px,100%)` | Chưa chạy để so | P2 | [?] |
| G06 | Dashboard: thẻ đã xuất bản | khớp ảnh 233315 | khớp (xem mục 2) | Còn lệch nhỏ về cỡ chữ | P3 | [B] |
| G07 | Dashboard: nhân bản | Có nút "Nhân bản" | Có; chỉ sao chép bản ghi thiệp, không sao chép nội dung editor (editor chưa lưu theo thiệp) | Cần quyết định kiến trúc lưu nội dung (mục 4 của implementation-plan) | P1 | [C] |
| G08 | Dashboard: footer | Ảnh chỉ chụp phần trên | Footer hiển thị | Không có bằng chứng; giữ nguyên | P3 | [?] |
| G09 | Dashboard: mobile | Không có ảnh | Một cột (media query 760px) | UNKNOWN | P3 | [?] |
| G10 | Dashboard chưa đăng nhập, rỗng (013632) | banner xanh + "Bắt đầu tạo thiệp" | Có cả hai (đối chiếu mã) | Chưa chạy | P2 | [C] |
| G11 | Thanh trên: logo | Hoa sen trắng, nền hồng | Hoa sen vẽ lại gần giống | Cần file logo gốc | P2 | [B] |
| G12 | Thanh trên: nút giao diện | Mặt trời | Đã đổi sang mặt trời; **nút không đổi giao diện** (chỉ là icon) | Sáng/tối chưa có ảnh chuẩn nên chưa làm | P3 | [B] |
| G13 | Font | Tiêu đề trông như Montserrat; chữ script ở Home | `index.html` chỉ nạp các font serif/script cho thiệp, không nạp Montserrat | Thêm Montserrat; xác định font script (xem Home) | P2 | [C] |
| G14 | Editor: "Lời mở đầu" | Chữ mặc định đổi theo mẫu; nhãn "Mặc định" khi tắt | Chữ cố định "Save The Date"; nhãn bật là "Tùy chỉnh" (chưa có ảnh trạng thái bật) | Lấy chữ mặc định theo mẫu: Minimalism Đỏ Đậm = "Save The Date", Song Hỷ Xanh = "WELCOME TO OUR WEDDING", Minimalism Nâu = "The Wedding Of". Các mẫu khác UNKNOWN | P1 | [C] |
| G15 | Editor: Ảnh đầu thiệp | Rỗng ("Tải lên") → loading % → thành công (khung xanh, tích) → có ảnh | Mã đã có cả 4 trạng thái (`uploading`, `hero-success-check`, nút "Tải lên") | Chưa chạy để so cỡ và màu. (Đã sửa: bản nháp đầu của tài liệu ghi nhầm là thiếu) | P2 | [C] |
| G16 | Editor: Thư viện ảnh | tải lên 1/1 + toast + 2 ảnh | Đã làm trong phiên trước (loading, thanh tiến độ, toast) | Chưa chạy để so | P2 | [C] |
| G17 | Editor: menu ⋮ trên ảnh | lưới 2×2 | Đã làm | Chưa chạy để so | P2 | [C] |
| G18 | Editor: Hộp Quà Mừng | danh sách tài khoản, kiểu hiển thị 3 lựa chọn, modal sửa | Có chuỗi chữ tương ứng | Chưa chạy; ảnh 213500 là chụp lỗi CSS, không dùng làm chuẩn | P2 | [C] |
| G19 | Editor: Tiệc cưới | 3 tab, trường như ảnh, bản đồ có "Địa chỉ bản đồ"/"Hủy" | Có chuỗi chữ | Chưa chạy | P2 | [C] |
| G20 | Editor: Dress Code | Tiêu đề, Mô tả, Màu sắc (+), gợi ý, màu tùy chỉnh + "Thêm" | Có chuỗi chữ | Chưa chạy | P2 | [C] |
| G21 | Editor: Lịch trình | Tiêu đề + 5 hoạt động, giờ AM/PM, ↑↓ xóa | Có chuỗi chữ | Chưa chạy; ảnh dùng giờ kiểu `05:30 PM` | P2 | [C] |
| G22 | Editor: Sổ lưu bút | "0 lời chúc / Xem và quản lý" | Có chuỗi chữ | Chưa chạy | P3 | [C] |
| G23 | Editor: hint mục ẩn | 11 mục có hint vàng | Có cho 11 mục (đối chiếu chuỗi) | Chưa chạy để so cỡ chữ/màu | P3 | [C] |
| G24 | Editor: ảnh xem trước chia sẻ | tab + tải ảnh + chọn thư viện + cắt 1200×630 | Có các chuỗi chữ | Chưa chạy | P2 | [C] |
| G25 | Editor: Nhạc nền | rỗng / đã chọn / modal có waveform | Có chuỗi chữ; modal làm theo HTML bạn dán | Chưa chạy; âm thanh chỉ mô phỏng | P2 | [C] |
| G26 | Modal Đổi mẫu thiệp | lưới 7 cột desktop, 3 cột mobile | Có `TemplateModal.tsx` | Chưa chạy | P2 | [C] |
| G27 | Tour 4 bước | 4 bước với mũi tên hướng tới phần tử | Có `TutorialTour.tsx` | Chưa chạy; vị trí popup cần kiểm tra theo ảnh | P2 | [C] |
| G28 | Xuất bản: Kiểm tra thông tin | 0/9, vòng tròn %, nút "Vẫn xuất bản" (cam) / "Xuất bản" (xanh, khi 89%) | Có `PublishCheckModal.tsx` | Chưa chạy; kiểm tra màu nút theo trạng thái | P2 | [C] |
| G29 | Modal chia sẻ / QR | link, 2 nút, 4 dòng, QR | Có `ShareModal.tsx` | Chưa chạy. Link hiện cố định `z6dt5xo7` | P2 | [C] |
| G30 | Đăng nhập | 2 kiểu khác nhau | Chỉ một modal "Chào mừng bạn" kiểu 2 (có Google/Apple) | Kiểu 1 (tab Đăng nhập/Đăng ký + mật khẩu) chưa có; không rõ kiểu nào hiện hành | P2 | [C] |
| G31 | Templates: chip "Bộ sưu tập thiệp cưới" | 10 chip | Có chuỗi chữ trong `Templates.tsx`; chưa rõ có phải chip lọc | Kiểm tra bằng cách chạy | P1 | [C] |
| G32 | Templates: "Chưa thấy mẫu ưng ý?", "Sẵn sàng tạo thiệp?" | có | Có | Chưa chạy | P2 | [C] |
| G33 | Chi tiết mẫu: QR, tính năng | có | `TemplateModal.tsx` có "Tính năng" và "Quét mã QR" | Chưa chạy | P2 | [C] |
| G34 | Demo: màn "Mở thiệp" | có | `Demo.tsx` + `Preview.tsx` | Chưa chạy | P2 | [C] |
| G35 | Home: hero, carousel 3D, 3 bước, video, đánh giá, hỗ trợ, đổi mẫu | đủ | Đủ các tiêu đề trong `Home.tsx` (855 dòng) | Chưa chạy; carousel 3D, đánh giá cuộn ngang cần so động | P2 | [C] |
| G36 | Account | họ tên, email, SĐT, 4 số liệu, tùy chỉnh, tài khoản | Có "Lưu thay đổi" | Chưa chạy | P2 | [C] |
| G37 | Mobile (toàn site) | ảnh marketing trong khung điện thoại | Có 17 `@media` trong `styles.css`; chưa so | Cần chạy ở 390px | P1 | [?] |
| G38 | Preview chưa dùng dữ liệu mới | — | `Preview.tsx` chưa dùng ảnh đầu thiệp, lời mở đầu, cắt ảnh từng ảnh | Nối dữ liệu vào preview | P1 | [C] |
| G39 | Nội dung editor không lưu theo từng thiệp | — | Chỉ danh sách thiệp ở localStorage (`chungdoi.cards`); nội dung editor không lưu | Chưa có nơi lưu; ảnh hưởng nhân bản, mở lại thiệp | P0 | [C] |
| G40 | Truy cập | — | Chưa kiểm tra bàn phím, focus, aria cho các modal mới | Rà soát | P3 | [?] |
| G41 | Test | — | Không có test, không có script test trong `package.json` | Thêm kiểm thử (xem plan) | P2 | [C] |

## 2. Kết quả so sánh đã chạy thật (Dashboard, 1900×500, đã đăng nhập, 1 thiệp đã xuất bản)

Khớp với ảnh 233315: chiều rộng container, hai cột bằng nhau, thẻ nền nâu ấm, hai viên thuốc "Dùng thử" và "Còn 3 ngày • 0/20 khách", dòng mẫu với "Nâu" màu cam, hàng nút 4 cột, thẻ nét đứt "Tạo thiệp mới", tab trong khung tối, logo, nút mặt trời.

Còn lệch nhỏ chưa đo chính xác: cỡ chữ từng phần, khoảng cách dọc giữa các dòng, độ đậm viền thẻ nét đứt.

## 3. Các điểm cần bạn quyết định (ảnh hưởng gap)

1. G39: có lưu nội dung editor theo từng thiệp (localStorage) không?
2. G30: dùng kiểu đăng nhập nào (một hay cả hai)?
3. G01, G02, G04: tab Tổng quan và Lời chúc của Khách Mời cần ảnh chuẩn hay giữ bản tự dựng?
4. G12: có cần chế độ sáng/tối thật không?
