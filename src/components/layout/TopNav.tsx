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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        // Thanh điều hướng dưới (dưới 1024px): markup theo trang gốc, cô lập trong .inv-root
        <div className="inv-root">
          <nav className="fixed bottom-0 left-0 right-0 bg-base-100/95 backdrop-blur-lg border-t border-base-300/50 pb-safe z-50 lg:hidden ">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto">
              <Link
                href="/vi/mau-thiep"
                className={"flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors " + (path.startsWith("/vi/mau-thiep") ? "text-primary" : "text-base-content/40 active:text-base-content/60")}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path></svg>
                <span className={"text-[10px] " + (path.startsWith("/vi/mau-thiep") ? "font-semibold" : "font-medium")}>Mẫu Thiệp</span>
              </Link>
              <Link
                href="/dashboard"
                className={"flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors " + (path.startsWith("/dashboard") ? "text-primary" : "text-base-content/40 active:text-base-content/60")}
              >
                {path.startsWith("/dashboard") ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path></svg>
                )}
                <span className={"text-[10px] " + (path.startsWith("/dashboard") ? "font-semibold" : "font-medium")}>Thiệp của tôi</span>
              </Link>
              <Link
                href="/guests"
                className={"flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors " + (path.startsWith("/guests") ? "text-primary" : "text-base-content/40 active:text-base-content/60") + (loggedIn ? "" : " hidden")}
                aria-hidden={loggedIn ? undefined : true}
                tabIndex={loggedIn ? undefined : -1}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path></svg>
                <span className={"text-[10px] " + (path.startsWith("/guests") ? "font-semibold" : "font-medium")}>Khách mời</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </>
  );
}
