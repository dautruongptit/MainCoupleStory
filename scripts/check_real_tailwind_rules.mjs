import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.send("Network.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  });
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo?open=1", 4000);

  const rules = await c.eval(`(() => {
    const list = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const r of sheet.cssRules) {
          if (r.selectorText && (r.selectorText.includes('text-[12px]') || r.selectorText.includes('text-[16px]') || r.selectorText.includes('text-[20px]'))) {
            list.push(r.cssText);
          }
        }
      } catch (e) {}
    }
    return list;
  })()`);

  console.log("Real CSS Rules for text-[...]:", rules);
  await c.close();
}

run();
