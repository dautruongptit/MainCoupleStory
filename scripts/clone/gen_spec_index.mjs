// Sinh chỉ mục mẫu: quét src/features/invitation/templates/<id>/ (mỗi mẫu một thư mục: *.json + blocks/ nếu có khối riêng;
// họ khối dùng chung nhiều mẫu ở templates/_shared/<họ>/) →
//   templates/index.generated.ts  (theme + capabilities + cover của từng mẫu, DEMO_LOADERS; khuôn thiệp và engine bìa dùng)
//   templates/gift.generated.ts   (phần nhẹ + GIFT_LOADERS)
//   shell/blocks/families.generated.ts  (FAMILY_LOADERS: capabilities.family → thư mục khối)
//   src/features/templates/data/templates.generated.ts  (meta của từng mẫu, xếp theo meta.order; kho mẫu / bảng màu / điểm lấy nét dùng)
// Thay cho ~275 dòng import + 92 dòng đăng ký tay trong specs/index.ts và mảng TEMPLATES viết tay.
// Mỗi thư mục phải có meta.json + theme.json + capabilities.json (demo.json tùy chọn); capabilities.id phải trùng tên thư mục.
// Dùng: node scripts/clone/gen_spec_index.mjs [--check]   (--check: không ghi, thoát mã 1 nếu tệp sinh đã cũ hoặc spec lỗi)
import fs from "node:fs";
import path from "node:path";

const ROOT = "src/features/invitation/templates";
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
// thư mục bắt đầu bằng "_" (vd _shared) không phải mẫu
const ids = fs.readdirSync(ROOT, { withFileTypes: true }).filter((e) => e.isDirectory() && !e.name.startsWith("_")).map((e) => e.name).sort();
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
  // gift.json (tùy chọn nhưng mẫu nào cũng nên có): khối Hộp Quà Mừng đo từ trang gốc, sinh bởi gen_gift_sections.cjs
  const gift = has("gift.json") ? readJson(id, "gift.json") : null;
  if (gift && !["3d-box", "envelope", "other"].includes(gift.kind)) errors.push(`${id}: gift.kind = ${JSON.stringify(gift.kind)} không hợp lệ`);
  rows.push({ id, demo: has("demo.json"), cover: !!cover, gift: !!gift, meta });
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
  "// Nguồn: mỗi thư mục specs/<id>/{theme,capabilities,cover,demo}.json (demo tải theo nhu cầu)",
  ...rows.flatMap(({ id, demo, cover }) => [
    `import ${v(id)}_theme from "./${id}/theme.json";`,
    `import ${v(id)}_caps from "./${id}/capabilities.json";`,
    ...(cover ? [`import ${v(id)}_cover from "./${id}/cover.json";`] : []),
  ]),
  "",
  "/** JSON thô của từng mẫu; `specs/index.ts` ép kiểu và dựng theme. */",
  "export const RAW_SPECS: Record<string, { theme: unknown; capabilities: unknown; cover?: unknown }> = {",
  ...rows.map(({ id, demo, cover }) => `  ${id}: { theme: ${v(id)}_theme, capabilities: ${v(id)}_caps${cover ? `, cover: ${v(id)}_cover` : ""} },`),
  "};",
  "",
  "/** Dữ liệu demo của trang gốc cho từng mẫu (specs/<id>/demo.json) — tải theo nhu cầu, chỉ trang demo dùng. */",
  "export const DEMO_LOADERS: Record<string, () => Promise<unknown>> = {",
  ...rows.filter((r) => r.demo).map(({ id }) => `  ${id}: () => import("./${id}/demo.json").then((m) => m.default),`),
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

// Hộp quà tách tệp riêng (dữ liệu lớn ~700 KB, chỉ khối hộp quà dùng)
const OUT_GIFT = path.join(ROOT, "gift.generated.ts");
const giftRows = rows.filter((r) => r.gift);
// Phần nhẹ (kiểu hộp, ảnh, giá trị `legacy`) ghi thẳng vào tệp sinh vì mã cần tra đồng bộ cho MỌI mẫu
// (kiểu hộp quà mặc định khi tạo/đổi mẫu, hoa bìa bay, hộp nhỏ mượn của mẫu khác). Phần nặng (markup khối hộp quà +
// cửa sổ QR) của mỗi mẫu là một import() động → chỉ tải khi mở thiệp của mẫu đó.
const giftLight = (id) => { const g = JSON.parse(fs.readFileSync(path.join(ROOT, id, "gift.json"), "utf8")); return { kind: g.kind, ...(g.assets ? { assets: g.assets } : {}), ...(g.legacy ? { legacy: g.legacy } : {}) }; };
const outGift = [
  "// TỆP SINH — không sửa tay. Chạy: node scripts/clone/gen_spec_index.mjs",
  "// Nguồn: specs/<id>/gift.json (sinh bởi scripts/clone/gen_gift_sections.cjs + gift_assets.mjs).",
  "",
  "/** Phần nhẹ của gift.json (kind, assets, legacy) — tra đồng bộ cho mọi mẫu. */",
  "export const GIFT_LIGHT: Record<string, unknown> = {",
  ...giftRows.map(({ id }) => `  ${id}: ${JSON.stringify(giftLight(id))},`),
  "};",
  "",
  "/** Toàn bộ gift.json của một mẫu (markup khối hộp quà, cửa sổ QR…) — tải theo nhu cầu. */",
  "export const GIFT_LOADERS: Record<string, () => Promise<unknown>> = {",
  ...giftRows.map(({ id }) => `  ${id}: () => import("./${id}/gift.json").then((m) => m.default),`),
  "};",
  "",
].join("\n");

