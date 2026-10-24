import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);

  const olInfo = await c.eval(`(() => {
    const ol = document.querySelector('ol');
    const cs = getComputedStyle(ol);
    return {
      cls: ol.className,
      gridTemplateColumns: cs.gridTemplateColumns,
      columnGap: cs.columnGap,
      rowGap: cs.rowGap,
      width: ol.getBoundingClientRect().width,
    };
  })()`);

  console.log("Clone OL Details:", olInfo);
  await c.close();
}

run();
