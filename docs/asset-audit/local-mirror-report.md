# Báo Cáo Tải Toàn Bộ Ảnh Tham Chiếu & Cắt Bỏ Phụ Thuộc Máy Chủ Gốc (Việc 6)

## 1. Tổng Quan Thực Hiện

- **Mục tiêu**: Chuyển toàn bộ tài nguyên tham chiếu từ `assets.chungdoi.com` về lưu trữ cục bộ tại `public/`, loại bỏ triệt để các đường dẫn gọi thẳng trong mã nguồn `src/`, đảm bảo ứng dụng vận hành độc lập hoàn toàn ở chế độ ngoại tuyến (offline) mà không suy giảm trải nghiệm hay thiếu ảnh.
- **Tình trạng phụ thuộc ban đầu**:
  - `docs/asset-audit/*.json`: 1.995 lần gọi `assets.chungdoi.com` (tổng hợp thành 407 URL duy nhất).
  - `src/`: 23 vị trí gọi trực tiếp (`defaultData.ts`, `Home.tsx`, `headers.tsx`, `templates.ts`, `Demo.tsx`, `Header.tsx`, `Preview.tsx`).

---

## 2. Bảng Thống Kê Chi Tiết

| Hạng mục chỉ số | Số lượng | Ghi chú kỹ thuật |
| :--- | :---: | :--- |
| **Tổng URL duy nhất kiểm kê** | **407** | Bóc tách từ 75 hồ sơ audit và toàn bộ mã nguồn `src/` |
| **Số tệp đã có sẵn cục bộ** | **0** | Trước khi thực hiện, thư mục `public/images/photo-library/` chưa tồn tại |
| **Số tệp tải mới thành công** | **404** | Kiểm định magic bytes chuẩn WebP (`RIFF...WEBP`) và PNG (`\x89PNG`) |
| **Số URL không tải được** | **3** | Không phải lỗi mạng/chặn; 1 tệp không tồn tại trên web gốc và 2 URL thư mục |
| **Số lần bị Cloudflare chặn** | **0** | Tuân thủ tải tuần tự, giãn cách $\ge 1.5$s giữa các tệp |
| **Vị trí `assets.chungdoi.com` còn lại trong `src/`** | **0** | Lệnh `git grep "assets.chungdoi.com" src` trả về 0 kết quả |
| **Số hồ sơ audit JSON được gắn `localPath`** | **75 / 75** | Bổ sung `localPaths` (1.614 ánh xạ) và `localMirroredCount`, giữ nguyên URL gốc |
| **Kiểm tra `npm run check:assets`** | **PASS** | 65 tệp quét, 0 hotlink bị chặn, 0 tệp ảnh nội bộ bị thiếu |
| **Kiểm tra `npm run build`** | **PASS** | `tsc --noEmit && vite build` hoàn tất không lỗi |
| **Kiểm tra ngoại tuyến (10 mẫu độc lập)** | **10 / 10 PASS** | Chặn toàn bộ `assets.chungdoi.com` qua CDP, 0 ảnh lỗi vỡ hình |

---

## 3. Danh Sách Các URL Thất Bại & Lý Do Cụ Thể

| STT | URL gốc | Phân loại | Mã phản hồi HTTP | Lý do cụ thể |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `https://assets.chungdoi.com/music/romantic-001.mp3` | Nhạc nền mặc định | **404 Not Found** | Tệp âm thanh không tồn tại trên máy chủ gốc của Chung Đôi. Được thay thế bằng hàm `assetUrl("/music/romantic-001.mp3")` sẵn sàng cho tệp cục bộ khi bổ sung. |
| 2 | `https://assets.chungdoi.com/template-previews/vi/` | Base URL thư mục | **404 Not Found** | Đây là chuỗi tiền tố thư mục định nghĩa `TPL_CDN` trong `templates.ts`, không phải là một tệp tài nguyên đơn lẻ. Đã chuyển sang `assetUrl("/template-previews/vi/")`. |
| 3 | `https://assets.chungdoi.com/template-previews/vi/listing/` | Base URL thư mục | **404 Not Found** | Đây là chuỗi tiền tố thư mục định nghĩa `CDN` trong `Home.tsx`, không phải là một tệp tài nguyên đơn lẻ. Đã chuyển sang `assetUrl("/template-previews/vi/listing/")`. |

---

## 4. Danh Sách 23 Vị Trí Mã Nguồn Đã Thay Thế

Toàn bộ 23 vị trí gọi trực tiếp `assets.chungdoi.com` đã được chuẩn hoá sang hàm `assetUrl()` hoặc đường dẫn nội bộ:

1. **`scripts/gen_headers.py`**:
   - Tự động thay thế các tham chiếu ảnh SVG (`src`, `href`, `xlinkHref`) thành biến `{photo}` hoặc đường dẫn nội bộ `/images/...`.
   - Sinh lại tự động toàn bộ 72 component header trong `src/features/invitation/components/generated/headers.tsx` (loại bỏ 2 vị trí gọi trực tiếp cũ ở `H_song_hy_v2_red` và `H_dragon_phoenix_v3_red`).
