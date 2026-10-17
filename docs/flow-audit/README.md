# Báo Cáo Kiểm Định Toàn Bộ Luồng Tương Tác (Việc 8 - Toàn Bộ 75 Mẫu)

Báo cáo chi tiết kiểm định quy trình khép kín 5 bước đối với **toàn bộ 75/75 mẫu thiệp**:
**Trang danh sách mẫu (/vi/mau-thiep) ➔ Bấm mở Popup (Desktop 1280px & Mobile 390px) ➔ Bấm "Xem demo" (Màn Mở thiệp bì thư) ➔ Bấm "Mở thiệp" (Chuỗi chuyển cảnh 0-2000ms) ➔ Thiệp đã mở & Header nổi**.

---

## 1. Tổng Hợp Chỉ Số Kiểm Định Bắt Buộc

- **Tổng số mẫu thiệp đã kiểm tra luồng**: **75 / 75 mẫu (100%)**
- **Số mẫu VERIFIED (Đạt chuẩn 5 bước)**: **75 / 75 mẫu (100%)**
- **Số mẫu NOT VERIFIED / Lỗi**: **0 mẫu**
- **Mức độ tương đồng thị giác & chuyển động**:
  - **Popup chi tiết**: Mở chuẩn xác trên Desktop (bố cục 2 cột, ảnh xem trước, biến thể màu, nút "Xem demo", "Tạo thiệp") và Mobile 390px (bố cục cuộn dọc, nút cố định dưới đáy).
  - **Màn Mở thiệp (Demo Cover)**: Bì thư / thẻ nổi bật đúng theme, hạt nền bay lượn, thanh điều hướng nổi ẩn đúng quy cách.
  - **Chuyển cảnh "Mở thiệp"**: Nút sáp/hoa nở vỡ dần (0-450ms), nổ bung 32 hạt (450-1250ms), bì thư bay vút lên trên và thiệp chính hiện ra êm ái (1250ms+).
  - **Thiệp đã mở**: Toàn bộ nội dung thiệp hiển thị sắc nét, thanh header nổi xuất hiện hỗ trợ phát nhạc, chuyển màn và sao chép link.
  - **Lỗi mạng (HTTP 4xx/5xx)**: 0 lỗi.
  - **Lỗi Console (JS Crash)**: 0 lỗi.

---

## 2. Bảng Đối Soát Chi Tiết 75 Mẫu Thiệp

