import React from "react";
import type { CoverProps } from "./types";
import { AmbientParticles } from "./AmbientParticles";
import { groomShown, brideShown } from "@/utils/format";
import { parseDate } from "@/utils/date";

export function ChibiRedCover({ d, onOpen }: CoverProps) {
  const gName = groomShown(d) || "Ngọc Ánh";
  const bName = brideShown(d) || "Thế Bảo";
  const dt = parseDate(d.date || "2026-05-24");
  const dateVi = `${dt.getDate()} tháng ${dt.getMonth() + 1}, ${dt.getFullYear()}`;
  const dateZh = `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日`;
  const guestBadge = d.envelopeGuest === "Thân Mời" ? "em Huy" : (d.envelopeGuest || "em Huy");

  return (
    <div
      data-landing-screenshot-id="invite-envelope"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "#fef0e0",
      }}
    >
      {/* Falling Confetti Particles */}
      <AmbientParticles type="confetti" />

      {/* Main Card Container */}
      <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]" style={{ zIndex: 10 }}>
        {/* Seal Button on top (Double happiness image with transparent bg) */}
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
            src="/images/themes/chibi_red/double-happiness.webp"
            alt=""
            className="w-9 h-9 object-contain"
            style={{ transformOrigin: "center" }}
          />
        </div>

        {/* Paper Card Frame */}
        <div
          className="relative rounded-lg"
          style={{
            boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(196, 77, 77, 0.15)",
          }}
        >
          {/* Card Inner Background with Authentic Chibi Illustrations */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              background: "#fef8f0",
              border: "1px solid rgba(196, 77, 77, 0.15)",
              clipPath: "inset(0 round 8px)",
            }}
          >
            <img
              src="/images/themes/chibi_red/cherry-blossom.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[50px] md:w-[70px] top-[60px] -left-[5px] md:top-[45px] md:left-[10px]"
            />
            <img
              src="/images/themes/chibi_red/cherry-blossom.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[45px] md:w-[65px] top-[65px] -right-[5px] md:top-[48px] md:right-[10px] -scale-x-100"
            />
            <img
              src="/images/themes/chibi_red/decorative-diamond.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[30px] md:w-[40px] top-[30px] right-[20px] md:top-[25px] md:right-[30px] opacity-30"
            />
            <img
              src="/images/themes/chibi_red/decorative-diamond.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[25px] md:w-[35px] bottom-[40px] left-[15px] md:bottom-[30px] md:left-[25px] opacity-25 rotate-12"
            />
            <img
              src="/images/themes/chibi_red/decorative-flowers.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-full top-0 left-0"
            />
            <img
              src="/images/themes/chibi_red/couple-main.webp"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none w-[200px] md:w-[250px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5"
            />
          </div>

          {/* Card Content */}
          <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
            <h1 className="mb-2 flex flex-col items-center leading-tight">
              <span
                className="block w-full text-center text-3xl sm:text-4xl font-normal"
                style={{
                  fontFamily: '"Viaoda Libre", "EB Garamond", cursive',
                  color: "#9e2a2b",
                }}
              >
                {gName}
              </span>
              <span
                className="block w-full text-center text-lg leading-none sm:text-xl font-normal italic opacity-80"
                style={{
                  color: "#9e2a2b",
                  fontFamily: '"Baskerville", "Times New Roman", serif',
                }}
              >
                &amp;
              </span>
              <span
                className="block w-full text-center text-3xl sm:text-4xl font-normal"
                style={{
                  fontFamily: '"Viaoda Libre", "EB Garamond", cursive',
                  color: "#9e2a2b",
                }}
              >
                {bName}
              </span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to right, transparent, #c44d4d)" }}
              />
              <span className="text-sm" style={{ color: "#c44d4d", opacity: 0.7 }}>
                ❦
              </span>
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to left, transparent, #c44d4d)" }}
              />
            </div>

            {/* Bilingual Date */}
            <div
              className="text-[18px] mb-5 flex flex-col items-center"
              style={{
                color: "rgba(158, 42, 43, 0.75)",
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
            >
              <span className="flex flex-col items-center">
                <span dir="auto" lang="vi">{dateVi}</span>
                <span dir="auto" lang="zh-Hant" className="text-[0.85em] opacity-70">{dateZh}</span>
              </span>
            </div>

            {/* Bilingual Guest Block with Distinct Badge Box */}
            <div className="mb-6 max-w-[300px] md:max-w-[380px] lg:max-w-[440px] mx-auto">
              <p
                className="text-[18px] font-light mb-2"
                style={{
                  color: "rgba(158, 42, 43, 0.75)",
                  fontFamily: '"Lora", "Times New Roman", serif',
                }}
              >
                <span dir="auto">Thân Mời / 誠摯邀請</span>
              </p>
              <div
                style={{
                  backgroundColor: "rgba(158, 42, 43, 0.08)",
                }}
                className="inline-block px-5 py-2.5 rounded-xl mb-2 max-w-full [overflow-wrap:anywhere]"
              >
                <h2
                  style={{
                    color: "#9e2a2b",
                    fontFamily: '"Lora", "Times New Roman", serif',
                  }}
                  className="text-lg sm:text-xl font-semibold sm:font-medium"
                >
                  {guestBadge}
                </h2>
              </div>
              <p
                className="text-[16px] font-light mt-1"
                style={{
                  color: "rgba(158, 42, 43, 0.75)",
                  fontFamily: '"Lora", "Times New Roman", serif',
                }}
              >
                <span className="flex flex-col items-center">
                  <span dir="auto" lang="vi">đến dự buổi tiệc chung vui cùng gia đình</span>
                  <span dir="auto" lang="zh-Hant" className="text-[0.85em] opacity-70">蒞臨參加我們的家庭慶典</span>
                </span>
              </p>
            </div>

            {/* Bilingual Open Envelope Button */}
            <button
              type="button"
              onClick={onOpen}
              style={{
                backgroundColor: "#9e2a2b",
                color: "#fef0e0",
                boxShadow: "0 4px 14px rgba(158, 42, 43, 0.35)",
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
              className="relative px-8 py-2.5 text-lg font-semibold sm:font-medium rounded-full shadow-lg border-none cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span>Mở thiệp / 開啟喜帖</span>
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
