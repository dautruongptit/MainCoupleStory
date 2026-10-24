import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');
const css = fs.readFileSync('src/styles/styles.css', 'utf8');

const classMatches = [...html.matchAll(/class=\"([^\"]+)\"/g)];
const allClasses = new Set();
classMatches.forEach(m => m[1].split(/\s+/).forEach(c => allClasses.add(c)));

console.log('Total unique classes in real template:', allClasses.size);

const missing = [];
for (const cls of allClasses) {
  // Check if cls or escaped cls is in css
  if (cls.startsWith('jsx-') || cls.startsWith('@')) continue;
  const escaped = cls.replace(/([\[\]\:\.\/\(\)\%])/g, '\\$1');
  if (!css.includes(`.${cls}`) && !css.includes(`.${escaped}`) && !css.includes(cls)) {
    missing.push(cls);
  }
}

console.log('Potentially missing classes:', missing);
