import fs from "fs";

const html = fs.readFileSync("docs/hoa_moc_xanh_real_opened_dom.html", "utf-8");

console.log("HTML length:", html.length);

// Check if any external images or assets are used that might fail offline or on localhost
const srcs = [...html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
console.log("\nAll image sources in opened DOM:");
[...new Set(srcs)].forEach(s => console.log(" -", s));

// Check all links / buttons
const btns = [...html.matchAll(/<(button|a)[^>]*>(.*?)<\/\1>/gi)].map(m => m[0]);
console.log("\nTotal buttons/links:", btns.length);
btns.slice(0, 10).forEach(b => console.log(" -", b.replace(/<[^>]+>/g, " ").trim()));
