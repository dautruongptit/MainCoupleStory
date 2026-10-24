import { ChromeController } from "./cdp_helper.mjs";

async function verifyLocal() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  const testSlugs = [
    "minimalism-do-dam",
    "minimalism-nau",
    "song-hy-xanh",
    "bach-su-do",
    "song-phung-do",
    "long-phung-v2-do",
    "chibi-red"
  ];

  for (const slug of testSlugs) {
    c.consoleLogs = [];
    c.networkLogs = [];
    const url = `http://localhost:5173/vi/mau-thiep/${slug}/demo`;
    console.log(`Checking ${slug}...`);
    await c.navigate(url, 1500);

    const title = await c.eval(`document.title`);
    const paperBg = await c.eval(`
      (() => {
        const el = document.querySelector('.paper-texture');
        return el ? window.getComputedStyle(el).backgroundImage : 'none';
      })()
    `);
    const seal = await c.eval(`
      (() => {
        const s = document.querySelector('[title*="mở thiệp"], div[style*="radial-gradient"]');
        if (!s) return null;
        const r = s.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) };
      })()
    `);

    const errors = c.consoleLogs.filter(cl => cl.type === "error");
    const net404s = c.networkLogs.filter(n => n.response && n.response.status >= 400).map(n => n.response.url);

    console.log(`  Title: ${title}`);
    console.log(`  PaperBg: ${paperBg}`);
    console.log(`  Seal:`, seal);
    console.log(`  Console Errors: ${errors.length}, Network 404s: ${net404s.length}`);
  }

  await c.stop();
  console.log("Local verification complete.");
}

verifyLocal().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
