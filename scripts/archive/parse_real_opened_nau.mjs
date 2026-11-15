import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_opened_m.html', 'utf8');

// Find main content container
const mainIdx = html.indexOf('<main');
console.log('Main found at:', mainIdx);

// Extract all <section> and <header> tags
const regex = /<(header|section|footer)[^>]*>/g;
let match;
let sections = [];
while ((match = regex.exec(html)) !== null) {
  const start = match.index;
  const tag = match[1];
  const tagStr = match[0];
  sections.push({ tag, tagStr, start });
}

console.log('Found', sections.length, 'sections:');
sections.forEach((s, i) => {
  console.log(`\n=== SECTION ${i+1}: <${s.tag}> ===`);
  console.log(s.tagStr);
  const nextStart = sections[i+1] ? sections[i+1].start : html.indexOf('</main>', s.start);
  const snippet = html.slice(s.start, Math.min(s.start + 1200, nextStart > s.start ? nextStart : s.start + 1200));
  console.log('Snippet:\n', snippet.slice(0, 800));
});
