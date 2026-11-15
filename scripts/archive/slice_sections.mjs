import fs from "fs";

const html = fs.readFileSync("docs/hoa_moc_xanh_real_opened_dom.html", "utf-8");

// Let's find positions of major h2 titles
const titles = [
  "THÔNG TIN LỄ&nbsp;CƯỚI",
  "Album Ảnh",
  "THÔNG TIN TIỆC&nbsp;CƯỚI",
  "TIỆC CƯỚI SẼ TỔ CHỨC&nbsp;TẠI",
  "DRESS CODE",
  "LỊCH TRÌNH NGÀY&nbsp;CƯỚI",
  "Sổ lưu bút",
  "Hộp Quà Mừng",
  "footer"
];

for (let i = 0; i < titles.length; i++) {
  const t = titles[i];
  const pos = html.indexOf(t);
  console.log(`\n================== [SECTION: ${t}] (pos: ${pos}) ==================`);
  if (pos !== -1) {
    const nextT = titles[i + 1];
    const nextPos = nextT ? html.indexOf(nextT) : html.length;
    const chunk = html.slice(pos, nextPos !== -1 ? nextPos : pos + 2000);
    console.log(chunk.slice(0, 1500));
  }
}
