// Sổ đăng ký clone: quét toàn bộ mẫu, ghi lại file nào đã clone (đường dẫn + sha256), trạng thái từng mẫu,
// và so với lần chạy trước để biết file nào mới / đổi / mất.
//   node scripts/clone/registry.mjs            quét, ghi docs/clone-registry.{json,md}, in thay đổi
//   node scripts/clone/registry.mjs --check    chỉ so với bản đã lưu, không ghi (thoát mã 1 nếu có thay đổi)
//   node scripts/clone/registry.mjs --note <id> "ghi chú"   thêm ghi chú tay cho một mẫu
// Phần "tay" (verified, notes) được giữ nguyên giữa các lần chạy.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import tp from "../lib/template_paths.cjs";

const ROOT = process.cwd();
const J = (...p) => path.join(ROOT, ...p);
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");
const REG_JSON = J("docs/clone-registry.json");
const REG_MD = J("docs/clone-registry.md");
const SPECS = J("src/features/invitation/templates");
const blocksDir = (family) => J(tp.blocksDirOf(family, ROOT)); // templates/<id>/blocks | templates/_shared/<họ> | shell/blocks (minimalism)
const THEMES = J("public/images/themes");
const coverFile = (id) => path.join(SPECS, id, "cover.json");

const sha = (buf) => crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16);
const fileInfo = (p) => {
  const b = fs.readFileSync(p);
  return { path: rel(p), size: b.length, sha: sha(b) };
};
const listFiles = (dir, filter = () => true) => {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (filter(p)) out.push(fileInfo(p));
    }
  };
  walk(dir);
  return out.sort((a, b) => a.path.localeCompare(b.path));
};
const readJson = (p) => { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return null; } };

// ---- danh sách mẫu (kho mẫu local = đúng thứ tự trang gốc)
const tplSrc = fs.readFileSync(J("src/features/templates/data/templates.generated.ts"), "utf8");
const templates = tplSrc.split("\n").filter((l) => l.startsWith('  {"slug"')).map((l) => JSON.parse(l.trim().replace(/,$/, "")));

// ---- generator → họ khối
const genDir = J("scripts/clone");
const generators = {};
for (const f of fs.readdirSync(genDir).filter((x) => /^gen_.*\.cjs$/.test(x))) {
  const m = /const OUT = blocksDirOf\("([^"]+)"\)/.exec(fs.readFileSync(path.join(genDir, f), "utf8"));
  if (m) generators[m[1]] = `scripts/clone/${f}`;
}

// ---- cover config
// cấu hình bìa của mẫu: specs/<id>/cover.json (trước đây là một mục trong coverConfigs.ts)
const coverEntry = (id) => {
  const f = coverFile(id);
  return fs.existsSync(f) ? fs.readFileSync(f, "utf8").split("\r\n").join("\n") : null;
};

// ---- bản đã lưu
const prev = readJson(REG_JSON);
const prevById = Object.fromEntries((prev?.templates ?? []).map((t) => [t.id, t]));
const args = process.argv.slice(2);

if (args[0] === "--note") {
  const [, id, ...txt] = args;
  if (!prev || !prevById[id]) { console.error("chưa có mẫu", id, "trong sổ"); process.exit(2); }
  prevById[id].notes = txt.join(" ");
  fs.writeFileSync(REG_JSON, JSON.stringify(prev, null, 1) + "\n");
  console.log("đã ghi chú cho", id);
  process.exit(0);
}

const isPlaceholderTheme = (theme) => !theme || (theme.colors?.ink === "rgb(0, 0, 0)" && theme.colors?.paper === "#ffffff");

