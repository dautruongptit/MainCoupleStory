import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

const COVER_DIR = "docs/cover-screenshots";

const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf-8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];

const templates = tplMatches.map((m, idx) => ({
  stt: idx + 1,
  slug: m[1],
  id: m[2],
  name: m[3]
}));

console.log(`Starting capture & compare for ${templates.length} templates...`);

const c = new ChromeController();
await c.start();
await c.newPage();

const results = [];

for (const t of templates) {
  const { slug, id, name, stt } = t;
  console.log(`[${stt}/${templates.length}] Processing ${slug}...`);
  const url = `http://localhost:5173/vi/mau-thiep/${slug}/demo`;

  // 1. Mobile capture
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.navigate(url, 1200);
  const mPath = path.join(COVER_DIR, `clone_${slug}_m.png`);
  await c.screenshot(mPath);

  // 2. Desktop capture
  await c.setViewport({ width: 1280, height: 800, mobile: false, deviceScaleFactor: 1 });
  await c.navigate(url, 1200);
  const dPath = path.join(COVER_DIR, `clone_${slug}_d.png`);
  await c.screenshot(dPath);

  // 3. Side-by-side stitch
  const realMPath = path.join(COVER_DIR, `real_${slug}_m.png`);
  const cloneMPath = mPath;

  let hasCompare = false;
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
    await c.wait(200);
    const compPath = path.join(COVER_DIR, `compare_${slug}.png`);
    await c.screenshot(compPath);
    hasCompare = true;
  }

  results.push({
    stt,
    slug,
    id,
    name,
    hasCompare
  });
}

await c.close();
console.log(`Finished capture & compare for all ${results.length} templates.`);
fs.writeFileSync("scratch_compare_results.json", JSON.stringify(results, null, 2));
