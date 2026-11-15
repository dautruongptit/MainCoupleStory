import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getDoubleDragonTheme } from "./themeVars";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const theme = getDoubleDragonTheme(ctx);
  const [isOpen, setIsOpen] = useState(false);
  const d = ctx.d as any;
  if (!d.giftOn) return null;

  const giftBoxTitle = d.giftBox || "Hộp Quà\u00A0Mừng";
  const thankYouNote =
    d.thankYouNote ||
    "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!";
  const tapToOpen = d.tapToOpen || "Nhấn để mở";

  const groomBankName = d.groomBankName || "Vietcombank";
  const groomAccount = d.groomAccountNumber || "0000000000";
  const groomHolder = d.groomAccountName || "THIEP CUOI DEMO";
  const groomQr =
    d.groomBankQr ||
    "/api/qr-png?d=00020101021238540010A00000072701240006970436011000000000000208QRIBFTTA53037045802VN63048C2A&ec=M";

  const brideBankName = d.brideBankName || "TPBank";
  const brideAccount = d.brideAccountNumber || "83868386";
  const brideHolder = d.brideAccountName || "Lê Thanh Tú";
  const brideQr =
    d.brideBankQr ||
    "/api/qr-png?d=00020101021238520010A000000727012200069704230108838683860208QRIBFTTA53037045802VN630485D2&ec=M";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: `rgb(var(${theme.paperVar}))` }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url("${theme.patternUrl}")`,
          backgroundSize: "clamp(300px, 50vw, 500px) auto",
          backgroundPositionY: "85%",
          mixBlendMode: "color-dodge",
        }}
      />
      {/* Decorative Red Header Strip */}
      <div
        className="relative z-10"
        style={{ backgroundColor: `rgb(var(${theme.primaryVar}))`, height: "80px" }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("${theme.patternUrl}")`,
            backgroundSize: "clamp(300px, 50vw, 500px) auto",
          }}
        />
      </div>

      <GiftsGeneric ctx={ctx} />

      {/* Thank you note */}
      <div className="relative z-10 py-8 text-center max-w-4xl mx-auto px-2 sm:px-4">
        <span
          className="whitespace-pre-line flex flex-col items-center gap-1 text-xl mx-auto md:max-w-[560px]"
          style={{
            color: `rgb(var(${theme.grayVar}))`,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          {theme.isGreen ? (
            <span className="flex flex-col items-center">
              <span dir="auto" lang="vi">Sự hiện diện của bạn là món quà ý nghĩa nhất với hai đứa mình!</span>
              <span dir="auto" lang="ko" className=" text-[0.85em] opacity-70">귀한 걸음 해주시면 더없는 영광이겠습니다!</span>
            </span>
          ) : (
            <span dir="auto">{thankYouNote}</span>
          )}
        </span>
      </div>
    </div>
  );
}
