import fs from "fs";

const html = fs.readFileSync("docs/hoa_moc_xanh_real_opened_dom.html", "utf-8");

// Look for data-landing-screenshot-id or sections
const sections = [...html.matchAll(/data-landing-screenshot-id="([^"]+)"/g)];
console.log("Sections with data-landing-screenshot-id:", sections.map(s => s[1]));

// Look for headings
const headings = [...html.matchAll(/<(h[1-6])[^>]*style="([^"]*)"[^>]*>(.*?)<\/\1>/gi)];
console.log("\nHeadings found:");
headings.forEach(h => {
  console.log(`[${h[1]}] ${h[3].replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").trim()} | style: ${h[2]}`);
});

// Look for decoration bars or images
const images = [...html.matchAll(/<img[^>]+src="([^">]+)"[^>]*>/gi)];
console.log("\nImages found in opened DOM:", images.length);
const imageSrcs = [...new Set(images.map(i => i[1]))];
imageSrcs.forEach(s => console.log(" -", s));

// Look for fonts referenced in inline styles
const fontMatches = [...html.matchAll(/font-family:([^;"]+)/gi)];
const uniqueFonts = [...new Set(fontMatches.map(m => m[1].trim()))];
console.log("\nFonts in inline styles:", uniqueFonts);

// Look for background colors or images
const bgMatches = [...html.matchAll(/background(?:-color)?:([^;"]+)/gi)];
const uniqueBgs = [...new Set(bgMatches.map(m => m[1].trim()))];
console.log("\nBackgrounds in inline styles:", uniqueBgs.slice(0, 15));
