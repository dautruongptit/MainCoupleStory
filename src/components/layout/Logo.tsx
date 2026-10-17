import { Link } from "@/app/router";

export function Logo() {
  return (
    <Link className="brand-logo" href="/vi" aria-label="Chung Đôi">
      <svg width="28" height="28" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="8" fill="#fc0081" />
        <g fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 7c-2.4 2.6-3.4 5.6-3.4 8.6 0 3 1.4 5.4 3.4 7.4 2-2 3.4-4.4 3.4-7.4C19.4 12.6 18.4 9.6 16 7Z" />
          <path d="M12.4 13.2C9.8 12.6 7.4 13 6 14.6c.4 3.6 3.4 6.8 7.6 8" />
          <path d="M19.6 13.2c2.6-.6 5 -.2 6.4 1.4-.4 3.6-3.4 6.8-7.6 8" />
          <path d="M10 24.4h12" />
        </g>
      </svg>
      <span>Chung Đôi</span>
    </Link>
  );
}
