import { ChromeController } from "./cdp_helper.mjs";

const targets = ["bach-su-do", "hoa-tinh-do", "song-long-do", "hoang-kim-lam", "chibi-red"];
const c = new ChromeController();
await c.start();
await c.newPage();

const results = {};

for (const slug of targets) {
  try {
    console.log(`Navigating to ${slug}...`);
    await c.navigate(`https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1`, 4000);
    const data = await c.eval(`
      (() => {
        const allSections = Array.from(document.querySelectorAll('section, div[id*="album" i]'));
        const albumSec = allSections.find(s => s.innerText.includes('ALBUM') || s.querySelector('h1,h2,h3')?.innerText?.includes('ALBUM'));
        if (!albumSec) return null;
        const h = albumSec.querySelector('h1,h2,h3,h4');
        const grid = albumSec.querySelector('.grid, [class*="grid" i], [class*="layout" i], [class*="carousel" i], [class*="swiper" i]');
        const imgs = Array.from(albumSec.querySelectorAll('img')).map(img => ({
          src: img.src?.slice(0, 80),
          aspectRatio: window.getComputedStyle(img.parentElement).aspectRatio || window.getComputedStyle(img).aspectRatio,
          parentClass: img.parentElement?.className?.slice(0, 80)
        }));
        return {
          title: h?.innerText,
          sectionClass: albumSec.className,
          sectionStyle: albumSec.getAttribute('style'),
          containerClass: grid?.className,
          imgCount: imgs.length,
          imgs: imgs.slice(0, 4)
        };
      })()
    `);
    results[slug] = data;
  } catch (e) {
    console.error(`Error on ${slug}:`, e);
  }
  await new Promise(r => setTimeout(r, 2000));
}

console.log(JSON.stringify(results, null, 2));
await c.close();
