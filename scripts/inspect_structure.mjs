import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');

// Find all direct children of data-showcase-root
const rootIdx = html.indexOf('data-showcase-root=""');
const startTagEnd = html.indexOf('>', rootIdx);

// Let's inspect the sections
const secRegex = /<(header|section|footer|div class="relative flex flex-col items-center)[^>]*>/g;
let match;
let indices = [];
while ((match = secRegex.exec(html)) !== null) {
  if (match.index > rootIdx) {
    indices.push({ tag: match[0], index: match.index });
  }
}

console.log('Sections found inside template:');
indices.forEach((s, i) => {
  console.log(`\n--- SECTION ${i+1} at ${s.index} ---`);
  console.log(s.tag);
});
