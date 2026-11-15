import fs from 'fs';

const content = fs.readFileSync('src/features/templates/data/templates.ts', 'utf8');
const regex = /\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g;
let m;
const list = [];
while ((m = regex.exec(content)) !== null) {
  list.push({ slug: m[1], id: m[2], name: m[3] });
}

console.log('Total templates found:', list.length);
list.forEach((t, i) => {
  console.log(`${i + 1}: slug="${t.slug}", id="${t.id}", name="${t.name}"`);
});
