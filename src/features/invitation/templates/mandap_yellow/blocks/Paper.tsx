import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20" style={{ backgroundImage: `url("${t.assets}/background-texture.webp")`, backgroundRepeat: "repeat", backgroundPosition: "left top", backgroundSize: "calc(1.00000 * var(--st-w)) calc(1.33333 * var(--st-w))" }}></div>
  );
}
