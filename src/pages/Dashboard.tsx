import { useState, useEffect, useCallback } from "react";
import { Link, navigate } from "../router";
import { loadCards, saveCards, type Card } from "../store";
import { TEMPLATES, TPL_CDN } from "../templates";

function DeleteModal({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onCancel]);

  return (
    <div className="login-back" onMouseDown={onCancel}>
      <div className="del-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="del-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
        </div>
        <h3>Xóa thiệp</h3>
        <p>Bạn có chắc muốn xóa <b>"{name}"</b>? Thao tác này không thể hoàn tác.</p>
        <div className="del-btns">
          <button className="btn-outline-pill" onClick={onCancel}>Hủy</button>
          <button className="btn-pill del-confirm" onClick={onConfirm}>Xóa thiệp</button>
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

  const persist = useCallback((next: Card[]) => { setCards(next); saveCards(next); }, []);

  const shown = cards.filter((c) => tab === "all" || c.status === tab);
  const count = (s: Card["status"]) => cards.filter((c) => c.status === s).length;
  const rename = (id: string, name: string) => persist(cards.map((c) => (c.id === id ? { ...c, name } : c)));
  const publish = (id: string) => persist(cards.map((c) => (c.id === id ? { ...c, status: "published" } : c)));
  const remove = (id: string) => { persist(cards.filter((c) => c.id !== id)); setDeleting(null); };

  const tplThumb = (tplId?: string) => {
    if (!tplId) return null;
    const t = TEMPLATES.find((x) => x.id === tplId);
    return t ? TPL_CDN + t.img : null;
  };

  const tabs: [typeof tab, string][] = [
    ["all", `Tất cả (${cards.length})`],
    ["published", `Xuất bản (${count("published")})`],
    ["draft", `Nháp (${count("draft")})`],
  ];

  return (
    <main className="page">
      <h1 className="page-title">Thiệp của tôi</h1>
      <p className="page-sub">Quản lý và theo dõi các thiệp của bạn</p>

      <div className="dash-wrap">
        <div className="dash-bar">
          <div className="tabs">
            {tabs.map(([k, l]) => (
              <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>
            ))}
          </div>
          <button className="btn-pill sm" onClick={() => navigate("/vi/mau-thiep")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            Tạo thiệp mới
          </button>
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
          <div className="card-grid">
            {shown.map((c) => {
              const thumb = tplThumb(c.tplId);
              return (
                <article className="inv-card" key={c.id}>
                  {thumb && (
                    <Link href={`/edit/${c.id}`} className="inv-thumb">
                      <img src={thumb} alt={c.template} loading="lazy" />
                    </Link>
                  )}
                  <div className="inv-body">
                    <div className="inv-top">
                      <div className="inv-name">
                        {editing === c.id ? (
                          <input className="input" autoFocus value={c.name} onChange={(e) => rename(c.id, e.target.value)}
                            onBlur={() => setEditing(null)} onKeyDown={(e) => e.key === "Enter" && setEditing(null)} />
                        ) : (
                          <>
                            <b>{c.name}</b>
                            <button aria-label="Đổi tên thiệp" onClick={() => setEditing(c.id)}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                            </button>
                          </>
                        )}
                      </div>
                      <span className={"status " + c.status}>{c.status === "draft" ? "Bản nháp" : "Đã xuất bản"}</span>
                    </div>
                    <p className="tpl-line">{c.template}{c.color ? ` - ${c.color}` : ""}</p>
                    <p className="date-line">Ngày tạo: {c.created}</p>
                    <div className="inv-actions">
                      <Link href={`/edit/${c.id}`} className="inv-act edit">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                        Chỉnh sửa
                      </Link>
                      <button className="inv-act pub" disabled={c.status === "published"} onClick={() => publish(c.id)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                        {c.status === "published" ? "Đã xuất bản" : "Xuất bản"}
                      </button>
                      <button className="inv-act del" onClick={() => setDeleting(c)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
                        Xóa
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {deleting && <DeleteModal name={deleting.name} onConfirm={() => remove(deleting.id)} onCancel={() => setDeleting(null)} />}
    </main>
  );
}
