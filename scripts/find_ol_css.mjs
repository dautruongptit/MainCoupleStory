import fs from 'fs';

const text = fs.readFileSync('src/styles/styles.css', 'utf8');
const lines = text.split('\n');
lines.forEach((l, i) => {
  if (/\b(ol|ul)\b/.test(l)) {
    console.log(i + 1, l);
  }
});
