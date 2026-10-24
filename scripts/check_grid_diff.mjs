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
  const realGrid = await c.eval(`(() => {
    const s = document.querySelectorAll('[data-showcase-root] > section')[0];
    const grid = s.querySelector('.relative.grid');
    return Array.from(grid.querySelectorAll('*')).map(el => ({
      tag: el.tagName,
      text: el.children.length === 0 ? el.textContent.trim() : null,
      r: el.getBoundingClientRect(),
      font: getComputedStyle(el).fontFamily,
      fontSize: getComputedStyle(el).fontSize,
      lineHeight: getComputedStyle(el).lineHeight,
      margin: getComputedStyle(el).margin,
      padding: getComputedStyle(el).padding
    }));
  })()`);

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);
  const cloneGrid = await c.eval(`(() => {
    const s = document.querySelectorAll('[data-showcase-root] > section')[0];
    const grid = s.querySelector('.relative.grid');
    return Array.from(grid.querySelectorAll('*')).map(el => ({
      tag: el.tagName,
      text: el.children.length === 0 ? el.textContent.trim() : null,
      r: el.getBoundingClientRect(),
      font: getComputedStyle(el).fontFamily,
      fontSize: getComputedStyle(el).fontSize,
      lineHeight: getComputedStyle(el).lineHeight,
      margin: getComputedStyle(el).margin,
      padding: getComputedStyle(el).padding
    }));
  })()`);

  console.log("Real Grid:", JSON.stringify(realGrid.slice(0, 8), null, 2));
  console.log("Clone Grid:", JSON.stringify(cloneGrid.slice(0, 8), null, 2));

  await c.close();
}

run();
