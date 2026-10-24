import React, { useState, useRef, useEffect } from "react";
import type { Inv } from "@/types/invitation";
import { groomShown, brideShown } from "@/utils/format";
import { parseDate, buildIcs } from "@/utils/date";

export interface HoaMocXanhProps {
  d: Inv;
  set: (p: Partial<Inv>) => void;
  standalone?: boolean;
}

const DEFAULT_PHOTOS = [
  "/images/photo-library/design/5019eadee002f02ce6f39d9c5bdb7304d4da683b4e109c41e7ed14e63391d9b0.webp",
  "/images/photo-library/design/1f83fb78c75b96a05661eca4cbc50dd771fc37411920623d6d9729eea1daa7c8.webp",
  "/images/photo-library/design/a4bacc8760315d26e8660bcd2943d479c968e7e92892d2e367cfab6facb63017.webp",
  "/images/photo-library/design/655375b2b2c6edb9772053c6a2150a6247ccf7002f69a1b733f682fa05d6309f.webp",
  "/images/photo-library/design/fb57414f47aa2c9189bc9fa20f34d557dd1a4cd13a908fd30633275ca5abaf6d.webp",
  "/images/photo-library/design/76763999ecb5db3569cea7991a2ea4fdf32e4a2639daeb28c6f2a9b5fdf6f313.webp",
  "/images/photo-library/design/da4ca736067f9572362cd90a28e95274e985ffa76cc58e3c36b23219ebf4f6f7.webp",
  "/images/photo-library/design/107e38d720d04da6442122cbe91d47eda6ebc8c962579a14b345ba3ad6dd49a4.webp",
  "/images/photo-library/design/5b2fafb74f1aa84ca843acded191b5e4629c62f9b73820281864f27167312b06.webp",
  "/images/photo-library/design/3fcfad216695abf4dbd4198edb2ba4d451546d5e1231aafbc66559e164daad27.webp",
];

const DEFAULT_WISHES = [
  { name: "Bạn Hoàng dev", msg: "Chúc 2 bạn mãi yêu nhau, đầu bạc răng long", at: "13:44:27 7/4/2026" },
  { name: "Hoài Nam", msg: "Chúc hai bạn luôn nắm tay nhau qua mọi chặng đường!!!", at: "13:43:31 7/4/2026" },
  { name: "Bạn Linh", msg: "Mừng ngày trọng đại! Chúc hai bạn cười nhiều hơn cãi, yêu nhiều hơn giận nhen!", at: "13:42:43 7/4/2026" },
  { name: "Chị Huyền", msg: "Chúc hai em trăm năm hạnh phúc, vợ chồng đồng lòng <3", at: "13:42:15 7/4/2026" },
  { name: "Cô My", msg: "Chúc vợ chồng son mãi yêu thương, sớm có tin vui :D", at: "13:41:50 7/4/2026" },
  { name: "Chị Thanh", msg: "Mừng ngày vu quy, chúc đôi uyên ương hạnh phúc bền lâu <3", at: "13:41:09 7/4/2026" },
];

