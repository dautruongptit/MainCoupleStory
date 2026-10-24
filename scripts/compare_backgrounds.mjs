import { ChromeController } from "./cdp_helper.mjs";

async function compareBackgrounds() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();

  const inspectBgs = async (url, isOpen) => {
    await c.navigate(url, 3000);
    if (isOpen) {
      await c.eval(`
        (() => {
          const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
          if (btn) btn.click();
        })()
      `);
      await new Promise(r => setTimeout(r, 2000));
    }

    return await c.eval(`
      (() => {
        const getBg = (el) => {
          if (!el) return null;
          const cs = window.getComputedStyle(el);
          return {
            tag: el.tagName,
            className: el.className,
            bgColor: cs.backgroundColor,
            bgImage: cs.backgroundImage,
            bgSize: cs.backgroundSize,
            bgPosition: cs.backgroundPosition,
            bgRepeat: cs.backgroundRepeat,
            opacity: cs.opacity,
            mixBlendMode: cs.mixBlendMode
          };
        };

        const list = [];
        // Check html, body, main, root, wrapper
        list.push({ label: 'html', ...getBg(document.documentElement) });
        list.push({ label: 'body', ...getBg(document.body) });
        
        const outerWrap = document.querySelector('.demo-standalone-wrap, .pv-wrapper, main, #root');
        if (outerWrap) list.push({ label: 'outerWrap', ...getBg(outerWrap) });

        // Find all elements with background-image
        document.querySelectorAll('*').forEach(el => {
          const cs = window.getComputedStyle(el);
          if (cs.backgroundImage && cs.backgroundImage !== 'none') {
            const r = el.getBoundingClientRect();
            list.push({
              label: 'element-with-bg',
              rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
              ...getBg(el)
            });
          }
        });

        return list;
      })()
    `);
  };

  console.log("=== REAL COVER BACKGROUNDS ===");
  const realCover = await inspectBgs("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", false);
  console.log(JSON.stringify(realCover, null, 2));

  console.log("\n=== CLONE COVER BACKGROUNDS ===");
  const cloneCover = await inspectBgs("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", false);
  console.log(JSON.stringify(cloneCover, null, 2));

  console.log("\n=== REAL OPENED BACKGROUNDS ===");
  const realOpened = await inspectBgs("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", true);
  console.log(JSON.stringify(realOpened, null, 2));

  console.log("\n=== CLONE OPENED BACKGROUNDS ===");
  const cloneOpened = await inspectBgs("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", true);
  console.log(JSON.stringify(cloneOpened, null, 2));

  await c.close();
}

compareBackgrounds().catch(console.error);
