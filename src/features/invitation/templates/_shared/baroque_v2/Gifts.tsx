import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme } from "./themeVars";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);
  const d = ctx.d as any;

  const [isOpen, setIsOpen] = useState(false);
  if (!d.giftOn) return null;

  const groomName = (d.groomFullName || "Lý Gia Bảo").toUpperCase();
  const brideName = (d.brideFullName || "Phan Ngọc Diệp").toUpperCase();

  const groomBank = d.groomBankName || (theme.variant === "darkgreen" ? "VietinBank" : "Vietcombank");
  const groomAccount = d.groomAccountNumber || (theme.variant === "darkgreen" ? "1073920584" : theme.variant === "darkblue" ? "1029384756" : "1024778391");
  const groomQr =
    d.groomQr ||
    (theme.variant === "darkgreen"
      ? "/api/qr-png?d=00020101021238540010A00000072701240006970415011010739205840208QRIBFTTA53037045802VN630433F9&ec=M"
      : theme.variant === "darkblue"
      ? "/api/qr-png?d=00020101021238540010A00000072701240006970436011010293847560208QRIBFTTA53037045802VN630400E0&ec=M"
      : "/api/qr-png?d=00020101021238540010A00000072701240006970436011010247783910208QRIBFTTA53037045802VN63044555&ec=M");

  const brideBank = d.brideBankName || (theme.variant === "darkgreen" ? "Techcombank" : theme.variant === "darkblue" ? "BIDV" : "MB Bank");
  const brideAccount = d.brideAccountNumber || (theme.variant === "darkgreen" ? "1903846271" : theme.variant === "darkblue" ? "5647382910" : "6820119034");
  const brideQr =
    d.brideQr ||
    (theme.variant === "darkgreen"
      ? "/api/qr-png?d=00020101021238540010A00000072701240006970407011019038462710208QRIBFTTA53037045802VN63042ED6&ec=M"
      : theme.variant === "darkblue"
      ? "/api/qr-png?d=00020101021238540010A00000072701240006970418011056473829100208QRIBFTTA53037045802VN63046DC3&ec=M"
      : "/api/qr-png?d=00020101021238540010A00000072701240006970422011068201190340208QRIBFTTA53037045802VN6304D262&ec=M");

  return (
    <GiftsGeneric ctx={ctx} />
  );
}
