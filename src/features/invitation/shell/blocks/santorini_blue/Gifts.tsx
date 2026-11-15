import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <section className="relative isolate w-full px-[10.88%]" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}><GiftsGeneric ctx={ctx} /></section>
  );
}
