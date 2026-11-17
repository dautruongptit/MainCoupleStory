import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  return (
    <>{d.thanksOn && (<footer className="relative z-10 flex w-full flex-col items-center px-6 text-center"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[11px] leading-[1.5] md:text-[15px] mx-auto md:max-w-[560px]" style={{ color: t.ink, fontFamily: "\"Plus Jakarta Sans\", \"Helvetica Neue\", Arial, ChungDoiIndic, sans-serif" }}><span>{d.thanks}</span></span></footer>)}<div className="relative z-20 flex w-full items-center justify-center"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(108, 126, 84)" }}>♡ chungdoi.com</a></div></>
  );
}
