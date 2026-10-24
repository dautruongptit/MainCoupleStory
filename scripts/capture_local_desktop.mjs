import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  
  // Desktop viewport 1280x900
  await c.setViewport({ width: 1280, height: 900, mobile: false });

  console.log("Navigating to CLONE site (desktop)...");
  await c.navigate("http://localhost:5173/vi/mau-thiep/hoa-moc-xanh/demo", 2000);
  const cloneCoverData = await c.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("docs/hoa_moc_xanh_clone_cover_desktop.png", Buffer.from(cloneCoverData.data, "base64"));
  console.log("Saved clone desktop cover screenshot");

  console.log("Clicking open on clone site...");
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button')).find(x => x.innerText && x.innerText.includes('Mở thiệp'));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 1500));
  const cloneOpenedData = await c.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("docs/hoa_moc_xanh_clone_opened_desktop.png", Buffer.from(cloneOpenedData.data, "base64"));
  console.log("Saved clone desktop opened screenshot");

  await c.close();
}

run().catch(console.error);
