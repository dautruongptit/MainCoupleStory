import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  // 1. Real Opened
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));

  const realOpened = await c.eval(`
    (() => {
      const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        className: img.className,
        style: img.getAttribute('style'),
        rect: {
          top: img.getBoundingClientRect().top + window.scrollY,
          left: img.getBoundingClientRect().left,
          width: img.getBoundingClientRect().width,
          height: img.getBoundingClientRect().height
        }
      }));
      const bgEls = Array.from(document.querySelectorAll('*')).filter(el => {
        const bg = window.getComputedStyle(el).backgroundImage;
        return bg && bg !== 'none';
      }).map(el => ({
        tag: el.tagName,
        className: el.className,
        bg: window.getComputedStyle(el).backgroundImage,
        rect: {
          top: el.getBoundingClientRect().top + window.scrollY,
          left: el.getBoundingClientRect().left,
          width: el.getBoundingClientRect().width,
          height: el.getBoundingClientRect().height
        }
      }));
      return { imgs, bgEls };
    })()
  `);
  fs.writeFileSync("docs/real_opened_imgs.json", JSON.stringify(realOpened, null, 2));

  // 2. Clone Opened
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));

  const cloneOpened = await c.eval(`
    (() => {
      const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        className: img.className,
        style: img.getAttribute('style'),
        rect: {
          top: img.getBoundingClientRect().top + window.scrollY,
          left: img.getBoundingClientRect().left,
          width: img.getBoundingClientRect().width,
          height: img.getBoundingClientRect().height
        }
      }));
      const bgEls = Array.from(document.querySelectorAll('*')).filter(el => {
        const bg = window.getComputedStyle(el).backgroundImage;
        return bg && bg !== 'none';
      }).map(el => ({
        tag: el.tagName,
        className: el.className,
        bg: window.getComputedStyle(el).backgroundImage,
        rect: {
          top: el.getBoundingClientRect().top + window.scrollY,
          left: el.getBoundingClientRect().left,
          width: el.getBoundingClientRect().width,
          height: el.getBoundingClientRect().height
        }
      }));
      return { imgs, bgEls };
    })()
  `);
  fs.writeFileSync("docs/clone_opened_imgs.json", JSON.stringify(cloneOpened, null, 2));
  console.log("Finished capturing opened imgs & bgEls!");
}

run();
