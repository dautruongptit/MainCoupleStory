# Implementation plan

Tài liệu liên quan: `reference-analysis.md` (ảnh), `gap-analysis.md` (khác biệt, mã G01–G41), `interaction-inventory.md` (hành vi).
**Chưa sửa mã nguồn ứng dụng theo kế hoạch này. Chờ bạn duyệt.**

## 0. Tiến độ thực hiện (cập nhật sau mỗi giai đoạn)

Quyết định đã áp dụng cho 6 câu hỏi mở (bạn duyệt kế hoạch nhưng chưa trả lời từng câu, nên dùng mặc định trong kế hoạch):
1. Có lưu nội dung editor theo thiệp (localStorage). 2. Giữ modal đăng nhập hiện có, chưa thêm kiểu mật khẩu. 3. Giữ tab Tổng quan/Lời chúc tự dựng. 4. Chưa có logo/font gốc, logo vẽ lại. 5. Chưa làm chế độ sáng/tối thật. 6. Đã commit đường cơ sở.

| Giai đoạn | Nội dung | Trạng thái | Cách kiểm tra |
|---|---|---|---|
| 0 | Đường cơ sở, `.gitignore` cho `.playwright-mcp/` | Xong | `tsc`, `vite build` |
| G39, G07 | Lưu `Inv` theo thiệp (`chungdoi.inv.<id>`), nhân bản kèm nội dung, xóa thiệp xóa cả nội dung và danh sách khách | Xong | Chạy trình duyệt: sửa, tải lại, giữ nguyên; nhân bản; xóa |
| G14 | Chữ mở đầu theo mẫu (3 mẫu đã biết) | Xong một phần | Chạy trình duyệt với Song Hỷ - Xanh và Minimalism - Nâu |
| G38 | Preview dùng chữ mở đầu, cắt ảnh đầu thiệp, cắt từng ảnh | Xong | Chạy trình duyệt: chữ tùy chỉnh hiện trong preview |
| G31 | Chip "Bộ sưu tập" lọc mẫu (quy tắc lọc là suy đoán từ tag) | Xong | Chạy trình duyệt: số mẫu thay đổi theo chip, bấm lại bỏ lọc |
| G03 | Thanh thiệp ở Khách Mời có ảnh nền theo mẫu | Xong (chưa thấy ảnh vì CDN trả 403 trong môi trường kiểm thử) | Đọc mã |
| Khách Mời | Bộ lọc Tất cả/Đã xem/Chưa xem; link riêng gắn theo thiệp; CSV chống công thức | Xong | Chạy trình duyệt |
| Editor | Thứ tự mục (Thư viện ảnh sau Lễ), Ảnh đầu thiệp rỗng, Hộp Quà Mừng (Kiểu hiển thị xuống dưới, icon cùng hàng), thẻ nhạc, placeholder tên ngắn | Xong | Chụp và so với ảnh 211744, 211852, 221459, 211639, 214544 |
| Mobile | Dock "Chỉnh sửa/Xem trước" không xuống dòng; Khách Mời ở 390px | Xong cho 2 màn hình | Chụp 390px |

| Giai đoạn 2 | Account (màu thẻ, nút, công tắc), căn giữa menu thanh trên, tiêu đề hero | Xong | Chụp 1900px và so ảnh 233633, 005707 |
| Giai đoạn 2 | Modal chia sẻ và QR chuyển sang giao diện tối, link không còn làm mờ, nhãn "N khách" | Xong | Chụp so ảnh 233329 |
| Giai đoạn 2 | Modal Kiểm tra thông tin giao diện tối | Xong | Chụp so ảnh 224821 |
| Giai đoạn 2 | Modal đăng nhập theo ảnh 224730 (Google trắng, Apple đen, logo, nút xám khi chưa nhập); thêm bước OTP (suy luận, không có ảnh); đóng modal bằng ✕ không còn tự đăng nhập | Xong | Chạy trình duyệt: ✕, OTP 6 số, đăng nhập |
| Giai đoạn 2 | Thiệp mới tạo bắt đầu trống (0/9 mục), tên dự phòng "Chú Rể"/"Cô Dâu" | Xong | Chạy trình duyệt: 0/9 → 1/9 khi nhập tên |
| Giai đoạn 2 | Màu hồng thương hiệu `#ff0080` thống nhất; Montserrat cho tiêu đề trang; chữ script cho cụm nhấn; viền xanh trên thẻ đánh giá; sửa dấu "+" đôi ở modal chi tiết mẫu | Xong | Chụp so ảnh 232649 |

