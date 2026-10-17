import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

async function testOpen() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  const slug = "bach-su-do";
  const url = `http://localhost:5173/vi/mau-thiep/${slug}/demo`;
  console.log(`Navigating to ${url}...`);
  await c.navigate(url, 2000);

  const outDir = path.join("docs", "flow-audit", "test", slug);
  fs.mkdirSync(outDir, { recursive: true });

  // Initial state before clicking
  const sc0 = await c.screenshot();
  fs.writeFileSync(path.join(outDir, "00_before_click.png"), Buffer.from(sc0, "base64"));

  // Check button selector
  const btnInfo = await c.eval(`
    (() => {
      const btn = document.querySelector('button[aria-busy], button:has(span), [data-landing-screenshot-id="invite-envelope"] button');
      return {
        found: !!btn,
        text: btn?.innerText,
        classes: btn?.className,
        style: btn?.getAttribute('style')
      };
    })()
  `);
  console.log("Button info:", btnInfo);

  // Click Mở thiệp
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Mở thiệp')) ||
                  document.querySelector('[data-landing-screenshot-id="invite-envelope"] button');
      if (btn) btn.click();
      window._openStart = performance.now();
    })()
  `);

  const times = [0, 100, 200, 300, 500, 800, 1200, 2000];
  for (let i = 0; i < times.length; i++) {
    const ms = times[i];
    if (i > 0) {
      await c.wait(ms - times[i - 1]);
    }
    const sc = await c.screenshot();
    fs.writeFileSync(path.join(outDir, `open_${ms}ms.png`), Buffer.from(sc, "base64"));
    
    const state = await c.eval(`
      (() => {
        const env = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
        const opened = document.querySelector('.songphung-template, .is-minimalism-body, .is-songhy-body');
        const header = document.querySelector('.demo-floating-header');
        return {
          ms: ${ms},
          envelopePresent: !!env,
          openedPresent: !!opened,
          headerPresent: !!header
        };
      })()
    `);
    console.log(`State at ${ms}ms:`, state);
  }

  await c.close();
}

testOpen().catch(console.error);