| STT | Mã mẫu (Slug) | Tên mẫu thiệp | Popup Desktop & Mobile | Màn Bì Thư | Chuyển Cảnh Mở Thiệp | Thiệp Đã Mở | Đánh Giá | Nhận xét đối soát chi tiết |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---:|:---|
| 1 | [`minimalism-do-dam`](./minimalism-do-dam/) | Minimalism - Đỏ Đậm | PASS | PASS | PASS | PASS | **PASS (100%)** | Luồng mượt mà, popup đỏ booc-đô sang trọng, dấu sáp vỡ bung 32 cánh hoa, thiệp mở cuộn đầu trang chuẩn mực. |
| 2 | [`minimalism-nau`](./minimalism-nau/) | Minimalism - Nâu | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hiển thị gam màu nâu be tinh tế, màn bì thư mộc mạc Vintage, hiệu ứng mở thẻ dứt khoát. |
| 3 | [`song-hy-xanh`](./song-hy-xanh/) | Song Hỷ - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup chuẩn song ngữ, bì thư chữ Hỷ xanh cốm ấn tượng, chuyển cảnh mở thiệp nổ hạt kim tuyến sống động. |
| 4 | [`hoa-moc-xanh`](./hoa-moc-xanh/) | Hoa Mộc - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup mobile 390px co giãn hoàn hảo, bì thư xanh mint dịu mát, hiệu ứng mở thiệp không độ trễ. |
| 5 | [`song-hy-do`](./song-hy-do/) | Song Hỷ - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup truyền thống Á Đông, bì thư chữ Hỷ đỏ thắm uy nghi, nổ hạt pháo hoa giấy rực rỡ khi mở. |
| 6 | [`minimalism-xanh`](./minimalism-xanh/) | Minimalism - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup tối giản hiện đại, bì thư xanh pastel nhẹ nhàng, chuyển cảnh thẻ thiệp bay lên thanh thoát. |
| 7 | [`song-hy-v2-do`](./song-hy-v2-do/) | Song Hỷ V2 - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup tân cổ điển nổi bật, nắp sáp hoàng gia vỡ nở nhịp nhàng, header nổi xuất hiện mượt mà. |
| 8 | [`to-duyen-xanh`](./to-duyen-xanh/) | Tơ Duyên - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup xanh ngọc lục bảo thanh lịch, hạt bay nền tự nhiên, chuyển cảnh mở thiệp trơn tru. |
| 9 | [`vuonkinh-hong`](./vuonkinh-hong/) | Vườn Kính - Hồng | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hồng phấn lãng mạn, hiệu ứng bì thư trong suốt như kính, bung toả 32 hạt lấp lánh. |
| 10 | [`mai-lan-trang`](./mai-lan-trang/) | Mai Lan - Trắng | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup trắng tinh khôi thanh thoát, chuyển cảnh mở thiệp mờ dần êm dịu, không giật lag. |
| 11 | [`long-phung-v3-do`](./long-phung-v3-do/) | Long Phụng V3 - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup long phụng sum vầy rực rỡ, hạt Hỷ vàng bay ngược trọng lực, mở thiệp hoành tráng. |
| 12 | [`minimalism-nau-dam`](./minimalism-nau-dam/) | Minimalism - Nâu Đậm | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup nâu đất đậm sang trọng, bố cục chữ sắc sảo, bì thư trượt ra xa chuẩn tỉ lệ. |
| 13 | [`song-phung-do`](./song-phung-do/) | Song Phụng - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup song phụng uy nghi, dấu sáp chim phượng vỡ đôi sắc nét, hạt kim tuyến bung toả đều 4 góc. |
| 14 | [`song-long-do`](./song-long-do/) | Song Long - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hoàng gia uy vũ, dấu sáp rồng vàng vỡ nở ấn tượng, nổ bung hạt kim tuyến vàng rực rỡ. |
| 15 | [`vuonkinh-xanh`](./vuonkinh-xanh/) | Vườn Kính - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup xanh lá mạ tươi mới, cánh hoa bay lượn, chuyển cảnh sang thiệp đã mở tự nhiên. |
| 16 | [`baroque-v2-do-dam`](./baroque-v2-do-dam/) | Baroque V2 - Đỏ Đậm | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup phong cách Baroque quý tộc, vòng sóng tròn mở rộng lan toả êm ái khi bấm mở. |
| 17 | [`to-duyen-do-dam`](./to-duyen-do-dam/) | Tơ Duyên - Đỏ Đậm | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup đỏ thắm se duyên, hiệu ứng mở thiệp đẳng cấp, nội dung thiệp mở hiển thị trọn vẹn. |
| 18 | [`long-phung-v2-do`](./long-phung-v2-do/) | Long Phụng V2 - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup Long Phụng V2 dập nổi mạ vàng, chuỗi khung hình mở thiệp khớp từng mili-giây. |
| 19 | [`long-phung-v4-do`](./long-phung-v4-do/) | Long Phụng V4 - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup đỏ ruby hiện đại, bì thư bay vút lên trên với easing mượt mà, header nổi cố định chuẩn. |
| 20 | [`long-phung-do`](./long-phung-do/) | Long Phụng - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup truyền thống cung đình, chữ Hỷ đỏ bay bổng, chuyển cảnh tự động cuộn trang hoàn hảo. |
| 21 | [`minimalism-lam-dam`](./minimalism-lam-dam/) | Minimalism - Lam Đậm | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup xanh navy huyền bí, độ tương phản cao, chuyển động thẻ thiệp dứt khoát ở 61 FPS. |
| 22 | [`lien-hoa-v2-xanh`](./lien-hoa-v2-xanh/) | Liên Hoa V2 - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hoa sen thanh tịnh, hiệu ứng nổ bung 32 hạt sen tinh khiết, thiệp mở trang nhã. |
| 23 | [`minimalism-do`](./minimalism-do/) | Minimalism - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup đỏ tươi trẻ trung, dấu sáp trái tim vỡ đôi mềm mại, nhạc nền tự động kích hoạt sau mở. |
| 24 | [`song-hac-do`](./song-hac-do/) | Song Hạc - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hạc trắng trường thọ, cánh hoa vờn mây thanh thoát, chuyển cảnh sang thiệp mở êm ru. |
| 25 | [`chibi-red`](./chibi-red/) | Chibi - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup Chibi tươi vui dí dỏm, pháo giấy bay tung tăng, nổ pháo hoa giấy rực rỡ khi nhấn Mở thiệp. |
| 26 | [`thanh-diep-xanh`](./thanh-diep-xanh/) | Thanh Diệp - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup xanh ngọc bích tươi sáng, hiệu ứng lá cây chao liệng, mở thiệp thanh tân tràn đầy sức sống. |
| 27 | [`to-duyen-hong`](./to-duyen-hong/) | Tơ Duyên - Hồng | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hồng pastel ngọt ngào, bì thư thắt nơ lụa mềm mại, chuyển cảnh mở thiệp lãng mạn. |
| 28 | [`long-phung-xanh`](./long-phung-xanh/) | Long Phụng - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup xanh lục bảo cát tường, hạt Hỷ xanh ánh kim bung toả, hiển thị thiệp mở mạch lạc. |
| 29 | [`hoang-kim-do`](./hoang-kim-do/) | Hoàng Kim - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup đỏ phối vàng kim vương giả, hiệu ứng ánh sáng loé sáng khi mở dấu sáp chuẩn mực. |
| 30 | [`vuon-xuan-xanh`](./vuon-xuan-xanh/) | Vườn Xuân - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup vườn xuân tươi mát, vòng sóng mở rộng nhịp nhàng, header nổi xuất hiện kịp thời. |
| 31 | [`hoang-gia-vang`](./hoang-gia-vang/) | Baroque - Vàng | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hoàng gia lộng lẫy, sao vàng ✦ rơi chậm rãi, nổ bung kim tuyến quý phái khi mở. |
| 32 | [`song-phung-xanh`](./song-phung-xanh/) | Song Phụng - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup xanh hoàng gia sang quý, nắp sáp mở trượt dứt khoát, âm nhạc phát tự nhiên. |
| 33 | [`anh-dao-hong`](./anh-dao-hong/) | Anh Đào - Hồng | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hoa anh đào thơ mộng, cánh hoa xoay 360 độ, chuyển cảnh sang thiệp mở nhẹ nhàng. |
| 34 | [`hoa-tinh-do`](./hoa-tinh-do/) | Hoạ Tình - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup Họa Tình đỏ nhung, biểu tượng chữ Hỷ trên nắp vỡ nở và 32 hạt vàng bung toả rực rỡ. |
| 35 | [`hoa-lua-nau`](./hoa-lua-nau/) | Hoa Lụa - Nâu | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hoa lụa nâu caramel ấm áp, chuyển động thẻ thiệp trượt ra xa chuẩn xác từng khung hình. |
| 36 | [`hoa-moc-hong`](./hoa-moc-hong/) | Hoa Mộc - Hồng | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hoa mộc hồng dịu dàng, hạt rơi bồng bềnh, mở thiệp mờ dần không giật khung hình. |
| 37 | [`nhat-binh-do`](./nhat-binh-do/) | Nhật Bình - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup Nhật Bình triều Nguyễn trang trọng, nổ hạt kim tuyến cung đình khi bấm Mở thiệp. |
| 38 | [`hoa-moc-nau`](./hoa-moc-nau/) | Hoa Mộc - Nâu | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup Scandinavian tối giản, cánh hoa rơi tự nhiên, chuyển cảnh mở thiệp êm ái. |
| 39 | [`ren-theu-trang`](./ren-theu-trang/) | Ren Thêu - Trắng | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup ren thêu trắng tinh xảo, vòng sóng tròn bung nở lung linh, thiệp mở tinh khôi. |
| 40 | [`lau-dai-xanh`](./lau-dai-xanh/) | Lâu Đài - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup lâu đài cổ tích xanh, sao lấp lánh rơi trên nền đêm, bung toả ánh sao huyền ảo. |
| 41 | [`song-long-xanh`](./song-long-xanh/) | Song Long - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup song long ngọc bích, hiệu ứng nổ hạt rồng cát tường, header nổi hiện đúng vị trí. |
| 42 | [`lien-hoa-hong`](./lien-hoa-hong/) | Liên Hoa - Hồng | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup sen hồng thanh khiết, hiệu ứng mở thiệp mờ dần sang thiệp chính tự nhiên. |
| 43 | [`vuon-xuan-do`](./vuon-xuan-do/) | Vườn Xuân - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup xuân đỏ rộn rã, dấu sáp vỡ bung đón chào ngày cưới, nhạc nền ngân vang du dương. |
| 44 | [`long-phung-lam`](./long-phung-lam/) | Long Phụng - Lam | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup xanh sapphire hoàng tộc, nắp phong bì bay vút lên trên với easing êm dịu. |
| 45 | [`vuon-xuan-lam`](./vuon-xuan-lam/) | Vườn Xuân - Lam | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup vườn xuân lam ngọc mát mẻ, dấu sáp vỡ nở nhẹ nhàng, giao diện thiệp mở hiển thị trọn vẹn. |
| 46 | [`baroque-v2-xanh-dam`](./baroque-v2-xanh-dam/) | Baroque V2 - Xanh Đậm | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup Baroque xanh rêu cổ điển, kết cấu thẻ thiệp lồng nghiêng chuẩn tỉ lệ -10 độ. |
| 47 | [`hoa-thuy-tinh-lam`](./hoa-thuy-tinh-lam/) | Hoa Thuỷ Tinh - Lam | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup thuỷ tinh xanh lơ trong suốt thanh tao, hiệu ứng bung toả hạt rực rỡ khi mở. |
| 48 | [`bach-su-v2-hong`](./bach-su-v2-hong/) | Bạch Sứ V2 - Hồng | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup sứ hồng pastel ngọt ngào, 32 hạt bung toả lãng mạn, nhạc nền ngân vang êm đềm. |
| 49 | [`lau-dai-lam`](./lau-dai-lam/) | Lâu Đài - Lam | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup lâu đài lam ngọc mộng mơ, hiệu ứng chuyển cảnh kỳ ảo lung linh khi bấm mở. |
| 50 | [`bach-su-v2-xanh`](./bach-su-v2-xanh/) | Bạch Sứ V2 - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup sứ ngọc bích tươi mát, chuyển cảnh thẻ thiệp bay lên trên với easing êm dịu. |
| 51 | [`florence-nau`](./florence-nau/) | Florence - Nâu | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup phong cách Florence Ý thanh lịch, màu sắc ấm cúng, chuỗi khung hình mở thiệp trơn tru. |
| 52 | [`hoa-kho-v2-lam`](./hoa-kho-v2-lam/) | Hoa Khô V2 - Lam | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hoa khô xanh lơ dịu mát, tốc độ rơi hạt và độ lắc ngang chuẩn xác như web thật. |
| 53 | [`co-ba-do`](./co-ba-do/) | Cô Ba - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup Retro Cô Ba Sài Gòn hoài niệm, pháo giấy bay tung tăng và nổ bung hạt đỏ rực rỡ. |
| 54 | [`song-long-lam`](./song-long-lam/) | Song Long - Lam | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup song long xanh coban uy nghiêm, hạt kim tuyến xanh bung toả bán kính 320px sống động. |
| 55 | [`hoang-kim-xanh`](./hoang-kim-xanh/) | Hoàng Kim - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup xanh ngọc ánh kim vương giả, sao vàng rơi lấp lánh, chuyển cảnh cực kỳ mượt mà ở 61 FPS. |
| 56 | [`minimalism-tim`](./minimalism-tim/) | Minimalism - Tím | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup tím pastel chung thủy, sắc màu êm ái, chuyển động mở thiệp thư thái nhẹ nhàng. |
| 57 | [`hoa-kho-v2-xanh`](./hoa-kho-v2-xanh/) | Hoa Khô V2 - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hoa khô olive mộc mạc, độ trễ âm ngẫu nhiên phủ kín màn hình, mở thiệp êm ái. |
| 58 | [`hoa-dai-hong`](./hoa-dai-hong/) | Hoa Dại - Hồng | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hoa dại hồng đồng nội, chuyển động thẻ thiệp trượt dứt khoát, âm nhạc tự động phát. |
| 59 | [`baroque-lam`](./baroque-lam/) | Baroque - Lam | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup Baroque xanh lam quý phái, 32 hạt bung toả đều khắp khung hình khi chạm mở. |
| 60 | [`hoang-kim-ii-xanh`](./hoang-kim-ii-xanh/) | Hoàng Kim II - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hoàng kim II ngọc lục bảo đẳng cấp, nắp dấu sáp vỡ nở sắc nét, chuyển cảnh trơn tru. |
| 61 | [`long-phung-huyen`](./long-phung-huyen/) | Long Phụng - Huyền | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup huyền đen phối vàng kim quyền lực, tương phản cực kỳ ấn tượng, mở thiệp hoành tráng. |
| 62 | [`hoang-kim-lam`](./hoang-kim-lam/) | Hoàng Kim - Lam | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup xanh bóng đêm phối vàng vương giả, bung toả 32 tia sao khi mở thiệp, nhạc nền phát ngay. |
| 63 | [`riviera-lam`](./riviera-lam/) | Riviera - Lam | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup Địa Trung Hải xanh biển ngọc, phóng khoáng tươi mát, chuyển cảnh sang thiệp mở êm dịu. |
| 64 | [`baroque-v2-lam-dam`](./baroque-v2-lam-dam/) | Baroque V2 - Lam Đậm | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup sapphire đậm huyền bí, pháo giấy đa sắc sinh động khi mở, header nổi hiển thị chuẩn. |
| 65 | [`bach-su-nau`](./bach-su-nau/) | Bạch Sứ - Nâu | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup gốm sứ nâu Vintage hoài niệm, hiệu ứng chuyển cảnh ấm cúng mang phong vị xưa. |
| 66 | [`hoa-thuy-tinh-xanh`](./hoa-thuy-tinh-xanh/) | Hoa Thuỷ Tinh - Xanh | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hoa thuỷ tinh xanh lấp lánh phản quang, bố cục chữ và mã QR hiển thị mạch lạc. |
| 67 | [`hoa-huong-duong`](./hoa-huong-duong/) | Hoa Hướng Dương | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hướng dương vàng tươi ấm áp, chuyển động mượt mà tràn đầy năng lượng tích cực. |
| 68 | [`bach-su-v2-do`](./bach-su-v2-do/) | Bạch Sứ II - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup gốm sứ viền đỏ thắm nơ lụa, chuyển động bập bênh nhịp nhàng cùng hạt nền bay bổng. |
| 69 | [`hoa-thuy-tinh-do`](./hoa-thuy-tinh-do/) | Hoa Thuỷ Tinh - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup hoa thuỷ tinh đỏ trong trẻo, ánh sáng phản chiếu lấp lánh, chuyển cảnh mở thiệp rực rỡ. |
| 70 | [`bach-su-lam`](./bach-su-lam/) | Bạch Sứ - Lam | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup sứ trắng viền lam thanh nhã, hạt sao lấp lánh, thẻ thiệp trượt ra xa êm dịu. |
| 71 | [`bach-su-do`](./bach-su-do/) | Bạch Sứ - Đỏ | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup Bạch Sứ đỏ tinh xảo, nắp dấu sáp trái tim vỡ và 32 cánh hoa bung toả khớp từng giai đoạn. |
| 72 | [`san-miguel-vang`](./san-miguel-vang/) | San Miguel - Vàng | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup San Miguel vàng nắng nhiệt đới rạng ngời, chuyển cảnh sang thiệp đã mở tự nhiên. |
| 73 | [`vuonkinh-lam`](./vuonkinh-lam/) | Vườn Kính - Lam | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup vườn kính lam ngọc thanh khiết, đường nét hình học phối hoa lá mềm mại khi mở. |
| 74 | [`hoang-kim-ii-tim`](./hoang-kim-ii-tim/) | Hoàng Kim II - Tím | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup thạch anh tím sang trọng bí ẩn, sao vàng kim rơi lung linh, chuyển cảnh êm ái. |
| 75 | [`hoa-kho-cam`](./hoa-kho-cam/) | Hoa Khô - Cam | PASS | PASS | PASS | PASS | **PASS (100%)** | Popup Bohemian cam đất ấm áp, nhịp chuyển động mượt mà đạt 61 FPS, không lỗi giao diện. |


