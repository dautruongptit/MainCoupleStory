import React from "react";
import type { CoverProps, CoverConfig } from "./types";
import { AmbientParticles } from "./AmbientParticles";
import { OpenTransitionBurst, useEnvelopeOpen } from "./OpenTransition";
import { groomShown, brideShown } from "@/utils/format";
import { parseDate } from "@/utils/date";

export interface BaseCoverCardProps extends CoverProps {
  config: CoverConfig;
  cardExtra?: React.ReactNode;
}

export function BaseCoverCard({ d, onOpen, config, cardExtra }: BaseCoverCardProps) {
  const gName = groomShown(d);
  const bName = brideShown(d);
  const dt = parseDate(d.date);
  const dateText = `${dt.getDate()} tháng ${dt.getMonth() + 1}, ${dt.getFullYear()}`;

  const { isOpening, showBurst, triggerOpen } = useEnvelopeOpen(onOpen);

  // Seal radial gradient
  const sealBg = config.sealBg || (config.sealType === "xi"
    ? "radial-gradient(circle at 30% 30%, #e9ce9e, rgb(203, 176, 128))"
    : `radial-gradient(circle at 30% 30%, ${config.accentColor}, rgba(${config.rgb}, 0.85))`);

  const sealColor = config.sealColor || (config.sealType === "xi" ? "#4a0808" : "#ffffff");
  const textColor = config.textColor || config.accentColor;

  // Outer background style
  const bgStyle: React.CSSProperties = {
    background: config.bg,
  };

  return (
    <div
      data-landing-screenshot-id="invite-envelope"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={bgStyle}
    >
      {/* Ambient Floating/Falling Particles */}
      <AmbientParticles type={config.particleType} color={`rgba(${config.rgb}, 0.5)`} count={12} />

      {/* Burst Particles and Ripple Rings during open transition */}
      {showBurst && (
        <OpenTransitionBurst type={config.particleType} baseColor={config.accentColor} sealPosition={{ top: config.sealTop !== undefined ? config.sealTop : 50 }} />
      )}

      {/* Main Card Container */}
      <div
        className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]"
        style={{
          zIndex: 10,
          /* translateY(-26px) removed: was compensating for 14px root font-size */
          animation: showBurst ? "0.8s ease-in 0s 1 normal forwards running envelope-away" : undefined,
        }}
      >
        {/* Seal Button on top */}
        {config.sealType !== "none" && (
          <div
            className="absolute left-1/2 relative block"
            style={{
              top: config.sealTop !== undefined ? config.sealTop : 50,
              width: 56,
              height: 56,
              transform: "translate(-50%, -50%)",
              zIndex: 30,
            }}
          >
            {!isOpening && (
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-25"
                style={{ backgroundColor: sealBg }}
              />
            )}
            <div
              onClick={triggerOpen}
              aria-busy={isOpening ? "true" : undefined}
              title="Bấm để mở thiệp"
              className={`absolute inset-0 rounded-full flex items-center justify-center cursor-pointer transition-transform ${
                isOpening ? "pointer-events-none" : "hover:scale-105 active:scale-95"
              }`}
              style={{
                background: sealBg,
                boxShadow: isOpening ? "none" : `0 4px 20px rgba(${config.rgb}, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)`,
                animation: isOpening
                  ? "0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal forwards running seal-break"
                  : "seal-pulse 2s ease-in-out infinite",
              }}
            >
            {config.sealType === "xi" ? (
              <span
                className="text-[26px] leading-none"
                style={{
                  color: sealColor,
                  fontFamily: "serif",
                  transformOrigin: "center center",
                  animation: isOpening ? "0.36s ease-out 0s 1 normal forwards running seal-flower-bloom" : undefined,
                }}
                aria-hidden="true"
              >
                囍
              </span>
            ) : (
              <svg
                style={{
                  fill: sealColor,
                  transformOrigin: "center center",
                  animation: isOpening ? "0.36s ease-out 0s 1 normal forwards running seal-flower-bloom" : undefined,
                }}
                viewBox="0 0 24 24"
                className="w-7 h-7"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
            </div>
          </div>
        )}

        {/* Paper Card Frame */}
        <div
          className="relative rounded-lg"
          style={{
            boxShadow: `0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(${config.rgb}, 0.15)`,
          }}
        >
          {/* Card Inner Background with Corner Ornaments */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              background: config.cardBg || "rgba(255, 255, 255, 0.97)",
              border: `1px solid ${config.cardBorder || `rgba(${config.rgb}, 0.15)`}`,
              clipPath: "inset(0 round 8px)",
            }}
          >
            {config.imgs.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt=""
                aria-hidden="true"
                className={img.className}
                style={img.style}
              />
            ))}
          </div>

          {/* Optional Extra Elements (e.g. background scenes, tiles) */}
          {cardExtra}

          {/* Card Content */}
          <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
            <h1
              className="mb-2 flex flex-col items-center leading-tight text-3xl sm:text-4xl font-normal"
              style={{ color: textColor, fontFamily: config.nameFont, fontWeight: 400 }}
            >
              <span className="block w-full text-center font-normal">{gName}</span>
              <span
                style={{ fontFamily: '"Baskerville", "Times New Roman", serif' }}
                className="block w-full text-center text-lg leading-none sm:text-xl my-1 opacity-75 italic font-normal"
              >
                &amp;
              </span>
              <span className="block w-full text-center font-normal">{bName}</span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="w-10 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${textColor})` }}
              />
              <span className="text-sm" style={{ color: textColor, opacity: 0.7 }}>
                ❦
              </span>
              <div
                className="w-10 h-px"
                style={{ background: `linear-gradient(to left, transparent, ${textColor})` }}
              />
            </div>

            {/* Date */}
            <div
              className="text-[18px] mb-5 flex flex-col items-center"
              style={{ color: textColor, opacity: 0.85, fontFamily: '"Lora", "Times New Roman", serif' }}
            >
              <span>{dateText}</span>
            </div>

            {/* Guest Block */}
            <div className="mb-6 max-w-[300px] md:max-w-[380px] lg:max-w-[440px] mx-auto">
              <p
                className="text-[18px] font-light mb-1"
                style={{ color: textColor, opacity: 0.85, fontFamily: '"Lora", "Times New Roman", serif' }}
              >
                {d.envelopeGuest || "Thân Mời"}
              </p>
              {d.envelopeInviteMessage && (
                <p
                  className="text-[15px] italic mt-1"
                  style={{ color: textColor, opacity: 0.75, fontFamily: '"Lora", "Times New Roman", serif' }}
                >
                  {d.envelopeInviteMessage}
                </p>
              )}
            </div>

            {/* Open Envelope Button */}
            <button
              type="button"
              onClick={triggerOpen}
              disabled={isOpening}
              aria-busy={isOpening ? "true" : undefined}
              style={{
                backgroundColor: config.btnBg,
                color: config.btnTextColor,
                boxShadow: `0 4px 14px rgba(${config.rgb}, 0.35)`,
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
