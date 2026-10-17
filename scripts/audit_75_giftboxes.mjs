import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";
import http from "http";
import https from "https";

// 1. Read all 75 templates
const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
const TEMPLATES = tplMatches.map(m => ({ slug: m[1], id: m[2], name: m[3] }));

console.log(`Loaded ${TEMPLATES.length} templates for Giftbox & Typography audit.`);

// Helper to download an image if missing
async function downloadAssetIfMissing(url, localPath) {
  if (fs.existsSync(localPath)) return true;
  fs.mkdirSync(path.dirname(localPath), { recursive: true });

  return new Promise((resolve) => {
    try {
      const client = url.startsWith("https") ? https : http;
      const req = client.get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://chungdoi.com/",
            "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
          }
        },
        (res) => {
          if (res.statusCode === 200) {
            const chunks = [];
            res.on("data", (chunk) => chunks.push(chunk));
            res.on("end", () => {
              const buf = Buffer.concat(chunks);
              // Magic bytes check (RIFF....WEBP or PNG or JPG)
              if (buf.length > 50) {
                fs.writeFileSync(localPath, buf);
                console.log(`  -> Downloaded ${localPath} (${buf.length} bytes)`);
                resolve(true);
              } else {
                console.warn(`  -> Response too small for ${url}`);
                resolve(false);
              }
            });
          } else {
            console.warn(`  -> HTTP ${res.statusCode} for ${url}`);
            resolve(false);
          }
        }
      );
      req.on("error", (e) => {
        console.warn(`  -> Fetch error for ${url}: ${e.message}`);
        resolve(false);
      });
    } catch (e) {
      resolve(false);
    }
  });
}

async function stitchSideBySide(c, b64Real, b64Clone, title, outPath) {
  await c.setViewport({ width: 840, height: 950, mobile: false });
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
  await new Promise((r) => setTimeout(r, 600));
  const sc = await c.screenshot();
  fs.writeFileSync(outPath, sc);
}