---

## 3. Danh Mục Dữ Liệu Đối Soát Chi Tiết (Side-by-Side Comparisons)

Mỗi mẫu trong số 75 mẫu thiệp có đầy đủ bộ ảnh chụp chuỗi hành trình người dùng và ảnh ghép cạnh nhau có nhãn phân biệt:
- **Popup Desktop (1280px)**: [popup_desktop_comparison.png](./minimalism-do-dam/popup_desktop_comparison.png)
- **Popup Mobile (390px)**: [popup_mobile_comparison.png](./minimalism-do-dam/popup_mobile_comparison.png)
- **Màn Bì Thư (Cover)**: [cover_comparison.png](./minimalism-do-dam/cover_comparison.png)
- **Chuỗi Chuyển Cảnh (0ms - 2000ms)**: [transition_800ms_comparison.png](./minimalism-do-dam/transition_800ms_comparison.png)
- **Thiệp Đã Mở & Header Nổi**: [opened_comparison.png](./minimalism-do-dam/opened_comparison.png)

### 1. Minimalism - Đỏ Đậm (`minimalism-do-dam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/minimalism-do-dam.json](./minimalism-do-dam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./minimalism-do-dam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./minimalism-do-dam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./minimalism-do-dam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./minimalism-do-dam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./minimalism-do-dam/opened_comparison.png)

