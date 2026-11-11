import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  return (
    <div className="relative isolate z-10"><footer className="relative z-20 flex flex-col items-center px-[9%] pb-[37%] pt-[8%] text-center md:px-[14%] md:pb-[30%]"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[11px] md:text-[14px] mx-auto md:max-w-[560px]" style={{ color: t.ink, fontFamily: "Roboto, system-ui, ChungDoiIndic, sans-serif" }}>{d.thanksOn && (<span>{d.thanks}</span>)}</span><div className="mt-6 flex items-center justify-center md:mt-8"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: t.ink }}>♡ chungdoi.com</a></div></footer><img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[-7.94%] z-0 h-auto w-[111.34%] max-w-none translate-y-[18.3%] object-contain md:left-[-4%] md:w-[104%]" loading="lazy" decoding="async" src={`${t.assets}/scene.webp`} /></div>
  );
}
