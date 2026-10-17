import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

const targets = [
  { slug: "hoa-tinh-do", id: "hoa_tinh_red" },
  { slug: "song-long-do", id: "double_dragon_red" },
  { slug: "hoang-kim-lam", id: "royal_blue" },
  { slug: "chibi-red", id: "chibi_red" },
  { slug: "bach-su-do", id: "porcelain_red" },
];

const c = new ChromeController();
await c.start();
await c.newPage();

const results = {};

for (const t of targets) {
  console.log(`\n=================== Inspecting ${t.slug} ===================`);
  await c.navigate(`https://chungdoi.com/vi/mau-thiep/${t.slug}/demo`, 3000);
  const data = await c.eval(`
    (() => {
      const el = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
      if (!el) return { error: "No invite-envelope" };

      // Background info
      const outerBg = window.getComputedStyle(el).background;
      const outerBgImg = window.getComputedStyle(el).backgroundImage;
      const outerBgColor = window.getComputedStyle(el).backgroundColor;

      // Card element
      const card = el.querySelector('.relative.rounded-lg, .relative.rounded-2xl, [class*="rounded-"], .envelope-card') || el.children[1] || el.children[0];
      const cardBg = card ? window.getComputedStyle(card).background : '';
      const cardBgColor = card ? window.getComputedStyle(card).backgroundColor : '';
      const cardBorder = card ? window.getComputedStyle(card).border : '';

      // Check inner decorations
      const imgs = Array.from(el.querySelectorAll('img')).map(img => ({
        src: img.getAttribute('src'),
        style: img.getAttribute('style'),
        className: img.className
      }));

      // Typography
      const h1 = el.querySelector('h1');
      const h1Text = h1 ? h1.innerText : '';
      const h1Font = h1 ? window.getComputedStyle(h1).fontFamily : '';
      const h1Weight = h1 ? window.getComputedStyle(h1).fontWeight : '';
      const h1Color = h1 ? window.getComputedStyle(h1).color : '';
      const h1Size = h1 ? window.getComputedStyle(h1).fontSize : '';

      // Date / Details
      const dateEl = el.querySelector('.text-\\\\[18px\\\\], [class*="date"]');
      const dateText = dateEl ? dateEl.innerText : '';

      // Guest badge / box
      const guestEls = Array.from(el.querySelectorAll('div, p, span')).filter(e => 
        e.innerText && (e.innerText.includes('Kính mời') || e.innerText.includes('Thân Mời') || e.innerText.includes('Anh Tuấn') || e.innerText.includes('em Huy') || e.innerText.includes('誠摯邀請'))
      ).map(e => ({
        tagName: e.tagName,
        text: e.innerText.trim(),
        className: e.className,
        style: e.getAttribute('style'),
        border: window.getComputedStyle(e).border,
        bg: window.getComputedStyle(e).background,
        color: window.getComputedStyle(e).color,
      }));

      // Button
      const btn = el.querySelector('button, a[class*="btn"], [class*="button"]');
      const btnText = btn ? btn.innerText.trim() : '';
      const btnBg = btn ? window.getComputedStyle(btn).backgroundColor || window.getComputedStyle(btn).background : '';
      const btnColor = btn ? window.getComputedStyle(btn).color : '';
      const btnRadius = btn ? window.getComputedStyle(btn).borderRadius : '';
      const btnBorder = btn ? window.getComputedStyle(btn).border : '';

      // Seal
      const seal = el.querySelector('[class*="seal"], [class*="rounded-full"][style*="animation:seal-pulse"]');
      const sealText = seal ? seal.innerText.trim() : '';
      const sealBg = seal ? window.getComputedStyle(seal).background : '';
      const sealSvg = seal ? !!seal.querySelector('svg') : false;
      const sealSvgFill = seal && seal.querySelector('svg') ? window.getComputedStyle(seal.querySelector('svg')).fill : '';

      return {
        outer: { bg: outerBg, bgImg: outerBgImg, bgColor: outerBgColor },
        card: { bg: cardBg, bgColor: cardBgColor, border: cardBorder, html: card ? card.innerHTML : '' },
        imgs,
        typography: { h1Text, h1Font, h1Weight, h1Color, h1Size, dateText },
        guestEls,
        button: { btnText, btnBg, btnColor, btnRadius, btnBorder },
        seal: { sealText, sealBg, sealSvg, sealSvgFill },
        fullHtml: el.outerHTML
      };
    })()
  `);

  results[t.slug] = data;
  console.log(`Result for ${t.slug}:`, {
    h1: data.typography?.h1Text?.replace(/\n/g, ' '),
    h1Font: data.typography?.h1Font,
    h1Color: data.typography?.h1Color,
    h1Weight: data.typography?.h1Weight,
    btnText: data.button?.btnText,
    btnBg: data.button?.btnBg,
    btnColor: data.button?.btnColor,
    cardBg: data.card?.bgColor,
    guestCount: data.guestEls?.length
  });
}

await c.close();
fs.writeFileSync("scratch_5_covers_detail.json", JSON.stringify(results, null, 2));
console.log("Finished! Saved to scratch_5_covers_detail.json");
