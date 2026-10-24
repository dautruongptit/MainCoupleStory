import { ChromeController } from "./cdp_helper.mjs";

async function measureClone() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();

  console.log("=== CLONE MOBILE COVER ===");
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo", 2000);

  const resM = await c.eval(`
    (() => {
      function get(sel) {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { left: Math.round(r.left*10)/10, top: Math.round(r.top*10)/10, width: Math.round(r.width*10)/10, height: Math.round(r.height*10)/10 };
      }
      return {
        card: get('.relative.rounded-lg'),
        btn: get('button.relative.px-8, a.relative.px-8'),
        gName: get('h1 span:first-child'),
        amp: get('h1 span:nth-child(2)'),
        bName: get('h1 span:last-child'),
        date: get('h1 + div + div'),
        guest: get('h1 + div + div + div p'),
        topFlower: get('img[src*="flower2-decoration"]:first-of-type'),
        botFlower: get('img[src*="flower2-decoration"]:last-of-type'),
      };
    })()
  `);
  console.log('CLONE MOBILE:', JSON.stringify(resM, null, 2));

  console.log("\n=== CLONE LAPTOP COVER ===");
  await c.setViewport({ width: 1440, height: 900, mobile: false, deviceScaleFactor: 1 });
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo", 2000);

  const resL = await c.eval(`
    (() => {
      function get(sel) {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { left: Math.round(r.left*10)/10, top: Math.round(r.top*10)/10, width: Math.round(r.width*10)/10, height: Math.round(r.height*10)/10 };
      }
      return {
        card: get('.relative.rounded-lg'),
        btn: get('button.relative.px-8, a.relative.px-8'),
        gName: get('h1 span:first-child'),
        amp: get('h1 span:nth-child(2)'),
        bName: get('h1 span:last-child'),
        date: get('h1 + div + div'),
        guest: get('h1 + div + div + div p'),
        topFlower: get('img[src*="flower2-decoration"]:first-of-type'),
        botFlower: get('img[src*="flower2-decoration"]:last-of-type'),
      };
    })()
  `);
  console.log('CLONE LAPTOP:', JSON.stringify(resL, null, 2));

  await c.close();
}

measureClone().catch(console.error);
