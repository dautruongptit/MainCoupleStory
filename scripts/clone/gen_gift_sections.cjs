// Sinh src/features/invitation/shell/specs/<id>/gift.json từ dữ liệu hộp mừng quà đo thật của từng mẫu
// (docs/survey/raw/gift_<id>.json, thu bằng scripts/survey/gift_crawl.js). Mỗi mẫu một "spec" gồm:
//   kind     kiểu mặc định thật của mẫu: "3d-box" | "envelope"
//   rootCls/rootStyle  khung ngoài khối; headHtml  tiêu đề (chứa {{TITLE}}); widgetHtml  nút hộp quà/phong bì mặc định
//   dlgBefore/dlgItem/dlgAfter  cửa sổ QR (item lặp theo từng tài khoản; các chỗ động là {{...}})
//   ink / accent  màu chữ và màu lấp lánh (dùng khi người dùng chọn kiểu khác mặc định)
// Chạy: node scripts/clone/gen_gift_sections.cjs
const fs = require("fs");
const RAW = "docs/survey/raw";
const SPECS_DIR = "src/features/invitation/shell/specs";

// Chỉ làm sạch thuộc tính class: ở trang gốc thuộc tính font bị đổ nhầm vào class (không có tác dụng với Tailwind); style giữ nguyên.
const clean = (h) => h.replace(/ class="([^"]*)"/g, (m, c) => ' class="' + c.replace(/&quot;[^&]*&quot;, ChungDoiIndic, serif ?/g, "").replace(/\s+/g, " ").trim() + '"');
const attr = (tag, name) => { const m = new RegExp("\\s" + name + '="([^"]*)"').exec(tag); return m ? m[1] : ""; };
const unesc = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, "&");

