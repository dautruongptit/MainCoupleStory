import fs from "fs";

// Let's parse each section from real HTML and see its background and images
const html = fs.readFileSync("docs/minimalism_do_dam_real_cover.html", "utf8");

// Print all sections in real HTML
const secRegex = /<section[^>]*>([\s\S]*?)<\/section>/gi;
let m;
let idx = 1;
while ((m = secRegex.exec(html)) !== null) {
  const content = m[1];
  const imgs = [...content.matchAll(/<img[^>]+src="([^">]+)"[^>]*>/gi)].map(x => x[1].split('/').pop());
  const bgs = [...content.matchAll(/style="[^"]*background[^"]*"/gi)].map(x => x[0]);
  console.log(`\n--- Real Section ${idx++} ---`);
  console.log("Images:", imgs);
  console.log("BGs:", bgs);
}
