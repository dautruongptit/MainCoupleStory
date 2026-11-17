import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <div className="relative z-10 overflow-x-clip"><img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain left-[52%] top-[-14%] w-[62%]" src="/images/themes/minimalism-dark-blue/castle2-background.webp" style={{ opacity: "0.3" }} /><img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain left-[22%] top-[-18%] w-[64%]" src="/images/themes/minimalism-dark-blue/castle-background-1.webp" style={{ opacity: "0.2" }} /><GiftsGeneric ctx={ctx} /></div>
  );
}