| Giai đoạn 3 | Modal Đổi mẫu thiệp 7 cột, ảnh lấy phần đầu thiệp; ảnh nhỏ ở header cắt phần đầu; đổi mẫu cập nhật luôn bản ghi thiệp (Dashboard, Khách Mời) | Xong | Chụp so ảnh 221853 |
| Giai đoạn 3 | Tour bước 4 đặt tiêu đề "Chúc mừng!"; xác nhận 4 bước khớp ảnh | Xong | Chạy trình duyệt, đọc nội dung 4 bước |
| Ghi chú bảo mật | Đăng nhập, OTP, Google/Apple chỉ là mô phỏng trong localStorage (đã ghi chú trong `TopNav.tsx`); cờ đăng nhập không bảo vệ dữ liệu vì dữ liệu cũng nằm trong localStorage | Chấp nhận cho bản demo; cần backend thật khi dùng thật | — |

| Giai đoạn 4 | Thêm Tailwind 3 (chỉ lớp tiện ích, không preflight, chỉ quét `Preview.tsx`) vì mã xem trước thiệp dùng class Tailwind mà project chưa có, khiến trang Demo và xem trước vỡ layout; màn hình "Mở thiệp" Minimalism nền be như ảnh | Xong (thêm devDependencies: tailwindcss, postcss, autoprefixer) | Chụp so ảnh 232343 |
| Giai đoạn 4 | Nhãn công tắc "Hiện/Ẩn" thống nhất; Thư viện ảnh rỗng là một ô vuông giữa; nhãn "KIỂU HIỂN THỊ" viết hoa; popup 4 nút trên ảnh lấp đầy ô; modal chọn nhạc nằm trên dock mobile | Xong | Chụp so ảnh 210307, 221714, 214621; chạy tải ảnh, chuyển ảnh, xóa ảnh, tải ảnh đầu thiệp |
| Giai đoạn 4 | Đã chụp so, không phát hiện lệch đáng kể: Lễ, Lời cảm ơn, Sổ lưu bút, Dress Code, Hộp Quà Mừng, Lịch trình, Tiệc cưới, Thông tin cơ bản, Ảnh đầu thiệp, modal nhạc, đổi mẫu, chi tiết mẫu | Xong | Chụp |

| Giai đoạn 5 | Ảnh xem trước mặc định "Phong bì thiệp" dùng ảnh hoa thật (cắt từ ảnh chuẩn 220136, lưu `public/images/share-envelope-default.png`; độ phân giải thấp, nên thay bằng ảnh gốc nếu có) | Xong | Chụp so ảnh 220136 |
| Giai đoạn 5 | Mục RSVP có khung thông tin; nhãn "CÂU HỎI THÊM…" viết hoa; Thông tin gia đình nhãn nhỏ xám và vạch ngăn | Xong | Chụp so ảnh bổ sung |
| Giai đoạn 5 | Long Phụng V2: màn mở thiệp và phần đầu thiệp dựng lại từ HTML trang demo thật (`src/LongPhungV2.tsx`); tải 6 ảnh về `public/images/themes/longphung-v2-red/` (1,3 MB, bạn đã đồng ý); dữ liệu demo "Trung Hiếu & Minh Nguyệt", khách "Em Toàn" | Xong phần cover và hero. **Phần thân thiệp bên dưới vẫn là bố cục Song Phụng chung**, chưa có khung giấy bốn góc khuyết và mây như ảnh | Chụp so ảnh bổ sung |

