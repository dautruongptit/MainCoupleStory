// Xuất danh sách toàn bộ mẫu + trạng thái clone từng màn hình ra Excel: docs/exports/danh-sach-mau-clone.xlsx
// Cần exceljs + sharp (không nằm trong package.json): npm i --no-save exceljs sharp
//   hoặc đặt XLSX_TOOLS=<thư mục có node_modules/exceljs & sharp>.
// Chạy: node scripts/clone/export_xlsx.mjs   (nên chạy `node scripts/clone/registry.mjs` trước)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const ROOT = process.cwd();
const J = (...p) => path.join(ROOT, ...p);
const req = (m) => {
  for (const base of [ROOT, process.env.XLSX_TOOLS].filter(Boolean)) {
    try { return createRequire(path.join(base, "x.js"))(m); } catch { /* thử nơi khác */ }
  }
  throw new Error(`Thiếu module ${m}: chạy "npm i --no-save exceljs sharp" hoặc đặt XLSX_TOOLS`);
};
const ExcelJS = req("exceljs");
const sharp = req("sharp");

const read = (p) => { try { return fs.readFileSync(p, "utf8"); } catch { return ""; } };
const readJson = (p) => { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return null; } };
const SURVEY = J("docs/survey");
const BLOCKS = J("src/features/invitation/shell/blocks");

// ---------- nguồn dữ liệu
const tplSrc = read(J("src/features/templates/data/templates.ts"));
const templates = tplSrc.split("\n").filter((l) => l.startsWith('  {"slug"')).map((l) => JSON.parse(l.trim().replace(/,$/, "")));
const registry = readJson(J("docs/clone-registry.json"));
const regById = Object.fromEntries((registry?.templates ?? []).map((t) => [t.id, t]));
const coverSrc = read(J("src/features/invitation/components/covers/coverConfigs.ts"));
const coverIdx = read(J("src/features/invitation/components/covers/index.ts"));
const edSrc = read(J("src/features/editor/config/editorSections.ts"));
// dữ liệu bìa (ngày, lời mời) của mẫu nằm trong specs/<id>/demo.json (trước đây: referenceCovers.ts)
const hasCoverData = (id) => { try { const d = JSON.parse(fs.readFileSync(J(`src/features/invitation/shell/specs/${id}/demo.json`), "utf8")); return "date" in d || "envelopeInviteMessage" in d; } catch { return false; } };
const particle88 = readJson(J("docs/survey/particle-colors-88.json")) ?? {};
const catalog88 = new Set((readJson(J("docs/survey/catalog-88.json")) ?? []).map((x) => x.id));
const surveyFiles = fs.readdirSync(SURVEY);

const setOf = (name) => {
  const m = new RegExp(`const ${name} = new Set\\(\\[([\\s\\S]*?)\\]\\)`).exec(edSrc);
  return new Set(m ? [...m[1].matchAll(/"([a-z0-9_]+)"/g)].map((x) => x[1]) : []);
};
const HERO = setOf("HAS_HERO_PHOTO"), COUPLE = setOf("HAS_COUPLE_HERO"), INTRO = setOf("HAS_INTRO_LINE"), ALBUM_HERO = setOf("ALBUM_AFTER_HERO");

const coverEntry = (id) => {
  const i = coverSrc.indexOf(`\n  "${id}": {`);
  if (i < 0) return null;
  return coverSrc.slice(i, coverSrc.indexOf("\n  },", i));
};
const field = (txt, k) => { const m = new RegExp(`\\b${k}:\\s*("(?:[^"\\\\]|\\\\.)*"|true|false)`).exec(txt); return m ? m[1].replace(/^"|"$/g, "") : null; };

const diffNums = (id, state, w) => {
  const t = read(path.join(SURVEY, `diff-${id}-${state}-${w}.md`));
  const m = /Lệch hình học: (\d+); lệch kiểu: (\d+)/.exec(t);
  return m ? { geo: +m[1], style: +m[2] } : null;
};
const diffSummary = (id, states, widths) => {
  const parts = [], bad = [];
  let any = false;
  for (const s of states) for (const w of widths) {
    const d = diffNums(id, s, w);
    if (!d) continue;
    any = true;
    parts.push(`${s}@${w}: ${d.geo}/${d.style}`);
    if (d.geo || d.style) bad.push(`${s}@${w}`);
  }
  return { any, text: parts.join("; "), ok: any && !bad.length, bad };
};

