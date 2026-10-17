const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync('scratch_raw_envelopes.json', 'utf8'));

// Check fields of raw[0]
console.log('Keys of raw entry:', Object.keys(Object.values(raw)[0]));
// Count total templates
console.log('Total templates in raw:', Object.keys(raw).length);

// Group by sig
const sigGroups = {};
for (const [k, v] of Object.entries(raw)) {
  const s = v.sig || 'unknown';
  if (!sigGroups[s]) sigGroups[s] = [];
  sigGroups[s].push(v);
}

console.log('Total signatures:', Object.keys(sigGroups).length);
for (const [sig, list] of Object.entries(sigGroups)) {
  const sample = list[0];
  console.log(`\n=== Signature: ${sig} (${list.length} templates: ${list.map(x => x.slug).join(', ')}) ===`);
  console.log('Sample bg:', sample.style || sample.bg);
  console.log('Sample cardBg:', sample.cardBg);
  console.log('Sample cardShadow:', sample.cardShadow);
  console.log('Sample imgs count:', sample.imgs ? sample.imgs.length : 0);
  if (sample.imgs && sample.imgs.length > 0) {
    sample.imgs.forEach((img, idx) => {
      console.log(`  Img ${idx}: ${img.src} | class: ${img.className}`);
    });
  }
}
