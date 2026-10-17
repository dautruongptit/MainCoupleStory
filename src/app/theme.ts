import { useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "chungdoi.theme";
const EVT = "app:theme";

function read(): Theme {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* storage không dùng được */
  }
  return "dark";
}

function apply(t: Theme) {
  document.documentElement.dataset.theme = t;
}

/** Gọi một lần trước khi render để không nháy sai giao diện. Mặc định tối (giống ảnh chuẩn trên desktop). */
export function initTheme() {
  apply(read());
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read);
  useEffect(() => {
    const h = () => setTheme(read());
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(EVT, h);
      window.removeEventListener("storage", h);
    };
  }, []);
  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* chỉ giữ trong phiên */
    }
    apply(next);
    setTheme(next);
    window.dispatchEvent(new Event(EVT));
  };
  return { theme, toggle };
}
