import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

async function verifyCatalog() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.setViewport({ width: 1280, height: 900 });

  console.log("Navigating to http://localhost:5173/vi/mau-thiep...");
  await c.navigate("http://localhost:5173/vi/mau-thiep", 3000);

  // Evaluate image status
  const imgStats = await c.eval(`
    (() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const results = imgs.map(img => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        broken: !img.complete || img.naturalWidth === 0
      }));
      return {
        totalImages: imgs.length,
        brokenCount: results.filter(r => r.broken).length,
        brokenList: results.filter(r => r.broken)
      };
    })()
  `);

  console.log("Image verification results:", JSON.stringify(imgStats, null, 2));

  // Screenshot top of catalog
  const sc1 = await c.screenshot();
  fs.writeFileSync("docs/ui-clone/catalog-previews-verified.png", Buffer.from(sc1, "base64"));
  console.log("Saved screenshot to docs/ui-clone/catalog-previews-verified.png");

  // Scroll down a bit to see more template cards
  await c.eval(`window.scrollBy(0, 800)`);
  await new Promise(r => setTimeout(r, 1000));
  const sc2 = await c.screenshot();
  fs.writeFileSync("docs/ui-clone/catalog-previews-scrolled.png", Buffer.from(sc2, "base64"));
  console.log("Saved scrolled screenshot to docs/ui-clone/catalog-previews-scrolled.png");

  await c.close();
}

verifyCatalog().catch(err => {
  console.error(err);
  process.exit(1);
});
