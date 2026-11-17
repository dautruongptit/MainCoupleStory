import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <section className="relative isolate overflow-x-clip mt-[23px] md:mt-[31px]"><div className="relative mx-auto w-full max-w-[441px] md:max-w-[600px]"><div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10"><img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain bottom-[-38%] -left-[191px] h-[239px] w-[824px] opacity-40 md:-left-[260px] md:h-[325px] md:w-[1121px]" src="/images/themes/song-hy-v2-red/cloud-pattern.webp" /></div><GiftsGeneric ctx={ctx} /></div></section>
  );
}
