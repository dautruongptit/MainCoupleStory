import { ChromeController } from "./cdp_helper.mjs";

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.send("CSS.enable");
  await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1", 3000);

  const doc = await c.send("DOM.getDocument");
  const node = await c.send("DOM.querySelector", {
    nodeId: doc.root.nodeId,
    selector: "ol"
  });

  const matched = await c.send("CSS.getMatchedStylesForNode", { nodeId: node.nodeId });
  matched.matchedCSSRules.forEach(r => {
    const gtc = r.rule.style.cssProperties.find(p => p.name === 'grid-template-columns');
    if (gtc) console.log(r.rule.selectorList.text, '->', gtc.value);
  });

  await c.close();
}

run();