const entries = templates.map((t, index) => {
  const specDir = path.join(SPECS, t.id);
  const hasSpec = fs.existsSync(specDir);
  const theme = readJson(path.join(specDir, "theme.json"));
  const caps = readJson(path.join(specDir, "capabilities.json"));
  const family = caps?.family ?? null;
  const blockDir = family && family !== "minimalism" && fs.existsSync(blocksDir(family)) ? blocksDir(family) : null;
  const assetsDir = theme?.assets ? J("public", theme.assets.replace(/^\//, "")) : null;
  const cover = coverEntry(t.id);
  const envelope = J("public/images/envelope", `${t.id}.webp`);
  const surveyBlocks = J("docs/survey/blocks", t.id);
  const raws = fs.existsSync(J("docs/survey/raw")) ? fs.readdirSync(J("docs/survey/raw")).filter((f) => f.startsWith(t.id + "_") || f.startsWith(t.slug.replace(/-/g, "_") + "_")) : [];
  const files = {
    spec: listFiles(specDir),
    blocks: blockDir ? listFiles(blockDir) : [],
    themeAssets: assetsDir ? listFiles(assetsDir) : [],
    envelope: fs.existsSync(envelope) ? [fileInfo(envelope)] : [],
    survey: [...listFiles(surveyBlocks), ...raws.map((f) => fileInfo(J("docs/survey/raw", f)))],
  };
  const coverInfo = cover ? { file: rel(coverFile(t.id)), key: t.id, sha: sha(Buffer.from(cover)) } : null;

  let status;
  const issues = [];
  if (hasSpec && isPlaceholderTheme(theme)) issues.push("theme.json còn màu mặc định (chưa đo)");
  if (hasSpec && !cover) issues.push("thiếu cấu hình bìa specs/<id>/cover.json");
  if (!hasSpec) status = "chưa clone";
  else if (issues.length) status = "dở dang";
  else status = "đã clone";

  const old = prevById[t.id];
  return {
    order: index + 1,
    id: t.id,
    slug: t.slug,
    name: t.name,
    source: `https://chungdoi.com/vi/mau-thiep/${t.slug}/demo`,
    status,
    issues,
    family,
    sharedBlocks: hasSpec && !blockDir,
    generator: family ? generators[family] ?? null : null,
    themeAssetsDir: assetsDir ? rel(assetsDir) : null,
    cover: coverInfo,
    files,
    verified: old?.verified ?? { cover: false, opened: false, gift: false, rsvp: false, editor: false, geometryDiff0: false },
    notes: old?.notes ?? "",
    clonedAt: old?.clonedAt ?? (status === "chưa clone" ? null : new Date().toISOString().slice(0, 10)),
  };
});

// ---- so sánh với lần trước
const flat = (e) => {
  const m = {};
  for (const [k, arr] of Object.entries(e.files)) for (const f of arr) m[f.path] = f.sha;
  if (e.cover) m[`${e.cover.file}#${e.cover.key}`] = e.cover.sha;
  return m;
};
const changes = [];
for (const e of entries) {
  const o = prevById[e.id];
  if (!o) { if (e.status !== "chưa clone") changes.push({ id: e.id, kind: "mẫu mới vào sổ", detail: e.status }); continue; }
  if (o.status !== e.status) changes.push({ id: e.id, kind: "đổi trạng thái", detail: `${o.status} → ${e.status}` });
  const a = flat(o), b = flat(e);
  const added = Object.keys(b).filter((k) => !(k in a));
  const removed = Object.keys(a).filter((k) => !(k in b));
  const changed = Object.keys(b).filter((k) => k in a && a[k] !== b[k]);
  if (added.length) changes.push({ id: e.id, kind: "file mới", detail: added });
  if (changed.length) changes.push({ id: e.id, kind: "file đã cập nhật", detail: changed });
  if (removed.length) changes.push({ id: e.id, kind: "file mất", detail: removed });
}

const print = () => {
  if (!changes.length) { console.log("Không có thay đổi so với sổ đã lưu."); return; }
  for (const c of changes) {
    console.log(`- ${c.id}: ${c.kind}`);
    if (Array.isArray(c.detail)) for (const d of c.detail.slice(0, 30)) console.log(`    ${d}`);
    else console.log(`    ${c.detail}`);
  }
};

if (args[0] === "--check") { print(); process.exit(changes.length ? 1 : 0); }

// ---- ghi JSON
const now = new Date().toISOString();
const history = [...(prev?.history ?? []), { at: now, changes: changes.length, summary: changes.slice(0, 50).map((c) => `${c.id}: ${c.kind}`) }].slice(-20);
const counts = (s) => entries.filter((e) => e.status === s).length;
const registry = {
  _doc: "Sổ đăng ký clone. Sinh bởi scripts/clone/registry.mjs — đừng sửa tay trừ trường verified/notes.",
  generatedAt: now,
  totals: { templates: entries.length, "đã clone": counts("đã clone"), "dở dang": counts("dở dang"), "chưa clone": counts("chưa clone") },
  history,
  templates: entries,
};
fs.writeFileSync(REG_JSON, JSON.stringify(registry, null, 1) + "\n");

// ---- ghi Markdown
const L = [];
const icon = { "đã clone": "✅", "dở dang": "🟡", "chưa clone": "⬜" };
L.push("# Sổ đăng ký clone mẫu thiệp", "");
L.push("> Sinh tự động bởi `node scripts/clone/registry.mjs` — **chạy lại sau mỗi lần clone/sửa mẫu rồi commit cùng**. Chi tiết máy đọc (hash từng file): `docs/clone-registry.json`.", "");
L.push(`Cập nhật: ${now.slice(0, 10)} · Tổng **${entries.length}** mẫu: ✅ đã clone **${counts("đã clone")}** · 🟡 dở dang **${counts("dở dang")}** · ⬜ chưa clone **${counts("chưa clone")}**`, "");
L.push("## Ý nghĩa trạng thái", "");
L.push("- ✅ **đã clone**: có `specs/<id>/` (theme đã đo thật, không còn màu đen/trắng mặc định) và có `specs/<id>/cover.json`.");
L.push("- 🟡 **dở dang**: có spec nhưng theme còn mặc định hoặc thiếu cấu hình bìa.");
L.push("- ⬜ **chưa clone**: chưa có spec — đang chạy đường `Preview.tsx` cũ (lệch lớn so với gốc).");
L.push("- Cột **Đã kiểm** là ô tích tay trong JSON (`verified`): bìa / mở thiệp / hộp quà / RSVP / editor / lệch hình học = 0. `clone` ≠ đã kiểm đủ.", "");
L.push("## Quy trình đồng bộ lại toàn bộ mẫu", "");
L.push("1. `node scripts/clone/registry.mjs --check` — so sổ đã lưu với code hiện tại (file nào mới / đã cập nhật / mất).");
L.push("2. Lọc mẫu ⬜ và 🟡 trong bảng dưới → clone theo `docs/playbook/clone-playbook.md`.");
L.push("3. Mẫu ✅: đo lại trang gốc, so với hash trong JSON để biết file nào thay đổi (ảnh theme mới tải về có hash khác → đã cập nhật).");
L.push("4. Mỗi lần clone: lưu ảnh vào `public/images/themes/<thư mục theo tên gốc>/`, ảnh phong bì vào `public/images/envelope/<id>.webp`, HTML thô vào `docs/survey/raw/<id>_*.json`, khối tách vào `docs/survey/blocks/<id>/`; sau đó chạy lại registry và commit.");
L.push("5. Ảnh xem trước `public/images/template-previews/` bị gitignore (bản quyền, chỉ localhost) nên **không** nằm trong sổ; tải lại bằng script khi cần.", "");

L.push("## Bảng tổng hợp", "");
L.push("| # | | id | slug | Tên | Họ khối | Ảnh theme | Phong bì | Generator | Đã kiểm | Còn thiếu |");
L.push("|--:|:-:|---|---|---|---|--:|:-:|---|---|---|");
const v = (e) => { const x = e.verified; const n = Object.values(x).filter(Boolean).length; return n ? `${n}/6` : "—"; };
for (const e of entries) {
  L.push(`| ${e.order} | ${icon[e.status]} | \`${e.id}\` | ${e.slug} | ${e.name} | ${e.family ?? "—"}${e.sharedBlocks ? " (khối chung)" : ""} | ${e.files.themeAssets.length || "—"} | ${e.files.envelope.length ? "✓" : "—"} | ${e.generator ? "`" + path.basename(e.generator) + "`" : "—"} | ${v(e)} | ${(e.issues ?? []).map((x) => x.startsWith("theme") ? "theme" : "bìa").join(", ") || "—"} |`);
}
L.push("");

L.push("## Chi tiết file theo mẫu", "");
L.push("Chỉ liệt kê mẫu đã có spec. Hash (16 ký tự đầu sha256) nằm trong JSON.", "");
for (const e of entries.filter((x) => x.status !== "chưa clone")) {
  L.push(`<details><summary>${icon[e.status]} <b>${e.name}</b> — <code>${e.id}</code></summary>`, "");
  L.push(`- Nguồn: ${e.source}`);
  if (e.family) L.push(`- Họ khối: \`${e.family}\`${e.sharedBlocks ? " (dùng khối chung, không có thư mục riêng)" : ""}`);
  if (e.generator) L.push(`- Bộ sinh: \`${e.generator}\``);
  if (e.cover) L.push(`- Bìa: \`${e.cover.file}\` → khóa \`${e.cover.key}\``);
  if (e.themeAssetsDir) L.push(`- Thư mục ảnh theme: \`${e.themeAssetsDir}/\` (${e.files.themeAssets.length} file)`);
  if (e.issues?.length) L.push(`- Còn thiếu: ${e.issues.join("; ")}`);
  if (e.notes) L.push(`- Ghi chú: ${e.notes}`);
  const sec = [["Spec", e.files.spec], ["Khối", e.files.blocks], ["Ảnh theme", e.files.themeAssets], ["Phong bì", e.files.envelope], ["Dữ liệu khảo sát", e.files.survey]];
  for (const [title, arr] of sec) {
    if (!arr.length) continue;
    L.push("", `**${title}** (${arr.length})`, "");
    for (const f of arr) L.push(`- \`${f.path}\``);
  }
  L.push("", "</details>", "");
}

L.push("## Thay đổi ở lần quét gần nhất", "");
if (!changes.length) L.push("_Không có thay đổi so với lần quét trước._");
else for (const c of changes) {
  L.push(`- **${c.id}** — ${c.kind}`);
  if (Array.isArray(c.detail)) for (const d of c.detail.slice(0, 40)) L.push(`  - \`${d}\``);
  else L.push(`  - ${c.detail}`);
}
L.push("", "## Lịch sử các lần quét", "");
for (const h of history.slice().reverse()) L.push(`- ${h.at.slice(0, 16).replace("T", " ")} — ${h.changes} thay đổi${h.summary.length ? ": " + h.summary.slice(0, 6).join("; ") + (h.summary.length > 6 ? "…" : "") : ""}`);
L.push("");
fs.writeFileSync(REG_MD, L.join("\n"));

console.log(`Đã ghi docs/clone-registry.json + .md — ✅ ${counts("đã clone")} · 🟡 ${counts("dở dang")} · ⬜ ${counts("chưa clone")}`);
print();
