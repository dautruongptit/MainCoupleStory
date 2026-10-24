import { ChromeController } from "./cdp_helper.mjs";

async function testHeadful() {
  const c = new ChromeController();
  // Try headful mode
  await c.start({ headless: false });
  await c.newPage();

  console.log("Navigating in headful Chrome...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 4000);

  const title = await c.eval(`document.title`);
  console.log("Title:", title);
  const isBlocked = await c.eval(`document.title.includes('Just a moment') || document.body.innerText.includes('Cloudflare')`);
  console.log("Blocked:", isBlocked);

  if (!isBlocked) {
    const heading = await c.eval(`document.querySelector('h1')?.innerText`);
    console.log("H1:", heading);
  }

  await c.close();
}

testHeadful().catch(console.error);
