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
  const realS4Sub = await c.eval(`(() => {
    const s = Array.from(document.querySelectorAll('[data-showcase-root] > section')).find(el => el.textContent.includes('THÔNG TIN TIỆC'));
    const div = s.querySelector('.relative.z-10.flex.flex-col').children[1];
    return Array.from(div.children).map((ch, i) => ({
      i,
      tag: ch.tagName,
      cls: ch.className,
      text: ch.textContent.trim().slice(0, 20),
      h: ch.getBoundingClientRect().height,
      mar: getComputedStyle(ch).margin
    }));
  })()`);

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);
  const cloneS4Sub = await c.eval(`(() => {
    const s = Array.from(document.querySelectorAll('[data-showcase-root] > section')).find(el => el.textContent.includes('THÔNG TIN TIỆC'));
    const div = s.querySelector('.relative.z-10.flex.flex-col').children[1];
    return Array.from(div.children).map((ch, i) => ({
      i,
      tag: ch.tagName,
      cls: ch.className,
      text: ch.textContent.trim().slice(0, 20),
      h: ch.getBoundingClientRect().height,
      mar: getComputedStyle(ch).margin
    }));
  })()`);

  console.log("Real S4 Subchildren:");
  console.log(JSON.stringify(realS4Sub, null, 2));

  console.log("Clone S4 Subchildren:");
  console.log(JSON.stringify(cloneS4Sub, null, 2));

  await c.close();
}

run();
