import { ChromeController } from "./cdp_helper.mjs";

const c = new ChromeController();
await c.start();
await c.newPage();

const testSlugs = [
  "song-hy-xanh",
  "song-hy-do",
  "song-long-do",
  "song-phung-do",
  "baroque-v2-do-dam",
  "long-phung-do",
  "hoang-kim-do"
];

for (const slug of testSlugs) {
  await c.navigate(`https://chungdoi.com/vi/mau-thiep/${slug}/demo`, 2500);
  const info = await c.eval(`
    (() => {
      const el = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
      if (!el) return null;
      // find element that has background color inside card
      const inner = el.querySelector('.absolute.inset-0.rounded-lg, .absolute.inset-0');
      const h1 = el.querySelector('h1');
      const btn = el.querySelector('a, button');
      return {
        cardBg: inner ? window.getComputedStyle(inner).backgroundColor : null,
        cardBgImage: inner ? window.getComputedStyle(inner).backgroundImage : null,
        h1Color: h1 ? window.getComputedStyle(h1).color : null,
        btnBg: btn ? window.getComputedStyle(btn).backgroundColor : null,
        btnColor: btn ? window.getComputedStyle(btn).color : null,
      };
    })()
  `);
  console.log(`${slug}:`, info);
}

await c.close();
