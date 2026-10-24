import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');

const cuts = [726, 3085, 8032, 15740, 27873, 28633, 31586, 38804, 56562, html.length];

cuts.slice(0, -1).forEach((start, i) => {
  const end = cuts[i+1];
  const slice = html.slice(start, end);
  const titleMatch = slice.match(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/s) || slice.match(/<p[^>]*>(.*?)<\/p>/s);
  console.log(`\n================ SECTION ${i+1} (${start} to ${end}) ================`);
  console.log('Start tag:', slice.slice(0, slice.indexOf('>') + 1));
  console.log('Title/Heading:', titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'NO HEADING');
  console.log('Length:', slice.length);
  // List images in section
  const imgs = [];
  const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
  let im;
  while ((im = imgRegex.exec(slice)) !== null) {
    imgs.push(im[1]);
  }
  console.log('Images:', imgs);
});
