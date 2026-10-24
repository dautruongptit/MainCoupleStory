import { ChromeController } from "./cdp_helper.mjs";

async function compareCardContent() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  console.log("=== REAL CARD CHILDREN ===");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  const realChildren = await c.eval(`
    (() => {
      const card = document.querySelector('.relative.w-\\\\[310px\\\\], .envelope-card') || document.querySelector('[data-landing-screenshot-id="invite-envelope"] > div > div:last-child');
      const inner = card ? card.querySelector('.relative.z-10') || card : null;
      if (!inner) return null;
      return Array.from(inner.children).map(ch => ({
        tag: ch.tagName,
        className: ch.className,
        style: ch.getAttribute('style') || '',
        text: ch.innerText ? ch.innerText.replace(/\\s+/g, ' ').trim() : '',
        rect: { y: Math.round(ch.getBoundingClientRect().y), h: Math.round(ch.getBoundingClientRect().height) }
      }));
    })()
  `);
  console.log(JSON.stringify(realChildren, null, 2));

  console.log("\n=== CLONE CARD CHILDREN ===");
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  const cloneChildren = await c.eval(`
    (() => {
      const card = document.querySelector('.relative.w-\\\\[310px\\\\], .envelope-card') || document.querySelector('[data-landing-screenshot-id="invite-envelope"] > div > div:last-child');
      const inner = card ? card.querySelector('.relative.z-10') || card : null;
      if (!inner) return null;
      return Array.from(inner.children).map(ch => ({
        tag: ch.tagName,
        className: ch.className,
        style: ch.getAttribute('style') || '',
        text: ch.innerText ? ch.innerText.replace(/\\s+/g, ' ').trim() : '',
        rect: { y: Math.round(ch.getBoundingClientRect().y), h: Math.round(ch.getBoundingClientRect().height) }
      }));
    })()
  `);
  console.log(JSON.stringify(cloneChildren, null, 2));

  await c.close();
}

compareCardContent().catch(console.error);
