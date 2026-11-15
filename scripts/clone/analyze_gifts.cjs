// Phân tích dữ liệu hộp mừng quà thu từ trang gốc (docs/survey/raw/gift_<id>.json): các tham số thay đổi theo mẫu.
// Chạy: node scripts/clone/analyze_gifts.cjs
const fs = require("fs");
const dir = "docs/survey/raw";
const files = fs.readdirSync(dir).filter((f) => /^gift_.*\.json$/.test(f));
const attr = (tag, name) => { const m = new RegExp("\\s" + name + '="([^"]*)"').exec(tag); return m ? m[1] : null; };
const styleObj = (s) => Object.fromEntries((s || "").split(";").map((x) => x.trim()).filter(Boolean).map((x) => { const i = x.indexOf(":"); return [x.slice(0, i).trim(), x.slice(i + 1).trim()]; }));
const rows = [];
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(`${dir}/${f}`, "utf8"));
  if (!o.found) { rows.push({ id: o.id, kind: "KHÔNG THẤY", assets: JSON.stringify(o.assets) }); continue; }
  const html = o.wrapHTML || "";
  const root = /^<[a-z]+[^>]*>/.exec(html)[0];
  const h2 = /<h[1-6][^>]*>/.exec(html);
  const btn = /<button[^>]*aria-label="Mở hộp mừng cưới"[^>]*>/.exec(html);
  const spark = /igb-sparkle[^>]*style="([^"]*)"/.exec(html) || /ienv-sparkle[^>]*style="([^"]*)"/.exec(html);
  rows.push({
    id: o.id, kind: o.kind, assets: ["giftbox", "mini", "envelope"].map((k) => (o.assets[k] ? "1" : "0")).join(""),
    rootCls: (attr(root, "class") || "").replace(/\s+/g, " ").slice(0, 70), rootSt: attr(root, "style"),
    h2: h2 ? (attr(h2[0], "class") || "").slice(0, 60) : null, h2St: h2 ? attr(h2[0], "style") : null,
    btnSt: btn ? attr(btn[0], "style") : null, spark: spark ? styleObj(spark[1]).color : null,
    boxBg: o.modalBox ? o.modalBox.bg : null, headBg: o.modalHead ? o.modalHead.bg : null, nImgs: (o.imgs || []).filter((s) => !/qr-png/.test(s)).length,
  });
}
console.log("bản ghi:", rows.length);
const group = (k) => { const m = new Map(); for (const r of rows) { const v = r[k]; (m.get(v) || m.set(v, []).get(v)).push(r.id); } return m; };
for (const k of ["kind", "assets", "rootCls", "rootSt", "h2", "btnSt"]) {
  console.log("\n== " + k);
  for (const [v, ids] of group(k)) console.log(`  [${ids.length}] ${v}  ←  ${ids.slice(0, 4).join(", ")}${ids.length > 4 ? "…" : ""}`);
}
fs.writeFileSync("docs/survey/gift-analysis.json", JSON.stringify(rows, null, 1));
