import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('scratch_raw_envelopes.json', 'utf8'));
const tplContent = fs.readFileSync('src/features/templates/data/templates.ts', 'utf8');
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];

const themesContent = fs.readFileSync('src/features/invitation/config/templateThemes.ts', 'utf8');
// Parse TEMPLATE_THEMES
const themeMatches = [...themesContent.matchAll(/(\w+):\s*\{\s*bg:\s*"([^"]+)",\s*ink:\s*"([^"]+)",\s*rgb:\s*"([^"]+)",\s*cover:\s*"([^"]+)"/g)];
const themesMap = {};
for (const m of themeMatches) {
  themesMap[m[1]] = { bg: m[2], ink: m[3], rgb: m[4], cover: m[5] };
}

console.log('Themes mapped:', Object.keys(themesMap).length);

const rawBySlug = {};
for (const [k, v] of Object.entries(raw)) {
  rawBySlug[v.slug] = v;
}

const configs = [];

for (const m of tplMatches) {
  const slug = m[1];
  const templateId = m[2];
  const templateName = m[3];
  const r = rawBySlug[slug];
  const theme = themesMap[templateId] || { bg: "#ffffff", ink: "#8B0000", rgb: "139, 0, 0", cover: "#8B0000" };

  // Determine bg style
  let bg = r?.style?.replace(/^background:\s*/, '') || r?.bg || theme.cover || 'linear-gradient(to bottom right, #8B0000, #500000)';
  // Clean up any double quotes or trailing semicolons
  bg = bg.replace(/;$/, '').trim();

  // Determine images
  const imgs = (r?.imgs || []).map(img => {
    let src = img.src.replace(/^https?:\/\/[^\/]+/, '');
    src = decodeURIComponent(src);
    let className = (img.className || '').replace(/jsx-[a-z0-9]+\s*/g, '').trim();
    return { src, className };
  });

  // Determine particle type and seal type
  const isTraditional = [
    'song_hy', 'song_phung', 'double_phoenix', 'double_dragon', 'dragon_phoenix', 'song_hac', 'nhat_binh'
  ].some(k => templateId.includes(k) || slug.includes(k));

  const isChibiOrCoBa = ['chibi', 'coba', 'co_ba'].some(k => templateId.includes(k) || slug.includes(k));

  let particleType = 'petal';
  let sealType = 'heart';

  if (isTraditional) {
    particleType = 'xi';
    sealType = 'xi';
  } else if (isChibiOrCoBa) {
    particleType = 'confetti';
    sealType = templateId.includes('chibi') ? 'heart' : 'xi';
  } else if (slug.includes('florence') || slug.includes('riviera') || slug.includes('san-miguel')) {
    particleType = 'blossom';
    sealType = 'heart';
  }

  // Determine name font
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

  // Accent and button colors
  const accentColor = theme.ink || '#6e1a20';
  const rgb = theme.rgb || '110, 26, 32';
  const btnBg = theme.ink.startsWith('#') ? theme.ink : '#5e813c';
  const btnTextColor = ['#ffffff', '#ffefd6', '#ffe3b1', '#fefbf4'].includes(theme.ink) ? '#2b1b17' : '#ffffff';

  configs.push({
    slug,
    templateId,
    templateName,
    sig: r?.sig || 'general',
    bg,
    imgs,
    particleType,
    sealType,
    nameFont,
    accentColor,
    rgb,
    btnBg,
    btnTextColor
  });
}

console.log(`Generated configs for ${configs.length} templates.`);
fs.writeFileSync('scratch_sample_configs.json', JSON.stringify(configs, null, 2));
console.log('Sample config 0:', configs[0]);
console.log('Sample config 7 (to-duyen-xanh):', configs[7]);
