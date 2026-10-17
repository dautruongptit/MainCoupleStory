/** TỆP SINH TỰ ĐỘNG - Manifest quản lý assets cho toàn bộ 75/75 mẫu thiệp cưới (70 thư mục theme).
 *  Chứa thông tin metadata chi tiết (kích thước, định dạng, vai trò, dung lượng, hash) của từng mẫu thiệp.
 */

export type AssetType = 'cover' | 'background' | 'decoration' | 'frame' | 'divider' | 'icon' | 'seal' | 'unknown';

export interface ThemeAsset {
  id: string;
  file: string;
  path: string;
  format: string;
  width: number | null;
  height: number | null;
  aspectRatio: number | null;
  size: number;
  md5: string;
  type: AssetType;
  usage: string;
}

export interface TemplateAssetManifest {
  templateId: string;
  slug: string;
  name: string;
  themeFolders: string[];
  assetCount: number;
  totalBytes: number;
  assets: ThemeAsset[];
  backgroundPath: string | null;
  coverPath: string | null;
  decorationsCount: number;
  framesCount: number;
  isSharedTheme: boolean;
  sharedWith: string[];
  status: 'active';
}

export interface ThemeManifest {
  themeId: string;
  folder: string;
  assetCount: number;
  totalBytes: number;
  assets: ThemeAsset[];
}

export const TEMPLATE_THEME_FOLDERS: Record<string, string[]> = {
  "minimalism_darkred": [
    "minimalism-dark-red"
  ],
  "minimalism_brown": [
    "minimalism-brown"
  ],
  "song_hy_green": [
    "song-hy-red",
    "songphung-green"
  ],
  "boho_floral_green": [
    "boho-floral-green"
  ],
  "song_hy_red": [
    "song-hy-red"
  ],
  "minimalism_green": [
    "minimalism-green"
  ],
  "song_hy_v2_red": [
    "song-hy-v2-red"
  ],
  "silk_ribbon_green": [
    "silk-ribbon-green"
  ],
  "glass_garden_pink": [
    "glass-garden-pink"
  ],
  "jasmine_white": [
    "moclan-white"
  ],
  "dragon_phoenix_v3_red": [
    "longphung-v3-red"
  ],
  "minimalism_darkbrown": [
    "minimalism-dark-brown"
  ],
  "double_phoenix_red": [
    "songphung-red"
  ],
  "double_dragon_red": [
    "songlong-red"
  ],
  "glass_garden_green": [
    "glass-garden-green"
  ],
  "baroque_v2_darkred": [
    "baroque-v2-dark-red"
  ],
  "silk_ribbon_darkred": [
    "silk-ribbon-darkred"
  ],
  "dragon_phoenix_v2_red": [
    "longphung-v2-red"
  ],
  "dragon_phoenix_v4_red": [
    "longphung-v4-red"
  ],
  "dragon_phoenix_red": [
    "red-v1"
  ],
  "minimalism_darkblue": [
    "minimalism-dark-blue"
  ],
  "lien_hoa_v2_green": [
    "lien-hoa-v2-green"
  ],
  "minimalism_red": [
    "minimalism-red"
  ],
  "song_hac_red": [
    "song-hac-red"
  ],
  "chibi_red": [
    "chibi_red"
  ],
  "elegant_leaf_green": [
    "thanhdiep-green"
  ],
  "silk_ribbon_pink": [
    "silk-ribbon-pink"
  ],
  "dragon_phoenix_green": [
    "red-v1"
  ],
  "royal_red": [
    "royal-red"
  ],
  "spring_garden_green": [
    "nature"
  ],
  "baroque_gold": [
    "baroque-gold"
  ],
  "double_phoenix_green": [
    "songphung-green"
  ],
  "cherry_blossom_pink": [
    "anhdao-pink"
  ],
  "hoa_tinh_red": [
    "love-art"
  ],
  "silk_flora_brown": [
    "silkflora-brown"
  ],
  "boho_floral_pink": [
    "boho-floral-pink"
  ],
  "nhat_binh_red": [
    "nhat-binh-red"
  ],
  "boho_floral_brown": [
    "boho-floral-brown"
  ],
  "applique_lace_white": [
    "applique-lace-white"
  ],
  "chateau_green": [
    "chateau-green"
  ],
  "double_dragon_green": [
    "songlong-red"
  ],
  "lien_hoa_pink": [
    "lien-hoa-pink"
  ],
  "spring_garden_red": [
    "vuon xuan red"
  ],
  "dragon_phoenix_blue": [
    "red-v1"
  ],
  "spring_garden_blue": [
    "vuon xuan blue"
  ],
  "baroque_v2_darkgreen": [
    "baroque-v2-dark-green"
  ],
  "crystal_floral_blue": [
    "crystal-floral-blue"
  ],
  "porcelain_v2_pink": [
    "porcelain-v2-pink"
  ],
  "chateau_blue": [
    "chateau-blue"
  ],
  "porcelain_v2_green": [
    "porcelain-v2-green"
  ],
  "florence_brown": [
    "florence-brown"
  ],
  "hoa_kho_v2_blue": [
    "hoa-kho-v2-blue"
  ],
  "co_ba_red": [
    "coba-red",
    "nhat-binh-red"
  ],
  "double_dragon_blue": [
    "songlong-red"
  ],
  "royal_green": [
    "royal-green"
  ],
  "minimalism_purple": [
    "minimalism-purple"
  ],
  "dried_flower_v2_green": [
    "dried-flower-v2-green"
  ],
  "hoa_dai_pink": [
    "hoa-dai-pink"
  ],
  "baroque_blue": [
    "baroque-blue"
  ],
  "royal_v2_green": [
    "royal-v2-green"
  ],
  "dragon_phoenix_black": [
    "red-v1",
    "black-v1"
  ],
  "royal_blue": [
    "royal-blue"
  ],
  "riviera_blue": [
    "riviera-blue"
  ],
  "baroque_v2_darkblue": [
    "baroque-v2-dark-blue"
  ],
  "porcelain_brown": [
    "porcelain-brown"
  ],
  "crystal_floral_green": [
    "crystal-floral-green"
  ],
  "sunflower_yellow": [
    "sunflower"
  ],
  "porcelain_v2_red": [
    "porcelain-v2-red"
  ],
  "crystal_floral_red": [
    "crystal-floral-red"
  ],
  "porcelain_blue": [
    "porcelain-blue"
  ],
  "porcelain_red": [
    "porcelain-red"
  ],
  "san_miguel_yellow": [
    "san-miguel-yellow"
  ],
  "glass_garden_blue": [
    "glass-garden-blue"
  ],
  "royal_v2_purple": [
    "royal-v2-purple"
  ],
  "hoa_kho_orange": [
    "hoa-kho-orange"
  ]
};

