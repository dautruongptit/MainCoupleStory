import { ChromeController } from "./cdp_helper.mjs";

const c = new ChromeController();
await c.start();
await c.newPage();
await c.navigate("https://chungdoi.com/vi/mau-thiep/to-duyen-xanh/demo", 3000);

const res = await c.send("Runtime.evaluate", {
  expression: `
    (() => {
      const el = document.querySelector('[data-landing-screenshot-id="invite-envelope"]');
      const card = el.querySelector('.relative.w-\\\\[320px\\\\], .relative.w-\\\\[310px\\\\], [class*="min-card"], [class*="envelope-card"]') || el.children[1];
      return card ? card.outerHTML : el.innerHTML;
    })()
  `,
  returnByValue: true
});

console.log('Card HTML:\n', res.result.value);
await c.close();
