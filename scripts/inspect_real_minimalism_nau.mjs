import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function inspectReal() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();

  await c.send("Network.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    acceptLanguage: "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
    platform: "Win32"
  });

  const UA_HEADER = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
  };
  await c.send("Network.setExtraHTTPHeaders", { headers: UA_HEADER });

  console.log("=== 1. MOBILE 390x844: COVER ===");
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo", 4000);

  const realCoverM = await c.eval(`
    (() => {
      function getElData(el) {
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          id: el.id,
          cls: el.className,
          text: el.children.length === 0 ? (el.innerText || '').trim() : undefined,
          rect: {
            left: Math.round(r.left * 10) / 10,
            top: Math.round(r.top * 10) / 10,
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10
          },
          styles: {
            fontFamily: cs.fontFamily,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            lineHeight: cs.lineHeight,
            color: cs.color,
            backgroundColor: cs.backgroundColor,
            backgroundImage: cs.backgroundImage,
            backgroundSize: cs.backgroundSize,
            backgroundPosition: cs.backgroundPosition,
            padding: cs.padding,
            margin: cs.margin,
            border: cs.border,
            borderRadius: cs.borderRadius,
            boxShadow: cs.boxShadow,
            transform: cs.transform,
            opacity: cs.opacity,
            zIndex: cs.zIndex,
            animationName: cs.animationName,
            animationDuration: cs.animationDuration
          },
          src: el.src || (el.getAttribute && el.getAttribute('src'))
        };
      }

      // Card frame
      const card = document.querySelector('[data-landing-screenshot-id="invite-envelope"]') || document.querySelector('.ienv-wrap') || document.body.firstElementChild;
      
      // All elements inside cover
      const allEls = Array.from(document.querySelectorAll('*')).filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      }).map(getElData);

      return {
        sh: document.documentElement.scrollHeight,
        title: document.title,
        html: document.body.innerHTML,
        elements: allEls
      };
    })()
  `);

  fs.writeFileSync("docs/real_minimalism_nau_cover_m.json", JSON.stringify(realCoverM, null, 2));
  fs.writeFileSync("docs/real_minimalism_nau_cover_m.html", realCoverM.html);
  console.log("Saved docs/real_minimalism_nau_cover_m.json (elements:", realCoverM.elements.length, ")");

  console.log("=== 2. MOBILE 390x844: OPENED ===");
  // Click open or navigate with ?open=1
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo?open=1", 4000);

  const realOpenedM = await c.eval(`
    (() => {
      function getElData(el) {
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          id: el.id,
          cls: el.className,
          text: el.children.length === 0 ? (el.innerText || '').trim() : undefined,
          rect: {
            left: Math.round(r.left * 10) / 10,
            top: Math.round(r.top * 10) / 10,
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10
          },
          styles: {
            fontFamily: cs.fontFamily,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            lineHeight: cs.lineHeight,
            color: cs.color,
            backgroundColor: cs.backgroundColor,
            backgroundImage: cs.backgroundImage,
            backgroundSize: cs.backgroundSize,
            backgroundPosition: cs.backgroundPosition,
            padding: cs.padding,
            margin: cs.margin,
            border: cs.border,
            borderRadius: cs.borderRadius,
            boxShadow: cs.boxShadow,
            transform: cs.transform,
            opacity: cs.opacity,
            zIndex: cs.zIndex
          },
          src: el.src || (el.getAttribute && el.getAttribute('src'))
        };
      }

      // Sections
      const sections = Array.from(document.querySelectorAll('header, section, footer, [class*="sec"], [class*="section"]')).map(getElData);

      // All elements with text or image
      const keyEls = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, span, button, a, img, input, textarea')).filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      }).map(getElData);

      return {
        sh: document.documentElement.scrollHeight,
        title: document.title,
        html: document.body.innerHTML,
        sections,
        keyEls
      };
    })()
  `);

  fs.writeFileSync("docs/real_minimalism_nau_opened_m.json", JSON.stringify(realOpenedM, null, 2));
  fs.writeFileSync("docs/real_minimalism_nau_opened_m.html", realOpenedM.html);
  console.log("Saved docs/real_minimalism_nau_opened_m.json (sections:", realOpenedM.sections.length, "keyEls:", realOpenedM.keyEls.length, ")");

  console.log("=== 3. LAPTOP 1440x900: COVER ===");
  await c.setViewport({ width: 1440, height: 900, mobile: false, deviceScaleFactor: 1 });
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo", 4000);

  const realCoverL = await c.eval(`
    (() => {
      function getElData(el) {
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          id: el.id,
          cls: el.className,
          text: el.children.length === 0 ? (el.innerText || '').trim() : undefined,
          rect: {
            left: Math.round(r.left * 10) / 10,
            top: Math.round(r.top * 10) / 10,
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10
          },
          styles: {
            fontFamily: cs.fontFamily,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            lineHeight: cs.lineHeight,
            color: cs.color,
            backgroundColor: cs.backgroundColor,
            backgroundImage: cs.backgroundImage,
            backgroundSize: cs.backgroundSize,
            backgroundPosition: cs.backgroundPosition,
            padding: cs.padding,
            margin: cs.margin,
            border: cs.border,
            borderRadius: cs.borderRadius,
            boxShadow: cs.boxShadow,
            transform: cs.transform,
            opacity: cs.opacity,
            zIndex: cs.zIndex
          },
          src: el.src || (el.getAttribute && el.getAttribute('src'))
        };
      }

      const allEls = Array.from(document.querySelectorAll('*')).filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      }).map(getElData);

      return {
        sh: document.documentElement.scrollHeight,
        title: document.title,
        html: document.body.innerHTML,
        elements: allEls
      };
    })()
  `);
  fs.writeFileSync("docs/real_minimalism_nau_cover_l.json", JSON.stringify(realCoverL, null, 2));
  console.log("Saved docs/real_minimalism_nau_cover_l.json (elements:", realCoverL.elements.length, ")");

  console.log("=== 4. LAPTOP 1440x900: OPENED ===");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo?open=1", 4000);

  const realOpenedL = await c.eval(`
    (() => {
      function getElData(el) {
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          id: el.id,
          cls: el.className,
          text: el.children.length === 0 ? (el.innerText || '').trim() : undefined,
          rect: {
            left: Math.round(r.left * 10) / 10,
            top: Math.round(r.top * 10) / 10,
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10
          },
          styles: {
            fontFamily: cs.fontFamily,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            lineHeight: cs.lineHeight,
            color: cs.color,
            backgroundColor: cs.backgroundColor,
            backgroundImage: cs.backgroundImage,
            backgroundSize: cs.backgroundSize,
            backgroundPosition: cs.backgroundPosition,
            padding: cs.padding,
            margin: cs.margin,
            border: cs.border,
            borderRadius: cs.borderRadius,
            boxShadow: cs.boxShadow,
            transform: cs.transform,
            opacity: cs.opacity,
            zIndex: cs.zIndex
          },
          src: el.src || (el.getAttribute && el.getAttribute('src'))
        };
      }

      const sections = Array.from(document.querySelectorAll('header, section, footer, [class*="sec"], [class*="section"]')).map(getElData);

      const keyEls = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, span, button, a, img, input, textarea')).filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      }).map(getElData);

      return {
        sh: document.documentElement.scrollHeight,
        title: document.title,
        html: document.body.innerHTML,
        sections,
        keyEls
      };
    })()
  `);
  fs.writeFileSync("docs/real_minimalism_nau_opened_l.json", JSON.stringify(realOpenedL, null, 2));
  console.log("Saved docs/real_minimalism_nau_opened_l.json (sections:", realOpenedL.sections.length, "keyEls:", realOpenedL.keyEls.length, ")");

  await c.close();
  console.log("ALL REAL DATA CAPTURED SUCCESSFULLY!");
}

inspectReal().catch(console.error);
