import { ChromeController } from "./cdp_helper.mjs";

const c = new ChromeController();
await c.start();
await c.newPage();
await c.navigate("https://chungdoi.com/vi/mau-thiep/long-phung-do/demo?open=1", 3000);

const logCountBefore = c.networkLogs.length;

const clickResult = await c.eval(`
  (() => {
    const btn = document.querySelector('[data-landing-screenshot-id="invite-rsvp"] button');
    if (!btn) return 'button not found';
    btn.scrollIntoView({ block: 'center' });
    btn.click();
    return 'clicked: ' + btn.innerText;
  })()
`);
console.log('Click result:', clickResult);

await c.wait(2500);

const newLogs = c.networkLogs.slice(logCountBefore);
console.log('New network responses:', newLogs.map(l => l.response?.url));

const modalInfo = await c.eval(`
  (() => {
    const dialog = document.querySelector('[role="dialog"], [class*="modal"], [class*="dialog"], form');
    const inputs = Array.from(document.querySelectorAll('input, select, textarea')).map(i => ({
      tag: i.tagName,
      name: i.name,
      placeholder: i.placeholder,
      type: i.type
    }));
    return {
      hasModal: !!dialog,
      dialogClass: dialog?.className,
      inputsCount: inputs.length,
      inputs
    };
  })()
`);

console.log('Modal info:', JSON.stringify(modalInfo, null, 2));

await c.close();