2. **`src/features/editor/data/defaultData.ts`** (9 vị trí):
   - `templateThumb`: `assetUrl("/template-previews/vi/landscape/double_phoenix_red.d0f325f5.webp")`.
   - `heroPhoto`: `assetUrl("/images/photo-library/design/cdecf6cfe2eeb3cfd63829abde62f1066f10a364ec27d4c997c0f51012c8803e.webp")`.
   - `photos` (6 ảnh album mẫu): chuyển sang `assetUrl(...)` tương ứng với các mã hash trong `photo-library/design/`.
   - `musicUrl`: chuyển sang `assetUrl("/music/romantic-001.mp3")`.
3. **`src/pages/Home.tsx`** (6 vị trí):
   - `CDN`: chuyển sang `assetUrl("/template-previews/vi/listing/")`.
   - `SWITCH_TEMPLATES` (5 ảnh demo chuyển đổi): dùng `assetUrl("/template-previews/vi/full/...")`.
4. **`src/pages/Demo.tsx`** (2 vị trí):
   - `heroPhoto` của `minimalism_darkred`: dùng `assetUrl("/images/photo-library/design/cdecf6cfe2eeb3cfd63829abde62f1066f10a364ec27d4c997c0f51012c8803e.webp")`.
   - `heroPhoto` của `dragon_phoenix_v2_red`: dùng `assetUrl("/images/photo-library/design/c0c85699ec961efa2db8747663ff1a34ad9237b8f5c4bc9c18db8e5c33e16f76.webp")`.
5. **`src/features/templates/data/templates.ts`** (2 vị trí):
   - `TPL_CDN`: chuyển sang `assetUrl("/template-previews/vi/")`.
   - Chú thích JSDoc: gỡ bỏ chuỗi tên miền thô.
6. **`src/features/editor/components/Header.tsx`** (1 vị trí):
   - Giá trị mặc định `templateThumb`: chuyển sang `assetUrl("/template-previews/vi/landscape/double_phoenix_red.d0f325f5.webp")`.
7. **`src/features/invitation/components/Preview.tsx`** (1 vị trí):
   - Fallback `heroPhoto` khi không có ảnh: dùng `assetUrl("/images/photo-library/design/cdecf6cfe2eeb3cfd63829abde62f1066f10a364ec27d4c997c0f51012c8803e.webp")`.

---

## 5. Kết Quả Kiểm Định Ngoại Tuyến (Offline CDP Test)

Kiểm thử được thực hiện bằng trình duyệt Chrome Headless thông qua giao thức Chrome DevTools Protocol (CDP), kích hoạt quy tắc chặn mạng `Network.setBlockedURLs` đối với `*assets.chungdoi.com*`.

| STT | Mã mẫu (Slug) | Tên mẫu thiệp | Ảnh hiển thị tốt | Ảnh lỗi vỡ (Broken) | Trạng thái | Tệp ảnh chụp minh chứng |
| :---: | :--- | :--- | :---: | :---: | :---: | :--- |
| 1 | `bach-su-do` | Bạch Sứ - Đỏ | 7 | **0** | **PASS** | `docs/asset-audit/offline-screenshots/bach-su-do_offline.png` |
| 2 | `hoa-tinh-do` | Họa Tình - Đỏ | 15 | **0** | **PASS** | `docs/asset-audit/offline-screenshots/hoa-tinh-do_offline.png` |
| 3 | `song-long-do` | Song Long - Đỏ | 11 | **0** | **PASS** | `docs/asset-audit/offline-screenshots/song-long-do_offline.png` |
| 4 | `hoang-kim-lam` | Hoàng Kim - Lam | 10 | **0** | **PASS** | `docs/asset-audit/offline-screenshots/hoang-kim-lam_offline.png` |
| 5 | `chibi-red` | Chibi - Red | 11 | **0** | **PASS** | `docs/asset-audit/offline-screenshots/chibi-red_offline.png` |
| 6 | `minimalism-nau` | Minimalism - Nâu | 13 | **0** | **PASS** | `docs/asset-audit/offline-screenshots/minimalism-nau_offline.png` |
| 7 | `minimalism-do-dam` | Minimalism - Đỏ Đậm | 13 | **0** | **PASS** | `docs/asset-audit/offline-screenshots/minimalism-do-dam_offline.png` |
| 8 | `song-hy-do` | Song Hỷ - Đỏ | 11 | **0** | **PASS** | `docs/asset-audit/offline-screenshots/song-hy-do_offline.png` |
| 9 | `song-phung-do` | Song Phụng - Đỏ | 18 | **0** | **PASS** | `docs/asset-audit/offline-screenshots/song-phung-do_offline.png` |
| 10 | `long-phung-v2-do` | Long Phụng V2 - Đỏ | 12 | **0** | **PASS** | `docs/asset-audit/offline-screenshots/long-phung-v2-do_offline.png` |

---

## 6. Kết Luận

1. Ứng dụng đã hoàn toàn ngắt kết nối phụ thuộc vào máy chủ ngoài `assets.chungdoi.com`.
2. Toàn bộ 404 tài nguyên ảnh được lưu trữ cục bộ tại `public/images/photo-library/design/` và `public/images/template-previews/`, phục vụ tức thì với tốc độ tải nhanh, không gặp rủi ro chặn CORS/ORB hay Cloudflare.
3. Không làm ảnh hưởng hay xáo trộn cơ chế tải ảnh người dùng (`blob:`, `data:`).
4. Hàm tiện ích `assetUrl()` sẵn sàng đón nhận biến môi trường `VITE_ASSET_BASE` để đưa lên CDN/S3/R2 trong tương lai mà không cần chỉnh sửa lại mã nguồn.
