import { ChromeController } from "./cdp_helper.mjs";

async function dumpRealAssets() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 3000);

  // Click open
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));

  const realImgs = await c.eval(`
    (() => {
      return Array.from(document.querySelectorAll('img, [style*="background-image"]')).map(el => {
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          src: el.src || null,
          bg: cs.backgroundImage !== 'none' ? cs.backgroundImage : null,
          className: el.className,
          style: el.getAttribute('style'),
          rect: { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) },
          opacity: cs.opacity
        };
      });
    })()
  `);

  console.log("=== REAL OPENED IMAGES / BACKGROUNDS ===");
  realImgs.forEach(i => console.log(i));

  console.log("\n=== CLONE OPENED IMAGES / BACKGROUNDS ===");
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 3000);
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));

  const cloneImgs = await c.eval(`
    (() => {
      return Array.from(document.querySelectorAll('img, [style*="background-image"]')).map(el => {
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          src: el.src || null,
          bg: cs.backgroundImage !== 'none' ? cs.backgroundImage : null,
          className: el.className,
          style: el.getAttribute('style'),
          rect: { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) },
          opacity: cs.opacity
        };
      });
    })()
  `);
  cloneImgs.forEach(i => console.log(i));

  await c.close();
}

dumpRealAssets().catch(console.error);
