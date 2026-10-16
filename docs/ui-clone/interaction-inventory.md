# Interaction inventory

Cột "Vị trí" là tệp trong `web/src`. "API" luôn là **không có** trừ khi ghi khác: `../api` và `../documentation` trống, project không có backend. Mọi dữ liệu là mock ở frontend; chỉ những mục ghi "localStorage" mới lưu qua lần tải lại trang.

Mức bằng chứng: C = CONFIRMED, I = INFERRED, U = UNKNOWN.

**Lưu ý cột "Hiện trạng":** lấy từ đọc mã và tìm chuỗi chữ trong `src/`. Chỉ Dashboard đã được chạy và chụp màn hình. "Có" nghĩa là mã có phần tương ứng, chưa phải đã kiểm thử hoạt động.

## 1. Toàn site

| Element | Hành vi | Thay đổi trạng thái | Validation | Vị trí | Bằng chứng | Hiện trạng |
|---|---|---|---|---|---|---|
| Liên kết thanh trên | chuyển trang bằng History API | `location.pathname` | — | `router.tsx`, `TopNav.tsx` | C | Có |
| "Khách Mời" | chỉ hiện khi đã đăng nhập | đọc `chungdoi.logged_in` | — | `TopNav.tsx` | C | Có |
| "Đăng Nhập" | mở modal | `loginOpen` | — | `TopNav.tsx` | C | Có (kiểu OTP/Google/Apple) |
| Modal đăng nhập: nhập email + "Tiếp tục" | gửi mã qua email | → bước nhập mã | email hợp lệ | `TopNav.tsx` | C UI / U logic | Mô phỏng, không gửi email |
| Nút giao diện | đổi sáng/tối | — | — | `TopNav.tsx` | U | Chỉ là icon |
| Avatar | mở menu người dùng | menu | — | `TopNav.tsx` | I | Có |

## 2. Dashboard

| Element | Hành vi | Thay đổi trạng thái | Validation | Vị trí | Bằng chứng | Hiện trạng |
|---|---|---|---|---|---|---|
| Tab Tất cả/Xuất bản/Nháp | lọc theo trạng thái | `tab` | — | `Dashboard.tsx` | C | Có |
| ✎ cạnh tên | đổi tên tại chỗ | tên thiệp → localStorage | chưa có (cho phép rỗng) | `Dashboard.tsx` | C | Có |
| "Chỉnh sửa thiệp" | mở `/edit/:id` | điều hướng | — | `Dashboard.tsx` | C | Có |
| "Xuất bản" (nháp) | mở modal Kiểm tra thông tin → xuất bản → mở modal chia sẻ | `status = published` | modal đếm mục hoàn thành | `PublishCheckModal.tsx` | C | Có |
| "Thanh toán" | sang trang bảng giá | điều hướng | — | `Dashboard.tsx` | I | Có |
| "Chia sẻ" | mở modal chia sẻ | `sharingCard` | — | `ShareModal.tsx` | C | Có, link cố định |
| "Nhân bản" | tạo thiệp nháp mới cùng mẫu | thêm vào danh sách | — | `Dashboard.tsx` | I | Có, không sao chép nội dung editor (G07/G39) |
| "Xóa" | mở xác nhận → xóa | xóa khỏi danh sách | xác nhận | `Dashboard.tsx` | C | Có |
| Thẻ "Tạo thiệp mới" | sang trang mẫu thiệp | điều hướng | — | `Dashboard.tsx` | I | Có |
| Banner "Đăng nhập ngay" | mở modal đăng nhập | `loginOpen` | — | `Dashboard.tsx` | C | Có |

## 3. Khách Mời

| Element | Hành vi | Thay đổi trạng thái | Validation | Vị trí | Bằng chứng | Hiện trạng |
|---|---|---|---|---|---|---|
| Tab Danh sách/Tổng quan/Lời chúc | đổi nội dung | `tab` | — | `Guests.tsx` | C | Có |
| "Xuất bản ngay" | mở editor | điều hướng | — | `Guests.tsx` | I | Có |
| Ô "Tìm theo tên…" | lọc theo tên | `q` | — | `Guests.tsx` | I | Có |
| "Thêm khách" | modal nhập tên → thêm | danh sách → localStorage `chungdoi.guests.<id>` | tên không rỗng; slug không dấu, tự thêm `-2`… nếu trùng | `Guests.tsx` | C nút / U form | Có |
| "Thêm nhiều khách cùng lúc" | textarea mỗi dòng một khách | như trên | bỏ dòng rỗng | `Guests.tsx` | C nút / U form | Có |
| "Công cụ" | menu: nhiều khách, xuất CSV, xóa tất cả | CSV tải về / xóa danh sách | nút tắt khi danh sách rỗng | `Guests.tsx` | C nút / U nội dung menu | Có, nội dung menu tự dựng |
| "Tất cả N ⌄" | mở bộ lọc | — | — | `Guests.tsx` | C nút / U lựa chọn | Chỉ hiển thị, chưa mở menu |
| Sao chép link / xóa từng khách | — | — | — | `Guests.tsx` | U | Tự dựng |
| Tab Tổng quan, Lời chúc | — | — | — | `Guests.tsx` | U | Tự dựng |

