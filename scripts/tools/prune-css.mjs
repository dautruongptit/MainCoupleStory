// Tìm (và tùy chọn xóa) luật CSS cũ không còn class nào trong mã nguồn dùng tới.
// Một class coi là "còn dùng" nếu tên nó xuất hiện trong src/**/*.{ts,tsx,html} hoặc index.html (kể cả trong chuỗi),
// hoặc mã nguồn có ghép chuỗi động với tiền tố của nó (vd `sp-${x}`, "theme-" + y).
// Một luật bị xóa khi MỌI selector của nó đều chứa ít nhất một class không còn dùng. @keyframes giữ nếu tên còn được nhắc.
// Dùng: node scripts/tools/prune-css.mjs [--write] [tệp.css ...]   (mặc định: src/styles/styles.css src/styles/pages.css)
import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";

const args = process.argv.slice(2);
const write = args.includes("--write");
const targets = args.filter((a) => a.endsWith(".css"));
if (!targets.length) targets.push("src/styles/styles.css", "src/styles/pages.css");

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
// .json: cấu hình từng mẫu (specs/<id>/cover.json, gift.json) cũng chứa class — không quét thì xóa nhầm class của bìa
const srcFiles = walk("src").filter((f) => /\.(tsx?|html|json)$/.test(f));
const code = srcFiles.map((f) => fs.readFileSync(f, "utf8")).join("\n") + "\n" + fs.readFileSync("index.html", "utf8");
// CSS khác (ngoài tệp đang dọn) cũng có thể nhắc tên keyframes
const otherCss = walk("src").filter((f) => f.endsWith(".css") && !f.includes("generated")).map((f) => [f, fs.readFileSync(f, "utf8")]);

// token trong mã: mọi dãy ký tự hợp lệ của tên class
const tokens = new Set(code.match(/[A-Za-z_][A-Za-z0-9_-]*/g) || []);
// tiền tố ghép động: `abc-${...}`, "abc-" + x, 'abc-' + x
const dynPrefixes = new Set();
for (const m of code.matchAll(/([A-Za-z_][A-Za-z0-9_-]*-)\$\{/g)) dynPrefixes.add(m[1]);
for (const m of code.matchAll(/["'`]([A-Za-z_][A-Za-z0-9_-]*-)["'`]\s*\+/g)) dynPrefixes.add(m[1]);
// class có ký tự đặc biệt (md:h-80, w-[340px], top-1/2…) không tách được thành token → dò nguyên chuỗi
const used = (cls) => tokens.has(cls) || (/[^A-Za-z0-9_-]/.test(cls) && code.includes(cls)) || [...dynPrefixes].some((p) => cls.startsWith(p));

const classesOf = (sel) => [...sel.matchAll(/\.((?:\\.|[A-Za-z0-9_-])+)/g)].map((m) => m[1].replace(/\\(.)/g, "$1"));
let totalRemoved = 0, totalBytes = 0;
for (const file of targets) {
  const raw = fs.readFileSync(file, "utf8");
  const crlf = raw.includes("\r\n");
  const root = postcss.parse(raw.replace(/\r\n/g, "\n"));
  let removed = 0;
  const deadClasses = new Set();
  root.walkRules((rule) => {
    if (rule.parent && rule.parent.type === "atrule" && /keyframes$/.test(rule.parent.name)) return;
    const keep = rule.selectors.filter((sel) => {
      const cls = classesOf(sel);
      const dead = cls.filter((c) => !used(c));
      dead.forEach((c) => deadClasses.add(c));
      return dead.length === 0;
    });
    if (keep.length === 0) { rule.remove(); removed++; }
    else if (keep.length !== rule.selectors.length) rule.selectors = keep;
  });
  // at-rule rỗng sau khi xóa (media/supports)
  root.walkAtRules((at) => { if (/^(media|supports|layer)$/.test(at.name) && at.nodes && at.nodes.length === 0) at.remove(); });
  // keyframes không còn ai nhắc
  const rest = () => root.toString() + otherCss.filter(([f]) => path.resolve(f) !== path.resolve(file)).map(([, t]) => t).join("\n") + code;
  let kf = 0;
  root.walkAtRules(/keyframes$/, (at) => {
    const name = at.params.trim();
    const text = rest();
    const count = text.split(name).length - 1;
    if (count <= 1) { at.remove(); kf++; }
  });
  let out = root.toString().replace(/\n{3,}/g, "\n\n");
  if (crlf) out = out.replace(/\n/g, "\r\n");
  console.log(`${file}: xóa ${removed} luật, ${kf} keyframes, ${deadClasses.size} class chết; ${raw.length} → ${out.length} byte`);
  if (args.includes("--list")) console.log("  " + [...deadClasses].sort().join(" "));
  totalRemoved += removed + kf; totalBytes += raw.length - out.length;
  if (write) fs.writeFileSync(file, out);
}
console.log(`${write ? "ĐÃ GHI" : "(chỉ báo cáo — thêm --write để ghi)"}: ${totalRemoved} khối, giảm ${(totalBytes / 1024).toFixed(0)} KB`);
