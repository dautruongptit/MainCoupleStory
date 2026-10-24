import fs from "fs";

const html = fs.readFileSync("docs/hoa_moc_xanh_real_opened_dom.html", "utf-8");
const gbIdx = html.indexOf('invite-guestbook');
const gbEnd = html.indexOf('</section>', gbIdx);
const chunk = html.slice(gbIdx, gbEnd + 10);

fs.writeFileSync("docs/hoa_moc_xanh_guestbook_chunk.html", chunk);
console.log("Saved guestbook chunk, length:", chunk.length);
