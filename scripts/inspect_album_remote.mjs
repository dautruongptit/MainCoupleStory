import { ChromeController } from "./cdp_helper.mjs";

const c = new ChromeController();
await c.start();
await c.newPage();

try {
  await c.navigate("https://chungdoi.com/vi/mau-thiep/bach-su-do/demo?open=1", 4500);
  const albumHtml = await c.eval(`
    (() => {
      const allSections = Array.from(document.querySelectorAll('section'));
      const albumSec = allSections.find(s => s.innerText.includes('ALBUM') || s.querySelector('h1,h2,h3')?.innerText?.includes('ALBUM'));
      if (!albumSec) return "Not found";
      return {
        outerHTML: albumSec.outerHTML.slice(0, 2000),
        classes: albumSec.className,
        style: albumSec.getAttribute('style'),
        childrenSummary: Array.from(albumSec.children).map(c => ({
          tag: c.tagName,
          className: c.className,
          style: c.getAttribute('style'),
          html: c.outerHTML.slice(0, 400)
        }))
      };
    })()
  `);
  console.log("Album Section:", JSON.stringify(albumHtml, null, 2));
} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