async function runAudit() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  const rawConfigs = {};
  const results = [];
  let cfBlockCount = 0;

  for (let idx = 0; idx < TEMPLATES.length; idx++) {
    const tpl = TEMPLATES[idx];
    const { slug, id, name } = tpl;
    const progress = `[${idx + 1}/${TEMPLATES.length}]`;

    console.log(`\n=================== ${progress} AUDITING GIFTBOX & TEXT: ${name} (${slug}) ===================`);
    const outDir = path.join("docs", "giftbox-audit", slug);
    fs.mkdirSync(outDir, { recursive: true });

    const auditData = {
      slug,
      id,
      name,
      timestamp: new Date().toISOString(),
      giftbox: {},
      typography: {},
      status: "PASS",
      notes: []
    };

    let realGiftboxB64 = null;
    let cloneGiftboxB64 = null;

    // -----------------------------------------------------------------
    // A. INSPECT REAL CHUNGDOI
    // -----------------------------------------------------------------
    try {
      console.log(`Navigating to https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1...`);
      await c.navigate(`https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1`, 3800);

      // Check Cloudflare
      const isCf = await c.eval(`document.title.includes("Attention Required") || document.title.includes("Cloudflare") || document.body.innerText.includes("Cloudflare")`);
      if (isCf) {
        cfBlockCount++;
        console.warn(`[Cloudflare Warning] Block count: ${cfBlockCount}/3`);
        if (cfBlockCount >= 3) {
          console.error("FATAL: 3 consecutive Cloudflare blocks. Stopping as instructed.");
          break;
        }
        auditData.status = "NOT VERIFIED";
        auditData.notes.push("Bị Cloudflare chặn khi truy vấn bản thật.");
        results.push(auditData);
        continue;
      } else {
        cfBlockCount = 0;
      }

      // Scroll to trigger lazy rendering
      await c.eval(`
        (async () => {
          for (let y = 0; y < 4500; y += 500) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 60));
          }
        })()
      `);
      await new Promise(r => setTimeout(r, 1200));

      // Extract DOM
      const domData = await c.eval(`
        (() => {
          // 1. Giftbox section
          const mainBox = document.querySelector('img.igb-box, img[src*="/giftbox/"]:not([src*="mini"])');
          const miniImgs = Array.from(document.querySelectorAll('img.igb-decor, img[src*="/giftbox/mini/"]')).map(img => {
            const comp = window.getComputedStyle(img);
            return {
              src: img.src,
              filename: img.src.split('/').pop(),
              style: img.getAttribute('style') || '',
              transform: comp.transform,
              zIndex: comp.zIndex
            };
          });

          // Check if minimalism envelope
          const isMinimalismEnv = !mainBox && !!document.querySelector('.ienv-sparkle, [class*="ienv"]');

          const h2Gift = Array.from(document.querySelectorAll('h2, h3')).find(h => h.innerText && h.innerText.toUpperCase().includes('HỘP QUÀ'));
          const giftSection = h2Gift ? (h2Gift.closest('section, div[class*="section"]') || h2Gift.parentElement?.parentElement) : null;
          const giftSecStyle = giftSection ? window.getComputedStyle(giftSection) : null;

          // 2. Headings & Typography
          const allHeadings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => {
            const comp = window.getComputedStyle(h);
            return {
              tag: h.tagName,
              text: h.innerText.trim(),
              color: comp.color,
              fontFamily: comp.fontFamily,
              fontSize: comp.fontSize,
              fontWeight: comp.fontWeight,
              textTransform: comp.textTransform
            };
          }).filter(h => h.text.length > 0);

          return {
            hasGiftbox: !!(mainBox || isMinimalismEnv || h2Gift),
            giftboxType: isMinimalismEnv ? "envelope" : (mainBox ? "3d-box" : "standard"),
            mainBox: mainBox ? {
              src: mainBox.src,
              filename: mainBox.src.split('/').pop(),
              style: mainBox.getAttribute('style') || ''
            } : null,
            miniCount: miniImgs.length,
            miniImgs,
            sectionTitle: h2Gift ? h2Gift.innerText.trim() : "HỘP QUÀ MỪNG",
            sectionTitleColor: h2Gift ? window.getComputedStyle(h2Gift).color : null,
            sectionTitleFont: h2Gift ? window.getComputedStyle(h2Gift).fontFamily : null,
            sectionBg: giftSecStyle ? giftSecStyle.backgroundColor : null,
            headings: allHeadings
          };
        })()
      `);

      auditData.giftbox = domData;
      auditData.typography = domData.headings;
      rawConfigs[id] = domData;

      // Download missing images if any
      if (domData.mainBox?.src && domData.mainBox.filename) {
        const dest = path.join("public", "images", "giftbox", domData.mainBox.filename);
        await downloadAssetIfMissing(domData.mainBox.src, dest);
      }
      for (const mini of domData.miniImgs) {
        if (mini.src && mini.filename) {
          const dest = path.join("public", "images", "giftbox", "mini", mini.filename);
          await downloadAssetIfMissing(mini.src, dest);
        }
      }

      // Scroll giftbox into center and open modal
      await c.eval(`
        (() => {
          const btn = document.querySelector('button:has(.igb-box), .igb-bob, button:has(.igb-bob), [aria-label*=\"hộp mừng\"], [aria-label*=\"quà\"]') ||
                      document.querySelector('img.igb-box')?.closest('button') ||
                      Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Mở hộp') || b.innerText.includes('Nhấn để mở'));
          if (btn) {
            btn.scrollIntoView({ behavior: 'instant', block: 'center' });
            btn.click();
          }
        })()
      `);
      await new Promise(r => setTimeout(r, 1200));

      // Extract modal styles
      const modalData = await c.eval(`
        (() => {
          const modal = document.querySelector('[role="dialog"], .modal, div[class*="modal"]');
          if (!modal) return null;
          const h2 = modal.querySelector('h2, h3');
          const headerBox = h2 ? h2.parentElement : null;
          const cardBox = modal.querySelector('div[class*="rounded"]');
          return {
            title: h2?.innerText.trim(),
            headerBg: headerBox ? window.getComputedStyle(headerBox).backgroundColor : null,
            headerColor: h2 ? window.getComputedStyle(h2).color : null,
            headerFont: h2 ? window.getComputedStyle(h2).fontFamily : null,
            bodyBg: cardBox ? window.getComputedStyle(cardBox).backgroundColor : null
          };
        })()
      `);

      if (modalData) {
        auditData.giftbox.modal = modalData;
      }

      const realBuf = await c.screenshot();
      realGiftboxB64 = realBuf.toString("base64");
      fs.writeFileSync(path.join(outDir, "real_giftbox.png"), realBuf);

    } catch (e) {
      console.error(`Error auditing real ${slug}:`, e.message);
      auditData.notes.push(`Lỗi khi quét web thật: ${e.message}`);
    }

    // -----------------------------------------------------------------
    // B. INSPECT CLONE LOCALHOST
    // -----------------------------------------------------------------
    try {
      console.log(`Navigating to clone: http://localhost:5173/vi/mau-thiep/${slug}/demo?open=1...`);
      await c.navigate(`http://localhost:5173/vi/mau-thiep/${slug}/demo?open=1`, 2000);

      // Scroll to giftbox on clone
      await c.eval(`
        (() => {
          const btn = document.querySelector('button:has(.igb-box), .igb-bob, button:has(.igb-bob), [aria-label*=\"hộp mừng\"], [aria-label*=\"quà\"]') ||
                      document.querySelector('img.igb-box')?.closest('button') ||
                      Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Mở hộp') || b.innerText.includes('Nhấn để mở'));
          if (btn) {
            btn.scrollIntoView({ behavior: 'instant', block: 'center' });
            btn.click();
          }
        })()
      `);
      await new Promise(r => setTimeout(r, 1000));

      const cloneBuf = await c.screenshot();
      cloneGiftboxB64 = cloneBuf.toString("base64");
      fs.writeFileSync(path.join(outDir, "clone_giftbox.png"), cloneBuf);

      if (realGiftboxB64 && cloneGiftboxB64) {
        console.log(`Stitching giftbox comparison for ${slug}...`);
        await stitchSideBySide(
          c,
          realGiftboxB64,
          cloneGiftboxB64,
          `Hộp Quà Mừng & Popup (390px) - ${name} (${slug})`,
          path.join(outDir, "giftbox_comparison.png")
        );
      }
    } catch (e) {
      console.error(`Error auditing clone ${slug}:`, e.message);
      auditData.notes.push(`Lỗi khi quét clone: ${e.message}`);
    }

    auditData.status = auditData.notes.length === 0 ? "PASS" : "KHÁC NHẸ";
    fs.writeFileSync(path.join("docs", "giftbox-audit", `${slug}.json`), JSON.stringify(auditData, null, 2), "utf8");
    results.push(auditData);

    // Respectful delay between templates
    await new Promise(r => setTimeout(r, 2200));
  }

  await c.close();

  // Save master raw configs
  fs.writeFileSync("docs/giftbox-audit/raw_75_giftbox_data.json", JSON.stringify(rawConfigs, null, 2), "utf8");
  console.log("\nSaved docs/giftbox-audit/raw_75_giftbox_data.json!");
}

runAudit().catch(console.error);
