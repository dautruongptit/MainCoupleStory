import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Venue({ ctx }: { ctx: InvitationCtx }) {
  const { d } = ctx;
  const venue = d.locTitle || "Trung tâm Hội nghị Tiệc cưới Minh Anh";
  const address = d.address || "Đà Nẵng";
  const fullAddress = `${venue}, ${address}`;
  const mapUrl = d.mapUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=${encodeURIComponent(fullAddress)}`;

  return (
    <section className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))", paddingInline: "11.678%" }}>
      <section className="relative z-10 flex w-full flex-col items-center">
        <div className="relative text-center">
          <h3 className="w-full text-center text-[18px] font-bold uppercase md:text-[23px]" style={{ color: "rgb(255, 255, 255)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", fontWeight: "700", letterSpacing: "0.01em" }}>
            <span>Tiệc cưới sẽ tổ chức&nbsp;tại</span>
          </h3>
          <div className="whitespace-pre-line mt-3 flex w-full flex-col text-center text-[12px] leading-snug md:text-[15px]" style={{ backgroundColor: "transparent", color: "rgba(255, 255, 255, 0.7)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}>
            <span>{venue}{"\n"}{address}</span>
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-4 md:gap-5 w-full">
          <iframe
            className="relative z-10 mt-4 h-[267px] w-full overflow-hidden rounded-[15px] md:h-[420px]"
            src={embedUrl}
            allowFullScreen={true}
            referrerPolicy="no-referrer-when-downgrade"
            style={{ borderColor: "rgba(255, 255, 255, 0.7)" }}
          />
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-semibold transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: "transparent", color: "rgba(255, 255, 255, 0.7)", fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            <span>Chỉ đường</span>
          </a>
        </div>
      </section>
    </section>
  );
}
