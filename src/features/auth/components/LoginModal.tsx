import React, { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { navigate } from "@/app/router";

const OTP_LEN = 6;
const RESEND_SECONDS = 30;

/**
 * Đăng nhập mô phỏng: chưa có backend nên không gửi email thật và không kiểm tra mã.
 * Bước nhập mã (OTP) là suy luận từ dòng "Mã xác thực sẽ được gửi qua email" trong ảnh chuẩn, chưa có ảnh màn hình đó.
 * Chỉ khi hoàn tất (Google/Apple/OTP) mới đặt cờ đăng nhập; đóng modal bằng ✕ hoặc Esc thì KHÔNG đăng nhập.
 */
export function LoginModal({ onClose }: { onClose: () => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "code">("email");
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const finish = (to?: string) => {
    login();
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

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validEmail) {
      setError("Email không hợp lệ");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("code");
      setCooldown(RESEND_SECONDS);
    }, 600);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== OTP_LEN) {
      setError(`Nhập đủ ${OTP_LEN} chữ số`);
      return;
    }
    finish("/dashboard");
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

        <h2 className="login-modal-title">Chào mừng bạn</h2>

        <div className="login-social-group">
          <button
            type="button"
            className="login-social-btn google"
            onClick={() => finish("/dashboard")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Đăng nhập với Google</span>
          </button>

          <button
            type="button"
            className="login-social-btn apple"
            onClick={() => finish("/dashboard")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.04-.51 2.68-1.27z" />
            </svg>
            <span>Đăng nhập với Apple</span>
          </button>
        </div>

        <div className="login-divider-row">
          <span className="login-divider-line" />
          <span className="login-divider-text">hoặc</span>
          <span className="login-divider-line" />
        </div>

        {step === "email" ? (
          <form className="login-email-form" onSubmit={handleSubmit}>
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
              aria-invalid={!!error}
            />
            <button type="submit" className="login-submit-btn" disabled={loading || !email.trim()}>
              {loading ? "Đang gửi..." : "Tiếp tục"}
            </button>
            {error ? (
              <p className="login-email-help login-error" role="alert">{error}</p>
            ) : (
              <p className="login-email-help">Mã xác thực sẽ được gửi qua email</p>
            )}
          </form>
        ) : (
          <form className="login-email-form" onSubmit={handleVerify}>
            <label className="login-field-label">Mã xác thực</label>
            <input
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={OTP_LEN}
              className="input login-email-input"
              placeholder="000000"
              value={code}
              autoFocus
              aria-invalid={!!error}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, "").slice(0, OTP_LEN));
                setError("");
              }}
            />
            <button type="submit" className="login-submit-btn" disabled={code.length !== OTP_LEN}>
              Xác nhận
            </button>
            {error ? (
              <p className="login-email-help login-error" role="alert">{error}</p>
            ) : (
              <p className="login-email-help">
                Mã đã được gửi tới {email.trim()}. Bản demo: nhập bất kỳ {OTP_LEN} chữ số.
              </p>
            )}
            <p className="login-email-help">
              <button
                type="button"
                className="login-link-btn"
                disabled={cooldown > 0}
                onClick={() => setCooldown(RESEND_SECONDS)}
              >
                {cooldown > 0 ? `Gửi lại mã sau ${cooldown}s` : "Gửi lại mã"}
              </button>
              {" · "}
              <button
                type="button"
                className="login-link-btn"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setError("");
                }}
              >
                Đổi email
              </button>
            </p>
          </form>
        )}

        <ul className="login-perks">
          <li>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>Không cần mật khẩu</span>
          </li>
          <li>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>Đăng nhập an toàn với mã OTP</span>
          </li>
          <li>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span>Hoàn toàn miễn phí</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
