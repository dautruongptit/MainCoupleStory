# Mobile image audit (Giai đoạn A — chưa sửa mã ứng dụng)

Ngày lập: 2026-10-17. Phạm vi: toàn bộ app ở khung 390×844 (mobile) và đối chiếu với 1900 px (PC).
Trạng thái: **chờ bạn duyệt trước khi sang Giai đoạn B**.

## 1. Công nghệ mobile của project

- Không có app mobile riêng (`../mobile` trống). "Mobile" là **web responsive**: Vite 5 + React 18 + TypeScript, router tự viết, CSS thuần (`styles.css`, `pages.css`), Tailwind 3 chỉ cho `Preview.tsx` và `LongPhungV2.tsx`.
- Ảnh tĩnh nằm ở `public/images/**` (phục vụ ở `/images/...`). Không có manifest tài sản; ảnh được tham chiếu bằng đường dẫn chuỗi trong TSX/CSS.
- Ảnh từ xa đang dùng: `assets.chungdoi.com` (ảnh mẫu, ảnh thư viện), `api.vietqr.io` (logo ngân hàng), `chungdoi.com` (ảnh họa tiết, hộp quà, biểu tượng thanh toán).

## 2. Cách kiểm tra

Chạy app ở 390 px, vào các trang `/vi`, `/vi/mau-thiep`, `/vi/bang-gia`, `/dashboard`, `/edit/:id`, và trang demo của Song Phụng, Song Hỷ. Với mỗi trang: cuộn hết trang rồi liệt kê mọi thẻ `<img>` chưa tải được và mọi `background-image`; đối chiếu với tệp có sẵn trong `public/`; dùng `curl` để tìm nguyên nhân từng lỗi. Đã quét thêm toàn bộ mã nguồn tìm đường dẫn ảnh.

## 3. Kết luận chính

1. **Không có ảnh nào chỉ hỏng ở mobile.** Ảnh hỏng giống hệt ở PC; mobile chỉ lộ ra nhiều hơn vì thiệp xem trước chiếm cả màn hình.
2. **Nguyên nhân gốc:** máy chủ `chungdoi.com` chặn nhúng ảnh từ trang khác. Cùng một ảnh trả về `200 image/webp` khi gọi không có `Referer`, nhưng trả `403 text/html` khi `Referer` là `http://localhost:5173/`; ngoài ra có `cross-origin-resource-policy: same-site`. Trình duyệt báo `ERR_BLOCKED_BY_ORB`. Vì vậy **mọi liên kết `https://chungdoi.com/...` trong mã sẽ hỏng trên mọi địa chỉ chạy app, kể cả trình duyệt của bạn.** Các nguồn `assets.chungdoi.com` và `api.vietqr.io` vẫn tải được (đã kiểm tra bằng `curl` có `Referer` localhost, cả hai trả 200).
3. **Tám ảnh hộp quà đã có sẵn trong `public/` nhưng mã lại trỏ ra ngoài**, nên chỉ cần sửa đường dẫn.
4. **Không cần tạo ảnh mới bằng công cụ sinh ảnh.** Mọi ảnh còn thiếu đều có bản gốc trên trang thật, lấy về được. (Môi trường này cũng không có công cụ sinh ảnh.)

## 4. Báo cáo khác biệt ảnh

Phân loại: FIX_PATH, REUSE_ASSET, EXTRACT_ASSET, GENERATE_IMAGE, NEED_REFERENCE.

