import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import type { Wish } from "@/types/invitation";

export function Guestbook({ ctx }: { ctx: InvitationCtx }) {
  const { d, wishName, setWishName, wishMsg, setWishMsg, handleSendWish } = ctx;
  if (!d.guestOn) return null;
  const wishes: Wish[] = d.wishes && d.wishes.length > 0 ? d.wishes : [
    { name: "Vợ chồng anh Dũng", at: "16:00:00 24/2/2027", msg: "Mong hai bạn luôn có chuyện để kể với nhau." },
    { name: "Cậu mợ Hải Yến", at: "12:00:00 24/2/2027", msg: "Chúc hai cháu trăm năm hạnh phúc, con đàn cháu đống." },
    { name: "Bạn thân", at: "09:30:00 24/2/2027", msg: "Chúc mừng hạnh phúc hai bạn!" }
  ];

  return (
    <section className="relative isolate mx-auto" style={{ width: "82.766%", marginTop: "calc(0.05215 * var(--st-w))" }}>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[10px] border-[1.2px] border-solid" aria-hidden="true" style={{ backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 255, 255)", boxShadow: "rgba(0, 0, 0, 0.25) 4px 4px 2px" }}>
        <img alt="" className="h-full w-full object-cover opacity-50" src="/images/themes/applique-lace-white/guestbook-paper.webp" />
      </div>

      <section className="relative z-10 flex w-full flex-col items-center px-[8%]" style={{ backgroundColor: "transparent", color: "rgb(0, 0, 0)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", paddingTop: "calc(0.05896 * var(--st-w))", paddingBottom: "calc(0.05896 * var(--st-w))" }}>
        <div className="text-center">
          <h2 className="uppercase font-bold text-[20px] md:text-[26px] w-full text-center" style={{ color: "rgb(0, 0, 0)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", fontWeight: "700", letterSpacing: "0.01em" }}>
            <span>Sổ lưu bút</span>
          </h2>
        </div>

        <form onSubmit={handleSendWish} className="mt-5 mx-auto w-full max-w-full pr-2 md:max-w-[600px]">
          <div className="flex flex-col" style={{ backgroundColor: "transparent" }}>
            <div className="mb-4">
              <input
                placeholder="Nhập tên*"
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                required
                className="w-full rounded-[15px] border border-solid px-4 py-3 placeholder:text-gray-500 focus:outline-none text-[13px] md:text-[16px]"
                style={{ backgroundColor: "rgb(255, 255, 255)", borderColor: "rgba(0, 0, 0, 0.15)", color: "rgb(0, 0, 0)" }}
              />
            </div>

            <div className="mb-4">
              <textarea
                placeholder="Nhập lời chúc*"
                rows={3}
                value={wishMsg}
                onChange={(e) => setWishMsg(e.target.value)}
                required
                className="w-full rounded-[15px] border border-solid px-4 py-3 placeholder:text-gray-500 focus:outline-none text-[13px] md:text-[16px]"
                style={{ backgroundColor: "rgb(255, 255, 255)", borderColor: "rgba(0, 0, 0, 0.15)", color: "rgb(0, 0, 0)" }}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full px-7 py-2.5 text-xs md:text-sm font-semibold tracking-wider transition-transform hover:scale-[1.02] shadow-sm uppercase"
                style={{ backgroundColor: "rgb(0, 0, 0)", color: "rgb(255, 255, 255)" }}
              >
                <span>🪄 GỬI LỜI CHÚC</span>
              </button>
            </div>
          </div>
        </form>

        {/* Wishes List */}
        <div className="mt-6 w-full flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
          {wishes.map((w, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-black/10 bg-white/70 shadow-sm"
              style={{ fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-sm text-black">{w.name}</span>
                <span className="text-[10px] text-black/50">{w.at}</span>
              </div>
              <p className="text-xs text-black/80 leading-relaxed italic">"{w.msg}"</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
