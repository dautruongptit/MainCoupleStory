# Thẻ "Lời mở đầu" — có/không theo từng mẫu, đo trên trang thật (03/11/2026)

Đo bằng đúng cách bấm thật đã xác nhận đáng tin ở `editor-form-groups-88.md` (giả lập click vào nút "Đổi mẫu thiệp" → thẻ ảnh mẫu, KHÔNG dùng `?template=` trên URL). Kiểm toàn bộ 88/88 mẫu: có/không dòng chữ "Lời mở đầu" ở đầu thẻ "Thông tin cơ bản".

## Kết quả: không có quy tắc/công thức chung — là cờ đo riêng từng mẫu

Đã thử đối chiếu với cách chia họ theo "Ảnh đầu thiệp/Ảnh đôi/Không có" (`editor-form-groups-88.md`) — **không khớp**, không suy ra được từ nhóm đó lẫn từ tên/màu mẫu:

| Nhóm ảnh đầu thiệp | Có "Lời mở đầu" | Không có |
|---|---|---|
| DON (15) | 10 | 5 |
| DOI (16) | 6 | 10 |
| KHONG_CO (57) | 33 | 24 |

→ Hai biến này độc lập nhau. Phải tra đúng theo `templateId`, không đoán theo nhóm/tên/màu.

## Danh sách

### Có "Lời mở đầu" (49 mẫu)
minimalism_darkred, minimalism_brown, song_hy_green, song_hy_red, minimalism_green, jasmine_white, minimalism_darkbrown, marble_yellow, elegant_leaf_green, chateau_green, baroque_v2_darkgreen, baroque_v2_darkred, applique_lace_white, silk_flora_brown, hoa_tinh_red, minimalism_darkblue, royal_red, baroque_gold, chateau_blue, co_ba_red, lien_hoa_pink, minimalism_purple, porcelain_v2_green, dried_flower_v2_green, porcelain_v2_pink, hoa_kho_v2_blue, royal_v2_green, royal_green, baroque_blue, porcelain_brown, royal_blue, riviera_blue, florence_brown, baroque_v2_darkblue, sunflower_yellow, santorini_blue, porcelain_v2_red, porcelain_blue, folk_floral_blue, porcelain_red, hoa_dai_pink, qasr_blue, san_miguel_yellow, royal_v2_purple, hoa_kho_orange, floral_fiesta_yellow, nomad_brown, mandap_darkred, brocade_flower_red

### Không có "Lời mở đầu" (39 mẫu)
boho_floral_green, song_hy_v2_red, silk_ribbon_green, dragon_phoenix_v3_red, dragon_phoenix_red, silk_ribbon_darkred, dragon_phoenix_v2_red, double_dragon_red, glass_garden_green, double_phoenix_red, double_dragon_green, glass_garden_pink, silk_ribbon_pink, dragon_phoenix_v4_red, lien_hoa_v2_green, spring_garden_green, chibi_red, song_hac_red, nhat_binh_red, cherry_blossom_pink, boho_floral_pink, spring_garden_blue, minimalism_red, spring_garden_red, dragon_phoenix_green, double_phoenix_green, boho_floral_brown, double_dragon_blue, glass_garden_light_green, crystal_floral_blue, dragon_phoenix_blue, dragon_phoenix_black, crystal_floral_red, crystal_floral_green, glass_garden_blue, mahal_gold, saraya_gold, qasr_gold, qasr_green

## Ghi chú kỹ thuật

- `lien_hoa_v2_green` và `dragon_phoenix_v4_red`: **không có** "Lời mở đầu" trên trang thật — khớp với dump editor sớm nhất đo được (01/11) của 2 mẫu này, nên đáng tin.
- Cờ hiện có `capabilities.editor.cards.introLine` trong các `capabilities.json` sinh hàng loạt (đợt "upgrade 88 mẫu") **chưa đối chiếu với bảng này** — rất có thể sai tương tự `coupleHero` (xem `clone-rules.md` E#15/A4), cần sửa theo bảng đo thật ở trên, không tin giá trị có sẵn.
- Local hiện `BasicV2.tsx` **luôn hiện "Lời mở đầu" cho mọi mẫu** (không đọc capability nào) → 39 mẫu đang sai, cần ẩn thẻ này theo danh sách "Không có" ở trên.
