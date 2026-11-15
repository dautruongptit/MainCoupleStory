function toStr(v: any, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.vi) return v.vi;
  return fallback;
}
import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getSongHyTheme } from "./themeVars";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const theme = getSongHyTheme(ctx);
  const [isOpen, setIsOpen] = useState(false);
  const d = (ctx.d || {}) as any;
  if (!d.giftOn) return null;

  const giftBoxTitle = toStr(d.giftBox, "Hộp Quà\u00A0Mừng");
  const thankYouNote = toStr(d.thankYouNote, theme.thankYouNote);
  const tapToOpen = toStr(d.tapToOpen, "Nhấn để mở");

  const groomBankName = toStr(d.groomBankName, "Vietcombank");
  const groomAccount = toStr(d.groomAccountNumber, "123456789");
  const groomHolder = toStr(d.groomAccountName, "Vo Hai Nam");
  const groomQr =
    toStr(d.groomBankQr) ||
    "/api/qr-png?d=00020101021238530010A0000007270123000697043601091234567890208QRIBFTTA53037045802VN63045653&ec=M";

  const brideBankName = toStr(d.brideBankName, "BIDV");
  const brideAccount = toStr(d.brideAccountNumber, "123456789");
  const brideHolder = toStr(d.brideAccountName, "Huynh Khanh Linh");
  const brideQr =
    toStr(d.brideBankQr) ||
    "/api/qr-png?d=00020101021238530010A0000007270123000697041801091234567890208QRIBFTTA53037045802VN6304D2A5&ec=M";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: theme.paperColor }}
    >
      <GiftsGeneric ctx={ctx} />

      {/* Thank you note */}
      <div className="relative z-10 py-8 text-center max-w-4xl mx-auto px-2 sm:px-4">
        <span
          className="whitespace-pre-line flex flex-col items-center gap-1 text-xl mx-auto md:max-w-[560px]"
          style={{
            color: "rgb(102, 102, 102)",
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span dir="auto">{thankYouNote}</span>
        </span>
      </div>
    </div>
  );
}
