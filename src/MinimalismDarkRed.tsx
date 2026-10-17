/**
 * Mẫu "Minimalism - Đỏ Đậm": màn mở thiệp và phần đầu thiệp, dựng lại từ HTML trang demo thật
 * (chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo). Chỉ phần đầu; phần thân dùng bố cục Minimalism chung.
 */
const BASE = "/images/themes/minimalism-dark-red";
const HEART = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
const serif = '"Lora", "Times New Roman", serif';

const HEARTS = [
  { left: "30%", size: 13, color: "#a8323b", dur: 24.9, delay: -21 },
  { left: "17%", size: 22, color: "#ece4d8", dur: 25.9, delay: -10 },
  { left: "70%", size: 17, color: "#c9a24a", dur: 25.7, delay: -8 },
  { left: "34%", size: 23, color: "#a8323b", dur: 20.1, delay: -19 },
  { left: "26%", size: 23, color: "#c9a24a", dur: 25.6, delay: -13 },
  { left: "83%", size: 22, color: "#c9a24a", dur: 25, delay: -1 },
  { left: "9%", size: 18, color: "#a8323b", dur: 23, delay: -3 },
];

export function DarkRedCover({
  groom, bride, dateText, guest, message, onOpen,
}: { groom: string; bride: string; dateText: string; guest?: string; message?: string; onOpen: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(to bottom right, #6e1a20, #511419, #380a0e)" }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {HEARTS.map((p, i) => (
          <div key={i} className="absolute" style={{ left: p.left, top: -30, color: p.color, fontSize: p.size, animation: `ambient-fall ${p.dur}s ease-in-out ${p.delay}s infinite` }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d={HEART} /></svg>
          </div>
        ))}
      </div>
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
          <div className="absolute left-1/2 rounded-full flex items-center justify-center" style={{ top: 50, width: 56, height: 56, transform: "translate(-50%, -50%)", background: "radial-gradient(circle at 30% 30%, #511419, rgb(51, 0, 0))", boxShadow: "0 4px 20px rgba(81, 20, 25, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)", zIndex: 30, animation: "seal-pulse 2s ease-in-out infinite" }}>
            <svg style={{ fill: "#f3e8de" }} viewBox="0 0 24 24" className="w-7 h-7"><path d={HEART} /></svg>
          </div>
          <div className="relative rounded-lg" style={{ boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(81, 20, 25, 0.15)" }}>
            <div className="absolute inset-0 rounded-lg overflow-hidden" style={{ background: "rgba(255, 250, 243, 0.96)", border: "1px solid rgba(81, 20, 25, 0.15)", clipPath: "inset(0 round 8px)" }}>
              <img src={`${BASE}/flower2-decoration.webp`} alt="" aria-hidden="true" className="absolute pointer-events-none h-36 md:h-70 w-auto max-w-none top-[-5%] md:top-[-2%] left-[-10px] -translate-x-[6%] md:-translate-x-[11%] opacity-80 rotate-[25deg]" />
              <img src={`${BASE}/flower2-decoration.webp`} alt="" aria-hidden="true" className="absolute pointer-events-none h-36 md:h-70 w-auto max-w-none bottom-[-5%] md:bottom-[35%] right-[-10px] translate-x-[6%] md:translate-x-[11%] -scale-x-100 opacity-80 -rotate-[25deg]" />
            </div>
            <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
              <h1 className="mb-2 flex flex-col items-center leading-tight text-3xl sm:text-4xl font-normal" style={{ color: "#511419", fontFamily: '"Viaoda Libre", "EB Garamond", serif' }}>
                <span className="block w-full text-center">{groom}</span>
                <span className="block w-full text-center text-lg leading-none sm:text-xl" style={{ fontFamily: '"Baskerville", "Times New Roman", serif' }}>&amp;</span>
                <span className="block w-full text-center">{bride}</span>
              </h1>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-10 h-px" style={{ background: "linear-gradient(to right, transparent, #511419)" }} />
                <span className="text-sm" style={{ color: "#511419", opacity: 0.7 }}>❦</span>
                <div className="w-10 h-px" style={{ background: "linear-gradient(to left, transparent, #511419)" }} />
              </div>
              <div className="text-[18px] mb-5 flex flex-col items-center" style={{ color: "rgba(81, 20, 25, 0.72)", fontFamily: serif }}><span>{dateText}</span></div>
              <div className="mb-6 max-w-[300px] md:max-w-[380px] mx-auto">
                <p className="text-[18px] font-light mb-2" style={{ color: "rgba(81, 20, 25, 0.72)", fontFamily: serif }}>Thân Mời</p>
                {guest && guest !== "Thân Mời" && <p className="text-[18px] font-medium" style={{ color: "#511419", fontFamily: serif }}>{guest}</p>}
                {guest && guest !== "Thân Mời" && message && <p className="text-[16px] font-light" style={{ color: "rgba(81, 20, 25, 0.72)", fontFamily: serif }}>{message}</p>}
              </div>
              <button type="button" onClick={onOpen} className="relative px-8 py-2.5 text-lg font-semibold sm:font-medium rounded-full shadow-lg cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden border-none" style={{ backgroundColor: "#511419", color: "#f3e8de", boxShadow: "0 4px 14px rgba(81, 20, 25, 0.35)", fontFamily: serif }}>
                <span>Mở thiệp</span>
                <div className="absolute top-0 h-full w-8 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)", animation: "shine 3s ease-in-out infinite" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DarkRedHeader({ groom, bride, intro, photo }: { groom: string; bride: string; intro: string; photo?: string }) {
  return (
    <div className="relative w-full max-w-[480px] md:max-w-[900px] md:mx-auto overflow-hidden isolate" style={{ backgroundColor: "#fff7eb", color: "#511419" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: `url("${BASE}/paper.webp")`, backgroundSize: "100% auto", backgroundPosition: "top center", mixBlendMode: "multiply", opacity: 0.5 }} />
      <header className="relative z-10 flex flex-col items-center overflow-x-clip px-9 pt-16 pb-14 text-center">
        <img src={`${BASE}/castle-background.webp`} alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain opacity-[0.1] left-1/2 top-[26%] w-[170%] -translate-x-1/2" />
        <p className="relative z-10 whitespace-pre-line text-[15px] uppercase md:text-[18px]" style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif', color: "#590310", letterSpacing: "0.16em", fontWeight: 600 }}>{intro}</p>
        <div className="relative z-10 mt-24 w-[82%] max-w-[330px] md:mt-28 md:max-w-[420px]">
          <div className="relative aspect-[333/384]">
            <img src={`${BASE}/envelope-background.webp`} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 w-full max-w-none" />
            <div className="absolute left-[33%] top-[-2%] z-20 w-[64%]">
              <div className="aspect-[221/309] rotate-[12deg] border-[7px] border-white bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.25)]">
                {photo && <img src={photo} alt="" className="h-full w-full object-cover" />}
              </div>
            </div>
            <span aria-hidden="true" className="pointer-events-none absolute block -left-[2%] -top-[12%] z-[25] w-[42%]">
              <img src={`${BASE}/flower2-decoration.webp`} alt="" className="block w-full max-w-none object-contain drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)] rotate-[-17deg]" />
            </span>
            <img src={`${BASE}/envelope-cover.webp`} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 z-30 w-full max-w-none" />
          </div>
        </div>
        <div className="relative z-10 mt-16 flex flex-col items-center gap-[22px] md:mt-20">
          <p className="text-[clamp(38px,11vw,46px)] leading-none md:text-[58px]" style={{ fontFamily: '"Viaoda Libre", "The Nautigal", cursive', color: "#511419" }}>{groom}</p>
          <span aria-hidden="true" className="pointer-events-none absolute top-[37%] -translate-y-1/2 text-[92px] leading-none md:text-[120px]" style={{ fontFamily: '"The Nautigal", cursive', color: "rgba(81,20,25,0.15)" }}>&amp;</span>
          <p className="text-[clamp(38px,11vw,46px)] leading-none md:text-[58px]" style={{ fontFamily: '"Viaoda Libre", "The Nautigal", cursive', color: "#511419" }}>{bride}</p>
        </div>
      </header>
    </div>
  );
}
