import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function inspect(url) {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });
  await c.navigate(url, 4000);

  const data = await c.eval(`
    (() => {
      const results = {};
      const els = document.querySelectorAll('header *');
      for (const el of els) {
        if (el.tagName === 'IMG' || el.className.includes('aspect') || el.className.includes('w-') || el.className.includes('mt-')) {
          const rect = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          const key = (el.src ? el.src.split('/').pop() : el.className.slice(0, 30)) + '_' + el.tagName;
          results[key] = {
            tag: el.tagName,
            src: el.src || '',
            className: el.className,
            rect: {
              top: Math.round(rect.top),
              left: Math.round(rect.left),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            },
            computed: {
              width: cs.width,
              height: cs.height,
              aspectRatio: cs.aspectRatio,
              transform: cs.transform,
              zIndex: cs.zIndex,
              position: cs.position,
              marginTop: cs.marginTop,
              padding: cs.padding,
            }
          };
        }
      }
      return results;
    })()
  `);

  await c.close();
  return data;
}

async function main() {
  console.log("Inspecting real...");
  const real = await inspect("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo?open=1");
  console.log("Inspecting clone...");
  const clone = await inspect("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo?open=1");

  fs.writeFileSync("docs/header_dims_diff.json", JSON.stringify({ real, clone }, null, 2));
  console.log("Saved docs/header_dims_diff.json");
}

main().catch(console.error);
