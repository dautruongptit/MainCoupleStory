import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('scratch_raw_envelopes.json', 'utf8'));

// Check how many images each template has
const imgCounts = {};
for (const [k, v] of Object.entries(raw)) {
  const c = v.imgs ? v.imgs.length : 0;
  imgCounts[c] = (imgCounts[c] || 0) + 1;
}
console.log('Image counts per cover distribution:', imgCounts);

// Check if any styles have issues
for (const [k, v] of Object.entries(raw)) {
  if (!v.style && !v.bg) {
    console.log('No bg style for:', v.slug);
  }
}
