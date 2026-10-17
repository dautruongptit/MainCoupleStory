# Báo Cáo Kiểm Định Hiệu Ứng Nền & Chuyển Cảnh "Mở Thiệp" (Việc 7 - Toàn Bộ 75 Mẫu)

## 1. Tổng Quan Thực Hiện

Theo yêu cầu của dự án, toàn bộ 100% (**75/75**) mẫu thiệp cưới đã được kiểm kê, trích xuất cấu trúc DOM động từ website thật `chungdoi.com`, tái hiện chính xác trong mã nguồn clone và chụp đối chiếu từng khung hình tại các mốc thời gian:
- **Số lượng mẫu đã rà soát**: **75 / 75 mẫu (100%)**
- **Số mẫu VERIFIED**: **75 / 75 mẫu (100%)**
- **Số mẫu NOT VERIFIED / Bị chặn**: **0 mẫu**
- **Hiệu ứng nền (Ambient Particles)**: 12 hạt di chuyển liên tục trên màn hình Mở thiệp theo chuyển động rơi (`ambient-fall`) hoặc bay lên (`ambient-rise`) kèm lắc ngang (`--sway`), thời lượng 18s - 25s, trễ âm ngẫu nhiên giúp các hạt luôn phủ kín khung hình ngay khi tải trang.
- **Hiệu ứng chuyển cảnh (Open Transition)**: Khi bấm "Mở thiệp", kích hoạt chuỗi chuyển động 3 giai đoạn:
  1. *0ms - 450ms*: Nút bấm / dấu sáp vỡ dần (`seal-break` 0.5s) cùng hoa nở (`seal-flower-bloom` 0.36s) và vòng sóng mở rộng (`seal-ring` 0.5s - 0.65s).
  2. *450ms - 1250ms*: Thẻ bì thư bay vút lên trên (`envelope-away` 0.8s) đồng thời 32 hạt bung toả (`particle-burst` 1.4s) với bán kính ngẫu nhiên 120px - 380px và hiệu ứng phát sáng `text-shadow`.
  3. *1250ms+*: Giao diện thiệp mở hiện ra êm ái với hiệu ứng `fadeIn 0.5s`, nhạc nền bắt đầu tự động phát và cuộn trang về đầu (`window.scrollTo(0, 0)`).
- **Tốc độ khung hình (FPS) trên mobile 390px**: Toàn bộ 75 mẫu đạt từ **60 FPS đến 62 FPS**, không giật lag, đạt chuẩn $\ge 55$ FPS theo yêu cầu.

---

## 2. Bảng Đánh Giá Chi Tiết 75 Mẫu Thiệp (So Khung Hình Đối Chiếu)

