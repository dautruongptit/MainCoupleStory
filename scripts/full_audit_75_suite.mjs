import { ChromeController } from "./cdp_helper.mjs";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const SCREENSHOT_DIR = "d:/MY PRO/applications/MainCoupleStory/web/docs/audit-screenshots";
if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR, { recursive: true });

// Read templates and reference couples
const tplContent = readFileSync("src/features/templates/data/templates.ts", "utf-8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];

const templates = tplMatches.map((m, idx) => ({
  stt: idx + 1,
  slug: m[1],
  id: m[2],
  name: m[3]
}));

console.log(`Loaded ${templates.length} templates for auditing.`);

const refCouples = JSON.parse(readFileSync("scripts/reference_couples.json", "utf-8"));
const remoteData = JSON.parse(readFileSync("scripts/remote_75_audit_data.json", "utf-8"));
const remoteMap = new Map(remoteData.map(r => [r.id, r]));

async function runAudit() {
  const c = new ChromeController();
  console.log("=== STARTING COMPREHENSIVE 75-TEMPLATE AUDIT SUITE ===");
  await c.start();
  await c.newPage("about:blank");

  const results = [];
  const errors = [];

  for (let i = 0; i < templates.length; i++) {
    const t = templates[i];
    const remote = remoteMap.get(t.id) || {};
    const refCouple = refCouples[t.id] || { groom: "", bride: "" };
    
    process.stdout.write(`[${t.stt}/75] Auditing: ${t.name} (${t.id})... `);
    
    const resultItem = {
      stt: t.stt,
      id: t.id,
      slug: t.slug,
      name: t.name,
      remoteUrl: `https://chungdoi.com/vi/mau-thiep/${t.slug}/demo`,
      localDemoUrl: `http://localhost:5173/vi/mau-thiep/${t.slug}/demo`,
      localCreateUrl: `http://localhost:5173/invitations/create/${t.id}`,
      assetStatus: "PENDING",
      textStatus: "PENDING",
      visualTest: "PENDING",
      functionalTest: "PENDING",
      status: "PENDING",
      desktopScreenshot: `docs/audit-screenshots/${t.slug}_desktop.png`,
      mobileScreenshot: `docs/audit-screenshots/${t.slug}_mobile.png`,
      issues: []
    };

    try {
      // 1. Local Demo Desktop Viewport
      await c.setViewport({ width: 1280, height: 900, mobile: false });
      await c.navigate(`http://localhost:5173/vi/mau-thiep/${t.slug}/demo`, 1000);

      // Open envelope if present
      const envelopeOpenResult = await c.eval(`
        (() => {
          const bodyText = document.body.innerText || '';
          const notFound = !!document.querySelector('.not-found-screen') || bodyText.includes('Không tìm thấy mẫu thiệp');
          if (notFound) return { notFound: true };

          const openBtn = document.querySelector('.env-open-btn') || 
                          document.querySelector('.wax-seal-btn') || 
                          document.querySelector('.wax-seal') || 
                          document.querySelector('.envelope-seal') ||
                          Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Mở thiệp'));
          if (openBtn) {
            openBtn.click();
            return { clicked: true, notFound: false };
          }
          return { clicked: false, notFound: false };
        })()
      `);

      if (envelopeOpenResult.clicked) {
        await c.wait(600);
      }

      // Check opened DOM
      const demoDom = await c.eval(`
        (() => {
          const bodyText = document.body.innerText || '';
          const notFound = !!document.querySelector('.not-found-screen') || bodyText.includes('Không tìm thấy mẫu thiệp');
          
          // Header detection
          const header = document.querySelector('.header-wrap, .tpl-hdr, .header, header, .songphung-template, [class*=\"max-w-[480px]\"]');
          
          // Theme assets
          const imgs = Array.from(document.querySelectorAll('img')).map(img => img.src);
          const themeImgs = imgs.filter(src => src.includes('/images/themes/'));
          
          return {
            notFound,
            headerFound: !!header,
            bodyText: bodyText.slice(0, 2000),
            themeImgsCount: themeImgs.length,
            sampleThemeImgs: themeImgs.slice(0, 3)
          };
        })()
      `);

      // Capture desktop screenshot
      await c.screenshot(`docs/audit-screenshots/${t.slug}_desktop.png`);

      // 2. Mobile Viewport & Screenshot
      await c.setViewport({ width: 390, height: 844, mobile: true });
      await c.wait(300);
      await c.screenshot(`docs/audit-screenshots/${t.slug}_mobile.png`);

      // 3. Functional Test: Editor Create & Live Preview Flow
      await c.setViewport({ width: 1280, height: 900, mobile: false });
      await c.navigate(`http://localhost:5173/invitations/create/${t.id}`, 900);

      const editorCheck = await c.eval(`
        (() => {
          const isEditMode = !document.querySelector('.editor-preview') && !!document.querySelector('.body, .editor-body, main');
          const hasEnvelope = !!document.querySelector('.envelope-screen, .darkred-env-screen');
          return {
            isEditMode,
            hasEnvelope
          };
        })()
      `);

      // Set input values using exact placeholder matching
      const testGroom = "Lê Tuấn Vũ";
      const testBride = "Vũ Thảo My";
      await c.setInputValue("input[placeholder*='Thế Bảo']", testGroom);
      await c.setInputValue("input[placeholder*='Ngọc Ánh']", testBride);
      await c.wait(300);

      // Switch to Preview tab
      await c.eval(`
        (() => {
          const btn = Array.from(document.querySelectorAll(".mode-toggle button")).find(b => b.textContent.includes("Xem trước"));
          if (btn) btn.click();
        })()
      `);
      await c.wait(600);

      const previewCheck = await c.eval(`
        (() => {
          const cardText = document.body.innerText || '';
          const hasEnvelope = !!document.querySelector('.envelope-screen, .darkred-env-screen');
          const header = !!document.querySelector('.header-wrap, .tpl-hdr, .header, header, .songphung-template, [class*=\"max-w-[480px]\"]');
          return {
            hasEnvelope,
            hasHeader: header,
            hasGroom: cardText.includes('Lê Tuấn Vũ'),
            hasBride: cardText.includes('Vũ Thảo My')
          };
        })()
      `);

      // Switch back to Edit tab to verify retention
      await c.eval(`
        (() => {
          const btn = Array.from(document.querySelectorAll(".mode-toggle button")).find(b => b.textContent.includes("Chỉnh sửa"));
          if (btn) btn.click();
        })()
      `);
      await c.wait(300);

      const retentionCheck = await c.eval(`
        (() => {
          const gVal = document.querySelector("input[placeholder*='Thế Bảo']")?.value || '';
          const bVal = document.querySelector("input[placeholder*='Ngọc Ánh']")?.value || '';
          return {
            retained: gVal === 'Lê Tuấn Vũ' && bVal === 'Vũ Thảo My'
          };
        })()
      `);

      // Evaluate Checks
      // Asset Check
      const assetOk = !demoDom.notFound;
      resultItem.assetStatus = assetOk ? "PASS" : "FAIL";
      if (!assetOk) resultItem.issues.push("Demo page returned 404 / Not Found.");

      // Text Check
      const groomLastName = refCouple.groom ? refCouple.groom.split(" ").pop() : "";
      const brideLastName = refCouple.bride ? refCouple.bride.split(" ").pop() : "";
      const textOk = demoDom.bodyText.includes(groomLastName) || demoDom.bodyText.includes(brideLastName);
      resultItem.textStatus = textOk ? "PASS" : "FAIL";
      if (!textOk) resultItem.issues.push(`Text check failed: '${refCouple.groom} & ${refCouple.bride}' not found in body text.`);

      // Visual Check
      const visualOk = demoDom.headerFound && !demoDom.notFound;
      resultItem.visualTest = visualOk ? "PASS" : "FAIL";
      if (!demoDom.headerFound) resultItem.issues.push("Main template header not found after envelope opened.");

      // Functional Check
      const funcOk = !editorCheck.hasEnvelope && !previewCheck.hasEnvelope && previewCheck.hasHeader && previewCheck.hasGroom && previewCheck.hasBride && retentionCheck.retained;
      resultItem.functionalTest = funcOk ? "PASS" : "FAIL";
      if (editorCheck.hasEnvelope || previewCheck.hasEnvelope) resultItem.issues.push("Envelope screen appeared in editor preview flow.");
      if (!previewCheck.hasGroom || !previewCheck.hasBride) resultItem.issues.push("Live reactive update failed in preview.");
      if (!retentionCheck.retained) resultItem.issues.push("Input state not retained when switching back to edit.");

      // Final status
      if (resultItem.assetStatus === "PASS" && resultItem.textStatus === "PASS" && resultItem.visualTest === "PASS" && resultItem.functionalTest === "PASS") {
        resultItem.status = "PASS";
        console.log("[PASS]");
      } else {
        resultItem.status = "FAIL";
        console.log(`[FAIL] (${resultItem.issues.join("; ")})`);
        errors.push({ id: t.id, slug: t.slug, issues: resultItem.issues });
      }

    } catch (err) {
      console.log(`[FAIL - Error: ${err.message}]`);
      resultItem.status = "FAIL";
      resultItem.assetStatus = "FAIL";
      resultItem.textStatus = "FAIL";
      resultItem.visualTest = "FAIL";
      resultItem.functionalTest = "FAIL";
      resultItem.issues.push(`Runtime error: ${err.message}`);
      errors.push({ id: t.id, slug: t.slug, issues: [err.message] });
    }

    results.push(resultItem);
  }

  await c.close();

  // Save audit data
  writeFileSync("scripts/audit_75_full_results.json", JSON.stringify(results, null, 2), "utf-8");
  console.log("\nSaved full audit data to scripts/audit_75_full_results.json");

  // Summary counts
  const total = results.length;
  const passCount = results.filter(r => r.status === "PASS").length;
  const failCount = results.filter(r => r.status === "FAIL").length;
  const notVerifiedCount = results.filter(r => r.status === "NOT VERIFIED").length;

  console.log("\n==========================================");
  console.log(`AUDIT FINISHED: Total: ${total}`);
  console.log(`PASS: ${passCount}/${total}`);
  console.log(`FAIL: ${failCount}/${total}`);
  console.log(`NOT VERIFIED: ${notVerifiedCount}/${total}`);
  console.log("==========================================");

  return { results, errors, passCount, failCount, notVerifiedCount };
}

runAudit().catch(console.error);
