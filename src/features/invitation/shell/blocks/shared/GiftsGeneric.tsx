import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { useGiftSpec, type GiftSpec } from "./giftSpecs";
import { giftKindToMode } from "./giftDefaults";
import { AltGiftWidget, ENVELOPE_CSS, cssObj } from "./GiftWidgets";

/**
 * Khối "Hộp Quà Mừng" dùng chung cho mọi mẫu, dựng từ dữ liệu của từng mẫu (`specs/<id>/gift.json` qua giftSpecs.ts, sinh bởi
 * scripts/clone/gen_gift_sections.cjs từ docs/survey/raw/gift_<id>.json): khung, tiêu đề, nút hộp quà/phong bì mặc định
 * và cửa sổ QR. Người dùng chọn kiểu hiển thị (d.giftDisplayMode): hộp quà 3D | phong bì | hiện QR trực tiếp.
 *  - Kiểu trùng mặc định của mẫu: dùng nguyên markup đã thu.
 *  - Kiểu khác: widget chung (AltGiftWidget) với màu của mẫu; cửa sổ QR vẫn là của mẫu.
 */
const esc = (v: unknown) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Cửa sổ QR chuẩn (cấu trúc đo thật từ trang gốc) cho mẫu mà cửa sổ riêng không tách được thẻ tài khoản. */
function StandardDialog({ ctx, spec, title }: { ctx: InvitationCtx; spec: GiftSpec; title: string }) {
  const { d, giftModalOpen, setGiftModalOpen, giftTitle, saveQr } = ctx;
  const ink = spec.ink || "#333";
  return (
    <dialog className={`modal modal-bottom sm:modal-middle ${giftModalOpen ? "modal-open" : ""}`} open={giftModalOpen}>
      <div className="modal-box max-w-lg sm:max-w-xl p-0 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: spec.dlgBoxBg || "rgb(255, 255, 255)" }}>
        <div className="relative px-6 pt-6 pb-4 text-center" style={{ backgroundColor: spec.dlgHeadBg || ink }}>
          <button type="button" onClick={() => setGiftModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-white/80 hover:text-white hover:bg-white/20">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <h2 className="uppercase text-[20px]" style={{ textShadow: "rgba(0, 0, 0, 0.2) 1px 1px 2px", fontFamily: '"Times New Roman", ChungDoiIndic, serif', fontWeight: 700, letterSpacing: "0.03em", color: "white" }}>{title}</h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center" style={{ color: ink }}>
            {d.gifts.map((g) => (
              <div key={g.id} className="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none">
                <h3 className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-medium text-center line-clamp-2" style={{ color: ink }}>{giftTitle(g) + " - " + g.accountName}</h3>
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center" style={{ border: "2px solid rgba(0, 0, 0, 0.1)" }}>
                  <img alt={`QR - ${giftTitle(g)} - ${g.accountName}`} className="w-full h-full object-contain" src={g.qrUrl} />
                </div>
                <div className="mt-2 text-center space-y-0.5">
                  <p className="text-[10px]" style={{ color: ink }}>{g.bankName}</p>
                  <p className="text-[10px] font-mono" style={{ color: ink }}>{g.accountNumber}</p>
                  <p className="text-[10px] font-semibold" style={{ color: ink }}>{g.accountName}</p>
                </div>
                <button type="button" onClick={() => saveQr(g)} className="mt-1.5 text-[10px] px-2 py-1 inline-flex items-center gap-1 font-medium rounded-full transition-colors" style={{ color: ink, backgroundColor: "rgba(0, 0, 0, 0.06)" }}>Lưu QR</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={() => setGiftModalOpen(false)}><button type="button">close</button></div>
    </dialog>
  );
}

export function GiftsGeneric({ ctx }: { ctx: InvitationCtx }) {
  const { d, t, giftModalOpen, setGiftModalOpen, giftTitle, saveQr } = ctx;
  const spec = useGiftSpec(d.templateId); // tải theo nhu cầu: undefined trong lúc tải
  if (!spec || !d.giftOn || d.gifts.length === 0) return null;

  const defMode = giftKindToMode(spec.kind);
  const mode = d.giftDisplayMode || defMode;
  const title = d.giftTitle || spec.title;
  const own = mode === defMode;
  const ctx2: InvitationCtx = { ...ctx, t: { ...t, ink: spec.ink || t.ink, sub: spec.accent || (t.sub as string | undefined) || t.ink } };

  const headHtml = spec.headHtml.split("{{TITLE}}").join(esc(title));

  const onWidgetClick = (e: React.MouseEvent) => {
    if ((e.target as Element).closest('button[aria-label="Mở hộp mừng cưới"]')) setGiftModalOpen(true);
  };

  const hasOwnDialog = !!spec.dlgItem;
  const dialogHtml = hasOwnDialog
    ? (() => {
        const items = d.gifts
          .map((g) =>
            spec.dlgItem
              .split("{{LABEL}}").join(esc(giftTitle(g)))
              .split("{{NAME}}").join(esc(g.accountName))
              .split("{{BANK}}").join(esc(g.bankName))
              .split("{{NUMBER}}").join(esc(g.accountNumber))
              .split("{{QR}}").join(esc(g.qrUrl))
              .split("{{ID}}").join(esc(g.id)),
          )
          .join("");
        return (spec.dlgBefore + items + spec.dlgAfter)
          .split("{{TITLE}}").join(esc(title))
          .split("{{OPEN_CLS}}").join(giftModalOpen ? " modal-open" : "")
          .split("{{OPEN_ATTR}}").join(giftModalOpen ? " open" : "");
      })()
    : "";

  const onDialogClick = (e: React.MouseEvent) => {
    const el = e.target as Element;
    if (el.closest("[data-gift-close]")) { setGiftModalOpen(false); return; }
    const save = el.closest("[data-gift-saveqr]");
    if (save) { const g = d.gifts.find((x) => x.id === save.getAttribute("data-gift-saveqr")); if (g) saveQr(g); }
  };

  return (
    <div className={spec.rootCls} style={cssObj(spec.rootStyle)}>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: headHtml }} />
      {own ? (
        <>
          {spec.kind === "envelope" && <style>{ENVELOPE_CSS}</style>}
          <div style={{ display: "contents" }} onClick={onWidgetClick} dangerouslySetInnerHTML={{ __html: spec.widgetHtml }} />
        </>
      ) : (
        <AltGiftWidget ctx={ctx2} mode={mode} />
      )}
      {mode !== "qr_inline" &&
        (hasOwnDialog ? (
          <div style={{ display: "contents" }} onClick={onDialogClick} dangerouslySetInnerHTML={{ __html: dialogHtml }} />
        ) : (
          <StandardDialog ctx={ctx} spec={spec} title={title} />
        ))}
    </div>
  );
}
