import { useEffect, useRef, useState } from "react";
import { Link, navigate, usePath } from "./router";

const LOGGED_IN_LINKS = [
  { href: "/vi/mau-thiep", label: "Mẫu Thiệp" },
  { href: "/dashboard", label: "Thiệp Của Tôi" },
  { href: "/guests", label: "Khách Mời" },
];

const LOGGED_OUT_LINKS = [
  { href: "/vi/mau-thiep", label: "Mẫu Thiệp" },
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
    </button>
  );
}

function LoginModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"login" | "signup">("login");

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div className="login-back" onMouseDown={onClose}>
      <div className="login-modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <button className="login-close" aria-label="Đóng" onClick={onClose}>✕</button>
        <Logo />
        <div className="login-tabs">
          <button className={tab === "login" ? "on" : ""} onClick={() => setTab("login")}>Đăng nhập</button>
          <button className={tab === "signup" ? "on" : ""} onClick={() => setTab("signup")}>Đăng ký</button>
        </div>
        {tab === "login" ? (
          <form className="login-form" onSubmit={(e) => { e.preventDefault(); onClose(); navigate("/dashboard"); }}>
            <label>Email<input type="email" className="input" placeholder="email@example.com" autoFocus /></label>
            <label>Mật khẩu<input type="password" className="input" placeholder="••••••••" /></label>
            <button type="submit" className="btn-pill wide">Đăng nhập</button>
            <p className="login-alt">hoặc đăng nhập bằng</p>
            <button type="button" className="btn-social" onClick={() => { onClose(); navigate("/dashboard"); }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335" /></svg>
              Google
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={(e) => { e.preventDefault(); onClose(); navigate("/dashboard"); }}>
            <label>Họ và tên<input type="text" className="input" placeholder="Nguyễn Văn A" autoFocus /></label>
            <label>Email<input type="email" className="input" placeholder="email@example.com" /></label>
            <label>Mật khẩu<input type="password" className="input" placeholder="Tối thiểu 6 ký tự" /></label>
            <button type="submit" className="btn-pill wide">Tạo tài khoản</button>
            <p className="login-alt">hoặc đăng ký bằng</p>
            <button type="button" className="btn-social" onClick={() => { onClose(); navigate("/dashboard"); }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335" /></svg>
              Google
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

let _loggedIn = true;

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(_loggedIn);
  return {
    loggedIn,
    login: () => { _loggedIn = true; setLoggedIn(true); },
    logout: () => { _loggedIn = false; setLoggedIn(false); },
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
