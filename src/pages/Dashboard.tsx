import { useState } from "react";
import { Link, navigate } from "../router";

type Card = { id: string; name: string; template: string; color: string; status: "draft" | "published"; created: string };

const SEED: Card[] = [
  { id: "2b82a57b-0765-4c50-a0c6-89964bc051a4", name: "Thiệp 1", template: "Song Phụng", color: "Đỏ", status: "draft", created: "14/10/2026" },
];

export default function Dashboard() {
  const [cards, setCards] = useState<Card[]>(SEED);
  const [tab, setTab] = useState<"all" | "published" | "draft">("all");
  const [editing, setEditing] = useState<string | null>(null);

  const shown = cards.filter((c) => tab === "all" || c.status === tab);
  const count = (s: Card["status"]) => cards.filter((c) => c.status === s).length;
  const rename = (id: string, name: string) => setCards((cs) => cs.map((c) => (c.id === id ? { ...c, name } : c)));
  const publish = (id: string) => setCards((cs) => cs.map((c) => (c.id === id ? { ...c, status: "published" } : c)));
  const remove = (id: string) => setCards((cs) => cs.filter((c) => c.id !== id));

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
        <div className="tabs">
          {tabs.map(([k, l]) => (
            <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>

        {shown.length === 0 && (
          <div className="empty-state">
            <p>Chưa có thiệp nào.</p>
            <Link href="/vi/mau-thiep" className="btn-pill">Tạo thiệp mới</Link>
          </div>
        )}

        <div className="card-grid">
          {shown.map((c) => (
            <article className="inv-card" key={c.id}>
              <div className="inv-top">
                <div className="inv-name">
                  {editing === c.id ? (
                    <input className="input" autoFocus value={c.name} onChange={(e) => rename(c.id, e.target.value)}
                      onBlur={() => setEditing(null)} onKeyDown={(e) => e.key === "Enter" && setEditing(null)} />
                  ) : (
                    <>
                      <b>{c.name}</b>
                      <button aria-label="Đổi tên thiệp" onClick={() => setEditing(c.id)}>✎</button>
                    </>
                  )}
                </div>
                <Link href={`/edit/${c.id}`} className="edit-link">Chỉnh sửa thiệp ›</Link>
              </div>
              <span className={"status " + c.status}>{c.status === "draft" ? "Bản nháp" : "Đã xuất bản"}</span>
              <p className="tpl-line">{c.template} - <span>{c.color}</span></p>
              <p className="date-line">Ngày tạo: {c.created}</p>
              <div className="inv-actions">
                <button className="pub" disabled={c.status === "published"} onClick={() => publish(c.id)}>
                  {c.status === "published" ? "Đã xuất bản" : "Xuất bản"}
                </button>
                <button className="del" onClick={() => remove(c.id)}>Xóa</button>
              </div>
            </article>
          ))}
        </div>
        <button className="link-sm" style={{ marginTop: 24 }} onClick={() => navigate("/vi/mau-thiep")}>+ Tạo thiệp mới</button>
      </div>
    </main>
  );
}
