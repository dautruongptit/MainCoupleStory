import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <div className="relative isolate z-10"><div className="relative mx-auto w-full max-w-[441px] md:max-w-[620px]"><div aria-hidden="true" className="pointer-events-none absolute inset-0 rtl:-scale-x-100 z-[1]"><span aria-hidden="true" className="pointer-events-none absolute block -translate-x-1/2 -translate-y-1/2 hk-float left-[90.7%] md:left-[98%] top-[20.84%] w-[12.71%]" style={{ animation: "6.5s ease-in-out 1.2s infinite normal none running hkFloat", willChange: "transform" }}><img alt="" className="block w-full max-w-none object-contain rotate-[149.99deg] -scale-y-100" src="/images/themes/hoa-kho-v2-blue/butterfly.webp" /></span></div><GiftsGeneric ctx={ctx} /></div></div>
  );
}
