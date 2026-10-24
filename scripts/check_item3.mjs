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
  const realItem = await c.eval(`(() => {
    const el = Array.from(document.querySelectorAll('span')).find(s => s.textContent.includes('Cắt bánh'));
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      rect: { width: r.width, height: r.height },
      font: cs.fontFamily,
      fontSize: cs.fontSize,
      letterSpacing: cs.letterSpacing,
      whiteSpace: cs.whiteSpace
    };
  })()`);

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);
  const cloneItem = await c.eval(`(() => {
    const el = Array.from(document.querySelectorAll('span')).find(s => s.textContent.includes('Cắt bánh'));
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      rect: { width: r.width, height: r.height },
      font: cs.fontFamily,
      fontSize: cs.fontSize,
      letterSpacing: cs.letterSpacing,
      whiteSpace: cs.whiteSpace
    };
  })()`);

  console.log("Real Item 3:", realItem);
  console.log("Clone Item 3:", cloneItem);

  await c.close();
}

run();
