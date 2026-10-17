# Báo Cáo Tổng Hợp Kiểm Tra Tài Nguyên (Asset Audit Summary)

> Báo cáo tự động theo yêu cầu tại `docs/requests/antigravity-request-2.md` (commit `fb8afac`).

## 1. Trạng Thái Vận Hành & Sự Cố Cloudflare

- **Mục tiêu:** Xác minh và bổ sung tài nguyên tương tác (Album, Hộp quà, RSVP, Lịch, Nhạc, Bản đồ, CSS Backgrounds, Fonts) cho 75 mẫu thiệp từ `https://chungdoi.com/vi/mau-thiep/<slug>/demo`.
- **Quy tắc an toàn:** Tuần tự 1 trình duyệt, nghỉ >= 2s giữa 2 mẫu, >= 1.5s giữa các lần tải. *Nếu gặp 'Attention Required! | Cloudflare' hoặc HTTP 403 liên tiếp 3 lần: Dừng toàn bộ, ghi lại mẫu và tệp, báo lại, không tìm cách vượt chặn.*
- **Kết quả kiểm tra bảo mật:**
  - Khi trình duyệt điều hướng tới `https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo`, hệ thống Cloudflare của `chungdoi.com` lập tức trả về trang thử thách bảo mật **'Just a moment... / Performing security verification'** (Ray ID: a4b..., HTTP 403).
  - Tiếp tục kiểm tra tuần tự 3 mẫu tiếp theo: `song-hy-xanh`, `hoa-moc-xanh`, `song-hy-do` — tất cả đều nhận mã phản hồi **HTTP 403 Forbidden** liên tiếp từ Cloudflare.
  - **Hành động:** Tuân thủ tuyệt đối quy tắc chung, **dừng toàn bộ quá trình crawl/tương tác trực tiếp trên trang thật** để tránh bị chặn IP vĩnh viễn.

## 2. Kết Quả Việc 1 (Tệp Còn Thiếu Đã Biết)

- Tệp: `/images/giftbox/mini/sunflower_yellow.webp`
- Thuộc các mẫu: `minimalism-nau`, `thanh-diep-xanh`, `co-ba-do`
- Kết quả kiểm tra tải: Thử tải chậm trực tiếp và qua phiên Chrome trên `chungdoi.com` đều nhận phản hồi **HTTP 403 Forbidden**.
- Trạng thái: **KHÔNG LẤY ĐƯỢC** (HTTP 403 Forbidden trên máy chủ gốc).

## 3. Bảng Tổng Hợp 75 Mẫu Thiệp (`docs/asset-audit/`)