export const THEME_MANIFESTS: Record<string, ThemeManifest> = {
  "anhdao-pink": {
    "themeId": "anhdao-pink",
    "folder": "anhdao-pink",
    "assetCount": 2,
    "totalBytes": 671830,
    "assets": [
      {
        "id": "1",
        "file": "1.webp",
        "path": "/images/themes/anhdao-pink/1.webp",
        "format": "WEBP",
        "width": 627,
        "height": 900,
        "aspectRatio": 0.697,
        "size": 52742,
        "md5": "ba57ddf633f40eb0e9aed50580f3af5c",
        "type": "decoration",
        "usage": "Ornamental artwork for anhdao-pink"
      },
      {
        "id": "bg-full",
        "file": "bg-full.jpg",
        "path": "/images/themes/anhdao-pink/bg-full.jpg",
        "format": "JPEG",
        "width": 900,
        "height": 6000,
        "aspectRatio": 0.15,
        "size": 619088,
        "md5": "1a8c3fbbaf3cae302a2b1f91fb5199b6",
        "type": "background",
        "usage": "Background paper or ambient texture for anhdao-pink"
      }
    ]
  },
  "applique-lace-white": {
    "themeId": "applique-lace-white",
    "folder": "applique-lace-white",
    "assetCount": 4,
    "totalBytes": 511560,
    "assets": [
      {
        "id": "envelope-background",
        "file": "envelope-background.webp",
        "path": "/images/themes/applique-lace-white/envelope-background.webp",
        "format": "WEBP",
        "width": 1071,
        "height": 1192,
        "aspectRatio": 0.898,
        "size": 47598,
        "md5": "3341160242719448312275da3c584e94",
        "type": "background",
        "usage": "Background paper or ambient texture for applique-lace-white"
      },
      {
        "id": "envelope-cover",
        "file": "envelope-cover.webp",
        "path": "/images/themes/applique-lace-white/envelope-cover.webp",
        "format": "WEBP",
        "width": 1400,
        "height": 933,
        "aspectRatio": 1.501,
        "size": 320810,
        "md5": "8101e594bddb854a42aa82982b8fd54d",
        "type": "cover",
        "usage": "Envelope or cover illustration for applique-lace-white"
      },
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/applique-lace-white/flower.webp",
        "format": "WEBP",
        "width": 636,
        "height": 1480,
        "aspectRatio": 0.43,
        "size": 131830,
        "md5": "4680183d3762d76ce48f6e9433f8b8f5",
        "type": "decoration",
        "usage": "Decorative element (flower) for applique-lace-white"
      },
      {
        "id": "satin-background",
        "file": "satin-background.webp",
        "path": "/images/themes/applique-lace-white/satin-background.webp",
        "format": "WEBP",
        "width": 955,
        "height": 1647,
        "aspectRatio": 0.58,
        "size": 11322,
        "md5": "aa5badcc5b0424268bad088d1e206703",
        "type": "background",
        "usage": "Background paper or ambient texture for applique-lace-white"
      }
    ]
  },
  "baroque-blue": {
    "themeId": "baroque-blue",
    "folder": "baroque-blue",
    "assetCount": 3,
    "totalBytes": 429006,
    "assets": [
      {
        "id": "bg-pattern",
        "file": "bg-pattern.webp",
        "path": "/images/themes/baroque-blue/bg-pattern.webp",
        "format": "WEBP",
        "width": 882,
        "height": 882,
        "aspectRatio": 1.0,
        "size": 90806,
        "md5": "885dcdca373b383b107a3c2addd53c7e",
        "type": "background",
        "usage": "Background paper or ambient texture for baroque-blue"
      },
      {
        "id": "frame-decoration",
        "file": "frame-decoration.webp",
        "path": "/images/themes/baroque-blue/frame-decoration.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1125,
        "aspectRatio": 0.8,
        "size": 322230,
        "md5": "fa9ecc717d311a7644225ee29eb4ac9c",
        "type": "frame",
        "usage": "Framing border or arch for baroque-blue"
      },
      {
        "id": "goldline-decoration",
        "file": "goldline-decoration.webp",
        "path": "/images/themes/baroque-blue/goldline-decoration.webp",
        "format": "WEBP",
        "width": 560,
        "height": 86,
        "aspectRatio": 6.512,
        "size": 15970,
        "md5": "3f20e212286f2db1c7acba6011b6f327",
        "type": "divider",
        "usage": "Decorative divider line for baroque-blue"
      }
    ]
  },
  "baroque-gold": {
    "themeId": "baroque-gold",
    "folder": "baroque-gold",
    "assetCount": 3,
    "totalBytes": 1179888,
    "assets": [
      {
        "id": "bg",
        "file": "bg.webp",
        "path": "/images/themes/baroque-gold/bg.webp",
        "format": "WEBP",
        "width": 5000,
        "height": 5000,
        "aspectRatio": 1.0,
        "size": 676638,
        "md5": "7e8b309790b2fd209a7c7fcc62ce3f86",
        "type": "background",
        "usage": "Background paper or ambient texture for baroque-gold"
      },
      {
        "id": "hoa",
        "file": "hoa.webp",
        "path": "/images/themes/baroque-gold/hoa.webp",
        "format": "WEBP",
        "width": 1193,
        "height": 1318,
        "aspectRatio": 0.905,
        "size": 188922,
        "md5": "5d4ff97353120b9674f2b9dcdc7fefbd",
        "type": "decoration",
        "usage": "Decorative element (hoa) for baroque-gold"
      },
      {
        "id": "khung",
        "file": "khung.webp",
        "path": "/images/themes/baroque-gold/khung.webp",
        "format": "WEBP",
        "width": 1074,
        "height": 1293,
        "aspectRatio": 0.831,
        "size": 314328,
        "md5": "c2966d739b19f2f187557681eb76f667",
        "type": "frame",
        "usage": "Framing border or arch for baroque-gold"
      }
    ]
  },
  "baroque-v2-dark-blue": {
    "themeId": "baroque-v2-dark-blue",
    "folder": "baroque-v2-dark-blue",
    "assetCount": 1,
    "totalBytes": 335896,
    "assets": [
      {
        "id": "frame",
        "file": "frame.webp",
        "path": "/images/themes/baroque-v2-dark-blue/frame.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 335896,
        "md5": "cf9b36a00cdcc69dd480da11ae534791",
        "type": "frame",
        "usage": "Framing border or arch for baroque-v2-dark-blue"
      }
    ]
  },
  "baroque-v2-dark-green": {
    "themeId": "baroque-v2-dark-green",
    "folder": "baroque-v2-dark-green",
    "assetCount": 1,
    "totalBytes": 305692,
    "assets": [
      {
        "id": "frame",
        "file": "frame.webp",
        "path": "/images/themes/baroque-v2-dark-green/frame.webp",
        "format": "WEBP",
        "width": 1118,
        "height": 1407,
        "aspectRatio": 0.795,
        "size": 305692,
        "md5": "32535ae75635388e876a5bd5e1504bfb",
        "type": "frame",
        "usage": "Framing border or arch for baroque-v2-dark-green"
      }
    ]
  },
  "baroque-v2-dark-red": {
    "themeId": "baroque-v2-dark-red",
    "folder": "baroque-v2-dark-red",
    "assetCount": 1,
    "totalBytes": 305360,
    "assets": [
      {
        "id": "frame",
        "file": "frame.webp",
        "path": "/images/themes/baroque-v2-dark-red/frame.webp",
        "format": "WEBP",
        "width": 1237,
        "height": 1254,
        "aspectRatio": 0.986,
        "size": 305360,
        "md5": "3547a272db7e132f269b06bdf38b549a",
        "type": "frame",
        "usage": "Framing border or arch for baroque-v2-dark-red"
      }
    ]
  },
  "black-v1": {
    "themeId": "black-v1",
    "folder": "black-v1",
    "assetCount": 1,
    "totalBytes": 239,
    "assets": [
      {
        "id": "line6",
        "file": "line6.svg",
        "path": "/images/themes/black-v1/line6.svg",
        "format": "SVG",
        "width": 25,
        "height": 1,
        "aspectRatio": 25.0,
        "size": 239,
        "md5": "bf280ffbfa5ff0fa8d496b024b1a6fda",
        "type": "divider",
        "usage": "Decorative divider line for black-v1"
      }
    ]
  },
  "boho-floral-brown": {
    "themeId": "boho-floral-brown",
    "folder": "boho-floral-brown",
    "assetCount": 4,
    "totalBytes": 513792,
    "assets": [
      {
        "id": "decoration_bar",
        "file": "decoration_bar.webp",
        "path": "/images/themes/boho-floral-brown/decoration_bar.webp",
        "format": "WEBP",
        "width": 3304,
        "height": 421,
        "aspectRatio": 7.848,
        "size": 44404,
        "md5": "884cc803cee8b4c0b36ed9aa7ae84c8e",
        "type": "decoration",
        "usage": "Ornamental artwork for boho-floral-brown"
      },
      {
        "id": "fixed_flower",
        "file": "fixed_flower.webp",
        "path": "/images/themes/boho-floral-brown/fixed_flower.webp",
        "format": "WEBP",
        "width": 1120,
        "height": 1482,
        "aspectRatio": 0.756,
        "size": 101106,
        "md5": "bb522b984196d488a1cc35f31d517616",
        "type": "decoration",
        "usage": "Decorative element (fixed_flower) for boho-floral-brown"
      },
      {
        "id": "flower_bottom",
        "file": "flower_bottom.webp",
        "path": "/images/themes/boho-floral-brown/flower_bottom.webp",
        "format": "WEBP",
        "width": 779,
        "height": 984,
        "aspectRatio": 0.792,
        "size": 33532,
        "md5": "2109b04c2973b83e2e548508dee15edf",
        "type": "decoration",
        "usage": "Decorative element (flower_bottom) for boho-floral-brown"
      },
      {
        "id": "flower_top",
        "file": "flower_top.webp",
        "path": "/images/themes/boho-floral-brown/flower_top.webp",
        "format": "WEBP",
        "width": 2554,
        "height": 2595,
        "aspectRatio": 0.984,
        "size": 334750,
        "md5": "4aaa70aea655d0dd2f4b5c95945b8538",
        "type": "decoration",
        "usage": "Decorative element (flower_top) for boho-floral-brown"
      }
    ]
  },
  "boho-floral-green": {
    "themeId": "boho-floral-green",
    "folder": "boho-floral-green",
    "assetCount": 2,
    "totalBytes": 650398,
    "assets": [
      {
        "id": "decoration_bar",
        "file": "decoration_bar.webp",
        "path": "/images/themes/boho-floral-green/decoration_bar.webp",
        "format": "WEBP",
        "width": 3304,
        "height": 421,
        "aspectRatio": 7.848,
        "size": 153632,
        "md5": "ea0b95514b68e87de39f93af2931910a",
        "type": "decoration",
        "usage": "Ornamental artwork for boho-floral-green"
      },
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/boho-floral-green/flower.webp",
        "format": "WEBP",
        "width": 1800,
        "height": 1800,
        "aspectRatio": 1.0,
        "size": 496766,
        "md5": "91f18d3af81dcbeb8db99f916b894fac",
        "type": "decoration",
        "usage": "Decorative element (flower) for boho-floral-green"
      }
    ]
  },
  "boho-floral-pink": {
    "themeId": "boho-floral-pink",
    "folder": "boho-floral-pink",
    "assetCount": 2,
    "totalBytes": 107854,
    "assets": [
      {
        "id": "asset_1",
        "file": "asset_1.webp",
        "path": "/images/themes/boho-floral-pink/asset_1.webp",
        "format": "WEBP",
        "width": 987,
        "height": 971,
        "aspectRatio": 1.016,
        "size": 53336,
        "md5": "e3a5586d0caa8e5696dcd896dcfbdaf5",
        "type": "decoration",
        "usage": "Ornamental artwork for boho-floral-pink"
      },
      {
        "id": "asset_2",
        "file": "asset_2.webp",
        "path": "/images/themes/boho-floral-pink/asset_2.webp",
        "format": "WEBP",
        "width": 581,
        "height": 1066,
        "aspectRatio": 0.545,
        "size": 54518,
        "md5": "ec7aed8f48ea2032da157f17111d6091",
        "type": "decoration",
        "usage": "Ornamental artwork for boho-floral-pink"
      }
    ]
  },
  "chateau-blue": {
    "themeId": "chateau-blue",
    "folder": "chateau-blue",
    "assetCount": 7,
    "totalBytes": 946776,
    "assets": [
      {
        "id": "asset-1",
        "file": "asset-1.webp",
        "path": "/images/themes/chateau-blue/asset-1.webp",
        "format": "WEBP",
        "width": 363,
        "height": 30,
        "aspectRatio": 12.1,
        "size": 1948,
        "md5": "c9aa18a74b0164e2b9e137cf988b36ed",
        "type": "decoration",
        "usage": "Ornamental artwork for chateau-blue"
      },
      {
        "id": "asset-2",
        "file": "asset-2.webp",
        "path": "/images/themes/chateau-blue/asset-2.webp",
        "format": "WEBP",
        "width": 506,
        "height": 133,
        "aspectRatio": 3.805,
        "size": 9962,
        "md5": "9517305ef3353a19d64be8d290189aa1",
        "type": "decoration",
        "usage": "Ornamental artwork for chateau-blue"
      },
      {
        "id": "cloud-1",
        "file": "cloud-1.webp",
        "path": "/images/themes/chateau-blue/cloud-1.webp",
        "format": "WEBP",
        "width": 581,
        "height": 383,
        "aspectRatio": 1.517,
        "size": 63514,
        "md5": "c7273de823558d744c58432edb915dbb",
        "type": "decoration",
        "usage": "Decorative element (cloud-1) for chateau-blue"
      },
      {
        "id": "cloud-2",
        "file": "cloud-2.webp",
        "path": "/images/themes/chateau-blue/cloud-2.webp",
        "format": "WEBP",
        "width": 761,
        "height": 247,
        "aspectRatio": 3.081,
        "size": 55290,
        "md5": "97a526a6467704654da7c4cc278496af",
        "type": "decoration",
        "usage": "Decorative element (cloud-2) for chateau-blue"
      },
      {
        "id": "cloud-3",
        "file": "cloud-3.webp",
        "path": "/images/themes/chateau-blue/cloud-3.webp",
        "format": "WEBP",
        "width": 477,
        "height": 202,
        "aspectRatio": 2.361,
        "size": 33724,
        "md5": "60d23b5f2d620ff8dd376d097d579c25",
        "type": "decoration",
        "usage": "Decorative element (cloud-3) for chateau-blue"
      },
      {
        "id": "hoa",
        "file": "hoa.webp",
        "path": "/images/themes/chateau-blue/hoa.webp",
        "format": "WEBP",
        "width": 642,
        "height": 809,
        "aspectRatio": 0.794,
        "size": 145704,
        "md5": "b6c232b909eb82d61b22d4be9bf48c7c",
        "type": "decoration",
        "usage": "Decorative element (hoa) for chateau-blue"
      },
      {
        "id": "home",
        "file": "home.webp",
        "path": "/images/themes/chateau-blue/home.webp",
        "format": "WEBP",
        "width": 1536,
        "height": 1024,
        "aspectRatio": 1.5,
        "size": 636634,
        "md5": "128e4fc5a016a2b9e5077df6f8c98a91",
        "type": "decoration",
        "usage": "Ornamental artwork for chateau-blue"
      }
    ]
  },
  "chateau-green": {
    "themeId": "chateau-green",
    "folder": "chateau-green",
    "assetCount": 6,
    "totalBytes": 1411056,
    "assets": [
      {
        "id": "chateau",
        "file": "chateau.webp",
        "path": "/images/themes/chateau-green/chateau.webp",
        "format": "WEBP",
        "width": 1944,
        "height": 1456,
        "aspectRatio": 1.335,
        "size": 954182,
        "md5": "737086f00e4f0865be1a77bf8c13dd80",
        "type": "decoration",
        "usage": "Ornamental artwork for chateau-green"
      },
      {
        "id": "cloud-1",
        "file": "cloud-1.webp",
        "path": "/images/themes/chateau-green/cloud-1.webp",
        "format": "WEBP",
        "width": 1728,
        "height": 645,
        "aspectRatio": 2.679,
        "size": 200440,
        "md5": "49113ffae473692ff4197e14011a0432",
        "type": "decoration",
        "usage": "Decorative element (cloud-1) for chateau-green"
      },
      {
        "id": "cloud-2",
        "file": "cloud-2.webp",
        "path": "/images/themes/chateau-green/cloud-2.webp",
        "format": "WEBP",
        "width": 921,
        "height": 402,
        "aspectRatio": 2.291,
        "size": 98104,
        "md5": "9d802f5c7ea2e9bb5a5a45e7784cd6fc",
        "type": "decoration",
        "usage": "Decorative element (cloud-2) for chateau-green"
      },
      {
        "id": "cloud-3",
        "file": "cloud-3.webp",
        "path": "/images/themes/chateau-green/cloud-3.webp",
        "format": "WEBP",
        "width": 1464,
        "height": 516,
        "aspectRatio": 2.837,
        "size": 142178,
        "md5": "c16e4235a697a82f388040d5dc70ae2b",
        "type": "decoration",
        "usage": "Decorative element (cloud-3) for chateau-green"
      },
      {
        "id": "divider-arrow",
        "file": "divider-arrow.webp",
        "path": "/images/themes/chateau-green/divider-arrow.webp",
        "format": "WEBP",
        "width": 144,
        "height": 12,
        "aspectRatio": 12.0,
        "size": 1796,
        "md5": "ef846bb34b43acea287cd15539fe37da",
        "type": "divider",
        "usage": "Decorative divider line for chateau-green"
      },
      {
        "id": "ornament",
        "file": "ornament.webp",
        "path": "/images/themes/chateau-green/ornament.webp",
        "format": "WEBP",
        "width": 320,
        "height": 84,
        "aspectRatio": 3.81,
        "size": 14356,
        "md5": "d1b182f12cd7d04b48b2493479446762",
        "type": "decoration",
        "usage": "Ornamental artwork for chateau-green"
      }
    ]
  },
  "chibi_red": {
    "themeId": "chibi_red",
    "folder": "chibi_red",
    "assetCount": 3,
    "totalBytes": 156124,
    "assets": [
      {
        "id": "couple-main",
        "file": "couple-main.webp",
        "path": "/images/themes/chibi_red/couple-main.webp",
        "format": "WEBP",
        "width": 1113,
        "height": 1400,
        "aspectRatio": 0.795,
        "size": 131806,
        "md5": "4f2aa3c79177d88ec5fc2cd96f31dbfc",
        "type": "decoration",
        "usage": "Ornamental artwork for chibi_red"
      },
      {
        "id": "decorative-flowers",
        "file": "decorative-flowers.webp",
        "path": "/images/themes/chibi_red/decorative-flowers.webp",
        "format": "WEBP",
        "width": 1090,
        "height": 639,
        "aspectRatio": 1.706,
        "size": 10296,
        "md5": "c02f4c4821ae96bf057e2e788ae2e1e1",
        "type": "decoration",
        "usage": "Decorative element (decorative-flowers) for chibi_red"
      },
      {
        "id": "double-happiness",
        "file": "double-happiness.webp",
        "path": "/images/themes/chibi_red/double-happiness.webp",
        "format": "WEBP",
        "width": 288,
        "height": 247,
        "aspectRatio": 1.166,
        "size": 14022,
        "md5": "f52a6f8982f1968a2b5da94e360e3901",
        "type": "decoration",
        "usage": "Ornamental artwork for chibi_red"
      }
    ]
  },
  "coba-red": {
    "themeId": "coba-red",
    "folder": "coba-red",
    "assetCount": 2,
    "totalBytes": 554346,
    "assets": [
      {
        "id": "cho-ben-thanh",
        "file": "cho-ben-thanh.webp",
        "path": "/images/themes/coba-red/cho-ben-thanh.webp",
        "format": "WEBP",
        "width": 1200,
        "height": 937,
        "aspectRatio": 1.281,
        "size": 276260,
        "md5": "64897c7c087cce8f560e1ca964992717",
        "type": "decoration",
        "usage": "Ornamental artwork for coba-red"
      },
      {
        "id": "dau-re",
        "file": "dau-re.webp",
        "path": "/images/themes/coba-red/dau-re.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 1536,
        "aspectRatio": 0.667,
        "size": 278086,
        "md5": "d466c837323ec8363769722e382ddf79",
        "type": "decoration",
        "usage": "Ornamental artwork for coba-red"
      }
    ]
  },
  "crystal-floral-blue": {
    "themeId": "crystal-floral-blue",
    "folder": "crystal-floral-blue",
    "assetCount": 4,
    "totalBytes": 2199708,
    "assets": [
      {
        "id": "flower-frame",
        "file": "flower-frame.webp",
        "path": "/images/themes/crystal-floral-blue/flower-frame.webp",
        "format": "WEBP",
        "width": 2067,
        "height": 2770,
        "aspectRatio": 0.746,
        "size": 586188,
        "md5": "1bbe5c84b678388fb939af330a1707d1",
        "type": "frame",
        "usage": "Framing border or arch for crystal-floral-blue"
      },
      {
        "id": "flower1",
        "file": "flower1.webp",
        "path": "/images/themes/crystal-floral-blue/flower1.webp",
        "format": "WEBP",
        "width": 3935,
        "height": 1381,
        "aspectRatio": 2.849,
        "size": 748654,
        "md5": "7d90556097024538d033aa2f3db89bb5",
        "type": "decoration",
        "usage": "Decorative element (flower1) for crystal-floral-blue"
      },
      {
        "id": "flower2",
        "file": "flower2.webp",
        "path": "/images/themes/crystal-floral-blue/flower2.webp",
        "format": "WEBP",
        "width": 1370,
        "height": 2508,
        "aspectRatio": 0.546,
        "size": 443184,
        "md5": "e50160b6f55860c18f5f53eed660d7a7",
        "type": "decoration",
        "usage": "Decorative element (flower2) for crystal-floral-blue"
      },
      {
        "id": "flower3",
        "file": "flower3.webp",
        "path": "/images/themes/crystal-floral-blue/flower3.webp",
        "format": "WEBP",
        "width": 1308,
        "height": 2508,
        "aspectRatio": 0.522,
        "size": 421682,
        "md5": "7144f814fbfa8cbcac1905bac3c7c7f8",
        "type": "decoration",
        "usage": "Decorative element (flower3) for crystal-floral-blue"
      }
    ]
  },
  "crystal-floral-green": {
    "themeId": "crystal-floral-green",
    "folder": "crystal-floral-green",
    "assetCount": 4,
    "totalBytes": 1315208,
    "assets": [
      {
        "id": "flower-frame",
        "file": "flower-frame.webp",
        "path": "/images/themes/crystal-floral-green/flower-frame.webp",
        "format": "WEBP",
        "width": 1125,
        "height": 1537,
        "aspectRatio": 0.732,
        "size": 307558,
        "md5": "a396fe3c785413cdee57b41b62dd72eb",
        "type": "frame",
        "usage": "Framing border or arch for crystal-floral-green"
      },
      {
        "id": "flower1",
        "file": "flower1.webp",
        "path": "/images/themes/crystal-floral-green/flower1.webp",
        "format": "WEBP",
        "width": 2130,
        "height": 732,
        "aspectRatio": 2.91,
        "size": 327750,
        "md5": "706bd2c144d4e8b76f61d75b1d26aa4c",
        "type": "decoration",
        "usage": "Decorative element (flower1) for crystal-floral-green"
      },
      {
        "id": "flower2",
        "file": "flower2.webp",
        "path": "/images/themes/crystal-floral-green/flower2.webp",
        "format": "WEBP",
        "width": 909,
        "height": 1730,
        "aspectRatio": 0.525,
        "size": 331856,
        "md5": "8f7fd2dd18394d486273f9e1ffbc074c",
        "type": "decoration",
        "usage": "Decorative element (flower2) for crystal-floral-green"
      },
      {
        "id": "flower3",
        "file": "flower3.webp",
        "path": "/images/themes/crystal-floral-green/flower3.webp",
        "format": "WEBP",
        "width": 918,
        "height": 1714,
        "aspectRatio": 0.536,
        "size": 348044,
        "md5": "9aa21b8daf91eea239edb78b0c893b48",
        "type": "decoration",
        "usage": "Decorative element (flower3) for crystal-floral-green"
      }
    ]
  },
  "crystal-floral-red": {
    "themeId": "crystal-floral-red",
    "folder": "crystal-floral-red",
    "assetCount": 4,
    "totalBytes": 1239714,
    "assets": [
      {
        "id": "flower-frame",
        "file": "flower-frame.webp",
        "path": "/images/themes/crystal-floral-red/flower-frame.webp",
        "format": "WEBP",
        "width": 927,
        "height": 1311,
        "aspectRatio": 0.707,
        "size": 273710,
        "md5": "d44d21afa03381739e5ff35d29c91851",
        "type": "frame",
        "usage": "Framing border or arch for crystal-floral-red"
      },
      {
        "id": "flower1",
        "file": "flower1.webp",
        "path": "/images/themes/crystal-floral-red/flower1.webp",
        "format": "WEBP",
        "width": 2171,
        "height": 724,
        "aspectRatio": 2.999,
        "size": 370330,
        "md5": "2d4b1305afdf65ee88042a5e67067958",
        "type": "decoration",
        "usage": "Decorative element (flower1) for crystal-floral-red"
      },
      {
        "id": "flower2",
        "file": "flower2.webp",
        "path": "/images/themes/crystal-floral-red/flower2.webp",
        "format": "WEBP",
        "width": 910,
        "height": 1728,
        "aspectRatio": 0.527,
        "size": 322230,
        "md5": "909d74fb2975ce2296bde451a309b20f",
        "type": "decoration",
        "usage": "Decorative element (flower2) for crystal-floral-red"
      },
      {
        "id": "flower3",
        "file": "flower3.webp",
        "path": "/images/themes/crystal-floral-red/flower3.webp",
        "format": "WEBP",
        "width": 806,
        "height": 1536,
        "aspectRatio": 0.525,
        "size": 273444,
        "md5": "eece385b005c914575a4925e10adbeea",
        "type": "decoration",
        "usage": "Decorative element (flower3) for crystal-floral-red"
      }
    ]
  },
  "dried-flower-v2-green": {
    "themeId": "dried-flower-v2-green",
    "folder": "dried-flower-v2-green",
    "assetCount": 1,
    "totalBytes": 386470,
    "assets": [
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/dried-flower-v2-green/flower.webp",
        "format": "WEBP",
        "width": 1086,
        "height": 1448,
        "aspectRatio": 0.75,
        "size": 386470,
        "md5": "a2e290b48e791f61ce8df0c2673105be",
        "type": "decoration",
        "usage": "Decorative element (flower) for dried-flower-v2-green"
      }
    ]
  },
  "florence-brown": {
    "themeId": "florence-brown",
    "folder": "florence-brown",
    "assetCount": 3,
    "totalBytes": 277330,
    "assets": [
      {
        "id": "cloud1-background",
        "file": "cloud1-background.webp",
        "path": "/images/themes/florence-brown/cloud1-background.webp",
        "format": "WEBP",
        "width": 1350,
        "height": 675,
        "aspectRatio": 2.0,
        "size": 105568,
        "md5": "4d894589f50cbf87392d4d1c5245a70a",
        "type": "background",
        "usage": "Background paper or ambient texture for florence-brown"
      },
      {
        "id": "cloud2-background",
        "file": "cloud2-background.webp",
        "path": "/images/themes/florence-brown/cloud2-background.webp",
        "format": "WEBP",
        "width": 920,
        "height": 922,
        "aspectRatio": 0.998,
        "size": 93604,
        "md5": "85da9c62e4c9539ac27a9d2949687ff4",
        "type": "background",
        "usage": "Background paper or ambient texture for florence-brown"
      },
      {
        "id": "cloud3-background",
        "file": "cloud3-background.webp",
        "path": "/images/themes/florence-brown/cloud3-background.webp",
        "format": "WEBP",
        "width": 920,
        "height": 612,
        "aspectRatio": 1.503,
        "size": 78158,
        "md5": "bd2024bab48ed5c0063094802ddbd0bc",
        "type": "background",
        "usage": "Background paper or ambient texture for florence-brown"
      }
    ]
  },
  "glass-garden-blue": {
    "themeId": "glass-garden-blue",
    "folder": "glass-garden-blue",
    "assetCount": 2,
    "totalBytes": 639602,
    "assets": [
      {
        "id": "floral-background",
        "file": "floral-background.webp",
        "path": "/images/themes/glass-garden-blue/floral-background.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 379296,
        "md5": "99b187c77463752e6194001880e50794",
        "type": "background",
        "usage": "Background paper or ambient texture for glass-garden-blue"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/glass-garden-blue/flower2-decoration.webp",
        "format": "WEBP",
        "width": 1043,
        "height": 1163,
        "aspectRatio": 0.897,
        "size": 260306,
        "md5": "03ba9960b0e18f10eaca09307f9ff85a",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for glass-garden-blue"
      }
    ]
  },
  "glass-garden-green": {
    "themeId": "glass-garden-green",
    "folder": "glass-garden-green",
    "assetCount": 2,
    "totalBytes": 678526,
    "assets": [
      {
        "id": "floral-background",
        "file": "floral-background.webp",
        "path": "/images/themes/glass-garden-green/floral-background.webp",
        "format": "WEBP",
        "width": 941,
        "height": 1672,
        "aspectRatio": 0.563,
        "size": 282408,
        "md5": "c5b55a8009242036afeed9442df7ede6",
        "type": "background",
        "usage": "Background paper or ambient texture for glass-garden-green"
      },
      {
        "id": "flower1-decoration",
        "file": "flower1-decoration.webp",
        "path": "/images/themes/glass-garden-green/flower1-decoration.webp",
        "format": "WEBP",
        "width": 2334,
        "height": 1803,
        "aspectRatio": 1.295,
        "size": 396118,
        "md5": "b8d704dcdb4dc6b59464a2e79fddd748",
        "type": "decoration",
        "usage": "Decorative element (flower1-decoration) for glass-garden-green"
      }
    ]
  },
  "glass-garden-pink": {
    "themeId": "glass-garden-pink",
    "folder": "glass-garden-pink",
    "assetCount": 3,
    "totalBytes": 469600,
    "assets": [
      {
        "id": "floral-background",
        "file": "floral-background.webp",
        "path": "/images/themes/glass-garden-pink/floral-background.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 30368,
        "md5": "b528fcabeaf070d5f1074d20b8e9393a",
        "type": "background",
        "usage": "Background paper or ambient texture for glass-garden-pink"
      },
      {
        "id": "flower1-decoration",
        "file": "flower1-decoration.webp",
        "path": "/images/themes/glass-garden-pink/flower1-decoration.webp",
        "format": "WEBP",
        "width": 1122,
        "height": 1402,
        "aspectRatio": 0.8,
        "size": 126814,
        "md5": "7c0aef9c83d486416ad2049b42483de0",
        "type": "decoration",
        "usage": "Decorative element (flower1-decoration) for glass-garden-pink"
      },
      {
        "id": "leaf1-bloom",
        "file": "leaf1-bloom.webp",
        "path": "/images/themes/glass-garden-pink/leaf1-bloom.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 312418,
        "md5": "6bf81adabf1fa0f0283f6de33611c986",
        "type": "decoration",
        "usage": "Decorative element (leaf1-bloom) for glass-garden-pink"
      }
    ]
  },
  "hoa-dai-pink": {
    "themeId": "hoa-dai-pink",
    "folder": "hoa-dai-pink",
    "assetCount": 1,
    "totalBytes": 250950,
    "assets": [
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/hoa-dai-pink/flower2-decoration.webp",
        "format": "WEBP",
        "width": 1213,
        "height": 1296,
        "aspectRatio": 0.936,
        "size": 250950,
        "md5": "eb0ea8d74181a3eb644fc3ab5b82c5f3",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for hoa-dai-pink"
      }
    ]
  },
  "hoa-kho-orange": {
    "themeId": "hoa-kho-orange",
    "folder": "hoa-kho-orange",
    "assetCount": 3,
    "totalBytes": 849982,
    "assets": [
      {
        "id": "flower2",
        "file": "flower2.webp",
        "path": "/images/themes/hoa-kho-orange/flower2.webp",
        "format": "WEBP",
        "width": 1200,
        "height": 960,
        "aspectRatio": 1.25,
        "size": 341680,
        "md5": "74eda139f9bf8861e6c7d8b3506afad6",
        "type": "decoration",
        "usage": "Decorative element (flower2) for hoa-kho-orange"
      },
      {
        "id": "flower3",
        "file": "flower3.webp",
        "path": "/images/themes/hoa-kho-orange/flower3.webp",
        "format": "WEBP",
        "width": 960,
        "height": 1200,
        "aspectRatio": 0.8,
        "size": 239570,
        "md5": "b55e531ea8a1aaf6825280f089732507",
        "type": "decoration",
        "usage": "Decorative element (flower3) for hoa-kho-orange"
      },
      {
        "id": "flower4",
        "file": "flower4.webp",
        "path": "/images/themes/hoa-kho-orange/flower4.webp",
        "format": "WEBP",
        "width": 858,
        "height": 1200,
        "aspectRatio": 0.715,
        "size": 268732,
        "md5": "670b2f05fbfbc83ffb920ce5b47f2e27",
        "type": "decoration",
        "usage": "Decorative element (flower4) for hoa-kho-orange"
      }
    ]
  },
  "hoa-kho-v2-blue": {
    "themeId": "hoa-kho-v2-blue",
    "folder": "hoa-kho-v2-blue",
    "assetCount": 2,
    "totalBytes": 616192,
    "assets": [
      {
        "id": "butterfly",
        "file": "butterfly.webp",
        "path": "/images/themes/hoa-kho-v2-blue/butterfly.webp",
        "format": "WEBP",
        "width": 760,
        "height": 619,
        "aspectRatio": 1.228,
        "size": 122854,
        "md5": "90a1681694b82711135cf5ee49b16bdc",
        "type": "decoration",
        "usage": "Decorative element (butterfly) for hoa-kho-v2-blue"
      },
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/hoa-kho-v2-blue/flower.webp",
        "format": "WEBP",
        "width": 1122,
        "height": 1402,
        "aspectRatio": 0.8,
        "size": 493338,
        "md5": "348d5fce80e8ecef835ab1d03da03935",
        "type": "decoration",
        "usage": "Decorative element (flower) for hoa-kho-v2-blue"
      }
    ]
  },
  "lien-hoa-pink": {
    "themeId": "lien-hoa-pink",
    "folder": "lien-hoa-pink",
    "assetCount": 4,
    "totalBytes": 477146,
    "assets": [
      {
        "id": "flower2",
        "file": "flower2.webp",
        "path": "/images/themes/lien-hoa-pink/flower2.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 88420,
        "md5": "a18451daa2aa4f73f55e9a304f84541c",
        "type": "decoration",
        "usage": "Decorative element (flower2) for lien-hoa-pink"
      },
      {
        "id": "flower3",
        "file": "flower3.webp",
        "path": "/images/themes/lien-hoa-pink/flower3.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 1536,
        "aspectRatio": 0.667,
        "size": 142410,
        "md5": "a7f9329da72e1057325b8ec31fdcd2cb",
        "type": "decoration",
        "usage": "Decorative element (flower3) for lien-hoa-pink"
      },
      {
        "id": "framegold1",
        "file": "framegold1.webp",
        "path": "/images/themes/lien-hoa-pink/framegold1.webp",
        "format": "WEBP",
        "width": 1500,
        "height": 2100,
        "aspectRatio": 0.714,
        "size": 53284,
        "md5": "90fa7ee3534e2406e4a95e5c680d6666",
        "type": "frame",
        "usage": "Framing border or arch for lien-hoa-pink"
      },
      {
        "id": "hoa-sen-bg",
        "file": "hoa-sen-bg.webp",
        "path": "/images/themes/lien-hoa-pink/hoa-sen-bg.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 193032,
        "md5": "372df3461c1561c90a81decbbea6fe56",
        "type": "background",
        "usage": "Background paper or ambient texture for lien-hoa-pink"
      }
    ]
  },
  "lien-hoa-v2-green": {
    "themeId": "lien-hoa-v2-green",
    "folder": "lien-hoa-v2-green",
    "assetCount": 3,
    "totalBytes": 732522,
    "assets": [
      {
        "id": "flower10",
        "file": "flower10.webp",
        "path": "/images/themes/lien-hoa-v2-green/flower10.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1200,
        "aspectRatio": 0.75,
        "size": 240272,
        "md5": "7a2e55e387da6140a7c2500c43b17b39",
        "type": "decoration",
        "usage": "Decorative element (flower10) for lien-hoa-v2-green"
      },
      {
        "id": "flower3",
        "file": "flower3.webp",
        "path": "/images/themes/lien-hoa-v2-green/flower3.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1409,
        "aspectRatio": 0.639,
        "size": 260966,
        "md5": "3acc1ef4df996ca5175236d0c964a6b2",
        "type": "decoration",
        "usage": "Decorative element (flower3) for lien-hoa-v2-green"
      },
      {
        "id": "flower6",
        "file": "flower6.webp",
        "path": "/images/themes/lien-hoa-v2-green/flower6.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1311,
        "aspectRatio": 0.686,
        "size": 231284,
        "md5": "713e9b30ce7211195dc1b404a51090c4",
        "type": "decoration",
        "usage": "Decorative element (flower6) for lien-hoa-v2-green"
      }
    ]
  },
  "longphung-v2-red": {
    "themeId": "longphung-v2-red",
    "folder": "longphung-v2-red",
    "assetCount": 6,
    "totalBytes": 1409070,
    "assets": [
      {
        "id": "bg-frame",
        "file": "bg-frame.jpg",
        "path": "/images/themes/longphung-v2-red/bg-frame.jpg",
        "format": "JPEG",
        "width": 900,
        "height": 6000,
        "aspectRatio": 0.15,
        "size": 619088,
        "md5": "1a8c3fbbaf3cae302a2b1f91fb5199b6",
        "type": "background",
        "usage": "Background paper or ambient texture for longphung-v2-red"
      },
      {
        "id": "chu-hy",
        "file": "chu-hy.webp",
        "path": "/images/themes/longphung-v2-red/chu-hy.webp",
        "format": "WEBP",
        "width": 1272,
        "height": 1271,
        "aspectRatio": 1.001,
        "size": 7526,
        "md5": "4cd48bab6fc8d1828e904fd3e1525ab8",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for longphung-v2-red"
      },
      {
        "id": "cloud",
        "file": "cloud.webp",
        "path": "/images/themes/longphung-v2-red/cloud.webp",
        "format": "WEBP",
        "width": 3805,
        "height": 1797,
        "aspectRatio": 2.117,
        "size": 96164,
        "md5": "b3fd39e66e941fe1984bfede2fbbf146",
        "type": "decoration",
        "usage": "Decorative element (cloud) for longphung-v2-red"
      },
      {
        "id": "phuong",
        "file": "phuong.webp",
        "path": "/images/themes/longphung-v2-red/phuong.webp",
        "format": "WEBP",
        "width": 1489,
        "height": 2239,
        "aspectRatio": 0.665,
        "size": 184732,
        "md5": "2e936089fd7614b32f0c905b80a019b8",
        "type": "decoration",
        "usage": "Decorative element (phuong) for longphung-v2-red"
      },
      {
        "id": "rong-phuong",
        "file": "rong-phuong.webp",
        "path": "/images/themes/longphung-v2-red/rong-phuong.webp",
        "format": "WEBP",
        "width": 1200,
        "height": 2352,
        "aspectRatio": 0.51,
        "size": 271586,
        "md5": "ada256bc652cdcd99b0f3a3bb3409a07",
        "type": "decoration",
        "usage": "Decorative element (rong-phuong) for longphung-v2-red"
      },
      {
        "id": "rong",
        "file": "rong.webp",
        "path": "/images/themes/longphung-v2-red/rong.webp",
        "format": "WEBP",
        "width": 1560,
        "height": 2204,
        "aspectRatio": 0.708,
        "size": 229974,
        "md5": "559be98ee60367647b38c95c88495524",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v2-red"
      }
    ]
  },
  "longphung-v3-red": {
    "themeId": "longphung-v3-red",
    "folder": "longphung-v3-red",
    "assetCount": 7,
    "totalBytes": 577751,
    "assets": [
      {
        "id": "chim-en",
        "file": "chim-en.webp",
        "path": "/images/themes/longphung-v3-red/chim-en.webp",
        "format": "WEBP",
        "width": 293,
        "height": 324,
        "aspectRatio": 0.904,
        "size": 19192,
        "md5": "224969bdf997efb0cc8430186c09ef80",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v3-red"
      },
      {
        "id": "chu-hy",
        "file": "chu-hy.webp",
        "path": "/images/themes/longphung-v3-red/chu-hy.webp",
        "format": "WEBP",
        "width": 658,
        "height": 658,
        "aspectRatio": 1.0,
        "size": 64536,
        "md5": "9819b2f2c23fac45e9918e31811f86f9",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for longphung-v3-red"
      },
      {
        "id": "frame-calendar",
        "file": "frame-calendar.webp",
        "path": "/images/themes/longphung-v3-red/frame-calendar.webp",
        "format": "WEBP",
        "width": 2100,
        "height": 1608,
        "aspectRatio": 1.306,
        "size": 23924,
        "md5": "fdaabb50823b2fd4890f3b927c0e4e6b",
        "type": "frame",
        "usage": "Framing border or arch for longphung-v3-red"
      },
      {
        "id": "frame-title",
        "file": "frame-title.svg",
        "path": "/images/themes/longphung-v3-red/frame-title.svg",
        "format": "SVG",
        "width": 541,
        "height": 89,
        "aspectRatio": 6.079,
        "size": 709,
        "md5": "4f3a2cae994ea2e522adda6ca5ba8a75",
        "type": "frame",
        "usage": "Framing border or arch for longphung-v3-red"
      },
      {
        "id": "frame",
        "file": "frame.svg",
        "path": "/images/themes/longphung-v3-red/frame.svg",
        "format": "SVG",
        "width": 754,
        "height": 1099,
        "aspectRatio": 0.686,
        "size": 4604,
        "md5": "7d33add75da177d58b3424cccf9ec6e3",
        "type": "frame",
        "usage": "Framing border or arch for longphung-v3-red"
      },
      {
        "id": "phung",
        "file": "phung.webp",
        "path": "/images/themes/longphung-v3-red/phung.webp",
        "format": "WEBP",
        "width": 1241,
        "height": 1278,
        "aspectRatio": 0.971,
        "size": 200588,
        "md5": "63fbeed27a37ae5247aac83435251191",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v3-red"
      },
      {
        "id": "rong",
        "file": "rong.webp",
        "path": "/images/themes/longphung-v3-red/rong.webp",
        "format": "WEBP",
        "width": 1424,
        "height": 1338,
        "aspectRatio": 1.064,
        "size": 264198,
        "md5": "0cfd1704d883eef6369d03fe05ff663f",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v3-red"
      }
    ]
  },
  "longphung-v4-red": {
    "themeId": "longphung-v4-red",
    "folder": "longphung-v4-red",
    "assetCount": 16,
    "totalBytes": 1901444,
    "assets": [
      {
        "id": "bg-texture",
        "file": "bg-texture.webp",
        "path": "/images/themes/longphung-v4-red/bg-texture.webp",
        "format": "WEBP",
        "width": 900,
        "height": 600,
        "aspectRatio": 1.5,
        "size": 63336,
        "md5": "f0b27156111e6aeac605dcea14aa2930",
        "type": "background",
        "usage": "Background paper or ambient texture for longphung-v4-red"
      },
      {
        "id": "cake",
        "file": "cake.webp",
        "path": "/images/themes/longphung-v4-red/cake.webp",
        "format": "WEBP",
        "width": 288,
        "height": 300,
        "aspectRatio": 0.96,
        "size": 21964,
        "md5": "f6e4ec771fbbf9315f13960d64cff962",
        "type": "divider",
        "usage": "Decorative divider line for longphung-v4-red"
      },
      {
        "id": "cloud1",
        "file": "cloud1.webp",
        "path": "/images/themes/longphung-v4-red/cloud1.webp",
        "format": "WEBP",
        "width": 700,
        "height": 700,
        "aspectRatio": 1.0,
        "size": 120432,
        "md5": "82b2c7f74b0ab4fabb656bc464af4f60",
        "type": "decoration",
        "usage": "Decorative element (cloud1) for longphung-v4-red"
      },
      {
        "id": "cloud2",
        "file": "cloud2.webp",
        "path": "/images/themes/longphung-v4-red/cloud2.webp",
        "format": "WEBP",
        "width": 900,
        "height": 514,
        "aspectRatio": 1.751,
        "size": 168668,
        "md5": "8d031d94ffcfd405d20432c43ade139a",
        "type": "decoration",
        "usage": "Decorative element (cloud2) for longphung-v4-red"
      },
      {
        "id": "cloud2b",
        "file": "cloud2b.webp",
        "path": "/images/themes/longphung-v4-red/cloud2b.webp",
        "format": "WEBP",
        "width": 733,
        "height": 800,
        "aspectRatio": 0.916,
        "size": 182218,
        "md5": "f073de851a96c40cf9ba3db5693b12f1",
        "type": "decoration",
        "usage": "Decorative element (cloud2b) for longphung-v4-red"
      },
      {
        "id": "cloud3",
        "file": "cloud3.webp",
        "path": "/images/themes/longphung-v4-red/cloud3.webp",
        "format": "WEBP",
        "width": 700,
        "height": 350,
        "aspectRatio": 2.0,
        "size": 69474,
        "md5": "7e8c130940f3baa5ee64e1fa3f1f0f8c",
        "type": "decoration",
        "usage": "Decorative element (cloud3) for longphung-v4-red"
      },
      {
        "id": "cloud4-bottom",
        "file": "cloud4-bottom.webp",
        "path": "/images/themes/longphung-v4-red/cloud4-bottom.webp",
        "format": "WEBP",
        "width": 1500,
        "height": 412,
        "aspectRatio": 3.641,
        "size": 140084,
        "md5": "300cc55bc3a5e244dccfb82daa3b07b8",
        "type": "decoration",
        "usage": "Decorative element (cloud4-bottom) for longphung-v4-red"
      },
      {
        "id": "double-happiness",
        "file": "double-happiness.webp",
        "path": "/images/themes/longphung-v4-red/double-happiness.webp",
        "format": "WEBP",
        "width": 420,
        "height": 420,
        "aspectRatio": 1.0,
        "size": 72596,
        "md5": "acb581a7d74cc2a346c2091413cfb9ca",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v4-red"
      },
      {
        "id": "dragon",
        "file": "dragon.webp",
        "path": "/images/themes/longphung-v4-red/dragon.webp",
        "format": "WEBP",
        "width": 548,
        "height": 900,
        "aspectRatio": 0.609,
        "size": 281934,
        "md5": "b02405c82bfcd6558ee44b2f65805b00",
        "type": "decoration",
        "usage": "Decorative element (dragon) for longphung-v4-red"
      },
      {
        "id": "dragon2",
        "file": "dragon2.webp",
        "path": "/images/themes/longphung-v4-red/dragon2.webp",
        "format": "WEBP",
        "width": 423,
        "height": 700,
        "aspectRatio": 0.604,
        "size": 155418,
        "md5": "78acfd02470b0f17c2e74b5846f96338",
        "type": "decoration",
        "usage": "Decorative element (dragon2) for longphung-v4-red"
      },
      {
        "id": "frame-avatar",
        "file": "frame-avatar.webp",
        "path": "/images/themes/longphung-v4-red/frame-avatar.webp",
        "format": "WEBP",
        "width": 900,
        "height": 871,
        "aspectRatio": 1.033,
        "size": 125240,
        "md5": "bacd4ccee0f7be526335a91ae38dcf5b",
        "type": "frame",
        "usage": "Framing border or arch for longphung-v4-red"
      },
      {
        "id": "home",
        "file": "home.webp",
        "path": "/images/themes/longphung-v4-red/home.webp",
        "format": "WEBP",
        "width": 300,
        "height": 298,
        "aspectRatio": 1.007,
        "size": 22732,
        "md5": "4e0e75ac8e58584a32b76eaecfed2c7c",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v4-red"
      },
      {
        "id": "music",
        "file": "music.webp",
        "path": "/images/themes/longphung-v4-red/music.webp",
        "format": "WEBP",
        "width": 295,
        "height": 300,
        "aspectRatio": 0.983,
        "size": 22486,
        "md5": "22eac0cde2c18b565727b93c5c8fefca",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v4-red"
      },
      {
        "id": "phoenix",
        "file": "phoenix.webp",
        "path": "/images/themes/longphung-v4-red/phoenix.webp",
        "format": "WEBP",
        "width": 651,
        "height": 900,
        "aspectRatio": 0.723,
        "size": 197164,
        "md5": "bd90b80309d4d00a1ca3240912f0b901",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v4-red"
      },
      {
        "id": "phoenix2",
        "file": "phoenix2.webp",
        "path": "/images/themes/longphung-v4-red/phoenix2.webp",
        "format": "WEBP",
        "width": 564,
        "height": 900,
        "aspectRatio": 0.627,
        "size": 178902,
        "md5": "7597b52aec46d397fa2e01f01a9f7fb6",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v4-red"
      },
      {
        "id": "songhy-background",
        "file": "songhy-background.webp",
        "path": "/images/themes/longphung-v4-red/songhy-background.webp",
        "format": "WEBP",
        "width": 971,
        "height": 1100,
        "aspectRatio": 0.883,
        "size": 78796,
        "md5": "b68dc1b14587a4be494e2dc5a9aec891",
        "type": "background",
        "usage": "Background paper or ambient texture for longphung-v4-red"
      }
    ]
  },
  "love-art": {
    "themeId": "love-art",
    "folder": "love-art",
    "assetCount": 4,
    "totalBytes": 47062,
    "assets": [
      {
        "id": "dau",
        "file": "dau.webp",
        "path": "/images/themes/love-art/dau.webp",
        "format": "WEBP",
        "width": 162,
        "height": 292,
        "aspectRatio": 0.555,
        "size": 15190,
        "md5": "3413c03172727626a07ba018a95a46b9",
        "type": "decoration",
        "usage": "Ornamental artwork for love-art"
      },
      {
        "id": "hy",
        "file": "hy.webp",
        "path": "/images/themes/love-art/hy.webp",
        "format": "WEBP",
        "width": 210,
        "height": 204,
        "aspectRatio": 1.029,
        "size": 16076,
        "md5": "21b3251bcf936a6edb3cfdaa462579d8",
        "type": "decoration",
        "usage": "Ornamental artwork for love-art"
      },
      {
        "id": "re",
        "file": "re.webp",
        "path": "/images/themes/love-art/re.webp",
        "format": "WEBP",
        "width": 271,
        "height": 140,
        "aspectRatio": 1.936,
        "size": 10078,
        "md5": "059b983718eab51ed0a3da3cf40cd758",
        "type": "decoration",
        "usage": "Ornamental artwork for love-art"
      },
      {
        "id": "tim",
        "file": "tim.webp",
        "path": "/images/themes/love-art/tim.webp",
        "format": "WEBP",
        "width": 128,
        "height": 111,
        "aspectRatio": 1.153,
        "size": 5718,
        "md5": "123aa5cedd539e8b5936120c3a075f43",
        "type": "decoration",
        "usage": "Ornamental artwork for love-art"
      }
    ]
  },
  "minimalism-brown": {
    "themeId": "minimalism-brown",
    "folder": "minimalism-brown",
    "assetCount": 6,
    "totalBytes": 1128314,
    "assets": [
      {
        "id": "couple",
        "file": "couple.webp",
        "path": "/images/themes/minimalism-brown/couple.webp",
        "format": "WEBP",
        "width": 1448,
        "height": 2048,
        "aspectRatio": 0.707,
        "size": 484212,
        "md5": "170e263aba80fadd05fba884fdaf7fe5",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-brown"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/minimalism-brown/flower2-decoration.webp",
        "format": "WEBP",
        "width": 499,
        "height": 1159,
        "aspectRatio": 0.431,
        "size": 117988,
        "md5": "a2432d0909de43306879f56927a569a1",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for minimalism-brown"
      },
      {
        "id": "frame-avatar",
        "file": "frame-avatar.webp",
        "path": "/images/themes/minimalism-brown/frame-avatar.webp",
        "format": "WEBP",
        "width": 1094,
        "height": 1554,
        "aspectRatio": 0.704,
        "size": 70506,
        "md5": "e99743d80e89b076d0251cd76266cd61",
        "type": "frame",
        "usage": "Framing border or arch for minimalism-brown"
      },
      {
        "id": "house-background",
        "file": "house-background.webp",
        "path": "/images/themes/minimalism-brown/house-background.webp",
        "format": "WEBP",
        "width": 1188,
        "height": 1171,
        "aspectRatio": 1.015,
        "size": 249674,
        "md5": "14405e5b5d699af08ccba5ef1e454a62",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-brown"
      },
      {
        "id": "leaf-background",
        "file": "leaf-background.webp",
        "path": "/images/themes/minimalism-brown/leaf-background.webp",
        "format": "WEBP",
        "width": 441,
        "height": 1254,
        "aspectRatio": 0.352,
        "size": 64836,
        "md5": "dcbd16c48686a21c596b45e18c2d808b",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-brown"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/minimalism-brown/paper.webp",
        "format": "WEBP",
        "width": 1333,
        "height": 2000,
        "aspectRatio": 0.666,
        "size": 141098,
        "md5": "ca2d285c30e0d374bea87efd9bae1f66",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-brown"
      }
    ]
  },
  "minimalism-dark-blue": {
    "themeId": "minimalism-dark-blue",
    "folder": "minimalism-dark-blue",
    "assetCount": 17,
    "totalBytes": 2002424,
    "assets": [
      {
        "id": "cake",
        "file": "cake.webp",
        "path": "/images/themes/minimalism-dark-blue/cake.webp",
        "format": "WEBP",
        "width": 267,
        "height": 400,
        "aspectRatio": 0.667,
        "size": 34406,
        "md5": "2222adba5970a2504f361586dbb89e59",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-blue"
      },
      {
        "id": "castle-background-1",
        "file": "castle-background-1.webp",
        "path": "/images/themes/minimalism-dark-blue/castle-background-1.webp",
        "format": "WEBP",
        "width": 819,
        "height": 819,
        "aspectRatio": 1.0,
        "size": 195596,
        "md5": "324850dc60d708bfa83b3fd5a8cabe65",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-blue"
      },
      {
        "id": "castle-background",
        "file": "castle-background.webp",
        "path": "/images/themes/minimalism-dark-blue/castle-background.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 406990,
        "md5": "611cc85ffadcc17e651651c89c92eeb1",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-blue"
      },
      {
        "id": "castle2-background",
        "file": "castle2-background.webp",
        "path": "/images/themes/minimalism-dark-blue/castle2-background.webp",
        "format": "WEBP",
        "width": 783,
        "height": 783,
        "aspectRatio": 1.0,
        "size": 126488,
        "md5": "37c5fb1e4467c723ee7729f152f832f6",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-blue"
      },
      {
        "id": "church",
        "file": "church.webp",
        "path": "/images/themes/minimalism-dark-blue/church.webp",
        "format": "WEBP",
        "width": 306,
        "height": 310,
        "aspectRatio": 0.987,
        "size": 18292,
        "md5": "dcc8039f396053e2face787ae0825edf",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-dark-blue"
      },
      {
        "id": "cook",
        "file": "cook.webp",
        "path": "/images/themes/minimalism-dark-blue/cook.webp",
        "format": "WEBP",
        "width": 400,
        "height": 267,
        "aspectRatio": 1.498,
        "size": 34230,
        "md5": "26bd434228173993f4f78e9dd95628d0",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-dark-blue"
      },
      {
        "id": "envelope-background",
        "file": "envelope-background.webp",
        "path": "/images/themes/minimalism-dark-blue/envelope-background.webp",
        "format": "WEBP",
        "width": 851,
        "height": 984,
        "aspectRatio": 0.865,
        "size": 135296,
        "md5": "87f8cc70c1bca8a8db9d5d3c62979b80",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-blue"
      },
      {
        "id": "envelope-cover",
        "file": "envelope-cover.webp",
        "path": "/images/themes/minimalism-dark-blue/envelope-cover.webp",
        "format": "WEBP",
        "width": 849,
        "height": 562,
        "aspectRatio": 1.511,
        "size": 44770,
        "md5": "c90d0c5a7fd9b24d968c59a3fce0cb02",
        "type": "cover",
        "usage": "Envelope or cover illustration for minimalism-dark-blue"
      },
      {
        "id": "flower-background",
        "file": "flower-background.webp",
        "path": "/images/themes/minimalism-dark-blue/flower-background.webp",
        "format": "WEBP",
        "width": 488,
        "height": 732,
        "aspectRatio": 0.667,
        "size": 143100,
        "md5": "89713ff09f8ea6f4e040c0007be984f7",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-blue"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/flower2-decoration.webp",
        "format": "WEBP",
        "width": 429,
        "height": 840,
        "aspectRatio": 0.511,
        "size": 133028,
        "md5": "962a64e49da9f3406d8b4b0bcca2004b",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for minimalism-dark-blue"
      },
      {
        "id": "flower3-decoration",
        "file": "flower3-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/flower3-decoration.webp",
        "format": "WEBP",
        "width": 483,
        "height": 1011,
        "aspectRatio": 0.478,
        "size": 206890,
        "md5": "7f26e188095b796458f5c3875acc19da",
        "type": "decoration",
        "usage": "Decorative element (flower3-decoration) for minimalism-dark-blue"
      },
      {
        "id": "flower4-decoration",
        "file": "flower4-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/flower4-decoration.webp",
        "format": "WEBP",
        "width": 599,
        "height": 798,
        "aspectRatio": 0.751,
        "size": 129310,
        "md5": "7f9c421d58711b6cabfab093ea837b12",
        "type": "decoration",
        "usage": "Decorative element (flower4-decoration) for minimalism-dark-blue"
      },
      {
        "id": "flower5-decoration",
        "file": "flower5-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/flower5-decoration.webp",
        "format": "WEBP",
        "width": 416,
        "height": 624,
        "aspectRatio": 0.667,
        "size": 98408,
        "md5": "a4754597cca5b3fc3fc45f253581f58b",
        "type": "decoration",
        "usage": "Decorative element (flower5-decoration) for minimalism-dark-blue"
      },
      {
        "id": "flower6-decoration",
        "file": "flower6-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/flower6-decoration.webp",
        "format": "WEBP",
        "width": 446,
        "height": 669,
        "aspectRatio": 0.667,
        "size": 97848,
        "md5": "b8c6d709700ba3d954ce72007b9a7652",
        "type": "decoration",
        "usage": "Decorative element (flower6-decoration) for minimalism-dark-blue"
      },
      {
        "id": "goldenline2-decoration",
        "file": "goldenline2-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/goldenline2-decoration.webp",
        "format": "WEBP",
        "width": 400,
        "height": 117,
        "aspectRatio": 3.419,
        "size": 11800,
        "md5": "bfd86362a58c114fb7c55133b723edf0",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-blue"
      },
      {
        "id": "goldenline3-decoration",
        "file": "goldenline3-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/goldenline3-decoration.webp",
        "format": "WEBP",
        "width": 400,
        "height": 115,
        "aspectRatio": 3.478,
        "size": 13014,
        "md5": "11e28105b7cdae0dca5004f18cecb3f9",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-blue"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/minimalism-dark-blue/paper.webp",
        "format": "WEBP",
        "width": 1333,
        "height": 2000,
        "aspectRatio": 0.666,
        "size": 172958,
        "md5": "3b09633b1cd9a11d9d6ceacb6d83c9eb",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-blue"
      }
    ]
  },
  "minimalism-dark-brown": {
    "themeId": "minimalism-dark-brown",
    "folder": "minimalism-dark-brown",
    "assetCount": 16,
    "totalBytes": 2057262,
    "assets": [
      {
        "id": "alcohol",
        "file": "alcohol.webp",
        "path": "/images/themes/minimalism-dark-brown/alcohol.webp",
        "format": "WEBP",
        "width": 400,
        "height": 400,
        "aspectRatio": 1.0,
        "size": 50812,
        "md5": "ade060a7b55e33de481a3fbd6b017c01",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-dark-brown"
      },
      {
        "id": "bird",
        "file": "bird.webp",
        "path": "/images/themes/minimalism-dark-brown/bird.webp",
        "format": "WEBP",
        "width": 400,
        "height": 400,
        "aspectRatio": 1.0,
        "size": 62986,
        "md5": "5c86f678277b64b6584e42070840260f",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-dark-brown"
      },
      {
        "id": "cake",
        "file": "cake.webp",
        "path": "/images/themes/minimalism-dark-brown/cake.webp",
        "format": "WEBP",
        "width": 400,
        "height": 400,
        "aspectRatio": 1.0,
        "size": 51222,
        "md5": "d4e8867ac4ae96923019ef1cbda761cc",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-brown"
      },
      {
        "id": "castle-background",
        "file": "castle-background.webp",
        "path": "/images/themes/minimalism-dark-brown/castle-background.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1045,
        "aspectRatio": 1.2,
        "size": 264080,
        "md5": "1a716b498fb4a8c3ed43f8f394bb1aae",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-brown"
      },
      {
        "id": "castle2-background",
        "file": "castle2-background.webp",
        "path": "/images/themes/minimalism-dark-brown/castle2-background.webp",
        "format": "WEBP",
        "width": 1000,
        "height": 667,
        "aspectRatio": 1.499,
        "size": 180756,
        "md5": "e5696482c675db3e67239e4d0ed4e3af",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-brown"
      },
      {
        "id": "envelope-background",
        "file": "envelope-background.webp",
        "path": "/images/themes/minimalism-dark-brown/envelope-background.webp",
        "format": "WEBP",
        "width": 851,
        "height": 992,
        "aspectRatio": 0.858,
        "size": 123446,
        "md5": "d29fb308f4b6202a3a00cbe135962f22",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-brown"
      },
      {
        "id": "envelope-cover",
        "file": "envelope-cover.webp",
        "path": "/images/themes/minimalism-dark-brown/envelope-cover.webp",
        "format": "WEBP",
        "width": 849,
        "height": 563,
        "aspectRatio": 1.508,
        "size": 59382,
        "md5": "92f4335bb62d327f61be60dd80241f09",
        "type": "cover",
        "usage": "Envelope or cover illustration for minimalism-dark-brown"
      },
      {
        "id": "flower-decoration",
        "file": "flower-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/flower-decoration.webp",
        "format": "WEBP",
        "width": 822,
        "height": 900,
        "aspectRatio": 0.913,
        "size": 300156,
        "md5": "2a702fd826661dbf68321653fff6c6bb",
        "type": "decoration",
        "usage": "Decorative element (flower-decoration) for minimalism-dark-brown"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/flower2-decoration.webp",
        "format": "WEBP",
        "width": 710,
        "height": 900,
        "aspectRatio": 0.789,
        "size": 279966,
        "md5": "bbaa3922eed763924c6672be133ad507",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for minimalism-dark-brown"
      },
      {
        "id": "flower3-decoration",
        "file": "flower3-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/flower3-decoration.webp",
        "format": "WEBP",
        "width": 900,
        "height": 900,
        "aspectRatio": 1.0,
        "size": 349062,
        "md5": "0f3c7d0e7793b2c3327d65dd4a2f8bc3",
        "type": "decoration",
        "usage": "Decorative element (flower3-decoration) for minimalism-dark-brown"
      },
      {
        "id": "flower8-decoration",
        "file": "flower8-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/flower8-decoration.webp",
        "format": "WEBP",
        "width": 423,
        "height": 532,
        "aspectRatio": 0.795,
        "size": 101074,
        "md5": "d6ae76355a0e8454540e0b2b5b8cd6ee",
        "type": "decoration",
        "usage": "Decorative element (flower8-decoration) for minimalism-dark-brown"
      },
      {
        "id": "goldenline-decoration",
        "file": "goldenline-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/goldenline-decoration.webp",
        "format": "WEBP",
        "width": 329,
        "height": 88,
        "aspectRatio": 3.739,
        "size": 7594,
        "md5": "5ede92c8273496afbd20babf8415d40c",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-brown"
      },
      {
        "id": "goldenline2-decoration",
        "file": "goldenline2-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/goldenline2-decoration.webp",
        "format": "WEBP",
        "width": 400,
        "height": 117,
        "aspectRatio": 3.419,
        "size": 11800,
        "md5": "bfd86362a58c114fb7c55133b723edf0",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-brown"
      },
      {
        "id": "goldenline3-decoration",
        "file": "goldenline3-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/goldenline3-decoration.webp",
        "format": "WEBP",
        "width": 400,
        "height": 85,
        "aspectRatio": 4.706,
        "size": 10714,
        "md5": "398c52c52b72c855980783156d4c9f69",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-brown"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/minimalism-dark-brown/paper.webp",
        "format": "WEBP",
        "width": 1333,
        "height": 2000,
        "aspectRatio": 0.666,
        "size": 172958,
        "md5": "3b09633b1cd9a11d9d6ceacb6d83c9eb",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-brown"
      },
      {
        "id": "string-decoration",
        "file": "string-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/string-decoration.webp",
        "format": "WEBP",
        "width": 289,
        "height": 417,
        "aspectRatio": 0.693,
        "size": 31254,
        "md5": "5854a07571404e16e575db5e8b4f6dcb",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-dark-brown"
      }
    ]
  },
  "minimalism-dark-red": {
    "themeId": "minimalism-dark-red",
    "folder": "minimalism-dark-red",
    "assetCount": 5,
    "totalBytes": 904416,
    "assets": [
      {
        "id": "castle-background",
        "file": "castle-background.webp",
        "path": "/images/themes/minimalism-dark-red/castle-background.webp",
        "format": "WEBP",
        "width": 1310,
        "height": 1009,
        "aspectRatio": 1.298,
        "size": 252208,
        "md5": "5ddf43ce44557a8d06c3f7dc29ad436e",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-red"
      },
      {
        "id": "envelope-background",
        "file": "envelope-background.webp",
        "path": "/images/themes/minimalism-dark-red/envelope-background.webp",
        "format": "WEBP",
        "width": 1013,
        "height": 1168,
        "aspectRatio": 0.867,
        "size": 190858,
        "md5": "fd322ea89e36d7ee10f404864f980222",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-red"
      },
      {
        "id": "envelope-cover",
        "file": "envelope-cover.webp",
        "path": "/images/themes/minimalism-dark-red/envelope-cover.webp",
        "format": "WEBP",
        "width": 1013,
        "height": 668,
        "aspectRatio": 1.516,
        "size": 87010,
        "md5": "580fc7d8d1cabd8f92352636858bcf6f",
        "type": "cover",
        "usage": "Envelope or cover illustration for minimalism-dark-red"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/minimalism-dark-red/flower2-decoration.webp",
        "format": "WEBP",
        "width": 811,
        "height": 1938,
        "aspectRatio": 0.418,
        "size": 233242,
        "md5": "effda800b9cdd1f3ad75256807bd6112",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for minimalism-dark-red"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/minimalism-dark-red/paper.webp",
        "format": "WEBP",
        "width": 1333,
        "height": 2000,
        "aspectRatio": 0.666,
        "size": 141098,
        "md5": "ca2d285c30e0d374bea87efd9bae1f66",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-red"
      }
    ]
  },
  "minimalism-green": {
    "themeId": "minimalism-green",
    "folder": "minimalism-green",
    "assetCount": 9,
    "totalBytes": 765000,
    "assets": [
      {
        "id": "cake",
        "file": "cake.webp",
        "path": "/images/themes/minimalism-green/cake.webp",
        "format": "WEBP",
        "width": 1564,
        "height": 1630,
        "aspectRatio": 0.96,
        "size": 34796,
        "md5": "5302622edf3e6864f3cc526e8acb418c",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-green"
      },
      {
        "id": "envelope-cut",
        "file": "envelope-cut.webp",
        "path": "/images/themes/minimalism-green/envelope-cut.webp",
        "format": "WEBP",
        "width": 2042,
        "height": 1321,
        "aspectRatio": 1.546,
        "size": 62888,
        "md5": "5dbdaa83cc5a277c5cae4932c8b51e71",
        "type": "cover",
        "usage": "Envelope or cover illustration for minimalism-green"
      },
      {
        "id": "envelope",
        "file": "envelope.webp",
        "path": "/images/themes/minimalism-green/envelope.webp",
        "format": "WEBP",
        "width": 2042,
        "height": 2226,
        "aspectRatio": 0.917,
        "size": 99786,
        "md5": "094948342b9a2ef9864bfa68b071aff9",
        "type": "cover",
        "usage": "Envelope or cover illustration for minimalism-green"
      },
      {
        "id": "flower-background",
        "file": "flower-background.webp",
        "path": "/images/themes/minimalism-green/flower-background.webp",
        "format": "WEBP",
        "width": 2048,
        "height": 2208,
        "aspectRatio": 0.928,
        "size": 280626,
        "md5": "febd3f1560120311c5e8e7a92976562e",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-green"
      },
      {
        "id": "flower-line",
        "file": "flower-line.webp",
        "path": "/images/themes/minimalism-green/flower-line.webp",
        "format": "WEBP",
        "width": 3250,
        "height": 318,
        "aspectRatio": 10.22,
        "size": 32208,
        "md5": "a725d1f8733eac7fabb017736e54c877",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-green"
      },
      {
        "id": "guestbook-background",
        "file": "guestbook-background.webp",
        "path": "/images/themes/minimalism-green/guestbook-background.webp",
        "format": "WEBP",
        "width": 1939,
        "height": 1760,
        "aspectRatio": 1.102,
        "size": 62164,
        "md5": "6b232b1c6b32ea400e6a0bda96edbaaf",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-green"
      },
      {
        "id": "home",
        "file": "home.webp",
        "path": "/images/themes/minimalism-green/home.webp",
        "format": "WEBP",
        "width": 1554,
        "height": 1544,
        "aspectRatio": 1.006,
        "size": 35178,
        "md5": "abd1ba7979706f47bad506f842b83637",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-green"
      },
      {
        "id": "music",
        "file": "music.webp",
        "path": "/images/themes/minimalism-green/music.webp",
        "format": "WEBP",
        "width": 1474,
        "height": 1500,
        "aspectRatio": 0.983,
        "size": 33852,
        "md5": "2b5ca4fe5b738ae14ee49e0f8f609abb",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-green"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/minimalism-green/paper.webp",
        "format": "WEBP",
        "width": 1333,
        "height": 2000,
        "aspectRatio": 0.666,
        "size": 123502,
        "md5": "8a93144a7ed6835c7c67d371c0a6f846",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-green"
      }
    ]
  },
  "minimalism-purple": {
    "themeId": "minimalism-purple",
    "folder": "minimalism-purple",
    "assetCount": 13,
    "totalBytes": 2743836,
    "assets": [
      {
        "id": "cake",
        "file": "cake.webp",
        "path": "/images/themes/minimalism-purple/cake.webp",
        "format": "WEBP",
        "width": 1536,
        "height": 1024,
        "aspectRatio": 1.5,
        "size": 138360,
        "md5": "856abbc617da3017a96d950c49430cf0",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-purple"
      },
      {
        "id": "church",
        "file": "church.webp",
        "path": "/images/themes/minimalism-purple/church.webp",
        "format": "WEBP",
        "width": 1536,
        "height": 1024,
        "aspectRatio": 1.5,
        "size": 155490,
        "md5": "c64e4a32ddd8c96c1f59362591ac0d2d",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-purple"
      },
      {
        "id": "envelope-background",
        "file": "envelope-background.webp",
        "path": "/images/themes/minimalism-purple/envelope-background.webp",
        "format": "WEBP",
        "width": 1041,
        "height": 1203,
        "aspectRatio": 0.865,
        "size": 188834,
        "md5": "69de11d517c6b5a576201a667ba0bff7",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-purple"
      },
      {
        "id": "envelope-cover",
        "file": "envelope-cover.webp",
        "path": "/images/themes/minimalism-purple/envelope-cover.webp",
        "format": "WEBP",
        "width": 1041,
        "height": 689,
        "aspectRatio": 1.511,
        "size": 75498,
        "md5": "d1f41907d5152a5fd79ead00d2a49d4a",
        "type": "cover",
        "usage": "Envelope or cover illustration for minimalism-purple"
      },
      {
        "id": "flower-decoration",
        "file": "flower-decoration.webp",
        "path": "/images/themes/minimalism-purple/flower-decoration.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 1536,
        "aspectRatio": 0.667,
        "size": 336056,
        "md5": "1d3a1b922fe44338c65234f4363f4a44",
        "type": "decoration",
        "usage": "Decorative element (flower-decoration) for minimalism-purple"
      },
      {
        "id": "flower1-decoration",
        "file": "flower1-decoration.webp",
        "path": "/images/themes/minimalism-purple/flower1-decoration.webp",
        "format": "WEBP",
        "width": 683,
        "height": 1024,
        "aspectRatio": 0.667,
        "size": 171360,
        "md5": "eeabbe835a74702334c6251ee3ca2ca9",
        "type": "decoration",
        "usage": "Decorative element (flower1-decoration) for minimalism-purple"
      },
      {
        "id": "flower3-decoration",
        "file": "flower3-decoration.webp",
        "path": "/images/themes/minimalism-purple/flower3-decoration.webp",
        "format": "WEBP",
        "width": 1373,
        "height": 1055,
        "aspectRatio": 1.301,
        "size": 268256,
        "md5": "dcb027cb80517ba9e793d48cfe4eaae9",
        "type": "decoration",
        "usage": "Decorative element (flower3-decoration) for minimalism-purple"
      },
      {
        "id": "flower4-decoration",
        "file": "flower4-decoration.webp",
        "path": "/images/themes/minimalism-purple/flower4-decoration.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 684,
        "aspectRatio": 1.497,
        "size": 216190,
        "md5": "2c00b2969df61c420219a7fca034b567",
        "type": "decoration",
        "usage": "Decorative element (flower4-decoration) for minimalism-purple"
      },
      {
        "id": "flower4b-decoration",
        "file": "flower4b-decoration.webp",
        "path": "/images/themes/minimalism-purple/flower4b-decoration.webp",
        "format": "WEBP",
        "width": 1226,
        "height": 553,
        "aspectRatio": 2.217,
        "size": 157618,
        "md5": "c2a2d8438a9a802d7631afccd6dc8351",
        "type": "decoration",
        "usage": "Decorative element (flower4b-decoration) for minimalism-purple"
      },
      {
        "id": "flowerbottom-decoration",
        "file": "flowerbottom-decoration.webp",
        "path": "/images/themes/minimalism-purple/flowerbottom-decoration.webp",
        "format": "WEBP",
        "width": 1896,
        "height": 1170,
        "aspectRatio": 1.621,
        "size": 358658,
        "md5": "f89defc2691e9ba4a1f0f102695a36bd",
        "type": "decoration",
        "usage": "Decorative element (flowerbottom-decoration) for minimalism-purple"
      },
      {
        "id": "house-background",
        "file": "house-background.webp",
        "path": "/images/themes/minimalism-purple/house-background.webp",
        "format": "WEBP",
        "width": 1536,
        "height": 1024,
        "aspectRatio": 1.5,
        "size": 398782,
        "md5": "3c718c095349e7f35416b04a1a7bbb64",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-purple"
      },
      {
        "id": "music",
        "file": "music.webp",
        "path": "/images/themes/minimalism-purple/music.webp",
        "format": "WEBP",
        "width": 1536,
        "height": 1024,
        "aspectRatio": 1.5,
        "size": 105776,
        "md5": "8288b0ca889b1c52f288b7a994d80a4a",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-purple"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/minimalism-purple/paper.webp",
        "format": "WEBP",
        "width": 1333,
        "height": 2000,
        "aspectRatio": 0.666,
        "size": 172958,
        "md5": "3b09633b1cd9a11d9d6ceacb6d83c9eb",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-purple"
      }
    ]
  },
  "minimalism-red": {
    "themeId": "minimalism-red",
    "folder": "minimalism-red",
    "assetCount": 2,
    "totalBytes": 130362,
    "assets": [
      {
        "id": "header-bottom-01",
        "file": "header-bottom-01.png",
        "path": "/images/themes/minimalism-red/header-bottom-01.png",
        "format": "PNG",
        "width": 2084,
        "height": 741,
        "aspectRatio": 2.812,
        "size": 39476,
        "md5": "f52877332217f2d46415a2dbda52b27f",
        "type": "decoration",
        "usage": "Header ornament for minimalism-red"
      },
      {
        "id": "header-top-01",
        "file": "header-top-01.png",
        "path": "/images/themes/minimalism-red/header-top-01.png",
        "format": "PNG",
        "width": 2084,
        "height": 1584,
        "aspectRatio": 1.316,
        "size": 90886,
        "md5": "de1ae95e6ed6d77b5034390c6a8e5b25",
        "type": "decoration",
        "usage": "Header ornament for minimalism-red"
      }
    ]
  },
  "moclan-white": {
    "themeId": "moclan-white",
    "folder": "moclan-white",
    "assetCount": 2,
    "totalBytes": 223890,
    "assets": [
      {
        "id": "hoa",
        "file": "hoa.webp",
        "path": "/images/themes/moclan-white/hoa.webp",
        "format": "WEBP",
        "width": 1200,
        "height": 1167,
        "aspectRatio": 1.028,
        "size": 101810,
        "md5": "5716225299bdc988c242f1dd3dc5a536",
        "type": "decoration",
        "usage": "Decorative element (hoa) for moclan-white"
      },
      {
        "id": "khung-hoa",
        "file": "khung-hoa.webp",
        "path": "/images/themes/moclan-white/khung-hoa.webp",
        "format": "WEBP",
        "width": 1200,
        "height": 2120,
        "aspectRatio": 0.566,
        "size": 122080,
        "md5": "5b02e5fb7510526cdca4fb2b217d7bf6",
        "type": "frame",
        "usage": "Framing border or arch for moclan-white"
      }
    ]
  },
  "nature": {
    "themeId": "nature",
    "folder": "nature",
    "assetCount": 2,
    "totalBytes": 204906,
    "assets": [
      {
        "id": "flower_paralax",
        "file": "flower_paralax.webp",
        "path": "/images/themes/nature/flower_paralax.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 1879,
        "aspectRatio": 1.064,
        "size": 109780,
        "md5": "c9be1f8b4e95c8d0725b89b397cb0e12",
        "type": "decoration",
        "usage": "Decorative element (flower_paralax) for nature"
      },
      {
        "id": "flower_top",
        "file": "flower_top.webp",
        "path": "/images/themes/nature/flower_top.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 1470,
        "aspectRatio": 1.361,
        "size": 95126,
        "md5": "f0ac8745c88f20f5d77eeda4f169736c",
        "type": "decoration",
        "usage": "Decorative element (flower_top) for nature"
      }
    ]
  },
  "nhat-binh-red": {
    "themeId": "nhat-binh-red",
    "folder": "nhat-binh-red",
    "assetCount": 7,
    "totalBytes": 2226554,
    "assets": [
      {
        "id": "chu-hy",
        "file": "chu-hy.webp",
        "path": "/images/themes/nhat-binh-red/chu-hy.webp",
        "format": "WEBP",
        "width": 900,
        "height": 623,
        "aspectRatio": 1.445,
        "size": 68546,
        "md5": "4e7d029636ed094d9aa686b2ef2da2d8",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for nhat-binh-red"
      },
      {
        "id": "dau-re",
        "file": "dau-re.webp",
        "path": "/images/themes/nhat-binh-red/dau-re.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1289,
        "aspectRatio": 0.698,
        "size": 171492,
        "md5": "3aa1e1c3e75629cdbc5a4e288463ac56",
        "type": "decoration",
        "usage": "Ornamental artwork for nhat-binh-red"
      },
      {
        "id": "hoa",
        "file": "hoa.webp",
        "path": "/images/themes/nhat-binh-red/hoa.webp",
        "format": "WEBP",
        "width": 960,
        "height": 788,
        "aspectRatio": 1.218,
        "size": 155514,
        "md5": "dac972ddcd9fa94001a2bf06ddc6e85b",
        "type": "decoration",
        "usage": "Decorative element (hoa) for nhat-binh-red"
      },
      {
        "id": "long-den",
        "file": "long-den.webp",
        "path": "/images/themes/nhat-binh-red/long-den.webp",
        "format": "WEBP",
        "width": 320,
        "height": 902,
        "aspectRatio": 0.355,
        "size": 34616,
        "md5": "5495816d6a28e6ce606215b055f5008b",
        "type": "decoration",
        "usage": "Ornamental artwork for nhat-binh-red"
      },
      {
        "id": "may-to",
        "file": "may-to.webp",
        "path": "/images/themes/nhat-binh-red/may-to.webp",
        "format": "WEBP",
        "width": 1100,
        "height": 642,
        "aspectRatio": 1.713,
        "size": 155468,
        "md5": "195708636fe3542800404a94aaff2dc8",
        "type": "decoration",
        "usage": "Ornamental artwork for nhat-binh-red"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/nhat-binh-red/paper.webp",
        "format": "WEBP",
        "width": 1656,
        "height": 4000,
        "aspectRatio": 0.414,
        "size": 1545250,
        "md5": "233d52ca6ff956ac6d48dd1ecca37a17",
        "type": "background",
        "usage": "Background paper or ambient texture for nhat-binh-red"
      },
      {
        "id": "quat",
        "file": "quat.webp",
        "path": "/images/themes/nhat-binh-red/quat.webp",
        "format": "WEBP",
        "width": 750,
        "height": 551,
        "aspectRatio": 1.361,
        "size": 95668,
        "md5": "6eedd65b313a13eb99a04b70563329ac",
        "type": "decoration",
        "usage": "Ornamental artwork for nhat-binh-red"
      }
    ]
  },
  "porcelain-blue": {
    "themeId": "porcelain-blue",
    "folder": "porcelain-blue",
    "assetCount": 1,
    "totalBytes": 65948,
    "assets": [
      {
        "id": "frame-decoration",
        "file": "frame-decoration.webp",
        "path": "/images/themes/porcelain-blue/frame-decoration.webp",
        "format": "WEBP",
        "width": 1122,
        "height": 1402,
        "aspectRatio": 0.8,
        "size": 65948,
        "md5": "049f27a42141976ea5e0ef198c67b181",
        "type": "frame",
        "usage": "Framing border or arch for porcelain-blue"
      }
    ]
  },
  "porcelain-brown": {
    "themeId": "porcelain-brown",
    "folder": "porcelain-brown",
    "assetCount": 1,
    "totalBytes": 21220,
    "assets": [
      {
        "id": "frame-background",
        "file": "frame-background.webp",
        "path": "/images/themes/porcelain-brown/frame-background.webp",
        "format": "WEBP",
        "width": 1122,
        "height": 1549,
        "aspectRatio": 0.724,
        "size": 21220,
        "md5": "049de32a197e56f80be50643a5b9d9ff",
        "type": "background",
        "usage": "Background paper or ambient texture for porcelain-brown"
      }
    ]
  },
  "porcelain-red": {
    "themeId": "porcelain-red",
    "folder": "porcelain-red",
    "assetCount": 1,
    "totalBytes": 43422,
    "assets": [
      {
        "id": "frame-decoration",
        "file": "frame-decoration.webp",
        "path": "/images/themes/porcelain-red/frame-decoration.webp",
        "format": "WEBP",
        "width": 1266,
        "height": 1900,
        "aspectRatio": 0.666,
        "size": 43422,
        "md5": "8fe622bbfe216a8d409f4b4969ff1071",
        "type": "frame",
        "usage": "Framing border or arch for porcelain-red"
      }
    ]
  },
  "porcelain-v2-green": {
    "themeId": "porcelain-v2-green",
    "folder": "porcelain-v2-green",
    "assetCount": 1,
    "totalBytes": 186322,
    "assets": [
      {
        "id": "hero-frame",
        "file": "hero-frame.webp",
        "path": "/images/themes/porcelain-v2-green/hero-frame.webp",
        "format": "WEBP",
        "width": 880,
        "height": 1320,
        "aspectRatio": 0.667,
        "size": 186322,
        "md5": "29a66362a71604094974fb9a3858fb89",
        "type": "frame",
        "usage": "Framing border or arch for porcelain-v2-green"
      }
    ]
  },
  "porcelain-v2-pink": {
    "themeId": "porcelain-v2-pink",
    "folder": "porcelain-v2-pink",
    "assetCount": 1,
    "totalBytes": 89832,
    "assets": [
      {
        "id": "hero-frame",
        "file": "hero-frame.webp",
        "path": "/images/themes/porcelain-v2-pink/hero-frame.webp",
        "format": "WEBP",
        "width": 831,
        "height": 1491,
        "aspectRatio": 0.557,
        "size": 89832,
        "md5": "91a6b2bd1d6f42670b8596ad5795b89c",
        "type": "frame",
        "usage": "Framing border or arch for porcelain-v2-pink"
      }
    ]
  },
  "porcelain-v2-red": {
    "themeId": "porcelain-v2-red",
    "folder": "porcelain-v2-red",
    "assetCount": 1,
    "totalBytes": 107836,
    "assets": [
      {
        "id": "hero-frame",
        "file": "hero-frame.webp",
        "path": "/images/themes/porcelain-v2-red/hero-frame.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1530,
        "aspectRatio": 0.588,
        "size": 107836,
        "md5": "5051c8f6bac23da5e113d137680e7bad",
        "type": "frame",
        "usage": "Framing border or arch for porcelain-v2-red"
      }
    ]
  },
  "red-v1": {
    "themeId": "red-v1",
    "folder": "red-v1",
    "assetCount": 4,
    "totalBytes": 579626,
    "assets": [
      {
        "id": "bg-main",
        "file": "bg-main.webp",
        "path": "/images/themes/red-v1/bg-main.webp",
        "format": "WEBP",
        "width": 1171,
        "height": 1444,
        "aspectRatio": 0.811,
        "size": 201876,
        "md5": "f51ff94e3f87422924e1f998ab99e58a",
        "type": "background",
        "usage": "Background paper or ambient texture for red-v1"
      },
      {
        "id": "line6",
        "file": "line6.svg",
        "path": "/images/themes/red-v1/line6.svg",
        "format": "SVG",
        "width": 25,
        "height": 1,
        "aspectRatio": 25.0,
        "size": 256,
        "md5": "425620abf8ed8f88d4adb4a2eb9fe6c2",
        "type": "divider",
        "usage": "Decorative divider line for red-v1"
      },
      {
        "id": "phuong",
        "file": "phuong.webp",
        "path": "/images/themes/red-v1/phuong.webp",
        "format": "WEBP",
        "width": 610,
        "height": 1302,
        "aspectRatio": 0.469,
        "size": 97582,
        "md5": "eeaa8b1029518f3d615f327471ab227a",
        "type": "decoration",
        "usage": "Decorative element (phuong) for red-v1"
      },
      {
        "id": "rong",
        "file": "rong.webp",
        "path": "/images/themes/red-v1/rong.webp",
        "format": "WEBP",
        "width": 1000,
        "height": 2000,
        "aspectRatio": 0.5,
        "size": 279912,
        "md5": "d813a65ed9bb2c953ede68b495ab265b",
        "type": "decoration",
        "usage": "Ornamental artwork for red-v1"
      }
    ]
  },
  "riviera-blue": {
    "themeId": "riviera-blue",
    "folder": "riviera-blue",
    "assetCount": 3,
    "totalBytes": 31806,
    "assets": [
      {
        "id": "line-decoration-2",
        "file": "line-decoration-2.webp",
        "path": "/images/themes/riviera-blue/line-decoration-2.webp",
        "format": "WEBP",
        "width": 400,
        "height": 133,
        "aspectRatio": 3.008,
        "size": 2894,
        "md5": "aaed5c6b1a6c530c1de48bd5ac28252d",
        "type": "divider",
        "usage": "Decorative divider line for riviera-blue"
      },
      {
        "id": "line-decoration-3",
        "file": "line-decoration-3.webp",
        "path": "/images/themes/riviera-blue/line-decoration-3.webp",
        "format": "WEBP",
        "width": 520,
        "height": 173,
        "aspectRatio": 3.006,
        "size": 19604,
        "md5": "fcf08252da02c0701508915b443a412d",
        "type": "divider",
        "usage": "Decorative divider line for riviera-blue"
      },
      {
        "id": "paper-background",
        "file": "paper-background.webp",
        "path": "/images/themes/riviera-blue/paper-background.webp",
        "format": "WEBP",
        "width": 724,
        "height": 2172,
        "aspectRatio": 0.333,
        "size": 9308,
        "md5": "01e036bf84adf20ad10997cc9417306e",
        "type": "background",
        "usage": "Background paper or ambient texture for riviera-blue"
      }
    ]
  },
  "royal-blue": {
    "themeId": "royal-blue",
    "folder": "royal-blue",
    "assetCount": 2,
    "totalBytes": 611450,
    "assets": [
      {
        "id": "background",
        "file": "background.webp",
        "path": "/images/themes/royal-blue/background.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 8892,
        "aspectRatio": 0.115,
        "size": 443746,
        "md5": "24808ecb9a766caca8b034f269c6819d",
        "type": "background",
        "usage": "Background paper or ambient texture for royal-blue"
      },
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/royal-blue/flower.webp",
        "format": "WEBP",
        "width": 900,
        "height": 544,
        "aspectRatio": 1.654,
        "size": 167704,
        "md5": "94a3e6b1b91a47f929f760df78310d35",
        "type": "decoration",
        "usage": "Decorative element (flower) for royal-blue"
      }
    ]
  },
  "royal-green": {
    "themeId": "royal-green",
    "folder": "royal-green",
    "assetCount": 2,
    "totalBytes": 402886,
    "assets": [
      {
        "id": "background",
        "file": "background.webp",
        "path": "/images/themes/royal-green/background.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 8892,
        "aspectRatio": 0.115,
        "size": 235182,
        "md5": "8a820cead193221ec66f33aeeccf434c",
        "type": "background",
        "usage": "Background paper or ambient texture for royal-green"
      },
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/royal-green/flower.webp",
        "format": "WEBP",
        "width": 900,
        "height": 544,
        "aspectRatio": 1.654,
        "size": 167704,
        "md5": "94a3e6b1b91a47f929f760df78310d35",
        "type": "decoration",
        "usage": "Decorative element (flower) for royal-green"
      }
    ]
  },
  "royal-red": {
    "themeId": "royal-red",
    "folder": "royal-red",
    "assetCount": 2,
    "totalBytes": 603466,
    "assets": [
      {
        "id": "background",
        "file": "background.webp",
        "path": "/images/themes/royal-red/background.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 8892,
        "aspectRatio": 0.115,
        "size": 435762,
        "md5": "5b13c439d1c3a92969f0644058f7ca7e",
        "type": "background",
        "usage": "Background paper or ambient texture for royal-red"
      },
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/royal-red/flower.webp",
        "format": "WEBP",
        "width": 900,
        "height": 544,
        "aspectRatio": 1.654,
        "size": 167704,
        "md5": "94a3e6b1b91a47f929f760df78310d35",
        "type": "decoration",
        "usage": "Decorative element (flower) for royal-red"
      }
    ]
  },
  "royal-v2-green": {
    "themeId": "royal-v2-green",
    "folder": "royal-v2-green",
    "assetCount": 4,
    "totalBytes": 433220,
    "assets": [
      {
        "id": "background",
        "file": "background.webp",
        "path": "/images/themes/royal-v2-green/background.webp",
        "format": "WEBP",
        "width": 512,
        "height": 4096,
        "aspectRatio": 0.125,
        "size": 58650,
        "md5": "45fac3c91d2c40e778e6717ba3f2ded1",
        "type": "background",
        "usage": "Background paper or ambient texture for royal-v2-green"
      },
      {
        "id": "flower1-decoration",
        "file": "flower1-decoration.webp",
        "path": "/images/themes/royal-v2-green/flower1-decoration.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 177992,
        "md5": "aca26d98a0bdf6cf86f5855e5544570d",
        "type": "decoration",
        "usage": "Decorative element (flower1-decoration) for royal-v2-green"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/royal-v2-green/flower2-decoration.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 174156,
        "md5": "cbec5aa27856b375fe7bce309fd2c2e7",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for royal-v2-green"
      },
      {
        "id": "golden-line",
        "file": "golden-line.webp",
        "path": "/images/themes/royal-v2-green/golden-line.webp",
        "format": "WEBP",
        "width": 986,
        "height": 269,
        "aspectRatio": 3.665,
        "size": 22422,
        "md5": "e35b6f125de0ffaa2a83fd8c13927189",
        "type": "divider",
        "usage": "Decorative divider line for royal-v2-green"
      }
    ]
  },
  "royal-v2-purple": {
    "themeId": "royal-v2-purple",
    "folder": "royal-v2-purple",
    "assetCount": 5,
    "totalBytes": 686540,
    "assets": [
      {
        "id": "background",
        "file": "background.webp",
        "path": "/images/themes/royal-v2-purple/background.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 207280,
        "md5": "87ca4b5cf77bf45a1d14f21223ebc6c1",
        "type": "background",
        "usage": "Background paper or ambient texture for royal-v2-purple"
      },
      {
        "id": "flower-decoration",
        "file": "flower-decoration.webp",
        "path": "/images/themes/royal-v2-purple/flower-decoration.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1254,
        "aspectRatio": 0.718,
        "size": 158774,
        "md5": "7002c6eeda3a9fbdc827b15dfd12475a",
        "type": "decoration",
        "usage": "Decorative element (flower-decoration) for royal-v2-purple"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/royal-v2-purple/flower2-decoration.webp",
        "format": "WEBP",
        "width": 1136,
        "height": 1254,
        "aspectRatio": 0.906,
        "size": 183584,
        "md5": "11fb82607445ebd4dcb2779bd70dd32f",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for royal-v2-purple"
      },
      {
        "id": "frame",
        "file": "frame.webp",
        "path": "/images/themes/royal-v2-purple/frame.webp",
        "format": "WEBP",
        "width": 1624,
        "height": 2296,
        "aspectRatio": 0.707,
        "size": 75072,
        "md5": "f184d32b3ac1859dde140a110c41d709",
        "type": "frame",
        "usage": "Framing border or arch for royal-v2-purple"
      },
      {
        "id": "golden-line",
        "file": "golden-line.webp",
        "path": "/images/themes/royal-v2-purple/golden-line.webp",
        "format": "WEBP",
        "width": 1755,
        "height": 403,
        "aspectRatio": 4.355,
        "size": 61830,
        "md5": "c5e9be431cd953e42ed42c77527f7282",
        "type": "divider",
        "usage": "Decorative divider line for royal-v2-purple"
      }
    ]
  },
  "san-miguel-yellow": {
    "themeId": "san-miguel-yellow",
    "folder": "san-miguel-yellow",
    "assetCount": 2,
    "totalBytes": 130660,
    "assets": [
      {
        "id": "cloud-background",
        "file": "cloud-background.webp",
        "path": "/images/themes/san-miguel-yellow/cloud-background.webp",
        "format": "WEBP",
        "width": 1160,
        "height": 707,
        "aspectRatio": 1.641,
        "size": 71930,
        "md5": "07dbc55bc3cf55fddea3bc286f099644",
        "type": "background",
        "usage": "Background paper or ambient texture for san-miguel-yellow"
      },
      {
        "id": "cloud2-background",
        "file": "cloud2-background.webp",
        "path": "/images/themes/san-miguel-yellow/cloud2-background.webp",
        "format": "WEBP",
        "width": 980,
        "height": 597,
        "aspectRatio": 1.642,
        "size": 58730,
        "md5": "0f3663afe05987bfac4e21707fc80376",
        "type": "background",
        "usage": "Background paper or ambient texture for san-miguel-yellow"
      }
    ]
  },
  "silk-ribbon-darkred": {
    "themeId": "silk-ribbon-darkred",
    "folder": "silk-ribbon-darkred",
    "assetCount": 3,
    "totalBytes": 216572,
    "assets": [
      {
        "id": "flower-decoration",
        "file": "flower-decoration.webp",
        "path": "/images/themes/silk-ribbon-darkred/flower-decoration.webp",
        "format": "WEBP",
        "width": 970,
        "height": 1200,
        "aspectRatio": 0.808,
        "size": 57866,
        "md5": "b295d233f4418f758a8782a3a690bbde",
        "type": "decoration",
        "usage": "Decorative element (flower-decoration) for silk-ribbon-darkred"
      },
      {
        "id": "line-decoration",
        "file": "line-decoration.webp",
        "path": "/images/themes/silk-ribbon-darkred/line-decoration.webp",
        "format": "WEBP",
        "width": 725,
        "height": 2170,
        "aspectRatio": 0.334,
        "size": 95460,
        "md5": "bd38f366d16a5d77838beef9a77bae47",
        "type": "divider",
        "usage": "Decorative divider line for silk-ribbon-darkred"
      },
      {
        "id": "ribbon-decoration",
        "file": "ribbon-decoration.webp",
        "path": "/images/themes/silk-ribbon-darkred/ribbon-decoration.webp",
        "format": "WEBP",
        "width": 1600,
        "height": 532,
        "aspectRatio": 3.008,
        "size": 63246,
        "md5": "7ef6b8628bce68c3118241937d859541",
        "type": "decoration",
        "usage": "Ornamental artwork for silk-ribbon-darkred"
      }
    ]
  },
  "silk-ribbon-green": {
    "themeId": "silk-ribbon-green",
    "folder": "silk-ribbon-green",
    "assetCount": 3,
    "totalBytes": 236432,
    "assets": [
      {
        "id": "flower-decoration",
        "file": "flower-decoration.webp",
        "path": "/images/themes/silk-ribbon-green/flower-decoration.webp",
        "format": "WEBP",
        "width": 1004,
        "height": 1195,
        "aspectRatio": 0.84,
        "size": 69336,
        "md5": "baede74db1dc097e521e262e17b351f1",
        "type": "decoration",
        "usage": "Decorative element (flower-decoration) for silk-ribbon-green"
      },
      {
        "id": "line-decoration",
        "file": "line-decoration.webp",
        "path": "/images/themes/silk-ribbon-green/line-decoration.webp",
        "format": "WEBP",
        "width": 724,
        "height": 2172,
        "aspectRatio": 0.333,
        "size": 104968,
        "md5": "56cc44e8d1a125755a9088cb4f120899",
        "type": "divider",
        "usage": "Decorative divider line for silk-ribbon-green"
      },
      {
        "id": "ribbon-decoration",
        "file": "ribbon-decoration.webp",
        "path": "/images/themes/silk-ribbon-green/ribbon-decoration.webp",
        "format": "WEBP",
        "width": 1600,
        "height": 281,
        "aspectRatio": 5.694,
        "size": 62128,
        "md5": "0458bd5e5819e482a41aa1ae825e7cb7",
        "type": "decoration",
        "usage": "Ornamental artwork for silk-ribbon-green"
      }
    ]
  },
  "silk-ribbon-pink": {
    "themeId": "silk-ribbon-pink",
    "folder": "silk-ribbon-pink",
    "assetCount": 3,
    "totalBytes": 335698,
    "assets": [
      {
        "id": "flower-decoration",
        "file": "flower-decoration.webp",
        "path": "/images/themes/silk-ribbon-pink/flower-decoration.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1350,
        "aspectRatio": 0.667,
        "size": 176076,
        "md5": "2d578dc37f2c73e7f2341f9d15c31a90",
        "type": "decoration",
        "usage": "Decorative element (flower-decoration) for silk-ribbon-pink"
      },
      {
        "id": "line-decoration",
        "file": "line-decoration.webp",
        "path": "/images/themes/silk-ribbon-pink/line-decoration.webp",
        "format": "WEBP",
        "width": 727,
        "height": 2163,
        "aspectRatio": 0.336,
        "size": 102786,
        "md5": "837b2516ff63ec1d268631e8247bdae7",
        "type": "divider",
        "usage": "Decorative divider line for silk-ribbon-pink"
      },
      {
        "id": "ribbon-decoration",
        "file": "ribbon-decoration.webp",
        "path": "/images/themes/silk-ribbon-pink/ribbon-decoration.webp",
        "format": "WEBP",
        "width": 1600,
        "height": 533,
        "aspectRatio": 3.002,
        "size": 56836,
        "md5": "edbae0ef2e97b7afbea76cc368ff4c14",
        "type": "decoration",
        "usage": "Ornamental artwork for silk-ribbon-pink"
      }
    ]
  },
  "silkflora-brown": {
    "themeId": "silkflora-brown",
    "folder": "silkflora-brown",
    "assetCount": 2,
    "totalBytes": 333940,
    "assets": [
      {
        "id": "bottom",
        "file": "bottom.webp",
        "path": "/images/themes/silkflora-brown/bottom.webp",
        "format": "WEBP",
        "width": 1188,
        "height": 1672,
        "aspectRatio": 0.711,
        "size": 152350,
        "md5": "ea83f305cfca90e8dc15a43bc7e3e1f5",
        "type": "decoration",
        "usage": "Body or footer illustration for silkflora-brown"
      },
      {
        "id": "middle",
        "file": "middle.webp",
        "path": "/images/themes/silkflora-brown/middle.webp",
        "format": "WEBP",
        "width": 996,
        "height": 1946,
        "aspectRatio": 0.512,
        "size": 181590,
        "md5": "8aff763aafda68cb9f569779a54bcff1",
        "type": "decoration",
        "usage": "Body or footer illustration for silkflora-brown"
      }
    ]
  },
  "song-hac-red": {
    "themeId": "song-hac-red",
    "folder": "song-hac-red",
    "assetCount": 7,
    "totalBytes": 835162,
    "assets": [
      {
        "id": "bg-texture",
        "file": "bg-texture.webp",
        "path": "/images/themes/song-hac-red/bg-texture.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1350,
        "aspectRatio": 0.667,
        "size": 87462,
        "md5": "a9302a22d2c5ad62ba9286f2b4216440",
        "type": "background",
        "usage": "Background paper or ambient texture for song-hac-red"
      },
      {
        "id": "bird-decoration",
        "file": "bird-decoration.webp",
        "path": "/images/themes/song-hac-red/bird-decoration.webp",
        "format": "WEBP",
        "width": 900,
        "height": 920,
        "aspectRatio": 0.978,
        "size": 230186,
        "md5": "1e0cf8f92090741b4b51abfc17df0510",
        "type": "decoration",
        "usage": "Ornamental artwork for song-hac-red"
      },
      {
        "id": "cloud1-decoration",
        "file": "cloud1-decoration.webp",
        "path": "/images/themes/song-hac-red/cloud1-decoration.webp",
        "format": "WEBP",
        "width": 700,
        "height": 209,
        "aspectRatio": 3.349,
        "size": 54970,
        "md5": "15f7edbc2ab8efc4117aa704c65763f3",
        "type": "decoration",
        "usage": "Decorative element (cloud1-decoration) for song-hac-red"
      },
      {
        "id": "cloud2-decoration",
        "file": "cloud2-decoration.webp",
        "path": "/images/themes/song-hac-red/cloud2-decoration.webp",
        "format": "WEBP",
        "width": 560,
        "height": 339,
        "aspectRatio": 1.652,
        "size": 64496,
        "md5": "9923dde74df22b83b97a9e54e534b5fe",
        "type": "decoration",
        "usage": "Decorative element (cloud2-decoration) for song-hac-red"
      },
      {
        "id": "double-happiness",
        "file": "double-happiness.webp",
        "path": "/images/themes/song-hac-red/double-happiness.webp",
        "format": "WEBP",
        "width": 320,
        "height": 277,
        "aspectRatio": 1.155,
        "size": 27292,
        "md5": "ab800bfcf8c4c77d473d3e3932072e3c",
        "type": "decoration",
        "usage": "Ornamental artwork for song-hac-red"
      },
      {
        "id": "flower1-decoration",
        "file": "flower1-decoration.webp",
        "path": "/images/themes/song-hac-red/flower1-decoration.webp",
        "format": "WEBP",
        "width": 520,
        "height": 476,
        "aspectRatio": 1.092,
        "size": 103712,
        "md5": "922db3ee57e41d366357607680100cf8",
        "type": "decoration",
        "usage": "Decorative element (flower1-decoration) for song-hac-red"
      },
      {
        "id": "moon-decoration",
        "file": "moon-decoration.webp",
        "path": "/images/themes/song-hac-red/moon-decoration.webp",
        "format": "WEBP",
        "width": 900,
        "height": 882,
        "aspectRatio": 1.02,
        "size": 267044,
        "md5": "88fece4897bbdcb069493ff313d54269",
        "type": "decoration",
        "usage": "Ornamental artwork for song-hac-red"
      }
    ]
  },
  "song-hy-red": {
    "themeId": "song-hy-red",
    "folder": "song-hy-red",
    "assetCount": 2,
    "totalBytes": 11663,
    "assets": [
      {
        "id": "chu-hy",
        "file": "chu-hy.webp",
        "path": "/images/themes/song-hy-red/chu-hy.webp",
        "format": "PNG",
        "width": 1272,
        "height": 1271,
        "aspectRatio": 1.001,
        "size": 11397,
        "md5": "18117f9680418383595617285026bb42",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for song-hy-red"
      },
      {
        "id": "sunburst",
        "file": "sunburst.svg",
        "path": "/images/themes/song-hy-red/sunburst.svg",
        "format": "SVG",
        "width": 671,
        "height": 671,
        "aspectRatio": 1.0,
        "size": 266,
        "md5": "e8c315fb98def6164a8a38b36bb6b260",
        "type": "decoration",
        "usage": "Decorative element (sunburst) for song-hy-red"
      }
    ]
  },
  "song-hy-v2-red": {
    "themeId": "song-hy-v2-red",
    "folder": "song-hy-v2-red",
    "assetCount": 4,
    "totalBytes": 129911,
    "assets": [
      {
        "id": "double-happiness-bg",
        "file": "double-happiness-bg.webp",
        "path": "/images/themes/song-hy-v2-red/double-happiness-bg.webp",
        "format": "WEBP",
        "width": 1065,
        "height": 1194,
        "aspectRatio": 0.892,
        "size": 88660,
        "md5": "c1a9124d1224f322a7fe941635d23de1",
        "type": "background",
        "usage": "Background paper or ambient texture for song-hy-v2-red"
      },
      {
        "id": "double-happiness-light",
        "file": "double-happiness-light.webp",
        "path": "/images/themes/song-hy-v2-red/double-happiness-light.webp",
        "format": "WEBP",
        "width": 480,
        "height": 455,
        "aspectRatio": 1.055,
        "size": 19774,
        "md5": "8e420d16d9a518aae515bffc41457c01",
        "type": "decoration",
        "usage": "Ornamental artwork for song-hy-v2-red"
      },
      {
        "id": "double-happiness",
        "file": "double-happiness.webp",
        "path": "/images/themes/song-hy-v2-red/double-happiness.webp",
        "format": "WEBP",
        "width": 480,
        "height": 455,
        "aspectRatio": 1.055,
        "size": 18908,
        "md5": "5f37944fcd3b2763753a665395e22658",
        "type": "decoration",
        "usage": "Ornamental artwork for song-hy-v2-red"
      },
      {
        "id": "hero-shape",
        "file": "hero-shape.svg",
        "path": "/images/themes/song-hy-v2-red/hero-shape.svg",
        "format": "SVG",
        "width": 512,
        "height": 521,
        "aspectRatio": 0.983,
        "size": 2569,
        "md5": "b0824f287211e49a2c4e6f5ed3a3de51",
        "type": "decoration",
        "usage": "Header ornament for song-hy-v2-red"
      }
    ]
  },
  "songlong-red": {
    "themeId": "songlong-red",
    "folder": "songlong-red",
    "assetCount": 6,
    "totalBytes": 244798,
    "assets": [
      {
        "id": "chinese_happiness",
        "file": "chinese_happiness.webp",
        "path": "/images/themes/songlong-red/chinese_happiness.webp",
        "format": "WEBP",
        "width": 177,
        "height": 176,
        "aspectRatio": 1.006,
        "size": 6236,
        "md5": "5a71f152116e20ed0e1895452d95cc34",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for songlong-red"
      },
      {
        "id": "cloud_big",
        "file": "cloud_big.webp",
        "path": "/images/themes/songlong-red/cloud_big.webp",
        "format": "WEBP",
        "width": 308,
        "height": 134,
        "aspectRatio": 2.299,
        "size": 8924,
        "md5": "2a8491fa065fb885719766d997d08cd0",
        "type": "decoration",
        "usage": "Decorative element (cloud_big) for songlong-red"
      },
      {
        "id": "cloud_small",
        "file": "cloud_small.webp",
        "path": "/images/themes/songlong-red/cloud_small.webp",
        "format": "WEBP",
        "width": 191,
        "height": 123,
        "aspectRatio": 1.553,
        "size": 5850,
        "md5": "c90661183b9a8b454a5b27739b06cf7b",
        "type": "decoration",
        "usage": "Decorative element (cloud_small) for songlong-red"
      },
      {
        "id": "dragon_left",
        "file": "dragon_left.webp",
        "path": "/images/themes/songlong-red/dragon_left.webp",
        "format": "WEBP",
        "width": 622,
        "height": 837,
        "aspectRatio": 0.743,
        "size": 110198,
        "md5": "62e3dc7d145a8e81a7affc744a2ba214",
        "type": "decoration",
        "usage": "Decorative element (dragon_left) for songlong-red"
      },
      {
        "id": "dragon_right",
        "file": "dragon_right.webp",
        "path": "/images/themes/songlong-red/dragon_right.webp",
        "format": "WEBP",
        "width": 621,
        "height": 837,
        "aspectRatio": 0.742,
        "size": 110304,
        "md5": "0e859bab5a93e4fad4b81a26dfc5db19",
        "type": "decoration",
        "usage": "Decorative element (dragon_right) for songlong-red"
      },
      {
        "id": "wave",
        "file": "wave.webp",
        "path": "/images/themes/songlong-red/wave.webp",
        "format": "WEBP",
        "width": 136,
        "height": 54,
        "aspectRatio": 2.519,
        "size": 3286,
        "md5": "bd57391ca621b220aa46ff709b4e0668",
        "type": "decoration",
        "usage": "Decorative element (wave) for songlong-red"
      }
    ]
  },
  "songphung-green": {
    "themeId": "songphung-green",
    "folder": "songphung-green",
    "assetCount": 3,
    "totalBytes": 924597,
    "assets": [
      {
        "id": "HOA",
        "file": "HOA.webp",
        "path": "/images/themes/songphung-green/HOA.webp",
        "format": "WEBP",
        "width": 964,
        "height": 1095,
        "aspectRatio": 0.88,
        "size": 160168,
        "md5": "6cd60f4c1aa56007b34a8ad0aeb145e1",
        "type": "decoration",
        "usage": "Decorative element (hoa) for songphung-green"
      },
      {
        "id": "NENGIAY",
        "file": "NENGIAY.jpg",
        "path": "/images/themes/songphung-green/NENGIAY.jpg",
        "format": "JPEG",
        "width": 1000,
        "height": 1500,
        "aspectRatio": 0.667,
        "size": 211733,
        "md5": "6b466a560f5e6edf8f188a59dfd91cac",
        "type": "background",
        "usage": "Background paper or ambient texture for songphung-green"
      },
      {
        "id": "Phuong",
        "file": "Phuong.webp",
        "path": "/images/themes/songphung-green/Phuong.webp",
        "format": "WEBP",
        "width": 1952,
        "height": 4105,
        "aspectRatio": 0.476,
        "size": 552696,
        "md5": "9a7bc59fef9e12f666e86950bcfcfbff",
        "type": "decoration",
        "usage": "Decorative element (phuong) for songphung-green"
      }
    ]
  },
  "songphung-red": {
    "themeId": "songphung-red",
    "folder": "songphung-red",
    "assetCount": 6,
    "totalBytes": 1563563,
    "assets": [
      {
        "id": "CHU_HY",
        "file": "CHU HY.webp",
        "path": "/images/themes/songphung-red/CHU HY.webp",
        "format": "WEBP",
        "width": 1272,
        "height": 1271,
        "aspectRatio": 1.001,
        "size": 15464,
        "md5": "3254ede7020f42bc42a1502884e6ffa5",
        "type": "decoration",
        "usage": "Ornamental artwork for songphung-red"
      },
      {
        "id": "HOA",
        "file": "HOA.webp",
        "path": "/images/themes/songphung-red/HOA.webp",
        "format": "WEBP",
        "width": 964,
        "height": 1095,
        "aspectRatio": 0.88,
        "size": 133280,
        "md5": "736b1b72f3142e130d6c91af7b901c12",
        "type": "decoration",
        "usage": "Decorative element (hoa) for songphung-red"
      },
      {
        "id": "NENGIAY",
        "file": "NENGIAY.jpg",
        "path": "/images/themes/songphung-red/NENGIAY.jpg",
        "format": "JPEG",
        "width": 1000,
        "height": 1500,
        "aspectRatio": 0.667,
        "size": 211733,
        "md5": "6b466a560f5e6edf8f188a59dfd91cac",
        "type": "background",
        "usage": "Background paper or ambient texture for songphung-red"
      },
      {
        "id": "Phuong_2",
        "file": "Phuong 2.webp",
        "path": "/images/themes/songphung-red/Phuong 2.webp",
        "format": "WEBP",
        "width": 1952,
        "height": 4105,
        "aspectRatio": 0.476,
        "size": 369918,
        "md5": "63a34b590166da8e093706e692a8e4db",
        "type": "decoration",
        "usage": "Decorative element (phuong 2) for songphung-red"
      },
      {
        "id": "Phuong_line",
        "file": "Phuong line.webp",
        "path": "/images/themes/songphung-red/Phuong line.webp",
        "format": "WEBP",
        "width": 1966,
        "height": 4119,
        "aspectRatio": 0.477,
        "size": 512178,
        "md5": "2cc366ac12cfe558f4f39b20628d7a55",
        "type": "divider",
        "usage": "Decorative divider line for songphung-red"
      },
      {
        "id": "Phuong",
        "file": "Phuong.webp",
        "path": "/images/themes/songphung-red/Phuong.webp",
        "format": "WEBP",
        "width": 1952,
        "height": 4105,
        "aspectRatio": 0.476,
        "size": 320990,
        "md5": "9db6e5581f2840af72b86abb7fb87306",
        "type": "decoration",
        "usage": "Decorative element (phuong) for songphung-red"
      }
    ]
  },
  "sunflower": {
    "themeId": "sunflower",
    "folder": "sunflower",
    "assetCount": 2,
    "totalBytes": 321062,
    "assets": [
      {
        "id": "flower2",
        "file": "flower2.webp",
        "path": "/images/themes/sunflower/flower2.webp",
        "format": "WEBP",
        "width": 626,
        "height": 1191,
        "aspectRatio": 0.526,
        "size": 148482,
        "md5": "e43d3c05209b3d5d842f974219bdb916",
        "type": "decoration",
        "usage": "Decorative element (flower2) for sunflower"
      },
      {
        "id": "flower4",
        "file": "flower4.webp",
        "path": "/images/themes/sunflower/flower4.webp",
        "format": "WEBP",
        "width": 693,
        "height": 1163,
        "aspectRatio": 0.596,
        "size": 172580,
        "md5": "215f316e57987ea52a34dce62cba53b5",
        "type": "decoration",
        "usage": "Decorative element (flower4) for sunflower"
      }
    ]
  },
  "thanhdiep-green": {
    "themeId": "thanhdiep-green",
    "folder": "thanhdiep-green",
    "assetCount": 3,
    "totalBytes": 568208,
    "assets": [
      {
        "id": "la1",
        "file": "la1.webp",
        "path": "/images/themes/thanhdiep-green/la1.webp",
        "format": "WEBP",
        "width": 1748,
        "height": 2480,
        "aspectRatio": 0.705,
        "size": 140724,
        "md5": "5029068b22f911da93527a065ed28f6a",
        "type": "decoration",
        "usage": "Decorative element (la1) for thanhdiep-green"
      },
      {
        "id": "la2",
        "file": "la2.webp",
        "path": "/images/themes/thanhdiep-green/la2.webp",
        "format": "WEBP",
        "width": 1748,
        "height": 2480,
        "aspectRatio": 0.705,
        "size": 149092,
        "md5": "6775cbef60be8d452909faa9dc7bb216",
        "type": "decoration",
        "usage": "Decorative element (la2) for thanhdiep-green"
      },
      {
        "id": "la3",
        "file": "la3.webp",
        "path": "/images/themes/thanhdiep-green/la3.webp",
        "format": "WEBP",
        "width": 1748,
        "height": 2480,
        "aspectRatio": 0.705,
        "size": 278392,
        "md5": "2148710bac3b1c42469b8d208d55f472",
        "type": "decoration",
        "usage": "Decorative element (la3) for thanhdiep-green"
      }
    ]
  },
  "vuon xuan blue": {
    "themeId": "vuon xuan blue",
    "folder": "vuon xuan blue",
    "assetCount": 3,
    "totalBytes": 446710,
    "assets": [
      {
        "id": "button",
        "file": "button.webp",
        "path": "/images/themes/vuon xuan blue/button.webp",
        "format": "WEBP",
        "width": 1569,
        "height": 2000,
        "aspectRatio": 0.784,
        "size": 150866,
        "md5": "f1f1616f849ee68bd701094a7bce38b6",
        "type": "decoration",
        "usage": "Body or footer illustration for vuon xuan blue"
      },
      {
        "id": "mid",
        "file": "mid.webp",
        "path": "/images/themes/vuon xuan blue/mid.webp",
        "format": "WEBP",
        "width": 1971,
        "height": 2000,
        "aspectRatio": 0.986,
        "size": 120182,
        "md5": "1f5b2ab3ea2b4c0e4f5c75de036b3cc7",
        "type": "decoration",
        "usage": "Body or footer illustration for vuon xuan blue"
      },
      {
        "id": "top",
        "file": "top.webp",
        "path": "/images/themes/vuon xuan blue/top.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 1940,
        "aspectRatio": 1.031,
        "size": 175662,
        "md5": "5de89e3dc1ae23bf6d7de3eb40ebe17c",
        "type": "decoration",
        "usage": "Header ornament for vuon xuan blue"
      }
    ]
  },
  "vuon xuan red": {
    "themeId": "vuon xuan red",
    "folder": "vuon xuan red",
    "assetCount": 6,
    "totalBytes": 333366,
    "assets": [
      {
        "id": "1_left",
        "file": "1 left.webp",
        "path": "/images/themes/vuon xuan red/1 left.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 1999,
        "aspectRatio": 1.001,
        "size": 57264,
        "md5": "cdb1a104de1ed0d14d452651802112bc",
        "type": "decoration",
        "usage": "Ornamental artwork for vuon xuan red"
      },
      {
        "id": "2_right",
        "file": "2 right.webp",
        "path": "/images/themes/vuon xuan red/2 right.webp",
        "format": "WEBP",
        "width": 1990,
        "height": 2000,
        "aspectRatio": 0.995,
        "size": 59120,
        "md5": "b7f35726f78c143e193681f3df65a159",
        "type": "decoration",
        "usage": "Ornamental artwork for vuon xuan red"
      },
      {
        "id": "3_left",
        "file": "3 left.webp",
        "path": "/images/themes/vuon xuan red/3 left.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 1925,
        "aspectRatio": 1.039,
        "size": 57640,
        "md5": "22e80ff9e496787cc9999ea944290b90",
        "type": "decoration",
        "usage": "Ornamental artwork for vuon xuan red"
      },
      {
        "id": "4_right",
        "file": "4 right.webp",
        "path": "/images/themes/vuon xuan red/4 right.webp",
        "format": "WEBP",
        "width": 1760,
        "height": 2000,
        "aspectRatio": 0.88,
        "size": 72734,
        "md5": "d03728e2fc0f1c477b35f277bd1163aa",
        "type": "decoration",
        "usage": "Ornamental artwork for vuon xuan red"
      },
      {
        "id": "button_left",
        "file": "button left.webp",
        "path": "/images/themes/vuon xuan red/button left.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 1029,
        "aspectRatio": 1.944,
        "size": 45410,
        "md5": "fd4edc030ae9af520a0a2b1eb52d328d",
        "type": "decoration",
        "usage": "Body or footer illustration for vuon xuan red"
      },
      {
        "id": "top_right",
        "file": "top right.webp",
        "path": "/images/themes/vuon xuan red/top right.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 952,
        "aspectRatio": 2.101,
        "size": 41198,
        "md5": "bdfe7b42a4b305964354c15a4008972a",
        "type": "decoration",
        "usage": "Header ornament for vuon xuan red"
      }
    ]
  }
};

