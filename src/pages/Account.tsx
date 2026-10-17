import { useState } from "react";
import { loadCards } from "@/services/storage/store";

export default function Account() {
  const [name, setName] = useState("Thảo Mộc Linh- Tăng Cân Hiệu Quả");
  const [email] = useState("jk.jackkey@gmail.com");
  const [phone, setPhone] = useState("090 123 4567");
  const [mail, setMail] = useState(true);
  const [showHome, setShowHome] = useState(true);
  const [saved, setSaved] = useState(false);

  const cards = loadCards();
  const initial = (name.trim()[0] || "T").toUpperCase();

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="account-page-v2">
      <div className="account-cards-wrap">
        {/* Card 1: User Profile & Form */}
        <div className="account-card">
          <div className="account-profile-header">
            <div className="account-avatar-circle">{initial}</div>
            <div className="account-identity-info">
              <h3 className="account-display-name">{name || "Chưa đặt tên"}</h3>
              <p className="account-email-sub">{email}</p>
            </div>
            <div className="account-stats-row">
              <div className="acct-stat-col">
                <span className="stat-n num-pink">{cards.length}</span>
                <span className="stat-t">Thiệp</span>
              </div>
              <div className="acct-stat-col">
                <span className="stat-n num-blue">0</span>
                <span className="stat-t">Lượt xem</span>
              </div>
              <div className="acct-stat-col">
                <span className="stat-n num-green">0</span>
                <span className="stat-t">Lời chúc</span>
              </div>
              <div className="acct-stat-col">
                <span className="stat-n num-orange">0</span>
                <span className="stat-t">RSVP</span>
              </div>
            </div>
          </div>

          <form
            className="account-form"
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <div className="acct-field-group">
              <label className="acct-label">HỌ VÀ TÊN</label>
              <input
                type="text"
                className="acct-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ và tên"
              />
            </div>

            <div className="acct-field-group">
              <label className="acct-label">EMAIL</label>
              <input
                type="email"
                className="acct-input disabled"
                value={email}
                disabled
                readOnly
              />
            </div>

            <div className="acct-field-group">
              <label className="acct-label">SỐ ĐIỆN THOẠI</label>
              <input
                type="tel"
                className="acct-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="090 123 4567"
              />
            </div>

            <button type="submit" className="acct-submit-btn">
              {saved ? "Đã lưu thay đổi" : "Lưu thay đổi"}
            </button>
          </form>
        </div>

        {/* Card 2: TÙY CHỈNH */}
        <div className="account-card">
          <h4 className="acct-section-title">TÙY CHỈNH</h4>

          <div className="acct-toggle-row">
            <div className="acct-toggle-copy">
              <h5>Thông báo email</h5>
              <p>Thanh toán, đánh giá và tin tức</p>
            </div>
            <button
              type="button"
              className={`acct-switch-toggle ${mail ? "active" : ""}`}
              onClick={() => setMail(!mail)}
              aria-label="Bật/tắt thông báo email"
            >
              <span className="acct-toggle-thumb" />
            </button>
          </div>

          <div className="acct-toggle-row">
            <div className="acct-toggle-copy">
              <h5>Hiển thị trên trang chủ</h5>
              <p>Thiệp có thể được chọn hiển thị trên trang chủ</p>
            </div>
            <button
              type="button"
              className={`acct-switch-toggle ${showHome ? "active" : ""}`}
              onClick={() => setShowHome(!showHome)}
              aria-label="Bật/tắt hiển thị trên trang chủ"
            >
              <span className="acct-toggle-thumb" />
            </button>
          </div>
        </div>

        {/* Card 3: TÀI KHOẢN */}
        <div className="account-card">
          <h4 className="acct-section-title">TÀI KHOẢN</h4>

          <div className="acct-meta-row">
            <span className="acct-meta-label">Loại tài khoản</span>
            <span className="acct-meta-val bold">Thường</span>
          </div>

          <div className="acct-meta-row">
            <span className="acct-meta-label">Bảo mật</span>
            <span className="acct-meta-val">Magic link</span>
          </div>

          <div className="acct-meta-row">
            <span className="acct-meta-label">Thành viên từ</span>
            <span className="acct-meta-val">16 tháng 10, 2026</span>
          </div>
        </div>
      </div>
    </main>
  );
}
