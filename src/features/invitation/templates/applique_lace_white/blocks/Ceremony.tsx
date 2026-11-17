import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { formatTime, parseDate, WEEKDAYS_FULL } from "@/utils/date";
import { lunarLabel } from "@/utils/lunar";

export function Ceremony({ ctx }: { ctx: InvitationCtx }) {
  const { d, gName, bName } = ctx;
  const groomFather = d.groomFather || "Trịnh Minh Tuấn";
  const groomMother = d.groomMother || "Trịnh Tuệ Anh";
  const brideFather = d.brideFather || "Đinh Văn Toàn";
  const brideMother = d.brideMother || "Đinh Thanh Trúc";

  const gFull = d.groomFull || gName || "Trịnh Anh Tuấn";
  const bFull = d.brideFull || bName || "Đinh Thu Hà";

  const c1 = d.ceremonies?.[0];
  const cDateStr = c1?.date || d.date || "2027-06-12";
  const cDateObj = parseDate(cDateStr);
  const cDay = String(cDateObj.getDate()).padStart(2, "0");
  const cMonth = String(cDateObj.getMonth() + 1).padStart(2, "0");
  const cYear = String(cDateObj.getFullYear());
  const cWeekday = WEEKDAYS_FULL[cDateObj.getDay()] || "THỨ BẢY";
  const cTime = c1?.time ? formatTime(c1.time) : (d.welcomeTime ? formatTime(d.welcomeTime) : (d.time ? formatTime(d.time) : "18:00"));
  const cLunar = c1?.lunar || (cDateStr ? lunarLabel(cDateObj) : "8 tháng 5 năm Đinh Mùi");
  const cVenue = c1?.place || d.locTitle || "Trung tâm Hội nghị Tiệc cưới Minh Anh";

  const c2 = d.ceremonies?.[1];
  const bDateStr = c2?.date || d.date || "2027-06-12";
  const bDateObj = parseDate(bDateStr);
  const bDay = String(bDateObj.getDate()).padStart(2, "0");
  const bMonth = String(bDateObj.getMonth() + 1).padStart(2, "0");
  const bYear = String(bDateObj.getFullYear());
  const bWeekday = WEEKDAYS_FULL[bDateObj.getDay()] || "THỨ BẢY";
  const bTime = c2?.time ? formatTime(c2.time) : (d.startTime ? formatTime(d.startTime) : "19:30");
  const bLunar = c2?.lunar || (bDateStr ? lunarLabel(bDateObj) : "8 tháng 5 năm Đinh Mùi");
  const bVenue = c2?.place || d.locTitle || "Trung tâm Hội nghị Tiệc cưới Minh Anh";

  return (
    <div className="relative isolate mx-auto flex flex-col justify-center" style={{ width: "93.424%", minHeight: "871.875px", marginTop: "calc(0.05215 * var(--st-w))" }}>
      <div className="pointer-events-none absolute inset-0 -z-10 flex flex-col" aria-hidden="true" style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)" }}>
        <div className="absolute -z-10" style={{ left: "calc(0.03628 * var(--st-w))", right: "calc(0.03628 * var(--st-w))", top: "calc(0.04308 * var(--st-w))", bottom: "calc(0.04989 * var(--st-w))", backgroundColor: "rgb(252, 253, 253)" }}></div>
        <img alt="" className="aspect-[859/224] w-full shrink-0 object-fill" src="/images/themes/applique-lace-white/lace1.webp" />
        <div className="-mt-px -mb-px min-h-0 w-full flex-1" style={{ backgroundImage: "url(\"/images/themes/applique-lace-white/lace2.webp\")", backgroundRepeat: "repeat-y", backgroundSize: "100% 136.691px", backgroundPosition: "center 1px" }}></div>
        <img alt="" className="aspect-[859/238] w-full shrink-0 object-fill" src="/images/themes/applique-lace-white/lace3.webp" />
      </div>

      <div className="relative flex flex-col items-center w-full" style={{ paddingInline: "12.379%", paddingTop: "16.262%", paddingBottom: "17.476%" }}>
        <h2 className="uppercase font-bold text-[20px] md:text-[26px] w-full whitespace-pre-line text-center !text-[17px] md:!text-[22px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", fontWeight: "700", letterSpacing: "0.01em" }}>
          <span>THÔNG TIN LỄ&nbsp;CƯỚI</span>
        </h2>

        <div className="grid w-full grid-cols-[1fr_auto_1fr] grid-rows-[repeat(4,auto)] gap-x-[12px] gap-y-[3px] md:gap-x-6" style={{ fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif", marginTop: "calc(0.03175 * var(--st-w))" }}>
          <div className="row-span-4 grid min-w-0 grid-rows-subgrid justify-items-center text-center">
            <span className="text-[10px] md:text-[13px]" style={{ color: "rgb(143, 121, 100)" }}><span>Ông Bà</span></span>
            <span className="font-semibold [overflow-wrap:anywhere]" style={{ fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif", color: "rgb(0, 0, 0)", fontSize: "10px" }}><span>{groomFather}</span></span>
            <span className="font-semibold [overflow-wrap:anywhere]" style={{ fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif", color: "rgb(0, 0, 0)", fontSize: "10px" }}><span>{groomMother}</span></span>
          </div>
          <div className="row-span-4 h-[50px] w-[1px] self-center md:h-[68px]" style={{ backgroundColor: "rgb(0, 0, 0)", opacity: "0.45" }}></div>
          <div className="row-span-4 grid min-w-0 grid-rows-subgrid justify-items-center text-center">
            <span className="text-[10px] md:text-[13px]" style={{ color: "rgb(143, 121, 100)" }}><span>Ông Bà</span></span>
            <span className="font-semibold [overflow-wrap:anywhere]" style={{ fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif", color: "rgb(0, 0, 0)", fontSize: "10px" }}><span>{brideFather}</span></span>
            <span className="font-semibold [overflow-wrap:anywhere]" style={{ fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif", color: "rgb(0, 0, 0)", fontSize: "10px" }}><span>{brideMother}</span></span>
          </div>
        </div>

        <div className="relative flex flex-col text-center text-[16px] md:text-[20px] uppercase leading-[1.5] tracking-[0.02em] mx-auto md:max-w-[560px]" style={{ whiteSpace: "pre-line", fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif", color: "rgb(0, 0, 0)", marginTop: "calc(0.03628 * var(--st-w))" }}>
          <span>Hai gia đình trân trọng báo tin lễ thành hôn của hai con chúng tôi</span>
        </div>

        <div className="relative w-full" style={{ marginTop: "calc(0.02268 * var(--st-w))" }}>
          <div className="w-full min-w-0 flex w-full flex-col items-center text-center">
            <h3 className="w-[80%] min-h-[80px] flex items-center justify-center leading-[50px] md:leading-[100px] whitespace-nowrap" style={{ fontSize: "33px", fontFamily: "\"Viaoda Libre\", \"EB Garamond\", ChungDoiIndic, serif", color: "rgb(0, 0, 0)" }}>{gFull}</h3>
            <div className="text-[35px] leading-none md:text-[46px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "\"Clicker Script\", \"Alex Brush\", ChungDoiIndic, cursive" }}>&amp;</div>
            <h3 className="w-[80%] min-h-[80px] flex items-center justify-center leading-[50px] md:leading-[100px] whitespace-nowrap" style={{ fontSize: "33px", fontFamily: "\"Viaoda Libre\", \"EB Garamond\", ChungDoiIndic, serif", color: "rgb(0, 0, 0)" }}>{bFull}</h3>
          </div>
        </div>

        <div className="relative flex w-full flex-col items-center" style={{ marginTop: "calc(0.03175 * var(--st-w))", gap: "calc(0.04989 * var(--st-w))" }}>
          {/* Lễ Thành Hôn */}
          <div className="relative flex flex-col items-center gap-[6px] text-center md:gap-3" style={{ fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif" }}>
            <div style={{ color: "rgb(0, 0, 0)" }}>
              <span className="whitespace-pre-line flex flex-col items-center text-center text-[16px] md:text-[20px] uppercase leading-[1.5] tracking-[0.02em]">
                {c1?.title || "LỄ THÀNH HÔN"}{"\n"}{cVenue}
              </span>
            </div>
            <div className="flex w-full max-w-[150px] items-start justify-between text-[10px] uppercase md:max-w-[200px] md:text-[13px] whitespace-nowrap min-w-max gap-x-3" style={{ color: "rgb(143, 121, 100)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>
              <span>VÀO LÚC {cTime}</span>
              <span><span>{cWeekday}</span></span>
            </div>
            <div className="flex items-center justify-center gap-[9px] md:gap-3" style={{ color: "rgb(0, 0, 0)" }}>
              <span className="text-[50px] leading-none md:text-[66px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif" }}>{cDay}</span>
              <div className="h-[39px] w-[1px] md:h-[52px]" style={{ backgroundColor: "rgb(0, 0, 0)", opacity: "0.45" }}></div>
              <div className="flex flex-col items-start justify-center gap-1 text-left">
                <span className="text-[14px] uppercase md:text-[18px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}><span>THÁNG {cMonth}</span></span>
                <span className="text-[14px] uppercase md:text-[18px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>{cYear}</span>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-normal md:text-sm" style={{ color: "rgb(143, 121, 100)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>
              (Tức ngày {cLunar})
            </div>
          </div>

          {/* Tiệc Cưới */}
          <div className="relative flex flex-col items-center gap-[6px] text-center md:gap-3" style={{ fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif" }}>
            <div style={{ color: "rgb(0, 0, 0)" }}>
              <span className="whitespace-pre-line flex flex-col items-center text-center text-[16px] md:text-[20px] uppercase leading-[1.5] tracking-[0.02em]">
                {c2?.title || d.banquetTitle || "TIỆC CƯỚI"}{"\n"}{bVenue}
              </span>
            </div>
            <div className="flex w-full max-w-[150px] items-start justify-between text-[10px] uppercase md:max-w-[200px] md:text-[13px] whitespace-nowrap min-w-max gap-x-3" style={{ color: "rgb(143, 121, 100)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>
              <span>VÀO LÚC {bTime}</span>
              <span><span>{bWeekday}</span></span>
            </div>
            <div className="flex items-center justify-center gap-[9px] md:gap-3" style={{ color: "rgb(0, 0, 0)" }}>
              <span className="text-[50px] leading-none md:text-[66px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "Baskerville, \"Libre Baskerville\", \"Times New Roman\", ChungDoiIndic, serif" }}>{bDay}</span>
              <div className="h-[39px] w-[1px] md:h-[52px]" style={{ backgroundColor: "rgb(0, 0, 0)", opacity: "0.45" }}></div>
              <div className="flex flex-col items-start justify-center gap-1 text-left">
                <span className="text-[14px] uppercase md:text-[18px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}><span>THÁNG {bMonth}</span></span>
                <span className="text-[14px] uppercase md:text-[18px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>{bYear}</span>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-normal md:text-sm" style={{ color: "rgb(143, 121, 100)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>
              (Tức ngày {bLunar})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
