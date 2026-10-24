import { ChromeController } from "./cdp_helper.mjs";

async function inspectCloneMinimalismDoDam() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  console.log("Navigating to http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo...");
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 3000);

  // Inspect cover DOM
  const coverInfo = await c.eval(`
    (() => {
      const openBtn = Array.from(document.querySelectorAll('a, button, [role="button"]')).map(b => {
        const r = b.getBoundingClientRect();
        const cs = window.getComputedStyle(b);
        return {
          tag: b.tagName,
          text: b.innerText ? b.innerText.trim() : '',
          className: b.className,
          rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
          bg: cs.backgroundColor || cs.background,
          color: cs.color
        };
      }).filter(b => b.text || b.rect.width > 30);

      const card = document.querySelector('[data-landing-screenshot-id="invite-envelope"]') || document.querySelector('.ienv-wrap') || document.querySelector('main > div');
      const cardRect = card ? card.getBoundingClientRect() : null;

      const images = Array.from(document.querySelectorAll('img')).map(img => {
        const r = img.getBoundingClientRect();
        return {
          src: img.src,
          className: img.className,
          rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) }
        };
      });

      return {
        title: document.title,
        cardRect: cardRect ? { top: Math.round(cardRect.top), left: Math.round(cardRect.left), width: Math.round(cardRect.width), height: Math.round(cardRect.height) } : null,
        images,
        openBtn
      };
    })()
  `);

  console.log("=== COVER INFO (CLONE) ===");
  console.log(JSON.stringify(coverInfo, null, 2));

  // Now click open
  console.log("Clicking open on clone site...");
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button, [role="button"]')).find(b => b.innerText && /mở thiệp/i.test(b.innerText)) || document.querySelector('[title*="mở thiệp"]');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2500));

  // Inspect opened DOM
  const openedInfo = await c.eval(`
    (() => {
      const sections = Array.from(document.querySelectorAll('section, [id^="invite-"]')).map(s => {
        const r = s.getBoundingClientRect();
        return {
          id: s.id,
          tag: s.tagName,
          rect: { top: Math.round(r.top + window.scrollY), height: Math.round(r.height) },
          h: Array.from(s.querySelectorAll('h1, h2, h3, h4')).map(h => h.innerText.replace(/\\s+/g, ' ').trim()).filter(Boolean)
        };
      });

      const audio = document.querySelector('audio');

      return {
        scrollHeight: document.documentElement.scrollHeight,
        audioSrc: audio ? audio.src : null,
        sections
      };
    })()
  `);

  console.log("\n=== OPENED INFO (CLONE) ===");
  console.log(JSON.stringify(openedInfo, null, 2));

  await c.close();
}

inspectCloneMinimalismDoDam().catch(console.error);
