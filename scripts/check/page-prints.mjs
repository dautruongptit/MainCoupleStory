// "Dấu vân tay" bố cục + kiểu của các trang app (không phải thiệp): dùng trước/sau khi đổi CSS dùng chung.
// Mỗi trang × khổ: mọi phần tử nhìn thấy → hình chữ nhật + màu chữ/nền + cỡ chữ + độ đậm + display.
// Dùng (dev server đang chạy; LOCAL_BASE mặc định http://localhost:8111):
//   node scripts/check/page-prints.mjs --save <dir>      chụp mốc
//   node scripts/check/page-prints.mjs --compare <dir>   chụp lại, so với mốc (thoát mã 1 nếu khác)
import fs from "node:fs";
import path from "node:path";
import { ChromeController } from "../lib/cdp_helper.mjs";

const args = process.argv.slice(2);
const mode = args.includes("--save") ? "save" : args.includes("--compare") ? "compare" : null;
if (!mode) { console.error("Cần --save <dir> hoặc --compare <dir>"); process.exit(2); }
const dir = args[args.indexOf("--" + mode) + 1];
const base = process.env.LOCAL_BASE || "http://localhost:8111";
fs.mkdirSync(dir, { recursive: true });

// [tên, đường dẫn, bước chuẩn bị chạy trong trang (tùy chọn)]
const PAGES = [
  ["home", "/vi"],
  ["templates", "/vi/mau-thiep"],
  ["template-modal", "/vi/mau-thiep", `document.querySelector('.tpl-tile')?.click()`],
  ["pricing", "/vi/bang-gia"],
  ["dashboard-empty", "/dashboard"],
  ["guests", "/guests"],
  ["account", "/account"],
  ["cover-brown", "/vi/mau-thiep/minimalism-nau/demo?autoscroll=0"],
  ["cover-longphung", "/vi/mau-thiep/long-phung-v4-do/demo?autoscroll=0"],
  ["cover-hoamoc", "/vi/mau-thiep/hoa-moc-xanh/demo?autoscroll=0"],
  ["editor", "/invitations/create/minimalism_brown"],
  ["dashboard-draft", "/dashboard"], // sau khi editor đã tạo một nháp
  ["login-modal", "/dashboard", `[...document.querySelectorAll('button')].find(b=>/Đăng Nhập/.test(b.textContent))?.click()`],
];
const WIDTHS = [1280, 390];

const PRINT = `(() => {
  const out = [];
  for (const e of document.body.querySelectorAll('*')) {
    const r = e.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    const cs = getComputedStyle(e);
    if (cs.visibility === 'hidden') continue;
    // bỏ phần tử đang chuyển động (chính nó hoặc tổ tiên có animation): hạt rơi, con dấu đập, vệt sáng nút
    let moving = false;
    for (let a = e; a && a !== document.body; a = a.parentElement) { if (getComputedStyle(a).animationName !== 'none') { moving = true; break; } }
    if (moving) continue;
    const cls = (e.getAttribute('class') || '').toString();
    if (/igb-|ienv-|particle|ambient|confetti|music-floating/.test(cls) || e.closest('[class*="ambient"],[class*="particle"]')) continue; // phần tử chuyển động
    // băng trượt mẫu ở trang chủ tự chuyển thẻ mỗi 4 giây (thẻ + chấm đổi theo thời gian) → so riêng bằng home-showcase.mjs
    if (e.closest('article[style*="translateZ"]') || /^Go to slide/.test(e.getAttribute('aria-label') || '')) continue;
    if (e.tagName === 'svg' && e.closest('[style*="ambient-fall"]')) continue;
    if (/ambient-fall|seal-pulse/.test(e.getAttribute('style') || '') || e.closest('[style*="ambient-fall"]')) continue;
    out.push([e.tagName.toLowerCase(), cls.slice(0, 50), Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height), cs.color, cs.backgroundColor, cs.fontSize, cs.fontWeight, cs.display, cs.borderTopWidth, cs.borderRadius].join('|'));
  }
  return JSON.stringify(out);
})()`;

const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let bad = 0;
for (const w of WIDTHS) {
  await c.setViewport({ width: w, height: w === 390 ? 844 : 900 });
  await c.navigate(base + "/vi", 1500);
  await c.eval("localStorage.clear(); 1");
  for (const [name, url, prep] of PAGES) {
    await c.navigate(base + url, 3500);
    if (prep) { await c.eval(`(()=>{${prep};return 1})()`); await sleep(1200); }
    const raw = await c.eval(PRINT);
    const file = path.join(dir, `${name}_${w}.json`);
    let recs; try { recs = JSON.parse(raw); } catch { recs = []; }
    if (mode === "save") { fs.writeFileSync(file, JSON.stringify(recs)); console.log(`lưu ${name} ${w}: ${recs.length} phần tử`); continue; }
    const old = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : [];
    const a = new Map(); old.forEach((x) => a.set(x, (a.get(x) || 0) + 1));
    const onlyNew = []; for (const x of recs) { const n = a.get(x) || 0; if (n) a.set(x, n - 1); else onlyNew.push(x); }
    let onlyOld = [...a].flatMap(([x, n]) => Array(Math.max(n, 0)).fill(x));
    // Dung sai 1px (tiêu chí chung của dự án): ghép phần tử cũ/mới giống hệt nhau trừ hình chữ nhật lệch ≤ 1px
    // (vd dòng "ngày tạo" của thiệp nháp đổi theo ngày chạy nên chữ rộng/hẹp hơn 1px).
    const near = (p, q) => { const A = p.split("|"), B = q.split("|"); return A.length === B.length && A.every((v, i) => (i >= 2 && i <= 5 ? Math.abs(+v - +B[i]) <= 1 : v === B[i])); };
    for (let i = onlyNew.length - 1; i >= 0; i--) { const j = onlyOld.findIndex((o) => near(o, onlyNew[i])); if (j >= 0) { onlyOld.splice(j, 1); onlyNew.splice(i, 1); } }
    const ok = onlyNew.length === 0 && onlyOld.length === 0;
    if (!ok) bad++;
    console.log(`${ok ? "GIỐNG" : "KHÁC "} ${name} ${w}: ${old.length}→${recs.length} phần tử${ok ? "" : `, đổi ${onlyNew.length}/${onlyOld.length}`}`);
    if (!ok) { onlyOld.slice(0, 3).forEach((x) => console.log("    − " + x.slice(0, 150))); onlyNew.slice(0, 3).forEach((x) => console.log("    + " + x.slice(0, 150))); }
  }
}
await c.close?.();
console.log(mode === "save" ? "\nĐã chụp mốc trang" : `\n${bad} trang khác mốc`);
process.exit(bad ? 1 : 0);
