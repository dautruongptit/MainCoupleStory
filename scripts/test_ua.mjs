import { ChromeController } from "./cdp_helper.mjs";

async function testUA() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();

  // Override User-Agent
  await c.send("Network.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    acceptLanguage: "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
    platform: "Win32"
  });

  console.log("Navigating to https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo ...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo", 4000);

  const title = await c.eval(`document.title`);
  console.log("Title:", title);
  const isBlocked = await c.eval(`document.title.includes('Just a moment') || document.body.innerText.includes('Cloudflare')`);
  console.log("Blocked:", isBlocked);

  if (!isBlocked) {
    const html = await c.eval(`document.documentElement.outerHTML.slice(0, 500)`);
    console.log("HTML:", html);
  }

  await c.close();
}

testUA().catch(console.error);