| ID | Màn hình/Thành phần | Ảnh tham chiếu | Tài sản hiện tại | Nguyên nhân | Hành động |
|---|---|---|---|---|---|
| M01 | Thiệp Song Phụng, màn mở thiệp: hoa văn phượng và hoa hai bên (`Preview.tsx:339-354`) | Trang demo thật Song Phụng | `https://chungdoi.com/images/themes/songphung-red/Phuong.webp`, `HOA.webp` | Hotlink bị chặn (403/ORB) | EXTRACT_ASSET: tải `Phuong.webp` (321 KB), `HOA.webp` (133 KB) về `public/images/themes/songphung-red/` rồi đổi đường dẫn |
| M02 | Thiệp Song Phụng đã mở: nền giấy (`Preview.tsx:417`) | như trên | `.../songphung-red/NENGIAY.jpg` | như M01 | EXTRACT_ASSET: `NENGIAY.jpg` (212 KB) |
| M03 | Thiệp Song Phụng: hoa văn phượng hai bên mép (`Preview.tsx:427, 433`) | như trên | `.../songphung-red/Phuong%20line.webp` | như M01 | EXTRACT_ASSET: `Phuong line.webp` (512 KB) |
| M04 | Thiệp Song Phụng, đầu thiệp (`Preview.tsx:565-590`) | như trên | `Phuong 2.webp`, `CHU HY.webp`, `Phuong.webp`, `HOA.webp` | như M01 | EXTRACT_ASSET: `Phuong 2.webp` (370 KB), `CHU HY.webp` (15 KB), dùng lại tệp M01 |
| M05 | Thiệp: mục Hộp Quà Mừng, 8 ảnh hộp quà (`Preview.tsx:1050-1057`) | Ảnh chuẩn 211917 | `https://chungdoi.com/images/giftbox/mini/*.webp`, `nhat_binh_red.webp` | Đã có đủ 8 tệp trong `public/images/giftbox/` (tổng 120 KB) nhưng mã vẫn trỏ ra ngoài | **FIX_PATH**: đổi sang `/images/giftbox/...` (không cần tải) |
| M06 | Thiệp: phong bì mẫu Baroque (`Preview.tsx:999, 1007`) | — | `https://chungdoi.com/images/envelope/baroque_v2_darkred.webp` | như M01 | EXTRACT_ASSET: tải 1 tệp (51 KB) |
| M07 | Editor, "Phương thức khác" (`Sections.tsx:1482-1546`): 4 biểu tượng thanh toán | Ảnh chuẩn gift modal | `https://chungdoi.com/icons/payments/{vietqr,paypal,wise,registry}.svg` | như M01 | EXTRACT_ASSET: 4 tệp SVG rất nhỏ (252–579 byte). Nếu không tải được: GENERATE_IMAGE bằng SVG đơn giản tự vẽ |
| M08 | Ảnh mẫu thiệp, ảnh thư viện, logo ngân hàng | — | `assets.chungdoi.com`, `api.vietqr.io` | Không lỗi | Không cần làm gì |
| M09 | Dashboard thiệp: thẻ không có ảnh bìa | Ảnh chuẩn 233315 cũng không có | — | Đúng như ảnh chuẩn | Không làm gì |
| M10 | 72 mẫu còn lại, xem trước và demo | Trang demo thật từng mẫu (thêm `?open=1` để lấy HTML thiệp đã mở) | Dùng chung bố cục Song Phụng, nên không có họa tiết riêng | Mới có 3 mẫu có bố cục riêng (Minimalism - Nâu, Song Hỷ - Xanh, Long Phụng V2) | NEED_REFERENCE trước khi làm: cần bạn chọn mẫu ưu tiên; mỗi mẫu cần dựng lại từ HTML thật và tải riêng tài sản |
| M11 | Xem trước Song Hỷ - Xanh khi chưa có ảnh cặp đôi | Ảnh chuẩn bạn gửi (ảnh đại diện xám) | Ảnh đại diện xám có sẵn | Khớp | Không làm gì |

Đã kiểm tra nhưng **không** có lỗi: Home (28 ảnh), danh sách mẫu (75 ảnh), bảng giá, Dashboard, editor ở 390 px, trang demo Minimalism - Nâu và Long Phụng V2 (ảnh đã tải về `public/`). Không có chỗ nào tràn ngang (chiều rộng trang 375 px).

Không có mục GENERATE_IMAGE bắt buộc. Không có mục FIX_PATH nào ngoài M05.

## 5. Độ bao phủ so với ảnh mobile bạn đã gửi

| Ảnh mobile (thư mục `design`) | Màn hình | Trạng thái ở 390 px |
|---|---|---|
| `2026-10-17 013826` | Home mobile | Đã chụp so, khớp bố cục (nền tối thay vì sáng vì app chỉ có giao diện tối) |
| `013927` | Chi tiết mẫu dạng bottom sheet | Đã chụp so, khớp |
| `013940`, `014003` | Editor và xem trước mobile | Đã chụp ở lượt trước, khớp thanh dock; xem trước phụ thuộc M01–M04 với mẫu Song Phụng |
| `014015` | Modal Đổi mẫu thiệp | Mã có lưới 3 cột ở ≤640 px; chưa chụp riêng ở lượt này |
| `014125` | Modal "Chỉnh sửa Vietcombank" | Chưa chụp so |
| `014215`, `014230` | Kiểm tra xuất bản | Chưa chụp so ở 390 px (ảnh chuẩn dạng giao diện sáng) |
| `014242`, `014254` | Chia sẻ, Mời khách | Chưa chụp so ở 390 px |

Các màn hình "chưa chụp so" sẽ được chụp và so trong Giai đoạn B. Ảnh mobile bạn gửi đều là ảnh marketing trong khung điện thoại, giao diện sáng, nên khi so sẽ khác nền; không phải thiếu ảnh.

Ảnh bạn vừa gửi (mục "Lời thông báo" và "Lễ") khớp với mã hiện tại: nhãn "Câu thông báo (để trống nếu không muốn hiện)", hint "Bạn có tổ chức lễ vu quy/lễ thành hôn tại nhà không? …", nút "+ Thêm lễ". Không cần sửa.

## 6. Kế hoạch Giai đoạn B (chờ duyệt)

1. **M05** sửa đường dẫn 8 ảnh hộp quà sang tệp có sẵn (không tải gì).
2. **M01–M04, M06, M07** tải 12 tệp về `public/` theo cấu trúc sẵn có:
   - `public/images/themes/songphung-red/`: `Phuong.webp`, `HOA.webp`, `Phuong line.webp`, `Phuong 2.webp`, `CHU HY.webp`, `NENGIAY.jpg` (tổng khoảng 1,56 MB).
   - `public/images/envelope/baroque_v2_darkred.webp` (51 KB).
   - `public/icons/payments/{vietqr,paypal,wise,registry}.svg` (dưới 2 KB).
   Tổng khoảng 1,6 MB, nguồn `https://chungdoi.com/...` (tải không kèm `Referer`).