const editorSync = (id) => {
  const t = read(path.join(SURVEY, `editor-sync-${id}.md`));
  const m = /(\d+) đạt, (\d+) lỗi, (\d+) bỏ qua/.exec(t);
  const d = /Bản local, ([0-9-]+)/.exec(t);
  return m ? { pass: +m[1], fail: +m[2], skip: +m[3], date: d?.[1] ?? "" } : null;
};
const openSeq = (id) => {
  const t = read(path.join(SURVEY, `open-seq-compare-${id}.md`));
  if (!t) return null;
  const rows = t.split("\n").filter((l) => /^\| [a-z]/i.test(l) && !l.startsWith("| animation") && !l.startsWith("|---"));
  const res = rows.map((r) => r.split("|").map((c) => c.trim())[4]);
  const ok = res.filter((x) => x === "khớp").length;
  return { total: rows.length, ok, extra: res.filter((x) => /thừa/.test(x)).length, miss: res.filter((x) => /thiếu|lệch/.test(x)).length };
};

// ---------- phân tích khối của họ
const TOGGLES = ["familyOn", "announceOn", "albumOn", "partyOn", "dressOn", "schedOn", "guestOn", "giftOn", "thanksOn", "rsvpOn"];
const blockInfo = (family, capBlocks) => {
  const dir = family && fs.existsSync(path.join(BLOCKS, family)) ? path.join(BLOCKS, family) : null;
  const files = dir
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".tsx")).map((f) => path.join(dir, f))
    : fs.readdirSync(BLOCKS).filter((f) => f.endsWith(".tsx")).map((f) => path.join(BLOCKS, f));
  const txt = files.map((f) => ({ f, t: read(f) }));
  const all = txt.map((x) => x.t).join("\n");
  const toggles = TOGGLES.filter((k) => new RegExp(`d\\.${k}\\b`).test(all));
  const hardcodedPhotos = txt.filter((x) => /assets\.chungdoi\.com\/photo-library/.test(x.t)).map((x) => path.basename(x.f, ".tsx"));
  const nameBound = /\{(n1|n2|full1|full2|gName|bName)\}|d\.(groomFull|brideFull|groomNick|brideNick)|\bn1\b/.test(all);
  const albumBound = /albumPhotos|d\.photos/.test(all);
  let lightbox;
  const lb = txt.find((x) => path.basename(x.f) === "Lightbox.tsx");
  const idx = dir ? read(path.join(dir, "index.ts")) : "";
  if (!dir) lightbox = "dùng chung (động)";
  else if (lb && /assets\.chungdoi\.com\/photo-library/.test(lb.t)) lightbox = "riêng, ghi cứng ảnh demo";
  else if (lb || /Lightbox/.test(idx)) lightbox = /blocks\/Lightbox"/.test(idx) ? "dùng chung (động)" : "riêng";
  else lightbox = capBlocks?.includes("Lightbox") ? "THIẾU (khai báo nhưng không có khối)" : "không có";
  return { dir: dir ? path.relative(ROOT, dir).split(path.sep).join("/") : "blocks/*.tsx (khối chung)", shared: !dir, nFiles: files.length, toggles, hardcodedPhotos, nameBound, albumBound, lightbox };
};

// ---------- thumbnail
const thumb = async (t) => {
  const p = J("public/images/template-previews/vi", t.img);
  if (!fs.existsSync(p)) return null;
  try {
    const meta = await sharp(p).metadata();
    const h = Math.min(meta.height ?? 640, 640);
    return await sharp(p).extract({ left: 0, top: 0, width: meta.width, height: h }).resize({ width: 96 }).jpeg({ quality: 72 }).toBuffer();
  } catch { return null; }
};

