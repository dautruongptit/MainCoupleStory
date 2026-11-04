// Section visibility + vị trí thẻ "Thư viện ảnh" trong editor, theo mẫu.
//
// 01/11/2026: đo thật TRỰC TIẾP cả 88 mẫu (áp từng mẫu vào nháp tài khoản thật, đọc danh sách thẻ
// editor) — đo 2 lần độc lập, 0/88 khác biệt giữa 2 lần → dữ liệu đáng tin, không phải suy luận từ
// matrix JS như lần trước (lần đó đã sai, xem lịch sử: "Ảnh đầu thiệp toàn bộ bị mất").
// Kết quả rơi đúng vào 5 tổ hợp (xem docs/survey/editor-form-groups-88.json):
//   [heroPhoto, coupleHero, guestbook, envelope, albumAfter]
//   (0,0,1,1,ceremony) 33 mẫu | (0,0,1,1,hero) 24 | (0,1,1,1,ceremony) 16 | (1,0,1,1,ceremony) 9 | (1,0,1,1,hero) 6
// guestbook và envelope LUÔN hiện ở cả 88 mẫu — không mẫu nào ẩn 2 thẻ này.
// Lưu ý: kết quả này MÂU THUẪN với lần người dùng tự kiểm tra tay trước đó cho song_hac_red (từng báo
// không có "Sổ lưu bút") — đo lại 3 lần (kể cả đổi mẫu khác rồi quay lại) đều cho guestbook=true, nên
// lấy số đo mới làm chuẩn theo AGENTS.md ("đo thật, không đoán"); có thể trang gốc đã thêm tính năng
// sau lần người dùng kiểm tra tay.
// Mẫu đã có capabilities.json riêng (minimalism_brown, riviera_blue, dragon_phoenix_v4_red, …) không
// đọc các Set này — capabilities.editor.sections/albumCardAfter của chúng đã ghi đè trước ở
// getEditorSections()/EditorPage.tsx (xem specs/index.ts).

/** Có thẻ "Ảnh đầu thiệp" (ảnh đơn). Đo thật 01/11/2026, 15/88 mẫu. */
const HAS_HERO_PHOTO = new Set([
  "minimalism_darkred", "minimalism_brown", "song_hy_green", "song_hy_v2_red", "song_hy_red",
  "dragon_phoenix_v3_red", "minimalism_darkbrown", "dragon_phoenix_v4_red", "lien_hoa_v2_green",
  "baroque_v2_darkgreen", "baroque_v2_darkred", "cherry_blossom_pink", "applique_lace_white",
  "minimalism_purple", "baroque_v2_darkblue",
]);

/** Có thẻ "Ảnh đôi" (couple hero) thay vì ảnh đơn. Đo thật 01/11/2026, 16/88 mẫu. */
const HAS_COUPLE_HERO = new Set([
  "boho_floral_green", "silk_ribbon_green", "minimalism_green", "silk_ribbon_darkred",
  "double_dragon_red", "double_dragon_green", "glass_garden_pink", "marble_yellow",
  "elegant_leaf_green", "silk_ribbon_pink", "boho_floral_pink", "hoa_tinh_red",
  "minimalism_darkblue", "boho_floral_brown", "double_dragon_blue", "floral_fiesta_yellow",
]);

/** Có thẻ "Lời mở đầu". Đo thật 03/11/2026 (bấm thật nút "Đổi mẫu thiệp" trong editor, không dùng
 * `?template=` trên URL — cách đó cho kết quả sai, xem docs/survey/editor-intro-line-88.md), 49/88 mẫu.
 * Không suy ra được từ HAS_HERO_PHOTO/HAS_COUPLE_HERO hay tên/màu mẫu — cờ độc lập. */
const HAS_INTRO_LINE = new Set([
  "minimalism_darkred", "minimalism_brown", "song_hy_green", "song_hy_red", "minimalism_green",
  "jasmine_white", "minimalism_darkbrown", "marble_yellow", "elegant_leaf_green", "chateau_green",
  "baroque_v2_darkgreen", "baroque_v2_darkred", "applique_lace_white", "silk_flora_brown", "hoa_tinh_red",
  "minimalism_darkblue", "royal_red", "baroque_gold", "chateau_blue", "co_ba_red", "lien_hoa_pink",
  "minimalism_purple", "porcelain_v2_green", "dried_flower_v2_green", "porcelain_v2_pink", "hoa_kho_v2_blue",
  "royal_v2_green", "royal_green", "baroque_blue", "porcelain_brown", "royal_blue", "riviera_blue",
  "florence_brown", "baroque_v2_darkblue", "sunflower_yellow", "santorini_blue", "porcelain_v2_red",
  "porcelain_blue", "folk_floral_blue", "porcelain_red", "hoa_dai_pink", "qasr_blue", "san_miguel_yellow",
  "royal_v2_purple", "hoa_kho_orange", "floral_fiesta_yellow", "nomad_brown", "mandap_darkred",
  "brocade_flower_red",
]);

/** Album ngay sau vị trí Hero (có ảnh thật hoặc ô trống khi heroPhoto/coupleHero đều tắt).
 * Đo thật 01/11/2026, 30/88 mẫu. Mặc định (không trong set) = ngay sau Lễ. */
const ALBUM_AFTER_HERO = new Set([
  "minimalism_darkred", "minimalism_brown", "jasmine_white", "dragon_phoenix_v3_red",
  "dragon_phoenix_red", "minimalism_darkbrown", "dragon_phoenix_v2_red", "double_phoenix_red",
  "chateau_green", "spring_garden_green", "chibi_red", "nhat_binh_red", "cherry_blossom_pink",
  "silk_flora_brown", "spring_garden_blue", "royal_red", "minimalism_red", "spring_garden_red",
  "dragon_phoenix_green", "chateau_blue", "double_phoenix_green", "dragon_phoenix_blue",
  "co_ba_red", "minimalism_purple", "dragon_phoenix_black", "royal_v2_green", "royal_green",
  "royal_blue", "royal_v2_purple", "brocade_flower_red",
]);

export interface EditorSections {
  heroPhoto: boolean;
  introLine: boolean;
  guestbook: boolean;
  envelope: boolean;
}

export function editorSections(templateId: string): EditorSections {
  return {
    heroPhoto: HAS_HERO_PHOTO.has(templateId) || HAS_COUPLE_HERO.has(templateId),
    introLine: HAS_INTRO_LINE.has(templateId),
    guestbook: true,
    envelope: true,
  };
}

/** true khi mẫu dùng ảnh đôi (couple hero) thay vì ảnh đầu thiệp đơn — cho capabilities.editor.cards.coupleHero. */
export function hasCoupleHero(templateId: string): boolean {
  return HAS_COUPLE_HERO.has(templateId);
}

export function albumCardAfter(templateId: string): "hero" | "ceremony" {
  return ALBUM_AFTER_HERO.has(templateId) ? "hero" : "ceremony";
}
