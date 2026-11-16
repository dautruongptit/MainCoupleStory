import { TEMPLATE_ROW_BY_ID } from "./templates";

/**
 * Điểm lấy nét (previewFocalPoint) của ảnh listing từng mẫu, đo từ kho mẫu của trang gốc.
 * Trang gốc dùng: object-position: center ${previewFocalPoint ?? 0}% cho ảnh listing (dải dọc) ở nút đổi mẫu và thẻ mẫu.
 * Nguồn: `specs/<id>/meta.json#previewFocal` (không có = 0).
 */
export const previewFocal = (templateId: string): number => TEMPLATE_ROW_BY_ID[templateId]?.previewFocal ?? 0;
