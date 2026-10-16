import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui";
import { TEMPLATES, TPL_CDN, Tpl } from "./templates";

export type Mode = "edit" | "preview";

export default function Header({
  mode,
  onMode,
  dirty,
  onPublish,
  templateId = "double_phoenix_red",
  templateName = "Song Phụng - Đỏ",
  templateThumb = "https://assets.chungdoi.com/template-previews/vi/landscape/double_phoenix_red.d0f325f5.webp",
  onSelectTemplate,
}: {
  mode: Mode;
  onMode: (m: Mode) => void;
  dirty: number;
  onPublish: () => void;
  templateId?: string;
  templateName?: string;
  templateThumb?: string;
  onSelectTemplate?: (tpl: Tpl) => void;
}) {
  const [menu, setMenu] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("saved");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dirty) return;
    setStatus("saving");
    const t = setTimeout(() => setStatus("saved"), 600);
    return () => clearTimeout(t);
  }, [dirty]);

  useEffect(() => {
    const h = (e: MouseEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && setMenu(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <>
      <header className="hdr">
        <div className="hdr-in">
          {/* Left section */}
          <div className="hdr-left">
            <a
              className="icon-ghost"
              href="/dashboard"
              aria-label="Quay lại danh sách thiệp"
              title="Quay lại danh sách thiệp"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </a>

            {/* Template Selector Button */}
            <button
              className="tpl-btn"
              title="Đổi mẫu thiệp mời"
              onClick={() => setTemplateModal(true)}
            >
              <img src={templateThumb} alt={templateName} className="tpl-thumb-img" />
              <div className="tpl-thumb-overlay" />
              <span className="tpl-name">{templateName}</span>
              <svg
                className="w-3.5 h-3.5 opacity-80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Settings Gear Dropdown */}
            <div className="settings-wrap" ref={ref}>
              <button
                className="settings-btn"
                aria-label="Cài đặt"
                title="Cài đặt nâng cao"
                onClick={() => setMenu(!menu)}
              >
                {Icon.gear()}
              </button>
              {menu && (
                <div className="dropdown">
                  <button onClick={() => setMenu(false)}>
                    <span className="dd-t">
                      <span>
                        Ngôn ngữ thiệp <em>VI (Tiếng Việt)</em>
                      </span>
                      <small>Đổi hoặc thêm ngôn ngữ hiển thị trên thiệp.</small>
                    </span>
                  </button>
                  <hr />
                  <button onClick={() => setMenu(false)}>
                    <span className="dd-t">
                      <span>Thành viên</span>
                      <small>Mời gia đình hoặc người thân cùng chỉnh sửa thiệp.</small>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Center Mode Switcher */}
          <div className="mode-toggle" id="mode-toggle-desktop">
            <div
              className="mode-thumb"
              style={{
                transform: mode === "edit" ? "translateX(0)" : "translateX(116px)",
              }}
            />
            <button
              className={mode === "edit" ? "active" : ""}
              onClick={() => onMode("edit")}
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>Chỉnh sửa</span>
            </button>
            <button
              className={mode === "preview" ? "active" : ""}
              onClick={() => onMode("preview")}
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>Xem trước</span>
            </button>
          </div>

          {/* Right section */}
          <div className="hdr-right">
            <span
              className="save-slot"
              title={
                status === "saved"
                  ? "Đã lưu tự động"
                  : status === "saving"
                  ? "Đang lưu thay đổi..."
                  : ""
              }
            >
              {status === "saving" && <i className="spinner" />}
              {status === "saved" && (
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
            <button className="btn-primary" onClick={onPublish}>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span>Xuất bản</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full 7-column Template Selector Modal (matches media_1792164790175_cb0f3aef.png) */}
      {templateModal && (
        <div className="modal-back" onClick={() => setTemplateModal(false)}>
          <div className="tpl-grid-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tpl-modal-header">
              <div className="tpl-modal-titles">
                <h3>Đổi mẫu thiệp</h3>
                <p>Nội dung thiệp sẽ được giữ nguyên, chỉ thay đổi giao diện</p>
              </div>
              <button
                type="button"
                className="tpl-modal-close"
                onClick={() => setTemplateModal(false)}
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>
            <div className="tpl-grid-content">
              <div className="tpl-grid">
                {TEMPLATES.map((t) => {
                  const isSelected = t.id === templateId || t.name === templateName;
                  return (
                    <div
                      key={t.id}
                      className={`tpl-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        onSelectTemplate?.(t);
                        setTemplateModal(false);
                      }}
                    >
                      <img src={TPL_CDN + t.img} alt={t.name} loading="lazy" />
                      {isSelected && (
                        <div className="tpl-card-check">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      <div className="tpl-card-name">{t.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
