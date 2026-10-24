import fs from 'fs';

const realCoverM = JSON.parse(fs.readFileSync('docs/real_minimalism_nau_cover_m.json'));
const realCoverL = JSON.parse(fs.readFileSync('docs/real_minimalism_nau_cover_l.json'));
const realOpenedM = JSON.parse(fs.readFileSync('docs/real_minimalism_nau_opened_m.json'));
const realOpenedL = JSON.parse(fs.readFileSync('docs/real_minimalism_nau_opened_l.json'));

function getCls(e) {
  if (!e.cls) return '';
  if (typeof e.cls === 'string') return e.cls;
  if (e.cls.baseVal) return e.cls.baseVal;
  return '';
}

console.log('=== REAL COVER MOBILE SUMMARY ===');
console.log('ScrollHeight:', realCoverM.sh);

// 1. Envelope Card
const cardM = realCoverM.elements.find(e => getCls(e).includes('relative rounded-lg'));
console.log('Card Rect:', cardM ? cardM.rect : 'Not found');

// 2. Wax Seal
const sealM = realCoverM.elements.find(e => getCls(e).includes('rounded-full') && e.rect.width >= 50 && e.rect.width <= 60);
console.log('Wax Seal Rect:', sealM ? sealM.rect : 'Not found');

// 3. Button
const btnM = realCoverM.elements.find(e => e.tag === 'A' && e.rect.width > 100);
console.log('Button Rect:', btnM ? btnM.rect : 'Not found');

// 4. Texts
const textsM = realCoverM.elements.filter(e => e.text && ['Hoàng Nam', '&', 'Thảo Vy', '❦', '3 tháng 1, 2026', 'Thân Mời', 'Mở thiệp'].includes(e.text));
console.log('Texts:');
textsM.forEach(t => console.log(`  "${t.text}": left=${t.rect.left}, top=${t.rect.top}, w=${t.rect.width}, h=${t.rect.height}, font=${t.styles.fontSize} ${t.styles.fontFamily}, color=${t.styles.color}`));

// 5. Images
const imgsM = realCoverM.elements.filter(e => e.tag === 'IMG');
console.log('Images:');
imgsM.forEach(img => console.log(`  ${img.src}: left=${img.rect.left}, top=${img.rect.top}, w=${img.rect.width}, h=${img.rect.height}, cls=${getCls(img)}`));

console.log('\n=== REAL COVER LAPTOP SUMMARY ===');
console.log('ScrollHeight:', realCoverL.sh);

const cardL = realCoverL.elements.find(e => getCls(e).includes('relative rounded-lg'));
console.log('Card Rect:', cardL ? cardL.rect : 'Not found');

const sealL = realCoverL.elements.find(e => getCls(e).includes('rounded-full') && e.rect.width >= 50 && e.rect.width <= 60);
console.log('Wax Seal Rect:', sealL ? sealL.rect : 'Not found');

const btnL = realCoverL.elements.find(e => e.tag === 'A' && e.rect.width > 100);
console.log('Button Rect:', btnL ? btnL.rect : 'Not found');

const textsL = realCoverL.elements.filter(e => e.text && ['Hoàng Nam', '&', 'Thảo Vy', '❦', '3 tháng 1, 2026', 'Thân Mời', 'Mở thiệp'].includes(e.text));
console.log('Texts:');
textsL.forEach(t => console.log(`  "${t.text}": left=${t.rect.left}, top=${t.rect.top}, w=${t.rect.width}, h=${t.rect.height}, font=${t.styles.fontSize} ${t.styles.fontFamily}, color=${t.styles.color}`));

const imgsL = realCoverL.elements.filter(e => e.tag === 'IMG');
console.log('Images:');
imgsL.forEach(img => console.log(`  ${img.src}: left=${img.rect.left}, top=${img.rect.top}, w=${img.rect.width}, h=${img.rect.height}, cls=${getCls(img)}`));
