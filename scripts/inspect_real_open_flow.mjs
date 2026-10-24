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

  console.log("Navigating to real minimalism-nau/demo...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo", 4000);

  // Extract keyframes for seal-break, seal-ring, dragon-fly-forward, envelope-away
  const keyframes = await c.eval(`(() => {
    const names = ['seal-break', 'seal-ring', 'dragon-fly-forward', 'envelope-away', 'shine', 'ambient-fall'];
    const found = {};
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (names.includes(rule.name)) {
            found[rule.name] = rule.cssText;
          }
        }
      } catch (e) {}
    }
    return found;
  })()`);
  console.log("Keyframes found:\n", JSON.stringify(keyframes, null, 2));

  // Click the open button
  console.log("Clicking Mở thiệp...");
  await c.eval(`(() => {
    const link = document.querySelector('a[href*="open=1"]');
    link.click();
  })()`);

  // Track envelope at 0, 100, 200, 300, 500, 800, 1200, 2000 ms
  const timepoints = [100, 200, 300, 500, 800, 1200, 2000];
  let lastTime = 0;
  for (const t of timepoints) {
    await new Promise(r => setTimeout(r, t - lastTime));
    lastTime = t;
    const snap = await c.eval(`(() => {
      const env = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
      if (!env) return 'REMOVED_FROM_DOM';
      const card = env.querySelector('.relative.w-\\\\[310px\\\\]') || env.children[1];
      const seal = env.querySelector('.rounded-full.flex');
      return {
        envStyle: env.getAttribute('style'),
        cardStyle: card ? card.getAttribute('style') : null,
        sealStyle: seal ? seal.getAttribute('style') : null
      };
    })()`);
    console.log(`t = ${t}ms:`, snap);
  }

  const finalUrl = await c.eval(`window.location.href`);
  console.log("Final URL:", finalUrl);

  await c.close();
}

run().catch(console.error);
