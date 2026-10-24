import fs from "fs";

const html = fs.readFileSync("docs/hoa_moc_xanh_real_opened_dom.html", "utf-8");

// Split sections by major tags
const matches = [...html.matchAll(/<(header|section|footer|div\s+data-landing-screenshot-id="[^"]+"|div\s+class="[^"]*boho[^"]*")[^>]*>/gi)];
console.log("Found major containers:");
matches.forEach(m => console.log(m[0]));
