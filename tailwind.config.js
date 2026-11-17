/** Tailwind v3 cho phần app ngoài `.inv-root` (bìa thiệp, trang app; mã viết bằng class tiện ích, giống trang gốc).
 *  Không nạp preflight để không làm đổi style của phần còn lại của app.
 *  QUAN TRỌNG: cấu hình từng mẫu nằm ở `shell/specs/<id>/*.json` và chứa class Tailwind (ảnh trang trí bìa trong
 *  cover.json, markup hộp quà trong gift.json) → phải quét cả .json, nếu không các class đó không được sinh
 *  (bìa lệch vị trí ảnh trang trí). Dev server giữ class cũ trong bộ nhớ nên lỗi chỉ lộ ra sau khi khởi động lại / build. */
export default {
  content: [
    "./index.html",
    "./src/**/*.{tsx,ts,jsx,js}",
    "./src/features/invitation/shell/specs/**/*.json",
  ],
  corePlugins: { preflight: false },
  theme: { extend: {} },
  plugins: [],
};
