import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <div className="relative isolate z-10 overflow-x-clip"><img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain -left-[26%] top-[64px] w-[152%]" src="/images/themes/minimalism-dark-brown/castle2-background.webp" style={{ opacity: "0.15" }} /><GiftsGeneric ctx={ctx} /></div>
  );
}
