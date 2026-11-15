// Phân loại tệp ở scripts/ cấp 1: còn được nhắc tới (package.json, AGENTS.md, docs playbook/rules, script khác) hay không.
// Dùng: node scripts/tools/script-usage.mjs [--json]
import fs from "node:fs";
import path from "node:path";

const top = fs.readdirSync("scripts", { withFileTypes: true }).filter((e) => e.isFile()).map((e) => e.name);
const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])) : []);
const docSources = ["package.json", "AGENTS.md", ...["docs/clone-playbook.md", "docs/clone-rules.md", "docs/refactor-plan.md", "docs/clone-registry.md"].filter((f) => fs.existsSync(f))];
const docText = docSources.map((f) => fs.readFileSync(f, "utf8")).join("\n");
const subScripts = ["scripts/clone", "scripts/survey", "scripts/check", "scripts/tools"].flatMap(walk).filter((f) => /\.(m?js|cjs)$/.test(f));
const subText = subScripts.map((f) => fs.readFileSync(f, "utf8")).join("\n");

const rows = top.map((f) => {
  const inDocs = docText.includes(f);
  const inSub = subText.includes(f) || subText.includes(f.replace(/\.(m?js|cjs)$/, ""));
  const inTop = top.some((g) => g !== f && /\.(m?js|cjs)$/.test(g) && fs.readFileSync(path.join("scripts", g), "utf8").includes(f));
  return { f, inDocs, inSub, inTop, keep: inDocs || inSub };
});
if (process.argv.includes("--json")) console.log(JSON.stringify(rows));
else {
  for (const r of rows.filter((r) => r.keep)) console.log("GIỮ  ", r.f, r.inDocs ? "(tài liệu)" : "", r.inSub ? "(script đang dùng)" : "");
  console.log("--- lưu trữ:", rows.filter((r) => !r.keep).length, "tệp; trong đó được script cấp 1 khác nhắc:", rows.filter((r) => !r.keep && r.inTop).length);
}
