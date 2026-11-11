import React, { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { navigate } from "@/app/router";

export function LoginModal({ onClose }: { onClose: () => void }) {
  const { login, register, loginWithGoogle } = useAuth();
  const [tab, setTab] = useState<"gmail" | "password">("gmail");
  const [isRegister, setIsRegister] = useState(false);

  // Gmail form state
  const [gmail, setGmail] = useState("");
  const [gmailName, setGmailName] = useState("");

  // Email + password form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const finish = (to?: string) => {
    onClose();
    if (to) navigate(to);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Xử lý đăng nhập bằng Gmail / Google
  const handleGmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMail = gmail.trim().toLowerCase();
    if (!cleanMail || !cleanMail.includes("@")) {
      setError("Vui lòng nhập địa chỉ Gmail hợp lệ (VD: yourname@gmail.com)");
      return;
    }

    const fullGmail = cleanMail.endsWith("@gmail.com") ? cleanMail : `${cleanMail}@gmail.com`;

    setError("");
    setLoading(true);

    try {
      await loginWithGoogle({
        email: fullGmail,
        fullName: gmailName.trim() || undefined,
      });
      finish("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Đăng nhập bằng Gmail thất bại, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý đăng nhập bằng Email + Mật khẩu
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Email không hợp lệ");
      return;
    }
    if (!password || password.length < 6) {
      setError("Mật khẩu phải từ 6 ký tự trở lên");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        await register(cleanEmail, password, fullName.trim() || undefined);
      } else {
        await login(cleanEmail, password);
      }
      finish("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Đăng nhập thất bại, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  // Đăng nhập nhanh tài khoản mẫu
  const handleQuickDemo = async () => {
    setLoading(true);
    setError("");
    const demoEmail = "demo@couple.vn";
    const demoPass = "Password123!";
    try {
      try {
        await login(demoEmail, demoPass);
      } catch {
        await register(demoEmail, demoPass, "Chung Đôi Demo");
      }
      finish("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Không thể đăng nhập tài khoản mẫu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-back" onMouseDown={onClose}>
      <div className="login-modal-box" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <button className="login-modal-close" aria-label="Đóng" onClick={onClose}>✕</button>

        <div className="login-logo-circle">
          <svg width="50" height="50" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#fc0081" />
            <g fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 7c-2.4 2.6-3.4 5.6-3.4 8.6 0 3 1.4 5.4 3.4 7.4 2-2 3.4-4.4 3.4-7.4C19.4 12.6 18.4 9.6 16 7Z" />
              <path d="M12.4 13.2C9.8 12.6 7.4 13 6 14.6c.4 3.6 3.4 6.8 7.6 8" />
              <path d="M19.6 13.2c2.6-.6 5 -.2 6.4 1.4-.4 3.6-3.4 6.8-7.6 8" />
              <path d="M10 24.4h12" />
            </g>
          </svg>
        </div>

        <h2 className="login-modal-title">Chào mừng bạn đến với Chung Đôi</h2>
        <p style={{ textAlign: "center", color: "#64748b", fontSize: 14, marginTop: -12, marginBottom: 18 }}>
          Đăng nhập để tạo và quản lý thiệp cưới trực tuyến
        </p>

        {/* Tab selection: Gmail vs Mật khẩu */}
        <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 10, padding: 4, marginBottom: 18 }}>
          <button
            type="button"
            onClick={() => { setTab("gmail"); setError(""); }}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: tab === "gmail" ? "#fff" : "transparent",
              color: tab === "gmail" ? "#0f172a" : "#64748b",
              boxShadow: tab === "gmail" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s"
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Đăng nhập Gmail</span>
          </button>

          <button
            type="button"
            onClick={() => { setTab("password"); setError(""); }}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              background: tab === "password" ? "#fff" : "transparent",
              color: tab === "password" ? "#0f172a" : "#64748b",
              boxShadow: tab === "password" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s"
            }}
          >
            Email &amp; Mật khẩu
          </button>
        </div>

        {/* Tab 1: Đăng nhập bằng Gmail */}
        {tab === "gmail" && (
          <form className="login-email-form" onSubmit={handleGmailSubmit}>
            <label className="login-field-label">Địa chỉ Gmail</label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                className="input login-email-input"
                placeholder="VD: nguyenvana@gmail.com"
                value={gmail}
                onChange={(e) => {
                  setGmail(e.target.value);
                  setError("");
                }}
                autoFocus
                required
              />
            </div>

            <label className="login-field-label" style={{ marginTop: 12 }}>Tên hiển thị (không bắt buộc)</label>
            <input
              type="text"
              className="input login-email-input"
              placeholder="VD: Nguyễn Văn A"
              value={gmailName}
              onChange={(e) => setGmailName(e.target.value)}
            />

            {error && (
              <p className="login-email-help login-error" role="alert" style={{ color: "#e53e3e", marginTop: 8 }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading || !gmail.trim()}
              style={{
                marginTop: 18,
                background: "#fc0081",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {loading ? "Đang xác thực..." : "Tiếp tục với Gmail"}
            </button>

            <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 12 }}>
              Hệ thống sẽ tự động tạo tài khoản mới nếu Gmail chưa từng đăng ký.
            </p>
          </form>
        )}

        {/* Tab 2: Đăng nhập bằng Email & Mật khẩu */}
        {tab === "password" && (
          <form className="login-email-form" onSubmit={handlePasswordSubmit}>
            {isRegister && (
              <div style={{ marginBottom: 12 }}>
                <label className="login-field-label">Họ và tên</label>
                <input
                  type="text"
                  className="input login-email-input"
                  placeholder="Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            <label className="login-field-label">Email</label>
            <input
              type="email"
              className="input login-email-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              autoFocus
              required
              aria-invalid={!!error}
            />

            <label className="login-field-label" style={{ marginTop: 12 }}>Mật khẩu</label>
            <input
              type="password"
              className="input login-email-input"
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
              aria-invalid={!!error}
            />

            {error && (
              <p className="login-email-help login-error" role="alert" style={{ color: "#e53e3e", marginTop: 8 }}>
                {error}
              </p>
            )}

            <button type="submit" className="login-submit-btn" disabled={loading || !email.trim() || !password} style={{ marginTop: 16 }}>
              {loading ? "Đang xử lý..." : isRegister ? "Tạo tài khoản" : "Đăng nhập"}
            </button>

            <div style={{ textAlign: "center", marginTop: 16, fontSize: 14 }}>
              <span style={{ color: "#718096" }}>
                {isRegister ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                }}
                style={{ color: "#fc0081", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
              >
                {isRegister ? "Đăng nhập ngay" : "Đăng ký miễn phí"}
              </button>
            </div>
          </form>
        )}

        <div className="login-divider-row" style={{ marginTop: 20 }}>
          <span className="login-divider-line" />
          <span className="login-divider-text">hoặc</span>
          <span className="login-divider-line" />
        </div>

        <button
          type="button"
          onClick={handleQuickDemo}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 16px",
            border: "1px dashed #cbd5e1",
            borderRadius: 10,
            background: "#f8fafc",
            color: "#475569",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            marginTop: 4,
          }}
        >
          ⚡ Vào nhanh bằng tài khoản thử nghiệm (Demo)
        </button>
      </div>
    </div>
  );
}
