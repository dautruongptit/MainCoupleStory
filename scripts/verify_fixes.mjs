import { ChromeController } from "./cdp_helper.mjs";

async function verify() {
  const c = new ChromeController();
  await c.start();
  await c.newPage("about:blank");

  console.log("=== 1. VERIFY MINIMALISM-DO-DAM (MOBILE 390x844) ===");
  await c.setViewport({ width: 390, height: 844, mobile: true });
  await c.navigate("http://localhost:5173/demo/minimalism-do-dam?open=1", 2000);

  const mDoDamMobile = await c.eval(`
    (() => {
      const header = document.querySelector('header');
      const env = document.querySelector('header .aspect-\\\\[333\\\\/384\\\\]');
      const hdrCs = header ? window.getComputedStyle(header) : null;
      const envR = env ? env.getBoundingClientRect() : null;
      const floatingHdr = document.querySelector('.demo-floating-header');
      const floatR = floatingHdr ? floatingHdr.getBoundingClientRect() : null;

      return {
        headerPadding: hdrCs ? hdrCs.padding : null,
        envelopeRect: envR ? { w: Math.round(envR.width), h: Math.round(envR.height), top: Math.round(envR.top), left: Math.round(envR.left) } : null,
        floatingHdrRect: floatR ? { top: Math.round(floatR.top), bottom: Math.round(window.innerHeight - floatR.bottom) } : null
      };
    })()
  `);
  console.log("minimalism-do-dam Mobile metrics:", JSON.stringify(mDoDamMobile, null, 2));

  console.log("\n=== 2. VERIFY MINIMALISM-DO-DAM (LAPTOP 1440x900) ===");
  await c.setViewport({ width: 1440, height: 900, mobile: false });
  await c.navigate("http://localhost:5173/demo/minimalism-do-dam?open=1", 2000);

  const mDoDamLaptop = await c.eval(`
    (() => {
      const tpl = document.querySelector('.songphung-template, .is-minimalism-darkred-body');
      const r = tpl ? tpl.getBoundingClientRect() : null;
      const cs = tpl ? window.getComputedStyle(tpl) : null;
      return {
        width: r ? Math.round(r.width) : null,
        maxWidth: cs ? cs.maxWidth : null
      };
    })()
  `);
  console.log("minimalism-do-dam Laptop container:", JSON.stringify(mDoDamLaptop, null, 2));

  console.log("\n=== 3. VERIFY MINIMALISM-NAU (MOBILE & LAPTOP) ===");
  await c.setViewport({ width: 390, height: 844, mobile: true });
  await c.navigate("http://localhost:5173/demo/minimalism-nau?open=1", 2000);

  const mNauMobile = await c.eval(`
    (() => {
      const card = document.querySelector('.sp-section');
      const r = card ? card.getBoundingClientRect() : null;
      const cs = card ? window.getComputedStyle(card) : null;
      return {
        cardWidth: r ? Math.round(r.width) : null,
        cardLeft: r ? Math.round(r.left) : null,
        cardMaxWidth: cs ? cs.maxWidth : null
      };
    })()
  `);
  console.log("minimalism-nau Mobile card:", JSON.stringify(mNauMobile, null, 2));

  await c.setViewport({ width: 1440, height: 900, mobile: false });
  await c.navigate("http://localhost:5173/demo/minimalism-nau?open=1", 2000);

  const mNauLaptop = await c.eval(`
    (() => {
      const tpl = document.querySelector('.songphung-template, .is-minimalism-body');
      const r = tpl ? tpl.getBoundingClientRect() : null;
      return {
        containerWidth: r ? Math.round(r.width) : null
      };
    })()
  `);
  console.log("minimalism-nau Laptop container:", JSON.stringify(mNauLaptop, null, 2));

  console.log("\n=== 4. VERIFY SONG-HY-XANH (LAPTOP 1440x900) ===");
  await c.navigate("http://localhost:5173/demo/song-hy-xanh?open=1", 2000);
  const songHyLaptop = await c.eval(`
    (() => {
      const tpl = document.querySelector('.songphung-template');
      const r = tpl ? tpl.getBoundingClientRect() : null;
      return {
        containerWidth: r ? Math.round(r.width) : null
      };
    })()
  `);
  console.log("song-hy-xanh Laptop container:", JSON.stringify(songHyLaptop, null, 2));

  console.log("\n=== 5. VERIFY COVER SEAL POSITIONS (MOBILE 390x844) ===");
  await c.setViewport({ width: 390, height: 844, mobile: true });

  // Test minimalism-do-dam cover seal
  await c.navigate("http://localhost:5173/demo/minimalism-do-dam", 2000);
  const sealDoDam = await c.eval(`
    (() => {
      const seal = document.querySelector('[title*="mở thiệp"], div[style*="radial-gradient"]');
      const r = seal ? seal.getBoundingClientRect() : null;
      return r ? { top: Math.round(r.top), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) } : null;
    })()
  `);
  console.log("minimalism-do-dam Cover Seal (Target: top ~221px):", sealDoDam);

  // Test song-phung-do cover seal
  await c.navigate("http://localhost:5173/demo/song-phung-do", 2000);
  const sealSongPhung = await c.eval(`
    (() => {
      const seal = document.querySelector('[title*="mở thiệp"], div[style*="radial-gradient"]');
      const r = seal ? seal.getBoundingClientRect() : null;
      return r ? { top: Math.round(r.top), left: Math.round(r.left) } : null;
    })()
  `);
  console.log("song-phung-do Cover Seal (Target: top ~165px):", sealSongPhung);

  // Test long-phung-v2-do (Target: no wax seal button)
  await c.navigate("http://localhost:5173/demo/long-phung-v2-do", 2000);
  const sealLongPhung = await c.eval(`
    (() => {
      const seal = document.querySelector('[title*="mở thiệp"], div[style*="radial-gradient"]');
      return seal ? { exists: true } : { exists: false };
    })()
  `);
  console.log("long-phung-v2-do Cover Seal (Target: exists false):", sealLongPhung);

  await c.close();
  console.log("\n=== ALL VERIFICATION CHECKS COMPLETED ===");
}

verify().catch(e => {
  console.error(e);
  process.exit(1);
});
