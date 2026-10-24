import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');
const s2Start = html.indexOf('THÔNG TIN LỄ');
const sectionStart = html.lastIndexOf('<section', s2Start);
const sectionEnd = html.indexOf('</section>', sectionStart) + 10;
const sectionHtml = html.slice(sectionStart, sectionEnd);

console.log('Real Section 2 (Ceremony):');
console.log(sectionHtml);
