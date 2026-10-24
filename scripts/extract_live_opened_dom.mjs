import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  console.log("Navigating to live site...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/hoa-moc-xanh/demo?open=1", 4000);

  const html = await c.eval(`
    (() => {
      const el = document.querySelector('[data-landing-screenshot-id="invite-renderer"]') || document.querySelector('#invite-renderer') || document.body;
      return el.innerHTML;
    })()
  `);

  fs.writeFileSync("docs/hoa_moc_xanh_real_opened_dom.html", html);
  console.log("Saved real opened dom html, length:", html.length);

  await c.close();
}

run().catch(console.error);
