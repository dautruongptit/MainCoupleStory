import fs from 'fs';

// Let's inspect the sections in docs/real_minimalism_nau_showcase_all.html
const html = fs.readFileSync('docs/real_minimalism_nau_showcase_all.html', 'utf8');

// The wrapper is:
// <div data-showcase-root="" class="relative w-full max-w-[480px] md:max-w-[900px] md:mx-auto overflow-hidden md:border md:border-[#7c6a6022] isolate" style="background-color: rgb(255, 247, 243); color: rgb(124, 106, 96);">
console.log('Template showcases root length:', html.length);
