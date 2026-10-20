import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

// 1. Read all 75 templates
const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
const ALL_TEMPLATES = tplMatches.map(m => ({ slug: m[1], id: m[2], name: m[3] }));

const ALREADY_AUDITED_14 = new Set([
  "minimalism-do-dam",
  "minimalism-nau",
  "song-hy-xanh",
  "song-hy-do",
  "song-phung-do",
  "long-phung-v2-do",
  "chibi-red",
  "hoa-tinh-do",
  "baroque-v2-do-dam",
  "to-duyen-xanh",
  "hoa-moc-xanh",
  "minimalism-xanh",
  "song-hy-v2-do",
  "vuonkinh-hong"
]);

// 61 templates to audit
const TEMPLATES_61 = ALL_TEMPLATES.filter(t => !ALREADY_AUDITED_14.has(t.slug));

console.log(`Total templates: ${ALL_TEMPLATES.length}`);
console.log(`Already audited 14 templates.`);
console.log(`Remaining to audit: ${TEMPLATES_61.length} templates.`);

const OUT_DIR = path.join("docs", "qa-review");
const RESULT_FILE = path.join(OUT_DIR, "audit_61_detailed_results.json");
fs.mkdirSync(OUT_DIR, { recursive: true });

// Load existing results if any
let detailedResults = [];
if (fs.existsSync(RESULT_FILE)) {
  try {
    detailedResults = JSON.parse(fs.readFileSync(RESULT_FILE, "utf8"));
  } catch {}
}

const DELAY_BETWEEN_TEMPLATES = 3500; // 3.5s per instructions (3-5 seconds)
const PROFILE_DIR = path.join(process.cwd(), ".chrome_profile");

async function extractMetrics(c) {
  return await c.eval(`
    (() => {
      const getBox = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          rect: { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), left: Math.round(r.left) },
          styles: {
            fontFamily: cs.fontFamily,
            fontSize: cs.fontSize,
            lineHeight: cs.lineHeight,
            color: cs.color,
            backgroundColor: cs.backgroundColor,
            backgroundImage: cs.backgroundImage,
            borderRadius: cs.borderRadius,
            padding: cs.padding,
            margin: cs.margin,
            maxWidth: cs.maxWidth,
            transform: cs.transform
          }
        };
      };

      const envelope = getBox('header .aspect-\\\\[333\\\\/384\\\\], [class*="envelope"], header .relative.aspect-');
      const header = getBox('header');
      const card = getBox('.sp-section, .sp-ceremony-card, section');
      const container = getBox('.songphung-template, .is-minimalism-body, .is-minimalism-darkred-body, .isolate');
      const seal = getBox('[title*="mở thiệp"], div[style*="radial-gradient"], .wax-seal');
      const openBtn = getBox('button, a, .env-open-btn');
      
      const particles = document.querySelectorAll('[style*="ambient-"], [class*="ambient"] *');
      const bodyBg = window.getComputedStyle(document.body).backgroundImage;
      const paperEl = document.querySelector('.paper-texture, [class*="paper"], .isolate');
      const containerBg = paperEl ? window.getComputedStyle(paperEl).backgroundImage : '';

      const docW = document.documentElement.offsetWidth;
      const scrollW = document.documentElement.scrollWidth;
      const hasHorizontalScroll = scrollW > docW + 2;

      return {
        envelope,
        header,
        card,
        container,
        seal,
        openBtn,
        particleCount: particles.length,
        bodyBg,
        containerBg,
        docW,
        scrollW,
        hasHorizontalScroll
      };
    })()
  `);
}

