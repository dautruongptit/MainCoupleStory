// Một lần (giai đoạn A4): sắp lại scripts/ cấp 1.
//   check/  công cụ kiểm tra đang dùng    lib/  thư viện dùng chung (cdp_helper)    tools/  tiện ích build
//   archive/ mọi tệp cấp 1 còn lại (script chạy một lần, kết quả JSON, phân tích .py)
// Sửa: đường import cdp_helper, new URL("../...", import.meta.url) của tệp bị dời sâu thêm một cấp,
// và tham chiếu "scripts/<tên>" trong package.json, AGENTS.md, docs/*.md, scripts/**.
// Dùng: node scripts/tools/reorg-scripts.mjs [--dry]
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const dry = process.argv.includes("--dry");
const DEST = {
  "cmp_dumps.mjs": "check", "editor-sync.mjs": "check", "gift-geometry.mjs": "check", "gift-modes.mjs": "check",
  "audit.mjs": "check", "phase6_all.mjs": "check", "phase6_audit.mjs": "check", "check-assets.mjs": "check",
  "cdp_helper.mjs": "lib",
  "build-invitation-css.mjs": "tools",
};
const tracked = execFileSync("git", ["ls-files", "scripts"], { encoding: "utf8" }).split("\n").filter(Boolean);
const top = tracked.filter((f) => f.split("/").length === 2).map((f) => f.slice("scripts/".length));
const plan = top.map((f) => ({ f, to: `${DEST[f] || "archive"}/${f}` }));

console.log(`cấp 1: ${top.length} tệp → check ${plan.filter((p) => p.to.startsWith("check/")).length}, lib ${plan.filter((p) => p.to.startsWith("lib/")).length}, tools ${plan.filter((p) => p.to.startsWith("tools/")).length}, archive ${plan.filter((p) => p.to.startsWith("archive/")).length}`);
if (dry) process.exit(0);

for (const d of ["check", "lib", "tools", "archive"]) fs.mkdirSync(path.join("scripts", d), { recursive: true });
for (const p of plan) execFileSync("git", ["mv", path.join("scripts", p.f), path.join("scripts", p.to)]);
const movedTo = new Map(plan.map((p) => [p.f, p.to]));

// tệp văn bản cần sửa tham chiếu
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const scriptFiles = walk("scripts").filter((f) => /\.(m?js|cjs)$/.test(f) && !path.basename(f).startsWith("_"));
const docFiles = ["package.json", "AGENTS.md", ...walk("docs").filter((f) => f.endsWith(".md"))];
const LIB = path.join("scripts", "lib", "cdp_helper.mjs");

let edits = 0;
for (const file of [...scriptFiles, ...docFiles]) {
  const raw = fs.readFileSync(file, "utf8");
  let s = raw;
  // 1) tham chiếu "scripts/<tên>" -> đường mới (cả dạng / và \ đầu chuỗi)
  for (const [f, to] of movedTo) s = s.split(`scripts/${f}`).join(`scripts/${to}`);
  if (/\.(m?js|cjs)$/.test(file)) {
    // 2) import cdp_helper theo vị trí tương đối mới
    let rel = path.relative(path.dirname(file), LIB).split(path.sep).join("/");
    if (!rel.startsWith(".")) rel = "./" + rel;
    s = s.replace(/(["'])(?:\.{1,2}\/)+(?:lib\/)?cdp_helper\.mjs\1/g, `$1${rel}$1`);
    // 3) tệp vừa bị dời từ scripts/ xuống scripts/<thư mục>/: đường tương đối theo import.meta.url phải lùi thêm một cấp
    const base = path.basename(file);
    if (movedTo.has(base) && path.dirname(file) !== "scripts") {
      s = s.replace(/new URL\((["'])(\.\.?\/)/g, (m, q, pre) => `new URL(${q}${pre === "./" ? "../" : "../../"}`);
      s = s.replace(/new URL\((["'])\.\.\/\.\.\/(cdp_helper|survey|clone|check|tools|lib)\//g, (m, q, d) => `new URL(${q}../${d}/`);
    }
  }
  if (s !== raw) { fs.writeFileSync(file, s); edits++; }
}
console.log("đã sửa tham chiếu trong", edits, "tệp");
