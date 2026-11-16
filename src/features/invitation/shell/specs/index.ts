import { RAW_SPECS } from "./index.generated";
import type { Inv } from "@/types/invitation";
import { buildTheme, type ThemeJson, type ThemeTokens } from "../theme";
import { editorSections, hasCoupleHero, type EditorSections } from "@/features/editor/config/editorSections";

export interface TemplateCapabilities {
  id: string;
  family: "minimalism" | "minimalism_purple" | "minimalism_green" | "riviera" | "traditional" | "darkred" | "longphung_v1" | "springgarden_v1" | "porcelain_v2" | "double_dragon" | "baroque_v2" | "crystal_floral" | "song_hy" | "boho_floral" | "lien_hoa_v2" | string;
  /** Class thêm vào khung ngoài của thiệp (vd "st-card" để đặt biến --st-w) */
  rootClass?: string;
  /** Class bọc các khối nội dung bên trong (khi decor nằm ngoài root thiệp) */
  innerClass?: string;
  /** Giá trị biến --st-w (mặc định "min(100vw, 480px)"); vài mẫu gốc dùng min(100vw, 900px) */
  stWidth?: string;
  testId: string;
  /** Thứ tự và tập khối được vẽ (tên khớp `blocks/index.ts`) */
  blocks: string[];
  cover: { seal: string; ambient: string; particle: string; skin: string };
  gift: { widget: "box3d" | "envelope" };
  hero: { kind: "photo" | "couple" | "watermark" | "none"; introLine: boolean; /** Hình khung ảnh đầu thiệp: quyết định khung thu nhỏ và khung cắt trong editor */ shape?: "circle" | "portrait" | "none" };
  album: { indicator: "counter" | "dots"; defaultLayout: string; };
  countdown: boolean;
  layout: { contentMaxMd: number; behaviorMd: "padded" | "fixed" | "stretch"; parallaxDecor: boolean };
  editor: {
    albumCardAfter: "hero" | "family" | "ceremony";
    cards: { hero: boolean; coupleHero: boolean; introLine: boolean };
    /** Đo thật từ editor trang gốc; chưa có ở mẫu này thì dùng ma trận 88 mẫu (`getEditorSections`). */
    sections?: EditorSections;
  };
  music: string;
}

export interface TemplateSpec {
  id: string;
  theme: ThemeTokens;
  capabilities: TemplateCapabilities;
  /** Dữ liệu demo của trang gốc, ghi đè lên dữ liệu demo chung */
  demo?: Partial<Inv>;
}

/**
 * Đăng ký mẫu mới: tạo thư mục `specs/<id>/{theme,capabilities,demo}.json` rồi chạy
 * `node scripts/clone/gen_spec_index.mjs` (sinh `index.generated.ts`). Không thêm tay ở đây.
 */
const SPECS: Record<string, TemplateSpec> = Object.fromEntries(
  Object.entries(RAW_SPECS).map(([id, raw]) => [
    id,
    {
      id,
      theme: buildTheme(raw.theme as ThemeJson),
      capabilities: raw.capabilities as TemplateCapabilities,
      ...(raw.demo ? { demo: raw.demo as Partial<Inv> } : {}),
    },
  ]),
);

/** Spec của mẫu (null = mẫu chưa có thư mục spec → thiệp báo "chưa được hỗ trợ"). */
export const getTemplateSpec = (templateId: string): TemplateSpec | null => SPECS[templateId] ?? null;
export const getCapabilities = (templateId: string): TemplateCapabilities | null => SPECS[templateId]?.capabilities ?? null;

export const getTemplateDemo = (templateId: string): Partial<Inv> | null => SPECS[templateId]?.demo ?? null;

/**
 * Hiện/ẩn thẻ editor theo mẫu. Ưu tiên `capabilities.editor.sections` (đo thật, mẫu đã clone);
 * mẫu chưa có spec riêng thì dùng ma trận đo từ 88 mẫu trang gốc (`editorSections`).
 */
export const getEditorSections = (templateId: string): EditorSections =>
  SPECS[templateId]?.capabilities?.editor?.sections ?? editorSections(templateId);

/**
 * Thẻ ảnh đầu thiệp dùng "Ảnh đôi" (2 ảnh riêng chú rể/cô dâu) hay "Ảnh đầu thiệp" (1 ảnh).
 * Cùng quy tắc ưu tiên như `getEditorSections`: mẫu đã có `editor.sections` đo thật thì theo
 * `editor.cards.coupleHero` của chính nó; mẫu chưa có thì theo ma trận đo 88 mẫu (`hasCoupleHero`) —
 * KHÔNG dùng trực tiếp `capabilities.editor.cards.coupleHero` cho mọi mẫu vì phần lớn giá trị đó
 * trong các capabilities.json sinh hàng loạt (đợt "upgrade 88 mẫu") là suy đoán, sai so với đo thật.
 */
export const getCoupleHero = (templateId: string): boolean =>
  SPECS[templateId]?.capabilities?.editor?.sections
    ? SPECS[templateId]!.capabilities.editor.cards.coupleHero
    : hasCoupleHero(templateId);
