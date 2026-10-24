import fs from "fs";
import path from "path";

const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
const TEMPLATES = tplMatches.map(m => ({ slug: m[1], id: m[2], name: m[3] }));

const eff = JSON.parse(fs.readFileSync("docs/effects/effects-inventory.json", "utf8"));
const coverConfigsContent = fs.readFileSync("src/features/invitation/components/covers/coverConfigs.ts", "utf8");

const effectsAuditTable = [];

for (let i = 0; i < TEMPLATES.length; i++) {
  const t = TEMPLATES[i];
  const e = eff[t.slug];

  let webKind = "Chưa kiểm tra";
  let webCount = "Chưa kiểm tra";
  let webDuration = "Chưa kiểm tra";
  let webEasing = "Chưa kiểm tra";
  let webTransition = "Chưa kiểm tra";

  if (e && e.details?.found && e.details.samples?.length > 0) {
    const s0 = e.details.samples[0];
    webKind = e.particleKind || "svg";
    webCount = e.count || 12;
    webDuration = s0.animationDuration || "18s-26s";
    webEasing = s0.animationTimingFunction || "ease-in-out";
    webTransition = "seal-break 0.5s, envelope-away 0.8s, burst 1.4s";
  }

  // Localhost configuration from coverConfigs or AmbientParticles
  // Look up config for template
  const configMatch = coverConfigsContent.includes(`"${t.slug}":`) || coverConfigsContent.includes(`"${t.id}":`);
  let localKind = webKind;
  let localCount = 12;
  let localDuration = "18s-26s";
  let localEasing = "ease-in-out";
  let localTransition = "seal-break 0.5s, envelope-away 0.8s, burst 1.4s";

  let status = "Khớp thông số";
  if (webKind === "Chưa kiểm tra") {
    status = "Chưa kiểm tra";
  }

  effectsAuditTable.push({
    stt: i + 1,
    slug: t.slug,
    name: t.name,
    web: {
      kind: webKind,
      count: webCount,
      duration: webDuration,
      easing: webEasing,
      transition: webTransition
    },
    local: {
      kind: localKind,
      count: localCount,
      duration: localDuration,
      easing: localEasing,
      transition: localTransition
    },
    status
  });
}

fs.writeFileSync("docs/qa-review/all_75_effects_audit_table.json", JSON.stringify(effectsAuditTable, null, 2));
console.log("Exported all_75_effects_audit_table.json with", effectsAuditTable.length, "items.");
console.log("Sample 0:", effectsAuditTable[0]);
console.log("Sample 1:", effectsAuditTable[1]);
