import fs from "fs";

const html = fs.readFileSync("docs/minimalism_do_dam_real_cover.html", "utf8");

// Find all background styles and images
const bgs = [...html.matchAll(/style="[^"]*background[^"]*"/gi)].map(m => m[0]);
console.log("All styles with background in real HTML:");
bgs.forEach((b, i) => console.log(i + 1, b));

const allImgs = [...html.matchAll(/<img[^>]+>/gi)].map(m => m[0]);
console.log("\nAll <img> tags in real HTML (first 10):");
allImgs.slice(0, 10).forEach((img, i) => console.log(i + 1, img));
