import { useEffect, useState } from "react";
import { Link } from "@/app/router";
import { TEMPLATES, TPL_CDN, type Tpl } from "@/features/templates/data/templates";
import TemplateModal from "@/features/templates/components/TemplateModal";
import { LoginModal } from "@/features/auth/components/LoginModal";

const COLLECTIONS = ["Màu đỏ", "Màu xanh lá", "Màu xanh dương", "Vàng kim", "Long phụng", "Truyền thống", "Tối giản", "Hoa", "Vườn thiên nhiên", "Hoàng gia châu Âu", "Boho"];

/** Quy tắc lọc theo bộ sưu tập (suy ra từ tag của mẫu; trang thật chưa có ảnh nên đây là giả định). */
const COLLECTION_TAGS: Record<string, (tag: string) => boolean> = {
  "Màu đỏ": (t) => /^đỏ/i.test(t),
  "Màu xanh lá": (t) => t === "Xanh lá" || t === "Xanh",
  "Màu xanh dương": (t) => ["Xanh dương", "Lam", "Lam đậm", "Xanh navy"].includes(t),
  "Vàng kim": (t) => t === "Vàng kim" || t === "Vàng",
  "Long phụng": (t) => t === "Rồng phượng",
  "Truyền thống": (t) => t === "Truyền thống",
  "Tối giản": (t) => t === "Tối giản",
  "Hoa": (t) => t.startsWith("Hoa"),
  "Vườn thiên nhiên": (t) => t === "Vườn" || t === "Thiên nhiên",
  "Hoàng gia châu Âu": (t) => t === "Châu Âu" || t === "Baroque",
  "Boho": (t) => t === "Boho",
};

const FAQ: [string, string][] = [
  ["Chung Đôi có bao nhiêu mẫu thiệp cưới?", "Chung Đôi có rất nhiều mẫu thiệp cưới online với nhiều phong cách: truyền thống (Song Long, Long Phụng), thiên nhiên (Vườn Xuân), hiện đại (Thanh Diệp), lãng mạn (Anh Đào), và dễ thương (Chibi). Mỗi mẫu có nhiều phiên bản màu sắc khác nhau, và bộ sưu tập được cập nhật thường xuyên."],
  ["Làm sao để chọn mẫu thiệp phù hợp với đám cưới của mình?", "Hãy dựa vào phong cách đám cưới: chọn Song Long hoặc Long Phụng cho đám cưới truyền thống, Vườn Xuân cho tiệc sân vườn, Thanh Diệp cho phong cách hiện đại, Anh Đào cho sự lãng mạn, hoặc Chibi cho sự vui nhộn. Bạn có thể xem demo từng mẫu trước khi quyết định."],
  ["Tạo xong thiệp rồi có thể đổi sang mẫu khác không?", "Có. Bạn có thể đổi mẫu thiệp bất cứ lúc nào trong trang quản lý. Nội dung đã nhập (tên, ngày, địa điểm, ảnh) sẽ được giữ nguyên khi chuyển sang mẫu mới."],
  ["Tất cả mẫu thiệp đều được dùng thử miễn phí không?", "Đúng vậy. Mọi mẫu thiệp trên Chung Đôi đều tạo miễn phí, dùng thử 3 ngày đầy đủ tính năng. Bạn chỉ thanh toán khi thực sự hài lòng, và tất cả mẫu cùng mức giá 199.000đ."],
  ["Mẫu thiệp nào trên Chung Đôi được chọn nhiều nhất?", "Các mẫu phổ biến nhất là Song Long Đỏ (truyền thống sang trọng), Long Phụng Đỏ (rồng phượng cổ điển), và Vườn Xuân Xanh (thiên nhiên tươi mát). Tuy nhiên, mẫu phù hợp nhất là mẫu đúng phong cách đám cưới của bạn."],
  ["Chung Đôi có những phong cách thiệp cưới nào?", "Truyền thống: Song Long, Long Phụng — họa tiết rồng phượng, hoa sen, phong cách Á Đông trang trọng. Hiện đại: Thanh Diệp — thiết kế tối giản, đường nét tinh tế. Lãng mạn: Anh Đào, Vườn Xuân — hoa lá mềm mại, tông màu pastel nhẹ nhàng. Dễ thương: Chibi — phong cách hoạt hình vui nhộn. Mỗi phong cách đều có nhiều phiên bản màu sắc (đỏ, xanh, lam, hồng...)."],
  ["Mẫu thiệp cưới long phụng (rồng phượng) có ý nghĩa biểu tượng gì?", "Long là rồng (tượng trưng cho chú rể, dương, quyền uy), phụng là phượng hoàng (tượng trưng cho cô dâu, âm, vẻ đẹp). Khi đặt cạnh nhau trên thiệp cưới, long phụng biểu thị âm dương hòa hợp, vợ chồng tương xứng, là biểu tượng cổ điển nhất của đám cưới Việt."],
  ["Chung Đôi có thiệp mời cho dịp khác ngoài cưới không?", "Có. Chung Đôi đang mở rộng sang nhiều dịp khác với cùng cơ chế thiệp riêng cho từng khách, có RSVP và gallery ảnh: sinh nhật, thôi nôi & đầy tháng. Tất cả đều miễn phí dùng thử như thiệp cưới."],
];

