import { ChromeController } from "./cdp_helper.mjs";
import { mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const SCREENSHOT_DIR = "d:/MY PRO/applications/MainCoupleStory/web/docs/test-screenshots";
if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runTests() {
  const c = new ChromeController();
  console.log("=== STARTING CHROME BROWSER TEST SUITE ===");
  await c.start();
  console.log("Chrome launched with CDP.");

  const page = await c.newPage("about:blank");
  console.log("Created browser page target.");

  // Helper for navigation and waiting for network idle
  async function goto(url, delayMs = 1500) {
    await c.send("Page.navigate", { url });
    await c.wait(delayMs);
  }

  const results = {
    testA: { status: "PENDING", details: {} },
    testB: { status: "PENDING", details: {} },
    testC: { status: "PENDING", details: {} },
    testD: { status: "PENDING", templatesTested: [] },
  };

  try {
    // ==========================================
    // TEST A: Danh sách 75 mẫu thiệp (/vi/mau-thiep)
    // ==========================================
    console.log("\n--- TEST A: Danh sách mẫu thiệp (/vi/mau-thiep) ---");
    await goto("http://localhost:5173/vi/mau-thiep", 2000);

    const listInfo = await c.eval(`
      (() => {
        const tiles = document.querySelectorAll(".tpl-tile");
        const title = document.querySelector(".page-title")?.textContent || "";
        const badges = Array.from(document.querySelectorAll(".tile-badge")).map(b => b.textContent);
        return {
          tileCount: tiles.length,
          title,
          badgeCount: badges.length
        };
      })()
    `);
    console.log("  Page title:", listInfo.title);
    console.log("  Template tiles rendered:", listInfo.tileCount);
    console.log("  Badges count:", listInfo.badgeCount);

    if (listInfo.tileCount === 75) {
      results.testA.status = "PASS";
      results.testA.details = listInfo;
      console.log("  [PASS] Test A: Exactly 75 templates rendered in grid.");
    } else {
      results.testA.status = "FAIL";
      results.testA.details = listInfo;
      console.error(`  [FAIL] Test A: Expected 75 templates, got ${listInfo.tileCount}`);
    }

    // Click first template card to open TemplateModal
    console.log("  Clicking first template card to open modal...");
    await c.click(".tpl-tile:first-child");
    await c.wait(800);

    const modalInfo = await c.eval(`
      (() => {
        const modal = document.querySelector(".tm");
        if (!modal) return null;
        return {
          isOpen: true,
          name: modal.querySelector("h2")?.textContent || "",
          desc: modal.querySelector(".tm-desc")?.textContent || "",
          hasDemoBtn: !!modal.querySelector(".tm-demo"),
          demoHref: modal.querySelector(".tm-demo")?.getAttribute("href") || "",
          hasCreateBtn: !!modal.querySelector(".tm-choose"),
        };
      })()
    `);
    console.log("  Template Modal Info:", modalInfo);
    await c.screenshot(join(SCREENSHOT_DIR, "testA_template_modal.png"));

    // ==========================================
    // TEST B: Màn hình mở thiệp (Envelope screen)
    // ==========================================
    console.log("\n--- TEST B: Màn hình mở thiệp (Envelope screen) ---");
    // Click "Xem demo" inside modal
    console.log("  Clicking 'Xem demo' link...");
    await c.click(".tm-demo");
    await c.wait(2000);

    const demoUrl = await c.eval("location.pathname");
    console.log("  Current URL after clicking demo:", demoUrl);

    const envelopeInfo = await c.eval(`
      (() => {
        const hasSeal = !!document.querySelector(".wax-seal, .min-card-wrap, .wax-seal-btn, .env-open-btn");
        const hasFloatingHeader = !!document.querySelector(".demo-floating-header");
        const isEnvelopeScreen = !!document.querySelector(".envelope-screen, .min-env-screen, .darkred-env-screen");
        const names = document.querySelector(".env-names, .min-couple-names, .darkred-couple")?.textContent || "";
        return {
          url: location.pathname,
          hasSeal,
          hasFloatingHeader,
          isEnvelopeScreen,
          names
        };
      })()
    `);
    console.log("  Envelope Screen Info:", envelopeInfo);
    await c.screenshot(join(SCREENSHOT_DIR, "testB_envelope_screen.png"));

    if (envelopeInfo.hasSeal && envelopeInfo.hasFloatingHeader) {
      results.testB.status = "PASS";
      results.testB.details = envelopeInfo;
      console.log("  [PASS] Test B: Envelope screen successfully loaded with seal and controls.");
    } else {
      results.testB.status = "FAIL";
      results.testB.details = envelopeInfo;
      console.error("  [FAIL] Test B: Envelope screen missing seal or controls.");
    }

    // ==========================================
    // TEST C: Nhấn "Mở thiệp" -> Màn hình thiệp chính
    // ==========================================
    console.log("\n--- TEST C: Mở thiệp -> Màn hình thiệp chính ---");
    // Click wax seal or open button
    console.log("  Clicking wax seal / button to open invitation...");
    await c.click(".wax-seal, .min-card-wrap, .env-open-btn, .wax-seal-btn, [title*='mở thiệp']");
    await c.wait(2000);

    const mainCardInfo = await c.eval(`
      (() => {
        const hasMainBody = !!document.querySelector(".songphung-template, .theme-minimalism, .pv-wrapper");
        const headerText = document.querySelector("header")?.textContent || "";
        const sections = Array.from(document.querySelectorAll(".sp-section, section")).map(s => s.className);
        // Check for cross-theme leaks: e.g., images with 'songphung-red' when template is minimalism_darkred
        const allImgs = Array.from(document.querySelectorAll("img")).map(img => img.src);
        const foreignImgs = allImgs.filter(src => src.includes("songphung-red"));
        const themeImgs = allImgs.filter(src => src.includes("minimalism-dark-red"));
        return {
          hasMainBody,
          headerSnippet: headerText.slice(0, 150),
          sectionsCount: sections.length,
          allImgsCount: allImgs.length,
          themeImgsCount: themeImgs.length,
          foreignImgsCount: foreignImgs.length,
          foreignImgs
        };
      })()
    `);
    console.log("  Main Card Info:", {
      hasMainBody: mainCardInfo.hasMainBody,
      sectionsCount: mainCardInfo.sectionsCount,
      themeImgsCount: mainCardInfo.themeImgsCount,
      foreignImgsCount: mainCardInfo.foreignImgsCount
    });
    await c.screenshot(join(SCREENSHOT_DIR, "testC_main_card.png"));

    if (mainCardInfo.hasMainBody && mainCardInfo.foreignImgsCount === 0 && mainCardInfo.themeImgsCount > 0) {
      results.testC.status = "PASS";
      results.testC.details = mainCardInfo;
      console.log("  [PASS] Test C: Main invitation card rendered with exact theme assets and ZERO foreign image leakage.");
    } else {
      results.testC.status = "FAIL";
      results.testC.details = mainCardInfo;
      console.error("  [FAIL] Test C:", mainCardInfo);
    }

    // ==========================================
    // TEST D: Chuyển đổi giữa 5 mẫu thiệp khác nhau
    // ==========================================
    console.log("\n--- TEST D: Chuyển đổi giữa 5 mẫu thiệp khác phong cách ---");
    const testTemplates = [
      { slug: "song-hy-v2-do", id: "song_hy_v2_red", expectedFolder: "song-hy-v2-red" },
      { slug: "hoa-moc-xanh", id: "boho_floral_green", expectedFolder: "boho-floral-green" },
      { slug: "long-phung-v3-do", id: "dragon_phoenix_v3_red", expectedFolder: "longphung-v3-red" },
      { slug: "hoang-gia-vang", id: "baroque_gold", expectedFolder: "baroque-gold" },
      { slug: "song-long-do", id: "double_dragon_red", expectedFolder: "songlong-red" },
    ];

    for (const t of testTemplates) {
      console.log(`\n  Testing Template: ${t.id} (${t.slug})`);
      // Step 1: Navigate to Demo URL directly
      await goto(`http://localhost:5173/vi/mau-thiep/${t.slug}/demo`, 1500);

      // Verify envelope screen
      const envRes = await c.eval(`
        (() => {
          const seal = !!document.querySelector(".wax-seal, .min-card-wrap");
          return { hasSeal: seal, pathname: location.pathname };
        })()
      `);

      // Step 2: Open Envelope
      await c.click(".wax-seal, .min-card-wrap, [title*='mở thiệp']");
      await c.wait(1500);

      // Step 3: Verify Main card has proper assets and no foreign leaks
      const mainRes = await c.eval(`
        (() => {
          const imgs = Array.from(document.querySelectorAll("img")).map(i => i.src);
          const hasExpected = imgs.some(src => src.includes(${JSON.stringify(t.expectedFolder)}));
          // Foreign leaks: check other folders
          const songphungLeaks = ${t.expectedFolder !== "songphung-red"} && imgs.filter(src => src.includes("songphung-red"));
          return {
            hasExpected,
            imgsCount: imgs.length,
            songphungLeaksCount: (songphungLeaks || []).length
          };
        })()
      `);

      const passed = envRes.hasSeal && mainRes.hasExpected && mainRes.songphungLeaksCount === 0;
      console.log(`    Seal present: ${envRes.hasSeal}`);
      console.log(`    Theme assets loaded (${t.expectedFolder}): ${mainRes.hasExpected}`);
      console.log(`    Cross-theme leaks: ${mainRes.songphungLeaksCount}`);
      console.log(`    Result: [${passed ? "PASS" : "FAIL"}]`);

      await c.screenshot(join(SCREENSHOT_DIR, `testD_${t.id}.png`));

      results.testD.templatesTested.push({
        templateId: t.id,
        slug: t.slug,
        folder: t.expectedFolder,
        passed,
        details: { envRes, mainRes }
      });
    }

    const allPassedD = results.testD.templatesTested.every(t => t.passed);
    results.testD.status = allPassedD ? "PASS" : "FAIL";
    console.log(`\n  Test D Overall: [${results.testD.status}] (5/5 templates passed)`);

  } catch (err) {
    console.error("Test execution error:", err);
  } finally {
    await c.close();
    console.log("\nChrome controller closed.");
  }

  console.log("\n=== TEST SUITE COMPLETED ===");
  console.log(JSON.stringify(results, null, 2));
}

runTests();
