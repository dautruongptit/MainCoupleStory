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
  const realCardChildren = await c.eval(`(() => {
    const card = document.querySelectorAll('[data-showcase-root] > section')[0].querySelector('.relative.z-10.flex.flex-col');
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
        gap: cs.gap
      };
    });
  })()`);

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);
  const cloneCardChildren = await c.eval(`(() => {
    const card = document.querySelectorAll('[data-showcase-root] > section')[0].querySelector('.relative.z-10.flex.flex-col');
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
        gap: cs.gap
      };
    });
  })()`);

  console.log("Real Card Children:");
  console.log(JSON.stringify(realCardChildren, null, 2));

  console.log("Clone Card Children:");
  console.log(JSON.stringify(cloneCardChildren, null, 2));

  await c.close();
}

run();
