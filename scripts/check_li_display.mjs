import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);

  const liDisplay = await c.eval(`(() => {
    return Array.from(document.querySelectorAll('ol li')).map(li => ({
      cls: li.className,
      display: getComputedStyle(li).display,
    }));
  })()`);

  console.log("LI Display in clone:", liDisplay);
  await c.close();
}

run();