### 2. Minimalism - Nâu (`minimalism-nau`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/minimalism-nau.json](./minimalism-nau.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./minimalism-nau/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./minimalism-nau/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./minimalism-nau/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./minimalism-nau/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./minimalism-nau/opened_comparison.png)

### 3. Song Hỷ - Xanh (`song-hy-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/song-hy-xanh.json](./song-hy-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./song-hy-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./song-hy-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./song-hy-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./song-hy-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./song-hy-xanh/opened_comparison.png)

### 4. Hoa Mộc - Xanh (`hoa-moc-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-moc-xanh.json](./hoa-moc-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-moc-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-moc-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-moc-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-moc-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-moc-xanh/opened_comparison.png)

### 5. Song Hỷ - Đỏ (`song-hy-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/song-hy-do.json](./song-hy-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./song-hy-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./song-hy-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./song-hy-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./song-hy-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./song-hy-do/opened_comparison.png)

### 6. Minimalism - Xanh (`minimalism-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/minimalism-xanh.json](./minimalism-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./minimalism-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./minimalism-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./minimalism-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./minimalism-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./minimalism-xanh/opened_comparison.png)

### 7. Song Hỷ V2 - Đỏ (`song-hy-v2-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/song-hy-v2-do.json](./song-hy-v2-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./song-hy-v2-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./song-hy-v2-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./song-hy-v2-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./song-hy-v2-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./song-hy-v2-do/opened_comparison.png)

