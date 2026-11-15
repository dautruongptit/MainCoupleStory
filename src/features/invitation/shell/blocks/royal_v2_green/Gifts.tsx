import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <div className="relative isolate w-full"><img alt="" aria-hidden="true" className="pointer-events-none absolute left-[-15%] top-[16%] z-[1] w-[34%] max-w-[150px] object-contain md:left-[4%]" src="/images/themes/royal-v2-green/leaf-decoration.webp" style={{ willChange: "transform", transform: "translateY(-30px) rotate(-140deg) scaleY(-1)" }} /><GiftsGeneric ctx={ctx} /></div>
  );
}