// ---------- gom dữ liệu từng mẫu
const rows = [];
for (const t of templates) {
  const reg = regById[t.id];
  const spec = reg && reg.status !== "chưa clone";
  const specDir = J("src/features/invitation/shell/specs", t.id);
  const caps = readJson(path.join(specDir, "capabilities.json"));
  const theme = readJson(path.join(specDir, "theme.json"));
  const family = caps?.family ?? null;
  const b = blockInfo(family, caps?.blocks);
  const placeholder = !theme || (theme.colors?.ink === "rgb(0, 0, 0)" && theme.colors?.paper === "#ffffff");
  const cover = coverEntry(t.id);
  const compM = new RegExp(`"${t.id}":\\s*([A-Za-z0-9]+)`).exec(coverIdx);
  const coverComp = compM ? compM[1] : "BaroquePorcelainCover (mặc định)";
  const bespoke = compM && /^(HoaTinhDoCover|HoangKimLamCover|ChibiRedCover|BachSuDoCover)$/.test(compM[1]);
  const pm = particle88[t.id];

  const open = diffSummary(t.id, ["open", "openfull"], [390, 768, 1280, 1440]);
  const cdiff = diffSummary(t.id, ["cover"], [390, 768, 1440]);
  const gift = diffSummary(t.id, ["gift"], [390]);
  const rsvp = diffSummary(t.id, ["rsvp"], [390]);
  const ed = diffSummary(t.id, ["editor"], [390, 768, 1280]);
  const sync = editorSync(t.id);
  const seq = openSeq(t.id);

  // ---- 1. Màn hình demo (thiệp đã mở)
  let demoLevel, demoNote;
  if (!spec) { demoLevel = "đỏ"; demoNote = "Chưa có spec: chạy đường Preview.tsx cũ"; }
  else if (placeholder) { demoLevel = "đỏ"; demoNote = "Có khối nhưng theme.json còn màu mặc định (chưa đo màu thật)"; }
  else if (open.ok) { demoLevel = "xanh"; demoNote = `Đã đo diff 0 lệch (${open.text})`; }
  else if (open.any) { demoLevel = "vàng"; demoNote = `Đã dựng, còn lệch so với gốc (${open.text})`; }
  else { demoLevel = "vàng"; demoNote = "Đã dựng theo gốc (màu/ảnh đo thật), chưa chạy diff hình học"; }
  if (spec && b.hardcodedPhotos.length) demoNote += `; ảnh demo ghi cứng trong khối: ${b.hardcodedPhotos.join(", ")}`;
  if (spec && !b.nameBound) demoNote += "; CẢNH BÁO: không thấy khối đọc tên cô dâu/chú rể từ dữ liệu";

  // ---- 2. Hiệu ứng màn hình demo (bìa, hạt rơi, nền)
  let fxLevel, fxNote;
  if (!cover && !bespoke) { fxLevel = "đỏ"; fxNote = "Không có cấu hình bìa riêng → dùng bìa mặc định"; }
  else if (cdiff.ok) { fxLevel = "xanh"; fxNote = `Bìa diff 0 lệch (${cdiff.text})`; }
  else { fxLevel = "vàng"; fxNote = cover ? "Có cấu hình bìa riêng, chưa chạy diff bìa" : "Bìa riêng bằng component, chưa diff"; }
  if (cdiff.any && !cdiff.ok) fxNote = `Bìa còn lệch (${cdiff.text})`;

  // ---- 3. Hiệu ứng nút bấm (Mở thiệp)
  const openFx = cover ? field(cover, "openFx") : null;
  const fly = cover ? field(cover, "flyCorners") : null;
  const fxName = openFx ?? "mặc định (hạt tuôn từ con dấu + 2 vòng sóng)";
  let btnLevel, btnNote;
  if (!cover && !bespoke) { btnLevel = "đỏ"; btnNote = `Engine mặc định, chưa có cấu hình mở thiệp riêng`; }
  else if (seq && seq.total && seq.ok === seq.total - seq.extra) { btnLevel = "xanh"; btnNote = `Đã so timeline: ${seq.ok}/${seq.total} animation khớp`; }
  else if (seq) { btnLevel = "vàng"; btnNote = `Đã so timeline: ${seq.ok}/${seq.total} khớp, ${seq.miss} lệch/thiếu`; }
  else { btnLevel = "vàng"; btnNote = "Dùng engine mở thiệp chung, chưa so timeline với gốc"; }

  // ---- 4. Màn hình chỉnh sửa
  const measuredEd = catalog88.has(t.id) || !!caps?.editor?.sections;
  const flags = {
    heroPhoto: caps?.editor?.cards?.hero ?? HERO.has(t.id),
    coupleHero: caps?.editor?.cards?.coupleHero ?? COUPLE.has(t.id),
    introLine: caps?.editor?.cards?.introLine ?? INTRO.has(t.id),
    albumAfter: caps?.editor?.albumCardAfter ?? (ALBUM_HERO.has(t.id) ? "hero" : "ceremony"),
  };
  let edLevel, edNote;
  if (ed.ok || (!ed.any && sync && !sync.fail && reg?.verified?.editor)) { edLevel = "xanh"; edNote = ed.any ? `Editor diff 0 lệch (${ed.text})` : `editor-sync ${sync.pass} đạt / ${sync.fail} lỗi`; }
  else if (measuredEd) { edLevel = "vàng"; edNote = "Khung editor chung (16 thẻ); cấu hình thẻ riêng của mẫu đã đo từ gốc, chưa diff editor theo mẫu"; }
  else { edLevel = "đỏ"; edNote = "Mẫu không nằm trong 88 mẫu đã đo editor → thẻ ảnh đầu thiệp/lời mở đầu/vị trí album đang là giá trị mặc định, cần đo"; }
  if (ed.any && !ed.ok) { edLevel = "vàng"; edNote = `Editor còn lệch so với gốc (${ed.text}); editor-sync ${sync ? sync.pass + " đạt/" + sync.fail + " lỗi" : "chưa chạy"}`; }

  // ---- 5. Màn hình xem trước trong editor (tab "Xem trước"; công tắc Hiện/Ẩn)
  let pvLevel, pvNote;
  const togglesMissing = TOGGLES.filter((k) => !b.toggles.includes(k));
  if (!spec) { pvLevel = "đỏ"; pvNote = "Xem trước chạy Preview.tsx cũ (không dùng khuôn chung)"; }
  else if (placeholder) { pvLevel = "đỏ"; pvNote = "Dùng khuôn chung nhưng theme mặc định → màu sai"; }
  else if (sync && !sync.fail && sync.pass > 0) { pvLevel = "xanh"; pvNote = `editor-sync: sửa field → xem trước đổi ${sync.pass} đạt / ${sync.fail} lỗi / ${sync.skip} bỏ qua (${sync.date})`; }
  else { pvLevel = "vàng"; pvNote = "Dùng chung bộ dựng với demo; chưa chạy editor-sync cho mẫu này"; }
  pvNote += `; công tắc Hiện/Ẩn nối: ${b.toggles.length}/${TOGGLES.length}` + (togglesMissing.length ? ` (chưa thấy: ${togglesMissing.join(", ")})` : "");

  const levels = [demoLevel, fxLevel, btnLevel, edLevel, pvLevel];
  rows.push({
    t, reg, caps, theme, family, b, cover, coverComp, pm, refCover: hasCoverData(t.id),
    demo: { level: demoLevel, note: demoNote, diff: open.text }, fx: { level: fxLevel, note: fxNote }, btn: { level: btnLevel, note: btnNote, openFx: fxName, fly },
    ed: { level: edLevel, note: edNote, flags, measured: measuredEd }, pv: { level: pvLevel, note: pvNote },
    gift, rsvp, sync, seq, levels,
    overall: !spec ? "Chưa clone" : levels.every((x) => x === "xanh") ? "Đã clone + kiểm đủ" : levels.includes("đỏ") ? "Dở dang" : "Đã clone (chưa kiểm đủ)",
  });
}

