// Liệt kê module trong src/ không được tệp nào khác nhắc tới (ứng viên code chết). Chỉ báo cáo, không xóa.
// Dùng: node scripts/tools/find-unused.mjs
import fs from "node:fs";
import path from "node:path";

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk("src").filter((f) => /\.(tsx?|css)$/.test(f));
const texts = new Map(files.map((f) => [f, fs.readFileSync(f, "utf8")]));
texts.set("index.html", fs.readFileSync("index.html", "utf8"));
const ENTRY = new Set(["main", "vite-env.d"]);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const unused = [];
for (const f of files) {
  const base = path.basename(f).replace(/\.(tsx?|css)$/, "");
  if (ENTRY.has(base)) continue;
  // "index" được nhắc qua tên thư mục
  const name = base === "index" ? path.basename(path.dirname(f)) : base;
  const re = new RegExp(`["'/]${esc(name)}(\\.(tsx?|css|json))?["']`);
  let used = false;
  for (const [g, t] of texts) if (g !== f && re.test(t)) { used = true; break; }
  if (!used) unused.push(f.split(path.sep).join("/"));
}
console.log(unused.length ? unused.join("\n") : "(không có)");
