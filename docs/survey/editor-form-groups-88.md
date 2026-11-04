# Form điền thông tin (editor) — chia họ theo 88 mẫu trên trang thật

**Đo lần 3 (03/11/2026) — thay thế hoàn toàn 2 lần đo trước.**

- Lần 1 (01/11): dùng `history.pushState` để đổi mẫu → không remount, mọi giá trị chỉ tính lúc mount đầu tiên → kết luận sai "cả 88 mẫu giống hệt nhau". **Sai.**
- Lần 2 (03/11, đầu phiên): đổi mẫu bằng tải lại `/edit/<draftId>?template=<id>` trong iframe → remount đúng, nhưng vẫn ra kết quả sai cho ít nhất 1 mẫu (`minimalism_green` lúc đo ra "Ảnh đầu thiệp", nhưng bấm tay lại ra "Ảnh đôi"). Tức là **tham số `?template=` trên URL không đáng tin** — có vẻ chỉ gán mẫu cho thiệp nháp ở bước xử lý ban đầu, không phản ánh đúng logic chọn mẫu thật của app.
- **Lần 3 (dùng ở đây): giả lập bấm chuột thật vào đúng nút "Đổi mẫu thiệp" trong editor** (`#change-template-btn`) → mở bảng lưới mẫu → bấm thẻ ảnh đúng mẫu (`<img alt="Tên mẫu">` → `.closest('button').click()`) — **cùng một đường xử lý y hệt khi người dùng tự bấm tay**. Đã đối chiếu: 3 mẫu bấm tay thật 100% bằng chuột (Song Hỷ - Xanh, Minimalism - Xanh ×2 trên 2 thiệp nháp khác nhau, Lâu Đài - Xanh, Hoàng Kim - Lam) đều khớp tuyệt đối với kết quả của script. Chạy toàn bộ 88/88 mẫu bằng cách này trên 1 thiệp nháp thật (`Thiệp 1`, tạo 15/10/2026).

## Kết quả: 3 họ (không phải 2), chia theo thẻ "Ảnh đầu thiệp" / "Ảnh đôi" / không có

| Nhóm | Số mẫu | Ý nghĩa |
|---|---|---|
| **DON** | 15 | Có thẻ ảnh với đúng 1 ô "Ảnh đầu thiệp" (ảnh ghép cặp đôi hoặc ảnh đơn) |
| **DOI** | 16 | Có thẻ ảnh với 2 ô riêng "Ảnh chú rể" / "Ảnh cô dâu" |
| **KHONG_CO** | 57 | Không có thẻ ảnh đầu thiệp nào — đi thẳng từ "Thông tin cơ bản" sang "Thư viện ảnh" |

Phần còn lại của form (15 thẻ khác, nhãn, thứ tự, trạng thái Hiện/Ẩn mặc định, tuỳ chọn kiểu hiển thị album...) **giống hệt nhau ở cả 3 nhóm**. "Lời mở đầu" mặc định luôn đổi đúng theo từng mẫu riêng lẻ (không theo nhóm).

Lưu ý: nhóm không tương ứng 1-1 với "họ bố cục" (code family) đã biết trước — ví dụ cùng tên "Minimalism" nhưng `minimalism_brown`=DON, `minimalism_green`=DOI, `minimalism_red`=KHONG_CO, `minimalism_darkblue`=DOI, `minimalism_purple`=DON. Đây thực sự là cờ capability riêng theo từng mẫu, không suy ra được từ tên/màu.

### Họ DON — "Ảnh đầu thiệp" (15 mẫu)
minimalism_darkred, minimalism_brown, song_hy_green, song_hy_v2_red, song_hy_red, dragon_phoenix_v3_red, minimalism_darkbrown, dragon_phoenix_v4_red, lien_hoa_v2_green, baroque_v2_darkgreen, baroque_v2_darkred, cherry_blossom_pink, applique_lace_white, minimalism_purple, baroque_v2_darkblue