// ---------- ghi Excel
const wb = new ExcelJS.Workbook();
wb.creator = "scripts/clone/export_xlsx.mjs";
wb.created = new Date();
const FILL = { xanh: "FFC6EFCE", vàng: "FFFFEB9C", đỏ: "FFFFC7CE" };
const LABEL = { xanh: "✔ Đạt", vàng: "◐ Đã dựng, chưa kiểm", đỏ: "✖ Chưa / dở dang" };
const head = (ws) => {
  const r = ws.getRow(1);
  r.font = { bold: true, color: { argb: "FFFFFFFF" } };
  r.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F4E78" } };
  r.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  r.height = 34;
  ws.views = [{ state: "frozen", xSplit: 4, ySplit: 1 }];
};
const wrap = (ws) => ws.eachRow((r, i) => { if (i > 1) r.alignment = { vertical: "top", wrapText: true }; });
const lvlCell = (cell, lv) => { cell.value = LABEL[lv]; cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: FILL[lv] } }; cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true }; };

// --- Sheet 1: Tổng quan
const s1 = wb.addWorksheet("Tổng quan");
s1.columns = [
  { header: "STT", key: "stt", width: 5 }, { header: "Thumbnail", key: "thumb", width: 15 },
  { header: "Tên mẫu", key: "name", width: 24 }, { header: "ID", key: "id", width: 24 },
  { header: "URI (slug)", key: "slug", width: 20 }, { header: "Đường dẫn", key: "uri", width: 26 },
  { header: "Nhãn", key: "badge", width: 7 }, { header: "Tag", key: "tags", width: 22 },
  { header: "Đã clone hay chưa", key: "overall", width: 22 },
  { header: "1. Màn hình demo (thiệp đã mở)", key: "demo", width: 20 }, { header: "Ghi chú demo", key: "demoN", width: 44 },
  { header: "2. Hiệu ứng màn hình demo (bìa, hạt rơi, nền)", key: "fx", width: 20 }, { header: "Ghi chú hiệu ứng", key: "fxN", width: 38 },
  { header: "3. Hiệu ứng nút bấm (Mở thiệp)", key: "btn", width: 20 }, { header: "Ghi chú nút bấm", key: "btnN", width: 38 },
  { header: "4. Màn hình chỉnh sửa", key: "ed", width: 20 }, { header: "Ghi chú chỉnh sửa", key: "edN", width: 38 },
  { header: "5. Màn hình xem trước (trong editor, công tắc Hiện/Ẩn)", key: "pv", width: 20 }, { header: "Ghi chú xem trước", key: "pvN", width: 44 },
  { header: "Đã kiểm tay (6 mục)", key: "ver", width: 12 }, { header: "Ghi chú tay", key: "notes", width: 30 },
];
for (const [i, r] of rows.entries()) {
  const row = s1.addRow({
    stt: i + 1, name: r.t.name, id: r.t.id, slug: r.t.slug, uri: `/vi/mau-thiep/${r.t.slug}`,
    badge: r.t.badge ?? "", tags: (r.t.tags ?? []).join(", "), overall: r.overall,
    demoN: r.demo.note, fxN: r.fx.note, btnN: r.btn.note, edN: r.ed.note, pvN: r.pv.note,
    ver: r.reg ? `${Object.values(r.reg.verified).filter(Boolean).length}/6` : "0/6", notes: r.reg?.notes ?? "",
  });
  lvlCell(row.getCell("demo"), r.demo.level); lvlCell(row.getCell("fx"), r.fx.level); lvlCell(row.getCell("btn"), r.btn.level);
  lvlCell(row.getCell("ed"), r.ed.level); lvlCell(row.getCell("pv"), r.pv.level);
  const oc = row.getCell("overall");
  oc.fill = { type: "pattern", pattern: "solid", fgColor: { argb: r.overall.startsWith("Đã clone +") ? FILL.xanh : r.overall === "Đã clone (chưa kiểm đủ)" ? FILL.vàng : FILL.đỏ } };
  oc.font = { bold: true };
  row.height = 118;
  ["stt", "name", "id", "slug", "uri", "badge", "tags", "demoN", "fxN", "btnN", "edN", "pvN", "ver", "notes"].forEach((k) => (row.getCell(k).alignment = { vertical: "top", wrapText: true }));
  const buf = await thumb(r.t);
  if (buf) { const img = wb.addImage({ buffer: buf, extension: "jpeg" }); s1.addImage(img, { tl: { col: 1.05, row: i + 1.05 }, ext: { width: 96, height: 156 } }); }
}
head(s1);
s1.autoFilter = { from: "A1", to: { row: 1, column: s1.columns.length } };

