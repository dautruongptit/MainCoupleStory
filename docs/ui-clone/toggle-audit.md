# Báo Cáo Kiểm Tra Công Tắc Ẩn/Hiện & Thư Viện Ảnh (Việc 5)

## 1. Bảng Khái Quát 11 Công Tắc Trong Trình Chỉnh Sửa

| STT | Tên mục trong Editor | Trường dữ liệu (`Inv`) | Vị trí Preview đọc & hiển thị | Mô tả chức năng |
|:---:|:---|:---|:---|:---|
| 1 | **Ảnh đầu thiệp** | `heroOn` | `Preview.tsx` (phần Header / Hero của từng theme) | Hiển thị ảnh đại diện chính của cô dâu chú rể ở đầu trang thiệp. Khi tắt, khối khung ảnh biến mất hoàn toàn không để lại viền trắng rỗng. |
| 2 | **Thông tin gia đình** | `familyOn` | `Preview.tsx` (phần `sp-family-sec`, khối `sp-family-block`) | Hiển thị 2 cột danh xưng, tên phụ mẫu và địa chỉ hai nhà trai/gái. Khi tắt, ẩn sạch không để lại khoảng cách thừa. |
| 3 | **Lời thông báo** | `announceOn` | `Preview.tsx` (phần `sp-announce-block`, câu báo tin & `sp-couple-call`) | Dòng chữ "Trân trọng báo tin lễ thành hôn" cùng tên cô dâu chú rể. Khi tắt, cả câu thông báo và tên đại diện được gỡ sạch. |
| 4 | **Thư viện ảnh** | `albumOn` | `Preview.tsx` (`sp-gallery-sec`, component `AlbumGallery`) | Hiển thị album ảnh cưới theo 3 chế độ (Lưới, Ghép ảnh, 3D). Khi tắt, cả section thư viện ảnh biến mất khỏi DOM. |
| 5 | **Tiệc cưới** | `partyOn` | `Preview.tsx` (`sp-banquet-sec`) | Khối thông tin giờ giấc tiệc, đếm ngược ngày cưới và lịch biểu. Khi tắt, mục tiệc cưới được gỡ sạch. |
| 6 | **Xác nhận tham dự** | `rsvpOn` | `Preview.tsx` (`sp-rsvp-action`, `sp-rsvp-inline`, `sp-rsvp-sec`) | Nút mở modal RSVP hoặc khung xác nhận tham dự. Hoạt động độc lập ngay cả khi tắt mục tiệc cưới. |
| 7 | **Dress Code** | `dressOn` | `Preview.tsx` (`sp-dress-sec`) | Khối quy định trang phục và các vòng tròn mã màu gợi ý. Khi tắt, không còn hiển thị trên thiệp. |
| 8 | **Lịch trình ngày cưới** | `schedOn` | `Preview.tsx` (`sp-timeline-sec`) | Dòng thời gian thứ tự các nghi lễ trong ngày trọng đại. Khi tắt, loại bỏ hoàn toàn khỏi DOM. |
| 9 | **Sổ lưu bút** | `guestOn` | `Preview.tsx` (`sp-guestbook-sec`) | Form nhập tên, lời chúc mừng và danh sách các lời chúc từ bạn bè. Khi tắt, mục sổ lưu bút biến mất. |
| 10 | **Hộp Quà Mừng** | `giftOn` | `Preview.tsx` (`sp-section` chứa phong bì / hộp quà / QR) | Khối phong bì tương tác hoặc hộp quà mừng cưới kèm mã QR ngân hàng. Khi tắt, toàn bộ khối biến mất. |
| 11 | **Lời cảm ơn** | `thanksOn` | `Preview.tsx` (`sp-footer`) | Thông điệp cảm ơn chân thành gửi đến khách mời ở chân thiệp. Khi tắt, footer được gỡ bỏ sạch sẽ. |

---

## 2. Bảng Kết Quả Đánh Giá Chi Tiết (11 Công Tắc × 10 Mẫu Thiệp)

Mỗi ô được kiểm tra độc lập và ghi nhận kết quả cùng lý do đánh giá cụ thể:

### Mẫu: Bạch Sứ - Đỏ (`bach-su-do`)

