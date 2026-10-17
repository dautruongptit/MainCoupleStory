import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf-8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];

const templates = tplMatches.map((m, idx) => ({
  stt: idx + 1,
  slug: m[1],
  id: m[2],
  name: m[3]
}));

console.log(`Auditing styles for ${templates.length} templates on chungdoi.com...`);

const c = new ChromeController();
await c.start();
await c.newPage();

const stylesData = {};

for (const t of templates) {
  const { slug, id } = t;
  await c.navigate(`https://chungdoi.com/vi/mau-thiep/${slug}/demo`, 2000);
  const info = await c.eval(`
    (() => {
      const el = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
      if (!el) return null;
      
      const card = el.querySelector('.relative.w-\\\\[310px\\\\], .relative.w-\\\\[320px\\\\], [class*="rounded-lg"]');
      const innerCard = card ? card.querySelector('.absolute.inset-0') : null;
      const h1 = el.querySelector('h1');
      const btn = el.querySelector('a, button');
      const seal = el.querySelector('[class*="rounded-full"][style*="animation:seal-pulse"], [class*="wax-seal"]');
      
      return {
        cardBg: innerCard ? window.getComputedStyle(innerCard).backgroundColor : null,
        cardBorder: innerCard ? window.getComputedStyle(innerCard).borderColor : null,
        h1Color: h1 ? window.getComputedStyle(h1).color : null,
        btnBg: btn ? window.getComputedStyle(btn).backgroundColor : null,
        btnColor: btn ? window.getComputedStyle(btn).color : null,
        sealBg: seal ? window.getComputedStyle(seal).backgroundImage || window.getComputedStyle(seal).backgroundColor : null,
        sealColor: seal ? window.getComputedStyle(seal).color : null,
      };
    })()
  `);
  stylesData[id] = info;
  console.log(`[${t.stt}/75] ${slug}: h1=${info?.h1Color}, btnBg=${info?.btnBg}, cardBg=${info?.cardBg}`);
}

await c.close();
fs.writeFileSync("scratch_full_cover_styles.json", JSON.stringify(stylesData, null, 2));
console.log("Saved scratch_full_cover_styles.json!");
