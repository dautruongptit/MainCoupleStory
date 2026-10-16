import { useState, useEffect, useCallback } from "react";
import { Link, navigate } from "../router";
import { loadCards, saveCards, loadInv, saveInv, removeInv, removeGuests, loadGuests, type Card } from "../store";
import { LoginModal, useAuth } from "../TopNav";
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

import PublishCheckModal from "../PublishCheckModal";

export default function Dashboard() {
  const { loggedIn, login } = useAuth();
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
  const duplicate = (c: Card) => {
    const d = new Date();
    const created = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    const id = crypto.randomUUID();
    const inv = loadInv(c.id);
    if (inv) saveInv(id, inv); // nhân bản nội dung thiệp, KHÔNG nhân bản danh sách khách mời (khách có link riêng theo từng thiệp)
    persist([...cards, { ...c, id, name: `Thiệp ${cards.length + 1}`, status: "draft", created }]);
  };
  const remove = (id: string) => { persist(cards.filter((c) => c.id !== id)); removeInv(id); removeGuests(id); setDeleting(null); };

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
        {/* Blue alert banner when not logged in */}
        {!loggedIn && (
          <div className="dash-auth-alert-banner">
            <div className="dash-auth-alert-left">
              <div className="dash-auth-alert-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <div className="dash-auth-alert-text">
                <h4 className="dash-auth-alert-title">Đăng nhập để bảo vệ thiệp của bạn</h4>
                <p className="dash-auth-alert-desc">Thiệp hiện chỉ lưu trên thiết bị này. Đăng nhập để truy cập từ mọi nơi và tránh mất dữ liệu.</p>
              </div>
            </div>
            <button
              type="button"
              className="dash-auth-alert-btn"
              onClick={() => setShowLogin(true)}
            >
              Đăng nhập ngay
            </button>
          </div>
        )}

        {/* Tabs Bar - ONLY show when user has at least 1 card */}
        {cards.length > 0 && (
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
        )}

        {cards.length === 0 ? (
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
        ) : shown.length === 0 ? (
          <div className="dash-empty-v3">
            <h3 className="dash-empty-title">Không có thiệp nào</h3>
            <p className="dash-empty-desc">Chưa có thiệp nào thuộc mục này</p>
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
                  {c.status === "published" ? (
                    <>
                      <span className="inv-trial-tag">• Dùng thử</span>
                      <span className="inv-trial-sub">Còn 3 ngày • 0/20 khách</span>
                    </>
                  ) : (
                    <span className="inv-status-pill">
                      <span className="inv-status-dot">•</span> Bản nháp
                    </span>
                  )}
                </div>

                <div className="inv-info-wrap">
                  <div className="inv-tpl-line">
                    <span>{c.template} - <span className="inv-tpl-color">{c.color || "Nâu"}</span></span>
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
                  {c.status === "published" ? (
                    <>
                      <button className="dash-btn-pay" onClick={() => navigate("/vi/bang-gia")}>
                        <span className="dash-pay-ic">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8L4 8.8h6.1z" />
                          </svg>
                        </span>
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
                      <button className="dash-btn-dup" onClick={() => duplicate(c)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <span>Nhân bản</span>
                      </button>
                    </>
                  ) : (
                    <button className="inv-btn-publish" onClick={() => setPublishing(c)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>Xuất bản</span>
                    </button>
                  )}
                  <button className="inv-btn-delete" onClick={() => setDeleting(c)} title="Xóa thiệp">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                    </svg>
                    {c.status === "published" && <span>Xóa</span>}
                  </button>
                </div>
              </article>
            ))}
            {tab === "all" && (
              <Link href="/vi/mau-thiep" className="inv-new-card">
                <span className="inv-new-plus">+</span>
                <span>Tạo thiệp mới</span>
              </Link>
            )}
          </div>
        )}
      </div>

      {sharingCard && (
        <ShareModal
          name={sharingCard.name}
          slug="z6dt5xo7"
          guestsCount={loadGuests(sharingCard.id).length}
          onClose={() => setSharingCard(null)}
        />
      )}

      {deleting && <DeleteModal name={deleting.name} onConfirm={() => remove(deleting.id)} onCancel={() => setDeleting(null)} />}
      {publishing && (
        <PublishCheckModal
          card={publishing}
          onConfirm={() => {
            publish(publishing.id);
            const pub = cards.find((c) => c.id === publishing.id) || publishing;
            setPublishing(null);
            setSharingCard({ ...pub, status: "published" });
          }}
          onCancel={() => setPublishing(null)}
        />
      )}
      {showLogin && <LoginModal onClose={() => { setShowLogin(false); login(); }} />}
    </main>
  );
}

