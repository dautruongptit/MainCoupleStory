import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

const SAMPLES = [
  { slug: "minimalism-do-dam", id: "minimalism_darkred", name: "Minimalism - Đỏ Đậm" },
  { slug: "minimalism-nau", id: "minimalism_brown", name: "Minimalism - Nâu" },
  { slug: "song-hy-xanh", id: "song_hy_green", name: "Song Hỷ - Xanh" },
  { slug: "song-hy-do", id: "song_hy_red", name: "Song Hỷ - Đỏ" },
  { slug: "song-phung-do", id: "double_phoenix_red", name: "Song Phụng - Đỏ" },
  { slug: "long-phung-v2-do", id: "dragon_phoenix_v2_red", name: "Long Phụng V2 - Đỏ" },
  { slug: "chibi-red", id: "chibi_red", name: "Chibi - Đỏ" },
  { slug: "hoa-tinh-do", id: "hoa_tinh_red", name: "Hoa Tình - Đỏ" },
  { slug: "baroque-v2-do-dam", id: "baroque_v2_darkred", name: "Baroque V2 - Đỏ Đậm" },
  { slug: "to-duyen-xanh", id: "silk_ribbon_green", name: "Tơ Duyên - Xanh" },
];

const OUT_DIR = path.join("docs", "qa-review");
const SHOTS_DIR = path.join(OUT_DIR, "screenshots");

fs.mkdirSync(SHOTS_DIR, { recursive: true });

