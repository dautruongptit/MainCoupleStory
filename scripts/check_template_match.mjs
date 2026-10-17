import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('scratch_raw_envelopes.json', 'utf8'));
const tplContent = fs.readFileSync('src/features/templates/data/templates.ts', 'utf8');
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];

console.log('TEMPLATES count:', tplMatches.length);

const rawBySlug = {};
for (const [k, v] of Object.entries(raw)) {
  rawBySlug[v.slug] = v;
}

let matched = 0;
let missing = [];

for (const m of tplMatches) {
  const slug = m[1];
  const id = m[2];
  const name = m[3];
  if (rawBySlug[slug]) {
    matched++;
  } else {
    missing.push({ slug, id, name });
  }
}

console.log(`Matched: ${matched} / ${tplMatches.length}`);
if (missing.length > 0) {
  console.log('Missing from raw:', missing);
}
