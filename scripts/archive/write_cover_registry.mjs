import fs from 'fs';

const tplContent = fs.readFileSync('src/features/templates/data/templates.ts', 'utf8');
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];

const raw = JSON.parse(fs.readFileSync('scratch_raw_envelopes.json', 'utf8'));
const rawBySlug = {};
for (const [k, v] of Object.entries(raw)) {
  rawBySlug[v.slug] = v;
}

const componentMap = {
  '67993d': 'BaroquePorcelainCover',
  '694b87': 'FloralBouquetCover',
  'ae1685': 'MinimalismCover',
  '783589': 'PorcelainTileCover',
  'b71da8': 'ArchitecturalCover',
  '160052': 'TraditionalRoyalCover',
  '612c30': 'GlassGardenCover',
  '2f50d9': 'TraditionalV2Cover',
  'a2becd': 'SongHyClassicCover',
  '9dd0a3': 'SongLongCover',
  'b14ec9': 'SongLongCover',
  'dfcc37': 'SongLongCover',
  '55ebbc': 'SongHacCover',
  '6890ab': 'ChibiCover',
  '8ede96': 'CoBaCover',
  '59a8ef': 'LongPhungV2BesCover',
  'e2ea1b': 'LongPhungClassicCover',
  '9586b5': 'LongPhungImperialCover',
  '44d3c1': 'RoyalGoldCover',
  '537758': 'WildflowerCover',
  '041bef': 'MinimalismRedCover',
  '0f132a': 'ThanhDiepCover',
  '7fda2d': 'AnhDaoCover',
  '6c3e04': 'HoaMocNauCover',
  '020f8b': 'VuonXuanLamCover',
  'f88fc4': 'HoaKhoV2LamCover',
  '164e7c': 'HoaKhoV2XanhCover',
  'af36de': 'BaroqueLamCover',
};

let code = `/**
 * Registry màn hình Mở thiệp (Cover Screen) cho toàn bộ 75 mẫu thiệp.
 * Không dùng điều kiện rải rác trong Preview.tsx.
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

export const COVER_REGISTRY: Record<string, React.ComponentType<CoverProps>> = {
`;

for (const m of tplMatches) {
  const slug = m[1];
  const templateId = m[2];
  const r = rawBySlug[slug];
  const sig = r?.sig || 'general';
  const comp = componentMap[sig] || 'BaroquePorcelainCover';
  code += `  ${JSON.stringify(templateId)}: ${comp},\n`;
}

code += `};

export function getCoverComponent(templateId: string): React.ComponentType<CoverProps> {
  return COVER_REGISTRY[templateId] || BaroquePorcelainCover;
}

export * from "./types";
export * from "./coverConfigs";
export * from "./BaseCoverCard";
export * from "./SignatureCovers";
`;

fs.writeFileSync('src/features/invitation/components/covers/index.ts', code);
console.log('Successfully generated src/features/invitation/components/covers/index.ts with 75 templates.');
