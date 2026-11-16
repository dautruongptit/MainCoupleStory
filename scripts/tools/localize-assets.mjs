// Đổi mọi URL trỏ thẳng máy chủ của trang gốc trong mã nguồn sang đường dẫn local, để bản local không tải gì từ trang gốc:
//   https://assets.<gốc>/photo-library/...  → /images/photo-library/...
//   https://assets.<gốc>/music/...          → /music/...
//   https://<gốc>/api/qr-png?...            → /api/qr-png?...
// Chạy: node scripts/tools/localize-assets.mjs [--write]   (không --write: chỉ báo cáo; thoát mã 1 nếu còn URL trang gốc)
// Sau khi tải mẫu mới từ trang gốc (demo.json, khối sinh từ HTML thật) chạy lại lệnh này. Báo cả tệp local còn thiếu.
import fs from "node:fs";
import path from "node:path";

const write = process.argv.includes("--write");
const HOST = ["chungdoi", "com"].join(".");
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk("src").filter((f) => /\.(tsx?|json|css)$/.test(f));

const RULES = [
  [new RegExp(`https?://assets\\.${HOST.replace(".", "\\.")}/music/`, "g"), "/music/"],
  [new RegExp(`https?://assets\\.${HOST.replace(".", "\\.")}/`, "g"), "/images/"],
  [new RegExp(`https?://${HOST.replace(".", "\\.")}/api/qr-png`, "g"), "/api/qr-png"],
];
let changedFiles = 0, replaced = 0;
const missing = new Set();
for (const f of files) {
  const raw = fs.readFileSync(f, "utf8");
  let s = raw;
  for (const [re, to] of RULES) s = s.replace(re, () => { replaced++; return to; });
  // tệp local được nhắc tới phải tồn tại trong public/
  for (const m of s.matchAll(/["'`(](\/(?:images\/photo-library|music)\/[^"'`)\s?]+)/g)) if (!m[1].includes("${") && !fs.existsSync(path.join("public", m[1]))) missing.add(m[1]);
  if (s !== raw) { changedFiles++; if (write) fs.writeFileSync(f, s); }
}
// còn sót URL trang gốc nào khác (ngoài chữ hiển thị như email, tên miền trong đoạn giới thiệu, liên kết chia sẻ)?
const left = [];
for (const f of [...files, "index.html"]) {
  const s = fs.readFileSync(f, "utf8");
  for (const m of s.matchAll(new RegExp(`https?://[a-z0-9.-]*${HOST.replace(".", "\\.")}[^"'\`\\s)<]*`, "g"))) left.push(`${f}: ${m[0].slice(0, 90)}`);
}
console.log(`${write ? "ĐÃ GHI" : "(chỉ báo cáo — thêm --write để ghi)"}: ${replaced} URL trong ${changedFiles} tệp`);
console.log(`Tệp local còn thiếu trong public/: ${missing.size}`);
for (const m of [...missing].sort()) console.log("  " + m);
const leftUniq = [...new Set(left)];
console.log(`URL trang gốc còn lại trong mã: ${leftUniq.length}`);
for (const l of leftUniq.slice(0, 20)) console.log("  " + l);
process.exit(!write && replaced ? 1 : 0);
