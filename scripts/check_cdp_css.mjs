import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.send("Network.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  });
  await c.send("CSS.enable");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-nau/demo?open=1", 4000);

  const doc = await c.send("DOM.getDocument");
  const node = await c.send("DOM.querySelector", {
    nodeId: doc.root.nodeId,
    selector: ".text-\\[12px\\]"
  });

  const matched = await c.send("CSS.getMatchedStylesForNode", { nodeId: node.nodeId });
  
  console.log("Inherited rules:");
  matched.inherited.forEach(inh => {
    inh.matchedCSSRules.forEach(r => {
      const lh = r.rule.style.cssProperties.find(p => p.name === 'line-height');
      if (lh) {
        console.log(`Selector: ${r.rule.selectorList.text} -> line-height: ${lh.value}`);
      }
    });
  });

  await c.close();
}

run();