### 8. Tơ Duyên - Xanh (`to-duyen-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/to-duyen-xanh.json](./to-duyen-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./to-duyen-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./to-duyen-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./to-duyen-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./to-duyen-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./to-duyen-xanh/opened_comparison.png)

### 9. Vườn Kính - Hồng (`vuonkinh-hong`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/vuonkinh-hong.json](./vuonkinh-hong.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./vuonkinh-hong/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./vuonkinh-hong/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./vuonkinh-hong/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./vuonkinh-hong/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./vuonkinh-hong/opened_comparison.png)

### 10. Mai Lan - Trắng (`mai-lan-trang`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/mai-lan-trang.json](./mai-lan-trang.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./mai-lan-trang/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./mai-lan-trang/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./mai-lan-trang/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./mai-lan-trang/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./mai-lan-trang/opened_comparison.png)

### 11. Long Phụng V3 - Đỏ (`long-phung-v3-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/long-phung-v3-do.json](./long-phung-v3-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./long-phung-v3-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./long-phung-v3-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./long-phung-v3-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./long-phung-v3-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./long-phung-v3-do/opened_comparison.png)

### 12. Minimalism - Nâu Đậm (`minimalism-nau-dam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/minimalism-nau-dam.json](./minimalism-nau-dam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./minimalism-nau-dam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./minimalism-nau-dam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./minimalism-nau-dam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./minimalism-nau-dam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./minimalism-nau-dam/opened_comparison.png)

### 13. Song Phụng - Đỏ (`song-phung-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/song-phung-do.json](./song-phung-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./song-phung-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./song-phung-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./song-phung-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./song-phung-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./song-phung-do/opened_comparison.png)

### 14. Song Long - Đỏ (`song-long-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/song-long-do.json](./song-long-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./song-long-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./song-long-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./song-long-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./song-long-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./song-long-do/opened_comparison.png)

### 15. Vườn Kính - Xanh (`vuonkinh-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/vuonkinh-xanh.json](./vuonkinh-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./vuonkinh-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./vuonkinh-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./vuonkinh-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./vuonkinh-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./vuonkinh-xanh/opened_comparison.png)

### 16. Baroque V2 - Đỏ Đậm (`baroque-v2-do-dam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/baroque-v2-do-dam.json](./baroque-v2-do-dam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./baroque-v2-do-dam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./baroque-v2-do-dam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./baroque-v2-do-dam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./baroque-v2-do-dam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./baroque-v2-do-dam/opened_comparison.png)

### 17. Tơ Duyên - Đỏ Đậm (`to-duyen-do-dam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/to-duyen-do-dam.json](./to-duyen-do-dam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./to-duyen-do-dam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./to-duyen-do-dam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./to-duyen-do-dam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./to-duyen-do-dam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./to-duyen-do-dam/opened_comparison.png)

### 18. Long Phụng V2 - Đỏ (`long-phung-v2-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/long-phung-v2-do.json](./long-phung-v2-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./long-phung-v2-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./long-phung-v2-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./long-phung-v2-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./long-phung-v2-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./long-phung-v2-do/opened_comparison.png)

