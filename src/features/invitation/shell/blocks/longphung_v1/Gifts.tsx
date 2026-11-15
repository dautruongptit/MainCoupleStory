import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d, t, giftModalOpen, setGiftModalOpen, giftTitle, saveQr } = ctx;
  if (!d.giftOn) return null;
  const ink = t.ink || "rgb(233, 206, 158)";
  const muted = t.muted || "rgb(217, 188, 134)";
  const cardBg = t.cardBg || "rgb(104, 14, 14)";

  const defaultGifts = [
    {
      id: "groom",
      who: "groom" as const,
      bankName: "Vietcombank",
      accountNumber: "0000000000",
      accountName: "THIEP CUOI DEMO",
      label: "Chú Rể / 新郎 - THIEP CUOI DEMO",
      qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970436011000000000000208QRIBFTTA53037045802VN63048C2A&ec=M",
    },
    {
      id: "bride",
      who: "bride" as const,
      bankName: "VietinBank",
      accountNumber: "8084856145",
      accountName: "Lê Ngọc Linh",
      label: "Cô Dâu / 新娘 - Lê Ngọc Linh",
      qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970415011080848561450208QRIBFTTA53037045802VN63041BE3&ec=M",
    },
  ];

  const giftItems = d.gifts && d.gifts.length > 0 ? d.gifts : defaultGifts;

  return (
    <GiftsGeneric ctx={ctx} />
  );
}