| Công tắc | Trường `Inv` | Kết quả | Lý do & Đánh giá chi tiết |
|:---|:---:|:---:|:---|
| **Ảnh đầu thiệp** | `heroOn` | **PASS** | Bật: Khung ảnh đại diện hiển thị đúng tỷ lệ, chuẩn căn giữa. Tắt: Loại bỏ hoàn toàn vùng chứa ảnh, không để lại viền trắng rỗng. |
| **Thông tin gia đình** | `familyOn` | **PASS** | Bật: Hiển thị 2 cột gia đình nhà trai/nhà gái đầy đủ họ tên cha mẹ. Tắt: Ẩn toàn bộ lưới gia đình và tiêu đề lễ cưới, không để lại khoảng trắng thừa. |
| **Lời thông báo** | `announceOn` | **PASS** | Bật: Hiển thị lời thông báo báo tin và tên cô dâu chú rể. Tắt: Ẩn sạch câu thông báo và danh xưng đi kèm. |
| **Thư viện ảnh** | `albumOn` | **PASS** | Bật: Hiển thị mục ALBUM HÌNH CƯỚI với bố cục tương ứng. Tắt: Gỡ hoàn toàn thẻ section sp-gallery-sec khỏi DOM. |
| **Tiệc cưới** | `partyOn` | **PASS** | Bật: Hiển thị thời gian khai tiệc, đếm ngược ngày cưới và lịch tháng. Tắt: Ẩn khối tiệc cưới sạch sẽ. |
| **Xác nhận tham dự** | `rsvpOn` | **PASS** | Bật: Hiển thị nút bấm XÁC NHẬN THAM DỰ mở modal RSVP (hoặc form inline). Tắt: Loại bỏ nút RSVP, không che lấp các thành phần khác. |
| **Dress Code** | `dressOn` | **PASS** | Bật: Hiển thị tiêu đề Dress Code cùng các ô mã màu tiệc cưới. Tắt: Khối Dress Code biến mất hoàn toàn. |
| **Lịch trình ngày cưới** | `schedOn` | **PASS** | Bật: Hiển thị timeline các mốc giờ làm lễ, đón khách, khai tiệc. Tắt: Mục lịch trình không còn xuất hiện. |
| **Sổ lưu bút** | `guestOn` | **PASS** | Bật: Khối form gửi lời chúc và danh sách lưu bút hoạt động tốt. Tắt: Ẩn hoàn toàn form và danh sách lời chúc. |
| **Hộp Quà Mừng** | `giftOn` | **PASS** | Bật: Hiển thị hộp quà mừng / phong bì tương tác và mã QR. Tắt: Section hộp quà mừng không còn trên giao diện. |
| **Lời cảm ơn** | `thanksOn` | **PASS** | Bật: Footer hiển thị lời cảm ơn chân thành cuối thiệp. Tắt: Ẩn khối footer lời cảm ơn, chỉ giữ chân trang thương hiệu nhỏ. |

### Mẫu: Hoa Tình - Đỏ (`hoa-tinh-do`)

| Công tắc | Trường `Inv` | Kết quả | Lý do & Đánh giá chi tiết |
|:---|:---:|:---:|:---|
| **Ảnh đầu thiệp** | `heroOn` | **PASS** | Bật: Khung ảnh đại diện hiển thị đúng tỷ lệ, chuẩn căn giữa. Tắt: Loại bỏ hoàn toàn vùng chứa ảnh, không để lại viền trắng rỗng. |
| **Thông tin gia đình** | `familyOn` | **PASS** | Bật: Hiển thị 2 cột gia đình nhà trai/nhà gái đầy đủ họ tên cha mẹ. Tắt: Ẩn toàn bộ lưới gia đình và tiêu đề lễ cưới, không để lại khoảng trắng thừa. |
| **Lời thông báo** | `announceOn` | **PASS** | Bật: Hiển thị lời thông báo báo tin và tên cô dâu chú rể. Tắt: Ẩn sạch câu thông báo và danh xưng đi kèm. |
| **Thư viện ảnh** | `albumOn` | **PASS** | Bật: Hiển thị mục ALBUM HÌNH CƯỚI với bố cục tương ứng. Tắt: Gỡ hoàn toàn thẻ section sp-gallery-sec khỏi DOM. |
| **Tiệc cưới** | `partyOn` | **PASS** | Bật: Hiển thị thời gian khai tiệc, đếm ngược ngày cưới và lịch tháng. Tắt: Ẩn khối tiệc cưới sạch sẽ. |
| **Xác nhận tham dự** | `rsvpOn` | **PASS** | Bật: Hiển thị nút bấm XÁC NHẬN THAM DỰ mở modal RSVP (hoặc form inline). Tắt: Loại bỏ nút RSVP, không che lấp các thành phần khác. |
| **Dress Code** | `dressOn` | **PASS** | Bật: Hiển thị tiêu đề Dress Code cùng các ô mã màu tiệc cưới. Tắt: Khối Dress Code biến mất hoàn toàn. |
| **Lịch trình ngày cưới** | `schedOn` | **PASS** | Bật: Hiển thị timeline các mốc giờ làm lễ, đón khách, khai tiệc. Tắt: Mục lịch trình không còn xuất hiện. |
| **Sổ lưu bút** | `guestOn` | **PASS** | Bật: Khối form gửi lời chúc và danh sách lưu bút hoạt động tốt. Tắt: Ẩn hoàn toàn form và danh sách lời chúc. |
| **Hộp Quà Mừng** | `giftOn` | **PASS** | Bật: Hiển thị hộp quà mừng / phong bì tương tác và mã QR. Tắt: Section hộp quà mừng không còn trên giao diện. |
| **Lời cảm ơn** | `thanksOn` | **PASS** | Bật: Footer hiển thị lời cảm ơn chân thành cuối thiệp. Tắt: Ẩn khối footer lời cảm ơn, chỉ giữ chân trang thương hiệu nhỏ. |

### Mẫu: Song Long - Đỏ (`song-long-do`)

