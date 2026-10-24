import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();

  console.log("=================================================");
  console.log("     1. MOBILE 390x844: OPENED TEMPLATE          ");
  console.log("=================================================");
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);

  const cloneM = await c.eval(`
    (() => {
      const root = document.querySelector('[data-showcase-root]');
      if (!root) return { error: 'No data-showcase-root found!' };
      const children = Array.from(root.children).filter(ch => ch.tagName !== 'STYLE');
      return {
        sh: document.documentElement.scrollHeight,
        rootRect: root.getBoundingClientRect(),
        children: children.map((ch, i) => {
          const r = ch.getBoundingClientRect();
          const h = ch.querySelector('h1, h2, h3, h4');
          return {
            i,
            tag: ch.tagName,
            cls: ch.className,
            heading: h ? h.textContent.trim().replace(/\\s+/g, ' ') : null,
            rect: { left: Math.round(r.left*10)/10, top: Math.round(r.top*10)/10, width: Math.round(r.width*10)/10, height: Math.round(r.height*10)/10 }
          };
        })
      };
    })()
  `);

  console.log("Clone M Children Count:", cloneM.children?.length);
  if (cloneM.children) {
    cloneM.children.forEach(ch => {
      console.log(`[${ch.i}] <${ch.tag}> (${ch.heading || 'No heading'}): left=${ch.rect.left}, top=${ch.rect.top}, w=${ch.rect.width}, h=${ch.rect.height}`);
    });
  } else {
    console.log(cloneM);
  }

  console.log("\n=================================================");
  console.log("     2. LAPTOP 1440x900: OPENED TEMPLATE         ");
  console.log("=================================================");
  await c.setViewport({ width: 1440, height: 900, mobile: false, deviceScaleFactor: 1 });
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);

  const cloneL = await c.eval(`
    (() => {
      const root = document.querySelector('[data-showcase-root]');
      if (!root) return { error: 'No data-showcase-root found!' };
      const children = Array.from(root.children).filter(ch => ch.tagName !== 'STYLE');
      return {
        sh: document.documentElement.scrollHeight,
        rootRect: root.getBoundingClientRect(),
        children: children.map((ch, i) => {
          const r = ch.getBoundingClientRect();
          const h = ch.querySelector('h1, h2, h3, h4');
          return {
            i,
            tag: ch.tagName,
            cls: ch.className,
            heading: h ? h.textContent.trim().replace(/\\s+/g, ' ') : null,
            rect: { left: Math.round(r.left*10)/10, top: Math.round(r.top*10)/10, width: Math.round(r.width*10)/10, height: Math.round(r.height*10)/10 }
          };
        })
      };
    })()
  `);

  console.log("Clone L Children Count:", cloneL.children?.length);
  if (cloneL.children) {
    cloneL.children.forEach(ch => {
      console.log(`[${ch.i}] <${ch.tag}> (${ch.heading || 'No heading'}): left=${ch.rect.left}, top=${ch.rect.top}, w=${ch.rect.width}, h=${ch.rect.height}`);
    });
  }

  await c.close();
}

run().catch(console.error);