const files = fs.readdirSync(RAW).filter((f) => /^gift_.*\.json$/.test(f)).sort();
const specs = {};
const problems = [];
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(`${RAW}/${f}`, "utf8"));
  if (!o.found || !o.wrapHTML) { problems.push(o.id + ": không thấy khối hộp quà"); continue; }
  const html = clean(o.wrapHTML);
  const rootOpen = /^<div[^>]*>/.exec(html)[0];
  const btnStart = html.indexOf('<button type="button" aria-label="Mở hộp mừng cưới"');
  const dlgStart = html.indexOf("<dialog");
  if (btnStart < 0) { problems.push(o.id + ": không có nút hộp quà (kind=" + o.kind + ")"); continue; }
  const btnEnd = html.indexOf("</button>", btnStart) + "</button>".length;
  let headHtml = html.slice(rootOpen.length, btnStart);
  const h2m = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/.exec(headHtml);
  const title = h2m ? h2m[1].replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ") : "Hộp Quà Mừng";
  // chỉ cho phép d.giftTitle ghi đè khi tiêu đề thật đúng là "Hộp Quà Mừng" (một số mẫu có tiêu đề song ngữ cố định)
  const plainTitle = title.split(String.fromCharCode(160)).join(" ").trim().toLowerCase();
  const titleEditable = plainTitle === "hộp quà mừng";
  if (h2m && titleEditable) headHtml = headHtml.replace(h2m[1], h2m[1].replace(/(<span[^>]*>)[\s\S]*?(<\/span>)/, "$1{{TITLE}}$2"));
  const widgetHtml = html.slice(btnStart, btnEnd);
  const kind = /igb-/.test(widgetHtml) ? "3d-box" : /ienv-/.test(widgetHtml) ? "envelope" : "other";
  const spark = /igb-sparkle[^>]*style="([^"]*)"/.exec(widgetHtml) || /ienv-sparkle[^>]*style="([^"]*)"/.exec(widgetHtml);
  const sparkColor = spark ? (/color:\s*([^;]+);/.exec(spark[1]) || [])[1] : "";
  const hintColor = (/<p[^>]*(?:igb-hint|ienv-hint)[^>]*style="[^"]*color:\s*([^;"]+)/.exec(widgetHtml) || [])[1] || "";
  const headColor = (/<h[1-6][^>]*style="[^"]*color:\s*([^;"]+)/.exec(headHtml) || [])[1] || "";

  // ---- cửa sổ QR ----
  let dlg = { dlgBefore: "", dlgItem: "", dlgAfter: "", dlgBoxBg: "", dlgHeadBg: "" };
  if (o.dialogHTML) {
    const bx = /class="modal-box[^"]*"[^>]*style="[^"]*background-color:s*([^;"]+)/.exec(o.dialogHTML);
    const hd = /class="relative px-6 pt-6 pb-4 text-center"[^>]*style="[^"]*background-color:s*([^;"]+)/.exec(o.dialogHTML);
    dlg.dlgBoxBg = bx ? bx[1].trim() : ""; dlg.dlgHeadBg = hd ? hd[1].trim() : "";
  }
  if (dlgStart >= 0 && o.dialogHTML) {
    let dh = clean(o.dialogHTML);
    const openTag = /^<dialog[^>]*>/.exec(dh)[0];
    dh = dh.replace(openTag, '<dialog class="modal modal-bottom sm:modal-middle{{OPEN_CLS}}"{{OPEN_ATTR}}>');
    // nút đóng (X) và nền đóng
    dh = dh.replace(/<button type="button" class="btn btn-sm btn-circle/, '<button type="button" data-gift-close="1" class="btn btn-sm btn-circle');
    dh = dh.replace(/<form method="dialog" class="modal-backdrop"><button[^>]*>close<\/button><\/form>/, '<div class="modal-backdrop" data-gift-close="1"><button type="button">close</button></div>');
    // nền đóng dạng <div> (bản local React) cũng đóng được
    dh = dh.replace('<div class="modal-backdrop">', '<div class="modal-backdrop" data-gift-close="1">');
    // tiêu đề trong cửa sổ
    dh = dh.replace(/(<h2[^>]*>)[^<]*(<\/h2>)/, "$1{{TITLE}}$2");
    // khung chứa các tài khoản: div có class "flex flex-col items-center gap-4 sm:flex-row" (con trực tiếp là từng tài khoản)
    const cm = /<div class="flex flex-col items-center gap-4 sm:flex-row[^"]*"[^>]*>/.exec(dh);
    if (!cm) { problems.push(o.id + ": cửa sổ QR không có khung tài khoản"); }
    else {
      const open = cm.index, innerStart = open + cm[0].length;
      // tìm thẻ </div> đóng ứng với một thẻ <div> đã mở (from = ngay sau thẻ mở)
      const matchClose = (str, from) => {
        let depth = 1;
        const re = /<div\b|<\/div>/g;
        re.lastIndex = from;
        let m;
        while ((m = re.exec(str))) { if (m[0] === "</div>") { depth--; if (depth === 0) return m.index; } else depth++; }
        return -1;
      };
      const closeIdx = matchClose(dh, innerStart);
      const inner = dh.slice(innerStart, closeIdx);
      // con trực tiếp của khung: tách theo độ sâu
      const kids = []; let pos = 0;
      while (pos < inner.length) {
        const st = inner.indexOf("<div", pos); if (st < 0) break;
        const openEnd = inner.indexOf(">", st) + 1;
        const en = matchClose(inner, openEnd); const end = en + "</div>".length;
        kids.push(inner.slice(st, end)); pos = end;
      }
      const item = kids[0] || "";
      const h3 = /<h3[^>]*>([^<]*)<\/h3>/.exec(item);
      const ps = [...item.matchAll(/<p class="[^"]*"[^>]*>([^<]*)<\/p>/g)].map((m) => m[1]);
      const img = /<img alt="([^"]*)" class="[^"]*" src="([^"]*)"/.exec(item);
      let tpl = item;
      if (h3) tpl = tpl.replace(">" + h3[1] + "</h3>", ">{{LABEL}} - {{NAME}}</h3>");
      if (img) { tpl = tpl.replace("alt=\"" + img[1] + "\"", "alt=\"QR - {{LABEL}} - {{NAME}}\"").replace("src=\"" + img[2] + "\"", "src=\"{{QR}}\""); }
      if (ps[0] !== undefined) tpl = tpl.replace(">" + ps[0] + "</p>", ">{{BANK}}</p>");
      if (ps[1] !== undefined) tpl = tpl.replace(">" + ps[1] + "</p>", ">{{NUMBER}}</p>");
      if (ps[2] !== undefined) tpl = tpl.replace(">" + ps[2] + "</p>", ">{{NAME}}</p>");
      tpl = tpl.replace(/<button type="button" class="(mt-[^"]*)"/, "<button type=\"button\" data-gift-saveqr=\"{{ID}}\" class=\"$1\"");
      dlg = { ...dlg, dlgBefore: dh.slice(0, innerStart), dlgItem: tpl, dlgAfter: dh.slice(closeIdx) };
    }
  }

  specs[o.id] = {
    source: o.source || "real",
    titleEditable, kind, title, rootCls: unesc(attr(rootOpen, "class")), rootStyle: unesc(attr(rootOpen, "style")),
    headHtml, widgetHtml, ink: hintColor || headColor, accent: sparkColor, ...dlg,
  };
}

// Mỗi mẫu một tệp specs/<id>/gift.json (kiểu GiftSpec ở blocks/shared/giftSpecs.ts). Khóa `assets` (ảnh hộp/phong bì thật)
// do scripts/clone/gift_assets.mjs ghi → giữ nguyên khi sinh lại. Sau đó chạy `npm run gen:specs` để cập nhật chỉ mục.
const path = require("path");
let written = 0;
for (const [id, spec] of Object.entries(specs)) {
  const dir = path.join(SPECS_DIR, id);
  if (!fs.existsSync(dir)) { problems.push(`${id}: có dữ liệu hộp quà nhưng chưa có thư mục spec`); continue; }
  const f = path.join(dir, "gift.json");
  const prev = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : {};
  // `legacy`: giá trị viết tay chép từ bảng cũ (hoa bìa bay, hộp nhỏ, ảnh hộp dự phòng) — cũng giữ nguyên
  const next = JSON.stringify({ ...spec, ...(prev.legacy ? { legacy: prev.legacy } : {}), ...(prev.assets ? { assets: prev.assets } : {}) }, null, 1) + "\n";
  if (!fs.existsSync(f) || fs.readFileSync(f, "utf8").split("\r\n").join("\n") !== next) { fs.writeFileSync(f, next); written++; }
}
console.log("spec:", Object.keys(specs).length, "| gift.json ghi mới/đổi:", written, "| vấn đề:", problems.length);
for (const p of problems) console.log("  -", p);
