import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function main() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo?open=1", 3000);
  
  const btnHtml = await c.eval(`
    (() => {
      const btn = document.querySelector('button[aria-label*="hộp mừng"], button:has(.ienv-sparkle)');
      return btn ? btn.outerHTML : 'none';
    })()
  `);
  fs.writeFileSync("docs/giftbox-audit/minimalism_envelope_btn.html", btnHtml, "utf8");
  console.log("Saved docs/giftbox-audit/minimalism_envelope_btn.html (length: " + btnHtml.length + ")");
  await c.close();
}

main().catch(console.error);
