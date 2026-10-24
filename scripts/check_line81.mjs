import fs from 'fs';

const lines = fs.readFileSync('src/features/invitation/components/MinimalismBrown.tsx', 'utf8').split('\n');
console.log('Line 80:', lines[79]?.slice(0, 300));
console.log('Line 81:', lines[80]?.slice(350, 460));
console.log('Line 82:', lines[81]?.slice(0, 300));
