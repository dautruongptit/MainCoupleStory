import { ChromeController } from "./cdp_helper.mjs";

async function checkCloneCover() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true });

  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-do-dam/demo", 2000);

  const info = await c.eval(`
    (() => {
      const seal = document.querySelector('[title*="mở thiệp"], .wax-seal, div[style*="radial-gradient"]');
      const card = seal ? seal.parentElement : null;
      const mainWrap = document.querySelector('[data-landing-screenshot-id="invite-envelope"]') || document.querySelector('.envelope-screen');
      const btn = Array.from(document.querySelectorAll('button, a')).find(x => x.innerText && x.innerText.includes('Mở thiệp'));

      const R = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { tag: el.tagName, className: el.className, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
      };

      return {
        mainWrap: R(mainWrap),
        card: R(card),
        seal: R(seal),
        btn: R(btn)
      };
    })()
  `);
  console.log("Clone Cover:", JSON.stringify(info, null, 2));

  await c.close();
}

checkCloneCover().catch(console.error);
