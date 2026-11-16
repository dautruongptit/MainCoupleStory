// So hình học khối Hộp Mừng Quà của bản local với số đo thật (docs/survey/raw/gift_<id>.json) ở khổ 390.
// Dùng: node scripts/check/gift-geometry.mjs [<id> ...] [--base http://localhost:5173]
// Ghi: docs/survey/gift-geometry.md
import fs from "node:fs";
import { ChromeController } from "../lib/cdp_helper.mjs";

const args = process.argv.slice(2);
const base = args.includes("--base") ? args[args.indexOf("--base") + 1] : process.env.LOCAL_BASE || "http://localhost:8111";
const tpl = fs.readFileSync(new URL("../../src/features/templates/data/templates.generated.ts", import.meta.url), "utf8");
const all = [...tpl.matchAll(/"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)"/g)].map((m) => ({ slug: m[1], id: m[2] }));
let want = args.filter((a) => !a.startsWith("--") && a !== base);
const list = all.filter((t) => (want.length ? want.includes(t.id) : fs.existsSync(`docs/survey/raw/gift_${t.id}.json`)));

const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
await c.setViewport({ width: 390, height: 844 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MEASURE = `
(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await sleep(120); }
  const btn = document.querySelector('button[aria-label="Mở hộp mừng cưới"]');
  if (!btn) return JSON.stringify({ none: true });
  const heads = [...document.querySelectorAll('h1,h2,h3,h4,p,span,div')].filter((e) => e.children.length === 0 && /^h[ộo]p qu[àa]\\s*m[ừu]ng$/i.test(e.textContent.replace(/\\u00a0/g, ' ').trim()));
  const h = heads[0];
  let wrap = btn.parentElement;
  if (h) { let a = btn; while (a && !a.contains(h)) a = a.parentElement; if (a) wrap = a; }
  const R = (e) => { const r = e.getBoundingClientRect(); return { x: +r.left.toFixed(1), y: +(r.top + scrollY).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
  const cs = (e) => { const s = getComputedStyle(e); return { color: s.color, fs: s.fontSize, fw: s.fontWeight, ff: s.fontFamily, ls: s.letterSpacing }; };
  return JSON.stringify({ wrap: R(wrap), head: h ? R(h) : null, headStyle: h ? cs(h) : null, btn: R(btn) });
})()
`;

const rows = [];
for (const t of list) {
  let real;
  try { real = JSON.parse(fs.readFileSync(`docs/survey/raw/gift_${t.id}.json`, "utf8")); } catch { continue; }
  if (!real.found) continue;
  await c.navigate(`${base}/vi/mau-thiep/${t.slug}/demo?open=1&autoscroll=0`, 6500);
  const raw = await c.eval(MEASURE);
  let m; try { m = JSON.parse(raw); } catch { m = { err: String(raw) }; }
  if (!m || m.none || m.err) { rows.push({ id: t.id, note: "KHÔNG THẤY khối hộp quà ở local" }); console.log(t.id.padEnd(28), "KHÔNG THẤY"); continue; }
  const d = [];
  const tol = 1.5;
  const rb = real.wrapRect, rh = real.headRect, rbtn = real.wrapStyle ? null : null;
  if (Math.abs(m.wrap.h - rb.h) > tol) d.push(`cao khung ${m.wrap.h}→${rb.h}`);
  if (Math.abs(m.wrap.w - rb.w) > tol) d.push(`rộng khung ${m.wrap.w}→${rb.w}`);
  if (rh && m.head) {
    const dyLocal = +(m.head.y - m.wrap.y).toFixed(1), dyReal = +(rh.y - rb.y).toFixed(1);
    if (Math.abs(dyLocal - dyReal) > tol) d.push(`tiêu đề lệch dọc ${dyLocal}→${dyReal}`);
    if (Math.abs(m.head.h - rh.h) > tol) d.push(`cao tiêu đề ${m.head.h}→${rh.h}`);
  }
  const hs = real.headStyle, ls = m.headStyle;
  if (hs && ls) for (const k of ["color", "fs", "fw", "ls"]) { const rk = { color: "color", fs: "fs", fw: "fw", ls: "ls" }[k]; if (String(ls[k]) !== String(hs[rk])) d.push(`${k} ${ls[k]}→${hs[rk]}`); }
  rows.push({ id: t.id, note: d.join("; ") });
  console.log(t.id.padEnd(28), d.length ? d.join("; ") : "khớp");
}
await c.close?.();
const bad = rows.filter((r) => r.note);
fs.writeFileSync("docs/survey/gift-geometry.md", ["# Hộp Mừng Quà — local so với thật (390px)", "", `${rows.length} mẫu · lệch ${bad.length}`, "", "| Mẫu | Kết quả |", "|---|---|", ...rows.map((r) => `| ${r.id} | ${r.note || "khớp"} |`)].join("\n") + "\n");
console.log(`\nTổng ${rows.length} mẫu, lệch ${bad.length} → docs/survey/gift-geometry.md`);
