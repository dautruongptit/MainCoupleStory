import fs from 'fs';
const html = fs.readFileSync('docs/minimalism_do_dam_real_cover.html', 'utf8');

const regex = /<img[^>]+castle-background\.webp[^>]*>/g;
let match;
let i = 1;
while ((match = regex.exec(html)) !== null) {
  const start = Math.max(0, match.index - 300);
  const end = Math.min(html.length, match.index + 300);
  console.log(`\n--- CASTLE ${i++} ---`);
  console.log(html.slice(start, end));
}

const pRegex = /<img[^>]+papernote-background\.webp[^>]*>/g;
while ((match = pRegex.exec(html)) !== null) {
  const start = Math.max(0, match.index - 300);
  const end = Math.min(html.length, match.index + 300);
  console.log(`\n--- PAPERNOTE ---`);
  console.log(html.slice(start, end));
}
