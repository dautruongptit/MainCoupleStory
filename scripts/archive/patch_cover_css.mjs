import fs from 'fs';

// 1. Add missing CSS rules to styles.css
let css = fs.readFileSync('src/styles/styles.css', 'utf8');

const flowerCss = `
/* ==================== COVER CARD CORNER ORNAMENTS UTILITIES ==================== */
.h-36 { height: 9rem !important; }
.rotate-\\[25deg\\] {
  transform: translate(var(--tw-translate-x, 0), var(--tw-translate-y, 0)) rotate(25deg) scaleX(var(--tw-scale-x, 1)) scaleY(var(--tw-scale-y, 1)) !important;
}
.-rotate-\\[25deg\\] {
  transform: translate(var(--tw-translate-x, 0), var(--tw-translate-y, 0)) rotate(-25deg) scaleX(var(--tw-scale-x, 1)) scaleY(var(--tw-scale-y, 1)) !important;
}
.-translate-x-\\[6\\%\\] {
  --tw-translate-x: -6% !important;
}
.translate-x-\\[6\\%\\] {
  --tw-translate-x: 6% !important;
}
.-scale-x-100 {
  --tw-scale-x: -1 !important;
}

@media (min-width: 768px) {
  .md\\:h-80 { height: 20rem !important; }
  .md\\:-translate-x-\\[11\\%\\] { --tw-translate-x: -11% !important; }
  .md\\:translate-x-\\[11\\%\\] { --tw-translate-x: 11% !important; }
}
`;

if (!css.includes('COVER CARD CORNER ORNAMENTS UTILITIES')) {
  css += flowerCss;
  fs.writeFileSync('src/styles/styles.css', css, 'utf8');
  console.log('SUCCESS: Added flower utility CSS to styles.css');
}

// 2. Remove mb-2 from Guest <p> in BaseCoverCard.tsx
let baseCover = fs.readFileSync('src/features/invitation/components/covers/BaseCoverCard.tsx', 'utf8');

const oldGuestP = `className="text-[18px] leading-[27px] font-light mb-2 inline-block"`;
const newGuestP = `className="text-[18px] leading-[27px] font-light mb-0 inline-block"`;

if (baseCover.includes(oldGuestP)) {
  baseCover = baseCover.replace(oldGuestP, newGuestP);
  fs.writeFileSync('src/features/invitation/components/covers/BaseCoverCard.tsx', baseCover, 'utf8');
  console.log('SUCCESS: Removed mb-2 from Guest <p> in BaseCoverCard.tsx');
} else {
  console.log('NOTE: oldGuestP not found');
}
