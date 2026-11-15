import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');
const rootStart = html.indexOf('data-showcase-root');
const divStart = html.lastIndexOf('<div', rootStart);
const content = html.slice(divStart);

// Let's inspect each section / major child
// In data-showcase-root, let's find the sections
console.log('Total length of template HTML:', content.length);

// Count sections or major components
const sectionMatches = [...content.matchAll(/<div[^>]*class=\"([^\"]*)\"[^>]*data-landing-screenshot-id=\"([^\"]*)\"/g)];
console.log('Sections with screenshot ID:');
sectionMatches.forEach(m => console.log(' -', m[2], ':', m[1]));
