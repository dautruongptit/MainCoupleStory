import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function main() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.setViewport({ width: 1280, height: 900 });
  await c.navigate("http://localhost:5173/vi/mau-thiep", 2000);
  
  // Click first card: .tpl-tile
  await c.eval('document.querySelector(".tpl-tile")?.click()');
  await new Promise(r => setTimeout(r, 1000));
  
  const sc = await c.screenshot();
  fs.writeFileSync("docs/ui-clone/test-modal-clone.png", Buffer.from(sc, "base64"));
  console.log("Saved docs/ui-clone/test-modal-clone.png");

  // Also check mobile 390px
  await c.setViewport({ width: 390, height: 844, mobile: true });
  await new Promise(r => setTimeout(r, 500));
  const scMobile = await c.screenshot();
  fs.writeFileSync("docs/ui-clone/test-modal-mobile-clone.png", Buffer.from(scMobile, "base64"));
  console.log("Saved docs/ui-clone/test-modal-mobile-clone.png");

  await c.close();
}

main().catch(console.error);
