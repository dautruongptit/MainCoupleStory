import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  
  // 1. Mobile viewport 390x844
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 2 });

  console.log("Navigating to REAL site (hoa-moc-xanh)...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/hoa-moc-xanh/demo", 4000);

  // Capture real envelope cover screenshot
  const realCoverShot = await c.eval(`
    new Promise((resolve) => {
      // scroll top just in case
      window.scrollTo(0, 0);
      setTimeout(resolve, 500);
    })
  `);
  
  const realCoverData = await c.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("docs/hoa_moc_xanh_real_cover.png", Buffer.from(realCoverData.data, "base64"));
  console.log("Saved real cover screenshot");

  // Extract detailed structure of real cover
  const realCoverInfo = await c.eval(`
    (() => {
      const cover = document.querySelector('header, [class*="envelope"], div[style*="perspective"], body > div');
      const textElements = Array.from(document.querySelectorAll('h1, h2, h3, p, span, button, a'))
        .filter(el => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && el.innerText && el.innerText.trim();
        })
        .map(el => {
          const style = window.getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            text: el.innerText.trim(),
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            color: style.color,
            textAlign: style.textAlign,
            textTransform: style.textTransform,
            rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) }
          };
        });

      const images = Array.from(document.querySelectorAll('img'))
        .map(img => {
          const r = img.getBoundingClientRect();
          return {
            src: img.src,
            rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
            style: img.getAttribute('style') || ''
          };
        });

      const buttons = Array.from(document.querySelectorAll('button, a[class*="btn"], div[role="button"]'))
        .map(btn => {
          const r = btn.getBoundingClientRect();
          const s = window.getComputedStyle(btn);
          return {
            text: btn.innerText.trim(),
            rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
            bg: s.backgroundColor,
            color: s.color,
            border: s.border,
            boxShadow: s.boxShadow
          };
        });

      return { textElements, images, buttons };
    })()
  `);
  fs.writeFileSync("docs/hoa_moc_xanh_real_cover_info.json", JSON.stringify(realCoverInfo, null, 2));

  // Click open button
  console.log("Clicking Open button on real site...");
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button')).find(x => x.innerText && x.innerText.includes('Mở thiệp'));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2500));

  // Extract all sections from real opened card
  const realOpenedInfo = await c.eval(`
    (() => {
      const sections = Array.from(document.querySelectorAll('section, [data-landing-screenshot-id]')).map(sec => {
        const id = sec.getAttribute('data-landing-screenshot-id') || sec.id || sec.className;
        const r = sec.getBoundingClientRect();
        const headings = Array.from(sec.querySelectorAll('h1, h2, h3, h4')).map(h => ({
          tag: h.tagName,
          text: h.innerText.trim(),
          font: window.getComputedStyle(h).fontFamily,
          size: window.getComputedStyle(h).fontSize,
          color: window.getComputedStyle(h).color
        }));
        const imgs = Array.from(sec.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt
        }));
        return {
          id,
          tag: sec.tagName,
          rect: { top: Math.round(r.top + window.scrollY), height: Math.round(r.height) },
          headings,
          imgCount: imgs.length,
          imgs: imgs.slice(0, 10),
          textSnippet: sec.innerText ? sec.innerText.slice(0, 300) : ''
        };
      });

      // Background audio
      const audio = document.querySelector('audio');
      const audioSrc = audio ? audio.src : '';

      return {
        totalHeight: document.documentElement.scrollHeight,
        audioSrc,
        sections
      };
    })()
  `);
  fs.writeFileSync("docs/hoa_moc_xanh_real_opened_info.json", JSON.stringify(realOpenedInfo, null, 2));

  // Full page screenshot of real opened card
  console.log("Capturing full page of real site...");
  const realFullShot = await c.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true
  });
  fs.writeFileSync("docs/hoa_moc_xanh_real_opened_full.png", Buffer.from(realFullShot.data, "base64"));

  // NOW TEST LOCALHOST
  console.log("Navigating to LOCALHOST (hoa-moc-xanh)...");
  await c.navigate("http://localhost:5173/vi/mau-thiep/hoa-moc-xanh/demo", 3000);

  const cloneCoverData = await c.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("docs/hoa_moc_xanh_clone_cover.png", Buffer.from(cloneCoverData.data, "base64"));
  console.log("Saved clone cover screenshot");

  const cloneCoverInfo = await c.eval(`
    (() => {
      const textElements = Array.from(document.querySelectorAll('h1, h2, h3, p, span, button, a'))
        .filter(el => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && el.innerText && el.innerText.trim();
        })
        .map(el => {
          const style = window.getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            text: el.innerText.trim(),
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            color: style.color,
            textAlign: style.textAlign,
            textTransform: style.textTransform,
            rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) }
          };
        });

      const images = Array.from(document.querySelectorAll('img'))
        .map(img => {
          const r = img.getBoundingClientRect();
          return {
            src: img.src,
            rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
            style: img.getAttribute('style') || ''
          };
        });

      const buttons = Array.from(document.querySelectorAll('button, a[class*="btn"], div[role="button"]'))
        .map(btn => {
          const r = btn.getBoundingClientRect();
          const s = window.getComputedStyle(btn);
          return {
            text: btn.innerText.trim(),
            rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
            bg: s.backgroundColor,
            color: s.color,
            border: s.border,
            boxShadow: s.boxShadow
          };
        });

      return { textElements, images, buttons };
    })()
  `);
  fs.writeFileSync("docs/hoa_moc_xanh_clone_cover_info.json", JSON.stringify(cloneCoverInfo, null, 2));

  // Click open button on clone
  console.log("Clicking Open button on clone site...");
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button')).find(x => x.innerText && x.innerText.includes('Mở thiệp'));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2500));

  const cloneOpenedInfo = await c.eval(`
    (() => {
      const sections = Array.from(document.querySelectorAll('section, [data-landing-screenshot-id]')).map(sec => {
        const id = sec.getAttribute('data-landing-screenshot-id') || sec.id || sec.className;
        const r = sec.getBoundingClientRect();
        const headings = Array.from(sec.querySelectorAll('h1, h2, h3, h4')).map(h => ({
          tag: h.tagName,
          text: h.innerText.trim(),
          font: window.getComputedStyle(h).fontFamily,
          size: window.getComputedStyle(h).fontSize,
          color: window.getComputedStyle(h).color
        }));
        const imgs = Array.from(sec.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt
        }));
        return {
          id,
          tag: sec.tagName,
          rect: { top: Math.round(r.top + window.scrollY), height: Math.round(r.height) },
          headings,
          imgCount: imgs.length,
          imgs: imgs.slice(0, 10),
          textSnippet: sec.innerText ? sec.innerText.slice(0, 300) : ''
        };
      });

      const audio = document.querySelector('audio');
      const audioSrc = audio ? audio.src : '';

      return {
        totalHeight: document.documentElement.scrollHeight,
        audioSrc,
        sections
      };
    })()
  `);
  fs.writeFileSync("docs/hoa_moc_xanh_clone_opened_info.json", JSON.stringify(cloneOpenedInfo, null, 2));

  const cloneFullShot = await c.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true
  });
  fs.writeFileSync("docs/hoa_moc_xanh_clone_opened_full.png", Buffer.from(cloneFullShot.data, "base64"));

  console.log("Done comparison data collection!");
  await c.close();
}

run().catch(console.error);
