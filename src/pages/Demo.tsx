import { useEffect, useState, useMemo } from "react";
import type { Inv } from "@/types/invitation";
import { defaultInv } from "@/features/editor/data/defaultData";
import InvitationView from "@/features/invitation/view/InvitationView";
import { useChooseTemplate } from "@/features/templates/components/DraftPrompt";
import { Link } from "@/app/router";
import { templateByIdOrSlug } from "@/features/templates/data/templates";
import { buildDemoInv } from "@/features/invitation/demo/buildDemoInv";


/**
 * Trang xem Demo thiệp cưới độc lập:
 * - Đường dẫn chuẩn: /vi/mau-thiep/<slug>/demo
 * - Đường dẫn trực tiếp / rút gọn: /demo/<slug> hoặc /demo?template=<id>
 * - Hỗ trợ cả slug (dạng url thân thiện) và id (mã kỹ thuật).
 */
export default function Demo({ slug }: { slug: string }) {
  // 1. Xác định chính xác template được chọn (hỗ trợ slug, id, và hyphenated id)
  const tpl = useMemo(() => templateByIdOrSlug(slug), [slug]);

  // 2. Trạng thái dữ liệu thiệp demo tương ứng với template
  const [d, setD] = useState<Inv>(() => (tpl ? buildDemoInv(tpl) : defaultInv));

  // 3. Trạng thái đã mở thiệp hay chưa (ẩn thanh nổi trên màn hình bì thư)
  const [isOpened, setIsOpened] = useState(() => {
    return typeof location !== "undefined" && new URLSearchParams(location.search).get("open") === "1";
  });

  // Như trang gốc: thiệp đã mở tự cuộn xuống (~50px/giây) cho tới khi khách tự thao tác (?autoscroll=0 để tắt)
  useEffect(() => {
    if (!isOpened || new URLSearchParams(location.search).get("autoscroll") === "0") return;
    let raf = 0;
    let last = 0;
    let acc = 0;
    const stop = () => cancelAnimationFrame(raf);
    const tick = (t: number) => {
      if (last) {
        acc += ((t - last) * 50) / 1000;
        const px = Math.floor(acc);
        if (px) { window.scrollBy(0, px); acc -= px; }
      }
      last = t;
      if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 2) raf = requestAnimationFrame(tick);
    };
    const events = ["wheel", "touchstart", "mousedown", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, stop, { passive: true, once: true }));
    raf = requestAnimationFrame(tick);
    return () => { stop(); events.forEach((e) => window.removeEventListener(e, stop)); };
  }, [isOpened]);

  // 4. Xử lý khi bấm nút "Tạo thiệp theo mẫu này"
  const { choose, prompt } = useChooseTemplate();

  // 5. Nếu không tìm thấy template: hiển thị trang Not Found chuẩn UI, không crash, không fallback âm thầm
  if (!tpl) {
    return (
      <div className="page narrow text-center" style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
        <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444", marginBottom: "20px" }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h1 className="page-title" style={{ fontSize: "26px", fontWeight: 700, marginBottom: "8px" }}>
          Không tìm thấy mẫu thiệp
        </h1>
        <p className="page-sub" style={{ maxWidth: "460px", marginBottom: "28px", color: "rgba(var(--fgrgb), 0.7)", lineHeight: "1.6" }}>
          Mẫu thiệp với mã định danh <code style={{ background: "rgba(var(--fgrgb), 0.08)", padding: "2px 8px", borderRadius: "6px" }}>"{slug}"</code> không tồn tại trong hệ thống hoặc đường dẫn không hợp lệ.
        </p>
        <Link href="/vi/mau-thiep" className="btn-pill" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "0 28px", height: "46px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Xem tất cả 75 mẫu thiệp</span>
        </Link>
      </div>
    );
  }

  // 6. Render bản xem trước trực tiếp chuẩn 100% như website gốc chungdoi.com
  // Mặc định giao diện demo hoàn toàn thuần khiết (không có thanh floating navigation đè lên thiệp).
  // Nếu có tham số ?actions=1, mới hiển thị thanh công cụ tiện ích.
  const showActions = typeof location !== "undefined" && new URLSearchParams(location.search).get("actions") === "1";

  return (
    <div className="demo-standalone-wrap">
      {/* Floating Action Bar - Chỉ hiển thị khi có tham số ?actions=1 */}
      {showActions && (
        <div className="demo-floating-header" style={{ position: "fixed", bottom: "24px", right: "20px", zIndex: 100, display: "flex", alignItems: "center", gap: "10px" }}>
          <Link
            href="/vi/mau-thiep"
            className="demo-float-btn back"
            title="Quay lại kho mẫu"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Kho mẫu</span>
          </Link>
          <button
            type="button"
            className="demo-float-btn choose"
            onClick={() => tpl && choose(tpl)}
            title="Tạo thiệp theo mẫu này"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Tạo thiệp</span>
          </button>
        </div>
      )}

      {/* Invitation Preview Component */}
      {prompt}
      <InvitationView
        d={d}
        set={(p) => setD((prev) => ({ ...prev, ...p }))}
        standalone={true}
        onEnvelopeOpen={() => setIsOpened(true)}
      />
    </div>
  );
}
