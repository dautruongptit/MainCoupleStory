import fs from 'fs';

const openedDataM = JSON.parse(fs.readFileSync('docs/real_minimalism_nau_opened_m.json', 'utf8'));
console.log('Real Opened M - Sections Count:', openedDataM.sections.length);
openedDataM.sections.forEach((s, i) => {
  console.log(`\nSection ${i}:`, s.name || s.id || s.testId || s.className?.slice(0, 50));
  console.log('  Rect:', s.rect);
  console.log('  Classes:', s.className);
  console.log('  Styles:', s.style?.slice(0, 80));
});

const openedDataL = JSON.parse(fs.readFileSync('docs/real_minimalism_nau_opened_l.json', 'utf8'));
console.log('\n====================================');
console.log('Real Opened L - Sections Count:', openedDataL.sections.length);
openedDataL.sections.forEach((s, i) => {
  console.log(`\nSection ${i}:`, s.name || s.id || s.testId || s.className?.slice(0, 50));
  console.log('  Rect:', s.rect);
});
