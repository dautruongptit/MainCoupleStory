import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');

// Find all image URLs in the main template
const imgRegex = /<img[^>]+src=[\"']([^\"']+)[\"'][^>]*>/g;
const imgs = [];
let m;
while ((m = imgRegex.exec(html)) !== null) {
  imgs.push(m[1]);
}

console.log('Total images in main:', imgs.length);
console.log('Unique images:');
[...new Set(imgs)].forEach(url => console.log(' -', url));