| STT | Slug | Tên mẫu | Số tài nguyên đã biết | Thiếu trong `public/` | Trạng thái xác minh tương tác |
|:---:|---|---|:---:|:---:|---|
| 1 | `minimalism-do-dam` | Minimalism - Đỏ Đậm | 5 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 2 | `minimalism-nau` | Minimalism - Nâu | 12 | **1** (/images/giftbox/mini/sunflower_yellow.webp) | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 3 | `song-hy-xanh` | Song Hỷ - Xanh | 6 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 4 | `hoa-moc-xanh` | Hoa Mộc - Xanh | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 5 | `song-hy-do` | Song Hỷ - Đỏ | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 6 | `minimalism-xanh` | Minimalism - Xanh | 1 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 7 | `song-hy-v2-do` | Song Hỷ V2 - Đỏ | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 8 | `to-duyen-xanh` | Tơ Duyên - Xanh | 4 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 9 | `vuonkinh-hong` | Vườn Kính - Hồng | 14 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 10 | `mai-lan-trang` | Mai Lan - Trắng | 1 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 11 | `long-phung-v3-do` | Long Phụng V3 - Đỏ | 6 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 12 | `minimalism-nau-dam` | Minimalism - Nâu Đậm | 5 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 13 | `song-phung-do` | Song Phụng - Đỏ | 1 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 14 | `song-long-do` | Song Long - Đỏ | 7 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 15 | `vuonkinh-xanh` | Vườn Kính - Xanh | 14 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 16 | `baroque-v2-do-dam` | Baroque V2 - Đỏ Đậm | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 17 | `to-duyen-do-dam` | Tơ Duyên - Đỏ Đậm | 4 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 18 | `long-phung-v2-do` | Long Phụng V2 - Đỏ | 1 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 19 | `long-phung-v4-do` | Long Phụng V4 - Đỏ | 3 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 20 | `long-phung-do` | Long Phụng - Đỏ | 7 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 21 | `minimalism-lam-dam` | Minimalism - Lam Đậm | 1 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 22 | `lien-hoa-v2-xanh` | Liên Hoa V2 - Xanh | 7 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 23 | `minimalism-do` | Minimalism - Đỏ | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 24 | `song-hac-do` | Song Hạc - Đỏ | 9 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 25 | `chibi-red` | Chibi - Đỏ | 10 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 26 | `thanh-diep-xanh` | Thanh Diệp - Xanh | 9 | **1** (/images/giftbox/mini/sunflower_yellow.webp) | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 27 | `to-duyen-hong` | Tơ Duyên - Hồng | 4 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 28 | `long-phung-xanh` | Long Phụng - Xanh | 1 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 29 | `hoang-kim-do` | Hoàng Kim - Đỏ | 10 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 30 | `vuon-xuan-xanh` | Vườn Xuân - Xanh | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 31 | `hoang-gia-vang` | Baroque - Vàng | 13 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 32 | `song-phung-xanh` | Song Phụng - Xanh | 11 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 33 | `anh-dao-hong` | Anh Đào - Hồng | 7 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 34 | `hoa-tinh-do` | Hoạ Tình - Đỏ | 16 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 35 | `hoa-lua-nau` | Hoa Lụa - Nâu | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 36 | `hoa-moc-hong` | Hoa Mộc - Hồng | 7 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 37 | `nhat-binh-do` | Nhật Bình - Đỏ | 1 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 38 | `hoa-moc-nau` | Hoa Mộc - Nâu | 10 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 39 | `ren-theu-trang` | Ren Thêu - Trắng | 14 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 40 | `lau-dai-xanh` | Lâu Đài - Xanh | 15 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 41 | `song-long-xanh` | Song Long - Xanh | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 42 | `lien-hoa-hong` | Liên Hoa - Hồng | 9 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 43 | `vuon-xuan-do` | Vườn Xuân - Đỏ | 1 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 44 | `long-phung-lam` | Long Phụng - Lam | 7 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 45 | `vuon-xuan-lam` | Vườn Xuân - Lam | 7 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 46 | `baroque-v2-xanh-dam` | Baroque V2 - Xanh Đậm | 9 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 47 | `hoa-thuy-tinh-lam` | Hoa Thuỷ Tinh - Lam | 7 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 48 | `bach-su-v2-hong` | Bạch Sứ V2 - Hồng | 4 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 49 | `lau-dai-lam` | Lâu Đài - Lam | 13 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 50 | `bach-su-v2-xanh` | Bạch Sứ V2 - Xanh | 4 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 51 | `florence-nau` | Florence - Nâu | 16 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 52 | `hoa-kho-v2-lam` | Hoa Khô V2 - Lam | 9 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 53 | `co-ba-do` | Cô Ba - Đỏ | 8 | **1** (/images/giftbox/mini/sunflower_yellow.webp) | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 54 | `song-long-lam` | Song Long - Lam | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 55 | `hoang-kim-xanh` | Hoàng Kim - Xanh | 10 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 56 | `minimalism-tim` | Minimalism - Tím | 1 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 57 | `hoa-kho-v2-xanh` | Hoa Khô V2 - Xanh | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 58 | `hoa-dai-hong` | Hoa Dại - Hồng | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 59 | `baroque-lam` | Baroque - Lam | 17 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 60 | `hoang-kim-ii-xanh` | Hoàng Kim II - Xanh | 15 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 61 | `long-phung-huyen` | Long Phụng - Huyền | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 62 | `hoang-kim-lam` | Hoàng Kim - Lam | 9 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 63 | `riviera-lam` | Riviera - Lam | 21 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 64 | `baroque-v2-lam-dam` | Baroque V2 - Lam Đậm | 9 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 65 | `bach-su-nau` | Bạch Sứ - Nâu | 5 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 66 | `hoa-thuy-tinh-xanh` | Hoa Thuỷ Tinh - Xanh | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 67 | `hoa-huong-duong` | Hoa Hướng Dương | 5 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 68 | `bach-su-v2-do` | Bạch Sứ II - Đỏ | 4 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 69 | `hoa-thuy-tinh-do` | Hoa Thuỷ Tinh - Đỏ | 8 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 70 | `bach-su-lam` | Bạch Sứ - Lam | 9 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 71 | `bach-su-do` | Bạch Sứ - Đỏ | 4 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 72 | `san-miguel-vang` | San Miguel - Vàng | 18 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 73 | `vuonkinh-lam` | Vườn Kính - Lam | 7 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 74 | `hoang-kim-ii-tim` | Hoàng Kim II - Tím | 11 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |
| 75 | `hoa-kho-cam` | Hoa Khô - Cam | 6 | 0 | Bị chặn bởi Cloudflare 403 (chưa thực hiện tương tác động) |

## 4. Tổng Kết Chỉ Số

- **Tổng số mẫu:** 75/75 mẫu thiệp.
- **Số mẫu đã chạy tương tác động:** 0/75 (dừng do Cloudflare chặn ngay từ mẫu đầu tiên và 3 lần 403 liên tiếp).
- **Số mẫu chưa chạy (NOT VERIFIED):** 75/75 mẫu (lý do: Cloudflare 403 / Bot Challenge).
- **Số tệp mới tải trong đợt này:** 0 tệp (do trang gốc trả về 403 và bị Cloudflare chặn).
- **Tệp còn thiếu thuộc diện KHÔNG LẤY ĐƯỢC:**
  - `/images/giftbox/mini/sunflower_yellow.webp`: HTTP 403 Forbidden.
- **Tài nguyên tĩnh hiện có trong `web/public/`:** 428/429 tệp từ đợt tải trước đã có sẵn đầy đủ, `check:assets` và `tsc` đều pass 100%.