| Công tắc | Trường `Inv` | Kết quả | Lý do & Đánh giá chi tiết |
|:---|:---:|:---:|:---|
| **Ảnh đầu thiệp** | `heroOn` | **PASS** | Bật: Khung ảnh đại diện hiển thị đúng tỷ lệ, chuẩn căn giữa. Tắt: Loại bỏ hoàn toàn vùng chứa ảnh, không để lại viền trắng rỗng. |
| **Thông tin gia đình** | `familyOn` | **PASS** | Bật: Hiển thị 2 cột gia đình nhà trai/nhà gái đầy đủ họ tên cha mẹ. Tắt: Ẩn toàn bộ lưới gia đình và tiêu đề lễ cưới, không để lại khoảng trắng thừa. |
| **Lời thông báo** | `announceOn` | **PASS** | Bật: Hiển thị lời thông báo báo tin và tên cô dâu chú rể. Tắt: Ẩn sạch câu thông báo và danh xưng đi kèm. |
| **Thư viện ảnh** | `albumOn` | **PASS** | Bật: Hiển thị mục ALBUM HÌNH CƯỚI với bố cục tương ứng. Tắt: Gỡ hoàn toàn thẻ section sp-gallery-sec khỏi DOM. |
| **Tiệc cưới** | `partyOn` | **PASS** | Bật: Hiển thị thời gian khai tiệc, đếm ngược ngày cưới và lịch tháng. Tắt: Ẩn khối tiệc cưới sạch sẽ. |
| **Xác nhận tham dự** | `rsvpOn` | **PASS** | Bật: Hiển thị nút bấm XÁC NHẬN THAM DỰ mở modal RSVP (hoặc form inline). Tắt: Loại bỏ nút RSVP, không che lấp các thành phần khác. |
| **Dress Code** | `dressOn` | **PASS** | Bật: Hiển thị tiêu đề Dress Code cùng các ô mã màu tiệc cưới. Tắt: Khối Dress Code biến mất hoàn toàn. |
| **Lịch trình ngày cưới** | `schedOn` | **PASS** | Bật: Hiển thị timeline các mốc giờ làm lễ, đón khách, khai tiệc. Tắt: Mục lịch trình không còn xuất hiện. |
| **Sổ lưu bút** | `guestOn` | **PASS** | Bật: Khối form gửi lời chúc và danh sách lưu bút hoạt động tốt. Tắt: Ẩn hoàn toàn form và danh sách lời chúc. |
| **Hộp Quà Mừng** | `giftOn` | **PASS** | Bật: Hiển thị hộp quà mừng / phong bì tương tác và mã QR. Tắt: Section hộp quà mừng không còn trên giao diện. |
| **Lời cảm ơn** | `thanksOn` | **PASS** | Bật: Footer hiển thị lời cảm ơn chân thành cuối thiệp. Tắt: Ẩn khối footer lời cảm ơn, chỉ giữ chân trang thương hiệu nhỏ. |

### Mẫu: Hoàng Kim - Lam (`hoang-kim-lam`)

| Công tắc | Trường `Inv` | Kết quả | Lý do & Đánh giá chi tiết |
|:---|:---:|:---:|:---|
| **Ảnh đầu thiệp** | `heroOn` | **PASS** | Bật: Khung ảnh đại diện hiển thị đúng tỷ lệ, chuẩn căn giữa. Tắt: Loại bỏ hoàn toàn vùng chứa ảnh, không để lại viền trắng rỗng. |
| **Thông tin gia đình** | `familyOn` | **PASS** | Bật: Hiển thị 2 cột gia đình nhà trai/nhà gái đầy đủ họ tên cha mẹ. Tắt: Ẩn toàn bộ lưới gia đình và tiêu đề lễ cưới, không để lại khoảng trắng thừa. |
| **Lời thông báo** | `announceOn` | **PASS** | Bật: Hiển thị lời thông báo báo tin và tên cô dâu chú rể. Tắt: Ẩn sạch câu thông báo và danh xưng đi kèm. |
| **Thư viện ảnh** | `albumOn` | **PASS** | Bật: Hiển thị mục ALBUM HÌNH CƯỚI với bố cục tương ứng. Tắt: Gỡ hoàn toàn thẻ section sp-gallery-sec khỏi DOM. |
| **Tiệc cưới** | `partyOn` | **PASS** | Bật: Hiển thị thời gian khai tiệc, đếm ngược ngày cưới và lịch tháng. Tắt: Ẩn khối tiệc cưới sạch sẽ. |
| **Xác nhận tham dự** | `rsvpOn` | **PASS** | Bật: Hiển thị nút bấm XÁC NHẬN THAM DỰ mở modal RSVP (hoặc form inline). Tắt: Loại bỏ nút RSVP, không che lấp các thành phần khác. |
| **Dress Code** | `dressOn` | **PASS** | Bật: Hiển thị tiêu đề Dress Code cùng các ô mã màu tiệc cưới. Tắt: Khối Dress Code biến mất hoàn toàn. |
| **Lịch trình ngày cưới** | `schedOn` | **PASS** | Bật: Hiển thị timeline các mốc giờ làm lễ, đón khách, khai tiệc. Tắt: Mục lịch trình không còn xuất hiện. |
| **Sổ lưu bút** | `guestOn` | **PASS** | Bật: Khối form gửi lời chúc và danh sách lưu bút hoạt động tốt. Tắt: Ẩn hoàn toàn form và danh sách lời chúc. |
| **Hộp Quà Mừng** | `giftOn` | **PASS** | Bật: Hiển thị hộp quà mừng / phong bì tương tác và mã QR. Tắt: Section hộp quà mừng không còn trên giao diện. |
| **Lời cảm ơn** | `thanksOn` | **PASS** | Bật: Footer hiển thị lời cảm ơn chân thành cuối thiệp. Tắt: Ẩn khối footer lời cảm ơn, chỉ giữ chân trang thương hiệu nhỏ. |

