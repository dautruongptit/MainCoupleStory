import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { formatTime, parseDate, WEEKDAYS_FULL } from "@/utils/date";
import { lunarLabel } from "@/utils/lunar";

export function Banquet({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  const bDateStr = d.date || "2027-06-12";
  const bDateObj = parseDate(bDateStr);
  const bDay = String(bDateObj.getDate()).padStart(2, "0");
  const bMonth = String(bDateObj.getMonth() + 1).padStart(2, "0");
  const bYear = String(bDateObj.getFullYear());
  const bWeekday = WEEKDAYS_FULL[bDateObj.getDay()] || "THỨ BẢY";
  const bTime = d.startTime ? formatTime(d.startTime) : (d.time ? formatTime(d.time) : "18:00");
  const bLunar = bDateStr ? lunarLabel(bDateObj) : "8 tháng 5 năm Đinh Mùi";
  const bVenue = d.locTitle || "Trung tâm Hội nghị Tiệc cưới Minh Anh";
  const bTitle = d.banquetTitle || "THÔNG TIN TIỆC CƯỚI";

  return (
    <div className="relative isolate mx-auto flex flex-col justify-center" style={{ width: "93.424%", minHeight: "759.812px", marginTop: "calc(0.05215 * var(--st-w))" }}>
      <div className="pointer-events-none absolute inset-0 -z-10 flex flex-col" aria-hidden="true" style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)" }}>
        <div className="absolute -z-10" style={{ left: "calc(0.03628 * var(--st-w))", right: "calc(0.03628 * var(--st-w))", top: "calc(0.04308 * var(--st-w))", bottom: "calc(0.04989 * var(--st-w))", backgroundColor: "rgb(252, 253, 253)" }}></div>
        <img alt="" className="aspect-[859/224] w-full shrink-0 object-fill" src="/images/themes/applique-lace-white/lace1.webp" />
        <div className="-mt-px -mb-px min-h-0 w-full flex-1" style={{ backgroundImage: "url(\"/images/themes/applique-lace-white/lace2.webp\")", backgroundRepeat: "repeat-y", backgroundSize: "100% 142.848px", backgroundPosition: "center 1px" }}></div>
        <img alt="" className="aspect-[859/238] w-full shrink-0 object-fill" src="/images/themes/applique-lace-white/lace3.webp" />
      </div>

      <div className="relative flex flex-col items-center w-full" style={{ paddingInline: "12.379%", paddingTop: "16.262%", paddingBottom: "17.476%" }}>
        <h2 className="uppercase font-bold text-[20px] md:text-[26px] w-full whitespace-pre-line text-center !text-[18px] md:!text-[24px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", fontWeight: "700", letterSpacing: "0.01em" }}>
          <span>{bTitle}</span>
        </h2>

        <div className="relative flex w-full flex-col items-center" style={{ marginTop: "calc(0.04762 * var(--st-w))" }}>
          <h3 className="flex flex-col items-center text-center text-[16px] md:text-[20px] font-semibold uppercase leading-[1.4]" style={{ color: "rgb(0, 0, 0)", fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif" }}>
            <span>Tiệc cưới sẽ diễn ra vào&nbsp;lúc:</span>
          </h3>

          <div className="flex w-full max-w-[160px] items-start justify-between text-[13px] uppercase md:max-w-[215px] md:text-[17px] whitespace-nowrap min-w-max gap-x-3" style={{ color: "rgb(143, 121, 100)", fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif", fontWeight: "600", marginTop: "calc(0.02 * var(--st-w))" }}>
            <span>{bTime}</span>
            <span><span>{bWeekday}</span></span>
          </div>

          <div className="flex items-center justify-center gap-[9px] md:gap-3" style={{ color: "rgb(0, 0, 0)", marginTop: "calc(0.02 * var(--st-w))" }}>
            <span className="text-[53px] leading-none md:text-[70px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif" }}>{bDay}</span>
            <div className="h-[46px] w-[1px] md:h-[62px]" style={{ backgroundColor: "rgb(0, 0, 0)", opacity: "0.45" }}></div>
            <div className="flex flex-col items-start justify-center gap-1 text-left">
              <span className="text-[14px] uppercase md:text-[18px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}><span>THÁNG {bMonth}</span></span>
              <span className="text-[14px] uppercase md:text-[18px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>{bYear}</span>
            </div>
          </div>

          <div className="text-[11px] uppercase tracking-normal md:text-sm" style={{ color: "rgb(143, 121, 100)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", marginTop: "calc(0.015 * var(--st-w))" }}>
            (Tức ngày {bLunar})
          </div>

          <div className="mt-4 text-center">
            <p className="text-[14px] md:text-[18px] font-medium" style={{ color: "rgb(0, 0, 0)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>
              {bVenue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
