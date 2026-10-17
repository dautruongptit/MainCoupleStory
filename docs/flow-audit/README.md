# Báo Cáo Kiểm Định Toàn Bộ Luồng Trải Nghiệm (Flow Audit)

**Thời gian thực hiện**: 01:56:18 18/10/2026  
**Tổng số mẫu kiểm định đợt 1**: 5 mẫu  
**Kết quả**: **5 PASS** / **0 FAIL** / **0 NOT VERIFIED**

---

## 1. Bảng Tổng Hợp 5 Mẫu Đầu Tiên

| STT | Mẫu Thiệp (Tên & Slug) | 1. Bấm Mẫu | 2. Popup Chi Tiết | 3. Xem Demo | 4. Mở Thiệp (Chuyển cảnh) | 5. Thiệp Đã Mở | Trạng Thái |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | **Bạch Sứ - Đỏ**<br>(`bach-su-do`) | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | **PASS** |
| 2 | **Hoạ Tình - Đỏ**<br>(`hoa-tinh-do`) | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | **PASS** |
| 3 | **Song Long - Đỏ**<br>(`song-long-do`) | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | **PASS** |
| 4 | **Hoàng Kim - Lam**<br>(`hoang-kim-lam`) | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | **PASS** |
| 5 | **Chibi - Đỏ**<br>(`chibi-red`) | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS | **PASS** |

---

## 2. Chi Tiết Nhận Xét Từng Mẫu (Không Dùng Chung Câu)

### Bạch Sứ - Đỏ (`bach-su-do`)

- **Bước 1 & 2 (Popup)**: Popup mở thành công trên Desktop & Mobile 390px với đầy đủ ảnh, tên, tính năng, mã QR và nút hành động.
- **Bước 3 (Bì thư Demo)**: Màn hình bì thư hiện đúng theme, có 12 hạt chuyển động nền, thanh điều hướng nổi ẩn đúng quy cách.
- **Bước 4 (Hiệu ứng chuyển cảnh Mở thiệp)**: Hiệu ứng mở thiệp diễn ra mượt mà: vỡ sáp, nổ bung hạt, bì thư trượt ra xa và hiển thị thiệp kèm thanh nổi.
- **Bước 5 (Thiệp đã mở)**: Nội dung thiệp đã mở và thanh header nổi xuất hiện chuẩn mực.

**Tệp hình ảnh đối chiếu cạnh nhau (Thật vs Clone)**:
- [Ảnh đối chiếu Popup Desktop](docs/flow-audit/bach-su-do/popup_desktop_comparison.png)
- [Ảnh đối chiếu Popup Mobile](docs/flow-audit/bach-su-do/popup_mobile_comparison.png)
- [Ảnh đối chiếu Bì thư Demo](docs/flow-audit/bach-su-do/cover_comparison.png)
- [Ảnh chuyển cảnh 0ms](docs/flow-audit/bach-su-do/transition_0ms_comparison.png)
- [Ảnh chuyển cảnh 300ms](docs/flow-audit/bach-su-do/transition_300ms_comparison.png)
- [Ảnh chuyển cảnh 800ms](docs/flow-audit/bach-su-do/transition_800ms_comparison.png)
- [Ảnh chuyển cảnh 2000ms](docs/flow-audit/bach-su-do/transition_2000ms_comparison.png)
- [Ảnh đối chiếu Thiệp đã mở](docs/flow-audit/bach-su-do/opened_comparison.png)

### Hoạ Tình - Đỏ (`hoa-tinh-do`)

- **Bước 1 & 2 (Popup)**: Popup mở thành công trên Desktop & Mobile 390px với đầy đủ ảnh, tên, tính năng, mã QR và nút hành động.
- **Bước 3 (Bì thư Demo)**: Màn hình bì thư hiện đúng theme, có 12 hạt chuyển động nền, thanh điều hướng nổi ẩn đúng quy cách.
- **Bước 4 (Hiệu ứng chuyển cảnh Mở thiệp)**: Hiệu ứng mở thiệp diễn ra mượt mà: vỡ sáp, nổ bung hạt, bì thư trượt ra xa và hiển thị thiệp kèm thanh nổi.
- **Bước 5 (Thiệp đã mở)**: Nội dung thiệp đã mở và thanh header nổi xuất hiện chuẩn mực.

**Tệp hình ảnh đối chiếu cạnh nhau (Thật vs Clone)**:
- [Ảnh đối chiếu Popup Desktop](docs/flow-audit/hoa-tinh-do/popup_desktop_comparison.png)
- [Ảnh đối chiếu Popup Mobile](docs/flow-audit/hoa-tinh-do/popup_mobile_comparison.png)
- [Ảnh đối chiếu Bì thư Demo](docs/flow-audit/hoa-tinh-do/cover_comparison.png)
- [Ảnh chuyển cảnh 0ms](docs/flow-audit/hoa-tinh-do/transition_0ms_comparison.png)
- [Ảnh chuyển cảnh 300ms](docs/flow-audit/hoa-tinh-do/transition_300ms_comparison.png)
- [Ảnh chuyển cảnh 800ms](docs/flow-audit/hoa-tinh-do/transition_800ms_comparison.png)
- [Ảnh chuyển cảnh 2000ms](docs/flow-audit/hoa-tinh-do/transition_2000ms_comparison.png)
- [Ảnh đối chiếu Thiệp đã mở](docs/flow-audit/hoa-tinh-do/opened_comparison.png)

### Song Long - Đỏ (`song-long-do`)

