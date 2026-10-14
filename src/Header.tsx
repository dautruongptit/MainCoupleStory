import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui";

export type Mode = "edit" | "preview";

export default function Header({
  mode,
  onMode,
  dirty,
  onPublish,
}: {
  mode: Mode;
  onMode: (m: Mode) => void;
  dirty: number;
  onPublish: () => void;
}) {
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dirty) return;
    setStatus("saving");
    const t = setTimeout(() => setStatus("saved"), 800);
    return () => clearTimeout(t);
  }, [dirty]);

  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setMenu(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <header className="hdr">
      <div className="hdr-in">
        <div className="hdr-left">
          <a className="icon-ghost" href="/dashboard" aria-label="Quay lại danh sách khách mời" title="Quay lại danh sách khách mời">{Icon.back()}</a>
          <button className="tpl-btn" title="Đổi mẫu thiệp mời">
            <span className="tpl-thumb" />
            <span className="tpl-name">Phượng Hoàng Đôi - Đỏ</span>
            {Icon.chevronDown(14)}
          </button>
          <div className="settings-wrap" ref={ref}>
            <button className="settings-btn" aria-label="Cài đặt" onClick={() => setMenu(!menu)}>
              {Icon.gear()}
            </button>
            {menu && (
              <div className="dropdown">
                <button><span className="dd-t"><span>Ngôn ngữ thiệp <em>ZH-HANS</em></span><small>Đổi hoặc thêm ngôn ngữ hiển thị trên thiệp.</small></span></button>
                <hr />
                <button><span className="dd-t"><span>Thành viên</span><small>Mời người khác cùng chỉnh sửa thiệp.</small></span></button>
              </div>
            )}
          </div>
        </div>

        <div className="mode-toggle" id="mode-toggle-desktop">
          <div className="mode-thumb" style={{ transform: mode === "edit" ? "translateX(0)" : "translateX(112px)" }} />
          <button className={mode === "edit" ? "active" : ""} onClick={() => onMode("edit")}>
            {Icon.pencil()} Chỉnh sửa
          </button>
          <button className={mode === "preview" ? "active" : ""} onClick={() => onMode("preview")}>
            {Icon.eye()} Xem trước
          </button>
        </div>

        <div className="hdr-right">
          <span className="save-slot" title={status === "saved" ? "Đã lưu" : status === "saving" ? "Đang lưu" : ""}>
            {status === "saving" && <i className="spinner" />}
            {status === "saved" && Icon.check(16)}
          </span>
          <button className="btn-primary" onClick={onPublish}>Xuất bản</button>
        </div>
      </div>
    </header>
  );
}
