import { ChromeController } from "./cdp_helper.mjs";

const targets = ["song-long-do", "hoang-kim-lam", "chibi-red"];
const c = new ChromeController();
await c.start();
await c.newPage();

for (const slug of targets) {
  try {
    await c.navigate(`https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1`, 4000);
    const headings = await c.eval(`
      Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, [class*="heading" i], [class*="title" i]')).map(h => h.innerText.trim()).filter(Boolean)
    `);
    console.log(slug, "headings:", headings);
  } catch (e) {
    console.error(slug, e);
  }
}

await c.close();
