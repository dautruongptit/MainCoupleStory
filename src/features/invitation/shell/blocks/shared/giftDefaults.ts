import { giftKindOf, type GiftSpec } from "./giftSpecs";

export const giftKindToMode = (kind: GiftSpec["kind"] | undefined): "gift_box" | "envelope" => (kind === "envelope" ? "envelope" : "gift_box");

/** Kiểu hiển thị hộp quà mặc định THẬT của mẫu (theo dữ liệu đo từ trang gốc); undefined nếu chưa có dữ liệu */
export const defaultGiftModeOf = (templateId: string): "gift_box" | "envelope" | undefined => {
  const kind = giftKindOf(templateId);
  return kind ? giftKindToMode(kind) : undefined;
};
