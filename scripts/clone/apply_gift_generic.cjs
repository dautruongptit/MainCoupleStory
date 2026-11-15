// Áp giftkit cho mọi khối trong src/features/invitation/shell/blocks/<họ>/*.tsx có hộp quà.
// Chạy: node scripts/clone/apply_gift_generic.cjs [--dry]
const fs = require("fs");
const path = require("path");
const { useGiftGeneric } = require("./giftkit.cjs");

const ROOT = "src/features/invitation/shell/blocks";
const dry = process.argv.includes("--dry");
let changed = 0, same = 0, fail = [];
for (const fam of fs.readdirSync(ROOT)) {
  const dir = path.join(ROOT, fam);
  if (!fs.statSync(dir).isDirectory() || fam === "shared") continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".tsx")) continue;
    const p = path.join(dir, f);
    const raw = fs.readFileSync(p, "utf8");
    const crlf = raw.includes("\r\n");
    const src = raw.replace(/\r\n/g, "\n");
    const out = useGiftGeneric(src);
    if (out === null) continue;
    if (out === undefined) { fail.push(p + " (không tìm thấy khung bao)"); continue; }
    if (out === src) { same++; continue; }
    changed++;
    if (!dry) fs.writeFileSync(p, crlf ? out.replace(/\n/g, "\r\n") : out);
  }
}
console.log(dry ? "[dry]" : "", "đã đổi:", changed, "| đã là GiftsGeneric:", same, "| lỗi:", fail.length);
for (const f of fail) console.log("  -", f);
