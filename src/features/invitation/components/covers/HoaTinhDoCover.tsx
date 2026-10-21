import React from "react";
import type { CoverProps } from "./types";
import { AmbientParticles } from "./AmbientParticles";
import { OpenTransitionBurst, useEnvelopeOpen } from "./OpenTransition";
import { groomShown, brideShown } from "@/utils/format";
import { parseDate } from "@/utils/date";

export function HoaTinhDoCover({ d, onOpen }: CoverProps) {
  const gName = groomShown(d) || "Hữu Trí";
  const bName = brideShown(d) || "Thiên Ý";
  const dt = parseDate(d.date || "2026-08-02");
  const dateText = `${dt.getDate()} tháng ${dt.getMonth() + 1}, ${dt.getFullYear()}`;

  const { isOpening, showBurst, triggerOpen } = useEnvelopeOpen(onOpen);

  return (
    <div
      data-landing-screenshot-id="invite-envelope"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(165deg, #8B0000 0%, #C41230 45%, #8B0000 100%)",
      }}
    >
      {/* Floating 囍 Particles */}
      <AmbientParticles type="xi-gold" count={12} />

      {/* Burst Particles and Ripple Rings during open transition */}
      {showBurst && (
        <OpenTransitionBurst type="xi-gold" baseColor="#FFD700" sealPosition={{ top: 50 }} />
      )}

      {/* Main Card Container */}
      <div
        className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]"
        style={{
          zIndex: 10,
          animation: showBurst ? "0.8s ease-in 0s 1 normal forwards running envelope-away" : undefined,
        }}
      >
        {/* Seal Button on top (hy icon without circle background) */}
        <div
          className="absolute left-1/2"
          style={{ top: 50, width: 64, height: 64, transform: "translate(-50%, -50%)", zIndex: 30 }}
        >
          {!isOpening && (
            <div className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ backgroundColor: "rgba(215, 12, 27, 0.6)" }} />
          )}
          <div
            onClick={triggerOpen}
            aria-busy={isOpening ? "true" : undefined}
            title="Bấm để mở thiệp"
            className={`absolute inset-0 rounded-full flex items-center justify-center cursor-pointer transition-transform ${
              isOpening ? "pointer-events-none" : "hover:scale-105 active:scale-95"
            }`}
            style={{
              background: "transparent",
              boxShadow: "none",
              animation: isOpening
                ? "0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal forwards running seal-break"
                : "seal-pulse 2s ease-in-out infinite",
            }}
          >
            <img
              src="/images/themes/love-art/hy.webp"
              alt=""
              className="w-9 h-9 object-contain"
              style={{
                transformOrigin: "center center",
                animation: isOpening ? "0.36s ease-out 0s 1 normal forwards running seal-flower-bloom" : undefined,
              }}
            />
          </div>
        </div>

        {/* Paper Card Frame */}
        <div
          className="relative rounded-lg"
          style={{
            boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(215, 12, 27, 0.15)",
          }}
        >
          {/* Card Inner Background (Authentic Pure White / Light Tint) */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(215, 12, 27, 0.15)",
              clipPath: "inset(0 round 8px)",
            }}
          >
            <img
              src="/images/themes/love-art/hoa tim.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[18%] top-[calc(6%+50px)] right-[4%] opacity-50 md:w-[13%] md:top-[16%] md:right-[14%]"
            />
            <img
              src="/images/themes/love-art/tim.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[16%] bottom-[calc(8%+50px)] left-[4%] opacity-50 md:w-[12%] md:bottom-[16%] md:left-[14%]"
            />
          </div>

          {/* Card Content */}
          <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
            <h1 className="mb-2 flex flex-col items-center leading-tight">
              <span
                className="block w-full text-center text-3xl sm:text-4xl font-normal"
                style={{
                  fontFamily: '"Viaoda Libre", "Times New Roman", serif',
                  color: "#d70c1b",
                }}
              >
                {gName}
              </span>
              <span
                className="block w-full text-center text-2xl sm:text-3xl font-normal my-0.5"
                style={{
                  fontFamily: '"The Nautigal", cursive',
                  color: "#d70c1b",
                }}
              >
                &amp;
              </span>
              <span
                className="block w-full text-center text-3xl sm:text-4xl font-normal"
                style={{
                  fontFamily: '"Viaoda Libre", "Times New Roman", serif',
                  color: "#d70c1b",
                }}
              >
                {bName}
              </span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to right, transparent, #d70c1b)" }}
              />
              <span className="text-xs tracking-[0.25em] uppercase font-light" style={{ color: "#d70c1b" }}>
                Save Our Date
              </span>
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to left, transparent, #d70c1b)" }}
              />
            </div>

            <p
              className="text-base sm:text-lg tracking-wide mb-6"
              style={{
                fontFamily: '"EB Garamond", serif',
                color: "#4a3c31",
              }}
            >
              {dateText}
            </p>

            {/* Action Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={triggerOpen}
                disabled={isOpening}
                aria-busy={isOpening ? "true" : undefined}
                className="relative px-8 py-2.5 text-sm sm:text-base font-medium rounded-full shadow-md transition-all duration-300 hover:shadow-lg active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #d70c1b, #9b0000)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 4px 15px rgba(215, 12, 27, 0.35)",
                }}
              >
                <span>Mở thiệp</span>
                <span className="text-xs opacity-80" aria-hidden="true">✉</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoaTinhDoCover;
