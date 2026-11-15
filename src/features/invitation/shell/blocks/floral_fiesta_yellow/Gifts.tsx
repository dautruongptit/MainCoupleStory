import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.giftOn) return null;
  return (
    <section className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}><div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10"><img alt="" aria-hidden="true" className="pointer-events-none absolute h-auto max-w-none object-contain w-[12.766%]" src="/images/themes/floral-fiesta-yellow/pattern5-decoration.webp" style={{ left: "6.417%", top: "calc(0.28435 * var(--st-w))", transform: "scaleX(-1) rotate(20.85deg)" }} /><img alt="" aria-hidden="true" className="pointer-events-none absolute h-auto max-w-none object-contain w-[18.322%]" src="/images/themes/floral-fiesta-yellow/pattern5-decoration.webp" style={{ left: "76.599%", top: "calc(0.49592 * var(--st-w))", transform: "rotate(20.85deg)" }} /><img alt="" aria-hidden="true" className="pointer-events-none absolute h-auto max-w-none object-contain w-[27.891%]" src="/images/themes/floral-fiesta-yellow/circlecolor2-decoration.webp" style={{ left: "3.401%", top: "calc(0.56236 * var(--st-w))", transform: "rotate(180deg)" }} /><img alt="" aria-hidden="true" className="pointer-events-none absolute h-auto max-w-none object-contain w-[27.891%]" src="/images/themes/floral-fiesta-yellow/circlecolor2-decoration.webp" style={{ left: "81.02%", top: "calc(0.32404 * var(--st-w))", transform: "scaleX(-1) rotate(-57.2deg)" }} /></div><GiftsGeneric ctx={ctx} /></section>
  );
}
