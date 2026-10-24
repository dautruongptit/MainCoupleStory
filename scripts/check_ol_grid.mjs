import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.send("Network.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  });

  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo?open=1", 4000);
  const realOl = await c.eval(`(() => {
    const ol = Array.from(document.querySelectorAll('[data-showcase-root] > section')).find(el => el.textContent.includes('LỊCH TRÌNH')).querySelector('ol');
    const r = ol.getBoundingClientRect();
    const cs = getComputedStyle(ol);
    return {
      olWidth: r.width,
      gridTemplateColumns: cs.gridTemplateColumns,
      gap: cs.gap
    };
  })()`);

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);
  const cloneOl = await c.eval(`(() => {
    const ol = Array.from(document.querySelectorAll('[data-showcase-root] > section')).find(el => el.textContent.includes('LỊCH TRÌNH')).querySelector('ol');
    const r = ol.getBoundingClientRect();
    const cs = getComputedStyle(ol);
    return {
      olWidth: r.width,
      gridTemplateColumns: cs.gridTemplateColumns,
      gap: cs.gap
    };
  })()`);

  console.log("Real OL:", realOl);
  console.log("Clone OL:", cloneOl);

  await c.close();
}

run();
