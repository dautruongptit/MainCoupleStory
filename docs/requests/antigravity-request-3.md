# Yêu cầu số 3 gửi Antigravity: màn hình "Mở thiệp" riêng cho từng mẫu (2026-10-17)

## Câu hỏi cần trả lời trước
Khi bấm **Xem demo** trên chungdoi.com, mỗi mẫu có một màn **Mở thiệp** (phong bì/thẻ + nút "Mở thiệp") hay không, và 75 mẫu có khác nhau không?

**Số liệu sơ bộ của Claude Code (đọc HTML `demo` chưa mở của 75 mẫu đã lưu, chưa nhìn bằng mắt):**
- Cả 75 trang đều có màn Mở thiệp (khối `data-landing-screenshot-id="invite-envelope"`).
- 72 kiểu nền khác nhau, 69 bộ ảnh khác nhau (6 mẫu dùng chung bộ ảnh với mẫu cùng dòng).
- 28 "khung cấu trúc" khác nhau: ví dụ một khung dùng chung cho 21 mẫu (Bạch Sứ V2, Baroque V2…) chỉ khác ảnh/màu, trong khi nhiều mẫu khác có khung riêng.
- Dữ liệu theo từng mẫu: `docs/requests/cover-signatures.json` (slug, chữ ký cấu trúc, ảnh dùng, kiểu nền).
Kết quả này **chưa được xác minh bằng mắt**; cần Antigravity kiểm tra thực tế.

## Việc 1: xác minh bằng mắt trên trang thật
Với mỗi mẫu trong registry, mở `https://chungdoi.com/vi/mau-thiep/<slug>/demo` (KHÔNG có `?open=1`) ở khung 390×844 và 1280×800, chụp màn Mở thiệp ở trạng thái ban đầu (đợi 3 giây cho hiệu ứng) → `docs/cover-screenshots/real_<slug>_m.png` và `_d.png`.
Chụp tương tự bản clone (`http://localhost:5173/vi/mau-thiep/<slug>/demo`) → `clone_<slug>_*.png`.
Lập bảng `docs/cover-screenshots/README.md`: slug | giống/khác nhau giữa các mẫu (nhóm các mẫu có màn mở thiệp giống nhau) | clone hiện tại giống thật ở mức nào (nhận xét cụ thể, không dùng một câu cho mọi hàng).

## Việc 2: tải hết tài nguyên của màn Mở thiệp
Với mỗi mẫu: mọi ảnh, SVG, ảnh nền CSS, phông chữ mà màn Mở thiệp dùng (kể cả hiệu ứng rơi/bay như cánh hoa, chữ Hỷ, trái tim; ảnh phong bì ở `images/envelope/`; con dấu). Đối chiếu với `web/public`, thiếu thì tải đúng đường dẫn và tên như trên chungdoi.com.
Dùng cùng quy tắc an toàn như yêu cầu số 2: tuần tự, nghỉ ≥ 2 giây giữa mẫu, ≥ 1,5 giây giữa tệp, dừng khi Cloudflare chặn 3 lần, không xoá/đổi tên tệp có sẵn.

## Việc 3: dựng màn Mở thiệp riêng cho từng mẫu trong cấu trúc dự án
Cấu trúc hiện tại: `web/src/features/invitation/components/` (Preview.tsx, LongPhungV2.tsx, MinimalismDarkRed.tsx, `generated/headers.tsx`).
- Tạo thư mục `web/src/features/invitation/components/covers/`; mỗi mẫu một component hoặc một cấu hình mà nhiều mẫu cùng khung dùng chung **chỉ khi** chúng giống nhau thật sự (cùng cấu trúc, khác ảnh/màu; ghi rõ trong README nhóm nào dùng chung vì sao).
- Tạo registry `covers/index.ts`: `templateId → Cover component`. Không dùng điều kiện `if (templateId.includes(...))` rải rác trong Preview.
- Màn Mở thiệp nhận dữ liệu từ cùng đối tượng `Inv` của thiệp (tên chú rể, cô dâu, ngày, tên khách `envelopeGuest`, lời mời `envelopeInviteMessage`), để việc "Đổi mẫu thiệp" giữ nguyên dữ liệu.
- Màn Mở thiệp chỉ xuất hiện ở trang demo/trang thiệp đã xuất bản; **không** chặn Editor và tab Xem trước (đã đúng hiện nay, giữ nguyên).
- Nút điều khiển của trang demo (Kho mẫu, Tạo thiệp) không được che hoặc thay đổi bố cục màn Mở thiệp.
- Dựng đúng theo HTML/CSS/ảnh thật (vị trí, kích thước, hiệu ứng, font, màu); không dùng một cover chung rồi đổi màu cho mẫu có khung khác.

## Việc 4: kiểm tra
- Chụp lại clone sau khi dựng, đặt cạnh thật cho từng mẫu: `docs/cover-screenshots/compare_<slug>.png`; cập nhật README bằng nhận xét thật cho từng mẫu (`MATCH` / `PARTIAL` / `MISMATCH` kèm chỗ khác cụ thể; `NOT VERIFIED` nếu không chụp được).
- `npm run check:assets`, `npx tsc --noEmit`, `npm run build` phải pass.
- Báo cáo cuối: số mẫu MATCH/PARTIAL/MISMATCH/NOT VERIFIED, số tệp mới tải, danh sách không lấy được kèm lý do. Không ghi "hoàn tất" nếu còn mẫu chưa làm; không dùng cùng một câu đánh giá cho nhiều mẫu.
- Commit riêng theo từng việc, tiền tố `covers:`.

## Phạm vi
Chỉ đụng: `web/public`, `web/docs/cover-screenshots`, `web/src/features/invitation/components/covers/` và phần nối registry vào `Preview.tsx` (chỉ thay đoạn chọn màn Mở thiệp). Không sửa phần thân thiệp hay Editor.