**Còn lại, chưa làm hoặc chưa kiểm tra bằng ảnh chụp:** G11 logo gốc (hoa sen hiện là bản vẽ lại), G12 chế độ sáng/tối thật, G30 kiểu đăng nhập mật khẩu (chưa có ảnh nào chứng tỏ cần), G01/G02/G04 nội dung tab Khách Mời, bước OTP chưa có ảnh chuẩn. Chưa chụp so: Demo, Pricing, modal đổi mẫu/chọn nhạc/tour (chỉ xem tour bước 1), các mục Thư viện ảnh, Dress Code, RSVP, Ảnh xem trước chia sẻ, các phần Home ngoài đánh giá, hero và đổi mẫu, và mobile ngoài editor/Khách Mời.

**Giới hạn môi trường kiểm thử:** `assets.chungdoi.com` trả HTTP 403 khi tải từ môi trường này nên ảnh mẫu thiệp không hiện trong ảnh chụp (hiện chữ alt). Chưa biết trình duyệt của bạn có tải được không.

---

## 1. Hiện trạng project

- Vite 5 + React 18 + TypeScript (strict), không Tailwind, không thư viện UI. Phụ thuộc thật chỉ có `react`, `react-dom`, `qrcode-generator`.
- Không có backend (`../api`, `../documentation`, `../mobile` đều trống), không có test, không có script test.
- Router tự viết bằng History API (`src/router.tsx`, route ở `src/Root.tsx`). Xác thực giả: cờ `chungdoi.logged_in` trong localStorage.
- Lưu trữ: chỉ danh sách thiệp (`chungdoi.cards`) và danh sách khách (`chungdoi.guests.<cardId>`, do phiên này thêm). **Nội dung editor (`Inv` trong `data.ts`) không lưu theo thiệp** (G39).
- CSS: `styles.css` (6180 dòng, editor) và `pages.css` (≈2000 dòng, các trang), biến `--b1 --p --bc`. Nhiều quy tắc ghi chồng nhau, sau này phải dùng bộ chọn cụ thể hơn (ví dụ `.dash-page-v2 …`) để thắng.
- Cấu trúc: `Root.tsx` (route + footer) · `TopNav.tsx` (thanh trên, đăng nhập) · `App.tsx` + `Header.tsx` + `Sections.tsx` + `Preview.tsx` (editor) · các modal `TemplateModal`, `PublishCheckModal`, `ShareModal`, `MusicPicker`, `TutorialTour`, `HeroPhoto` · `pages/` (Home, Templates, Dashboard, Guests, Account, Pricing, Demo).

## 2. Kiến trúc đề xuất

Giữ nguyên kiến trúc hiện có, không thêm thư viện. Ba thay đổi hạ tầng nhỏ, tất cả tùy chọn và chờ bạn xác nhận:

1. **Lưu nội dung editor theo thiệp** (giải G39, G07): đọc/ghi `Inv` vào `chungdoi.inv.<cardId>` trong `App.tsx`/`store.ts`. Frontend-only, không nói là "đã đồng bộ máy chủ".
2. **Mẫu thiệp quyết định chữ mặc định** (G14): thêm trường `introDefault` vào mục mẫu trong `templates.ts`.
3. **Font**: thêm Montserrat vào `index.html` (G13) sau khi bạn xác nhận.

Không thêm backend, không thêm CSS framework, không đụng `.agents/` và `.claude/`.

## 3. Phân loại thành phần

| Hành động | Thành phần |
|---|---|
| Tái sử dụng nguyên trạng | `ui.tsx` (Section, Toggle, Field…), `MusicPicker`, `ShareModal`, `PublishCheckModal`, `TemplateModal`, `TutorialTour` |
| Chỉnh sửa | `HeroPhoto.tsx` (G15, chỉ style), `Sections.tsx` (G14, G21–G25), `Preview.tsx` (G38), `pages/Templates.tsx` (G31), `pages/Guests.tsx` (G03), `TopNav.tsx` (đăng nhập G30), `templates.ts` (G14), `store.ts`/`App.tsx` (G39) |
| Tạo mới | `docs/ui-clone/*` (đã tạo). Có thể thêm `src/Logo.svg` nếu bạn cung cấp logo gốc (G11) |

## 4. Kế hoạch theo tệp

