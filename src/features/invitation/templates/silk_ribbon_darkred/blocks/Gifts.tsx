import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <section className="relative isolate overflow-x-clip"><div className="relative mx-auto w-full max-w-[441px] md:max-w-[600px]"><div aria-hidden="true" className="pointer-events-none absolute inset-0"><img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-cover will-change-transform left-[-70px] top-[-57px] h-[413px] w-[138px] md:left-[-200px] md:top-[-78px] md:h-[562px] md:w-[188px]" src="/images/themes/silk-ribbon-darkred/line-decoration.webp" style={{ transform: "translateY(-70px) rotate(175.05deg)" }} /><img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-cover will-change-transform left-[-91px] top-[-64px] h-[290px] w-[235px] md:left-[-223px] md:top-[10px] md:h-[415px]" src="/images/themes/silk-ribbon-darkred/flower-decoration.webp" style={{ transform: "translateY(-80px) rotate(-159.58deg) scaleY(-1)" }} /></div><GiftsGeneric ctx={ctx} /></div></section>
  );
}
