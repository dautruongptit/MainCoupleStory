import React from "react";
import type { CoverProps } from "./types";
import { AmbientParticles } from "./AmbientParticles";
import { OpenTransitionBurst, useEnvelopeOpen } from "./OpenTransition";
import { groomShown, brideShown } from "@/utils/format";
import { parseDate } from "@/utils/date";

export function SongLongDoCover({ d, onOpen }: CoverProps) {
  const gName = groomShown(d) || "Hoàng Nam";
  const bName = brideShown(d) || "Thanh Tú";
  const dt = parseDate(d.date || "2026-02-01");
  const dateText = `${dt.getDate()} tháng ${dt.getMonth() + 1}, ${dt.getFullYear()}`;
  const guestBadge = d.envelopeGuest === "Thân Mời" ? "Anh Tuấn" : (d.envelopeGuest || "Anh Tuấn");
  const inviteMsg = d.envelopeInviteMessage || "đến dự buổi tiệc chung vui cùng gia đình";

  const { isOpening, showBurst, triggerOpen } = useEnvelopeOpen(onOpen);

  return (
    <div
      data-landing-screenshot-id="invite-envelope"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, #4a1212, #3a0e0e, #2a0808)",
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
        {/* Seal Button on top with Chinese happiness mask */}
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
            background: "radial-gradient(circle at 30% 30%, #f0d497, rgb(210, 182, 121))",
            boxShadow: isOpening ? "none" : "0 4px 20px rgba(240, 212, 151, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
            zIndex: 30,
            animation: isOpening
              ? "0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal forwards running seal-break"
              : "seal-pulse 2s ease-in-out infinite",
          }}
        >
          <div
            style={{
              backgroundColor: "#4a1212",
              opacity: 0.9,
              transformOrigin: "center center",
              animation: isOpening ? "0.36s ease-out 0s 1 normal forwards running seal-flower-bloom" : undefined,
              WebkitMaskImage: "url('/images/themes/songlong-red/chinese_happiness.webp')",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: "url('/images/themes/songlong-red/chinese_happiness.webp')",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
            className="w-8 h-8"
          />
        </div>

        {/* Paper Card Frame */}
        <div
          className="relative rounded-lg"
          style={{
            boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(240, 212, 151, 0.15)",
          }}
        >
          {/* Card Inner Background with Dragon and Wave Patterns */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              background: "#a31d16",
              border: "1px solid rgba(240, 212, 151, 0.15)",
              clipPath: "inset(0 round 8px)",
            }}
          >
            <img
              src="/images/themes/songlong-red/dragon_left.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[220px] md:w-[300px] -top-[50px] -left-[95px] md:-top-[80px] md:-left-[100px] opacity-30 rotate-[30deg] md:rotate-[30deg]"
            />
            <img
              src="/images/themes/songlong-red/dragon_right.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[220px] md:w-[300px] -bottom-[30px] -right-[120px] md:-bottom-[80px] md:-right-[110px] opacity-30 -rotate-[-30deg] md:-rotate-[-30deg]"
            />
            <img
              src="/images/themes/songlong-red/cloud_small.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[50px] md:w-[70px] top-3 right-3 md:top-4 md:right-4 opacity-40"
            />
            <img
              src="/images/themes/songlong-red/cloud_big.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[50px] md:w-[70px] bottom-3 left-3 md:bottom-4 md:left-4 opacity-40 -scale-x-100"
            />
            <img
              src="/images/themes/songlong-red/wave.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[50px] md:w-[70px] bottom-2 left-1/2 -translate-x-1/2 opacity-20"
            />
          </div>

          {/* Card Content */}
          <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
            <h1 className="mb-2 flex flex-col items-center leading-tight">
              <span
                className="block w-full text-center text-3xl sm:text-4xl font-normal"
                style={{
                  fontFamily: '"Playfair Display", Baskerville, "Times New Roman", serif',
                  color: "#f0d497",
                }}
              >
                {gName}
              </span>
              <span
                className="block w-full text-center text-lg leading-none sm:text-xl font-normal italic opacity-80"
                style={{
                  color: "#f0d497",
                  fontFamily: '"Baskerville", "Times New Roman", serif',
                }}
              >
                &amp;
              </span>
              <span
                className="block w-full text-center text-3xl sm:text-4xl font-normal"
                style={{
                  fontFamily: '"Playfair Display", Baskerville, "Times New Roman", serif',
                  color: "#f0d497",
                }}
              >
                {bName}
              </span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to right, transparent, #f0d497)" }}
              />
              <span className="text-sm" style={{ color: "#f0d497", opacity: 0.7 }}>
                ❦
              </span>
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to left, transparent, #f0d497)" }}
              />
            </div>

            {/* Date */}
            <div
              className="text-[18px] mb-5 flex flex-col items-center"
              style={{
                color: "rgba(240, 212, 151, 0.85)",
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
            >
              <span>{dateText}</span>
            </div>

            {/* Guest Block with Distinct Badge Box */}
            <div className="mb-6 max-w-[300px] md:max-w-[380px] lg:max-w-[440px] mx-auto">
              <p
                className="text-[18px] font-light mb-2"
                style={{
                  color: "rgba(240, 212, 151, 0.85)",
                  fontFamily: '"Lora", "Times New Roman", serif',
                }}
              >
                Kính mời
              </p>
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.15)",
                  border: "1px solid rgba(240, 212, 151, 0.3)",
                }}
                className="inline-block px-5 py-2.5 rounded-xl mb-2 max-w-full [overflow-wrap:anywhere]"
              >
                <h2
                  style={{
                    color: "#f0d497",
                    fontFamily: '"Lora", "Times New Roman", serif',
                  }}
                  className="text-lg sm:text-xl font-semibold sm:font-medium"
                >
                  {guestBadge}
                </h2>
              </div>
              {inviteMsg && (
                <p
                  className="text-[16px] font-light mt-1"
                  style={{
                    color: "rgba(240, 212, 151, 0.85)",
                    fontFamily: '"Lora", "Times New Roman", serif',
                  }}
                >
                  {inviteMsg}
                </p>
              )}
            </div>

            {/* Open Envelope Button */}
            <button
              type="button"
              onClick={onOpen}
              style={{
                backgroundColor: "#f0d497",
                color: "#4a1212",
                boxShadow: "0 4px 14px rgba(240, 212, 151, 0.35)",
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
              className="relative px-8 py-2.5 text-lg font-semibold sm:font-medium rounded-full shadow-lg border-none cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span>Mở thiệp</span>
              <div
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  animation: "shine 3s ease-in-out infinite",
                }}
                className="absolute top-0 h-full w-8 pointer-events-none"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
