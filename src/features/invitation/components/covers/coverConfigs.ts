/**
 * Cấu hình màn hình Mở thiệp (Cover Screen) theo mẫu: màu thẻ, font, màu chữ, nút bấm, ảnh trang trí, hạt rơi,
 * con dấu, hiệu ứng mở… tương ứng từng mẫu trên chungdoi.com.
 * Nguồn: `shell/specs/<id>/cover.json` (mỗi mẫu một tệp; chỉ mục do `npm run gen:specs` sinh). Sửa cấu hình bìa ở đó.
 */
import { RAW_SPECS } from "@/features/invitation/shell/specs/index.generated";
import type { CoverConfig } from "./types";

export const COVER_CONFIGS: Record<string, CoverConfig> = Object.fromEntries(
  Object.entries(RAW_SPECS).flatMap(([id, s]) => (s.cover ? [[id, s.cover as CoverConfig] as const] : [])),
);
