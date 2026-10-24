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
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo", 4000);
  const rule = await c.eval(`(() => {
    for (const sheet of document.styleSheets) {
      try {
        for (const r of sheet.cssRules) {
          if (r.name === 'seal-pulse') return r.cssText;
        }
      } catch (e) {}
    }
    return null;
  })()`);
  console.log("Real seal-pulse rule:", rule);
  await c.close();
}
run();
