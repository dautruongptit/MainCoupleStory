# Họ chung của màn chỉnh sửa (editor) — gộp từ 2 lần đo thật

Gộp 2 cờ đã đo thật, độc lập nhau trên cả 88 mẫu (xem `editor-form-groups-88.md` và `editor-intro-line-88.md`):
- **Ảnh đầu thiệp**: DON (1 ảnh) / DOI (2 ảnh riêng) / KHONGCO (không có thẻ)
- **Lời mở đầu**: INTRO (có) / NOINTRO (không có)

Gộp lại ra đúng **6 họ** (đủ cả 6 tổ hợp 3×2, không họ nào trống):

| Họ | Số mẫu |
|---|---|
| KHONGCO + INTRO | 33 |
| KHONGCO + NOINTRO | 24 |
| DON + INTRO | 10 |
| DOI + NOINTRO | 10 |
| DOI + INTRO | 6 |
| DON + NOINTRO | 5 |

**Tổng 88.** Đây là toàn bộ sự khác biệt giữa các mẫu về mặt **form** (16 thẻ còn lại giống hệt nhau mọi mẫu). Ngoài 2 cờ này chưa phát hiện thêm khác biệt nào khác trong form.

## Danh sách 6 họ

### DON + INTRO (10)
minimalism_darkred, minimalism_brown, song_hy_green, song_hy_red, minimalism_darkbrown, baroque_v2_darkgreen, baroque_v2_darkred, applique_lace_white, minimalism_purple, baroque_v2_darkblue

### DON + NOINTRO (5)
song_hy_v2_red, dragon_phoenix_v3_red, dragon_phoenix_v4_red, lien_hoa_v2_green, cherry_blossom_pink

### DOI + INTRO (6)
minimalism_green, marble_yellow, elegant_leaf_green, hoa_tinh_red, minimalism_darkblue, floral_fiesta_yellow

### DOI + NOINTRO (10)
boho_floral_green, silk_ribbon_green, silk_ribbon_darkred, double_dragon_red, double_dragon_green, glass_garden_pink, silk_ribbon_pink, boho_floral_pink, boho_floral_brown, double_dragon_blue

### KHONGCO + INTRO (33)
jasmine_white, chateau_green, silk_flora_brown, royal_red, baroque_gold, chateau_blue, co_ba_red, lien_hoa_pink, porcelain_v2_green, dried_flower_v2_green, porcelain_v2_pink, hoa_kho_v2_blue, royal_v2_green, royal_green, baroque_blue, porcelain_brown, royal_blue, riviera_blue, florence_brown, sunflower_yellow, santorini_blue, porcelain_v2_red, porcelain_blue, folk_floral_blue, porcelain_red, hoa_dai_pink, qasr_blue, san_miguel_yellow, royal_v2_purple, hoa_kho_orange, nomad_brown, mandap_darkred, brocade_flower_red

### KHONGCO + NOINTRO (24)
dragon_phoenix_red, dragon_phoenix_v2_red, glass_garden_green, double_phoenix_red, spring_garden_green, chibi_red, song_hac_red, nhat_binh_red, spring_garden_blue, minimalism_red, spring_garden_red, dragon_phoenix_green, double_phoenix_green, glass_garden_light_green, crystal_floral_blue, dragon_phoenix_blue, dragon_phoenix_black, crystal_floral_red, crystal_floral_green, glass_garden_blue, mahal_gold, saraya_gold, qasr_gold, qasr_green

## Ghi chú

Không suy ra được 6 họ này từ tên/màu mẫu hay từ họ bố cục code (`families-88.md` bản trước, nay đã mất) — ví dụ 3 mẫu Minimalism nằm ở 3 họ form khác nhau (darkred→DON+INTRO, green→DOI+INTRO, red→KHONGCO+NOINTRO). Phải tra theo đúng `templateId` dùng 2 bảng gốc.

Local hiện mới sửa đúng "Ảnh đầu thiệp/Ảnh đôi/Không có" (`getCoupleHero`) và "Lời mở đầu" (`getEditorSections().introLine`) — khớp 2 cờ này rồi. Chưa đo thêm cờ form nào khác ngoài 2 cái trên.
