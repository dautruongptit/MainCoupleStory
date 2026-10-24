import { ChromeController } from "./cdp_helper.mjs";

async function measureBoth() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();

  const results = {
    mobile: { real: null, clone: null },
    laptop: { real: null, clone: null },
  };

  const measurePage = async (url, isOpenTrigger) => {
    await c.navigate(url, 3000);

    // Initial / Cover state
    const cover = await c.eval(`
      (() => {
        const d = document, W = window, de = d.documentElement;
        const R = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: Math.round(r.x), y: Math.round(r.y + W.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
        };

        const hasEnvelopeModal = !!d.querySelector('[data-landing-screenshot-id="invite-envelope"], .ienv-wrap, .darkred-env-screen');
        const openBtn = Array.from(d.querySelectorAll('button, a, [role="button"]')).find(b => b.innerText && /mở thiệp/i.test(b.innerText));
        const seal = d.querySelector('[title*="mở thiệp"], .wax-seal, div[style*="radial-gradient"]');
        
        // Particles
        const particles = Array.from(d.querySelectorAll('[style*="ambient"]')).map(p => ({
          style: p.getAttribute('style'),
          rect: R(p)
        }));

        // Giftbox / Envelope at bottom of opened card
        const giftBtn = d.querySelector('[aria-label*="hộp mừng cưới"], [aria-label*="Hộp mừng"], .ienv-sparkle, .igb-wrap');

        return {
          hasEnvelopeModal,
          coverCard: R(d.querySelector('.envelope-card, .darkred-env-screen .relative.rounded-lg, [data-landing-screenshot-id="invite-envelope"] > div')),
          seal: R(seal),
          openBtn: openBtn ? { text: openBtn.innerText.trim(), rect: R(openBtn), bg: W.getComputedStyle(openBtn).backgroundColor } : null,
          nParticles: particles.length,
          giftType: d.querySelector('.ienv-back') ? 'ienv (phong bì)' : d.querySelector('.igb-box') ? 'igb (hộp quà)' : 'none',
          scrollHeight: de.scrollHeight
        };
      })()
    `);

    // If there's an open button, trigger it
    if (isOpenTrigger) {
      await c.eval(`
        (() => {
          const btn = Array.from(document.querySelectorAll('button, a, [role="button"]')).find(b => b.innerText && /mở thiệp/i.test(b.innerText)) || document.querySelector('[title*="mở thiệp"]');
          if (btn) btn.click();
        })()
      `);
      await new Promise(r => setTimeout(r, 2000));
    }

    // Scroll down to load all images/lazy sections
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

    // Opened state
    const opened = await c.eval(`
      (() => {
        const d = document, W = window, de = d.documentElement;
        const R = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: Math.round(r.x), y: Math.round(r.y + W.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
        };

        const sections = Array.from(d.querySelectorAll('section, header, [id^="invite-"]')).map(s => {
          const h = Array.from(s.querySelectorAll('h1, h2, h3, h4, p.text-center')).map(x => x.innerText.replace(/\\s+/g, ' ').trim()).filter(Boolean);
          return {
            tag: s.tagName,
            rect: R(s),
            heading: h.slice(0, 3)
          };
        });

        // Theme background
        const bgs = [];
        d.querySelectorAll('*').forEach(el => {
          const cs = W.getComputedStyle(el);
          if (cs.backgroundImage && cs.backgroundImage.includes('paper.webp')) {
            bgs.push({ tag: el.tagName, className: el.className, bg: cs.backgroundImage });
          }
        });

        // Music player
        const musicWrap = d.querySelector('.music-floating-wrap, .music-floating-btn, button[aria-label*="nhạc"], div[style*="fixed"][style*="bottom"]');
        const pingRing = d.querySelector('.music-ping-ring, .animate-ping, .animate-ping-slow');

        // Bottom Gift box / Envelope
        const giftCard = d.querySelector('.ienv-back, .igb-box, button[aria-label*="mừng cưới"]');

        return {
          scrollHeight: de.scrollHeight,
          contentWidth: de.clientWidth,
          sections,
          paperBg: bgs.length > 0 ? bgs[0] : null,
          hasMusic: !!musicWrap,
          musicPing: !!pingRing,
          giftCard: R(giftCard)
        };
      })()
    `);

    return { cover, opened };
  };

  // --- MOBILE (390x844) ---
  console.log("Measuring Mobile 390x844...");
  await c.setViewport({ width: 390, height: 844, mobile: true });
  console.log("Real Mobile...");
  results.mobile.real = await measurePage("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", false);
  console.log("Clone Mobile...");
  results.mobile.clone = await measurePage("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", true);

  // --- LAPTOP (1440x900) ---
  console.log("Measuring Laptop 1440x900...");
  await c.setViewport({ width: 1440, height: 900, mobile: false });
  console.log("Real Laptop...");
  results.laptop.real = await measurePage("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", false);
  console.log("Clone Laptop...");
  results.laptop.clone = await measurePage("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", true);

  await c.close();
  return results;
}

measureBoth().then(res => {
  console.log("\n================ FULL AUDIT RESULT ================");
  console.log(JSON.stringify(res, null, 2));
}).catch(console.error);
