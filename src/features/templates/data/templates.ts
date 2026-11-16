import { assetUrl } from "@/services/asset";
import { TEMPLATE_ROWS } from "./templates.generated";

export type Tpl = {
  slug: string;
  /** mã mẫu dùng trong ?template= */
  id: string;
  name: string;
  desc: string;
  img: string;
  full: string;
  badge?: "hot" | "new";
  tags: string[];
  /** chữ "Lời mở đầu" mặc định của mẫu (mẫu không có thì dùng "Save The Date") */
  introDefault?: string;
};

/** Bảng màu của mẫu (nền thiệp, màu chữ chính, nền màn mở thiệp), trích từ trang demo thật. */
export type TemplatePalette = { bg: string; ink: string; rgb: string; cover: string };

/** Một dòng danh mục = nội dung `specs/<id>/meta.json` (+ id là tên thư mục). */
export type TemplateRow = Tpl & {
  /** Điểm lấy nét ảnh listing (object-position: center N%), đo từ kho mẫu trang gốc */
  previewFocal?: number;
  palette?: TemplatePalette;
};

/** Kho ảnh xem trước của mẫu. */
export const TPL_CDN = assetUrl("/template-previews/vi/");

/**
 * Kho mẫu thiệp (nguồn: chungdoi.com/vi/mau-thiep, đúng thứ tự trên trang).
 * Dữ liệu nằm ở `src/features/invitation/shell/specs/<id>/meta.json`; `templates.generated.ts` do
 * `node scripts/clone/gen_spec_index.mjs` sinh. Thêm/sửa mẫu: sửa meta.json rồi chạy bộ sinh.
 */
const ROWS = TEMPLATE_ROWS as TemplateRow[];
export const TEMPLATE_ROW_BY_ID: Record<string, TemplateRow> = Object.fromEntries(ROWS.map((r) => [r.id, r]));

export const TEMPLATES: Tpl[] = ROWS.map(({ previewFocal: _f, palette: _p, ...tpl }) => tpl);

export const introDefaultFor = (templateId: string) => TEMPLATE_ROW_BY_ID[templateId]?.introDefault ?? "Save The Date";
export const templateById = (id?: string) => TEMPLATES.find((t) => t.id === id);
export const templateByIdOrSlug = (key?: string): Tpl | undefined => {
  if (!key) return undefined;
  const k = key.trim().toLowerCase();
  return (
    TEMPLATES.find((t) => t.id === k || t.slug === k) ||
    TEMPLATES.find((t) => t.id.replace(/_/g, "-") === k || t.slug.replace(/-/g, "_") === k)
  );
};
