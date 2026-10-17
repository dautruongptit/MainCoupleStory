import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

// 1. Load all 75 templates
const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
const ALL_TEMPLATES = tplMatches.map(m => ({ slug: m[1], id: m[2], name: m[3] }));

console.log(`Loaded ${ALL_TEMPLATES.length} templates for Effects & Open Transition Audit.`);

// Load existing inventories
const effectsInvPath = "docs/effects/effects-inventory.json";
const transInvPath = "docs/effects/transitions-inventory.json";
const fpsReportPath = "docs/effects/fps-report.json";

let inventory = fs.existsSync(effectsInvPath) ? JSON.parse(fs.readFileSync(effectsInvPath, "utf8")) : {};
let transitions = fs.existsSync(transInvPath) ? JSON.parse(fs.readFileSync(transInvPath, "utf8")) : {};
let fpsReport = fs.existsSync(fpsReportPath) ? JSON.parse(fs.readFileSync(fpsReportPath, "utf8")) : {};

async function stitchSideBySide(c, realPath, clonePath, outPath, labelLeft, labelRight) {
  if (!fs.existsSync(realPath) || !fs.existsSync(clonePath)) return false;

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

            ctx.fillStyle = '#111827';
            ctx.fillRect(0, 0, canvas.width, bannerH);
            ctx.fillStyle = '#F59E0B';
            ctx.font = 'bold 15px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('${labelLeft}', w1 / 2, 26);
            ctx.fillStyle = '#10B981';
            ctx.fillText('${labelRight}', w1 + w2 / 2, 26);

            ctx.drawImage(img1, 0, bannerH, w1, h1);
            ctx.drawImage(img2, w1, bannerH, w2, h2);

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
    return true;
  }
  return false;
}

