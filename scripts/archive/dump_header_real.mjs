import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');
const headerStart = html.indexOf('<header');
const headerEnd = html.indexOf('</header>') + 9;
const headerHtml = html.slice(headerStart, headerEnd);

console.log('Real header HTML:');
console.log(headerHtml);