// Họ khối (capabilities.family) nằm ở một trong hai chỗ:
//   templates/<id>/blocks/index.ts   khối riêng của MỘT mẫu — tên họ = capabilities.family của mẫu đó
//   templates/_shared/<họ>/index.ts  khối dùng chung cho nhiều mẫu — tên họ = tên thư mục
// index.ts xuất hằng `<TÊN>_BLOCKS` (bản đồ tên khối → component) thì dùng hằng đó; không thì dùng mọi export của index.ts.
const BLOCKS = "src/features/invitation/shell/blocks";
const OUT_FAM = path.join(BLOCKS, "families.generated.ts");
const famOfId = (id) => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, id, "capabilities.json"), "utf8")).family; } catch { return null; } };
const famEntry = (name, dirRel) => {
  const m = /export const ([A-Z0-9_]+_BLOCKS)\b/.exec(fs.readFileSync(path.join(ROOT, dirRel, "index.ts"), "utf8"));
  return { name, dir: dirRel.split(path.sep).join("/"), named: m ? m[1] : null };
};
const famErrors = [];
const families = [];
const SHARED = path.join(ROOT, "_shared");
if (fs.existsSync(SHARED)) for (const e of fs.readdirSync(SHARED, { withFileTypes: true })) {
  if (e.isDirectory() && fs.existsSync(path.join(SHARED, e.name, "index.ts"))) families.push(famEntry(e.name, path.join("_shared", e.name)));
}
for (const id of ids) {
  if (!fs.existsSync(path.join(ROOT, id, "blocks", "index.ts"))) continue;
  const fam = famOfId(id);
  if (families.some((f) => f.name === fam)) famErrors.push(`${id}: có blocks/ riêng nhưng họ "${fam}" đã có ở ${families.find((f) => f.name === fam).dir}`);
  else families.push(famEntry(fam, path.join(id, "blocks")));
}
families.sort((a, b) => a.name.localeCompare(b.name));
const famNames = new Set(families.map((f) => f.name));
// "minimalism" là họ gốc nằm ngay trong shell/blocks/ (MINIMALISM_BLOCKS ở blocks/index.ts)
const usedFamilies = new Set(ids.map(famOfId));
famErrors.push(...[...usedFamilies].filter((f) => f && f !== "minimalism" && !famNames.has(f)).map((f) => `họ khối "${f}" được dùng trong capabilities.json nhưng không có templates/<id>/blocks/index.ts hay templates/_shared/${f}/index.ts`));
if (famErrors.length) { console.error("Spec lỗi:\n  " + famErrors.join("\n  ")); process.exit(1); }
const fv = (n) => "f_" + n.replace(/[^A-Za-z0-9_]/g, "_");
const outFam = [
  "// TỆP SINH — không sửa tay. Chạy: node scripts/clone/gen_spec_index.mjs",
  "// Nguồn: templates/<id>/blocks/index.ts (khối riêng của một mẫu) và templates/_shared/<họ>/index.ts (khối dùng chung).",
  "// Thêm họ khối mới = tạo thư mục + index.ts rồi chạy bộ sinh.",
  "// Mỗi họ là một import() động → trình đóng gói tách mỗi họ thành một tệp riêng, trang chỉ tải họ của mẫu đang xem.",
  'import type { BlockComponent } from "./index";',
  "",
  "type BlockMap = Record<string, BlockComponent>;",
  "/** capabilities.family → hàm tải bản đồ tên khối → component của họ đó. */",
  "export const FAMILY_LOADERS: Record<string, () => Promise<BlockMap>> = {",
  ...families.map((f) => (f.named
    ? `  ${f.name}: () => import("@/features/invitation/templates/${f.dir}").then((m) => m.${f.named}),`
    : `  ${f.name}: () => import("@/features/invitation/templates/${f.dir}").then((m) => ({ ...m }) as unknown as BlockMap),`)),
  "};",
  "",
].join("\n");

const norm = (f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8").split("\r\n").join("\n") : "");
const stale = [[OUT, out], [OUT_META, outMeta], [OUT_GIFT, outGift], [OUT_FAM, outFam]].filter(([f, text]) => norm(f) !== text);
if (check) {
  if (stale.length) { console.error(`${stale.map(([f]) => f).join(", ")} đã cũ — chạy node scripts/clone/gen_spec_index.mjs`); process.exit(1); }
  console.log(`OK: ${rows.length} mẫu, chỉ mục khớp`);
} else {
  for (const [f, text] of stale) fs.writeFileSync(f, text);
  console.log(`${stale.length ? "Đã ghi " + stale.map(([f]) => path.basename(f)).join(", ") : "Không đổi"}: ${rows.length} mẫu (${rows.filter((r) => r.demo).length} có demo.json)`);
}
