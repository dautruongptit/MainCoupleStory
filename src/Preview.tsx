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
}: {
  d: Inv;
  set: (p: Partial<Inv>) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
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
  const [activeBankTab, setActiveBankTab] = useState<"bride" | "groom">("bride");
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
    <div className="pv-wrapper">
      {/* View Switcher Bar for testing Envelope vs Full Invitation */}
      <div className="pv-toolbar">
        <span className="pv-badge">Giao diện Mẫu thiệp Song Phụng - Đỏ</span>
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
      </div>

      {/* ==================== 1. MÀN HÌNH BÌ THƯ (ENVELOPE) ==================== */}
      {!isOpen && (
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
      )}

      {/* ==================== 2. NỘI DUNG THIỆP ĐÃ MỞ (OPENED) ==================== */}
      {isOpen && (
        <div className="songphung-template">
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
          <div
            className="paper-texture"
            style={{
              backgroundImage: "url(https://chungdoi.com/images/themes/songphung-red/NENGIAY.jpg)",
            }}
          />

          {/* Phoenix Line Side Decorations (Parallax Artwork) */}
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

          {/* -------------------- HERO SECTION -------------------- */}
          <header className="sp-hero">
            <div className="sp-hero-names">
              <div className="sp-name-1">{n1}</div>
              <div className="sp-name-2">{n2}</div>
            </div>

            {/* Central Banner with Red Strip, Phoenix Birds and Chữ Hỷ */}
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

          {/* -------------------- SECTION 1: LỄ CƯỚI & GIA ĐÌNH -------------------- */}
          <section className="sp-section sp-family-sec">
            {/* Flower Accent top-right */}
            <img
              src="https://chungdoi.com/images/themes/songphung-red/HOA.webp"
              alt=""
              className="sp-flower-corner"
            />

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
              <h2 className="sp-sec-title">LỊCH TRÌNH NGÀY CƯỚI</h2>
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
            <section className="sp-section sp-gift-sec">
              <h2 className="sp-sec-title">{d.giftTitle || "HỘP MỪNG CƯỚI"}</h2>

              {/* Bank selector tabs */}
              <div className="sp-gift-tabs">
                <button
                  className={`sp-gift-tab ${activeBankTab === "bride" ? "active" : ""}`}
                  onClick={() => setActiveBankTab("bride")}
                >
                  👰 Mừng cưới Cô dâu
                </button>
                <button
                  className={`sp-gift-tab ${activeBankTab === "groom" ? "active" : ""}`}
                  onClick={() => setActiveBankTab("groom")}
                >
                  🤵 Mừng cưới Chú rể
                </button>
              </div>

              {/* QR and Account Card */}
              {currentGift && (
                <div className="sp-bank-card">
                  {currentGift.qrUrl && (
                    <div className="sp-qr-box">
                      <img src={currentGift.qrUrl} alt="VietQR Mừng cưới" />
                      <p className="sp-qr-hint">Quét mã QR để mừng cưới qua ngân hàng</p>
                    </div>
                  )}

                  <div className="sp-bank-info">
                    <p>
                      Ngân hàng: <b>{currentGift.bankName} ({currentGift.bankCode})</b>
                    </p>
                    <p>
                      Chủ tài khoản: <b>{currentGift.accountName}</b>
                    </p>
                    <div className="sp-acc-row">
                      <span>Số tài khoản: <b>{currentGift.accountNumber}</b></span>
                      <button
                        className="sp-copy-btn"
                        onClick={() =>
                          copyToClipboard(currentGift.accountNumber, currentGift.id)
                        }
                      >
                        {copiedBank === currentGift.id ? "✓ Đã sao chép" : "Sao chép"}
                      </button>
                    </div>
                  </div>
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
    </div>
  );
}
