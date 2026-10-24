import { ChromeController } from "./cdp_helper.mjs";

async function verifyCleanDemo() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  const url = "http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo";
  console.log(`Navigating to ${url}...`);
  await c.navigate(url, 1500);

  // Check floating header existence
  const hasFloatingHeader = await c.eval(`
    Boolean(document.querySelector('.demo-floating-header'))
  `);
  console.log("Floating header present on demo (should be false):", hasFloatingHeader);

  // Click open
  await c.eval(`
    (() => {
      const s = document.querySelector('[title*="mở thiệp"], div[style*="radial-gradient"]');
      if (s) s.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 1200));

  const hasFloatingHeaderAfterOpen = await c.eval(`
    Boolean(document.querySelector('.demo-floating-header'))
  `);
  console.log("Floating header present after open (should be false):", hasFloatingHeaderAfterOpen);

  const musicBtn = await c.eval(`
    Boolean(document.querySelector('.music-floating-btn'))
  `);
  console.log("Music button present (web gốc standard):", musicBtn);

  const errors = c.consoleLogs.filter(cl => cl.type === "error");
  console.log("Console errors:", errors.length);

  await c.close();
  console.log("Verification finished successfully!");
}

verifyCleanDemo().catch(err => {
  console.error(err);
  process.exit(1);
});
