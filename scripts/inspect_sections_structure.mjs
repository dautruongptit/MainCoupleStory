import fs from 'fs';
const html = fs.readFileSync('docs/minimalism_do_dam_real_cover.html', 'utf8');

// Let's find the containers around each castle-background and papernote-background
const matches = [...html.matchAll(/<div[^>]*overflow-x-clip[^>]*>[\s\S]*?(?:castle-background|papernote-background)[\s\S]*?<\/div>/g)];
console.log("Found matches:", matches.length);
matches.forEach((m, idx) => {
  console.log(`\n=== SECTION AMBIENT ${idx + 1} ===`);
  console.log(m[0].slice(0, 300));
});
