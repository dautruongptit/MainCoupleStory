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
  const realCal = await c.eval(`(() => {
    const box = document.querySelector('.overflow-hidden.rounded-\\\\[10px\\\\].px-4.pb-4.pt-2');
    return Array.from(box.children[0].children).map(c => ({
      cls: c.className,
      h: c.getBoundingClientRect().height
    }));
  })()`);

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);
  const cloneCal = await c.eval(`(() => {
    const box = document.querySelector('.overflow-hidden.rounded-\\\\[10px\\\\].px-4.pb-4.pt-2');
    return Array.from(box.children[0].children).map(c => ({
      cls: c.className,
      h: c.getBoundingClientRect().height
    }));
  })()`);

  console.log("Real Cal:", realCal);
  console.log("Clone Cal:", cloneCal);

  await c.close();
}

run();
