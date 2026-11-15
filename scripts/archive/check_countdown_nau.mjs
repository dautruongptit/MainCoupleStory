import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_showcase_all.html', 'utf8');
const p = html.indexOf('Thêm vào lịch');
console.log('Thêm vào lịch:');
if (p !== -1) {
  console.log(html.slice(p - 150, p + 400));
} else {
  console.log('No Thêm vào lịch, let us look after calendar');
  const p2 = html.indexOf('31</span>');
  console.log(html.slice(p2, p2 + 800));
}
