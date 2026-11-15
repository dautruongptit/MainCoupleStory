import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Guestbook({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const anyD = d as any;
  const assets = t.assets || "/images/themes/porcelain-v2-green";
  const isRed = assets.includes("red");
  const isPink = assets.includes("pink");

  const textColor = t.ink || (isRed ? "rgb(143, 38, 45)" : isPink ? "rgb(220, 133, 153)" : "rgb(70, 79, 30)");
  const accentColor = t.accent || (isRed ? "rgb(101, 78, 47)" : isPink ? "rgb(119, 110, 56)" : "rgb(188, 155, 99)");
  const cardBg = isRed ? "rgb(254, 250, 240)" : "rgb(253, 249, 240)";

  const envelopeImg = isRed
    ? "/images/envelope/porcelain_v2_red.webp"
    : isPink
    ? "/images/envelope/porcelain_v2_pink.webp"
    : "/images/envelope/porcelain_v2_green.webp";

  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!d.guestOn) return null;

  const guestbookEntries: Array<{ name: string; createdAt: string; message: string }> =
    anyD.guestbookEntries || [
      { name: "Lê Minh Tuấn", createdAt: "20:27:29 2/9/2026", message: "Chúc mừng Duy Khang và Thảo Vy! Chúc hai bạn trăm năm hạnh phúc, mãi bên nhau nhé." },
      { name: "Phạm Ngọc Hân", createdAt: "20:27:29 2/9/2026", message: "Nhìn thiệp là thấy dịu dàng rồi. Chúc hai bạn một đám cưới thật đẹp và ấm áp!" },
      { name: "Nguyễn Gia Bảo", createdAt: "20:27:29 2/9/2026", message: "Chúc mừng anh chị! Em nhất định sẽ có mặt để chung vui cùng hai anh chị." },
      { name: "Trần Khánh Linh", createdAt: "20:27:29 2/9/2026", message: "Chúc đôi bạn luôn yêu thương và thấu hiểu nhau, hạnh phúc dài lâu nha!" },
      { name: "Võ Thanh Trúc", createdAt: "20:27:29 2/9/2026", message: "Chúc mừng hai bạn! Mong ngày cưới trời thật đẹp và mọi điều thật suôn sẻ." },
      { name: "Đỗ Hoàng Nam", createdAt: "20:27:29 2/9/2026", message: "Cuối cùng cũng tới ngày này! Chúc hai bạn xây tổ ấm thật vững vàng." },
      { name: "Bùi Thảo Nguyên", createdAt: "20:27:29 2/9/2026", message: "Chúc cô dâu chú rể thật nhiều sức khỏe và luôn giữ được nụ cười như hôm nay." },
      { name: "Hoàng Minh Đức", createdAt: "20:27:29 2/9/2026", message: "Chúc mừng hạnh phúc! Hẹn gặp hai bạn ở Bảo Lộc nhé." },
      { name: "Lý Cẩm Tú", createdAt: "20:27:29 2/9/2026", message: "Chúc hai bạn một hành trình dài thật nhiều tiếng cười và bình yên." },
      { name: "Ngô Quang Huy", createdAt: "20:27:29 2/9/2026", message: "Chúc mừng Khang và Vy! Chúc hai bạn sớm có tin vui, gia đình luôn đầm ấm." },
    ];

  const bankAccounts: Array<{
    role: string;
    bank: string;
    accountNumber: string;
    accountHolder: string;
    qrUrl: string;
  }> = anyD.bankAccounts || [
    {
      role: "Chú Rể - NGUYEN DUY KHANG",
      bank: "BIDV",
      accountNumber: "6210077431",
      accountHolder: "NGUYEN DUY KHANG",
      qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970418011062100774310208QRIBFTTA53037045802VN6304DA15&ec=M",
    },
    {
      role: "Cô Dâu - TRAN THAO VY",
      bank: "MB Bank",
      accountNumber: "0904118826",
      accountHolder: "TRAN THAO VY",
      qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970422011009041188260208QRIBFTTA53037045802VN6304470F&ec=M",
    },
  ];

  const thankText = anyD.thankText || "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!";

  const borderLight = isRed
    ? "rgba(101, 78, 47, 0.333)"
    : isPink
    ? "rgba(119, 110, 56, 0.333)"
    : "rgba(188, 155, 99, 0.333)";

  return (
    <section
      className="relative isolate w-full border-y-[1.5px] "
      style={{
        backgroundColor: cardBg,
        borderColor: isPink || isRed ? accentColor : textColor,
        borderRadius: "0px",
      }}
    >
      <style>{`
        @keyframes ienvFloat{0%,100%{translate:0 0}50%{translate:0 -7px}}
        @keyframes ienvFloatMain{0%,100%{translate:-15% 0}50%{translate:-15% -7px}}
        @keyframes ienvShadowPulse{0%,100%{transform:scalex(1);opacity:.28}50%{transform:scalex(.9);opacity:.16}}
        @keyframes ienvSparkleAnim{0%,100%{opacity:0;transform:scale(.4)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes ienvHintPulse{0%,100%{opacity:.45}50%{opacity:1}}
        .ienv-shadow{animation:ienvShadowPulse 3s ease-in-out infinite}
        .ienv-card{transition:transform .35s ease;transform-origin:50% 92%;animation:ienvFloatMain 3s ease-in-out infinite}
        .ienv-back{transition:rotate .3s ease;animation:ienvFloat 5.2s ease-in-out .5s infinite}
        .ienv-sparkle{animation:ienvSparkleAnim 2.2s ease-in-out infinite}
        .ienv-sparkle-2{animation:ienvSparkleAnim 2.6s ease-in-out .4s infinite}
        .ienv-sparkle-3{animation:ienvSparkleAnim 2.4s ease-in-out .8s infinite}
        .ienv-sparkle-4{animation:ienvSparkleAnim 2.8s ease-in-out 1.2s infinite}
        .ienv-hint{animation:ienvHintPulse 2s ease-in-out infinite}
      `}</style>

      <div className="relative z-10 flex flex-col items-center gap-[23px] py-9 md:py-11">
        {/* Guestbook Part */}
        <section
          className="relative z-10 w-full px-6 [&_form]:max-w-[248px] md:[&_form]:max-w-[380px]"
          style={{
            color: accentColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <div className="text-center">
            <h2
              className="uppercase font-bold text-[20px] text-center"
              style={{
                color: isRed ? accentColor : textColor,
                fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                fontWeight: "700",
              }}
            >
              <span>Sổ lưu bút</span>
            </h2>
          </div>

          <form className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]">
            <div className="p-0" style={{ background: "transparent" }}>
              <div className="mb-4">
                <input
                  placeholder="Nhập tên*"
                  className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                  maxLength={500}
                  required
                  type="text"
                  defaultValue=""
                  style={{
                    borderColor: accentColor,
                    color: accentColor,
                    backgroundColor: "transparent",
                    fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
                  }}
                />
              </div>
              <textarea
                placeholder="Nhập lời chúc*"
                className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                rows={4}
                maxLength={10000}
                required
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                  backgroundColor: "transparent",
                  fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
                  resize: "none",
                }}
              />
              <div className="mt-4 flex items-center justify-between text-xs">
                <div className="flex items-center text-xs space-x-1">
                  <button
                    type="button"
                    className="p-2 rounded-lg transition-all duration-200 hover:scale-110 text-base leading-none"
                    title="Tạo lời chúc bằng AI"
                    style={{
                      backgroundColor: accentColor.replace("rgb", "rgba").replace(")", ", 0.1)"),
                      color: accentColor,
                    }}
                  >
                    🪄
                  </button>
                </div>
                <button
                  type="submit"
                  className="rounded-full px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    backgroundColor: accentColor,
                    color: "rgb(222, 217, 215)",
                    fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  <span>GỬI LỜI CHÚC</span>
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8 w-full max-h-[500px] space-y-3 overflow-y-auto pr-2 mx-auto max-w-full md:max-w-[600px]">
            {guestbookEntries.map((entry, idx) => (
              <div
                key={idx}
                className="rounded-[6px] border p-4 text-sm"
                style={{
                  borderColor: borderLight,
                  backgroundColor: "rgba(255, 255, 255, 0.55)",
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-semibold" style={{ color: textColor }}>
                    {entry.name}
                  </span>
                  <span className="text-xs opacity-70">{entry.createdAt}</span>
                </div>
                <p className="mt-2 leading-relaxed whitespace-pre-line">{entry.message}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gifts Part */}
        <GiftsGeneric ctx={ctx} />

        {/* Thank You Note */}
        <span
          className="whitespace-pre-line flex flex-col items-center gap-1 px-6 text-center text-[11px] md:text-[13px] mx-auto md:max-w-[560px]"
          style={{
            color: accentColor,
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
          }}
        >
          <span>{thankText}</span>
        </span>

        {/* Footer */}
        <div className="flex items-center justify-center ">
          <a
            href="https://chungdoi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs opacity-50 hover:opacity-70 transition-opacity "
            style={{ color: accentColor }}
          >
            ♡ chungdoi.com
          </a>
        </div>
      </div>
    </section>
  );
}
