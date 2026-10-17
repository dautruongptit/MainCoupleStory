/** Tailwind chỉ dùng cho Preview.tsx (mã thiệp được viết bằng class tiện ích, giống trang gốc).
 *  Không nạp preflight để không làm đổi style của phần còn lại của app. */
export default {
  content: [
    "./index.html",
    "./src/**/*.{tsx,ts,jsx,js}",
  ],
  corePlugins: { preflight: false },
  theme: { extend: {} },
  plugins: [],
};