// --- Sheet 2: Demo chi tiết
const s2 = wb.addWorksheet("Demo chi tiết");
s2.columns = [
  { header: "ID", width: 24 }, { header: "Tên", width: 22 }, { header: "Họ khối", width: 22 }, { header: "Thư mục khối", width: 44 }, { header: "Số file khối", width: 9 },
  { header: "Danh sách khối (capabilities)", width: 52 }, { header: "Theme: ink", width: 18 }, { header: "Theme: sub", width: 18 }, { header: "Theme: paper", width: 18 }, { header: "Theme: line", width: 22 },
  { header: "Thư mục ảnh theme", width: 36 }, { header: "Số ảnh theme", width: 9 }, { header: "Ảnh phong bì", width: 9 },
  { header: "Tên cô dâu chú rể đọc từ dữ liệu", width: 14 }, { header: "Album đọc từ dữ liệu", width: 12 }, { header: "Khối ghi cứng ảnh demo", width: 26 }, { header: "Lightbox", width: 26 },
  { header: "Công tắc Hiện/Ẩn nối", width: 40 }, { header: "Diff open/openfull (lệch hình học/kiểu)", width: 46 }, { header: "Diff hộp quà 390", width: 14 }, { header: "Diff RSVP 390", width: 14 },
  { header: "Bộ sinh khối", width: 34 }, { header: "Nguồn demo gốc", width: 50 }, { header: "Có dữ liệu ngày/lời mời riêng (demo.json)", width: 16 },
];
for (const r of rows) {
  const g = (d) => (d.any ? d.text : "chưa đo");
  s2.addRow([r.t.id, r.t.name, r.family ?? "—", r.b.dir, r.b.nFiles, (r.caps?.blocks ?? []).join(", "),
    r.theme?.colors?.ink ?? "", r.theme?.colors?.sub ?? "", r.theme?.colors?.paper ?? "", r.theme?.colors?.line ?? "",
    r.theme?.assets ?? "", r.reg?.files.themeAssets.length ?? 0, r.reg?.files.envelope.length ? "có" : "—",
    r.b.nameBound ? "có" : "KHÔNG", r.b.albumBound ? "có" : "KHÔNG", r.b.hardcodedPhotos.join(", ") || "—", r.b.lightbox,
    r.b.toggles.join(", "), r.demo.diff || "chưa đo", g(r.gift), g(r.rsvp),
    r.reg?.generator ?? "—", r.reg?.source ?? `https://chungdoi.com/vi/mau-thiep/${r.t.slug}/demo`, r.refCover ? "có" : "không"]);
}
head(s2); wrap(s2); s2.autoFilter = { from: "A1", to: { row: 1, column: s2.columns.length } };

