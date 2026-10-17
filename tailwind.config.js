/** Tailwind chỉ dùng cho Preview.tsx (mã thiệp được viết bằng class tiện ích, giống trang gốc).
 *  Không nạp preflight để không làm đổi style của phần còn lại của app. */
export default {
  content: ["./src/Preview.tsx", "./src/LongPhungV2.tsx"],
  corePlugins: { preflight: false },
  theme: { extend: {} },
  plugins: [],
};
