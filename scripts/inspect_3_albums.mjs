import { ChromeController } from "./cdp_helper.mjs";

const targets = ["song-long-do", "hoang-kim-lam", "chibi-red"];
const c = new ChromeController();
await c.start();
await c.newPage();

for (const slug of targets) {
  try {
    await c.navigate(`https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1`, 4000);
    const data = await c.eval(`
      (() => {
        const allSections = Array.from(document.querySelectorAll('section, div'));
        const albumSec = allSections.find(s => s.innerText && (s.innerText.includes('ALBUM ẢNH') || s.innerText.includes('Album Ảnh')));
        if (!albumSec) return "No section found";
        const imgs = Array.from(albumSec.querySelectorAll('img')).filter(img => img.src && !img.src.includes('.svg') && !img.src.includes('arrow'));
        return {
          title: albumSec.querySelector('h1,h2,h3,h4')?.innerText,
          secClass: albumSec.className,
          imgCount: imgs.length,
          sampleImgParent: imgs[0]?.parentElement?.className,
          sampleImgStyle: imgs[0]?.parentElement?.getAttribute('style'),
          containerHtml: albumSec.innerHTML.slice(0, 600)
        };
      })()
    `);
    console.log(slug, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(slug, e);
  }
}

await c.close();
