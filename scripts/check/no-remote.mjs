// Kiểm tra bản local KHÔNG tải tài nguyên nào từ trang gốc: mở thiệp demo từng mẫu (đã mở, cuộn hết trang) và các trang app,
// đọc danh sách tài nguyên trình duyệt đã tải (Performance API), báo mọi URL thuộc tên miền trang gốc và mọi ảnh hỏng.
// Dùng (dev server đang chạy; LOCAL_BASE mặc định http://localhost:8111):
//   node scripts/check/no-remote.mjs [<id> ...]      (không ghi id = cả 92 mẫu + trang app); thoát mã 1 nếu có vi phạm
import fs from "node:fs";
import { ChromeController } from "../lib/cdp_helper.mjs";

const base = process.env.LOCAL_BASE || "http://localhost:8111";
const HOST = ["chungdoi", "com"].join(".");
const rows = fs.readFileSync("src/features/templates/data/templates.generated.ts", "utf8");
const all = [...rows.matchAll(/"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)"/g)].map((m) => ({ slug: m[1], id: m[2] }));
const want = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const pagesOnly = process.argv.includes("--pages"); // chỉ các trang app (nhanh)
const APP_PAGES = [["(trang chủ)", "/vi"], ["(kho mẫu)", "/vi/mau-thiep"], ["(bảng giá)", "/vi/bang-gia"], ["(dashboard)", "/dashboard"]];
const targets = [
  ...(pagesOnly ? [] : all.filter((t) => !want.length || want.includes(t.id)).map((t) => [t.id, `/vi/mau-thiep/${t.slug}/demo?open=1&autoscroll=0`])),
  ...(want.length && !pagesOnly ? [] : APP_PAGES),
];

const PROBE = `(async () => {
  // cuộn hết trang để ảnh lazy được tải
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
  await new Promise((r) => setTimeout(r, 1200));
  // (a) tài nguyên trình duyệt đã ghi nhận — bộ đệm Performance chỉ giữ 250 mục đầu nên phải quét thêm DOM
  const res = performance.getEntriesByType("resource").map((e) => e.name);
  // (b) mọi URL tài nguyên trong DOM: src/srcset/poster của ảnh-âm thanh-video-iframe-script, href của <link>, ảnh nền CSS
  const dom = [];
  for (const e of document.querySelectorAll("img,audio,video,source,iframe,script,link,embed,object")) {
    for (const a of ["src", "srcset", "poster", "data", e.tagName === "LINK" ? "href" : ""]) { const v = a && e.getAttribute(a); if (v) dom.push(v); }
    if (e.currentSrc) dom.push(e.currentSrc);
  }
  for (const e of document.querySelectorAll("*")) { const bg = getComputedStyle(e).backgroundImage; if (bg && bg !== "none") dom.push(bg); }
  const remote = [...new Set([...res, ...dom].filter((u) => u.includes("${HOST}")))];
  const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc).map((i) => i.currentSrc.replace(location.origin, ""));
  return JSON.stringify({ remote, broken: [...new Set(broken)], n: res.length });
})()`;

const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
await c.setViewport({ width: 390, height: 844 });
let bad = 0;
for (const [name, url] of targets) {
  await c.navigate(base + url, 4500);
  let r; try { r = JSON.parse(await c.eval(PROBE)); } catch { r = null; }
  if (!r) { bad++; console.log(name.padEnd(28), "LỖI đọc trang"); continue; }
  const ok = !r.remote.length && !r.broken.length;
  if (!ok) bad++;
  console.log(name.padEnd(28), ok ? `sạch (${r.n} tài nguyên)` : `VI PHẠM: trang gốc ${r.remote.length}, ảnh hỏng ${r.broken.length}`);
  for (const u of [...r.remote.slice(0, 3), ...r.broken.slice(0, 3)]) console.log("      " + u.slice(0, 140));
}
await c.close?.();
console.log(`\n${targets.length} trang, ${bad} trang có vi phạm`);
process.exit(bad ? 1 : 0);