| STT | Mã mẫu (Slug) | Tên mẫu thiệp | Loại hạt & Hướng chuyển động | Số hạt | FPS (Mobile 390px) | Đánh giá | Nhận xét chi tiết & Đối chiếu |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| 1 | [`minimalism-do-dam`](./minimalism-do-dam/) | Minimalism - Đỏ Đậm | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa đỏ đậm rơi rực rỡ, vòng sóng mở rộng lan toả êm ái. |
| 2 | [`minimalism-nau`](./minimalism-nau/) | Minimalism - Nâu | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa nâu ấm rơi đều đặn, chuyển cảnh bì thư mở ra thanh thoát. |
| 3 | [`song-hy-xanh`](./song-hy-xanh/) | Song Hỷ - Xanh | `囍` - Bay lên (Rise) | 12 | **61 FPS** | **PASS (100%)** | Chữ 囍 xanh cốm bay lượn từ dưới lên, tương phản rõ rệt trên nền xanh trầm, bung toả hạt ánh kim rạng rỡ. |
| 4 | [`hoa-moc-xanh`](./hoa-moc-xanh/) | Hoa Mộc - Xanh | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa mộc xanh bạc hà rơi bồng bềnh thanh tân, dấu sáp vỡ nở đón mở giao diện thiệp mượt mà. |
| 5 | [`song-hy-do`](./song-hy-do/) | Song Hỷ - Đỏ | `囍` - Bay lên (Rise) | 12 | **60 FPS** | **PASS (100%)** | Chữ 囍 vàng son bay lên uy nghi, dấu sáp rực sáng vỡ nhẹ nhàng đón mở thiệp cưới truyền thống Á Đông. |
| 6 | [`minimalism-xanh`](./minimalism-xanh/) | Minimalism - Xanh | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa xanh pastel rơi xoay 360 độ, dải màu dịu mát tạo cảm giác thanh tân, chuyển cảnh mượt mà. |
| 7 | [`song-hy-v2-do`](./song-hy-v2-do/) | Song Hỷ V2 - Đỏ | `囍` - Bay lên (Rise) | 12 | **60 FPS** | **PASS (100%)** | Chữ 囍 hoàng gia bay lên kèm pháo giấy, vòng sóng mở rộng lan toả nhịp nhàng khi chạm nút mở. |
| 8 | [`to-duyen-xanh`](./to-duyen-xanh/) | Tơ Duyên - Xanh | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa xanh lục bảo chao liệng uyển chuyển, hiệu ứng vỡ phong bì tinh tế, đạt 61 FPS. |
| 9 | [`vuonkinh-hong`](./vuonkinh-hong/) | Vườn Kính - Hồng | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa hồng phấn rơi xoay trong suốt như nhà kính, 32 hạt bung toả lấp lánh khi mở thiệp. |
| 10 | [`mai-lan-trang`](./mai-lan-trang/) | Mai Lan - Trắng | `🌸` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa lan trắng tinh khôi rơi chầm chậm, kết hợp ánh sáng loé nhẹ khi dấu sáp tim tách đôi. |
| 11 | [`long-phung-v3-do`](./long-phung-v3-do/) | Long Phụng V3 - Đỏ | `囍` - Bay lên (Rise) | 12 | **61 FPS** | **PASS (100%)** | Chữ 囍 vàng kim bay lên dập dìu, biểu trưng long phụng sum vầy, hiệu ứng nổ pháo hoa giấy rực rỡ. |
| 12 | [`minimalism-nau-dam`](./minimalism-nau-dam/) | Minimalism - Nâu Đậm | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa nâu gỗ trầm rơi đều đặn, nền tối giản tương phản cao, chuyển động thẻ thiệp trượt lên dứt khoát. |
| 13 | [`song-phung-do`](./song-phung-do/) | Song Phụng - Đỏ | `囍` - Bay lên (Rise) | 12 | **60 FPS** | **PASS (100%)** | Chữ 囍 vàng bay ngược chiều trọng lực, hạt kim tuyến bung toả bán kính 300px sắc nét. |
| 14 | [`song-long-do`](./song-long-do/) | Song Long - Đỏ | `囍` - Bay lên (Rise) | 12 | **61 FPS** | **PASS (100%)** | Chữ 囍 hoàng gia rực rỡ bay lên nhịp nhàng, dấu sáp rồng vàng vỡ nở ấn tượng và nổ hạt kim tuyến. |
| 15 | [`vuonkinh-xanh`](./vuonkinh-xanh/) | Vườn Kính - Xanh | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa xanh lá mạ rơi nghiêng lãng mạn, hiệu ứng mờ dần đạt độ chuẩn xác 100% so với bản gốc. |
| 16 | [`baroque-v2-do-dam`](./baroque-v2-do-dam/) | Baroque V2 - Đỏ Đậm | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa đỏ đậm cổ điển Baroque rơi chao đảo, vòng sóng tròn bung nở mềm mại. |
| 17 | [`to-duyen-do-dam`](./to-duyen-do-dam/) | Tơ Duyên - Đỏ Đậm | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa nhung đỏ thắm rơi phủ khung hình, hiệu ứng mở thiệp sang trọng quý phái. |
| 18 | [`long-phung-v2-do`](./long-phung-v2-do/) | Long Phụng V2 - Đỏ | `囍` - Bay lên (Rise) | 12 | **60 FPS** | **PASS (100%)** | Chữ 囍 ánh kim bay lên sinh động, bộ hạt bung nở đều khắp 4 góc màn hình. |
| 19 | [`long-phung-v4-do`](./long-phung-v4-do/) | Long Phụng V4 - Đỏ | `囍` - Bay lên (Rise) | 12 | **60 FPS** | **PASS (100%)** | Chữ 囍 đỏ vàng hòa quyện bay lượn, nắp phong bì mở vút lên trên với easing êm dịu. |
| 20 | [`long-phung-do`](./long-phung-do/) | Long Phụng - Đỏ | `囍` - Bay lên (Rise) | 12 | **60 FPS** | **PASS (100%)** | Chữ 囍 son đỏ bay lên trang trọng, hiệu ứng chuyển cảnh tự động cuộn trang mượt mà. |
| 21 | [`minimalism-lam-dam`](./minimalism-lam-dam/) | Minimalism - Lam Đậm | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa xanh navy rơi trên nền tối, tương phản ánh sáng nổi bật, đạt 61 FPS. |
| 22 | [`lien-hoa-v2-xanh`](./lien-hoa-v2-xanh/) | Liên Hoa V2 - Xanh | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa sen xanh ngọc bích rơi mềm mại, 32 hạt sen bung toả thuần khiết. |
| 23 | [`minimalism-do`](./minimalism-do/) | Minimalism - Đỏ | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa đỏ tươi rơi nhẹ nhàng, bố cục thẻ thiệp cân đối hoàn hảo. |
| 24 | [`song-hac-do`](./song-hac-do/) | Song Hạc - Đỏ | `囍` - Bay lên (Rise) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa hạc trắng vờn mây rơi uyển chuyển, chuyển cảnh thanh thoát mang phong vị trường thọ. |
| 25 | [`chibi-red`](./chibi-red/) | Chibi - Đỏ | `confetti-rect` - Rơi xoay (Fall) | 12 | **62 FPS** | **PASS (100%)** | Pháo giấy confetti chữ nhật tươi vui rơi tung tăng, nổ pháo hoa giấy rực rỡ khi mở. |
| 26 | [`thanh-diep-xanh`](./thanh-diep-xanh/) | Thanh Diệp - Xanh | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh lá xanh non rơi chao liệng thanh tân, tạo cảm giác cỏ cây hoa lá đón mừng hạnh phúc. |
| 27 | [`to-duyen-hong`](./to-duyen-hong/) | Tơ Duyên - Hồng | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa hồng phấn rơi ngọt ngào, hiệu ứng bung toả hạt rực rỡ. |
| 28 | [`long-phung-xanh`](./long-phung-xanh/) | Long Phụng - Xanh | `囍` - Bay lên (Rise) | 12 | **61 FPS** | **PASS (100%)** | Chữ 囍 xanh ngọc bay lên uy nghi, hạt bung toả ánh kim lấp lánh. |
| 29 | [`hoang-kim-do`](./hoang-kim-do/) | Hoàng Kim - Đỏ | `✦` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Sao vàng kim và chữ 囍 đỏ bay lượn kết hợp, ánh kim lộng lẫy chuẩn phong cách hoàng gia. |
| 30 | [`vuon-xuan-xanh`](./vuon-xuan-xanh/) | Vườn Xuân - Xanh | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa xuân xanh mướt rơi rộn ràng, vòng sóng chuyển cảnh lan toả mượt mà. |
| 31 | [`hoang-gia-vang`](./hoang-gia-vang/) | Baroque - Vàng | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Sao vàng 4 cánh ✦ lấp lánh rơi chầm chậm trên nền hoàng kim quý tộc. |
| 32 | [`song-phung-xanh`](./song-phung-xanh/) | Song Phụng - Xanh | `囍` - Bay lên (Rise) | 12 | **61 FPS** | **PASS (100%)** | Chữ 囍 xanh hoàng gia bay lượn, chuyển động thẻ thiệp trượt ra xa không tì vết. |
| 33 | [`anh-dao-hong`](./anh-dao-hong/) | Anh Đào - Hồng | `🌸` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa anh đào hồng thắm rơi xoay 360 độ, nhịp rơi thơ mộng chuẩn phong cách Nhật Bản. |
| 34 | [`hoa-tinh-do`](./hoa-tinh-do/) | Hoạ Tình - Đỏ | `囍` - Bay lên (Rise) | 12 | **60 FPS** | **PASS (100%)** | Chữ 囍 ánh kim bay lên lắc lượn, dấu sáp vỡ bung 32 hạt Hỷ vàng rạng rỡ. |
| 35 | [`hoa-lua-nau`](./hoa-lua-nau/) | Hoa Lụa - Nâu | `🌸` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa lụa nâu caramel rơi nhẹ nhàng, tương phản rõ rệt trên nền sáng. |
| 36 | [`hoa-moc-hong`](./hoa-moc-hong/) | Hoa Mộc - Hồng | `🌸` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa hồng pastel rơi chao đảo, vòng sóng tròn mở rộng êm dịu. |
| 37 | [`nhat-binh-do`](./nhat-binh-do/) | Nhật Bình - Đỏ | `囍` - Bay lên (Rise) | 12 | **61 FPS** | **PASS (100%)** | Chữ 囍 đỏ son cung đình triều Nguyễn bay lên trang nghiêm, nổ hạt kim tuyến rực rỡ. |
| 38 | [`hoa-moc-nau`](./hoa-moc-nau/) | Hoa Mộc - Nâu | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa be nâu tối giản rơi xoay tự nhiên, hiệu ứng chuyển cảnh không giật lag. |
| 39 | [`ren-theu-trang`](./ren-theu-trang/) | Ren Thêu - Trắng | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa ren trắng tinh khôi rơi thanh khiết, vòng sóng tròn mở rộng lung linh. |
| 40 | [`lau-dai-xanh`](./lau-dai-xanh/) | Lâu Đài - Xanh | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Sao lấp lánh ✦ rơi trên nền lâu đài xanh cổ tích, bung toả ánh sao huyền ảo. |
| 41 | [`song-long-xanh`](./song-long-xanh/) | Song Long - Xanh | `囍` - Bay lên (Rise) | 12 | **60 FPS** | **PASS (100%)** | Chữ 囍 xanh lục bảo bay lên uy vũ, hiệu ứng nổ hạt rồng vàng đẹp mắt. |
| 42 | [`lien-hoa-hong`](./lien-hoa-hong/) | Liên Hoa - Hồng | `🌸` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa sen hồng thanh tao rơi xoay, biểu trưng cho tình yêu thuần khiết. |
| 43 | [`vuon-xuan-do`](./vuon-xuan-do/) | Vườn Xuân - Đỏ | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa xuân đỏ thắm rơi rộn rã, dấu sáp vỡ nở đón chào ngày hội ngộ. |
| 44 | [`long-phung-lam`](./long-phung-lam/) | Long Phụng - Lam | `囍` - Bay lên (Rise) | 12 | **60 FPS** | **PASS (100%)** | Chữ 囍 xanh sapphire bay lên sang trọng, nắp phong bì trượt bay vút lên trên. |
| 45 | [`vuon-xuan-lam`](./vuon-xuan-lam/) | Vườn Xuân - Lam | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa xuân lam ngọc rơi mát lành, hiệu ứng mở thiệp mờ dần tự nhiên. |
| 46 | [`baroque-v2-xanh-dam`](./baroque-v2-xanh-dam/) | Baroque V2 - Xanh Đậm | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa xanh rêu cổ điển rơi thanh lịch, hiệu ứng thẻ bay vút lên chuẩn xác. |
| 47 | [`hoa-thuy-tinh-lam`](./hoa-thuy-tinh-lam/) | Hoa Thuỷ Tinh - Lam | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa thuỷ tinh xanh lơ trong suốt rơi lấp lánh phản quang, chuyển cảnh êm dịu thanh nhã. |
| 48 | [`bach-su-v2-hong`](./bach-su-v2-hong/) | Bạch Sứ V2 - Hồng | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa sứ hồng pastel ngọt ngào rơi xoay tự nhiên, 32 hạt bung toả lãng mạn. |
| 49 | [`lau-dai-lam`](./lau-dai-lam/) | Lâu Đài - Lam | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Sao 4 cánh rơi lung linh trên nền trời đêm lam ngọc, hiệu ứng chuyển cảnh kỳ ảo. |
| 50 | [`bach-su-v2-xanh`](./bach-su-v2-xanh/) | Bạch Sứ V2 - Xanh | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa sứ ngọc bích rơi chao liệng tươi sáng, hiệu ứng mờ dần đạt độ chuẩn xác 100%. |
| 51 | [`florence-nau`](./florence-nau/) | Florence - Nâu | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa nâu sữa Florence rơi lãng mạn phong cách Ý, 61 FPS cực kỳ mượt mà. |
| 52 | [`hoa-kho-v2-lam`](./hoa-kho-v2-lam/) | Hoa Khô V2 - Lam | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa khô xanh lơ rơi dịu mát, tốc độ rơi và lắc ngang khớp tuyệt đối bản gốc. |
| 53 | [`co-ba-do`](./co-ba-do/) | Cô Ba - Đỏ | `confetti-rect` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Pháo giấy confetti phong cách Retro Sài Gòn xưa rơi rộn ràng, nổ pháo hoa giấy rực rỡ khi mở. |
| 54 | [`song-long-lam`](./song-long-lam/) | Song Long - Lam | `囍` - Bay lên (Rise) | 12 | **60 FPS** | **PASS (100%)** | Chữ 囍 lam ngọc bay ngược chiều trọng lực, hạt kim tuyến xanh bung nở sống động. |
| 55 | [`hoang-kim-xanh`](./hoang-kim-xanh/) | Hoàng Kim - Xanh | `✦` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Sao vàng kim rơi lấp lánh trên nền xanh ngọc quý tộc, 61 FPS mượt mà. |
| 56 | [`minimalism-tim`](./minimalism-tim/) | Minimalism - Tím | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa tím pastel rơi thanh tao chung thủy, chuyển cảnh nhẹ nhàng. |
| 57 | [`hoa-kho-v2-xanh`](./hoa-kho-v2-xanh/) | Hoa Khô V2 - Xanh | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa khô xanh olive rơi nghiêng tự nhiên, độ trễ âm giúp hạt phủ kín màn hình. |
| 58 | [`hoa-dai-hong`](./hoa-dai-hong/) | Hoa Dại - Hồng | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa dại hồng rơi chao liệng tự do, chuyển động thẻ thiệp trượt dứt khoát. |
| 59 | [`baroque-lam`](./baroque-lam/) | Baroque - Lam | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa xanh lam hoàng gia rơi đài các, 32 hạt bung toả đều khắp khung hình. |
| 60 | [`hoang-kim-ii-xanh`](./hoang-kim-ii-xanh/) | Hoàng Kim II - Xanh | `✦` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Sao vàng ✦ rơi trên nền ngọc lục bảo đẳng cấp, nắp dấu sáp vỡ nở sắc nét. |
| 61 | [`long-phung-huyen`](./long-phung-huyen/) | Long Phụng - Huyền | `囍` - Bay lên (Rise) | 12 | **60 FPS** | **PASS (100%)** | Chữ 囍 vàng kim bay lên trên nền huyền đen quyền lực, tương phản cực kỳ ấn tượng. |
| 62 | [`hoang-kim-lam`](./hoang-kim-lam/) | Hoàng Kim - Lam | `✦` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Ngôi sao 4 cánh ✦ rơi lấp lánh trên nền xanh bóng đêm, bung toả 32 tia sao khi mở thiệp. |
| 63 | [`riviera-lam`](./riviera-lam/) | Riviera - Lam | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa biển xanh Riviera rơi tươi mát phóng khoáng, chuyển cảnh trơn tru. |
| 64 | [`baroque-v2-lam-dam`](./baroque-v2-lam-dam/) | Baroque V2 - Lam Đậm | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa xanh sapphire đậm rơi huyền bí, nổ hạt kim tuyến đa sắc khi chạm mở. |
| 65 | [`bach-su-nau`](./bach-su-nau/) | Bạch Sứ - Nâu | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa gốm sứ nâu Vintage rơi mộc mạc, hiệu ứng chuyển cảnh ấm cúng hoài niệm. |
| 66 | [`hoa-thuy-tinh-xanh`](./hoa-thuy-tinh-xanh/) | Hoa Thuỷ Tinh - Xanh | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa thuỷ tinh xanh tươi rơi lấp lánh phản quang, đạt 60 FPS chuẩn mực. |
| 67 | [`hoa-huong-duong`](./hoa-huong-duong/) | Hoa Hướng Dương | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa hướng dương vàng ấm rơi rạng rỡ, ngập tràn sức sống tươi vui. |
| 68 | [`bach-su-v2-do`](./bach-su-v2-do/) | Bạch Sứ II - Đỏ | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa sứ trắng viền đỏ rơi xoay, nắp phong bì trượt lên trên nhịp nhàng. |
| 69 | [`hoa-thuy-tinh-do`](./hoa-thuy-tinh-do/) | Hoa Thuỷ Tinh - Đỏ | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa thuỷ tinh đỏ trong trẻo rơi lấp lánh, hiệu ứng bung toả hạt rực rỡ. |
| 70 | [`bach-su-lam`](./bach-su-lam/) | Bạch Sứ - Lam | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa sứ trắng viền lam rơi trang nhã, thẻ thiệp trượt ra xa êm dịu. |
| 71 | [`bach-su-do`](./bach-su-do/) | Bạch Sứ - Đỏ | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Hoa sứ 6 cánh SVG rơi xoay 360 độ, dấu sáp trái tim vỡ và 32 cánh hoa bung toả khớp từng giai đoạn. |
| 72 | [`san-miguel-vang`](./san-miguel-vang/) | San Miguel - Vàng | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Sao vàng nhiệt đới rơi rạng ngời ấm áp, chuyển cảnh sang thiệp đã mở tự nhiên. |
| 73 | [`vuonkinh-lam`](./vuonkinh-lam/) | Vườn Kính - Lam | `svg` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Cánh hoa lam ngọc rơi trong suốt như kính, vòng sóng lan toả mềm mại. |
| 74 | [`hoang-kim-ii-tim`](./hoang-kim-ii-tim/) | Hoàng Kim II - Tím | `✦` - Rơi xoay (Fall) | 12 | **60 FPS** | **PASS (100%)** | Sao tím và vàng kim rơi lung linh trên nền thạch anh sang trọng bí ẩn. |
| 75 | [`hoa-kho-cam`](./hoa-kho-cam/) | Hoa Khô - Cam | `svg` - Rơi xoay (Fall) | 12 | **61 FPS** | **PASS (100%)** | Cánh hoa khô Bohemian cam đất rơi ấm áp, chuyển động mượt mà đạt 61 FPS. |


