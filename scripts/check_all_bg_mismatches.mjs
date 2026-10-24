import fs from 'fs';
const audit = JSON.parse(fs.readFileSync('docs/qa-review/all_75_image_audit_table.json'));
let manifestContent = fs.readFileSync('src/features/templates/data/themeManifest.ts', 'utf8');

const mismatches = [];
audit.forEach(a => {
  if (a.webGocBg && !a.webGocBg.includes('none') && !a.webGocBg.includes('CSS')) {
    const searchSlug = `"slug": "${a.slug}"`;
    const idx = manifestContent.indexOf(searchSlug);
    if (idx !== -1) {
      const bgIdx = manifestContent.indexOf('"backgroundPath":', idx);
      const nextSlugIdx = manifestContent.indexOf('"slug":', idx + searchSlug.length);
      // Ensure bgIdx belongs to this template
      if (bgIdx !== -1 && (nextSlugIdx === -1 || bgIdx < nextSlugIdx)) {
        const slice = manifestContent.slice(bgIdx, bgIdx + 100);
        const bgMatch = slice.match(/"backgroundPath":\s*([^,\n]+)/);
        if (bgMatch && bgMatch[1].trim() !== `"${a.webGocBg}"`) {
          mismatches.push({ slug: a.slug, current: bgMatch[1].trim(), expected: a.webGocBg });
        }
      }
    }
  }
});
console.log("Found", mismatches.length, "mismatches in themeManifest.ts:");
mismatches.forEach(m => console.log(m.slug, "=> current:", m.current, "expected:", m.expected));