## 4. Editor

| Element | Hành vi | Thay đổi trạng thái | Validation | Vị trí | Bằng chứng | Hiện trạng |
|---|---|---|---|---|---|---|
| Nút thu gọn thẻ | mở/đóng | `open` | — | `ui.tsx` Section | I | Có |
| Toggle Hiện/Ẩn | bật/tắt mục; khi tắt hiện hint | trường `*On` trong `Inv` | — | `ui.tsx`, `Sections.tsx` | C | Có |
| Lời mở đầu: Mặc định/Tự chỉnh | bật ô nhập | `introCustom`, `introText` | — | `Sections.tsx` Basic | C tắt / I bật | Có; chữ mặc định chưa theo mẫu (G14) |
| Họ tên, tên ngắn, danh xưng | nhập; ↺ đặt lại | `Inv` | — | `Sections.tsx` | C | Có |
| Thứ tự hiển thị | Nhà trai/gái trước | `order` | — | `Sections.tsx` | C | Có |
| Ảnh đầu thiệp: Tải lên | chọn file → loading % → success → ảnh | `heroPhoto` (`blob:` URL) | file ảnh | `HeroPhoto.tsx` | C | Chỉ có "Đổi ảnh/Xoá"; thiếu rỗng/loading/success (G15) |
| Ảnh đầu thiệp: cắt | modal kéo + phóng to | `heroZoom/X/Y` | — | `HeroPhoto.tsx` | I | Có |
| Thư viện ảnh: Thêm ảnh | chọn nhiều file; tiến độ n/m; toast | `photos` (`blob:` URL) | tối đa 20/lần theo chữ trên UI | `Sections.tsx` Album | C | Mô phỏng upload |
| Thư viện ảnh: layout Lưới/Ghép/3D | đổi kiểu | `albumLayout` | — | `Sections.tsx` | C | Có |
| Ảnh: ⋮ → cắt/xóa/lùi/tiến | thao tác trên ảnh | `photos`, `photoCrops` | nút lùi/tiến tắt ở đầu/cuối | `Sections.tsx` | C | Có |
| Ảnh: kéo thả | đổi chỗ | `photos` | — | `Sections.tsx` | I | Có |
| Nhạc nền: "Chọn nhạc" / "Đổi nhạc khác" | mở modal | `musicName` | — | `MusicPicker.tsx` | C | Không phát âm thanh thật |
| Modal nhạc: waveform kéo đoạn | cắt đoạn phát | — | — | — | C UI | Mã có phần waveform, chưa chạy để xem |
| Tiệc cưới: tab loại | đổi tiêu đề mặc định | `banquetType` | — | `Sections.tsx` | C | Có |
| Giờ/ngày/định dạng giờ | nhập | `date`, `time`, `clock` | định dạng ngày/giờ của input | `Sections.tsx` | C | Có |
| Giờ Đón khách & Khai tiệc | toggle | `hideWelcomeTimes` | — | `Sections.tsx` | C | Có |
| Đồng hồ đếm ngược | toggle | `countdown` | — | `Sections.tsx` | C | Có |
| Bản đồ | toggle + nhập địa chỉ/link, "Hủy" | `showMap`, `mapUrl` | không kiểm tra link | `Sections.tsx` | C | Có |
| RSVP | toggle, hiển thị nút/inline, giới hạn, câu hỏi | `Inv` | — | `Sections.tsx` | C | Có |
| Dress Code | tiêu đề, mô tả, màu: gợi ý + hex + "Thêm" | `dressColors` | hex hợp lệ | `Sections.tsx` | C | Có |
| Lịch trình | thêm/xóa/đổi thứ tự hoạt động | `sched` | giờ + nội dung | `Sections.tsx` | C | Có |
| Sổ lưu bút | "Xem và quản lý" | — | — | `Sections.tsx` | C nút / U đích | Hiển thị |
| Hộp Quà Mừng | thêm/sửa/xóa tài khoản, chọn ngân hàng, kiểu hiển thị | `gifts` | số tài khoản, tên chủ TK | `Sections.tsx` | C | Có; validation U |
| Ảnh xem trước chia sẻ | tab, tải ảnh, chọn thư viện, cắt 1200×630 | — | — | `Sections.tsx` | C | Có |
| Lời cảm ơn | textarea | `thanks` | — | `Sections.tsx` | C | Có |
| Chỉnh sửa/Xem trước | đổi chế độ | `mode` | — | `Header.tsx`, `App.tsx` | C | Có |
| Chọn mẫu (header) | mở modal Đổi mẫu thiệp | `templateId` | giữ nguyên nội dung | `TemplateModal.tsx` | C | Có |
| ⚙ | menu (Ngôn ngữ thiệp, Thành viên) | — | — | `Header.tsx` | I | Có mục "Ngôn ngữ thiệp" và "Thành viên" trong `Header.tsx` |
| Xuất bản / Chia sẻ | mở modal kiểm tra / chia sẻ | — | — | `Header.tsx` | C | Có |
| Tour 4 bước | Tiếp theo/Quay lại/Hoàn thành/✕ | cờ trong localStorage | — | `TutorialTour.tsx` | C | Có |

