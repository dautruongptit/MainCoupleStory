import fs from "fs";

const html = fs.readFileSync("docs/hoa_moc_xanh_real_opened_dom.html", "utf-8");

// Print the beginning of opened DOM up to 5000 chars
console.log("=== TOP OF OPENED DOM ===");
console.log(html.slice(0, 3000));
