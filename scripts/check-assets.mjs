// Kiểm tra tài sản ảnh trong mã nguồn, không cần phụ thuộc nào:
//  1) cấm nhúng ảnh trực tiếp từ https://chungdoi.com/(images|icons)/ (máy chủ chặn hotlink: 403 + ORB)
//  2) mọi đường dẫn nội bộ /images/... và /icons/... phải có tệp tương ứng trong public/
// Chạy: npm run check:assets
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const srcDir = join(root, "src");
const exts = new Set([".ts", ".tsx", ".css", ".html"]);
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (exts.has(extname(p))) files.push(p);
  }
})(srcDir);
files.push(join(root, "index.html"));

const IMG = /\.(webp|jpg|jpeg|png|svg|gif)$/i;
const problems = [];
for (const f of files) {
  const text = readFileSync(f, "utf8");
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/https:\/\/chungdoi\.com\/(?:images|icons)\/[^\s"')]+/g)) {
      problems.push(`${f.replace(root, "")}:${i + 1}  hotlink bị chặn: ${m[0]}`);
    }
    for (const m of line.matchAll(/["'(](\/(?:images|icons)\/[^"')\s?#]+)/g)) {
      let rel = m[1];
      if (rel.includes("${")) continue; // đường dẫn ghép động, kiểm tra tay
      try { rel = decodeURIComponent(rel); } catch { /* giữ nguyên */ }
      if (IMG.test(rel) && !existsSync(join(root, "public", rel))) {
        problems.push(`${f.replace(root, "")}:${i + 1}  thiếu tệp public${rel}`);
      }
    }
  });
}
if (problems.length) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} vấn đề về tài sản ảnh.`);
  process.exit(1);
}
console.log(`OK: ${files.length} tệp đã quét, không có hotlink bị chặn và không thiếu tệp ảnh nội bộ.`);
