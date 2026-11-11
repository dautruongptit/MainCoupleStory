import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  return (
    <div className="relative z-10 flex w-full flex-col items-center gap-[22px] pb-[22px] md:gap-7 md:pb-[30px]"><span className="whitespace-pre-line flex flex-col items-center gap-1 px-6 text-center text-[11px] md:text-[13px] mx-auto md:max-w-[560px]" style={{ color: t.ink, fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, ChungDoiIndic, sans-serif" }}>{d.thanksOn && (<span>{d.thanks}</span>)}</span><div className="flex items-center justify-center "><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: t.ink }}>♡ chungdoi.com</a></div></div>
  );
}
