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

/** Một hộp nhỏ trang trí quanh hộp quà 3D (ảnh + vị trí). */
export interface MiniDecorConfig {
  src: string;
  style: string;
  className: string;
}
/**
 * Giá trị chép nguyên từ bảng cũ `giftboxConfigs.ts` (đã xóa), CHƯA đo lại trên trang gốc — viết tay, bộ sinh giữ nguyên.
 * 16 mẫu không có mục trong bảng cũ nên mang giá trị mặc định của bảng (`coverFlyDecor: true`, ảnh hộp nhat_binh_red).
 */
export interface GiftLegacy {
  /** Hoa trang trí trên bìa "bay về phía trước" khi mở thiệp (bảng cũ: chỉ khi hộp quà là hộp 3D) */
  coverFlyDecor: boolean;
  /** Ảnh hộp 3D dự phòng khi `assets.box` chưa có */
  mainBoxSrc?: string;
  /** Các hộp nhỏ quanh hộp 3D; mẫu không có thì mượn của minimalism_brown */
  miniImgs?: MiniDecorConfig[];
}

type GiftJson = GiftSpec & { assets?: GiftAssets; legacy?: GiftLegacy };
const ENTRIES = Object.entries(RAW_GIFT) as [string, GiftJson][];
const LEGACY: Record<string, GiftLegacy | undefined> = Object.fromEntries(ENTRIES.map(([id, g]) => [id, g.legacy]));

export const GIFT_SPECS: Record<string, GiftSpec> = Object.fromEntries(ENTRIES.map(([id, { assets: _assets, legacy: _legacy, ...spec }]) => [id, spec]));
export const GIFT_ASSETS: Record<string, GiftAssets> = Object.fromEntries(ENTRIES.map(([id, g]) => [id, g.assets ?? {}]));

/** Hoa trang trí bìa có bay khi mở thiệp không (mẫu lạ: có, như mặc định của bảng cũ). */
export const coverFlyDecor = (templateId: string): boolean => LEGACY[templateId]?.coverFlyDecor ?? true;
/** Các hộp nhỏ trang trí quanh hộp quà 3D của mẫu (không có thì mượn của minimalism_brown). */
export const giftMiniImgs = (templateId: string): MiniDecorConfig[] => {
  const own = LEGACY[templateId]?.miniImgs;
  return own && own.length ? own : (LEGACY["minimalism_brown"]?.miniImgs ?? []);
};
/** Ảnh hộp 3D dự phòng khi mẫu chưa có ảnh hộp thật (`GIFT_ASSETS[id].box`). */
export const giftMainBoxFallback = (templateId: string): string =>
  (LEGACY[templateId] ? LEGACY[templateId]!.mainBoxSrc : "/images/giftbox/nhat_binh_red.webp") || "/images/giftbox/minimalism_brown.webp";
