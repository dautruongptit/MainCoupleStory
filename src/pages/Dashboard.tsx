import { useState, useEffect, useCallback } from "react";
import { Link, navigate } from "../router";
import { loadCards, saveCards, type Card } from "../store";
import { LoginModal } from "../TopNav";

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

export default function Dashboard() {
  const [cards, setCards] = useState<Card[]>(loadCards);
  const [tab, setTab] = useState<"all" | "published" | "draft">("all");
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Card | null>(null);
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
        {/* Blue Protection Banner */}
        <div className="dash-protect-banner">
          <div className="dash-protect-left">
            <div className="dash-protect-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div className="dash-protect-info">
              <h4>Đăng nhập để bảo vệ thiệp của bạn</h4>
              <p>Thiệp hiện chỉ lưu trên thiết bị này. Đăng nhập để truy cập từ mọi nơi và tránh mất dữ liệu.</p>
            </div>
          </div>
          <button className="dash-protect-btn" onClick={() => setShowLogin(true)}>
            Đăng nhập ngay
          </button>
        </div>

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
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M8 7h8M8 11h5" /></svg>
            </div>
            <p>Chưa có thiệp nào{tab !== "all" ? ` ở trạng thái "${tab === "draft" ? "nháp" : "xuất bản"}"` : ""}.</p>
            <Link href="/vi/mau-thiep" className="btn-pill">Tạo thiệp mới</Link>
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
                  <span className="inv-status-pill">
                    <span className="inv-status-dot">•</span> {c.status === "draft" ? "Bản nháp" : "Đã xuất bản"}
                  </span>
                </div>

                <div className="inv-info-wrap">
                  <p className="inv-tpl-line">{c.template}{c.color ? ` - ${c.color}` : ""}</p>
                  <p className="inv-date-line">Ngày tạo: {c.created}</p>
                </div>

                <div className="inv-bottom-actions">
                  <button className="inv-btn-publish" disabled={c.status === "published"} onClick={() => publish(c.id)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 7-7 7 7" />
                      <path d="M12 19V5" />
                    </svg>
                    {c.status === "published" ? "Đã xuất bản" : "Xuất bản"}
                  </button>
                  <button className="inv-btn-delete" onClick={() => setDeleting(c)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                    </svg>
                    Xóa
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {deleting && <DeleteModal name={deleting.name} onConfirm={() => remove(deleting.id)} onCancel={() => setDeleting(null)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </main>
  );
}

