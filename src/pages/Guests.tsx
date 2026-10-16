import { useEffect, useMemo, useRef, useState } from "react";
import { Link, navigate } from "../router";
import { loadCards, loadGuests, saveGuests, guestUrl, type Guest } from "../store";
import { TPL_CDN, templateById } from "../templates";
import { LoginModal, useAuth } from "../TopNav";

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Overlay({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="login-back" onMouseDown={onClose}>
      <div className="gst-modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <div className="gst-modal-h">
          <h4>{title}</h4>
          <button type="button" className="icon-ghost" aria-label="Đóng" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const TABS = [
  ["list", "Danh sách"],
  ["overview", "Tổng quan"],
  ["wishes", "Lời chúc"],
] as const;

export default function Guests() {
  const { loggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const cards = useMemo(loadCards, []);
  const card = cards[0];
  const [tab, setTab] = useState<(typeof TABS)[number][0]>("list");
  const [guests, setGuests] = useState<Guest[]>(() => (card ? loadGuests(card.id) : []));
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState<"one" | "bulk" | null>(null);
  const [name, setName] = useState("");
  const [bulk, setBulk] = useState("");
  const [tools, setTools] = useState(false);
  const [filter, setFilter] = useState<"all" | "seen" | "unseen">("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterOpen) return;
    const h = (e: MouseEvent) => !filterRef.current?.contains(e.target as Node) && setFilterOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [filterOpen]);

  useEffect(() => {
    if (!tools) return;
    const h = (e: MouseEvent) => !toolsRef.current?.contains(e.target as Node) && setTools(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [tools]);

  if (!loggedIn) {
    return (
      <main className="page gst-page">
        <div className="gst-empty" style={{ paddingTop: 120 }}>
          <h3>Đăng nhập để quản lý khách mời</h3>
          <p>Mỗi khách có link riêng với tên được cá nhân hoá.</p>
          <div className="gst-empty-btns">
            <button type="button" className="gst-primary" onClick={() => setShowLogin(true)}>Đăng nhập</button>
          </div>
        </div>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      </main>
    );
  }

  if (!card) {
    return (
      <main className="page gst-page">
        <div className="gst-empty" style={{ paddingTop: 120 }}>
          <h3>Bạn chưa có thiệp nào</h3>
          <p>Tạo thiệp trước để thêm khách mời.</p>
          <div className="gst-empty-btns">
            <Link className="gst-primary" href="/vi/mau-thiep">Chọn mẫu thiệp</Link>
          </div>
        </div>
      </main>
    );
  }

  const persist = (next: Guest[]) => { setGuests(next); saveGuests(card.id, next); };
  const today = new Date().toLocaleDateString("vi-VN");
  const make = (n: string, taken: Set<string>): Guest => {
    const base = slugify(n) || "khach";
    let slug = base, i = 2;
    while (taken.has(slug)) slug = `${base}-${i++}`;
    taken.add(slug);
    return { id: crypto.randomUUID(), name: n, slug, views: 0, added: today };
  };
  const clean = (v: string) => v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, 100);
  const addOne = () => {
    const n = clean(name);
    if (!n) return;
    persist([...guests, make(n, new Set(guests.map((g) => g.slug)))]);
    setName(""); setAdding(null);
  };
  const addBulk = () => {
    const names = bulk.split("\n").map((s) => s.trim()).filter(Boolean);
    if (!names.length) return;
    const taken = new Set(guests.map((g) => g.slug));
    persist([...guests, ...names.map((n) => make(n, taken))]);
    setBulk(""); setAdding(null);
  };
  // Tên khách do người dùng nhập: chặn công thức Excel/Sheets (=, +, -, @) khi xuất CSV.
  const csvSafe = (v: string) => {
    const t = v.replace(/"/g, '""');
    return /^[=+\-@\t\r]/.test(t) ? `'${t}` : t;
  };
  const exportCsv = () => {
    const rows = ["Tên,Link", ...guests.map((g) => `"${csvSafe(g.name)}",${guestUrl(card.id, g)}`)];
    const url = URL.createObjectURL(new Blob(["﻿" + rows.join("\n")], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = "khach-moi.csv"; a.click();
    URL.revokeObjectURL(url);
    setTools(false);
  };
  const clearAll = () => { persist([]); setTools(false); };

  const shown = guests
    .filter((g) => g.name.toLowerCase().includes(q.trim().toLowerCase()))
    .filter((g) => filter === "all" || (filter === "seen" ? g.views > 0 : g.views === 0));
  const published = card.status === "published";
  const tpl = templateById(card.tplId);

  const viewed = guests.filter((g) => g.views > 0).length;

  return (
    <main className="page gst-page">
      <div className="gst-card-bar" style={tpl ? { backgroundImage: `linear-gradient(90deg, #000 45%, rgba(0,0,0,.2)), url(${TPL_CDN + tpl.img})` } : undefined}>
        <div className="gst-card-name">{card.name}<span className={"gst-dot" + (published ? " on" : "")} /></div>
        <button type="button" className="gst-edit" onClick={() => navigate(`/edit/${card.id}`)}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
          Chỉnh sửa
        </button>
      </div>

      <nav className="gst-tabs" role="tablist">
        {TABS.map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>
        ))}
      </nav>

      <div className="gst-body">
        {tab === "list" && (
          <>
            {!published && (
              <div className="gst-warn">
                <span className="gst-warn-ic">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                </span>
                <div>
                  <b>Thiệp chưa xuất bản</b>
                  <p>Xuất bản thiệp để chia sẻ link cá nhân cho khách. <Link href={`/edit/${card.id}`}>Xuất bản ngay</Link></p>
                </div>
              </div>
            )}
            <p className="gst-hint">Tạo thiệp mời với tên và link riêng cho từng khách</p>

            <div className="gst-toolbar">
              <div className="gst-search-row">
                <label className="gst-search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                  <input placeholder="Tìm theo tên..." value={q} onChange={(e) => setQ(e.target.value)} />
                </label>
                <button type="button" className="gst-add" onClick={() => setAdding("one")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  Thêm khách
                </button>
              </div>
              <div className="gst-filter-row">
                <div className="gst-filter-wrap" ref={filterRef}>
                  <button type="button" className="gst-chip" aria-haspopup="menu" aria-expanded={filterOpen} onClick={() => setFilterOpen(!filterOpen)}>
                    {{ all: "Tất cả", seen: "Đã xem", unseen: "Chưa xem" }[filter]} {shown.length}
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                  {filterOpen && (
                    <div className="gst-menu gst-menu-left">
                      {([["all", "Tất cả"], ["seen", "Đã xem"], ["unseen", "Chưa xem"]] as const).map(([k, l]) => (
                        <button key={k} type="button" onClick={() => { setFilter(k); setFilterOpen(false); }}>{l}{filter === k ? " ✓" : ""}</button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="gst-tools-wrap" ref={toolsRef}>
                  <button type="button" className="gst-tools" onClick={() => setTools(!tools)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.6-.6-2.6Z" /></svg>
                    Công cụ
                  </button>
                  {tools && (
                    <div className="gst-menu">
                      <button type="button" onClick={() => { setAdding("bulk"); setTools(false); }}>Thêm nhiều khách cùng lúc</button>
                      <button type="button" disabled={!guests.length} onClick={exportCsv}>Xuất danh sách (CSV)</button>
                      <button type="button" className="danger" disabled={!guests.length} onClick={clearAll}>Xóa tất cả</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {guests.length === 0 ? (
              <div className="gst-empty">
                <span className="gst-empty-ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="8" r="4" /><path d="M2 21a8 8 0 0 1 16 0M19 8v6M16 11h6" /></svg>
                </span>
                <h3>Thêm khách mời đầu tiên</h3>
                <p>Mỗi khách có link riêng với tên được cá nhân hoá</p>
                <div className="gst-empty-btns">
                  <button type="button" className="gst-primary" onClick={() => setAdding("one")}>Thêm khách</button>
                  <button type="button" className="gst-ghost" onClick={() => setAdding("bulk")}>Thêm nhiều khách cùng lúc</button>
                </div>
              </div>
            ) : shown.length === 0 ? (
              <div className="gst-empty"><p>Không tìm thấy khách nào.</p></div>
            ) : (
              <ul className="gst-list">
                {shown.map((g) => (
                  <li key={g.id}>
                    <div>
                      <b>{g.name}</b>
                      <span>{guestUrl(card.id, g).replace("https://", "")}</span>
                    </div>
                    <button type="button" className="gst-copy" onClick={() => navigator.clipboard?.writeText(guestUrl(card.id, g))}>Sao chép link</button>
                    <button type="button" className="gst-del" aria-label={`Xóa ${g.name}`} onClick={() => persist(guests.filter((x) => x.id !== g.id))}>✕</button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {tab === "overview" && (
          <div className="gst-stats">
            {[["Tổng khách mời", guests.length], ["Đã xem thiệp", viewed], ["Chưa xem", guests.length - viewed]].map(([l, v]) => (
              <div key={l as string}><b>{v}</b><span>{l}</span></div>
            ))}
          </div>
        )}

        {tab === "wishes" && (
          <div className="gst-empty">
            <span className="gst-empty-ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" /></svg>
            </span>
            <h3>Chưa có lời chúc nào</h3>
            <p>Lời chúc của khách mời sẽ hiện ở đây sau khi bạn xuất bản thiệp.</p>
          </div>
        )}
      </div>

      {adding === "one" && (
        <Overlay title="Thêm khách" onClose={() => setAdding(null)}>
          <label className="gst-lbl">Tên khách mời</label>
          <input className="gst-input" autoFocus placeholder="VD: Anh Mạnh" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addOne()} />
          <div className="gst-modal-f">
            <button type="button" className="gst-ghost" onClick={() => setAdding(null)}>Hủy</button>
            <button type="button" className="gst-primary" disabled={!name.trim()} onClick={addOne}>Thêm</button>
          </div>
        </Overlay>
      )}
      {adding === "bulk" && (
        <Overlay title="Thêm nhiều khách cùng lúc" onClose={() => setAdding(null)}>
          <label className="gst-lbl">Mỗi dòng một khách</label>
          <textarea className="gst-input" rows={7} autoFocus placeholder={"Anh Mạnh\nChị Lan\nGia đình bác Hùng"} value={bulk} onChange={(e) => setBulk(e.target.value)} />
          <div className="gst-modal-f">
            <button type="button" className="gst-ghost" onClick={() => setAdding(null)}>Hủy</button>
            <button type="button" className="gst-primary" disabled={!bulk.trim()} onClick={addBulk}>Thêm</button>
          </div>
        </Overlay>
      )}
    </main>
  );
}
