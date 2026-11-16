import { RAW_GIFT } from "@/features/invitation/shell/specs/gift.generated";

/**
 * Dữ liệu khối "Hộp Quà Mừng" của từng mẫu, đo thật từ trang gốc.
 * Nguồn: `shell/specs/<id>/gift.json` — sinh bởi `scripts/clone/gen_gift_sections.cjs` (từ docs/survey/raw/gift_<id>.json),
 * khóa `assets` do `scripts/clone/gift_assets.mjs` ghi; chỉ mục `specs/gift.generated.ts` do `npm run gen:specs` sinh.
 * Không sửa tay gift.json: sửa bộ sinh rồi chạy lại.
 */
export type GiftKind = "3d-box" | "envelope";
export interface GiftSpec {
  /** real = đo thật từ trang gốc; local = lấy từ bản clone local (chưa có số đo thật) */
  source: "real" | "local";
  kind: GiftKind | "other";
  title: string;
  /** true: d.giftTitle ghi đè được tiêu đề; false: tiêu đề cố định của mẫu (vd song ngữ) */
  titleEditable: boolean;
  rootCls: string;
  rootStyle: string;
  headHtml: string;
  widgetHtml: string;
  ink: string;
  accent: string;
  dlgBefore: string;
  dlgItem: string;
  dlgAfter: string;
  /** màu nền cửa sổ QR (dùng cửa sổ chuẩn khi mẫu không có thẻ tài khoản tách được) */
  dlgBoxBg: string;
  dlgHeadBg: string;
}
/** Ảnh hộp quà của mẫu, đúng tên trên trang gốc (có mẫu dùng tên chung của họ, vd dragon_phoenix.webp); chỉ gồm ảnh đã có ở local. */
export type GiftAssets = { box?: string; mini?: string; envelope?: string };

type GiftJson = GiftSpec & { assets?: GiftAssets };
const ENTRIES = Object.entries(RAW_GIFT) as [string, GiftJson][];

export const GIFT_SPECS: Record<string, GiftSpec> = Object.fromEntries(ENTRIES.map(([id, { assets: _assets, ...spec }]) => [id, spec]));
export const GIFT_ASSETS: Record<string, GiftAssets> = Object.fromEntries(ENTRIES.map(([id, g]) => [id, g.assets ?? {}]));
