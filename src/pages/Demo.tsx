import { useState, useMemo } from "react";
import type { Inv } from "@/types/invitation";
import { defaultInv } from "@/features/editor/data/defaultData";
import Preview from "@/features/invitation/components/Preview";
import { createDraft } from "@/services/storage/store";
import { Link, navigate } from "@/app/router";
import { TEMPLATES, Tpl, TPL_CDN, introDefaultFor, templateByIdOrSlug } from "@/features/templates/data/templates";
import { TEMPLATE_THEMES } from "@/features/invitation/config/templateThemes";
import { getTemplateManifest, getThemeBackgroundUrl } from "@/features/templates/data/themeManifest";

import { REFERENCE_COUPLES } from "@/features/templates/data/referenceCouples";
import { REFERENCE_COVERS } from "@/features/templates/data/referenceCovers";
import { assetUrl } from "@/services/asset";

/**
 * Xây dựng dữ liệu thiệp mời mẫu (Demo data) chuẩn mực cho từng mẫu thiệp.
 * Đảm bảo sử dụng đúng định danh theme, đúng ảnh của mẫu thiệp,
 * không mượn ảnh của mẫu khác, không hardcode một mẫu cho toàn bộ.
 */
function buildDemoInv(tpl: Tpl): Inv {
  const isTraditional = [
    "song_hy", "song_long", "dragon_phoenix", "song_hac", "double_phoenix",
    "double_dragon", "nhat_binh", "royal", "co_ba", "traditional", "chibi"
  ].some((k) => tpl.id.includes(k) || tpl.slug.includes(k));

  const isMinimalism = tpl.id.includes("minimalism") || tpl.slug.includes("minimalism");
  const isDarkRed = tpl.id === "minimalism_darkred";
  const isBrown = tpl.id === "minimalism_brown";

  // Phân bổ ảnh đại diện cô dâu - chú rể
  let heroPhoto = defaultInv.heroPhoto;
  if (isBrown) {
    heroPhoto = "/images/themes/minimalism-brown/couple.webp";
  } else if (isDarkRed) {
    heroPhoto = assetUrl("/images/photo-library/design/cdecf6cfe2eeb3cfd63829abde62f1066f10a364ec27d4c997c0f51012c8803e.webp");
  } else if (tpl.id === "dragon_phoenix_v2_red") {
    heroPhoto = assetUrl("/images/photo-library/design/c0c85699ec961efa2db8747663ff1a34ad9237b8f5c4bc9c18db8e5c33e16f76.webp");
  }

  // Tên cặp đôi chính xác theo từng mẫu từ website gốc
  const refCouple = REFERENCE_COUPLES[tpl.id];
  const gFull = refCouple?.groom || "Trần Thế Bảo";
  const gNick = refCouple?.groom ? refCouple.groom.split(" ").slice(-2).join(" ") : "Thế Bảo";
  const bFull = refCouple?.bride || "Lê Ngọc Ánh";
  const bNick = refCouple?.bride ? refCouple.bride.split(" ").slice(-2).join(" ") : "Ngọc Ánh";

  // Bảng màu trang phục & nhận diện theme
  const palette = TEMPLATE_THEMES[tpl.id];
  let dressColors = ["#542e08", "#9c7653", "#d6c5b3", "#ece5dd"];
  if (palette) {
    dressColors = [palette.ink, palette.bg, "#d6c5b3", "#ece5dd"];
  }

  // Dữ liệu màn hình mở thiệp chính xác theo từng mẫu
  const refCover = REFERENCE_COVERS[tpl.id];
  const coverDate = refCover?.date || "2026-11-28";
  const coverGuest = refCover?.envelopeGuestBadge || refCover?.envelopeGuest || "Thân Mời";
  const coverInviteMsg = refCover?.envelopeInviteMessage ?? "đến dự buổi tiệc chung vui cùng gia đình chúng tôi";

  return {
    ...defaultInv,
    templateId: tpl.id,
    templateName: tpl.name,
    templateThumb: TPL_CDN + tpl.img,
    heroOn: true,
    heroPhoto,
    introCustom: false,
    introText: "",
    groomFull: gFull,
    groomNick: gNick,
    brideFull: bFull,
    brideNick: bNick,
    dressColors,
    envelopeGuest: coverGuest,
    envelopeInviteMessage: coverInviteMsg,
    date: coverDate,
    time: "18:00",
    welcomeTime: "17:30",
    startTime: "18:00",
    locTitle: "TIỆC CƯỚI SẼ DIỄN RA VÀO LÚC:",
    address: "Trung tâm Hội nghị Tiệc cưới Riverside Palace, 360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh",
  };
}

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

  // 4. Xử lý khi bấm nút "Tạo thiệp theo mẫu này"
  const choose = () => {
    if (!tpl) return;
    const id = createDraft(tpl);
    navigate(`/edit/${id}?template=${tpl.id}`);
  };

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

  // 6. Render bản xem trước trực tiếp với thanh điều hướng nổi (Floating Header chỉ hiện khi thiệp đã mở)
  return (
    <div className="demo-standalone-wrap">
      {/* Floating Action Bar - Chỉ hiển thị khi thiệp đã mở hoặc khi mở với ?open=1 */}
      {isOpened && (
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
            onClick={choose}
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
      <Preview
        d={d}
        set={(p) => setD((prev) => ({ ...prev, ...p }))}
        standalone={true}
        onEnvelopeOpen={() => setIsOpened(true)}
      />
    </div>
  );
}
