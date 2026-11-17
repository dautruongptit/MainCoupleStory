import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const [isOpen, setIsOpen] = useState(false);
  const { d, t } = ctx;
  const anyD = d as any;
  if (!d.giftOn) return null;

  const ink = t.ink || "rgb(210, 95, 101)";
  const muted = t.muted || "rgb(181, 75, 81)";
  const fontFam = t.fontFamily || "Baskerville, \"Times New Roman\", ChungDoiIndic, serif";

  const brideName = anyD.brideFull || "Phạm Thị Ngọc Hân";
  const groomName = anyD.groomFull || "THIEP CUOI DEMO";

  const bankAccounts: Array<{
    role: string;
    bank: string;
    accountNumber: string;
    accountHolder: string;
    qrUrl: string;
  }> = (anyD.bankAccounts && anyD.bankAccounts.length > 0)
    ? anyD.bankAccounts
    : [
        {
          role: "Cô Dâu - " + brideName,
          bank: "BIDV",
          accountNumber: "8084856145",
          accountHolder: brideName,
          qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970418011080848561450208QRIBFTTA53037045802VN63044CBC&ec=M",
        },
        {
          role: "Chú Rể - " + groomName,
          bank: "Vietcombank",
          accountNumber: "0000000000",
          accountHolder: groomName,
          qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970436011000000000000208QRIBFTTA53037045802VN63048C2A&ec=M",
        },
      ];

  const envelopeImg = "/images/envelope/spring_garden_red.webp";

  return (
    <GiftsGeneric ctx={ctx} />
  );
}