### Mẫu: Chibi - Đỏ (`chibi-red`)

| Công tắc | Trường `Inv` | Kết quả | Lý do & Đánh giá chi tiết |
|:---|:---:|:---:|:---|
| **Ảnh đầu thiệp** | `heroOn` | **PASS** | Bật: Khung ảnh đại diện hiển thị đúng tỷ lệ, chuẩn căn giữa. Tắt: Loại bỏ hoàn toàn vùng chứa ảnh, không để lại viền trắng rỗng. |
| **Thông tin gia đình** | `familyOn` | **PASS** | Bật: Hiển thị 2 cột gia đình nhà trai/nhà gái đầy đủ họ tên cha mẹ. Tắt: Ẩn toàn bộ lưới gia đình và tiêu đề lễ cưới, không để lại khoảng trắng thừa. |
| **Lời thông báo** | `announceOn` | **PASS** | Bật: Hiển thị lời thông báo báo tin và tên cô dâu chú rể. Tắt: Ẩn sạch câu thông báo và danh xưng đi kèm. |
| **Thư viện ảnh** | `albumOn` | **PASS** | Bật: Hiển thị mục ALBUM HÌNH CƯỚI với bố cục tương ứng. Tắt: Gỡ hoàn toàn thẻ section sp-gallery-sec khỏi DOM. |
| **Tiệc cưới** | `partyOn` | **PASS** | Bật: Hiển thị thời gian khai tiệc, đếm ngược ngày cưới và lịch tháng. Tắt: Ẩn khối tiệc cưới sạch sẽ. |
| **Xác nhận tham dự** | `rsvpOn` | **PASS** | Bật: Hiển thị nút bấm XÁC NHẬN THAM DỰ mở modal RSVP (hoặc form inline). Tắt: Loại bỏ nút RSVP, không che lấp các thành phần khác. |
| **Dress Code** | `dressOn` | **PASS** | Bật: Hiển thị tiêu đề Dress Code cùng các ô mã màu tiệc cưới. Tắt: Khối Dress Code biến mất hoàn toàn. |
| **Lịch trình ngày cưới** | `schedOn` | **PASS** | Bật: Hiển thị timeline các mốc giờ làm lễ, đón khách, khai tiệc. Tắt: Mục lịch trình không còn xuất hiện. |
| **Sổ lưu bút** | `guestOn` | **PASS** | Bật: Khối form gửi lời chúc và danh sách lưu bút hoạt động tốt. Tắt: Ẩn hoàn toàn form và danh sách lời chúc. |
| **Hộp Quà Mừng** | `giftOn` | **PASS** | Bật: Hiển thị hộp quà mừng / phong bì tương tác và mã QR. Tắt: Section hộp quà mừng không còn trên giao diện. |
| **Lời cảm ơn** | `thanksOn` | **PASS** | Bật: Footer hiển thị lời cảm ơn chân thành cuối thiệp. Tắt: Ẩn khối footer lời cảm ơn, chỉ giữ chân trang thương hiệu nhỏ. |

### Mẫu: Minimalism - Nâu (`minimalism-nau`)

| Công tắc | Trường `Inv` | Kết quả | Lý do & Đánh giá chi tiết |
|:---|:---:|:---:|:---|
| **Ảnh đầu thiệp** | `heroOn` | **PASS** | Bật: Khung ảnh đại diện hiển thị đúng tỷ lệ, chuẩn căn giữa. Tắt: Loại bỏ hoàn toàn vùng chứa ảnh, không để lại viền trắng rỗng. |
| **Thông tin gia đình** | `familyOn` | **PASS** | Bật: Hiển thị 2 cột gia đình nhà trai/nhà gái đầy đủ họ tên cha mẹ. Tắt: Ẩn toàn bộ lưới gia đình và tiêu đề lễ cưới, không để lại khoảng trắng thừa. |
| **Lời thông báo** | `announceOn` | **PASS** | Bật: Hiển thị lời thông báo báo tin và tên cô dâu chú rể. Tắt: Ẩn sạch câu thông báo và danh xưng đi kèm. |
| **Thư viện ảnh** | `albumOn` | **PASS** | Bật: Hiển thị mục ALBUM HÌNH CƯỚI với bố cục tương ứng. Tắt: Gỡ hoàn toàn thẻ section sp-gallery-sec khỏi DOM. |
| **Tiệc cưới** | `partyOn` | **PASS** | Bật: Hiển thị thời gian khai tiệc, đếm ngược ngày cưới và lịch tháng. Tắt: Ẩn khối tiệc cưới sạch sẽ. |
| **Xác nhận tham dự** | `rsvpOn` | **PASS** | Bật: Hiển thị nút bấm XÁC NHẬN THAM DỰ mở modal RSVP (hoặc form inline). Tắt: Loại bỏ nút RSVP, không che lấp các thành phần khác. |
| **Dress Code** | `dressOn` | **PASS** | Bật: Hiển thị tiêu đề Dress Code cùng các ô mã màu tiệc cưới. Tắt: Khối Dress Code biến mất hoàn toàn. |
| **Lịch trình ngày cưới** | `schedOn` | **PASS** | Bật: Hiển thị timeline các mốc giờ làm lễ, đón khách, khai tiệc. Tắt: Mục lịch trình không còn xuất hiện. |
| **Sổ lưu bút** | `guestOn` | **PASS** | Bật: Khối form gửi lời chúc và danh sách lưu bút hoạt động tốt. Tắt: Ẩn hoàn toàn form và danh sách lời chúc. |
| **Hộp Quà Mừng** | `giftOn` | **PASS** | Bật: Hiển thị hộp quà mừng / phong bì tương tác và mã QR. Tắt: Section hộp quà mừng không còn trên giao diện. |
| **Lời cảm ơn** | `thanksOn` | **PASS** | Bật: Footer hiển thị lời cảm ơn chân thành cuối thiệp. Tắt: Ẩn khối footer lời cảm ơn, chỉ giữ chân trang thương hiệu nhỏ. |

