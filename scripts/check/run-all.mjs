// Bộ kiểm tra chung trước khi gộp mỗi giai đoạn tái cấu trúc (docs/playbook/refactor-plan.md mục 4.0).
// Dùng (cần dev server đang chạy, mặc định http://localhost:8111):
//   npm run check                  nhanh: tsc + số đo mốc 3 mẫu chuẩn + hộp quà 6 mẫu + editor-sync 2 mẫu
//   npm run check -- --full        đầy đủ: thêm build + hộp quà 92 mẫu (~30 phút) + hình học hộp quà
//   npm run check -- --baseline    chụp MỐC số đo mới vào docs/survey/baseline/<ngày>/ (làm trước khi bắt đầu giai đoạn)
// Thoát mã 1 nếu có mục không đạt; in bảng tóm tắt.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const base = args.includes("--base") ? args[args.indexOf("--base") + 1] : process.env.LOCAL_BASE || "http://localhost:8111";
const full = args.includes("--full");
const STD = ["minimalism_brown", "riviera_blue", "dragon_phoenix_v4_red"]; // 3 mẫu chuẩn
const SPECS = ["open:390", "openfull:390", "open:768", "open:1280"];
const GIFT_SAMPLE = ["minimalism_brown", "minimalism_darkred", "dragon_phoenix_red", "jasmine_green", "mahal_pink", "royal_blue"];
const SYNC_SAMPLE = ["minimalism_brown", "jasmine_green"];
const BASE_DIR = "docs/survey/baseline";

const results = [];
const run = (name, cmd, cmdArgs, env = {}) => {
  process.stdout.write(`▶ ${name} … `);
  const r = spawnSync(cmd, cmdArgs, { shell: process.platform === "win32", encoding: "utf8", env: { ...process.env, LOCAL_BASE: base, ...env }, maxBuffer: 64 * 1024 * 1024 });
  const ok = r.status === 0;
  const tail = ((r.stdout || "") + (r.stderr || "")).trim().split("\n").slice(-6).join("\n");
  console.log(ok ? "đạt" : "KHÔNG ĐẠT");
  if (!ok) console.log(tail.replace(/^/gm, "    "));
  results.push({ name, ok });
  return { ok, out: r.stdout || "" };
};

const dumpAll = () => {
  for (const id of STD) for (const s of SPECS) { const [st, w] = s.split(":"); run(`dump ${id} ${st} ${w}`, "node", ["scripts/survey/local_dump.mjs", id, st, w]); }
};

if (args.includes("--baseline")) {
  const day = new Date().toISOString().slice(0, 10);
  const dir = path.join(BASE_DIR, day);
  fs.mkdirSync(dir, { recursive: true });
  dumpAll();
  for (const id of STD) for (const s of SPECS) { const [st, w] = s.split(":"); const f = `local_${id}_dump_${st}_${w}.json`; fs.copyFileSync(path.join("docs/survey/raw", f), path.join(dir, f)); }
  fs.writeFileSync(path.join(BASE_DIR, "LATEST"), day + "\n");
  console.log(`\nĐã chụp mốc: ${dir}`);
  process.exit(results.every((r) => r.ok) ? 0 : 1);
}

// 1. kiểu
run("tsc", "npx", ["tsc", "--noEmit", "-p", "."]);
if (full) run("build", "npm", ["run", "build"]);

// 2. số đo so với mốc
const latest = fs.existsSync(path.join(BASE_DIR, "LATEST")) ? fs.readFileSync(path.join(BASE_DIR, "LATEST"), "utf8").trim() : null;
if (!latest) { console.log("⚠ chưa có mốc số đo — chạy: npm run check -- --baseline"); results.push({ name: "mốc số đo", ok: false }); }
else {
  dumpAll();
  for (const id of STD) run(`số đo ${id} so mốc ${latest}`, "node", ["scripts/check/cmp_dumps.mjs", path.join(BASE_DIR, latest), id, ...SPECS]);
}

// 3. hộp quà 3 kiểu
run(full ? "hộp quà 3 kiểu (92 mẫu)" : "hộp quà 3 kiểu (mẫu đại diện)", "node", ["scripts/check/gift-modes.mjs", ...(full ? ["--all"] : GIFT_SAMPLE), "--base", base]);
if (full) run("hình học hộp quà", "node", ["scripts/check/gift-geometry.mjs", "--base", base]);

// 4. editor <-> xem trước
for (const id of SYNC_SAMPLE) {
  const r = run(`editor-sync ${id}`, "node", ["scripts/check/editor-sync.mjs", id, "--base", base]);
  // chỉ tính FAIL chức năng; FAIL "(cấu trúc)" là khác biệt có sẵn so với editor gốc, không phải hồi quy
  const md = fs.existsSync(`docs/survey/editor-sync-${id}.md`) ? fs.readFileSync(`docs/survey/editor-sync-${id}.md`, "utf8") : "";
  const fails = md.split("\n").filter((l) => /FAIL/.test(l) && !/\(cấu trúc\)/.test(l));
  if (fails.length) { results[results.length - 1].ok = false; fails.slice(0, 3).forEach((l) => console.log("    " + l.slice(0, 140))); }
}

const bad = results.filter((r) => !r.ok);
console.log(`\n${results.length - bad.length}/${results.length} mục đạt${bad.length ? " — không đạt: " + bad.map((b) => b.name).join("; ") : ""}`);
process.exit(bad.length ? 1 : 0);