async function stitchSideBySide(c, bufReal, bufClone, title, outPath, width = 880) {
  await c.setViewport({ width, height: 1050, mobile: false });
  const b64Real = bufReal.toString("base64");
  const b64Clone = bufClone.toString("base64");
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; background: #0f1117; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #fff; padding: 16px; box-sizing: border-box; }
        .hdr { text-align: center; margin-bottom: 12px; font-size: 15px; font-weight: 600; color: #f43f5e; }
        .grid { display: flex; gap: 16px; justify-content: center; }
        .col { flex: 1; max-width: 50%; display: flex; flex-direction: column; align-items: center; }
        .label { font-size: 12px; font-weight: 500; color: #94a3b8; margin-bottom: 6px; text-transform: uppercase; }
        img { width: 100%; height: auto; border-radius: 6px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 4px 16px rgba(0,0,0,0.5); display: block; }
      </style>
    </head>
    <body>
      <div class="hdr">${title}</div>
      <div class="grid">
        <div class="col">
          <div class="label">Web gốc (chungdoi.com)</div>
          <img src="data:image/png;base64,${b64Real}">
        </div>
        <div class="col">
          <div class="label">Bản clone (localhost:5173)</div>
          <img src="data:image/png;base64,${b64Clone}">
        </div>
      </div>
    </body>
    </html>
  `;
  await c.eval(`document.open(); document.write(${JSON.stringify(html)}); document.close();`);
  await new Promise((r) => setTimeout(r, 500));
  await c.screenshot(outPath);
}

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
          rect: { width: Math.round(r.width), height: Math.round(r.height), top: Math.round(r.top), left: Math.round(r.left) },
          computed: {
            fontFamily: cs.fontFamily,
            fontSize: cs.fontSize,
            lineHeight: cs.lineHeight,
            color: cs.color,
            backgroundColor: cs.backgroundColor,
            borderRadius: cs.borderRadius,
            padding: cs.padding,
            margin: cs.margin,
            maxWidth: cs.maxWidth,
            aspectRatio: cs.aspectRatio
          }
        };
      };

      // Header or Envelope wrap
      const envelope = getBox('[class*="envelope"], header .relative.aspect-, .aspect-\\\\[333\\\\/384\\\\]');
      const header = getBox('header');
      const card = getBox('section, .sp-section, .sp-family-sec, .sp-ceremony-card');
      const coverSeal = getBox('.wax-seal, [class*="seal"], div[style*="radial-gradient"]');
      const openBtn = getBox('button, a, .env-open-btn');
      
      // Check background
      const bodyBg = window.getComputedStyle(document.body).backgroundImage || '';
      const containerBgEl = document.querySelector('.paper-texture, [class*="paper"], .isolate');
      const containerBg = containerBgEl ? window.getComputedStyle(containerBgEl).backgroundImage : '';

      // Check overflow
      const docW = document.documentElement.offsetWidth;
      const scrollW = document.documentElement.scrollWidth;
      const hasHorizontalScroll = scrollW > docW + 1;

      // Extract particles
      const particles = Array.from(document.querySelectorAll('[style*="ambient-"], [class*="ambient"] *')).map(p => {
        return {
          color: p.style.color,
          fontSize: p.style.fontSize,
          animation: p.style.animation,
          tag: p.tagName,
          svg: p.querySelector('svg') ? 'svg-icon' : p.innerText ? p.innerText.trim() : 'no-icon'
        };
      }).slice(0, 10);

      return {
        hasHorizontalScroll,
        scrollW,
        docW,
        envelope,
        header,
        card,
        coverSeal,
        openBtn,
        bodyBg,
        containerBg,
        particlesCount: document.querySelectorAll('[style*="ambient-"], [class*="ambient"] *').length,
        particles
      };
    })()
  `);
}

async function runAudit() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();

  const auditResults = [];

  for (let idx = 0; idx < SAMPLES.length; idx++) {
    const s = SAMPLES[idx];
    console.log(`[${idx + 1}/10] Auditing ${s.name} (${s.slug})...`);

    const result = {
      slug: s.slug,
      id: s.id,
      name: s.name,
      mobile: {},
      laptop: {},
      networkErrors: { real: [], clone: [] },
      consoleErrors: { real: [], clone: [] },
      issues: []
    };

    const slugDir = path.join(SHOTS_DIR, s.slug);
    fs.mkdirSync(slugDir, { recursive: true });

    // ==========================================
    // 1. MOBILE 390x844
    // ==========================================
    await c.setViewport({ width: 390, height: 844, mobile: true });

    // 1A. Web gốc Cover Mobile
    const realCoverUrl = `https://chungdoi.com/vi/mau-thiep/${s.slug}/demo`;
    c.networkLogs = [];
    c.consoleLogs = [];
    await c.navigate(realCoverUrl, 3000);
    const realCoverMobileBuf = await c.screenshot();
    const realCoverMetricsMobile = await extractMetrics(c);
    const real404sCover = c.networkLogs.filter(n => n.response && n.response.status >= 400).map(n => n.response.url);
    const realConsoleCover = c.consoleLogs.filter(cl => cl.type === 'error').map(cl => cl.args.map(a => a.value).join(' '));

    // 1B. Localhost Cover Mobile
    const cloneCoverUrl = `http://localhost:5173/vi/mau-thiep/${s.slug}/demo`;
    c.networkLogs = [];
    c.consoleLogs = [];
    await c.navigate(cloneCoverUrl, 2500);
    const cloneCoverMobileBuf = await c.screenshot();
    const cloneCoverMetricsMobile = await extractMetrics(c);
    const clone404sCover = c.networkLogs.filter(n => n.response && n.response.status >= 400).map(n => n.response.url);
    const cloneConsoleCover = c.consoleLogs.filter(cl => cl.type === 'error').map(cl => cl.args.map(a => a.value).join(' '));

    await stitchSideBySide(c, realCoverMobileBuf, cloneCoverMobileBuf, `Cover Screen (Mobile 390x844): ${s.name}`, path.join(slugDir, "cover_mobile_comparison.png"));

    // 1C. Web gốc Opened Mobile
    await c.setViewport({ width: 390, height: 844, mobile: true });
    await c.navigate(realCoverUrl, 2000);
    // Click open
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('a, button, .wax-seal')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 2000));
    const realOpenedMobileBuf = await c.screenshot();
    const realOpenedMetricsMobile = await extractMetrics(c);

    // 1D. Localhost Opened Mobile
    await c.navigate(cloneCoverUrl, 2000);
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('a, button, .wax-seal')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 2000));
    const cloneOpenedMobileBuf = await c.screenshot();
    const cloneOpenedMetricsMobile = await extractMetrics(c);
    const clone404sOpened = c.networkLogs.filter(n => n.response && n.response.status >= 400).map(n => n.response.url);
    const cloneConsoleOpened = c.consoleLogs.filter(cl => cl.type === 'error').map(cl => cl.args.map(a => a.value).join(' '));

    await stitchSideBySide(c, realOpenedMobileBuf, cloneOpenedMobileBuf, `Opened Invitation (Mobile 390x844): ${s.name}`, path.join(slugDir, "opened_mobile_comparison.png"));

    // ==========================================
    // 2. LAPTOP 1440x900
    // ==========================================
    await c.setViewport({ width: 1440, height: 900, mobile: false });

    // 2A. Web gốc Cover Laptop
    await c.navigate(realCoverUrl, 2500);
    const realCoverLaptopBuf = await c.screenshot();
    const realCoverMetricsLaptop = await extractMetrics(c);

    // 2B. Localhost Cover Laptop
    await c.navigate(cloneCoverUrl, 2000);
    const cloneCoverLaptopBuf = await c.screenshot();
    const cloneCoverMetricsLaptop = await extractMetrics(c);

    await stitchSideBySide(c, realCoverLaptopBuf, cloneCoverLaptopBuf, `Cover Screen (Laptop 1440x900): ${s.name}`, path.join(slugDir, "cover_laptop_comparison.png"), 1200);

    // 2C. Web gốc Opened Laptop
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('a, button, .wax-seal')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 2000));
    const realOpenedLaptopBuf = await c.screenshot();
    const realOpenedMetricsLaptop = await extractMetrics(c);

    // 2D. Localhost Opened Laptop
    await c.navigate(cloneCoverUrl, 2000);
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('a, button, .wax-seal')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 2000));
    const cloneOpenedLaptopBuf = await c.screenshot();
    const cloneOpenedMetricsLaptop = await extractMetrics(c);

    await stitchSideBySide(c, realOpenedLaptopBuf, cloneOpenedLaptopBuf, `Opened Invitation (Laptop 1440x900): ${s.name}`, path.join(slugDir, "opened_laptop_comparison.png"), 1200);

    // Save metrics
    result.mobile = {
      cover: { real: realCoverMetricsMobile, clone: cloneCoverMetricsMobile },
      opened: { real: realOpenedMetricsMobile, clone: cloneOpenedMetricsMobile }
    };
    result.laptop = {
      cover: { real: realCoverMetricsLaptop, clone: cloneCoverMetricsLaptop },
      opened: { real: realOpenedMetricsLaptop, clone: cloneOpenedMetricsLaptop }
    };
    result.networkErrors = {
      real: [...new Set(real404sCover)],
      clone: [...new Set([...clone404sCover, ...clone404sOpened])]
    };
    result.consoleErrors = {
      real: [...new Set(realConsoleCover)],
      clone: [...new Set([...cloneConsoleCover, ...cloneConsoleOpened])]
    };

    // Analyze specific layout differences
    // 1. Envelope dimensions
    const realEnv = realOpenedMetricsMobile?.envelope?.rect;
    const cloneEnv = cloneOpenedMetricsMobile?.envelope?.rect;
    if (realEnv && cloneEnv) {
      if (Math.abs(realEnv.width - cloneEnv.width) > 4 || Math.abs(realEnv.height - cloneEnv.height) > 4) {
        result.issues.push({
          screen: "Thiệp chính (Header/Bì thư)",
          viewport: "Mobile 390x844",
          field: "Kích thước bì thư/đai",
          realVal: `${realEnv.width}x${realEnv.height}px`,
          cloneVal: `${cloneEnv.width}x${cloneEnv.height}px`,
          severity: Math.abs(realEnv.width - cloneEnv.width) > 20 ? "Cao" : "TB",
          fixFile: "src/features/invitation/components/generated/headers.tsx",
          suggestion: `Cân chỉnh lại width (${realEnv.width}px) và height (${realEnv.height}px) của khối phong bì header.`
        });
      }
    }

    // 2. Card dimensions
    const realCard = realOpenedMetricsMobile?.card?.rect;
    const cloneCard = cloneOpenedMetricsMobile?.card?.rect;
    if (realCard && cloneCard) {
      if (Math.abs(realCard.width - cloneCard.width) > 6) {
        result.issues.push({
          screen: "Thiệp chính (Khối thông tin)",
          viewport: "Mobile 390x844",
          field: "Độ rộng thẻ nội dung",
          realVal: `width: ${realCard.width}px (padding: ${realOpenedMetricsMobile?.card?.computed?.padding})`,
          cloneVal: `width: ${cloneCard.width}px (padding: ${cloneOpenedMetricsMobile?.card?.computed?.padding})`,
          severity: "TB",
          fixFile: "src/styles/styles.css",
          suggestion: `Điều chỉnh max-width/padding của thẻ để đạt width ${realCard.width}px như web gốc.`
        });
      }
    }

    // 3. Ambient particles
    const realPCount = realCoverMetricsMobile?.particlesCount || 0;
    const clonePCount = cloneCoverMetricsMobile?.particlesCount || 0;
    if (Math.abs(realPCount - clonePCount) > 5) {
      result.issues.push({
        screen: "Màn Hộp thư (Cover)",
        viewport: "Mobile 390x844",
        field: "Số lượng hạt hiệu ứng",
        realVal: `${realPCount} hạt`,
        cloneVal: `${clonePCount} hạt`,
        severity: "Thấp",
        fixFile: "src/features/invitation/components/covers/AmbientParticles.tsx",
        suggestion: `Điều chỉnh count từ ${clonePCount} thành ${realPCount} hạt cho khớp bản gốc.`
      });
    }

    // 4. Horizontal overflow
    if (cloneOpenedMetricsMobile?.hasHorizontalScroll) {
      result.issues.push({
        screen: "Thiệp chính",
        viewport: "Mobile 390x844",
        field: "Tràn viền ngang (Horizontal Overflow)",
        realVal: "Không tràn (scrollW = docW)",
        cloneVal: `Tràn ngang: scrollW=${cloneOpenedMetricsMobile.scrollW}px > docW=${cloneOpenedMetricsMobile.docW}px`,
        severity: "Cao",
        fixFile: "src/styles/styles.css",
        suggestion: "Thêm overflow-x: hidden vào container hoặc kiểm tra phần tử con bị min-width/cố định width."
      });
    }

    // 5. Laptop layout responsive
    if (cloneOpenedMetricsLaptop?.hasHorizontalScroll) {
      result.issues.push({
        screen: "Thiệp chính",
        viewport: "Laptop 1440x900",
        field: "Tràn viền ngang Desktop",
        realVal: "Không tràn",
        cloneVal: "Có thanh cuộn ngang",
        severity: "Cao",
        fixFile: "src/styles/styles.css",
        suggestion: "Giới hạn max-width màn desktop và ẩn overflow-x."
      });
    }

    // 6. Network 404
    if (result.networkErrors.clone.length > 0) {
      result.issues.push({
        screen: "Tất cả",
        viewport: "Chung",
        field: "Tài nguyên 404",
        realVal: "200 OK",
        cloneVal: `404: ${result.networkErrors.clone.join(", ")}`,
        severity: "Cao",
        fixFile: "public/images/",
        suggestion: "Bổ sung hoặc sửa đường dẫn ảnh bị thiếu."
      });
    }

    // 7. Console error
    if (result.consoleErrors.clone.length > 0) {
      result.issues.push({
        screen: "Tất cả",
        viewport: "Chung",
        field: "Lỗi Console",
        realVal: "Không có lỗi",
        cloneVal: result.consoleErrors.clone.join("; "),
        severity: "TB",
        fixFile: "src/",
        suggestion: "Sửa lỗi JavaScript runtime trong console."
      });
    }

    auditResults.push(result);
  }

  fs.writeFileSync(path.join(OUT_DIR, "audit_10_samples_raw.json"), JSON.stringify(auditResults, null, 2));
  console.log("Completed audit of 10 samples!");

  await c.close();
}

runAudit().catch(console.error);
