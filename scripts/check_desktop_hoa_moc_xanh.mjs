import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  
  // Desktop viewport 1280x900
  await c.setViewport({ width: 1280, height: 900, mobile: false });

  console.log("Navigating to REAL site (desktop)...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/hoa-moc-xanh/demo", 3000);
  const realCoverData = await c.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("docs/hoa_moc_xanh_real_cover_desktop.png", Buffer.from(realCoverData.data, "base64"));

  console.log("Clicking open on real site...");
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button')).find(x => x.innerText && x.innerText.includes('Mở thiệp'));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));
  const realOpenedData = await c.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  fs.writeFileSync("docs/hoa_moc_xanh_real_opened_desktop.png", Buffer.from(realOpenedData.data, "base64"));

  console.log("Navigating to CLONE site (desktop)...");
  await c.navigate("http://localhost:5173/vi/mau-thiep/hoa-moc-xanh/demo", 3000);
  const cloneCoverData = await c.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("docs/hoa_moc_xanh_clone_cover_desktop.png", Buffer.from(cloneCoverData.data, "base64"));

  console.log("Clicking open on clone site...");
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button')).find(x => x.innerText && x.innerText.includes('Mở thiệp'));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));
  const cloneOpenedData = await c.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  fs.writeFileSync("docs/hoa_moc_xanh_clone_opened_desktop.png", Buffer.from(cloneOpenedData.data, "base64"));

  console.log("Captured desktop screenshots successfully!");
  await c.close();
}

run().catch(console.error);
