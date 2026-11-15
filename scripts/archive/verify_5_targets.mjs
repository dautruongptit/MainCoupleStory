import fs from "fs";

const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
const targets = ["bach-su-do", "hoa-tinh-do", "song-long-do", "hoang-kim-lam", "chibi-red"];

targets.forEach((t) => {
  const f = tplMatches.find((m) => m[1] === t || m[2] === t);
  console.log(t, "->", f ? { slug: f[1], id: f[2], name: f[3] } : "NOT FOUND");
});