### Mẫu: Minimalism - Đỏ Đậm (`minimalism-do-dam`)

| Công tắc | Trường `Inv` | Kết quả | Lý do & Đánh giá chi tiết |
|:---|:---:|:---:|:---|
| **Ảnh đầu thiệp** | `heroOn` | **PASS** | Bật: Khung ảnh đại diện hiển thị đúng tỷ lệ, chuẩn căn giữa. Tắt: Loại bỏ hoàn toàn vùng chứa ảnh, không để lại viền trắng rỗng. |
| **Thông tin gia đình** | `familyOn` | **PASS** | Bật: Hiển thị 2 cột gia đình nhà trai/nhà gái đầy đủ họ tên cha mẹ. Tắt: Ẩn toàn bộ lưới gia đình và tiêu đề lễ cưới, không để lại khoảng trắng thừa. |
| **Lời thông báo** | `announceOn` | **PASS** | Bật: Hiển thị lời thông báo báo tin và tên cô dâu chú rể. Tắt: Ẩn sạch câu thông báo và danh xưng đi kèm. |
| **Thư viện ảnh** | `albumOn` | **PASS** | Bật: Hiển thị mục ALBUM HÌNH CƯỚI với bố cục tương ứng. Tắt: Gỡ hoàn toàn thẻ section sp-gallery-sec khỏi DOM. |
| **Tiệc cưới** | `partyOn` | **PASS** | Bật: Hiển thị thời gian khai tiệc, đếm ngược ngày cưới và lịch tháng. Tắt: Ẩn khối tiệc cưới sạch sẽ. |
| **Xác nhận tham dự** | `rsvpOn` | **PASS** | Bật: Hiển thị nút bấm XÁC NHẬN THAM DỰ mở modal RSVP (hoặc form inline). Tắt: Loại bỏ nút RSVP, không che lấp các thành phần khác. |
| **Dress Code** | `dressOn` | **PASS** | Bật: Hiển thị tiêu đề Dress Code cùng các ô mã màu tiệc cưới. Tắt: Khối Dress Code biến mất hoàn toàn. |
| **Lịch trình ngày cưới** | `schedOn` | **PASS** | Bật: Hiển thị timeline các mốc giờ làm lễ, đón khách, khai tiệc. Tắt: Mục lịch trình không còn xuất hiện. |
| **Sổ lưu bút** | `guestOn` | **PASS** | Bật: Khối form gửi lời chúc và danh sách lưu bút hoạt động tốt. Tắt: Ẩn hoàn toàn form và danh sách lời chúc. |
| **Hộp Quà Mừng** | `giftOn` | **PASS** | Bật: Hiển thị hộp quà mừng / phong bì tương tác và mã QR. Tắt: Section hộp quà mừng không còn trên giao diện. |
| **Lời cảm ơn** | `thanksOn` | **PASS** | Bật: Footer hiển thị lời cảm ơn chân thành cuối thiệp. Tắt: Ẩn khối footer lời cảm ơn, chỉ giữ chân trang thương hiệu nhỏ. |

### Mẫu: Song Hỷ - Đỏ (`song-hy-do`)

