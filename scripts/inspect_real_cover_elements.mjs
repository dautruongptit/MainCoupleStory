import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  console.log("Navigating to https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 3000);

  const initial = await c.eval(`
    (() => {
      const openBtn = Array.from(document.querySelectorAll('a, button, div')).find(x => x.innerText && x.innerText.trim() === 'Mở thiệp');
      const seal = document.querySelector('[title*="mở thiệp"], div[style*="radial-gradient"]');
      const envelope = document.querySelector('[data-landing-screenshot-id="invite-envelope"]') || document.querySelector('.envelope-screen') || document.querySelector('.fixed.inset-0');
      
      const R = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
      };

      return {
        openBtn: openBtn ? { tag: openBtn.tagName, className: openBtn.className, rect: R(openBtn) } : null,
        seal: seal ? { tag: seal.tagName, style: seal.getAttribute('style'), rect: R(seal) } : null,
        envelope: envelope ? { tag: envelope.tagName, className: envelope.className, rect: R(envelope) } : null,
        bodyOverflow: window.getComputedStyle(document.body).overflow
      };
    })()
  `);
  console.log("=== REAL INITIAL COVER ===", initial);

  console.log("Clicking Mở thiệp...");
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button, div')).find(x => x.innerText && x.innerText.trim() === 'Mở thiệp');
      if (btn) btn.click();
    })()
  `);

  // Wait 100ms, 300ms, 600ms, 1200ms to monitor transition
  for (const ms of [100, 300, 600, 1200]) {
    await new Promise(r => setTimeout(r, ms));
    const step = await c.eval(`
      (() => {
        const anims = document.getAnimations().map(a => ({ name: a.animationName, state: a.playState }));
        const scrollH = document.documentElement.scrollHeight;
        const scrollY = window.scrollY;
        return { ms: ${ms}, anims: anims.slice(0, 5), scrollH, scrollY };
      })()
    `);
    console.log(`Transition at +${ms}ms:`, step);
  }

  // After open
  const opened = await c.eval(`
    (() => {
      const scrollH = document.documentElement.scrollHeight;
      const sections = Array.from(document.querySelectorAll('section, header')).map(s => {
        const r = s.getBoundingClientRect();
        const h = Array.from(s.querySelectorAll('h1, h2, h3, h4')).map(x => x.innerText.trim()).filter(Boolean);
        return {
          tag: s.tagName,
          rect: { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) },
          heading: h.slice(0, 2)
        };
      });
      return { scrollH, sections };
    })()
  `);
  console.log("=== REAL OPENED STATE ===", JSON.stringify(opened, null, 2));

  await c.close();
}

run().catch(console.error);
