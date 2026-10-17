import React from "react";
import type { CoverProps } from "./types";
import { COVER_CONFIGS } from "./coverConfigs";
import { BaseCoverCard } from "./BaseCoverCard";

// Sig 67993d: Baroque & Porcelain V2 Family (21 templates)
export function BaroquePorcelainCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["silk_ribbon_green"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 694b87: Soft Floral Bouquet Family (7 templates)
export function FloralBouquetCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["jasmine_white"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig ae1685: Minimalism & Flora Family (6 templates)
export function MinimalismCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["minimalism_brown"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 783589: Porcelain Ceramic Tile Frame Family (3 templates)
export function PorcelainTileCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["porcelain_red"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig b71da8: Architectural & Cathedral Scene Family (3 templates)
export function ArchitecturalCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["florence_brown"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 160052: Traditional Royal Phoenix & Ancient Costume Family (3 templates)
export function TraditionalRoyalCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["double_phoenix_red"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 612c30: Glass Garden Morphism Family (3 templates)
export function GlassGardenCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["glass_garden_pink"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 2f50d9: Traditional V2 & Comic Art Family (4 templates)
export function TraditionalV2Cover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["song_hy_v2_red"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig a2becd: Classic Song Hy with Dual Xi Family (2 templates)
export function SongHyClassicCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["song_hy_red"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 9dd0a3, b14ec9, dfcc37: Twin Dragon Imperial Family (3 templates)
export function SongLongCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["double_dragon_red"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 55ebbc: Song Hạc Red Crane Family (1 template)
export function SongHacCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS["song_hac_red"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 6890ab: Chibi Illustration Family (1 template)
export function ChibiCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS["chibi_red"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 8ede96: Vintage Cô Ba Saigon Family (1 template)
export function CoBaCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS["co_ba_red"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 59a8ef: Long Phụng V2 Bespoke (1 template)
export function LongPhungV2BesCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS["dragon_phoenix_v2_red"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig e2ea1b: Long Phụng Traditional (2 templates)
export function LongPhungClassicCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["dragon_phoenix_red"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 9586b5: Long Phụng Imperial Blue/Green (2 templates)
export function LongPhungImperialCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["dragon_phoenix_green"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 44d3c1: Royal Gold Family (2 templates)
export function RoyalGoldCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["royal_red"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 537758: Wildflower & Sunflower Family (2 templates)
export function WildflowerCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS[d.templateId] || COVER_CONFIGS["hoa_dai_pink"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 041bef: Minimalism Red (1 template)
export function MinimalismRedCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS["minimalism_red"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 0f132a: Thanh Diệp Green Leaf (1 template)
export function ThanhDiepCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS["elegant_leaf_green"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 7fda2d: Cherry Blossom Pink (1 template)
export function AnhDaoCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS["cherry_blossom_pink"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 6c3e04: Boho Floral Brown (1 template)
export function HoaMocNauCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS["boho_floral_brown"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 020f8b: Spring Garden Blue (1 template)
export function VuonXuanLamCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS["spring_garden_blue"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig f88fc4: Dried Flower V2 Blue (1 template)
export function HoaKhoV2LamCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS["hoa_kho_v2_blue"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig 164e7c: Dried Flower V2 Green (1 template)
export function HoaKhoV2XanhCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS["dried_flower_v2_green"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}

// Sig af36de: Baroque Blue Pattern (1 template)
export function BaroqueLamCover({ d, onOpen }: CoverProps) {
  const config = COVER_CONFIGS["baroque_blue"];
  return <BaseCoverCard d={d} onOpen={onOpen} config={config} />;
}
