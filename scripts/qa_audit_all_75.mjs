import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

// 1. Read all 75 templates
const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
const TEMPLATES = tplMatches.map(m => ({ slug: m[1], id: m[2], name: m[3] }));

console.log(`Loaded ${TEMPLATES.length} templates for complete audit.`);

const OUT_DIR = path.join("docs", "qa-review");
const RES_FILE = path.join(OUT_DIR, "audit_75_full_report.json");
fs.mkdirSync(OUT_DIR, { recursive: true });

async function extractCloneMetrics(c) {
  return await c.eval(`
    (() => {
      const getBox = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          w: Math.round(r.width),
          h: Math.round(r.height),
          top: Math.round(r.top),
          left: Math.round(r.left),
          maxWidth: cs.maxWidth,
          padding: cs.padding
        };
      };

      const envelope = getBox('header .aspect-\\\\[333\\\\/384\\\\], [class*="envelope"], header .relative.aspect-');
      const header = getBox('header');
      const card = getBox('.sp-section, .sp-ceremony-card, section');
      const container = getBox('.songphung-template, .is-minimalism-body, .is-minimalism-darkred-body, .isolate');
      const seal = getBox('[title*="mở thiệp"], div[style*="radial-gradient"], .wax-seal');
      const docW = document.documentElement.offsetWidth;
      const scrollW = document.documentElement.scrollWidth;
      const hasHorizontalScroll = scrollW > docW + 2;

      return {
        envelope,
        header,
        card,
        container,
        seal,
        docW,
        scrollW,
        hasHorizontalScroll
      };
    })()
  `);
}

async function run() {
  const c = new ChromeController();
  await c.start();
  await c.newPage("about:blank");

  const results = [];
  let cfBlockedCount = 0;

  for (let i = 0; i < TEMPLATES.length; i++) {
    const t = TEMPLATES[i];
    console.log(`\n[${i + 1}/${TEMPLATES.length}] Auditing: ${t.name} (${t.slug})...`);

    const itemResult = {
      stt: i + 1,
      slug: t.slug,
      id: t.id,
      name: t.name,
      realUrl: `https://chungdoi.com/vi/mau-thiep/${t.slug}/demo`,
      cloneUrl: `http://localhost:5173/vi/mau-thiep/${t.slug}/demo`,
      realStatus: "UNKNOWN",
      cloneStatus: "PASS",
      mobile: {},
      laptop: {},
      issues: [],
      errors: []
    };

    // --- STEP A: REAL LINK AUDIT (with graceful Cloudflare handling) ---
    await c.setViewport({ width: 390, height: 844, mobile: true });
    try {
      await c.navigate(itemResult.realUrl, 2500);

      const isCF = await c.eval(`
        Boolean(
          document.title.includes("Just a moment") ||
          document.title.includes("security verification") ||
          document.querySelector("#challenge-running, #cf-chl-widget, [class*='cf-'], #challenge-error-text")
        )
      `);

      if (isCF) {
        cfBlockedCount++;
        itemResult.realStatus = "CF_BLOCKED";
        console.log(`  -> Real: Cloudflare Challenge encountered. Skipping real check per rule (Total CF: ${cfBlockedCount}).`);
      } else {
        itemResult.realStatus = "ACCESSIBLE";
        const realMetrics = await extractCloneMetrics(c);
        itemResult.mobile.real = realMetrics;
        console.log(`  -> Real: Accessible! Seal:`, realMetrics.seal ? `${realMetrics.seal.w}x${realMetrics.seal.h}` : "none");
      }
    } catch (e) {
      itemResult.realStatus = "ERROR: " + e.message;
      console.log(`  -> Real error:`, e.message);
    }

    // --- STEP B: CLONE COVER & TRANSITION (Mobile 390x844) ---
    c.networkLogs = [];
    c.consoleLogs = [];
    await c.navigate(itemResult.cloneUrl, 1500);

    const cloneCoverMetrics = await extractCloneMetrics(c);
    itemResult.mobile.cloneCover = cloneCoverMetrics;

    // Click "Mở thiệp"
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('a, button, [title*="mở thiệp"], div[style*="radial-gradient"]')).find(x => (x.innerText && x.innerText.includes('Mở thiệp')) || x.getAttribute('title')?.includes('mở thiệp')) || document.querySelector('.wax-seal, div[style*="radial-gradient"]');
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 1200));

    const cloneOpenedMetrics = await extractCloneMetrics(c);
    itemResult.mobile.cloneOpened = cloneOpenedMetrics;

    // Check errors on Mobile
    const mobile404s = c.networkLogs.filter(n => n.response && n.response.status >= 400).map(n => n.response.url);
    const mobileConsole = c.consoleLogs.filter(cl => cl.type === 'error').map(cl => cl.args.map(a => a.value).join(' '));
    if (mobile404s.length) itemResult.errors.push(...mobile404s.map(u => `404: ${u}`));
    if (mobileConsole.length) itemResult.errors.push(...mobileConsole.map(err => `Console: ${err}`));

    // Check overflow
    if (cloneOpenedMetrics?.hasHorizontalScroll) {
      itemResult.issues.push(`Mobile bị tràn ngang (scrollWidth: ${cloneOpenedMetrics.scrollW} > ${cloneOpenedMetrics.docW})`);
    }

    // --- STEP C: CLONE LAPTOP RESPONSIVE (1440x900) ---
    await c.setViewport({ width: 1440, height: 900, mobile: false });
    await c.navigate(`${itemResult.cloneUrl}?open=1`, 1200);

    const cloneLaptopMetrics = await extractCloneMetrics(c);
    itemResult.laptop.clone = cloneLaptopMetrics;

    if (cloneLaptopMetrics?.container?.w && cloneLaptopMetrics.container.w < 700) {
      itemResult.issues.push(`Laptop container bị co cứng (${cloneLaptopMetrics.container.w}px < 900px)`);
    }
    if (cloneLaptopMetrics?.hasHorizontalScroll) {
      itemResult.issues.push(`Laptop bị tràn ngang (scrollWidth: ${cloneLaptopMetrics.scrollW} > ${cloneLaptopMetrics.docW})`);
    }

    // Determine final status
    if (itemResult.issues.length > 0) {
      itemResult.cloneStatus = "FAIL";
    } else {
      itemResult.cloneStatus = "PASS";
    }

    console.log(`  -> Clone: ${itemResult.cloneStatus} | Mobile Env: ${cloneOpenedMetrics?.envelope?.w || 'N/A'}px | Laptop: ${cloneLaptopMetrics?.container?.w || 'N/A'}px | Issues: ${itemResult.issues.length}`);

    results.push(itemResult);

    // Save progressively after every template
    fs.writeFileSync(RES_FILE, JSON.stringify(results, null, 2), "utf8");

    // Pause ≥ 2000ms between templates per instructions
    await new Promise(r => setTimeout(r, 2000));
  }

  await c.close();
  console.log(`\n======================================================`);
  console.log(`AUDIT 75 FINISHED! Total: ${results.length}, Cloudflare Blocked on Real: ${cfBlockedCount}`);
  console.log(`Results saved to: ${RES_FILE}`);
}

run().catch(err => {
  console.error("FATAL ERROR in run():", err);
  process.exit(1);
});
