import fs from "fs";
import path from "path";

// 1. Read templates
const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
const TEMPLATES = tplMatches.map(m => ({ slug: m[1], id: m[2], name: m[3] }));

// 2. Read manifests
const manifestContent = fs.readFileSync("src/features/templates/data/themeManifest.ts", "utf8");
const coverConfigContent = fs.readFileSync("src/features/invitation/components/covers/coverConfigs.ts", "utf8");

const results = [];

for (const t of TEMPLATES) {
  const audit = {
    slug: t.slug,
    id: t.id,
    name: t.name,
    hasManifest: false,
    hasCoverConfig: false,
    backgroundPath: null,
    backgroundExists: false,
    missingAssets: [],
    issues: []
  };

  // Check Cover Config
  if (coverConfigContent.includes(`"${t.id}":`)) {
    audit.hasCoverConfig = true;
  } else {
    audit.issues.push(`Thiếu coverConfig cho id "${t.id}"`);
  }

  // Check Manifest
  const manifestMatch = manifestContent.match(new RegExp(`"${t.id}":\\s*\\{[\\s\\S]*?"backgroundPath":\\s*"([^"]+)"`));
  if (manifestMatch) {
    audit.hasManifest = true;
    audit.backgroundPath = manifestMatch[1];
    const localBgPath = path.join("public", audit.backgroundPath.replace(/^\//, ""));
    audit.backgroundExists = fs.existsSync(localBgPath);
    if (!audit.backgroundExists) {
      audit.issues.push(`Ảnh background không tồn tại trên đĩa: ${audit.backgroundPath}`);
    }
  } else {
    audit.issues.push(`Không tìm thấy backgroundPath trong themeManifest cho id "${t.id}"`);
  }

  results.push(audit);
}

fs.writeFileSync("docs/qa-review/all_75_asset_scan.json", JSON.stringify(results, null, 2));
console.log(`Scanned ${results.length} templates. Issues found: ${results.filter(r => r.issues.length > 0).length}`);
