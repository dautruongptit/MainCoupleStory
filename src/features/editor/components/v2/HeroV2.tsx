import { useRef, useState } from "react";
import type { Inv } from "@/types/invitation";
import { CropModal } from "@/components/common/CropModal";
import { getCapabilities, getCoupleHero } from "@/features/invitation/shell/specs";
import { CardV2 } from "@/features/editor/components/v2/CardV2";

type P = { d: Inv; set: (p: Partial<Inv>) => void };

const imageIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);

const uploadIcon = (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);

/** Một ô ảnh đơn (dùng cho cả "Ảnh đầu thiệp" và mỗi bên của "Ảnh đôi"). */
function PhotoSlot({
  label, circle, photo, zoom, x, y, uploading, onPick, onRemove, onCrop,
}: {
  label: string; circle: boolean; photo: string; zoom: number; x: number; y: number; uploading: boolean;
  onPick: (f: File) => void; onRemove: () => void; onCrop: () => void;
}) {
  const file = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm text-base-content/70">{label}</span>
      <button
        type="button"
        onClick={() => (photo ? onCrop() : file.current?.click())}
        className={"relative overflow-hidden bg-base-200 ring ring-offset-base-100 ring-offset-2 ring-base-300 " + (circle ? "w-24 h-24 rounded-full" : "w-[120px] max-w-full rounded-lg")}
        style={circle ? undefined : { aspectRatio: "0.594595 / 1" }}
      >
        {photo ? (
          <img src={photo} alt={label} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: `${x}% ${y}%`, transform: `scale(${zoom})`, transformOrigin: `${x}% ${y}%` }} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-base-content/30">
            {uploading ? <span className="loading loading-spinner" /> : uploadIcon}
          </div>
        )}
      </button>
      <input ref={file} accept="image/*" type="file" style={{ position: "absolute", width: "0.1px", height: "0.1px", opacity: 0, overflow: "hidden", zIndex: -1 }} onChange={(e) => { const f = e.target.files?.[0]; if (f) onPick(f); e.target.value = ""; }} />
      <div className="flex gap-2">
        <button type="button" disabled={uploading} className="btn btn-sm btn-outline btn-primary" onClick={() => file.current?.click()}>{photo ? "Đổi ảnh" : "Tải lên"}</button>
        {photo && <button type="button" className="btn btn-sm btn-outline btn-error" onClick={onRemove}>Xoá</button>}
      </div>
      <p className="text-xs text-base-content/40 text-center">JPG, PNG, GIF, WebP, HEIC</p>
    </div>
  );
}

/** Thẻ "Ảnh đầu thiệp" / "Ảnh đôi" — dựng theo HTML đo từ trang gốc; mẫu nào dùng kiểu nào xem `getCoupleHero`. */
export default function HeroV2({ d, set }: P) {
  const circle = getCapabilities(d.templateId)?.hero.shape === "circle";
  const couple = getCoupleHero(d.templateId);
  const [crop, setCrop] = useState<"hero" | "groom" | "bride" | null>(null);
  const [uploading, setUploading] = useState<"hero" | "groom" | "bride" | null>(null);

  const pick = async (which: "hero" | "groom" | "bride", f: File) => {
    setUploading(which);
    await new Promise((r) => setTimeout(r, 400));
    const url = URL.createObjectURL(f);
    if (which === "hero") set({ heroPhoto: url, heroZoom: 1, heroX: 50, heroY: 50 });
    else if (which === "groom") set({ groomPhoto: url, groomPhotoZoom: 1, groomPhotoX: 50, groomPhotoY: 50 });
    else set({ bridePhoto: url, bridePhotoZoom: 1, bridePhotoX: 50, bridePhotoY: 50 });
    setUploading(null);
    setCrop(which);
  };

  return (
    <>
      <CardV2 icon={imageIcon} title={couple ? "Ảnh đôi" : "Ảnh đầu thiệp"} enabled={d.heroOn} onEnabled={(v) => set({ heroOn: v })}>
        {!d.heroOn ? (
          <div className="flex items-start gap-2.5 rounded-lg bg-base-200/50 p-3 text-sm opacity-80">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            <span>{couple ? "Ảnh chú rể và cô dâu ở đầu thiệp." : "Ảnh lớn ở đầu thiệp."} Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</span>
          </div>
        ) : couple ? (
          <div className="grid grid-cols-2 gap-4">
            <PhotoSlot label="Ảnh chú rể" circle={circle} photo={d.groomPhoto} zoom={d.groomPhotoZoom} x={d.groomPhotoX} y={d.groomPhotoY} uploading={uploading === "groom"} onPick={(f) => pick("groom", f)} onRemove={() => set({ groomPhoto: "" })} onCrop={() => setCrop("groom")} />
            <PhotoSlot label="Ảnh cô dâu" circle={circle} photo={d.bridePhoto} zoom={d.bridePhotoZoom} x={d.bridePhotoX} y={d.bridePhotoY} uploading={uploading === "bride"} onPick={(f) => pick("bride", f)} onRemove={() => set({ bridePhoto: "" })} onCrop={() => setCrop("bride")} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <PhotoSlot label="Ảnh đầu thiệp" circle={circle} photo={d.heroPhoto} zoom={d.heroZoom} x={d.heroX} y={d.heroY} uploading={uploading === "hero"} onPick={(f) => pick("hero", f)} onRemove={() => set({ heroPhoto: "" })} onCrop={() => setCrop("hero")} />
            <p className="text-xs text-base-content/50 text-center max-w-sm">Nên dùng ảnh dọc hoặc ảnh cặp đôi toàn thân</p>
          </div>
        )}
      </CardV2>
      {crop === "hero" && d.heroPhoto && (
        <CropModal aspect={circle ? 1 : undefined} round={circle} src={d.heroPhoto} zoom0={d.heroZoom} x0={d.heroX} y0={d.heroY} onApply={(z, x, y) => set({ heroZoom: z, heroX: x, heroY: y })} onClose={() => setCrop(null)} />
      )}
      {crop === "groom" && d.groomPhoto && (
        <CropModal aspect={circle ? 1 : undefined} round={circle} src={d.groomPhoto} zoom0={d.groomPhotoZoom} x0={d.groomPhotoX} y0={d.groomPhotoY} onApply={(z, x, y) => set({ groomPhotoZoom: z, groomPhotoX: x, groomPhotoY: y })} onClose={() => setCrop(null)} />
      )}
      {crop === "bride" && d.bridePhoto && (
        <CropModal aspect={circle ? 1 : undefined} round={circle} src={d.bridePhoto} zoom0={d.bridePhotoZoom} x0={d.bridePhotoX} y0={d.bridePhotoY} onApply={(z, x, y) => set({ bridePhotoZoom: z, bridePhotoX: x, bridePhotoY: y })} onClose={() => setCrop(null)} />
      )}
    </>
  );
}
