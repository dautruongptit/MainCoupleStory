import fs from 'fs';

const data = JSON.parse(fs.readFileSync('docs/qa-review/audit_10_samples_raw.json', 'utf8'));

console.log('Total samples in raw audit:', data.length);

for (const item of data) {
  console.log(`\n======================================================`);
  console.log(`Sample: ${item.slug} (${item.name})`);
  console.log(`======================================================`);

  for (const vp of ['mobile', 'laptop']) {
    console.log(`\n--- Viewport: ${vp.toUpperCase()} ---`);
    for (const screen of ['cover', 'opened']) {
      const real = item[vp]?.[screen]?.real;
      const clone = item[vp]?.[screen]?.clone;

      if (!real || !clone) {
        console.log(`  Screen [${screen}]: MISSING DATA`);
        continue;
      }

      console.log(`  Screen [${screen}]:`);
      console.log(`    Doc Width: real=${real.docW}px, clone=${clone.docW}px (H-Scroll: real=${real.hasHorizontalScroll}, clone=${clone.hasHorizontalScroll})`);
      
      if (screen === 'cover') {
        const rSeal = real.coverSeal?.rect;
        const cSeal = clone.coverSeal?.rect;
        console.log(`    Cover Seal: real=${JSON.stringify(rSeal)} | clone=${JSON.stringify(cSeal)}`);
        const rBtn = real.openBtn?.rect;
        const cBtn = clone.openBtn?.rect;
        console.log(`    Open Button: real=${JSON.stringify(rBtn)} | clone=${JSON.stringify(cBtn)}`);
      }

      if (screen === 'opened') {
        const rEnv = real.envelope?.rect;
        const cEnv = clone.envelope?.rect;
        console.log(`    Envelope: real=${JSON.stringify(rEnv)} | clone=${JSON.stringify(cEnv)}`);
        const rCard = real.card?.rect;
        const cCard = clone.card?.rect;
        console.log(`    Card: real=${JSON.stringify(rCard)} | clone=${JSON.stringify(cCard)}`);
        const rHdr = real.header?.rect;
        const cHdr = clone.header?.rect;
        console.log(`    Header: real=${JSON.stringify(rHdr)} | clone=${JSON.stringify(cHdr)}`);
      }

      if (clone.errors?.length > 0) {
        console.log(`    Clone Console/Network Errors:`, clone.errors);
      }
    }
  }
}
