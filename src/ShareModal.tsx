import { useState, useEffect, useMemo } from "react";
import qrcode from "qrcode-generator";
import { navigate } from "./router";

export function QrModal({
  slug,
  onClose,
}: {
  slug: string;
  onClose: () => void;
}) {
  const [downloaded, setDownloaded] = useState(false);
  const fullUrl = `https://chungdoi.com/i/${slug}`;

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const svg = useMemo(() => {
    const q = qrcode(0, "M");
    q.addData(fullUrl);
    q.make();
    return q.createSvgTag({ cellSize: 6, margin: 0, scalable: true });
  }, [fullUrl]);

  const downloadQr = () => {
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const URLObj = window.URL || window.webkitURL || window;
    const blobURL = URLObj.createObjectURL(svgBlob);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 600, 600);
        ctx.drawImage(image, 30, 30, 540, 540);
        const png = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.download = `qr-${slug}.png`;
        a.href = png;
        a.click();
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2000);
      }
    };
    image.src = blobURL;
  };

  return (
    <div className="login-back qr-modal-back" onMouseDown={onClose}>
      <div className="qr-modal-box" onMouseDown={(e) => e.stopPropagation()}>
        <button className="qr-modal-close" onClick={onClose} aria-label="Đóng">
          ✕
        </button>

        <div className="qr-img-wrapper" dangerouslySetInnerHTML={{ __html: svg }} />

        <div className="qr-slug-section">
          <div className="qr-slug-label">LINK THIỆP:</div>
          <div className="qr-slug-row">
            <span className="qr-slug-val">/{slug}</span>
            <button className="qr-slug-edit-btn" aria-label="Sửa đường link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="qr-info-callout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="qr-info-ico">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p>
            Mã QR này dẫn đến link chung (không có tên khách). In lên thiệp giấy để khách quét xem thiệp online.
          </p>
        </div>

        <button className="qr-download-btn" onClick={downloadQr}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          <span>{downloaded ? "Đã tải mã QR" : "Tải ảnh QR"}</span>
        </button>
      </div>
    </div>
  );
}

export default function ShareModal({
  name = "Thiệp 1",
  slug = "z6dt5xo7",
  guestsCount = 0,
  maxGuests = 20,
  daysLeft = 3,
  onClose,
}: {
  name?: string;
  slug?: string;
  guestsCount?: number;
  maxGuests?: number;
  daysLeft?: number;
  onClose: () => void;
}) {
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);
  const fullUrl = `https://chungdoi.com/i/${slug}`;

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: name, url: fullUrl }).catch(() => copyLink());
    } else {
      copyLink();
    }
  };

  return (
    <>
      <div className="login-back share-modal-back" onMouseDown={onClose}>
        <div className="share-modal-box" onMouseDown={(e) => e.stopPropagation()}>
          <button className="share-modal-close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>

          <div className="share-modal-header">
            <h3 className="share-modal-title">{name}</h3>
            <div className="share-trial-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Còn {maxGuests - guestsCount} khách mời · {daysLeft} ngày dùng thử</span>
            </div>
            <a
              href={fullUrl}
              target="_blank"
              rel="noreferrer"
              className="share-inv-url"
              onClick={(e) => {
                e.preventDefault();
                copyLink();
              }}
            >
              {fullUrl}
            </a>
          </div>

          <div className="share-modal-desc">
            <p>Link chung — dùng cho nhóm chat, mạng xã hội, in thiệp giấy.</p>
            <p>Nên gửi link bằng điện thoại để hiện đủ thông tin trong tin nhắn.</p>
          </div>

          <div className="share-action-btns">
            <button className="share-btn share-link-btn" onClick={handleShare}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
              </svg>
              <span>{copied ? "Đã sao chép" : "Chia sẻ link"}</span>
            </button>
            <button className="share-btn share-qr-btn" onClick={() => setShowQr(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>Mã QR</span>
            </button>
          </div>

          <div className="share-menu-list">
            <button
              className="share-menu-item"
              onClick={() => {
                onClose();
                navigate(`/vi/mau-thiep/minimalism-nau/demo`);
              }}
            >
              <div className="share-menu-ico">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="share-menu-label">Xem thiệp</div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="share-chevron">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <button className="share-menu-item" onClick={copyLink}>
              <div className="share-menu-ico">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <div className="share-menu-label">Tùy chỉnh đường link</div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="share-chevron">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <button
              className="share-menu-item"
              onClick={() => {
                onClose();
                navigate("/vi/bang-gia");
              }}
            >
              <div className="share-menu-ico">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <div className="share-menu-content">
                <div className="share-menu-label">Thanh toán</div>
                <div className="share-menu-sub">Gồm tải ảnh PNG và video MP4 của thiệp</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="share-chevron">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <button
              className="share-menu-item invite-special"
              onClick={() => {
                onClose();
                navigate("/guests");
              }}
            >
              <div className="share-menu-ico glowing-pink">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="share-menu-content">
                <div className="share-menu-label-row">
                  <span className="share-menu-label-pink">Mời khách</span>
                  <span className="share-guest-count-pill">1 khách</span>
                </div>
                <div className="share-menu-sub">Ghi tên &amp; tạo link riêng cho từng khách</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2.5" className="share-chevron">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showQr && <QrModal slug={slug} onClose={() => setShowQr(false)} />}
    </>
  );
}
