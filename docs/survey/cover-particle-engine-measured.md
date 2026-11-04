# Đo thật engine hạt rơi trên bìa (04/11/2026, mẫu `chateau_green` / Lâu Đài - Xanh)

Đo trực tiếp DOM + CSS trên `https://chungdoi.com/vi/mau-thiep/lau-dai-xanh/demo`.

## Khớp hoàn toàn với local
- Tên animation: `ambient-fall` — **khớp y hệt tên trong `src/styles/styles.css`**.
- `@keyframes ambient-fall` — **khớp byte-for-byte** giữa local và trang thật (translateY -8vh→48vh(sway)→105vh, rotate 0→180→360deg, opacity 0→0.5→0.6→0.45→0, mốc 0/10/50/92/100%).
- Timing mỗi hạt: `animation-duration` ~18–24.5s, `animation-delay` âm (so le pha), `ease-in-out` — khớp khoảng giá trị local đang dùng (18–25s).
- Số hạt đo được: 14 hạt SVG đang hoạt động cùng lúc trên khung nhìn (local đang gọi `count={12}` ở `BaseCoverCard.tsx` — gần đúng, có thể do viewport/thời điểm đếm khác nhau).

## Khoảng cách còn lại — hạt đổi màu theo từng hạt, local chỉ có 1 màu
Đo 8 hạt mẫu `chateau_green`, màu từng hạt (rgb):
```
(232,240,220)  (58,90,44)  (255,255,255)  (125,165,92)
(232,240,220)  (170,201,138)  (255,255,255)  (255,255,255)
```
→ **ít nhất 5 màu khác nhau luân phiên** theo từng hạt (gồm trắng tinh), không phải 1 màu cố định.

`AmbientParticles.tsx` hiện chỉ nhận 1 prop `color` (chuỗi), áp **như nhau cho mọi hạt**. Trong khi `docs/survey/catalog-88.json` đã có sẵn mảng màu đo thật theo từng mẫu ở `cfg.theme.particleColors` (ví dụ 4–12 màu/mẫu, đúng số lượng ghi trong `catalog-88-summary.md` cột "Số màu hạt") — **dữ liệu đã có, chỉ chưa nối vào engine**.

## Việc nên làm tiếp (chưa làm, cần xác nhận trước khi sửa)
Sửa `AmbientParticles.tsx` nhận prop `colors: string[]` thay vì `color: string` đơn, gán tuần hoàn (`colors[i % colors.length]`) cho từng hạt ở tất cả dạng (`blossom`, `petal` mặc định, `xi`, `heart`, `stars`...); nối `particleColors` từ `catalog-88.json` vào `coverConfigs.ts` cho 88 mẫu. Việc này lớn hơn việc đổi `particleType` đã làm (đụng vào mọi dạng hạt + 88 mẫu), nên hỏi trước khi làm.