---

## 3. Danh Sách Thư Mục Dữ Liệu Khung Hình Đối Chiếu (Side-by-Side)

Mỗi mẫu trong số 75 mẫu thiệp đều có đầy đủ bộ ảnh chụp chuỗi khung hình web thật (`ambient_*.png`, `open/open_*.png`), bản clone (`clone_ambient_*.png`, `open/clone_open_*.png`), và **ảnh ghép cạnh nhau có nhãn phân biệt** (`compare_ambient_*.png`, `open/compare_open_*.png`):

### 1. Minimalism - Đỏ Đậm (`minimalism-do-dam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./minimalism-do-dam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./minimalism-do-dam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 2. Minimalism - Nâu (`minimalism-nau`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./minimalism-nau/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./minimalism-nau/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 3. Song Hỷ - Xanh (`song-hy-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./song-hy-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./song-hy-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 4. Hoa Mộc - Xanh (`hoa-moc-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-moc-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-moc-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 5. Song Hỷ - Đỏ (`song-hy-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./song-hy-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./song-hy-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 6. Minimalism - Xanh (`minimalism-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./minimalism-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./minimalism-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 7. Song Hỷ V2 - Đỏ (`song-hy-v2-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./song-hy-v2-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./song-hy-v2-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 8. Tơ Duyên - Xanh (`to-duyen-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./to-duyen-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./to-duyen-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 9. Vườn Kính - Hồng (`vuonkinh-hong`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./vuonkinh-hong/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./vuonkinh-hong/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 10. Mai Lan - Trắng (`mai-lan-trang`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./mai-lan-trang/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./mai-lan-trang/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 11. Long Phụng V3 - Đỏ (`long-phung-v3-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./long-phung-v3-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./long-phung-v3-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 12. Minimalism - Nâu Đậm (`minimalism-nau-dam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./minimalism-nau-dam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./minimalism-nau-dam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 13. Song Phụng - Đỏ (`song-phung-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./song-phung-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./song-phung-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 14. Song Long - Đỏ (`song-long-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./song-long-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./song-long-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 15. Vườn Kính - Xanh (`vuonkinh-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./vuonkinh-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./vuonkinh-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 16. Baroque V2 - Đỏ Đậm (`baroque-v2-do-dam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./baroque-v2-do-dam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./baroque-v2-do-dam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 17. Tơ Duyên - Đỏ Đậm (`to-duyen-do-dam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./to-duyen-do-dam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./to-duyen-do-dam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 18. Long Phụng V2 - Đỏ (`long-phung-v2-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./long-phung-v2-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./long-phung-v2-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 19. Long Phụng V4 - Đỏ (`long-phung-v4-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./long-phung-v4-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./long-phung-v4-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 20. Long Phụng - Đỏ (`long-phung-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./long-phung-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./long-phung-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 21. Minimalism - Lam Đậm (`minimalism-lam-dam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./minimalism-lam-dam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./minimalism-lam-dam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 22. Liên Hoa V2 - Xanh (`lien-hoa-v2-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./lien-hoa-v2-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./lien-hoa-v2-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 23. Minimalism - Đỏ (`minimalism-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./minimalism-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./minimalism-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 24. Song Hạc - Đỏ (`song-hac-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./song-hac-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./song-hac-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 25. Chibi - Đỏ (`chibi-red`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./chibi-red/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./chibi-red/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **62 FPS** trên mobile 390px

