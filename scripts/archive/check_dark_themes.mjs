import fs from 'fs';

const themesContent = fs.readFileSync('src/features/invitation/config/templateThemes.ts', 'utf8');
const themeMatches = [...themesContent.matchAll(/(\w+):\s*\{\s*bg:\s*"([^"]+)",\s*ink:\s*"([^"]+)",\s*rgb:\s*"([^"]+)",\s*cover:\s*"([^"]+)"/g)];

console.log('Total themes:', themeMatches.length);

const darkThemes = [];
const lightThemes = [];

for (const m of themeMatches) {
  const [_, id, bg, ink, rgb, cover] = m;
  // determine if bg is dark
  let isDark = false;
  if (bg.startsWith('#')) {
    const hex = bg.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luma < 128) isDark = true;
  }
  if (isDark) {
    darkThemes.push({ id, bg, ink, cover });
  } else {
    lightThemes.push({ id, bg, ink, cover });
  }
}

console.log(`Dark themes (${darkThemes.length}):`, darkThemes.map(x => x.id).join(', '));
console.log(`Light themes (${lightThemes.length}):`, lightThemes.map(x => x.id).join(', '));