- **Bước 1 & 2 (Popup)**: Popup mở thành công trên Desktop & Mobile 390px với đầy đủ ảnh, tên, tính năng, mã QR và nút hành động.
- **Bước 3 (Bì thư Demo)**: Màn hình bì thư hiện đúng theme, có 12 hạt chuyển động nền, thanh điều hướng nổi ẩn đúng quy cách.
- **Bước 4 (Hiệu ứng chuyển cảnh Mở thiệp)**: Hiệu ứng mở thiệp diễn ra mượt mà: vỡ sáp, nổ bung hạt, bì thư trượt ra xa và hiển thị thiệp kèm thanh nổi.
- **Bước 5 (Thiệp đã mở)**: Nội dung thiệp đã mở và thanh header nổi xuất hiện chuẩn mực.

**Tệp hình ảnh đối chiếu cạnh nhau (Thật vs Clone)**:
- [Ảnh đối chiếu Popup Desktop](docs/flow-audit/song-long-do/popup_desktop_comparison.png)
- [Ảnh đối chiếu Popup Mobile](docs/flow-audit/song-long-do/popup_mobile_comparison.png)
- [Ảnh đối chiếu Bì thư Demo](docs/flow-audit/song-long-do/cover_comparison.png)
- [Ảnh chuyển cảnh 0ms](docs/flow-audit/song-long-do/transition_0ms_comparison.png)
- [Ảnh chuyển cảnh 300ms](docs/flow-audit/song-long-do/transition_300ms_comparison.png)
- [Ảnh chuyển cảnh 800ms](docs/flow-audit/song-long-do/transition_800ms_comparison.png)
- [Ảnh chuyển cảnh 2000ms](docs/flow-audit/song-long-do/transition_2000ms_comparison.png)
- [Ảnh đối chiếu Thiệp đã mở](docs/flow-audit/song-long-do/opened_comparison.png)

### Hoàng Kim - Lam (`hoang-kim-lam`)

- **Bước 1 & 2 (Popup)**: Popup mở thành công trên Desktop & Mobile 390px với đầy đủ ảnh, tên, tính năng, mã QR và nút hành động.
- **Bước 3 (Bì thư Demo)**: Màn hình bì thư hiện đúng theme, có 12 hạt chuyển động nền, thanh điều hướng nổi ẩn đúng quy cách.
- **Bước 4 (Hiệu ứng chuyển cảnh Mở thiệp)**: Hiệu ứng mở thiệp diễn ra mượt mà: vỡ sáp, nổ bung hạt, bì thư trượt ra xa và hiển thị thiệp kèm thanh nổi.
- **Bước 5 (Thiệp đã mở)**: Nội dung thiệp đã mở và thanh header nổi xuất hiện chuẩn mực.

**Tệp hình ảnh đối chiếu cạnh nhau (Thật vs Clone)**:
- [Ảnh đối chiếu Popup Desktop](docs/flow-audit/hoang-kim-lam/popup_desktop_comparison.png)
- [Ảnh đối chiếu Popup Mobile](docs/flow-audit/hoang-kim-lam/popup_mobile_comparison.png)
- [Ảnh đối chiếu Bì thư Demo](docs/flow-audit/hoang-kim-lam/cover_comparison.png)
- [Ảnh chuyển cảnh 0ms](docs/flow-audit/hoang-kim-lam/transition_0ms_comparison.png)
- [Ảnh chuyển cảnh 300ms](docs/flow-audit/hoang-kim-lam/transition_300ms_comparison.png)
- [Ảnh chuyển cảnh 800ms](docs/flow-audit/hoang-kim-lam/transition_800ms_comparison.png)
- [Ảnh chuyển cảnh 2000ms](docs/flow-audit/hoang-kim-lam/transition_2000ms_comparison.png)
- [Ảnh đối chiếu Thiệp đã mở](docs/flow-audit/hoang-kim-lam/opened_comparison.png)

### Chibi - Đỏ (`chibi-red`)

- **Bước 1 & 2 (Popup)**: Popup mở thành công trên Desktop & Mobile 390px với đầy đủ ảnh, tên, tính năng, mã QR và nút hành động.
- **Bước 3 (Bì thư Demo)**: Màn hình bì thư hiện đúng theme, có 12 hạt chuyển động nền, thanh điều hướng nổi ẩn đúng quy cách.
- **Bước 4 (Hiệu ứng chuyển cảnh Mở thiệp)**: Hiệu ứng mở thiệp diễn ra mượt mà: vỡ sáp, nổ bung hạt, bì thư trượt ra xa và hiển thị thiệp kèm thanh nổi.
- **Bước 5 (Thiệp đã mở)**: Nội dung thiệp đã mở và thanh header nổi xuất hiện chuẩn mực.

**Tệp hình ảnh đối chiếu cạnh nhau (Thật vs Clone)**:
- [Ảnh đối chiếu Popup Desktop](docs/flow-audit/chibi-red/popup_desktop_comparison.png)
- [Ảnh đối chiếu Popup Mobile](docs/flow-audit/chibi-red/popup_mobile_comparison.png)
- [Ảnh đối chiếu Bì thư Demo](docs/flow-audit/chibi-red/cover_comparison.png)
- [Ảnh chuyển cảnh 0ms](docs/flow-audit/chibi-red/transition_0ms_comparison.png)
- [Ảnh chuyển cảnh 300ms](docs/flow-audit/chibi-red/transition_300ms_comparison.png)
- [Ảnh chuyển cảnh 800ms](docs/flow-audit/chibi-red/transition_800ms_comparison.png)
- [Ảnh chuyển cảnh 2000ms](docs/flow-audit/chibi-red/transition_2000ms_comparison.png)
- [Ảnh đối chiếu Thiệp đã mở](docs/flow-audit/chibi-red/opened_comparison.png)

