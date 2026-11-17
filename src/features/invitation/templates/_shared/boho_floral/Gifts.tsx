function toStr(v: any, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.vi) return v.vi;
  return fallback;
}
import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");
  const d = (ctx.d || {}) as any;
  if (!d.giftOn) return null;

  const giftBoxTitle = toStr(d.giftBox, "Hộp Quà\u00A0Mừng");
  const thankYouNote = toStr(
    d.thankYouNote,
    "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!"
  );
  const tapToOpen = toStr(d.tapToOpen, "Nhấn để mở");

  const groomBankName = toStr(d.groomBankName, "Vietcombank");
  const groomAccount = toStr(d.groomAccountNumber, "123456789");
  const groomHolder = toStr(d.groomAccountName, "TRAN MINH QUAN");
  const groomQr =
    toStr(d.groomBankQr) ||
    "/api/qr-png?d=00020101021238540010A00000072701240006970436011000000000000208QRIBFTTA53037045802VN63048C2A&ec=M";

  const brideBankName = toStr(d.brideBankName, "BIDV");
  const brideAccount = toStr(d.brideAccountNumber, "987654321");
  const brideHolder = toStr(d.brideAccountName, "NGUYEN THU HA");
  const brideQr =
    toStr(d.brideBankQr) ||
    "/api/qr-png?d=00020101021238540010A00000072701240006970418011066655588880208QRIBFTTA53037045802VN6304086E&ec=M";

  return (
    <GiftsGeneric ctx={ctx} />
  );
}
