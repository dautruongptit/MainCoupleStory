import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <div className="relative isolate z-10"><div className="relative mx-auto w-full max-w-[441px] md:max-w-[620px]"><div aria-hidden="true" className="pointer-events-none absolute inset-0 rtl:-scale-x-100 -z-10"><span aria-hidden="true" className="pointer-events-none absolute block -translate-x-1/2 -translate-y-1/2 left-[74.94%] top-[79.16%] w-[97.73%]" style={{ willChange: "transform", transform: "translateY(-48px)" }}><img alt="" className="block w-full max-w-none object-contain -scale-y-100 rotate-[-160.51deg] opacity-7" src="/images/themes/dried-flower-v2-green/flower4.webp" /></span></div><GiftsGeneric ctx={ctx} /></div></div>
  );
}
