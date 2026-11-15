import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_cover_m.html', 'utf8');
const envIndex = html.indexOf('invite-envelope');
console.log('envIndex:', envIndex);
const showcaseIndex = html.indexOf('data-showcase-root');
console.log('showcaseIndex:', showcaseIndex);

if (envIndex !== -1) {
  const envStart = html.lastIndexOf('<div', envIndex);
  console.log('envStart:', envStart);
  // find the end of this div container
  // Or grab next 20000 chars
  const snippet = html.slice(envStart, envStart + 20000);
  fs.writeFileSync('docs/real_minimalism_nau_cover_exact.html', snippet);
  console.log('Wrote snippet from envStart');
}
