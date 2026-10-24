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
  const realTimeline = await c.eval(`(() => {
    const s = Array.from(document.querySelectorAll('[data-showcase-root] > section')).find(el => el.textContent.includes('LỊCH TRÌNH'));
    if (!s) return 'not found';
    return {
      rect: s.getBoundingClientRect(),
      olRect: s.querySelector('ol')?.getBoundingClientRect(),
      items: Array.from(s.querySelectorAll('li, ol > *')).map(el => ({
        tag: el.tagName,
        cls: el.className,
        rect: el.getBoundingClientRect(),
        text: el.textContent.trim().slice(0, 30)
      }))
    };
  })()`);

  console.log("Real Timeline:", JSON.stringify(realTimeline, null, 2));

  // Wishes count in real
  const realWishes = await c.eval(`(() => {
    const s = Array.from(document.querySelectorAll('[data-showcase-root] > div')).find(el => el.textContent.includes('Sổ lưu bút'));
    const wishesList = s ? s.querySelector('.overflow-y-auto') : null;
    return {
      containerRect: s ? s.getBoundingClientRect() : null,
      listRect: wishesList ? wishesList.getBoundingClientRect() : null,
      wishesCount: wishesList ? wishesList.children.length : 0,
      wishes: wishesList ? Array.from(wishesList.children).map(ch => ({
        rect: ch.getBoundingClientRect(),
        name: ch.querySelector('.font-semibold')?.textContent,
        msg: ch.querySelector('p')?.textContent
      })) : []
    };
  })()`);
  console.log("Real Wishes:", JSON.stringify(realWishes, null, 2));

  await c.close();
}

run();
