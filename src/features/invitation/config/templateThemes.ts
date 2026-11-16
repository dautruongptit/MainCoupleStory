import { TEMPLATE_ROW_BY_ID, type TemplatePalette } from "@/features/templates/data/templates";

/** Bảng màu từng mẫu (nền thiệp, màu chữ chính, nền màn mở thiệp), trích từ trang demo thật của chungdoi.com.
 *  Nguồn: `specs/<id>/meta.json#palette` (mẫu chưa có bảng màu thì không có khóa ở đây). */
export type InvTheme = TemplatePalette;
export const TEMPLATE_THEMES: Record<string, InvTheme> = Object.fromEntries(
  Object.values(TEMPLATE_ROW_BY_ID).flatMap((r) => (r.palette ? [[r.id, r.palette] as const] : [])),
);
