import { ChromeController } from "./cdp_helper.mjs";

async function dumpCloneHTML() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 1500));

  const cloneData = await c.eval(`
    (() => {
      const bgs = [...document.querySelectorAll('*')].filter(el => {
        const cs = window.getComputedStyle(el);
        return cs.backgroundImage && cs.backgroundImage !== 'none';
      }).map(el => ({
        tag: el.tagName,
        className: el.className,
        bg: window.getComputedStyle(el).backgroundImage
      }));

      const imgs = [...document.querySelectorAll('img')].map(img => ({
        src: img.src.split('/').pop(),
        className: img.className
      }));

      return { bgs, imgs };
    })()
  `);

  console.log("Clone BGs:", cloneData.bgs);
  console.log("Clone Imgs:", cloneData.imgs);

  await c.close();
}

dumpCloneHTML().catch(console.error);
