import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function run() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  // 1. REAL SITE
  console.log("Loading real site...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 3000);
  // Click open button
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button')).find(x => x.innerText && x.innerText.includes('Mở thiệp'));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));

  const realMetrics = await c.eval(`
    (() => {
      const all = Array.from(document.querySelectorAll('*'));
      return all.map(el => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: el.className,
          id: el.getAttribute('data-landing-screenshot-id') || '',
          src: el.src ? el.src.split('/').pop() : '',
          text: el.children.length === 0 && el.innerText ? el.innerText.trim() : '',
          top: Math.round(r.top),
          left: Math.round(r.left),
          width: Math.round(r.width),
          height: Math.round(r.height),
          cssWidth: window.getComputedStyle(el).width,
          cssHeight: window.getComputedStyle(el).height,
          transform: window.getComputedStyle(el).transform,
        };
      }).filter(x => x.width > 0 && x.height > 0 && (x.src || x.className.includes('aspect') || x.className.includes('mt-') || x.tag === 'HEADER' || x.tag === 'SECTION'));
    })()
  `);

  // 2. CLONE SITE
  console.log("Loading clone site...");
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button')).find(x => x.innerText && x.innerText.includes('Mở thiệp'));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));

  const cloneMetrics = await c.eval(`
    (() => {
      const all = Array.from(document.querySelectorAll('*'));
      return all.map(el => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: el.className,
          id: el.getAttribute('data-landing-screenshot-id') || '',
          src: el.src ? el.src.split('/').pop() : '',
          text: el.children.length === 0 && el.innerText ? el.innerText.trim() : '',
          top: Math.round(r.top),
          left: Math.round(r.left),
          width: Math.round(r.width),
          height: Math.round(r.height),
          cssWidth: window.getComputedStyle(el).width,
          cssHeight: window.getComputedStyle(el).height,
          transform: window.getComputedStyle(el).transform,
        };
      }).filter(x => x.width > 0 && x.height > 0 && (x.src || x.className.includes('aspect') || x.className.includes('mt-') || x.tag === 'HEADER' || x.tag === 'SECTION'));
    })()
  `);

  fs.writeFileSync("docs/metrics_comparison.json", JSON.stringify({ real: realMetrics, clone: cloneMetrics }, null, 2));
  console.log("Real items:", realMetrics.length, "Clone items:", cloneMetrics.length);

  await c.close();
}

run().catch(console.error);
