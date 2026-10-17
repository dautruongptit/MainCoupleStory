/**
 * Mẫu "Long Phụng V2 - Đỏ": màn hình mở thiệp và phần đầu thiệp, dựng lại từ HTML trang demo thật
 * (chungdoi.com/vi/mau-thiep/long-phung-v2-do/demo). Dùng class Tailwind (chỉ nạp cho Preview.tsx và tệp này).
 * Ảnh lấy trực tiếp từ chungdoi.com giống các mẫu Song Phụng.
 */
const BASE = "/images/themes/longphung-v2-red";

const PETALS = [
  { left: "55%", size: 19, color: "#C41E3A", dur: 21.7, delay: -11 },
  { left: "70%", size: 20, color: "#C41E3A", dur: 23.3, delay: -10 },
  { left: "58%", size: 18, color: "#C41E3A", dur: 21.3, delay: -19 },
  { left: "85%", size: 13, color: "#D4A017", dur: 24.6, delay: -15 },
  { left: "43%", size: 22, color: "#C41E3A", dur: 20.7, delay: -4 },
  { left: "49%", size: 20, color: "#B22222", dur: 18.9, delay: -13 },
  { left: "30%", size: 10, color: "#B22222", dur: 21.4, delay: -2 },
  { left: "73%", size: 19, color: "#B22222", dur: 24.6, delay: -11 },
  { left: "50%", size: 22, color: "#E8A735", dur: 25.7, delay: -16 },
  { left: "27%", size: 15, color: "#B22222", dur: 25.9, delay: -1 },
  { left: "40%", size: 21, color: "#E8A735", dur: 19.7, delay: -8 },
];

const lora = '"Lora", "Times New Roman", serif';