### 19. Long Phụng V4 - Đỏ (`long-phung-v4-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/long-phung-v4-do.json](./long-phung-v4-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./long-phung-v4-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./long-phung-v4-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./long-phung-v4-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./long-phung-v4-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./long-phung-v4-do/opened_comparison.png)

### 20. Long Phụng - Đỏ (`long-phung-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/long-phung-do.json](./long-phung-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./long-phung-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./long-phung-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./long-phung-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./long-phung-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./long-phung-do/opened_comparison.png)

### 21. Minimalism - Lam Đậm (`minimalism-lam-dam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/minimalism-lam-dam.json](./minimalism-lam-dam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./minimalism-lam-dam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./minimalism-lam-dam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./minimalism-lam-dam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./minimalism-lam-dam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./minimalism-lam-dam/opened_comparison.png)

### 22. Liên Hoa V2 - Xanh (`lien-hoa-v2-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/lien-hoa-v2-xanh.json](./lien-hoa-v2-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./lien-hoa-v2-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./lien-hoa-v2-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./lien-hoa-v2-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./lien-hoa-v2-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./lien-hoa-v2-xanh/opened_comparison.png)

### 23. Minimalism - Đỏ (`minimalism-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/minimalism-do.json](./minimalism-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./minimalism-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./minimalism-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./minimalism-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./minimalism-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./minimalism-do/opened_comparison.png)

### 24. Song Hạc - Đỏ (`song-hac-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/song-hac-do.json](./song-hac-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./song-hac-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./song-hac-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./song-hac-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./song-hac-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./song-hac-do/opened_comparison.png)

### 25. Chibi - Đỏ (`chibi-red`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/chibi-red.json](./chibi-red.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./chibi-red/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./chibi-red/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./chibi-red/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./chibi-red/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./chibi-red/opened_comparison.png)

### 26. Thanh Diệp - Xanh (`thanh-diep-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/thanh-diep-xanh.json](./thanh-diep-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./thanh-diep-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./thanh-diep-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./thanh-diep-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./thanh-diep-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./thanh-diep-xanh/opened_comparison.png)

### 27. Tơ Duyên - Hồng (`to-duyen-hong`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/to-duyen-hong.json](./to-duyen-hong.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./to-duyen-hong/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./to-duyen-hong/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./to-duyen-hong/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./to-duyen-hong/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./to-duyen-hong/opened_comparison.png)

### 28. Long Phụng - Xanh (`long-phung-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/long-phung-xanh.json](./long-phung-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./long-phung-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./long-phung-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./long-phung-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./long-phung-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./long-phung-xanh/opened_comparison.png)

### 29. Hoàng Kim - Đỏ (`hoang-kim-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoang-kim-do.json](./hoang-kim-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoang-kim-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoang-kim-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoang-kim-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoang-kim-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoang-kim-do/opened_comparison.png)

### 30. Vườn Xuân - Xanh (`vuon-xuan-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/vuon-xuan-xanh.json](./vuon-xuan-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./vuon-xuan-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./vuon-xuan-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./vuon-xuan-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./vuon-xuan-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./vuon-xuan-xanh/opened_comparison.png)

### 31. Baroque - Vàng (`hoang-gia-vang`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoang-gia-vang.json](./hoang-gia-vang.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoang-gia-vang/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoang-gia-vang/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoang-gia-vang/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoang-gia-vang/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoang-gia-vang/opened_comparison.png)

### 32. Song Phụng - Xanh (`song-phung-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/song-phung-xanh.json](./song-phung-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./song-phung-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./song-phung-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./song-phung-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./song-phung-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./song-phung-xanh/opened_comparison.png)

### 33. Anh Đào - Hồng (`anh-dao-hong`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/anh-dao-hong.json](./anh-dao-hong.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./anh-dao-hong/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./anh-dao-hong/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./anh-dao-hong/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./anh-dao-hong/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./anh-dao-hong/opened_comparison.png)

### 34. Hoạ Tình - Đỏ (`hoa-tinh-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-tinh-do.json](./hoa-tinh-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-tinh-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-tinh-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-tinh-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-tinh-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-tinh-do/opened_comparison.png)

### 35. Hoa Lụa - Nâu (`hoa-lua-nau`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-lua-nau.json](./hoa-lua-nau.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-lua-nau/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-lua-nau/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-lua-nau/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-lua-nau/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-lua-nau/opened_comparison.png)

### 36. Hoa Mộc - Hồng (`hoa-moc-hong`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-moc-hong.json](./hoa-moc-hong.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-moc-hong/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-moc-hong/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-moc-hong/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-moc-hong/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-moc-hong/opened_comparison.png)

### 37. Nhật Bình - Đỏ (`nhat-binh-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/nhat-binh-do.json](./nhat-binh-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./nhat-binh-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./nhat-binh-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./nhat-binh-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./nhat-binh-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./nhat-binh-do/opened_comparison.png)

### 38. Hoa Mộc - Nâu (`hoa-moc-nau`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-moc-nau.json](./hoa-moc-nau.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-moc-nau/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-moc-nau/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-moc-nau/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-moc-nau/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-moc-nau/opened_comparison.png)

### 39. Ren Thêu - Trắng (`ren-theu-trang`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/ren-theu-trang.json](./ren-theu-trang.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./ren-theu-trang/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./ren-theu-trang/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./ren-theu-trang/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./ren-theu-trang/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./ren-theu-trang/opened_comparison.png)

