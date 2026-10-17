import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function inspectRealModal() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.setViewport({ width: 1280, height: 900 });

  console.log("Navigating to https://chungdoi.com/vi/mau-thiep...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep", 4000);

  // Click first card or a card to open modal
  const clicked = await c.eval(`
    (() => {
      // Find cards
      const card = document.querySelector('button[role="article"], .tpl-tile, a[href*="/vi/mau-thiep/"]') ||
                   document.querySelector('main img')?.closest('button, a, div[onclick], div[role="button"]');
      if (card) {
        card.click();
        return { success: true, tag: card.tagName, class: card.className };
      }
      return { success: false };
    })()
  `);
  console.log("Clicked card:", clicked);

  await new Promise(r => setTimeout(r, 2000));

  // Extract modal HTML and styles
  const modalInfo = await c.eval(`
    (() => {
      const dialog = document.querySelector('div[role="dialog"], [aria-modal="true"], .modal, [class*="modal"]');
      if (!dialog) return { found: false, bodyClasses: document.body.className };
      return {
        found: true,
        outerHtml: dialog.outerHTML.slice(0, 1500),
        className: dialog.className
      };
    })()
  `);
  console.log("Real Modal Info:", modalInfo);

  const scDesktop = await c.screenshot();
  fs.writeFileSync("docs/ui-clone/real-modal-desktop.png", Buffer.from(scDesktop, "base64"));

  await c.setViewport({ width: 390, height: 844, mobile: true });
  await new Promise(r => setTimeout(r, 1000));
  const scMobile = await c.screenshot();
  fs.writeFileSync("docs/ui-clone/real-modal-mobile.png", Buffer.from(scMobile, "base64"));

  await c.close();
}

inspectRealModal().catch(console.error);
