import { ChromeController } from "./cdp_helper.mjs";

const c = new ChromeController();
await c.start();
await c.newPage();

const testSlugs = [
  "minimalism-do-dam",
  "minimalism-nau",
  "to-duyen-xanh",
  "song-hy-xanh",
  "long-phung-v2-do",
  "baroque-v2-do-dam",
  "mai-lan-trang",
  "bach-su-do"
];

for (const slug of testSlugs) {
  await c.navigate(`https://chungdoi.com/vi/mau-thiep/${slug}/demo`, 2500);
  const info = await c.eval(`
    (() => {
      const btn = document.querySelector('[data-landing-screenshot-id="invite-envelope"] button');
      if (!btn) return { error: 'btn not found' };
      const comp = window.getComputedStyle(btn);
      return {
        bg: comp.backgroundColor,
        backgroundImage: comp.backgroundImage,
        color: comp.color,
        borderRadius: comp.borderRadius,
        boxShadow: comp.boxShadow,
        fontFamily: comp.fontFamily
      };
    })()
  `);
  console.log(`Button for ${slug}:`, info);
}

await c.close();