export function LongPhungCover({
  groom, bride, dateText, guest, message, onOpen,
}: { groom: string; bride: string; dateText: string; guest?: string; message?: string; onOpen: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" style={{ background: `url('${BASE}/bg-frame.jpg') center/cover` }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {PETALS.map((p, i) => (
          <div key={i} className="absolute" style={{ left: p.left, bottom: -30, color: p.color, fontSize: p.size, animation: `ambient-rise ${p.dur}s ease-in-out ${p.delay}s infinite` }}>囍</div>
        ))}
      </div>
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
          <div
            className="absolute left-1/2 rounded-full flex items-center justify-center"
            style={{ top: 50, width: 56, height: 56, transform: "translate(-50%, -50%)", background: "radial-gradient(circle at 30% 30%, #e9ce9e, rgb(203, 176, 128))", boxShadow: "0 4px 20px rgba(233, 206, 158, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)", zIndex: 30, animation: "seal-pulse 2s ease-in-out infinite" }}
          >
            <span className="text-[26px] leading-none" style={{ color: "#4a0808", opacity: 0.9, fontFamily: "serif" }} aria-hidden="true">囍</span>
          </div>
          <div className="relative rounded-lg" style={{ boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(233, 206, 158, 0.15)" }}>
            <div className="absolute inset-0 rounded-lg overflow-hidden" style={{ background: "#680d0e", border: "1px solid rgba(233, 206, 158, 0.15)", clipPath: "inset(0 round 8px)" }}>
              <img src={`${BASE}/phuong.webp`} alt="" aria-hidden="true" className="absolute pointer-events-none w-[200px] md:w-[280px] -top-[10px] -left-[70px] md:-top-[20px] md:-left-[90px] opacity-30" />
              <img src={`${BASE}/rong.webp`} alt="" aria-hidden="true" className="absolute pointer-events-none w-[200px] md:w-[280px] -bottom-[40px] -right-[70px] md:-bottom-[100px] md:-right-[90px] opacity-30" />
              <img src={`${BASE}/cloud.webp`} alt="" aria-hidden="true" className="absolute pointer-events-none w-[80px] md:w-[100px] top-2 right-2 md:top-3 md:right-3 opacity-20" />
            </div>
            <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
              <h1 className="mb-2 flex flex-col items-center leading-tight text-3xl sm:text-4xl font-normal" style={{ color: "#e9ce9e", fontFamily: '"EB Garamond", serif' }}>
                <span className="block w-full text-center">{groom}</span>
                <span className="block w-full text-center text-lg leading-none sm:text-xl" style={{ fontFamily: '"Baskerville", "Times New Roman", serif' }}>&amp;</span>
                <span className="block w-full text-center">{bride}</span>
              </h1>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-10 h-px" style={{ background: "linear-gradient(to right, transparent, #e9ce9e)" }} />
                <span className="text-sm" style={{ color: "#e9ce9e", opacity: 0.7 }}>❦</span>
                <div className="w-10 h-px" style={{ background: "linear-gradient(to left, transparent, #e9ce9e)" }} />
              </div>
              <div className="text-[18px] mb-5 flex flex-col items-center" style={{ color: "rgba(233, 206, 158, 0.8)", fontFamily: lora }}>
                <span>{dateText}</span>
              </div>
              <div className="mb-6">
                <p className="text-[18px] font-light mb-2" style={{ color: "rgba(233, 206, 158, 0.8)", fontFamily: lora }}>Thân Mời</p>
                {guest && (
                  <div className="inline-block px-5 py-2.5 rounded-xl mb-2 max-w-full [overflow-wrap:anywhere]" style={{ backgroundColor: "rgba(233, 206, 158, 0.15)" }}>
                    <h2 className="text-lg sm:text-xl font-semibold sm:font-medium" style={{ color: "#e9ce9e", fontFamily: lora }}>{guest}</h2>
                  </div>
                )}
                {message && <p className="text-[16px] font-light" style={{ color: "rgba(233, 206, 158, 0.8)", fontFamily: lora }}>{message}</p>}
              </div>
              <button
                type="button"
                onClick={onOpen}
                className="relative px-8 py-2.5 text-lg font-semibold sm:font-medium rounded-full shadow-lg cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden border-none"
                style={{ backgroundColor: "#e9ce9e", color: "#4a0808", boxShadow: "0 4px 14px rgba(233, 206, 158, 0.35)", fontFamily: lora }}
              >
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

export function LongPhungHeader({ groom, bride }: { groom: string; bride: string }) {
  return (
    <div className="relative w-full max-w-[480px] md:max-w-[900px] md:mx-auto overflow-hidden" style={{ backgroundColor: "#680e0e", color: "#ffe3b1" }}>
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0" style={{ opacity: 0.06 }}>
        <img src={`${BASE}/rong-phuong.webp`} alt="" className="w-full" />
      </div>
      <header className="relative flex flex-col items-center justify-center text-center z-10 pt-16 pb-8">
        <div className="w-full flex items-center justify-center py-3 md:py-4 mb-8" style={{ backgroundColor: "#ffe3b1" }}>
          <img src={`${BASE}/chu-hy.webp`} alt="Chữ Hỷ" className="w-[32px] md:w-[48px] h-[32px] md:h-[48px] object-contain" />
        </div>
        <div className="flex flex-col items-center gap-0" style={{ color: "#ffe3b1", fontFamily: '"The Nautigal", cursive' }}>
          <div className="text-[50px] md:text-[60px] leading-[1.2]">{groom}</div>
          <div className="text-[38px] md:text-[45px] leading-[1.2]">&amp;</div>
          <div className="text-[50px] md:text-[60px] leading-[1.2]">{bride}</div>
        </div>
        <div className="relative flex items-start justify-center gap-2 md:gap-4 mt-8 w-full max-w-[420px] md:max-w-[520px]">
          <div className="w-[160px] md:w-[220px] h-[240px] md:h-[330px]"><img src={`${BASE}/phuong.webp`} alt="Phượng" className="w-full h-full object-contain" /></div>
          <div className="w-[170px] md:w-[230px] h-[240px] md:h-[330px] mt-8 md:mt-12"><img src={`${BASE}/rong.webp`} alt="Rồng" className="w-full h-full object-contain" /></div>
        </div>
      </header>
    </div>
  );
}
