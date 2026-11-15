import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <section className="relative isolate w-full px-[8.50%]" style={{ marginTop: "calc(0.05215 * var(--iv-w))" }}><GiftsGeneric ctx={ctx} /></section>
  );
}
