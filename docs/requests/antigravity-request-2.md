# Yêu cầu số 2 gửi Antigravity (từ Claude Code, 2026-10-17)

Mục tiêu: xác minh và bổ sung **mọi tài nguyên** (ảnh, ảnh nền CSS, SVG, phông chữ) mà trang thật dùng cho **75 mẫu**, kể cả loại chỉ tải khi tương tác. Claude Code chỉ đối chiếu được ảnh nằm sẵn trong HTML tải ban đầu (752/753 tệp đã có).

## Quy tắc chung (bắt buộc)
- Một trình duyệt, một trang, tuần tự. Nghỉ ≥ 2 giây giữa hai mẫu; ≥ 1,5 giây giữa hai lần tải tệp.
- Nếu gặp trang "Attention Required! | Cloudflare" hoặc HTTP 403 liên tiếp 3 lần: dừng toàn bộ, ghi lại mẫu và tệp đang xử lý, báo lại. Không tìm cách vượt chặn.
- Không xoá, không đổi tên tệp có sẵn. Tên tệp và thư mục giữ **đúng như trên chungdoi.com** (kể cả tên có dấu cách). Đích lưu: `web/public<đường dẫn gốc>`; ví dụ `/images/themes/x/a b.webp` → `web/public/images/themes/x/a b.webp`.
- Chỉ ghi vào `web/public`, `web/docs/asset-audit/`, `web/src/features/templates/data/themeManifest.ts` (nếu cần). Không sửa file khác. Commit riêng, tiền tố `assets:`.

## Việc 1: tệp còn thiếu đã biết
`/images/giftbox/mini/sunflower_yellow.webp` (thuộc `minimalism-nau`, `thanh-diep-xanh`, `co-ba-do`). Claude Code thử một lần nhận 403.
- Thử lại một lần, tải chậm. Nếu thành công thì lưu; nếu vẫn 403 thì ghi vào báo cáo "KHÔNG LẤY ĐƯỢC" kèm mã lỗi.

## Việc 2: ghi lại tài nguyên tải khi tương tác (cả 75 mẫu)
Với mỗi mẫu trong registry (`web/src/features/templates/data/templates.ts`), mở
`https://chungdoi.com/vi/mau-thiep/<slug>/demo` trong trình duyệt thật (viewport 390×844), bật ghi mạng, rồi lần lượt:
1. **Màn mở thiệp** (khi chưa mở): ghi mọi tài nguyên đã tải.
2. Bấm **"Mở thiệp"** (hoặc vào `?open=1`): chờ 3 giây.
3. **Cuộn từ đầu đến cuối trang**, dừng 0,5 giây mỗi 600 px (để ảnh tải lười kịp tải).
4. Với từng khối có tương tác, thực hiện **một** lần rồi đóng: mở ảnh trong **Album** (lightbox/băng chuyền, lật qua ít nhất 3 ảnh); bấm **Hộp Quà Mừng** (mở hộp, đổi tab Chú rể/Cô dâu, mở QR); bấm **Xác nhận tham dự** (mở form); bấm **Thêm vào lịch**; bấm nút **nhạc**; mở **Bản đồ** nếu có.
5. Ghi tất cả yêu cầu mạng thuộc `chungdoi.com` và `assets.chungdoi.com` có loại: ảnh, SVG, phông chữ (`woff/woff2/ttf`), CSS. Ghi cả ảnh nền do CSS gọi (xem `getComputedStyle(...).backgroundImage` của mọi phần tử).

### Định dạng kết quả
`web/docs/asset-audit/<slug>.json`:
```json
{
  "slug": "bach-su-do",
  "templateId": "porcelain_red",
  "stages": { "envelope": ["/images/..."], "opened": [], "scrolled": [], "album": [], "giftbox": [], "rsvp": [], "calendar": [] },
  "cssBackgrounds": ["/images/..."],
  "fonts": ["https://.../x.woff2"],
  "missingInPublic": ["/images/..."]
}
```
và gộp vào `web/docs/asset-audit/SUMMARY.md` gồm bảng: slug | số tài nguyên | số thiếu trong `public/` | bước nào làm phát sinh tài nguyên mới (chưa có trong HTML ban đầu).

## Việc 3: tải phần thiếu
Từ các tệp `missingInPublic`, tải về đúng đường dẫn, theo quy tắc chung. Tệp phông chữ: chỉ tải nếu chưa có trong `web/public/fonts/` và chưa có khai báo `@font-face` tương ứng trong `web/src/styles/fonts.css`; nếu thiếu thì thêm khai báo.

## Việc 4: kiểm tra và báo cáo
- Chạy `npm run check:assets` và `npx tsc --noEmit`.
- Báo cáo cuối: số tệp tham chiếu duy nhất trước/sau, số tệp mới tải, danh sách **KHÔNG LẤY ĐƯỢC** (kèm lý do), số mẫu `NOT VERIFIED` (kèm lý do, ví dụ trang bị chặn), và những tương tác không thực hiện được.
- Không ghi "hoàn tất" nếu có mẫu chưa chạy; liệt kê rõ mẫu nào đã xong, mẫu nào chưa.

## Tiêu chí hoàn thành
1. Có `SUMMARY.md` và đủ 75 tệp JSON (hoặc ghi rõ mẫu nào thiếu và vì sao).
2. Với mọi mẫu đã chạy: `missingInPublic` rỗng, hoặc nằm trong danh sách KHÔNG LẤY ĐƯỢC.
3. Mọi tệp mới đã commit riêng; `check:assets` và `tsc` đều pass.
