import fs from "node:fs";
import path from "node:path";

// 1. Scan src/ for assets.chungdoi.com
function scanDir(dir) {
  let results = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(scanDir(full));
    } else if (/\.(tsx?|jsx?|css|html)$/.test(item)) {
      const content = fs.readFileSync(full, "utf8");
      const matches = content.match(/https?:\/\/assets\.chungdoi\.com\/[^\s"'`)]+/g);
      if (matches) {
        matches.forEach((m) => results.push({ file: full, url: m }));
      }
    }
  }
  return results;
}

const srcMatches = scanDir("src");
console.log("Total matches in src/:", srcMatches.length);
const byFile = {};
srcMatches.forEach((m) => {
  byFile[m.file] = (byFile[m.file] || 0) + 1;
});
console.log("Matches by file:", byFile);

// 2. Scan docs/asset-audit/*.json
const auditDir = "docs/asset-audit";
const auditFiles = fs.readdirSync(auditDir).filter((f) => f.endsWith(".json") && f !== "local-mirror-plan.json");
console.log(`Found ${auditFiles.length} audit JSON files in ${auditDir}`);

const allUrls = new Set();
srcMatches.forEach((m) => allUrls.add(m.url));

let auditCount = 0;
for (const file of auditFiles) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(auditDir, file), "utf8"));
    const raw = JSON.stringify(data);
    const matches = raw.match(/https?:\/\/assets\.chungdoi\.com\/[^\s"'`)]+/g);
    if (matches) {
      matches.forEach((u) => {
        // Clean any trailing escaped characters or quotes
        const cleaned = u.replace(/\\+$/, "").replace(/[",']+$/, "");
        allUrls.add(cleaned);
        auditCount++;
      });
    }
  } catch (e) {
    console.error(`Error reading ${file}:`, e.message);
  }
}

console.log(`Total occurrences in audit JSONs: ${auditCount}`);
console.log(`Unique URLs across src/ and docs/asset-audit/: ${allUrls.size}`);

// Write inventory summary
const urlList = Array.from(allUrls).sort();
fs.writeFileSync("scripts/unique_urls.json", JSON.stringify(urlList, null, 2));
console.log("Wrote scripts/unique_urls.json");
