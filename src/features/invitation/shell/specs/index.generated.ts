// TỆP SINH — không sửa tay. Chạy: node scripts/clone/gen_spec_index.mjs
// Nguồn: mỗi thư mục specs/<id>/{theme,capabilities,cover,demo}.json (demo tải theo nhu cầu)
import s_applique_lace_white_theme from "./applique_lace_white/theme.json";
import s_applique_lace_white_caps from "./applique_lace_white/capabilities.json";
import s_applique_lace_white_cover from "./applique_lace_white/cover.json";
import s_baroque_blue_theme from "./baroque_blue/theme.json";
import s_baroque_blue_caps from "./baroque_blue/capabilities.json";
import s_baroque_blue_cover from "./baroque_blue/cover.json";
import s_baroque_gold_theme from "./baroque_gold/theme.json";
import s_baroque_gold_caps from "./baroque_gold/capabilities.json";
import s_baroque_gold_cover from "./baroque_gold/cover.json";
import s_baroque_v2_darkblue_theme from "./baroque_v2_darkblue/theme.json";
import s_baroque_v2_darkblue_caps from "./baroque_v2_darkblue/capabilities.json";
import s_baroque_v2_darkblue_cover from "./baroque_v2_darkblue/cover.json";
import s_baroque_v2_darkgreen_theme from "./baroque_v2_darkgreen/theme.json";
import s_baroque_v2_darkgreen_caps from "./baroque_v2_darkgreen/capabilities.json";
import s_baroque_v2_darkgreen_cover from "./baroque_v2_darkgreen/cover.json";
import s_baroque_v2_darkred_theme from "./baroque_v2_darkred/theme.json";
import s_baroque_v2_darkred_caps from "./baroque_v2_darkred/capabilities.json";
import s_baroque_v2_darkred_cover from "./baroque_v2_darkred/cover.json";
import s_boho_floral_brown_theme from "./boho_floral_brown/theme.json";
import s_boho_floral_brown_caps from "./boho_floral_brown/capabilities.json";
import s_boho_floral_brown_cover from "./boho_floral_brown/cover.json";
import s_boho_floral_green_theme from "./boho_floral_green/theme.json";
import s_boho_floral_green_caps from "./boho_floral_green/capabilities.json";
import s_boho_floral_green_cover from "./boho_floral_green/cover.json";
import s_boho_floral_pink_theme from "./boho_floral_pink/theme.json";
import s_boho_floral_pink_caps from "./boho_floral_pink/capabilities.json";
import s_boho_floral_pink_cover from "./boho_floral_pink/cover.json";
import s_brocade_flower_red_theme from "./brocade_flower_red/theme.json";
import s_brocade_flower_red_caps from "./brocade_flower_red/capabilities.json";
import s_calla_lily_white_theme from "./calla_lily_white/theme.json";
import s_calla_lily_white_caps from "./calla_lily_white/capabilities.json";
import s_calla_lily_white_cover from "./calla_lily_white/cover.json";
import s_chateau_blue_theme from "./chateau_blue/theme.json";
import s_chateau_blue_caps from "./chateau_blue/capabilities.json";
import s_chateau_blue_cover from "./chateau_blue/cover.json";
import s_chateau_green_theme from "./chateau_green/theme.json";
import s_chateau_green_caps from "./chateau_green/capabilities.json";
import s_chateau_green_cover from "./chateau_green/cover.json";
import s_cherry_blossom_pink_theme from "./cherry_blossom_pink/theme.json";
import s_cherry_blossom_pink_caps from "./cherry_blossom_pink/capabilities.json";
import s_cherry_blossom_pink_cover from "./cherry_blossom_pink/cover.json";
import s_chibi_red_theme from "./chibi_red/theme.json";
import s_chibi_red_caps from "./chibi_red/capabilities.json";
import s_chibi_red_cover from "./chibi_red/cover.json";
import s_co_ba_red_theme from "./co_ba_red/theme.json";
import s_co_ba_red_caps from "./co_ba_red/capabilities.json";
import s_co_ba_red_cover from "./co_ba_red/cover.json";
import s_crystal_floral_blue_theme from "./crystal_floral_blue/theme.json";
import s_crystal_floral_blue_caps from "./crystal_floral_blue/capabilities.json";
import s_crystal_floral_blue_cover from "./crystal_floral_blue/cover.json";
import s_crystal_floral_green_theme from "./crystal_floral_green/theme.json";
import s_crystal_floral_green_caps from "./crystal_floral_green/capabilities.json";
import s_crystal_floral_green_cover from "./crystal_floral_green/cover.json";
import s_crystal_floral_red_theme from "./crystal_floral_red/theme.json";
import s_crystal_floral_red_caps from "./crystal_floral_red/capabilities.json";
import s_crystal_floral_red_cover from "./crystal_floral_red/cover.json";
import s_double_dragon_blue_theme from "./double_dragon_blue/theme.json";
import s_double_dragon_blue_caps from "./double_dragon_blue/capabilities.json";
import s_double_dragon_blue_cover from "./double_dragon_blue/cover.json";
import s_double_dragon_green_theme from "./double_dragon_green/theme.json";
import s_double_dragon_green_caps from "./double_dragon_green/capabilities.json";
import s_double_dragon_green_cover from "./double_dragon_green/cover.json";
import s_double_dragon_red_theme from "./double_dragon_red/theme.json";
import s_double_dragon_red_caps from "./double_dragon_red/capabilities.json";
import s_double_dragon_red_cover from "./double_dragon_red/cover.json";
import s_double_phoenix_green_theme from "./double_phoenix_green/theme.json";
import s_double_phoenix_green_caps from "./double_phoenix_green/capabilities.json";
import s_double_phoenix_green_cover from "./double_phoenix_green/cover.json";
import s_double_phoenix_red_theme from "./double_phoenix_red/theme.json";
import s_double_phoenix_red_caps from "./double_phoenix_red/capabilities.json";
import s_double_phoenix_red_cover from "./double_phoenix_red/cover.json";
import s_dragon_phoenix_black_theme from "./dragon_phoenix_black/theme.json";
import s_dragon_phoenix_black_caps from "./dragon_phoenix_black/capabilities.json";
import s_dragon_phoenix_black_cover from "./dragon_phoenix_black/cover.json";
import s_dragon_phoenix_blue_theme from "./dragon_phoenix_blue/theme.json";
import s_dragon_phoenix_blue_caps from "./dragon_phoenix_blue/capabilities.json";
import s_dragon_phoenix_blue_cover from "./dragon_phoenix_blue/cover.json";
import s_dragon_phoenix_green_theme from "./dragon_phoenix_green/theme.json";
import s_dragon_phoenix_green_caps from "./dragon_phoenix_green/capabilities.json";
import s_dragon_phoenix_green_cover from "./dragon_phoenix_green/cover.json";
import s_dragon_phoenix_red_theme from "./dragon_phoenix_red/theme.json";
import s_dragon_phoenix_red_caps from "./dragon_phoenix_red/capabilities.json";
import s_dragon_phoenix_red_cover from "./dragon_phoenix_red/cover.json";
import s_dragon_phoenix_v2_red_theme from "./dragon_phoenix_v2_red/theme.json";
import s_dragon_phoenix_v2_red_caps from "./dragon_phoenix_v2_red/capabilities.json";
import s_dragon_phoenix_v2_red_cover from "./dragon_phoenix_v2_red/cover.json";
import s_dragon_phoenix_v3_red_theme from "./dragon_phoenix_v3_red/theme.json";
import s_dragon_phoenix_v3_red_caps from "./dragon_phoenix_v3_red/capabilities.json";
import s_dragon_phoenix_v3_red_cover from "./dragon_phoenix_v3_red/cover.json";
import s_dragon_phoenix_v4_red_theme from "./dragon_phoenix_v4_red/theme.json";
import s_dragon_phoenix_v4_red_caps from "./dragon_phoenix_v4_red/capabilities.json";
import s_dragon_phoenix_v4_red_cover from "./dragon_phoenix_v4_red/cover.json";
import s_dried_flower_v2_green_theme from "./dried_flower_v2_green/theme.json";
import s_dried_flower_v2_green_caps from "./dried_flower_v2_green/capabilities.json";
import s_dried_flower_v2_green_cover from "./dried_flower_v2_green/cover.json";
import s_elegant_leaf_green_theme from "./elegant_leaf_green/theme.json";
import s_elegant_leaf_green_caps from "./elegant_leaf_green/capabilities.json";
import s_elegant_leaf_green_cover from "./elegant_leaf_green/cover.json";
import s_floral_fiesta_yellow_theme from "./floral_fiesta_yellow/theme.json";
import s_floral_fiesta_yellow_caps from "./floral_fiesta_yellow/capabilities.json";
import s_florence_brown_theme from "./florence_brown/theme.json";
import s_florence_brown_caps from "./florence_brown/capabilities.json";
import s_florence_brown_cover from "./florence_brown/cover.json";
import s_folk_floral_blue_theme from "./folk_floral_blue/theme.json";
import s_folk_floral_blue_caps from "./folk_floral_blue/capabilities.json";
import s_glass_garden_blue_theme from "./glass_garden_blue/theme.json";
import s_glass_garden_blue_caps from "./glass_garden_blue/capabilities.json";
import s_glass_garden_blue_cover from "./glass_garden_blue/cover.json";
import s_glass_garden_green_theme from "./glass_garden_green/theme.json";
import s_glass_garden_green_caps from "./glass_garden_green/capabilities.json";
import s_glass_garden_green_cover from "./glass_garden_green/cover.json";
import s_glass_garden_light_green_theme from "./glass_garden_light_green/theme.json";
import s_glass_garden_light_green_caps from "./glass_garden_light_green/capabilities.json";
import s_glass_garden_pink_theme from "./glass_garden_pink/theme.json";
import s_glass_garden_pink_caps from "./glass_garden_pink/capabilities.json";
import s_glass_garden_pink_cover from "./glass_garden_pink/cover.json";
import s_hoa_dai_pink_theme from "./hoa_dai_pink/theme.json";
import s_hoa_dai_pink_caps from "./hoa_dai_pink/capabilities.json";
import s_hoa_dai_pink_cover from "./hoa_dai_pink/cover.json";
import s_hoa_kho_orange_theme from "./hoa_kho_orange/theme.json";
import s_hoa_kho_orange_caps from "./hoa_kho_orange/capabilities.json";
import s_hoa_kho_orange_cover from "./hoa_kho_orange/cover.json";
import s_hoa_kho_v2_blue_theme from "./hoa_kho_v2_blue/theme.json";
import s_hoa_kho_v2_blue_caps from "./hoa_kho_v2_blue/capabilities.json";
import s_hoa_kho_v2_blue_cover from "./hoa_kho_v2_blue/cover.json";
import s_hoa_tinh_red_theme from "./hoa_tinh_red/theme.json";
import s_hoa_tinh_red_caps from "./hoa_tinh_red/capabilities.json";
import s_hoa_tinh_red_cover from "./hoa_tinh_red/cover.json";
import s_jasmine_green_theme from "./jasmine_green/theme.json";
import s_jasmine_green_caps from "./jasmine_green/capabilities.json";
import s_jasmine_green_cover from "./jasmine_green/cover.json";
import s_jasmine_white_theme from "./jasmine_white/theme.json";
import s_jasmine_white_caps from "./jasmine_white/capabilities.json";
import s_jasmine_white_cover from "./jasmine_white/cover.json";
import s_lien_hoa_pink_theme from "./lien_hoa_pink/theme.json";
import s_lien_hoa_pink_caps from "./lien_hoa_pink/capabilities.json";
import s_lien_hoa_pink_cover from "./lien_hoa_pink/cover.json";
import s_lien_hoa_v2_green_theme from "./lien_hoa_v2_green/theme.json";
import s_lien_hoa_v2_green_caps from "./lien_hoa_v2_green/capabilities.json";
import s_lien_hoa_v2_green_cover from "./lien_hoa_v2_green/cover.json";
import s_mahal_gold_theme from "./mahal_gold/theme.json";
import s_mahal_gold_caps from "./mahal_gold/capabilities.json";
import s_mahal_gold_cover from "./mahal_gold/cover.json";
import s_mahal_pink_theme from "./mahal_pink/theme.json";
import s_mahal_pink_caps from "./mahal_pink/capabilities.json";
import s_mahal_pink_cover from "./mahal_pink/cover.json";
import s_mandap_darkred_theme from "./mandap_darkred/theme.json";
import s_mandap_darkred_caps from "./mandap_darkred/capabilities.json";
import s_mandap_darkred_cover from "./mandap_darkred/cover.json";
import s_mandap_yellow_theme from "./mandap_yellow/theme.json";
import s_mandap_yellow_caps from "./mandap_yellow/capabilities.json";
import s_mandap_yellow_cover from "./mandap_yellow/cover.json";
import s_marble_yellow_theme from "./marble_yellow/theme.json";
import s_marble_yellow_caps from "./marble_yellow/capabilities.json";
import s_minimalism_brown_theme from "./minimalism_brown/theme.json";
import s_minimalism_brown_caps from "./minimalism_brown/capabilities.json";
import s_minimalism_brown_cover from "./minimalism_brown/cover.json";
import s_minimalism_darkblue_theme from "./minimalism_darkblue/theme.json";
import s_minimalism_darkblue_caps from "./minimalism_darkblue/capabilities.json";
import s_minimalism_darkblue_cover from "./minimalism_darkblue/cover.json";
import s_minimalism_darkbrown_theme from "./minimalism_darkbrown/theme.json";
import s_minimalism_darkbrown_caps from "./minimalism_darkbrown/capabilities.json";
import s_minimalism_darkbrown_cover from "./minimalism_darkbrown/cover.json";
import s_minimalism_darkred_theme from "./minimalism_darkred/theme.json";
import s_minimalism_darkred_caps from "./minimalism_darkred/capabilities.json";
import s_minimalism_darkred_cover from "./minimalism_darkred/cover.json";
import s_minimalism_green_theme from "./minimalism_green/theme.json";
import s_minimalism_green_caps from "./minimalism_green/capabilities.json";
import s_minimalism_green_cover from "./minimalism_green/cover.json";
import s_minimalism_purple_theme from "./minimalism_purple/theme.json";
import s_minimalism_purple_caps from "./minimalism_purple/capabilities.json";
import s_minimalism_purple_cover from "./minimalism_purple/cover.json";
import s_minimalism_red_theme from "./minimalism_red/theme.json";
import s_minimalism_red_caps from "./minimalism_red/capabilities.json";
import s_minimalism_red_cover from "./minimalism_red/cover.json";
import s_nhat_binh_red_theme from "./nhat_binh_red/theme.json";
import s_nhat_binh_red_caps from "./nhat_binh_red/capabilities.json";
import s_nhat_binh_red_cover from "./nhat_binh_red/cover.json";
import s_nomad_brown_theme from "./nomad_brown/theme.json";
import s_nomad_brown_caps from "./nomad_brown/capabilities.json";
import s_porcelain_blue_theme from "./porcelain_blue/theme.json";
import s_porcelain_blue_caps from "./porcelain_blue/capabilities.json";
import s_porcelain_blue_cover from "./porcelain_blue/cover.json";
import s_porcelain_brown_theme from "./porcelain_brown/theme.json";
import s_porcelain_brown_caps from "./porcelain_brown/capabilities.json";
import s_porcelain_brown_cover from "./porcelain_brown/cover.json";
import s_porcelain_red_theme from "./porcelain_red/theme.json";
import s_porcelain_red_caps from "./porcelain_red/capabilities.json";
import s_porcelain_red_cover from "./porcelain_red/cover.json";
import s_porcelain_v2_green_theme from "./porcelain_v2_green/theme.json";
import s_porcelain_v2_green_caps from "./porcelain_v2_green/capabilities.json";
import s_porcelain_v2_green_cover from "./porcelain_v2_green/cover.json";
import s_porcelain_v2_pink_theme from "./porcelain_v2_pink/theme.json";
import s_porcelain_v2_pink_caps from "./porcelain_v2_pink/capabilities.json";
import s_porcelain_v2_pink_cover from "./porcelain_v2_pink/cover.json";
import s_porcelain_v2_red_theme from "./porcelain_v2_red/theme.json";
import s_porcelain_v2_red_caps from "./porcelain_v2_red/capabilities.json";
import s_porcelain_v2_red_cover from "./porcelain_v2_red/cover.json";
import s_qasr_blue_theme from "./qasr_blue/theme.json";
import s_qasr_blue_caps from "./qasr_blue/capabilities.json";
import s_qasr_gold_theme from "./qasr_gold/theme.json";
import s_qasr_gold_caps from "./qasr_gold/capabilities.json";
import s_qasr_green_theme from "./qasr_green/theme.json";
import s_qasr_green_caps from "./qasr_green/capabilities.json";
import s_riviera_blue_theme from "./riviera_blue/theme.json";
import s_riviera_blue_caps from "./riviera_blue/capabilities.json";
import s_riviera_blue_cover from "./riviera_blue/cover.json";
import s_royal_blue_theme from "./royal_blue/theme.json";
import s_royal_blue_caps from "./royal_blue/capabilities.json";
import s_royal_blue_cover from "./royal_blue/cover.json";
import s_royal_green_theme from "./royal_green/theme.json";
import s_royal_green_caps from "./royal_green/capabilities.json";
import s_royal_green_cover from "./royal_green/cover.json";
import s_royal_red_theme from "./royal_red/theme.json";
import s_royal_red_caps from "./royal_red/capabilities.json";
import s_royal_red_cover from "./royal_red/cover.json";
import s_royal_v2_green_theme from "./royal_v2_green/theme.json";
import s_royal_v2_green_caps from "./royal_v2_green/capabilities.json";
import s_royal_v2_green_cover from "./royal_v2_green/cover.json";
import s_royal_v2_purple_theme from "./royal_v2_purple/theme.json";
import s_royal_v2_purple_caps from "./royal_v2_purple/capabilities.json";
import s_royal_v2_purple_cover from "./royal_v2_purple/cover.json";
import s_san_miguel_yellow_theme from "./san_miguel_yellow/theme.json";
import s_san_miguel_yellow_caps from "./san_miguel_yellow/capabilities.json";
import s_san_miguel_yellow_cover from "./san_miguel_yellow/cover.json";
import s_santorini_blue_theme from "./santorini_blue/theme.json";
import s_santorini_blue_caps from "./santorini_blue/capabilities.json";
import s_saraya_gold_theme from "./saraya_gold/theme.json";
import s_saraya_gold_caps from "./saraya_gold/capabilities.json";
import s_silk_flora_brown_theme from "./silk_flora_brown/theme.json";
import s_silk_flora_brown_caps from "./silk_flora_brown/capabilities.json";
import s_silk_flora_brown_cover from "./silk_flora_brown/cover.json";
import s_silk_ribbon_darkred_theme from "./silk_ribbon_darkred/theme.json";
import s_silk_ribbon_darkred_caps from "./silk_ribbon_darkred/capabilities.json";
import s_silk_ribbon_darkred_cover from "./silk_ribbon_darkred/cover.json";
import s_silk_ribbon_green_theme from "./silk_ribbon_green/theme.json";
import s_silk_ribbon_green_caps from "./silk_ribbon_green/capabilities.json";
import s_silk_ribbon_green_cover from "./silk_ribbon_green/cover.json";
import s_silk_ribbon_pink_theme from "./silk_ribbon_pink/theme.json";
import s_silk_ribbon_pink_caps from "./silk_ribbon_pink/capabilities.json";
import s_silk_ribbon_pink_cover from "./silk_ribbon_pink/cover.json";
import s_song_hac_red_theme from "./song_hac_red/theme.json";
import s_song_hac_red_caps from "./song_hac_red/capabilities.json";
import s_song_hac_red_cover from "./song_hac_red/cover.json";
import s_song_hy_green_theme from "./song_hy_green/theme.json";
import s_song_hy_green_caps from "./song_hy_green/capabilities.json";
import s_song_hy_green_cover from "./song_hy_green/cover.json";
import s_song_hy_red_theme from "./song_hy_red/theme.json";
import s_song_hy_red_caps from "./song_hy_red/capabilities.json";
import s_song_hy_red_cover from "./song_hy_red/cover.json";
import s_song_hy_v2_red_theme from "./song_hy_v2_red/theme.json";
import s_song_hy_v2_red_caps from "./song_hy_v2_red/capabilities.json";
import s_song_hy_v2_red_cover from "./song_hy_v2_red/cover.json";
import s_spring_garden_blue_theme from "./spring_garden_blue/theme.json";
import s_spring_garden_blue_caps from "./spring_garden_blue/capabilities.json";
import s_spring_garden_blue_cover from "./spring_garden_blue/cover.json";
import s_spring_garden_green_theme from "./spring_garden_green/theme.json";
import s_spring_garden_green_caps from "./spring_garden_green/capabilities.json";
import s_spring_garden_green_cover from "./spring_garden_green/cover.json";
import s_spring_garden_red_theme from "./spring_garden_red/theme.json";
import s_spring_garden_red_caps from "./spring_garden_red/capabilities.json";
import s_spring_garden_red_cover from "./spring_garden_red/cover.json";
import s_sunflower_yellow_theme from "./sunflower_yellow/theme.json";
import s_sunflower_yellow_caps from "./sunflower_yellow/capabilities.json";
import s_sunflower_yellow_cover from "./sunflower_yellow/cover.json";

