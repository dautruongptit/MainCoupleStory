import fs from 'fs';

const text = fs.readFileSync('src/features/invitation/components/MinimalismBrown.tsx', 'utf8');
const line83 = text.split('\n')[82]; // 0-indexed 82 is line 83

console.log('Pos 32250-32350:');
console.log(line83.slice(32240, 32350));

console.log('Pos 32510-32600:');
console.log(line83.slice(32500, 32600));
