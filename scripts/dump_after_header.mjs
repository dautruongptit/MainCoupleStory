import fs from "fs";

const html = fs.readFileSync("docs/hoa_moc_xanh_real_opened_dom.html", "utf-8");
const headerEnd = html.indexOf("</header>");
console.log("Header end at:", headerEnd);

// Let's dump 3000 chars after header
console.log(html.slice(headerEnd, headerEnd + 3500));
