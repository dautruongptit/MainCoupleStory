import { ChromeController } from './cdp_helper.mjs';

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.navigate('http://localhost:5173/vi/mau-thiep/minimalism-nau/demo', 3000);

  const cloneEls = await c.eval(`(() => {
    const card = document.querySelector('.relative.rounded-lg');
    const inner = card.querySelector('.relative.z-10');
    return Array.from(inner.children).map(ch => {
      const r = ch.getBoundingClientRect();
      const cs = window.getComputedStyle(ch);
      return {
        tag: ch.tagName,
        cls: ch.className,
        rect: { left: Math.round(r.left*10)/10, top: Math.round(r.top*10)/10, width: Math.round(r.width*10)/10, height: Math.round(r.height*10)/10 },
        margin: cs.margin,
        padding: cs.padding,
        lineHeight: cs.lineHeight
      };
    });
  })()`);
  console.log('Clone card inner children:');
  console.log(JSON.stringify(cloneEls, null, 2));

  const cardRect = await c.eval(`(() => {
    const r = document.querySelector('.relative.rounded-lg').getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  })()`);
  console.log('Card rect:', cardRect);

  await c.close();
}
run();
