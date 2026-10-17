/**
 * Utility để ánh xạ và chuẩn hoá URL tài nguyên hình ảnh / âm thanh.
 * - Tự động chuyển đổi các URL từ máy chủ ảnh gốc sang bản sao cục bộ trong /images/.
 * - Hỗ trợ VITE_ASSET_BASE khi triển khai lên CDN riêng hoặc kho lưu trữ đối tượng (S3 / R2).
 * - Bảo lưu nguyên vẹn blob:, data: và các URL tải lên từ backend của người dùng.
 */
const ASSET_BASE = (import.meta.env?.VITE_ASSET_BASE || "").replace(/\/+$/, "");

export function assetUrl(url?: string | null): string {
  if (!url) return "";

  // 1. Giữ nguyên URL cục bộ trong phiên duyệt web (ảnh do người dùng tải lên)
  if (url.startsWith("blob:") || url.startsWith("data:")) {
    return url;
  }

  // 2. Chuyển đổi URL từ máy chủ gốc sang đường dẫn cục bộ
  const REMOTE_HOST = ["assets", "chungdoi", "com"].join(".");
  let resolved = url;
  if (url.includes(REMOTE_HOST)) {
    const rawPath = url.replace(new RegExp(`^https?://${REMOTE_HOST}/`), "");
    if (rawPath.startsWith("photo-library/") || rawPath.startsWith("template-previews/")) {
      resolved = `/images/${rawPath}`;
    } else if (rawPath.startsWith("music/")) {
      resolved = `/${rawPath}`;
    } else {
      resolved = `/images/${rawPath}`;
    }
  }

  // 3. Nếu là URL từ dịch vụ bên thứ ba / kho lưu trữ backend của người dùng (ngoài chungdoi.com), giữ nguyên
  if (/^https?:\/\//i.test(resolved)) {
    return resolved;
  }

  // 4. Chuẩn hoá đường dẫn cục bộ bắt đầu bằng dấu gạch chéo
  if (!resolved.startsWith("/")) {
    resolved = "/" + resolved;
  }

  // Tự động thêm /images nếu là thư mục lưu trữ cục bộ
  if (resolved.startsWith("/photo-library/") || resolved.startsWith("/template-previews/")) {
    resolved = "/images" + resolved;
  }

  // 5. Thêm tiền tố VITE_ASSET_BASE nếu có cấu hình
  if (ASSET_BASE) {
    return `${ASSET_BASE}${resolved}`;
  }

  return resolved;
}

export default assetUrl;
