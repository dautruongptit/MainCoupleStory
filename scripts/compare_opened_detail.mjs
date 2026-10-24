import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

const realM = JSON.parse(fs.readFileSync("docs/real_minimalism_nau_opened_m.json"));
const realL = JSON.parse(fs.readFileSync("docs/real_minimalism_nau_opened_l.json"));

async function compareOpened() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();

  console.log("=================================================");
  console.log("          MOBILE 390x844: OPENED SECTIONS        ");
  console.log("=================================================");
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);

  const cloneM = await c.eval(`
    (() => {
      function get(sel) {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          left: Math.round(r.left*10)/10,
          top: Math.round(r.top*10)/10,
          width: Math.round(r.width*10)/10,
          height: Math.round(r.height*10)/10,
          bg: window.getComputedStyle(el).backgroundColor,
          bgImg: window.getComputedStyle(el).backgroundImage
        };
      }
      return {
        sh: document.documentElement.scrollHeight,
        hero: get('header'),
        familySec: get('.sp-family-sec'),
        gallerySec: get('.sp-gallery-sec'),
        banquetSec: get('.sp-banquet-sec'),
        venueSec: get('.sp-venue-sec'),
        dressSec: get('.sp-dress-sec'),
        timelineSec: get('.sp-timeline-sec'),
        guestSec: get('.sp-guestbook-sec'),
        footer: get('footer')
      };
    })()
  `);

  console.log("Real ScrollHeight:", realM.sh, "| Clone ScrollHeight:", cloneM.sh, "| Diff:", cloneM.sh - realM.sh);

  console.log("\nReal Sections:");
  realM.sections.forEach(s => {
    console.log(`  <${s.tag}> ${s.cls.slice(0, 40)}: left=${s.rect.left}, top=${s.rect.top}, w=${s.rect.width}, h=${s.rect.height}`);
  });

  console.log("\nClone Sections:");
  for (const [k, v] of Object.entries(cloneM)) {
    if (k !== 'sh') console.log(`  ${k}: left=${v?.left}, top=${v?.top}, w=${v?.width}, h=${v?.height}`);
  }

  await c.close();
}

compareOpened().catch(console.error);
