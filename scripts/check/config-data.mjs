// Chụp / so CẤU HÌNH theo mẫu mà app tra cứu (bảng mẫu, bảng màu, điểm lấy nét, thẻ editor, bìa, hộp quà cũ, lời mở đầu).
// Dùng khi chuyển một bảng cấu hình sang specs/<id>/ (giai đoạn C): giá trị tra ra phải y nguyên trước và sau.
// Không cần trình duyệt/dev server (đóng gói bằng esbuild rồi chạy trong Node).
//   node scripts/check/config-data.mjs --save <tệp.json>
//   node scripts/check/config-data.mjs --compare <tệp.json>     (thoát mã 1 nếu khác)
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const args = process.argv.slice(2);
const mode = args.includes("--save") ? "save" : args.includes("--compare") ? "compare" : null;
if (!mode) { console.error("Cần --save <tệp> hoặc --compare <tệp>"); process.exit(2); }
const file = args[args.indexOf("--" + mode) + 1];
const abs = (p) => path.resolve(p).split(path.sep).join("/");

// hộp quà: từ giai đoạn C nằm ở shared/giftSpecs.ts (đọc specs/<id>/gift.json); bản cũ là hai tệp *.generated.ts
const GIFT_NEW = "src/features/invitation/shell/blocks/shared/giftSpecs.ts";
const giftImports = fs.existsSync(GIFT_NEW)
  ? `import { GIFT_SPECS, GIFT_ASSETS } from "${abs(GIFT_NEW)}";`
  : `import { GIFT_SPECS } from "${abs("src/features/invitation/shell/blocks/shared/giftSpecs.generated.ts")}";
import { GIFT_ASSETS } from "${abs("src/features/invitation/config/giftAssets.generated.ts")}";`;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "config-data-"));
fs.writeFileSync(path.join(tmp, "entry.ts"), `
${giftImports}
import { TEMPLATES, introDefaultFor, templateByIdOrSlug } from "${abs("src/features/templates/data/templates.ts")}";
import { TEMPLATE_THEMES } from "${abs("src/features/invitation/config/templateThemes.ts")}";
import { previewFocal } from "${abs("src/features/templates/data/previewFocal.ts")}";
import { editorSections, hasCoupleHero, albumCardAfter } from "${abs("src/features/editor/config/editorSections.ts")}";
import { COVER_CONFIGS } from "${abs("src/features/invitation/components/covers/coverConfigs.ts")}";
import { getGiftboxConfig } from "${abs("src/features/invitation/config/giftboxConfigs.ts")}";
import { getEditorSections, getCoupleHero, getCapabilities } from "${abs("src/features/invitation/shell/specs/index.ts")}";
import { defaultDressColors, defaultGiftMode } from "${abs("src/services/storage/store.ts")}";
export const ALL = {
  __order: TEMPLATES.map((t) => t.id),
  ...Object.fromEntries(TEMPLATES.map((t) => [t.id, {
    tpl: { ...t, introDefault: undefined }, // lời mở đầu so ở khóa intro
    bySlug: templateByIdOrSlug(t.slug)?.id,
    intro: introDefaultFor(t.id),
    palette: TEMPLATE_THEMES[t.id] ?? null,
    focal: previewFocal(t.id),
    editorMatrix: editorSections(t.id), coupleHeroMatrix: hasCoupleHero(t.id), albumCardAfter: albumCardAfter(t.id),
    editorSections: getEditorSections(t.id), coupleHero: getCoupleHero(t.id),
    family: getCapabilities(t.id)?.family ?? null,
    cover: COVER_CONFIGS[t.id] ?? null,
    giftbox: getGiftboxConfig(t.id),
    giftSpec: GIFT_SPECS[t.id] ?? null, giftAssets: GIFT_ASSETS[t.id] ?? null,
    dress: defaultDressColors(t.id), giftMode: defaultGiftMode(t.id),
  }])),
};
`);
const outfile = path.join(tmp, "out.mjs");
await build({
  entryPoints: [path.join(tmp, "entry.ts")], outfile, bundle: true, format: "esm", platform: "node", logLevel: "error",
  alias: { "@": path.resolve("src") }, define: { "import.meta.env": "{}" }, loader: { ".css": "empty" },
});
const { ALL } = await import(pathToFileURL(outfile).href);
fs.rmSync(tmp, { recursive: true, force: true });

const sortKeys = (v) => Array.isArray(v) ? v.map(sortKeys) : v && typeof v === "object" ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])])) : v;
const now = sortKeys(JSON.parse(JSON.stringify(ALL)));
if (mode === "save") {
  fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(now));
  console.log(`Đã chụp cấu hình ${now.__order.length} mẫu → ${file}`);
  process.exit(0);
}
const old = JSON.parse(fs.readFileSync(file, "utf8"));
let bad = 0;
for (const id of new Set([...Object.keys(old), ...Object.keys(now)])) {
  const a = old[id], b = now[id];
  if (JSON.stringify(a) === JSON.stringify(b)) continue;
  bad++;
  if (id === "__order") { console.log("KHÁC thứ tự mẫu"); continue; }
  if (!a || !b) { console.log(`KHÁC ${id}: ${a ? "mất mẫu" : "mẫu mới"}`); continue; }
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
  console.log(`KHÁC ${id}: ${keys.join(", ")}`);
  for (const k of keys.slice(0, 3)) console.log(`    ${k}: ${JSON.stringify(a[k])?.slice(0, 110)} → ${JSON.stringify(b[k])?.slice(0, 110)}`);
}
console.log(`\n${now.__order.length} mẫu, ${bad} mục khác mốc`);
process.exit(bad ? 1 : 0);
