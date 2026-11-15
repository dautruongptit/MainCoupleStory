// Đặt giftDisplayMode của demo (specs/<id>/demo.json) = kiểu MẶC ĐỊNH mà markup đã đo của họ khối đang vẽ:
// khối nào chứa markup "ienv-" là phong bì, "igb-" là hộp quà 3D. Dùng cho mẫu chưa có số đo thật (nguồn local) để
// capture_gifts_local.mjs ghi đúng kiểu mặc định. In ra bảng id -> kiểu.
// Chạy: node scripts/clone/set_demo_gift_mode.cjs [--dry]
const fs = require("fs");
const path = require("path");
const dry = process.argv.includes("--dry");
const SPECS = "src/features/invitation/shell/specs";
const BLOCKS = "src/features/invitation/shell/blocks";

// markup mặc định có trong họ khối: đọc các tệp .tsx của thư mục họ (hoặc thư mục gốc blocks cho họ minimalism)
const kindOfFamily = (family) => {
  const dirs = [path.join(BLOCKS, family)];
  if (family === "minimalism") dirs.push(BLOCKS);
  let igb = false, ienv = false;
  for (const d of dirs) {
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d)) {
      if (!f.endsWith(".tsx")) continue;
      const t = fs.readFileSync(path.join(d, f), "utf8");
      if (!t.includes("Mở hộp mừng cưới")) continue;
      // bỏ phần fallback của GiftsGeneric không cần: markup nằm trong chính tệp
      if (/igb-bob|igb-box|igb-sparkle/.test(t)) igb = true;
      if (/ienv-card|ienv-back|ienv-sparkle/.test(t)) ienv = true;
    }
  }
  return ienv && !igb ? "envelope" : igb && !ienv ? "gift_box" : igb && ienv ? "both" : "none";
};

const rows = [];
for (const id of fs.readdirSync(SPECS)) {
  const cap = path.join(SPECS, id, "capabilities.json");
  if (!fs.existsSync(cap)) continue;
  const c = JSON.parse(fs.readFileSync(cap, "utf8"));
  const kind = kindOfFamily(c.family);
  rows.push([id, c.family, kind]);
  if (kind !== "envelope" && kind !== "gift_box") continue;
  const dp = path.join(SPECS, id, "demo.json");
  if (!fs.existsSync(dp)) continue;
  const raw = fs.readFileSync(dp, "utf8");
  const crlf = raw.includes("\r\n");
  const d = JSON.parse(raw);
  if (d.giftDisplayMode === kind) continue;
  d.giftDisplayMode = kind;
  if (!dry) { let out = JSON.stringify(d, null, 2) + "\n"; if (crlf) out = out.replace(/\n/g, "\r\n"); fs.writeFileSync(dp, out); }
}
for (const [id, fam, kind] of rows) console.log(id.padEnd(28), fam.padEnd(24), kind);
