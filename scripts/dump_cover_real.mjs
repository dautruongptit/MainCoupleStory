import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function dumpCoverReal() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 3000);

  const html = await c.eval(`
    (() => {
      const main = document.querySelector('main') || document.body;
      return main.innerHTML;
    })()
  `);

  fs.writeFileSync("docs/minimalism_do_dam_real_cover.html", html);
  console.log("Dumped docs/minimalism_do_dam_real_cover.html (length:", html.length, ")");

  await c.close();
}

dumpCoverReal().catch(console.error);
