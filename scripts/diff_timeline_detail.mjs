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
  const realSec = await c.eval(`(() => {
    const s = Array.from(document.querySelectorAll('[data-showcase-root] > section')).find(el => el.textContent.includes('LỊCH TRÌNH'));
    const cs = getComputedStyle(s);
    const card = s.querySelector('.relative.overflow-hidden') || s.firstElementChild;
    const cardCs = getComputedStyle(card);
    const ol = s.querySelector('ol');
    return {
      secRect: s.getBoundingClientRect(),
      secPad: cs.padding,
      cardRect: card.getBoundingClientRect(),
      cardPad: cardCs.padding,
      olRect: ol ? ol.getBoundingClientRect() : null,
      olRowGap: ol ? getComputedStyle(ol).rowGap : null,
      liHeights: Array.from(s.querySelectorAll('li')).map(li => ({
        h: li.getBoundingClientRect().height,
        childrenH: Array.from(li.children).map(c => c.getBoundingClientRect().height)
      }))
    };
  })()`);

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);
  const cloneSec = await c.eval(`(() => {
    const s = Array.from(document.querySelectorAll('[data-showcase-root] > section')).find(el => el.textContent.includes('LỊCH TRÌNH'));
    const cs = getComputedStyle(s);
    const card = s.querySelector('.relative.overflow-hidden') || s.firstElementChild;
    const cardCs = getComputedStyle(card);
    const ol = s.querySelector('ol');
    return {
      secRect: s.getBoundingClientRect(),
      secPad: cs.padding,
      cardRect: card.getBoundingClientRect(),
      cardPad: cardCs.padding,
      olRect: ol ? ol.getBoundingClientRect() : null,
      olRowGap: ol ? getComputedStyle(ol).rowGap : null,
      liHeights: Array.from(s.querySelectorAll('li')).map(li => ({
        h: li.getBoundingClientRect().height,
        childrenH: Array.from(li.children).map(c => c.getBoundingClientRect().height)
      }))
    };
  })()`);

  console.log("Real Timeline Sec:", JSON.stringify(realSec, null, 2));
  console.log("Clone Timeline Sec:", JSON.stringify(cloneSec, null, 2));

  await c.close();
}

run();
