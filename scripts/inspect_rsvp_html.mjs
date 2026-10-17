import { ChromeController } from "./cdp_helper.mjs";

const c = new ChromeController();
await c.start();
await c.newPage();
await c.navigate("https://chungdoi.com/vi/mau-thiep/long-phung-do/demo?open=1", 3000);

const info = await c.eval(`
  (() => {
    const rsvp = document.querySelector('[data-landing-screenshot-id="invite-rsvp"]');
    if (!rsvp) return 'no rsvp block';
    return {
      outerHTML: rsvp.outerHTML.slice(0, 1500),
      buttons: Array.from(rsvp.querySelectorAll('*')).map(el => ({
        tag: el.tagName,
        text: el.innerText.trim(),
        cls: el.className,
        onclick: el.getAttribute('onclick'),
        role: el.getAttribute('role')
      })).filter(x => x.text && x.text.length < 50)
    };
  })()
`);

console.log('Result:', JSON.stringify(info, null, 2));
await c.close();
