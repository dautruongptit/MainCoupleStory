import fs from 'fs';
import path from 'path';

const AUDIT_DIR = 'docs/asset-audit';
const files = fs.readdirSync(AUDIT_DIR).filter(f => f.endsWith('.json'));

console.log(`Found ${files.length} audit json files.`);

const suspiciousRsvp = [];
const emptyScrolled = [];

for (const f of files) {
  const content = JSON.parse(fs.readFileSync(path.join(AUDIT_DIR, f), 'utf8'));
  const gift = new Set(content.stages?.giftbox || []);
  const rsvp = content.stages?.rsvp || [];
  const scrolled = content.stages?.scrolled || [];

  if (scrolled.length === 0) {
    emptyScrolled.push(content.slug || f.replace('.json', ''));
  }

  if (rsvp.length > 0 && gift.size > 0) {
    let match = 0;
    for (const u of rsvp) {
      if (gift.has(u)) match++;
    }
    const ratio = match / rsvp.length;
    if (ratio >= 0.8) {
      suspiciousRsvp.push({ slug: content.slug, ratio: Math.round(ratio * 100), rsvpCount: rsvp.length, matchCount: match });
    }
  }
}

console.log(`\nSuspicious RSVP (overlap >= 80% with giftbox): ${suspiciousRsvp.length}`);
console.log(suspiciousRsvp);

console.log(`\nEmpty scrolled count: ${emptyScrolled.length}`);
console.log(emptyScrolled);
