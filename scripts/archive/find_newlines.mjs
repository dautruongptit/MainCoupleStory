import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');

let pos = 0;
while ((pos = html.indexOf('\n', pos)) !== -1) {
  // inspect 50 chars before and after
  const snippet = html.slice(Math.max(0, pos - 40), Math.min(html.length, pos + 40));
  console.log(`Newline at ${pos}: ${JSON.stringify(snippet)}`);
  pos++;
}
