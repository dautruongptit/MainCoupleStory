import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20" style={{ backgroundImage: `url("${t.assets}/paper.webp")`, backgroundSize: "100% auto", backgroundRepeat: "repeat-y", opacity: "0.6" }}></div>
  );
}
