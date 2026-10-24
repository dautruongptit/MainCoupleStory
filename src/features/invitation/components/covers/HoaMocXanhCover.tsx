import React from "react";
import type { CoverProps } from "./types";
import { OpenTransitionBurst, useEnvelopeOpen } from "./OpenTransition";
import { groomShown, brideShown } from "@/utils/format";
import { parseDate } from "@/utils/date";

const LEAVES = [
  { left: "43.1%", top: -30, color: "#c8dfa0", size: "19.4px", sway: "18.8px", dur: "18.3s", delay: "-16.1s" },
  { left: "72.4%", top: -30, color: "#c8dfa0", size: "18.7px", sway: "-6.1px", dur: "19.7s", delay: "-13.1s" },
  { left: "79.6%", top: -30, color: "#a5c862", size: "20.3px", sway: "16.8px", dur: "25.5s", delay: "-6.1s" },
  { left: "88.9%", top: -30, color: "#a5c862", size: "18.7px", sway: "-18.4px", dur: "23.4s", delay: "-9.5s" },
  { left: "44.5%", top: -30, color: "#8bc34a", size: "17.7px", sway: "17.3px", dur: "22.9s", delay: "-13.7s" },
  { left: "5.3%",  top: -30, color: "#8bc34a", size: "23.7px", sway: "6.1px",  dur: "23.5s", delay: "-16.8s" },
  { left: "51.9%", top: -30, color: "#c8dfa0", size: "12.1px", sway: "-10.4px", dur: "25.0s", delay: "-10.7s" },
  { left: "55.3%", top: -30, color: "#6B8040", size: "18.4px", sway: "13.3px", dur: "21.4s", delay: "-3.4s" },
  { left: "48.9%", top: -30, color: "#a5c862", size: "23.7px", sway: "24.7px", dur: "21.1s", delay: "-19.8s" },
  { left: "7.8%",  top: -30, color: "#8bc34a", size: "18.6px", sway: "14.7px", dur: "19.6s", delay: "-11.7s" },
  { left: "82.3%", top: -30, color: "#c8dfa0", size: "18.9px", sway: "-26.8px", dur: "25.1s", delay: "-5.9s" },
  { left: "15.6%", top: -30, color: "#c8dfa0", size: "14.0px", sway: "-17.3px", dur: "18.6s", delay: "-7.9s" },
];

