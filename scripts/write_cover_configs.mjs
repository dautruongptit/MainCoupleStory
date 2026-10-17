import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('scratch_raw_envelopes.json', 'utf8'));
const tplContent = fs.readFileSync('src/features/templates/data/templates.ts', 'utf8');
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];

const themesContent = fs.readFileSync('src/features/invitation/config/templateThemes.ts', 'utf8');
const themeMatches = [...themesContent.matchAll(/(\w+):\s*\{\s*bg:\s*"([^"]+)",\s*ink:\s*"([^"]+)",\s*rgb:\s*"([^"]+)",\s*cover:\s*"([^"]+)"/g)];
const themesMap = {};
for (const m of themeMatches) {
  themesMap[m[1]] = { bg: m[2], ink: m[3], rgb: m[4], cover: m[5] };
}

const rawBySlug = {};
for (const [k, v] of Object.entries(raw)) {
  rawBySlug[v.slug] = v;
}

// Templates that have dark card on real Chungdoi:
const darkCardSlugs = new Set([
  'song-hy-xanh', 'song-hy-do', 'song-long-do', 'song-long-xanh', 'song-long-lam',
  'song-hac-do', 'baroque-v2-do-dam', 'baroque-v2-xanh-dam', 'baroque-v2-lam-dam',
  'long-phung-v2-do', 'long-phung-v3-do', 'long-phung-v4-do', 'long-phung-do',
  'long-phung-huyen', 'long-phung-lam', 'long-phung-xanh', 'hoang-kim-do',
  'hoang-kim-lam', 'hoang-kim-xanh', 'hoang-kim-ii-xanh', 'hoang-kim-ii-tim',
  'song-hy-v2-do', 'applique-lace-white', 'vuonkinh-lam', 'co-ba-do',
  'hoa-tinh-do', 'hoa-moc-nau', 'hoa-kho-v2-lam'
]);

let code = `/**
 * Cấu hình chi tiết màn hình Mở thiệp (Cover Screen) cho toàn bộ 75 mẫu thiệp.
 * Được tinh chỉnh chuẩn xác về màu thẻ (sáng/tối), font chữ, màu chữ và nút bấm
 * tương ứng với từng phong cách thiệp trên chungdoi.com.
 */
import type { CoverConfig } from "./types";

export const COVER_CONFIGS: Record<string, CoverConfig> = {
`;

for (const m of tplMatches) {
  const slug = m[1];
  const templateId = m[2];
  const templateName = m[3];
  const r = rawBySlug[slug];
  const theme = themesMap[templateId] || { bg: "#ffffff", ink: "#8B0000", rgb: "139, 0, 0", cover: "#8B0000" };

  let bg = r?.style?.replace(/^background:\s*/, '') || r?.bg || theme.cover || 'linear-gradient(to bottom right, #8B0000, #500000)';
  bg = bg.replace(/;$/, '').trim();

  const imgs = (r?.imgs || []).map(img => {
    let src = img.src.replace(/^https?:\/\/[^\/]+/, '');
    src = decodeURIComponent(src);
    let className = (img.className || '').replace(/jsx-[a-z0-9]+\s*/g, '').trim();
    return { src, className };
  });

  const isDarkCard = darkCardSlugs.has(slug);

  const isTraditional = [
    'song_hy', 'song_phung', 'double_phoenix', 'double_dragon', 'dragon_phoenix', 'song_hac', 'nhat_binh'
  ].some(k => templateId.includes(k) || slug.includes(k));

  const isChibi = templateId.includes('chibi') || slug.includes('chibi');
  const isCoBa = templateId.includes('coba') || templateId.includes('co_ba') || slug.includes('co-ba');

  let particleType = 'petal';
  let sealType = 'heart';

  if (isTraditional) {
    particleType = 'xi';
    sealType = 'xi';
  } else if (isChibi || isCoBa) {
    particleType = 'confetti';
    sealType = isChibi ? 'heart' : 'xi';
  } else if (slug.includes('florence') || slug.includes('riviera') || slug.includes('san-miguel')) {
    particleType = 'blossom';
    sealType = 'heart';
  }

  let nameFont = '"EB Garamond", serif';
  if (slug.includes('to-duyen')) {
    nameFont = '"Carattere", cursive';
  } else if (slug.includes('chibi')) {
    nameFont = '"Patrick Hand", cursive';
  } else if (slug.includes('co-ba')) {
    nameFont = '"Playfair Display", serif';
  } else if (slug.includes('baroque')) {
    nameFont = '"Cormorant Garamond", serif';
  } else if (slug.includes('mai-lan') || slug.includes('hoa-lua')) {
    nameFont = '"Playfair Display", serif';
  }

  // Card colors
  let cardBg = "rgba(255, 255, 255, 0.97)";
  let cardBorder = `rgba(${theme.rgb}, 0.15)`;
  let textColor = theme.ink;
  let btnBg = theme.ink;
  let btnTextColor = "#ffffff";
  let sealBg = `radial-gradient(circle at 30% 30%, ${theme.ink}, rgba(${theme.rgb}, 0.85))`;
  let sealColor = "#ffffff";

  if (isDarkCard) {
    cardBg = "rgba(0, 0, 0, 0.35)";
    cardBorder = "rgba(255, 227, 177, 0.25)";
    
    // Light text colors for dark card
    if (slug.includes('song-hy-xanh')) {
      textColor = "#e8f0e4";
      btnBg = "#e8f0e4";
      btnTextColor = "#1f3a25";
      sealBg = "radial-gradient(circle at 30% 30%, #e9ce9e, rgb(203, 176, 128))";
      sealColor = "#4a0808";
    } else if (slug.includes('song-hy-do')) {
      textColor = "#ffeed2";
      btnBg = "#ffeed2";
      btnTextColor = "#800000";
      sealBg = "radial-gradient(circle at 30% 30%, #ffeed2, #d1ba91)";
      sealColor = "#800000";
    } else if (slug.includes('baroque-v2')) {
      textColor = "#ffefd6";
      btnBg = "#ffdfaf";
      btnTextColor = "#511419";
      sealBg = "radial-gradient(circle at 30% 30%, #ffdfaf, #cbab7c)";
      sealColor = "#511419";
    } else if (slug.includes('song-long')) {
      textColor = "#f0d497";
      btnBg = "#f0d497";
      btnTextColor = "#4a1212";
      sealBg = "radial-gradient(circle at 30% 30%, #f0d497, #cbab7c)";
      sealColor = "#4a1212";
    } else {
      textColor = "#ffe3b1";
      btnBg = "#ffe3b1";
      btnTextColor = "#4a0808";
      sealBg = "radial-gradient(circle at 30% 30%, #ffe3b1, #d1ba91)";
      sealColor = "#4a0808";
    }
  } else {
    // Light card
    if (sealType === 'xi') {
      sealBg = "radial-gradient(circle at 30% 30%, #e9ce9e, rgb(203, 176, 128))";
      sealColor = "#4a0808";
    }
    if (['#ffffff', '#ffefd6', '#ffe3b1', '#fefbf4', '#f8f3e0'].includes(btnBg)) {
      btnBg = '#680e0e';
      btnTextColor = '#ffe3b1';
    }
  }

  code += `  ${JSON.stringify(templateId)}: {
    slug: ${JSON.stringify(slug)},
    templateId: ${JSON.stringify(templateId)},
    templateName: ${JSON.stringify(templateName)},
    sig: ${JSON.stringify(r?.sig || 'general')},
    bg: ${JSON.stringify(bg)},
    cardBg: ${JSON.stringify(cardBg)},
    cardBorder: ${JSON.stringify(cardBorder)},
    imgs: ${JSON.stringify(imgs)},
    particleType: ${JSON.stringify(particleType)},
    sealType: ${JSON.stringify(sealType)},
    sealBg: ${JSON.stringify(sealBg)},
    sealColor: ${JSON.stringify(sealColor)},
    nameFont: ${JSON.stringify(nameFont)},
    accentColor: ${JSON.stringify(textColor)},
    textColor: ${JSON.stringify(textColor)},
    rgb: ${JSON.stringify(theme.rgb || "139, 0, 0")},
    btnBg: ${JSON.stringify(btnBg)},
    btnTextColor: ${JSON.stringify(btnTextColor)},
  },
`;
}

code += `};
`;

fs.writeFileSync('src/features/invitation/components/covers/coverConfigs.ts', code);
console.log('Successfully regenerated coverConfigs.ts with dark/light card awareness!');
