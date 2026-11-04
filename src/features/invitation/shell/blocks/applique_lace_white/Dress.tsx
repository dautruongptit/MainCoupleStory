import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Dress({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  if (!d.dressOn) return null;
  const colors: string[] = d.dressColors && d.dressColors.length > 0
    ? d.dressColors
    : ["rgb(47, 42, 38)", "rgb(160, 139, 116)", "rgb(244, 239, 231)"];
  const title = d.dressTitle || "DRESS CODE";
  const note = d.dressText || "Trang phục dự tiệc";

  return (
    <section className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))", paddingTop: "calc(0.02268 * var(--st-w))" }}>
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 text-center">
        <div className="flex flex-col items-center gap-1">
          <h2 className="uppercase font-bold text-[20px] md:text-[26px] w-full text-center" style={{ color: "rgb(255, 255, 255)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", fontWeight: "700", letterSpacing: "0.01em" }}>
            <span>{title}</span>
          </h2>
          <p className="whitespace-pre-line text-[13px] md:text-[17px] text-center" style={{ color: "rgba(255, 255, 255, 0.7)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>
            <span>{note}</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {colors.map((c: string, idx: number) => (
            <div
              key={idx}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
              style={{
                backgroundColor: c,
                border: c.toLowerCase().includes("244") || c.toLowerCase().includes("fff") ? "1.5px solid rgba(255, 255, 255, 0.3)" : "none"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
