import fs from "fs";

const html = fs.readFileSync("docs/minimalism_do_dam_real_cover.html", "utf8");
["camera", "cook", "flower2-decoration", "castle-background", "paper"].forEach(k => {
  const matches = [...html.matchAll(new RegExp(`[^"'\\s<>]*${k}[^"'\\s<>]*`, "gi"))].map(x => x[0]);
  console.log(`${k}:`, [...new Set(matches)]);
});
