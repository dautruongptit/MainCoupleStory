# Kiểm tra hiệu ứng hạt rơi trên bìa (tuyết, 囍, hoa...) — toàn bộ 88 mẫu

Đối chiếu **loại hạt đo thật từ mã JS trang gốc** (`docs/survey/catalog-88-summary.md`, đo 01/11/2026 — 88 module cấu hình bìa, đáng tin vì lấy thẳng từ config nguồn, không suy luận) với **loại hạt đang khai báo trong local** (`coverConfigs.ts`) và **hình dạng SVG thật sự được vẽ** (`AmbientParticles.tsx` — hiệu ứng nền khi chưa bấm mở; `OpenTransition.tsx` dùng chung bộ type y hệt cho hiệu ứng khi bấm "Mở thiệp").

## Kết luận nhanh

**Không có "tuyết rơi" hay "pháo hoa" trong 7 loại hạt đo được từ trang gốc** (flowers/happiness/leaves/petals/hearts/sparkles/confetti) — khớp với ghi chú cũ trong `clone-plan-88.md`. Local cũng **chưa code loại tuyết/pháo hoa nào** (`AmbientParticles.tsx`/`OpenTransition.tsx` chỉ có 6 dạng: heart, stars, xi-gold, xi, blossom, confetti + 1 dạng mặc định). **Chưa xác nhận bằng mắt được** trên trang thật lúc này (trình duyệt không phản hồi khi kiểm tra) — cần mở lại trình duyệt để xem trực tiếp vài mẫu, đặc biệt mẫu nào có vẻ "lạnh/trắng" để chắc chắn không bỏ sót hiệu ứng tuyết.

**Phát hiện lớn nhất — không phải tuyết, mà là hoa:** cục bộ chỉ có 1 hình SVG hoa thật (`blossom`, 6 cánh + nhuỵ) và 1 hình **lá** dùng làm mặc định (`petal` — thật ra vẽ hình chiếc lá, không phải cánh hoa). Trang gốc có tới 47/88 mẫu dùng hạt "flowers" (hoa), nhưng local chỉ áp đúng hình hoa (`blossom`) cho **4** mẫu; **31 mẫu** đang rơi hình **lá** (sai hình dạng) và **12 mẫu chưa khai báo loại hạt nào cả** (cũng rơi về hình lá mặc định, sai).

## Bảng tổng hợp (loại hạt thật × hình đang vẽ ở local)

| Loại hạt thật (đo từ mã gốc) | Số mẫu | Đang đúng | Đang SAI | Thiếu hẳn |
|---|---|---|---|---|
| flowers (hoa) | 47 | 4 (`blossom`) | 31 (rơi hình **lá**) | 12 |
| happiness (chữ 囍 rơi) | 18 | 16 (`xi`) | 2 | 0 |
| leaves (lá) | 9 | 8 (hình lá mặc định — **đúng**) | 0 | 1 |
| petals (cánh hoa rời) | 5 | 0 | 5 (rơi hình lá, chưa có hình cánh hoa riêng) | 0 |
| hearts (trái tim) | 2 | 1 (`heart`) | 1 | 0 |
| sparkles (lấp lánh) | 5 | 0 | 5 (rơi hình lá, chưa dùng `stars` có sẵn) | 0 |
| confetti | 2 | 1 | 1 | 0 |

Đã kiểm riêng 3 mẫu đã "clone xong": `minimalism_brown` (leaves→lá, đúng), `riviera_blue` (flowers→blossom, đúng), `dragon_phoenix_v4_red` (happiness→xi, đúng). **Không hồi quy** — lỗi chỉ nằm ở các mẫu chưa làm kỹ.

## Chi tiết từng lỗi

### 1. 12 mẫu thiếu hẳn `particleType` trong `coverConfigs.ts` (đều là "flowers" trừ 1)
marble_yellow, glass_garden_light_green, santorini_blue, folk_floral_blue, qasr_blue, mahal_gold, floral_fiesta_yellow, nomad_brown, saraya_gold, qasr_gold, qasr_green, mandap_darkred — tất cả thật ra là **flowers** → nên thêm `particleType: "blossom"`.
Riêng `brocade_flower_red` thật là **leaves** → không bắt buộc thêm (mặc định `petal` đã đúng hình lá), nhưng nên khai báo tường minh cho rõ ràng.

### 2. 31 mẫu "flowers" đang rơi nhầm hình lá (nên đổi `petal` → `blossom`)
silk_ribbon_green, silk_ribbon_darkred, glass_garden_green, minimalism_darkbrown, glass_garden_pink, silk_ribbon_pink, baroque_v2_darkred, minimalism_darkblue, baroque_gold, chateau_green, applique_lace_white, chateau_blue, baroque_v2_darkgreen, crystal_floral_blue, dried_flower_v2_green, porcelain_v2_pink, hoa_kho_v2_blue, minimalism_purple, porcelain_v2_green, baroque_blue, porcelain_brown, crystal_floral_red, baroque_v2_darkblue, sunflower_yellow, crystal_floral_green, porcelain_v2_red, porcelain_blue, porcelain_red, hoa_dai_pink, glass_garden_blue, hoa_kho_orange

### 3. 5 mẫu "sparkles" (họ Hoàng Kim) đang rơi hình lá thay vì lấp lánh (nên đổi sang `stars`, đã có sẵn code)
royal_red, royal_v2_green, royal_green, royal_blue, royal_v2_purple

### 4. Lệch chữ 囍 / confetti — có vẻ bị đảo ngược giữa 2 mẫu
- `nhat_binh_red`: thật là **confetti**, local đang để `xi` (chữ 囍) — sai.
- `co_ba_red`: thật là **happiness** (chữ 囍), local đang để `confetti` — sai, có vẻ 2 mẫu này bị gán ngược cho nhau.
- `hoa_tinh_red`: thật là **happiness**, local đang rơi hình lá mặc định — thiếu, nên đổi sang `xi`.

### 5. 1 mẫu "hearts" sai
`minimalism_red`: thật là **hearts** (trái tim), local đang rơi hình lá — nên đổi sang `heart`.

### 6. 5 mẫu "petals" (cánh hoa rời) — local chưa có hình riêng
jasmine_white, cherry_blossom_pink, boho_floral_pink, silk_flora_brown, lien_hoa_pink — hiện dùng chung hình lá mặc định (`petal`). Trang gốc tách riêng "petals" (cánh hoa rời rạc) khỏi "flowers" (hoa còn nguyên bông) và "leaves" (lá) — cần đo hình SVG/ảnh thật của loại "petals" trên trang gốc để biết nên vẽ gì (không đoán).

## Việc còn thiếu để kết luận chắc chắn

- **Chưa xem trực tiếp trên trình duyệt** để xác nhận hình dạng/animation chính xác từng loại (code ở trên là suy luận có căn cứ từ so sánh config + SVG, độ tin cậy cao nhưng chưa phải "đo thật bằng mắt" theo đúng tiêu chuẩn `AGENTS.md`).
- Chưa xác nhận lại có "tuyết"/"pháo hoa" ở đâu đó trong chuỗi hiệu ứng mở thiệp (animation theo thời gian) — cần `P.openSeq`/xem trực tiếp vài mẫu, không suy luận được từ config tĩnh.
- Chưa đo hình dạng đúng cho loại "petals" (5 mẫu) — cần ảnh/SVG thật.
