import { ChromeController } from "./cdp_helper.mjs";

async function inspect() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  console.log("=== INSPECTING REAL ===");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/hoa-moc-xanh/demo", 3000);
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button')).find(x => x.innerText && x.innerText.includes('Mở thiệp'));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));
  const realInfo = await c.eval(`
    (() => {
      const sections = Array.from(document.querySelectorAll('#invite-renderer > div, #invite-renderer > section, [id^="invite-"]')).map(s => ({
        id: s.id,
        tag: s.tagName,
        rect: { top: Math.round(s.getBoundingClientRect().top + window.scrollY), height: Math.round(s.getBoundingClientRect().height) },
        h: Array.from(s.querySelectorAll('h2, h3')).map(h => h.innerText.replace(/\\s+/g, ' ').trim()).filter(Boolean)
      }));
      return { scrollHeight: document.documentElement.scrollHeight, sections };
    })()
  `);
  console.log("REAL (Mobile):", JSON.stringify(realInfo, null, 2));

  console.log("\n=== INSPECTING CLONE ===");
  await c.navigate("http://localhost:5173/vi/mau-thiep/hoa-moc-xanh/demo", 3000);
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button')).find(x => x.innerText && x.innerText.includes('Mở thiệp'));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));
  const cloneInfo = await c.eval(`
    (() => {
      const sections = Array.from(document.querySelectorAll('#invite-renderer > div, #invite-renderer > section, [id^="invite-"]')).map(s => ({
        id: s.id,
        tag: s.tagName,
        rect: { top: Math.round(s.getBoundingClientRect().top + window.scrollY), height: Math.round(s.getBoundingClientRect().height) },
        h: Array.from(s.querySelectorAll('h2, h3')).map(h => h.innerText.replace(/\\s+/g, ' ').trim()).filter(Boolean)
      }));
      return { scrollHeight: document.documentElement.scrollHeight, sections };
    })()
  `);
  console.log("CLONE (Mobile):", JSON.stringify(cloneInfo, null, 2));

  await c.close();
}

inspect().catch(console.error);
