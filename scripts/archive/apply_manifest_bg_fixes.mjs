import fs from 'fs';
let content = fs.readFileSync('src/features/templates/data/themeManifest.ts', 'utf8');
const target = `"minimalism_darkred": {`;
const targetIdx = content.indexOf(target, content.indexOf('TEMPLATE_MANIFESTS'));
console.log("targetIdx in TEMPLATE_MANIFESTS:", targetIdx);
const bgNull = '"backgroundPath": null,';
const bgNullIdx = content.indexOf(bgNull, targetIdx);
console.log("bgNullIdx:", bgNullIdx, "diff:", bgNullIdx - targetIdx);
if (bgNullIdx !== -1) {
  content = content.slice(0, bgNullIdx) + '"backgroundPath": "/images/themes/minimalism-dark-red/paper.webp",' + content.slice(bgNullIdx + bgNull.length);
  fs.writeFileSync('src/features/templates/data/themeManifest.ts', content, 'utf8');
  console.log("Successfully updated backgroundPath in TEMPLATE_MANIFESTS!");
}
