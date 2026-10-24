import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function captureSideBySide() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();

  // Mobile viewport
  await c.setViewport({ width: 390, height: 844, mobile: true });

  console.log("Navigating to REAL cover...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 3000);
  const realCover = await c.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("docs/minimalism_real_cover_390.png", Buffer.from(realCover.data, "base64"));

  console.log("Navigating to CLONE cover...");
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 3000);
  const cloneCover = await c.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("docs/minimalism_clone_cover_390.png", Buffer.from(cloneCover.data, "base64"));

  // Desktop viewport 1440x900
  await c.setViewport({ width: 1440, height: 900, mobile: false });

  console.log("Navigating to REAL desktop cover...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 3000);
  const realDeskCover = await c.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("docs/minimalism_real_cover_1440.png", Buffer.from(realDeskCover.data, "base64"));

  console.log("Navigating to CLONE desktop cover...");
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 3000);
  const cloneDeskCover = await c.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("docs/minimalism_clone_cover_1440.png", Buffer.from(cloneDeskCover.data, "base64"));

  // Now click open on both and capture desktop opened top!
  console.log("Opening REAL desktop...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 3000);
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));
  const realDeskOpened = await c.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("docs/minimalism_real_opened_1440.png", Buffer.from(realDeskOpened.data, "base64"));

  console.log("Opening CLONE desktop...");
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 3000);
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));
  const cloneDeskOpened = await c.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("docs/minimalism_clone_opened_1440.png", Buffer.from(cloneDeskOpened.data, "base64"));

  console.log("Screenshots captured!");
  await c.close();
}

captureSideBySide().catch(console.error);