## 5. Modal xuất bản và chia sẻ

| Element | Hành vi | Thay đổi trạng thái | Validation | Vị trí | Bằng chứng | Hiện trạng |
|---|---|---|---|---|---|---|
| Kiểm tra thông tin | đếm 9 mục (5 bắt buộc + tùy chọn) → % | — | bắt buộc: tên chú rể, tên cô dâu, ngày, giờ, địa chỉ | `PublishCheckModal.tsx` | C | Có |
| "Vẫn xuất bản" / "Xuất bản" | xuất bản; chưa đăng nhập thì cần đăng nhập | `status` | — | `PublishCheckModal.tsx` | C | Có |
| Chia sẻ link | `navigator.share`/sao chép | toast "Đã sao chép link" | — | `ShareModal.tsx` | C toast | Có |
| Mã QR / Tải ảnh QR | hiện QR, tải PNG | — | — | `ShareModal.tsx` | C | Có (`qrcode-generator`) |
| Xem thiệp, Tùy chỉnh đường link, Thanh toán, Mời khách | điều hướng/đổi slug | — | slug (U) | `ShareModal.tsx` | C nút / U đích | Có; đích "Mời khách" nên là `/guests` (chưa kiểm tra) |

## 6. Trang mẫu thiệp, Home, Demo, Account, Pricing

| Element | Hành vi | Vị trí | Bằng chứng | Hiện trạng |
|---|---|---|---|---|
| Thẻ mẫu | mở modal chi tiết (QR, Tạo thiệp, Xem demo) | `Templates.tsx`, `TemplateModal.tsx` | C | Có |
| "Tạo thiệp" | tạo bản nháp từ mẫu → mở editor | `store.ts createDraft` | C | Có |
| "Xem demo" | `/vi/mau-thiep/:slug/demo` | `Demo.tsx` | C | Có |
| Chip "Bộ sưu tập thiệp cưới" | lọc theo tag | `Templates.tsx` | I | `Templates.tsx` không có mã lọc theo tag (tìm "tag"/"filter" không thấy); chip có thể chỉ hiển thị (G31) |
| "Gợi ý mẫu thiệp" | gửi gợi ý | `Templates.tsx` | U | Chưa rõ |
| Demo "Mở thiệp" | hiện thiệp đầy đủ | `Preview.tsx` | C | Có |
| Home: carousel 3D, đánh giá cuộn | cuộn/điều hướng | `Home.tsx` | I | Có |
| Account: "Lưu thay đổi", 2 toggle | lưu hồ sơ | `Account.tsx` | C UI | Mô phỏng |

## 7. Yêu cầu chung cho phần cần làm tiếp
- Trạng thái loading/empty/success/failure: chỉ làm khi ảnh chuẩn hoặc yêu cầu chỉ ra; lỗi mạng và hết hạn OTP là U, không tự thêm.
- Không gắn nhãn "đã lưu" cho dữ liệu chỉ nằm trong state. Dữ liệu localStorage chỉ tồn tại trên trình duyệt hiện tại.
- Mọi hành vi chưa có bằng chứng (U) phải được bạn xác nhận trước khi làm.
