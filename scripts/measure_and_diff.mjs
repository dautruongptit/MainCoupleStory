import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

const realCoverM = JSON.parse(fs.readFileSync("docs/real_minimalism_nau_cover_m.json"));
const realCoverL = JSON.parse(fs.readFileSync("docs/real_minimalism_nau_cover_l.json"));
const realOpenedM = JSON.parse(fs.readFileSync("docs/real_minimalism_nau_opened_m.json"));
const realOpenedL = JSON.parse(fs.readFileSync("docs/real_minimalism_nau_opened_l.json"));

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();

  console.log("=================================================");
  console.log("            1. MOBILE 390x844: COVER             ");
  console.log("=================================================");
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo", 3000);

  const cloneCoverM = await c.eval(`
    (() => {
      function get(sel) {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { left: Math.round(r.left*10)/10, top: Math.round(r.top*10)/10, width: Math.round(r.width*10)/10, height: Math.round(r.height*10)/10 };
      }
      return {
        card: get('.relative.rounded-lg'),
        seal: get('.wax-seal'),
        btn: get('button.relative.px-8, a.relative.px-8'),
        gName: get('h1 span:first-child'),
        amp: get('h1 span:nth-child(2)'),
        bName: get('h1 span:last-child'),
        divider: get('h1 + div'),
        date: get('h1 + div + div span'),
        guest: get('h1 + div + div + div p span'),
        topFlower: get('img[src*="flower2-decoration"]:first-of-type'),
        botFlower: get('img[src*="flower2-decoration"]:last-of-type'),
      };
    })()
  `);

  console.log("REAL COVER M vs CLONE COVER M:");
  const realCardM = realCoverM.elements.find(e => typeof e.cls === 'string' && e.cls.includes('relative rounded-lg'))?.rect;
  const realSealM = realCoverM.elements.find(e => typeof e.cls === 'string' && e.cls.includes('rounded-full') && e.rect.width >= 50 && e.rect.width <= 60)?.rect;
  const realBtnM = realCoverM.elements.find(e => e.tag === 'A' && e.rect.width > 100)?.rect;
  const realGNameM = realCoverM.elements.find(e => e.text === 'Hoàng Nam')?.rect;
  const realAmpM = realCoverM.elements.find(e => e.text === '&')?.rect;
  const realBNameM = realCoverM.elements.find(e => e.text === 'Thảo Vy')?.rect;
  const realDateM = realCoverM.elements.find(e => e.text === '3 tháng 1, 2026')?.rect;
  const realGuestM = realCoverM.elements.find(e => e.text === 'Thân Mời')?.rect;
  const realTopFlowerM = realCoverM.elements.find(e => e.tag === 'IMG' && e.rect.top < 300)?.rect;
  const realBotFlowerM = realCoverM.elements.find(e => e.tag === 'IMG' && e.rect.top > 400)?.rect;

  function diff(name, r, c) {
    if (!r || !c) {
      console.log(`  ${name.padEnd(12)}: Real=${JSON.stringify(r)} | Clone=${JSON.stringify(c)} [MISSING]`);
      return;
    }
    const dx = Math.round((c.left - r.left) * 10) / 10;
    const dy = Math.round((c.top - r.top) * 10) / 10;
    const dw = Math.round((c.width - r.width) * 10) / 10;
    const dh = Math.round((c.height - r.height) * 10) / 10;
    const pass = Math.abs(dx) <= 2 && Math.abs(dy) <= 2 && Math.abs(dw) <= 2 && Math.abs(dh) <= 2;
    console.log(`  ${name.padEnd(12)}: Real=[${r.left}, ${r.top}, ${r.width}, ${r.height}] | Clone=[${c.left}, ${c.top}, ${c.width}, ${c.height}] | Diff=[${dx}, ${dy}, ${dw}, ${dh}] ${pass ? '✓ PASS' : '✗ FAIL'}`);
  }

  diff("Card", realCardM, cloneCoverM.card);
  diff("Wax Seal", realSealM, cloneCoverM.seal);
  diff("Button", realBtnM, cloneCoverM.btn);
  diff("Groom Name", realGNameM, cloneCoverM.gName);
  diff("& Amp", realAmpM, cloneCoverM.amp);
  diff("Bride Name", realBNameM, cloneCoverM.bName);
  diff("Date", realDateM, cloneCoverM.date);
  diff("Guest", realGuestM, cloneCoverM.guest);
  diff("Top Flower", realTopFlowerM, cloneCoverM.topFlower);
  diff("Bot Flower", realBotFlowerM, cloneCoverM.botFlower);

  console.log("\n=================================================");
  console.log("            2. LAPTOP 1440x900: COVER            ");
  console.log("=================================================");
  await c.setViewport({ width: 1440, height: 900, mobile: false, deviceScaleFactor: 1 });
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo", 3000);

  const cloneCoverL = await c.eval(`
    (() => {
      function get(sel) {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { left: Math.round(r.left*10)/10, top: Math.round(r.top*10)/10, width: Math.round(r.width*10)/10, height: Math.round(r.height*10)/10 };
      }
      return {
        card: get('.relative.rounded-lg'),
        seal: get('.wax-seal'),
        btn: get('button.relative.px-8, a.relative.px-8'),
        gName: get('h1 span:first-child'),
        amp: get('h1 span:nth-child(2)'),
        bName: get('h1 span:last-child'),
        divider: get('h1 + div'),
        date: get('h1 + div + div span'),
        guest: get('h1 + div + div + div p span'),
        topFlower: get('img[src*="flower2-decoration"]:first-of-type'),
        botFlower: get('img[src*="flower2-decoration"]:last-of-type'),
      };
    })()
  `);

  const realCardL = realCoverL.elements.find(e => typeof e.cls === 'string' && e.cls.includes('relative rounded-lg'))?.rect;
  const realSealL = realCoverL.elements.find(e => typeof e.cls === 'string' && e.cls.includes('rounded-full') && e.rect.width >= 50 && e.rect.width <= 60)?.rect;
  const realBtnL = realCoverL.elements.find(e => e.tag === 'A' && e.rect.width > 100)?.rect;
  const realGNameL = realCoverL.elements.find(e => e.text === 'Hoàng Nam')?.rect;
  const realAmpL = realCoverL.elements.find(e => e.text === '&')?.rect;
  const realBNameL = realCoverL.elements.find(e => e.text === 'Thảo Vy')?.rect;
  const realDateL = realCoverL.elements.find(e => e.text === '3 tháng 1, 2026')?.rect;
  const realGuestL = realCoverL.elements.find(e => e.text === 'Thân Mời')?.rect;
  const realTopFlowerL = realCoverL.elements.find(e => e.tag === 'IMG' && e.rect.left < 500)?.rect;
  const realBotFlowerL = realCoverL.elements.find(e => e.tag === 'IMG' && e.rect.left > 800)?.rect;

  diff("Card", realCardL, cloneCoverL.card);
  diff("Wax Seal", realSealL, cloneCoverL.seal);
  diff("Button", realBtnL, cloneCoverL.btn);
  diff("Groom Name", realGNameL, cloneCoverL.gName);
  diff("& Amp", realAmpL, cloneCoverL.amp);
  diff("Bride Name", realBNameL, cloneCoverL.bName);
  diff("Date", realDateL, cloneCoverL.date);
  diff("Guest", realGuestL, cloneCoverL.guest);
  diff("Top Flower", realTopFlowerL, cloneCoverL.topFlower);
  diff("Bot Flower", realBotFlowerL, cloneCoverL.botFlower);

  await c.close();
}

run().catch(console.error);