### Họ DOI — "Ảnh đôi" (16 mẫu)
boho_floral_green, silk_ribbon_green, minimalism_green, silk_ribbon_darkred, double_dragon_red, double_dragon_green, glass_garden_pink, marble_yellow, elegant_leaf_green, silk_ribbon_pink, boho_floral_pink, hoa_tinh_red, minimalism_darkblue, boho_floral_brown, double_dragon_blue, floral_fiesta_yellow

### Họ KHONG_CO — không có thẻ ảnh đầu thiệp (57 mẫu)
jasmine_white, dragon_phoenix_red, dragon_phoenix_v2_red, glass_garden_green, double_phoenix_red, chateau_green, spring_garden_green, chibi_red, song_hac_red, nhat_binh_red, silk_flora_brown, spring_garden_blue, royal_red, minimalism_red, spring_garden_red, dragon_phoenix_green, baroque_gold, chateau_blue, double_phoenix_green, glass_garden_light_green, crystal_floral_blue, dragon_phoenix_blue, co_ba_red, lien_hoa_pink, porcelain_v2_green, dried_flower_v2_green, porcelain_v2_pink, hoa_kho_v2_blue, dragon_phoenix_black, royal_v2_green, royal_green, baroque_blue, porcelain_brown, crystal_floral_red, royal_blue, riviera_blue, florence_brown, sunflower_yellow, crystal_floral_green, santorini_blue, porcelain_v2_red, porcelain_blue, folk_floral_blue, porcelain_red, hoa_dai_pink, qasr_blue, san_miguel_yellow, glass_garden_blue, royal_v2_purple, hoa_kho_orange, mahal_gold, nomad_brown, saraya_gold, qasr_gold, qasr_green, mandap_darkred, brocade_flower_red

*(57 mẫu = 88 trừ 15 DON trừ 16 DOI — danh sách suy ra, không liệt kê lặp lại từng mẫu từ log thô.)*

## Lưu ý cho việc dựng local

`BasicV2.tsx` ở local hiện **luôn hiện "Ảnh đầu thiệp"** (nhóm DON) cho mọi mẫu — tức 73 mẫu (DOI + KHONG_CO) đang sai so với trang thật: 16 mẫu cần đổi sang 2 ô ảnh riêng, 57 mẫu cần ẩn hẳn thẻ này. Cần thêm cờ `capabilities` kiểu `heroPhotoMode: "single" | "pair" | "none"` theo từng `templateId`, dùng danh sách trên làm số đo gốc.

## Phương pháp (để tái lặp đúng — KHÔNG dùng `?template=` trên URL)

```js
// Chạy trong tab /edit/<draftId> đã mở (có sẵn 1 thiệp nháp)
async function switchAndRead(name) { // name = "name" trong templates.ts, vd "Minimalism - Xanh"
  let h = [...document.querySelectorAll('h3,h2')].find(e => e.textContent.trim() === 'Đổi mẫu thiệp');
  if (!h) {
    document.getElementById('change-template-btn').click();
    await new Promise(r => setTimeout(r, 1000));
    h = [...document.querySelectorAll('h3,h2')].find(e => e.textContent.trim() === 'Đổi mẫu thiệp');
  }
  const img = [...document.querySelectorAll('img[alt]')].find(e => e.alt === name);
  const btn = img.closest('button') || img.parentElement;
  btn.click(); // bấm thật, đúng đường xử lý app dùng khi người dùng tự bấm
  await new Promise(r => setTimeout(r, 1800));
  const text = document.querySelector('main').innerText;
  const seg = (text.split('Danh xưng cô dâu')[1] || '').split('Thông tin gia đình')[0];
  if (/Ảnh đầu thiệp/.test(seg)) return 'don';
  if (/Ảnh đôi/.test(seg)) return 'doi';
  return 'khong_co';
}
```
