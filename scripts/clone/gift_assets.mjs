// Sổ ảnh Hộp Mừng Quà: mỗi mẫu cần những ảnh nào, local đã có chưa, trang gốc có hay không, file nào thừa.
// Ghi: docs/survey/gift-assets.json (máy đọc, giữ lịch sử tải) + docs/survey/gift-assets.md (người đọc).
// Dùng:
//   node scripts/clone/gift_assets.mjs                 cập nhật sổ (quét local + gộp kết quả tải đã ghi)
//   node scripts/clone/gift_assets.mjs --todo          in JSON danh sách đường dẫn cần thử tải (chưa có local, chưa xác nhận 404)
//   node scripts/clone/gift_assets.mjs --result <file> gộp kết quả một lần tải (JSON [{path,status,bytes}]) rồi cập nhật sổ
// Quy ước ảnh của trang gốc (mỗi mẫu có id):
//   /images/giftbox/<id>.webp        hộp quà 3D (kiểu "Hộp quà")
//   /images/giftbox/mini/<id>.webp   hộp quà nhỏ (trang trí quanh hộp 3D của mẫu khác)
//   /images/envelope/<id>.webp       phong bì (kiểu "Phong bì")
//   + mọi ảnh nằm trong markup đo thật của khối (giftSpecs: widgetHtml)
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUB = path.join(ROOT, "public");
const JSON_OUT = "docs/survey/gift-assets.json";
const MD_OUT = "docs/survey/gift-assets.md";
const DIRS = ["/images/giftbox", "/images/giftbox/mini", "/images/envelope"];

const tpl = fs.readFileSync("src/features/templates/data/templates.generated.ts", "utf8");
const ids = [...tpl.matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]);
// dữ liệu hộp quà từng mẫu: specs/<id>/gift.json (sinh bởi gen_gift_sections.cjs; khóa `assets` do script này ghi)
const SPEC_DIR = "src/features/invitation/shell/specs";
const giftFile = (id) => path.join(SPEC_DIR, id, "gift.json");
const readGift = (id) => (fs.existsSync(giftFile(id)) ? JSON.parse(fs.readFileSync(giftFile(id), "utf8")) : null);
const SPECS = Object.fromEntries(ids.map((id) => [id, readGift(id)]).filter(([, g]) => g).map(([id, { assets, ...spec }]) => [id, spec]));

const prev = fs.existsSync(JSON_OUT) ? JSON.parse(fs.readFileSync(JSON_OUT, "utf8")) : { remote: {}, log: [] };
const remote = prev.remote || {}; // path -> { status, bytes, at }
const log = prev.log || [];

const args = process.argv.slice(2);
if (args[0] === "--result") {
  const res = JSON.parse(fs.readFileSync(args[1], "utf8"));
  const at = new Date().toISOString().slice(0, 16).replace("T", " ");
  for (const r of res) remote[r.path] = { status: r.status, bytes: r.bytes || 0, at, ...(r.alias ? { alias: r.alias } : {}) };
  log.push({ at, tried: res.length, ok: res.filter((r) => r.status === 200).length, missingOnReal: res.filter((r) => r.status === 404).length, other: res.filter((r) => r.status !== 200 && r.status !== 404).map((r) => r.path + ":" + r.status) });
}

const exists = (p) => fs.existsSync(path.join(PUB, p));
const need = {}; // path -> { ids:Set, why:Set }
// Như trang gốc: một số mẫu dùng ảnh mang tên chung của họ mẫu (vd dragon_phoenix_red -> dragon_phoenix.webp).
// remote[<đường dẫn theo id>].alias = đường dẫn thật trên trang gốc; ảnh lưu đúng tên thật, không nhân bản theo id.
const resolve = (p) => (remote[p] && remote[p].alias && remote[p].status === 200 ? remote[p].alias : p);
const assetOf = {}; // id -> { box, mini, envelope } (đường dẫn thật)
const add = (p0, id, why) => { const p = resolve(p0); if (p !== p0) (need[p] ||= { ids: new Set(), why: new Set(), from: new Set() }).from?.add(p0);  (need[p] ||= { ids: new Set(), why: new Set() }).ids.add(id); need[p].why.add(why); };
for (const id of ids) {
  add(`/images/giftbox/${id}.webp`, id, "hộp 3D");
  add(`/images/giftbox/mini/${id}.webp`, id, "hộp nhỏ");
  add(`/images/envelope/${id}.webp`, id, "phong bì");
  assetOf[id] = { box: resolve(`/images/giftbox/${id}.webp`), mini: resolve(`/images/giftbox/mini/${id}.webp`), envelope: resolve(`/images/envelope/${id}.webp`) };
  const s = SPECS[id];
  if (s) for (const m of s.widgetHtml.matchAll(/src="(\/images\/(?:giftbox|envelope)\/[^"]+)"/g)) add(m[1], id, "markup đo thật");
}

const rows = Object.entries(need).map(([p, v]) => {
  const local = exists(p);
  const r = remote[p];
  const state = local ? "có" : r?.status === 404 ? "gốc không có" : r ? `lỗi ${r.status}` : "thiếu";
  return { path: p, local, remote: r?.status ?? null, alias: r?.alias ?? null, state, ids: [...v.ids], why: [...v.why] };
}).sort((a, b) => a.path.localeCompare(b.path));

