import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  const res = await c.eval(`
    (() => {
      const seal = document.querySelector('[title*="mở thiệp"], div[style*="radial-gradient"]');
      const R = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { tag: el.tagName, className: el.className, style: el.getAttribute('style'), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
      };
      return {
        seal: R(seal),
        parent: R(seal ? seal.parentElement : null),
        grandparent: R(seal && seal.parentElement ? seal.parentElement.parentElement : null)
      };
    })()
  `);
  console.log("Seal hierarchy:", JSON.stringify(res, null, 2));
  await c.close();
}

run().catch(console.error);
