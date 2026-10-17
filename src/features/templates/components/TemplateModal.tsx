import { useEffect, useMemo, useRef } from "react";
import qrcode from "qrcode-generator";
import { Link, navigate } from "@/app/router";
import { TPL_CDN, Tpl } from "@/features/templates/data/templates";
import { createDraft } from "@/services/storage/store";

const ico = (d: string) => (
  <svg className="feat-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const FEATURES: [string, string][] = [
  ["Tùy chỉnh nội dung", "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"],
  ["Ảnh không giới hạn", "M3 5h18v14H3zM8.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM21 15l-5-5L5 19"],
  ["Google Maps", "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"],
  ["Đa ngôn ngữ", "M5 8h8M9 4v4M7 8c0 3-2 5-4 6M7 10c1 2 3 4 5 5M12 20l4-10 4 10M13.5 17h5"],
  ["Ghi tên khách mời", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"],
  ["Chia sẻ qua link", "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 13.5l6.8 4M15.4 6.5l-6.8 4"],
  ["Xác nhận tham dự", "M8 2v4M16 2v4M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM9 15l2 2 4-4"],
  ["Nhận lời chúc", "M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12Z"],
];

const DEMO_ORIGIN = "https://chungdoi.com";

function Qr({ text }: { text: string }) {
  const svg = useMemo(() => {
    const q = qrcode(0, "M");
    q.addData(text);
    q.make();
    return q.createSvgTag({ cellSize: 3, margin: 0, scalable: true });
  }, [text]);
  return <div className="qr" role="img" aria-label="Mã QR xem demo" dangerouslySetInnerHTML={{ __html: svg }} />;
}

export default function TemplateModal({ tpl, onClose }: { tpl: Tpl; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const choose = () => {
    const id = createDraft(tpl);
    navigate(`/edit/${id}?template=${tpl.id}`);
  };

  return (
    <div className="tm-back" onMouseDown={onClose}>
      <div className="tm" role="dialog" aria-modal="true" aria-label={tpl.name} onMouseDown={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="tm-x" aria-label="Đóng" onClick={onClose}>✕</button>
        
        {/* Mobile Header (rendered above phone mockup on mobile) */}
        <div className="tm-header-mobile">
          <h2>{tpl.name}</h2>
          <p className="tm-desc">{tpl.desc}</p>
          <div className="tm-tags">{tpl.tags.map((t) => <span key={t}>{t}</span>)}</div>
        </div>

        <div className="tm-left">
          <div className="tm-phone-frame">
            <img src={TPL_CDN + tpl.full} alt={`Xem trước ${tpl.name}`} />
          </div>
        </div>
        <div className="tm-right">
          <div className="tm-header-desktop">
            <h2>{tpl.name}</h2>
            <p className="tm-desc">{tpl.desc}</p>
            <div className="tm-tags">{tpl.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
          <h3>Tính năng</h3>
          <ul className="tm-feats">
            {FEATURES.map(([t, d]) => <li key={t}>{ico(d)}{t}</li>)}
          </ul>
          <div className="tm-spacer" />
          <div className="tm-qr">
            <Qr text={`${DEMO_ORIGIN}/vi/mau-thiep/${tpl.slug}/demo`} />
            <p>Quét mã QR để xem demo trực tiếp trên điện thoại</p>
          </div>
          <p className="tm-note">Tạo miễn phí · Thử 3 ngày · Đẹp mới thanh toán<br />Bạn có thể đổi mẫu bất cứ lúc nào khi chỉnh sửa</p>
          <div className="tm-actions">
            <button className="tm-choose" onClick={choose}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              Tạo thiệp
            </button>
            <Link className="tm-demo" href={`/vi/mau-thiep/${tpl.slug}/demo`}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
              Xem demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
