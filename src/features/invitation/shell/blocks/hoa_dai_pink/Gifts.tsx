import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <section className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))", paddingInline: "21.882%" }}><GiftsGeneric ctx={ctx} /><img alt="" aria-hidden="true" className="pointer-events-none absolute z-[1] start-[87.528%] top-0 mt-[6.803%] aspect-[35/33] w-[7.937%] max-w-none object-contain will-change-transform hd-fall" src="/images/themes/hoa-dai-pink/flower-decoration.webp" style={{ animationDuration: "24.2s", animationDelay: "-1.3s", transform: "translateY(-85px) rotate(-90deg)" }} /><img alt="" aria-hidden="true" className="pointer-events-none absolute z-[1] start-[-2.494%] top-0 mt-[39.909%] aspect-[36/34] w-[8.163%] max-w-none object-contain will-change-transform hd-fall" src="/images/themes/hoa-dai-pink/flower-decoration.webp" style={{ animationDuration: "23.5s", animationDelay: "-6s", transform: "translateY(-85px) rotate(-90deg)" }} /><img alt="" aria-hidden="true" className="pointer-events-none absolute z-[1] start-[75.737%] top-0 mt-[71.655%] aspect-[21/20] w-[4.762%] max-w-none object-contain will-change-transform hd-fall" src="/images/themes/hoa-dai-pink/flower-decoration.webp" style={{ animationDuration: "32.8s", animationDelay: "-9.8s", transform: "translateY(-48px) rotate(-90deg) scaleY(-1)" }} /></section>
  );
}
