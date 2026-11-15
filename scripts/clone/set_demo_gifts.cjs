// Đặt tài khoản nhận quà (gifts) cho demo của từng mẫu: trang gốc luôn hiện khối "Hộp Quà Mừng" ở demo (có tài khoản mẫu).
// - Mẫu đã có số đo thật (docs/survey/raw/gift_<id>.json, source != local): lấy đúng các tài khoản trong cửa sổ QR thật.
// - Mẫu khác: một tài khoản chuẩn của demo gốc (Chú Rể - THIEP CUOI DEMO, Vietcombank 0000000000).
// Chỉ ghi vào demo.json khi `gifts` đang rỗng/thiếu. Chạy: node scripts/clone/set_demo_gifts.cjs [--dry]
const fs = require("fs");
const path = require("path");
const dry = process.argv.includes("--dry");
const SPECS = "src/features/invitation/shell/specs";
const RAW = "docs/survey/raw";
const BANKS = { Vietcombank: ["VCB", "970436"], Techcombank: ["TCB", "970407"], VietinBank: ["ICB", "970415"], BIDV: ["BIDV", "970418"], MBBank: ["MB", "970422"], ACB: ["ACB", "970416"], VPBank: ["VPB", "970432"], Agribank: ["VBA", "970405"], TPBank: ["TPB", "970423"], Sacombank: ["STB", "970403"] };
const unesc = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"');
const STD = [{ id: "g1", who: "groom", bankName: "Vietcombank", bankCode: "VCB", bankBin: "970436", accountNumber: "0000000000", accountName: "THIEP CUOI DEMO", qrUrl: "" }];

function fromReal(id) {
  const f = `${RAW}/gift_${id}.json`;
  if (!fs.existsSync(f)) return null;
  const o = JSON.parse(fs.readFileSync(f, "utf8"));
  if (o.source === "local" || !o.dialogHTML) return null;
  const items = o.dialogHTML.split('<div class="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none">').slice(1);
  const out = [];
  items.forEach((it, i) => {
    const h3 = /<h3[^>]*>([^<]*)<\/h3>/.exec(it);
    const ps = [...it.matchAll(/<p class="[^"]*"[^>]*>([^<]*)<\/p>/g)].map((m) => m[1]);
    const qr = /<img[^>]*src="([^"]*)"/.exec(it);
    if (!ps.length) return;
    const bank = BANKS[ps[0]] || ["", ""];
    out.push({ id: "g" + (i + 1), who: /Cô Dâu/i.test(h3 ? h3[1] : "") ? "bride" : "groom", bankName: ps[0], bankCode: bank[0], bankBin: bank[1], accountNumber: ps[1] || "", accountName: ps[2] || "", qrUrl: qr ? unesc(qr[1]) : "" });
  });
  return out.length ? out : null;
}

let n = 0;
for (const id of fs.readdirSync(SPECS)) {
  const dp = path.join(SPECS, id, "demo.json");
  if (!fs.existsSync(dp)) continue;
  const raw = fs.readFileSync(dp, "utf8");
  const crlf = raw.includes("\r\n");
  const d = JSON.parse(raw);
  const real = fromReal(id);
  const need = !("gifts" in d) || !Array.isArray(d.gifts) || d.gifts.length === 0;
  if (!need && !real) continue;
  const next = real || (need ? STD : null);
  if (!next) continue;
  d.giftOn = true;
  d.gifts = next;
  n++;
  if (!dry) { let out = JSON.stringify(d, null, 2) + "\n"; if (crlf) out = out.replace(/\n/g, "\r\n"); fs.writeFileSync(dp, out); }
}
console.log(dry ? "[dry]" : "", "đã đặt gifts cho", n, "mẫu");
