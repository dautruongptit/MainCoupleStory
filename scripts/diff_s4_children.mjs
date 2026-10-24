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
  const realS4 = await c.eval(`(() => {
    const s = Array.from(document.querySelectorAll('[data-showcase-root] > section')).find(el => el.textContent.includes('THÔNG TIN TIỆC'));
    const card = s.querySelector('.relative.z-10.flex.flex-col');
    return Array.from(card.children).map((ch, i) => {
      const r = ch.getBoundingClientRect();
      const cs = getComputedStyle(ch);
      return {
        i,
        tag: ch.tagName,
        cls: ch.className,
        text: ch.textContent.trim().slice(0, 30),
        rect: { top: r.top, height: r.height },
        margin: cs.margin,
        padding: cs.padding,
        lineHeight: cs.lineHeight
      };
    });
  })()`);

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);
  const cloneS4 = await c.eval(`(() => {
    const s = Array.from(document.querySelectorAll('[data-showcase-root] > section')).find(el => el.textContent.includes('THÔNG TIN TIỆC'));
    const card = s.querySelector('.relative.z-10.flex.flex-col');
    return Array.from(card.children).map((ch, i) => {
      const r = ch.getBoundingClientRect();
      const cs = getComputedStyle(ch);
      return {
        i,
        tag: ch.tagName,
        cls: ch.className,
        text: ch.textContent.trim().slice(0, 30),
        rect: { top: r.top, height: r.height },
        margin: cs.margin,
        padding: cs.padding,
        lineHeight: cs.lineHeight
      };
    });
  })()`);

  console.log("Real S4 Children:");
  console.log(JSON.stringify(realS4, null, 2));

  console.log("Clone S4 Children:");
  console.log(JSON.stringify(cloneS4, null, 2));

  await c.close();
}

run();