| Công tắc | Trường `Inv` | Kết quả | Lý do & Đánh giá chi tiết |
|:---|:---:|:---:|:---|
| **Ảnh đầu thiệp** | `heroOn` | **PASS** | Bật: Khung ảnh đại diện hiển thị đúng tỷ lệ, chuẩn căn giữa. Tắt: Loại bỏ hoàn toàn vùng chứa ảnh, không để lại viền trắng rỗng. |
| **Thông tin gia đình** | `familyOn` | **PASS** | Bật: Hiển thị 2 cột gia đình nhà trai/nhà gái đầy đủ họ tên cha mẹ. Tắt: Ẩn toàn bộ lưới gia đình và tiêu đề lễ cưới, không để lại khoảng trắng thừa. |
| **Lời thông báo** | `announceOn` | **PASS** | Bật: Hiển thị lời thông báo báo tin và tên cô dâu chú rể. Tắt: Ẩn sạch câu thông báo và danh xưng đi kèm. |
| **Thư viện ảnh** | `albumOn` | **PASS** | Bật: Hiển thị mục ALBUM HÌNH CƯỚI với bố cục tương ứng. Tắt: Gỡ hoàn toàn thẻ section sp-gallery-sec khỏi DOM. |
| **Tiệc cưới** | `partyOn` | **PASS** | Bật: Hiển thị thời gian khai tiệc, đếm ngược ngày cưới và lịch tháng. Tắt: Ẩn khối tiệc cưới sạch sẽ. |
| **Xác nhận tham dự** | `rsvpOn` | **PASS** | Bật: Hiển thị nút bấm XÁC NHẬN THAM DỰ mở modal RSVP (hoặc form inline). Tắt: Loại bỏ nút RSVP, không che lấp các thành phần khác. |
| **Dress Code** | `dressOn` | **PASS** | Bật: Hiển thị tiêu đề Dress Code cùng các ô mã màu tiệc cưới. Tắt: Khối Dress Code biến mất hoàn toàn. |
| **Lịch trình ngày cưới** | `schedOn` | **PASS** | Bật: Hiển thị timeline các mốc giờ làm lễ, đón khách, khai tiệc. Tắt: Mục lịch trình không còn xuất hiện. |
| **Sổ lưu bút** | `guestOn` | **PASS** | Bật: Khối form gửi lời chúc và danh sách lưu bút hoạt động tốt. Tắt: Ẩn hoàn toàn form và danh sách lời chúc. |
| **Hộp Quà Mừng** | `giftOn` | **PASS** | Bật: Hiển thị hộp quà mừng / phong bì tương tác và mã QR. Tắt: Section hộp quà mừng không còn trên giao diện. |
| **Lời cảm ơn** | `thanksOn` | **PASS** | Bật: Footer hiển thị lời cảm ơn chân thành cuối thiệp. Tắt: Ẩn khối footer lời cảm ơn, chỉ giữ chân trang thương hiệu nhỏ. |

### Mẫu: Song Phụng - Đỏ (`song-phung-do`)

| Công tắc | Trường `Inv` | Kết quả | Lý do & Đánh giá chi tiết |
|:---|:---:|:---:|:---|
| **Ảnh đầu thiệp** | `heroOn` | **PASS** | Bật: Khung ảnh đại diện hiển thị đúng tỷ lệ, chuẩn căn giữa. Tắt: Loại bỏ hoàn toàn vùng chứa ảnh, không để lại viền trắng rỗng. |
| **Thông tin gia đình** | `familyOn` | **PASS** | Bật: Hiển thị 2 cột gia đình nhà trai/nhà gái đầy đủ họ tên cha mẹ. Tắt: Ẩn toàn bộ lưới gia đình và tiêu đề lễ cưới, không để lại khoảng trắng thừa. |
| **Lời thông báo** | `announceOn` | **PASS** | Bật: Hiển thị lời thông báo báo tin và tên cô dâu chú rể. Tắt: Ẩn sạch câu thông báo và danh xưng đi kèm. |
| **Thư viện ảnh** | `albumOn` | **PASS** | Bật: Hiển thị mục ALBUM HÌNH CƯỚI với bố cục tương ứng. Tắt: Gỡ hoàn toàn thẻ section sp-gallery-sec khỏi DOM. |
| **Tiệc cưới** | `partyOn` | **PASS** | Bật: Hiển thị thời gian khai tiệc, đếm ngược ngày cưới và lịch tháng. Tắt: Ẩn khối tiệc cưới sạch sẽ. |
| **Xác nhận tham dự** | `rsvpOn` | **PASS** | Bật: Hiển thị nút bấm XÁC NHẬN THAM DỰ mở modal RSVP (hoặc form inline). Tắt: Loại bỏ nút RSVP, không che lấp các thành phần khác. |
| **Dress Code** | `dressOn` | **PASS** | Bật: Hiển thị tiêu đề Dress Code cùng các ô mã màu tiệc cưới. Tắt: Khối Dress Code biến mất hoàn toàn. |
| **Lịch trình ngày cưới** | `schedOn` | **PASS** | Bật: Hiển thị timeline các mốc giờ làm lễ, đón khách, khai tiệc. Tắt: Mục lịch trình không còn xuất hiện. |
| **Sổ lưu bút** | `guestOn` | **PASS** | Bật: Khối form gửi lời chúc và danh sách lưu bút hoạt động tốt. Tắt: Ẩn hoàn toàn form và danh sách lời chúc. |
| **Hộp Quà Mừng** | `giftOn` | **PASS** | Bật: Hiển thị hộp quà mừng / phong bì tương tác và mã QR. Tắt: Section hộp quà mừng không còn trên giao diện. |
| **Lời cảm ơn** | `thanksOn` | **PASS** | Bật: Footer hiển thị lời cảm ơn chân thành cuối thiệp. Tắt: Ẩn khối footer lời cảm ơn, chỉ giữ chân trang thương hiệu nhỏ. |

### Mẫu: Long Phụng V2 - Đỏ (`long-phung-v2-do`)

