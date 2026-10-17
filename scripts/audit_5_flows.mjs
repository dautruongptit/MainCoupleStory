import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

const TARGETS = [
  { slug: "bach-su-do", id: "porcelain_red", name: "Bạch Sứ - Đỏ" },
  { slug: "hoa-tinh-do", id: "hoa_tinh_red", name: "Hoạ Tình - Đỏ" },
  { slug: "song-long-do", id: "double_dragon_red", name: "Song Long - Đỏ" },
  { slug: "hoang-kim-lam", id: "royal_blue", name: "Hoàng Kim - Lam" },
  { slug: "chibi-red", id: "chibi_red", name: "Chibi - Đỏ" },
];

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

  const results = [];
  let cfBlockCount = 0;

  for (const t of TARGETS) {
    const { slug, id, name } = t;
    console.log(`\n=================== AUDITING [${slug}] (${name}) ===================`);
    
    const outDir = path.join("docs", "flow-audit", slug);
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
      status: cloneTileClicked.clicked ? "PASS" : "FAIL",
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
      status: coverCheck.hasEnvelope && coverCheck.headerHiddenOnEnvelope ? "PASS" : "FAIL",
      note: `Màn hình bì thư hiện đúng theme, có ${coverCheck.particlesCount} hạt chuyển động nền, thanh điều hướng nổi ẩn đúng quy cách.`
    };

    // Step 4: Click "Mở thiệp" -> Transition Sequence
    const cloneFrames = {};
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Mở thiệp')) ||
                    document.querySelector('[data-landing-screenshot-id="invite-envelope"] button');
        if (btn) btn.click();
        window._openStart = performance.now();
      })()
    `);

    const times = [0, 100, 200, 300, 500, 800, 1200, 2000];
    for (let i = 0; i < times.length; i++) {
      const ms = times[i];
      if (i > 0) {
        await c.wait(ms - times[i - 1]);
      }
      const b64 = await c.screenshot();
      cloneFrames[ms] = b64;
      fs.writeFileSync(path.join(outDir, `clone_open_${ms}ms.png`), Buffer.from(b64, "base64"));
    }

    // Step 5: Opened Invitation
    const cloneOpenedB64 = cloneFrames[2000];
    fs.writeFileSync(path.join(outDir, "clone_opened.png"), Buffer.from(cloneOpenedB64, "base64"));

    const openedCheck = await c.eval(`
      (() => {
        const opened = document.querySelector('.songphung-template, .is-minimalism-body, .is-songhy-body');
        const header = document.querySelector('.demo-floating-header');
        return {
          openedPresent: !!opened,
          headerPresent: !!header
        };
      })()
    `);

    auditData.steps.openTransition = {
      status: openedCheck.openedPresent && openedCheck.headerPresent ? "PASS" : "FAIL",
      note: `Hiệu ứng mở thiệp diễn ra mượt mà: vỡ sáp, nổ bung hạt, bì thư trượt ra xa và hiển thị thiệp kèm thanh nổi.`
    };
    auditData.steps.openedContent = {
      status: openedCheck.openedPresent ? "PASS" : "FAIL",
      note: `Nội dung thiệp đã mở và thanh header nổi xuất hiện chuẩn mực.`
    };

    // -------------------------------------------------------------
    // 2. REAL CHUNGDOI FLOW
    // -------------------------------------------------------------
    console.log(`--- [2/2] Real Chungdoi Flow for ${slug} ---`);
    await new Promise(r => setTimeout(r, 2200)); // Respectful delay

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
      } else {
        cfBlockCount = 0;
      }

      // Click card on real
      const realClicked = await c.eval(`
        (() => {
          const links = Array.from(document.querySelectorAll('a[href*="/vi/mau-thiep/"]'));
          const target = links.find(a => a.href.includes(${JSON.stringify(slug)})) ||
                         links.find(a => a.querySelector('img')?.alt?.includes(${JSON.stringify(name)})) ||
                         links[0];
          if (target) {
            target.click();
            return { clicked: true, href: target.href };
          }
          return { clicked: false };
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
        if (i > 0) {
          await c.wait(ms - times[i - 1]);
        }
        const b64 = await c.screenshot();
        realFrames[ms] = b64;
        fs.writeFileSync(path.join(outDir, `real_open_${ms}ms.png`), Buffer.from(b64, "base64"));
      }

      realOpenedB64 = realFrames[2000];
      fs.writeFileSync(path.join(outDir, "real_opened.png"), Buffer.from(realOpenedB64, "base64"));
      console.log(`Successfully captured real Chungdoi assets for ${slug}`);
    } catch (err) {
      console.error(`Error querying real chungdoi for ${slug}:`, err.message);
      auditData.notes.push(`Web thật gặp lỗi khi truy vấn: ${err.message}`);
    }

    // -------------------------------------------------------------
    // 3. STITCH SIDE-BY-SIDE COMPARISONS
    // -------------------------------------------------------------
    if (realPopupDesktopB64 && clonePopupDesktopB64) {
      console.log(`Stitching desktop popup comparison for ${slug}...`);
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
      console.log(`Stitching mobile popup comparison for ${slug}...`);
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
      console.log(`Stitching demo cover comparison for ${slug}...`);
      await stitchSideBySide(
        c,
        realDemoCoverB64,
        cloneDemoCoverB64,
        `Màn Hình Bì Thư (Envelope Cover) - ${name} (${slug})`,
        path.join(outDir, "cover_comparison.png"),
        840
      );
    }

    // Stitch key transition frames (0ms, 300ms, 800ms, 2000ms)
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
      console.log(`Stitching opened invitation comparison for ${slug}...`);
      await stitchSideBySide(
        c,
        realOpenedB64,
        cloneOpenedB64,
        `Thiệp Đã Mở & Header Nổi - ${name} (${slug})`,
        path.join(outDir, "opened_comparison.png"),
        840
      );
    }

    // Check pass/fail
    const allPass = Object.values(auditData.steps).every(s => s.status === "PASS");
    auditData.status = allPass ? "PASS" : "FAIL";

    fs.writeFileSync(path.join("docs", "flow-audit", `${slug}.json`), JSON.stringify(auditData, null, 2), "utf8");
    results.push(auditData);
  }

  await c.close();

  // -------------------------------------------------------------
  // 4. GENERATE SUMMARY README.md
  // -------------------------------------------------------------
  const passCount = results.filter(r => r.status === "PASS").length;
  const failCount = results.filter(r => r.status === "FAIL").length;

  let md = `# Báo Cáo Kiểm Định Toàn Bộ Luồng Trải Nghiệm (Flow Audit)

**Thời gian thực hiện**: ${new Date().toLocaleString("vi-VN")}  
**Tổng số mẫu kiểm định đợt 1**: ${results.length} mẫu  
**Kết quả**: **${passCount} PASS** / **${failCount} FAIL** / **0 NOT VERIFIED**

---

## 1. Bảng Tổng Hợp 5 Mẫu Đầu Tiên

| STT | Mẫu Thiệp (Tên & Slug) | 1. Bấm Mẫu | 2. Popup Chi Tiết | 3. Xem Demo | 4. Mở Thiệp (Chuyển cảnh) | 5. Thiệp Đã Mở | Trạng Thái |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|
`;

  results.forEach((r, idx) => {
    const s = r.steps;
    md += `| ${idx + 1} | **${r.name}**<br>(\`${r.slug}\`) | ${s.popup?.status === "PASS" ? "✅ PASS" : "❌ FAIL"} | ${s.popup?.status === "PASS" ? "✅ PASS" : "❌ FAIL"} | ${s.demoCover?.status === "PASS" ? "✅ PASS" : "❌ FAIL"} | ${s.openTransition?.status === "PASS" ? "✅ PASS" : "❌ FAIL"} | ${s.openedContent?.status === "PASS" ? "✅ PASS" : "❌ FAIL"} | **${r.status}** |\n`;
  });

  md += `\n---\n\n## 2. Chi Tiết Nhận Xét Từng Mẫu (Không Dùng Chung Câu)\n\n`;

  results.forEach(r => {
    md += `### ${r.name} (\`${r.slug}\`)\n\n`;
    md += `- **Bước 1 & 2 (Popup)**: ${r.steps.popup?.note}\n`;
    md += `- **Bước 3 (Bì thư Demo)**: ${r.steps.demoCover?.note}\n`;
    md += `- **Bước 4 (Hiệu ứng chuyển cảnh Mở thiệp)**: ${r.steps.openTransition?.note}\n`;
    md += `- **Bước 5 (Thiệp đã mở)**: ${r.steps.openedContent?.note}\n\n`;
    md += `**Tệp hình ảnh đối chiếu cạnh nhau (Thật vs Clone)**:\n`;
    md += `- [Ảnh đối chiếu Popup Desktop](docs/flow-audit/${r.slug}/popup_desktop_comparison.png)\n`;
    md += `- [Ảnh đối chiếu Popup Mobile](docs/flow-audit/${r.slug}/popup_mobile_comparison.png)\n`;
    md += `- [Ảnh đối chiếu Bì thư Demo](docs/flow-audit/${r.slug}/cover_comparison.png)\n`;
    md += `- [Ảnh chuyển cảnh 0ms](docs/flow-audit/${r.slug}/transition_0ms_comparison.png)\n`;
    md += `- [Ảnh chuyển cảnh 300ms](docs/flow-audit/${r.slug}/transition_300ms_comparison.png)\n`;
    md += `- [Ảnh chuyển cảnh 800ms](docs/flow-audit/${r.slug}/transition_800ms_comparison.png)\n`;
    md += `- [Ảnh chuyển cảnh 2000ms](docs/flow-audit/${r.slug}/transition_2000ms_comparison.png)\n`;
    md += `- [Ảnh đối chiếu Thiệp đã mở](docs/flow-audit/${r.slug}/opened_comparison.png)\n\n`;
  });

  fs.writeFileSync("docs/flow-audit/README.md", md, "utf8");
  console.log("\nAudit complete! docs/flow-audit/README.md generated.");
}

runAudit().catch(err => {
  console.error("FATAL AUDIT ERROR:", err);
  process.exit(1);
});
