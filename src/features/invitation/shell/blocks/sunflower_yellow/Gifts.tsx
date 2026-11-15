import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <div className="relative isolate z-10 overflow-x-clip"><img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain right-[-10%] top-[-7%] w-[64%]" src="/images/themes/sunflower/flower2.webp" style={{ opacity: "0.07", transform: "rotate(-23.8deg)" }} /><GiftsGeneric ctx={ctx} /></div>
  );
}
