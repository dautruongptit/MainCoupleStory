// Giai đoạn D2 (chạy một lần): chuyển cấu hình và khối của từng mẫu về một thư mục.
//   shell/specs/<id>/*.json            → templates/<id>/*.json
//   shell/specs/{index.ts,*.generated.ts,specs.test.ts} → templates/
//   shell/blocks/<họ>/  (họ chỉ một mẫu dùng) → templates/<id của mẫu đó>/blocks/
//   shell/blocks/<họ>/  (họ nhiều mẫu dùng)   → templates/_shared/<họ>/
// Giữ nguyên ở shell/blocks/: khối nền "minimalism" (*.tsx), shared/, index.ts, families.generated.ts.
// Dùng `git mv` (giữ lịch sử) rồi sửa import: `../index` trong thư mục khối và mọi alias "@/features/invitation/shell/specs".
// Dùng: node scripts/tools/move-templates.mjs [--dry]
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const dry = process.argv.includes("--dry");
const INV = "src/features/invitation";
const SPECS = `${INV}/shell/specs`;
const BLOCKS = `${INV}/shell/blocks`;
const OUT = `${INV}/templates`;
const KEEP_IN_BLOCKS = new Set(["shared"]);
const P = (p) => p.split(path.sep).join("/");

if (!fs.existsSync(SPECS)) { console.log("Đã chuyển rồi (không còn shell/specs)."); process.exit(0); }

// họ → các mẫu dùng
const famUsers = {};
const ids = fs.readdirSync(SPECS, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
for (const id of ids) {
  const fam = JSON.parse(fs.readFileSync(`${SPECS}/${id}/capabilities.json`, "utf8")).family;
  (famUsers[fam] = famUsers[fam] || []).push(id);
}
const moves = []; // [từ, tới] (thư mục hoặc tệp)
for (const id of ids) moves.push([`${SPECS}/${id}`, `${OUT}/${id}`]);
for (const e of fs.readdirSync(SPECS, { withFileTypes: true })) if (e.isFile()) moves.push([`${SPECS}/${e.name}`, `${OUT}/${e.name}`]);
const famDir = {};
for (const e of fs.readdirSync(BLOCKS, { withFileTypes: true })) {
  if (!e.isDirectory() || KEEP_IN_BLOCKS.has(e.name)) continue;
  const users = famUsers[e.name] || [];
  if (!users.length) throw new Error(`thư mục khối "${e.name}" không mẫu nào dùng — xử lý tay trước khi chuyển`);
  famDir[e.name] = users.length === 1 ? `${OUT}/${users[0]}/blocks` : `${OUT}/_shared/${e.name}`;
}
console.log(`mẫu: ${ids.length}; họ khối chuyển: ${Object.keys(famDir).length} (dùng chung: ${Object.values(famDir).filter((d) => d.includes("/_shared/")).length})`);
if (dry) { for (const [f, d] of Object.entries(famDir)) if (!d.endsWith(`/${f}/blocks`)) console.log(`  ${f} → ${d}`); process.exit(0); }

const git = (...a) => execFileSync("git", a, { stdio: ["ignore", "pipe", "inherit"] });
fs.mkdirSync(`${OUT}/_shared`, { recursive: true });
// 1. specs trước (tạo thư mục templates/<id>), rồi khối
for (const [from, to] of moves) git("mv", from, to);
for (const [fam, to] of Object.entries(famDir)) { fs.mkdirSync(path.dirname(to), { recursive: true }); git("mv", `${BLOCKS}/${fam}`, to); }
if (fs.existsSync(SPECS) && !fs.readdirSync(SPECS).length) fs.rmdirSync(SPECS);

// 2. sửa import
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
let changed = 0;
for (const f of walk("src").map(P).filter((x) => /\.(tsx?|css)$/.test(x))) {
  const raw = fs.readFileSync(f, "utf8");
  let s = raw;
  // alias tới thư mục specs cũ
  s = s.split("@/features/invitation/shell/specs").join("@/features/invitation/templates");
  // `../index` trong thư mục khối đã chuyển (kiểu BlockComponent) → alias tới shell/blocks
  if (f.startsWith(`${OUT}/`) && (f.includes("/blocks/") || f.includes("/_shared/"))) {
    s = s.replace(/(from\s+["'])\.\.\/index(["'])/g, `$1@/features/invitation/shell/blocks$2`);
  }
  // templates/index.ts trước đây nằm trong shell/ nên import "../theme"
  if (f === `${OUT}/index.ts`) s = s.replace(/(from\s+["'])\.\.\/theme(["'])/g, `$1@/features/invitation/shell/theme$2`);
  if (s !== raw) { fs.writeFileSync(f, s); changed++; }
}
console.log(`đã chuyển ${moves.length} mục cấu hình + ${Object.keys(famDir).length} thư mục khối; sửa import ở ${changed} tệp`);
