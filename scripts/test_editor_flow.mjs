import { ChromeController } from "./cdp_helper.mjs";
import { join } from "node:path";
import { mkdirSync } from "node:fs";

const SCREENSHOT_DIR = "docs/test-screenshots";
mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function run() {
  console.log("=== STARTING WEDDING INVITATION EDITOR & LIVE PREVIEW TEST ===");
  const c = new ChromeController();
  await c.start();
  await c.newPage("http://localhost:5173");

  const results = {
    case1_createFromModal: "NOT VERIFIED",
    case2_noEnvelopeOnCreate: "NOT VERIFIED",
    case3_enterDataAndSwitchPreview: "NOT VERIFIED",
    case4_previewRenderedImmediatelyWithUserData: "NOT VERIFIED",
    case5_returnEditAndUpdateData: "NOT VERIFIED",
    case6_previewUpdatedWithNewData: "NOT VERIFIED",
    case7_createModelBNoLeakage: "NOT VERIFIED",
    case8_diverseThemesAssetMapping: "NOT VERIFIED",
    case9_mobileResponsiveFlow: "NOT VERIFIED",
    case10_invalidThemeHandling: "NOT VERIFIED",
  };

  try {
    // =========================================================================
    // CASE 1 & 2: Chọn mẫu A (Hoa Mộc - Xanh) -> Nhấn Tạo thiệp -> Mở tab Chỉnh sửa
    // =========================================================================
    console.log("\n--- CASE 1 & 2: Chọn mẫu A -> Tạo thiệp -> Tab Chỉnh sửa mặc định, không có phong bì ---");
    await c.navigate("http://localhost:5173/vi/mau-thiep", 1500);

    // Click template "Hoa Mộc - Xanh" (boho_floral_green) via its img alt
    console.log("  Opening template modal for Hoa Mộc - Xanh...");
    const tileClicked = await c.eval(`
      (() => {
        const img = document.querySelector("img[alt*='Hoa Mộc - Xanh']");
        if (img) {
          const tile = img.closest('.tpl-tile') || img;
          tile.click();
          return true;
        }
        return false;
      })()
    `);
    console.log("  Tile clicked:", tileClicked);
    await c.wait(1000);

    // Verify modal is open
    const modalH2 = await c.eval(`document.querySelector(".tm h2")?.textContent || ""`);
    console.log("  Modal header:", modalH2);

    // Click "Tạo thiệp" inside modal
    console.log("  Clicking 'Tạo thiệp' (.tm-choose)...");
    await c.click(".tm-choose");
    await c.wait(2000);

    const editorState = await c.eval(`
      (() => {
        const pathname = location.pathname;
        const search = location.search;
        const isEditMode = !!document.querySelector(".body");
        const hasPreview = !!document.querySelector(".pv-wrapper");
        const hasEnvelopeScreen = !!document.querySelector(".envelope-screen, .darkred-env-screen");
        const activeTab = document.querySelector(".mode-toggle button.active")?.textContent?.trim() || "";
        const templateNameInHdr = document.querySelector(".tpl-name")?.textContent?.trim() || "";
        return {
          pathname,
          search,
          isEditMode,
          hasPreview,
          hasEnvelopeScreen,
          activeTab,
          templateNameInHdr
        };
      })()
    `);
    console.log("  Editor state after creating:", editorState);
    await c.screenshot(join(SCREENSHOT_DIR, "editor_01_created_edit_tab.png"));

    if (
      editorState.pathname.startsWith("/edit/") &&
      editorState.isEditMode &&
      !editorState.hasEnvelopeScreen &&
      editorState.activeTab.includes("Chỉnh sửa")
    ) {
      results.case1_createFromModal = "PASS";
      results.case2_noEnvelopeOnCreate = "PASS";
      console.log("  [PASS] Case 1 & 2: Redirected to /edit/..., default tab is 'Chỉnh sửa', ZERO envelope screen.");
    } else {
      results.case1_createFromModal = "FAIL";
      results.case2_noEnvelopeOnCreate = "FAIL";
      console.error("  [FAIL] Case 1 & 2:", editorState);
    }

    // =========================================================================
    // CASE 3 & 4: Nhập thông tin người dùng -> Chuyển sang Xem trước
    // =========================================================================
    console.log("\n--- CASE 3 & 4: Nhập dữ liệu -> Chuyển sang Xem trước -> Render thiệp hoàn chỉnh ngay ---");
    const testGroom = "Lê Minh Quân";
    const testBride = "Phạm Thu Trang";

    console.log(`  Typing groom="${testGroom}", bride="${testBride}" into form...`);
    await c.setInputValue("input[placeholder*='Thế Bảo']", testGroom);
    await c.setInputValue("input[placeholder*='Ngọc Ánh']", testBride);
    await c.wait(600);

    // Click tab "Xem trước"
    console.log("  Clicking tab 'Xem trước'...");
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll(".mode-toggle button")).find(b => b.textContent.includes("Xem trước"));
        if (btn) btn.click();
      })()
    `);
    await c.wait(1500);

    const previewState = await c.eval(`
      (() => {
        const hasEnvelopeScreen = !!document.querySelector(".envelope-screen, .darkred-env-screen");
        const hasMainBody = !!document.querySelector(".songphung-template, .theme-minimalism");
        const cardText = document.body.innerText;
        const hasGroom = cardText.includes(${JSON.stringify(testGroom)});
        const hasBride = cardText.includes(${JSON.stringify(testBride)});
        const imgs = Array.from(document.querySelectorAll("img, image")).map(i => i.src || i.getAttribute("href") || "");
        const hasThemeAsset = imgs.some(src => src.includes("boho-floral-green"));
        const foreignLeaks = imgs.filter(src => src.includes("songphung-red") || src.includes("minimalism-dark-red"));
        const activeTab = document.querySelector(".mode-toggle button.active")?.textContent?.trim() || "";
        return {
          hasEnvelopeScreen,
          hasMainBody,
          hasGroom,
          hasBride,
          hasThemeAsset,
          foreignLeaksCount: foreignLeaks.length,
          activeTab
        };
      })()
    `);
    console.log("  Preview state:", previewState);
    await c.screenshot(join(SCREENSHOT_DIR, "editor_02_preview_tab.png"));

    if (
      !previewState.hasEnvelopeScreen &&
      previewState.hasMainBody &&
      previewState.hasGroom &&
      previewState.hasBride &&
      previewState.hasThemeAsset &&
      previewState.foreignLeaksCount === 0
    ) {
      results.case3_enterDataAndSwitchPreview = "PASS";
      results.case4_previewRenderedImmediatelyWithUserData = "PASS";
      console.log("  [PASS] Case 3 & 4: Live preview displayed immediately with exact user-entered names and theme assets.");
    } else {
      results.case3_enterDataAndSwitchPreview = "FAIL";
      results.case4_previewRenderedImmediatelyWithUserData = "FAIL";
      console.error("  [FAIL] Case 3 & 4:", previewState);
    }

    // =========================================================================
    // CASE 5 & 6: Quay lại Chỉnh sửa -> Đổi nội dung -> Mở lại Xem trước
    // =========================================================================
    console.log("\n--- CASE 5 & 6: Quay lại Chỉnh sửa -> Cập nhật tên mới -> Mở lại Xem trước ---");
    console.log("  Switching back to tab 'Chỉnh sửa'...");
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll(".mode-toggle button")).find(b => b.textContent.includes("Chỉnh sửa"));
        if (btn) btn.click();
      })()
    `);
    await c.wait(800);

    const testGroom2 = "Trần Thế Vinh";
    const testBride2 = "Hoàng Thảo My";
    console.log(`  Updating groom="${testGroom2}", bride="${testBride2}"...`);
    await c.setInputValue("input[placeholder*='Thế Bảo']", testGroom2);
    await c.setInputValue("input[placeholder*='Ngọc Ánh']", testBride2);
    await c.wait(600);

    console.log("  Switching to tab 'Xem trước' again...");
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll(".mode-toggle button")).find(b => b.textContent.includes("Xem trước"));
        if (btn) btn.click();
      })()
    `);
    await c.wait(1500);

    const updatedPreview = await c.eval(`
      (() => {
        const cardText = document.body.innerText;
        const hasGroom2 = cardText.includes(${JSON.stringify(testGroom2)});
        const hasBride2 = cardText.includes(${JSON.stringify(testBride2)});
        const hasOldGroom = cardText.includes(${JSON.stringify(testGroom)});
        return {
          hasGroom2,
          hasBride2,
          hasOldGroom
        };
      })()
    `);
    console.log("  Updated Preview state:", updatedPreview);
    await c.screenshot(join(SCREENSHOT_DIR, "editor_03_preview_updated.png"));

    if (updatedPreview.hasGroom2 && updatedPreview.hasBride2 && !updatedPreview.hasOldGroom) {
      results.case5_returnEditAndUpdateData = "PASS";
      results.case6_previewUpdatedWithNewData = "PASS";
      console.log("  [PASS] Case 5 & 6: Live preview seamlessly updated with newly modified user data!");
    } else {
      results.case5_returnEditAndUpdateData = "FAIL";
      results.case6_previewUpdatedWithNewData = "FAIL";
      console.error("  [FAIL] Case 5 & 6:", updatedPreview);
    }

    // =========================================================================
    // CASE 7: Chọn mẫu B (/invitations/create/dragon_phoenix_v3_red) -> Không rò rỉ mẫu A
    // =========================================================================
    console.log("\n--- CASE 7: Tạo mẫu B qua route /invitations/create/dragon_phoenix_v3_red ---");
    await c.navigate("http://localhost:5173/invitations/create/dragon_phoenix_v3_red", 2500);
    await c.wait(1000);
    console.log("  Navigated to URL:", await c.eval("location.href"));

    console.log("  Setting names for Template B...");
    await c.setInputValue("input[placeholder*='Thế Bảo']", "Quốc Bảo");
    await c.setInputValue("input[placeholder*='Ngọc Ánh']", "Mỹ Linh");
    await c.wait(600);

    // Switch to preview
    console.log("  Switching to Preview for Template B...");
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll(".mode-toggle button")).find(b => b.textContent.includes("Xem trước"));
        if (btn) btn.click();
      })()
    `);
    await c.wait(1500);

    const modelBPreview = await c.eval(`
      (() => {
        const imgs = Array.from(document.querySelectorAll("img, image")).map(i => i.src || i.getAttribute("href") || "");
        const hasModelBAssets = imgs.some(src => src.includes("longphung-v3-red"));
        const modelALeaks = imgs.filter(src => src.includes("boho-floral-green"));
        const cardText = document.body.innerText;
        return {
          hasModelBAssets,
          modelALeaksCount: modelALeaks.length,
          hasGroom: cardText.includes("Quốc Bảo"),
          hasBride: cardText.includes("Mỹ Linh")
        };
      })()
    `);
    console.log("  Model B Preview state:", modelBPreview);
    await c.screenshot(join(SCREENSHOT_DIR, "editor_04_model_b_preview.png"));

    if (modelBPreview.hasModelBAssets && modelBPreview.modelALeaksCount === 0 && modelBPreview.hasGroom) {
      results.case7_createModelBNoLeakage = "PASS";
      console.log("  [PASS] Case 7: Model B loaded with its own assets, zero leakage from Model A.");
    } else {
      results.case7_createModelBNoLeakage = "FAIL";
      console.error("  [FAIL] Case 7:", modelBPreview);
    }

    // =========================================================================
    // CASE 8: Đổi mẫu thiệp từ Editor Header sang Mẫu C (Minimalism - Đỏ Đậm)
    // =========================================================================
    console.log("\n--- CASE 8: Đổi mẫu thiệp trong Editor sang Minimalism - Đỏ Đậm ---");
    // Switch to edit mode first
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll(".mode-toggle button")).find(b => b.textContent.includes("Chỉnh sửa"));
        if (btn) btn.click();
      })()
    `);
    await c.wait(600);

    // Open template switcher modal
    console.log("  Opening template switcher modal...");
    await c.click(".tpl-btn");
    await c.wait(800);

    // Select "Minimalism - Đỏ Đậm" (minimalism_darkred)
    console.log("  Selecting Minimalism - Đỏ Đậm...");
    await c.eval(`
      (() => {
        const cards = Array.from(document.querySelectorAll(".tpl-card"));
        const target = cards.find(c => c.textContent.includes("Minimalism - Đỏ Đậm"));
        if (target) target.click();
      })()
    `);
    await c.wait(1000);

    // Switch to preview
    console.log("  Switching to Preview for Template C...");
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll(".mode-toggle button")).find(b => b.textContent.includes("Xem trước"));
        if (btn) btn.click();
      })()
    `);
    await c.wait(1500);

    const modelCPreview = await c.eval(`
      (() => {
        const imgs = Array.from(document.querySelectorAll("img, image")).map(i => i.src || i.getAttribute("href") || "");
        const hasDarkRedAssets = imgs.some(src => src.includes("minimalism-dark-red"));
        const hasEnvelopeScreen = !!document.querySelector(".envelope-screen, .darkred-env-screen");
        const cardText = document.body.innerText;
        return {
          hasDarkRedAssets,
          hasEnvelopeScreen,
          hasGroom: cardText.includes("Quốc Bảo"),
          hasBride: cardText.includes("Mỹ Linh")
        };
      })()
    `);
    console.log("  Model C Preview state:", modelCPreview);
    await c.screenshot(join(SCREENSHOT_DIR, "editor_05_switched_to_minimalism_darkred.png"));

    if (modelCPreview.hasDarkRedAssets && !modelCPreview.hasEnvelopeScreen && modelCPreview.hasGroom) {
      results.case8_diverseThemesAssetMapping = "PASS";
      console.log("  [PASS] Case 8: Switched theme inside editor seamlessly preserved user data and mapped exact assets.");
    } else {
      results.case8_diverseThemesAssetMapping = "FAIL";
      console.error("  [FAIL] Case 8:", modelCPreview);
    }

    // =========================================================================
    // CASE 9: Mobile Viewport Responsive Flow (390 x 844)
    // =========================================================================
    console.log("\n--- CASE 9: Mobile Viewport Responsive Flow (390x844) ---");
    await c.setViewport({ width: 390, height: 844, mobile: true });
    await c.wait(1000);

    const mobileState = await c.eval(`
      (() => {
        const dock = document.querySelector(".mobile-editor-dock");
        const dockVisible = !!dock && getComputedStyle(dock).display !== "none";
        const buttons = Array.from(document.querySelectorAll(".mobile-mode-btn")).map(b => b.textContent.trim());
        return {
          hasDock: !!dock,
          dockVisible,
          buttons
        };
      })()
    `);
    console.log("  Mobile dock state:", mobileState);
    await c.screenshot(join(SCREENSHOT_DIR, "editor_06_mobile_preview.png"));

    // Switch to edit on mobile
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll(".mobile-mode-btn")).find(b => b.textContent.includes("Chỉnh sửa"));
        if (btn) btn.click();
      })()
    `);
    await c.wait(800);
    await c.screenshot(join(SCREENSHOT_DIR, "editor_07_mobile_edit.png"));

    if (mobileState.hasDock && mobileState.dockVisible) {
      results.case9_mobileResponsiveFlow = "PASS";
      console.log("  [PASS] Case 9: Mobile floating dock and responsive layout work properly.");
    } else {
      results.case9_mobileResponsiveFlow = "FAIL";
      console.error("  [FAIL] Case 9:", mobileState);
    }

    // Reset desktop viewport
    await c.setViewport({ width: 1280, height: 900, mobile: false });
    await c.wait(500);

    // =========================================================================
    // CASE 10: Xử lý Theme ID không tồn tại
    // =========================================================================
    console.log("\n--- CASE 10: Xử lý Theme ID không tồn tại (/invitations/create/invalid_theme_xyz) ---");
    await c.navigate("http://localhost:5173/invitations/create/invalid_theme_xyz", 1500);

    const notFoundState = await c.eval(`
      (() => {
        const title = document.querySelector(".page-title")?.textContent?.trim() || "";
        const desc = document.querySelector(".page-sub")?.textContent?.trim() || "";
        const backBtn = !!document.querySelector("a[href='/vi/mau-thiep']");
        return {
          title,
          desc,
          backBtn
        };
      })()
    `);
    console.log("  Not found state:", notFoundState);
    await c.screenshot(join(SCREENSHOT_DIR, "editor_08_invalid_theme_handled.png"));

    if (notFoundState.title.includes("Không tìm thấy") && notFoundState.backBtn) {
      results.case10_invalidThemeHandling = "PASS";
      console.log("  [PASS] Case 10: Invalid theme ID displays clear error page with navigation link.");
    } else {
      results.case10_invalidThemeHandling = "FAIL";
      console.error("  [FAIL] Case 10:", notFoundState);
    }

  } catch (err) {
    console.error("Test failed with error:", err);
  } finally {
    await c.close();
  }

  console.log("\n=== TEST RUN SUMMARY ===");
  console.log(JSON.stringify(results, null, 2));

  const allPassed = Object.values(results).every(v => v === "PASS");
  console.log("\nOVERALL STATUS:", allPassed ? "ALL TESTS PASSED [PASS]" : "SOME TESTS FAILED [FAIL]");
  process.exit(allPassed ? 0 : 1);
}

run().catch(console.error);
