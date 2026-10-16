import { useEffect } from "react";
import { type Card } from "./store";
import { type Inv } from "./data";

export default function PublishCheckModal({
  card,
  d,
  onConfirm,
  onCancel,
}: {
  card?: Card;
  d?: Inv;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onCancel]);

  const requiredItems = [
    { label: "Tên chú rể", done: d ? Boolean(d.groomFull || d.groomNick) : false },
    { label: "Tên cô dâu", done: d ? Boolean(d.brideFull || d.brideNick) : false },
    { label: "Ngày cưới", done: d ? Boolean(d.date) : false },
    { label: "Giờ cưới", done: d ? Boolean(d.time) : false },
    { label: "Địa chỉ tiệc cưới", done: d ? Boolean(d.address) : false },
  ];

  const optionalItems = [
    { label: "Bản đồ", done: d ? Boolean(d.mapUrl) : false },
    { label: "Thông tin gia đình chú rể", done: d ? Boolean(d.groomFather || d.groomMother) : false },
    { label: "Thông tin gia đình cô dâu", done: d ? Boolean(d.brideFather || d.brideMother) : false },
    { label: "Ảnh cưới", done: d ? Boolean((d.photos && d.photos.length > 0) || d.heroPhoto) : false },
  ];

  const allItems = [...requiredItems, ...optionalItems];
  const completed = allItems.filter((x) => x.done).length;
  const total = allItems.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="login-back" onMouseDown={onCancel}>
      <div className="pub-check-box" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <button className="pub-check-close" aria-label="Đóng" onClick={onCancel}>✕</button>

        <div className="pub-check-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <path d="M9 12h6M9 16h6" />
          </svg>
        </div>

        <h3 className="pub-check-title">Kiểm tra thông tin</h3>
        <p className="pub-check-sub">{completed}/{total} mục đã hoàn thành</p>

        <div className="pub-progress-ring">
          <span className="pub-progress-dot" />
          <span className="pub-progress-num">{pct}%</span>
        </div>

        <div className="pub-checklist-wrap">
          <div className="pub-check-group">
            <span className="pub-group-title">BẮT BUỘC</span>
            <ul className="pub-items-list">
              {requiredItems.map((item, idx) => (
                <li key={idx} className={item.done ? "done" : ""}>
                  <span className="pub-item-bullet" />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pub-check-group">
            <span className="pub-group-title">TÙY CHỌN</span>
            <ul className="pub-items-list">
              {optionalItems.map((item, idx) => (
                <li key={idx} className={item.done ? "done" : ""}>
                  <span className="pub-item-bullet" />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pub-device-warn">
          <div className="pub-device-warn-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <p>Thiệp hiện chỉ lưu trên thiết bị này. Bạn sẽ được yêu cầu đăng nhập khi xuất bản để truy cập từ mọi nơi và tránh mất dữ liệu.</p>
        </div>

        <div className="pub-actions">
          <button type="button" className="pub-btn-back" onClick={onCancel}>
            Quay lại
          </button>
          <button type="button" className="pub-btn-confirm" onClick={onConfirm}>
            Vẫn xuất bản
          </button>
        </div>
      </div>
    </div>
  );
}
