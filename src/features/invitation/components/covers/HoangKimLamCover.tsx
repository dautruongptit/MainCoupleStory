import React from "react";
import type { CoverProps } from "./types";
import { AmbientParticles } from "./AmbientParticles";
import { OpenTransitionBurst, useEnvelopeOpen } from "./OpenTransition";
import { groomShown, brideShown } from "@/utils/format";
import { parseDate } from "@/utils/date";

export function HoangKimLamCover({ d, onOpen }: CoverProps) {
  const gName = groomShown(d) || "Thế Bảo";
  const bName = brideShown(d) || "Ngọc Ánh";
  const dt = parseDate(d.date || "2026-06-21");
  const dateText = `${dt.getDate()} tháng ${dt.getMonth() + 1}, ${dt.getFullYear()}`;
  const guestBadge = d.envelopeGuest === "Thân Mời" ? "Bạn Thanh Nhã" : (d.envelopeGuest || "Bạn Thanh Nhã");
  const inviteMsg = d.envelopeInviteMessage || "Đến dự buổi tiệc chung vui cùng chúng mình";

  const { isOpening, showBurst, triggerOpen } = useEnvelopeOpen(onOpen);

  return (
    <div
      data-landing-screenshot-id="invite-envelope"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "rgba(0, 10, 36, 0.98)",
      }}
    >
      {/* Falling Stars Particles */}
      <AmbientParticles type="stars" count={12} />

      {/* Burst Particles and Ripple Rings during open transition */}
      {showBurst && (
        <OpenTransitionBurst type="stars" baseColor="#E1BC7C" sealPosition={{ top: 50 }} />
      )}

      {/* Main Card Container */}
      <div
        className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]"
        style={{
          zIndex: 10,
          animation: showBurst ? "0.8s ease-in 0s 1 normal forwards running envelope-away" : undefined,
        }}
      >
        {/* Seal Button on top (Gold seal with dark royal blue heart) */}
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
            background: "radial-gradient(circle at 30% 30%, #E1BC7C, rgb(195, 158, 94))",
            boxShadow: isOpening ? "none" : "0 4px 20px rgba(225, 188, 124, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
            zIndex: 30,
            animation: isOpening
              ? "0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal forwards running seal-break"
              : "seal-pulse 2s ease-in-out infinite",
          }}
        >
          <svg
            style={{
              fill: "#00112E",
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
            boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(225, 188, 124, 0.15)",
          }}
        >
          {/* Card Inner Background with Filigree Patterns */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              background: "linear-gradient(to bottom right, #00112E, #002875, #00112E)",
              border: "1px solid rgba(225, 188, 124, 0.15)",
              clipPath: "inset(0 round 8px)",
            }}
          >
            <img
              src="/images/themes/royal-blue/flower.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[80%] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
            />
            <img
              src="/images/themes/royal-blue/flower.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[80%] bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-20 -scale-y-100"
            />
          </div>

          {/* Card Content */}
          <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
            <h1 className="mb-2 flex flex-col items-center leading-tight">
              <span
                className="block w-full text-center text-3xl sm:text-4xl font-normal"
                style={{
                  fontFamily: '"EB Garamond", serif',
                  color: "#E1BC7C",
                }}
              >
                {gName}
              </span>
              <span
                className="block w-full text-center text-lg leading-none sm:text-xl font-normal italic opacity-80"
                style={{
                  color: "#E1BC7C",
                  fontFamily: '"Baskerville", "Times New Roman", serif',
                }}
              >
                &amp;
              </span>
              <span
                className="block w-full text-center text-3xl sm:text-4xl font-normal"
                style={{
                  fontFamily: '"EB Garamond", serif',
                  color: "#E1BC7C",
                }}
              >
                {bName}
              </span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to right, transparent, #E1BC7C)" }}
              />
              <span className="text-sm" style={{ color: "#E1BC7C", opacity: 0.7 }}>
                ❦
              </span>
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to left, transparent, #E1BC7C)" }}
              />
            </div>

            {/* Date */}
            <div
              className="text-[18px] mb-5 flex flex-col items-center"
              style={{
                color: "rgba(225, 188, 124, 0.75)",
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
            >
              <span>{dateText}</span>
            </div>

            {/* Guest Block with Distinct Royal Guest Box */}
            <div className="mb-6 max-w-[300px] md:max-w-[380px] lg:max-w-[440px] mx-auto">
              <p
                className="text-[18px] font-light mb-2"
                style={{
                  color: "rgba(225, 188, 124, 0.75)",
                  fontFamily: '"Lora", "Times New Roman", serif',
                }}
              >
                Thân Mời
              </p>
              <div
                style={{
                  backgroundColor: "rgba(225, 188, 124, 0.08)",
                }}
                className="inline-block px-5 py-2.5 rounded-xl mb-2 max-w-full [overflow-wrap:anywhere]"
              >
                <h2
                  style={{
                    color: "#E1BC7C",
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
                    color: "rgba(225, 188, 124, 0.75)",
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
                backgroundColor: "#E1BC7C",
                color: "#00112E",
                boxShadow: "0 4px 14px rgba(225, 188, 124, 0.35)",
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
