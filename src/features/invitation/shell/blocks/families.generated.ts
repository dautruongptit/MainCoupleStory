// TỆP SINH — không sửa tay. Chạy: node scripts/clone/gen_spec_index.mjs
// Nguồn: các thư mục shell/blocks/<họ>/index.ts. Thêm họ khối mới = tạo thư mục + index.ts rồi chạy bộ sinh.
import type { BlockComponent } from "./index";
import * as f_applique_lace_white from "./applique_lace_white";
import * as f_baroque_blue from "./baroque_blue";
import * as f_baroque_gold from "./baroque_gold";
import { BAROQUE_V2_BLOCKS as f_baroque_v2 } from "./baroque_v2";
import { BOHO_FLORAL_BLOCKS as f_boho_floral } from "./boho_floral";
import * as f_brocade_flower_red from "./brocade_flower_red";
import * as f_calla_lily_white from "./calla_lily_white";
import * as f_chateau_blue from "./chateau_blue";
import * as f_chateau_green from "./chateau_green";
import * as f_cherry_blossom_pink from "./cherry_blossom_pink";
import * as f_chibi_red from "./chibi_red";
import * as f_co_ba_red from "./co_ba_red";
import { CRYSTAL_FLORAL_BLOCKS as f_crystal_floral } from "./crystal_floral";
import { DARKRED_BLOCKS as f_darkred } from "./darkred";
import { DOUBLE_DRAGON_BLOCKS as f_double_dragon } from "./double_dragon";
import * as f_double_phoenix_green from "./double_phoenix_green";
import * as f_double_phoenix_red from "./double_phoenix_red";
import * as f_dragon_phoenix_v2_red from "./dragon_phoenix_v2_red";
import * as f_dragon_phoenix_v3_red from "./dragon_phoenix_v3_red";
import * as f_dried_flower_v2_green from "./dried_flower_v2_green";
import * as f_elegant_leaf_green from "./elegant_leaf_green";
import * as f_floral_fiesta_yellow from "./floral_fiesta_yellow";
import * as f_florence_brown from "./florence_brown";
import * as f_folk_floral_blue from "./folk_floral_blue";
import * as f_glass_garden_blue from "./glass_garden_blue";
import * as f_glass_garden_green from "./glass_garden_green";
import * as f_glass_garden_light_green from "./glass_garden_light_green";
import * as f_glass_garden_pink from "./glass_garden_pink";
import * as f_hoa_dai_pink from "./hoa_dai_pink";
import * as f_hoa_kho_orange from "./hoa_kho_orange";
import * as f_hoa_kho_v2_blue from "./hoa_kho_v2_blue";
import * as f_hoa_tinh_red from "./hoa_tinh_red";
import * as f_jasmine_green from "./jasmine_green";
import * as f_jasmine_white from "./jasmine_white";
import * as f_lien_hoa_pink from "./lien_hoa_pink";
import { LIEN_HOA_V2_BLOCKS as f_lien_hoa_v2 } from "./lien_hoa_v2";
import { LONGPHUNG_V1_BLOCKS as f_longphung_v1 } from "./longphung_v1";
import * as f_mahal_gold from "./mahal_gold";
import * as f_mahal_pink from "./mahal_pink";
import * as f_mandap_darkred from "./mandap_darkred";
import * as f_mandap_yellow from "./mandap_yellow";
import * as f_marble_yellow from "./marble_yellow";
import * as f_minimalism_darkblue from "./minimalism_darkblue";
import * as f_minimalism_darkbrown from "./minimalism_darkbrown";
import * as f_minimalism_green from "./minimalism_green";
import { MINIMALISM_PURPLE_BLOCKS as f_minimalism_purple } from "./minimalism_purple";
import * as f_minimalism_red from "./minimalism_red";
import * as f_nhat_binh_red from "./nhat_binh_red";
import * as f_nomad_brown from "./nomad_brown";
import * as f_porcelain_blue from "./porcelain_blue";
import * as f_porcelain_brown from "./porcelain_brown";
import * as f_porcelain_red from "./porcelain_red";
import { PORCELAIN_V2_BLOCKS as f_porcelain_v2 } from "./porcelain_v2";
import * as f_qasr_blue from "./qasr_blue";
import * as f_qasr_gold from "./qasr_gold";
import * as f_qasr_green from "./qasr_green";
import { RIVIERA_BLOCKS as f_riviera } from "./riviera";
import * as f_royal_blue from "./royal_blue";
import * as f_royal_green from "./royal_green";
import * as f_royal_red from "./royal_red";
import * as f_royal_v2_green from "./royal_v2_green";
import * as f_royal_v2_purple from "./royal_v2_purple";
import * as f_san_miguel_yellow from "./san_miguel_yellow";
import * as f_santorini_blue from "./santorini_blue";
import * as f_saraya_gold from "./saraya_gold";
import * as f_silk_flora_brown from "./silk_flora_brown";
import * as f_silk_ribbon_darkred from "./silk_ribbon_darkred";
import * as f_silk_ribbon_green from "./silk_ribbon_green";
import * as f_silk_ribbon_pink from "./silk_ribbon_pink";
import * as f_song_hac_red from "./song_hac_red";
import { SONG_HY_BLOCKS as f_song_hy } from "./song_hy";
import * as f_song_hy_v2_red from "./song_hy_v2_red";
import { SPRINGGARDEN_V1_BLOCKS as f_springgarden_v1 } from "./springgarden_v1";
import * as f_sunflower_yellow from "./sunflower_yellow";
import { TRADITIONAL_BLOCKS as f_traditional } from "./traditional";

