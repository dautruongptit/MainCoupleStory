import fs from "fs";

const html = fs.readFileSync("docs/hoa_moc_xanh_real_opened_dom.html", "utf-8");
const headerEnd = html.indexOf("</header>");
console.log(html.slice(2500, headerEnd + 10));
