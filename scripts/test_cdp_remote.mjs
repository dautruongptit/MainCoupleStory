import { ChromeController } from "./cdp_helper.mjs";

async function testRemote() {
  const c = new ChromeController();
  await c.start();
  await c.newPage("about:blank");

  console.log("Navigating to https://chungdoi.com/vi/mau-thiep/song-hy-do/demo...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/song-hy-do/demo", 3000);

  const info = await c.eval(`
    (() => {
      const h1 = document.querySelector('h1')?.textContent?.trim() || '';
      const imgs = Array.from(document.querySelectorAll('img')).map(img => img.src);
      const title = document.title;
      return { title, h1, imgCount: imgs.length, sampleImgs: imgs.slice(0, 5) };
    })()
  `);
  console.log("Remote page info:", info);

  await c.screenshot("docs/audit-screenshots/remote_song_hy_do.png");
  console.log("Screenshot saved to docs/audit-screenshots/remote_song_hy_do.png");

  await c.close();
}

testRemote().catch(console.error);