export const TEMPLATE_MANIFESTS: Record<string, TemplateAssetManifest> = {
  "minimalism_darkred": {
    "templateId": "minimalism_darkred",
    "slug": "minimalism-do-dam",
    "name": "Minimalism - Đỏ Đậm",
    "themeFolders": [
      "minimalism-dark-red"
    ],
    "assetCount": 5,
    "totalBytes": 904416,
    "assets": [
      {
        "id": "castle-background",
        "file": "castle-background.webp",
        "path": "/images/themes/minimalism-dark-red/castle-background.webp",
        "format": "WEBP",
        "width": 1310,
        "height": 1009,
        "aspectRatio": 1.298,
        "size": 252208,
        "md5": "5ddf43ce44557a8d06c3f7dc29ad436e",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-red"
      },
      {
        "id": "envelope-background",
        "file": "envelope-background.webp",
        "path": "/images/themes/minimalism-dark-red/envelope-background.webp",
        "format": "WEBP",
        "width": 1013,
        "height": 1168,
        "aspectRatio": 0.867,
        "size": 190858,
        "md5": "fd322ea89e36d7ee10f404864f980222",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-red"
      },
      {
        "id": "envelope-cover",
        "file": "envelope-cover.webp",
        "path": "/images/themes/minimalism-dark-red/envelope-cover.webp",
        "format": "WEBP",
        "width": 1013,
        "height": 668,
        "aspectRatio": 1.516,
        "size": 87010,
        "md5": "580fc7d8d1cabd8f92352636858bcf6f",
        "type": "cover",
        "usage": "Envelope or cover illustration for minimalism-dark-red"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/minimalism-dark-red/flower2-decoration.webp",
        "format": "WEBP",
        "width": 811,
        "height": 1938,
        "aspectRatio": 0.418,
        "size": 233242,
        "md5": "effda800b9cdd1f3ad75256807bd6112",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for minimalism-dark-red"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/minimalism-dark-red/paper.webp",
        "format": "WEBP",
        "width": 1333,
        "height": 2000,
        "aspectRatio": 0.666,
        "size": 141098,
        "md5": "ca2d285c30e0d374bea87efd9bae1f66",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-red"
      }
    ],
    "backgroundPath": "/images/themes/minimalism-dark-red/castle-background.webp",
    "coverPath": "/images/themes/minimalism-dark-red/envelope-cover.webp",
    "decorationsCount": 1,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "minimalism_brown": {
    "templateId": "minimalism_brown",
    "slug": "minimalism-nau",
    "name": "Minimalism - Nâu",
    "themeFolders": [
      "minimalism-brown"
    ],
    "assetCount": 6,
    "totalBytes": 1128314,
    "assets": [
      {
        "id": "couple",
        "file": "couple.webp",
        "path": "/images/themes/minimalism-brown/couple.webp",
        "format": "WEBP",
        "width": 1448,
        "height": 2048,
        "aspectRatio": 0.707,
        "size": 484212,
        "md5": "170e263aba80fadd05fba884fdaf7fe5",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-brown"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/minimalism-brown/flower2-decoration.webp",
        "format": "WEBP",
        "width": 499,
        "height": 1159,
        "aspectRatio": 0.431,
        "size": 117988,
        "md5": "a2432d0909de43306879f56927a569a1",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for minimalism-brown"
      },
      {
        "id": "frame-avatar",
        "file": "frame-avatar.webp",
        "path": "/images/themes/minimalism-brown/frame-avatar.webp",
        "format": "WEBP",
        "width": 1094,
        "height": 1554,
        "aspectRatio": 0.704,
        "size": 70506,
        "md5": "e99743d80e89b076d0251cd76266cd61",
        "type": "frame",
        "usage": "Framing border or arch for minimalism-brown"
      },
      {
        "id": "house-background",
        "file": "house-background.webp",
        "path": "/images/themes/minimalism-brown/house-background.webp",
        "format": "WEBP",
        "width": 1188,
        "height": 1171,
        "aspectRatio": 1.015,
        "size": 249674,
        "md5": "14405e5b5d699af08ccba5ef1e454a62",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-brown"
      },
      {
        "id": "leaf-background",
        "file": "leaf-background.webp",
        "path": "/images/themes/minimalism-brown/leaf-background.webp",
        "format": "WEBP",
        "width": 441,
        "height": 1254,
        "aspectRatio": 0.352,
        "size": 64836,
        "md5": "dcbd16c48686a21c596b45e18c2d808b",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-brown"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/minimalism-brown/paper.webp",
        "format": "WEBP",
        "width": 1333,
        "height": 2000,
        "aspectRatio": 0.666,
        "size": 141098,
        "md5": "ca2d285c30e0d374bea87efd9bae1f66",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-brown"
      }
    ],
    "backgroundPath": "/images/themes/minimalism-brown/house-background.webp",
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "song_hy_green": {
    "templateId": "song_hy_green",
    "slug": "song-hy-xanh",
    "name": "Song Hỷ - Xanh",
    "themeFolders": [
      "song-hy-red",
      "songphung-green"
    ],
    "assetCount": 5,
    "totalBytes": 936260,
    "assets": [
      {
        "id": "chu-hy",
        "file": "chu-hy.webp",
        "path": "/images/themes/song-hy-red/chu-hy.webp",
        "format": "PNG",
        "width": 1272,
        "height": 1271,
        "aspectRatio": 1.001,
        "size": 11397,
        "md5": "18117f9680418383595617285026bb42",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for song-hy-red"
      },
      {
        "id": "sunburst",
        "file": "sunburst.svg",
        "path": "/images/themes/song-hy-red/sunburst.svg",
        "format": "SVG",
        "width": 671,
        "height": 671,
        "aspectRatio": 1.0,
        "size": 266,
        "md5": "e8c315fb98def6164a8a38b36bb6b260",
        "type": "decoration",
        "usage": "Decorative element (sunburst) for song-hy-red"
      },
      {
        "id": "HOA",
        "file": "HOA.webp",
        "path": "/images/themes/songphung-green/HOA.webp",
        "format": "WEBP",
        "width": 964,
        "height": 1095,
        "aspectRatio": 0.88,
        "size": 160168,
        "md5": "6cd60f4c1aa56007b34a8ad0aeb145e1",
        "type": "decoration",
        "usage": "Decorative element (hoa) for songphung-green"
      },
      {
        "id": "NENGIAY",
        "file": "NENGIAY.jpg",
        "path": "/images/themes/songphung-green/NENGIAY.jpg",
        "format": "JPEG",
        "width": 1000,
        "height": 1500,
        "aspectRatio": 0.667,
        "size": 211733,
        "md5": "6b466a560f5e6edf8f188a59dfd91cac",
        "type": "background",
        "usage": "Background paper or ambient texture for songphung-green"
      },
      {
        "id": "Phuong",
        "file": "Phuong.webp",
        "path": "/images/themes/songphung-green/Phuong.webp",
        "format": "WEBP",
        "width": 1952,
        "height": 4105,
        "aspectRatio": 0.476,
        "size": 552696,
        "md5": "9a7bc59fef9e12f666e86950bcfcfbff",
        "type": "decoration",
        "usage": "Decorative element (phuong) for songphung-green"
      }
    ],
    "backgroundPath": "/images/themes/songphung-green/NENGIAY.jpg",
    "coverPath": null,
    "decorationsCount": 3,
    "framesCount": 0,
    "isSharedTheme": true,
    "sharedWith": [
      "song_hy_red",
      "song_hy_green"
    ],
    "status": "active"
  },
  "boho_floral_green": {
    "templateId": "boho_floral_green",
    "slug": "hoa-moc-xanh",
    "name": "Hoa Mộc - Xanh",
    "themeFolders": [
      "boho-floral-green"
    ],
    "assetCount": 2,
    "totalBytes": 650398,
    "assets": [
      {
        "id": "decoration_bar",
        "file": "decoration_bar.webp",
        "path": "/images/themes/boho-floral-green/decoration_bar.webp",
        "format": "WEBP",
        "width": 3304,
        "height": 421,
        "aspectRatio": 7.848,
        "size": 153632,
        "md5": "ea0b95514b68e87de39f93af2931910a",
        "type": "decoration",
        "usage": "Ornamental artwork for boho-floral-green"
      },
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/boho-floral-green/flower.webp",
        "format": "WEBP",
        "width": 1800,
        "height": 1800,
        "aspectRatio": 1.0,
        "size": 496766,
        "md5": "91f18d3af81dcbeb8db99f916b894fac",
        "type": "decoration",
        "usage": "Decorative element (flower) for boho-floral-green"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "song_hy_red": {
    "templateId": "song_hy_red",
    "slug": "song-hy-do",
    "name": "Song Hỷ - Đỏ",
    "themeFolders": [
      "song-hy-red"
    ],
    "assetCount": 2,
    "totalBytes": 11663,
    "assets": [
      {
        "id": "chu-hy",
        "file": "chu-hy.webp",
        "path": "/images/themes/song-hy-red/chu-hy.webp",
        "format": "PNG",
        "width": 1272,
        "height": 1271,
        "aspectRatio": 1.001,
        "size": 11397,
        "md5": "18117f9680418383595617285026bb42",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for song-hy-red"
      },
      {
        "id": "sunburst",
        "file": "sunburst.svg",
        "path": "/images/themes/song-hy-red/sunburst.svg",
        "format": "SVG",
        "width": 671,
        "height": 671,
        "aspectRatio": 1.0,
        "size": 266,
        "md5": "e8c315fb98def6164a8a38b36bb6b260",
        "type": "decoration",
        "usage": "Decorative element (sunburst) for song-hy-red"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 1,
    "framesCount": 0,
    "isSharedTheme": true,
    "sharedWith": [
      "song_hy_red",
      "song_hy_green"
    ],
    "status": "active"
  },
  "minimalism_green": {
    "templateId": "minimalism_green",
    "slug": "minimalism-xanh",
    "name": "Minimalism - Xanh",
    "themeFolders": [
      "minimalism-green"
    ],
    "assetCount": 9,
    "totalBytes": 765000,
    "assets": [
      {
        "id": "cake",
        "file": "cake.webp",
        "path": "/images/themes/minimalism-green/cake.webp",
        "format": "WEBP",
        "width": 1564,
        "height": 1630,
        "aspectRatio": 0.96,
        "size": 34796,
        "md5": "5302622edf3e6864f3cc526e8acb418c",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-green"
      },
      {
        "id": "envelope-cut",
        "file": "envelope-cut.webp",
        "path": "/images/themes/minimalism-green/envelope-cut.webp",
        "format": "WEBP",
        "width": 2042,
        "height": 1321,
        "aspectRatio": 1.546,
        "size": 62888,
        "md5": "5dbdaa83cc5a277c5cae4932c8b51e71",
        "type": "cover",
        "usage": "Envelope or cover illustration for minimalism-green"
      },
      {
        "id": "envelope",
        "file": "envelope.webp",
        "path": "/images/themes/minimalism-green/envelope.webp",
        "format": "WEBP",
        "width": 2042,
        "height": 2226,
        "aspectRatio": 0.917,
        "size": 99786,
        "md5": "094948342b9a2ef9864bfa68b071aff9",
        "type": "cover",
        "usage": "Envelope or cover illustration for minimalism-green"
      },
      {
        "id": "flower-background",
        "file": "flower-background.webp",
        "path": "/images/themes/minimalism-green/flower-background.webp",
        "format": "WEBP",
        "width": 2048,
        "height": 2208,
        "aspectRatio": 0.928,
        "size": 280626,
        "md5": "febd3f1560120311c5e8e7a92976562e",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-green"
      },
      {
        "id": "flower-line",
        "file": "flower-line.webp",
        "path": "/images/themes/minimalism-green/flower-line.webp",
        "format": "WEBP",
        "width": 3250,
        "height": 318,
        "aspectRatio": 10.22,
        "size": 32208,
        "md5": "a725d1f8733eac7fabb017736e54c877",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-green"
      },
      {
        "id": "guestbook-background",
        "file": "guestbook-background.webp",
        "path": "/images/themes/minimalism-green/guestbook-background.webp",
        "format": "WEBP",
        "width": 1939,
        "height": 1760,
        "aspectRatio": 1.102,
        "size": 62164,
        "md5": "6b232b1c6b32ea400e6a0bda96edbaaf",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-green"
      },
      {
        "id": "home",
        "file": "home.webp",
        "path": "/images/themes/minimalism-green/home.webp",
        "format": "WEBP",
        "width": 1554,
        "height": 1544,
        "aspectRatio": 1.006,
        "size": 35178,
        "md5": "abd1ba7979706f47bad506f842b83637",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-green"
      },
      {
        "id": "music",
        "file": "music.webp",
        "path": "/images/themes/minimalism-green/music.webp",
        "format": "WEBP",
        "width": 1474,
        "height": 1500,
        "aspectRatio": 0.983,
        "size": 33852,
        "md5": "2b5ca4fe5b738ae14ee49e0f8f609abb",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-green"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/minimalism-green/paper.webp",
        "format": "WEBP",
        "width": 1333,
        "height": 2000,
        "aspectRatio": 0.666,
        "size": 123502,
        "md5": "8a93144a7ed6835c7c67d371c0a6f846",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-green"
      }
    ],
    "backgroundPath": "/images/themes/minimalism-green/flower-background.webp",
    "coverPath": "/images/themes/minimalism-green/envelope-cut.webp",
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "song_hy_v2_red": {
    "templateId": "song_hy_v2_red",
    "slug": "song-hy-v2-do",
    "name": "Song Hỷ V2 - Đỏ",
    "themeFolders": [
      "song-hy-v2-red"
    ],
    "assetCount": 4,
    "totalBytes": 129911,
    "assets": [
      {
        "id": "double-happiness-bg",
        "file": "double-happiness-bg.webp",
        "path": "/images/themes/song-hy-v2-red/double-happiness-bg.webp",
        "format": "WEBP",
        "width": 1065,
        "height": 1194,
        "aspectRatio": 0.892,
        "size": 88660,
        "md5": "c1a9124d1224f322a7fe941635d23de1",
        "type": "background",
        "usage": "Background paper or ambient texture for song-hy-v2-red"
      },
      {
        "id": "double-happiness-light",
        "file": "double-happiness-light.webp",
        "path": "/images/themes/song-hy-v2-red/double-happiness-light.webp",
        "format": "WEBP",
        "width": 480,
        "height": 455,
        "aspectRatio": 1.055,
        "size": 19774,
        "md5": "8e420d16d9a518aae515bffc41457c01",
        "type": "decoration",
        "usage": "Ornamental artwork for song-hy-v2-red"
      },
      {
        "id": "double-happiness",
        "file": "double-happiness.webp",
        "path": "/images/themes/song-hy-v2-red/double-happiness.webp",
        "format": "WEBP",
        "width": 480,
        "height": 455,
        "aspectRatio": 1.055,
        "size": 18908,
        "md5": "5f37944fcd3b2763753a665395e22658",
        "type": "decoration",
        "usage": "Ornamental artwork for song-hy-v2-red"
      },
      {
        "id": "hero-shape",
        "file": "hero-shape.svg",
        "path": "/images/themes/song-hy-v2-red/hero-shape.svg",
        "format": "SVG",
        "width": 512,
        "height": 521,
        "aspectRatio": 0.983,
        "size": 2569,
        "md5": "b0824f287211e49a2c4e6f5ed3a3de51",
        "type": "decoration",
        "usage": "Header ornament for song-hy-v2-red"
      }
    ],
    "backgroundPath": "/images/themes/song-hy-v2-red/double-happiness-bg.webp",
    "coverPath": null,
    "decorationsCount": 3,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "silk_ribbon_green": {
    "templateId": "silk_ribbon_green",
    "slug": "to-duyen-xanh",
    "name": "Tơ Duyên - Xanh",
    "themeFolders": [
      "silk-ribbon-green"
    ],
    "assetCount": 3,
    "totalBytes": 236432,
    "assets": [
      {
        "id": "flower-decoration",
        "file": "flower-decoration.webp",
        "path": "/images/themes/silk-ribbon-green/flower-decoration.webp",
        "format": "WEBP",
        "width": 1004,
        "height": 1195,
        "aspectRatio": 0.84,
        "size": 69336,
        "md5": "baede74db1dc097e521e262e17b351f1",
        "type": "decoration",
        "usage": "Decorative element (flower-decoration) for silk-ribbon-green"
      },
      {
        "id": "line-decoration",
        "file": "line-decoration.webp",
        "path": "/images/themes/silk-ribbon-green/line-decoration.webp",
        "format": "WEBP",
        "width": 724,
        "height": 2172,
        "aspectRatio": 0.333,
        "size": 104968,
        "md5": "56cc44e8d1a125755a9088cb4f120899",
        "type": "divider",
        "usage": "Decorative divider line for silk-ribbon-green"
      },
      {
        "id": "ribbon-decoration",
        "file": "ribbon-decoration.webp",
        "path": "/images/themes/silk-ribbon-green/ribbon-decoration.webp",
        "format": "WEBP",
        "width": 1600,
        "height": 281,
        "aspectRatio": 5.694,
        "size": 62128,
        "md5": "0458bd5e5819e482a41aa1ae825e7cb7",
        "type": "decoration",
        "usage": "Ornamental artwork for silk-ribbon-green"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "glass_garden_pink": {
    "templateId": "glass_garden_pink",
    "slug": "vuonkinh-hong",
    "name": "Vườn Kính - Hồng",
    "themeFolders": [
      "glass-garden-pink"
    ],
    "assetCount": 3,
    "totalBytes": 469600,
    "assets": [
      {
        "id": "floral-background",
        "file": "floral-background.webp",
        "path": "/images/themes/glass-garden-pink/floral-background.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 30368,
        "md5": "b528fcabeaf070d5f1074d20b8e9393a",
        "type": "background",
        "usage": "Background paper or ambient texture for glass-garden-pink"
      },
      {
        "id": "flower1-decoration",
        "file": "flower1-decoration.webp",
        "path": "/images/themes/glass-garden-pink/flower1-decoration.webp",
        "format": "WEBP",
        "width": 1122,
        "height": 1402,
        "aspectRatio": 0.8,
        "size": 126814,
        "md5": "7c0aef9c83d486416ad2049b42483de0",
        "type": "decoration",
        "usage": "Decorative element (flower1-decoration) for glass-garden-pink"
      },
      {
        "id": "leaf1-bloom",
        "file": "leaf1-bloom.webp",
        "path": "/images/themes/glass-garden-pink/leaf1-bloom.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 312418,
        "md5": "6bf81adabf1fa0f0283f6de33611c986",
        "type": "decoration",
        "usage": "Decorative element (leaf1-bloom) for glass-garden-pink"
      }
    ],
    "backgroundPath": "/images/themes/glass-garden-pink/floral-background.webp",
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "jasmine_white": {
    "templateId": "jasmine_white",
    "slug": "mai-lan-trang",
    "name": "Mai Lan - Trắng",
    "themeFolders": [
      "moclan-white"
    ],
    "assetCount": 2,
    "totalBytes": 223890,
    "assets": [
      {
        "id": "hoa",
        "file": "hoa.webp",
        "path": "/images/themes/moclan-white/hoa.webp",
        "format": "WEBP",
        "width": 1200,
        "height": 1167,
        "aspectRatio": 1.028,
        "size": 101810,
        "md5": "5716225299bdc988c242f1dd3dc5a536",
        "type": "decoration",
        "usage": "Decorative element (hoa) for moclan-white"
      },
      {
        "id": "khung-hoa",
        "file": "khung-hoa.webp",
        "path": "/images/themes/moclan-white/khung-hoa.webp",
        "format": "WEBP",
        "width": 1200,
        "height": 2120,
        "aspectRatio": 0.566,
        "size": 122080,
        "md5": "5b02e5fb7510526cdca4fb2b217d7bf6",
        "type": "frame",
        "usage": "Framing border or arch for moclan-white"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 1,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "dragon_phoenix_v3_red": {
    "templateId": "dragon_phoenix_v3_red",
    "slug": "long-phung-v3-do",
    "name": "Long Phụng V3 - Đỏ",
    "themeFolders": [
      "longphung-v3-red"
    ],
    "assetCount": 7,
    "totalBytes": 577751,
    "assets": [
      {
        "id": "chim-en",
        "file": "chim-en.webp",
        "path": "/images/themes/longphung-v3-red/chim-en.webp",
        "format": "WEBP",
        "width": 293,
        "height": 324,
        "aspectRatio": 0.904,
        "size": 19192,
        "md5": "224969bdf997efb0cc8430186c09ef80",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v3-red"
      },
      {
        "id": "chu-hy",
        "file": "chu-hy.webp",
        "path": "/images/themes/longphung-v3-red/chu-hy.webp",
        "format": "WEBP",
        "width": 658,
        "height": 658,
        "aspectRatio": 1.0,
        "size": 64536,
        "md5": "9819b2f2c23fac45e9918e31811f86f9",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for longphung-v3-red"
      },
      {
        "id": "frame-calendar",
        "file": "frame-calendar.webp",
        "path": "/images/themes/longphung-v3-red/frame-calendar.webp",
        "format": "WEBP",
        "width": 2100,
        "height": 1608,
        "aspectRatio": 1.306,
        "size": 23924,
        "md5": "fdaabb50823b2fd4890f3b927c0e4e6b",
        "type": "frame",
        "usage": "Framing border or arch for longphung-v3-red"
      },
      {
        "id": "frame-title",
        "file": "frame-title.svg",
        "path": "/images/themes/longphung-v3-red/frame-title.svg",
        "format": "SVG",
        "width": 541,
        "height": 89,
        "aspectRatio": 6.079,
        "size": 709,
        "md5": "4f3a2cae994ea2e522adda6ca5ba8a75",
        "type": "frame",
        "usage": "Framing border or arch for longphung-v3-red"
      },
      {
        "id": "frame",
        "file": "frame.svg",
        "path": "/images/themes/longphung-v3-red/frame.svg",
        "format": "SVG",
        "width": 754,
        "height": 1099,
        "aspectRatio": 0.686,
        "size": 4604,
        "md5": "7d33add75da177d58b3424cccf9ec6e3",
        "type": "frame",
        "usage": "Framing border or arch for longphung-v3-red"
      },
      {
        "id": "phung",
        "file": "phung.webp",
        "path": "/images/themes/longphung-v3-red/phung.webp",
        "format": "WEBP",
        "width": 1241,
        "height": 1278,
        "aspectRatio": 0.971,
        "size": 200588,
        "md5": "63fbeed27a37ae5247aac83435251191",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v3-red"
      },
      {
        "id": "rong",
        "file": "rong.webp",
        "path": "/images/themes/longphung-v3-red/rong.webp",
        "format": "WEBP",
        "width": 1424,
        "height": 1338,
        "aspectRatio": 1.064,
        "size": 264198,
        "md5": "0cfd1704d883eef6369d03fe05ff663f",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v3-red"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 3,
    "framesCount": 3,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "minimalism_darkbrown": {
    "templateId": "minimalism_darkbrown",
    "slug": "minimalism-nau-dam",
    "name": "Minimalism - Nâu Đậm",
    "themeFolders": [
      "minimalism-dark-brown"
    ],
    "assetCount": 16,
    "totalBytes": 2057262,
    "assets": [
      {
        "id": "alcohol",
        "file": "alcohol.webp",
        "path": "/images/themes/minimalism-dark-brown/alcohol.webp",
        "format": "WEBP",
        "width": 400,
        "height": 400,
        "aspectRatio": 1.0,
        "size": 50812,
        "md5": "ade060a7b55e33de481a3fbd6b017c01",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-dark-brown"
      },
      {
        "id": "bird",
        "file": "bird.webp",
        "path": "/images/themes/minimalism-dark-brown/bird.webp",
        "format": "WEBP",
        "width": 400,
        "height": 400,
        "aspectRatio": 1.0,
        "size": 62986,
        "md5": "5c86f678277b64b6584e42070840260f",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-dark-brown"
      },
      {
        "id": "cake",
        "file": "cake.webp",
        "path": "/images/themes/minimalism-dark-brown/cake.webp",
        "format": "WEBP",
        "width": 400,
        "height": 400,
        "aspectRatio": 1.0,
        "size": 51222,
        "md5": "d4e8867ac4ae96923019ef1cbda761cc",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-brown"
      },
      {
        "id": "castle-background",
        "file": "castle-background.webp",
        "path": "/images/themes/minimalism-dark-brown/castle-background.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1045,
        "aspectRatio": 1.2,
        "size": 264080,
        "md5": "1a716b498fb4a8c3ed43f8f394bb1aae",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-brown"
      },
      {
        "id": "castle2-background",
        "file": "castle2-background.webp",
        "path": "/images/themes/minimalism-dark-brown/castle2-background.webp",
        "format": "WEBP",
        "width": 1000,
        "height": 667,
        "aspectRatio": 1.499,
        "size": 180756,
        "md5": "e5696482c675db3e67239e4d0ed4e3af",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-brown"
      },
      {
        "id": "envelope-background",
        "file": "envelope-background.webp",
        "path": "/images/themes/minimalism-dark-brown/envelope-background.webp",
        "format": "WEBP",
        "width": 851,
        "height": 992,
        "aspectRatio": 0.858,
        "size": 123446,
        "md5": "d29fb308f4b6202a3a00cbe135962f22",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-brown"
      },
      {
        "id": "envelope-cover",
        "file": "envelope-cover.webp",
        "path": "/images/themes/minimalism-dark-brown/envelope-cover.webp",
        "format": "WEBP",
        "width": 849,
        "height": 563,
        "aspectRatio": 1.508,
        "size": 59382,
        "md5": "92f4335bb62d327f61be60dd80241f09",
        "type": "cover",
        "usage": "Envelope or cover illustration for minimalism-dark-brown"
      },
      {
        "id": "flower-decoration",
        "file": "flower-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/flower-decoration.webp",
        "format": "WEBP",
        "width": 822,
        "height": 900,
        "aspectRatio": 0.913,
        "size": 300156,
        "md5": "2a702fd826661dbf68321653fff6c6bb",
        "type": "decoration",
        "usage": "Decorative element (flower-decoration) for minimalism-dark-brown"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/flower2-decoration.webp",
        "format": "WEBP",
        "width": 710,
        "height": 900,
        "aspectRatio": 0.789,
        "size": 279966,
        "md5": "bbaa3922eed763924c6672be133ad507",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for minimalism-dark-brown"
      },
      {
        "id": "flower3-decoration",
        "file": "flower3-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/flower3-decoration.webp",
        "format": "WEBP",
        "width": 900,
        "height": 900,
        "aspectRatio": 1.0,
        "size": 349062,
        "md5": "0f3c7d0e7793b2c3327d65dd4a2f8bc3",
        "type": "decoration",
        "usage": "Decorative element (flower3-decoration) for minimalism-dark-brown"
      },
      {
        "id": "flower8-decoration",
        "file": "flower8-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/flower8-decoration.webp",
        "format": "WEBP",
        "width": 423,
        "height": 532,
        "aspectRatio": 0.795,
        "size": 101074,
        "md5": "d6ae76355a0e8454540e0b2b5b8cd6ee",
        "type": "decoration",
        "usage": "Decorative element (flower8-decoration) for minimalism-dark-brown"
      },
      {
        "id": "goldenline-decoration",
        "file": "goldenline-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/goldenline-decoration.webp",
        "format": "WEBP",
        "width": 329,
        "height": 88,
        "aspectRatio": 3.739,
        "size": 7594,
        "md5": "5ede92c8273496afbd20babf8415d40c",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-brown"
      },
      {
        "id": "goldenline2-decoration",
        "file": "goldenline2-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/goldenline2-decoration.webp",
        "format": "WEBP",
        "width": 400,
        "height": 117,
        "aspectRatio": 3.419,
        "size": 11800,
        "md5": "bfd86362a58c114fb7c55133b723edf0",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-brown"
      },
      {
        "id": "goldenline3-decoration",
        "file": "goldenline3-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/goldenline3-decoration.webp",
        "format": "WEBP",
        "width": 400,
        "height": 85,
        "aspectRatio": 4.706,
        "size": 10714,
        "md5": "398c52c52b72c855980783156d4c9f69",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-brown"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/minimalism-dark-brown/paper.webp",
        "format": "WEBP",
        "width": 1333,
        "height": 2000,
        "aspectRatio": 0.666,
        "size": 172958,
        "md5": "3b09633b1cd9a11d9d6ceacb6d83c9eb",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-brown"
      },
      {
        "id": "string-decoration",
        "file": "string-decoration.webp",
        "path": "/images/themes/minimalism-dark-brown/string-decoration.webp",
        "format": "WEBP",
        "width": 289,
        "height": 417,
        "aspectRatio": 0.693,
        "size": 31254,
        "md5": "5854a07571404e16e575db5e8b4f6dcb",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-dark-brown"
      }
    ],
    "backgroundPath": "/images/themes/minimalism-dark-brown/castle-background.webp",
    "coverPath": "/images/themes/minimalism-dark-brown/envelope-cover.webp",
    "decorationsCount": 7,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "double_phoenix_red": {
    "templateId": "double_phoenix_red",
    "slug": "song-phung-do",
    "name": "Song Phụng - Đỏ",
    "themeFolders": [
      "songphung-red"
    ],
    "assetCount": 6,
    "totalBytes": 1563563,
    "assets": [
      {
        "id": "CHU_HY",
        "file": "CHU HY.webp",
        "path": "/images/themes/songphung-red/CHU HY.webp",
        "format": "WEBP",
        "width": 1272,
        "height": 1271,
        "aspectRatio": 1.001,
        "size": 15464,
        "md5": "3254ede7020f42bc42a1502884e6ffa5",
        "type": "decoration",
        "usage": "Ornamental artwork for songphung-red"
      },
      {
        "id": "HOA",
        "file": "HOA.webp",
        "path": "/images/themes/songphung-red/HOA.webp",
        "format": "WEBP",
        "width": 964,
        "height": 1095,
        "aspectRatio": 0.88,
        "size": 133280,
        "md5": "736b1b72f3142e130d6c91af7b901c12",
        "type": "decoration",
        "usage": "Decorative element (hoa) for songphung-red"
      },
      {
        "id": "NENGIAY",
        "file": "NENGIAY.jpg",
        "path": "/images/themes/songphung-red/NENGIAY.jpg",
        "format": "JPEG",
        "width": 1000,
        "height": 1500,
        "aspectRatio": 0.667,
        "size": 211733,
        "md5": "6b466a560f5e6edf8f188a59dfd91cac",
        "type": "background",
        "usage": "Background paper or ambient texture for songphung-red"
      },
      {
        "id": "Phuong_2",
        "file": "Phuong 2.webp",
        "path": "/images/themes/songphung-red/Phuong 2.webp",
        "format": "WEBP",
        "width": 1952,
        "height": 4105,
        "aspectRatio": 0.476,
        "size": 369918,
        "md5": "63a34b590166da8e093706e692a8e4db",
        "type": "decoration",
        "usage": "Decorative element (phuong 2) for songphung-red"
      },
      {
        "id": "Phuong_line",
        "file": "Phuong line.webp",
        "path": "/images/themes/songphung-red/Phuong line.webp",
        "format": "WEBP",
        "width": 1966,
        "height": 4119,
        "aspectRatio": 0.477,
        "size": 512178,
        "md5": "2cc366ac12cfe558f4f39b20628d7a55",
        "type": "divider",
        "usage": "Decorative divider line for songphung-red"
      },
      {
        "id": "Phuong",
        "file": "Phuong.webp",
        "path": "/images/themes/songphung-red/Phuong.webp",
        "format": "WEBP",
        "width": 1952,
        "height": 4105,
        "aspectRatio": 0.476,
        "size": 320990,
        "md5": "9db6e5581f2840af72b86abb7fb87306",
        "type": "decoration",
        "usage": "Decorative element (phuong) for songphung-red"
      }
    ],
    "backgroundPath": "/images/themes/songphung-red/NENGIAY.jpg",
    "coverPath": null,
    "decorationsCount": 4,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "double_dragon_red": {
    "templateId": "double_dragon_red",
    "slug": "song-long-do",
    "name": "Song Long - Đỏ",
    "themeFolders": [
      "songlong-red"
    ],
    "assetCount": 8,
    "totalBytes": 438646,
    "assets": [
      {
        "id": "chinese_happiness",
        "file": "chinese_happiness.webp",
        "path": "/images/themes/songlong-red/chinese_happiness.webp",
        "format": "WEBP",
        "width": 177,
        "height": 176,
        "aspectRatio": 1.006,
        "size": 6236,
        "md5": "5a71f152116e20ed0e1895452d95cc34",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for songlong-red"
      },
      {
        "id": "cloud_big",
        "file": "cloud_big.webp",
        "path": "/images/themes/songlong-red/cloud_big.webp",
        "format": "WEBP",
        "width": 308,
        "height": 134,
        "aspectRatio": 2.299,
        "size": 8924,
        "md5": "2a8491fa065fb885719766d997d08cd0",
        "type": "decoration",
        "usage": "Decorative element (cloud_big) for songlong-red"
      },
      {
        "id": "cloud_small",
        "file": "cloud_small.webp",
        "path": "/images/themes/songlong-red/cloud_small.webp",
        "format": "WEBP",
        "width": 191,
        "height": 123,
        "aspectRatio": 1.553,
        "size": 5850,
        "md5": "c90661183b9a8b454a5b27739b06cf7b",
        "type": "decoration",
        "usage": "Decorative element (cloud_small) for songlong-red"
      },
      {
        "id": "dragon_left",
        "file": "dragon_left.webp",
        "path": "/images/themes/songlong-red/dragon_left.webp",
        "format": "WEBP",
        "width": 622,
        "height": 837,
        "aspectRatio": 0.743,
        "size": 110198,
        "md5": "62e3dc7d145a8e81a7affc744a2ba214",
        "type": "decoration",
        "usage": "Decorative element (dragon_left) for songlong-red"
      },
      {
        "id": "dragon_right",
        "file": "dragon_right.webp",
        "path": "/images/themes/songlong-red/dragon_right.webp",
        "format": "WEBP",
        "width": 621,
        "height": 837,
        "aspectRatio": 0.742,
        "size": 110304,
        "md5": "0e859bab5a93e4fad4b81a26dfc5db19",
        "type": "decoration",
        "usage": "Decorative element (dragon_right) for songlong-red"
      },
      {
        "id": "wave",
        "file": "wave.webp",
        "path": "/images/themes/songlong-red/wave.webp",
        "format": "WEBP",
        "width": 136,
        "height": 54,
        "aspectRatio": 2.519,
        "size": 3286,
        "md5": "bd57391ca621b220aa46ff709b4e0668",
        "type": "decoration",
        "usage": "Decorative element (wave) for songlong-red"
      },
      {
        "id": "double_dragon_artwork",
        "file": "double-dragon.webp",
        "path": "/images/double-dragon.webp",
        "format": "WEBP",
        "width": 665,
        "height": 863,
        "aspectRatio": 0.771,
        "size": 178384,
        "md5": "8d16e4968a64d4068d86b831cb5f6f27",
        "type": "decoration",
        "usage": "Hero double dragon decorative banner"
      },
      {
        "id": "chu_hy_symbol",
        "file": "chu-hy.webp",
        "path": "/images/chu-hy.webp",
        "format": "WEBP",
        "width": 1272,
        "height": 1271,
        "aspectRatio": 1.001,
        "size": 15464,
        "md5": "3254ede7020f42bc42a1502884e6ffa5",
        "type": "icon",
        "usage": "Chinese happiness symbol (囍)"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 6,
    "framesCount": 0,
    "isSharedTheme": true,
    "sharedWith": [
      "double_dragon_red",
      "double_dragon_green",
      "double_dragon_blue"
    ],
    "status": "active"
  },
  "glass_garden_green": {
    "templateId": "glass_garden_green",
    "slug": "vuonkinh-xanh",
    "name": "Vườn Kính - Xanh",
    "themeFolders": [
      "glass-garden-green"
    ],
    "assetCount": 2,
    "totalBytes": 678526,
    "assets": [
      {
        "id": "floral-background",
        "file": "floral-background.webp",
        "path": "/images/themes/glass-garden-green/floral-background.webp",
        "format": "WEBP",
        "width": 941,
        "height": 1672,
        "aspectRatio": 0.563,
        "size": 282408,
        "md5": "c5b55a8009242036afeed9442df7ede6",
        "type": "background",
        "usage": "Background paper or ambient texture for glass-garden-green"
      },
      {
        "id": "flower1-decoration",
        "file": "flower1-decoration.webp",
        "path": "/images/themes/glass-garden-green/flower1-decoration.webp",
        "format": "WEBP",
        "width": 2334,
        "height": 1803,
        "aspectRatio": 1.295,
        "size": 396118,
        "md5": "b8d704dcdb4dc6b59464a2e79fddd748",
        "type": "decoration",
        "usage": "Decorative element (flower1-decoration) for glass-garden-green"
      }
    ],
    "backgroundPath": "/images/themes/glass-garden-green/floral-background.webp",
    "coverPath": null,
    "decorationsCount": 1,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "baroque_v2_darkred": {
    "templateId": "baroque_v2_darkred",
    "slug": "baroque-v2-do-dam",
    "name": "Baroque V2 - Đỏ Đậm",
    "themeFolders": [
      "baroque-v2-dark-red"
    ],
    "assetCount": 1,
    "totalBytes": 305360,
    "assets": [
      {
        "id": "frame",
        "file": "frame.webp",
        "path": "/images/themes/baroque-v2-dark-red/frame.webp",
        "format": "WEBP",
        "width": 1237,
        "height": 1254,
        "aspectRatio": 0.986,
        "size": 305360,
        "md5": "3547a272db7e132f269b06bdf38b549a",
        "type": "frame",
        "usage": "Framing border or arch for baroque-v2-dark-red"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "silk_ribbon_darkred": {
    "templateId": "silk_ribbon_darkred",
    "slug": "to-duyen-do-dam",
    "name": "Tơ Duyên - Đỏ Đậm",
    "themeFolders": [
      "silk-ribbon-darkred"
    ],
    "assetCount": 3,
    "totalBytes": 216572,
    "assets": [
      {
        "id": "flower-decoration",
        "file": "flower-decoration.webp",
        "path": "/images/themes/silk-ribbon-darkred/flower-decoration.webp",
        "format": "WEBP",
        "width": 970,
        "height": 1200,
        "aspectRatio": 0.808,
        "size": 57866,
        "md5": "b295d233f4418f758a8782a3a690bbde",
        "type": "decoration",
        "usage": "Decorative element (flower-decoration) for silk-ribbon-darkred"
      },
      {
        "id": "line-decoration",
        "file": "line-decoration.webp",
        "path": "/images/themes/silk-ribbon-darkred/line-decoration.webp",
        "format": "WEBP",
        "width": 725,
        "height": 2170,
        "aspectRatio": 0.334,
        "size": 95460,
        "md5": "bd38f366d16a5d77838beef9a77bae47",
        "type": "divider",
        "usage": "Decorative divider line for silk-ribbon-darkred"
      },
      {
        "id": "ribbon-decoration",
        "file": "ribbon-decoration.webp",
        "path": "/images/themes/silk-ribbon-darkred/ribbon-decoration.webp",
        "format": "WEBP",
        "width": 1600,
        "height": 532,
        "aspectRatio": 3.008,
        "size": 63246,
        "md5": "7ef6b8628bce68c3118241937d859541",
        "type": "decoration",
        "usage": "Ornamental artwork for silk-ribbon-darkred"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "dragon_phoenix_v2_red": {
    "templateId": "dragon_phoenix_v2_red",
    "slug": "long-phung-v2-do",
    "name": "Long Phụng V2 - Đỏ",
    "themeFolders": [
      "longphung-v2-red"
    ],
    "assetCount": 6,
    "totalBytes": 1409070,
    "assets": [
      {
        "id": "bg-frame",
        "file": "bg-frame.jpg",
        "path": "/images/themes/longphung-v2-red/bg-frame.jpg",
        "format": "JPEG",
        "width": 900,
        "height": 6000,
        "aspectRatio": 0.15,
        "size": 619088,
        "md5": "1a8c3fbbaf3cae302a2b1f91fb5199b6",
        "type": "background",
        "usage": "Background paper or ambient texture for longphung-v2-red"
      },
      {
        "id": "chu-hy",
        "file": "chu-hy.webp",
        "path": "/images/themes/longphung-v2-red/chu-hy.webp",
        "format": "WEBP",
        "width": 1272,
        "height": 1271,
        "aspectRatio": 1.001,
        "size": 7526,
        "md5": "4cd48bab6fc8d1828e904fd3e1525ab8",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for longphung-v2-red"
      },
      {
        "id": "cloud",
        "file": "cloud.webp",
        "path": "/images/themes/longphung-v2-red/cloud.webp",
        "format": "WEBP",
        "width": 3805,
        "height": 1797,
        "aspectRatio": 2.117,
        "size": 96164,
        "md5": "b3fd39e66e941fe1984bfede2fbbf146",
        "type": "decoration",
        "usage": "Decorative element (cloud) for longphung-v2-red"
      },
      {
        "id": "phuong",
        "file": "phuong.webp",
        "path": "/images/themes/longphung-v2-red/phuong.webp",
        "format": "WEBP",
        "width": 1489,
        "height": 2239,
        "aspectRatio": 0.665,
        "size": 184732,
        "md5": "2e936089fd7614b32f0c905b80a019b8",
        "type": "decoration",
        "usage": "Decorative element (phuong) for longphung-v2-red"
      },
      {
        "id": "rong-phuong",
        "file": "rong-phuong.webp",
        "path": "/images/themes/longphung-v2-red/rong-phuong.webp",
        "format": "WEBP",
        "width": 1200,
        "height": 2352,
        "aspectRatio": 0.51,
        "size": 271586,
        "md5": "ada256bc652cdcd99b0f3a3bb3409a07",
        "type": "decoration",
        "usage": "Decorative element (rong-phuong) for longphung-v2-red"
      },
      {
        "id": "rong",
        "file": "rong.webp",
        "path": "/images/themes/longphung-v2-red/rong.webp",
        "format": "WEBP",
        "width": 1560,
        "height": 2204,
        "aspectRatio": 0.708,
        "size": 229974,
        "md5": "559be98ee60367647b38c95c88495524",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v2-red"
      }
    ],
    "backgroundPath": "/images/themes/longphung-v2-red/bg-frame.jpg",
    "coverPath": null,
    "decorationsCount": 4,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "dragon_phoenix_v4_red": {
    "templateId": "dragon_phoenix_v4_red",
    "slug": "long-phung-v4-do",
    "name": "Long Phụng V4 - Đỏ",
    "themeFolders": [
      "longphung-v4-red"
    ],
    "assetCount": 16,
    "totalBytes": 1901444,
    "assets": [
      {
        "id": "bg-texture",
        "file": "bg-texture.webp",
        "path": "/images/themes/longphung-v4-red/bg-texture.webp",
        "format": "WEBP",
        "width": 900,
        "height": 600,
        "aspectRatio": 1.5,
        "size": 63336,
        "md5": "f0b27156111e6aeac605dcea14aa2930",
        "type": "background",
        "usage": "Background paper or ambient texture for longphung-v4-red"
      },
      {
        "id": "cake",
        "file": "cake.webp",
        "path": "/images/themes/longphung-v4-red/cake.webp",
        "format": "WEBP",
        "width": 288,
        "height": 300,
        "aspectRatio": 0.96,
        "size": 21964,
        "md5": "f6e4ec771fbbf9315f13960d64cff962",
        "type": "divider",
        "usage": "Decorative divider line for longphung-v4-red"
      },
      {
        "id": "cloud1",
        "file": "cloud1.webp",
        "path": "/images/themes/longphung-v4-red/cloud1.webp",
        "format": "WEBP",
        "width": 700,
        "height": 700,
        "aspectRatio": 1.0,
        "size": 120432,
        "md5": "82b2c7f74b0ab4fabb656bc464af4f60",
        "type": "decoration",
        "usage": "Decorative element (cloud1) for longphung-v4-red"
      },
      {
        "id": "cloud2",
        "file": "cloud2.webp",
        "path": "/images/themes/longphung-v4-red/cloud2.webp",
        "format": "WEBP",
        "width": 900,
        "height": 514,
        "aspectRatio": 1.751,
        "size": 168668,
        "md5": "8d031d94ffcfd405d20432c43ade139a",
        "type": "decoration",
        "usage": "Decorative element (cloud2) for longphung-v4-red"
      },
      {
        "id": "cloud2b",
        "file": "cloud2b.webp",
        "path": "/images/themes/longphung-v4-red/cloud2b.webp",
        "format": "WEBP",
        "width": 733,
        "height": 800,
        "aspectRatio": 0.916,
        "size": 182218,
        "md5": "f073de851a96c40cf9ba3db5693b12f1",
        "type": "decoration",
        "usage": "Decorative element (cloud2b) for longphung-v4-red"
      },
      {
        "id": "cloud3",
        "file": "cloud3.webp",
        "path": "/images/themes/longphung-v4-red/cloud3.webp",
        "format": "WEBP",
        "width": 700,
        "height": 350,
        "aspectRatio": 2.0,
        "size": 69474,
        "md5": "7e8c130940f3baa5ee64e1fa3f1f0f8c",
        "type": "decoration",
        "usage": "Decorative element (cloud3) for longphung-v4-red"
      },
      {
        "id": "cloud4-bottom",
        "file": "cloud4-bottom.webp",
        "path": "/images/themes/longphung-v4-red/cloud4-bottom.webp",
        "format": "WEBP",
        "width": 1500,
        "height": 412,
        "aspectRatio": 3.641,
        "size": 140084,
        "md5": "300cc55bc3a5e244dccfb82daa3b07b8",
        "type": "decoration",
        "usage": "Decorative element (cloud4-bottom) for longphung-v4-red"
      },
      {
        "id": "double-happiness",
        "file": "double-happiness.webp",
        "path": "/images/themes/longphung-v4-red/double-happiness.webp",
        "format": "WEBP",
        "width": 420,
        "height": 420,
        "aspectRatio": 1.0,
        "size": 72596,
        "md5": "acb581a7d74cc2a346c2091413cfb9ca",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v4-red"
      },
      {
        "id": "dragon",
        "file": "dragon.webp",
        "path": "/images/themes/longphung-v4-red/dragon.webp",
        "format": "WEBP",
        "width": 548,
        "height": 900,
        "aspectRatio": 0.609,
        "size": 281934,
        "md5": "b02405c82bfcd6558ee44b2f65805b00",
        "type": "decoration",
        "usage": "Decorative element (dragon) for longphung-v4-red"
      },
      {
        "id": "dragon2",
        "file": "dragon2.webp",
        "path": "/images/themes/longphung-v4-red/dragon2.webp",
        "format": "WEBP",
        "width": 423,
        "height": 700,
        "aspectRatio": 0.604,
        "size": 155418,
        "md5": "78acfd02470b0f17c2e74b5846f96338",
        "type": "decoration",
        "usage": "Decorative element (dragon2) for longphung-v4-red"
      },
      {
        "id": "frame-avatar",
        "file": "frame-avatar.webp",
        "path": "/images/themes/longphung-v4-red/frame-avatar.webp",
        "format": "WEBP",
        "width": 900,
        "height": 871,
        "aspectRatio": 1.033,
        "size": 125240,
        "md5": "bacd4ccee0f7be526335a91ae38dcf5b",
        "type": "frame",
        "usage": "Framing border or arch for longphung-v4-red"
      },
      {
        "id": "home",
        "file": "home.webp",
        "path": "/images/themes/longphung-v4-red/home.webp",
        "format": "WEBP",
        "width": 300,
        "height": 298,
        "aspectRatio": 1.007,
        "size": 22732,
        "md5": "4e0e75ac8e58584a32b76eaecfed2c7c",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v4-red"
      },
      {
        "id": "music",
        "file": "music.webp",
        "path": "/images/themes/longphung-v4-red/music.webp",
        "format": "WEBP",
        "width": 295,
        "height": 300,
        "aspectRatio": 0.983,
        "size": 22486,
        "md5": "22eac0cde2c18b565727b93c5c8fefca",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v4-red"
      },
      {
        "id": "phoenix",
        "file": "phoenix.webp",
        "path": "/images/themes/longphung-v4-red/phoenix.webp",
        "format": "WEBP",
        "width": 651,
        "height": 900,
        "aspectRatio": 0.723,
        "size": 197164,
        "md5": "bd90b80309d4d00a1ca3240912f0b901",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v4-red"
      },
      {
        "id": "phoenix2",
        "file": "phoenix2.webp",
        "path": "/images/themes/longphung-v4-red/phoenix2.webp",
        "format": "WEBP",
        "width": 564,
        "height": 900,
        "aspectRatio": 0.627,
        "size": 178902,
        "md5": "7597b52aec46d397fa2e01f01a9f7fb6",
        "type": "decoration",
        "usage": "Ornamental artwork for longphung-v4-red"
      },
      {
        "id": "songhy-background",
        "file": "songhy-background.webp",
        "path": "/images/themes/longphung-v4-red/songhy-background.webp",
        "format": "WEBP",
        "width": 971,
        "height": 1100,
        "aspectRatio": 0.883,
        "size": 78796,
        "md5": "b68dc1b14587a4be494e2dc5a9aec891",
        "type": "background",
        "usage": "Background paper or ambient texture for longphung-v4-red"
      }
    ],
    "backgroundPath": "/images/themes/longphung-v4-red/bg-texture.webp",
    "coverPath": null,
    "decorationsCount": 12,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "dragon_phoenix_red": {
    "templateId": "dragon_phoenix_red",
    "slug": "long-phung-do",
    "name": "Long Phụng - Đỏ",
    "themeFolders": [
      "red-v1"
    ],
    "assetCount": 4,
    "totalBytes": 579626,
    "assets": [
      {
        "id": "bg-main",
        "file": "bg-main.webp",
        "path": "/images/themes/red-v1/bg-main.webp",
        "format": "WEBP",
        "width": 1171,
        "height": 1444,
        "aspectRatio": 0.811,
        "size": 201876,
        "md5": "f51ff94e3f87422924e1f998ab99e58a",
        "type": "background",
        "usage": "Background paper or ambient texture for red-v1"
      },
      {
        "id": "line6",
        "file": "line6.svg",
        "path": "/images/themes/red-v1/line6.svg",
        "format": "SVG",
        "width": 25,
        "height": 1,
        "aspectRatio": 25.0,
        "size": 256,
        "md5": "425620abf8ed8f88d4adb4a2eb9fe6c2",
        "type": "divider",
        "usage": "Decorative divider line for red-v1"
      },
      {
        "id": "phuong",
        "file": "phuong.webp",
        "path": "/images/themes/red-v1/phuong.webp",
        "format": "WEBP",
        "width": 610,
        "height": 1302,
        "aspectRatio": 0.469,
        "size": 97582,
        "md5": "eeaa8b1029518f3d615f327471ab227a",
        "type": "decoration",
        "usage": "Decorative element (phuong) for red-v1"
      },
      {
        "id": "rong",
        "file": "rong.webp",
        "path": "/images/themes/red-v1/rong.webp",
        "format": "WEBP",
        "width": 1000,
        "height": 2000,
        "aspectRatio": 0.5,
        "size": 279912,
        "md5": "d813a65ed9bb2c953ede68b495ab265b",
        "type": "decoration",
        "usage": "Ornamental artwork for red-v1"
      }
    ],
    "backgroundPath": "/images/themes/red-v1/bg-main.webp",
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "minimalism_darkblue": {
    "templateId": "minimalism_darkblue",
    "slug": "minimalism-lam-dam",
    "name": "Minimalism - Lam Đậm",
    "themeFolders": [
      "minimalism-dark-blue"
    ],
    "assetCount": 17,
    "totalBytes": 2002424,
    "assets": [
      {
        "id": "cake",
        "file": "cake.webp",
        "path": "/images/themes/minimalism-dark-blue/cake.webp",
        "format": "WEBP",
        "width": 267,
        "height": 400,
        "aspectRatio": 0.667,
        "size": 34406,
        "md5": "2222adba5970a2504f361586dbb89e59",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-blue"
      },
      {
        "id": "castle-background-1",
        "file": "castle-background-1.webp",
        "path": "/images/themes/minimalism-dark-blue/castle-background-1.webp",
        "format": "WEBP",
        "width": 819,
        "height": 819,
        "aspectRatio": 1.0,
        "size": 195596,
        "md5": "324850dc60d708bfa83b3fd5a8cabe65",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-blue"
      },
      {
        "id": "castle-background",
        "file": "castle-background.webp",
        "path": "/images/themes/minimalism-dark-blue/castle-background.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 406990,
        "md5": "611cc85ffadcc17e651651c89c92eeb1",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-blue"
      },
      {
        "id": "castle2-background",
        "file": "castle2-background.webp",
        "path": "/images/themes/minimalism-dark-blue/castle2-background.webp",
        "format": "WEBP",
        "width": 783,
        "height": 783,
        "aspectRatio": 1.0,
        "size": 126488,
        "md5": "37c5fb1e4467c723ee7729f152f832f6",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-blue"
      },
      {
        "id": "church",
        "file": "church.webp",
        "path": "/images/themes/minimalism-dark-blue/church.webp",
        "format": "WEBP",
        "width": 306,
        "height": 310,
        "aspectRatio": 0.987,
        "size": 18292,
        "md5": "dcc8039f396053e2face787ae0825edf",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-dark-blue"
      },
      {
        "id": "cook",
        "file": "cook.webp",
        "path": "/images/themes/minimalism-dark-blue/cook.webp",
        "format": "WEBP",
        "width": 400,
        "height": 267,
        "aspectRatio": 1.498,
        "size": 34230,
        "md5": "26bd434228173993f4f78e9dd95628d0",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-dark-blue"
      },
      {
        "id": "envelope-background",
        "file": "envelope-background.webp",
        "path": "/images/themes/minimalism-dark-blue/envelope-background.webp",
        "format": "WEBP",
        "width": 851,
        "height": 984,
        "aspectRatio": 0.865,
        "size": 135296,
        "md5": "87f8cc70c1bca8a8db9d5d3c62979b80",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-blue"
      },
      {
        "id": "envelope-cover",
        "file": "envelope-cover.webp",
        "path": "/images/themes/minimalism-dark-blue/envelope-cover.webp",
        "format": "WEBP",
        "width": 849,
        "height": 562,
        "aspectRatio": 1.511,
        "size": 44770,
        "md5": "c90d0c5a7fd9b24d968c59a3fce0cb02",
        "type": "cover",
        "usage": "Envelope or cover illustration for minimalism-dark-blue"
      },
      {
        "id": "flower-background",
        "file": "flower-background.webp",
        "path": "/images/themes/minimalism-dark-blue/flower-background.webp",
        "format": "WEBP",
        "width": 488,
        "height": 732,
        "aspectRatio": 0.667,
        "size": 143100,
        "md5": "89713ff09f8ea6f4e040c0007be984f7",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-blue"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/flower2-decoration.webp",
        "format": "WEBP",
        "width": 429,
        "height": 840,
        "aspectRatio": 0.511,
        "size": 133028,
        "md5": "962a64e49da9f3406d8b4b0bcca2004b",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for minimalism-dark-blue"
      },
      {
        "id": "flower3-decoration",
        "file": "flower3-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/flower3-decoration.webp",
        "format": "WEBP",
        "width": 483,
        "height": 1011,
        "aspectRatio": 0.478,
        "size": 206890,
        "md5": "7f26e188095b796458f5c3875acc19da",
        "type": "decoration",
        "usage": "Decorative element (flower3-decoration) for minimalism-dark-blue"
      },
      {
        "id": "flower4-decoration",
        "file": "flower4-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/flower4-decoration.webp",
        "format": "WEBP",
        "width": 599,
        "height": 798,
        "aspectRatio": 0.751,
        "size": 129310,
        "md5": "7f9c421d58711b6cabfab093ea837b12",
        "type": "decoration",
        "usage": "Decorative element (flower4-decoration) for minimalism-dark-blue"
      },
      {
        "id": "flower5-decoration",
        "file": "flower5-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/flower5-decoration.webp",
        "format": "WEBP",
        "width": 416,
        "height": 624,
        "aspectRatio": 0.667,
        "size": 98408,
        "md5": "a4754597cca5b3fc3fc45f253581f58b",
        "type": "decoration",
        "usage": "Decorative element (flower5-decoration) for minimalism-dark-blue"
      },
      {
        "id": "flower6-decoration",
        "file": "flower6-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/flower6-decoration.webp",
        "format": "WEBP",
        "width": 446,
        "height": 669,
        "aspectRatio": 0.667,
        "size": 97848,
        "md5": "b8c6d709700ba3d954ce72007b9a7652",
        "type": "decoration",
        "usage": "Decorative element (flower6-decoration) for minimalism-dark-blue"
      },
      {
        "id": "goldenline2-decoration",
        "file": "goldenline2-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/goldenline2-decoration.webp",
        "format": "WEBP",
        "width": 400,
        "height": 117,
        "aspectRatio": 3.419,
        "size": 11800,
        "md5": "bfd86362a58c114fb7c55133b723edf0",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-blue"
      },
      {
        "id": "goldenline3-decoration",
        "file": "goldenline3-decoration.webp",
        "path": "/images/themes/minimalism-dark-blue/goldenline3-decoration.webp",
        "format": "WEBP",
        "width": 400,
        "height": 115,
        "aspectRatio": 3.478,
        "size": 13014,
        "md5": "11e28105b7cdae0dca5004f18cecb3f9",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-dark-blue"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/minimalism-dark-blue/paper.webp",
        "format": "WEBP",
        "width": 1333,
        "height": 2000,
        "aspectRatio": 0.666,
        "size": 172958,
        "md5": "3b09633b1cd9a11d9d6ceacb6d83c9eb",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-dark-blue"
      }
    ],
    "backgroundPath": "/images/themes/minimalism-dark-blue/castle-background-1.webp",
    "coverPath": "/images/themes/minimalism-dark-blue/envelope-cover.webp",
    "decorationsCount": 7,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "lien_hoa_v2_green": {
    "templateId": "lien_hoa_v2_green",
    "slug": "lien-hoa-v2-xanh",
    "name": "Liên Hoa V2 - Xanh",
    "themeFolders": [
      "lien-hoa-v2-green"
    ],
    "assetCount": 3,
    "totalBytes": 732522,
    "assets": [
      {
        "id": "flower10",
        "file": "flower10.webp",
        "path": "/images/themes/lien-hoa-v2-green/flower10.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1200,
        "aspectRatio": 0.75,
        "size": 240272,
        "md5": "7a2e55e387da6140a7c2500c43b17b39",
        "type": "decoration",
        "usage": "Decorative element (flower10) for lien-hoa-v2-green"
      },
      {
        "id": "flower3",
        "file": "flower3.webp",
        "path": "/images/themes/lien-hoa-v2-green/flower3.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1409,
        "aspectRatio": 0.639,
        "size": 260966,
        "md5": "3acc1ef4df996ca5175236d0c964a6b2",
        "type": "decoration",
        "usage": "Decorative element (flower3) for lien-hoa-v2-green"
      },
      {
        "id": "flower6",
        "file": "flower6.webp",
        "path": "/images/themes/lien-hoa-v2-green/flower6.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1311,
        "aspectRatio": 0.686,
        "size": 231284,
        "md5": "713e9b30ce7211195dc1b404a51090c4",
        "type": "decoration",
        "usage": "Decorative element (flower6) for lien-hoa-v2-green"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 3,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "minimalism_red": {
    "templateId": "minimalism_red",
    "slug": "minimalism-do",
    "name": "Minimalism - Đỏ",
    "themeFolders": [
      "minimalism-red"
    ],
    "assetCount": 2,
    "totalBytes": 130362,
    "assets": [
      {
        "id": "header-bottom-01",
        "file": "header-bottom-01.png",
        "path": "/images/themes/minimalism-red/header-bottom-01.png",
        "format": "PNG",
        "width": 2084,
        "height": 741,
        "aspectRatio": 2.812,
        "size": 39476,
        "md5": "f52877332217f2d46415a2dbda52b27f",
        "type": "decoration",
        "usage": "Header ornament for minimalism-red"
      },
      {
        "id": "header-top-01",
        "file": "header-top-01.png",
        "path": "/images/themes/minimalism-red/header-top-01.png",
        "format": "PNG",
        "width": 2084,
        "height": 1584,
        "aspectRatio": 1.316,
        "size": 90886,
        "md5": "de1ae95e6ed6d77b5034390c6a8e5b25",
        "type": "decoration",
        "usage": "Header ornament for minimalism-red"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "song_hac_red": {
    "templateId": "song_hac_red",
    "slug": "song-hac-do",
    "name": "Song Hạc - Đỏ",
    "themeFolders": [
      "song-hac-red"
    ],
    "assetCount": 7,
    "totalBytes": 835162,
    "assets": [
      {
        "id": "bg-texture",
        "file": "bg-texture.webp",
        "path": "/images/themes/song-hac-red/bg-texture.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1350,
        "aspectRatio": 0.667,
        "size": 87462,
        "md5": "a9302a22d2c5ad62ba9286f2b4216440",
        "type": "background",
        "usage": "Background paper or ambient texture for song-hac-red"
      },
      {
        "id": "bird-decoration",
        "file": "bird-decoration.webp",
        "path": "/images/themes/song-hac-red/bird-decoration.webp",
        "format": "WEBP",
        "width": 900,
        "height": 920,
        "aspectRatio": 0.978,
        "size": 230186,
        "md5": "1e0cf8f92090741b4b51abfc17df0510",
        "type": "decoration",
        "usage": "Ornamental artwork for song-hac-red"
      },
      {
        "id": "cloud1-decoration",
        "file": "cloud1-decoration.webp",
        "path": "/images/themes/song-hac-red/cloud1-decoration.webp",
        "format": "WEBP",
        "width": 700,
        "height": 209,
        "aspectRatio": 3.349,
        "size": 54970,
        "md5": "15f7edbc2ab8efc4117aa704c65763f3",
        "type": "decoration",
        "usage": "Decorative element (cloud1-decoration) for song-hac-red"
      },
      {
        "id": "cloud2-decoration",
        "file": "cloud2-decoration.webp",
        "path": "/images/themes/song-hac-red/cloud2-decoration.webp",
        "format": "WEBP",
        "width": 560,
        "height": 339,
        "aspectRatio": 1.652,
        "size": 64496,
        "md5": "9923dde74df22b83b97a9e54e534b5fe",
        "type": "decoration",
        "usage": "Decorative element (cloud2-decoration) for song-hac-red"
      },
      {
        "id": "double-happiness",
        "file": "double-happiness.webp",
        "path": "/images/themes/song-hac-red/double-happiness.webp",
        "format": "WEBP",
        "width": 320,
        "height": 277,
        "aspectRatio": 1.155,
        "size": 27292,
        "md5": "ab800bfcf8c4c77d473d3e3932072e3c",
        "type": "decoration",
        "usage": "Ornamental artwork for song-hac-red"
      },
      {
        "id": "flower1-decoration",
        "file": "flower1-decoration.webp",
        "path": "/images/themes/song-hac-red/flower1-decoration.webp",
        "format": "WEBP",
        "width": 520,
        "height": 476,
        "aspectRatio": 1.092,
        "size": 103712,
        "md5": "922db3ee57e41d366357607680100cf8",
        "type": "decoration",
        "usage": "Decorative element (flower1-decoration) for song-hac-red"
      },
      {
        "id": "moon-decoration",
        "file": "moon-decoration.webp",
        "path": "/images/themes/song-hac-red/moon-decoration.webp",
        "format": "WEBP",
        "width": 900,
        "height": 882,
        "aspectRatio": 1.02,
        "size": 267044,
        "md5": "88fece4897bbdcb069493ff313d54269",
        "type": "decoration",
        "usage": "Ornamental artwork for song-hac-red"
      }
    ],
    "backgroundPath": "/images/themes/song-hac-red/bg-texture.webp",
    "coverPath": null,
    "decorationsCount": 6,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "chibi_red": {
    "templateId": "chibi_red",
    "slug": "chibi-red",
    "name": "Chibi - Đỏ",
    "themeFolders": [
      "chibi_red"
    ],
    "assetCount": 3,
    "totalBytes": 156124,
    "assets": [
      {
        "id": "couple-main",
        "file": "couple-main.webp",
        "path": "/images/themes/chibi_red/couple-main.webp",
        "format": "WEBP",
        "width": 1113,
        "height": 1400,
        "aspectRatio": 0.795,
        "size": 131806,
        "md5": "4f2aa3c79177d88ec5fc2cd96f31dbfc",
        "type": "decoration",
        "usage": "Ornamental artwork for chibi_red"
      },
      {
        "id": "decorative-flowers",
        "file": "decorative-flowers.webp",
        "path": "/images/themes/chibi_red/decorative-flowers.webp",
        "format": "WEBP",
        "width": 1090,
        "height": 639,
        "aspectRatio": 1.706,
        "size": 10296,
        "md5": "c02f4c4821ae96bf057e2e788ae2e1e1",
        "type": "decoration",
        "usage": "Decorative element (decorative-flowers) for chibi_red"
      },
      {
        "id": "double-happiness",
        "file": "double-happiness.webp",
        "path": "/images/themes/chibi_red/double-happiness.webp",
        "format": "WEBP",
        "width": 288,
        "height": 247,
        "aspectRatio": 1.166,
        "size": 14022,
        "md5": "f52a6f8982f1968a2b5da94e360e3901",
        "type": "decoration",
        "usage": "Ornamental artwork for chibi_red"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 3,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "elegant_leaf_green": {
    "templateId": "elegant_leaf_green",
    "slug": "thanh-diep-xanh",
    "name": "Thanh Diệp - Xanh",
    "themeFolders": [
      "thanhdiep-green"
    ],
    "assetCount": 3,
    "totalBytes": 568208,
    "assets": [
      {
        "id": "la1",
        "file": "la1.webp",
        "path": "/images/themes/thanhdiep-green/la1.webp",
        "format": "WEBP",
        "width": 1748,
        "height": 2480,
        "aspectRatio": 0.705,
        "size": 140724,
        "md5": "5029068b22f911da93527a065ed28f6a",
        "type": "decoration",
        "usage": "Decorative element (la1) for thanhdiep-green"
      },
      {
        "id": "la2",
        "file": "la2.webp",
        "path": "/images/themes/thanhdiep-green/la2.webp",
        "format": "WEBP",
        "width": 1748,
        "height": 2480,
        "aspectRatio": 0.705,
        "size": 149092,
        "md5": "6775cbef60be8d452909faa9dc7bb216",
        "type": "decoration",
        "usage": "Decorative element (la2) for thanhdiep-green"
      },
      {
        "id": "la3",
        "file": "la3.webp",
        "path": "/images/themes/thanhdiep-green/la3.webp",
        "format": "WEBP",
        "width": 1748,
        "height": 2480,
        "aspectRatio": 0.705,
        "size": 278392,
        "md5": "2148710bac3b1c42469b8d208d55f472",
        "type": "decoration",
        "usage": "Decorative element (la3) for thanhdiep-green"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 3,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "silk_ribbon_pink": {
    "templateId": "silk_ribbon_pink",
    "slug": "to-duyen-hong",
    "name": "Tơ Duyên - Hồng",
    "themeFolders": [
      "silk-ribbon-pink"
    ],
    "assetCount": 3,
    "totalBytes": 335698,
    "assets": [
      {
        "id": "flower-decoration",
        "file": "flower-decoration.webp",
        "path": "/images/themes/silk-ribbon-pink/flower-decoration.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1350,
        "aspectRatio": 0.667,
        "size": 176076,
        "md5": "2d578dc37f2c73e7f2341f9d15c31a90",
        "type": "decoration",
        "usage": "Decorative element (flower-decoration) for silk-ribbon-pink"
      },
      {
        "id": "line-decoration",
        "file": "line-decoration.webp",
        "path": "/images/themes/silk-ribbon-pink/line-decoration.webp",
        "format": "WEBP",
        "width": 727,
        "height": 2163,
        "aspectRatio": 0.336,
        "size": 102786,
        "md5": "837b2516ff63ec1d268631e8247bdae7",
        "type": "divider",
        "usage": "Decorative divider line for silk-ribbon-pink"
      },
      {
        "id": "ribbon-decoration",
        "file": "ribbon-decoration.webp",
        "path": "/images/themes/silk-ribbon-pink/ribbon-decoration.webp",
        "format": "WEBP",
        "width": 1600,
        "height": 533,
        "aspectRatio": 3.002,
        "size": 56836,
        "md5": "edbae0ef2e97b7afbea76cc368ff4c14",
        "type": "decoration",
        "usage": "Ornamental artwork for silk-ribbon-pink"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "dragon_phoenix_green": {
    "templateId": "dragon_phoenix_green",
    "slug": "long-phung-xanh",
    "name": "Long Phụng - Xanh",
    "themeFolders": [
      "red-v1"
    ],
    "assetCount": 4,
    "totalBytes": 579626,
    "assets": [
      {
        "id": "bg-main",
        "file": "bg-main.webp",
        "path": "/images/themes/red-v1/bg-main.webp",
        "format": "WEBP",
        "width": 1171,
        "height": 1444,
        "aspectRatio": 0.811,
        "size": 201876,
        "md5": "f51ff94e3f87422924e1f998ab99e58a",
        "type": "background",
        "usage": "Background paper or ambient texture for red-v1"
      },
      {
        "id": "line6",
        "file": "line6.svg",
        "path": "/images/themes/red-v1/line6.svg",
        "format": "SVG",
        "width": 25,
        "height": 1,
        "aspectRatio": 25.0,
        "size": 256,
        "md5": "425620abf8ed8f88d4adb4a2eb9fe6c2",
        "type": "divider",
        "usage": "Decorative divider line for red-v1"
      },
      {
        "id": "phuong",
        "file": "phuong.webp",
        "path": "/images/themes/red-v1/phuong.webp",
        "format": "WEBP",
        "width": 610,
        "height": 1302,
        "aspectRatio": 0.469,
        "size": 97582,
        "md5": "eeaa8b1029518f3d615f327471ab227a",
        "type": "decoration",
        "usage": "Decorative element (phuong) for red-v1"
      },
      {
        "id": "rong",
        "file": "rong.webp",
        "path": "/images/themes/red-v1/rong.webp",
        "format": "WEBP",
        "width": 1000,
        "height": 2000,
        "aspectRatio": 0.5,
        "size": 279912,
        "md5": "d813a65ed9bb2c953ede68b495ab265b",
        "type": "decoration",
        "usage": "Ornamental artwork for red-v1"
      }
    ],
    "backgroundPath": "/images/themes/red-v1/bg-main.webp",
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": true,
    "sharedWith": [
      "dragon_phoenix_red",
      "dragon_phoenix_green",
      "dragon_phoenix_blue",
      "dragon_phoenix_black"
    ],
    "status": "active"
  },
  "royal_red": {
    "templateId": "royal_red",
    "slug": "hoang-kim-do",
    "name": "Hoàng Kim - Đỏ",
    "themeFolders": [
      "royal-red"
    ],
    "assetCount": 2,
    "totalBytes": 603466,
    "assets": [
      {
        "id": "background",
        "file": "background.webp",
        "path": "/images/themes/royal-red/background.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 8892,
        "aspectRatio": 0.115,
        "size": 435762,
        "md5": "5b13c439d1c3a92969f0644058f7ca7e",
        "type": "background",
        "usage": "Background paper or ambient texture for royal-red"
      },
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/royal-red/flower.webp",
        "format": "WEBP",
        "width": 900,
        "height": 544,
        "aspectRatio": 1.654,
        "size": 167704,
        "md5": "94a3e6b1b91a47f929f760df78310d35",
        "type": "decoration",
        "usage": "Decorative element (flower) for royal-red"
      }
    ],
    "backgroundPath": "/images/themes/royal-red/background.webp",
    "coverPath": null,
    "decorationsCount": 1,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "spring_garden_green": {
    "templateId": "spring_garden_green",
    "slug": "vuon-xuan-xanh",
    "name": "Vườn Xuân - Xanh",
    "themeFolders": [
      "nature"
    ],
    "assetCount": 2,
    "totalBytes": 204906,
    "assets": [
      {
        "id": "flower_paralax",
        "file": "flower_paralax.webp",
        "path": "/images/themes/nature/flower_paralax.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 1879,
        "aspectRatio": 1.064,
        "size": 109780,
        "md5": "c9be1f8b4e95c8d0725b89b397cb0e12",
        "type": "decoration",
        "usage": "Decorative element (flower_paralax) for nature"
      },
      {
        "id": "flower_top",
        "file": "flower_top.webp",
        "path": "/images/themes/nature/flower_top.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 1470,
        "aspectRatio": 1.361,
        "size": 95126,
        "md5": "f0ac8745c88f20f5d77eeda4f169736c",
        "type": "decoration",
        "usage": "Decorative element (flower_top) for nature"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "baroque_gold": {
    "templateId": "baroque_gold",
    "slug": "hoang-gia-vang",
    "name": "Baroque - Vàng",
    "themeFolders": [
      "baroque-gold"
    ],
    "assetCount": 3,
    "totalBytes": 1179888,
    "assets": [
      {
        "id": "bg",
        "file": "bg.webp",
        "path": "/images/themes/baroque-gold/bg.webp",
        "format": "WEBP",
        "width": 5000,
        "height": 5000,
        "aspectRatio": 1.0,
        "size": 676638,
        "md5": "7e8b309790b2fd209a7c7fcc62ce3f86",
        "type": "background",
        "usage": "Background paper or ambient texture for baroque-gold"
      },
      {
        "id": "hoa",
        "file": "hoa.webp",
        "path": "/images/themes/baroque-gold/hoa.webp",
        "format": "WEBP",
        "width": 1193,
        "height": 1318,
        "aspectRatio": 0.905,
        "size": 188922,
        "md5": "5d4ff97353120b9674f2b9dcdc7fefbd",
        "type": "decoration",
        "usage": "Decorative element (hoa) for baroque-gold"
      },
      {
        "id": "khung",
        "file": "khung.webp",
        "path": "/images/themes/baroque-gold/khung.webp",
        "format": "WEBP",
        "width": 1074,
        "height": 1293,
        "aspectRatio": 0.831,
        "size": 314328,
        "md5": "c2966d739b19f2f187557681eb76f667",
        "type": "frame",
        "usage": "Framing border or arch for baroque-gold"
      }
    ],
    "backgroundPath": "/images/themes/baroque-gold/bg.webp",
    "coverPath": null,
    "decorationsCount": 1,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "double_phoenix_green": {
    "templateId": "double_phoenix_green",
    "slug": "song-phung-xanh",
    "name": "Song Phụng - Xanh",
    "themeFolders": [
      "songphung-green"
    ],
    "assetCount": 3,
    "totalBytes": 924597,
    "assets": [
      {
        "id": "HOA",
        "file": "HOA.webp",
        "path": "/images/themes/songphung-green/HOA.webp",
        "format": "WEBP",
        "width": 964,
        "height": 1095,
        "aspectRatio": 0.88,
        "size": 160168,
        "md5": "6cd60f4c1aa56007b34a8ad0aeb145e1",
        "type": "decoration",
        "usage": "Decorative element (hoa) for songphung-green"
      },
      {
        "id": "NENGIAY",
        "file": "NENGIAY.jpg",
        "path": "/images/themes/songphung-green/NENGIAY.jpg",
        "format": "JPEG",
        "width": 1000,
        "height": 1500,
        "aspectRatio": 0.667,
        "size": 211733,
        "md5": "6b466a560f5e6edf8f188a59dfd91cac",
        "type": "background",
        "usage": "Background paper or ambient texture for songphung-green"
      },
      {
        "id": "Phuong",
        "file": "Phuong.webp",
        "path": "/images/themes/songphung-green/Phuong.webp",
        "format": "WEBP",
        "width": 1952,
        "height": 4105,
        "aspectRatio": 0.476,
        "size": 552696,
        "md5": "9a7bc59fef9e12f666e86950bcfcfbff",
        "type": "decoration",
        "usage": "Decorative element (phuong) for songphung-green"
      }
    ],
    "backgroundPath": "/images/themes/songphung-green/NENGIAY.jpg",
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "cherry_blossom_pink": {
    "templateId": "cherry_blossom_pink",
    "slug": "anh-dao-hong",
    "name": "Anh Đào - Hồng",
    "themeFolders": [
      "anhdao-pink"
    ],
    "assetCount": 2,
    "totalBytes": 671830,
    "assets": [
      {
        "id": "1",
        "file": "1.webp",
        "path": "/images/themes/anhdao-pink/1.webp",
        "format": "WEBP",
        "width": 627,
        "height": 900,
        "aspectRatio": 0.697,
        "size": 52742,
        "md5": "ba57ddf633f40eb0e9aed50580f3af5c",
        "type": "decoration",
        "usage": "Ornamental artwork for anhdao-pink"
      },
      {
        "id": "bg-full",
        "file": "bg-full.jpg",
        "path": "/images/themes/anhdao-pink/bg-full.jpg",
        "format": "JPEG",
        "width": 900,
        "height": 6000,
        "aspectRatio": 0.15,
        "size": 619088,
        "md5": "1a8c3fbbaf3cae302a2b1f91fb5199b6",
        "type": "background",
        "usage": "Background paper or ambient texture for anhdao-pink"
      }
    ],
    "backgroundPath": "/images/themes/anhdao-pink/bg-full.jpg",
    "coverPath": null,
    "decorationsCount": 1,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "hoa_tinh_red": {
    "templateId": "hoa_tinh_red",
    "slug": "hoa-tinh-do",
    "name": "Hoạ Tình - Đỏ",
    "themeFolders": [
      "love-art"
    ],
    "assetCount": 4,
    "totalBytes": 47062,
    "assets": [
      {
        "id": "dau",
        "file": "dau.webp",
        "path": "/images/themes/love-art/dau.webp",
        "format": "WEBP",
        "width": 162,
        "height": 292,
        "aspectRatio": 0.555,
        "size": 15190,
        "md5": "3413c03172727626a07ba018a95a46b9",
        "type": "decoration",
        "usage": "Ornamental artwork for love-art"
      },
      {
        "id": "hy",
        "file": "hy.webp",
        "path": "/images/themes/love-art/hy.webp",
        "format": "WEBP",
        "width": 210,
        "height": 204,
        "aspectRatio": 1.029,
        "size": 16076,
        "md5": "21b3251bcf936a6edb3cfdaa462579d8",
        "type": "decoration",
        "usage": "Ornamental artwork for love-art"
      },
      {
        "id": "re",
        "file": "re.webp",
        "path": "/images/themes/love-art/re.webp",
        "format": "WEBP",
        "width": 271,
        "height": 140,
        "aspectRatio": 1.936,
        "size": 10078,
        "md5": "059b983718eab51ed0a3da3cf40cd758",
        "type": "decoration",
        "usage": "Ornamental artwork for love-art"
      },
      {
        "id": "tim",
        "file": "tim.webp",
        "path": "/images/themes/love-art/tim.webp",
        "format": "WEBP",
        "width": 128,
        "height": 111,
        "aspectRatio": 1.153,
        "size": 5718,
        "md5": "123aa5cedd539e8b5936120c3a075f43",
        "type": "decoration",
        "usage": "Ornamental artwork for love-art"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 4,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "silk_flora_brown": {
    "templateId": "silk_flora_brown",
    "slug": "hoa-lua-nau",
    "name": "Hoa Lụa - Nâu",
    "themeFolders": [
      "silkflora-brown"
    ],
    "assetCount": 2,
    "totalBytes": 333940,
    "assets": [
      {
        "id": "bottom",
        "file": "bottom.webp",
        "path": "/images/themes/silkflora-brown/bottom.webp",
        "format": "WEBP",
        "width": 1188,
        "height": 1672,
        "aspectRatio": 0.711,
        "size": 152350,
        "md5": "ea83f305cfca90e8dc15a43bc7e3e1f5",
        "type": "decoration",
        "usage": "Body or footer illustration for silkflora-brown"
      },
      {
        "id": "middle",
        "file": "middle.webp",
        "path": "/images/themes/silkflora-brown/middle.webp",
        "format": "WEBP",
        "width": 996,
        "height": 1946,
        "aspectRatio": 0.512,
        "size": 181590,
        "md5": "8aff763aafda68cb9f569779a54bcff1",
        "type": "decoration",
        "usage": "Body or footer illustration for silkflora-brown"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "boho_floral_pink": {
    "templateId": "boho_floral_pink",
    "slug": "hoa-moc-hong",
    "name": "Hoa Mộc - Hồng",
    "themeFolders": [
      "boho-floral-pink"
    ],
    "assetCount": 2,
    "totalBytes": 107854,
    "assets": [
      {
        "id": "asset_1",
        "file": "asset_1.webp",
        "path": "/images/themes/boho-floral-pink/asset_1.webp",
        "format": "WEBP",
        "width": 987,
        "height": 971,
        "aspectRatio": 1.016,
        "size": 53336,
        "md5": "e3a5586d0caa8e5696dcd896dcfbdaf5",
        "type": "decoration",
        "usage": "Ornamental artwork for boho-floral-pink"
      },
      {
        "id": "asset_2",
        "file": "asset_2.webp",
        "path": "/images/themes/boho-floral-pink/asset_2.webp",
        "format": "WEBP",
        "width": 581,
        "height": 1066,
        "aspectRatio": 0.545,
        "size": 54518,
        "md5": "ec7aed8f48ea2032da157f17111d6091",
        "type": "decoration",
        "usage": "Ornamental artwork for boho-floral-pink"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "nhat_binh_red": {
    "templateId": "nhat_binh_red",
    "slug": "nhat-binh-do",
    "name": "Nhật Bình - Đỏ",
    "themeFolders": [
      "nhat-binh-red"
    ],
    "assetCount": 7,
    "totalBytes": 2226554,
    "assets": [
      {
        "id": "chu-hy",
        "file": "chu-hy.webp",
        "path": "/images/themes/nhat-binh-red/chu-hy.webp",
        "format": "WEBP",
        "width": 900,
        "height": 623,
        "aspectRatio": 1.445,
        "size": 68546,
        "md5": "4e7d029636ed094d9aa686b2ef2da2d8",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for nhat-binh-red"
      },
      {
        "id": "dau-re",
        "file": "dau-re.webp",
        "path": "/images/themes/nhat-binh-red/dau-re.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1289,
        "aspectRatio": 0.698,
        "size": 171492,
        "md5": "3aa1e1c3e75629cdbc5a4e288463ac56",
        "type": "decoration",
        "usage": "Ornamental artwork for nhat-binh-red"
      },
      {
        "id": "hoa",
        "file": "hoa.webp",
        "path": "/images/themes/nhat-binh-red/hoa.webp",
        "format": "WEBP",
        "width": 960,
        "height": 788,
        "aspectRatio": 1.218,
        "size": 155514,
        "md5": "dac972ddcd9fa94001a2bf06ddc6e85b",
        "type": "decoration",
        "usage": "Decorative element (hoa) for nhat-binh-red"
      },
      {
        "id": "long-den",
        "file": "long-den.webp",
        "path": "/images/themes/nhat-binh-red/long-den.webp",
        "format": "WEBP",
        "width": 320,
        "height": 902,
        "aspectRatio": 0.355,
        "size": 34616,
        "md5": "5495816d6a28e6ce606215b055f5008b",
        "type": "decoration",
        "usage": "Ornamental artwork for nhat-binh-red"
      },
      {
        "id": "may-to",
        "file": "may-to.webp",
        "path": "/images/themes/nhat-binh-red/may-to.webp",
        "format": "WEBP",
        "width": 1100,
        "height": 642,
        "aspectRatio": 1.713,
        "size": 155468,
        "md5": "195708636fe3542800404a94aaff2dc8",
        "type": "decoration",
        "usage": "Ornamental artwork for nhat-binh-red"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/nhat-binh-red/paper.webp",
        "format": "WEBP",
        "width": 1656,
        "height": 4000,
        "aspectRatio": 0.414,
        "size": 1545250,
        "md5": "233d52ca6ff956ac6d48dd1ecca37a17",
        "type": "background",
        "usage": "Background paper or ambient texture for nhat-binh-red"
      },
      {
        "id": "quat",
        "file": "quat.webp",
        "path": "/images/themes/nhat-binh-red/quat.webp",
        "format": "WEBP",
        "width": 750,
        "height": 551,
        "aspectRatio": 1.361,
        "size": 95668,
        "md5": "6eedd65b313a13eb99a04b70563329ac",
        "type": "decoration",
        "usage": "Ornamental artwork for nhat-binh-red"
      }
    ],
    "backgroundPath": "/images/themes/nhat-binh-red/paper.webp",
    "coverPath": null,
    "decorationsCount": 5,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "boho_floral_brown": {
    "templateId": "boho_floral_brown",
    "slug": "hoa-moc-nau",
    "name": "Hoa Mộc - Nâu",
    "themeFolders": [
      "boho-floral-brown"
    ],
    "assetCount": 4,
    "totalBytes": 513792,
    "assets": [
      {
        "id": "decoration_bar",
        "file": "decoration_bar.webp",
        "path": "/images/themes/boho-floral-brown/decoration_bar.webp",
        "format": "WEBP",
        "width": 3304,
        "height": 421,
        "aspectRatio": 7.848,
        "size": 44404,
        "md5": "884cc803cee8b4c0b36ed9aa7ae84c8e",
        "type": "decoration",
        "usage": "Ornamental artwork for boho-floral-brown"
      },
      {
        "id": "fixed_flower",
        "file": "fixed_flower.webp",
        "path": "/images/themes/boho-floral-brown/fixed_flower.webp",
        "format": "WEBP",
        "width": 1120,
        "height": 1482,
        "aspectRatio": 0.756,
        "size": 101106,
        "md5": "bb522b984196d488a1cc35f31d517616",
        "type": "decoration",
        "usage": "Decorative element (fixed_flower) for boho-floral-brown"
      },
      {
        "id": "flower_bottom",
        "file": "flower_bottom.webp",
        "path": "/images/themes/boho-floral-brown/flower_bottom.webp",
        "format": "WEBP",
        "width": 779,
        "height": 984,
        "aspectRatio": 0.792,
        "size": 33532,
        "md5": "2109b04c2973b83e2e548508dee15edf",
        "type": "decoration",
        "usage": "Decorative element (flower_bottom) for boho-floral-brown"
      },
      {
        "id": "flower_top",
        "file": "flower_top.webp",
        "path": "/images/themes/boho-floral-brown/flower_top.webp",
        "format": "WEBP",
        "width": 2554,
        "height": 2595,
        "aspectRatio": 0.984,
        "size": 334750,
        "md5": "4aaa70aea655d0dd2f4b5c95945b8538",
        "type": "decoration",
        "usage": "Decorative element (flower_top) for boho-floral-brown"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 4,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "applique_lace_white": {
    "templateId": "applique_lace_white",
    "slug": "ren-theu-trang",
    "name": "Ren Thêu - Trắng",
    "themeFolders": [
      "applique-lace-white"
    ],
    "assetCount": 4,
    "totalBytes": 511560,
    "assets": [
      {
        "id": "envelope-background",
        "file": "envelope-background.webp",
        "path": "/images/themes/applique-lace-white/envelope-background.webp",
        "format": "WEBP",
        "width": 1071,
        "height": 1192,
        "aspectRatio": 0.898,
        "size": 47598,
        "md5": "3341160242719448312275da3c584e94",
        "type": "background",
        "usage": "Background paper or ambient texture for applique-lace-white"
      },
      {
        "id": "envelope-cover",
        "file": "envelope-cover.webp",
        "path": "/images/themes/applique-lace-white/envelope-cover.webp",
        "format": "WEBP",
        "width": 1400,
        "height": 933,
        "aspectRatio": 1.501,
        "size": 320810,
        "md5": "8101e594bddb854a42aa82982b8fd54d",
        "type": "cover",
        "usage": "Envelope or cover illustration for applique-lace-white"
      },
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/applique-lace-white/flower.webp",
        "format": "WEBP",
        "width": 636,
        "height": 1480,
        "aspectRatio": 0.43,
        "size": 131830,
        "md5": "4680183d3762d76ce48f6e9433f8b8f5",
        "type": "decoration",
        "usage": "Decorative element (flower) for applique-lace-white"
      },
      {
        "id": "satin-background",
        "file": "satin-background.webp",
        "path": "/images/themes/applique-lace-white/satin-background.webp",
        "format": "WEBP",
        "width": 955,
        "height": 1647,
        "aspectRatio": 0.58,
        "size": 11322,
        "md5": "aa5badcc5b0424268bad088d1e206703",
        "type": "background",
        "usage": "Background paper or ambient texture for applique-lace-white"
      }
    ],
    "backgroundPath": "/images/themes/applique-lace-white/envelope-background.webp",
    "coverPath": "/images/themes/applique-lace-white/envelope-cover.webp",
    "decorationsCount": 1,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "chateau_green": {
    "templateId": "chateau_green",
    "slug": "lau-dai-xanh",
    "name": "Lâu Đài - Xanh",
    "themeFolders": [
      "chateau-green"
    ],
    "assetCount": 6,
    "totalBytes": 1411056,
    "assets": [
      {
        "id": "chateau",
        "file": "chateau.webp",
        "path": "/images/themes/chateau-green/chateau.webp",
        "format": "WEBP",
        "width": 1944,
        "height": 1456,
        "aspectRatio": 1.335,
        "size": 954182,
        "md5": "737086f00e4f0865be1a77bf8c13dd80",
        "type": "decoration",
        "usage": "Ornamental artwork for chateau-green"
      },
      {
        "id": "cloud-1",
        "file": "cloud-1.webp",
        "path": "/images/themes/chateau-green/cloud-1.webp",
        "format": "WEBP",
        "width": 1728,
        "height": 645,
        "aspectRatio": 2.679,
        "size": 200440,
        "md5": "49113ffae473692ff4197e14011a0432",
        "type": "decoration",
        "usage": "Decorative element (cloud-1) for chateau-green"
      },
      {
        "id": "cloud-2",
        "file": "cloud-2.webp",
        "path": "/images/themes/chateau-green/cloud-2.webp",
        "format": "WEBP",
        "width": 921,
        "height": 402,
        "aspectRatio": 2.291,
        "size": 98104,
        "md5": "9d802f5c7ea2e9bb5a5a45e7784cd6fc",
        "type": "decoration",
        "usage": "Decorative element (cloud-2) for chateau-green"
      },
      {
        "id": "cloud-3",
        "file": "cloud-3.webp",
        "path": "/images/themes/chateau-green/cloud-3.webp",
        "format": "WEBP",
        "width": 1464,
        "height": 516,
        "aspectRatio": 2.837,
        "size": 142178,
        "md5": "c16e4235a697a82f388040d5dc70ae2b",
        "type": "decoration",
        "usage": "Decorative element (cloud-3) for chateau-green"
      },
      {
        "id": "divider-arrow",
        "file": "divider-arrow.webp",
        "path": "/images/themes/chateau-green/divider-arrow.webp",
        "format": "WEBP",
        "width": 144,
        "height": 12,
        "aspectRatio": 12.0,
        "size": 1796,
        "md5": "ef846bb34b43acea287cd15539fe37da",
        "type": "divider",
        "usage": "Decorative divider line for chateau-green"
      },
      {
        "id": "ornament",
        "file": "ornament.webp",
        "path": "/images/themes/chateau-green/ornament.webp",
        "format": "WEBP",
        "width": 320,
        "height": 84,
        "aspectRatio": 3.81,
        "size": 14356,
        "md5": "d1b182f12cd7d04b48b2493479446762",
        "type": "decoration",
        "usage": "Ornamental artwork for chateau-green"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 5,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "double_dragon_green": {
    "templateId": "double_dragon_green",
    "slug": "song-long-xanh",
    "name": "Song Long - Xanh",
    "themeFolders": [
      "songlong-red"
    ],
    "assetCount": 8,
    "totalBytes": 438646,
    "assets": [
      {
        "id": "chinese_happiness",
        "file": "chinese_happiness.webp",
        "path": "/images/themes/songlong-red/chinese_happiness.webp",
        "format": "WEBP",
        "width": 177,
        "height": 176,
        "aspectRatio": 1.006,
        "size": 6236,
        "md5": "5a71f152116e20ed0e1895452d95cc34",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for songlong-red"
      },
      {
        "id": "cloud_big",
        "file": "cloud_big.webp",
        "path": "/images/themes/songlong-red/cloud_big.webp",
        "format": "WEBP",
        "width": 308,
        "height": 134,
        "aspectRatio": 2.299,
        "size": 8924,
        "md5": "2a8491fa065fb885719766d997d08cd0",
        "type": "decoration",
        "usage": "Decorative element (cloud_big) for songlong-red"
      },
      {
        "id": "cloud_small",
        "file": "cloud_small.webp",
        "path": "/images/themes/songlong-red/cloud_small.webp",
        "format": "WEBP",
        "width": 191,
        "height": 123,
        "aspectRatio": 1.553,
        "size": 5850,
        "md5": "c90661183b9a8b454a5b27739b06cf7b",
        "type": "decoration",
        "usage": "Decorative element (cloud_small) for songlong-red"
      },
      {
        "id": "dragon_left",
        "file": "dragon_left.webp",
        "path": "/images/themes/songlong-red/dragon_left.webp",
        "format": "WEBP",
        "width": 622,
        "height": 837,
        "aspectRatio": 0.743,
        "size": 110198,
        "md5": "62e3dc7d145a8e81a7affc744a2ba214",
        "type": "decoration",
        "usage": "Decorative element (dragon_left) for songlong-red"
      },
      {
        "id": "dragon_right",
        "file": "dragon_right.webp",
        "path": "/images/themes/songlong-red/dragon_right.webp",
        "format": "WEBP",
        "width": 621,
        "height": 837,
        "aspectRatio": 0.742,
        "size": 110304,
        "md5": "0e859bab5a93e4fad4b81a26dfc5db19",
        "type": "decoration",
        "usage": "Decorative element (dragon_right) for songlong-red"
      },
      {
        "id": "wave",
        "file": "wave.webp",
        "path": "/images/themes/songlong-red/wave.webp",
        "format": "WEBP",
        "width": 136,
        "height": 54,
        "aspectRatio": 2.519,
        "size": 3286,
        "md5": "bd57391ca621b220aa46ff709b4e0668",
        "type": "decoration",
        "usage": "Decorative element (wave) for songlong-red"
      },
      {
        "id": "double_dragon_artwork",
        "file": "double-dragon.webp",
        "path": "/images/double-dragon.webp",
        "format": "WEBP",
        "width": 665,
        "height": 863,
        "aspectRatio": 0.771,
        "size": 178384,
        "md5": "8d16e4968a64d4068d86b831cb5f6f27",
        "type": "decoration",
        "usage": "Hero double dragon decorative banner"
      },
      {
        "id": "chu_hy_symbol",
        "file": "chu-hy.webp",
        "path": "/images/chu-hy.webp",
        "format": "WEBP",
        "width": 1272,
        "height": 1271,
        "aspectRatio": 1.001,
        "size": 15464,
        "md5": "3254ede7020f42bc42a1502884e6ffa5",
        "type": "icon",
        "usage": "Chinese happiness symbol (囍)"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 6,
    "framesCount": 0,
    "isSharedTheme": true,
    "sharedWith": [
      "double_dragon_red",
      "double_dragon_green",
      "double_dragon_blue"
    ],
    "status": "active"
  },
  "lien_hoa_pink": {
    "templateId": "lien_hoa_pink",
    "slug": "lien-hoa-hong",
    "name": "Liên Hoa - Hồng",
    "themeFolders": [
      "lien-hoa-pink"
    ],
    "assetCount": 4,
    "totalBytes": 477146,
    "assets": [
      {
        "id": "flower2",
        "file": "flower2.webp",
        "path": "/images/themes/lien-hoa-pink/flower2.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 88420,
        "md5": "a18451daa2aa4f73f55e9a304f84541c",
        "type": "decoration",
        "usage": "Decorative element (flower2) for lien-hoa-pink"
      },
      {
        "id": "flower3",
        "file": "flower3.webp",
        "path": "/images/themes/lien-hoa-pink/flower3.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 1536,
        "aspectRatio": 0.667,
        "size": 142410,
        "md5": "a7f9329da72e1057325b8ec31fdcd2cb",
        "type": "decoration",
        "usage": "Decorative element (flower3) for lien-hoa-pink"
      },
      {
        "id": "framegold1",
        "file": "framegold1.webp",
        "path": "/images/themes/lien-hoa-pink/framegold1.webp",
        "format": "WEBP",
        "width": 1500,
        "height": 2100,
        "aspectRatio": 0.714,
        "size": 53284,
        "md5": "90fa7ee3534e2406e4a95e5c680d6666",
        "type": "frame",
        "usage": "Framing border or arch for lien-hoa-pink"
      },
      {
        "id": "hoa-sen-bg",
        "file": "hoa-sen-bg.webp",
        "path": "/images/themes/lien-hoa-pink/hoa-sen-bg.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 193032,
        "md5": "372df3461c1561c90a81decbbea6fe56",
        "type": "background",
        "usage": "Background paper or ambient texture for lien-hoa-pink"
      }
    ],
    "backgroundPath": "/images/themes/lien-hoa-pink/hoa-sen-bg.webp",
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "spring_garden_red": {
    "templateId": "spring_garden_red",
    "slug": "vuon-xuan-do",
    "name": "Vườn Xuân - Đỏ",
    "themeFolders": [
      "vuon xuan red"
    ],
    "assetCount": 6,
    "totalBytes": 333366,
    "assets": [
      {
        "id": "1_left",
        "file": "1 left.webp",
        "path": "/images/themes/vuon xuan red/1 left.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 1999,
        "aspectRatio": 1.001,
        "size": 57264,
        "md5": "cdb1a104de1ed0d14d452651802112bc",
        "type": "decoration",
        "usage": "Ornamental artwork for vuon xuan red"
      },
      {
        "id": "2_right",
        "file": "2 right.webp",
        "path": "/images/themes/vuon xuan red/2 right.webp",
        "format": "WEBP",
        "width": 1990,
        "height": 2000,
        "aspectRatio": 0.995,
        "size": 59120,
        "md5": "b7f35726f78c143e193681f3df65a159",
        "type": "decoration",
        "usage": "Ornamental artwork for vuon xuan red"
      },
      {
        "id": "3_left",
        "file": "3 left.webp",
        "path": "/images/themes/vuon xuan red/3 left.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 1925,
        "aspectRatio": 1.039,
        "size": 57640,
        "md5": "22e80ff9e496787cc9999ea944290b90",
        "type": "decoration",
        "usage": "Ornamental artwork for vuon xuan red"
      },
      {
        "id": "4_right",
        "file": "4 right.webp",
        "path": "/images/themes/vuon xuan red/4 right.webp",
        "format": "WEBP",
        "width": 1760,
        "height": 2000,
        "aspectRatio": 0.88,
        "size": 72734,
        "md5": "d03728e2fc0f1c477b35f277bd1163aa",
        "type": "decoration",
        "usage": "Ornamental artwork for vuon xuan red"
      },
      {
        "id": "button_left",
        "file": "button left.webp",
        "path": "/images/themes/vuon xuan red/button left.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 1029,
        "aspectRatio": 1.944,
        "size": 45410,
        "md5": "fd4edc030ae9af520a0a2b1eb52d328d",
        "type": "decoration",
        "usage": "Body or footer illustration for vuon xuan red"
      },
      {
        "id": "top_right",
        "file": "top right.webp",
        "path": "/images/themes/vuon xuan red/top right.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 952,
        "aspectRatio": 2.101,
        "size": 41198,
        "md5": "bdfe7b42a4b305964354c15a4008972a",
        "type": "decoration",
        "usage": "Header ornament for vuon xuan red"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 6,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "dragon_phoenix_blue": {
    "templateId": "dragon_phoenix_blue",
    "slug": "long-phung-lam",
    "name": "Long Phụng - Lam",
    "themeFolders": [
      "red-v1"
    ],
    "assetCount": 4,
    "totalBytes": 579626,
    "assets": [
      {
        "id": "bg-main",
        "file": "bg-main.webp",
        "path": "/images/themes/red-v1/bg-main.webp",
        "format": "WEBP",
        "width": 1171,
        "height": 1444,
        "aspectRatio": 0.811,
        "size": 201876,
        "md5": "f51ff94e3f87422924e1f998ab99e58a",
        "type": "background",
        "usage": "Background paper or ambient texture for red-v1"
      },
      {
        "id": "line6",
        "file": "line6.svg",
        "path": "/images/themes/red-v1/line6.svg",
        "format": "SVG",
        "width": 25,
        "height": 1,
        "aspectRatio": 25.0,
        "size": 256,
        "md5": "425620abf8ed8f88d4adb4a2eb9fe6c2",
        "type": "divider",
        "usage": "Decorative divider line for red-v1"
      },
      {
        "id": "phuong",
        "file": "phuong.webp",
        "path": "/images/themes/red-v1/phuong.webp",
        "format": "WEBP",
        "width": 610,
        "height": 1302,
        "aspectRatio": 0.469,
        "size": 97582,
        "md5": "eeaa8b1029518f3d615f327471ab227a",
        "type": "decoration",
        "usage": "Decorative element (phuong) for red-v1"
      },
      {
        "id": "rong",
        "file": "rong.webp",
        "path": "/images/themes/red-v1/rong.webp",
        "format": "WEBP",
        "width": 1000,
        "height": 2000,
        "aspectRatio": 0.5,
        "size": 279912,
        "md5": "d813a65ed9bb2c953ede68b495ab265b",
        "type": "decoration",
        "usage": "Ornamental artwork for red-v1"
      }
    ],
    "backgroundPath": "/images/themes/red-v1/bg-main.webp",
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": true,
    "sharedWith": [
      "dragon_phoenix_red",
      "dragon_phoenix_green",
      "dragon_phoenix_blue",
      "dragon_phoenix_black"
    ],
    "status": "active"
  },
  "spring_garden_blue": {
    "templateId": "spring_garden_blue",
    "slug": "vuon-xuan-lam",
    "name": "Vườn Xuân - Lam",
    "themeFolders": [
      "vuon xuan blue"
    ],
    "assetCount": 3,
    "totalBytes": 446710,
    "assets": [
      {
        "id": "button",
        "file": "button.webp",
        "path": "/images/themes/vuon xuan blue/button.webp",
        "format": "WEBP",
        "width": 1569,
        "height": 2000,
        "aspectRatio": 0.784,
        "size": 150866,
        "md5": "f1f1616f849ee68bd701094a7bce38b6",
        "type": "decoration",
        "usage": "Body or footer illustration for vuon xuan blue"
      },
      {
        "id": "mid",
        "file": "mid.webp",
        "path": "/images/themes/vuon xuan blue/mid.webp",
        "format": "WEBP",
        "width": 1971,
        "height": 2000,
        "aspectRatio": 0.986,
        "size": 120182,
        "md5": "1f5b2ab3ea2b4c0e4f5c75de036b3cc7",
        "type": "decoration",
        "usage": "Body or footer illustration for vuon xuan blue"
      },
      {
        "id": "top",
        "file": "top.webp",
        "path": "/images/themes/vuon xuan blue/top.webp",
        "format": "WEBP",
        "width": 2000,
        "height": 1940,
        "aspectRatio": 1.031,
        "size": 175662,
        "md5": "5de89e3dc1ae23bf6d7de3eb40ebe17c",
        "type": "decoration",
        "usage": "Header ornament for vuon xuan blue"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 3,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "baroque_v2_darkgreen": {
    "templateId": "baroque_v2_darkgreen",
    "slug": "baroque-v2-xanh-dam",
    "name": "Baroque V2 - Xanh Đậm",
    "themeFolders": [
      "baroque-v2-dark-green"
    ],
    "assetCount": 1,
    "totalBytes": 305692,
    "assets": [
      {
        "id": "frame",
        "file": "frame.webp",
        "path": "/images/themes/baroque-v2-dark-green/frame.webp",
        "format": "WEBP",
        "width": 1118,
        "height": 1407,
        "aspectRatio": 0.795,
        "size": 305692,
        "md5": "32535ae75635388e876a5bd5e1504bfb",
        "type": "frame",
        "usage": "Framing border or arch for baroque-v2-dark-green"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "crystal_floral_blue": {
    "templateId": "crystal_floral_blue",
    "slug": "hoa-thuy-tinh-lam",
    "name": "Hoa Thuỷ Tinh - Lam",
    "themeFolders": [
      "crystal-floral-blue"
    ],
    "assetCount": 4,
    "totalBytes": 2199708,
    "assets": [
      {
        "id": "flower-frame",
        "file": "flower-frame.webp",
        "path": "/images/themes/crystal-floral-blue/flower-frame.webp",
        "format": "WEBP",
        "width": 2067,
        "height": 2770,
        "aspectRatio": 0.746,
        "size": 586188,
        "md5": "1bbe5c84b678388fb939af330a1707d1",
        "type": "frame",
        "usage": "Framing border or arch for crystal-floral-blue"
      },
      {
        "id": "flower1",
        "file": "flower1.webp",
        "path": "/images/themes/crystal-floral-blue/flower1.webp",
        "format": "WEBP",
        "width": 3935,
        "height": 1381,
        "aspectRatio": 2.849,
        "size": 748654,
        "md5": "7d90556097024538d033aa2f3db89bb5",
        "type": "decoration",
        "usage": "Decorative element (flower1) for crystal-floral-blue"
      },
      {
        "id": "flower2",
        "file": "flower2.webp",
        "path": "/images/themes/crystal-floral-blue/flower2.webp",
        "format": "WEBP",
        "width": 1370,
        "height": 2508,
        "aspectRatio": 0.546,
        "size": 443184,
        "md5": "e50160b6f55860c18f5f53eed660d7a7",
        "type": "decoration",
        "usage": "Decorative element (flower2) for crystal-floral-blue"
      },
      {
        "id": "flower3",
        "file": "flower3.webp",
        "path": "/images/themes/crystal-floral-blue/flower3.webp",
        "format": "WEBP",
        "width": 1308,
        "height": 2508,
        "aspectRatio": 0.522,
        "size": 421682,
        "md5": "7144f814fbfa8cbcac1905bac3c7c7f8",
        "type": "decoration",
        "usage": "Decorative element (flower3) for crystal-floral-blue"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 3,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "porcelain_v2_pink": {
    "templateId": "porcelain_v2_pink",
    "slug": "bach-su-v2-hong",
    "name": "Bạch Sứ V2 - Hồng",
    "themeFolders": [
      "porcelain-v2-pink"
    ],
    "assetCount": 1,
    "totalBytes": 89832,
    "assets": [
      {
        "id": "hero-frame",
        "file": "hero-frame.webp",
        "path": "/images/themes/porcelain-v2-pink/hero-frame.webp",
        "format": "WEBP",
        "width": 831,
        "height": 1491,
        "aspectRatio": 0.557,
        "size": 89832,
        "md5": "91a6b2bd1d6f42670b8596ad5795b89c",
        "type": "frame",
        "usage": "Framing border or arch for porcelain-v2-pink"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "chateau_blue": {
    "templateId": "chateau_blue",
    "slug": "lau-dai-lam",
    "name": "Lâu Đài - Lam",
    "themeFolders": [
      "chateau-blue"
    ],
    "assetCount": 7,
    "totalBytes": 946776,
    "assets": [
      {
        "id": "asset-1",
        "file": "asset-1.webp",
        "path": "/images/themes/chateau-blue/asset-1.webp",
        "format": "WEBP",
        "width": 363,
        "height": 30,
        "aspectRatio": 12.1,
        "size": 1948,
        "md5": "c9aa18a74b0164e2b9e137cf988b36ed",
        "type": "decoration",
        "usage": "Ornamental artwork for chateau-blue"
      },
      {
        "id": "asset-2",
        "file": "asset-2.webp",
        "path": "/images/themes/chateau-blue/asset-2.webp",
        "format": "WEBP",
        "width": 506,
        "height": 133,
        "aspectRatio": 3.805,
        "size": 9962,
        "md5": "9517305ef3353a19d64be8d290189aa1",
        "type": "decoration",
        "usage": "Ornamental artwork for chateau-blue"
      },
      {
        "id": "cloud-1",
        "file": "cloud-1.webp",
        "path": "/images/themes/chateau-blue/cloud-1.webp",
        "format": "WEBP",
        "width": 581,
        "height": 383,
        "aspectRatio": 1.517,
        "size": 63514,
        "md5": "c7273de823558d744c58432edb915dbb",
        "type": "decoration",
        "usage": "Decorative element (cloud-1) for chateau-blue"
      },
      {
        "id": "cloud-2",
        "file": "cloud-2.webp",
        "path": "/images/themes/chateau-blue/cloud-2.webp",
        "format": "WEBP",
        "width": 761,
        "height": 247,
        "aspectRatio": 3.081,
        "size": 55290,
        "md5": "97a526a6467704654da7c4cc278496af",
        "type": "decoration",
        "usage": "Decorative element (cloud-2) for chateau-blue"
      },
      {
        "id": "cloud-3",
        "file": "cloud-3.webp",
        "path": "/images/themes/chateau-blue/cloud-3.webp",
        "format": "WEBP",
        "width": 477,
        "height": 202,
        "aspectRatio": 2.361,
        "size": 33724,
        "md5": "60d23b5f2d620ff8dd376d097d579c25",
        "type": "decoration",
        "usage": "Decorative element (cloud-3) for chateau-blue"
      },
      {
        "id": "hoa",
        "file": "hoa.webp",
        "path": "/images/themes/chateau-blue/hoa.webp",
        "format": "WEBP",
        "width": 642,
        "height": 809,
        "aspectRatio": 0.794,
        "size": 145704,
        "md5": "b6c232b909eb82d61b22d4be9bf48c7c",
        "type": "decoration",
        "usage": "Decorative element (hoa) for chateau-blue"
      },
      {
        "id": "home",
        "file": "home.webp",
        "path": "/images/themes/chateau-blue/home.webp",
        "format": "WEBP",
        "width": 1536,
        "height": 1024,
        "aspectRatio": 1.5,
        "size": 636634,
        "md5": "128e4fc5a016a2b9e5077df6f8c98a91",
        "type": "decoration",
        "usage": "Ornamental artwork for chateau-blue"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 7,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "porcelain_v2_green": {
    "templateId": "porcelain_v2_green",
    "slug": "bach-su-v2-xanh",
    "name": "Bạch Sứ V2 - Xanh",
    "themeFolders": [
      "porcelain-v2-green"
    ],
    "assetCount": 1,
    "totalBytes": 186322,
    "assets": [
      {
        "id": "hero-frame",
        "file": "hero-frame.webp",
        "path": "/images/themes/porcelain-v2-green/hero-frame.webp",
        "format": "WEBP",
        "width": 880,
        "height": 1320,
        "aspectRatio": 0.667,
        "size": 186322,
        "md5": "29a66362a71604094974fb9a3858fb89",
        "type": "frame",
        "usage": "Framing border or arch for porcelain-v2-green"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "florence_brown": {
    "templateId": "florence_brown",
    "slug": "florence-nau",
    "name": "Florence - Nâu",
    "themeFolders": [
      "florence-brown"
    ],
    "assetCount": 3,
    "totalBytes": 277330,
    "assets": [
      {
        "id": "cloud1-background",
        "file": "cloud1-background.webp",
        "path": "/images/themes/florence-brown/cloud1-background.webp",
        "format": "WEBP",
        "width": 1350,
        "height": 675,
        "aspectRatio": 2.0,
        "size": 105568,
        "md5": "4d894589f50cbf87392d4d1c5245a70a",
        "type": "background",
        "usage": "Background paper or ambient texture for florence-brown"
      },
      {
        "id": "cloud2-background",
        "file": "cloud2-background.webp",
        "path": "/images/themes/florence-brown/cloud2-background.webp",
        "format": "WEBP",
        "width": 920,
        "height": 922,
        "aspectRatio": 0.998,
        "size": 93604,
        "md5": "85da9c62e4c9539ac27a9d2949687ff4",
        "type": "background",
        "usage": "Background paper or ambient texture for florence-brown"
      },
      {
        "id": "cloud3-background",
        "file": "cloud3-background.webp",
        "path": "/images/themes/florence-brown/cloud3-background.webp",
        "format": "WEBP",
        "width": 920,
        "height": 612,
        "aspectRatio": 1.503,
        "size": 78158,
        "md5": "bd2024bab48ed5c0063094802ddbd0bc",
        "type": "background",
        "usage": "Background paper or ambient texture for florence-brown"
      }
    ],
    "backgroundPath": "/images/themes/florence-brown/cloud1-background.webp",
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "hoa_kho_v2_blue": {
    "templateId": "hoa_kho_v2_blue",
    "slug": "hoa-kho-v2-lam",
    "name": "Hoa Khô V2 - Lam",
    "themeFolders": [
      "hoa-kho-v2-blue"
    ],
    "assetCount": 2,
    "totalBytes": 616192,
    "assets": [
      {
        "id": "butterfly",
        "file": "butterfly.webp",
        "path": "/images/themes/hoa-kho-v2-blue/butterfly.webp",
        "format": "WEBP",
        "width": 760,
        "height": 619,
        "aspectRatio": 1.228,
        "size": 122854,
        "md5": "90a1681694b82711135cf5ee49b16bdc",
        "type": "decoration",
        "usage": "Decorative element (butterfly) for hoa-kho-v2-blue"
      },
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/hoa-kho-v2-blue/flower.webp",
        "format": "WEBP",
        "width": 1122,
        "height": 1402,
        "aspectRatio": 0.8,
        "size": 493338,
        "md5": "348d5fce80e8ecef835ab1d03da03935",
        "type": "decoration",
        "usage": "Decorative element (flower) for hoa-kho-v2-blue"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "co_ba_red": {
    "templateId": "co_ba_red",
    "slug": "co-ba-do",
    "name": "Cô Ba - Đỏ",
    "themeFolders": [
      "coba-red",
      "nhat-binh-red"
    ],
    "assetCount": 9,
    "totalBytes": 2780900,
    "assets": [
      {
        "id": "cho-ben-thanh",
        "file": "cho-ben-thanh.webp",
        "path": "/images/themes/coba-red/cho-ben-thanh.webp",
        "format": "WEBP",
        "width": 1200,
        "height": 937,
        "aspectRatio": 1.281,
        "size": 276260,
        "md5": "64897c7c087cce8f560e1ca964992717",
        "type": "decoration",
        "usage": "Ornamental artwork for coba-red"
      },
      {
        "id": "dau-re",
        "file": "dau-re.webp",
        "path": "/images/themes/coba-red/dau-re.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 1536,
        "aspectRatio": 0.667,
        "size": 278086,
        "md5": "d466c837323ec8363769722e382ddf79",
        "type": "decoration",
        "usage": "Ornamental artwork for coba-red"
      },
      {
        "id": "chu-hy",
        "file": "chu-hy.webp",
        "path": "/images/themes/nhat-binh-red/chu-hy.webp",
        "format": "WEBP",
        "width": 900,
        "height": 623,
        "aspectRatio": 1.445,
        "size": 68546,
        "md5": "4e7d029636ed094d9aa686b2ef2da2d8",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for nhat-binh-red"
      },
      {
        "id": "dau-re",
        "file": "dau-re.webp",
        "path": "/images/themes/nhat-binh-red/dau-re.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1289,
        "aspectRatio": 0.698,
        "size": 171492,
        "md5": "3aa1e1c3e75629cdbc5a4e288463ac56",
        "type": "decoration",
        "usage": "Ornamental artwork for nhat-binh-red"
      },
      {
        "id": "hoa",
        "file": "hoa.webp",
        "path": "/images/themes/nhat-binh-red/hoa.webp",
        "format": "WEBP",
        "width": 960,
        "height": 788,
        "aspectRatio": 1.218,
        "size": 155514,
        "md5": "dac972ddcd9fa94001a2bf06ddc6e85b",
        "type": "decoration",
        "usage": "Decorative element (hoa) for nhat-binh-red"
      },
      {
        "id": "long-den",
        "file": "long-den.webp",
        "path": "/images/themes/nhat-binh-red/long-den.webp",
        "format": "WEBP",
        "width": 320,
        "height": 902,
        "aspectRatio": 0.355,
        "size": 34616,
        "md5": "5495816d6a28e6ce606215b055f5008b",
        "type": "decoration",
        "usage": "Ornamental artwork for nhat-binh-red"
      },
      {
        "id": "may-to",
        "file": "may-to.webp",
        "path": "/images/themes/nhat-binh-red/may-to.webp",
        "format": "WEBP",
        "width": 1100,
        "height": 642,
        "aspectRatio": 1.713,
        "size": 155468,
        "md5": "195708636fe3542800404a94aaff2dc8",
        "type": "decoration",
        "usage": "Ornamental artwork for nhat-binh-red"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/nhat-binh-red/paper.webp",
        "format": "WEBP",
        "width": 1656,
        "height": 4000,
        "aspectRatio": 0.414,
        "size": 1545250,
        "md5": "233d52ca6ff956ac6d48dd1ecca37a17",
        "type": "background",
        "usage": "Background paper or ambient texture for nhat-binh-red"
      },
      {
        "id": "quat",
        "file": "quat.webp",
        "path": "/images/themes/nhat-binh-red/quat.webp",
        "format": "WEBP",
        "width": 750,
        "height": 551,
        "aspectRatio": 1.361,
        "size": 95668,
        "md5": "6eedd65b313a13eb99a04b70563329ac",
        "type": "decoration",
        "usage": "Ornamental artwork for nhat-binh-red"
      }
    ],
    "backgroundPath": "/images/themes/nhat-binh-red/paper.webp",
    "coverPath": null,
    "decorationsCount": 7,
    "framesCount": 0,
    "isSharedTheme": true,
    "sharedWith": [
      "co_ba_red",
      "nhat_binh_red"
    ],
    "status": "active"
  },
  "double_dragon_blue": {
    "templateId": "double_dragon_blue",
    "slug": "song-long-lam",
    "name": "Song Long - Lam",
    "themeFolders": [
      "songlong-red"
    ],
    "assetCount": 8,
    "totalBytes": 438646,
    "assets": [
      {
        "id": "chinese_happiness",
        "file": "chinese_happiness.webp",
        "path": "/images/themes/songlong-red/chinese_happiness.webp",
        "format": "WEBP",
        "width": 177,
        "height": 176,
        "aspectRatio": 1.006,
        "size": 6236,
        "md5": "5a71f152116e20ed0e1895452d95cc34",
        "type": "icon",
        "usage": "Icon or cultural symbol (囍) for songlong-red"
      },
      {
        "id": "cloud_big",
        "file": "cloud_big.webp",
        "path": "/images/themes/songlong-red/cloud_big.webp",
        "format": "WEBP",
        "width": 308,
        "height": 134,
        "aspectRatio": 2.299,
        "size": 8924,
        "md5": "2a8491fa065fb885719766d997d08cd0",
        "type": "decoration",
        "usage": "Decorative element (cloud_big) for songlong-red"
      },
      {
        "id": "cloud_small",
        "file": "cloud_small.webp",
        "path": "/images/themes/songlong-red/cloud_small.webp",
        "format": "WEBP",
        "width": 191,
        "height": 123,
        "aspectRatio": 1.553,
        "size": 5850,
        "md5": "c90661183b9a8b454a5b27739b06cf7b",
        "type": "decoration",
        "usage": "Decorative element (cloud_small) for songlong-red"
      },
      {
        "id": "dragon_left",
        "file": "dragon_left.webp",
        "path": "/images/themes/songlong-red/dragon_left.webp",
        "format": "WEBP",
        "width": 622,
        "height": 837,
        "aspectRatio": 0.743,
        "size": 110198,
        "md5": "62e3dc7d145a8e81a7affc744a2ba214",
        "type": "decoration",
        "usage": "Decorative element (dragon_left) for songlong-red"
      },
      {
        "id": "dragon_right",
        "file": "dragon_right.webp",
        "path": "/images/themes/songlong-red/dragon_right.webp",
        "format": "WEBP",
        "width": 621,
        "height": 837,
        "aspectRatio": 0.742,
        "size": 110304,
        "md5": "0e859bab5a93e4fad4b81a26dfc5db19",
        "type": "decoration",
        "usage": "Decorative element (dragon_right) for songlong-red"
      },
      {
        "id": "wave",
        "file": "wave.webp",
        "path": "/images/themes/songlong-red/wave.webp",
        "format": "WEBP",
        "width": 136,
        "height": 54,
        "aspectRatio": 2.519,
        "size": 3286,
        "md5": "bd57391ca621b220aa46ff709b4e0668",
        "type": "decoration",
        "usage": "Decorative element (wave) for songlong-red"
      },
      {
        "id": "double_dragon_artwork",
        "file": "double-dragon.webp",
        "path": "/images/double-dragon.webp",
        "format": "WEBP",
        "width": 665,
        "height": 863,
        "aspectRatio": 0.771,
        "size": 178384,
        "md5": "8d16e4968a64d4068d86b831cb5f6f27",
        "type": "decoration",
        "usage": "Hero double dragon decorative banner"
      },
      {
        "id": "chu_hy_symbol",
        "file": "chu-hy.webp",
        "path": "/images/chu-hy.webp",
        "format": "WEBP",
        "width": 1272,
        "height": 1271,
        "aspectRatio": 1.001,
        "size": 15464,
        "md5": "3254ede7020f42bc42a1502884e6ffa5",
        "type": "icon",
        "usage": "Chinese happiness symbol (囍)"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 6,
    "framesCount": 0,
    "isSharedTheme": true,
    "sharedWith": [
      "double_dragon_red",
      "double_dragon_green",
      "double_dragon_blue"
    ],
    "status": "active"
  },
  "royal_green": {
    "templateId": "royal_green",
    "slug": "hoang-kim-xanh",
    "name": "Hoàng Kim - Xanh",
    "themeFolders": [
      "royal-green"
    ],
    "assetCount": 2,
    "totalBytes": 402886,
    "assets": [
      {
        "id": "background",
        "file": "background.webp",
        "path": "/images/themes/royal-green/background.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 8892,
        "aspectRatio": 0.115,
        "size": 235182,
        "md5": "8a820cead193221ec66f33aeeccf434c",
        "type": "background",
        "usage": "Background paper or ambient texture for royal-green"
      },
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/royal-green/flower.webp",
        "format": "WEBP",
        "width": 900,
        "height": 544,
        "aspectRatio": 1.654,
        "size": 167704,
        "md5": "94a3e6b1b91a47f929f760df78310d35",
        "type": "decoration",
        "usage": "Decorative element (flower) for royal-green"
      }
    ],
    "backgroundPath": "/images/themes/royal-green/background.webp",
    "coverPath": null,
    "decorationsCount": 1,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "minimalism_purple": {
    "templateId": "minimalism_purple",
    "slug": "minimalism-tim",
    "name": "Minimalism - Tím",
    "themeFolders": [
      "minimalism-purple"
    ],
    "assetCount": 13,
    "totalBytes": 2743836,
    "assets": [
      {
        "id": "cake",
        "file": "cake.webp",
        "path": "/images/themes/minimalism-purple/cake.webp",
        "format": "WEBP",
        "width": 1536,
        "height": 1024,
        "aspectRatio": 1.5,
        "size": 138360,
        "md5": "856abbc617da3017a96d950c49430cf0",
        "type": "divider",
        "usage": "Decorative divider line for minimalism-purple"
      },
      {
        "id": "church",
        "file": "church.webp",
        "path": "/images/themes/minimalism-purple/church.webp",
        "format": "WEBP",
        "width": 1536,
        "height": 1024,
        "aspectRatio": 1.5,
        "size": 155490,
        "md5": "c64e4a32ddd8c96c1f59362591ac0d2d",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-purple"
      },
      {
        "id": "envelope-background",
        "file": "envelope-background.webp",
        "path": "/images/themes/minimalism-purple/envelope-background.webp",
        "format": "WEBP",
        "width": 1041,
        "height": 1203,
        "aspectRatio": 0.865,
        "size": 188834,
        "md5": "69de11d517c6b5a576201a667ba0bff7",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-purple"
      },
      {
        "id": "envelope-cover",
        "file": "envelope-cover.webp",
        "path": "/images/themes/minimalism-purple/envelope-cover.webp",
        "format": "WEBP",
        "width": 1041,
        "height": 689,
        "aspectRatio": 1.511,
        "size": 75498,
        "md5": "d1f41907d5152a5fd79ead00d2a49d4a",
        "type": "cover",
        "usage": "Envelope or cover illustration for minimalism-purple"
      },
      {
        "id": "flower-decoration",
        "file": "flower-decoration.webp",
        "path": "/images/themes/minimalism-purple/flower-decoration.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 1536,
        "aspectRatio": 0.667,
        "size": 336056,
        "md5": "1d3a1b922fe44338c65234f4363f4a44",
        "type": "decoration",
        "usage": "Decorative element (flower-decoration) for minimalism-purple"
      },
      {
        "id": "flower1-decoration",
        "file": "flower1-decoration.webp",
        "path": "/images/themes/minimalism-purple/flower1-decoration.webp",
        "format": "WEBP",
        "width": 683,
        "height": 1024,
        "aspectRatio": 0.667,
        "size": 171360,
        "md5": "eeabbe835a74702334c6251ee3ca2ca9",
        "type": "decoration",
        "usage": "Decorative element (flower1-decoration) for minimalism-purple"
      },
      {
        "id": "flower3-decoration",
        "file": "flower3-decoration.webp",
        "path": "/images/themes/minimalism-purple/flower3-decoration.webp",
        "format": "WEBP",
        "width": 1373,
        "height": 1055,
        "aspectRatio": 1.301,
        "size": 268256,
        "md5": "dcb027cb80517ba9e793d48cfe4eaae9",
        "type": "decoration",
        "usage": "Decorative element (flower3-decoration) for minimalism-purple"
      },
      {
        "id": "flower4-decoration",
        "file": "flower4-decoration.webp",
        "path": "/images/themes/minimalism-purple/flower4-decoration.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 684,
        "aspectRatio": 1.497,
        "size": 216190,
        "md5": "2c00b2969df61c420219a7fca034b567",
        "type": "decoration",
        "usage": "Decorative element (flower4-decoration) for minimalism-purple"
      },
      {
        "id": "flower4b-decoration",
        "file": "flower4b-decoration.webp",
        "path": "/images/themes/minimalism-purple/flower4b-decoration.webp",
        "format": "WEBP",
        "width": 1226,
        "height": 553,
        "aspectRatio": 2.217,
        "size": 157618,
        "md5": "c2a2d8438a9a802d7631afccd6dc8351",
        "type": "decoration",
        "usage": "Decorative element (flower4b-decoration) for minimalism-purple"
      },
      {
        "id": "flowerbottom-decoration",
        "file": "flowerbottom-decoration.webp",
        "path": "/images/themes/minimalism-purple/flowerbottom-decoration.webp",
        "format": "WEBP",
        "width": 1896,
        "height": 1170,
        "aspectRatio": 1.621,
        "size": 358658,
        "md5": "f89defc2691e9ba4a1f0f102695a36bd",
        "type": "decoration",
        "usage": "Decorative element (flowerbottom-decoration) for minimalism-purple"
      },
      {
        "id": "house-background",
        "file": "house-background.webp",
        "path": "/images/themes/minimalism-purple/house-background.webp",
        "format": "WEBP",
        "width": 1536,
        "height": 1024,
        "aspectRatio": 1.5,
        "size": 398782,
        "md5": "3c718c095349e7f35416b04a1a7bbb64",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-purple"
      },
      {
        "id": "music",
        "file": "music.webp",
        "path": "/images/themes/minimalism-purple/music.webp",
        "format": "WEBP",
        "width": 1536,
        "height": 1024,
        "aspectRatio": 1.5,
        "size": 105776,
        "md5": "8288b0ca889b1c52f288b7a994d80a4a",
        "type": "decoration",
        "usage": "Ornamental artwork for minimalism-purple"
      },
      {
        "id": "paper",
        "file": "paper.webp",
        "path": "/images/themes/minimalism-purple/paper.webp",
        "format": "WEBP",
        "width": 1333,
        "height": 2000,
        "aspectRatio": 0.666,
        "size": 172958,
        "md5": "3b09633b1cd9a11d9d6ceacb6d83c9eb",
        "type": "background",
        "usage": "Background paper or ambient texture for minimalism-purple"
      }
    ],
    "backgroundPath": "/images/themes/minimalism-purple/envelope-background.webp",
    "coverPath": "/images/themes/minimalism-purple/envelope-cover.webp",
    "decorationsCount": 8,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "dried_flower_v2_green": {
    "templateId": "dried_flower_v2_green",
    "slug": "hoa-kho-v2-xanh",
    "name": "Hoa Khô V2 - Xanh",
    "themeFolders": [
      "dried-flower-v2-green"
    ],
    "assetCount": 1,
    "totalBytes": 386470,
    "assets": [
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/dried-flower-v2-green/flower.webp",
        "format": "WEBP",
        "width": 1086,
        "height": 1448,
        "aspectRatio": 0.75,
        "size": 386470,
        "md5": "a2e290b48e791f61ce8df0c2673105be",
        "type": "decoration",
        "usage": "Decorative element (flower) for dried-flower-v2-green"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 1,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "hoa_dai_pink": {
    "templateId": "hoa_dai_pink",
    "slug": "hoa-dai-hong",
    "name": "Hoa Dại - Hồng",
    "themeFolders": [
      "hoa-dai-pink"
    ],
    "assetCount": 1,
    "totalBytes": 250950,
    "assets": [
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/hoa-dai-pink/flower2-decoration.webp",
        "format": "WEBP",
        "width": 1213,
        "height": 1296,
        "aspectRatio": 0.936,
        "size": 250950,
        "md5": "eb0ea8d74181a3eb644fc3ab5b82c5f3",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for hoa-dai-pink"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 1,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "baroque_blue": {
    "templateId": "baroque_blue",
    "slug": "baroque-lam",
    "name": "Baroque - Lam",
    "themeFolders": [
      "baroque-blue"
    ],
    "assetCount": 3,
    "totalBytes": 429006,
    "assets": [
      {
        "id": "bg-pattern",
        "file": "bg-pattern.webp",
        "path": "/images/themes/baroque-blue/bg-pattern.webp",
        "format": "WEBP",
        "width": 882,
        "height": 882,
        "aspectRatio": 1.0,
        "size": 90806,
        "md5": "885dcdca373b383b107a3c2addd53c7e",
        "type": "background",
        "usage": "Background paper or ambient texture for baroque-blue"
      },
      {
        "id": "frame-decoration",
        "file": "frame-decoration.webp",
        "path": "/images/themes/baroque-blue/frame-decoration.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1125,
        "aspectRatio": 0.8,
        "size": 322230,
        "md5": "fa9ecc717d311a7644225ee29eb4ac9c",
        "type": "frame",
        "usage": "Framing border or arch for baroque-blue"
      },
      {
        "id": "goldline-decoration",
        "file": "goldline-decoration.webp",
        "path": "/images/themes/baroque-blue/goldline-decoration.webp",
        "format": "WEBP",
        "width": 560,
        "height": 86,
        "aspectRatio": 6.512,
        "size": 15970,
        "md5": "3f20e212286f2db1c7acba6011b6f327",
        "type": "divider",
        "usage": "Decorative divider line for baroque-blue"
      }
    ],
    "backgroundPath": "/images/themes/baroque-blue/bg-pattern.webp",
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "royal_v2_green": {
    "templateId": "royal_v2_green",
    "slug": "hoang-kim-ii-xanh",
    "name": "Hoàng Kim II - Xanh",
    "themeFolders": [
      "royal-v2-green"
    ],
    "assetCount": 4,
    "totalBytes": 433220,
    "assets": [
      {
        "id": "background",
        "file": "background.webp",
        "path": "/images/themes/royal-v2-green/background.webp",
        "format": "WEBP",
        "width": 512,
        "height": 4096,
        "aspectRatio": 0.125,
        "size": 58650,
        "md5": "45fac3c91d2c40e778e6717ba3f2ded1",
        "type": "background",
        "usage": "Background paper or ambient texture for royal-v2-green"
      },
      {
        "id": "flower1-decoration",
        "file": "flower1-decoration.webp",
        "path": "/images/themes/royal-v2-green/flower1-decoration.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 177992,
        "md5": "aca26d98a0bdf6cf86f5855e5544570d",
        "type": "decoration",
        "usage": "Decorative element (flower1-decoration) for royal-v2-green"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/royal-v2-green/flower2-decoration.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 174156,
        "md5": "cbec5aa27856b375fe7bce309fd2c2e7",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for royal-v2-green"
      },
      {
        "id": "golden-line",
        "file": "golden-line.webp",
        "path": "/images/themes/royal-v2-green/golden-line.webp",
        "format": "WEBP",
        "width": 986,
        "height": 269,
        "aspectRatio": 3.665,
        "size": 22422,
        "md5": "e35b6f125de0ffaa2a83fd8c13927189",
        "type": "divider",
        "usage": "Decorative divider line for royal-v2-green"
      }
    ],
    "backgroundPath": "/images/themes/royal-v2-green/background.webp",
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "dragon_phoenix_black": {
    "templateId": "dragon_phoenix_black",
    "slug": "long-phung-huyen",
    "name": "Long Phụng - Huyền",
    "themeFolders": [
      "red-v1",
      "black-v1"
    ],
    "assetCount": 5,
    "totalBytes": 579865,
    "assets": [
      {
        "id": "bg-main",
        "file": "bg-main.webp",
        "path": "/images/themes/red-v1/bg-main.webp",
        "format": "WEBP",
        "width": 1171,
        "height": 1444,
        "aspectRatio": 0.811,
        "size": 201876,
        "md5": "f51ff94e3f87422924e1f998ab99e58a",
        "type": "background",
        "usage": "Background paper or ambient texture for red-v1"
      },
      {
        "id": "line6",
        "file": "line6.svg",
        "path": "/images/themes/red-v1/line6.svg",
        "format": "SVG",
        "width": 25,
        "height": 1,
        "aspectRatio": 25.0,
        "size": 256,
        "md5": "425620abf8ed8f88d4adb4a2eb9fe6c2",
        "type": "divider",
        "usage": "Decorative divider line for red-v1"
      },
      {
        "id": "phuong",
        "file": "phuong.webp",
        "path": "/images/themes/red-v1/phuong.webp",
        "format": "WEBP",
        "width": 610,
        "height": 1302,
        "aspectRatio": 0.469,
        "size": 97582,
        "md5": "eeaa8b1029518f3d615f327471ab227a",
        "type": "decoration",
        "usage": "Decorative element (phuong) for red-v1"
      },
      {
        "id": "rong",
        "file": "rong.webp",
        "path": "/images/themes/red-v1/rong.webp",
        "format": "WEBP",
        "width": 1000,
        "height": 2000,
        "aspectRatio": 0.5,
        "size": 279912,
        "md5": "d813a65ed9bb2c953ede68b495ab265b",
        "type": "decoration",
        "usage": "Ornamental artwork for red-v1"
      },
      {
        "id": "line6",
        "file": "line6.svg",
        "path": "/images/themes/black-v1/line6.svg",
        "format": "SVG",
        "width": 25,
        "height": 1,
        "aspectRatio": 25.0,
        "size": 239,
        "md5": "bf280ffbfa5ff0fa8d496b024b1a6fda",
        "type": "divider",
        "usage": "Decorative divider line for black-v1"
      }
    ],
    "backgroundPath": "/images/themes/red-v1/bg-main.webp",
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": true,
    "sharedWith": [
      "dragon_phoenix_red",
      "dragon_phoenix_green",
      "dragon_phoenix_blue",
      "dragon_phoenix_black"
    ],
    "status": "active"
  },
  "royal_blue": {
    "templateId": "royal_blue",
    "slug": "hoang-kim-lam",
    "name": "Hoàng Kim - Lam",
    "themeFolders": [
      "royal-blue"
    ],
    "assetCount": 2,
    "totalBytes": 611450,
    "assets": [
      {
        "id": "background",
        "file": "background.webp",
        "path": "/images/themes/royal-blue/background.webp",
        "format": "WEBP",
        "width": 1024,
        "height": 8892,
        "aspectRatio": 0.115,
        "size": 443746,
        "md5": "24808ecb9a766caca8b034f269c6819d",
        "type": "background",
        "usage": "Background paper or ambient texture for royal-blue"
      },
      {
        "id": "flower",
        "file": "flower.webp",
        "path": "/images/themes/royal-blue/flower.webp",
        "format": "WEBP",
        "width": 900,
        "height": 544,
        "aspectRatio": 1.654,
        "size": 167704,
        "md5": "94a3e6b1b91a47f929f760df78310d35",
        "type": "decoration",
        "usage": "Decorative element (flower) for royal-blue"
      }
    ],
    "backgroundPath": "/images/themes/royal-blue/background.webp",
    "coverPath": null,
    "decorationsCount": 1,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "riviera_blue": {
    "templateId": "riviera_blue",
    "slug": "riviera-lam",
    "name": "Riviera - Lam",
    "themeFolders": [
      "riviera-blue"
    ],
    "assetCount": 3,
    "totalBytes": 31806,
    "assets": [
      {
        "id": "line-decoration-2",
        "file": "line-decoration-2.webp",
        "path": "/images/themes/riviera-blue/line-decoration-2.webp",
        "format": "WEBP",
        "width": 400,
        "height": 133,
        "aspectRatio": 3.008,
        "size": 2894,
        "md5": "aaed5c6b1a6c530c1de48bd5ac28252d",
        "type": "divider",
        "usage": "Decorative divider line for riviera-blue"
      },
      {
        "id": "line-decoration-3",
        "file": "line-decoration-3.webp",
        "path": "/images/themes/riviera-blue/line-decoration-3.webp",
        "format": "WEBP",
        "width": 520,
        "height": 173,
        "aspectRatio": 3.006,
        "size": 19604,
        "md5": "fcf08252da02c0701508915b443a412d",
        "type": "divider",
        "usage": "Decorative divider line for riviera-blue"
      },
      {
        "id": "paper-background",
        "file": "paper-background.webp",
        "path": "/images/themes/riviera-blue/paper-background.webp",
        "format": "WEBP",
        "width": 724,
        "height": 2172,
        "aspectRatio": 0.333,
        "size": 9308,
        "md5": "01e036bf84adf20ad10997cc9417306e",
        "type": "background",
        "usage": "Background paper or ambient texture for riviera-blue"
      }
    ],
    "backgroundPath": "/images/themes/riviera-blue/paper-background.webp",
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "baroque_v2_darkblue": {
    "templateId": "baroque_v2_darkblue",
    "slug": "baroque-v2-lam-dam",
    "name": "Baroque V2 - Lam Đậm",
    "themeFolders": [
      "baroque-v2-dark-blue"
    ],
    "assetCount": 1,
    "totalBytes": 335896,
    "assets": [
      {
        "id": "frame",
        "file": "frame.webp",
        "path": "/images/themes/baroque-v2-dark-blue/frame.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 335896,
        "md5": "cf9b36a00cdcc69dd480da11ae534791",
        "type": "frame",
        "usage": "Framing border or arch for baroque-v2-dark-blue"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "porcelain_brown": {
    "templateId": "porcelain_brown",
    "slug": "bach-su-nau",
    "name": "Bạch Sứ - Nâu",
    "themeFolders": [
      "porcelain-brown"
    ],
    "assetCount": 1,
    "totalBytes": 21220,
    "assets": [
      {
        "id": "frame-background",
        "file": "frame-background.webp",
        "path": "/images/themes/porcelain-brown/frame-background.webp",
        "format": "WEBP",
        "width": 1122,
        "height": 1549,
        "aspectRatio": 0.724,
        "size": 21220,
        "md5": "049de32a197e56f80be50643a5b9d9ff",
        "type": "background",
        "usage": "Background paper or ambient texture for porcelain-brown"
      }
    ],
    "backgroundPath": "/images/themes/porcelain-brown/frame-background.webp",
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "crystal_floral_green": {
    "templateId": "crystal_floral_green",
    "slug": "hoa-thuy-tinh-xanh",
    "name": "Hoa Thuỷ Tinh - Xanh",
    "themeFolders": [
      "crystal-floral-green"
    ],
    "assetCount": 4,
    "totalBytes": 1315208,
    "assets": [
      {
        "id": "flower-frame",
        "file": "flower-frame.webp",
        "path": "/images/themes/crystal-floral-green/flower-frame.webp",
        "format": "WEBP",
        "width": 1125,
        "height": 1537,
        "aspectRatio": 0.732,
        "size": 307558,
        "md5": "a396fe3c785413cdee57b41b62dd72eb",
        "type": "frame",
        "usage": "Framing border or arch for crystal-floral-green"
      },
      {
        "id": "flower1",
        "file": "flower1.webp",
        "path": "/images/themes/crystal-floral-green/flower1.webp",
        "format": "WEBP",
        "width": 2130,
        "height": 732,
        "aspectRatio": 2.91,
        "size": 327750,
        "md5": "706bd2c144d4e8b76f61d75b1d26aa4c",
        "type": "decoration",
        "usage": "Decorative element (flower1) for crystal-floral-green"
      },
      {
        "id": "flower2",
        "file": "flower2.webp",
        "path": "/images/themes/crystal-floral-green/flower2.webp",
        "format": "WEBP",
        "width": 909,
        "height": 1730,
        "aspectRatio": 0.525,
        "size": 331856,
        "md5": "8f7fd2dd18394d486273f9e1ffbc074c",
        "type": "decoration",
        "usage": "Decorative element (flower2) for crystal-floral-green"
      },
      {
        "id": "flower3",
        "file": "flower3.webp",
        "path": "/images/themes/crystal-floral-green/flower3.webp",
        "format": "WEBP",
        "width": 918,
        "height": 1714,
        "aspectRatio": 0.536,
        "size": 348044,
        "md5": "9aa21b8daf91eea239edb78b0c893b48",
        "type": "decoration",
        "usage": "Decorative element (flower3) for crystal-floral-green"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 3,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "sunflower_yellow": {
    "templateId": "sunflower_yellow",
    "slug": "hoa-huong-duong",
    "name": "Hoa Hướng Dương",
    "themeFolders": [
      "sunflower"
    ],
    "assetCount": 2,
    "totalBytes": 321062,
    "assets": [
      {
        "id": "flower2",
        "file": "flower2.webp",
        "path": "/images/themes/sunflower/flower2.webp",
        "format": "WEBP",
        "width": 626,
        "height": 1191,
        "aspectRatio": 0.526,
        "size": 148482,
        "md5": "e43d3c05209b3d5d842f974219bdb916",
        "type": "decoration",
        "usage": "Decorative element (flower2) for sunflower"
      },
      {
        "id": "flower4",
        "file": "flower4.webp",
        "path": "/images/themes/sunflower/flower4.webp",
        "format": "WEBP",
        "width": 693,
        "height": 1163,
        "aspectRatio": 0.596,
        "size": 172580,
        "md5": "215f316e57987ea52a34dce62cba53b5",
        "type": "decoration",
        "usage": "Decorative element (flower4) for sunflower"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "porcelain_v2_red": {
    "templateId": "porcelain_v2_red",
    "slug": "bach-su-v2-do",
    "name": "Bạch Sứ II - Đỏ",
    "themeFolders": [
      "porcelain-v2-red"
    ],
    "assetCount": 1,
    "totalBytes": 107836,
    "assets": [
      {
        "id": "hero-frame",
        "file": "hero-frame.webp",
        "path": "/images/themes/porcelain-v2-red/hero-frame.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1530,
        "aspectRatio": 0.588,
        "size": 107836,
        "md5": "5051c8f6bac23da5e113d137680e7bad",
        "type": "frame",
        "usage": "Framing border or arch for porcelain-v2-red"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "crystal_floral_red": {
    "templateId": "crystal_floral_red",
    "slug": "hoa-thuy-tinh-do",
    "name": "Hoa Thuỷ Tinh - Đỏ",
    "themeFolders": [
      "crystal-floral-red"
    ],
    "assetCount": 4,
    "totalBytes": 1239714,
    "assets": [
      {
        "id": "flower-frame",
        "file": "flower-frame.webp",
        "path": "/images/themes/crystal-floral-red/flower-frame.webp",
        "format": "WEBP",
        "width": 927,
        "height": 1311,
        "aspectRatio": 0.707,
        "size": 273710,
        "md5": "d44d21afa03381739e5ff35d29c91851",
        "type": "frame",
        "usage": "Framing border or arch for crystal-floral-red"
      },
      {
        "id": "flower1",
        "file": "flower1.webp",
        "path": "/images/themes/crystal-floral-red/flower1.webp",
        "format": "WEBP",
        "width": 2171,
        "height": 724,
        "aspectRatio": 2.999,
        "size": 370330,
        "md5": "2d4b1305afdf65ee88042a5e67067958",
        "type": "decoration",
        "usage": "Decorative element (flower1) for crystal-floral-red"
      },
      {
        "id": "flower2",
        "file": "flower2.webp",
        "path": "/images/themes/crystal-floral-red/flower2.webp",
        "format": "WEBP",
        "width": 910,
        "height": 1728,
        "aspectRatio": 0.527,
        "size": 322230,
        "md5": "909d74fb2975ce2296bde451a309b20f",
        "type": "decoration",
        "usage": "Decorative element (flower2) for crystal-floral-red"
      },
      {
        "id": "flower3",
        "file": "flower3.webp",
        "path": "/images/themes/crystal-floral-red/flower3.webp",
        "format": "WEBP",
        "width": 806,
        "height": 1536,
        "aspectRatio": 0.525,
        "size": 273444,
        "md5": "eece385b005c914575a4925e10adbeea",
        "type": "decoration",
        "usage": "Decorative element (flower3) for crystal-floral-red"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 3,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "porcelain_blue": {
    "templateId": "porcelain_blue",
    "slug": "bach-su-lam",
    "name": "Bạch Sứ - Lam",
    "themeFolders": [
      "porcelain-blue"
    ],
    "assetCount": 1,
    "totalBytes": 65948,
    "assets": [
      {
        "id": "frame-decoration",
        "file": "frame-decoration.webp",
        "path": "/images/themes/porcelain-blue/frame-decoration.webp",
        "format": "WEBP",
        "width": 1122,
        "height": 1402,
        "aspectRatio": 0.8,
        "size": 65948,
        "md5": "049f27a42141976ea5e0ef198c67b181",
        "type": "frame",
        "usage": "Framing border or arch for porcelain-blue"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "porcelain_red": {
    "templateId": "porcelain_red",
    "slug": "bach-su-do",
    "name": "Bạch Sứ - Đỏ",
    "themeFolders": [
      "porcelain-red"
    ],
    "assetCount": 1,
    "totalBytes": 43422,
    "assets": [
      {
        "id": "frame-decoration",
        "file": "frame-decoration.webp",
        "path": "/images/themes/porcelain-red/frame-decoration.webp",
        "format": "WEBP",
        "width": 1266,
        "height": 1900,
        "aspectRatio": 0.666,
        "size": 43422,
        "md5": "8fe622bbfe216a8d409f4b4969ff1071",
        "type": "frame",
        "usage": "Framing border or arch for porcelain-red"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "san_miguel_yellow": {
    "templateId": "san_miguel_yellow",
    "slug": "san-miguel-vang",
    "name": "San Miguel - Vàng",
    "themeFolders": [
      "san-miguel-yellow"
    ],
    "assetCount": 2,
    "totalBytes": 130660,
    "assets": [
      {
        "id": "cloud-background",
        "file": "cloud-background.webp",
        "path": "/images/themes/san-miguel-yellow/cloud-background.webp",
        "format": "WEBP",
        "width": 1160,
        "height": 707,
        "aspectRatio": 1.641,
        "size": 71930,
        "md5": "07dbc55bc3cf55fddea3bc286f099644",
        "type": "background",
        "usage": "Background paper or ambient texture for san-miguel-yellow"
      },
      {
        "id": "cloud2-background",
        "file": "cloud2-background.webp",
        "path": "/images/themes/san-miguel-yellow/cloud2-background.webp",
        "format": "WEBP",
        "width": 980,
        "height": 597,
        "aspectRatio": 1.642,
        "size": 58730,
        "md5": "0f3663afe05987bfac4e21707fc80376",
        "type": "background",
        "usage": "Background paper or ambient texture for san-miguel-yellow"
      }
    ],
    "backgroundPath": "/images/themes/san-miguel-yellow/cloud-background.webp",
    "coverPath": null,
    "decorationsCount": 0,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "glass_garden_blue": {
    "templateId": "glass_garden_blue",
    "slug": "vuonkinh-lam",
    "name": "Vườn Kính - Lam",
    "themeFolders": [
      "glass-garden-blue"
    ],
    "assetCount": 2,
    "totalBytes": 639602,
    "assets": [
      {
        "id": "floral-background",
        "file": "floral-background.webp",
        "path": "/images/themes/glass-garden-blue/floral-background.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 379296,
        "md5": "99b187c77463752e6194001880e50794",
        "type": "background",
        "usage": "Background paper or ambient texture for glass-garden-blue"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/glass-garden-blue/flower2-decoration.webp",
        "format": "WEBP",
        "width": 1043,
        "height": 1163,
        "aspectRatio": 0.897,
        "size": 260306,
        "md5": "03ba9960b0e18f10eaca09307f9ff85a",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for glass-garden-blue"
      }
    ],
    "backgroundPath": "/images/themes/glass-garden-blue/floral-background.webp",
    "coverPath": null,
    "decorationsCount": 1,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "royal_v2_purple": {
    "templateId": "royal_v2_purple",
    "slug": "hoang-kim-ii-tim",
    "name": "Hoàng Kim II - Tím",
    "themeFolders": [
      "royal-v2-purple"
    ],
    "assetCount": 5,
    "totalBytes": 686540,
    "assets": [
      {
        "id": "background",
        "file": "background.webp",
        "path": "/images/themes/royal-v2-purple/background.webp",
        "format": "WEBP",
        "width": 1254,
        "height": 1254,
        "aspectRatio": 1.0,
        "size": 207280,
        "md5": "87ca4b5cf77bf45a1d14f21223ebc6c1",
        "type": "background",
        "usage": "Background paper or ambient texture for royal-v2-purple"
      },
      {
        "id": "flower-decoration",
        "file": "flower-decoration.webp",
        "path": "/images/themes/royal-v2-purple/flower-decoration.webp",
        "format": "WEBP",
        "width": 900,
        "height": 1254,
        "aspectRatio": 0.718,
        "size": 158774,
        "md5": "7002c6eeda3a9fbdc827b15dfd12475a",
        "type": "decoration",
        "usage": "Decorative element (flower-decoration) for royal-v2-purple"
      },
      {
        "id": "flower2-decoration",
        "file": "flower2-decoration.webp",
        "path": "/images/themes/royal-v2-purple/flower2-decoration.webp",
        "format": "WEBP",
        "width": 1136,
        "height": 1254,
        "aspectRatio": 0.906,
        "size": 183584,
        "md5": "11fb82607445ebd4dcb2779bd70dd32f",
        "type": "decoration",
        "usage": "Decorative element (flower2-decoration) for royal-v2-purple"
      },
      {
        "id": "frame",
        "file": "frame.webp",
        "path": "/images/themes/royal-v2-purple/frame.webp",
        "format": "WEBP",
        "width": 1624,
        "height": 2296,
        "aspectRatio": 0.707,
        "size": 75072,
        "md5": "f184d32b3ac1859dde140a110c41d709",
        "type": "frame",
        "usage": "Framing border or arch for royal-v2-purple"
      },
      {
        "id": "golden-line",
        "file": "golden-line.webp",
        "path": "/images/themes/royal-v2-purple/golden-line.webp",
        "format": "WEBP",
        "width": 1755,
        "height": 403,
        "aspectRatio": 4.355,
        "size": 61830,
        "md5": "c5e9be431cd953e42ed42c77527f7282",
        "type": "divider",
        "usage": "Decorative divider line for royal-v2-purple"
      }
    ],
    "backgroundPath": "/images/themes/royal-v2-purple/background.webp",
    "coverPath": null,
    "decorationsCount": 2,
    "framesCount": 1,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  },
  "hoa_kho_orange": {
    "templateId": "hoa_kho_orange",
    "slug": "hoa-kho-cam",
    "name": "Hoa Khô - Cam",
    "themeFolders": [
      "hoa-kho-orange"
    ],
    "assetCount": 3,
    "totalBytes": 849982,
    "assets": [
      {
        "id": "flower2",
        "file": "flower2.webp",
        "path": "/images/themes/hoa-kho-orange/flower2.webp",
        "format": "WEBP",
        "width": 1200,
        "height": 960,
        "aspectRatio": 1.25,
        "size": 341680,
        "md5": "74eda139f9bf8861e6c7d8b3506afad6",
        "type": "decoration",
        "usage": "Decorative element (flower2) for hoa-kho-orange"
      },
      {
        "id": "flower3",
        "file": "flower3.webp",
        "path": "/images/themes/hoa-kho-orange/flower3.webp",
        "format": "WEBP",
        "width": 960,
        "height": 1200,
        "aspectRatio": 0.8,
        "size": 239570,
        "md5": "b55e531ea8a1aaf6825280f089732507",
        "type": "decoration",
        "usage": "Decorative element (flower3) for hoa-kho-orange"
      },
      {
        "id": "flower4",
        "file": "flower4.webp",
        "path": "/images/themes/hoa-kho-orange/flower4.webp",
        "format": "WEBP",
        "width": 858,
        "height": 1200,
        "aspectRatio": 0.715,
        "size": 268732,
        "md5": "670b2f05fbfbc83ffb920ce5b47f2e27",
        "type": "decoration",
        "usage": "Decorative element (flower4) for hoa-kho-orange"
      }
    ],
    "backgroundPath": null,
    "coverPath": null,
    "decorationsCount": 3,
    "framesCount": 0,
    "isSharedTheme": false,
    "sharedWith": [],
    "status": "active"
  }
};

export const ALL_TEMPLATE_MANIFESTS: TemplateAssetManifest[] = Object.values(TEMPLATE_MANIFESTS);

/** Lấy manifest đầy đủ của một mẫu thiệp (theo templateId) */
export function getTemplateManifest(templateId: string): TemplateAssetManifest | undefined {
  return TEMPLATE_MANIFESTS[templateId];
}

/** Lấy manifest theo slug URL */
export function getTemplateManifestBySlug(slug: string): TemplateAssetManifest | undefined {
  return ALL_TEMPLATE_MANIFESTS.find((m) => m.slug === slug);
}

/** Lấy toàn bộ assets của một mẫu thiệp (theo templateId) */
export function getTemplateThemeAssets(templateId: string): ThemeAsset[] {
  const m = TEMPLATE_MANIFESTS[templateId];
  return m ? m.assets : [];
}

/** Lấy ảnh nền hoặc texture giấy đặc trưng của theme (nếu có) */
export function getThemeBackgroundUrl(templateId: string): string | undefined {
  const m = TEMPLATE_MANIFESTS[templateId];
  return m?.backgroundPath || undefined;
}

/** Lấy danh sách hoạ tiết trang trí của template */
export function getThemeDecorations(templateId: string): ThemeAsset[] {
  const assets = getTemplateThemeAssets(templateId);
  return assets.filter((a) => a.type === 'decoration' || a.type === 'frame');
}
