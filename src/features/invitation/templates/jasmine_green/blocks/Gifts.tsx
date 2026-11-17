import React from "react";
import { AltGiftWidget } from "@/features/invitation/shell/blocks/shared/GiftWidgets";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d, t, g, giftModalOpen, setGiftModalOpen, giftTitle, saveQr } = ctx;
  return (
    d.giftOn && d.gifts.length > 0 && (<GiftsGeneric ctx={ctx} />)
  );
}
