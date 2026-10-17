import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function inspectGiftbox() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  const slugs = ["bach-su-do", "hoa-tinh-do", "song-long-do", "hoang-kim-lam", "chibi-red"];

  for (const slug of slugs) {
    console.log(`\n--- Inspecting giftbox on https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1 ---`);
    await c.navigate(`https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1`, 4000);

    const giftInfo = await c.eval(`
      (() => {
        // Find giftbox section
        const btn = Array.from(document.querySelectorAll('button, div, section')).find(el => {
          return el.querySelector('.igb-box, .igb-bob') || (el.innerText && el.innerText.includes('Hộp Quà Mừng'));
        });

        // Or search by img src containing giftbox
        const imgs = Array.from(document.querySelectorAll('img[src*="giftbox"]'));
        
        const mainBoxImg = document.querySelector('img.igb-box, img[src*="/giftbox/"]:not([src*="mini"])');
        const miniImgs = Array.from(document.querySelectorAll('img.igb-decor, img[src*="/giftbox/mini/"]')).map(img => ({
          src: img.src,
          style: img.getAttribute('style'),
          className: img.className
        }));

        // Find Section header, text, colors
        const section = mainBoxImg ? mainBoxImg.closest('section, div[class*="section"], div[class*="gift"]') : null;

        return {
          found: !!mainBoxImg,
          mainBox: mainBoxImg ? {
            src: mainBoxImg.src,
            style: mainBoxImg.getAttribute('style'),
            className: mainBoxImg.className
          } : null,
          miniCount: miniImgs.length,
          miniImgs,
          sectionStyles: section ? {
            bg: window.getComputedStyle(section).backgroundColor,
            color: window.getComputedStyle(section).color,
            fontFamily: window.getComputedStyle(section).fontFamily,
          } : null,
          sectionText: section ? section.innerText.slice(0, 300) : null
        };
      })()
    `);

    console.log(`[${slug}] Giftbox data:`, JSON.stringify(giftInfo, null, 2));

    // Also click giftbox to see the popup
    const popupClicked = await c.eval(`
      (() => {
        const boxBtn = document.querySelector('button:has(.igb-box), .igb-bob, img.igb-box');
        if (boxBtn) {
          boxBtn.closest('button')?.click() || boxBtn.click();
          return true;
        }
        return false;
      })()
    `);
    console.log(`[${slug}] Clicked giftbox button:`, popupClicked);
    await new Promise(r => setTimeout(r, 1500));

    const popupInfo = await c.eval(`
      (() => {
        const modal = document.querySelector('[role="dialog"], .modal, div[class*="modal"]');
        if (!modal) return { found: false };
        const h2 = modal.querySelector('h2, h3');
        const qrImgs = Array.from(modal.querySelectorAll('img')).map(i => i.src);
        return {
          found: true,
          title: h2?.innerText,
          headerBg: h2 ? window.getComputedStyle(h2.parentElement).backgroundColor : null,
          bodyBg: window.getComputedStyle(modal.firstElementChild || modal).backgroundColor,
          qrCount: qrImgs.length,
          qrImgs: qrImgs.slice(0, 2),
          text: modal.innerText.slice(0, 300)
        };
      })()
    `);
    console.log(`[${slug}] Popup data:`, JSON.stringify(popupInfo, null, 2));

    await new Promise(r => setTimeout(r, 2200));
  }

  await c.close();
}

inspectGiftbox().catch(console.error);
