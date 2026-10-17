import { ChromeController } from "./cdp_helper.mjs";

async function testSnippet() {
  const c = new ChromeController();
  await c.start();
  await c.newPage("about:blank");

  for (const tid of ["minimalism_darkred", "minimalism_brown", "boho_floral_green"]) {
    console.log(`\nTesting editor flow for: ${tid}`);
    await c.navigate(`http://localhost:5173/invitations/create/${tid}`, 1200);

    const testGroom = "Lê Tuấn Vũ";
    const testBride = "Vũ Thảo My";

    const setRes = await c.setInputValue("input[placeholder*='Thế Bảo']", testGroom);
    await c.setInputValue("input[placeholder*='Ngọc Ánh']", testBride);
    console.log("  Set input res:", setRes);
    await c.wait(400);

    // Switch to Preview
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll(".mode-toggle button")).find(b => b.textContent.includes("Xem trước"));
        if (btn) btn.click();
      })()
    `);
    await c.wait(800);

    const previewState = await c.eval(`
      (() => {
        const cardText = document.body.innerText || '';
        const hasEnvelope = !!document.querySelector('.envelope-screen, .darkred-env-screen');
        return {
          hasGroom: cardText.includes('Lê Tuấn Vũ'),
          hasBride: cardText.includes('Vũ Thảo My'),
          hasEnvelope
        };
      })()
    `);
    console.log("  Preview state:", previewState);

    // Switch back to Edit
    await c.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll(".mode-toggle button")).find(b => b.textContent.includes("Chỉnh sửa"));
        if (btn) btn.click();
      })()
    `);
    await c.wait(400);

    const editState = await c.eval(`
      (() => {
        const gVal = document.querySelector("input[placeholder*='Thế Bảo']")?.value || '';
        const bVal = document.querySelector("input[placeholder*='Ngọc Ánh']")?.value || '';
        return { gVal, bVal };
      })()
    `);
    console.log("  Edit state:", editState);
  }

  await c.close();
}

testSnippet().catch(console.error);
