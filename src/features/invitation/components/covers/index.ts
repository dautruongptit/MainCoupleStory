/**
 * Màn hình Mở thiệp (Cover Screen): tên component bìa của từng mẫu nằm ở `shell/specs/<id>/cover.json#component`
 * (mẫu không ghi thì dùng bìa mặc định). Thêm component bìa mới: import ở dưới rồi thêm vào COVER_COMPONENTS.
 */
import React from "react";
import type { CoverProps } from "./types";
import {
  BaroquePorcelainCover,
  FloralBouquetCover,
  MinimalismCover,
  PorcelainTileCover,
  ArchitecturalCover,
  TraditionalRoyalCover,
  GlassGardenCover,
  TraditionalV2Cover,
  SongHyClassicCover,
  SongLongCover,
  SongHacCover,
  ChibiCover,
  CoBaCover,
  LongPhungV2BesCover,
  LongPhungClassicCover,
  LongPhungImperialCover,
  RoyalGoldCover,
  WildflowerCover,
  MinimalismRedCover,
  ThanhDiepCover,
  AnhDaoCover,
  HoaMocNauCover,
  VuonXuanLamCover,
  HoaKhoV2LamCover,
  HoaKhoV2XanhCover,
  BaroqueLamCover,
} from "./SignatureCovers";
import { HoaTinhDoCover } from "./HoaTinhDoCover";
import { SongLongDoCover } from "./SongLongDoCover";
import { HoangKimLamCover } from "./HoangKimLamCover";
import { ChibiRedCover } from "./ChibiRedCover";
import { BachSuDoCover } from "./BachSuDoCover";
import { HoaMocXanhCover } from "./HoaMocXanhCover";

import { COVER_CONFIGS } from "./coverConfigs";

/** Tên component (ghi trong cover.json) → component. */
export const COVER_COMPONENTS: Record<string, React.ComponentType<CoverProps>> = {
  AnhDaoCover,
  ArchitecturalCover,
  BachSuDoCover,
  BaroqueLamCover,
  BaroquePorcelainCover,
  ChibiRedCover,
  CoBaCover,
  FloralBouquetCover,
  GlassGardenCover,
  HoaKhoV2LamCover,
  HoaKhoV2XanhCover,
  HoaMocNauCover,
  HoaTinhDoCover,
  HoangKimLamCover,
  LongPhungClassicCover,
  LongPhungImperialCover,
  LongPhungV2BesCover,
  MinimalismCover,
  MinimalismRedCover,
  PorcelainTileCover,
  RoyalGoldCover,
  SongHacCover,
  SongHyClassicCover,
  SongLongCover,
  ThanhDiepCover,
  TraditionalRoyalCover,
  TraditionalV2Cover,
  VuonXuanLamCover,
  WildflowerCover,
};

/** Component bìa của mẫu: theo `cover.json#component`; không có thì bìa mặc định. */
export function getCoverComponent(templateId: string): React.ComponentType<CoverProps> {
  const name = COVER_CONFIGS[templateId]?.component;
  return (name && COVER_COMPONENTS[name]) || BaroquePorcelainCover;
}

export * from "./types";
export * from "./coverConfigs";
export * from "./BaseCoverCard";
export * from "./SignatureCovers";