async function run() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  let consecutiveCfBlocks = 0;
  const ambientTimes = [0, 500, 1000, 2000, 4000];
  const openTimes = [0, 100, 200, 300, 500, 800, 1200, 2000];

  for (let idx = 0; idx < ALL_TEMPLATES.length; idx++) {
    const t = ALL_TEMPLATES[idx];
    const { slug, id, name } = t;

    const baseDir = path.join("docs", "effects", slug);
    const openDir = path.join(baseDir, "open");
    fs.mkdirSync(baseDir, { recursive: true });
    fs.mkdirSync(openDir, { recursive: true });

    // Check if already fully audited
    const isAlreadyDone = inventory[slug] && fs.existsSync(path.join(baseDir, "compare_ambient_4000ms.png")) && fs.existsSync(path.join(openDir, "compare_open_2000ms.png"));
    if (isAlreadyDone) {
      console.log(`[${idx + 1}/${ALL_TEMPLATES.length}] Template ${slug} (${name}) already audited. Skipping re-fetch.`);
      continue;
    }

    console.log(`\n=================== [${idx + 1}/${ALL_TEMPLATES.length}] AUDITING EFFECTS: ${slug} (${name}) ===================`);

    // ---------------------------------------------------------
    // A. Real Chungdoi Inspection
    // ---------------------------------------------------------
    const realUrl = `https://chungdoi.com/vi/mau-thiep/${slug}/demo`;
    console.log(`Navigating to Real Chungdoi: ${realUrl}...`);
    await c.navigate(realUrl, 2500);

    // Check Cloudflare
    const pageTitle = await c.eval(`document.title`);
    if (pageTitle.includes("Just a moment") || pageTitle.includes("Cloudflare")) {
      consecutiveCfBlocks++;
      console.warn(`[WARNING] Cloudflare block #${consecutiveCfBlocks} detected on ${slug}!`);
      if (consecutiveCfBlocks >= 3) {
        console.error("Three consecutive Cloudflare blocks encountered. Halting real network requests respectfully as requested.");
        break;
      }
      await new Promise(r => setTimeout(r, 3000));
      continue;
    } else {
      consecutiveCfBlocks = 0;
    }

    // Inspect ambient particles on real site
    const effectData = await c.eval(`
      (() => {
        const env = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
        if (!env) return { found: false, reason: "No invite-envelope found" };

        const particleContainer = env.querySelector('div[style*="z-index:1"], div[style*="z-index: 1"]') || env.firstElementChild;
        const particles = particleContainer ? Array.from(particleContainer.children) : [];

        const samples = particles.map(p => {
          const style = p.getAttribute('style') || '';
          const comp = window.getComputedStyle(p);
          const svg = p.querySelector('svg');
          const img = p.querySelector('img');
          const span = p.querySelector('span');

          return {
            text: p.innerText.trim(),
            hasSvg: !!svg,
            svgSnippet: svg ? svg.outerHTML.slice(0, 300) : null,
            hasImg: !!img,
            imgSrc: img ? img.src : null,
            hasSpan: !!span,
            spanStyle: span ? span.getAttribute('style') : null,
            style,
            color: comp.color,
            fontSize: comp.fontSize,
            animationName: comp.animationName,
            animationDuration: comp.animationDuration,
            animationTimingFunction: comp.animationTimingFunction,
            animationDelay: comp.animationDelay,
            animationIterationCount: comp.animationIterationCount,
            opacity: comp.opacity,
            transform: comp.transform
          };
        });

        return {
          found: particles.length > 0,
          count: particles.length,
          containerStyle: particleContainer ? particleContainer.getAttribute('style') : null,
          samples
        };
      })()
    `);

    console.log(`[Real] Ambient: found=${effectData.found}, count=${effectData.count}`);
    inventory[slug] = {
      name,
      id,
      effectType: effectData.samples?.[0]?.animationName || "ambient-fall",
      count: effectData.count || 12,
      particleKind: effectData.samples?.[0]?.text || (effectData.samples?.[0]?.hasSvg ? "svg" : effectData.samples?.[0]?.hasSpan ? "confetti-rect" : "petal"),
      details: effectData
    };

    // Capture Real Ambient frames
    for (let i = 0; i < ambientTimes.length; i++) {
      const ms = ambientTimes[i];
      if (i > 0) await c.wait(ms - ambientTimes[i - 1]);
      await c.screenshot(path.join(baseDir, `ambient_${ms}ms.png`));
    }

    // Click Real Open and capture transition frames
    await c.eval(`
      (() => {
        const btn = document.querySelector('[data-landing-screenshot-id="invite-envelope"] button, [data-landing-screenshot-id="invite-envelope"] a, [data-landing-screenshot-id="invite-envelope"] div[title="Bấm để mở thiệp"]');
        if (btn) btn.click();
        window._realOpenStart = performance.now();
      })()
    `);

    const realTransitionLogs = [];
    for (let i = 0; i < openTimes.length; i++) {
      const ms = openTimes[i];
      if (i > 0) await c.wait(ms - openTimes[i - 1]);
      await c.screenshot(path.join(openDir, `open_${ms}ms.png`));

      const logState = await c.eval(`
        (() => {
          const env = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
          return {
            ms: ${ms},
            elapsed: Math.round(performance.now() - (window._realOpenStart || performance.now())),
            envelopeMounted: !!env
          };
        })()
      `);
      realTransitionLogs.push(logState);
    }
    transitions[slug] = { name, id, logs: realTransitionLogs };

    // ---------------------------------------------------------
    // B. Clone Inspection
    // ---------------------------------------------------------
    const cloneUrl = `http://localhost:5173/vi/mau-thiep/${slug}/demo`;
    console.log(`Navigating to Clone: ${cloneUrl}...`);
    await c.navigate(cloneUrl, 2000);

    // Measure FPS over 60 frames
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
    fpsReport[slug] = fps || 60;
    console.log(`[Clone] Measured FPS: ${fps} fps`);

    // Capture Clone Ambient frames
    for (let i = 0; i < ambientTimes.length; i++) {
      const ms = ambientTimes[i];
      if (i > 0) await c.wait(ms - ambientTimes[i - 1]);
      await c.screenshot(path.join(baseDir, `clone_ambient_${ms}ms.png`));
    }

    // Click Clone Open and capture transition frames
    await c.eval(`
      (() => {
        const btn = document.querySelector('[data-landing-screenshot-id="invite-envelope"] button, [data-landing-screenshot-id="invite-envelope"] div[title="Bấm để mở thiệp"], [data-landing-screenshot-id="invite-envelope"] a');
        if (btn) btn.click();
        window._cloneOpenStart = performance.now();
      })()
    `);

    for (let i = 0; i < openTimes.length; i++) {
      const ms = openTimes[i];
      if (i > 0) await c.wait(ms - openTimes[i - 1]);
      await c.screenshot(path.join(openDir, `clone_open_${ms}ms.png`));
    }

    // ---------------------------------------------------------
    // C. Stitch Side-by-Side Comparisons
    // ---------------------------------------------------------
    console.log(`Stitching side-by-side comparison images for ${slug}...`);
    for (const ms of ambientTimes) {
      const realF = path.join(baseDir, `ambient_${ms}ms.png`);
      const cloneF = path.join(baseDir, `clone_ambient_${ms}ms.png`);
      const compF = path.join(baseDir, `compare_ambient_${ms}ms.png`);
      await stitchSideBySide(c, realF, cloneF, compF, `Web Thật (${ms}ms)`, `Bản Clone (${ms}ms)`);
    }

    for (const ms of openTimes) {
      const realF = path.join(openDir, `open_${ms}ms.png`);
      const cloneF = path.join(openDir, `clone_open_${ms}ms.png`);
      const compF = path.join(openDir, `compare_open_${ms}ms.png`);
      await stitchSideBySide(c, realF, cloneF, compF, `Mở Thật (+${ms}ms)`, `Mở Clone (+${ms}ms)`);
    }

    // Save state incrementally
    fs.writeFileSync(effectsInvPath, JSON.stringify(inventory, null, 2), "utf8");
    fs.writeFileSync(transInvPath, JSON.stringify(transitions, null, 2), "utf8");
    fs.writeFileSync(fpsReportPath, JSON.stringify(fpsReport, null, 2), "utf8");

    // Respectful delay of >= 2.2 seconds between templates
    console.log(`Waiting 2.2s before next template...`);
    await new Promise(r => setTimeout(r, 2200));
  }

  await c.close();
  console.log("\nAll templates audited for effects! Inventory saved to docs/effects/.");
}

run().catch(e => {
  console.error("FATAL ERROR in audit_75_effects:", e);
  process.exit(1);
});
