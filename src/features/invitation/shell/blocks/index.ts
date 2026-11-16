import type { ComponentType } from "react";
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
import { FAMILY_BLOCKS } from "./families.generated";

export type BlockComponent = ComponentType<{ ctx: InvitationCtx }>;

/** Khối bố cục họ "minimalism" (họ gốc, nằm ngay trong thư mục này). `capabilities.json#blocks` quyết định khối nào được vẽ và theo thứ tự nào. */
export const MINIMALISM_BLOCKS: Record<string, BlockComponent> = {
  Backdrop, Hero, Family, Album, Banquet, Venue, Dress, Schedule, Guestbook, Gifts, Thanks, Credit, RsvpDialogHost, Lightbox,
};

/** Khối dùng chung mọi họ bố cục */
export const COMMON_BLOCKS: Record<string, BlockComponent> = { Credit, RsvpDialogHost };

/**
 * Họ bố cục -> bản đồ khối; `capabilities.family` chọn bản đồ, `capabilities.blocks` chọn khối & thứ tự.
 * Các họ khác "minimalism" là thư mục con `blocks/<họ>/` — đăng ký tự động trong `families.generated.ts`
 * (`npm run gen:specs`); họ không có thư mục thì dùng khối "minimalism".
 */
export const blocksForFamily = (family: string): Record<string, BlockComponent> => ({
  ...COMMON_BLOCKS,
  ...(FAMILY_BLOCKS[family] ?? MINIMALISM_BLOCKS),
});