3. Đổi các đường dẫn trong `Preview.tsx`, `Sections.tsx` sang `/images/...` và `/icons/...`. Giữ tên tệp có dấu cách, mã hóa `%20` như hiện tại.
4. Chạy lại bài quét ảnh hỏng ở 390 px và 1900 px, chụp so các màn hình trong mục 5, ghi kết quả vào tài liệu này.
5. Thêm một dòng ghi chú vào `docs/ui-clone/implementation-plan.md`: không dùng `https://chungdoi.com/...` làm nguồn ảnh vì bị chặn nhúng.

Không động tới: logic nghiệp vụ, bố cục PC, `.agents/`, `.claude/`.

## 7. Điều cần bạn quyết định

1. Đồng ý tải 12 tệp ở mục 6.2 (khoảng 1,6 MB) về `public/`?
2. M10: có muốn dựng riêng thêm mẫu nào ngoài 3 mẫu hiện có không, và là mẫu nào? Mỗi mẫu cần dựng lại từ HTML thật và tải thêm ảnh riêng.
3. Có cần giao diện sáng cho mobile (các ảnh mobile của bạn đều sáng) không? Hiện app chỉ có giao diện tối.

## 8. Kết quả Giai đoạn B (2026-10-17)

Bạn đã duyệt ("Làm luôn đi"). Hai câu hỏi 2 và 3 ở mục 7 chưa được trả lời nên giữ mặc định: không dựng thêm mẫu, không thêm giao diện sáng.

| ID | Kết quả | Kiểm tra |
|---|---|---|
| M05 | Xong: 8 ảnh hộp quà trỏ về `/images/giftbox/...` (có sẵn) | Quét ảnh hỏng ở 390 px: 0 lỗi |
| M01–M04 | Xong: tải 6 tệp về `public/images/themes/songphung-red/` (Phuong, HOA, Phuong line, Phuong 2, CHU HY, NENGIAY.jpg) | 0 ảnh hỏng ở 390 px và 1900 px |
| M06 | Xong: `public/images/envelope/baroque_v2_darkred.webp` | Đường dẫn đã đổi; chưa mở riêng mẫu dùng ảnh này để chụp |
| M07 | Xong: 4 SVG ở `public/icons/payments/` | Mở modal "Phương thức khác": cả 4 biểu tượng tải được |

Tổng 11 tệp tải về, khoảng 1,6 MB, nguồn `https://chungdoi.com/`, tải không kèm `Referer`. Không có ảnh nào phải tạo bằng công cụ sinh ảnh.

Phát hiện thêm khi kiểm tra: phần đầu thiệp Song Phụng (`.sp-hero`) trước đây được viết khi ảnh chưa từng hiển thị, nên khi ảnh tải được thì bố cục lệch (phượng đè lên chữ). Đã dựng lại phần đầu theo HTML trang thật (`song-phung-do/demo?open=1`) bằng class Tailwind, và đặt khung thiệp rộng 900 px ở màn hình từ 768 px trở lên, 480 px ở mobile. Đã so với trang thật ở 390 px: khớp bố cục tên, dải đỏ, chữ Hỷ và hai phượng. Vị trí đóa hoa trong mục "Thông tin lễ cưới" còn lệch nhẹ so với trang thật.

Còn lại: M10 (72 mẫu dùng bố cục chung), và các màn hình mobile chưa chụp so ở mục 5.

## 9. Kết quả "Bước 1" dọn dở (2026-10-17)

- Thêm `npm run check:assets` (`scripts/check-assets.mjs`): báo lỗi nếu mã nhúng ảnh trực tiếp từ `https://chungdoi.com/(images|icons)/` (bị chặn) hoặc trỏ tới tệp `public/` không tồn tại. Đã thử bằng một tệp giả: bắt được cả hai loại lỗi; hiện 30 tệp quét, 0 vấn đề. Chưa có bộ test trình duyệt tự động.
- Đóa hoa mục "Thông tin lễ cưới" của Song Phụng dựng lại theo toạ độ HTML trang thật; ở 390 px nằm trên bên phải tiêu đề như trang thật.
- Chụp so ở 390 px: modal thêm ngân hàng, kiểm tra xuất bản, đổi mẫu (3 cột, không tràn ngang). Nút/nhãn đang chọn của modal ngân hàng đổi từ đỏ `#e11d48` sang hồng thương hiệu `#ff0080`. Modal ngân hàng vẫn dùng nền trắng trong khi modal khác nền tối; ảnh chuẩn modal này (014125) cũng nền trắng nên giữ nguyên.
- Chưa làm: mẫu Baroque (chưa mở để chụp), 72 mẫu còn lại, giao diện sáng.
