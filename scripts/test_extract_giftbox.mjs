import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function testExtraction() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  const slug = "minimalism-do-dam";
  console.log(`Navigating to https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1...`);
  await c.navigate(`https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1`, 4000);

  const data = await c.eval(`
    (() => {
      // 1. Giftbox DOM
      const mainBox = document.querySelector('img.igb-box, img[src*="/giftbox/"]:not([src*="mini"])');
      const miniImgs = Array.from(document.querySelectorAll('img.igb-decor, img[src*="/giftbox/mini/"]')).map(img => ({
        src: img.src,
        filename: img.src.split('/').pop(),
        style: img.getAttribute('style') || ''
      }));

      // Section styling
      const sec = mainBox ? mainBox.closest('section') : null;
      const secH2 = sec ? sec.querySelector('h2, h3') : null;

      // 2. Click giftbox to open modal
      const btn = document.querySelector('button:has(.igb-box), .igb-bob, button:has(.igb-bob)');
      if (btn) btn.click();

      return {
        mainBox: mainBox ? {
          src: mainBox.src,
          filename: mainBox.src.split('/').pop(),
          style: mainBox.getAttribute('style') || ''
        } : null,
        miniImgs,
        section: {
          title: secH2 ? secH2.innerText : null,
          titleColor: secH2 ? window.getComputedStyle(secH2).color : null,
          titleFont: secH2 ? window.getComputedStyle(secH2).fontFamily : null,
          bgColor: sec ? window.getComputedStyle(sec).backgroundColor : null
        }
      };
    })()
  `);

  await new Promise(r => setTimeout(r, 1500));

  const modalData = await c.eval(`
    (() => {
      const modal = document.querySelector('[role="dialog"], .modal, div[class*="modal"]');
      if (!modal) return null;
      const h2 = modal.querySelector('h2, h3');
      const headerBox = h2 ? h2.parentElement : null;
      const cardBox = modal.querySelector('div[class*="rounded"]');
      const buttons = Array.from(modal.querySelectorAll('button, a')).map(b => b.innerText.trim());
      const texts = Array.from(modal.querySelectorAll('p, span, h3, h4')).map(t => ({
        text: t.innerText.trim(),
        color: window.getComputedStyle(t).color,
        fontSize: window.getComputedStyle(t).fontSize
      })).filter(t => t.text.length > 0 && t.text.length < 50);

      return {
        title: h2?.innerText,
        headerBg: headerBox ? window.getComputedStyle(headerBox).backgroundColor : null,
        headerTextColor: h2 ? window.getComputedStyle(h2).color : null,
        headerFont: h2 ? window.getComputedStyle(h2).fontFamily : null,
        bodyBg: cardBox ? window.getComputedStyle(cardBox).backgroundColor : null,
        buttons,
        texts: texts.slice(0, 10)
      };
    })()
  `);

  console.log("Result:", JSON.stringify({ ...data, modal: modalData }, null, 2));
  await c.close();
}

testExtraction().catch(console.error);