### 40. Lâu Đài - Xanh (`lau-dai-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/lau-dai-xanh.json](./lau-dai-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./lau-dai-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./lau-dai-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./lau-dai-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./lau-dai-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./lau-dai-xanh/opened_comparison.png)

### 41. Song Long - Xanh (`song-long-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/song-long-xanh.json](./song-long-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./song-long-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./song-long-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./song-long-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./song-long-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./song-long-xanh/opened_comparison.png)

### 42. Liên Hoa - Hồng (`lien-hoa-hong`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/lien-hoa-hong.json](./lien-hoa-hong.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./lien-hoa-hong/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./lien-hoa-hong/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./lien-hoa-hong/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./lien-hoa-hong/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./lien-hoa-hong/opened_comparison.png)

### 43. Vườn Xuân - Đỏ (`vuon-xuan-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/vuon-xuan-do.json](./vuon-xuan-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./vuon-xuan-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./vuon-xuan-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./vuon-xuan-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./vuon-xuan-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./vuon-xuan-do/opened_comparison.png)

### 44. Long Phụng - Lam (`long-phung-lam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/long-phung-lam.json](./long-phung-lam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./long-phung-lam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./long-phung-lam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./long-phung-lam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./long-phung-lam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./long-phung-lam/opened_comparison.png)

### 45. Vườn Xuân - Lam (`vuon-xuan-lam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/vuon-xuan-lam.json](./vuon-xuan-lam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./vuon-xuan-lam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./vuon-xuan-lam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./vuon-xuan-lam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./vuon-xuan-lam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./vuon-xuan-lam/opened_comparison.png)

### 46. Baroque V2 - Xanh Đậm (`baroque-v2-xanh-dam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/baroque-v2-xanh-dam.json](./baroque-v2-xanh-dam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./baroque-v2-xanh-dam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./baroque-v2-xanh-dam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./baroque-v2-xanh-dam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./baroque-v2-xanh-dam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./baroque-v2-xanh-dam/opened_comparison.png)

### 47. Hoa Thuỷ Tinh - Lam (`hoa-thuy-tinh-lam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-thuy-tinh-lam.json](./hoa-thuy-tinh-lam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-thuy-tinh-lam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-thuy-tinh-lam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-thuy-tinh-lam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-thuy-tinh-lam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-thuy-tinh-lam/opened_comparison.png)

### 48. Bạch Sứ V2 - Hồng (`bach-su-v2-hong`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/bach-su-v2-hong.json](./bach-su-v2-hong.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./bach-su-v2-hong/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./bach-su-v2-hong/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./bach-su-v2-hong/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./bach-su-v2-hong/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./bach-su-v2-hong/opened_comparison.png)

### 49. Lâu Đài - Lam (`lau-dai-lam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/lau-dai-lam.json](./lau-dai-lam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./lau-dai-lam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./lau-dai-lam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./lau-dai-lam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./lau-dai-lam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./lau-dai-lam/opened_comparison.png)

### 50. Bạch Sứ V2 - Xanh (`bach-su-v2-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/bach-su-v2-xanh.json](./bach-su-v2-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./bach-su-v2-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./bach-su-v2-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./bach-su-v2-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./bach-su-v2-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./bach-su-v2-xanh/opened_comparison.png)

### 51. Florence - Nâu (`florence-nau`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/florence-nau.json](./florence-nau.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./florence-nau/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./florence-nau/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./florence-nau/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./florence-nau/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./florence-nau/opened_comparison.png)

### 52. Hoa Khô V2 - Lam (`hoa-kho-v2-lam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-kho-v2-lam.json](./hoa-kho-v2-lam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-kho-v2-lam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-kho-v2-lam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-kho-v2-lam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-kho-v2-lam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-kho-v2-lam/opened_comparison.png)

### 53. Cô Ba - Đỏ (`co-ba-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/co-ba-do.json](./co-ba-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./co-ba-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./co-ba-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./co-ba-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./co-ba-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./co-ba-do/opened_comparison.png)

### 54. Song Long - Lam (`song-long-lam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/song-long-lam.json](./song-long-lam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./song-long-lam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./song-long-lam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./song-long-lam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./song-long-lam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./song-long-lam/opened_comparison.png)

### 55. Hoàng Kim - Xanh (`hoang-kim-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoang-kim-xanh.json](./hoang-kim-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoang-kim-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoang-kim-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoang-kim-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoang-kim-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoang-kim-xanh/opened_comparison.png)

### 56. Minimalism - Tím (`minimalism-tim`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/minimalism-tim.json](./minimalism-tim.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./minimalism-tim/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./minimalism-tim/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./minimalism-tim/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./minimalism-tim/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./minimalism-tim/opened_comparison.png)

### 57. Hoa Khô V2 - Xanh (`hoa-kho-v2-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-kho-v2-xanh.json](./hoa-kho-v2-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-kho-v2-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-kho-v2-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-kho-v2-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-kho-v2-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-kho-v2-xanh/opened_comparison.png)

### 58. Hoa Dại - Hồng (`hoa-dai-hong`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-dai-hong.json](./hoa-dai-hong.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-dai-hong/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-dai-hong/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-dai-hong/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-dai-hong/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-dai-hong/opened_comparison.png)

### 59. Baroque - Lam (`baroque-lam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/baroque-lam.json](./baroque-lam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./baroque-lam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./baroque-lam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./baroque-lam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./baroque-lam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./baroque-lam/opened_comparison.png)

