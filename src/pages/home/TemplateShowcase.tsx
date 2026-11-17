import { useEffect, useRef, useState } from "react";
import { navigate } from "@/app/router";
import { TEMPLATE_ROW_BY_ID, TPL_CDN } from "@/features/templates/data/templates";

/**
 * Mục "Mẫu thiệp cưới online đẹp nhất" ở trang chủ — dựng theo markup và số đo thật của trang chủ gốc
 * (đo 17/11/2026 ở 1920 / 1280 / 390: docs/survey/raw/home_coverflow_*.json). Markup dùng Tailwind v4 + daisyUI
 * nên nằm trong `.inv-root` (thư mục này có trong @source của invitation.src.css).
 *
 * Băng trượt là vòng tròn 20 thẻ. Thẻ lệch `d` bậc so với thẻ đang chọn (d ∈ [-9, 10]):
 *   transform: translateX(d·60%) translateZ(−|d|·150px) rotateY(d·45deg) scale(1 | 0.85 | 0.7)
 *   opacity: 1 | 0.75 | 0.5 | 0.3 ;  z-index: 100 − |d|
 * Tự chuyển sang thẻ kế mỗi 4 giây. Ảnh là ảnh listing (dải dọc): thẻ đang chọn trôi từ đầu xuống cuối trong 15 giây
 * (object-position: center top → center bottom), thẻ khác đứng ở đầu.
 */
const SHOWCASE_IDS = [
  "minimalism_darkred", "minimalism_brown", "song_hy_green", "song_hy_v2_red", "boho_floral_green", "marble_yellow",
  "minimalism_darkbrown", "silk_ribbon_darkred", "song_hy_red", "dragon_phoenix_v3_red", "silk_ribbon_green", "double_dragon_red",
  "minimalism_green", "dragon_phoenix_v2_red", "jasmine_white", "dragon_phoenix_red", "lien_hoa_v2_green", "glass_garden_pink",
  "minimalism_red", "double_phoenix_red",
];
const ITEMS = SHOWCASE_IDS.flatMap((id) => {
  const row = TEMPLATE_ROW_BY_ID[id];
  return row ? [{ id, name: row.name, img: TPL_CDN + row.img }] : [];
});
const AUTOPLAY_MS = 4000;

/** Độ lệch vòng tròn của thẻ i so với thẻ đang chọn, trong khoảng (−n/2, n/2]. */
function offsetOf(i: number, active: number, n: number): number {
  let d = (((i - active) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

function cardStyle(d: number): React.CSSProperties {
  const a = Math.abs(d);
  const scale = a === 0 ? 1 : a === 1 ? 0.85 : 0.7;
  const opacity = a === 0 ? 1 : a === 1 ? 0.75 : a === 2 ? 0.5 : 0.3;
  return {
    width: "clamp(180px, 45vw, 280px)",
    transform: `translateX(${d * 60}%) translateZ(${a === 0 ? 0 : -a * 150}px) rotateY(${d * 45}deg) scale(${scale})`,
    opacity,
    zIndex: 100 - a,
    transformStyle: "preserve-3d",
  };
}

export default function TemplateShowcase() {
  const n = ITEMS.length;
  const [active, setActive] = useState(0);
  // đổi `tick` để đặt lại đồng hồ tự chuyển sau khi người dùng tự bấm
  const [tick, setTick] = useState(0);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (n < 2) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [n, tick]);

  const go = (i: number) => { setActive(((i % n) + n) % n); setTick((t) => t + 1); };

  return (
    <div className="inv-root">
      <section className="py-16 bg-base-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-3">
              Mẫu thiệp cưới online <span className="text-primary" style={{ fontFamily: "Pattaya, cursive" }}>đẹp nhất</span>
            </h2>
            <p className="text-base-content/70">Khám phá những mẫu thiệp cưới được thiết kế tinh tế và hiện đại</p>
          </div>
          <div
            className="relative h-[400px] md:h-[500px] touch-pan-y"
            style={{ perspective: "1000px" }}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
            }}
          >
            <button
              type="button"
              className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-[200] bg-white/90 hover:bg-white text-base-content p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 items-center justify-center"
              aria-label="Previous"
              onClick={() => go(active - 1)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              type="button"
              className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-[200] bg-white/90 hover:bg-white text-base-content p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 items-center justify-center"
              aria-label="Next"
              onClick={() => go(active + 1)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
              {ITEMS.map((tpl, i) => {
                const d = offsetOf(i, active, n);
                return (
                  <article
                    key={tpl.id}
                    className="absolute cursor-pointer aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out "
                    style={cardStyle(d)}
                    onClick={() => go(i)}
                  >
                    <div className="relative w-full h-full bg-base-200 overflow-hidden homepage-template-preview">
                      <img
                        alt={tpl.name}
                        decoding="async"
                        className="object-cover homepage-template-image transition-[object-position] duration-[15s] ease-in-out"
                        src={tpl.img}
                        loading="lazy"
                        style={{ position: "absolute", height: "100%", width: "100%", inset: 0, objectPosition: d === 0 ? "center bottom" : "center top", color: "transparent" }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <h3 className="text-white text-sm font-semibold truncate">{tpl.name}</h3>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {ITEMS.map((tpl, i) => (
              <button
                key={tpl.id}
                type="button"
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? "bg-primary w-8" : "bg-base-300 hover:bg-base-content/30 w-2"}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-primary text-primary-content px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:brightness-90 transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/vi/mau-thiep")}
            >
              Xem tất cả mẫu thiệp
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            <p className="text-base-content/60 text-sm mt-3">Những mẫu thiệp độc đáo đang chờ bạn</p>
          </div>
        </div>
      </section>
    </div>
  );
}
