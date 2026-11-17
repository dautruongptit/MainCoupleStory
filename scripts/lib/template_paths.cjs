// Đường dẫn của cấu trúc "mỗi mẫu một thư mục" (giai đoạn D2) cho các script:
//   src/features/invitation/templates/<id>/{meta,theme,capabilities,demo,cover,gift}.json
//   src/features/invitation/templates/<id>/blocks/     khối riêng của một mẫu (họ = capabilities.family của mẫu)
//   src/features/invitation/templates/_shared/<họ>/    khối dùng chung nhiều mẫu
//   src/features/invitation/shell/blocks/              khối nền "minimalism" + shared/
// Dùng từ .cjs: const { blocksDirOf } = require("../lib/template_paths.cjs");
// Dùng từ .mjs: import tp from "../lib/template_paths.cjs";
const fs = require("fs");
const path = require("path");

const TEMPLATES_DIR = "src/features/invitation/templates";
const BASE_BLOCKS_DIR = "src/features/invitation/shell/blocks";

/** id các mẫu (thư mục không bắt đầu bằng "_" và có capabilities.json). */
function templateIds(root = ".") {
  const dir = path.join(root, TEMPLATES_DIR);
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("_") && fs.existsSync(path.join(dir, e.name, "capabilities.json")))
    .map((e) => e.name).sort();
}
const familyOf = (id, root = ".") => JSON.parse(fs.readFileSync(path.join(root, TEMPLATES_DIR, id, "capabilities.json"), "utf8")).family;

/**
 * Thư mục khối của một họ (đường dẫn tương đối từ gốc repo, dấu "/").
 * Họ đã có thư mục → trả thư mục đó. Họ mới (chưa có thư mục): một mẫu dùng → templates/<id>/blocks,
 * nhiều mẫu dùng hoặc chưa mẫu nào khai báo → templates/_shared/<họ>.
 */
function blocksDirOf(family, root = ".") {
  if (family === "minimalism") return BASE_BLOCKS_DIR;
  const shared = `${TEMPLATES_DIR}/_shared/${family}`;
  if (fs.existsSync(path.join(root, shared))) return shared;
  const users = templateIds(root).filter((id) => familyOf(id, root) === family);
  const own = users.find((id) => fs.existsSync(path.join(root, TEMPLATES_DIR, id, "blocks")));
  if (own) return `${TEMPLATES_DIR}/${own}/blocks`;
  return users.length === 1 ? `${TEMPLATES_DIR}/${users[0]}/blocks` : shared;
}

/** Mọi thư mục khối hiện có: [{ family, dir }] (không gồm khối nền). */
function allBlockDirs(root = ".") {
  const out = [];
  const shared = path.join(root, TEMPLATES_DIR, "_shared");
  if (fs.existsSync(shared)) for (const e of fs.readdirSync(shared, { withFileTypes: true })) if (e.isDirectory()) out.push({ family: e.name, dir: `${TEMPLATES_DIR}/_shared/${e.name}` });
  for (const id of templateIds(root)) if (fs.existsSync(path.join(root, TEMPLATES_DIR, id, "blocks"))) out.push({ family: familyOf(id, root), dir: `${TEMPLATES_DIR}/${id}/blocks` });
  return out.sort((a, b) => a.family.localeCompare(b.family));
}

module.exports = { TEMPLATES_DIR, BASE_BLOCKS_DIR, templateIds, familyOf, blocksDirOf, allBlockDirs };
