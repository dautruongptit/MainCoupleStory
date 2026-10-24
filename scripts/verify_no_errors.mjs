import { ChromeController } from "./cdp_helper.mjs";

async function verify() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  c.consoleLogs = [];
  c.networkLogs = [];

  console.log("Loading http://localhost:5173/vi/mau-thiep/hoa-moc-xanh/demo...");
  await c.navigate("http://localhost:5173/vi/mau-thiep/hoa-moc-xanh/demo", 2000);

  // Click open
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button')).find(x => x.innerText && x.innerText.includes('Mở thiệp'));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));

  // Scroll all the way down to trigger lazy images
  await c.eval(`
    new Promise(resolve => {
      let total = 0;
      const step = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.documentElement.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          setTimeout(resolve, 500);
        }
      }, 50);
    })
  `);

  const errors = c.consoleLogs.filter(cl => cl.type === "error");
  const failed404s = c.networkLogs.filter(n => n.response && n.response.status >= 400).map(n => ({
    url: n.response.url,
    status: n.response.status
  }));

  console.log("Console Errors:", errors.length);
  errors.forEach(e => console.log(" - Error:", e));
  console.log("Network Failures (>=400):", failed404s.length);
  failed404s.forEach(f => console.log(" - Fail:", f.status, f.url));

  await c.close();
}

verify().catch(console.error);
