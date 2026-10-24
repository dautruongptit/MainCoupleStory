import { ChromeController } from "./cdp_helper.mjs";

async function inspectMinimalismDoDam() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  console.log("Navigating to https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 3000);

  // Inspect cover DOM
  const coverInfo = await c.eval(`
    (() => {
      // Find all images
      const images = Array.from(document.querySelectorAll('img')).map(img => {
        const r = img.getBoundingClientRect();
        return {
          src: img.src,
          className: img.className,
          style: img.getAttribute('style') || '',
          rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) }
        };
      });

      // Find seal / open button
      const openBtn = Array.from(document.querySelectorAll('a, button, [role="button"]')).map(b => {
        const r = b.getBoundingClientRect();
        const cs = window.getComputedStyle(b);
        return {
          tag: b.tagName,
          text: b.innerText ? b.innerText.trim() : '',
          className: b.className,
          rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
          bg: cs.backgroundColor || cs.background,
          color: cs.color,
          animation: cs.animation
        };
      }).filter(b => b.text || b.rect.width > 30);

      // Card container rect
      const card = document.querySelector('[data-landing-screenshot-id="invite-envelope"]') || document.querySelector('.ienv-wrap') || document.querySelector('main > div') || document.body.firstElementChild;
      const cardRect = card ? card.getBoundingClientRect() : null;

      // Animations on cover
      const anims = document.getAnimations().map(a => {
        const t = a.effect && a.effect.target;
        return {
          name: a.animationName,
          playState: a.playState,
          targetTag: t ? t.tagName : null,
          targetClass: t ? t.className : null
        };
      });

      return {
        title: document.title,
        cardRect: cardRect ? { top: Math.round(cardRect.top), left: Math.round(cardRect.left), width: Math.round(cardRect.width), height: Math.round(cardRect.height) } : null,
        images,
        openBtn,
        anims: anims.slice(0, 15)
      };
    })()
  `);

  console.log("=== COVER INFO (REAL) ===");
  console.log(JSON.stringify(coverInfo, null, 2));

  // Now click open
  console.log("Clicking open on real site...");
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button, [role="button"]')).find(b => b.innerText && /mở thiệp/i.test(b.innerText));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2500));

  // Inspect opened DOM
  const openedInfo = await c.eval(`
    (() => {
      // Find all decoration images
      const images = Array.from(document.querySelectorAll('img')).map(img => {
        const r = img.getBoundingClientRect();
        return {
          src: img.src,
          alt: img.alt,
          className: img.className,
          rect: { top: Math.round(r.top + window.scrollY), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) }
        };
      });

      // Backgrounds
      const bgs = [];
      document.querySelectorAll('*').forEach(el => {
        const bg = window.getComputedStyle(el).backgroundImage;
        if (bg && bg !== 'none') {
          bgs.push({ tag: el.tagName, id: el.id, className: el.className, bg: bg.slice(0, 100) });
        }
      });

      // Sections
      const sections = Array.from(document.querySelectorAll('section, [id^="invite-"]')).map(s => {
        const r = s.getBoundingClientRect();
        return {
          id: s.id,
          tag: s.tagName,
          rect: { top: Math.round(r.top + window.scrollY), height: Math.round(r.height) },
          h: Array.from(s.querySelectorAll('h1, h2, h3, h4')).map(h => h.innerText.replace(/\\s+/g, ' ').trim()).filter(Boolean)
        };
      });

      // Music player
      const audio = document.querySelector('audio');
      const audioBtn = Array.from(document.querySelectorAll('button, div')).find(el => {
        const cs = window.getComputedStyle(el);
        return cs.position === 'fixed' && (el.querySelector('svg') || el.innerText.includes('nhạc'));
      });

      return {
        scrollHeight: document.documentElement.scrollHeight,
        audioSrc: audio ? audio.src : null,
        audioBtn: audioBtn ? { className: audioBtn.className, style: audioBtn.getAttribute('style') } : null,
        images: images.filter(i => !i.src.includes('avatar') && !i.src.includes('photo-library')),
        bgs: bgs.slice(0, 8),
        sections
      };
    })()
  `);

  console.log("\n=== OPENED INFO (REAL) ===");
  console.log(JSON.stringify(openedInfo, null, 2));

  await c.close();
}

inspectMinimalismDoDam().catch(console.error);
