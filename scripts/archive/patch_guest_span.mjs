import fs from 'fs';

let baseCover = fs.readFileSync('src/features/invitation/components/covers/BaseCoverCard.tsx', 'utf8');

const oldGuestSpan = `<span className="inline-block">{d.envelopeGuest || "Thân Mời"}</span>`;
const newGuestSpan = `<span className="inline-block leading-[23px] pt-[2px]">{d.envelopeGuest || "Thân Mời"}</span>`;

if (baseCover.includes(oldGuestSpan)) {
  baseCover = baseCover.replace(oldGuestSpan, newGuestSpan);
  fs.writeFileSync('src/features/invitation/components/covers/BaseCoverCard.tsx', baseCover, 'utf8');
  console.log('SUCCESS: Patched guest span');
} else {
  console.log('NOTE: oldGuestSpan not found');
}
