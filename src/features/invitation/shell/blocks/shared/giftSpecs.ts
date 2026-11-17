import { useEffect, useState } from "react";
import { GIFT_LIGHT, GIFT_LOADERS } from "@/features/invitation/shell/specs/gift.generated";

/**
 * Dữ liệu khối "Hộp Quà Mừng" của từng mẫu, đo thật từ trang gốc.
 * Nguồn: `shell/specs/<id>/gift.json` — sinh bởi `scripts/clone/gen_gift_sections.cjs` (từ docs/survey/raw/gift_<id>.json),
 * khóa `assets` do `scripts/clone/gift_assets.mjs` ghi; chỉ mục `specs/gift.generated.ts` do `npm run gen:specs` sinh.
 * Phần nhẹ (kiểu hộp, ảnh, `legacy`) tra đồng bộ cho mọi mẫu; phần nặng (`GiftSpec`: markup khối + cửa sổ QR) tải theo
 * nhu cầu cho từng mẫu qua `loadGiftSpec` / `useGiftSpec`.
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

type GiftLight = { kind: GiftSpec["kind"]; assets?: GiftAssets; legacy?: GiftLegacy };
const LIGHT = GIFT_LIGHT as Record<string, GiftLight | undefined>;
const LEGACY: Record<string, GiftLegacy | undefined> = Object.fromEntries(Object.entries(LIGHT).map(([id, g]) => [id, g?.legacy]));

/** Kiểu hộp quà mặc định thật của mẫu (đo từ trang gốc); undefined nếu mẫu chưa có dữ liệu hộp quà. */
export const giftKindOf = (templateId: string): GiftSpec["kind"] | undefined => LIGHT[templateId]?.kind;
export const GIFT_ASSETS: Record<string, GiftAssets> = Object.fromEntries(Object.entries(LIGHT).map(([id, g]) => [id, g?.assets ?? {}]));

const specCache = new Map<string, GiftSpec | null>();
const specPending = new Map<string, Promise<GiftSpec | null>>();
/** Tải (một lần) dữ liệu khối hộp quà của mẫu; null nếu mẫu không có gift.json. */
export function loadGiftSpec(templateId: string): Promise<GiftSpec | null> {
  if (specCache.has(templateId)) return Promise.resolve(specCache.get(templateId)!);
  let p = specPending.get(templateId);
  if (!p) {
    const loader = GIFT_LOADERS[templateId];
    p = (loader ? loader() : Promise.resolve(null)).then((raw) => {
      let spec: GiftSpec | null = null;
      if (raw) { const { assets: _assets, legacy: _legacy, ...rest } = raw as GiftSpec & { assets?: GiftAssets; legacy?: GiftLegacy }; spec = rest; }
      specCache.set(templateId, spec);
      specPending.delete(templateId);
      return spec;
    });
    specPending.set(templateId, p);
  }
  return p;
}
/** Hook: dữ liệu khối hộp quà của mẫu; undefined trong lúc đang tải, null nếu mẫu không có. */
export function useGiftSpec(templateId: string): GiftSpec | null | undefined {
  const [spec, setSpec] = useState<GiftSpec | null | undefined>(() => specCache.get(templateId));
  useEffect(() => {
    let alive = true;
    const ready = specCache.get(templateId);
    setSpec(ready);
    if (ready === undefined) loadGiftSpec(templateId).then((v) => { if (alive) setSpec(v); });
    return () => { alive = false; };
  }, [templateId]);
  return spec;
}

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
