// Áp giftkit cho mọi khối (templates/<id>/blocks/*.tsx và templates/_shared/<họ>/*.tsx) có hộp quà.
// Chạy: node scripts/clone/apply_gift_generic.cjs [--dry]
const fs = require("fs");
const path = require("path");
const { useGiftGeneric } = require("./giftkit.cjs");

const { allBlockDirs } = require("../lib/template_paths.cjs");
const dry = process.argv.includes("--dry");
let changed = 0, same = 0, fail = [];
for (const { dir } of allBlockDirs()) {
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
