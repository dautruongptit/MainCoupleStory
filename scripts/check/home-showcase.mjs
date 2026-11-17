// So mục "Mẫu thiệp cưới online đẹp nhất" của trang chủ local với số đo thật (docs/survey/raw/home_coverflow_<vw>.json,
// thu ngày 17/11/2026 từ trang chủ gốc). So: kích thước section, tiêu đề, mô tả, nút mũi tên, chấm, nút "Xem tất cả",
// và hình chữ nhật + transform + opacity + z-index của 20 thẻ khi cùng một thẻ đang được chọn.
// Khổ 1920 / 1280 / 390 (bản 1280 thật chụp giữa lúc chuyển thẻ: chỉ so phần tĩnh).
// Dùng (dev server đang chạy): node scripts/check/home-showcase.mjs      → thoát mã 1 nếu lệch quá 1px
import fs from "node:fs";
import { ChromeController } from "../lib/cdp_helper.mjs";

const base = process.env.LOCAL_BASE || "http://localhost:8111";
// [khổ của tệp số đo thật, khổ trình duyệt local, có so các thẻ không] — cả hai bên đều có thanh cuộn 15px
const CASES = [[1920, 1920, true], [1280, 1280, false], [390, 390, true]];

const MEASURE = `(async (wantId) => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const img = document.querySelector("img.homepage-template-image");
  if (!img) return JSON.stringify({ err: "không thấy băng trượt" });
  const sec = img.closest("section");
  const idOf = (a) => ((a.querySelector("img").getAttribute("src") || "").split("/listing/")[1] || "").split(".")[0];
  if (wantId) {
    const arts = [...sec.querySelectorAll("article")];
    const i = arts.findIndex((a) => idOf(a) === wantId);
    const dots = [...sec.querySelectorAll('button[aria-label^="Go to slide"]')];
    if (i >= 0 && dots[i]) { dots[i].click(); await sleep(900); }
  }
  const cs = (e) => getComputedStyle(e);
  const rc = (e) => { const r = e.getBoundingClientRect(); const s = sec.getBoundingClientRect(); return [r.left - s.left, r.top - s.top, r.width, r.height].map((v) => Math.round(v * 10) / 10); };
  const arts = [...sec.querySelectorAll("article")].map((a) => { const c = cs(a); const im = a.querySelector("img"); return { id: idOf(a), style: a.getAttribute("style"), rect: rc(a), op: c.opacity, z: c.zIndex, imgPos: im.style.objectPosition }; });
  const others = [...sec.querySelectorAll("h1,h2,h3,p,button,a,span")].filter((e) => !e.closest("article")).map((e) => { const c = cs(e); return { tag: e.tagName, text: (e.textContent || "").trim().slice(0, 80), rect: rc(e), fs: c.fontSize, fw: c.fontWeight, color: c.color, bg: c.backgroundColor, lh: c.lineHeight, aria: e.getAttribute("aria-label") }; });
  const r = sec.getBoundingClientRect(); const sc = cs(sec);
  return JSON.stringify({ sec: { rect: [Math.round(r.width), Math.round(r.height)], bg: sc.backgroundColor }, arts, others });
})`;

const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
let bad = 0;
const near = (a, b, tol = 1) => Math.abs(a - b) <= tol;
for (const [vw, w, withCards] of CASES) {
  const realRaw = JSON.parse(fs.readFileSync(`docs/survey/raw/home_coverflow_${vw}.json`, "utf8"));
  const real = realRaw.m1 || realRaw;
  const activeId = real.arts.find((a) => /translateX\(0%\)/.test(a.style || ""))?.id;
  await c.setViewport({ width: w, height: 900 });
  await c.navigate(base + "/vi", 3500);
  const local = JSON.parse(await c.eval(`${MEASURE}(${JSON.stringify(withCards ? activeId : null)})`));
  if (local.err) { console.log(vw, "LỖI", local.err); bad++; continue; }
  const diffs = [];
  if (!near(local.sec.rect[0], real.sec.rect[0]) || !near(local.sec.rect[1], real.sec.rect[1])) diffs.push(`section ${real.sec.rect} → ${local.sec.rect}`);
  if (local.sec.bg !== real.sec.bg) diffs.push(`nền section ${real.sec.bg} → ${local.sec.bg}`);
  // phần tĩnh: ghép theo thứ tự (cùng số phần tử)
  if (local.others.length !== real.others.length) diffs.push(`số phần tử ngoài thẻ ${real.others.length} → ${local.others.length}`);
  real.others.forEach((o, i) => {
    const l = local.others[i]; if (!l) return;
    const name = `${o.tag} "${(o.aria || o.text).slice(0, 26)}"`;
    const isDot = /^Go to slide/.test(o.aria || "");
    // chấm: vị trí phụ thuộc thẻ đang chọn → chỉ so khi cùng thẻ được chọn
    const hidden = o.rect[2] === 0 && o.rect[3] === 0 && l.rect[2] === 0 && l.rect[3] === 0; // display:none ở cả hai bên (mũi tên trên mobile)
    if ((!isDot || withCards) && !hidden) { if (!o.rect.every((v, k) => near(v, l.rect[k]))) diffs.push(`${name} rect ${o.rect} → ${l.rect}`); }
    for (const k of ["fs", "fw", "lh", "color"]) if (o[k] !== l[k]) diffs.push(`${name} ${k} ${o[k]} → ${l[k]}`);
    if ((!isDot || withCards) && o.bg !== l.bg) diffs.push(`${name} bg ${o.bg} → ${l.bg}`);
  });
  let moving = 0;
  if (withCards) {
    const norm = (s) => (s || "").replace(/\s+/g, "").replace(/;$/, "").split(";").sort().join(";");
    real.arts.forEach((a) => {
      const l = local.arts.find((x) => x.id === a.id);
      if (!l) { diffs.push(`thiếu thẻ ${a.id}`); return; }
      if (norm(a.style) !== norm(l.style)) diffs.push(`thẻ ${a.id} style ${a.style} → ${l.style}`);
      // Bản đo thật có thể chụp giữa lúc băng trượt chuyển thẻ: thẻ nào z-index trình duyệt tính ra khác z-index ghi
      // trong style là đang chuyển động (hình chữ nhật chưa tới đích) → chỉ so style (đích), bỏ rect/opacity.
      const zInline = /z-index:\s*(\d+)/.exec(a.style || "")?.[1];
      if (zInline && zInline !== a.z) { moving++; return; }
      if (!a.rect.every((v, k) => near(v, l.rect[k]))) diffs.push(`thẻ ${a.id} rect ${a.rect} → ${l.rect}`);
      if (a.op !== l.op || a.z !== l.z) diffs.push(`thẻ ${a.id} opacity/z ${a.op}/${a.z} → ${l.op}/${l.z}`);
    });
    if (local.arts.length !== real.arts.length) diffs.push(`số thẻ ${real.arts.length} → ${local.arts.length}`);
    if (local.arts.map((a) => a.id).join() !== real.arts.map((a) => a.id).join()) diffs.push("thứ tự thẻ khác");
  }
  if (diffs.length) bad++;
  console.log(`${diffs.length ? "KHÁC " : "GIỐNG"} khổ ${vw}${withCards ? ` (thẻ đang chọn: ${activeId})` : " (chỉ phần tĩnh)"}: ${diffs.length} lệch${moving ? `; ${moving} thẻ trong bản đo thật đang chuyển động nên chỉ so style` : ""}`);
  for (const d of diffs.slice(0, 14)) console.log("    " + d.slice(0, 230));
}
await c.close?.();
process.exit(bad ? 1 : 0);
