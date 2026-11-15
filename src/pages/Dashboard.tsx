import { useState, useEffect, useCallback } from "react";
import { Link, navigate } from "@/app/router";
import { loadCards, saveCards, loadInv, saveInv, removeInv, removeGuests, loadGuests, collapseDrafts, getDraftCard } from "@/services/storage/store";
import { uuid } from "@/utils/uuid";
import { invitationApi } from "@/services/api/invitationApi";
import type { Card } from "@/types/card";
import { LoginModal } from "@/features/auth/components/LoginModal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import ShareModal from "@/components/common/ShareModal";
import PublishCheckModal from "@/features/editor/components/PublishCheckModal";

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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff0080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  const { loggedIn } = useAuth();
  const [cards, setCards] = useState<Card[]>(() => {
    const all = loadCards();
    const kept = collapseDrafts(all, false);
    if (kept.length !== all.length) saveCards(kept);
    return kept;
  });
  const [notice, setNotice] = useState("");
  const [tab, setTab] = useState<"all" | "published" | "draft">("all");
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Card | null>(null);
  const [publishing, setPublishing] = useState<Card | null>(null);
  const [sharingCard, setSharingCard] = useState<Card | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      invitationApi.list("all").then((serverCards) => {
        if (serverCards) {
          const kept = collapseDrafts(serverCards, true);
          setCards(kept);
          saveCards(kept);
        }
      }).catch(console.warn);
    }
  }, [loggedIn]);

  const persist = useCallback((next: Card[]) => { setCards(next); saveCards(next); }, []);

  const shown = cards.filter((c) => tab === "all" || c.status === tab);
  const count = (s: Card["status"]) => cards.filter((c) => c.status === s).length;
  const rename = (id: string, name: string) => {
    persist(cards.map((c) => (c.id === id ? { ...c, name } : c)));
    const target = cards.find((c) => c.id === id);
    const inv = loadInv(id);
    if (target && inv) {
      invitationApi.updateContent(id, name, target.status, inv).catch(console.warn);
    }
  };
  const publish = (id: string) => {
    persist(cards.map((c) => (c.id === id ? { ...c, status: "published" } : c)));
    const target = cards.find((c) => c.id === id);
    const inv = loadInv(id);
    if (target && inv) {
      invitationApi.updateContent(id, target.name, "published", inv).catch(console.warn);
    }
  };
  const duplicate = (c: Card) => {
    if (getDraftCard()) {
      setNotice("Bạn đang có một thiệp nháp. Mỗi lúc chỉ giữ một thiệp nháp — hãy xuất bản hoặc xóa nháp hiện tại trước khi nhân bản.");
      return;
    }
    const d = new Date();
    const created = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    const id = uuid();
    const inv = loadInv(c.id);
    if (inv) saveInv(id, inv); // nhân bản nội dung thiệp, KHÔNG nhân bản danh sách khách mời (khách có link riêng theo từng thiệp)
    persist([...cards, { ...c, id, name: `Thiệp ${cards.length + 1}`, status: "draft", created }]);
    if (c.tplId) {
      invitationApi.create(c.tplId, `Thiệp ${cards.length + 1}`).then((newServerCard) => {
        if (inv) invitationApi.updateContent(newServerCard.id, newServerCard.name, "draft", inv).catch(console.warn);
      }).catch(console.warn);
    }
  };
  const remove = (id: string) => {
    persist(cards.filter((c) => c.id !== id));
    removeInv(id);
    removeGuests(id);
    setDeleting(null);
    invitationApi.delete(id).catch(console.warn);
  };

  const tabs: [typeof tab, string][] = [
    ["all", `Tất cả (${cards.length})`],
    ["published", `Xuất bản (${count("published")})`],
    ["draft", `Nháp (${count("draft")})`],
  ];

  const hasDraft = cards.some((c) => c.status === "draft");

  return (
    <>
      {/* Markup theo trang gốc (Tailwind v4 + daisyUI halloween), cô lập trong .inv-root như editor */}
      <div className="inv-root">
        <div className="min-h-screen bg-base-200 pb-20 lg:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-40">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-semibold text-base-content tracking-tight">Thiệp của tôi</h1>
              <p className="text-sm text-base-content/60 mt-1">Quản lý và theo dõi các thiệp của bạn</p>
            </div>

            {notice && (
              <div role="alert" className="alert alert-warning mb-6">
                <div className="flex-1 text-sm">{notice}</div>
                <button type="button" className="btn btn-sm btn-ghost btn-circle" aria-label="Đóng" onClick={() => setNotice("")}>✕</button>
              </div>
            )}

            {!loggedIn && (
              <div className="alert alert-info mb-6">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div className="flex-1">
                  <h3 className="font-bold">Đăng nhập để bảo vệ thiệp của bạn</h3>
                  <div className="text-sm">Thiệp hiện chỉ lưu trên thiết bị này. Đăng nhập để truy cập từ mọi nơi và tránh mất dữ liệu.</div>
                </div>
                <button className="btn btn-sm btn-primary" onClick={() => setShowLogin(true)}>Đăng nhập ngay</button>
              </div>
            )}

            {cards.length > 0 && (
              <div className="flex lg:inline-flex gap-0.5 p-0.5 bg-base-300/50 rounded-lg mb-5">
                {tabs.map(([k, l]) => (
                  <button
                    key={k}
                    className={"flex-1 lg:flex-none py-1.5 px-3 text-xs font-medium rounded-md transition-all whitespace-nowrap " + (tab === k ? "bg-primary text-primary-content shadow-sm" : "text-base-content/60 hover:text-base-content")}
                    onClick={() => setTab(k)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}

            {cards.length === 0 ? (
              <div className="flex flex-col items-center text-center py-16">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-base-content">Bắt đầu tạo thiệp</h3>
                <p className="text-sm text-base-content/60 mt-1 mb-5">Chọn một mẫu thiệp đẹp và tạo thiệp online miễn phí</p>
                <Link href="/vi/mau-thiep" className="btn btn-primary btn-sm">+ Chọn mẫu thiệp</Link>
              </div>
            ) : shown.length === 0 ? (
              <div className="flex flex-col items-center text-center py-16">
                <h3 className="font-semibold text-lg text-base-content">Không có thiệp nào</h3>
                <p className="text-sm text-base-content/60 mt-1">Chưa có thiệp nào thuộc mục này</p>
              </div>
            ) : (
              <div id="invitation-list" className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-20 items-stretch">
                {shown.map((c) => (
                  <div
                    key={c.id}
                    data-bot-card-state={c.status}
                    className="bg-base-100 rounded-2xl shadow-sm transition-all cursor-pointer overflow-hidden flex flex-col group active:scale-[0.98]"
                    onClick={() => editing !== c.id && navigate(`/edit/${c.id}`)}
                  >
                    <div className="p-4 flex-1">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          {editing === c.id ? (
                            <input
                              className="input input-sm input-bordered w-full"
                              autoFocus
                              value={c.name}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => rename(c.id, e.target.value)}
                              onBlur={() => setEditing(null)}
                              onKeyDown={(e) => e.key === "Enter" && setEditing(null)}
                            />
                          ) : (
                            <button
                              aria-label="Đổi tên thiệp"
                              className="font-semibold text-base-content line-clamp-1 text-left group flex items-center gap-1.5 max-w-full"
                              onClick={(e) => { e.stopPropagation(); setEditing(c.id); }}
                            >
                              <span className="truncate">{c.name}</span>
                              <svg className="w-3.5 h-3.5 text-base-content/20 group-hover:text-base-content/50 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"></path></svg>
                            </button>
                          )}
                        </div>
                        <span className="text-xs text-base-content/30 flex-shrink-0 flex items-center gap-1">
                          Chỉnh sửa thiệp
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {c.status === "published" ? (
                          <>
                            <span className="inline-flex items-center gap-1 text-xs text-info bg-info/10 px-2 py-0.5 rounded-full">• Dùng thử</span>
                            <span className="inline-flex items-center gap-1 text-xs text-base-content/50 bg-base-content/5 px-2 py-0.5 rounded-full">Còn 3 ngày • 0/20 khách</span>
                          </>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-base-content/50 bg-base-content/5 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-base-content/30"></span>Bản nháp
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-base-content/50">
                        <span>{c.template} - <span className="text-yellow-500">{c.color || "Nâu"}</span></span>
                        {c.status === "published" && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            0
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-base-content/40 mt-1">
                        <span>Ngày tạo: {c.created || "16/10/2026"}</span>
                      </div>
                    </div>

                    <div className="flex border-t border-base-content/5 divide-x divide-base-content/5">
                      {c.status === "published" ? (
                        <>
                          <button className="flex-1 py-2.5 text-xs text-primary hover:bg-primary/5 active:bg-primary/10 flex items-center justify-center sm:gap-1.5 font-medium" onClick={(e) => { e.stopPropagation(); navigate("/vi/bang-gia"); }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path></svg>
                            Thanh toán
                          </button>
                          <button className="flex-1 py-2.5 text-xs text-base-content/50 hover:text-base-content hover:bg-base-content/5 flex items-center justify-center sm:gap-1.5" onClick={(e) => { e.stopPropagation(); setSharingCard(c); }}>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"></path></svg>
                            Chia sẻ
                          </button>
                          <button className="flex-1 py-2.5 text-xs text-base-content/50 hover:text-base-content hover:bg-base-content/5 flex items-center justify-center sm:gap-1.5" onClick={(e) => { e.stopPropagation(); duplicate(c); }}>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"></path></svg>
                            Nhân bản
                          </button>
                        </>
                      ) : (
                        <button className="flex-1 py-2.5 text-xs text-primary hover:bg-primary/5 active:bg-primary/10 flex items-center justify-center sm:gap-1.5 font-medium" onClick={(e) => { e.stopPropagation(); setPublishing(c); }}>
                          <svg className="hidden sm:block w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path></svg>
                          Xuất bản
                        </button>
                      )}
                      <button title="Xóa thiệp" className="py-2.5 px-3 text-xs text-base-content/30 hover:text-error/70 hover:bg-error/5 active:bg-error/10 flex items-center justify-center sm:gap-1.5 transition-colors" onClick={(e) => { e.stopPropagation(); setDeleting(c); }}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>
                        <span className="hidden sm:inline">Xóa</span>
                      </button>
                    </div>
                  </div>
                ))}
                {tab === "all" && !hasDraft && (
                  <Link href="/vi/mau-thiep" className="rounded-2xl border-2 border-dashed border-base-content/10 hover:border-primary/50 flex items-center justify-center gap-3 text-sm text-base-content/50 hover:text-base-content transition-colors min-h-[169px]">
                    <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-semibold">+</span>
                    <span>Tạo thiệp mới</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
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
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

