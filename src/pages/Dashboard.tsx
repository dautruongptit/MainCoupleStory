import { useState, useEffect, useCallback } from "react";
import { Link, navigate } from "../router";
import { loadCards, saveCards, type Card } from "../store";
import { LoginModal } from "../TopNav";
import ShareModal from "../ShareModal";

function DeleteModal({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onCancel]);

  return (
    <div className="login-back" onMouseDown={onCancel}>
      <div className="del-confirm-box" onMouseDown={(e) => e.stopPropagation()}>
        <div className="del-confirm-header">
          <div className="del-alert-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="del-header-text">
            <h3>Xác Nhận Xóa</h3>
            <p>Hành động này không thể hoàn tác!</p>
          </div>
        </div>

        <div className="del-warn-card">
          <h4>Cảnh báo:</h4>
          <ul>
            <li>• Thiệp "{name}" sẽ bị xóa vĩnh viễn</li>
            <li>• Tất cả dữ liệu liên quan sẽ mất</li>
            <li>• Không thể khôi phục sau khi xóa</li>
          </ul>
        </div>

        <div className="del-tip-card">
          <div className="del-tip-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18h6" />
              <path d="M10 22h4" />
              <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
            </svg>
          </div>
          <div className="del-tip-body">
            <b>Mẹo: bạn không cần xóa thiệp</b>
            <p>Bạn có thể đổi mẫu thiệp hoặc chỉnh sửa thông tin ngay trong trang chỉnh sửa thay vì xóa.</p>
          </div>
        </div>

        <div className="del-confirm-actions">
          <button type="button" className="del-btn-cancel" onClick={onCancel}>Hủy bỏ</button>
          <button type="button" className="del-btn-delete" onClick={onConfirm}>Xóa vĩnh viễn</button>
        </div>
      </div>
    </div>
  );
}

function PublishCheckModal({
  card,
  onConfirm,
  onCancel,
}: {
  card: Card;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onCancel]);

  const requiredItems = [
    { label: "Tên chú rể", done: false },
    { label: "Tên cô dâu", done: false },
    { label: "Ngày cưới", done: false },
    { label: "Giờ cưới", done: false },
    { label: "Địa chỉ tiệc cưới", done: false },
  ];

  const optionalItems = [
    { label: "Bản đồ", done: false },
    { label: "Thông tin gia đình chú rể", done: false },
    { label: "Thông tin gia đình cô dâu", done: false },
    { label: "Ảnh cưới", done: false },
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

export default function Dashboard() {
  const [cards, setCards] = useState<Card[]>(loadCards);
  const [tab, setTab] = useState<"all" | "published" | "draft">("all");
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Card | null>(null);
  const [publishing, setPublishing] = useState<Card | null>(null);
  const [sharingCard, setSharingCard] = useState<Card | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const persist = useCallback((next: Card[]) => { setCards(next); saveCards(next); }, []);

  const shown = cards.filter((c) => tab === "all" || c.status === tab);
  const count = (s: Card["status"]) => cards.filter((c) => c.status === s).length;
  const rename = (id: string, name: string) => persist(cards.map((c) => (c.id === id ? { ...c, name } : c)));
  const publish = (id: string) => persist(cards.map((c) => (c.id === id ? { ...c, status: "published" } : c)));
  const remove = (id: string) => { persist(cards.filter((c) => c.id !== id)); setDeleting(null); };

  const tabs: [typeof tab, string][] = [
    ["all", `Tất cả (${cards.length})`],
    ["published", `Xuất bản (${count("published")})`],
    ["draft", `Nháp (${count("draft")})`],
  ];

  return (
    <main className="page dash-page-v2">
      <div className="dash-header-center">
        <h1 className="page-title">Thiệp của tôi</h1>
        <p className="page-sub">Quản lý và theo dõi các thiệp của bạn</p>
      </div>

      <div className="dash-wrap">
        {/* Tabs Bar */}
        <div className="dash-tabs-bar">
          <div className="dash-tabs-group">
            {tabs.map(([k, l]) => (
              <button
                key={k}
                className={`dash-tab-btn ${tab === k ? "active" : ""}`}
                onClick={() => setTab(k)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {shown.length === 0 ? (
          <div className="dash-empty-v3">
            <div className="dash-empty-circle">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <h3 className="dash-empty-title">Bắt đầu tạo thiệp</h3>
            <p className="dash-empty-desc">Chọn một mẫu thiệp đẹp và tạo thiệp online miễn phí</p>
            <Link href="/vi/mau-thiep" className="dash-empty-btn">
              + Chọn mẫu thiệp
            </Link>
          </div>
        ) : (
          <div className="card-grid-v2">
            {shown.map((c) => (
              <article className="inv-card-v2" key={c.id}>
                <div className="inv-card-top">
                  <div className="inv-name-wrap">
                    {editing === c.id ? (
                      <input
                        className="input inv-rename-input"
                        autoFocus
                        value={c.name}
                        onChange={(e) => rename(c.id, e.target.value)}
                        onBlur={() => setEditing(null)}
                        onKeyDown={(e) => e.key === "Enter" && setEditing(null)}
                      />
                    ) : (
                      <>
                        <span className="inv-card-name">{c.name}</span>
                        <button className="inv-rename-btn" aria-label="Đổi tên thiệp" onClick={() => setEditing(c.id)}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  <Link href={`/edit/${c.id}`} className="inv-edit-card-link">
                    Chỉnh sửa thiệp <span className="inv-arrow">&gt;</span>
                  </Link>
                </div>

                <div className="inv-badge-wrap">
                  <span className="inv-trial-tag">• Dùng thử</span>
                  <span className="inv-trial-sub">Còn 3 ngày · 0/20 khách</span>
                </div>

                <div className="inv-info-wrap">
                  <div className="inv-tpl-line">
                    <span>{c.template}{c.color ? ` - ${c.color}` : " - Nâu"}</span>
                    <span className="inv-views-chip">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      0
                    </span>
                  </div>
                  <p className="inv-date-line">Ngày tạo: {c.created || "16/10/2026"}</p>
                </div>

                <div className="inv-bottom-actions">
                  <button className="dash-btn-pay" onClick={() => navigate("/vi/bang-gia")}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                    <span>Thanh toán</span>
                  </button>
                  <button className="dash-btn-share" onClick={() => setSharingCard(c)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <span>Chia sẻ</span>
                  </button>
                  <button className="inv-btn-delete" onClick={() => setDeleting(c)} title="Xóa thiệp">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {sharingCard && (
        <ShareModal
          name={sharingCard.name}
          slug="z6dt5xo7"
          onClose={() => setSharingCard(null)}
        />
      )}

      {deleting && <DeleteModal name={deleting.name} onConfirm={() => remove(deleting.id)} onCancel={() => setDeleting(null)} />}
      {publishing && (
        <PublishCheckModal
          card={publishing}
          onConfirm={() => {
            publish(publishing.id);
            setPublishing(null);
          }}
          onCancel={() => setPublishing(null)}
        />
      )}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </main>
  );
}

