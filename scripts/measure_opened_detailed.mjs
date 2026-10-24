import { ChromeController } from "./cdp_helper.mjs";

async function measureOpenedDetailed() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();

  const runOne = async (url, vp) => {
    await c.setViewport(vp);
    await c.navigate(url, 3000);

    // Click open if on cover
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to bottom
    await c.eval(`
      new Promise(resolve => {
        let total = 0;
        const step = 600;
        const timer = setInterval(() => {
          window.scrollBy(0, step);
          total += step;
          if (total >= document.documentElement.scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            setTimeout(resolve, 500);
          }
        }, 50);
      })
    `);

    return await c.eval(`
      (() => {
        const d = document, W = window, de = d.documentElement;
        const R = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: Math.round(r.x), y: Math.round(r.y + W.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
        };

        const sections = Array.from(d.querySelectorAll('header, section, [id^="invite-"]')).map(s => {
          const h = Array.from(s.querySelectorAll('h1, h2, h3, h4, p.text-center, p.uppercase')).map(x => x.innerText.replace(/\\s+/g, ' ').trim()).filter(Boolean);
          return {
            tag: s.tagName,
            id: s.id,
            rect: R(s),
            heading: h.slice(0, 2)
          };
        });

        // Theme background
        const bgEl = d.querySelector('.paper-texture, [style*="paper.webp"]');
        const bg = bgEl ? window.getComputedStyle(bgEl).backgroundImage : null;

        // Audio
        const audio = d.querySelector('audio');
        const musicBtn = d.querySelector('.music-floating-wrap, .music-floating-btn, button[aria-label*="nhạc"]');

        return {
          scrollHeight: de.scrollHeight,
          contentWidth: de.clientWidth,
          sections,
          bg,
          hasAudio: !!audio,
          hasMusicBtn: !!musicBtn
        };
      })()
    `);
  };

  console.log("Measuring Mobile Real...");
  const realMobile = await runOne("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", { width: 390, height: 844, mobile: true });
  console.log("Measuring Mobile Clone...");
  const cloneMobile = await runOne("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", { width: 390, height: 844, mobile: true });

  console.log("Measuring Laptop Real...");
  const realLaptop = await runOne("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", { width: 1440, height: 900, mobile: false });
  console.log("Measuring Laptop Clone...");
  const cloneLaptop = await runOne("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", { width: 1440, height: 900, mobile: false });

  await c.close();

  console.log("\n=== MOBILE REAL ===");
  console.log(JSON.stringify(realMobile, null, 2));
  console.log("\n=== MOBILE CLONE ===");
  console.log(JSON.stringify(cloneMobile, null, 2));

  console.log("\n=== LAPTOP REAL ===");
  console.log(JSON.stringify(realLaptop, null, 2));
  console.log("\n=== LAPTOP CLONE ===");
  console.log(JSON.stringify(cloneLaptop, null, 2));
}

measureOpenedDetailed().catch(console.error);