export function HoaMocXanh({ d, set }: HoaMocXanhProps) {
  const gName = groomShown(d) || "Minh Quân";
  const bName = brideShown(d) || "Thu Hà";
  const dt = parseDate(d.date || "2026-05-24");

  // Photos
  const groomPhoto = d.heroPhoto || "/images/photo-library/design/5b2fafb74f1aa84ca843acded191b5e4629c62f9b73820281864f27167312b06.webp";
  const bridePhoto = (d.photos && d.photos[1]) || "/images/photo-library/design/3fcfad216695abf4dbd4198edb2ba4d451546d5e1231aafbc66559e164daad27.webp";
  const albumPhotos = d.photos && d.photos.length > 0 ? d.photos : DEFAULT_PHOTOS;

  // Active album slide index
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Music state
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Modals state
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  // Forms
  const [rsvpForm, setRsvpForm] = useState({ name: d.envelopeGuest || "", phone: "", attending: "yes", count: "1", note: "" });
  const [wishName, setWishName] = useState("");
  const [wishMsg, setWishMsg] = useState("");
  const wishesList = d.wishes && d.wishes.length > 0 ? d.wishes : DEFAULT_WISHES;

  // Start background audio on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {
          // Autoplay policy prevented playback until user interaction
        });
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const addToCalendar = () => {
    const blob = new Blob([buildIcs(d)], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `dam-cuoi-${gName}-${bName}.ics`;
    a.click();
  };

  const sendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMsg.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} ${now.toLocaleDateString("vi-VN")}`;
    set({
      wishes: [{ name: wishName.trim(), msg: wishMsg.trim(), at: timeStr }, ...wishesList],
    });
    setWishName("");
    setWishMsg("");
  };

  return (
    <div className="min-h-screen w-full bg-white select-none">
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src={d.musicUrl || "/music/my-love-westlife.mp3"}
        loop
        preload="auto"
      />

      {/* Floating Audio Button */}
      <div className="music-floating-wrap fixed top-4 right-4 z-50">
        <button
          className={`music-floating-btn ${isPlayingMusic ? "playing" : ""}`}
          onClick={toggleMusic}
          aria-label={isPlayingMusic ? "Tắt nhạc" : "Phát nhạc"}
          title={isPlayingMusic ? "Tắt nhạc" : "Bật nhạc"}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: "rgba(48, 83, 15, 0.85)",
            color: "#FFFAF7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            border: "2px solid rgba(255,255,255,0.4)",
            cursor: "pointer",
          }}
        >
          <svg className={`w-5 h-5 ${isPlayingMusic ? "animate-spin" : ""}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </button>
      </div>

      <main className="min-h-screen w-full">
        <div className="flex w-full justify-center overflow-x-clip bg-white" data-testid="boho-floral-green-template">
          <div
            data-showcase-root=""
            className="relative w-full max-w-[480px] md:max-w-[900px] md:mx-auto overflow-hidden md:border md:border-[#30530F22] isolate"
            style={{ backgroundColor: "rgb(255, 250, 247)", color: "rgb(48, 83, 15)" }}
          >
            {/* ========================================================= */}
            {/* 1. HERO HEADER                                            */}
            {/* ========================================================= */}
            <header className="relative flex flex-col items-center justify-start text-center z-10 px-6 md:px-8 pb-4 md:pb-8 pt-[210px] md:pt-[330px] min-h-[840px] md:min-h-[900px] overflow-visible">
              {/* Top-Right Flower */}
              <div
                className="absolute top-[-327px] left-[111.5px] w-[622.77px] md:top-[-390px] md:left-[130px] md:w-[760px] lg:top-[-470px] lg:left-[170px] lg:w-[900px] -z-10 pointer-events-none rotate-[-0.76deg]"
                style={{ willChange: "transform", transform: "translateY(0px)" }}
              >
                <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
              </div>

              {/* Top-Left Flower */}
              <div
                className="absolute top-[5px] md:top-[18px] lg:top-[24px] left-[-83px] md:left-[-66px] lg:left-[-44px] w-[450px] md:w-[507px] lg:w-[608px] -z-10 opacity-20 pointer-events-none scale-x-[-1]"
                style={{ willChange: "transform", transform: "translateY(0px) rotate(142deg)" }}
              >
                <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
              </div>

              <style>{`
                .boho-green-fixed-flower {
                  top: 503px;
                  left: -181.5px;
                  width: 415.05px;
                }
                .boho-green-decoration-bar {
                  top: 170px;
                }
                @media (min-width: 768px) {
                  .boho-green-fixed-flower {
                    top: 608px;
                    left: -228px;
                    width: 530px;
                  }
                  .boho-green-decoration-bar {
                    top: 280px;
                  }
                }
                @media (min-width: 1024px) {
                  .boho-green-fixed-flower {
                    top: 700px;
                    left: -278px;
                    width: 650px;
                  }
                }
              `}</style>

              <div className="relative z-10 mx-auto w-[320px] md:w-[500px] h-[440px] md:h-[640px]">
                {/* Horizontal Decoration Bar */}
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen -z-10 boho-green-decoration-bar">
                  <img alt="" className="w-full h-auto md:h-[150px] md:object-cover" src="/images/themes/boho-floral-green/decoration_bar.webp" />
                </div>

                {/* Polaroid 1: Groom */}
                <div className="absolute left-[20px] md:left-[25px] -top-[40px] md:-top-[60px] z-20 flex items-center gap-3 md:gap-4">
                  <div className="rotate-[-17deg] w-[155px] md:w-[235px] shrink-0">
                    <div className="border-[5px] overflow-hidden aspect-[2/3] relative" style={{ borderColor: "rgb(178, 142, 114)" }}>
                      <img alt={gName} className="w-full h-full object-cover" src={groomPhoto} />
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="text-[12px] md:text-[14px] tracking-widest" style={{ color: "rgb(70, 70, 70)", fontFamily: 'Baskerville, "Times New Roman", serif' }}>
                      <span dir="auto">{d.groomRole || "Trưởng Nam"}</span>
                    </div>
                    <div className="text-[25px] md:text-[32px] whitespace-nowrap" style={{ color: "rgb(48, 83, 15)", fontFamily: '"Playfair Display", serif' }}>
                      {gName}
                    </div>
                  </div>
                </div>

                {/* Polaroid 2: Bride */}
                <div className="absolute left-[55px] md:left-[115px] top-[165px] md:top-[260px] z-30 flex flex-row-reverse items-center gap-3 md:gap-4">
                  <div className="rotate-[13deg] w-[155px] md:w-[235px] shrink-0">
                    <div className="border-[5px] overflow-hidden aspect-[2/3] relative" style={{ borderColor: "rgb(178, 142, 114)" }}>
                      <img alt={bName} className="w-full h-full object-cover" src={bridePhoto} />
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-[12px] md:text-[14px] tracking-widest" style={{ color: "rgb(70, 70, 70)", fontFamily: 'Baskerville, "Times New Roman", serif' }}>
                      <span dir="auto">{d.brideRole || "Út Nữ"}</span>
                    </div>
                    <div className="text-[25px] md:text-[32px] whitespace-nowrap" style={{ color: "rgb(48, 83, 15)", fontFamily: '"Playfair Display", serif' }}>
                      {bName}
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Parallax / Ambient Flowers along body */}
            <div className="absolute -z-10 pointer-events-none rotate-[-60.58deg] boho-green-fixed-flower">
              <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
            </div>
            <div
              className="absolute top-[302px] md:top-[360px] lg:top-[410px] -right-[220px] md:-right-[300px] lg:-right-[360px] w-[610px] md:w-[800px] lg:w-[960px] -z-10 opacity-[0.15] pointer-events-none"
              style={{ willChange: "transform", transform: "rotate(152deg) translateY(0px)" }}
            >
              <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
            </div>
            <div
              className="absolute top-[1054px] md:top-[1190px] lg:top-[1300px] -left-[110px] md:-left-[140px] lg:-left-[170px] w-[750px] md:w-[990px] lg:w-[1185px] -z-10 opacity-[0.15] pointer-events-none"
              style={{ willChange: "transform", transform: "rotate(132deg) translateY(0px)" }}
            >
              <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
            </div>

            {/* ========================================================= */}
            {/* 2. SECTION: THÔNG TIN LỄ CƯỚI                             */}
            {/* ========================================================= */}
            <h2
              className="text-center uppercase mt-10 md:mt-[148px] mb-6 md:mb-8 px-4"
              style={{
                color: "rgb(48, 83, 15)",
                fontFamily: '"Times New Roman", serif',
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              <span dir="auto">THÔNG TIN LỄ CƯỚI</span>
            </h2>

            <div className="mb-6 md:mb-8">
              <div
                className="relative grid grid-cols-2 gap-2 md:gap-3 text-center"
                style={{ color: "rgb(48, 83, 15)", fontFamily: 'Baskerville, "Times New Roman", serif' }}
              >
                {/* Nhà Trai */}
                <div className="flex flex-col gap-1.5">
                  <span style={{ color: "rgb(48, 83, 15)" }}>
                    <span dir="auto">{d.groomFamTitle || "Ông Bà"}</span>
                  </span>
                  <span className="text-[13px] md:text-[23px] font-semibold" style={{ color: "rgb(48, 83, 15)" }}>
                    <span dir="auto">{d.groomFather || "Trần Văn Hùng"}</span>
                  </span>
                  <span className="text-[13px] md:text-[23px] font-semibold" style={{ color: "rgb(48, 83, 15)" }}>
                    <span dir="auto">{d.groomMother || "Hạm Thị Lan"}</span>
                  </span>
                  <div
                    className="whitespace-pre-line mt-1 text-[10px] md:text-[18px] tracking-normal w-[90%] md:w-[80%] mx-auto flex flex-col"
                    style={{ color: "rgb(48, 83, 15)" }}
                  >
                    <span dir="auto">{d.groomAddr || "25 Ngõ 12 Đặng Văn Ngữ, Đống Đa, Hà Nội"}</span>
                  </div>
                </div>

                {/* Nhà Gái */}
                <div className="flex flex-col gap-1.5">
                  <span style={{ color: "rgb(48, 83, 15)" }}>
                    <span dir="auto">{d.brideFamTitle || "Ông Bà"}</span>
                  </span>
                  <span className="text-[13px] md:text-[23px] font-semibold" style={{ color: "rgb(48, 83, 15)" }}>
                    <span dir="auto">{d.brideFather || "Nguyễn Văn Bình"}</span>
                  </span>
                  <span className="text-[13px] md:text-[23px] font-semibold" style={{ color: "rgb(48, 83, 15)" }}>
                    <span dir="auto">{d.brideMother || "Phan Thị Hương"}</span>
                  </span>
                  <div
                    className="whitespace-pre-line mt-1 text-[10px] md:text-[18px] tracking-normal w-[90%] md:w-[80%] mx-auto flex flex-col"
                    style={{ color: "rgb(48, 83, 15)" }}
                  >
                    <span dir="auto">{d.brideAddr || "18 Ngõ 86 Chùa Hà, Cầu Giấy, Hà Nội"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="text-center text-[15px] md:text-[18px] flex flex-col gap-1 mb-6 md:mb-8 mx-auto md:max-w-[560px]"
              style={{
                whiteSpace: "pre-line",
                fontFamily: 'Baskerville, "Times New Roman", serif',
                color: "rgb(48, 83, 15)",
              }}
            >
              <span dir="auto">TRÂN TRỌNG BÁO TIN{'\n'}LỄ THÀNH HÔN CỦA CON CHÚNG TÔI</span>
            </div>

            <div className="w-full min-w-0 relative flex flex-col items-center text-center gap-3 md:gap-4">
              <h3
                className="w-full flex items-center justify-center leading-[55px] md:leading-[80px] whitespace-nowrap"
                style={{
                  fontSize: "40px",
                  fontFamily: '"EB Garamond", serif',
                  color: "rgb(48, 83, 15)",
                }}
              >
                {gName}
              </h3>
              <p
                className="text-[12px] md:text-[14px] uppercase tracking-widest font-normal"
                style={{ color: "rgb(48, 83, 15)", fontFamily: 'Baskerville, "Times New Roman", serif' }}
              >
                <span>{d.groomRole || "TRƯỞNG NAM"}</span>
              </p>
              <span className="text-[24px] md:text-[32px] my-1" style={{ color: "rgb(48, 83, 15)" }}>
                &amp;
              </span>
              <h3
                className="w-full flex items-center justify-center leading-[55px] md:leading-[80px] whitespace-nowrap"
                style={{
                  fontSize: "40px",
                  fontFamily: '"EB Garamond", serif',
                  color: "rgb(48, 83, 15)",
                }}
              >
                {bName}
              </h3>
              <p
                className="text-[12px] md:text-[14px] uppercase tracking-widest font-normal"
                style={{ color: "rgb(48, 83, 15)", fontFamily: 'Baskerville, "Times New Roman", serif' }}
              >
                <span>{d.brideRole || "ÚT NỮ"}</span>
              </p>
            </div>

            {/* ========================================================= */}
            {/* 3. SECTION: ALBUM ẢNH (3D Coverflow)                      */}
            {/* ========================================================= */}
            <div className="flex flex-col items-center mt-12 md:mt-16">
              <h2
                className="text-center uppercase mb-6 md:mb-8 px-4"
                style={{
                  color: "rgb(48, 83, 15)",
                  fontFamily: '"Times New Roman", serif',
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                <span dir="auto">Album Ảnh</span>
              </h2>

              <div className="w-full max-w-[390px] md:max-w-[560px] relative z-10 px-4">
                <div className="relative h-[340px] md:h-[520px] flex items-center justify-center" style={{ perspective: "1000px" }}>
                  {/* Prev Button */}
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() => setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : albumPhotos.length - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-[200] w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white cursor-pointer border-none transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() => setActivePhotoIdx((prev) => (prev < albumPhotos.length - 1 ? prev + 1 : 0))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-[200] w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white cursor-pointer border-none transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>

                  {/* Carousel Cards */}
                  {albumPhotos.map((url, idx) => {
                    const offset = idx - activePhotoIdx;
                    const absOffset = Math.abs(offset);
                    const isVisible = absOffset <= 2;
                    if (!isVisible) return null;

                    let transform = `translateX(${offset * 55}%) translateZ(${-absOffset * 100}px) rotateY(${offset * -25}deg) scale(${1 - absOffset * 0.15})`;
                    let opacity = 1 - absOffset * 0.3;
                    let zIndex = 100 - absOffset;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (offset === 0) setLightboxImg(url);
                          else setActivePhotoIdx(idx);
                        }}
                        className="absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-700 ease-in-out ring-2 ring-white/30"
                        style={{
                          aspectRatio: "1.2 / 1",
                          transform,
                          opacity,
                          zIndex,
                        }}
                      >
                        <img alt={`Wedding photo ${idx + 1}`} className="h-full w-full object-cover" src={url} />
                      </div>
                    );
                  })}
                </div>

                <div className="text-center mt-3 text-xs md:text-sm font-medium tracking-wide opacity-75 tabular-nums">
                  {`${activePhotoIdx + 1} / ${albumPhotos.length}`}
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 4. SECTION: THÔNG TIN TIỆC CƯỚI (Reception & Calendar)    */}
            {/* ========================================================= */}
            <div className="mt-12 md:mt-16">
              <h2
                className="text-center uppercase mb-6 md:mb-8 px-4"
                style={{
                  color: "rgb(48, 83, 15)",
                  fontFamily: '"Times New Roman", serif',
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                <span dir="auto">THÔNG TIN TIỆC CƯỚI</span>
              </h2>

              <div
                className="flex flex-col items-center gap-4 md:gap-5 text-center px-4"
                data-landing-screenshot-id="invite-reception"
                style={{ fontFamily: 'Baskerville, "Times New Roman", serif', color: "rgb(48, 83, 15)" }}
              >
                <h3
                  className="font-normal uppercase text-[20px] md:text-[26px] flex flex-col items-center"
                  style={{
                    color: "rgb(48, 83, 15)",
                    fontFamily: 'Gotham, Montserrat, "Montserrat Fallback", Montserrat, Roboto, sans-serif',
                  }}
                >
                  <span dir="auto">Tiệc cưới sẽ diễn ra vào lúc:</span>
                </h3>

                <div className="text-[20px] md:text-[30px]" style={{ color: "rgb(48, 83, 15)", fontFamily: 'Baskerville, "Times New Roman", serif' }}>
                  {d.startTime || "18:00"}
                </div>

                <div className="flex items-center gap-6" style={{ fontFamily: 'Baskerville, "Times New Roman", serif', fontWeight: 600 }}>
                  <span className="text-[12px] md:text-[16px] uppercase" style={{ fontWeight: 600, textAlign: "right" }}>
                    <span dir="auto">CHỦ NHẬT</span>
                  </span>
                  <div className="w-[2px] h-6 md:h-8" style={{ backgroundColor: "rgb(48, 83, 15)" }} />
                  <span className="text-[30px] md:text-[40px]" style={{ fontWeight: 600 }}>
                    {dt.getDate() || 24}
                  </span>
                  <div className="w-[2px] h-6 md:h-8" style={{ backgroundColor: "rgb(48, 83, 15)" }} />
                  <span className="text-[12px] md:text-[16px] uppercase" style={{ fontWeight: 600, textAlign: "left" }}>
                    <span dir="auto">THÁNG 05</span>
                  </span>
                </div>

                <div className="text-[18px] md:text-[24px]" style={{ color: "rgb(48, 83, 15)" }}>
                  {dt.getFullYear() || 2026}
                </div>

                <div className="text-xs md:text-sm tracking-wide" style={{ color: "rgb(48, 83, 15)" }}>
                  <span dir="auto">(TỨC NGÀY 8 THÁNG 4 NĂM BÍNH NGỌ)</span>
                </div>

                <div className="flex justify-center items-center gap-8 md:gap-16 my-2 text-sm md:text-base">
                  <div className="flex flex-col items-center">
                    <span className="text-xs md:text-sm uppercase tracking-wider opacity-80">ĐÓN KHÁCH</span>
                    <span className="text-base md:text-xl font-semibold mt-1">{d.welcomeTime || "17:30"}</span>
                  </div>
                  <div className="w-px h-8 bg-current opacity-25" />
                  <div className="flex flex-col items-center">
                    <span className="text-xs md:text-sm uppercase tracking-wider opacity-80">KHAI TIỆC</span>
                    <span className="text-base md:text-xl font-semibold mt-1">{d.startTime || "18:00"}</span>
                  </div>
                </div>

                {/* Calendar Grid for May 2026 */}
                <div
                  className="w-full max-w-[320px] md:max-w-[380px] p-4 rounded-xl my-3"
                  style={{ backgroundColor: "rgba(48, 83, 15, 0.04)", border: "1px solid rgba(48, 83, 15, 0.12)" }}
                >
                  <p className="text-center font-semibold text-sm mb-3">Tháng 5 / 2026</p>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium opacity-75 mb-2">
                    <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    <span /><span /><span /><span />
                    <span>1</span><span>2</span><span>3</span>
                    <span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                    <span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span>
                    <span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span>
                    <span
                      className="font-bold rounded-full w-6 h-6 flex items-center justify-center mx-auto text-white"
                      style={{ backgroundColor: "rgb(48, 83, 15)" }}
                    >
                      24
                    </span>
                    <span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full max-w-[360px] mx-auto">
                  <button
                    type="button"
                    onClick={addToCalendar}
                    className="w-full py-2.5 px-4 rounded-full text-sm font-semibold border cursor-pointer transition-colors"
                    style={{
                      borderColor: "rgb(48, 83, 15)",
                      color: "rgb(48, 83, 15)",
                      backgroundColor: "rgba(48, 83, 15, 0.05)",
                    }}
                  >
                    Thêm vào lịch
                  </button>

                  <div data-landing-screenshot-id="invite-rsvp" className="w-full">
                    <button
                      type="button"
                      onClick={() => setRsvpOpen(true)}
                      className="w-full py-2.5 px-4 rounded-full text-sm font-semibold text-white shadow-md cursor-pointer border-none transition-transform hover:scale-105 active:scale-95"
                      style={{ backgroundColor: "rgb(48, 83, 15)" }}
                    >
                      XÁC NHẬN THAM DỰ
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 5. SECTION: ĐỊA ĐIỂM TIỆC CƯỚI (Venue & Map)               */}
            {/* ========================================================= */}
            <section
              className="relative flex flex-col gap-6 md:gap-8 px-6 md:px-10 mt-12 md:mt-16 pb-12 md:pb-16"
              data-landing-screenshot-id="invite-map"
              style={{ color: "rgb(48, 83, 15)" }}
            >
              <div className="relative text-center">
                <h3
                  className="font-normal uppercase text-[20px] md:text-[26px] flex flex-col items-center"
                  style={{
                    color: "rgb(48, 83, 15)",
                    fontFamily: '"Times New Roman", serif',
                    fontWeight: 700,
                    letterSpacing: "1px",
                  }}
                >
                  <span dir="auto">{d.locTitle || "Tiệc cưới sẽ tổ chức tại"}</span>
                </h3>
                <div
                  className="whitespace-pre-line mx-auto mt-3 max-w-sm md:max-w-[500px] text-center text-sm md:text-base tracking-wide flex flex-col items-center pb-3"
                  style={{
                    backgroundColor: "transparent",
                    color: "rgb(48, 83, 15)",
                    fontFamily: 'Baskerville, "Times New Roman", serif',
                  }}
                >
                  <span dir="auto">{d.address || "Tiệc Cưới Hoàng Gia, Ngõ 74 P. Nguyễn Thị Định, Nhân Chính, Thanh Xuân, Hà Nội"}</span>
                </div>
              </div>

              {/* Map Embed Container */}
              <div className="relative flex flex-col items-center gap-4 md:gap-5 w-full">
                <iframe
                  title="Wedding Location Map"
                  className="h-[267px] md:h-[380px] w-full max-w-[338px] md:max-w-[560px] rounded-[15px] overflow-hidden"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=Ti%E1%BB%87c%20C%C6%B0%E1%BB%9Bi%20Ho%C3%A0ng%20Gia%2C%20Ng%C3%B5%2074%20P.%20Nguy%E1%BB%85n%20Th%E1%BB%8B%20%C4%90%E1%BB%8Bnh%2C%20Nh%C3%A2n%20Ch%C3%ADnh%2C%20Thanh%20Xu%C3%A2n%2C%20H%C3%A0%20N%E1%BB%99i&t=&z=15&ie=UTF8&iwloc=&output=embed"
                />

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    d.address || "Tiệc Cưới Hoàng Gia, Ngõ 74 P. Nguyễn Thị Định, Nhân Chính, Thanh Xuân, Hà Nội"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full shadow-lg no-underline cursor-pointer flex w-fit items-center justify-center mx-auto text-base md:text-lg font-medium px-8 py-2 md:py-2.5 transition-transform hover:scale-105 active:scale-95"
                  style={{ backgroundColor: "rgb(48, 83, 15)", color: "rgb(255, 250, 247)" }}
                >
                  <span dir="auto">Chỉ đường</span>
                </a>
              </div>
            </section>

            {/* ========================================================= */}
            {/* 6. SECTION: DRESS CODE                                    */}
            {/* ========================================================= */}
            <div className="mt-6 md:mt-10 mb-10 md:mb-12 text-center px-4">
              <h2
                className="uppercase mb-2"
                style={{
                  color: "rgb(48, 83, 15)",
                  fontFamily: '"Times New Roman", serif',
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                <span dir="auto">DRESS CODE</span>
              </h2>
              <p
                className="whitespace-pre-line text-sm md:text-base text-center opacity-70 mb-5"
                style={{ color: "rgb(48, 83, 15)", fontFamily: 'Baskerville, "Times New Roman", serif' }}
              >
                <span dir="auto">{d.dressText || "Trang phục dự tiệc"}</span>
              </p>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: "rgb(34, 67, 39)" }} />
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: "rgb(74, 107, 79)" }} />
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
                  style={{ backgroundColor: "rgb(194, 227, 199)", border: "1.5px solid rgba(48, 83, 15, 0.19)" }}
                />
              </div>
            </div>

            {/* ========================================================= */}
            {/* 7. SECTION: LỊCH TRÌNH NGÀY CƯỚI (Timeline)               */}
            {/* ========================================================= */}
            <div className="relative z-10 flex flex-col gap-6 md:gap-8 px-4 mt-10 md:mt-12 mb-12 md:mb-16">
              <h2
                className="text-center uppercase"
                style={{
                  color: "rgb(48, 83, 15)",
                  fontFamily: '"Times New Roman", serif',
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                <span dir="auto">LỊCH TRÌNH NGÀY CƯỚI</span>
              </h2>

              <ol
                className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10"
                style={{ fontFamily: 'Baskerville, "Times New Roman", serif' }}
              >
                {/* Step 1 */}
                <li className="contents">
                  <span className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug font-semibold" style={{ color: "rgb(48, 83, 15)" }}>
                    17:30
                  </span>
                  <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                    <span className="absolute left-1/2 -translate-x-1/2 w-px top-1/2 -bottom-8 md:-bottom-10" style={{ backgroundColor: "color-mix(in srgb, rgb(48, 83, 15) 40%, transparent 60%)" }} />
                    <span className="relative block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgb(48, 83, 15)" }} />
                  </span>
                  <span className="pt-0.5 text-start text-[16px] md:text-[17px] font-medium leading-snug" style={{ color: "rgb(48, 83, 15)" }}>
                    Đón khách
                  </span>
                </li>

                {/* Step 2 */}
                <li className="contents">
                  <span className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug font-semibold" style={{ color: "rgb(48, 83, 15)" }}>
                    18:00
                  </span>
                  <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                    <span className="absolute left-1/2 -translate-x-1/2 w-px top-1/2 -bottom-8 md:-bottom-10" style={{ backgroundColor: "color-mix(in srgb, rgb(48, 83, 15) 40%, transparent 60%)" }} />
                    <span className="relative block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgb(48, 83, 15)" }} />
                  </span>
                  <span className="pt-0.5 text-start text-[16px] md:text-[17px] font-medium leading-snug" style={{ color: "rgb(48, 83, 15)" }}>
                    Khai tiệc
                  </span>
                </li>

                {/* Step 3 */}
                <li className="contents">
                  <span className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug font-semibold" style={{ color: "rgb(48, 83, 15)" }}>
                    18:30
                  </span>
                  <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                    <span className="absolute left-1/2 -translate-x-1/2 w-px top-1/2 -bottom-8 md:-bottom-10" style={{ backgroundColor: "color-mix(in srgb, rgb(48, 83, 15) 40%, transparent 60%)" }} />
                    <span className="relative block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgb(48, 83, 15)" }} />
                  </span>
                  <span className="pt-0.5 text-start text-[16px] md:text-[17px] font-medium leading-snug" style={{ color: "rgb(48, 83, 15)" }}>
                    Nghi thức lễ cưới
                  </span>
                </li>

                {/* Step 4 */}
                <li className="contents">
                  <span className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug font-semibold" style={{ color: "rgb(48, 83, 15)" }}>
                    19:00
                  </span>
                  <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                    <span className="relative block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgb(48, 83, 15)" }} />
                  </span>
                  <span className="pt-0.5 text-start text-[16px] md:text-[17px] font-medium leading-snug" style={{ color: "rgb(48, 83, 15)" }}>
                    Tiệc mừng &amp; Chụp ảnh kỷ niệm
                  </span>
                </li>
              </ol>
            </div>

            {/* ========================================================= */}
            {/* 8. SECTION: SỔ LƯU BÚT (Guestbook & Wishes)               */}
            {/* ========================================================= */}
            <section
              className="relative px-6 md:px-10 pt-10 md:pt-12 pb-8 md:pb-10 z-10"
              data-landing-screenshot-id="invite-guestbook"
              style={{ color: "rgb(48, 83, 15)", fontFamily: 'Baskerville, "Times New Roman", serif' }}
            >
              <div className="text-center">
                <h2
                  className="uppercase font-normal text-[20px] md:text-[26px]"
                  style={{
                    color: "rgb(48, 83, 15)",
                    fontFamily: '"Times New Roman", serif',
                    fontSize: "24px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                  }}
                >
                  <span dir="auto">Sổ lưu bút</span>
                </h2>
              </div>

              <form onSubmit={sendWish} className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]">
                <div
                  className="rounded-lg border p-6 shadow-sm"
                  style={{
                    borderColor: "rgba(48, 83, 15, 0.25)",
                    backgroundColor: "rgba(48, 83, 15, 0.03)",
                  }}
                >
                  <div className="mb-4">
                    <input
                      placeholder="Nhập tên của bạn*"
                      className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                      maxLength={500}
                      required
                      type="text"
                      value={wishName}
                      onChange={(e) => setWishName(e.target.value)}
                      style={{
                        borderColor: "rgb(48, 83, 15)",
                        color: "rgb(48, 83, 15)",
                        backgroundColor: "rgba(48, 83, 15, 0.04)",
                      }}
                    />
                  </div>
                  <textarea
                    placeholder="Nhập lời chúc của bạn*"
                    className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                    rows={4}
                    maxLength={10000}
                    required
                    value={wishMsg}
                    onChange={(e) => setWishMsg(e.target.value)}
                    style={{
                      borderColor: "rgb(48, 83, 15)",
                      color: "rgb(48, 83, 15)",
                      backgroundColor: "rgba(48, 83, 15, 0.04)",
                      resize: "none",
                    }}
                  />
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <div className="flex items-center text-xs space-x-1">
                      <button
                        type="button"
                        onClick={() => setWishMsg("Chúc hai bạn trăm năm hạnh phúc, mãi mãi yêu thương và gắn kết bên nhau!")}
                        className="p-2 rounded-lg transition-all duration-200 hover:scale-110 text-base leading-none border-none cursor-pointer"
                        title="Tạo lời chúc bằng AI"
                        style={{ backgroundColor: "rgba(48, 83, 15, 0.1)", color: "rgb(48, 83, 15)" }}
                      >
                        🪄
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="rounded-full px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 border-none cursor-pointer"
                      style={{ backgroundColor: "rgb(48, 83, 15)", borderRadius: "10px" }}
                    >
                      <span dir="auto">GỬI LỜI CHÚC</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Wishes List */}
              <div className="mt-8 w-full max-h-[500px] space-y-3 overflow-y-auto pr-2 mx-auto max-w-full md:max-w-[600px]">
                {wishesList.map((w, i) => (
                  <div
                    key={i}
                    className="rounded-lg border p-4 text-sm shadow-sm"
                    style={{
                      borderColor: "rgba(48, 83, 15, 0.25)",
                      backgroundColor: "rgba(48, 83, 15, 0.02)",
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-semibold" style={{ color: "rgb(48, 83, 15)" }}>
                        {w.name}
                      </span>
                      <span className="text-xs opacity-70">{w.at}</span>
                    </div>
                    <p className="mt-2 leading-relaxed">{w.msg}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================= */}
            {/* 9. SECTION: HỘP QUÀ MỪNG (Giftbox & Bank QR)               */}
            {/* ========================================================= */}
            <div className="mt-12 md:mt-16 mb-12">
              <h2
                className="text-center uppercase mb-6"
                style={{
                  color: "rgb(48, 83, 15)",
                  fontFamily: '"Times New Roman", serif',
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                <span dir="auto">Hộp Quà Mừng</span>
              </h2>

              {/* 3D Giftbox Interactive Trigger */}
              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <button
                  type="button"
                  aria-label="Mở hộp mừng cưới"
                  onClick={() => setGiftModalOpen(true)}
                  className="group relative cursor-pointer outline-none border-none bg-transparent hover:scale-105 active:scale-95 transition-transform"
                  style={{ width: "260px", height: "280px" }}
                >
                  <div className="relative w-full h-full flex items-end justify-center pb-[26px]">
                    <span className="igb-sparkle absolute pointer-events-none z-20" style={{ top: "8%", left: "14%", color: "rgb(48, 83, 15)", fontSize: "22px" }}>✦</span>
                    <span className="igb-sparkle-2 absolute pointer-events-none z-20" style={{ top: "18%", right: "10%", color: "rgb(48, 83, 15)", fontSize: "16px" }}>✦</span>
                    <span className="igb-sparkle-3 absolute pointer-events-none z-20" style={{ top: "32%", left: "5%", color: "rgb(48, 83, 15)", fontSize: "14px" }}>✦</span>
                    <span className="igb-sparkle-4 absolute pointer-events-none z-20" style={{ top: "26%", right: "5%", color: "rgb(48, 83, 15)", fontSize: "14px" }}>✦</span>

                    {/* Mini floating giftboxes */}
                    <img alt="" src="/images/giftbox/mini/san_miguel_yellow.webp" className="absolute pointer-events-none" style={{ left: "-20px", top: "10px", width: "34px", transform: "rotate(-22deg)", zIndex: 1 }} />
                    <img alt="" src="/images/giftbox/mini/boho_floral_pink.webp" className="absolute pointer-events-none" style={{ left: "168px", top: "2px", width: "38px", transform: "rotate(20deg)", zIndex: 1 }} />
                    <img alt="" src="/images/giftbox/mini/song_hac_red.webp" className="absolute pointer-events-none" style={{ left: "-16px", top: "120px", width: "26px", transform: "rotate(-18deg)", zIndex: 1 }} />
                    <img alt="" src="/images/giftbox/mini/crystal_floral_blue.webp" className="absolute pointer-events-none" style={{ left: "182px", top: "114px", width: "24px", transform: "rotate(14deg)", zIndex: 1 }} />
                    <img alt="" src="/images/giftbox/mini/minimalism_brown.webp" className="absolute pointer-events-none" style={{ left: "-8px", top: "172px", width: "44px", transform: "rotate(8deg)", zIndex: 3 }} />
                    <img alt="" src="/images/giftbox/mini/spring_garden_blue.webp" className="absolute pointer-events-none" style={{ left: "26px", top: "182px", width: "26px", transform: "rotate(-10deg)", zIndex: 3 }} />
                    <img alt="" src="/images/giftbox/mini/baroque_gold.webp" className="absolute pointer-events-none" style={{ left: "118px", top: "176px", width: "40px", transform: "rotate(-14deg)", zIndex: 3 }} />

                    {/* Main Box */}
                    <img
                      alt="Hộp quà mừng"
                      src="/images/giftbox/boho_floral_green.webp"
                      className="relative pointer-events-none"
                      style={{
                        width: "170px",
                        maxHeight: "220px",
                        objectFit: "contain",
                        zIndex: 2,
                        filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 10px 18px)",
                      }}
                    />
                  </div>
                  <p className="text-center text-xs font-semibold mt-1" style={{ color: "rgb(48, 83, 15)" }}>
                    Nhấn để mở
                  </p>
                </button>
              </div>

              {/* Direct bank cards */}
              <div className="p-4 sm:p-6 mt-4">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center" style={{ color: "rgb(48, 83, 15)" }}>
                  {/* Groom QR Card */}
                  <div className="flex flex-col items-center flex-1 max-w-[200px]">
                    <h3 className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-semibold text-center">
                      Chú Rể - THIEP CUOI DEMO
                    </h3>
                    <div
                      className="w-36 h-36 sm:w-40 sm:h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center border"
                      style={{ borderColor: "rgba(48, 83, 15, 0.15)" }}
                    >
                      <img
                        alt="QR - Chú Rể"
                        className="w-full h-full object-contain"
                        src="/api/qr-png?d=00020101021238540010A00000072701240006970436011000000000000208QRIBFTTA53037045802VN63048C2A&ec=M"
                      />
                    </div>
                    <div className="mt-2 text-center space-y-0.5">
                      <p className="text-[11px]">Vietcombank</p>
                      <p className="text-[11px] font-mono font-bold">0000000000</p>
                      <p className="text-[11px] font-semibold">THIEP CUOI DEMO</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("0000000000", "groom-stk")}
                      className="mt-2 text-[10px] px-3 py-1 inline-flex items-center gap-1 font-medium rounded-full cursor-pointer border-none"
                      style={{ color: "rgb(48, 83, 15)", backgroundColor: "rgba(48, 83, 15, 0.082)" }}
                    >
                      {copiedBank === "groom-stk" ? "✓ Đã sao chép" : "Sao chép STK"}
                    </button>
                  </div>

                  {/* Bride QR Card */}
                  <div className="flex flex-col items-center flex-1 max-w-[200px]">
                    <h3 className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-semibold text-center">
                      Cô Dâu - Nguyễn Thu Hà
                    </h3>
                    <div
                      className="w-36 h-36 sm:w-40 sm:h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center border"
                      style={{ borderColor: "rgba(48, 83, 15, 0.15)" }}
                    >
                      <img
                        alt="QR - Cô Dâu"
                        className="w-full h-full object-contain"
                        src="/api/qr-png?d=00020101021238540010A00000072701240006970418011066655588880208QRIBFTTA53037045802VN6304086E&ec=M"
                      />
                    </div>
                    <div className="mt-2 text-center space-y-0.5">
                      <p className="text-[11px]">Vietcombank</p>
                      <p className="text-[11px] font-mono font-bold">6665558888</p>
                      <p className="text-[11px] font-semibold">NGUYEN THU HA</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("6665558888", "bride-stk")}
                      className="mt-2 text-[10px] px-3 py-1 inline-flex items-center gap-1 font-medium rounded-full cursor-pointer border-none"
                      style={{ color: "rgb(48, 83, 15)", backgroundColor: "rgba(48, 83, 15, 0.082)" }}
                    >
                      {copiedBank === "bride-stk" ? "✓ Đã sao chép" : "Sao chép STK"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 10. FOOTER                                                */}
            {/* ========================================================= */}
            <footer className="relative flex flex-col items-center px-6 md:px-10 pb-12 md:pb-14 text-center z-10">
              <span
                className="whitespace-pre-line flex flex-col items-center gap-1 text-base md:text-lg mx-auto md:max-w-[560px]"
                style={{ color: "rgb(48, 83, 15)", fontFamily: 'Baskerville, "Times New Roman", serif' }}
              >
                <span dir="auto">Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span>
              </span>
            </footer>

            <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center z-20">
              <a
                href="https://chungdoi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs opacity-50 hover:opacity-70 transition-opacity no-underline"
                style={{ color: "rgb(48, 83, 15)" }}
              >
                ♡ chungdoi.com
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* 11. LIGHTBOX MODAL                                        */}
      {/* ========================================================= */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 cursor-pointer"
          onClick={() => setLightboxImg(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-3xl font-light cursor-pointer border-none bg-transparent hover:opacity-80"
            onClick={() => setLightboxImg(null)}
          >
            ✕
          </button>
          <img
            src={lightboxImg}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* 12. RSVP MODAL                                            */}
      {/* ========================================================= */}
      {rsvpOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setRsvpOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl"
            style={{ color: "rgb(48, 83, 15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="text-lg font-bold">Xác nhận tham dự</h3>
              <button
                type="button"
                onClick={() => setRsvpOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold border-none bg-transparent cursor-pointer"
              >
                ✕
              </button>
            </div>

            {rsvpSubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-base font-bold mb-1">Cảm ơn bạn đã phản hồi!</h4>
                <p className="text-xs text-gray-600 mb-4">Chúng tôi rất mong được đón tiếp bạn trong ngày vui.</p>
                <button
                  type="button"
                  onClick={() => setRsvpOpen(false)}
                  className="px-6 py-2 rounded-full text-white text-sm font-semibold border-none cursor-pointer"
                  style={{ backgroundColor: "rgb(48, 83, 15)" }}
                >
                  Đóng
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setRsvpSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold mb-1">Họ và tên của bạn*</label>
                  <input
                    required
                    type="text"
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none"
                    style={{ borderColor: "rgba(48, 83, 15, 0.3)" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={rsvpForm.phone}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                    placeholder="Ví dụ: 0912 345 678"
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none"
                    style={{ borderColor: "rgba(48, 83, 15, 0.3)" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Bạn sẽ tham dự chứ?</label>
                  <div className="flex gap-4 text-sm mt-1">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={rsvpForm.attending === "yes"}
                        onChange={() => setRsvpForm({ ...rsvpForm, attending: "yes" })}
                      />
                      <span>Chắc chắn sẽ đến</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={rsvpForm.attending === "no"}
                        onChange={() => setRsvpForm({ ...rsvpForm, attending: "no" })}
                      />
                      <span>Rất tiếc không thể đến</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Số người tham dự</label>
                  <select
                    value={rsvpForm.count}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, count: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none bg-white"
                    style={{ borderColor: "rgba(48, 83, 15, 0.3)" }}
                  >
                    <option value="1">1 người</option>
                    <option value="2">2 người</option>
                    <option value="3">3 người</option>
                    <option value="4">4 người</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full text-white text-sm font-semibold shadow-md border-none cursor-pointer mt-2"
                  style={{ backgroundColor: "rgb(48, 83, 15)" }}
                >
                  Gửi xác nhận
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 13. GIFTBOX MODAL                                         */}
      {/* ========================================================= */}
      {giftModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setGiftModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl"
            style={{ color: "rgb(48, 83, 15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="text-lg font-bold">Hộp Quà Mừng Cưới</h3>
              <button
                type="button"
                onClick={() => setGiftModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold border-none bg-transparent cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-6 text-center">
              Cảm ơn tình cảm và sự chúc phúc của quý khách dành cho cặp đôi!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {/* Groom */}
              <div className="flex flex-col items-center flex-1">
                <h4 className="text-xs font-semibold mb-2">Chú Rể - THIEP CUOI DEMO</h4>
                <div className="w-32 h-32 bg-white rounded-xl p-2 border shadow-sm flex items-center justify-center">
                  <img src="/api/qr-png?d=00020101021238540010A00000072701240006970436011000000000000208QRIBFTTA53037045802VN63048C2A&ec=M" alt="" className="w-full h-full object-contain" />
                </div>
                <p className="text-[11px] mt-2 font-mono font-semibold">Vietcombank</p>
                <p className="text-[11px] font-mono">0000000000</p>
                <button
                  type="button"
                  onClick={() => copyToClipboard("0000000000", "modal-groom")}
                  className="mt-2 text-[10px] px-3 py-1 rounded-full font-medium cursor-pointer border-none"
                  style={{ color: "rgb(48, 83, 15)", backgroundColor: "rgba(48, 83, 15, 0.08)" }}
                >
                  {copiedBank === "modal-groom" ? "✓ Đã sao chép" : "Sao chép STK"}
                </button>
              </div>

              {/* Bride */}
              <div className="flex flex-col items-center flex-1">
                <h4 className="text-xs font-semibold mb-2">Cô Dâu - Nguyễn Thu Hà</h4>
                <div className="w-32 h-32 bg-white rounded-xl p-2 border shadow-sm flex items-center justify-center">
                  <img src="/api/qr-png?d=00020101021238540010A00000072701240006970418011066655588880208QRIBFTTA53037045802VN6304086E&ec=M" alt="" className="w-full h-full object-contain" />
                </div>
                <p className="text-[11px] mt-2 font-mono font-semibold">Vietcombank</p>
                <p className="text-[11px] font-mono">6665558888</p>
                <button
                  type="button"
                  onClick={() => copyToClipboard("6665558888", "modal-bride")}
                  className="mt-2 text-[10px] px-3 py-1 rounded-full font-medium cursor-pointer border-none"
                  style={{ color: "rgb(48, 83, 15)", backgroundColor: "rgba(48, 83, 15, 0.08)" }}
                >
                  {copiedBank === "modal-bride" ? "✓ Đã sao chép" : "Sao chép STK"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HoaMocXanh;
