import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import type { GiftMethod } from "@/types/invitation";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d, giftModalOpen, setGiftModalOpen, saveQr, copyToClipboard, copiedBank } = ctx;
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
      <div className="flex flex-col items-center justify-center py-8 relative z-10" style={{ backgroundColor: "transparent" }}>
        <h2 className="mb-4 uppercase font-bold text-[20px] md:text-[26px] w-full text-center flex flex-col items-center" style={{ color: "rgb(255, 255, 255)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", fontWeight: "700", letterSpacing: "0.01em" }}>
          <span>Hộp Quà&nbsp;Mừng</span>
        </h2>

        <button
          type="button"
          aria-label="Mở hộp mừng cưới"
          onClick={() => setGiftModalOpen(true)}
          className="group relative cursor-pointer outline-none border-none bg-transparent transition-transform hover:scale-105 active:scale-95"
          style={{ width: "223px", height: "222px" }}
        >
          <div className="relative w-full h-full flex items-end justify-center pb-[26px]">
            {/* Sparkles */}
            <span className="igb-sparkle absolute pointer-events-none z-20 animate-pulse" style={{ top: "8%", left: "14%", color: "rgb(143, 121, 100)", fontSize: "17.93px" }}>✦</span>
            <span className="igb-sparkle-2 absolute pointer-events-none z-20 animate-pulse" style={{ top: "18%", right: "10%", color: "rgb(143, 121, 100)", fontSize: "13.04px" }}>✦</span>
            <span className="igb-sparkle-3 absolute pointer-events-none z-20 animate-pulse" style={{ top: "32%", left: "5%", color: "rgb(143, 121, 100)", fontSize: "11.41px" }}>✦</span>
            <span className="igb-sparkle-4 absolute pointer-events-none z-20 animate-pulse" style={{ top: "26%", right: "5%", color: "rgb(143, 121, 100)", fontSize: "11.41px" }}>✦</span>

            {/* Floating mini boxes */}
            <img alt="" aria-hidden="true" className="absolute pointer-events-none h-auto w-[18%] top-[12%] left-[-4%] -rotate-12 opacity-80" src="/images/giftbox/mini/nhat_binh_red.webp" />
            <img alt="" aria-hidden="true" className="absolute pointer-events-none h-auto w-[17%] top-[4%] right-[2%] rotate-12 opacity-80" src="/images/giftbox/mini/royal_v2_green.webp" />
            <img alt="" aria-hidden="true" className="absolute pointer-events-none h-auto w-[16%] bottom-[20%] left-[-8%] rotate-6 opacity-75" src="/images/giftbox/mini/song_hy_red.webp" />
            <img alt="" aria-hidden="true" className="absolute pointer-events-none h-auto w-[16%] bottom-[16%] right-[-6%] -rotate-6 opacity-75" src="/images/giftbox/mini/baroque_gold.webp" />

            {/* Main gift box */}
            <img
              alt="Hộp Quà Mừng"
              className="relative z-10 w-[78%] h-auto object-contain filter drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
              src="/images/giftbox/applique_lace_white.webp"
            />
          </div>
        </button>

        <p className="mt-3 text-xs md:text-sm tracking-wider uppercase opacity-80" style={{ color: "rgb(255, 255, 255)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>
          Nhấn để mở Hộp Quà Mừng
        </p>

        {/* Modal */}
        {giftModalOpen && (
          <dialog className="modal modal-open z-[9999]">
            <div className="modal-box relative max-w-lg bg-[#1a1a1a] text-white border border-white/20 shadow-2xl rounded-2xl p-6">
              <button
                type="button"
                onClick={() => setGiftModalOpen(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-white hover:bg-white/10"
              >
                ✕
              </button>

              <h2 className="uppercase font-bold text-[18px] md:text-[22px] w-full text-center mb-6" style={{ fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>
                Hộp Quà Mừng
              </h2>

              <div className="flex flex-col gap-6 items-center">
                {gifts.map((g, idx) => (
                  <div key={idx} className="flex flex-col items-center w-full max-w-xs bg-white/5 border border-white/10 p-5 rounded-xl">
                    <h3 className="mb-3 text-sm font-semibold text-center text-white/90">
                      {g.customLabel || (g.who === "groom" ? "Chú Rể" : "Cô Dâu")}
                    </h3>

                    {g.qrUrl && (
                      <div className="w-44 h-44 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center border border-black/10">
                        <img alt="QR mừng cưới" className="w-full h-full object-contain" src={g.qrUrl} />
                      </div>
                    )}

                    <div className="mt-3 text-center space-y-1">
                      <p className="text-xs text-white/70">{g.bankName}</p>
                      <p className="text-sm font-mono font-bold text-white tracking-wider">{g.accountNumber}</p>
                      <p className="text-xs font-semibold text-white/90">{g.accountName}</p>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(g.accountNumber, `bank-${idx}`)}
                        className="text-xs px-3.5 py-1.5 inline-flex items-center gap-1 font-medium rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                      >
                        {copiedBank === `bank-${idx}` ? "✓ Đã sao chép" : "Sao chép số TK"}
                      </button>
                      {g.qrUrl && (
                        <button
                          type="button"
                          onClick={() => saveQr(g)}
                          className="text-xs px-3.5 py-1.5 inline-flex items-center gap-1 font-medium rounded-full bg-white text-black hover:bg-white/90 transition-colors font-semibold"
                        >
                          Lưu QR
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button type="button" onClick={() => setGiftModalOpen(false)}>close</button>
            </form>
          </dialog>
        )}
      </div>
    </section>
  );
}
