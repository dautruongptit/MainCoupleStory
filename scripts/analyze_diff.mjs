import fs from "fs";

const realCover = JSON.parse(fs.readFileSync("docs/hoa_moc_xanh_real_cover_info.json", "utf-8"));
const cloneCover = JSON.parse(fs.readFileSync("docs/hoa_moc_xanh_clone_cover_info.json", "utf-8"));
const realOpened = JSON.parse(fs.readFileSync("docs/hoa_moc_xanh_real_opened_info.json", "utf-8"));
const cloneOpened = JSON.parse(fs.readFileSync("docs/hoa_moc_xanh_clone_opened_info.json", "utf-8"));

console.log("=== COVER COMPARISON ===");
console.log("Real cover text count:", realCover.textElements.length);
console.log("Clone cover text count:", cloneCover.textElements.length);
console.log("\nReal cover texts:");
realCover.textElements.forEach(t => console.log(`  [${t.tag}] "${t.text}" - font: ${t.fontFamily}, size: ${t.fontSize}, color: ${t.color}`));

console.log("\nClone cover texts:");
cloneCover.textElements.forEach(t => console.log(`  [${t.tag}] "${t.text}" - font: ${t.fontFamily}, size: ${t.fontSize}, color: ${t.color}`));

console.log("\nReal cover buttons:");
realCover.buttons.forEach(b => console.log(`  "${b.text}" - rect:`, b.rect, "bg:", b.bg, "color:", b.color));

console.log("\nClone cover buttons:");
cloneCover.buttons.forEach(b => console.log(`  "${b.text}" - rect:`, b.rect, "bg:", b.bg, "color:", b.color));

console.log("\nReal cover images:");
realCover.images.forEach(i => console.log(`  src: ${i.src.split('/').pop()} rect:`, i.rect));

console.log("\nClone cover images:");
cloneCover.images.forEach(i => console.log(`  src: ${i.src.split('/').pop()} rect:`, i.rect));

console.log("\n=== OPENED COMPARISON ===");
console.log("Real totalHeight:", realOpened.totalHeight, "Clone totalHeight:", cloneOpened.totalHeight);
console.log("Real sections:", realOpened.sections.length, "Clone sections:", cloneOpened.sections.length);
console.log("Real audio:", realOpened.audioSrc, "Clone audio:", cloneOpened.audioSrc);

console.log("\nReal Sections:");
realOpened.sections.forEach((s, idx) => {
  console.log(`  ${idx + 1}. [${s.tag}] id: "${s.id}" height: ${s.rect.height} imgCount: ${s.imgCount}`);
  if (s.headings.length > 0) {
    console.log(`     headings:`, s.headings.map(h => `${h.tag}: ${h.text} (${h.font}, ${h.size})`).join(" | "));
  }
});

console.log("\nClone Sections:");
cloneOpened.sections.forEach((s, idx) => {
  console.log(`  ${idx + 1}. [${s.tag}] id: "${s.id}" height: ${s.rect.height} imgCount: ${s.imgCount}`);
  if (s.headings.length > 0) {
    console.log(`     headings:`, s.headings.map(h => `${h.tag}: ${h.text} (${h.font}, ${h.size})`).join(" | "));
  }
});
