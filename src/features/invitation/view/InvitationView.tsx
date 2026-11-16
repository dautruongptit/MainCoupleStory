import { useState } from "react";
import { TEMPLATE_THEMES } from "@/features/invitation/config/templateThemes";
import { getCoverComponent } from "@/features/invitation/components/covers";
import { InvitationShell } from "@/features/invitation/shell/InvitationShell";
import { getTemplateSpec } from "@/features/invitation/shell/specs";
import type { Inv } from "@/types/invitation";

/**
 * Cửa vào DUY NHẤT để hiển thị một thiệp: bìa (phong bì) → bấm mở → thiệp dựng bằng khuôn chung `InvitationShell`.
 * Thay cho `Preview.tsx` cũ (đường vẽ cũ đã bỏ vì mọi mẫu đều có spec trong `shell/specs`).
 * Nhạc, RSVP, lightbox, hộp quà do khuôn và các khối đảm nhiệm (`useInvitationCtx`).
 */

/** Tên khách từ liên kết riêng (?guest=Tên); chỉ áp dụng khi xem thiệp độc lập, không ảnh hưởng editor. */
function guestFromUrl(standalone: boolean): string {
  if (!standalone || typeof location === "undefined") return "";
  return (new URLSearchParams(location.search).get("guest") || "").trim().slice(0, 60);
}

/**
 * Lớp bọc ngoài giữ nguyên như bản cũ vì CSS cũ (`src/styles/styles.css`: `.theme-*`, `.palette-plain`) còn tác động vào
 * một số khối. Mẫu trong danh sách này không có lớp `palette-plain` khi bảng màu thiên đỏ (hoặc không có bảng màu).
 * Dọn ở bước B6 của docs/playbook/refactor-plan.md, sau khi xác minh bằng scripts/check/dump-all.mjs.
 */
const NO_PLAIN_CANDIDATES = new Set([
  "minimalism_brown", "song_hy_green", "dragon_phoenix_v2_red", "marble_yellow", "glass_garden_light_green", "jasmine_green",
  "santorini_blue", "folk_floral_blue", "qasr_blue", "mahal_gold", "floral_fiesta_yellow", "nomad_brown", "saraya_gold",
  "qasr_gold", "qasr_green", "mandap_darkred", "brocade_flower_red", "calla_lily_white", "mandap_yellow", "mahal_pink",
]);

function wrapperClass(d: Inv, standalone: boolean): string {
  const palette = TEMPLATE_THEMES[d.templateId];
  const red = palette ? (() => { const [r, g, b] = palette.rgb.split(",").map(Number); return r > g * 1.5 && r > b * 1.5; })() : true;
  const plain = !(red && NO_PLAIN_CANDIDATES.has(d.templateId));
  const isSongHy = (d.templateId || "").includes("song_hy") || (d.templateName || "").includes("Song Hỷ");
  const theme =
    d.templateId === "minimalism_darkred" ? "theme-minimalism-darkred"
    : d.templateId === "minimalism_brown" ? "theme-minimalism"
    : isSongHy ? "theme-songhy"
    : d.templateId === "dragon_phoenix_v2_red" ? "theme-longphung-v2"
    : "theme-songphung";
  return `pv-wrapper ${plain ? "palette-plain" : ""} ${standalone ? "is-standalone" : ""} ${theme}`;
}

export default function InvitationView({
  d: dProp,
  set,
  standalone = false,
  initialOpen,
  onEnvelopeOpen,
}: {
  d: Inv;
  set: (p: Partial<Inv>) => void;
  /** true: trang thiệp độc lập (demo / liên kết công khai); false: xem trước trong editor */
  standalone?: boolean;
  initialOpen?: boolean;
  onEnvelopeOpen?: () => void;
}) {
  const urlGuest = guestFromUrl(standalone);
  const d = urlGuest ? { ...dProp, envelopeGuest: urlGuest } : dProp;
  const [isOpen, setIsOpen] = useState(() => {
    if (initialOpen !== undefined) return initialOpen;
    if (standalone) return typeof location !== "undefined" && new URLSearchParams(location.search).get("open") === "1";
    return true; // xem trước trong editor: mở sẵn, không qua màn phong bì
  });

  const spec = getTemplateSpec(d.templateId);
  const palette = TEMPLATE_THEMES[d.templateId];
  const paletteVars = palette
    ? ({ "--inv-bg": palette.bg, "--inv-ink": palette.ink, "--inv-rgb": palette.rgb, "--inv-cover": palette.cover } as React.CSSProperties)
    : undefined;

  const handleOpen = () => {
    setIsOpen(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" });
    onEnvelopeOpen?.();
  };

  const Cover = getCoverComponent(d.templateId);
  return (
    <div style={paletteVars} className={wrapperClass(d, standalone)}>
      {!isOpen && <Cover d={d} onOpen={handleOpen} />}
      {/* Thiệp được dựng sẵn phía sau bìa (ẩn) như trang gốc: lúc bìa biến mất thiệp hiện ngay, không khựng để dựng */}
      {spec ? (
        <div style={isOpen ? { width: "100%" } : { width: "100%", visibility: "hidden", height: "100vh", overflow: "hidden" }}>
          <InvitationShell d={d} set={set} spec={spec} standalone={standalone} active={isOpen} />
        </div>
      ) : (
        isOpen && <p style={{ padding: 40, textAlign: "center" }}>Mẫu thiệp “{d.templateName || d.templateId}” chưa được hỗ trợ.</p>
      )}
    </div>
  );
}
