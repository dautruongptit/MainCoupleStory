import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <div className="relative"><img alt="" aria-hidden="true" className="pointer-events-none absolute -top-[40px] -right-[40%] w-[120%] md:w-[80%] h-auto object-contain opacity-15 -z-10" src="/images/themes/chateau-green/hoanho2-1.webp" style={{ transform: "rotate(-43.51deg)" }} /><GiftsGeneric ctx={ctx} /></div>
  );
}
