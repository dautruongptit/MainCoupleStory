import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <section className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))", paddingInline: "10.884%", paddingTop: "calc(0.24943 * var(--st-w))" }}><div className="pointer-events-none absolute z-0 flex items-center justify-center start-[-40.624%] top-[-30%] md:top-[-100%] w-[71.397%] aspect-[314.86/298.756]" aria-hidden="true"><img alt="" aria-hidden="true" className="w-[83.352%] aspect-[262.444/239.84] max-w-none object-contain will-change-transform" src="/images/themes/san-miguel-yellow/flower-gift.webp" style={{ transform: "translateY(-70px) rotate(14.75deg)" }} /></div><GiftsGeneric ctx={ctx} /></section>
  );
}
