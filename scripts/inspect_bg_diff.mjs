import fs from "fs";

// Let's inspect the HTML and CSS of both covers on desktop
import { ChromeController } from "./cdp_helper.mjs";

async function inspectBgDiff() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 1440, height: 900, mobile: false });

  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  const realCoverBg = await c.eval(`
    (() => {
      const envelope = document.querySelector('[data-landing-screenshot-id="invite-envelope"]') || document.querySelector('.fixed.inset-0');
      const cs = envelope ? window.getComputedStyle(envelope) : null;
      return {
        bg: cs ? cs.background : null,
        bgImage: cs ? cs.backgroundImage : null,
        bgColor: cs ? cs.backgroundColor : null,
        htmlBg: window.getComputedStyle(document.documentElement).backgroundColor,
        bodyBg: window.getComputedStyle(document.body).backgroundColor
      };
    })()
  `);
  console.log("Real Cover BG:", realCoverBg);

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  const cloneCoverBg = await c.eval(`
    (() => {
      const envelope = document.querySelector('[data-landing-screenshot-id="invite-envelope"]') || document.querySelector('.fixed.inset-0');
      const cs = envelope ? window.getComputedStyle(envelope) : null;
      return {
        bg: cs ? cs.background : null,
        bgImage: cs ? cs.backgroundImage : null,
        bgColor: cs ? cs.backgroundColor : null,
        htmlBg: window.getComputedStyle(document.documentElement).backgroundColor,
        bodyBg: window.getComputedStyle(document.body).backgroundColor
      };
    })()
  `);
  console.log("Clone Cover BG:", cloneCoverBg);

  // Now inspect opened background on real vs clone
  console.log("\n--- OPENED ---");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 1500));
  const realOpenedBg = await c.eval(`
    (() => {
      const root = document.querySelector('[data-showcase-root]') || document.querySelector('[data-testid="minimalism-darkred-template"]') || document.body;
      const cs = window.getComputedStyle(root);
      const paper = document.querySelector('[style*="paper.webp"]');
      const paperCs = paper ? window.getComputedStyle(paper) : null;
      return {
        rootBgColor: cs.backgroundColor,
        rootBgImage: cs.backgroundImage,
        htmlBg: window.getComputedStyle(document.documentElement).backgroundColor,
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        paperBg: paperCs ? {
          bgImage: paperCs.backgroundImage,
          bgSize: paperCs.backgroundSize,
          bgPos: paperCs.backgroundPosition,
          bgRepeat: paperCs.backgroundRepeat,
          opacity: paperCs.opacity,
          mixBlendMode: paperCs.mixBlendMode
        } : null
      };
    })()
  `);
  console.log("Real Opened BG:", realOpenedBg);

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 1500));
  const cloneOpenedBg = await c.eval(`
    (() => {
      const root = document.querySelector('.songphung-template') || document.querySelector('.is-minimalism-darkred-body') || document.body;
      const cs = window.getComputedStyle(root);
      const paper = document.querySelector('.paper-texture, [style*="paper.webp"]');
      const paperCs = paper ? window.getComputedStyle(paper) : null;
      return {
        rootBgColor: cs.backgroundColor,
        rootBgImage: cs.backgroundImage,
        htmlBg: window.getComputedStyle(document.documentElement).backgroundColor,
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        paperBg: paperCs ? {
          bgImage: paperCs.backgroundImage,
          bgSize: paperCs.backgroundSize,
          bgPos: paperCs.backgroundPosition,
          bgRepeat: paperCs.backgroundRepeat,
          opacity: paperCs.opacity,
          mixBlendMode: paperCs.mixBlendMode
        } : null
      };
    })()
  `);
  console.log("Clone Opened BG:", cloneOpenedBg);

  await c.close();
}

inspectBgDiff().catch(console.error);