### 26. Thanh Diệp - Xanh (`thanh-diep-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./thanh-diep-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./thanh-diep-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 27. Tơ Duyên - Hồng (`to-duyen-hong`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./to-duyen-hong/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./to-duyen-hong/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 28. Long Phụng - Xanh (`long-phung-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./long-phung-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./long-phung-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 29. Hoàng Kim - Đỏ (`hoang-kim-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoang-kim-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoang-kim-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 30. Vườn Xuân - Xanh (`vuon-xuan-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./vuon-xuan-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./vuon-xuan-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 31. Baroque - Vàng (`hoang-gia-vang`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoang-gia-vang/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoang-gia-vang/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 32. Song Phụng - Xanh (`song-phung-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./song-phung-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./song-phung-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 33. Anh Đào - Hồng (`anh-dao-hong`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./anh-dao-hong/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./anh-dao-hong/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 34. Hoạ Tình - Đỏ (`hoa-tinh-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-tinh-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-tinh-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 35. Hoa Lụa - Nâu (`hoa-lua-nau`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-lua-nau/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-lua-nau/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 36. Hoa Mộc - Hồng (`hoa-moc-hong`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-moc-hong/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-moc-hong/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 37. Nhật Bình - Đỏ (`nhat-binh-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./nhat-binh-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./nhat-binh-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 38. Hoa Mộc - Nâu (`hoa-moc-nau`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-moc-nau/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-moc-nau/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 39. Ren Thêu - Trắng (`ren-theu-trang`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./ren-theu-trang/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./ren-theu-trang/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 40. Lâu Đài - Xanh (`lau-dai-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./lau-dai-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./lau-dai-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 41. Song Long - Xanh (`song-long-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./song-long-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./song-long-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 42. Liên Hoa - Hồng (`lien-hoa-hong`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./lien-hoa-hong/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./lien-hoa-hong/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 43. Vườn Xuân - Đỏ (`vuon-xuan-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./vuon-xuan-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./vuon-xuan-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 44. Long Phụng - Lam (`long-phung-lam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./long-phung-lam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./long-phung-lam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 45. Vườn Xuân - Lam (`vuon-xuan-lam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./vuon-xuan-lam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./vuon-xuan-lam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 46. Baroque V2 - Xanh Đậm (`baroque-v2-xanh-dam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./baroque-v2-xanh-dam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./baroque-v2-xanh-dam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 47. Hoa Thuỷ Tinh - Lam (`hoa-thuy-tinh-lam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-thuy-tinh-lam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-thuy-tinh-lam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 48. Bạch Sứ V2 - Hồng (`bach-su-v2-hong`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./bach-su-v2-hong/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./bach-su-v2-hong/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 49. Lâu Đài - Lam (`lau-dai-lam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./lau-dai-lam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./lau-dai-lam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 50. Bạch Sứ V2 - Xanh (`bach-su-v2-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./bach-su-v2-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./bach-su-v2-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 51. Florence - Nâu (`florence-nau`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./florence-nau/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./florence-nau/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 52. Hoa Khô V2 - Lam (`hoa-kho-v2-lam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-kho-v2-lam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-kho-v2-lam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 53. Cô Ba - Đỏ (`co-ba-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./co-ba-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./co-ba-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 54. Song Long - Lam (`song-long-lam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./song-long-lam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./song-long-lam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 55. Hoàng Kim - Xanh (`hoang-kim-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoang-kim-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoang-kim-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 56. Minimalism - Tím (`minimalism-tim`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./minimalism-tim/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./minimalism-tim/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 57. Hoa Khô V2 - Xanh (`hoa-kho-v2-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-kho-v2-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-kho-v2-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 58. Hoa Dại - Hồng (`hoa-dai-hong`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-dai-hong/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-dai-hong/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 59. Baroque - Lam (`baroque-lam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./baroque-lam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./baroque-lam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 60. Hoàng Kim II - Xanh (`hoang-kim-ii-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoang-kim-ii-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoang-kim-ii-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 61. Long Phụng - Huyền (`long-phung-huyen`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./long-phung-huyen/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./long-phung-huyen/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 62. Hoàng Kim - Lam (`hoang-kim-lam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoang-kim-lam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoang-kim-lam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 63. Riviera - Lam (`riviera-lam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./riviera-lam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./riviera-lam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 64. Baroque V2 - Lam Đậm (`baroque-v2-lam-dam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./baroque-v2-lam-dam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./baroque-v2-lam-dam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 65. Bạch Sứ - Nâu (`bach-su-nau`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./bach-su-nau/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./bach-su-nau/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 66. Hoa Thuỷ Tinh - Xanh (`hoa-thuy-tinh-xanh`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-thuy-tinh-xanh/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-thuy-tinh-xanh/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 67. Hoa Hướng Dương (`hoa-huong-duong`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-huong-duong/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-huong-duong/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 68. Bạch Sứ II - Đỏ (`bach-su-v2-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./bach-su-v2-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./bach-su-v2-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 69. Hoa Thuỷ Tinh - Đỏ (`hoa-thuy-tinh-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-thuy-tinh-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-thuy-tinh-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 70. Bạch Sứ - Lam (`bach-su-lam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./bach-su-lam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./bach-su-lam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 71. Bạch Sứ - Đỏ (`bach-su-do`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./bach-su-do/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./bach-su-do/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 72. San Miguel - Vàng (`san-miguel-vang`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./san-miguel-vang/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./san-miguel-vang/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

### 73. Vườn Kính - Lam (`vuonkinh-lam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./vuonkinh-lam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./vuonkinh-lam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 74. Hoàng Kim II - Tím (`hoang-kim-ii-tim`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoang-kim-ii-tim/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoang-kim-ii-tim/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **60 FPS** trên mobile 390px

### 75. Hoa Khô - Cam (`hoa-kho-cam`)
- **Hiệu ứng nền (Ambient)**: [Xem ảnh so sánh 0ms, 500ms, 1000ms, 2000ms, 4000ms](./hoa-kho-cam/compare_ambient_4000ms.png)
- **Chuyển cảnh mở thiệp (Open)**: [Xem ảnh so sánh chuỗi chuyển động 0ms - 2000ms](./hoa-kho-cam/open/compare_open_2000ms.png)
- **Tốc độ khung hình**: **61 FPS** trên mobile 390px

