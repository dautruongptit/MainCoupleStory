import React from "react";
import type { CoverProps } from "./types";
import { AmbientParticles } from "./AmbientParticles";
import { OpenTransitionBurst, useEnvelopeOpen } from "./OpenTransition";
import { groomShown, brideShown } from "@/utils/format";
import { parseDate } from "@/utils/date";

export function BachSuDoCover({ d, onOpen }: CoverProps) {
  const gName = groomShown(d) || "Minh Khôi";
  const bName = brideShown(d) || "Ngọc Hân";
  const dt = parseDate(d.date || "2026-12-19");
  const dateText = `${dt.getDate()} tháng ${dt.getMonth() + 1}, ${dt.getFullYear()}`;

  const { isOpening, showBurst, triggerOpen } = useEnvelopeOpen(onOpen);

  return (
    <div
      data-landing-screenshot-id="invite-envelope"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(to right, transparent calc(50% - 451px), #af3e42 calc(50% - 451px), #af3e42 calc(50% - 449px), transparent calc(50% - 449px), transparent calc(50% + 449px), #af3e42 calc(50% + 449px), #af3e42 calc(50% + 451px), transparent calc(50% + 451px)), linear-gradient(to right, #f6f3e7 calc(50% - 450px), rgba(246,243,231,0) calc(50% - 450px), rgba(246,243,231,0) calc(50% + 450px), #f6f3e7 calc(50% + 450px)), url("/images/themes/porcelain-red/floral-tile.webp") 0 0 / 441px repeat, #f6f3e7`,
      }}
    >
      {/* Falling Blossom / Ceramic Petal Particles */}
      <AmbientParticles type="blossom" color="#af3e42" count={12} />

      {/* Burst Particles and Ripple Rings during open transition */}
      {showBurst && (
        <OpenTransitionBurst type="blossom" baseColor="#af3e42" sealPosition={{ top: 50 }} />
      )}

      {/* Main Card Container */}
      <div
        className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]"
        style={{
          zIndex: 10,
          animation: showBurst ? "0.8s ease-in 0s 1 normal forwards running envelope-away" : undefined,
        }}
      >
        {/* Seal Button on top (Porcelain red seal with cream heart) */}
        <div
          onClick={triggerOpen}
          aria-busy={isOpening ? "true" : undefined}
          title="Bấm để mở thiệp"
          className={`absolute left-1/2 rounded-full flex items-center justify-center cursor-pointer transition-transform ${
            isOpening ? "pointer-events-none" : "hover:scale-105 active:scale-95"
          }`}
          style={{
            top: 50,
            width: 56,
            height: 56,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle at 30% 30%, #af3e42, rgb(145, 32, 36))",
            boxShadow: isOpening ? "none" : "0 4px 20px rgba(175, 62, 66, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
            zIndex: 30,
            animation: isOpening
              ? "0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal forwards running seal-break"
              : "seal-pulse 2s ease-in-out infinite",
          }}
        >
          <svg
            style={{
              fill: "#f6f3e7",
              transformOrigin: "center center",
              animation: isOpening ? "0.36s ease-out 0s 1 normal forwards running seal-flower-bloom" : undefined,
            }}
            viewBox="0 0 24 24"
            className="w-7 h-7"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Paper Card Frame */}
        <div
          className="relative rounded-lg"
          style={{
            boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(176, 50, 53, 0.15)",
          }}
        >
          {/* Card Inner Background (Authentic Crisp Porcelain Cream) */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              background: "#f6f3e7",
              border: "1px solid rgba(176, 50, 53, 0.15)",
              clipPath: "inset(0 round 8px)",
            }}
          />

          {/* Card Content */}
          <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
            <h1 className="mb-2 flex flex-col items-center leading-tight">
              <span
                className="block w-full text-center text-3xl sm:text-4xl font-normal"
                style={{
                  fontFamily: '"Viaoda Libre", "Times New Roman", serif',
                  color: "#b03235",
                }}
              >
                {gName}
              </span>
              <span
                className="block w-full text-center text-2xl sm:text-3xl font-normal my-0.5"
                style={{
                  fontFamily: '"The Nautigal", cursive',
                  color: "#b03235",
                }}
              >
                &amp;
              </span>
              <span
                className="block w-full text-center text-3xl sm:text-4xl font-normal"
                style={{
                  fontFamily: '"Viaoda Libre", "Times New Roman", serif',
                  color: "#b03235",
                }}
              >
                {bName}
              </span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to right, transparent, #b03235)" }}
              />
              <span className="text-xs tracking-[0.25em] uppercase font-light" style={{ color: "#af3e42" }}>
                Save Our Date
              </span>
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to left, transparent, #b03235)" }}
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
                  background: "linear-gradient(135deg, #b03235, #af3e42)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 4px 15px rgba(176, 50, 53, 0.35)",
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

export default BachSuDoCover;