| Tệp | Trách nhiệm hiện tại | Thay đổi | Lý do | Ảnh hưởng |
|---|---|---|---|---|
| `src/HeroPhoto.tsx` | mục Ảnh đầu thiệp, đã có 4 trạng thái | chỉ chỉnh style sau khi chụp và so với ảnh 211744/221114/221130/213740 | G15 | `styles.css` (`.hero-*`) |
| `src/Sections.tsx` (Basic) | "Lời mở đầu" với chữ cố định | lấy `introDefault` theo `d.templateId`; nhãn tắt "Mặc định" | G14 | `templates.ts` |
| `src/templates.ts` | danh sách mẫu | thêm `introDefault` cho các mẫu đã biết (3 mẫu), mẫu khác để mặc định "Save The Date" kèm ghi chú UNKNOWN | G14 | `Sections.tsx` |
| `src/Preview.tsx` | hiển thị thiệp | dùng `heroPhoto/heroZoom/X/Y`, `introText` hoặc `introDefault`, `photoCrops` | G38 | các mẫu trong preview |
| `src/store.ts`, `src/App.tsx` | cards ở localStorage; `Inv` ở state | thêm `loadInv(cardId)/saveInv`; ghi mỗi khi `set()`, có debounce nhỏ | G39, G07 | `Dashboard.tsx` (nhân bản sao chép luôn `Inv`) |
| `src/pages/Dashboard.tsx` | đã khớp ảnh 233315 | nhân bản kèm `Inv` | G07 | `store.ts` |
| `src/pages/Guests.tsx` | trang mới (phiên này) | ảnh nền mờ ở thanh thiệp; chỉnh form và hai tab sau khi có ảnh chuẩn | G01–G05 | — |
| `src/pages/Templates.tsx` | trang mẫu | xác minh chip "Bộ sưu tập" có lọc không; nếu không, làm lọc theo tag trong `templates.ts` | G31 | `templates.ts` (tags) |
| `src/TopNav.tsx` | logo, đăng nhập OTP | thêm kiểu đăng nhập mật khẩu **nếu bạn xác nhận cần** | G30 | `pages.css` (`.login-*`) |
| `index.html` | nạp font thiệp | thêm Montserrat | G13 | toàn site |
| `src/pages.css`, `src/styles.css` | style | chỉnh theo kết quả so ảnh từng trang | G05, G06, G16–G29, G35–G36 | — |
| `package.json` | script | thêm script kiểm thử (xem mục 7), `vitest` + `@testing-library/react` chỉ khi bạn đồng ý | G41 | devDependencies |

## 5. Thứ tự thực hiện (mỗi bước nhỏ, kiểm chứng được)

0. **Đường cơ sở:** commit các thay đổi chưa commit (Dashboard, Khách Mời, logo) hoặc tạo nhánh; xóa `.playwright-mcp/` hoặc thêm vào `.gitignore`. Chạy `npx tsc --noEmit`, `npm run build`.
1. **Công cụ so ảnh:** chạy `vite`, mở bằng trình duyệt tự động ở các khung 1900, 1280, 390px, lưu ảnh chụp vào `.playwright-mcp/`, đối chiếu từng ảnh theo bảng 1.x của `reference-analysis.md`. Kết quả cập nhật cột "Kiểm tra" trong `gap-analysis.md`.
2. **Token và font:** Montserrat, màu nền thẻ, bán kính (đã đo ở mục 3 của `reference-analysis.md`).
3. **Editor, các mục còn thiếu/lệch:** G14, rồi duyệt G16–G25 theo thứ tự ảnh.
4. **Preview:** G38.
5. **Lưu nội dung theo thiệp:** G39 rồi G07.
6. **Trang ngoài editor:** Templates (G31–G33), Home (G35), Account (G36), Demo (G34), Khách Mời (G01–G05) — mỗi trang một lượt chụp/so/sửa.
7. **Modal:** đăng nhập (G30), chia sẻ (G29), xuất bản (G28), tour (G27).
8. **Mobile:** G37, ở 390px theo ảnh 013826–014254.
9. **Truy cập và dọn:** G40.
10. **Kiểm thử, build, hồi quy** (mục 7).

Mỗi bước kết thúc bằng: typecheck sạch, một commit riêng, ảnh chụp trước/sau.

## 6. Rủi ro, giả định, điều chưa biết

