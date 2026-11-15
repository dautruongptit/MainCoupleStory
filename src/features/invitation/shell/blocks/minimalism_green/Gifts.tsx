import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <div className="relative z-10 overflow-x-clip"><div aria-hidden="true" className="pointer-events-none absolute flex items-center left-[-204.99px] top-[-190px] md:left-[160px] md:top-[-120px]" style={{ width: "1016.9px", height: "935.835px", padding: "0px 61px" }}><div className="absolute flex items-center justify-center" style={{ left: "121px", top: "0px", width: "894.897px", height: "935.835px" }}><div style={{ transform: "scaleY(-1) rotate(165.75deg)" }}><img alt="" className="max-w-none object-cover opacity-10" src="/images/themes/minimalism-green/flower-background.webp" style={{ width: "724.801px", height: "781.426px" }} /></div></div></div><GiftsGeneric ctx={ctx} /></div>
  );
}
