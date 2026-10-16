import { useEffect, useRef, useState } from "react";
import {
  Inv,
  brideShown,
  groomShown,
  WEEKDAYS_FULL,
  WEEKDAYS_SHORT,
  buildIcs,
  formatTime,
  monthGrid,
  parseDate,
} from "./data";

export default function Preview({
  d,
  set,
  standalone = false,
}: {
  d: Inv;
  set: (p: Partial<Inv>) => void;
  standalone?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const isMinimalism = (d.templateId || "").includes("minimalism") || (d.templateName || "").includes("Minimalism");
  const isSongHy = (d.templateId || "").includes("song_hy") || (d.templateName || "").includes("Song Hỷ");
  const [rsvpForm, setRsvpForm] = useState({
    name: d.envelopeGuest || "",
    phone: "",
    count: "1",
    attending: "yes",
    diet: "",
    note: "",
  });
  const [wishName, setWishName] = useState("");
  const [wishMsg, setWishMsg] = useState("");
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [activeBankTab, setActiveBankTab] = useState<"all" | "groom" | "bride" | "custom">("all");
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const dt = parseDate(d.date);
  const gName = groomShown(d);
  const bName = brideShown(d);
  const brideFirst = d.order === "bride";
  const [n1, n2] = brideFirst ? [bName, gName] : [gName, bName];
  const [r1, r2] = brideFirst ? [d.brideRole, d.groomRole] : [d.groomRole, d.brideRole];

  const fams = [
    {
      label: "Nhà Gái",
      title: d.brideFamTitle,
      f: d.brideFather,
      m: d.brideMother,
      addr: d.brideAddr,
    },
    {
      label: "Nhà Trai",
      title: d.groomFamTitle,
      f: d.groomFather,
      m: d.groomMother,
      addr: d.groomAddr,
    },
  ];
  if (!brideFirst) fams.reverse();

  const g = monthGrid(d.date);
  const daysDiff = Math.ceil((dt.getTime() - Date.now()) / 86400000);
  const days = Math.max(0, daysDiff);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    if (d.musicUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(d.musicUrl);
        audioRef.current.loop = true;
      }
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current && d.musicUrl) {
      audioRef.current = new Audio(d.musicUrl);
      audioRef.current.loop = true;
    }
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.pause();
        setIsPlayingMusic(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlayingMusic(true))
          .catch(() => {});
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const addToCalendar = () => {
    const blob = new Blob([buildIcs(d)], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `dam-cuoi-${brideShown(d)}-${groomShown(d)}.ics`;
    a.click();
  };

  const sendWish = () => {
    if (!wishName.trim() || !wishMsg.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} ${now.toLocaleDateString("vi-VN")}`;
    set({
      wishes: [{ name: wishName.trim(), msg: wishMsg.trim(), at: timeStr }, ...d.wishes],
    });
    setWishName("");
    setWishMsg("");
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const currentGift =
    d.gifts.find((g) => g.who === activeBankTab) || d.gifts[0] || null;

  return (
    <div className={`pv-wrapper ${standalone ? "is-standalone" : ""} ${isMinimalism ? "theme-minimalism" : isSongHy ? "theme-songhy" : "theme-songphung"}`}>
      {/* View Switcher Bar for testing Envelope vs Full Invitation */}
      {!standalone && (
        <div className="pv-toolbar">
          <span className="pv-badge">Giao diện Mẫu thiệp {d.templateName || "Song Phụng - Đỏ"}</span>
          <div className="pv-switch-btns">
            <button
              className={`pv-tool-btn ${!isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              ✉️ Bì thư mở thiệp
            </button>
            <button
              className={`pv-tool-btn ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(true)}
            >
              📜 Nội dung thiệp cưới
            </button>
          </div>

          {isOpen && (
            <div className="pv-switch-btns" style={{ marginLeft: "auto" }}>
              <button
                type="button"
                className={`pv-tool-btn ${d.giftDisplayMode === "gift_box" ? "active" : ""}`}
                onClick={() => set({ giftDisplayMode: "gift_box" })}
              >
                🎁 Hộp quà
              </button>
              <button
                type="button"
                className={`pv-tool-btn ${d.giftDisplayMode === "envelope" ? "active" : ""}`}
                onClick={() => set({ giftDisplayMode: "envelope" })}
              >
                ✉️ Phong bì
              </button>
              <button
                type="button"
                className={`pv-tool-btn ${d.giftDisplayMode === "qr_inline" ? "active" : ""}`}
                onClick={() => set({ giftDisplayMode: "qr_inline" })}
              >
                📱 Hiện QR
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==================== 1. MÀN HÌNH BÌ THƯ (ENVELOPE) ==================== */}
      {!isOpen && (
        isMinimalism ? (
          /* Màn hình mở thiệp Minimalism - Nâu (media_1792167825310_9563a55a.png) */
          <div className="envelope-screen min-env-screen" style={{ backgroundColor: "#efe7dd" }}>
            {/* Ambient falling leaves */}
            <div className="min-ambient-petals pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
              {[
                { left: "12%", size: "18px", dur: "22s", delay: "-3s" },
                { left: "26%", size: "14px", dur: "19s", delay: "-8s" },
                { left: "42%", size: "20px", dur: "24s", delay: "-14s" },
                { left: "60%", size: "15px", dur: "21s", delay: "-5s" },
                { left: "78%", size: "19px", dur: "25s", delay: "-12s" },
                { left: "88%", size: "16px", dur: "20s", delay: "-7s" },
              ].map((p, i) => (
                <div
                  key={i}
                  className="min-petal absolute pointer-events-none"
                  style={{
                    left: p.left,
                    top: "-30px",
                    color: "#c9a97e",
                    fontSize: p.size,
                    animation: `ambient-fall ${p.dur} ease-in-out ${p.delay} infinite`,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                  </svg>
                </div>
              ))}
            </div>

            <div className="min-card-wrap relative flex items-center justify-center p-4 w-full" style={{ zIndex: 10 }}>
              <div className="relative w-[320px] sm:w-[420px] md:w-[480px]">
                {/* Card Container */}
                <div
                  className="relative rounded-2xl overflow-visible text-center"
                  style={{
                    backgroundColor: "#fffdfa",
                    boxShadow: "0 25px 60px -12px rgba(110, 80, 60, 0.25), 0 8px 24px rgba(0, 0, 0, 0.08)",
                    padding: "44px 32px 36px",
                  }}
                >
                  {/* Top-left dried flower */}
                  <img
                    src="https://chungdoi.com/images/themes/minimalism-brown/flower2-decoration.webp"
                    alt=""
                    aria-hidden="true"
                    className="absolute pointer-events-none h-40 md:h-60 w-auto max-w-none top-[-10px] left-[-20px] opacity-80 rotate-[15deg] z-20"
                  />
                  {/* Top-right dried flower */}
                  <img
                    src="https://chungdoi.com/images/themes/minimalism-brown/flower2-decoration.webp"
                    alt=""
                    aria-hidden="true"
                    className="absolute pointer-events-none h-40 md:h-60 w-auto max-w-none top-[-10px] right-[-20px] -scale-x-100 opacity-80 -rotate-[15deg] z-20"
                  />

                  {/* Wax seal heart circle inside card */}
                  <div
                    onClick={handleOpenEnvelope}
                    title="Bấm để mở thiệp"
                    className="rounded-full flex items-center justify-center cursor-pointer mx-auto mb-6 transition-transform hover:scale-105 active:scale-95"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "radial-gradient(circle at 35% 35%, #6a5347, #543e32)",
                      boxShadow: "0 4px 16px rgba(84, 62, 50, 0.35)",
                    }}
                  >
                    <svg style={{ fill: "#ffffff" }} viewBox="0 0 24 24" className="w-6 h-6">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>

                  <h1
                    style={{ color: "#543e32", fontFamily: '"EB Garamond", "Cormorant Garamond", Georgia, serif' }}
                    className="mb-2 flex flex-col items-center leading-tight text-3xl sm:text-4xl"
                  >
                    <span className="block w-full text-center font-normal">{gName}</span>
                    <span
                      style={{ fontFamily: '"Baskerville", "Times New Roman", serif' }}
                      className="block w-full text-center text-lg leading-none sm:text-xl my-1 opacity-75 italic"
                    >
                      &amp;
                    </span>
                    <span className="block w-full text-center font-normal">{bName}</span>
                  </h1>

                  <div className="flex items-center justify-center gap-3 mb-3 mt-3">
                    <div style={{ background: "rgba(84, 62, 50, 0.25)" }} className="w-12 h-px" />
                    <span style={{ color: "#543e32", opacity: 0.6 }} className="text-sm">❦</span>
                    <div style={{ background: "rgba(84, 62, 50, 0.25)" }} className="w-12 h-px" />
                  </div>

                  <div
                    style={{ color: "#7a675b", fontFamily: '"Lora", "Times New Roman", serif' }}
                    className="text-[16px] sm:text-[17px] mb-3 flex flex-col items-center"
                  >
                    <span>{dt.getDate()} tháng {dt.getMonth() + 1}, {dt.getFullYear()}</span>
                  </div>

                  <div className="mb-6 max-w-[300px] md:max-w-[380px] mx-auto">
                    <p
                      style={{ color: "#7a675b", fontFamily: '"Lora", "Times New Roman", serif' }}
                      className="text-[16px] sm:text-[17px] font-light mb-1"
                    >
                      {d.envelopeGuest || "Thân Mời"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenEnvelope}
                    style={{
                      backgroundColor: "#543e32",
                      color: "#ffffff",
                      boxShadow: "0 4px 14px rgba(84, 62, 50, 0.35)",
                      fontFamily: '"Lora", "Times New Roman", serif',
                    }}
                    className="relative px-8 py-2.5 text-base sm:text-lg font-medium rounded-full shadow-lg border-none cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Mở thiệp</span>
                    <div
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        animation: "shine 3s ease-in-out infinite",
                      }}
                      className="absolute top-0 h-full w-8 pointer-events-none"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Màn hình mở thiệp truyền thống Song Phụng */
          <div className="envelope-screen">
            {/* Floating ambient 囍 particles */}
            <div className="ambient-particles" aria-hidden="true">
              {[
                { left: "12%", size: "22px", color: "#FFF0E7", dur: "18s", delay: "-3s" },
                { left: "28%", size: "15px", color: "#710001", dur: "22s", delay: "-7s" },
                { left: "38%", size: "12px", color: "#FFF0E7", dur: "20s", delay: "-12s" },
                { left: "48%", size: "24px", color: "#FFF0E7", dur: "19s", delay: "-5s" },
                { left: "62%", size: "16px", color: "#8B0000", dur: "24s", delay: "-14s" },
                { left: "76%", size: "14px", color: "#710001", dur: "21s", delay: "-8s" },
                { left: "88%", size: "18px", color: "#A52A2A", dur: "23s", delay: "-16s" },
                { left: "20%", size: "13px", color: "#8B0000", dur: "25s", delay: "-10s" },
                { left: "70%", size: "20px", color: "#8B0000", dur: "17s", delay: "-2s" },
                { left: "92%", size: "15px", color: "#710001", dur: "22s", delay: "-9s" },
              ].map((p, i) => (
                <div
                  key={i}
                  className="ambient-xi"
                  style={{
                    left: p.left,
                    fontSize: p.size,
                    color: p.color,
                    animationDuration: p.dur,
                    animationDelay: p.delay,
                  }}
                >
                  囍
                </div>
              ))}
            </div>

            {/* Envelope Card Container */}
            <div className="envelope-card-wrap">
              {/* Wax seal on top */}
              <div className="wax-seal" onClick={handleOpenEnvelope} title="Bấm để mở thiệp">
                <div className="wax-seal-inner">囍</div>
              </div>

              {/* Inner Paper Card */}
              <div className="envelope-card">
                {/* Corner Ornaments */}
                <img
                  src="https://chungdoi.com/images/themes/songphung-red/Phuong.webp"
                  alt=""
                  className="env-deco-phuong-tl"
                />
                <img
                  src="https://chungdoi.com/images/themes/songphung-red/Phuong.webp"
                  alt=""
                  className="env-deco-phuong-br"
                />
                <img
                  src="https://chungdoi.com/images/themes/songphung-red/HOA.webp"
                  alt=""
                  className="env-deco-hoa-bl"
                />
                <img
                  src="https://chungdoi.com/images/themes/songphung-red/HOA.webp"
                  alt=""
                  className="env-deco-hoa-tr"
                />

                {/* Card Content */}
                <div className="env-content">
                  <h1 className="env-names">
                    <span className="env-name">{bName}</span>
                    <span className="env-amp">&amp;</span>
                    <span className="env-name">{gName}</span>
                  </h1>

                  <div className="env-divider">
                    <span className="env-line-l"></span>
                    <span className="env-ornament">❦</span>
                    <span className="env-line-r"></span>
                  </div>

                  <div className="env-date">
                    {dt.getDate()} tháng {dt.getMonth() + 1}, {dt.getFullYear()}
                  </div>

                  <div className="env-invite-block">
                    <p className="env-sub">Thân Mời</p>
                    <div className="env-guest-badge">
                      <h2>{d.envelopeGuest}</h2>
                    </div>
                    <p className="env-msg">{d.envelopeInviteMessage}</p>
                  </div>

                  <button className="env-open-btn" onClick={handleOpenEnvelope}>
                    <span>Mở thiệp</span>
                    <div className="shimmer-glare"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* ==================== 2. NỘI DUNG THIỆP ĐÃ MỞ (OPENED) ==================== */}
      {isOpen && (
        <div className={`songphung-template ${isMinimalism ? "is-minimalism-body" : isSongHy ? "is-songhy-body" : ""}`}>
          {/* Floating background audio button */}
          {d.musicUrl && (
            <button
              className={`music-floating-btn ${isPlayingMusic ? "playing" : ""}`}
              onClick={toggleMusic}
              title={isPlayingMusic ? "Tắt nhạc" : "Bật nhạc"}
            >
              <div className="music-disc">
                <span className="music-note">🎵</span>
              </div>
            </button>
          )}

          {/* Paper Background Texture Overlay */}
          {!isMinimalism && (
            <div
              className="paper-texture"
              style={{
                backgroundImage: "url(https://chungdoi.com/images/themes/songphung-red/NENGIAY.jpg)",
              }}
            />
          )}

          {/* Phoenix Line Side Decorations (Parallax Artwork for traditional themes) */}
          {!isMinimalism && !isSongHy && (
            <>
              <div className="line-deco-left" aria-hidden="true">
                <img
                  src="https://chungdoi.com/images/themes/songphung-red/Phuong%20line.webp"
                  alt=""
                />
              </div>
              <div className="line-deco-right" aria-hidden="true">
                <img
                  src="https://chungdoi.com/images/themes/songphung-red/Phuong%20line.webp"
                  alt=""
                />
              </div>
            </>
          )}

          {/* -------------------- HERO SECTION -------------------- */}
          {isMinimalism ? (
            /* Hero cho Minimalism - Nâu (media_1792167846581_6cfd16e7.png) */
            <header className="relative z-10 flex flex-col items-center px-4 pt-12 pb-20 text-center md:pb-28 overflow-hidden">
              {/* Paper overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                  backgroundImage: 'url("https://chungdoi.com/images/themes/minimalism-brown/paper.webp")',
                  backgroundSize: "100% auto",
                  backgroundPosition: "top center",
                  mixBlendMode: "multiply",
                  opacity: 0.4,
                }}
              />
              <img
                src="https://chungdoi.com/images/themes/minimalism-brown/leaf-background.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-[-24%] top-[2%] w-[52%] max-w-none object-contain opacity-[0.15]"
              />
              <img
                src="https://chungdoi.com/images/themes/minimalism-brown/house-background.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[30%] w-[130%] max-w-none -translate-x-1/2 object-contain opacity-[0.08] mix-blend-multiply"
              />

              <p
                data-testid="event-heading"
                className="relative z-10 whitespace-pre-line text-[13px] uppercase md:text-[15px]"
                style={{
                  fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
                  color: "#827771",
                  letterSpacing: "0.18em",
                  fontWeight: 600,
                }}
              >
                THE WEDDING OF
              </p>

              <div className="relative z-10 mt-2 flex items-center justify-center gap-2 md:mt-3 md:gap-3">
                <span
                  className="italic text-[clamp(28px,7.5vw,36px)] md:text-[44px]"
                  style={{ fontFamily: '"Times New Roman", "Playfair Display", serif', color: "#827771" }}
                >
                  {gName}
                </span>
                <span
                  className="text-[38px] leading-none md:text-[48px]"
                  style={{ fontFamily: '"The Nautigal", "Brush Script MT", cursive', color: "#918077" }}
                >
                  &amp;
                </span>
                <span
                  className="italic text-[clamp(28px,7.5vw,36px)] md:text-[44px]"
                  style={{ fontFamily: '"Times New Roman", "Playfair Display", serif', color: "#827771" }}
                >
                  {bName}
                </span>
              </div>

              <div className="relative z-10 mt-6 aspect-[1094/1554] w-[88%] max-w-[360px] md:mt-8 md:max-w-[460px]">
                <div className="absolute left-[11.5%] top-[8%] z-10 h-[77%] w-[72%] rotate-[-4.78deg] overflow-hidden bg-white shadow-inner">
                  <img
                    src={d.heroPhoto || "https://assets.chungdoi.com/photo-library/design/1e0986014ff4206f135df254987fb52eb45ae964e8cce6f0dba29a905e0e0b67.webp"}
                    alt={`${gName} & ${bName}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <img
                  src="https://chungdoi.com/images/themes/minimalism-brown/frame-avatar.webp"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 size-full max-w-none drop-shadow-[4px_4px_4px_rgba(0,0,0,0.2)]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute block bottom-[-6%] left-[-5%] z-30 w-[34%]"
                  style={{ animation: "mbFloat 5s ease-in-out infinite", animationDelay: "0s", willChange: "transform" }}
                >
                  <img
                    src="https://chungdoi.com/images/themes/minimalism-brown/flower2-decoration.webp"
                    alt=""
                    className="block w-full max-w-none object-contain drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)]"
                  />
                </span>
              </div>
            </header>
          ) : isSongHy ? (
            /* Hero cho Song Hỷ - Xanh (media_1792167676918_431db77f.png) */
            <header className="sh-hero-sec">
              <div className="sh-green-arch">
                <p className="sh-welcome">WELCOME TO OUR WEDDING</p>
                <div className="sh-couple-row">
                  <div className="sh-groom-col">
                    <span className="sh-role">Chú Rể</span>
                    <span className="sh-name">{gName}</span>
                  </div>
                  <div className="sh-xi-box">
                    <span className="sh-xi">囍</span>
                  </div>
                  <div className="sh-bride-col">
                    <span className="sh-role">Cô Dâu</span>
                    <span className="sh-name">{bName}</span>
                  </div>
                </div>
                <p className="sh-arch-footer">LOVE NEVER FAILS</p>
              </div>
            </header>
          ) : (
            /* Hero cho Song Phụng - Đỏ */
            <header className="sp-hero">
              <div className="sp-hero-names">
                <div className="sp-name-1">{n1}</div>
                <div className="sp-name-2">{n2}</div>
              </div>

              <div className="sp-banner-wrap">
                <div className="sp-banner-bg" />
                <img
                  src="https://chungdoi.com/images/themes/songphung-red/Phuong%202.webp"
                  alt="Phoenix Left"
                  className="sp-phuong-left"
                />
                <div className="sp-chu-hy-box">
                  <img
                    src="https://chungdoi.com/images/themes/songphung-red/CHU%20HY.webp"
                    alt="Chữ Hỷ"
                    className="sp-chu-hy"
                  />
                </div>
                <img
                  src="https://chungdoi.com/images/themes/songphung-red/Phuong.webp"
                  alt="Phoenix Right"
                  className="sp-phuong-right"
                />
              </div>
            </header>
          )}

          {/* -------------------- SECTION 1: LỄ CƯỚI & GIA ĐÌNH -------------------- */}
          <section className="sp-section sp-family-sec">
            {/* Flower Accent top-right for traditional theme */}
            {!isMinimalism && !isSongHy && (
              <img
                src="https://chungdoi.com/images/themes/songphung-red/HOA.webp"
                alt=""
                className="sp-flower-corner"
              />
            )}

            {d.familyOn && (
              <>
                <h2 className="sp-sec-title">{d.ceremonyTitle || "THÔNG TIN LỄ CƯỚI"}</h2>

                <div className="sp-family-grid">
                  {/* Left Column */}
                  <div className="sp-family-col">
                    <p className="sp-fam-title">{fams[0].title}</p>
                    <p className="sp-fam-name">{fams[0].f}</p>
                    <p className="sp-fam-name">{fams[0].m}</p>
                    {fams[0].addr && <p className="sp-fam-addr">{fams[0].addr}</p>}
                  </div>

                  {/* Vertical Divider */}
                  <div className="sp-family-div" />

                  {/* Right Column */}
                  <div className="sp-family-col">
                    <p className="sp-fam-title">{fams[1].title}</p>
                    <p className="sp-fam-name">{fams[1].f}</p>
                    <p className="sp-fam-name">{fams[1].m}</p>
                    {fams[1].addr && <p className="sp-fam-addr">{fams[1].addr}</p>}
                  </div>
                </div>
              </>
            )}

            {/* Announcement Lines */}
            {d.announceOn && (
              <div className="sp-announce">
                <p className="sp-ann-1">{d.announcementLine1 || "TRÂN TRỌNG BÁO TIN"}</p>
                <p className="sp-ann-2">{d.announcementLine2 || "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI"}</p>
              </div>
            )}

            {/* Couple names & Birth order */}
            <div className="sp-couple-call">
              <div className="sp-person-name">{n1}</div>
              <div className="sp-person-role">({r1})</div>
              <div className="sp-person-amp">&amp;</div>
              <div className="sp-person-name">{n2}</div>
              <div className="sp-person-role">({r2})</div>
            </div>

            {/* Ceremonies Card */}
            {d.ceremonies.map((c, i) => (
              <div className="sp-ceremony-card" key={i}>
                <h3 className="sp-ceremony-header">{c.title}</h3>
                <div className="sp-time-badge">
                  <span>VÀO LÚC {formatTime(c.time, d.clock)}</span>
                </div>
                <div className="sp-date-row">
                  <span>{WEEKDAYS_FULL[parseDate(c.date).getDay()].toUpperCase()}</span>
                  <span className="sp-date-sep">|</span>
                  <span className="sp-date-num">
                    {parseDate(c.date).getDate()} THÁNG {parseDate(c.date).getMonth() + 1}
                  </span>
                  <span className="sp-date-sep">|</span>
                  <span>{parseDate(c.date).getFullYear()}</span>
                </div>
                {c.lunar && <p className="sp-lunar-date">({c.lunar})</p>}
                {c.place && <p className="sp-ceremony-place">Địa điểm: {c.place}</p>}
              </div>
            ))}
          </section>

          {/* -------------------- SECTION 2: ALBUM HÌNH CƯỚI -------------------- */}
          {d.albumOn && d.photos.length > 0 && (
            <section className="sp-section sp-gallery-sec">
              <h2 className="sp-sec-title">ALBUM HÌNH CƯỚI</h2>
              <div className={`sp-gallery-grid layout-${d.albumLayout}`}>
                {d.photos.map((p, i) => (
                  <div
                    className="sp-gallery-item"
                    key={i}
                    onClick={() => setLightboxImg(p)}
                  >
                    <img src={p} alt={`Ảnh cưới ${i + 1}`} loading="lazy" />
                    <div className="sp-gallery-overlay">
                      <span>🔍 Xem ảnh</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* -------------------- SECTION 3: TIỆC CƯỚI (BANQUET) -------------------- */}
          {d.partyOn && (
            <section className="sp-section sp-banquet-sec">
              <h2 className="sp-sec-title">{d.banquetTitle || "THÔNG TIN TIỆC CƯỚI"}</h2>
              <p className="sp-lead">Tiệc cưới được tổ chức vào lúc:</p>

              <div className="sp-banquet-date">
                <span className="sp-b-wd">{WEEKDAYS_FULL[dt.getDay()].toUpperCase()}</span>
                <span className="sp-b-slash">/</span>
                <span className="sp-b-day">{dt.getDate()}</span>
                <span className="sp-b-slash">/</span>
                <span className="sp-b-month">THÁNG {dt.getMonth() + 1}</span>
              </div>

              {!d.hideWelcomeTimes && (d.welcomeTime || d.time) && (
                <div className="sp-welcome-times">
                  {d.welcomeTime && <span>Đón khách: <b>{formatTime(d.welcomeTime, d.clock)}</b></span>}
                  {d.welcomeTime && d.time && <span className="sp-dot">•</span>}
                  {d.time && <span>Khai tiệc: <b>{formatTime(d.time, d.clock)}</b></span>}
                </div>
              )}

              {/* Countdown badge */}
              {d.countdown && (
                <div className="sp-countdown-box">
                  <span className="sp-cd-text">CÒN</span>
                  <span className="sp-cd-days">{days}</span>
                  <span className="sp-cd-text">NGÀY NỮA</span>
                </div>
              )}

              {/* Monthly Calendar */}
              {d.date && (
                <div className="sp-calendar">
                  <div className="sp-cal-header">
                    Tháng {g.m + 1}, {g.y}
                  </div>
                  <div className="sp-cal-grid">
                    {WEEKDAYS_SHORT.map((w) => (
                      <span key={w} className="sp-cal-w">
                        {w}
                      </span>
                    ))}
                    {g.cells.map((c, i) => (
                      <span
                        key={i}
                        className={`sp-cal-d ${c === g.selected ? "selected" : ""}`}
                      >
                        {c ?? ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button className="sp-btn-link" onClick={addToCalendar}>
                📅 Thêm vào lịch của bạn
              </button>

              {/* RSVP Button */}
              {d.rsvpOn && (
                <div className="sp-rsvp-action">
                  <button
                    className="sp-btn-primary"
                    onClick={() => {
                      setRsvpOpen(true);
                      setRsvpSubmitted(false);
                    }}
                  >
                    XÁC NHẬN THAM DỰ
                  </button>
                </div>
              )}
            </section>
          )}

          {/* -------------------- SECTION 4: ĐỊA ĐIỂM (VENUE & MAP) -------------------- */}
          {d.address && (
            <section className="sp-section sp-venue-sec">
              <h2 className="sp-sec-title">{d.locTitle || "ĐỊA ĐIỂM TIỆC CƯỚI"}</h2>
              <div className="sp-address-box">
                <p className="sp-address-txt">{d.address}</p>
                {d.showMap && (
                  <a
                    className="sp-map-btn"
                    target="_blank"
                    rel="noreferrer"
                    href={
                      d.mapUrl ||
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        d.address
                      )}`
                    }
                  >
                    📍 Chỉ đường trên Google Maps
                  </a>
                )}
              </div>

              {/* Interactive Map Embed */}
              {d.showMap && (
                <div className="sp-map-frame">
                  <iframe
                    title="Bản đồ địa điểm"
                    width="100%"
                    height="280"
                    style={{ border: 0, borderRadius: "16px" }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      d.address
                    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  />
                </div>
              )}
            </section>
          )}

          {/* -------------------- SECTION 5: DRESS CODE -------------------- */}
          {d.dressOn && (
            <section className="sp-section sp-dress-sec">
              <h2 className="sp-sec-title">DRESS CODE</h2>
              <p className="sp-dress-sub">{d.dressText || "Trang phục dự tiệc"}</p>
              {d.dressColors && d.dressColors.length > 0 && (
                <div className="sp-color-swatches">
                  {d.dressColors.map((hex, i) => (
                    <div className="sp-swatch-item" key={i}>
                      <div
                        className="sp-swatch-circle"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="sp-swatch-hex">{hex}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* -------------------- SECTION 6: LỊCH TRÌNH (TIMELINE) -------------------- */}
          {d.schedOn && d.sched.length > 0 && (
            <section className="sp-section sp-timeline-sec">
              <h2 className="sp-sec-title">{d.schedTitle || "LỊCH TRÌNH NGÀY CƯỚI"}</h2>
              <div className="sp-timeline">
                {d.sched.map((item, i) => (
                  <div className="sp-tl-item" key={i}>
                    <div className="sp-tl-bullet">
                      <div className="sp-tl-dot" />
                    </div>
                    <div className="sp-tl-content">
                      <span className="sp-tl-time">{formatTime(item.time, d.clock)}</span>
                      <span className="sp-tl-text">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* -------------------- SECTION 7: SỔ LƯU BÚT (GUESTBOOK) -------------------- */}
          {d.guestOn && (
            <section className="sp-section sp-guestbook-sec">
              <h2 className="sp-gb-title">Sổ lưu bút</h2>
              <div className="sp-gb-form">
                <input
                  type="text"
                  placeholder="Nhập tên của bạn*"
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                />
                <textarea
                  rows={3}
                  placeholder="Nhập lời chúc của bạn*"
                  value={wishMsg}
                  onChange={(e) => setWishMsg(e.target.value)}
                />
                <button
                  className="sp-gb-submit"
                  disabled={!wishName.trim() || !wishMsg.trim()}
                  onClick={sendWish}
                >
                  GỬI LỜI CHÚC
                </button>
              </div>

              {/* Wish list */}
              <div className="sp-wishes-list">
                {d.wishes.map((w, i) => (
                  <div className="sp-wish-card" key={i}>
                    <div className="sp-wish-header">
                      <span className="sp-wish-author">{w.name}</span>
                      <span className="sp-wish-time">{w.at}</span>
                    </div>
                    <p className="sp-wish-msg">{w.msg}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* -------------------- SECTION 8: HỘP MỪNG CƯỚI (GIFT BOX) -------------------- */}
          {d.giftOn && d.gifts.length > 0 && (
            <section
              className="sp-section"
              style={{
                backgroundColor: "transparent",
                padding: "32px 16px",
                position: "relative",
                zIndex: 10,
              }}
            >
              <h2
                className="mb-4 text-[21px] md:text-[25px] lg:text-[32px] flex flex-col items-center"
                style={{
                  color: d.giftDisplayMode === "gift_box" ? "rgb(84, 46, 8)" : "rgb(255, 223, 175)",
                  fontFamily: d.giftDisplayMode === "gift_box" ? "Oswald, sans-serif" : '"Times New Roman", serif',
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  marginBottom: d.giftDisplayMode === "qr_inline" ? "24px" : "16px",
                }}
              >
                <span dir="auto">{d.giftTitle || "Hộp Quà Mừng"}</span>
              </h2>

              {/* MODE 1: QR INLINE */}
              {d.giftDisplayMode === "qr_inline" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "24px",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: "0 16px",
                  }}
                >
                  {d.gifts.map((g) => {
                    const title =
                      g.who === "custom" && g.customLabel
                        ? g.customLabel
                        : g.who === "groom"
                        ? "Chú Rể"
                        : "Cô Dâu";
                    return (
                      <div key={g.id} className="sp-qr-card-unified">
                        <h3 className="sp-qr-card-unified-title">
                          {title} - {g.accountName}
                        </h3>
                        <div className="sp-qr-box-unified">
                          <img
                            alt={`QR - ${title} - ${g.accountName}`}
                            src={g.qrUrl}
                          />
                        </div>
                        <div className="sp-qr-unified-texts">
                          <p>{g.bankName}</p>
                          <p className="acc-num">{g.accountNumber}</p>
                          <p className="acc-name">{g.accountName}</p>
                        </div>
                        <div className="sp-qr-unified-actions">
                          <button
                            type="button"
                            className="sp-qr-unified-btn"
                            onClick={() => copyToClipboard(g.accountNumber, g.id)}
                          >
                            {copiedBank === g.id ? "✓ Đã sao chép" : "Sao chép STK"}
                          </button>
                          {g.qrUrl && (
                            <a
                              href={g.qrUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={`vietqr-${g.bankCode}-${g.accountNumber}.png`}
                              className="sp-qr-unified-btn"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Lưu QR
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* MODE 2: ENVELOPE */}
              {d.giftDisplayMode === "envelope" && (
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <button
                    type="button"
                    aria-label="Mở hộp mừng cưới"
                    className="group relative cursor-pointer outline-none border-none bg-transparent"
                    style={{ width: "210px", height: "287px" }}
                    onClick={() => setGiftModalOpen(true)}
                  >
                    <div className="relative w-full h-full flex items-end justify-center pb-[48px]">
                      <span className="ienv-sparkle absolute pointer-events-none z-20" style={{ top: "6%", left: "12%", color: "rgb(255, 239, 214)", fontSize: "16.5px" }}>✦</span>
                      <span className="ienv-sparkle-2 absolute pointer-events-none z-20" style={{ top: "14%", right: "8%", color: "rgb(255, 239, 214)", fontSize: "12px" }}>✦</span>
                      <span className="ienv-sparkle-3 absolute pointer-events-none z-20" style={{ top: "34%", left: "3%", color: "rgb(255, 239, 214)", fontSize: "10.5px" }}>✦</span>
                      <span className="ienv-sparkle-4 absolute pointer-events-none z-20" style={{ top: "24%", right: "3%", color: "rgb(255, 239, 214)", fontSize: "10.5px" }}>✦</span>
                      <div className="relative" style={{ width: "150px", height: "205px" }}>
                        <div className="ienv-shadow absolute pointer-events-none" style={{ left: "50%", bottom: "-6px", width: "99px", height: "11px", marginLeft: "-49.5px", borderRadius: "50%", backgroundColor: "rgba(0, 0, 0, 0.45)", filter: "blur(4px)", zIndex: 0, willChange: "transform, opacity" }} />
                        <img
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="ienv-back absolute inset-0 pointer-events-none"
                          src="https://chungdoi.com/images/envelope/baroque_v2_darkred.webp"
                          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", transformOrigin: "50% 100%", transform: "translateX(20%) translateY(-10%) scale(-0.8, 0.8) rotate(-15deg)", zIndex: 1, filter: "drop-shadow(rgba(0, 0, 0, 0.18) 0px 8px 14px)", willChange: "transform" }}
                        />
                        <img
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="ienv-card absolute inset-0 pointer-events-none"
                          src="https://chungdoi.com/images/envelope/baroque_v2_darkred.webp"
                          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", rotate: "-10deg", zIndex: 2, filter: "drop-shadow(rgba(0, 0, 0, 0.22) 0px 10px 18px)", willChange: "transform" }}
                        />
                      </div>
                    </div>
                    <p className="ienv-hint absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium" style={{ color: "rgb(255, 239, 214)" }}>
                      <span dir="auto">Nhấn để mở</span>
                    </p>
                  </button>
                </div>
              )}

              {/* MODE 3: GIFT BOX */}
              {d.giftDisplayMode === "gift_box" && (
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <button
                    type="button"
                    aria-label="Mở hộp mừng cưới"
                    className="group relative cursor-pointer outline-none border-none bg-transparent"
                    style={{ width: "260px", height: "280px" }}
                    onClick={() => setGiftModalOpen(true)}
                  >
                    <div className="relative w-full h-full flex items-end justify-center pb-[26px]">
                      <span className="igb-sparkle absolute pointer-events-none z-20" style={{ top: "8%", left: "14%", color: "rgb(84, 46, 8)", fontSize: "22px" }}>✦</span>
                      <span className="igb-sparkle-2 absolute pointer-events-none z-20" style={{ top: "18%", right: "10%", color: "rgb(84, 46, 8)", fontSize: "16px" }}>✦</span>
                      <span className="igb-sparkle-3 absolute pointer-events-none z-20" style={{ top: "32%", left: "5%", color: "rgb(84, 46, 8)", fontSize: "14px" }}>✦</span>
                      <span className="igb-sparkle-4 absolute pointer-events-none z-20" style={{ top: "26%", right: "5%", color: "rgb(84, 46, 8)", fontSize: "14px" }}>✦</span>
                      
                      {/* 8 Confetti particles */}
                      <div className="absolute pointer-events-none z-0" style={{ bottom: "187px", left: "50%" }}>
                        <div className="igb-confetti igb-c1" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-5.5px", marginTop: "-2.75px", pointerEvents: "none", willChange: "transform, opacity", width: "11px", height: "5.5px", backgroundColor: "rgb(236, 72, 153)", borderRadius: "2px" }} />
                        <div className="igb-confetti igb-c2" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-5px", marginTop: "-5px", pointerEvents: "none", willChange: "transform, opacity", width: "10px", height: "10px", backgroundColor: "rgb(84, 46, 8)", borderRadius: "50%" }} />
                        <div className="igb-confetti igb-c3" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-5.5px", marginTop: "-2.75px", pointerEvents: "none", willChange: "transform, opacity", width: "11px", height: "5.5px", backgroundColor: "rgb(34, 197, 94)", borderRadius: "2px" }} />
                        <div className="igb-confetti igb-c4" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-4.5px", marginTop: "-4.5px", pointerEvents: "none", willChange: "transform, opacity", width: "9px", height: "9px", backgroundColor: "rgb(59, 130, 246)", borderRadius: "50%" }} />
                        <div className="igb-confetti igb-c5" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-6px", marginTop: "-3px", pointerEvents: "none", willChange: "transform, opacity", width: "12px", height: "6px", backgroundColor: "rgb(168, 85, 247)", borderRadius: "2px" }} />
                        <div className="igb-confetti igb-c6" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-5px", marginTop: "-5px", pointerEvents: "none", willChange: "transform, opacity", width: "0px", height: "0px", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: "10px solid rgb(250, 204, 21)" }} />
                        <div className="igb-confetti igb-c7" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-5px", marginTop: "-2.5px", pointerEvents: "none", willChange: "transform, opacity", width: "10px", height: "5px", backgroundColor: "rgb(195, 42, 41)", borderRadius: "2px" }} />
                        <div className="igb-confetti igb-c8" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-4.5px", marginTop: "-4.5px", pointerEvents: "none", willChange: "transform, opacity", width: "9px", height: "9px", backgroundColor: "rgb(249, 115, 22)", borderRadius: "50%" }} />
                      </div>

                      {/* Bobbing Box and 7 Mini Decors */}
                      <div className="igb-bob relative" style={{ width: "200px", height: "220px" }}>
                        <div className="igb-shadow absolute pointer-events-none" style={{ left: "50%", bottom: "-8px", width: "144px", height: "12px", marginLeft: "-72px", borderRadius: "50%", backgroundColor: "rgba(0, 0, 0, 0.45)", filter: "blur(4px)", zIndex: 0, willChange: "transform, opacity" }} />
                        <img alt="" loading="lazy" decoding="async" className="igb-decor igb-decor-1 absolute pointer-events-none" src="https://chungdoi.com/images/giftbox/mini/baroque_v2_darkgreen.webp" style={{ left: "-20px", top: "10px", width: "34px", zIndex: 1, transform: "rotate(-22deg)", filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)", willChange: "transform, opacity" }} />
                        <img alt="" loading="lazy" decoding="async" className="igb-decor igb-decor-2 absolute pointer-events-none" src="https://chungdoi.com/images/giftbox/mini/saraya_gold.webp" style={{ left: "168px", top: "2px", width: "38px", zIndex: 1, transform: "rotate(20deg)", filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)", willChange: "transform, opacity" }} />
                        <img alt="" loading="lazy" decoding="async" className="igb-decor igb-decor-3 absolute pointer-events-none" src="https://chungdoi.com/images/giftbox/mini/dragon_phoenix_v2.webp" style={{ left: "-16px", top: "120px", width: "26px", zIndex: 1, transform: "rotate(-18deg)", filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)", willChange: "transform, opacity" }} />
                        <img alt="" loading="lazy" decoding="async" className="igb-decor igb-decor-4 absolute pointer-events-none" src="https://chungdoi.com/images/giftbox/mini/spring_garden_red.webp" style={{ left: "182px", top: "114px", width: "24px", zIndex: 1, transform: "rotate(14deg)", filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)", willChange: "transform, opacity" }} />
                        <img alt="" loading="lazy" decoding="async" className="igb-box absolute pointer-events-none" src="https://chungdoi.com/images/giftbox/nhat_binh_red.webp" style={{ left: "50%", bottom: "0px", width: "170px", maxHeight: "220px", objectFit: "contain", marginLeft: "-85px", zIndex: 2, filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 10px 18px)", willChange: "transform" }} />
                        <img alt="" loading="lazy" decoding="async" className="igb-decor igb-decor-5 absolute pointer-events-none" src="https://chungdoi.com/images/giftbox/mini/double_dragon_blue.webp" style={{ left: "-8px", top: "172px", width: "44px", zIndex: 3, transform: "rotate(8deg)", filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)", willChange: "transform, opacity" }} />
                        <img alt="" loading="lazy" decoding="async" className="igb-decor igb-decor-6 absolute pointer-events-none" src="https://chungdoi.com/images/giftbox/mini/dragon_phoenix_v3.webp" style={{ left: "26px", top: "182px", width: "26px", zIndex: 3, transform: "rotate(-10deg)", filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)", willChange: "transform, opacity" }} />
                        <img alt="" loading="lazy" decoding="async" className="igb-decor igb-decor-7 absolute pointer-events-none" src="https://chungdoi.com/images/giftbox/mini/hoa_kho_orange.webp" style={{ left: "118px", top: "176px", width: "40px", zIndex: 3, transform: "rotate(-14deg)", filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)", willChange: "transform, opacity" }} />
                      </div>
                    </div>
                    <p className="igb-hint absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium" style={{ color: "rgb(84, 46, 8)" }}>
                      <span dir="auto">Nhấn để mở</span>
                    </p>
                  </button>
                </div>
              )}
            </section>
          )}

          {/* -------------------- FOOTER -------------------- */}
          {d.thanksOn && (
            <footer className="sp-footer">
              <p className="sp-thanks-msg">{d.thanks}</p>
            </footer>
          )}

          <div className="sp-brand-bottom">
            <span>ChungDoi · Tạo thiệp cưới online miễn phí</span>
          </div>
        </div>
      )}

      {/* ==================== LIGHTBOX MODAL ==================== */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg} alt="Ảnh phóng to" />
            <button
              className="lightbox-close"
              onClick={() => setLightboxImg(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ==================== RSVP MODAL ==================== */}
      {rsvpOpen && (
        <div className="lightbox-overlay" onClick={() => setRsvpOpen(false)}>
          <div
            className="rsvp-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rsvp-modal-header">
              <h3>Xác nhận tham dự</h3>
              <button
                className="rsvp-close-btn"
                onClick={() => setRsvpOpen(false)}
              >
                ✕
              </button>
            </div>

            {rsvpSubmitted ? (
              <div className="rsvp-success-state">
                <span className="rsvp-check-icon">✓</span>
                <h4>Cảm ơn bạn đã phản hồi!</h4>
                <p>Chúng tôi rất mong được đón tiếp bạn trong ngày vui.</p>
                <button
                  className="sp-btn-primary"
                  onClick={() => setRsvpOpen(false)}
                >
                  Đóng
                </button>
              </div>
            ) : (
              <form
                className="rsvp-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setRsvpSubmitted(true);
                  if (rsvpForm.note.trim()) {
                    set({
                      wishes: [
                        {
                          name: rsvpForm.name || "Khách mời",
                          msg: rsvpForm.note,
                          at: new Date().toLocaleDateString("vi-VN"),
                        },
                        ...d.wishes,
                      ],
                    });
                  }
                }}
              >
                <label className="rsvp-field">
                  <span>Họ và tên của bạn*</span>
                  <input
                    required
                    type="text"
                    value={rsvpForm.name}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, name: e.target.value })
                    }
                    placeholder="Ví dụ: Nguyễn Văn A"
                  />
                </label>

                <label className="rsvp-field">
                  <span>Số điện thoại</span>
                  <input
                    type="tel"
                    value={rsvpForm.phone}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, phone: e.target.value })
                    }
                    placeholder="Ví dụ: 0912 345 678"
                  />
                </label>

                <label className="rsvp-field">
                  <span>Bạn sẽ tham dự chứ?</span>
                  <select
                    value={rsvpForm.attending}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, attending: e.target.value })
                    }
                  >
                    <option value="yes">Chắc chắn tham dự</option>
                    <option value="maybe">Có thể tham dự</option>
                    <option value="no">Rất tiếc không thể tham dự</option>
                  </select>
                </label>

                <label className="rsvp-field">
                  <span>Số người tham dự</span>
                  <select
                    value={rsvpForm.count}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, count: e.target.value })
                    }
                  >
                    <option value="1">1 người</option>
                    <option value="2">2 người</option>
                    <option value="3">3 người</option>
                    <option value="4">4+ người</option>
                  </select>
                </label>

                <label className="rsvp-field">
                  <span>Gửi lời nhắn hoặc chế độ ăn uống</span>
                  <textarea
                    rows={2}
                    value={rsvpForm.note}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, note: e.target.value })
                    }
                    placeholder="Ví dụ: Ăn chay, hoặc lời chúc mừng gửi tới dâu rể..."
                  />
                </label>

                <button type="submit" className="sp-btn-primary full-w">
                  Gửi phản hồi
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ==================== GIFT MODAL ==================== */}
      {giftModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setGiftModalOpen(false)}
        >
          <div
            className="w-full max-w-lg sm:max-w-xl p-0 max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative"
            style={{ backgroundColor: "rgb(248, 243, 224)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative px-6 pt-6 pb-4 text-center"
              style={{ backgroundColor: "rgb(195, 42, 41)" }}
            >
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-white/80 hover:text-white hover:bg-white/20"
                onClick={() => setGiftModalOpen(false)}
                aria-label="Đóng"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2
                className="text-[21px] md:text-[25px] lg:text-[32px]"
                style={{
                  textShadow: "rgba(0, 0, 0, 0.2) 1px 1px 2px",
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  color: "white",
                }}
              >
                {d.giftTitle || "Hộp Quà Mừng"}
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <div
                className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center"
                style={{ color: "rgb(84, 46, 8)" }}
              >
                {d.gifts.map((g) => {
                  const title =
                    g.who === "custom" && g.customLabel
                      ? g.customLabel
                      : g.who === "groom"
                      ? "Chú Rể"
                      : "Cô Dâu";
                  return (
                    <div
                      className="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none"
                      key={g.id}
                    >
                      <h3
                        className="mb-3 text-sm font-medium text-center line-clamp-2"
                        style={{ color: "rgb(195, 42, 41)" }}
                      >
                        {title} - {g.accountName}
                      </h3>
                      <div
                        className="w-44 h-44 sm:w-48 sm:h-48 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center"
                        style={{ border: "2px solid rgba(195, 42, 41, 0.125)" }}
                      >
                        <img
                          alt={`QR - ${title} - ${g.accountName}`}
                          className="w-full h-full object-contain"
                          src={g.qrUrl}
                        />
                      </div>
                      <div className="mt-3 text-center space-y-0.5">
                        <p className="text-xs" style={{ color: "rgb(84, 46, 8)" }}>
                          {g.bankName}
                        </p>
                        <p className="text-xs font-mono font-bold" style={{ color: "rgb(84, 46, 8)" }}>
                          {g.accountNumber}
                        </p>
                        <p className="text-xs font-semibold" style={{ color: "rgb(84, 46, 8)" }}>
                          {g.accountName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          className="text-xs px-3 py-1.5 inline-flex items-center gap-1 font-medium rounded-full transition-colors cursor-pointer"
                          style={{
                            color: "rgb(195, 42, 41)",
                            backgroundColor: "rgba(195, 42, 41, 0.082)",
                          }}
                          onClick={() => copyToClipboard(g.accountNumber, g.id)}
                        >
                          {copiedBank === g.id ? "✓ Đã chép" : "Sao chép STK"}
                        </button>
                        {g.qrUrl && (
                          <a
                            href={g.qrUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={`vietqr-${g.bankCode}-${g.accountNumber}.png`}
                            className="text-xs px-3 py-1.5 inline-flex items-center gap-1 font-medium rounded-full transition-colors cursor-pointer"
                            style={{
                              color: "rgb(195, 42, 41)",
                              backgroundColor: "rgba(195, 42, 41, 0.082)",
                              textDecoration: "none",
                            }}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Lưu QR
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
