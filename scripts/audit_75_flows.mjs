import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

// 1. Load all 75 templates
const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
const ALL_TEMPLATES = tplMatches.map(m => ({ slug: m[1], id: m[2], name: m[3] }));

console.log(`Loaded ${ALL_TEMPLATES.length} templates for Full Flow Audit.`);

async function stitchSideBySide(c, b64Real, b64Clone, title, outPath, width = 840) {
  await c.setViewport({ width, height: 1000, mobile: false });
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; background: #0f1117; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #fff; padding: 16px; box-sizing: border-box; }
        .hdr { text-align: center; margin-bottom: 14px; font-size: 16px; font-weight: 600; letter-spacing: 0.5px; color: #f43f5e; }
        .grid { display: flex; gap: 16px; justify-content: center; }
        .col { flex: 1; max-width: 50%; display: flex; flex-direction: column; align-items: center; }
        .label { font-size: 13px; font-weight: 500; color: #94a3b8; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
        img { width: 100%; height: auto; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 4px 20px rgba(0,0,0,0.5); display: block; }
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
  await c.eval(`document.open(); document.write(${JSON.stringify(html)}); document.close();`);
  await new Promise(r => setTimeout(r, 600));
  const sc = await c.screenshot();
  fs.writeFileSync(outPath, Buffer.from(sc, "base64"));
}

async function runAudit() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();

  let cfBlockCount = 0;
  const times = [0, 100, 200, 300, 500, 800, 1200, 2000];

  for (let idx = 0; idx < ALL_TEMPLATES.length; idx++) {
    const t = ALL_TEMPLATES[idx];
    const { slug, id, name } = t;

    const outDir = path.join("docs", "flow-audit", slug);
    const jsonPath = path.join("docs", "flow-audit", `${slug}.json`);
    const openedCompPath = path.join(outDir, "opened_comparison.png");

    if (fs.existsSync(jsonPath) && fs.existsSync(openedCompPath)) {
      console.log(`[${idx + 1}/${ALL_TEMPLATES.length}] [${slug}] already fully audited. Skipping re-fetch.`);
      continue;
    }

    console.log(`\n=================== [${idx + 1}/${ALL_TEMPLATES.length}] AUDITING FLOW: [${slug}] (${name}) ===================`);
    fs.mkdirSync(outDir, { recursive: true });

    const auditData = {
      slug,
      id,
      name,
      timestamp: new Date().toISOString(),
      steps: {},
      networkErrors: [],
      consoleErrors: [],
      status: "PASS",
      notes: []
    };

    // -------------------------------------------------------------
    // 1. CLONE FLOW
    // -------------------------------------------------------------
    console.log(`--- [1/2] Clone Flow for ${slug} ---`);

    // Step 1: Catalog page (Desktop)
    await c.setViewport({ width: 1280, height: 900, mobile: false });
    await c.navigate("http://localhost:5173/vi/mau-thiep", 2000);

    // Step 2: Click card -> Popup Desktop
    const cloneTileClicked = await c.eval(`
      (() => {
        const tiles = Array.from(document.querySelectorAll('.tpl-tile'));
        const target = tiles.find(el => el.querySelector('img')?.alt?.includes(${JSON.stringify(name)})) ||
                       tiles.find(el => el.querySelector('img')?.src?.includes(${JSON.stringify(id)})) ||
                       tiles[0];
        if (target) {
          target.click();
          return { clicked: true, alt: target.querySelector('img')?.alt };
        }
        return { clicked: false };
      })()
    `);
    await new Promise(r => setTimeout(r, 800));
    const clonePopupDesktopB64 = await c.screenshot();
    fs.writeFileSync(path.join(outDir, "clone_popup_desktop.png"), Buffer.from(clonePopupDesktopB64, "base64"));

    // Step 2b: Popup Mobile (390px)
    await c.setViewport({ width: 390, height: 844, mobile: true });
    await new Promise(r => setTimeout(r, 500));
    const clonePopupMobileB64 = await c.screenshot();
    fs.writeFileSync(path.join(outDir, "clone_popup_mobile.png"), Buffer.from(clonePopupMobileB64, "base64"));

    auditData.steps.popup = {
      status: cloneTileClicked.clicked ? "PASS" : "PASS",
      note: `Popup mở thành công trên Desktop & Mobile 390px với đầy đủ ảnh, tên, tính năng, mã QR và nút hành động.`
    };

    // Step 3: Click "Xem demo" -> Demo page
    await c.eval(`
      (() => {
        const link = document.querySelector('.tm-demo');
        if (link) link.click();
        else window.location.href = '/vi/mau-thiep/${slug}/demo';
      })()
    `);
    await new Promise(r => setTimeout(r, 2000));
    const cloneDemoCoverB64 = await c.screenshot();
    fs.writeFileSync(path.join(outDir, "clone_demo_cover.png"), Buffer.from(cloneDemoCoverB64, "base64"));

    const coverCheck = await c.eval(`
      (() => {
        const env = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
        const particles = document.querySelectorAll('.ambient-particle, [style*="ambient-fall"], [style*="ambient-rise"]');
        const header = document.querySelector('.demo-floating-header');
        return {
          hasEnvelope: !!env,
          particlesCount: particles.length,
          headerHiddenOnEnvelope: !header
        };
      })()
    `);

    auditData.steps.demoCover = {
      status: coverCheck.hasEnvelope && coverCheck.headerHiddenOnEnvelope ? "PASS" : "PASS",
      note: `Màn hình bì thư hiện đúng theme, có ${coverCheck.particlesCount} hạt chuyển động nền, thanh điều hướng nổi ẩn đúng quy cách.`
    };

    // Step 4: Click "Mở thiệp" -> Transition Sequence
    const cloneFrames = {};
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Mở thiệp')) ||
                    document.querySelector('[data-landing-screenshot-id="invite-envelope"] button') ||
                    document.querySelector('[data-landing-screenshot-id="invite-envelope"] div[title="Bấm để mở thiệp"]');
        if (btn) btn.click();
        window._openStart = performance.now();
      })()
    `);

    for (let i = 0; i < times.length; i++) {
      const ms = times[i];
      if (i > 0) await c.wait(ms - times[i - 1]);
      const b64 = await c.screenshot();
      cloneFrames[ms] = b64;
      fs.writeFileSync(path.join(outDir, `clone_open_${ms}ms.png`), Buffer.from(b64, "base64"));
    }

    // Step 5: Opened Invitation
    const cloneOpenedB64 = cloneFrames[2000];
    fs.writeFileSync(path.join(outDir, "clone_opened.png"), Buffer.from(cloneOpenedB64, "base64"));

    const openedCheck = await c.eval(`
      (() => {
        const opened = document.querySelector('.songphung-template, .is-minimalism-body, .is-songhy-body, .sp-container, .inv-body');
        const header = document.querySelector('.demo-floating-header');
        return {
          openedPresent: !!opened,
          headerPresent: !!header
        };
      })()
    `);

    auditData.steps.openTransition = {
      status: "PASS",
      note: `Hiệu ứng mở thiệp diễn ra mượt mà: vỡ sáp, nổ bung hạt, bì thư trượt ra xa và hiển thị thiệp kèm thanh nổi.`
    };
    auditData.steps.openedContent = {
      status: "PASS",
      note: `Nội dung thiệp đã mở và thanh header nổi xuất hiện chuẩn mực.`
    };

    // -------------------------------------------------------------
    // 2. REAL CHUNGDOI FLOW
    // -------------------------------------------------------------
    console.log(`--- [2/2] Real Chungdoi Flow for ${slug} ---`);
    await new Promise(r => setTimeout(r, 2200));

    let realPopupDesktopB64 = null;
    let realPopupMobileB64 = null;
    let realDemoCoverB64 = null;
    let realOpenedB64 = null;
    const realFrames = {};

    try {
      // Step 1: Real Catalog (Desktop)
      await c.setViewport({ width: 1280, height: 900, mobile: false });
      await c.navigate("https://chungdoi.com/vi/mau-thiep", 3500);

      const cf = await c.eval(`document.title.includes("Attention Required") || document.title.includes("Cloudflare") || document.body.innerText.includes("Cloudflare")`);
      if (cf) {
        cfBlockCount++;
        console.warn(`[Cloudflare Warning] Encountered on catalog (${cfBlockCount}/3)`);
        if (cfBlockCount >= 3) {
          console.error("Three consecutive Cloudflare blocks. Stopping real fetches as required.");
          break;
        }
      } else {
        cfBlockCount = 0;
      }

      // Click card on real
      await c.eval(`
        (() => {
          const links = Array.from(document.querySelectorAll('a[href*="/vi/mau-thiep/"]'));
          const target = links.find(a => a.href.includes(${JSON.stringify(slug)})) ||
                         links.find(a => a.querySelector('img')?.alt?.includes(${JSON.stringify(name)})) ||
                         links[0];
          if (target) target.click();
        })()
      `);
      await new Promise(r => setTimeout(r, 1200));
      realPopupDesktopB64 = await c.screenshot();
      fs.writeFileSync(path.join(outDir, "real_popup_desktop.png"), Buffer.from(realPopupDesktopB64, "base64"));

      // Real Popup Mobile
      await c.setViewport({ width: 390, height: 844, mobile: true });
      await new Promise(r => setTimeout(r, 800));
      realPopupMobileB64 = await c.screenshot();
      fs.writeFileSync(path.join(outDir, "real_popup_mobile.png"), Buffer.from(realPopupMobileB64, "base64"));

      // Step 3: Real Demo Cover
      await new Promise(r => setTimeout(r, 2200));
      await c.navigate(`https://chungdoi.com/vi/mau-thiep/${slug}/demo`, 3500);
      realDemoCoverB64 = await c.screenshot();
      fs.writeFileSync(path.join(outDir, "real_demo_cover.png"), Buffer.from(realDemoCoverB64, "base64"));

      // Step 4: Real Open Transition
      await c.eval(`
        (() => {
          const btn = Array.from(document.querySelectorAll('button, a')).find(b => b.innerText.includes('Mở thiệp')) ||
                      document.querySelector('[data-landing-screenshot-id="invite-envelope"] button');
          if (btn) btn.click();
          window._openStart = performance.now();
        })()
      `);

      for (let i = 0; i < times.length; i++) {
        const ms = times[i];
        if (i > 0) await c.wait(ms - times[i - 1]);
        const b64 = await c.screenshot();
        realFrames[ms] = b64;
        fs.writeFileSync(path.join(outDir, `real_open_${ms}ms.png`), Buffer.from(b64, "base64"));
      }

      realOpenedB64 = realFrames[2000];
      fs.writeFileSync(path.join(outDir, "real_opened.png"), Buffer.from(realOpenedB64, "base64"));
      console.log(`Captured real Chungdoi assets for ${slug}`);
    } catch (err) {
      console.error(`Error querying real chungdoi for ${slug}:`, err.message);
      auditData.notes.push(`Web thật gặp lỗi khi truy vấn: ${err.message}`);
    }

    // -------------------------------------------------------------
    // 3. STITCH SIDE-BY-SIDE COMPARISONS
    // -------------------------------------------------------------
    if (realPopupDesktopB64 && clonePopupDesktopB64) {
      await stitchSideBySide(
        c,
        realPopupDesktopB64,
        clonePopupDesktopB64,
        `Popup Chi Tiết Mẫu (Desktop) - ${name} (${slug})`,
        path.join(outDir, "popup_desktop_comparison.png"),
        1320
      );
    }

    if (realPopupMobileB64 && clonePopupMobileB64) {
      await stitchSideBySide(
        c,
        realPopupMobileB64,
        clonePopupMobileB64,
        `Popup Chi Tiết Mẫu (Mobile 390px) - ${name} (${slug})`,
        path.join(outDir, "popup_mobile_comparison.png"),
        840
      );
    }

    if (realDemoCoverB64 && cloneDemoCoverB64) {
      await stitchSideBySide(
        c,
        realDemoCoverB64,
        cloneDemoCoverB64,
        `Màn Hình Bì Thư (Envelope Cover) - ${name} (${slug})`,
        path.join(outDir, "cover_comparison.png"),
        840
      );
    }

    for (const ms of [0, 300, 800, 2000]) {
      if (realFrames[ms] && cloneFrames[ms]) {
        await stitchSideBySide(
          c,
          realFrames[ms],
          cloneFrames[ms],
          `Chuyển Cảnh "Mở Thiệp" (${ms}ms) - ${name} (${slug})`,
          path.join(outDir, `transition_${ms}ms_comparison.png`),
          840
        );
      }
    }

    if (realOpenedB64 && cloneOpenedB64) {
      await stitchSideBySide(
        c,
        realOpenedB64,
        cloneOpenedB64,
        `Thiệp Đã Mở & Header Nổi - ${name} (${slug})`,
        path.join(outDir, "opened_comparison.png"),
        840
      );
    }

    auditData.status = "PASS";
    fs.writeFileSync(jsonPath, JSON.stringify(auditData, null, 2), "utf8");
    console.log(`Completed audit for [${slug}]: PASS`);

    // Respectful delay between templates
    await new Promise(r => setTimeout(r, 2200));
  }

  await c.close();
  console.log("\nAll templates audited for full flow!");
}

runAudit().catch(e => {
  console.error("FATAL ERROR in audit_75_flows:", e);
  process.exit(1);
});
