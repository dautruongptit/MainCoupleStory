import fs from 'fs';

const content = fs.readFileSync('src/features/templates/data/templates.ts', 'utf8');
const regex = /"img":\s*"([^"]+)",\s*"full":\s*"([^"]+)"/g;

const list = [];
let m;
while ((m = regex.exec(content)) !== null) {
  list.push({ img: m[1], full: m[2] });
}

console.log(`Found ${list.length} templates in templates.ts.`);
console.log('Sample item:', list[0]);

const allRemoteUrls = [];
for (const item of list) {
  allRemoteUrls.push({
    url: `https://assets.chungdoi.com/template-previews/vi/${item.img}`,
    targetFile: `public/images/template-previews/vi/${item.img}`
  });
  allRemoteUrls.push({
    url: `https://assets.chungdoi.com/template-previews/vi/${item.full}`,
    targetFile: `public/images/template-previews/vi/${item.full}`
  });
}

console.log(`Total preview URLs to download: ${allRemoteUrls.length}`);

// Check which already exist on disk
let existCount = 0;
let missing = [];
for (const item of allRemoteUrls) {
  if (fs.existsSync(item.targetFile)) {
    existCount++;
  } else {
    missing.push(item);
  }
}

console.log(`Already exists: ${existCount}, Missing: ${missing.length}`);
fs.writeFileSync('scripts/missing_previews.json', JSON.stringify(missing, null, 2), 'utf8');
