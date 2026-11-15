// Thay phần "Hộp Quà Mừng" nằm trong một khối (Gifts.tsx hoặc khối lớn như Ceremony/Guestbook) bằng <GiftsGeneric ctx={ctx} />.
// Phần tử bị thay = phần tử nhỏ nhất chứa nút "Mở hộp mừng cưới", cửa sổ <dialog> và tiêu đề hộp quà.
// Dùng: const { useGiftGeneric } = require("./giftkit.cjs"); const out = useGiftGeneric(source);  // null nếu khối không có hộp quà
const ts = require("typescript");

const IMPORT = 'import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";\n';
const MARK = "Mở hộp mừng cưới";

function useGiftGeneric(src) {
  if (!src.includes(MARK)) return null;
  if (src.includes("<GiftsGeneric")) return src; // đã chuyển
  const sf = ts.createSourceFile("x.tsx", src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let best = null;
  const visit = (n) => {
    if (ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n)) {
      const t = n.getText();
      if (t.includes(MARK) && t.includes("<dialog") && /Hộp Quà|giftTitle|HỘP QUÀ/.test(t)) {
        if (!best || n.getEnd() - n.getStart() < best.getEnd() - best.getStart()) best = n;
      }
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  if (!best) return undefined; // có nút nhưng không tìm được khung bao
  let out = src.slice(0, best.getStart()) + "<GiftsGeneric ctx={ctx} />" + src.slice(best.getEnd());
  // thêm import sau import cuối cùng
  const imports = [...out.matchAll(/^import .*;\r?$/gm)];
  const last = imports[imports.length - 1];
  const at = last ? last.index + last[0].length : 0;
  out = out.slice(0, at) + "\n" + IMPORT.trimEnd() + out.slice(at);
  return out;
}

module.exports = { useGiftGeneric };
