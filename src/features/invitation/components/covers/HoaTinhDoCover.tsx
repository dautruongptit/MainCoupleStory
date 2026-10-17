import React from "react";
import type { CoverProps } from "./types";
import { AmbientParticles } from "./AmbientParticles";
import { groomShown, brideShown } from "@/utils/format";
import { parseDate } from "@/utils/date";

export function HoaTinhDoCover({ d, onOpen }: CoverProps) {
  const gName = groomShown(d) || "Hữu Trí";
  const bName = brideShown(d) || "Thiên Ý";
  const dt = parseDate(d.date || "2026-08-02");
  const dateText = `${dt.getDate()} tháng ${dt.getMonth() + 1}, ${dt.getFullYear()}`;

  return (
    <div
      data-landing-screenshot-id="invite-envelope"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(165deg, #8B0000 0%, #C41230 45%, #8B0000 100%)",
      }}
    >
      {/* Floating 囍 Particles */}
      <AmbientParticles type="xi-gold" />

      {/* Main Card Container */}
      <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]" style={{ zIndex: 10 }}>
        {/* Seal Button on top (hy icon without circle background) */}
        <div
          onClick={onOpen}
          title="Bấm để mở thiệp"
          className="absolute left-1/2 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          style={{
            top: 50,
            width: 64,
            height: 64,
            transform: "translate(-50%, -50%)",
            background: "transparent",
            boxShadow: "none",
            zIndex: 30,
            animation: "seal-pulse 2s ease-in-out infinite",
          }}
        >
          <img
            src="/images/themes/love-art/hy.webp"
            alt=""
            className="w-9 h-9 object-contain"
            style={{ transformOrigin: "center" }}
          />
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
              background: "linear-gradient(to bottom right, #FFFFFF, #FFF5F5, #FFFFFF)",
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
                  fontFamily: '"Patrick Hand", "Baloo Bhaijaan", cursive',
                  color: "#D70C1B",
                }}
              >
                {gName}
              </span>
              <span
                className="block w-full text-center text-lg leading-none sm:text-xl italic font-normal"
                style={{
                  color: "#D70C1B",
                  fontFamily: '"Baskerville", "Times New Roman", serif',
                }}
              >
                &amp;
              </span>
              <span
                className="block w-full text-center text-3xl sm:text-4xl font-normal"
                style={{
                  fontFamily: '"Patrick Hand", "Baloo Bhaijaan", cursive',
                  color: "#D70C1B",
                }}
              >
                {bName}
              </span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(215, 12, 27, 0.4))" }}
              />
              <span className="text-sm" style={{ color: "rgba(215, 12, 27, 0.4)", opacity: 0.7 }}>
                ❦
              </span>
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to left, transparent, rgba(215, 12, 27, 0.4))" }}
              />
            </div>

            {/* Date */}
            <div
              className="text-[18px] mb-5 flex flex-col items-center"
              style={{
                color: "rgba(215, 12, 27, 0.85)",
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
            >
              <span>{dateText}</span>
            </div>

            {/* Guest Block */}
            <div className="mb-6 max-w-[300px] md:max-w-[380px] lg:max-w-[440px] mx-auto">
              <p
                className="text-[18px] font-light mb-2"
                style={{
                  color: "rgba(215, 12, 27, 0.85)",
                  fontFamily: '"Lora", "Times New Roman", serif',
                }}
              >
                {d.envelopeGuest || "Thân Mời"}
              </p>
              {d.envelopeInviteMessage && (
                <p
                  className="text-[15px] italic mt-1"
                  style={{
                    color: "rgba(215, 12, 27, 0.75)",
                    fontFamily: '"Lora", "Times New Roman", serif',
                  }}
                >
                  {d.envelopeInviteMessage}
                </p>
              )}
            </div>

            {/* Open Envelope Button */}
            <button
              type="button"
              onClick={onOpen}
              style={{
                backgroundColor: "#D70C1B",
                color: "#FFFFFF",
                boxShadow: "0 4px 14px rgba(215, 12, 27, 0.35)",
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
