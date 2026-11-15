import { Link } from "@/app/router";

export function Logo() {
  return (
    <Link className="brand-logo" href="/vi" aria-label="Chung Đôi">
      <img className="object-contain" width={28} height={28} style={{ width: 28, height: 28 }} src="/images/brand/logo-icon.png" alt="Chung Đôi" />
      <span>Chung Đôi</span>
    </Link>
  );
}
