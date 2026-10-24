import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.send("Network.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  });

  console.log("Navigating to REAL minimalism-nau/demo?open=1...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo?open=1", 4000);

  const realSec2 = await c.eval(`(() => {
    const s = document.querySelectorAll('[data-showcase-root] > section')[0];
    return Array.from(s.querySelectorAll('*')).map(el => ({
      tag: el.tagName,
      cls: el.className,
      text: el.children.length === 0 ? el.textContent.trim() : null,
      r: el.getBoundingClientRect(),
      margin: getComputedStyle(el).margin,
      padding: getComputedStyle(el).padding,
      fontSize: getComputedStyle(el).fontSize,
      lineHeight: getComputedStyle(el).lineHeight
    })).filter(x => x.r.height > 0);
  })()`);

  console.log("Navigating to CLONE minimalism-nau/demo?open=1...");
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);

  const cloneSec2 = await c.eval(`(() => {
    const s = document.querySelectorAll('[data-showcase-root] > section')[0];
    return Array.from(s.querySelectorAll('*')).map(el => ({
      tag: el.tagName,
      cls: el.className,
      text: el.children.length === 0 ? el.textContent.trim() : null,
      r: el.getBoundingClientRect(),
      margin: getComputedStyle(el).margin,
      padding: getComputedStyle(el).padding,
      fontSize: getComputedStyle(el).fontSize,
      lineHeight: getComputedStyle(el).lineHeight
    })).filter(x => x.r.height > 0);
  })()`);

  console.log(`Real Sec 2 elements: ${realSec2.length} | Clone Sec 2 elements: ${cloneSec2.length}`);

  // Find biggest height differences
  for (let i = 0; i < Math.min(realSec2.length, cloneSec2.length); i++) {
    const r = realSec2[i];
    const cl = cloneSec2[i];
    const diffH = Math.round((cl.r.height - r.r.height) * 10) / 10;
    if (Math.abs(diffH) > 2) {
      console.log(`Diff at ${i} <${r.tag}> "${r.text || r.cls.slice(0, 30)}": RealH=${r.r.height}, CloneH=${cl.r.height}, DiffH=${diffH}`);
      console.log(`   Real: font=${r.fontSize}, line=${r.lineHeight}, pad=${r.padding}, mar=${r.margin}`);
      console.log(`  Clone: font=${cl.fontSize}, line=${cl.lineHeight}, pad=${cl.padding}, mar=${cl.margin}`);
    }
  }

  await c.close();
}

run().catch(console.error);