export default function Templates() {
  const [open, setOpen] = useState<number | null>(null);
  const [selected, setSelected] = useState<Tpl | null>(null);
  const [suggest, setSuggest] = useState(false);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [coll, setColl] = useState<string | null>(null);
  const shown = coll ? TEMPLATES.filter((t) => t.tags.some(COLLECTION_TAGS[coll])) : TEMPLATES;

  useEffect(() => {
    if (!suggest) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && setSuggest(false);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [suggest]);

  return (
    <main className="tpl-page">
      <h1 className="page-title">Mẫu thiệp mời đám cưới</h1>
      <p className="page-sub tpl-sub">
        Tạo miễn phí · Thử 3 ngày · Đẹp mới thanh toán
        <br />
        <small>Bạn có thể đổi mẫu bất cứ lúc nào khi chỉnh sửa</small>
      </p>

      {coll && (
        <p className="tpl-filter-note">
          Bộ sưu tập: <b>{coll}</b> · {shown.length} mẫu
          <button type="button" onClick={() => setColl(null)}>Xóa bộ lọc</button>
        </p>
      )}
      <div className="tpl-grid" id="tpl-grid">
        {shown.length === 0 && <p className="page-sub">Chưa có mẫu nào trong bộ sưu tập này.</p>}
        {shown.map((t) => (
          <button key={t.slug} className="tpl-tile" role="article" onClick={() => setSelected(t)}>
            <div className="tpl-tile-img">
              <img loading="lazy" src={TPL_CDN + t.img} alt={t.name} />
              {t.badge && <span className={"tile-badge " + t.badge}>{t.badge === "hot" ? "Hot" : "Mới"}</span>}
            </div>
          </button>
        ))}
      </div>

      {selected && <TemplateModal tpl={selected} onClose={() => setSelected(null)} />}

      <section className="request">
        <div className="request-bulb">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff0080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
          </svg>
        </div>
        <h3 className="request-title">Chưa thấy mẫu ưng ý?</h3>
        <p className="request-desc">Hãy cho chúng mình biết bạn đang tìm gì. Chúng mình thường xuyên thiết kế mẫu thiệp mới theo yêu cầu của các cặp đôi.</p>
        <button className="btn-suggest-tpl" onClick={() => { setSuggest(true); setSent(false); }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          Gợi ý mẫu thiệp
        </button>
      </section>

      {/* Sẵn sàng tạo thiệp banner */}
      <section className="ready-card-section">
        <div className="ready-banner">
          <h3 className="ready-title">Sẵn sàng tạo thiệp?</h3>
          <p className="ready-desc">Đăng ký để tạo thiệp ngay · Dùng thử 3 ngày miễn phí</p>
          <button className="ready-btn" onClick={() => setShowLogin(true)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Đăng ký ngay
          </button>
        </div>
      </section>

      <section className="tpl-block collections-section">
        <h2 className="eyebrow-h">BỘ SƯU TẬP THIỆP CƯỚI</h2>
        <div className="chip-wrap">
          {COLLECTIONS.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={coll === c}
              className={"coll-chip" + (coll === c ? " on" : "")}
              onClick={() => {
                setColl(coll === c ? null : c);
                document.getElementById("tpl-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="tpl-block two">
        <div className="info-card"><span className="eyebrow">HƯỚNG DẪN</span><h3>Hướng dẫn tạo thiệp từng bước</h3><p>Từng bước đơn giản, ai cũng làm được</p><Link href="/vi/tao-thiep-cuoi-online" className="link-sm">Xem hướng dẫn</Link></div>
        <div className="info-card"><span className="eyebrow">BẢNG GIÁ</span><h3>Miễn phí 3 ngày</h3><p>Chỉ thanh toán khi bạn hài lòng</p><Link href="/vi/bang-gia" className="link-sm">Xem bảng giá</Link></div>
      </section>

      <section className="tpl-block faq">
        <h2 className="sec-title" style={{ fontSize: 20 }}>Câu hỏi thường gặp</h2>
        {FAQ.map(([q, a], i) => (
          <div className={"faq-item" + (open === i ? " open" : "")} key={q}>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>{q}<span>{open === i ? "−" : "+"}</span></button>
            {open === i && <p>{a}</p>}
          </div>
        ))}
      </section>

      {suggest && (
        <div className="modal-back" onMouseDown={() => setSuggest(false)}>
          <div className="modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
            <h4>Gợi ý mẫu thiệp</h4>
            {sent ? (
              <p>Cảm ơn bạn! Tụi mình đã ghi nhận gợi ý (bản demo, chưa gửi đi đâu).</p>
            ) : (
              <>
                <p className="helper" style={{ opacity: 0.6 }}>Bạn đang tìm mẫu thiệp như thế nào?</p>
                <textarea className="input textarea" autoFocus value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ví dụ: tông xanh pastel, có ảnh polaroid..." />
              </>
            )}
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setSuggest(false)}>Đóng</button>
              {!sent && <button className="btn-primary" disabled={!note.trim()} onClick={() => { setSent(true); setNote(""); }}>Gửi</button>}
            </div>
          </div>
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </main>
  );
}
