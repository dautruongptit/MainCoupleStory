import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  const realCover = await c.eval(`
    (() => {
      const el = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
      return el ? el.outerHTML : 'NOT FOUND';
    })()
  `);
  fs.writeFileSync("docs/real_cover_minimalism.html", realCover);
  console.log("Saved docs/real_cover_minimalism.html (length: " + realCover.length + ")");

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  const cloneCover = await c.eval(`
    (() => {
      const el = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
      return el ? el.outerHTML : 'NOT FOUND';
    })()
  `);
  fs.writeFileSync("docs/clone_cover_minimalism.html", cloneCover);
  console.log("Saved docs/clone_cover_minimalism.html (length: " + cloneCover.length + ")");
}

run();
