import { ChromeController } from "./cdp_helper.mjs";

const c = new ChromeController();
await c.start();
await c.newPage();
await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo?open=1", 3500);

const secs = await c.eval(`
  (() => {
    return Array.from(document.querySelectorAll('section, header, footer, [class*="section"]')).map(s => ({
      tag: s.tagName,
      cls: s.className,
      testId: s.getAttribute('data-testid'),
      heading: s.querySelector('h1, h2, h3, h4')?.innerText,
      textSample: s.innerText?.slice(0, 80).replace(/\\n/g, ' ')
    }));
  })()
`);

console.log("Sections count:", secs.length);
console.log(JSON.stringify(secs, null, 2));

await c.close();
