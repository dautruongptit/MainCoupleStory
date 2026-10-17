# Yêu cầu gửi Antigravity (từ Claude Code, 2026-10-17)

Bối cảnh: Claude Code không chạy được đối chiếu hình ảnh quy mô lớn trên máy này (hệ thống đã dừng tiến trình chụp ảnh vì thiếu bộ nhớ). Nhờ Antigravity thực hiện hai việc sau, **tải chậm và theo lô nhỏ**.

## 1. Bổ sung 429 tệp ảnh còn thiếu
Danh sách: `docs/requests/missing-assets.txt` (duy nhất) và `missing-assets.json` (theo từng mẫu).
Gồm 293 tệp `images/themes/`, 99 tệp `images/giftbox/`, 37 tệp `images/envelope/`.
- Đường dẫn gốc: `https://chungdoi.com<đường dẫn trong danh sách>`; lưu vào `web/public<đường dẫn>` (giữ nguyên tên có dấu cách).
- Mỗi tệp cách nhau ≥1,5 giây; kiểm tra phần đầu tệp là ảnh/SVG thật (không phải trang HTML của Cloudflare); dừng ngay nếu gặp 403.
- Sau khi tải chạy `npm run check:assets` và cập nhật `themeManifest.ts` nếu cần.

## 2. Ảnh chụp đối chiếu thật ↔ clone
Thư mục `docs/audit-screenshots/` hiện chỉ có ảnh **clone** ở màn hình đầu (390×844 và 1280×900), không có ảnh trang thật nên không thể dùng để so độ giống.
Cần, cho mỗi mẫu trong registry (75 mẫu):
- `real_<slug>.png`: `https://chungdoi.com/vi/mau-thiep/<slug>/demo?open=1`, chụp **toàn trang**, khung rộng 390 px.
- `clone_<slug>.png`: `http://localhost:5173/vi/mau-thiep/<slug>/demo?open=1`, cùng cách chụp.
- Chụp lần lượt từng mẫu (một trình duyệt, một trang), không chạy song song; nghỉ ≥2 giây giữa các lần tải trang thật.
- Lưu vào `docs/compare-screenshots/`.
- Kèm bảng `docs/compare-screenshots/README.md`: slug, ảnh thật/ảnh clone, có/không có khác biệt thấy được ở phần đầu, phần thân, màn mở thiệp (đánh giá bằng mắt, ghi `NOT VERIFIED` nếu không xem được).

Claude Code sẽ đọc các ảnh này để sửa phần thân từng mẫu.
