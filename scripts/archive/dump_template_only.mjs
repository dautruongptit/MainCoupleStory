import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');
const templateKey = 'data-testid="minimalism-brown-template"';
const start = html.indexOf(templateKey);
const envKey = 'data-landing-screenshot-id="invite-envelope"';
const end = html.indexOf(envKey);

console.log('Template start:', start, 'Envelope start:', end);
if (start !== -1 && end !== -1) {
  const rootDivStart = html.lastIndexOf('<div', start);
  const templateHtml = html.slice(rootDivStart, html.lastIndexOf('<div', end));
  fs.writeFileSync('docs/real_minimalism_nau_template_only.html', templateHtml);
  console.log('Wrote docs/real_minimalism_nau_template_only.html, size:', templateHtml.length);
}
