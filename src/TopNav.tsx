import { useEffect, useRef, useState } from "react";
import { Link, navigate, usePath } from "./router";

const LINKS = [
  { href: "/vi/mau-thiep", label: "Mẫu Thiệp" },
  { href: "/dashboard", label: "Thiệp Của Tôi" },
  { href: "/guests", label: "Khách Mời" },
];

export function Logo() {
  return (
    <Link className="brand-logo" href="/vi" aria-label="Chung Đôi">
      <svg width="28" height="28" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#fc0081" /><path d="M16 8c2 3 5 4 8 4-1 5-4 9-8 12-4-3-7-7-8-12 3 0 6-1 8-4Z" fill="#fff" /></svg>
      <span>Chung Đôi</span>
    </Link>
  );
}

export default function TopNav() {
  const path = usePath();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <nav className="topnav">
      <Logo />
      <div className="topnav-links">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={path === l.href ? "active" : ""}>{l.label}</Link>
        ))}
      </div>
      <div className="topnav-right" ref={ref}>
        <button className="icon-ghost" aria-label="Chế độ giao diện">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        </button>
        <button className="avatar" aria-label="Tài khoản" aria-expanded={open} onClick={() => setOpen(!open)}>T</button>
        {open && (
          <div className="user-menu" role="menu">
            <Link href="/account" role="menuitem">Tài khoản</Link>
            <Link href="/vi/bang-gia" role="menuitem">Bảng giá</Link>
            <Link href="/vi/blog" role="menuitem">Blog</Link>
            <button role="menuitem">Ngôn ngữ <em>Tiếng Việt</em></button>
            <hr />
            <button role="menuitem" onClick={() => navigate("/vi")}>Đăng xuất</button>
          </div>
        )}
      </div>
    </nav>
  );
}
