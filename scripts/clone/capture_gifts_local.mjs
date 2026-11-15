// Tạo docs/survey/raw/gift_<id>.json từ bản clone LOCAL cho các mẫu CHƯA có số đo thật (nguồn: "local"), cùng định dạng với
// scripts/survey/gift_crawl.js. Dùng khi trang gốc đang chặn (403) hoặc chưa thu kịp; khi có số đo thật thì ghi đè (nguồn: "real").
// Dùng: node scripts/clone/capture_gifts_local.mjs [<id> ...] [--base http://localhost:5173] [--force]
import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";

const args = process.argv.slice(2);
const base = args.includes("--base") ? args[args.indexOf("--base") + 1] : "http://localhost:5173";
const force = args.includes("--force");
const tpl = fs.readFileSync(new URL("../../src/features/templates/data/templates.ts", import.meta.url), "utf8");
const all = [...tpl.matchAll(/"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)"/g)].map((m) => ({ slug: m[1], id: m[2] }));
const want = args.filter((a) => !a.startsWith("--") && a !== base);
const RAW = "docs/survey/raw";
const hasReal = (id) => { try { const o = JSON.parse(fs.readFileSync(`${RAW}/gift_${id}.json`, "utf8")); return o.source !== "local" && o.found; } catch { return false; } };
const list = all.filter((t) => (want.length ? want.includes(t.id) : true) && (force || !hasReal(t.id)));

const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
await c.setViewport({ width: 390, height: 844 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CAPTURE = `
(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await sleep(100); }
  const btn = document.querySelector('button[aria-label="Mở hộp mừng cưới"]');
  const heads = [...document.querySelectorAll('h1,h2,h3,h4,p,span,div')].filter((e) => e.children.length === 0 && /^h[ộo]p qu[àa]\\s*m[ừu]ng$/i.test(e.textContent.replace(/\\u00a0/g, ' ').trim()));
  const h = heads[0];
  if (!btn && !h) return JSON.stringify({ found: false, headCount: heads.length });
  let wrap = btn ? btn.parentElement : h.parentElement;
  if (btn && h) { let a = btn; while (a && !a.contains(h)) a = a.parentElement; if (a) wrap = a; }
  (btn || wrap).scrollIntoView({ block: 'center' });
  await sleep(800);
  const R = (e) => { const r = e.getBoundingClientRect(); return { x: +r.left.toFixed(1), y: +(r.top + scrollY).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
  const st = (e) => { const s = getComputedStyle(e); return { color: s.color, ff: s.fontFamily, fs: s.fontSize, fw: s.fontWeight, tt: s.textTransform, ls: s.letterSpacing, lh: s.lineHeight, bg: s.backgroundColor }; };
  const out = { found: true, hasButton: !!btn, headCount: heads.length, wrapHTML: wrap.outerHTML, wrapRect: R(wrap), wrapStyle: st(wrap) };
  if (h) { out.headStyle = st(h); out.headText = h.textContent; out.headRect = R(h); }
  const html = wrap.outerHTML;
  out.kind = /igb-/.test(html) ? '3d-box' : /ienv-/.test(html) ? 'envelope' : (btn ? 'other-button' : 'inline');
  out.imgs = [...wrap.querySelectorAll('img')].map((i) => i.getAttribute('src'));
  if (btn) {
    btn.click(); await sleep(900);
    // một số khối cũ không gắn trạng thái mở cho <dialog>: lấy thẳng <dialog> trong khung (kể cả khi đang đóng)
    const dlg = document.querySelector('dialog[open], dialog.modal-open') || wrap.querySelector('dialog');
    if (dlg) out.dialogHTML = dlg.outerHTML;
  }
  return JSON.stringify(out);
})()
`;

let ok = 0;
for (const t of list) {
  await c.navigate(`${base}/vi/mau-thiep/${t.slug}/demo?open=1&autoscroll=0`, 6500);
  const raw = await c.eval(CAPTURE);
  let o; try { o = JSON.parse(raw); } catch { o = { found: false, err: String(raw).slice(0, 200) }; }
  o.id = t.id; o.slug = t.slug; o.source = "local";
  o.assets = {
    giftbox: fs.existsSync(`public/images/giftbox/${t.id}.webp`),
    mini: fs.existsSync(`public/images/giftbox/mini/${t.id}.webp`),
    envelope: fs.existsSync(`public/images/envelope/${t.id}.webp`),
  };
  if (!o.found || !o.wrapHTML) { console.log(t.id.padEnd(28), "KHÔNG THẤY khối hộp quà", o.err || ""); continue; }
  fs.writeFileSync(`${RAW}/gift_${t.id}.json`, JSON.stringify(o));
  ok++;
  console.log(t.id.padEnd(28), o.kind, o.dialogHTML ? "có cửa sổ QR" : "THIẾU cửa sổ QR");
}
await c.close?.();
console.log(`\nĐã ghi ${ok}/${list.length} bản ghi (nguồn local)`);
