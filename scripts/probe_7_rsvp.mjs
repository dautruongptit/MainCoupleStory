import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

const testSlugs = [
  "long-phung-do",
  "chibi-red",
  "thanh-diep-xanh",
  "long-phung-xanh",
  "song-long-xanh",
  "vuon-xuan-lam",
  "long-phung-huyen"
];

const c = new ChromeController();
await c.start();
await c.newPage();

for (const slug of testSlugs) {
  console.log(`\n=================== Testing RSVP for: ${slug} ===================`);
  const url = `https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1`;
  await c.navigate(url, 3000);

  const check = await c.eval(`
    (() => {
      // Find RSVP block
      const rsvpBlock = document.querySelector('[data-landing-screenshot-id="invite-rsvp"]');
      const allButtons = Array.from(document.querySelectorAll('button, a, [role="button"]'));
      const rsvpButtons = allButtons.filter(b => b.innerText && (
        b.innerText.includes('XÁC NHẬN THAM DỰ') || 
        b.innerText.includes('Xác nhận tham dự') || 
        b.innerText.toLowerCase().includes('tham dự')
      ));
      
      return {
        hasRsvpBlock: !!rsvpBlock,
        rsvpBlockText: rsvpBlock ? rsvpBlock.innerText.slice(0, 200) : null,
        rsvpButtonsCount: rsvpButtons.length,
        rsvpButtons: rsvpButtons.map(b => ({
          tag: b.tagName,
          text: b.innerText.trim(),
          cls: b.className
        }))
      };
    })()
  `);
  console.log('Check result:', JSON.stringify(check, null, 2));

  // Sleep 2s
  await new Promise(r => setTimeout(r, 2000));
}

await c.close();
