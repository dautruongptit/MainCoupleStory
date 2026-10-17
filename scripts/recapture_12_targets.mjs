import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

const COVER_DIR = "docs/cover-screenshots";

const targets = [
  { slug: "hoa-tinh-do", name: "Họa Tình - Đỏ" },
  { slug: "song-long-do", name: "Song Long - Đỏ" },
  { slug: "hoang-kim-lam", name: "Hoàng Kim - Lam" },
  { slug: "chibi-red", name: "Chibi - Red" },
  { slug: "bach-su-do", name: "Bạch Sứ - Đỏ" },
  { slug: "minimalism-do-dam", name: "Minimalism - Đỏ Đậm" },
  { slug: "minimalism-nau", name: "Minimalism - Nâu" },
  { slug: "to-duyen-xanh", name: "Tơ Duyên - Xanh" },
  { slug: "song-hy-do", name: "Song Hỷ - Đỏ" },
  { slug: "anh-dao-hong", name: "Anh Đào - Hồng" },
  { slug: "song-hac-do", name: "Song Hạc - Đỏ" },
  { slug: "co-ba-do", name: "Cô Ba - Đỏ" },
];

const c = new ChromeController();
await c.start();
await c.newPage();

console.log(`Recapturing clone screenshots and stitching comparison for ${targets.length} templates...`);

for (const t of targets) {
  const { slug, name } = t;
  console.log(`\n=================== Processing ${slug} ===================`);
  const url = `http://localhost:5173/vi/mau-thiep/${slug}/demo`;

  // 1. Mobile viewport: 390x844
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.navigate(url, 2000);

  // Check floating bar presence
  const checkFloating = await c.eval(`
    (() => {
      const bar = document.querySelector('.demo-floating-header');
      const isVisible = bar && window.getComputedStyle(bar).display !== 'none';
      const envelope = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
      return { barFound: !!bar, isVisible, envelopeFound: !!envelope };
    })()
  `);
  console.log(`[${slug}] Mobile check: barFound=${checkFloating.barFound}, isVisible=${checkFloating.isVisible}, envelopeFound=${checkFloating.envelopeFound}`);

  // Screenshot clone mobile
  const mPath = path.join(COVER_DIR, `clone_${slug}_m.png`);
  await c.screenshot(mPath);

  // Test opening envelope to verify floating header appears
  const testOpen = await c.eval(`
    (() => {
      const btn = document.querySelector('[data-landing-screenshot-id="invite-envelope"] button, [data-landing-screenshot-id="invite-envelope"] a');
      if (btn) btn.click();
      return !!btn;
    })()
  `);
  await c.wait(800);
  const checkAfterOpen = await c.eval(`
    (() => {
      const bar = document.querySelector('.demo-floating-header');
      return { barFound: !!bar, isVisible: bar && window.getComputedStyle(bar).display !== 'none' };
    })()
  `);
  console.log(`[${slug}] After click 'Mở thiệp': barFound=${checkAfterOpen.barFound}, isVisible=${checkAfterOpen.isVisible}`);

  // 2. Desktop viewport: 1280x800
  await c.setViewport({ width: 1280, height: 800, mobile: false, deviceScaleFactor: 1 });
  await c.navigate(url, 1500);
  const dPath = path.join(COVER_DIR, `clone_${slug}_d.png`);
  await c.screenshot(dPath);

  // 3. Side-by-side stitch
  const realMPath = path.join(COVER_DIR, `real_${slug}_m.png`);
  const cloneMPath = mPath;

  if (fs.existsSync(realMPath) && fs.existsSync(cloneMPath)) {
    const realB64 = fs.readFileSync(realMPath).toString("base64");
    const cloneB64 = fs.readFileSync(cloneMPath).toString("base64");

    await c.setViewport({ width: 820, height: 900, mobile: false, deviceScaleFactor: 1 });
    await c.eval(`
      (() => {
        document.body.innerHTML = \`
          <div style="background: #18181b; color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 12px; width: 820px; box-sizing: border-box;">
            <div style="display: flex; justify-content: space-between; font-size: 15px; font-weight: 600; margin-bottom: 8px; padding: 0 10px;">
              <span style="color: #4ade80;">THẬT (chungdoi.com - \${"${slug}"})</span>
              <span style="color: #60a5fa;">CLONE (localhost:5173 - \${"${name}"})</span>
            </div>
            <div style="display: flex; gap: 12px; justify-content: center;">
              <img src="data:image/png;base64,\${"${realB64}"}" style="width: 390px; height: 844px; border: 1px solid #3f3f46; border-radius: 8px; object-fit: cover;" />
              <img src="data:image/png;base64,\${"${cloneB64}"}" style="width: 390px; height: 844px; border: 1px solid #3f3f46; border-radius: 8px; object-fit: cover;" />
            </div>
          </div>
        \`;
      })()
    `);
    await c.wait(300);
    const compPath = path.join(COVER_DIR, `compare_${slug}.png`);
    await c.screenshot(compPath);
    console.log(`[${slug}] Saved updated compare_${slug}.png`);
  }
}

await c.close();
console.log("\nFinished re-capturing all 12 comparison screenshots!");
