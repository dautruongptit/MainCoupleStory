import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 1440, height: 900, mobile: false });

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);

  // Desktop Cover
  const coverBg = await c.eval(`
    (() => {
      const wrapper = document.querySelector('.pv-wrapper') || document.body;
      const cs = window.getComputedStyle(wrapper);
      const envelope = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
      const envCs = envelope ? window.getComputedStyle(envelope) : null;
      return {
        wrapperBg: cs.backgroundColor,
        envBg: envCs ? envCs.background : null,
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        htmlBg: window.getComputedStyle(document.documentElement).backgroundColor
      };
    })()
  `);
  console.log("CLONE DESKTOP COVER:", coverBg);

  // Click open
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 1500));

  // Desktop Opened
  const openedBg = await c.eval(`
    (() => {
      const wrapper = document.querySelector('.pv-wrapper') || document.body;
      const cs = window.getComputedStyle(wrapper);
      const root = document.querySelector('.songphung-template') || document.querySelector('.is-minimalism-darkred-body');
      const rootCs = root ? window.getComputedStyle(root) : null;
      const paper = document.querySelector('.paper-texture');
      const paperCs = paper ? window.getComputedStyle(paper) : null;
      return {
        wrapperBg: cs.backgroundColor,
        rootBg: rootCs ? rootCs.backgroundColor : null,
        rootWidth: root ? root.getBoundingClientRect().width : null,
        paperBgImage: paperCs ? paperCs.backgroundImage : null,
        paperHeight: paper ? paper.getBoundingClientRect().height : null
      };
    })()
  `);
  console.log("CLONE DESKTOP OPENED:", openedBg);
}

run();