export function HoaMocXanhCover({ d, onOpen }: CoverProps) {
  const gName = groomShown(d) || "Minh Quân";
  const bName = brideShown(d) || "Thu Hà";
  const dt = parseDate(d.date || "2026-05-24");
  const dateText = `${dt.getDate()} tháng ${dt.getMonth() + 1}, ${dt.getFullYear()}`;

  const { isOpening, showBurst, triggerOpen } = useEnvelopeOpen(onOpen);

  return (
    <div
      data-landing-screenshot-id="invite-envelope"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, #1a3005, #0f2003, #081500)",
      }}
    >
      {/* 12 Falling SVG Leaves matching real site */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {LEAVES.map((leaf, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              left: leaf.left,
              top: leaf.top,
              bottom: "auto",
              color: leaf.color,
              fontSize: leaf.size,
              ["--sway" as any]: leaf.sway,
              animation: `ambient-fall ${leaf.dur} ease-in-out ${leaf.delay} infinite`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Burst Particles and Ripple Rings during open transition */}
      {showBurst && (
        <OpenTransitionBurst type="petal" baseColor="#30530F" sealPosition={{ top: 50 }} />
      )}

      {/* Main Card Container */}
      <div
        className="relative"
        style={{
          zIndex: 10,
          animation: showBurst ? "0.8s ease-in 0s 1 normal forwards running envelope-away" : undefined,
        }}
      >
        <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
          {/* Wax Seal Button on top */}
          <div
            onClick={triggerOpen}
            aria-busy={isOpening ? "true" : undefined}
            title="Bấm để mở thiệp"
            className="absolute left-1/2 rounded-full flex items-center justify-center cursor-pointer transition-transform"
            style={{
              top: 50,
              width: 56,
              height: 56,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle at 30% 30%, #30530F, rgb(18, 53, 0))",
              boxShadow: isOpening ? "none" : "0 4px 20px rgba(48, 83, 15, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
              zIndex: 30,
              animation: isOpening
                ? "0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal forwards running seal-break"
                : "seal-pulse 2s ease-in-out infinite",
            }}
          >
            <svg style={{ fill: "#FFFAF7" }} viewBox="0 0 24 24" className="w-7 h-7">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Paper Card Frame */}
          <div
            className="relative rounded-lg"
            style={{
              boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(107, 128, 64, 0.15)",
            }}
          >
            {/* Background Texture & Botanical Flowers */}
            <div
              className="absolute inset-0 rounded-lg overflow-hidden"
              style={{
                background: "rgba(255, 250, 247, 0.95)",
                border: "1px solid rgba(107, 128, 64, 0.15)",
                clipPath: "inset(0 round 8px)",
              }}
            >
              <img
                src="/images/themes/boho-floral-green/flower.webp"
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none w-[300px] md:w-[300px] -top-[40px] left-[-50%] md:-top-[50px] md:left-[-20%] opacity-40"
              />
              <img
                src="/images/themes/boho-floral-green/flower.webp"
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none w-[300px] md:w-[300px] bottom-[-10%] right-[-50%] md:-bottom-[60px] md:right-[-20%] opacity-30"
                style={{ transform: "rotate(160deg)" }}
              />
            </div>

            {/* Card Content */}
            <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
              {/* Couple Names */}
              <h1
                style={{
                  color: "#30530F",
                  fontFamily: '"Playfair Display", "Baskerville", "Times New Roman", serif',
                }}
                className="mb-2 flex flex-col items-center leading-tight text-3xl sm:text-4xl"
              >
                <span
                  style={{ fontFamily: '"Playfair Display", "Baskerville", "Times New Roman", serif' }}
                  className="block w-full text-center"
                >
                  {gName}
                </span>
                <span
                  style={{ fontFamily: '"Baskerville", "Times New Roman", serif' }}
                  className="block w-full text-center text-lg leading-none sm:text-xl"
                >
                  &amp;
                </span>
                <span
                  style={{ fontFamily: '"Playfair Display", "Baskerville", "Times New Roman", serif' }}
                  className="block w-full text-center"
                >
                  {bName}
                </span>
              </h1>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center gap-3 mb-2">
                <div style={{ background: "linear-gradient(to right, transparent, #6B8040)" }} className="w-10 h-px" />
                <span style={{ color: "#6B8040", opacity: 0.7 }} className="text-sm">
                  ❦
                </span>
                <div style={{ background: "linear-gradient(to left, transparent, #6B8040)" }} className="w-10 h-px" />
              </div>

              {/* Date */}
              <div
                style={{
                  color: "rgba(48, 83, 15, 0.7)",
                  fontFamily: '"Lora", "Times New Roman", serif',
                }}
                className="text-[18px] mb-5 flex flex-col items-center"
              >
                <span dir="auto">{dateText}</span>
              </div>

              {/* Guest Badge */}
              <div className="mb-6">
                <p
                  style={{
                    color: "rgba(48, 83, 15, 0.7)",
                    fontFamily: '"Lora", "Times New Roman", serif',
                  }}
                  className="text-[18px] font-light mb-2"
                >
                  <span dir="auto">{d.envelopeGuest || "Thân Mời"}</span>
                </p>
                {d.envelopeInviteMessage && (
                  <p
                    style={{
                      color: "rgba(48, 83, 15, 0.7)",
                      fontFamily: '"Lora", "Times New Roman", serif',
                    }}
                    className="text-[15px] italic mt-1"
                  >
                    {d.envelopeInviteMessage}
                  </p>
                )}
              </div>

              {/* Open Envelope Button with Shine Effect */}
              <button
                type="button"
                onClick={triggerOpen}
                disabled={isOpening}
                aria-busy={isOpening ? "true" : undefined}
                style={{
                  backgroundColor: "#30530F",
                  color: "#FFFAF7",
                  boxShadow: "0 4px 14px rgba(48, 83, 15, 0.35)",
                  fontFamily: '"Lora", "Times New Roman", serif',
                  userSelect: "none",
                }}
                className="relative px-8 py-2.5 text-lg font-semibold sm:font-medium rounded-full shadow-lg no-underline cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden border-none transition-transform hover:scale-105 active:scale-95"
              >
                <span dir="auto">Mở thiệp</span>
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
    </div>
  );
}

export default HoaMocXanhCover;