// --- Sheet 3: Hiệu ứng bìa & nút mở
const s3 = wb.addWorksheet("Hiệu ứng bìa & nút mở");
s3.columns = [
  { header: "ID", width: 24 }, { header: "Tên", width: 22 }, { header: "Component bìa", width: 30 }, { header: "Có coverConfigs", width: 10 },
  { header: "Loại hạt (cấu hình local)", width: 14 }, { header: "Loại hạt đo từ mã gốc", width: 14 }, { header: "Bảng màu hạt đo", width: 36 },
  { header: "Con dấu", width: 9 }, { header: "Nền bìa (bg)", width: 50 }, { header: "Màu thẻ bìa", width: 24 }, { header: "Font tên", width: 28 },
  { header: "Số ảnh trang trí bìa", width: 10 }, { header: "Hiệu ứng khi bấm Mở thiệp", width: 32 }, { header: "Ảnh góc bay khi mở", width: 10 },
  { header: "So timeline mở thiệp với gốc", width: 30 }, { header: "Ghi chú hiệu ứng", width: 40 },
];
for (const r of rows) {
  const c = r.cover;
  const palette = c ? (/particleColors:\s*\[([^\]]*)\]/.exec(c)?.[1] ?? "").replace(/"/g, "") : "";
  s3.addRow([r.t.id, r.t.name, r.coverComp, c ? "có" : "KHÔNG", c ? field(c, "particleType") : "—", r.pm?.particleType ?? "chưa có", r.pm ? r.pm.particleColors.join(", ") : palette || "—",
    c ? field(c, "sealType") : "—", c ? (field(c, "bg") ?? "").slice(0, 160) : "—", c ? `${field(c, "cardBg")} / ${field(c, "cardBorder")}` : "—", c ? field(c, "nameFont") : "—",
    c ? (c.match(/"src":/g) ?? []).length : 0, r.btn.openFx, r.btn.fly ?? "mặc định", r.seq ? `${r.seq.ok}/${r.seq.total} khớp` : "chưa so", r.fx.note]);
}
head(s3); wrap(s3); s3.autoFilter = { from: "A1", to: { row: 1, column: s3.columns.length } };

