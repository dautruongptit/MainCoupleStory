import fs from 'fs';

const text = fs.readFileSync('src/features/invitation/components/Preview.tsx', 'utf8');
const lines = text.split('\n');
for (let i = lines.length - 20; i < lines.length; i++) {
  console.log(i + 1, lines[i]);
}
