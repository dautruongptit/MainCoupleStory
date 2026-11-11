import React from "react";
import { isLightColor } from "@/features/invitation/shell/useInvitationCtx";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Dress({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  return (
    d.dressOn && (<section className="relative isolate flex w-full flex-col items-center py-2"><span aria-hidden="true" className="pointer-events-none absolute block z-[1] " style={{ left: "-4.3%", top: "-79px", width: "29.9%" }}><span className="block w-full" style={{ animation: "5.7s ease-in-out 0.4s infinite normal none running mgFloat", willChange: "transform" }}><img alt="" aria-hidden="true" className="block h-auto w-full max-w-none object-contain" loading="lazy" decoding="async" src={`${t.assets}/flower5.webp`} style={{ aspectRatio: "132 / 202" }} /></span></span><div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 relative z-10 flex w-full flex-col items-center"><div className="flex flex-col items-center gap-1"><h2 className="uppercase font-bold text-center relative z-10 text-[20px] md:text-[26px]" style={{ color: t.ink, fontFamily: "\"Times New Roman\", ChungDoiIndic, serif", fontWeight: "700" }}><span>{d.dressTitle || "DRESS CODE"}</span></h2><p className="whitespace-pre-line text-[13px] md:text-[15px] text-center" style={{ color: "rgb(169, 135, 78)", fontFamily: "\"Times New Roman\", ChungDoiIndic, serif" }}><span>{d.dressText}</span></p></div><div className="flex flex-wrap justify-center gap-4 md:gap-6">{d.dressColors.map((c, i) => (<div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: c, ...(isLightColor(c) ? { border: `1.5px solid rgba(46, 71, 51, 0.19)` } : {}) }}></div>))}</div></div></section>)
  );
}
