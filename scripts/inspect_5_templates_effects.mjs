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

const inventory = {};
const transitions = {};

for (const t of targets) {
  const { slug, name } = t;
  console.log(`\n=================== ANALYZING ${slug} (${name}) ===================`);
  
  const baseDir = path.join("docs", "effects", slug);
  const openDir = path.join(baseDir, "open");
  fs.mkdirSync(baseDir, { recursive: true });
  fs.mkdirSync(openDir, { recursive: true });

  const url = `https://chungdoi.com/vi/mau-thiep/${slug}/demo`;
  await c.navigate(url, 3000);

  // 1. Inspect ambient particles
  const effectData = await c.eval(`
    (() => {
      // Find all particle elements inside the first z-index:1 container of invite-envelope
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

  console.log(`[${slug}] Ambient Particles: found=${effectData.found}, count=${effectData.count}`);
  if (effectData.samples && effectData.samples.length > 0) {
    const s0 = effectData.samples[0];
    console.log(`  Sample 1: text="${s0.text}", anim=${s0.animationName}, dur=${s0.animationDuration}, color=${s0.color}, size=${s0.fontSize}, svg=${s0.hasSvg}, span=${s0.hasSpan}`);
  }

  inventory[slug] = {
    name,
    effectType: effectData.samples?.[0]?.animationName || "none",
    count: effectData.count,
    particleKind: effectData.samples?.[0]?.text || (effectData.samples?.[0]?.hasSvg ? "svg" : effectData.samples?.[0]?.hasSpan ? "confetti-rect" : "unknown"),
    details: effectData
  };

  // Capture ambient animation frame sequence: 0, 500, 1000, 2000, 4000 ms
  console.log(`Capturing ambient frames for ${slug}...`);
  const ambientTimes = [0, 500, 1000, 2000, 4000];
  for (let i = 0; i < ambientTimes.length; i++) {
    const ms = ambientTimes[i];
    if (i > 0) {
      await c.wait(ms - ambientTimes[i - 1]);
    }
    const framePath = path.join(baseDir, `ambient_${ms}ms.png`);
    await c.screenshot(framePath);
  }

  // 2. Click Open and capture transition frame sequence: 0, 100, 200, 300, 500, 800, 1200, 2000 ms
  console.log(`Capturing transition sequence for ${slug}...`);
  await c.eval(`
    (() => {
      const btn = document.querySelector('[data-landing-screenshot-id="invite-envelope"] button, [data-landing-screenshot-id="invite-envelope"] a');
      if (btn) btn.click();
      window._openStart = performance.now();
    })()
  `);

  const openTimes = [0, 100, 200, 300, 500, 800, 1200, 2000];
  const transitionLogs = [];

  for (let i = 0; i < openTimes.length; i++) {
    const ms = openTimes[i];
    if (i > 0) {
      await c.wait(ms - openTimes[i - 1]);
    }
    const openFramePath = path.join(openDir, `open_${ms}ms.png`);
    await c.screenshot(openFramePath);

    const logState = await c.eval(`
      (() => {
        const env = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
        return {
          ms: ${ms},
          elapsed: Math.round(performance.now() - (window._openStart || performance.now())),
          envelopeMounted: !!env,
          cardStyle: env ? (env.querySelector('.relative')?.getAttribute('style') || '') : null
        };
      })()
    `);
    transitionLogs.push(logState);
  }

  transitions[slug] = {
    name,
    logs: transitionLogs
  };
}

await c.close();

fs.writeFileSync("docs/effects/effects-inventory.json", JSON.stringify(inventory, null, 2), "utf8");
fs.writeFileSync("docs/effects/transitions-inventory.json", JSON.stringify(transitions, null, 2), "utf8");
console.log("\nDone inspecting 5 templates! Data written to docs/effects/effects-inventory.json and docs/effects/transitions-inventory.json");
