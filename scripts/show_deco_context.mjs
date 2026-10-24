import fs from "fs";

const html = fs.readFileSync("docs/minimalism_do_dam_real_cover.html", "utf8");

function showContext(keyword) {
  let idx = 0;
  while ((idx = html.indexOf(keyword, idx)) !== -1) {
    const start = Math.max(0, idx - 150);
    const end = Math.min(html.length, idx + keyword.length + 150);
    console.log(`\n=== Context for ${keyword} at index ${idx} ===`);
    console.log(html.slice(start, end));
    idx += keyword.length;
  }
}

showContext("camera.webp");
showContext("cook.webp");
showContext("flower2-decoration.webp");
