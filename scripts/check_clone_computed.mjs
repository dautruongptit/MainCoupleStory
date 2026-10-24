import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  const res = await c.eval(`
    (() => {
      const card = document.querySelector('.relative.w-\\\\[310px\\\\]') || document.querySelector('.envelope-card');
      const seal = document.querySelector('[title*="mở thiệp"], div[style*="radial-gradient"]');
      const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp'));

      const R = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
      };

      return {
        card: R(card),
        seal: R(seal),
        btn: R(btn)
      };
    })()
  `);
  console.log("Clone Rects:", res);
  await c.close();
}

run().catch(console.error);
