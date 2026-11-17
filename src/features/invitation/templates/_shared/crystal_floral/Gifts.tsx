import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getCrystalFloralThemeVars } from "./themeVars";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");
  const [isOpen, setIsOpen] = useState(false);
  if (!d.giftOn) return null;

  const accounts = (d?.bankAccounts && d.bankAccounts.length > 0)
    ? d.bankAccounts
    : vars.defaultAccounts;

  return (
    <GiftsGeneric ctx={ctx} />
  );
}
