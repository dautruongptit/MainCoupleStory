import { ChromeController } from "./cdp_helper.mjs";

async function main() {
  const c = new ChromeController();
  await c.start();
  await c.newPage("about:blank");

  console.log("Navigating to Real chungdoi minimalism-do-dam demo...");
  await c.setViewport({ width: 390, height: 844, mobile: true });
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 3000);

  // Click open
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button, .wax-seal')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2500));

  const realEnvelope = await c.eval(`
    (() => {
      // Find the envelope container and its children
      const env = document.querySelector('[class*="envelope"], header .relative.aspect-, .aspect-\\\\[333\\\\/384\\\\]');
      if (!env) return { notFound: true, bodyHtml: document.body.innerHTML.slice(0, 1000) };
      
      const r = env.getBoundingClientRect();
      const cs = window.getComputedStyle(env);
      
      // Get all child elements of envelope
      const children = Array.from(env.querySelectorAll('*')).map(el => {
        const cr = el.getBoundingClientRect();
        const ccs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          cls: el.className,
          w: Math.round(cr.width),
          h: Math.round(cr.height),
          top: Math.round(cr.top),
          left: Math.round(cr.left),
          bg: ccs.backgroundColor,
          bgImg: ccs.backgroundImage,
          border: ccs.border,
          boxShadow: ccs.boxShadow,
          transform: ccs.transform,
          padding: ccs.padding,
          margin: ccs.margin,
          position: ccs.position
        };
      });

      return {
        tag: env.tagName,
        cls: env.className,
        rect: { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), left: Math.round(r.left) },
        cs: {
          padding: cs.padding,
          margin: cs.margin,
          width: cs.width,
          maxWidth: cs.maxWidth
        },
        children
      };
    })()
  `);
  console.log("REAL ENVELOPE:", JSON.stringify(realEnvelope, null, 2));

  console.log("\nNavigating to Clone minimalism-do-dam demo...");
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  await c.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('a, button, .wax-seal')).find(x => x.innerText && x.innerText.includes('Mở thiệp')) || document.querySelector('.wax-seal');
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));

  const cloneEnvelope = await c.eval(`
    (() => {
      const env = document.querySelector('[class*="envelope"], header .relative.aspect-, .aspect-\\\\[333\\\\/384\\\\]');
      if (!env) return { notFound: true, bodyHtml: document.body.innerHTML.slice(0, 1000) };
      
      const r = env.getBoundingClientRect();
      const cs = window.getComputedStyle(env);
      
      const children = Array.from(env.querySelectorAll('*')).map(el => {
        const cr = el.getBoundingClientRect();
        const ccs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          cls: el.className,
          w: Math.round(cr.width),
          h: Math.round(cr.height),
          top: Math.round(cr.top),
          left: Math.round(cr.left),
          bg: ccs.backgroundColor,
          bgImg: ccs.backgroundImage,
          border: ccs.border,
          boxShadow: ccs.boxShadow,
          transform: ccs.transform,
          padding: ccs.padding,
          margin: ccs.margin,
          position: ccs.position
        };
      });

      return {
        tag: env.tagName,
        cls: env.className,
        rect: { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), left: Math.round(r.left) },
        cs: {
          padding: cs.padding,
          margin: cs.margin,
          width: cs.width,
          maxWidth: cs.maxWidth
        },
        children
      };
    })()
  `);
  console.log("CLONE ENVELOPE:", JSON.stringify(cloneEnvelope, null, 2));

  await c.close();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
