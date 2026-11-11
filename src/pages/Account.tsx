import { useState, useEffect } from "react";
import { loadCards } from "@/services/storage/store";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Account() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.fullName || "Người dùng Chung Đôi");
  const [email, setEmail] = useState(user?.email || "user@couple.vn");
  const [phone, setPhone] = useState("090 123 4567");
  const [mail, setMail] = useState(true);
  const [showHome, setShowHome] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.fullName) setName(user.fullName);
      if (user.email) setEmail(user.email);
    }
  }, [user]);

  const cards = loadCards();
  const initial = (name.trim()[0] || "U").toUpperCase();

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
                className="acct-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="acct-field-group">
              <label className="acct-label">EMAIL</label>
              <input
                className="acct-input disabled-bg"
                type="email"
                value={email}
                disabled
              />
              <span className="acct-help-text">Email không thể thay đổi sau khi đăng ký</span>
            </div>

            <div className="acct-field-group">
              <label className="acct-label">SỐ ĐIỆN THOẠI</label>
              <input
                className="acct-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="acct-checkbox-group">
              <label className="acct-checkbox-row">
                <input
                  type="checkbox"
                  checked={mail}
                  onChange={(e) => setMail(e.target.checked)}
                />
                <span className="acct-checkbox-label">
                  Nhận email thông báo khi có khách gửi lời chúc hoặc xác nhận tham dự
                </span>
              </label>

              <label className="acct-checkbox-row">
                <input
                  type="checkbox"
                  checked={showHome}
                  onChange={(e) => setShowHome(e.target.checked)}
                />
                <span className="acct-checkbox-label">
                  Cho phép hiển thị thiệp trên trang chủ / thư viện mẫu (chế độ công khai)
                </span>
              </label>
            </div>

            <div className="acct-actions-row">
              <button type="submit" className="acct-btn-primary">
                {saved ? "✓ Đã lưu thay đổi" : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
