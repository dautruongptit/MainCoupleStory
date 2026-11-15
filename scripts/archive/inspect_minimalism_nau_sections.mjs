import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');

// Find headings, images, and text
console.log('--- HEADINGS & TEXT IN REAL MAIN ---');
const h1s = [...html.matchAll(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g)];
h1s.forEach(h => console.log('Heading:', h[1].replace(/<[^>]+>/g, '').trim()));

console.log('\n--- IMAGES IN REAL MAIN ---');
const imgs = [...html.matchAll(/<img[^>]+src=[\"']([^\"']+)[\"'][^>]*>/g)];
const uniqueImgs = [...new Set(imgs.map(m => m[1]))];
uniqueImgs.forEach(src => console.log('Image:', src));

console.log('\n--- DATA ATTRIBUTES / IDS ---');
const testIds = [...html.matchAll(/data-[a-z0-9-]+=\"[^\"]*\"/g)];
const uniqueIds = [...new Set(testIds.map(m => m[0]))];
uniqueIds.forEach(id => console.log('Attr:', id));
