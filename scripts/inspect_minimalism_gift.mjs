import { ChromeController } from "./cdp_helper.mjs";

async function main() {
  const c = new ChromeController();
  await c.start();
  await c.newPage();
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo?open=1", 3000);
  
  const h2Info = await c.eval(`
    (() => {
      const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('HỘP QUÀ MỪNG'));
      if (!h2) return 'Not found';
      const sec = h2.closest('section, div[class*="section"]') || h2.parentElement?.parentElement;
      return {
        h2Text: h2.innerText,
        secTag: sec?.tagName,
        secClass: sec?.className,
        secHtml: sec?.innerHTML.slice(0, 1500)
      };
    })()
  `);
  console.log("H2 Section info:", JSON.stringify(h2Info, null, 2));
  await c.close();
}

main().catch(console.error);
