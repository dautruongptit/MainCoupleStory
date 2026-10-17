import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

const AUDIT_DIR = "docs/asset-audit";

const c = new ChromeController();
await c.start();
await c.newPage();

// 1. Process the 7 templates that were marked NOT VERIFIED
const sevenSlugs = [
  "long-phung-do",
  "chibi-red",
  "thanh-diep-xanh",
  "long-phung-xanh",
  "song-long-xanh",
  "vuon-xuan-lam",
  "long-phung-huyen"
];

console.log("=== STEP 1: Verifying RSVP on 7 templates ===");
for (const slug of sevenSlugs) {
  console.log(`Auditing RSVP for: ${slug}`);
  const url = `https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1`;
  await c.navigate(url, 2500);

  // Scroll into view & click RSVP button
  const rsvpResult = await c.eval(`
    (() => {
      const block = document.querySelector('[data-landing-screenshot-id="invite-rsvp"]');
      if (!block) return { success: false, reason: 'Không tìm thấy data-landing-screenshot-id="invite-rsvp"' };
      const btn = block.querySelector('button') || block.querySelector('[role="button"]') || block;
      btn.scrollIntoView({ block: 'center' });
      btn.click();
      return { success: true, text: btn.innerText.trim(), tag: btn.tagName };
    })()
  `);
  console.log(`  Result for ${slug}:`, rsvpResult);

  await c.wait(2000);

  // Take screenshot of opened RSVP form
  const ssPath = path.join(AUDIT_DIR, `rsvp_${slug}.png`);
  await c.screenshot(ssPath);
  console.log(`  Saved screenshot: ${ssPath}`);

  // Sleep >= 2s
  await new Promise(r => setTimeout(r, 2000));
}

// 2. Process the 6 templates with empty scrolled
const emptyScrolledSlugs = [
  "song-long-do",
  "song-long-lam",
  "song-long-xanh",
  "vuon-xuan-do",
  "vuon-xuan-lam",
  "vuon-xuan-xanh"
];

console.log("\n=== STEP 2: Re-scanning scrolled stage for 6 templates ===");
for (const slug of emptyScrolledSlugs) {
  console.log(`Scanning scrolled images for: ${slug}`);
  const url = `https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1`;
  await c.navigate(url, 2500);

  const scrolledImgs = await c.eval(`
    (() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
      const imgs = Array.from(document.querySelectorAll('img')).map(i => i.src).filter(Boolean);
      return Array.from(new Set(imgs));
    })()
  `);
  console.log(`  Found ${scrolledImgs ? scrolledImgs.length : 0} images for ${slug}`);

  // Update json
  const jsonPath = path.join(AUDIT_DIR, `${slug}.json`);
  if (fs.existsSync(jsonPath)) {
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    data.stages.scrolled = (scrolledImgs || []).map(u => u.replace(/^https?:\/\/[^\/]+/, ""));
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  }

  // Sleep >= 2s
  await new Promise(r => setTimeout(r, 2000));
}

await c.close();
console.log("\nFinished audit probe!");