// --- Sheet 4: Editor & Xem trước
const s4 = wb.addWorksheet("Editor & Xem trước");
s4.columns = [
  { header: "ID", width: 24 }, { header: "Tên", width: 22 }, { header: "Cấu hình thẻ editor đã đo từ gốc?", width: 14 },
  { header: "Thẻ Ảnh đầu thiệp", width: 10 }, { header: "Thẻ Ảnh đôi", width: 9 }, { header: "Thẻ Lời mở đầu", width: 10 }, { header: "Thư viện ảnh đặt sau", width: 11 },
  { header: "Diff editor 390/768/1280", width: 36 }, { header: "editor-sync (đạt/lỗi/bỏ qua)", width: 20 }, { header: "Ngày editor-sync", width: 12 },
  ...TOGGLES.map((k) => ({ header: `Xem trước nối ${k}`, width: 9 })),
  { header: "Bộ dựng xem trước", width: 30 }, { header: "Đánh giá xem trước", width: 60 },
];
for (const r of rows) {
  const d = diffSummary(r.t.id, ["editor"], [390, 768, 1280]);
  s4.addRow([r.t.id, r.t.name, r.ed.measured ? "đã đo" : "CHƯA ĐO", r.ed.flags.heroPhoto ? "có" : "không", r.ed.flags.coupleHero ? "có" : "không", r.ed.flags.introLine ? "có" : "không", r.ed.flags.albumAfter,
    d.any ? d.text : "chưa đo", r.sync ? `${r.sync.pass}/${r.sync.fail}/${r.sync.skip}` : "chưa chạy", r.sync?.date ?? "",
    ...TOGGLES.map((k) => (r.b.toggles.includes(k) ? "✓" : "✗")),
    r.reg && r.reg.status !== "chưa clone" ? "InvitationShell (khuôn chung)" : "Preview.tsx (cũ)", `${r.ed.note} | ${r.pv.note}`]);
}
head(s4); wrap(s4); s4.autoFilter = { from: "A1", to: { row: 1, column: s4.columns.length } };

// --- Sheet 5: File đã clone
const s5 = wb.addWorksheet("File đã clone");
s5.columns = [{ header: "ID", width: 24 }, { header: "Tên", width: 22 }, { header: "Loại", width: 18 }, { header: "Đường dẫn", width: 90 }, { header: "Kích thước (byte)", width: 14 }, { header: "sha256 (16 ký tự)", width: 20 }];
const KIND = { spec: "Spec", blocks: "Khối", themeAssets: "Ảnh theme", envelope: "Ảnh phong bì", survey: "Dữ liệu khảo sát" };
for (const r of rows) {
  if (!r.reg) continue;
  for (const [k, arr] of Object.entries(r.reg.files)) for (const f of arr) s5.addRow([r.t.id, r.t.name, KIND[k] ?? k, f.path, f.size, f.sha]);
  if (r.reg.cover) s5.addRow([r.t.id, r.t.name, "Cấu hình bìa", `${r.reg.cover.file}#${r.reg.cover.key}`, "", r.reg.cover.sha]);
}
head(s5); s5.autoFilter = { from: "A1", to: { row: 1, column: 6 } };

