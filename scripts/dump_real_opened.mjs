import fs from "fs";

const real = JSON.parse(fs.readFileSync("docs/hoa_moc_xanh_real_opened_info.json", "utf-8"));
console.log("Audio src:", real.audioSrc);
console.log("Total sections:", real.sections.length);

for (const s of real.sections) {
  console.log("==========================================");
  console.log("Section ID:", s.id, "Tag:", s.tag, "Height:", s.rect.height);
  console.log("Headings:", s.headings);
  console.log("Images count:", s.imgCount);
  console.log("Text Snippet:\n", s.textSnippet.slice(0, 400));
}
