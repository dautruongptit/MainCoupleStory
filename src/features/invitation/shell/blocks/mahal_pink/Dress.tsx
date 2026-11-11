import React from "react";
import { isLightColor } from "@/features/invitation/shell/useInvitationCtx";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Dress({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  return (
    d.dressOn && (<div className="relative isolate z-10 pt-[7%] md:pt-[4%]"><div aria-hidden="true" className="pointer-events-none absolute bg-contain bg-center bg-no-repeat left-[-7.26%] top-0 z-[1] mt-[-19.05%] w-[38.1%] md:left-[-4%] md:w-[28%]" style={{ willChange: "transform", aspectRatio: "1086 / 1448", backgroundImage: `url("${t.assets}/house3.webp")`, transform: "translateY(22.65px)" }}></div><div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 "><div className="flex flex-col items-center gap-1"><h2 className="font-bold text-[20px] md:text-[26px] text-center uppercase tracking-[0.04em]" style={{ color: t.ink, fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", fontWeight: "700", textTransform: "uppercase" }}><span>{d.dressTitle || "DRESS CODE"}</span></h2><p className="whitespace-pre-line text-sm md:text-base text-center" style={{ color: t.sub, fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}><span>{d.dressText}</span></p></div><div className="flex flex-wrap justify-center gap-4 md:gap-6">{d.dressColors.map((c, i) => (<div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: c, ...(isLightColor(c) ? { border: `1.5px solid rgba(125, 39, 50, 0.19)` } : {}) }}></div>))}</div></div></div>)
  );
}
