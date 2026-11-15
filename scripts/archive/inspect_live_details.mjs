import fs from "fs";

const html = fs.readFileSync("docs/hoa-moc-xanh-live.html", "utf-8");

// Let's search for all section headings and structures in html
const headings = [...html.matchAll(/<(h[1-6])[^>]*>(.*?)<\/\1>/gi)];
console.log("Total headings in live html:", headings.length);
headings.forEach(h => {
  const clean = h[2].replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").trim();
  console.log(`[${h[1].toUpperCase()}] ${clean}`);
});

// Let's search for data-landing-screenshot-id
const landingIds = [...html.matchAll(/data-landing-screenshot-id="([^"]+)"/g)];
console.log("\nLanding Screenshot IDs:");
landingIds.forEach(id => console.log(" -", id[1]));

// Let's extract the photos used in the album
const albumPhotos = [...html.matchAll(/https:\/\/assets\.chungdoi\.com\/photo-library\/design\/[a-f0-9]+\.webp/g)];
const uniquePhotos = [...new Set(albumPhotos.map(m => m[0]))];
console.log("\nUnique album photos found:", uniquePhotos.length);
uniquePhotos.forEach(p => console.log(" -", p));

// Search for music
const music = [...html.matchAll(/https?:\/\/[^"'\s]+\.mp3/g)];
console.log("\nMusic files found:", [...new Set(music.map(m => m[0]))]);