/** JSON thô của từng mẫu; `specs/index.ts` ép kiểu và dựng theme. */
export const RAW_SPECS: Record<string, { theme: unknown; capabilities: unknown; cover?: unknown }> = {
  applique_lace_white: { theme: s_applique_lace_white_theme, capabilities: s_applique_lace_white_caps, cover: s_applique_lace_white_cover },
  baroque_blue: { theme: s_baroque_blue_theme, capabilities: s_baroque_blue_caps, cover: s_baroque_blue_cover },
  baroque_gold: { theme: s_baroque_gold_theme, capabilities: s_baroque_gold_caps, cover: s_baroque_gold_cover },
  baroque_v2_darkblue: { theme: s_baroque_v2_darkblue_theme, capabilities: s_baroque_v2_darkblue_caps, cover: s_baroque_v2_darkblue_cover },
  baroque_v2_darkgreen: { theme: s_baroque_v2_darkgreen_theme, capabilities: s_baroque_v2_darkgreen_caps, cover: s_baroque_v2_darkgreen_cover },
  baroque_v2_darkred: { theme: s_baroque_v2_darkred_theme, capabilities: s_baroque_v2_darkred_caps, cover: s_baroque_v2_darkred_cover },
  boho_floral_brown: { theme: s_boho_floral_brown_theme, capabilities: s_boho_floral_brown_caps, cover: s_boho_floral_brown_cover },
  boho_floral_green: { theme: s_boho_floral_green_theme, capabilities: s_boho_floral_green_caps, cover: s_boho_floral_green_cover },
  boho_floral_pink: { theme: s_boho_floral_pink_theme, capabilities: s_boho_floral_pink_caps, cover: s_boho_floral_pink_cover },
  brocade_flower_red: { theme: s_brocade_flower_red_theme, capabilities: s_brocade_flower_red_caps },
  calla_lily_white: { theme: s_calla_lily_white_theme, capabilities: s_calla_lily_white_caps, cover: s_calla_lily_white_cover },
  chateau_blue: { theme: s_chateau_blue_theme, capabilities: s_chateau_blue_caps, cover: s_chateau_blue_cover },
  chateau_green: { theme: s_chateau_green_theme, capabilities: s_chateau_green_caps, cover: s_chateau_green_cover },
  cherry_blossom_pink: { theme: s_cherry_blossom_pink_theme, capabilities: s_cherry_blossom_pink_caps, cover: s_cherry_blossom_pink_cover },
  chibi_red: { theme: s_chibi_red_theme, capabilities: s_chibi_red_caps, cover: s_chibi_red_cover },
  co_ba_red: { theme: s_co_ba_red_theme, capabilities: s_co_ba_red_caps, cover: s_co_ba_red_cover },
  crystal_floral_blue: { theme: s_crystal_floral_blue_theme, capabilities: s_crystal_floral_blue_caps, cover: s_crystal_floral_blue_cover },
  crystal_floral_green: { theme: s_crystal_floral_green_theme, capabilities: s_crystal_floral_green_caps, cover: s_crystal_floral_green_cover },
  crystal_floral_red: { theme: s_crystal_floral_red_theme, capabilities: s_crystal_floral_red_caps, cover: s_crystal_floral_red_cover },
  double_dragon_blue: { theme: s_double_dragon_blue_theme, capabilities: s_double_dragon_blue_caps, cover: s_double_dragon_blue_cover },
  double_dragon_green: { theme: s_double_dragon_green_theme, capabilities: s_double_dragon_green_caps, cover: s_double_dragon_green_cover },
  double_dragon_red: { theme: s_double_dragon_red_theme, capabilities: s_double_dragon_red_caps, cover: s_double_dragon_red_cover },
  double_phoenix_green: { theme: s_double_phoenix_green_theme, capabilities: s_double_phoenix_green_caps, cover: s_double_phoenix_green_cover },
  double_phoenix_red: { theme: s_double_phoenix_red_theme, capabilities: s_double_phoenix_red_caps, cover: s_double_phoenix_red_cover },
  dragon_phoenix_black: { theme: s_dragon_phoenix_black_theme, capabilities: s_dragon_phoenix_black_caps, cover: s_dragon_phoenix_black_cover },
  dragon_phoenix_blue: { theme: s_dragon_phoenix_blue_theme, capabilities: s_dragon_phoenix_blue_caps, cover: s_dragon_phoenix_blue_cover },
  dragon_phoenix_green: { theme: s_dragon_phoenix_green_theme, capabilities: s_dragon_phoenix_green_caps, cover: s_dragon_phoenix_green_cover },
  dragon_phoenix_red: { theme: s_dragon_phoenix_red_theme, capabilities: s_dragon_phoenix_red_caps, cover: s_dragon_phoenix_red_cover },
  dragon_phoenix_v2_red: { theme: s_dragon_phoenix_v2_red_theme, capabilities: s_dragon_phoenix_v2_red_caps, cover: s_dragon_phoenix_v2_red_cover },
  dragon_phoenix_v3_red: { theme: s_dragon_phoenix_v3_red_theme, capabilities: s_dragon_phoenix_v3_red_caps, cover: s_dragon_phoenix_v3_red_cover },
  dragon_phoenix_v4_red: { theme: s_dragon_phoenix_v4_red_theme, capabilities: s_dragon_phoenix_v4_red_caps, cover: s_dragon_phoenix_v4_red_cover },
  dried_flower_v2_green: { theme: s_dried_flower_v2_green_theme, capabilities: s_dried_flower_v2_green_caps, cover: s_dried_flower_v2_green_cover },
  elegant_leaf_green: { theme: s_elegant_leaf_green_theme, capabilities: s_elegant_leaf_green_caps, cover: s_elegant_leaf_green_cover },
  floral_fiesta_yellow: { theme: s_floral_fiesta_yellow_theme, capabilities: s_floral_fiesta_yellow_caps },
  florence_brown: { theme: s_florence_brown_theme, capabilities: s_florence_brown_caps, cover: s_florence_brown_cover },
  folk_floral_blue: { theme: s_folk_floral_blue_theme, capabilities: s_folk_floral_blue_caps },
  glass_garden_blue: { theme: s_glass_garden_blue_theme, capabilities: s_glass_garden_blue_caps, cover: s_glass_garden_blue_cover },
  glass_garden_green: { theme: s_glass_garden_green_theme, capabilities: s_glass_garden_green_caps, cover: s_glass_garden_green_cover },
  glass_garden_light_green: { theme: s_glass_garden_light_green_theme, capabilities: s_glass_garden_light_green_caps },
  glass_garden_pink: { theme: s_glass_garden_pink_theme, capabilities: s_glass_garden_pink_caps, cover: s_glass_garden_pink_cover },
  hoa_dai_pink: { theme: s_hoa_dai_pink_theme, capabilities: s_hoa_dai_pink_caps, cover: s_hoa_dai_pink_cover },
  hoa_kho_orange: { theme: s_hoa_kho_orange_theme, capabilities: s_hoa_kho_orange_caps, cover: s_hoa_kho_orange_cover },
  hoa_kho_v2_blue: { theme: s_hoa_kho_v2_blue_theme, capabilities: s_hoa_kho_v2_blue_caps, cover: s_hoa_kho_v2_blue_cover },
  hoa_tinh_red: { theme: s_hoa_tinh_red_theme, capabilities: s_hoa_tinh_red_caps, cover: s_hoa_tinh_red_cover },
  jasmine_green: { theme: s_jasmine_green_theme, capabilities: s_jasmine_green_caps, cover: s_jasmine_green_cover },
  jasmine_white: { theme: s_jasmine_white_theme, capabilities: s_jasmine_white_caps, cover: s_jasmine_white_cover },
  lien_hoa_pink: { theme: s_lien_hoa_pink_theme, capabilities: s_lien_hoa_pink_caps, cover: s_lien_hoa_pink_cover },
  lien_hoa_v2_green: { theme: s_lien_hoa_v2_green_theme, capabilities: s_lien_hoa_v2_green_caps, cover: s_lien_hoa_v2_green_cover },
  mahal_gold: { theme: s_mahal_gold_theme, capabilities: s_mahal_gold_caps, cover: s_mahal_gold_cover },
  mahal_pink: { theme: s_mahal_pink_theme, capabilities: s_mahal_pink_caps, cover: s_mahal_pink_cover },
  mandap_darkred: { theme: s_mandap_darkred_theme, capabilities: s_mandap_darkred_caps, cover: s_mandap_darkred_cover },
  mandap_yellow: { theme: s_mandap_yellow_theme, capabilities: s_mandap_yellow_caps, cover: s_mandap_yellow_cover },
  marble_yellow: { theme: s_marble_yellow_theme, capabilities: s_marble_yellow_caps },
  minimalism_brown: { theme: s_minimalism_brown_theme, capabilities: s_minimalism_brown_caps, cover: s_minimalism_brown_cover },
  minimalism_darkblue: { theme: s_minimalism_darkblue_theme, capabilities: s_minimalism_darkblue_caps, cover: s_minimalism_darkblue_cover },
  minimalism_darkbrown: { theme: s_minimalism_darkbrown_theme, capabilities: s_minimalism_darkbrown_caps, cover: s_minimalism_darkbrown_cover },
  minimalism_darkred: { theme: s_minimalism_darkred_theme, capabilities: s_minimalism_darkred_caps, cover: s_minimalism_darkred_cover },
  minimalism_green: { theme: s_minimalism_green_theme, capabilities: s_minimalism_green_caps, cover: s_minimalism_green_cover },
  minimalism_purple: { theme: s_minimalism_purple_theme, capabilities: s_minimalism_purple_caps, cover: s_minimalism_purple_cover },
  minimalism_red: { theme: s_minimalism_red_theme, capabilities: s_minimalism_red_caps, cover: s_minimalism_red_cover },
  nhat_binh_red: { theme: s_nhat_binh_red_theme, capabilities: s_nhat_binh_red_caps, cover: s_nhat_binh_red_cover },
  nomad_brown: { theme: s_nomad_brown_theme, capabilities: s_nomad_brown_caps },
  porcelain_blue: { theme: s_porcelain_blue_theme, capabilities: s_porcelain_blue_caps, cover: s_porcelain_blue_cover },
  porcelain_brown: { theme: s_porcelain_brown_theme, capabilities: s_porcelain_brown_caps, cover: s_porcelain_brown_cover },
  porcelain_red: { theme: s_porcelain_red_theme, capabilities: s_porcelain_red_caps, cover: s_porcelain_red_cover },
  porcelain_v2_green: { theme: s_porcelain_v2_green_theme, capabilities: s_porcelain_v2_green_caps, cover: s_porcelain_v2_green_cover },
  porcelain_v2_pink: { theme: s_porcelain_v2_pink_theme, capabilities: s_porcelain_v2_pink_caps, cover: s_porcelain_v2_pink_cover },
  porcelain_v2_red: { theme: s_porcelain_v2_red_theme, capabilities: s_porcelain_v2_red_caps, cover: s_porcelain_v2_red_cover },
  qasr_blue: { theme: s_qasr_blue_theme, capabilities: s_qasr_blue_caps },
  qasr_gold: { theme: s_qasr_gold_theme, capabilities: s_qasr_gold_caps },
  qasr_green: { theme: s_qasr_green_theme, capabilities: s_qasr_green_caps },
  riviera_blue: { theme: s_riviera_blue_theme, capabilities: s_riviera_blue_caps, cover: s_riviera_blue_cover },
  royal_blue: { theme: s_royal_blue_theme, capabilities: s_royal_blue_caps, cover: s_royal_blue_cover },
  royal_green: { theme: s_royal_green_theme, capabilities: s_royal_green_caps, cover: s_royal_green_cover },
  royal_red: { theme: s_royal_red_theme, capabilities: s_royal_red_caps, cover: s_royal_red_cover },
  royal_v2_green: { theme: s_royal_v2_green_theme, capabilities: s_royal_v2_green_caps, cover: s_royal_v2_green_cover },
  royal_v2_purple: { theme: s_royal_v2_purple_theme, capabilities: s_royal_v2_purple_caps, cover: s_royal_v2_purple_cover },
  san_miguel_yellow: { theme: s_san_miguel_yellow_theme, capabilities: s_san_miguel_yellow_caps, cover: s_san_miguel_yellow_cover },
  santorini_blue: { theme: s_santorini_blue_theme, capabilities: s_santorini_blue_caps },
  saraya_gold: { theme: s_saraya_gold_theme, capabilities: s_saraya_gold_caps },
  silk_flora_brown: { theme: s_silk_flora_brown_theme, capabilities: s_silk_flora_brown_caps, cover: s_silk_flora_brown_cover },
  silk_ribbon_darkred: { theme: s_silk_ribbon_darkred_theme, capabilities: s_silk_ribbon_darkred_caps, cover: s_silk_ribbon_darkred_cover },
  silk_ribbon_green: { theme: s_silk_ribbon_green_theme, capabilities: s_silk_ribbon_green_caps, cover: s_silk_ribbon_green_cover },
  silk_ribbon_pink: { theme: s_silk_ribbon_pink_theme, capabilities: s_silk_ribbon_pink_caps, cover: s_silk_ribbon_pink_cover },
  song_hac_red: { theme: s_song_hac_red_theme, capabilities: s_song_hac_red_caps, cover: s_song_hac_red_cover },
  song_hy_green: { theme: s_song_hy_green_theme, capabilities: s_song_hy_green_caps, cover: s_song_hy_green_cover },
  song_hy_red: { theme: s_song_hy_red_theme, capabilities: s_song_hy_red_caps, cover: s_song_hy_red_cover },
  song_hy_v2_red: { theme: s_song_hy_v2_red_theme, capabilities: s_song_hy_v2_red_caps, cover: s_song_hy_v2_red_cover },
  spring_garden_blue: { theme: s_spring_garden_blue_theme, capabilities: s_spring_garden_blue_caps, cover: s_spring_garden_blue_cover },
  spring_garden_green: { theme: s_spring_garden_green_theme, capabilities: s_spring_garden_green_caps, cover: s_spring_garden_green_cover },
  spring_garden_red: { theme: s_spring_garden_red_theme, capabilities: s_spring_garden_red_caps, cover: s_spring_garden_red_cover },
  sunflower_yellow: { theme: s_sunflower_yellow_theme, capabilities: s_sunflower_yellow_caps, cover: s_sunflower_yellow_cover },
};

