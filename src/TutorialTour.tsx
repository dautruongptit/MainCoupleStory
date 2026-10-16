import { useEffect, useState, useLayoutEffect } from "react";

interface StepConfig {
  title: string;
  desc: string;
  stepNum: number;
  total: number;
  targetSelector: string;
  arrowPos: "left" | "center" | "right";
  offset?: { x?: number; y?: number };
}

const STEPS: StepConfig[] = [
  {
    stepNum: 1,
    total: 4,
    title: "Chào mừng! Hãy bắt đầu chỉnh sửa",
    desc: "Nhấn vào bất kỳ ô nào để chỉnh sửa thông tin. Mọi thay đổi được lưu tự động!",
    targetSelector: ".sec:first-child",
    arrowPos: "left",
    offset: { x: 0, y: 12 },
  },
  {
    stepNum: 2,
    total: 4,
    title: "Chuyển đổi chế độ",
    desc: "Nhấn 'Xem trước' để xem thiệp, hoặc 'Chỉnh sửa' để tiếp tục điền thông tin.",
    targetSelector: ".mode-toggle",
    arrowPos: "center",
    offset: { x: 0, y: 12 },
  },
  {
    stepNum: 3,
    total: 4,
    title: "Đổi mẫu thiệp",
    desc: "Nhấn vào đây để chọn mẫu thiệp khác. Nội dung đã nhập sẽ được giữ nguyên!",
    targetSelector: ".tpl-btn",
    arrowPos: "left",
    offset: { x: 0, y: 12 },
  },
  {
    stepNum: 4,
    total: 4,
    title: "Chúc mừng!",
    desc: "Khi hoàn tất, nhấn nút này để xuất bản và chia sẻ thiệp với khách mời.",
    targetSelector: ".hdr-right .btn-primary",
    arrowPos: "right",
    offset: { x: 0, y: 12 },
  },
];

const STORAGE_KEY = "chungdoi_editor_tour_dismissed";

export default function TutorialTour() {
  const [step, setStep] = useState<number | null>(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      return dismissed ? null : 1;
    } catch {
      return 1;
    }
  });

  const [coords, setCoords] = useState<{ top: number; left?: number; right?: number } | null>(null);

  const closeTour = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setStep(null);
  };

  useLayoutEffect(() => {
    if (step === null) return;
    const current = STEPS[step - 1];
    if (!current) return;

    const updatePosition = () => {
      const el = document.querySelector(current.targetSelector);
      if (!el) return;

      const rect = el.getBoundingClientRect();

      if (step === 1) {
        // Step 1 sits near the bottom of the first section
        const secBottom = rect.bottom;
        setCoords({
          top: Math.min(window.innerHeight - 200, secBottom - 60),
          left: Math.max(16, rect.left),
        });
      } else if (step === 2) {
        // Step 2 sits centered directly under mode-toggle
        const tooltipWidth = 340;
        const centerX = rect.left + rect.width / 2;
        setCoords({
          top: rect.bottom + 12,
          left: Math.max(16, centerX - tooltipWidth / 2),
        });
      } else if (step === 3) {
        // Step 3 sits directly under template button
        setCoords({
          top: rect.bottom + 12,
          left: Math.max(16, rect.left),
        });
      } else if (step === 4) {
        // Step 4 sits directly under publish button, aligned to right
        const tooltipWidth = 340;
        setCoords({
          top: rect.bottom + 12,
          left: Math.max(16, rect.right - tooltipWidth),
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [step]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTour();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (step === null || !coords) return null;

  const current = STEPS[step - 1];

  return (
    <>
      <div className="tour-backdrop" onClick={closeTour} />
      <div
        className="tour-popover"
        style={{
          top: coords.top,
          left: coords.left,
        }}
      >
        <div className={`tour-arrow ${current.arrowPos}`} />

        <button className="tour-close-btn" aria-label="Đóng hướng dẫn" onClick={closeTour}>
          ✕
        </button>

        <h4 className="tour-title">{current.title}</h4>
        <p className="tour-desc">{current.desc}</p>

        <div className="tour-footer">
          <span className="tour-step-indicator">
            {current.stepNum} of {current.total}
          </span>

          <div className="tour-btn-group">
            <button
              type="button"
              className="tour-btn-back"
              disabled={step === 1}
              onClick={() => setStep((s) => (s && s > 1 ? s - 1 : s))}
            >
              Quay lại
            </button>

            {step < current.total ? (
              <button
                type="button"
                className="tour-btn-next"
                onClick={() => setStep((s) => (s ? s + 1 : 1))}
              >
                Tiếp theo
              </button>
            ) : (
              <button
                type="button"
                className="tour-btn-next finish"
                onClick={closeTour}
              >
                Hoàn thành
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
