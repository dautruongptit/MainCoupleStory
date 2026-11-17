import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <section className="relative isolate overflow-x-clip"><div className="relative mx-auto w-full max-w-[441px] md:max-w-[600px]"><div aria-hidden="true" className="pointer-events-none absolute inset-0"><img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-cover will-change-transform left-[-71px] top-[-53px] h-[421px] w-[141px] md:left-[-197px] md:top-[-72px] md:h-[572px] md:w-[192px]" src="/images/themes/silk-ribbon-pink/line-decoration.webp" style={{ transform: "translateY(-70px) rotate(171.08deg)" }} /><img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-cover will-change-transform left-[-111px] top-[-39px] h-[331px] w-[221px] md:left-[-231px] md:top-[-54px] md:h-[451px] md:w-[300px]" src="/images/themes/silk-ribbon-pink/flower-decoration.webp" style={{ transform: "translateY(-80px) rotate(35.78deg)" }} /></div><GiftsGeneric ctx={ctx} /></div></section>
  );
}
