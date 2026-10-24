import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.send("Network.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  });
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo?open=1", 4000);

  const realH2 = await c.eval(`(() => {
    const h2 = document.querySelector('h2');
    return {
      fontSize: getComputedStyle(h2).fontSize,
      lineHeight: getComputedStyle(h2).lineHeight,
      height: getComputedStyle(h2).height,
    };
  })()`);

  console.log("Real h2:", realH2);
  await c.close();
}

run();