/** capabilities.family → bản đồ tên khối → component của họ đó. */
export const FAMILY_BLOCKS: Record<string, Record<string, BlockComponent>> = {
  applique_lace_white: f_applique_lace_white,
  baroque_blue: f_baroque_blue,
  baroque_gold: f_baroque_gold,
  baroque_v2: f_baroque_v2,
  boho_floral: f_boho_floral,
  brocade_flower_red: f_brocade_flower_red,
  calla_lily_white: f_calla_lily_white,
  chateau_blue: f_chateau_blue,
  chateau_green: f_chateau_green,
  cherry_blossom_pink: f_cherry_blossom_pink,
  chibi_red: f_chibi_red,
  co_ba_red: f_co_ba_red,
  crystal_floral: f_crystal_floral,
  darkred: f_darkred,
  double_dragon: f_double_dragon,
  double_phoenix_green: f_double_phoenix_green,
  double_phoenix_red: f_double_phoenix_red,
  dragon_phoenix_v2_red: f_dragon_phoenix_v2_red,
  dragon_phoenix_v3_red: f_dragon_phoenix_v3_red,
  dried_flower_v2_green: f_dried_flower_v2_green,
  elegant_leaf_green: f_elegant_leaf_green,
  floral_fiesta_yellow: f_floral_fiesta_yellow,
  florence_brown: f_florence_brown,
  folk_floral_blue: f_folk_floral_blue,
  glass_garden_blue: f_glass_garden_blue,
  glass_garden_green: f_glass_garden_green,
  glass_garden_light_green: f_glass_garden_light_green,
  glass_garden_pink: f_glass_garden_pink,
  hoa_dai_pink: f_hoa_dai_pink,
  hoa_kho_orange: f_hoa_kho_orange,
  hoa_kho_v2_blue: f_hoa_kho_v2_blue,
  hoa_tinh_red: f_hoa_tinh_red,
  jasmine_green: f_jasmine_green,
  jasmine_white: f_jasmine_white,
  lien_hoa_pink: f_lien_hoa_pink,
  lien_hoa_v2: f_lien_hoa_v2,
  longphung_v1: f_longphung_v1,
  mahal_gold: f_mahal_gold,
  mahal_pink: f_mahal_pink,
  mandap_darkred: f_mandap_darkred,
  mandap_yellow: f_mandap_yellow,
  marble_yellow: f_marble_yellow,
  minimalism_darkblue: f_minimalism_darkblue,
  minimalism_darkbrown: f_minimalism_darkbrown,
  minimalism_green: f_minimalism_green,
  minimalism_purple: f_minimalism_purple,
  minimalism_red: f_minimalism_red,
  nhat_binh_red: f_nhat_binh_red,
  nomad_brown: f_nomad_brown,
  porcelain_blue: f_porcelain_blue,
  porcelain_brown: f_porcelain_brown,
  porcelain_red: f_porcelain_red,
  porcelain_v2: f_porcelain_v2,
  qasr_blue: f_qasr_blue,
  qasr_gold: f_qasr_gold,
  qasr_green: f_qasr_green,
  riviera: f_riviera,
  royal_blue: f_royal_blue,
  royal_green: f_royal_green,
  royal_red: f_royal_red,
  royal_v2_green: f_royal_v2_green,
  royal_v2_purple: f_royal_v2_purple,
  san_miguel_yellow: f_san_miguel_yellow,
  santorini_blue: f_santorini_blue,
  saraya_gold: f_saraya_gold,
  silk_flora_brown: f_silk_flora_brown,
  silk_ribbon_darkred: f_silk_ribbon_darkred,
  silk_ribbon_green: f_silk_ribbon_green,
  silk_ribbon_pink: f_silk_ribbon_pink,
  song_hac_red: f_song_hac_red,
  song_hy: f_song_hy,
  song_hy_v2_red: f_song_hy_v2_red,
  springgarden_v1: f_springgarden_v1,
  sunflower_yellow: f_sunflower_yellow,
  traditional: f_traditional,
};
