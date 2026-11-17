import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <section className="relative isolate overflow-x-clip"><div className="relative mx-auto w-full max-w-[441px] md:max-w-[600px]"><div aria-hidden="true" className="pointer-events-none absolute inset-0"><img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-cover will-change-transform left-[-83px] top-[-42px] h-[391px] w-[130px] md:left-[-200px] md:top-[-57px] md:h-[532px] md:w-[177px]" src="/images/themes/silk-ribbon-green/line-decoration.webp" style={{ transform: "translateY(-70px) rotate(178.88deg)" }} /><img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-cover will-change-transform left-[-110px] top-[-17px] h-[200px] md:left-[-297px] md:top-[-69px] md:h-[400px]" src="/images/themes/silk-ribbon-green/flower-decoration.webp" style={{ transform: "translateY(-80px) rotate(50deg)" }} /></div><GiftsGeneric ctx={ctx} /></div></section>
  );
}
