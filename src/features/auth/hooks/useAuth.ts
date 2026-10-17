import { useState, useEffect } from "react";

/**
 * CHỈ LÀ DEMO: không có backend nên "đăng nhập" chỉ là một cờ trong localStorage, ai sửa được cờ này cũng vào được.
 * Dữ liệu thiệp và khách cũng nằm ngay trong localStorage của trình duyệt, nên cờ này chỉ điều khiển giao diện,
 * không bảo vệ dữ liệu. Khi có backend phải thay bằng phiên do máy chủ cấp (cookie HttpOnly) và kiểm tra quyền phía máy chủ.
 */
export const AUTH_KEY = "chungdoi.logged_in";
let _loggedIn = typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "true";

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(_loggedIn);

  useEffect(() => {
    const handleAuth = () => setLoggedIn(_loggedIn);
    window.addEventListener("auth_change", handleAuth);
    return () => window.removeEventListener("auth_change", handleAuth);
  }, []);

  return {
    loggedIn,
    login: () => {
      _loggedIn = true;
      try {
        localStorage.setItem(AUTH_KEY, "true");
      } catch {}
      setLoggedIn(true);
      window.dispatchEvent(new Event("auth_change"));
    },
    logout: () => {
      _loggedIn = false;
      try {
        localStorage.removeItem(AUTH_KEY);
      } catch {}
      setLoggedIn(false);
      window.dispatchEvent(new Event("auth_change"));
    },
  };
}
