import React from "react";
import type { CoverProps } from "./types";
import { AmbientParticles } from "./AmbientParticles";
import { groomShown, brideShown } from "@/utils/format";
import { parseDate } from "@/utils/date";

export function BachSuDoCover({ d, onOpen }: CoverProps) {
  const gName = groomShown(d) || "Minh Khôi";
  const bName = brideShown(d) || "Ngọc Hân";
  const dt = parseDate(d.date || "2026-12-19");
  const dateText = `${dt.getDate()} tháng ${dt.getMonth() + 1}, ${dt.getFullYear()}`;

  return (
    <div
      data-landing-screenshot-id="invite-envelope"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(to right, transparent calc(50% - 451px), #af3e42 calc(50% - 451px), #af3e42 calc(50% - 449px), transparent calc(50% - 449px), transparent calc(50% + 449px), #af3e42 calc(50% + 449px), #af3e42 calc(50% + 451px), transparent calc(50% + 451px)), linear-gradient(to right, #f6f3e7 calc(50% - 450px), rgba(246,243,231,0) calc(50% - 450px), rgba(246,243,231,0) calc(50% + 450px), #f6f3e7 calc(50% + 450px)), url("/images/themes/porcelain-red/floral-tile.webp") 0 0 / 441px repeat, #f6f3e7`,
      }}
    >
      {/* Falling Blossom / Ceramic Petal Particles */}
      <AmbientParticles type="blossom" color="#af3e42" />

      {/* Main Card Container */}
      <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]" style={{ zIndex: 10 }}>
        {/* Seal Button on top (Porcelain red seal with cream heart) */}
        <div
          onClick={onOpen}
          title="Bấm để mở thiệp"
          className="absolute left-1/2 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          style={{
            top: 50,
            width: 56,
            height: 56,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle at 30% 30%, #af3e42, rgb(145, 32, 36))",
            boxShadow: "0 4px 20px rgba(175, 62, 66, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
            zIndex: 30,
            animation: "seal-pulse 2s ease-in-out infinite",
          }}
        >
          <svg style={{ fill: "#f6f3e7" }} viewBox="0 0 24 24" className="w-7 h-7">
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
              <span className="text-sm" style={{ color: "#b03235", opacity: 0.7 }}>
                ❦
              </span>
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to left, transparent, #b03235)" }}
              />
            </div>

            {/* Date */}
            <div
              className="text-[18px] mb-5 flex flex-col items-center"
              style={{
                color: "rgba(176, 50, 53, 0.72)",
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
                  color: "rgba(176, 50, 53, 0.72)",
                  fontFamily: '"Lora", "Times New Roman", serif',
                }}
              >
                {d.envelopeGuest || "Thân Mời"}
              </p>
              {d.envelopeInviteMessage && (
                <p
                  className="text-[15px] italic mt-1"
                  style={{
                    color: "rgba(176, 50, 53, 0.72)",
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
                backgroundColor: "#af3e42",
                color: "#f6f3e7",
                boxShadow: "0 4px 14px rgba(175, 62, 66, 0.35)",
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
