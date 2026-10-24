import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo", 2000);
  const res = await c.eval(`
    (() => {
      const env = document.querySelector('[data-landing-screenshot-id="invite-envelope"]') || document.querySelector('.envelope-screen') || document.querySelector('.fixed.inset-0');
      const cs = env ? window.getComputedStyle(env) : null;
      const imgs = env ? Array.from(env.querySelectorAll('img')).map(i => ({ src: i.src.split('/').pop(), className: i.className })) : [];
      return {
        bgImage: cs ? cs.backgroundImage : null,
        bgColor: cs ? cs.backgroundColor : null,
        imgs
      };
    })()
  `);
  console.log("Real cover details:", res);
  await c.close();
}

run().catch(console.error);
