import { useState } from "react";
import { Link } from "../router";
import { Toggle } from "../ui";
import { loadCards } from "../store";

export default function Account() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState(true);
  const [showHome, setShowHome] = useState(true);
  const [saved, setSaved] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  const cards = loadCards();
  const initial = (name.trim()[0] || "T").toUpperCase();

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <main className="page acct">
      <div className="acct-head">
        <h1 className="page-title left">Cài đặt</h1>
        <Link href="/dashboard" className="back-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          Quay lại
        </Link>
      </div>

      <section className="panel">
        <div className="profile">
          <div className="avatar lg">{initial}</div>
          <div className="who">
            <b>{name || "Tên của bạn"}</b>
            <small>email@example.com</small>
          </div>
          <div className="stats4">
            <div><b className="c1">{cards.length}</b><small>Thiệp</small></div>
            <div><b className="c2">0</b><small>Lượt xem</small></div>
            <div><b className="c3">0</b><small>Lời chúc</small></div>
            <div><b className="c4">0</b><small>RSVP</small></div>
          </div>
        </div>
        <label className="fld"><span>HỌ VÀ TÊN</span><input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Họ và tên" /></label>
        <label className="fld"><span>EMAIL</span><input className="input" value="email@example.com" disabled readOnly /></label>
        <label className="fld"><span>SỐ ĐIỆN THOẠI</span><input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="090 123 4567" /></label>
        <button className="btn-primary" onClick={save}>
          {saved ? (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg> Đã lưu</>
          ) : "Lưu thay đổi"}
        </button>
      </section>

      <section className="panel">
        <h3 className="panel-h">TÙY CHỈNH</h3>
        <div className="pref">
          <div><b>Thông báo email</b><small>Thanh toán, đánh giá và tin tức</small></div>
          <Toggle on={mail} onChange={setMail} />
        </div>
        <div className="pref">
          <div><b>Hiển thị trên trang chủ</b><small>Thiệp có thể được chọn hiển thị trên trang chủ</small></div>
          <Toggle on={showHome} onChange={setShowHome} />
        </div>
      </section>

      <section className="panel">
        <h3 className="panel-h">TÀI KHOẢN</h3>
        <dl className="kv">
          <div><dt>Loại tài khoản</dt><dd><span className="acct-badge">Thường</span></dd></div>
          <div><dt>Bảo mật</dt><dd>Magic link</dd></div>
          <div><dt>Thành viên từ</dt><dd>14 tháng 10, 2026</dd></div>
        </dl>
        <div className="danger">
          <div>
            <b>Xóa tài khoản</b>
            <small>Xóa vĩnh viễn tài khoản và toàn bộ dữ liệu. Không thể khôi phục.</small>
          </div>
          {confirmDel ? (
            <span className="btn-row">
              <button className="btn-outline-sm" onClick={() => setConfirmDel(false)}>Hủy</button>
              <button className="btn-danger" onClick={() => setConfirmDel(false)}>Xác nhận xóa</button>
            </span>
          ) : (
            <button className="btn-danger" onClick={() => setConfirmDel(true)}>Xóa tài khoản</button>
          )}
        </div>
      </section>
    </main>
  );
}
