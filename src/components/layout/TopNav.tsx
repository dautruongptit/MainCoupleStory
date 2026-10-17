import { useEffect, useRef, useState } from "react";
import { Link, navigate, usePath } from "@/app/router";
import { useTheme } from "@/app/theme";
import { Logo } from "@/components/layout/Logo";
import { LoginModal } from "@/features/auth/components/LoginModal";
import { useAuth } from "@/features/auth/hooks/useAuth";

export { Logo, LoginModal, useAuth };

const LOGGED_IN_LINKS = [
  { href: "/vi/mau-thiep", label: "Mẫu Thiệp" },
  { href: "/dashboard", label: "Thiệp Của Tôi" },
  { href: "/guests", label: "Khách Mời" },
];

const LOGGED_OUT_LINKS = [
  { href: "/vi/mau-thiep", label: "Mẫu Thiệp" },
  { href: "/dashboard", label: "Thiệp Của Tôi" },
];

function ThemeBtn() {
  const { theme, toggle } = useTheme();
  const light = theme === "light";
  return (
    <button
      className="icon-ghost"
      aria-label={light ? "Chuyển sang giao diện tối" : "Chuyển sang giao diện sáng"}
      title={light ? "Giao diện tối" : "Giao diện sáng"}
      onClick={toggle}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {light ? (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </>
        )}
      </svg>
    </button>
  );
}

export default function TopNav() {
  const path = usePath();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { loggedIn, logout } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  const links = loggedIn ? LOGGED_IN_LINKS : LOGGED_OUT_LINKS;

  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setMenuOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, [path]);

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
      {!path.startsWith("/edit/") && (
        <div className="mobile-bottom-nav">
          <Link
            href="/vi/mau-thiep"
            className={`mobile-bottom-nav-item ${path.startsWith("/vi/mau-thiep") ? "active" : ""}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span>Mẫu Thiệp</span>
          </Link>
        </div>
      )}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </>
  );
}
