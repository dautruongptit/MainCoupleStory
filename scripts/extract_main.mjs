import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_opened_m.html', 'utf8');

// Find main
const mainStart = html.indexOf('<main');
const mainEnd = html.indexOf('</main>') + 7;
const mainHtml = html.slice(mainStart, mainEnd);

fs.writeFileSync('docs/real_minimalism_nau_main.html', mainHtml);
console.log('Saved docs/real_minimalism_nau_main.html (length:', mainHtml.length, ')');