// thừa: file trong các thư mục ảnh hộp quà không mẫu nào cần và không mã nguồn nào nhắc tới
const srcText = ["src/features/invitation", "src/pages", "src/features/editor"].flatMap((d) => walk(d)).filter((f) => /\.(tsx?|css)$/.test(f)).map((f) => fs.readFileSync(f, "utf8")).join("\n");
function walk(d) { if (!fs.existsSync(d)) return []; return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])); }
const extra = [];
for (const d of DIRS) {
  const abs = path.join(PUB, d);
  if (!fs.existsSync(abs)) continue;
  for (const f of fs.readdirSync(abs)) {
    if (fs.statSync(path.join(abs, f)).isDirectory()) continue;
    const p = `${d}/${f}`;
    if (need[p]) continue;
    const usedInCode = srcText.includes(p) || srcText.includes(f);
    extra.push({ path: p, usedInCode, bytes: fs.statSync(path.join(abs, f)).size });
  }
}

if (args[0] === "--todo") {
  console.log(JSON.stringify(rows.filter((r) => r.state === "thiếu" || r.state.startsWith("lỗi")).map((r) => r.path)));
  process.exit(0);
}

const count = (st) => rows.filter((r) => r.state === st).length;
const summary = { total: rows.length, co: count("có"), thieu: count("thiếu"), gocKhongCo: count("gốc không có"), loi: rows.filter((r) => r.state.startsWith("lỗi")).length, thua: extra.length };
// bảng mẫu -> ảnh thật cho code (chỉ ghi ảnh đã có ở local)
{
  // ghi vào khóa `assets` của specs/<id>/gift.json — ảnh đúng tên trên trang gốc (có mẫu dùng tên chung của họ, vd dragon_phoenix.webp)
  for (const id of ids) {
    const g = readGift(id);
    if (!g) continue;
    const assets = Object.fromEntries(Object.entries(assetOf[id]).filter(([, v]) => exists(v)));
    const { assets: _old, ...spec } = g;
    const next = JSON.stringify({ ...spec, assets }, null, 1) + "\n";
    if (fs.readFileSync(giftFile(id), "utf8").split("\r\n").join("\n") !== next) fs.writeFileSync(giftFile(id), next);
  }
}
fs.writeFileSync(JSON_OUT, JSON.stringify({ updated: new Date().toISOString(), summary, remote, log, rows, extra }, null, 1));

const md = [
  "# Sổ ảnh Hộp Mừng Quà",
  "",
  "Sinh bởi `node scripts/clone/gift_assets.mjs` — đừng sửa tay; chạy lại sau mỗi lần tải ảnh.",
  "Quy trình tải: `--todo` lấy danh sách → tải trong tab chungdoi.com (fetch cùng nguồn, POST về bộ nhận ảnh, giãn vài giây/ảnh) → ghi kết quả JSON → `--result <file>`.",
  "",
  `Cập nhật: ${new Date().toISOString().slice(0, 16).replace("T", " ")} · cần ${summary.total} ảnh · **có ${summary.co}** · thiếu ${summary.thieu} · trang gốc không có ${summary.gocKhongCo} · lỗi ${summary.loi} · thừa ${summary.thua}`,
  "",
  "## Lịch sử tải",
  ...(log.length ? log.map((l) => `- ${l.at}: thử ${l.tried}, tải được ${l.ok}, gốc không có ${l.missingOnReal}${l.other?.length ? ", lỗi khác: " + l.other.join(", ") : ""}`) : ["- (chưa tải lần nào)"]),
  "",
  "## Mẫu dùng ảnh tên chung của họ (giống trang gốc, không nhân bản theo id)",
  ...ids.flatMap((id) => ["box", "mini", "envelope"].filter((k) => !assetOf[id][k].endsWith("/" + id + ".webp")).map((k) => "- " + id + " (" + k + ") → `" + assetOf[id][k] + "`")),
  "",
  "## Còn thiếu (chưa tải / tải lỗi)",
  ...rows.filter((r) => r.state === "thiếu" || r.state.startsWith("lỗi")).map((r) => `- \`${r.path}\` — ${r.state} — ${r.why.join(", ")} (${r.ids.join(", ")})`),
  "",
  "## Trang gốc không có (404) — không cần tải; widget dùng ảnh dự phòng",
  ...rows.filter((r) => r.state === "gốc không có").map((r) => `- \`${r.path}\` — ${r.why.join(", ")}`),
  "",
  "## Thừa (có trong thư mục nhưng không mẫu nào cần)",
  "Chưa xóa. `usedInCode` = mã nguồn còn nhắc tới (giữ lại); còn lại có thể xóa sau khi xác nhận.",
  ...extra.map((e) => `- \`${e.path}\` — ${e.usedInCode ? "mã nguồn còn dùng → giữ" : "không dùng → có thể xóa"} (${e.bytes} B)`),
  "",
  "## Theo mẫu",
  "| Mẫu | Kiểu mặc định | Hộp 3D | Hộp nhỏ | Phong bì |",
  "|---|---|---|---|---|",
  ...ids.map((id) => {
    const st = (p) => (rows.find((r) => r.path === p) || {}).state || "-";
    return "| " + id + " | " + (SPECS[id]?.kind ?? "?") + " | " + st(assetOf[id].box) + " | " + st(assetOf[id].mini) + " | " + st(assetOf[id].envelope) + " |";
  }),
].join("\n");
fs.writeFileSync(MD_OUT, md + "\n");
console.log(JSON.stringify(summary));