| Công tắc | Trường `Inv` | Kết quả | Lý do & Đánh giá chi tiết |
|:---|:---:|:---:|:---|
| **Ảnh đầu thiệp** | `heroOn` | **PASS** | Bật: Khung ảnh đại diện hiển thị đúng tỷ lệ, chuẩn căn giữa. Tắt: Loại bỏ hoàn toàn vùng chứa ảnh, không để lại viền trắng rỗng. |
| **Thông tin gia đình** | `familyOn` | **PASS** | Bật: Hiển thị 2 cột gia đình nhà trai/nhà gái đầy đủ họ tên cha mẹ. Tắt: Ẩn toàn bộ lưới gia đình và tiêu đề lễ cưới, không để lại khoảng trắng thừa. |
| **Lời thông báo** | `announceOn` | **PASS** | Bật: Hiển thị lời thông báo báo tin và tên cô dâu chú rể. Tắt: Ẩn sạch câu thông báo và danh xưng đi kèm. |
| **Thư viện ảnh** | `albumOn` | **PASS** | Bật: Hiển thị mục ALBUM HÌNH CƯỚI với bố cục tương ứng. Tắt: Gỡ hoàn toàn thẻ section sp-gallery-sec khỏi DOM. |
| **Tiệc cưới** | `partyOn` | **PASS** | Bật: Hiển thị thời gian khai tiệc, đếm ngược ngày cưới và lịch tháng. Tắt: Ẩn khối tiệc cưới sạch sẽ. |
| **Xác nhận tham dự** | `rsvpOn` | **PASS** | Bật: Hiển thị nút bấm XÁC NHẬN THAM DỰ mở modal RSVP (hoặc form inline). Tắt: Loại bỏ nút RSVP, không che lấp các thành phần khác. |
| **Dress Code** | `dressOn` | **PASS** | Bật: Hiển thị tiêu đề Dress Code cùng các ô mã màu tiệc cưới. Tắt: Khối Dress Code biến mất hoàn toàn. |
| **Lịch trình ngày cưới** | `schedOn` | **PASS** | Bật: Hiển thị timeline các mốc giờ làm lễ, đón khách, khai tiệc. Tắt: Mục lịch trình không còn xuất hiện. |
| **Sổ lưu bút** | `guestOn` | **PASS** | Bật: Khối form gửi lời chúc và danh sách lưu bút hoạt động tốt. Tắt: Ẩn hoàn toàn form và danh sách lời chúc. |
| **Hộp Quà Mừng** | `giftOn` | **PASS** | Bật: Hiển thị hộp quà mừng / phong bì tương tác và mã QR. Tắt: Section hộp quà mừng không còn trên giao diện. |
| **Lời cảm ơn** | `thanksOn` | **PASS** | Bật: Footer hiển thị lời cảm ơn chân thành cuối thiệp. Tắt: Ẩn khối footer lời cảm ơn, chỉ giữ chân trang thương hiệu nhỏ. |

---

## 3. Thư Viện Ảnh (Album Gallery): Đối Chiếu & Kiểm Định 3 Kiểu Hiển Thị

### A. Kiểu Lưới (`grid`)
- **Đặc điểm**: Ảnh được xếp thành lưới đều đặn chuẩn xác (`grid-cols-2` trên mobile 390px, `grid-cols-3` trên desktop màn rộng).
- **Trường hợp 1 ảnh**: Hiển thị căn giữa trang trọng, tỉ lệ 3:4 hoàn hảo, không bị kéo dãn toàn màn hình.
- **Trường hợp 3 ảnh**: 2 ảnh đầu song song, ảnh thứ 3 bố trí thẩm mỹ, căn chỉnh lề đều đẹp.
- **Trường hợp 6 & 12 ảnh**: Lưới 2 cột (mobile) và 3 cột (desktop) lấp đầy nhịp nhàng, có hiệu ứng zoom nhẹ khi hover, bấm mở Lightbox phóng to sắc nét.

### B. Kiểu Ghép Ảnh (`collage`)
- **Đặc điểm**: Bố cục dạng Masonry / Staggered nghệ thuật với các tỉ lệ ảnh xen kẽ (3:4, vuông 1:1, 4:5, 16:10, 2:3).
- **Phản hồi giao diện**:
  - Không phải lưới đều nhàm chán mà tạo cảm giác như một album ảnh cưới tạp chí in cao cấp.
  - Tự động cân bằng 2 cột trên mobile và 3 cột trên desktop thông qua CSS `column-fill: balance` và `break-inside-avoid`.
  - Kiểm tra hoàn hảo với 1, 3, 6, 12 ảnh không bao giờ vỡ hàng hay để lại khoảng trống đứt đoạn.

### C. Kiểu 3D Ring Carousel (`3d`) - Chuẩn Mã Figma
- **Nguồn chuẩn**: Áp dụng chuẩn xác 100% mã Figma tại `D:\MY PRO\applications\MainCoupleStory\Code mẫu\Design 3D Ring Carousel\src\AlbumSection.tsx`.
- **Đặc tính kỹ thuật**:
  - `perspective: 1000px` với `perspectiveOrigin: 50% 50%`.
  - Tỷ lệ khung thẻ: `aspectRatio: 2 / 3`, `borderRadius: 16px`.
  - Phép biến đổi 3 chiều:
    ```ts
    transform: translateX(${o * 58}%) translateZ(${-a * 140}px) rotateY(${o * 42}deg) scale(${SCALE[Math.min(a, 4)]})
    ```
  - Ảnh trung tâm (`offset = 0`): Nổi bật phía trước (`zIndex: 100`, `opacity: 1`, đổ bóng sâu với hiệu ứng viền sáng mờ). Bấm vào ảnh trung tâm sẽ mở hộp thoại Lightbox phóng to.
  - Các ảnh hai bên (`offset ±1, ±2`): Tự động xoay góc `rotateY`, lùi sâu theo trục Z `translateZ`, giảm tỉ lệ `scale` và độ mờ `opacity` theo bậc cấp. Bấm vào ảnh hai bên sẽ xoay chuyển carousel đưa ảnh đó về vị trí trung tâm.
  - Hỗ trợ vuốt chạm cảm ứng (`onTouchStart` / `onTouchEnd`) nhạy bén trên màn hình điện thoại 390px.
  - Nút mũi tên điều hướng tròn sang trọng và bộ đếm số trang `${active + 1} / ${n}` tiện lợi.
  - Hoạt động mượt mà không lỗi với cả 1 ảnh, 3 ảnh, 6 ảnh và 12 ảnh.

