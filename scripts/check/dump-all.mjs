// Chụp / so số đo MỌI mẫu (dùng trước và sau một thay đổi lớn về cách hiển thị thiệp).
// Dùng (dev server đang chạy; LOCAL_BASE mặc định http://localhost:8111):
//   node scripts/check/dump-all.mjs --save <thư mục mốc> [open:390 open:1280]   chụp mốc
//   node scripts/check/dump-all.mjs --compare <thư mục mốc> [open:390 ...]      chụp lại và so với mốc
// In từng mẫu GIỐNG/KHÁC; thoát mã 1 nếu có mẫu khác. Phần tử đếm ngược được bỏ qua (xem cmp_dumps.mjs).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const mode = args.includes("--save") ? "save" : args.includes("--compare") ? "compare" : null;
if (!mode) { console.error("Cần --save <dir> hoặc --compare <dir>"); process.exit(2); }
const dir = args[args.indexOf("--" + mode) + 1];
const specs = args.filter((a) => /^[a-z]+:\d+$/.test(a));
if (!specs.length) specs.push("open:390");
const only = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : null;
const env = { ...process.env, LOCAL_BASE: process.env.LOCAL_BASE || "http://localhost:8111" };
const tpl = fs.readFileSync("src/features/templates/data/templates.generated.ts", "utf8");
let ids = [...tpl.matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]);
if (only) ids = ids.filter((i) => only.includes(i));
fs.mkdirSync(dir, { recursive: true });

const node = (a) => spawnSync("node", a, { encoding: "utf8", env, maxBuffer: 32 * 1024 * 1024 });
const bad = [];
for (const id of ids) {
  let line = id.padEnd(28);
  for (const s of specs) {
    const [st, w] = s.split(":");
    const f = `local_${id}_dump_${st}_${w}.json`;
    let r = node(["scripts/survey/local_dump.mjs", id, st, w]);
    const empty = () => { try { return JSON.parse(fs.readFileSync(path.join("docs/survey/raw", f), "utf8")).recs.length < 20; } catch { return true; } };
    if (r.status !== 0 || empty()) r = node(["scripts/survey/local_dump.mjs", id, st, w]); // thử lại một lần (trang tải chậm)
    if (r.status !== 0 || empty()) { line += ` ${s}:LỖI-DUMP`; bad.push(id + " " + s); continue; }
    if (mode === "save") { fs.copyFileSync(path.join("docs/survey/raw", f), path.join(dir, f)); line += ` ${s}:lưu`; }
    else {
      const c = node(["scripts/check/cmp_dumps.mjs", dir, id, s]);
      const ok = c.status === 0;
      line += ` ${s}:${ok ? "GIỐNG" : "KHÁC"}`;
      if (!ok) { bad.push(id + " " + s); line += "\n" + (c.stdout || "").trim().split("\n").slice(0, 5).map((x) => "      " + x.slice(0, 170)).join("\n"); }
    }
  }
  console.log(line);
}
console.log(`\nTổng ${ids.length} mẫu × ${specs.length} màn — ${mode === "save" ? "lỗi chụp" : "khác/lỗi"}: ${bad.length}${bad.length ? "\n  " + bad.join("\n  ") : ""}`);
process.exit(bad.length ? 1 : 0);
