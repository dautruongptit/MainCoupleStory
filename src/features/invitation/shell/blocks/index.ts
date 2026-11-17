import { useEffect, useState, type ComponentType } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { Backdrop } from "./Backdrop";
import { Hero } from "./Hero";
import { Family } from "./Family";
import { Album } from "./Album";
import { Banquet } from "./Banquet";
import { Venue } from "./Venue";
import { Dress } from "./Dress";
import { Schedule } from "./Schedule";
import { Guestbook } from "./Guestbook";
import { Gifts } from "./Gifts";
import { Thanks } from "./Thanks";
import { Credit } from "./Credit";
import { RsvpDialogHost } from "./RsvpDialogHost";
import { Lightbox } from "./Lightbox";
import { FAMILY_LOADERS } from "./families.generated";

export type BlockComponent = ComponentType<{ ctx: InvitationCtx }>;
export type BlockMap = Record<string, BlockComponent>;

/** Khối bố cục họ "minimalism" (họ gốc, nằm ngay trong thư mục này). `capabilities.json#blocks` quyết định khối nào được vẽ và theo thứ tự nào. */
export const MINIMALISM_BLOCKS: BlockMap = {
  Backdrop, Hero, Family, Album, Banquet, Venue, Dress, Schedule, Guestbook, Gifts, Thanks, Credit, RsvpDialogHost, Lightbox,
};

/** Khối dùng chung mọi họ bố cục */
export const COMMON_BLOCKS: BlockMap = { Credit, RsvpDialogHost };

/**
 * Họ bố cục -> bản đồ khối; `capabilities.family` chọn bản đồ, `capabilities.blocks` chọn khối & thứ tự.
 * Các họ khác "minimalism" là thư mục con `blocks/<họ>/` — đăng ký tự động trong `families.generated.ts`
 * (`npm run gen:specs`) và được TẢI THEO NHU CẦU (mỗi họ một tệp JS riêng): trang chỉ tải họ của mẫu đang xem.
 * Họ không có thư mục thì dùng khối "minimalism".
 */
const cache = new Map<string, BlockMap>();
const pending = new Map<string, Promise<BlockMap>>();

/** Tải (một lần) bản đồ khối của họ. */
export function loadBlocksForFamily(family: string): Promise<BlockMap> {
  const done = cache.get(family);
  if (done) return Promise.resolve(done);
  let p = pending.get(family);
  if (!p) {
    const loader = FAMILY_LOADERS[family];
    p = (loader ? loader() : Promise.resolve(MINIMALISM_BLOCKS)).then((blocks) => {
      const map = { ...COMMON_BLOCKS, ...blocks };
      cache.set(family, map);
      pending.delete(family);
      return map;
    });
    pending.set(family, p);
  }
  return p;
}

/** Bản đồ khối của họ nếu đã tải xong (null = chưa). */
export const loadedBlocksForFamily = (family: string): BlockMap | null => cache.get(family) ?? null;

/** Hook: bản đồ khối của họ; null trong lúc đang tải (lần đầu xem một họ). */
export function useFamilyBlocks(family: string): BlockMap | null {
  const [blocks, setBlocks] = useState<BlockMap | null>(() => loadedBlocksForFamily(family));
  useEffect(() => {
    let alive = true;
    const ready = loadedBlocksForFamily(family);
    setBlocks(ready);
    if (!ready) loadBlocksForFamily(family).then((b) => { if (alive) setBlocks(b); });
    return () => { alive = false; };
  }, [family]);
  return blocks;
}
