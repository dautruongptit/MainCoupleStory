import { useEffect, useRef, useState } from "react";
import { Inv } from "./data";
import { Section } from "./ui";

type P = { d: Inv; set: (p: Partial<Inv>) => void };

export function CropModal({ src, zoom0, x0, y0, onApply, onClose, title = "Điều chỉnh ảnh đầu thiệp", aspect = 0.594595 }: { title?: string; aspect?: number; src: string; zoom0: number; x0: number; y0: number; onApply: (z: number, x: number, y: number) => void; onClose: () => void }) {
  const [zoom, setZoom] = useState(zoom0);
  const [pos, setPos] = useState({ x: x0, y: y0 });
  const start = useRef<{ px: number; py: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y };
  };
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const clamp = (v: number) => Math.max(0, Math.min(100, v));
    setPos({
      x: clamp(start.current.x - ((e.clientX - start.current.px) / r.width) * 100),
      y: clamp(start.current.y - ((e.clientY - start.current.py) / r.height) * 100),
    });
  };

  return (
    <div className="modal-back" onMouseDown={onClose}>
      <div className="crop-box" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <div className="crop-head">
          <div>
            <h3>{title}</h3>
            <p>Kéo để điều chỉnh vị trí và dùng thanh trượt để phóng to/thu nhỏ</p>
          </div>
          <button type="button" className="icon-ghost" aria-label="Đóng" onClick={onClose}>✕</button>
        </div>
        <div className="crop-stage" onPointerDown={down} onPointerMove={move} onPointerUp={() => (start.current = null)}>
          <div className="crop-frame" style={{ aspectRatio: String(aspect) }}>
            <img src={src} alt="" draggable={false} style={{ objectPosition: `${pos.x}% ${pos.y}%`, transform: `scale(${zoom})`, transformOrigin: `${pos.x}% ${pos.y}%` }} />
          </div>
        </div>
        <div className="crop-zoom">
          <span>Phóng to:</span>
          <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
          <span className="val">{zoom.toFixed(1)}x</span>
        </div>
        <div className="crop-actions">
          <button type="button" className="btn-outline" onClick={onClose}>Huỷ</button>
          <button type="button" className="btn-primary" onClick={() => { onApply(zoom, pos.x, pos.y); onClose(); }}>Áp dụng</button>
        </div>
      </div>
    </div>
  );
}

export default function HeroPhoto({ d, set }: P) {
  const [crop, setCrop] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  const icon = (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  );

  const pick = (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    set({ heroPhoto: URL.createObjectURL(f), heroZoom: 1, heroX: 50, heroY: 50 });
    setCrop(true);
  };

  return (
    <Section title="Ảnh đầu thiệp" icon={icon} enabled={d.heroOn} onEnabled={(v) => set({ heroOn: v })} enabledLabel="Hiện">
      <div className="hero-ed">
        <span className="hero-lbl">Ảnh đầu thiệp</span>
        <div className="hero-thumb">
          {d.heroPhoto && (
            <img src={d.heroPhoto} alt="Ảnh đầu thiệp" style={{ objectPosition: `${d.heroX}% ${d.heroY}%`, transform: `scale(${d.heroZoom})`, transformOrigin: `${d.heroX}% ${d.heroY}%` }} />
          )}
        </div>
        <input ref={file} type="file" accept="image/*" hidden onChange={(e) => { pick(e.target.files); e.target.value = ""; }} />
        <div className="hero-btns">
          <button type="button" className="hero-btn primary" onClick={() => file.current?.click()}>Đổi ảnh</button>
          <button type="button" className="hero-btn danger" disabled={!d.heroPhoto} onClick={() => set({ heroPhoto: "" })}>Xoá</button>
        </div>
        <p className="hero-help">JPG, PNG, GIF, WebP, HEIC</p>
        <p className="hero-help2">Nên dùng ảnh dọc hoặc ảnh cặp đôi toàn thân</p>
      </div>
      {crop && d.heroPhoto && (
        <CropModal src={d.heroPhoto} zoom0={d.heroZoom} x0={d.heroX} y0={d.heroY}
          onApply={(z, x, y) => set({ heroZoom: z, heroX: x, heroY: y })} onClose={() => setCrop(false)} />
      )}
    </Section>
  );
}
