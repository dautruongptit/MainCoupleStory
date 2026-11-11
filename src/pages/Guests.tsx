import { useEffect, useMemo, useRef, useState } from "react";
import { Link, navigate } from "@/app/router";
import { loadCards, loadGuests, saveGuests, fetchGuestsFromApi, guestUrl } from "@/services/storage/store";
import { invitationApi, type RsvpItem, type WishItem } from "@/services/api/invitationApi";
import type { Guest } from "@/types/guest";
import { TPL_CDN, templateById } from "@/features/templates/data/templates";
import { LoginModal } from "@/features/auth/components/LoginModal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { uuid } from "@/utils/uuid";

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
  const [rsvps, setRsvps] = useState<RsvpItem[]>([]);
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState<"one" | "bulk" | null>(null);
  const [name, setName] = useState("");
  const [bulk, setBulk] = useState("");
  const [tools, setTools] = useState(false);
  const [filter, setFilter] = useState<"all" | "seen" | "unseen">("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Tải danh sách khách mời, RSVP và lời chúc từ Server DB
  useEffect(() => {
    if (!loggedIn || !card) return;

    fetchGuestsFromApi(card.id).then((serverGuests) => {
      if (serverGuests) setGuests(serverGuests);
    });

    invitationApi.listRsvps(card.id).then(setRsvps).catch(console.warn);
    invitationApi.listWishes(card.id).then(setWishes).catch(console.warn);
  }, [loggedIn, card]);

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
    return { id: uuid(), name: n, slug, views: 0, added: today };
  };
  const clean = (v: string) => v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, 100);

  const addOne = async () => {
    const n = clean(name);
    if (!n) return;
    const localGuest = make(n, new Set(guests.map((g) => g.slug)));
    persist([...guests, localGuest]);
    setName(""); setAdding(null);

    // Đồng bộ lên Server DB
    try {
      const serverG = await invitationApi.createGuest(card.id, n);
      if (serverG) {
        setGuests((prev) => prev.map((g) => (g.id === localGuest.id ? serverG : g)));
      }
    } catch (err) {
      console.warn("Lưu khách lên DB thất bại:", err);
    }
  };

  const addBulk = async () => {
    const names = bulk.split("\n").map((s) => s.trim()).filter(Boolean);
    if (!names.length) return;
    const taken = new Set(guests.map((g) => g.slug));
    const newItems = names.map((n) => make(n, taken));
    persist([...guests, ...newItems]);
    setBulk(""); setAdding(null);

    // Lưu từng khách lên server
    for (const n of names) {
      try {
        await invitationApi.createGuest(card.id, n);
      } catch (err) {
        console.warn("Lưu khách lên DB lỗi:", err);
      }
    }
    fetchGuestsFromApi(card.id).then(setGuests).catch(console.warn);
  };

  const removeGuest = async (g: Guest) => {
    persist(guests.filter((x) => x.id !== g.id));
    try {
      await invitationApi.deleteGuest(card.id, g.id);
    } catch (err) {
      console.warn("Xoá khách trên server thất bại:", err);
    }
  };

  const deleteWishItem = async (wishId: string) => {
    setWishes((prev) => prev.filter((w) => w.id !== wishId));
    try {
      await invitationApi.deleteWish(card.id, wishId);
    } catch (err) {
      console.warn("Xoá lời chúc thất bại:", err);
    }
  };

  const csvSafe = (v: string) => {
    const t = v.replace(/"/g, '""');
    return /^[=+\-@\t\r]/.test(t) ? `'${t}` : t;
  };
  const exportCsv = () => {
    const rows = ["Tên,Link", ...guests.map((g) => `"${csvSafe(g.name)}",${guestUrl(card.id, g)}`)];
    const url = URL.createObjectURL(new Blob(["\ufeff" + rows.join("\n")], { type: "text/csv;charset=utf-8" }));
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
  const attendingYes = rsvps.filter((r) => r.attending === "yes");
  const attendingNo = rsvps.filter((r) => r.attending === "no");
  const totalCount = attendingYes.reduce((acc, r) => acc + (r.guestCount || 1), 0);

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
            <div className="gst-act-bar">
              <button type="button" className="gst-btn gst-btn-primary" onClick={() => setAdding("one")}>+ Thêm khách</button>
              <button type="button" className="gst-btn gst-btn-sub" onClick={() => setAdding("bulk")}>Thêm hàng loạt</button>

              <div className="gst-tools-wrap" ref={toolsRef}>
                <button type="button" className="gst-btn gst-btn-sub" onClick={() => setTools(!tools)}>Công cụ ▾</button>
                {tools && (
                  <div className="gst-pop">
                    <button type="button" onClick={exportCsv}>Xuất danh sách (CSV)</button>
                    <button type="button" className="gst-pop-danger" onClick={clearAll}>Xóa tất cả khách</button>
                  </div>
                )}
              </div>

              <div className="gst-act-right">
                <input className="gst-search" placeholder="Tìm theo tên..." value={q} onChange={(e) => setQ(e.target.value)} />
                <div className="gst-filter-wrap" ref={filterRef}>
                  <button type="button" className="gst-btn gst-btn-sub" onClick={() => setFilterOpen(!filterOpen)}>
                    {filter === "all" ? "Tất cả" : filter === "seen" ? "Đã xem" : "Chưa xem"} ▾
                  </button>
                  {filterOpen && (
                    <div className="gst-pop">
                      <button type="button" onClick={() => { setFilter("all"); setFilterOpen(false); }}>Tất cả</button>
                      <button type="button" onClick={() => { setFilter("seen"); setFilterOpen(false); }}>Đã xem</button>
                      <button type="button" onClick={() => { setFilter("unseen"); setFilterOpen(false); }}>Chưa xem</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {guests.length === 0 ? (
              <div className="gst-empty">
                <h3>Chưa có khách mời nào</h3>
                <p>Thêm khách để tạo link gửi thiệp cá nhân hoá.</p>
                <div className="gst-empty-btns">
                  <button type="button" className="gst-primary" onClick={() => setAdding("one")}>Thêm khách đầu tiên</button>
                </div>
              </div>
            ) : shown.length === 0 ? (
              <div className="gst-empty"><p>Không tìm thấy khách mời nào phù hợp.</p></div>
            ) : (
              <ul className="gst-list">
                {shown.map((g) => (
                  <li key={g.id}>
                    <div>
                      <b>{g.name}</b>
                      <span>{guestUrl(card.id, g).replace("https://", "")}</span>
                    </div>
                    <button type="button" className="gst-copy" onClick={() => navigator.clipboard?.writeText(guestUrl(card.id, g))}>Sao chép link</button>
                    <button type="button" className="gst-del" aria-label={`Xóa ${g.name}`} onClick={() => removeGuest(g)}>✕</button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {tab === "overview" && (
          <div>
            <div className="gst-stats" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
              <div key="total"><b>{guests.length}</b><span>Tổng khách</span></div>
              <div key="seen"><b>{viewed}</b><span>Đã xem thiệp</span></div>
              <div key="unseen"><b>{guests.length - viewed}</b><span>Chưa xem</span></div>
              <div key="rsvp-yes"><b>{attendingYes.length}</b><span>Đồng ý đến</span></div>
              <div key="rsvp-count"><b>{totalCount}</b><span>Tổng người tham dự</span></div>
              <div key="rsvp-no"><b>{attendingNo.length}</b><span>Báo bận</span></div>
            </div>

            {rsvps.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Danh sách phản hồi tham dự (RSVP):</h4>
                <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                        <th style={{ padding: "10px 14px" }}>Khách</th>
                        <th style={{ padding: "10px 14px" }}>Số điện thoại</th>
                        <th style={{ padding: "10px 14px" }}>Tham dự?</th>
                        <th style={{ padding: "10px 14px" }}>Số người</th>
                        <th style={{ padding: "10px 14px" }}>Lời nhắn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rsvps.map((r) => (
                        <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 500 }}>{r.name}</td>
                          <td style={{ padding: "10px 14px", color: "#64748b" }}>{r.phone || "—"}</td>
                          <td style={{ padding: "10px 14px" }}>
                            <span style={{
                              padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                              background: r.attending === "yes" ? "#dcfce7" : "#fee2e2",
                              color: r.attending === "yes" ? "#166534" : "#991b1b"
                            }}>
                              {r.attending === "yes" ? "Tham dự" : "Bận"}
                            </span>
                          </td>
                          <td style={{ padding: "10px 14px" }}>{r.guestCount || 1}</td>
                          <td style={{ padding: "10px 14px", color: "#475569" }}>{r.note || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "wishes" && (
          <div>
            {wishes.length === 0 ? (
              <div className="gst-empty">
                <span className="gst-empty-ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" /></svg>
                </span>
                <h3>Chưa có lời chúc nào</h3>
                <p>Lời chúc của khách mời trên thiệp sẽ được lưu vào cơ sở dữ liệu và hiển thị ở đây.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {wishes.map((w) => (
                  <div key={w.id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <b style={{ fontSize: 15 }}>{w.name}</b>
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>{w.createdAt ? new Date(w.createdAt).toLocaleString("vi-VN") : ""}</span>
                      </div>
                      <p style={{ margin: 0, color: "#334155", fontSize: 14, lineHeight: 1.5 }}>{w.message}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteWishItem(w.id)}
                      style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: 4 }}
                      title="Xoá lời chúc"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
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
