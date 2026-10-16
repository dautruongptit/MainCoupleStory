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
    { label: "Tài khoản ngân hàng", done: d ? Boolean(d.gifts && d.gifts.length > 0) : false },
    { label: "Thông tin gia đình", done: d ? Boolean(d.groomFather || d.groomMother || d.brideFather || d.brideMother) : false },
    { label: "Ảnh cưới", done: d ? Boolean((d.photos && d.photos.length > 0) || d.heroPhoto) : false },
  ];

  const allItems = [...requiredItems, ...optionalItems];
  const completed = allItems.filter((x) => x.done).length;
  const total = allItems.length;
  const pct = Math.round((completed / total) * 100);
  const isReady = requiredItems.every((x) => x.done);

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - pct / 100);

  return (
    <div className="login-back" onMouseDown={onCancel}>
      <div className="pub-check-box" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <button className="pub-check-close" aria-label="Đóng" onClick={onCancel}>✕</button>

        {isReady ? (
          <div className="pub-check-icon ready">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="pub-check-icon warning">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <path d="M9 12h6M9 16h6" />
            </svg>
          </div>
        )}

        <h3 className="pub-check-title">{isReady ? "Sẵn sàng xuất bản!" : "Kiểm tra thông tin"}</h3>
        <p className="pub-check-sub">{completed}/{total} mục đã hoàn thành</p>

        <div className="pub-progress-ring">
          <svg width="68" height="68" viewBox="0 0 68 68">
            <circle
              cx="34"
              cy="34"
              r={radius}
              fill="none"
              stroke="#302b28"
              strokeWidth="4"
            />
            <circle
              cx="34"
              cy="34"
              r={radius}
              fill="none"
              stroke={isReady ? "#10b981" : "#f59e0b"}
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 34 34)"
            />
          </svg>
          <span className="pub-progress-num">{pct}%</span>
        </div>

        <div className="pub-checklist-wrap">
          <div className="pub-check-group">
            <span className="pub-group-title">BẮT BUỘC</span>
            <ul className="pub-items-list">
              {requiredItems.map((item, idx) => (
                <li key={idx} className={item.done ? "done" : ""}>
                  {item.done ? (
                    <span className="pub-item-check-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  ) : (
                    <span className="pub-item-bullet" />
                  )}
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
                  {item.done ? (
                    <span className="pub-item-check-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  ) : (
                    <span className="pub-item-bullet" />
                  )}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {!isReady && (
          <div className="pub-device-warn">
            <div className="pub-device-warn-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <p>Thiệp hiện chỉ lưu trên thiết bị này. Bạn sẽ được yêu cầu đăng nhập khi xuất bản để truy cập từ mọi nơi và tránh mất dữ liệu.</p>
          </div>
        )}

        <div className="pub-actions">
          <button type="button" className="pub-btn-back" onClick={onCancel}>
            Quay lại
          </button>
          <button
            type="button"
            className={isReady ? "pub-btn-ready" : "pub-btn-warning"}
            onClick={onConfirm}
          >
            {isReady ? "Xuất bản" : "Vẫn xuất bản"}
          </button>
        </div>
      </div>
    </div>
  );
}
