import { useEffect, useRef, useState } from "react";
import { Link, navigate, usePath } from "./router";

const LOGGED_IN_LINKS = [
  { href: "/vi/mau-thiep", label: "Mẫu Thiệp" },
  { href: "/dashboard", label: "Thiệp Của Tôi" },
  { href: "/guests", label: "Khách Mời" },
];

const LOGGED_OUT_LINKS = [
  { href: "/vi/mau-thiep", label: "Mẫu Thiệp" },
  { href: "/dashboard", label: "Thiệp Của Tôi" },
];

export function Logo() {
  return (
    <Link className="brand-logo" href="/vi" aria-label="Chung Đôi">
      <svg width="28" height="28" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#fc0081" /><path d="M16 7c-2 2-3 5-3 8 0 4 2 7 3 9 1-2 3-5 3-9 0-3-1-6-3-8Z" fill="#fff" opacity=".9" /><path d="M16 10c-3 1-6 3-7 6 1 3 4 5 7 7 3-2 6-4 7-7-1-3-4-5-7-6Z" fill="#fff" /></svg>
      <span>Chung Đôi</span>
    </Link>
  );
}

function ThemeBtn() {
  return (
    <button className="icon-ghost" aria-label="Chế độ giao diện">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" /></svg>
    </button>
  );
}

export function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      alert(`Mã xác thực OTP đã được gửi tới ${email}!`);
      setLoading(false);
      onClose();
    }, 600);
  };

  return (
    <div className="login-back" onMouseDown={onClose}>
      <div className="login-modal-box" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <button className="login-modal-close" aria-label="Đóng" onClick={onClose}>✕</button>

        <div className="login-logo-circle">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#fff"
            />
          </svg>
        </div>

        <h2 className="login-modal-title">Chào mừng bạn</h2>

        <div className="login-social-group">
          <button
            type="button"
            className="login-social-btn google"
            onClick={() => { onClose(); navigate("/dashboard"); }}
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
            onClick={() => { onClose(); navigate("/dashboard"); }}
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

        <form className="login-email-form" onSubmit={handleSubmit}>
          <label className="login-field-label">Email</label>
          <input
            type="email"
            className="input login-email-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "Đang gửi..." : "Tiếp tục"}
          </button>
          <p className="login-email-help">Mã xác thực sẽ được gửi qua email</p>
        </form>

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

const AUTH_KEY = "chungdoi.logged_in";
let _loggedIn = typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "true";

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(_loggedIn);

  useEffect(() => {
    const handleAuth = () => setLoggedIn(_loggedIn);
    window.addEventListener("auth_change", handleAuth);
    return () => window.removeEventListener("auth_change", handleAuth);
  }, []);

  return {
    loggedIn,
    login: () => {
      _loggedIn = true;
      try { localStorage.setItem(AUTH_KEY, "true"); } catch {}
      setLoggedIn(true);
      window.dispatchEvent(new Event("auth_change"));
    },
    logout: () => {
      _loggedIn = false;
      try { localStorage.removeItem(AUTH_KEY); } catch {}
      setLoggedIn(false);
      window.dispatchEvent(new Event("auth_change"));
    },
  };
}

export default function TopNav() {
  const path = usePath();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { loggedIn, login, logout } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  const links = loggedIn ? LOGGED_IN_LINKS : LOGGED_OUT_LINKS;

  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setMenuOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { setMenuOpen(false); setMobileOpen(false); }, [path]);

  return (
    <>
      <nav className="topnav">
        <button className="hamburger lg-hide" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
        </button>
        <Logo />
        <div className="topnav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={path.startsWith(l.href) ? "active" : ""}>{l.label}</Link>
          ))}
        </div>
        <div className="topnav-right" ref={ref}>
          <ThemeBtn />
          {loggedIn ? (
            <>
              <button className="avatar" aria-label="Tài khoản" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>T</button>
              {menuOpen && (
                <div className="user-menu" role="menu">
                  <Link href="/account" role="menuitem">Tài khoản</Link>
                  <Link href="/vi/bang-gia" role="menuitem">Bảng giá</Link>
                  <Link href="/vi/blog" role="menuitem">Blog</Link>
                  <button role="menuitem">Ngôn ngữ <em>Tiếng Việt</em></button>
                  <hr />
                  <button role="menuitem" onClick={() => { logout(); navigate("/vi"); }}>Đăng xuất</button>
                </div>
              )}
            </>
          ) : (
            <button className="btn-login" onClick={() => setLoginOpen(true)}>Đăng Nhập</button>
          )}
        </div>
      </nav>
      {mobileOpen && (
        <div className="mobile-menu">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={path.startsWith(l.href) ? "active" : ""}>{l.label}</Link>
          ))}
          {!loggedIn && <button className="btn-pill wide" onClick={() => { setMobileOpen(false); setLoginOpen(true); }}>Đăng Nhập</button>}
        </div>
      )}
      {loginOpen && <LoginModal onClose={() => { setLoginOpen(false); login(); }} />}
    </>
  );
}
