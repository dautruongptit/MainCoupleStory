import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

interface ScheduleItem {
  time: string;
  title: string;
  icon?: string;
}

export function Schedule({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  const items: ScheduleItem[] = d.sched && d.sched.length > 0
    ? d.sched.map((s) => ({ time: s.time, title: s.text }))
    : [
        { time: "14:00", title: "Lễ gia tiên tại nhà gái", icon: "" },
        { time: "15:30", title: "Đón dâu", icon: "" },
        { time: "17:00", title: "Lễ gia tiên tại nhà trai", icon: "" },
        { time: "18:00", title: "Đón khách", icon: "/images/themes/applique-lace-white/home.webp" },
        { time: "18:30", title: "Khai tiệc", icon: "/images/themes/applique-lace-white/cake.webp" },
        { time: "19:30", title: "Hòa tấu", icon: "/images/themes/applique-lace-white/music.webp" }
      ];

  const title = d.schedTitle || "LỊCH TRÌNH NGÀY CƯỚI";

  return (
    <section className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))", paddingInline: "14.855%" }}>
      <div className="relative z-10 flex w-full flex-col items-center gap-3">
        <h2 className="uppercase font-bold text-[20px] md:text-[26px] w-full text-center" style={{ color: "rgb(255, 255, 255)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", fontWeight: "700", letterSpacing: "0.01em" }}>
          <span>{title}</span>
        </h2>

        <ol className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10" style={{ fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>
          {items.map((item: ScheduleItem, idx: number) => (
            <li key={idx} className="contents">
              <span className="pt-0.5 text-right text-[13px] md:text-[17px] tabular-nums tracking-wide leading-snug" style={{ color: "rgb(255, 255, 255)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>
                {item.time}
              </span>

              <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                {idx < items.length - 1 && (
                  <span className="absolute left-1/2 -translate-x-1/2 w-px top-1/2 -bottom-8 md:-bottom-10" style={{ backgroundColor: "color-mix(in srgb, rgb(255, 255, 255) 40%, transparent 60%)" }} />
                )}
                <span className="relative block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgb(255, 255, 255)" }} />
              </span>

              <div className="flex items-center gap-2">
                {item.icon && (
                  <img alt="" aria-hidden="true" className="block shrink-0 object-contain h-11 w-11 md:h-[60px] md:w-[60px]" src={item.icon} />
                )}
                <span className="text-[13px] leading-snug md:text-[17px]" style={{ color: "rgb(255, 255, 255)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>
                  {item.title}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
