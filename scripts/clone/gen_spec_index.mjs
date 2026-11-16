// Sinh chỉ mục spec: quét src/features/invitation/shell/specs/<id>/ →
//   specs/index.generated.ts  (theme + capabilities + demo + cover của từng mẫu; khuôn thiệp và engine bìa dùng)
//   src/features/templates/data/templates.generated.ts  (meta của từng mẫu, xếp theo meta.order; kho mẫu / bảng màu / điểm lấy nét dùng)
// Thay cho ~275 dòng import + 92 dòng đăng ký tay trong specs/index.ts và mảng TEMPLATES viết tay.
// Mỗi thư mục phải có meta.json + theme.json + capabilities.json (demo.json tùy chọn); capabilities.id phải trùng tên thư mục.
// Dùng: node scripts/clone/gen_spec_index.mjs [--check]   (--check: không ghi, thoát mã 1 nếu tệp sinh đã cũ hoặc spec lỗi)
import fs from "node:fs";
import path from "node:path";

const ROOT = "src/features/invitation/shell/specs";
const OUT = path.join(ROOT, "index.generated.ts");
const OUT_META = "src/features/templates/data/templates.generated.ts";
const check = process.argv.includes("--check");

// Trường mà khuôn chung thực sự cần. `layout`, `editor` là tùy chọn (11 mẫu không có; mã đọc qua `?.`).
const REQUIRED_CAPS = ["id", "family", "testId", "blocks", "cover", "gift", "hero", "album"];
// meta.json: thông tin danh mục của mẫu (kho mẫu, thứ tự như trang gốc; tùy chọn: badge, introDefault, previewFocal, palette)
const REQUIRED_META = ["order", "slug", "name", "desc", "img", "full", "tags"];

const errors = [];
const readJson = (id, f) => {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, id, f), "utf8")); }
  catch (e) { errors.push(`${id}: ${f} hỏng (${e.message})`); return null; }
};
const ids = fs.readdirSync(ROOT, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort();
const rows = [];
for (const id of ids) {
  const has = (f) => fs.existsSync(path.join(ROOT, id, f));
  const missingFiles = ["meta.json", "theme.json", "capabilities.json"].filter((f) => !has(f));
  if (missingFiles.length) { errors.push(`${id}: thiếu ${missingFiles.join(", ")}`); continue; }
  const caps = readJson(id, "capabilities.json");
  const meta = readJson(id, "meta.json");
  readJson(id, "theme.json");
  if (has("demo.json")) readJson(id, "demo.json");
  // cover.json (tùy chọn): cấu hình màn bìa cho engine bìa chung; mẫu có component bìa riêng hoàn toàn thì không cần
  const cover = has("cover.json") ? readJson(id, "cover.json") : null;
  if (cover && cover.templateId !== id) errors.push(`${id}: cover.templateId = "${cover.templateId}" không trùng tên thư mục`);
  if (!caps || !meta) continue;
  if (caps.id !== id) errors.push(`${id}: capabilities.id = "${caps.id}" không trùng tên thư mục`);
  const missCaps = REQUIRED_CAPS.filter((k) => caps[k] === undefined);
  if (missCaps.length) errors.push(`${id}: capabilities thiếu trường ${missCaps.join(", ")}`);
  if (!Array.isArray(caps.blocks) || !caps.blocks.length) errors.push(`${id}: capabilities.blocks rỗng`);
  const missMeta = REQUIRED_META.filter((k) => meta[k] === undefined);
  if (missMeta.length) errors.push(`${id}: meta thiếu trường ${missMeta.join(", ")}`);
  rows.push({ id, demo: has("demo.json"), cover: !!cover, meta });
}
// meta: thứ tự (order) và slug không được trùng
for (const key of ["order", "slug"]) {
  const seen = new Map();
  for (const r of rows) {
    const val = r.meta[key];
    if (seen.has(val)) errors.push(`${r.id}: meta.${key} = ${JSON.stringify(val)} trùng với ${seen.get(val)}`);
    else seen.set(val, r.id);
  }
}
if (errors.length) { console.error("Spec lỗi:\n  " + errors.join("\n  ")); process.exit(1); }

const v = (id) => "s_" + id.replace(/[^A-Za-z0-9_]/g, "_");
const out = [
  "// TỆP SINH — không sửa tay. Chạy: node scripts/clone/gen_spec_index.mjs",
  "// Nguồn: mỗi thư mục specs/<id>/{theme,capabilities,demo}.json",
  ...rows.flatMap(({ id, demo, cover }) => [
    `import ${v(id)}_theme from "./${id}/theme.json";`,
    `import ${v(id)}_caps from "./${id}/capabilities.json";`,
    ...(demo ? [`import ${v(id)}_demo from "./${id}/demo.json";`] : []),
    ...(cover ? [`import ${v(id)}_cover from "./${id}/cover.json";`] : []),
  ]),
  "",
  "/** JSON thô của từng mẫu; `specs/index.ts` ép kiểu và dựng theme. */",
  "export const RAW_SPECS: Record<string, { theme: unknown; capabilities: unknown; demo?: unknown; cover?: unknown }> = {",
  ...rows.map(({ id, demo, cover }) => `  ${id}: { theme: ${v(id)}_theme, capabilities: ${v(id)}_caps${demo ? `, demo: ${v(id)}_demo` : ""}${cover ? `, cover: ${v(id)}_cover` : ""} },`),
  "};",
  "",
].join("\n");

const byOrder = [...rows].sort((a, b) => a.meta.order - b.meta.order);
// Mỗi mẫu một dòng JSON, bắt đầu bằng "slug" rồi "id": các script trong scripts/ dò tệp này bằng biểu thức chính quy.
const row = ({ id, meta }) => { const { order, slug, ...rest } = meta; return JSON.stringify({ slug, id, ...rest }); };
const outMeta = [
  "// TỆP SINH — không sửa tay. Chạy: node scripts/clone/gen_spec_index.mjs",
  "// Nguồn: specs/<id>/meta.json, xếp theo meta.order (thứ tự kho mẫu của trang gốc). Sửa thông tin mẫu ở meta.json.",
  "export const TEMPLATE_ROWS = [",
  ...byOrder.map((r) => `  ${row(r)},`),
  "];",
  "",
].join("\n");

const norm = (f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8").split("\r\n").join("\n") : "");
const stale = [[OUT, out], [OUT_META, outMeta]].filter(([f, text]) => norm(f) !== text);
if (check) {
  if (stale.length) { console.error(`${stale.map(([f]) => f).join(", ")} đã cũ — chạy node scripts/clone/gen_spec_index.mjs`); process.exit(1); }
  console.log(`OK: ${rows.length} mẫu, chỉ mục khớp`);
} else {
  for (const [f, text] of stale) fs.writeFileSync(f, text);
  console.log(`${stale.length ? "Đã ghi " + stale.map(([f]) => path.basename(f)).join(", ") : "Không đổi"}: ${rows.length} mẫu (${rows.filter((r) => r.demo).length} có demo.json)`);
}
