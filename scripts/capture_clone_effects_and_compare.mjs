import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

const targets = [
  { slug: "bach-su-do", name: "Bạch Sứ - Đỏ" },
  { slug: "hoa-tinh-do", name: "Họa Tình - Đỏ" },
  { slug: "song-long-do", name: "Song Long - Đỏ" },
  { slug: "hoang-kim-lam", name: "Hoàng Kim - Lam" },
  { slug: "chibi-red", name: "Chibi - Red" },
];

const c = new ChromeController();
await c.start();
await c.newPage();
await c.setViewport({ width: 390, height: 844, mobile: true });

const fpsResults = {};

for (const t of targets) {
  const { slug, name } = t;
  console.log(`\n=================== CAPTURING CLONE: ${slug} (${name}) ===================`);
  const baseDir = path.join("docs", "effects", slug);
  const openDir = path.join(baseDir, "open");

  // In clone, URL is http://localhost:5173/vi/mau-thiep/<slug>/demo
  const cloneUrl = `http://localhost:5173/vi/mau-thiep/${slug}/demo`;
  await c.navigate(cloneUrl, 2000);

  // Measure relative FPS over 60 frames during particle animation
  const fps = await c.eval(`
    (() => {
      return new Promise(resolve => {
        let frames = 0;
        const start = performance.now();
        function loop() {
          frames++;
          if (frames < 60) {
            requestAnimationFrame(loop);
          } else {
            const elapsed = performance.now() - start;
            const avgFps = Math.round((frames / elapsed) * 1000);
            resolve(avgFps);
          }
        }
        requestAnimationFrame(loop);
      });
    })()
  `);
  fpsResults[slug] = fps;
  console.log(`[${slug}] Average animation FPS: ${fps} fps`);

  // 1. Capture clone ambient frames: 0, 500, 1000, 2000, 4000 ms
  const ambientTimes = [0, 500, 1000, 2000, 4000];
  for (let i = 0; i < ambientTimes.length; i++) {
    const ms = ambientTimes[i];
    if (i > 0) {
      await c.wait(ms - ambientTimes[i - 1]);
    }
    const framePath = path.join(baseDir, `clone_ambient_${ms}ms.png`);
    await c.screenshot(framePath);
  }

  // 2. Click Open and capture clone transition frames: 0, 100, 200, 300, 500, 800, 1200, 2000 ms
  console.log(`Capturing clone transition sequence for ${slug}...`);
  await c.eval(`
    (() => {
      const btn = document.querySelector('[data-landing-screenshot-id="invite-envelope"] button, [data-landing-screenshot-id="invite-envelope"] div[title="Bấm để mở thiệp"], [data-landing-screenshot-id="invite-envelope"] a');
      if (btn) btn.click();
      window._cloneOpenStart = performance.now();
    })()
  `);

  const openTimes = [0, 100, 200, 300, 500, 800, 1200, 2000];
  for (let i = 0; i < openTimes.length; i++) {
    const ms = openTimes[i];
    if (i > 0) {
      await c.wait(ms - openTimes[i - 1]);
    }
    const openFramePath = path.join(openDir, `clone_open_${ms}ms.png`);
    await c.screenshot(openFramePath);
  }
}

// Function to stitch two PNG files side by side via Chrome Canvas
async function stitchSideBySide(realPath, clonePath, outPath, labelLeft, labelRight) {
  if (!fs.existsSync(realPath) || !fs.existsSync(clonePath)) {
    console.log(`Missing file for stitch: ${realPath} or ${clonePath}`);
    return;
  }
  const realB64 = fs.readFileSync(realPath).toString("base64");
  const cloneB64 = fs.readFileSync(clonePath).toString("base64");

  const stitchedPngB64 = await c.eval(`
    (() => {
      return new Promise(resolve => {
        const img1 = new Image();
        const img2 = new Image();
        let loaded = 0;
        function check() {
          loaded++;
          if (loaded === 2) {
            const canvas = document.createElement('canvas');
            const w1 = img1.naturalWidth || 390;
            const h1 = img1.naturalHeight || 844;
            const w2 = img2.naturalWidth || 390;
            const h2 = img2.naturalHeight || 844;
            const bannerH = 40;
            canvas.width = w1 + w2;
            canvas.height = Math.max(h1, h2) + bannerH;
            const ctx = canvas.getContext('2d');

            // Draw header banner
            ctx.fillStyle = '#111827';
            ctx.fillRect(0, 0, canvas.width, bannerH);
            ctx.fillStyle = '#F59E0B';
            ctx.font = 'bold 16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('${labelLeft}', w1 / 2, 26);
            ctx.fillStyle = '#10B981';
            ctx.fillText('${labelRight}', w1 + w2 / 2, 26);

            // Draw images
            ctx.drawImage(img1, 0, bannerH, w1, h1);
            ctx.drawImage(img2, w1, bannerH, w2, h2);

            // Divider line
            ctx.strokeStyle = '#374151';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(w1, 0);
            ctx.lineTo(w1, canvas.height);
            ctx.stroke();

            resolve(canvas.toDataURL('image/png').split(',')[1]);
          }
        }
        img1.onload = check;
        img2.onload = check;
        img1.src = 'data:image/png;base64,' + ${JSON.stringify(realB64)};
        img2.src = 'data:image/png;base64,' + ${JSON.stringify(cloneB64)};
      });
    })()
  `);

  if (stitchedPngB64) {
    fs.writeFileSync(outPath, Buffer.from(stitchedPngB64, "base64"));
  }
}

// 3. Stitch side-by-side comparisons
console.log("\nStitching side-by-side comparison images for ambient and open sequences...");
for (const t of targets) {
  const { slug } = t;
  const baseDir = path.join("docs", "effects", slug);
  const openDir = path.join(baseDir, "open");

  // Ambient comparison
  for (const ms of [0, 500, 1000, 2000, 4000]) {
    const realF = path.join(baseDir, `ambient_${ms}ms.png`);
    const cloneF = path.join(baseDir, `clone_ambient_${ms}ms.png`);
    const compF = path.join(baseDir, `compare_ambient_${ms}ms.png`);
    await stitchSideBySide(realF, cloneF, compF, `Web Thật (${ms}ms)`, `Bản Clone (${ms}ms)`);
  }

  // Open comparison
  for (const ms of [0, 100, 200, 300, 500, 800, 1200, 2000]) {
    const realF = path.join(openDir, `open_${ms}ms.png`);
    const cloneF = path.join(openDir, `clone_open_${ms}ms.png`);
    const compF = path.join(openDir, `compare_open_${ms}ms.png`);
    await stitchSideBySide(realF, cloneF, compF, `Mở Thật (+${ms}ms)`, `Mở Clone (+${ms}ms)`);
  }
}

await c.close();

fs.writeFileSync("docs/effects/fps-report.json", JSON.stringify(fpsResults, null, 2), "utf8");
console.log("\nALL DONE! Comparisons stitched and FPS measured:", fpsResults);
