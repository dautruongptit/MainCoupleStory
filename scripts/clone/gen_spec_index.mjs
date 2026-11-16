// Sinh chỉ mục spec: quét src/features/invitation/shell/specs/<id>/ → specs/index.generated.ts
// Thay cho ~275 dòng import + 92 dòng đăng ký tay trong specs/index.ts.
// Mỗi thư mục phải có theme.json + capabilities.json (demo.json tùy chọn); capabilities.id phải trùng tên thư mục.
// Dùng: node scripts/clone/gen_spec_index.mjs [--check]   (--check: không ghi, thoát mã 1 nếu tệp sinh đã cũ hoặc spec lỗi)
import fs from "node:fs";
import path from "node:path";

const ROOT = "src/features/invitation/shell/specs";
const OUT = path.join(ROOT, "index.generated.ts");
const check = process.argv.includes("--check");

// Trường mà khuôn chung thực sự cần. `layout`, `editor` là tùy chọn (11 mẫu không có; mã đọc qua `?.`).
const REQUIRED_CAPS = ["id", "family", "testId", "blocks", "cover", "gift", "hero", "album"];
const errors = [];
const ids = fs.readdirSync(ROOT, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort();
const rows = [];
for (const id of ids) {
  const has = (f) => fs.existsSync(path.join(ROOT, id, f));
  if (!has("theme.json") || !has("capabilities.json")) { errors.push(`${id}: thiếu theme.json hoặc capabilities.json`); continue; }
  let caps;
  try { caps = JSON.parse(fs.readFileSync(path.join(ROOT, id, "capabilities.json"), "utf8")); JSON.parse(fs.readFileSync(path.join(ROOT, id, "theme.json"), "utf8")); }
  catch (e) { errors.push(`${id}: JSON hỏng (${e.message})`); continue; }
  if (caps.id !== id) errors.push(`${id}: capabilities.id = "${caps.id}" không trùng tên thư mục`);
  const missing = REQUIRED_CAPS.filter((k) => caps[k] === undefined);
  if (missing.length) errors.push(`${id}: capabilities thiếu trường ${missing.join(", ")}`);
  if (!Array.isArray(caps.blocks) || !caps.blocks.length) errors.push(`${id}: capabilities.blocks rỗng`);
  if (has("demo.json")) { try { JSON.parse(fs.readFileSync(path.join(ROOT, id, "demo.json"), "utf8")); } catch (e) { errors.push(`${id}: demo.json hỏng (${e.message})`); } }
  rows.push({ id, demo: has("demo.json") });
}
if (errors.length) { console.error("Spec lỗi:\n  " + errors.join("\n  ")); process.exit(1); }

const v = (id) => "s_" + id.replace(/[^A-Za-z0-9_]/g, "_");
const lines = [
  "// TỆP SINH — không sửa tay. Chạy: node scripts/clone/gen_spec_index.mjs",
  "// Nguồn: mỗi thư mục specs/<id>/{theme,capabilities,demo}.json",
  ...rows.flatMap(({ id, demo }) => [
    `import ${v(id)}_theme from "./${id}/theme.json";`,
    `import ${v(id)}_caps from "./${id}/capabilities.json";`,
    ...(demo ? [`import ${v(id)}_demo from "./${id}/demo.json";`] : []),
  ]),
  "",
  "/** JSON thô của từng mẫu; `specs/index.ts` ép kiểu và dựng theme. */",
  "export const RAW_SPECS: Record<string, { theme: unknown; capabilities: unknown; demo?: unknown }> = {",
  ...rows.map(({ id, demo }) => `  ${id}: { theme: ${v(id)}_theme, capabilities: ${v(id)}_caps${demo ? `, demo: ${v(id)}_demo` : ""} },`),
  "};",
  "",
];
const out = lines.join("\n");
const old = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8").replace(/\r\n/g, "\n") : "";
if (check) {
  if (old !== out) { console.error(`${OUT} đã cũ — chạy node scripts/clone/gen_spec_index.mjs`); process.exit(1); }
  console.log(`OK: ${rows.length} mẫu, chỉ mục khớp`);
} else {
  if (old !== out) fs.writeFileSync(OUT, out);
  console.log(`${old !== out ? "Đã ghi" : "Không đổi"} ${OUT}: ${rows.length} mẫu (${rows.filter((r) => r.demo).length} có demo.json)`);
}
