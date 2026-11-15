import fs from 'fs';

const text = fs.readFileSync('src/features/invitation/components/covers/coverConfigs.ts', 'utf8');
const p = text.indexOf('minimalism_brown');
console.log(text.slice(p + 600, p + 1500));
