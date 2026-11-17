import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import type { GiftMethod } from "@/types/invitation";
import { GiftsGeneric } from "@/features/invitation/shell/blocks/shared/GiftsGeneric";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d, giftModalOpen, setGiftModalOpen, saveQr, copyToClipboard, copiedBank } = ctx;
  if (!d.giftOn) return null;
  const gifts: GiftMethod[] = d.gifts && d.gifts.length > 0 ? d.gifts : [
    {
      id: "default-groom-gift",
      who: "groom",
      customLabel: "Chú Rể - THIEP CUOI DEMO",
      accountName: "THIEP CUOI DEMO",
      bankName: "Vietcombank",
      bankCode: "VCB",
      accountNumber: "0000000000",
      qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970436011000000000000208QRIBFTTA53037045802VN63048C2A&ec=M"
    }
  ];

  return (
    <section className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}>
      <GiftsGeneric ctx={ctx} />
    </section>
  );
}