- **Giả định:** thiết kế chuẩn chỉ gồm các ảnh trong `design/`. Bất cứ hành vi nào ngoài ảnh là INFERRED/UNKNOWN và cần bạn xác nhận.
- **Ảnh mobile** là ảnh marketing trong khung điện thoại, không phải chụp trình duyệt thật. Số đo mobile chỉ là ước lượng.
- **Thiếu tài sản gốc:** logo, font script, ảnh mẫu thiệp. Hiện lấy ảnh mẫu từ `assets.chungdoi.com` theo mã có sẵn; phụ thuộc mạng ngoài và có thể bị chặn.
- **Dữ liệu cá nhân** trong ảnh 233633 (tên, email thật) — không đưa vào mã.
- **Nhân bản/lưu editor:** nếu bạn không muốn lưu theo thiệp, G07 giữ nguyên hạn chế.
- **Hai kiểu đăng nhập** có thể là hai thời điểm khác nhau của site thật; làm cả hai có thể là thừa.
- **CSS chồng chéo** giữa `styles.css` và `pages.css` dễ gây lệch bất ngờ khi sửa; mỗi lần sửa phải chụp lại để kiểm.
- **Chưa có test:** hồi quy hiện tại dựa vào chạy tay và ảnh chụp.

## 7. Kế hoạch kiểm thử

Dùng công cụ sẵn có (`tsc`, `vite build`, trình duyệt tự động). Thêm test runner chỉ khi bạn đồng ý.

| Nhóm | Kiểm tra |
|---|---|
| Hiển thị ban đầu | Mỗi route (`/vi`, `/vi/mau-thiep`, `/vi/mau-thiep/:slug/demo`, `/dashboard`, `/guests`, `/account`, `/vi/bang-gia`, `/edit/:id`) không có lỗi console, không có request thất bại ngoài ảnh từ `assets.chungdoi.com` |
| Điều hướng | các liên kết thanh trên; `/guests` khi chưa đăng nhập; "Xuất bản ngay" → editor |
| Tương tác | từng dòng trong `interaction-inventory.md` có hiện trạng "Có" → chạy một lần |
| Form | thêm khách (rỗng, trùng tên, nhiều dòng), đổi tên thiệp (rỗng), hex màu sai, tải file không phải ảnh |
| Trạng thái | rỗng, đang tải, thành công của ảnh đầu thiệp và thư viện; danh sách khách rỗng |
| Responsive | 1900, 1280, 768, 390px |
| Bàn phím | Esc đóng modal; Tab đi hết modal; Enter gửi form |
| Hồi quy | tạo thiệp từ mẫu → sửa → xuất bản → chia sẻ → nhân bản → xóa |
| Build | `npx tsc --noEmit` và `npm run build` sạch |

## 8. Tiêu chí hoàn thành

1. Mỗi ảnh trong `design/` (trừ ảnh đen 005738 và ảnh 213500 lỗi CSS) có ảnh chụp tương ứng từ app, đã đặt cạnh nhau và ghi lại độ lệch còn lại.
2. Không có độ lệch P0/P1 còn mở trong `gap-analysis.md`.
3. Không có lỗi console trên các route ở mục 7.
4. `tsc --noEmit` và `npm run build` sạch.
5. Mọi dòng "Hiện trạng: Có" trong `interaction-inventory.md` đã được chạy ít nhất một lần.
6. Không nêu "pixel-perfect" nếu chưa so từng ảnh; báo rõ phần nào đã so, phần nào chưa.

## 9. Câu hỏi cần bạn trả lời trước khi làm

1. Có lưu nội dung editor theo từng thiệp trong localStorage không? (G39, G07)
2. Kiểu đăng nhập nào là chuẩn: OTP + Google/Apple (hiện có), mật khẩu + tab Đăng ký, hay cả hai? (G30)
3. Tab Tổng quan và Lời chúc của Khách Mời: bạn có ảnh chuẩn không, hay giữ bản tự dựng? (G01, G02, G04)
4. Có file logo gốc và font không? (G11, G13)
5. Có cần chế độ sáng/tối thật không? (G12)
6. Commit các thay đổi hiện có trước khi bắt đầu bước 1 chứ?
