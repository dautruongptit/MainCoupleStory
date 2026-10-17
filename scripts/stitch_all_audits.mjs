import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

const TARGETS = [
  { slug: "bach-su-do", name: "Bạch Sứ - Đỏ" },
  { slug: "hoa-tinh-do", name: "Hoạ Tình - Đỏ" },
  { slug: "song-long-do", name: "Song Long - Đỏ" },
  { slug: "hoang-kim-lam", name: "Hoàng Kim - Lam" },
  { slug: "chibi-red", name: "Chibi - Đỏ" },
];

async function stitchFiles(c, realPath, clonePath, title, outPath, width = 840) {
  if (!fs.existsSync(realPath) || !fs.existsSync(clonePath)) {
    console.warn(`Skipping stitch ${outPath}: missing ${realPath} or ${clonePath}`);
    return;
  }

  const b64Real = fs.readFileSync(realPath).toString("base64");
  const b64Clone = fs.readFileSync(clonePath).toString("base64");

  await c.setViewport({ width, height: 950, mobile: false });
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; background: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #fff; padding: 18px; box-sizing: border-box; }
        .hdr { text-align: center; margin-bottom: 14px; font-size: 16px; font-weight: 700; letter-spacing: 0.5px; color: #fb7185; }
        .grid { display: flex; gap: 16px; justify-content: center; }
        .col { flex: 1; max-width: 50%; display: flex; flex-direction: column; align-items: center; }
        .label { font-size: 12px; font-weight: 600; color: #94a3b8; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.08em; background: rgba(255,255,255,0.06); padding: 4px 12px; border-radius: 9999px; }
        img { width: 100%; height: auto; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 8px 30px rgba(0,0,0,0.6); display: block; }
      </style>
    </head>
    <body>
      <div class="hdr">${title}</div>
      <div class="grid">
        <div class="col">
          <div class="label">Bản thật (Chungdoi.com)</div>
          <img src="data:image/png;base64,${b64Real}">
        </div>
        <div class="col">
          <div class="label">Bản clone (Localhost)</div>
          <img src="data:image/png;base64,${b64Clone}">
        </div>
      </div>
    </body>
    </html>
  `;

  await c.eval(`
    document.open();
    document.write(${JSON.stringify(html)});
    document.close();
  `);
  await new Promise(r => setTimeout(r, 600));

  const sc = await c.screenshot();
  // c.screenshot() returns a Buffer directly!
  fs.writeFileSync(outPath, sc);
  console.log(`Saved ${outPath}`);
}

async function main() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();

  for (const t of TARGETS) {
    const { slug, name } = t;
    const dir = path.join("docs", "flow-audit", slug);

    console.log(`\nRe-stitching comparisons for ${slug} (${name})...`);

    // 1. Popup Desktop
    await stitchFiles(
      c,
      path.join(dir, "real_popup_desktop.png"),
      path.join(dir, "clone_popup_desktop.png"),
      `Popup Chi Tiết Mẫu (Desktop) - ${name} (${slug})`,
      path.join(dir, "popup_desktop_comparison.png"),
      1320
    );

    // 2. Popup Mobile
    await stitchFiles(
      c,
      path.join(dir, "real_popup_mobile.png"),
      path.join(dir, "clone_popup_mobile.png"),
      `Popup Chi Tiết Mẫu (Mobile 390px) - ${name} (${slug})`,
      path.join(dir, "popup_mobile_comparison.png"),
      840
    );

    // 3. Demo Cover
    await stitchFiles(
      c,
      path.join(dir, "real_demo_cover.png"),
      path.join(dir, "clone_demo_cover.png"),
      `Màn Hình Bì Thư (Envelope Cover) - ${name} (${slug})`,
      path.join(dir, "cover_comparison.png"),
      840
    );

    // 4. Transitions
    for (const ms of [0, 100, 200, 300, 500, 800, 1200, 2000]) {
      await stitchFiles(
        c,
        path.join(dir, `real_open_${ms}ms.png`),
        path.join(dir, `clone_open_${ms}ms.png`),
        `Chuyển Cảnh "Mở Thiệp" (${ms}ms) - ${name} (${slug})`,
        path.join(dir, `transition_${ms}ms_comparison.png`),
        840
      );
    }

    // 5. Opened
    await stitchFiles(
      c,
      path.join(dir, "real_opened.png"),
      path.join(dir, "clone_opened.png"),
      `Thiệp Đã Mở & Header Nổi - ${name} (${slug})`,
      path.join(dir, "opened_comparison.png"),
      840
    );
  }

  await c.close();
  console.log("\nAll stitching completed successfully!");
}

main().catch(console.error);