// --- Sheet 6: Chú giải
const s6 = wb.addWorksheet("Chú giải");
s6.columns = [{ width: 34 }, { width: 120 }];
const add = (a, b) => s6.addRow([a, b]).alignment = { vertical: "top", wrapText: true };
add("Tạo lúc", new Date().toISOString());
add("Số mẫu", `${rows.length}`);
const cnt = (f) => rows.filter(f).length;
add("Đã clone + kiểm đủ", `${cnt((r) => r.overall.startsWith("Đã clone +"))}`);
add("Đã clone (chưa kiểm đủ)", `${cnt((r) => r.overall === "Đã clone (chưa kiểm đủ)")}`);
add("Dở dang", `${cnt((r) => r.overall === "Dở dang")}`);
add("Chưa clone", `${cnt((r) => r.overall === "Chưa clone")}`);
add("", "");
add("✔ Đạt (xanh)", "Có bằng chứng đối chiếu với trang gốc: diff hình học 0 lệch (docs/survey/diff-*), hoặc editor-sync 0 lỗi, hoặc so timeline hiệu ứng mở thiệp khớp hết.");
add("◐ Đã dựng, chưa kiểm (vàng)", "Đã dựng bằng số đo thật (màu/ảnh/khối) nhưng chưa có báo cáo đối chiếu tự động, hoặc có nhưng còn lệch.");
add("✖ Chưa / dở dang (đỏ)", "Chưa có spec, theme.json còn màu mặc định (đen/trắng), thiếu cấu hình bìa, hoặc cấu hình editor chưa đo.");
add("", "");
add("1. Màn hình demo", "Thiệp đã mở tại /vi/mau-thiep/<slug>/demo (nội dung, bố cục, màu, ảnh). Bằng chứng: spec + theme đo thật + diff open/openfull.");
add("2. Hiệu ứng màn hình demo", "Bìa (card, con dấu, ảnh trang trí, nền gradient) và hạt rơi/nền động. Bằng chứng: coverConfigs.ts + diff cover + particle-colors-88.json (loại hạt đo từ mã gốc).");
add("3. Hiệu ứng nút bấm", "Hiệu ứng khi bấm nút 'Mở thiệp' trên bìa (hạt tuôn từ con dấu, sóng, rồng bay, ảnh góc bay...). Bằng chứng: openFx/flyCorners trong coverConfigs + open-seq-compare-<id>.md. (Cách hiểu 'nút bấm xem mẫu' của người làm báo cáo; nếu ý khác, chỉnh lại cột này.)");
add("4. Màn hình chỉnh sửa", "Khung editor dùng chung (16 thẻ) + cấu hình thẻ riêng theo mẫu (ảnh đầu thiệp / ảnh đôi / lời mở đầu / vị trí Thư viện ảnh). Bằng chứng: editorSections.ts (đo 88 mẫu 01/11/2026), capabilities.editor, diff editor, editor-sync.");
add("5. Màn hình xem trước", "Tab 'Xem trước' trong editor — cùng bộ dựng InvitationShell với demo; mỗi công tắc Hiện/Ẩn trong editor phải có khối đọc cờ xxxOn tương ứng (liệt kê ở sheet 'Editor & Xem trước').");
add("", "");
add("Nguồn", "src/features/templates/data/templates.ts, shell/specs/*, shell/blocks/*, covers/coverConfigs.ts, covers/index.ts, editor/config/editorSections.ts, docs/survey/*, docs/clone-registry.json");
add("Giới hạn", "Cột trạng thái dựa trên bằng chứng có trong repo; ô vàng không có nghĩa là sai, chỉ là chưa được đối chiếu tự động. Thumbnail cắt từ ảnh listing local (public/images/template-previews, gitignore).");
add("Tạo lại", "node scripts/clone/registry.mjs && node scripts/clone/export_xlsx.mjs");

fs.mkdirSync(J("docs/exports"), { recursive: true });
const out = J("docs/exports/danh-sach-mau-clone.xlsx");
await wb.xlsx.writeFile(out);
console.log("Đã ghi", path.relative(ROOT, out), "—", rows.length, "mẫu;", `${(fs.statSync(out).size / 1e6).toFixed(1)}MB`);
const tally = (k) => ["xanh", "vàng", "đỏ"].map((l) => `${l} ${rows.filter((r) => r[k].level === l).length}`).join(" / ");
for (const [lbl, k] of [["demo", "demo"], ["hiệu ứng", "fx"], ["nút mở", "btn"], ["editor", "ed"], ["xem trước", "pv"]]) console.log(lbl.padEnd(10), tally(k));
