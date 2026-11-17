// Chụp / so DỮ LIỆU demo của mọi mẫu (kết quả `buildDemoInv`) — dùng khi chuyển cấu hình giữa các tệp (giai đoạn C):
// dữ liệu vào thiệp demo phải y nguyên trước và sau. Không cần trình duyệt/dev server (đóng gói bằng esbuild rồi chạy trong Node).
// Dùng:
//   node scripts/check/demo-data.mjs --save <tệp.json>      chụp mốc
//   node scripts/check/demo-data.mjs --compare <tệp.json>   chụp lại, so với mốc (thoát mã 1 nếu khác)
// Nguồn: src/features/invitation/demo/buildDemoInv.ts (loadDemoInv: phần chung + specs/<id>/demo.json).
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const args = process.argv.slice(2);
const mode = args.includes("--save") ? "save" : args.includes("--compare") ? "compare" : null;
if (!mode) { console.error("Cần --save <tệp> hoặc --compare <tệp>"); process.exit(2); }
const file = args[args.indexOf("--" + mode) + 1];

const MOD = "src/features/invitation/demo/buildDemoInv.ts";
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "demo-data-"));
const entry = path.join(tmp, "entry.ts");
const abs = (p) => path.resolve(p).replace(/\\/g, "/");
// demo.json của từng mẫu tải theo nhu cầu (loadDemoInv) → chờ tải hết rồi mới xuất
fs.writeFileSync(entry, `import { loadDemoInv } from "${abs(MOD)}";
import { TEMPLATES } from "${abs("src/features/templates/data/templates.ts")}";
export const ALL = Object.fromEntries(await Promise.all(TEMPLATES.map(async (t) => [t.id, await loadDemoInv(t)])));
`);
const outfile = path.join(tmp, "out.mjs");
await build({
  entryPoints: [entry], outfile, bundle: true, format: "esm", platform: "node", logLevel: "error",
  alias: { "@": path.resolve("src") },
  define: { "import.meta.env": "{}" },
  loader: { ".css": "empty", ".webp": "empty", ".png": "empty", ".svg": "empty" },
});
const { ALL } = await import(pathToFileURL(outfile).href);
fs.rmSync(tmp, { recursive: true, force: true });

// sắp khóa để so sánh không phụ thuộc thứ tự khai báo trường
const sortKeys = (v) => Array.isArray(v) ? v.map(sortKeys) : v && typeof v === "object" ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])])) : v;
const now = sortKeys(JSON.parse(JSON.stringify(ALL)));
if (mode === "save") {
  fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(now, null, 1));
  console.log(`Đã chụp dữ liệu demo ${Object.keys(now).length} mẫu → ${file}`);
  process.exit(0);
}
const old = JSON.parse(fs.readFileSync(file, "utf8"));
let bad = 0;
for (const id of new Set([...Object.keys(old), ...Object.keys(now)])) {
  const a = old[id], b = now[id];
  if (JSON.stringify(a) === JSON.stringify(b)) continue;
  bad++;
  if (!a || !b) { console.log(`KHÁC ${id}: ${a ? "mất mẫu" : "mẫu mới"}`); continue; }
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
  console.log(`KHÁC ${id}: ${keys.join(", ")}`);
  for (const k of keys.slice(0, 3)) console.log(`    ${k}: ${JSON.stringify(a[k])?.slice(0, 110)} → ${JSON.stringify(b[k])?.slice(0, 110)}`);
}
console.log(`\n${Object.keys(now).length} mẫu, ${bad} mẫu khác mốc`);
process.exit(bad ? 1 : 0);