async function auditSingleTemplate(c, t, indexTotal) {
  const realUrl = `https://chungdoi.com/vi/mau-thiep/${t.slug}/demo`;
  const cloneUrl = `http://localhost:5173/vi/mau-thiep/${t.slug}/demo`;

  const item = {
    index: indexTotal,
    slug: t.slug,
    id: t.id,
    name: t.name,
    realUrl,
    cloneUrl,
    realAccess: "Được",
    status: "Đạt",
    mobile: { real: {}, clone: {} },
    laptop: { real: {}, clone: {} },
    issues: [],
    errors: { console: [], network: [] }
  };

  // ==========================================
  // 1. MOBILE 390x844
  // ==========================================
  await c.setViewport({ width: 390, height: 844, mobile: true });

  // 1A. Real Cover Mobile
  try {
    await c.navigate(realUrl, 2500);
    const title = await c.eval(`document.title`);
    if (!title || title.includes("502") || title.includes("503") || title.includes("404")) {
      item.realAccess = "Không truy cập được web gốc";
    } else {
      item.mobile.real.cover = await extractMetrics(c);
      
      // Real Opened Mobile
      await c.navigate(`${realUrl}?open=1`, 2000);
      item.mobile.real.opened = await extractMetrics(c);
    }
  } catch (e) {
    item.realAccess = "Không truy cập được web gốc";
  }

  // 1B. Clone Cover Mobile
  c.networkLogs = [];
  c.consoleLogs = [];
  await c.navigate(cloneUrl, 1500);
  item.mobile.clone.cover = await extractMetrics(c);

  // Clone Click Open
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button, [title*="mở thiệp"], div[style*="radial-gradient"]')).find(x => (x.innerText && x.innerText.includes('Mở thiệp')) || x.getAttribute('title')?.includes('mở thiệp')) || document.querySelector('.wax-seal, div[style*="radial-gradient"]');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 1200));
  item.mobile.clone.opened = await extractMetrics(c);

  // Capture console & network errors on Mobile
  const m404s = c.networkLogs.filter(n => n.response && n.response.status >= 400).map(n => n.response.url);
  const mErrors = c.consoleLogs.filter(cl => cl.type === "error").map(cl => cl.args.map(a => a.value).join(" "));
  if (m404s.length) item.errors.network.push(...m404s);
  if (mErrors.length) item.errors.console.push(...mErrors);

  if (item.mobile.clone.opened?.hasHorizontalScroll) {
    item.issues.push(`Mobile 390px bị tràn ngang (scrollWidth: ${item.mobile.clone.opened.scrollW}px)`);
  }

  // ==========================================
  // 2. LAPTOP 1440x900
  // ==========================================
  await c.setViewport({ width: 1440, height: 900, mobile: false });

  // 2A. Real Laptop
  if (item.realAccess === "Được") {
    try {
      await c.navigate(`${realUrl}?open=1`, 1500);
      item.laptop.real.opened = await extractMetrics(c);
    } catch {
      item.realAccess = "Không truy cập được web gốc";
    }
  }

  // 2B. Clone Laptop
  await c.navigate(`${cloneUrl}?open=1`, 1500);
  item.laptop.clone.opened = await extractMetrics(c);

  const cloneContainerW = item.laptop.clone.opened?.container?.rect?.w;
  if (cloneContainerW && cloneContainerW < 700) {
    item.issues.push(`Laptop container bị co cứng (${cloneContainerW}px < 900px)`);
  }
  if (item.laptop.clone.opened?.hasHorizontalScroll) {
    item.issues.push(`Laptop 1440px bị tràn ngang (scrollWidth: ${item.laptop.clone.opened.scrollW}px)`);
  }

  // ==========================================
  // 3. COMPARISON (REAL vs CLONE)
  // ==========================================
  if (item.realAccess === "Được") {
    const rSeal = item.mobile.real.cover?.seal?.rect;
    const cSeal = item.mobile.clone.cover?.seal?.rect;
    if (rSeal && cSeal) {
      const topDiff = Math.abs(rSeal.top - cSeal.top);
      if (topDiff > 10) {
        item.issues.push(`Con dấu sáp Cover lệch ${topDiff}px (Web gốc top:${rSeal.top}px vs Clone top:${cSeal.top}px)`);
      }
    }

    const rCard = item.mobile.real.opened?.card?.rect;
    const cCard = item.mobile.clone.opened?.card?.rect;
    if (rCard && cCard) {
      const cardWDiff = Math.abs(rCard.w - cCard.w);
      if (cardWDiff > 15) {
        item.issues.push(`Độ rộng Card Mobile lệch ${cardWDiff}px (Web gốc ${rCard.w}px vs Clone ${cCard.w}px)`);
      }
    }
  }

  if (item.issues.length > 0 || item.errors.network.length > 0 || item.errors.console.length > 0) {
    item.status = "Có lỗi";
  } else {
    item.status = "Đạt";
  }

  return item;
}

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true, userDataDir: PROFILE_DIR });
  await c.newPage("about:blank");

  console.log(`Starting audit of 61 templates in batches of 10...`);

  for (let idx = 0; idx < TEMPLATES_61.length; idx++) {
    const t = TEMPLATES_61[idx];
    const batchNum = Math.floor(idx / 10) + 1;
    const itemInBatch = (idx % 10) + 1;
    const globalNumber = 14 + idx + 1;

    console.log(`\n[${globalNumber}/75] (Lô ${batchNum} - Mẫu ${itemInBatch}/10) Kiểm tra: ${t.name} (${t.slug})...`);

    const result = await auditSingleTemplate(c, t, globalNumber);

    console.log(`  -> Truy cập web gốc: ${result.realAccess}`);
    console.log(`  -> Kết quả: ${result.status} | Lỗi: ${result.issues.length} | Net Errors: ${result.errors.network.length} | Console Errors: ${result.errors.console.length}`);
    if (result.issues.length > 0) {
      console.log(`     Chi tiết:`, result.issues.join("; "));
    }

    // Update existing or add
    const existingIdx = detailedResults.findIndex(r => r.slug === t.slug);
    if (existingIdx >= 0) {
      detailedResults[existingIdx] = result;
    } else {
      detailedResults.push(result);
    }

    // Save progressively
    fs.writeFileSync(RESULT_FILE, JSON.stringify(detailedResults, null, 2), "utf8");

    // Pause 3-5 seconds per template
    await new Promise(r => setTimeout(r, DELAY_BETWEEN_TEMPLATES));

    // After each batch of 10, pause extra 2 seconds
    if (itemInBatch === 10) {
      console.log(`\n=== ĐÃ HOÀN THÀNH LÔ ${batchNum} (${idx + 1}/${TEMPLATES_61.length} mẫu). Nghỉ 5s trước khi sang lô tiếp... ===`);
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  await c.close();
  console.log(`\n======================================================`);
  console.log(`HOÀN THÀNH TOÀN BỘ 61 MẪU! Dữ liệu lưu tại: ${RESULT_FILE}`);
}

run().catch(err => {
  console.error("Lỗi nghiêm trọng:", err);
  process.exit(1);
});