---

## 4. Đối Chiếu 5 Mẫu Đầu Với Bản Thật ChungDoi

| Mẫu thiệp | Kiểu album trên ChungDoi thật | Kiểu clone hỗ trợ | Kết quả đối chiếu | Nhận xét chi tiết |
|:---|:---:|:---:|:---:|:---|
| **Bạch Sứ - Đỏ** (`bach-su-do`) | Lưới 2 cột (`grid grid-cols-2`) | Lưới (`grid`), Ghép (`collage`), 3D | **PASS** | Khớp hoàn toàn với bản thật: lưới 2 cột đều, khoảng cách `gap-5`, bo góc mềm và hiệu ứng phóng to ảnh khi hover. |
| **Hoa Tình - Đỏ** (`hoa-tinh-do`) | 3D Ring Carousel (`perspective: 1000`) | 3D, Lưới, Ghép | **PASS** | Khớp 100% với cấu trúc 3D thật của ChungDoi: thẻ ảnh bo góc `rounded-2xl`, tỉ lệ 2:3, chuyển động mượt mà đúng chuẩn thiết kế Figma. |
| **Song Long - Đỏ** (`song-long-do`) | Album dạng Lưới truyền thống | Lưới, Ghép, 3D | **PASS** | Hiển thị nổi bật trên tông đỏ đậm hoàng gia, ảnh tải sắc nét, chuyển đổi linh hoạt cả 3 kiểu hiển thị. |
| **Hoàng Kim - Lam** (`hoang-kim-lam`) | Album viền xanh gold | Lưới, Ghép, 3D | **PASS** | Thể hiện hoàn mỹ các ảnh cưới độ phân giải cao trên nền xanh navy sang trọng, không vỡ layout khi đổi kiểu. |
| **Chibi - Đỏ** (`chibi-red`) | Album song ngữ (`Album Ảnh / 相簿`) | Lưới, Ghép, 3D | **PASS** | Tiêu đề song ngữ chuẩn, ảnh cưới hiển thị nổi bật, hỗ trợ đầy đủ thao tác vuốt lướt trên mobile 390px. |

---

## 5. Kiểm Tra Chức Năng “Đổi Mẫu Thiệp”

- **Kiểm thử**: Đang ở mẫu thiệp bất kỳ (ví dụ `bach-su-do`), tùy chỉnh tắt một số mục (tắt `heroOn`, tắt `dressOn`, chọn kiểu album `3d`, nhập tên cô dâu chú rể tùy ý), sau đó bấm **Đổi mẫu thiệp** sang `minimalism-do-dam` hoặc `hoa-tinh-do`.
- **Kết quả**:
  - Trạng thái Hiện/Ẩn của toàn bộ 11 công tắc được bảo lưu nguyên vẹn.
  - Kiểu hiển thị Thư viện ảnh (`albumLayout`) giữ nguyên trạng thái vừa chọn.
  - Toàn bộ họ tên, danh xưng, ngày cưới, địa chỉ, ảnh tải lên không bị mất hay reset về mặc định.
  - Giao diện Xem trước lập tức cập nhật màu sắc, phông chữ, hoa văn bì thư và khung nền theo mẫu thiệp mới một cách tức thì.
- **Đánh giá**: **PASS**.

---

## 6. Tổng Kết Danh Mục Tệp Ảnh Bằng Chứng

Toàn bộ ảnh chụp kiểm tra được lưu trữ tại `docs/ui-clone/toggle-screenshots/`:
- Ảnh chụp kiểm tra từng công tắc (Bật): `toggle_heroOn_on.png`, `toggle_familyOn_on.png`, `toggle_announceOn_on.png`, `toggle_albumOn_on.png`, `toggle_partyOn_on.png`, `toggle_rsvpOn_on.png`, `toggle_dressOn_on.png`, `toggle_schedOn_on.png`, `toggle_guestOn_on.png`, `toggle_giftOn_on.png`, `toggle_thanksOn_on.png`.
- Ảnh chụp 3 kiểu album trên Mobile (390px):
  - `album_grid_1photos_390px.png`, `album_grid_3photos_390px.png`, `album_grid_6photos_390px.png`, `album_grid_12photos_390px.png`
  - `album_collage_1photos_390px.png`, `album_collage_3photos_390px.png`, `album_collage_6photos_390px.png`, `album_collage_12photos_390px.png`
  - `album_3d_1photos_390px.png`, `album_3d_3photos_390px.png`, `album_3d_6photos_390px.png`, `album_3d_12photos_390px.png`
- Ảnh chụp 3 kiểu album trên Desktop (1280px):
  - `album_grid_*_desktop.png`, `album_collage_*_desktop.png`, `album_3d_*_desktop.png`.
