import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

const COVER_DIR = "docs/cover-screenshots";

const c = new ChromeController();
await c.start();
const page = await c.newPage();

const testSlugs = ["minimalism-do-dam", "to-duyen-xanh"];

for (const slug of testSlugs) {
  console.log(`Capturing clone for: ${slug}`);
  const url = `http://localhost:5173/vi/mau-thiep/${slug}/demo`;

  // Mobile
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.navigate(url, 1500);
  const mPath = path.join(COVER_DIR, `clone_${slug}_m.png`);
  await c.screenshot(mPath);

  // Desktop
  await c.setViewport({ width: 1280, height: 800, mobile: false, deviceScaleFactor: 1 });
  await c.navigate(url, 1500);
  const dPath = path.join(COVER_DIR, `clone_${slug}_d.png`);
  await c.screenshot(dPath);

  // Side-by-side stitch
  const realMPath = path.join(COVER_DIR, `real_${slug}_m.png`);
  const cloneMPath = mPath;

  if (fs.existsSync(realMPath) && fs.existsSync(cloneMPath)) {
    const realB64 = fs.readFileSync(realMPath).toString("base64");
    const cloneB64 = fs.readFileSync(cloneMPath).toString("base64");

    await c.setViewport({ width: 820, height: 900, mobile: false, deviceScaleFactor: 1 });
    await c.eval(`
      (() => {
        document.body.innerHTML = \`
          <div style="background: #1e1e1e; color: #fff; font-family: sans-serif; padding: 12px; width: 820px; box-sizing: border-box;">
            <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; margin-bottom: 8px; padding: 0 10px;">
              <span style="color: #4ade80;">REAL (chungdoi.com)</span>
              <span style="color: #60a5fa;">CLONE (localhost:5173)</span>
            </div>
            <div style="display: flex; gap: 12px; justify-content: center;">
              <img src="data:image/png;base64,\${"${realB64}"}" style="width: 390px; height: 844px; border: 1px solid #444; border-radius: 6px;" />
              <img src="data:image/png;base64,\${"${cloneB64}"}" style="width: 390px; height: 844px; border: 1px solid #444; border-radius: 6px;" />
            </div>
          </div>
        \`;
      })()
    `);
    await c.wait(300);
    const compPath = path.join(COVER_DIR, `compare_${slug}.png`);
    await c.screenshot(compPath);
    console.log(`Generated comparison: ${compPath}`);
  }
}

await c.close();
