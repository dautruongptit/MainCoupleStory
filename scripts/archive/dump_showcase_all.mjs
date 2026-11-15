import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');

// Find sections inside data-showcase-root
const start = html.indexOf('data-showcase-root=""');
const rootHtml = html.slice(start);

console.log('Root HTML length:', rootHtml.length);

// Extract the sections
// Let's dump all sections into a file for reference
fs.writeFileSync('docs/real_minimalism_nau_showcase_all.html', rootHtml);
console.log('Saved docs/real_minimalism_nau_showcase_all.html');
