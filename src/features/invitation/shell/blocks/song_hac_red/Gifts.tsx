import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <section className="relative isolate overflow-x-clip mt-[23px] md:mt-[31px]"><div className="relative mx-auto w-full max-w-[441px] md:max-w-[600px]"><div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10"><img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain left-[-15.42%] h-auto w-[64.17%] opacity-20 top-[231px] md:top-[314px]" src="/images/themes/song-hac-red/bird-background.webp" style={{ willChange: "transform", transform: "translateY(0px)" }} /></div><GiftsGeneric ctx={ctx} /></div></section>
  );
}
