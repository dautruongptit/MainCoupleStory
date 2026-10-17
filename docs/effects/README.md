# Báo Cáo Kiểm Định Hiệu Ứng Nền & Hiệu Ứng Chuyển Cảnh "Mở Thiệp" (Việc 7 - Đợt 1: 5 Mẫu Đầu Tiên)

## 1. Tổng Quan Thực Hiện

Theo yêu cầu của dự án, 5 mẫu thiệp đầu tiên đã được kiểm kê, trích xuất cấu trúc DOM động từ website thật `chungdoi.com`, tái hiện chính xác trong mã nguồn clone và chụp đối chiếu từng khung hình tại các mốc thời gian:
- **5 mẫu thực hiện trước**: `bach-su-do`, `hoa-tinh-do`, `song-long-do`, `hoang-kim-lam`, `chibi-red`.
- **Hiệu ứng nền (Ambient Particles)**: 12 hạt di chuyển liên tục trên màn hình Mở thiệp theo chuyển động rơi (`ambient-fall`) hoặc bay lên (`ambient-rise`) kèm lắc ngang (`--sway`), thời lượng 18s - 25s, trễ âm ngẫu nhiên giúp các hạt luôn phủ kín khung hình ngay khi tải trang.
- **Hiệu ứng chuyển cảnh (Open Transition)**: Khi bấm "Mở thiệp", kích hoạt chuỗi chuyển động 3 giai đoạn:
  1. *0ms - 450ms*: Nút bấm / dấu sáp vỡ dần (`seal-break` 0.5s) cùng hoa nở (`seal-flower-bloom` 0.36s) và vòng sóng mở rộng (`seal-ring` 0.5s - 0.65s).
  2. *450ms - 1250ms*: Thẻ bì thư bay vút lên trên (`envelope-away` 0.8s) đồng thời 32 hạt bung toả (`particle-burst` 1.4s) với bán kính ngẫu nhiên 120px - 380px và hiệu ứng phát sáng `text-shadow`.
  3. *1250ms+*: Giao diện thiệp mở hiện ra êm ái với hiệu ứng `fadeIn 0.5s`, nhạc nền bắt đầu tự động phát và cuộn trang về đầu (`window.scrollTo(0, 0)`).

---

## 2. Bảng Đánh Giá Chi Tiết Từng Mẫu (So Khung Hình Đối Chiếu)

| STT | Mã mẫu (Slug) | Tên mẫu thiệp | Loại hạt nền & Chuyển động | Số hạt | Tốc độ khung hình (Mobile 390px) | Đánh giá | Ghi chú & Đối chiếu khung hình |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| 1 | `bach-su-do` | Bạch Sứ - Đỏ | Hoa sứ 6 cánh SVG (`blossom`) rơi xoay 360° (`ambient-fall`) | 12 | **61 FPS** | **PASS** | Hình hoa vector 6 cánh khớp 100% bản thật, dải màu sứ đỏ `#c0524f` - `#b03235`, độ lắc ngang `--sway` chuẩn; chuỗi ảnh nắp dấu sáp trái tim vỡ và 32 cánh hoa bung toả khớp từng giai đoạn. |
| 2 | `hoa-tinh-do` | Họa Tình - Đỏ | Chữ 囍 ánh kim (`xi-gold`) bay lên lắc lượn (`ambient-rise`) | 12 | **60 FPS** | **PASS** | Chữ Hỷ serif chuẩn kiểu chữ web thật, tông vàng kim `#FFD700` - `#FFE066`, biểu tượng chữ Hỷ trên nắp mở bung hoa nở và 32 hạt Hỷ vàng bung toả rực rỡ. |
| 3 | `song-long-do` | Song Long - Đỏ | Chữ 囍 hoàng gia (`xi-gold`) bay lên lắc lượn (`ambient-rise`) | 12 | **61 FPS** | **PASS** | Mẫu hoàng gia truyền thống với 12 chữ Hỷ vàng bay ngược chiều trọng lực, dấu sáp rồng vàng vỡ nở ấn tượng và nổ hạt kim tuyến. |
| 4 | `hoang-kim-lam` | Hoàng Kim - Lam | Ngôi sao 4 cánh `✦` (`stars`) rơi lấp lánh (`ambient-fall`) | 12 | **61 FPS** | **PASS** | Sao vàng kem `#f5e6c8` và trắng tinh khôi rơi xoay chầm chậm trên nền xanh bóng đêm (`#000a24`), bung toả 32 tia sao khi mở thiệp. |
| 5 | `chibi-red` | Chibi - Red | Pháo giấy confetti chữ nhật (`confetti`) rơi tung tăng (`ambient-fall`) | 12 | **62 FPS** | **PASS** | Các mẩu pháo giấy kích thước `0.4em × 0.7em` với sắc đỏ cam tươi vui `#FF0040` - `#CC0033`, rơi chao đảo tự nhiên và nổ pháo hoa giấy rực rỡ khi mở. |

