import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  console.log("=== REAL COVER HIERARCHY ===");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  const realH = await c.eval(`
    (() => {
      const seal = document.querySelector('[title*="mở thiệp"], div[style*="radial-gradient"]');
      let cur = seal;
      const path = [];
      while (cur && cur !== document.body) {
        const r = cur.getBoundingClientRect();
        path.push({
          tag: cur.tagName,
          className: cur.className,
          style: cur.getAttribute('style') || '',
          rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
        });
        cur = cur.parentElement;
      }
      return path;
    })()
  `);
  console.log(JSON.stringify(realH, null, 2));

  console.log("\n=== CLONE COVER HIERARCHY ===");
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  const cloneH = await c.eval(`
    (() => {
      const seal = document.querySelector('[title*="mở thiệp"], div[style*="radial-gradient"]');
      let cur = seal;
      const path = [];
      while (cur && cur !== document.body) {
        const r = cur.getBoundingClientRect();
        path.push({
          tag: cur.tagName,
          className: cur.className,
          style: cur.getAttribute('style') || '',
          rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
        });
        cur = cur.parentElement;
      }
      return path;
    })()
  `);
  console.log(JSON.stringify(cloneH, null, 2));

  await c.close();
}

run().catch(console.error);
