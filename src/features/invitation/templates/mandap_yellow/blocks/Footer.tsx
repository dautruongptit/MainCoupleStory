import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  return (
    <footer className="relative w-full" style={{ paddingBottom: "calc(0.38549 * var(--st-w))" }}><div className="relative z-10 flex w-full flex-col items-center text-center"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[11px] md:text-[15px] mx-auto md:max-w-[560px]" style={{ color: t.ink, fontFamily: "Roboto, \"Helvetica Neue\", Arial, ChungDoiIndic, sans-serif", marginTop: "calc(0.05215 * var(--st-w))" }}>{d.thanksOn && (<span>{d.thanks}</span>)}</span><div style={{ marginTop: "calc(0.05215 * var(--st-w))", paddingBottom: "calc(0.09070 * var(--st-w))" }}><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity block mt-4" style={{ color: t.ink }}>♡ chungdoi.com</a></div></div><img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-10%] left-1/2 z-0 h-auto w-[105.669%] max-w-none -translate-x-1/2 object-contain" loading="lazy" decoding="async" src={`${t.assets}/sceneindian-decoration.webp`} /></footer>
  );
}
