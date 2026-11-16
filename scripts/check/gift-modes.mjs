// Kiểm tra: ở editor, bấm từng kiểu hiển thị Hộp quà (Hộp quà | Phong bì | Hiện QR trực tiếp) thì XEM TRƯỚC phải hiện đúng kiểu đã chọn.
// Dùng: node scripts/check/gift-modes.mjs <templateId ...|--all> [--base http://localhost:5173]
// Ghi: docs/survey/gift-modes.md (bảng mẫu × kiểu: pass/FAIL + ghi chú)
import fs from "node:fs";
import { ChromeController } from "../lib/cdp_helper.mjs";

const args = process.argv.slice(2);
const base = args.includes("--base") ? args[args.indexOf("--base") + 1] : process.env.LOCAL_BASE || "http://localhost:8111";
let ids = args.filter((a) => !a.startsWith("--") && a !== base);
if (args.includes("--all") || !ids.length) {
  const s = fs.readFileSync(new URL("../../src/features/templates/data/templates.ts", import.meta.url), "utf8");
  ids = [...s.matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]);
}

const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
await c.setViewport({ width: 1280, height: 900 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ev = async (js) => {
  const r = await c.eval(`(async()=>{try{return JSON.stringify(await (async()=>{${js}})())}catch(e){return JSON.stringify({__err:String(e.message)})}})()`);
  try { return r === undefined ? undefined : JSON.parse(r); } catch { return r; }
};

const PROBE = `
const norm = (s) => (s || '').normalize('NFC');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const cards = () => [...document.querySelectorAll('div.bg-base-100.border.border-base-300.rounded-lg')];
const giftCard = () => cards().find((s) => /Hộp Quà/i.test(norm(s.querySelector(':scope > div span.flex-1.min-w-0')?.textContent)));
const btnByText = (root, t) => [...root.querySelectorAll('button')].find((b) => norm(b.textContent).trim().startsWith(t));
const out = {};
const g = giftCard();
if (!g) return { __err: 'không thấy thẻ Hộp Quà Mừng' };
const col = g.querySelector('button[aria-label="Collapse section"]');
if (col && !col.querySelector('svg')?.classList.contains('rotate-90')) col.click();
await sleep(300);
for (const [label, key] of [['Hộp quà', 'gift_box'], ['Phong bì', 'envelope'], ['Hiện QR trực tiếp', 'qr_inline']]) {
  const gc = giftCard();
  const b = [...gc.querySelectorAll('button')].find((x) => norm(x.textContent).trim() === label);
  if (!b) { out[key] = { __err: 'không có nút ' + label }; continue; }
  b.click(); await sleep(450);
  btnByText(document, 'Xem trước')?.click(); await sleep(900);
  const root = document.querySelector('[data-showcase-root]') || document.querySelector('.inv-root');
  const inDlg = (e) => !!e.closest('dialog');
  const q = (s) => root ? [...root.querySelectorAll(s)].filter((e) => !inDlg(e)).length : -1;
  out[key] = { igb: q('[class*="igb-"]'), ienv: q('[class*="ienv-"]'), qr: q('img[alt^="QR -"]'), btn: q('button[aria-label="Mở hộp mừng cưới"]'), root: !!root };
  btnByText(document, 'Chỉnh sửa')?.click(); await sleep(450);
}
return out;
`;

const verdict = (key, r) => {
  if (!r || r.__err) return ["FAIL", r?.__err || "không có dữ liệu"];
  if (!r.root) return ["FAIL", "không thấy vùng xem trước"];
  if (key === "gift_box") return r.igb > 0 && r.ienv === 0 && r.btn > 0 ? ["pass", ""] : ["FAIL", `igb=${r.igb} ienv=${r.ienv} nút=${r.btn}`];
  if (key === "envelope") return r.ienv > 0 && r.igb === 0 && r.btn > 0 ? ["pass", ""] : ["FAIL", `igb=${r.igb} ienv=${r.ienv} nút=${r.btn}`];
  return r.qr > 0 && r.btn === 0 && r.igb === 0 && r.ienv === 0 ? ["pass", ""] : ["FAIL", `qr=${r.qr} nút=${r.btn} igb=${r.igb} ienv=${r.ienv}`];
};

const rows = [];
for (const id of ids) {
  const draft = `gm-${id}-${Date.now()}`;
  try {
    // tạo bản nháp qua đường tạo thiệp thật (chỉ khi có thẻ thiệp trong localStorage thì editor mới lưu được)
    await c.navigate(`${base}/invitations/create/${id}`, 4500);
    // thêm một tài khoản mẫu (thẻ Hộp Quà chỉ hiện lựa chọn kiểu khi đã có tài khoản)
    const url = await ev(`const cards = JSON.parse(localStorage.getItem('chungdoi.cards') || '[]'); if (!cards.length) return 'no-card'; const k = 'chungdoi.inv.' + cards[0].id; const inv = JSON.parse(localStorage.getItem(k)); inv.gifts = [{ id: 'g1', who: 'groom', bankName: 'Vietcombank', bankCode: 'VCB', bankBin: '970436', accountNumber: '0000000000', accountName: 'THIEP CUOI DEMO', qrUrl: '/api/qr-png?d=00020101021238540010A00000072701240006970436011000000000000208QRIBFTTA53037045802VN63048C2A&ec=M' }]; inv.giftOn = true; localStorage.setItem(k, JSON.stringify(inv)); return cards[0].id;`);
    if (url === "no-card") throw new Error("không tạo được bản nháp");
    await c.navigate(`${base}/edit/${url}`, 4000);
    const res = await ev(PROBE);
    const v = Object.fromEntries(["gift_box", "envelope", "qr_inline"].map((k) => [k, verdict(k, res?.[k] ?? res)]));
    rows.push({ id, v });
    console.log(id.padEnd(28), ["gift_box", "envelope", "qr_inline"].map((k) => v[k][0] + (v[k][1] ? "(" + v[k][1] + ")" : "")).join("  "));
  } catch (e) {
    rows.push({ id, v: { gift_box: ["FAIL", String(e.message)], envelope: ["FAIL", ""], qr_inline: ["FAIL", ""] } });
    console.log(id, "LỖI", e.message);
  }
  // dọn dữ liệu của lần thử để mỗi mẫu bắt đầu sạch
  await ev(`localStorage.clear(); return 1;`);
}
await c.close?.();

const fails = rows.filter((r) => Object.values(r.v).some((x) => x[0] !== "pass"));
const md = [`# Kiểm tra kiểu hiển thị Hộp quà — editor → xem trước`, ``, `Cập nhật: ${new Date().toISOString().slice(0, 10)} · ${rows.length} mẫu · lỗi ${fails.length}`, ``, `| Mẫu | Hộp quà | Phong bì | Hiện QR |`, `|---|---|---|---|`,
  ...rows.map((r) => `| ${r.id} | ${["gift_box", "envelope", "qr_inline"].map((k) => r.v[k][0] + (r.v[k][1] ? " " + r.v[k][1] : "")).join(" | ")} |`)].join("\n");
fs.writeFileSync("docs/survey/gift-modes.md", md + "\n");
console.log(`\nTổng: ${rows.length} mẫu, ${fails.length} mẫu có lỗi → docs/survey/gift-modes.md`);
process.exit(fails.length ? 1 : 0);
