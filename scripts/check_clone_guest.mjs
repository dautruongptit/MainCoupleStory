import { ChromeController } from './cdp_helper.mjs';

async function run() {
  const c = new ChromeController();
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844, mobile: true, deviceScaleFactor: 1 });
  await c.navigate('http://localhost:5173/vi/mau-thiep/minimalism-nau/demo', 3000);

  const res = await c.eval(`(() => {
    const div = document.querySelector('.mb-6.max-w-\\\\[300px\\\\]');
    const p = div.querySelector('p');
    const span = div.querySelector('span');
    return {
      pRect: p.getBoundingClientRect(),
      pStyle: { margin: getComputedStyle(p).margin, lineHeight: getComputedStyle(p).lineHeight, height: getComputedStyle(p).height },
      spanRect: span.getBoundingClientRect(),
      spanStyle: { margin: getComputedStyle(span).margin, lineHeight: getComputedStyle(span).lineHeight, height: getComputedStyle(span).height },
      divStyle: { height: getComputedStyle(div).height }
    };
  })()`);
  console.log('Clone guest p/span:', res);
  await c.close();
}
run();
