import fs from "fs";
import path from "path";
import crypto from "crypto";

const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
const TEMPLATES = tplMatches.map(m => ({ slug: m[1], id: m[2], name: m[3] }));

const scan75 = JSON.parse(fs.readFileSync("docs/qa-review/all_75_asset_scan.json", "utf8"));
const scanMap = new Map(scan75.map(x => [x.slug, x]));

const report = [];

for (const t of TEMPLATES) {
  const auditPath = path.join("docs", "asset-audit", `${t.slug}.json`);
  let audit = null;
  if (fs.existsSync(auditPath)) {
    audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));
  }

  const scan = scanMap.get(t.slug);
  const localBg = scan ? scan.backgroundPath : null;

  let localBgSha = null;
  let localBgSize = 0;
  let localBgExists = false;

  if (localBg) {
    const fullP = path.join("public", localBg.startsWith("/") ? localBg.slice(1) : localBg);
    if (fs.existsSync(fullP)) {
      localBgExists = true;
      const buf = fs.readFileSync(fullP);
      localBgSize = buf.length;
      localBgSha = crypto.createHash("sha256").update(buf).digest("hex");
    }
  }

  // Web gốc bg from audit
  const webGocBgs = audit ? audit.cssBackgrounds || [] : [];
  const webGocBg = webGocBgs.length > 0 ? webGocBgs[0] : null;

  // Compare background
  let bgStatus = "Chưa kiểm tra";
  let bgDiffPercent = null;
  let remoteBgSha = null;

  if (!webGocBg) {
    if (localBg) {
      bgStatus = "Thừa ảnh local (Web gốc dùng màu CSS thuần, localhost thêm ảnh bg)";
      bgDiffPercent = 100;
    } else {
      bgStatus = "Khớp (Cả hai đều dùng màu CSS thuần)";
      bgDiffPercent = 0;
    }
  } else {
    // Web gốc has background image
    if (webGocBg === localBg) {
      bgStatus = "Đúng mapping URL";
    } else {
      bgStatus = `Khác mapping (Web: ${webGocBg} vs Local: ${localBg})`;
    }
  }

  // Count assets in stages
  const envelopeAssets = audit ? (audit.stages.envelope || []) : [];
  const openedAssets = audit ? (audit.stages.opened || []) : [];
  const allAuditAssets = Array.from(new Set([...envelopeAssets, ...openedAssets]));

  // Check how many of these exist locally and compute SHA
  let matchedAssets = 0;
  let missingAssets = 0;

  allAuditAssets.forEach(url => {
    let localFile = null;
    if (url.startsWith("/images/")) {
      localFile = path.join("public", url.slice(1));
    } else if (url.includes("assets.chungdoi.com")) {
      const filename = path.basename(url);
      if (url.includes("photo-library")) {
        localFile = path.join("public", "images", "photo-library", "design", filename);
      }
    }
    if (localFile && fs.existsSync(localFile)) {
      matchedAssets++;
    } else {
      missingAssets++;
    }
  });

  report.push({
    slug: t.slug,
    name: t.name,
    webGocBg,
    localBg,
    localBgSha,
    localBgExists,
    bgStatus,
    bgDiffPercent,
    totalAuditAssets: allAuditAssets.length,
    matchedAssets,
    missingAssets
  });
}

console.log(`Generated image analysis for ${report.length} templates.`);
console.log("Summary of bgStatus counts:");
const counts = {};
report.forEach(r => { counts[r.bgStatus] = (counts[r.bgStatus] || 0) + 1; });
console.log(counts);

fs.writeFileSync("docs/qa-review/image_analysis_summary.json", JSON.stringify(report, null, 2));