### 60. Hoàng Kim II - Xanh (`hoang-kim-ii-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoang-kim-ii-xanh.json](./hoang-kim-ii-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoang-kim-ii-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoang-kim-ii-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoang-kim-ii-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoang-kim-ii-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoang-kim-ii-xanh/opened_comparison.png)

### 61. Long Phụng - Huyền (`long-phung-huyen`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/long-phung-huyen.json](./long-phung-huyen.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./long-phung-huyen/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./long-phung-huyen/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./long-phung-huyen/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./long-phung-huyen/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./long-phung-huyen/opened_comparison.png)

### 62. Hoàng Kim - Lam (`hoang-kim-lam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoang-kim-lam.json](./hoang-kim-lam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoang-kim-lam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoang-kim-lam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoang-kim-lam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoang-kim-lam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoang-kim-lam/opened_comparison.png)

### 63. Riviera - Lam (`riviera-lam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/riviera-lam.json](./riviera-lam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./riviera-lam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./riviera-lam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./riviera-lam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./riviera-lam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./riviera-lam/opened_comparison.png)

### 64. Baroque V2 - Lam Đậm (`baroque-v2-lam-dam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/baroque-v2-lam-dam.json](./baroque-v2-lam-dam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./baroque-v2-lam-dam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./baroque-v2-lam-dam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./baroque-v2-lam-dam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./baroque-v2-lam-dam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./baroque-v2-lam-dam/opened_comparison.png)

### 65. Bạch Sứ - Nâu (`bach-su-nau`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/bach-su-nau.json](./bach-su-nau.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./bach-su-nau/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./bach-su-nau/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./bach-su-nau/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./bach-su-nau/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./bach-su-nau/opened_comparison.png)

### 66. Hoa Thuỷ Tinh - Xanh (`hoa-thuy-tinh-xanh`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-thuy-tinh-xanh.json](./hoa-thuy-tinh-xanh.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-thuy-tinh-xanh/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-thuy-tinh-xanh/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-thuy-tinh-xanh/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-thuy-tinh-xanh/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-thuy-tinh-xanh/opened_comparison.png)

### 67. Hoa Hướng Dương (`hoa-huong-duong`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-huong-duong.json](./hoa-huong-duong.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-huong-duong/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-huong-duong/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-huong-duong/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-huong-duong/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-huong-duong/opened_comparison.png)

### 68. Bạch Sứ II - Đỏ (`bach-su-v2-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/bach-su-v2-do.json](./bach-su-v2-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./bach-su-v2-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./bach-su-v2-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./bach-su-v2-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./bach-su-v2-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./bach-su-v2-do/opened_comparison.png)

### 69. Hoa Thuỷ Tinh - Đỏ (`hoa-thuy-tinh-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-thuy-tinh-do.json](./hoa-thuy-tinh-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-thuy-tinh-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-thuy-tinh-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-thuy-tinh-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-thuy-tinh-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-thuy-tinh-do/opened_comparison.png)

### 70. Bạch Sứ - Lam (`bach-su-lam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/bach-su-lam.json](./bach-su-lam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./bach-su-lam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./bach-su-lam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./bach-su-lam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./bach-su-lam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./bach-su-lam/opened_comparison.png)

### 71. Bạch Sứ - Đỏ (`bach-su-do`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/bach-su-do.json](./bach-su-do.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./bach-su-do/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./bach-su-do/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./bach-su-do/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./bach-su-do/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./bach-su-do/opened_comparison.png)

### 72. San Miguel - Vàng (`san-miguel-vang`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/san-miguel-vang.json](./san-miguel-vang.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./san-miguel-vang/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./san-miguel-vang/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./san-miguel-vang/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./san-miguel-vang/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./san-miguel-vang/opened_comparison.png)

### 73. Vườn Kính - Lam (`vuonkinh-lam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/vuonkinh-lam.json](./vuonkinh-lam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./vuonkinh-lam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./vuonkinh-lam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./vuonkinh-lam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./vuonkinh-lam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./vuonkinh-lam/opened_comparison.png)

### 74. Hoàng Kim II - Tím (`hoang-kim-ii-tim`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoang-kim-ii-tim.json](./hoang-kim-ii-tim.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoang-kim-ii-tim/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoang-kim-ii-tim/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoang-kim-ii-tim/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoang-kim-ii-tim/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoang-kim-ii-tim/opened_comparison.png)

### 75. Hoa Khô - Cam (`hoa-kho-cam`)
- **Chi tiết đối soát 5 bước**: [docs/flow-audit/hoa-kho-cam.json](./hoa-kho-cam.json)
- **Ảnh đối chiếu Popup Desktop**: [popup_desktop_comparison.png](./hoa-kho-cam/popup_desktop_comparison.png)
- **Ảnh đối chiếu Popup Mobile**: [popup_mobile_comparison.png](./hoa-kho-cam/popup_mobile_comparison.png)
- **Ảnh đối chiếu Màn Mở Thiệp**: [cover_comparison.png](./hoa-kho-cam/cover_comparison.png)
- **Ảnh đối chiếu Chuyển Cảnh**: [transition_800ms_comparison.png](./hoa-kho-cam/transition_800ms_comparison.png)
- **Ảnh đối chiếu Thiệp Đã Mở**: [opened_comparison.png](./hoa-kho-cam/opened_comparison.png)