/** Dữ liệu demo của trang gốc cho từng mẫu (specs/<id>/demo.json) — tải theo nhu cầu, chỉ trang demo dùng. */
export const DEMO_LOADERS: Record<string, () => Promise<unknown>> = {
  applique_lace_white: () => import("./applique_lace_white/demo.json").then((m) => m.default),
  baroque_blue: () => import("./baroque_blue/demo.json").then((m) => m.default),
  baroque_gold: () => import("./baroque_gold/demo.json").then((m) => m.default),
  baroque_v2_darkblue: () => import("./baroque_v2_darkblue/demo.json").then((m) => m.default),
  baroque_v2_darkgreen: () => import("./baroque_v2_darkgreen/demo.json").then((m) => m.default),
  baroque_v2_darkred: () => import("./baroque_v2_darkred/demo.json").then((m) => m.default),
  boho_floral_brown: () => import("./boho_floral_brown/demo.json").then((m) => m.default),
  boho_floral_green: () => import("./boho_floral_green/demo.json").then((m) => m.default),
  boho_floral_pink: () => import("./boho_floral_pink/demo.json").then((m) => m.default),
  brocade_flower_red: () => import("./brocade_flower_red/demo.json").then((m) => m.default),
  calla_lily_white: () => import("./calla_lily_white/demo.json").then((m) => m.default),
  chateau_blue: () => import("./chateau_blue/demo.json").then((m) => m.default),
  chateau_green: () => import("./chateau_green/demo.json").then((m) => m.default),
  cherry_blossom_pink: () => import("./cherry_blossom_pink/demo.json").then((m) => m.default),
  chibi_red: () => import("./chibi_red/demo.json").then((m) => m.default),
  co_ba_red: () => import("./co_ba_red/demo.json").then((m) => m.default),
  crystal_floral_blue: () => import("./crystal_floral_blue/demo.json").then((m) => m.default),
  crystal_floral_green: () => import("./crystal_floral_green/demo.json").then((m) => m.default),
  crystal_floral_red: () => import("./crystal_floral_red/demo.json").then((m) => m.default),
  double_dragon_blue: () => import("./double_dragon_blue/demo.json").then((m) => m.default),
  double_dragon_green: () => import("./double_dragon_green/demo.json").then((m) => m.default),
  double_dragon_red: () => import("./double_dragon_red/demo.json").then((m) => m.default),
  double_phoenix_green: () => import("./double_phoenix_green/demo.json").then((m) => m.default),
  double_phoenix_red: () => import("./double_phoenix_red/demo.json").then((m) => m.default),
  dragon_phoenix_black: () => import("./dragon_phoenix_black/demo.json").then((m) => m.default),
  dragon_phoenix_blue: () => import("./dragon_phoenix_blue/demo.json").then((m) => m.default),
  dragon_phoenix_green: () => import("./dragon_phoenix_green/demo.json").then((m) => m.default),
  dragon_phoenix_red: () => import("./dragon_phoenix_red/demo.json").then((m) => m.default),
  dragon_phoenix_v2_red: () => import("./dragon_phoenix_v2_red/demo.json").then((m) => m.default),
  dragon_phoenix_v3_red: () => import("./dragon_phoenix_v3_red/demo.json").then((m) => m.default),
  dragon_phoenix_v4_red: () => import("./dragon_phoenix_v4_red/demo.json").then((m) => m.default),
  dried_flower_v2_green: () => import("./dried_flower_v2_green/demo.json").then((m) => m.default),
  elegant_leaf_green: () => import("./elegant_leaf_green/demo.json").then((m) => m.default),
  floral_fiesta_yellow: () => import("./floral_fiesta_yellow/demo.json").then((m) => m.default),
  florence_brown: () => import("./florence_brown/demo.json").then((m) => m.default),
  folk_floral_blue: () => import("./folk_floral_blue/demo.json").then((m) => m.default),
  glass_garden_blue: () => import("./glass_garden_blue/demo.json").then((m) => m.default),
  glass_garden_green: () => import("./glass_garden_green/demo.json").then((m) => m.default),
  glass_garden_light_green: () => import("./glass_garden_light_green/demo.json").then((m) => m.default),
  glass_garden_pink: () => import("./glass_garden_pink/demo.json").then((m) => m.default),
  hoa_dai_pink: () => import("./hoa_dai_pink/demo.json").then((m) => m.default),
  hoa_kho_orange: () => import("./hoa_kho_orange/demo.json").then((m) => m.default),
  hoa_kho_v2_blue: () => import("./hoa_kho_v2_blue/demo.json").then((m) => m.default),
  hoa_tinh_red: () => import("./hoa_tinh_red/demo.json").then((m) => m.default),
  jasmine_green: () => import("./jasmine_green/demo.json").then((m) => m.default),
  jasmine_white: () => import("./jasmine_white/demo.json").then((m) => m.default),
  lien_hoa_pink: () => import("./lien_hoa_pink/demo.json").then((m) => m.default),
  lien_hoa_v2_green: () => import("./lien_hoa_v2_green/demo.json").then((m) => m.default),
  mahal_gold: () => import("./mahal_gold/demo.json").then((m) => m.default),
  mahal_pink: () => import("./mahal_pink/demo.json").then((m) => m.default),
  mandap_darkred: () => import("./mandap_darkred/demo.json").then((m) => m.default),
  mandap_yellow: () => import("./mandap_yellow/demo.json").then((m) => m.default),
  marble_yellow: () => import("./marble_yellow/demo.json").then((m) => m.default),
  minimalism_brown: () => import("./minimalism_brown/demo.json").then((m) => m.default),
  minimalism_darkblue: () => import("./minimalism_darkblue/demo.json").then((m) => m.default),
  minimalism_darkbrown: () => import("./minimalism_darkbrown/demo.json").then((m) => m.default),
  minimalism_darkred: () => import("./minimalism_darkred/demo.json").then((m) => m.default),
  minimalism_green: () => import("./minimalism_green/demo.json").then((m) => m.default),
  minimalism_purple: () => import("./minimalism_purple/demo.json").then((m) => m.default),
  minimalism_red: () => import("./minimalism_red/demo.json").then((m) => m.default),
  nhat_binh_red: () => import("./nhat_binh_red/demo.json").then((m) => m.default),
  nomad_brown: () => import("./nomad_brown/demo.json").then((m) => m.default),
  porcelain_blue: () => import("./porcelain_blue/demo.json").then((m) => m.default),
  porcelain_brown: () => import("./porcelain_brown/demo.json").then((m) => m.default),
  porcelain_red: () => import("./porcelain_red/demo.json").then((m) => m.default),
  porcelain_v2_green: () => import("./porcelain_v2_green/demo.json").then((m) => m.default),
  porcelain_v2_pink: () => import("./porcelain_v2_pink/demo.json").then((m) => m.default),
  porcelain_v2_red: () => import("./porcelain_v2_red/demo.json").then((m) => m.default),
  qasr_blue: () => import("./qasr_blue/demo.json").then((m) => m.default),
  qasr_gold: () => import("./qasr_gold/demo.json").then((m) => m.default),
  qasr_green: () => import("./qasr_green/demo.json").then((m) => m.default),
  riviera_blue: () => import("./riviera_blue/demo.json").then((m) => m.default),
  royal_blue: () => import("./royal_blue/demo.json").then((m) => m.default),
  royal_green: () => import("./royal_green/demo.json").then((m) => m.default),
  royal_red: () => import("./royal_red/demo.json").then((m) => m.default),
  royal_v2_green: () => import("./royal_v2_green/demo.json").then((m) => m.default),
  royal_v2_purple: () => import("./royal_v2_purple/demo.json").then((m) => m.default),
  san_miguel_yellow: () => import("./san_miguel_yellow/demo.json").then((m) => m.default),
  santorini_blue: () => import("./santorini_blue/demo.json").then((m) => m.default),
  saraya_gold: () => import("./saraya_gold/demo.json").then((m) => m.default),
  silk_flora_brown: () => import("./silk_flora_brown/demo.json").then((m) => m.default),
  silk_ribbon_darkred: () => import("./silk_ribbon_darkred/demo.json").then((m) => m.default),
  silk_ribbon_green: () => import("./silk_ribbon_green/demo.json").then((m) => m.default),
  silk_ribbon_pink: () => import("./silk_ribbon_pink/demo.json").then((m) => m.default),
  song_hac_red: () => import("./song_hac_red/demo.json").then((m) => m.default),
  song_hy_green: () => import("./song_hy_green/demo.json").then((m) => m.default),
  song_hy_red: () => import("./song_hy_red/demo.json").then((m) => m.default),
  song_hy_v2_red: () => import("./song_hy_v2_red/demo.json").then((m) => m.default),
  spring_garden_blue: () => import("./spring_garden_blue/demo.json").then((m) => m.default),
  spring_garden_green: () => import("./spring_garden_green/demo.json").then((m) => m.default),
  spring_garden_red: () => import("./spring_garden_red/demo.json").then((m) => m.default),
  sunflower_yellow: () => import("./sunflower_yellow/demo.json").then((m) => m.default),
};
