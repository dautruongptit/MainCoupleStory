import { ChromeController } from './cdp_helper.mjs';

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.send("Network.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    acceptLanguage: "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
    platform: "Win32"
  });

  console.log("Navigating to real minimalism-nau/demo?open=1...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo?open=1", 4000);

  const rootChildren = await c.eval(`(() => {
    const root = document.querySelector('[data-showcase-root]');
    if (!root) return 'no root';
    return Array.from(root.children).map((ch, idx) => {
      const r = ch.getBoundingClientRect();
      const h = ch.querySelector('h1, h2, h3, h4');
      return {
        idx,
        tag: ch.tagName,
        class: ch.className,
        heading: h ? h.textContent.trim() : null,
        rect: {
          left: Math.round(r.left * 10) / 10,
          top: Math.round(r.top * 10) / 10,
          width: Math.round(r.width * 10) / 10,
          height: Math.round(r.height * 10) / 10
        }
      };
    });
  })()`);

  console.log("Root direct children (Mobile 1280 or default):", JSON.stringify(rootChildren, null, 2));

  // Set mobile 390x844
  await c.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true
  });
  await c.wait(1000);

  const mobileChildren = await c.eval(`(() => {
    const root = document.querySelector('[data-showcase-root]');
    if (!root) return 'no root';
    return Array.from(root.children).map((ch, idx) => {
      const r = ch.getBoundingClientRect();
      const h = ch.querySelector('h1, h2, h3, h4');
      return {
        idx,
        tag: ch.tagName,
        class: ch.className,
        heading: h ? h.textContent.trim() : null,
        rect: {
          left: Math.round(r.left * 10) / 10,
          top: Math.round(r.top * 10) / 10,
          width: Math.round(r.width * 10) / 10,
          height: Math.round(r.height * 10) / 10
        }
      };
    });
  })()`);

  console.log("Root direct children (Mobile 390x844):", JSON.stringify(mobileChildren, null, 2));

  await c.close();
}

run().catch(console.error);