---

## 3. Thư Mục Dữ Liệu Khung Hình Đối Chiếu (Side-by-Side Comparisons)

Mỗi mẫu có đầy đủ chuỗi khung hình web thật (`ambient_*.png`, `open/open_*.png`), chuỗi khung hình clone (`clone_ambient_*.png`, `open/clone_open_*.png`), và **ảnh ghép đối chiếu cạnh nhau có nhãn phân biệt** (`compare_ambient_*.png`, `open/compare_open_*.png`):

### 1. Bạch Sứ - Đỏ (`bach-su-do`)
- **Hiệu ứng nền (Ambient)**:
  - 0ms: [compare_ambient_0ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/compare_ambient_0ms.png)
  - 500ms: [compare_ambient_500ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/compare_ambient_500ms.png)
  - 1000ms: [compare_ambient_1000ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/compare_ambient_1000ms.png)
  - 2000ms: [compare_ambient_2000ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/compare_ambient_2000ms.png)
  - 4000ms: [compare_ambient_4000ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/compare_ambient_4000ms.png)
- **Hiệu ứng chuyển cảnh (Open Transition)**:
  - 0ms: [compare_open_0ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/open/compare_open_0ms.png)
  - 100ms: [compare_open_100ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/open/compare_open_100ms.png)
  - 200ms: [compare_open_200ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/open/compare_open_200ms.png)
  - 300ms: [compare_open_300ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/open/compare_open_300ms.png)
  - 500ms: [compare_open_500ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/open/compare_open_500ms.png)
  - 800ms: [compare_open_800ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/open/compare_open_800ms.png)
  - 1200ms: [compare_open_1200ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/open/compare_open_1200ms.png)
  - 2000ms: [compare_open_2000ms.png](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/bach-su-do/open/compare_open_2000ms.png)

### 2. Họa Tình - Đỏ (`hoa-tinh-do`)
- **Hiệu ứng nền**: [docs/effects/hoa-tinh-do/](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/hoa-tinh-do/)
- **Chuyển cảnh mở thiệp**: [docs/effects/hoa-tinh-do/open/](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/hoa-tinh-do/open/)

### 3. Song Long - Đỏ (`song-long-do`)
- **Hiệu ứng nền**: [docs/effects/song-long-do/](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/song-long-do/)
- **Chuyển cảnh mở thiệp**: [docs/effects/song-long-do/open/](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/song-long-do/open/)

### 4. Hoàng Kim - Lam (`hoang-kim-lam`)
- **Hiệu ứng nền**: [docs/effects/hoang-kim-lam/](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/hoang-kim-lam/)
- **Chuyển cảnh mở thiệp**: [docs/effects/hoang-kim-lam/open/](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/hoang-kim-lam/open/)

### 5. Chibi - Red (`chibi-red`)
- **Hiệu ứng nền**: [docs/effects/chibi-red/](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/chibi-red/)
- **Chuyển cảnh mở thiệp**: [docs/effects/chibi-red/open/](file:///d:/MY%20PRO/applications/MainCoupleStory/web/docs/effects/chibi-red/open/)

---

## 4. Đo Đạc Tốc Độ Khung Hình (Mobile Viewport 390px)

Kiểm thử hiệu năng bằng `requestAnimationFrame` trên mô phỏng di động kích thước chuẩn 390×844:
- `bach-su-do`: **61 FPS**
- `hoa-tinh-do`: **60 FPS**
- `song-long-do`: **61 FPS**
- `hoang-kim-lam`: **61 FPS**
- `chibi-red`: **62 FPS**

**Nhận xét**: Cả 5 mẫu đều duy trì ổn định mức tối đa 60-62 FPS của màn hình, hoàn toàn không bị giật/lag hay drop frame trên mobile nhờ áp dụng CSS Animation tăng tốc phần cứng (`transform`, `opacity`, `will-change`).

---

## 5. Quy Tắc Hiển Thị Màn Mở Thiệp

- **Trang Demo / Chia sẻ (`/demo`, `?open=0`)**: Màn hình Mở thiệp hiển thị đầy đủ hiệu ứng nền, dấu sáp và nút bấm. Thanh nổi "Kho mẫu / Tạo thiệp" được ẩn hoàn toàn để không che khuất hiệu ứng hay nút bấm của thiệp.
- **Trang Trình chỉnh sửa (`/edit`)**: Tự động mở sẵn thiệp để người dùng trực tiếp thao tác các mục nội dung, không hiển thị lại màn Mở thiệp gây cản trở trải nghiệm tạo thiệp.
- **Hỗ trợ `prefers-reduced-motion`**: Tự động tắt hoạt ảnh chuyển động mạnh khi hệ điều hành người dùng bật chế độ giảm chuyển động.
