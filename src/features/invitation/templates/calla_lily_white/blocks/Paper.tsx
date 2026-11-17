import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  return (
    <>
    <img alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover opacity-40" loading="eager" decoding="async" src={`${t.assets}/template-background.webp`} />
    </>
  );
}
