import React from "react";
import { AltGiftWidget } from "@/features/invitation/shell/blocks/shared/GiftWidgets";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d, t, giftModalOpen, setGiftModalOpen, giftTitle, saveQr } = ctx;

  if (!d.giftOn || !d.gifts || d.gifts.length === 0) return null;

  return (
    <div className="relative z-10 overflow-x-clip">
      <style>{`
        @keyframes rv-ienvFloat { 0%, 100% { translate: 0px; } 50% { translate: 0px -7px; } }
        @keyframes rv-ienvFloatMain { 0%, 100% { translate: -15%; } 50% { translate: -15% -7px; } }
        @keyframes rv-ienvShadowPulse { 0%, 100% { transform: scaleX(1); opacity: 0.28; } 50% { transform: scaleX(0.9); opacity: 0.16; } }
        @keyframes rv-ienvSparkleAnim { 0%, 100% { opacity: 0; transform: scale(0.4); } 50% { opacity: 1; transform: scale(1.15); } }
        @keyframes rv-ienvHintPulse { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
        @keyframes rv-ienvGrow { 0% { transform: scale(1); } 100% { transform: scale(1.12); } }
        @keyframes rv-ienvWave { 0% { transform: scale(1.12) rotate(0deg); } 20% { transform: scale(1.12) rotate(-6deg); } 40% { transform: scale(1.12) rotate(4.5deg); } 60% { transform: scale(1.12) rotate(-3deg); } 80% { transform: scale(1.12) rotate(1.5deg); } 100% { transform: scale(1.12) rotate(0deg); } }
        @keyframes rv-ienvBackWave { 0%, 100% { rotate: 0deg; } 20% { rotate: -1deg; } 40% { rotate: 2deg; } 60% { rotate: -2.5deg; } 80% { rotate: 1.5deg; } }
        .ienv-shadow.jsx-1370451c15a89ae2 { animation: 3s ease-in-out 0s infinite normal none running rv-ienvShadowPulse; }
        .ienv-card.jsx-1370451c15a89ae2 { transition: transform 0.35s; transform-origin: 50% 92%; animation: 3s ease-in-out 0s infinite normal none running rv-ienvFloatMain; }
        .ienv-back.jsx-1370451c15a89ae2 { transition: rotate 0.3s; animation: 5.2s ease-in-out 0.5s infinite normal none running rv-ienvFloat; }
        .group.jsx-1370451c15a89ae2:hover .ienv-card.jsx-1370451c15a89ae2, .group.jsx-1370451c15a89ae2:focus-visible .ienv-card.jsx-1370451c15a89ae2 { animation: 3s ease-in-out 0s infinite normal none running rv-ienvFloatMain, 0.35s ease 0s 1 normal forwards running rv-ienvGrow, 1.1s ease-in-out 0.35s infinite normal none running rv-ienvWave; }
        .group.jsx-1370451c15a89ae2:hover .ienv-back.jsx-1370451c15a89ae2, .group.jsx-1370451c15a89ae2:focus-visible .ienv-back.jsx-1370451c15a89ae2 { animation: 5.2s ease-in-out 0.5s infinite normal none running rv-ienvFloat, 2.2s ease-in-out 0s infinite normal none running rv-ienvBackWave; }
        .ienv-hint.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 0s infinite normal none running rv-ienvHintPulse; }
        .ienv-sparkle.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 0s infinite normal none running rv-ienvSparkleAnim; }
        .ienv-sparkle-2.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 0.6s infinite normal none running rv-ienvSparkleAnim; }
        .ienv-sparkle-3.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 1.2s infinite normal none running rv-ienvSparkleAnim; }
        .ienv-sparkle-4.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 1.7s infinite normal none running rv-ienvSparkleAnim; }
      `}</style>

      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute max-w-none object-contain opacity-[0.1] left-1/2 top-[6%] w-[155%] -translate-x-1/2"
        src={`${t.assets}/castle-background.webp`}
      />

      <GiftsGeneric ctx={ctx} />
    </div>
  );
}
