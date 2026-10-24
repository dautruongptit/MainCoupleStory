import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.send("Network.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  });
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo?open=1", 4000);

  const matched = await c.eval(`(() => {
    const el = document.querySelector('.text-\\\\[12px\\\\]');
    if (!el) return 'no el';
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const r of sheet.cssRules) {
          if (r.selectorText && el.matches(r.selectorText)) {
            rules.push({ sel: r.selectorText, css: r.cssText });
          }
        }
      } catch (e) {}
    }
    return {
      elCls: el.className,
      lineHeight: getComputedStyle(el).lineHeight,
      rules
    };
  })()`);

  console.log("Matched rules for .text-[12px]:", JSON.stringify(matched, null, 2));
  await c.close();
}

run();
