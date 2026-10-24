import fs from "fs";
import path from "path";

function generateTree(dir, prefix = "") {
  let output = "";
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  // Filter out node_modules, dist, .git, .chrome_profile
  const filtered = entries.filter(e => {
    return !["node_modules", "dist", ".git", ".chrome_profile"].includes(e.name);
  }).sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  filtered.forEach((entry, idx) => {
    const isLast = idx === filtered.length - 1;
    const pointer = isLast ? "└── " : "├── ";
    const childPrefix = isLast ? "    " : "│   ";
    output += `${prefix}${pointer}${entry.name}\n`;

    if (entry.isDirectory()) {
      // Don't recurse too deep into public/images/photo-library or screenshots if too many files
      const fullPath = path.join(dir, entry.name);
      if (entry.name === "photo-library" || entry.name === "screenshots" || entry.name === "audit-screenshots" || entry.name === "compare-screenshots") {
        const subCount = fs.readdirSync(fullPath).length;
        output += `${prefix}${childPrefix}[... ${subCount} items ...]\n`;
      } else {
        output += generateTree(fullPath, prefix + childPrefix);
      }
    }
  });

  return output;
}

const tree = "MAINCOUPLESTORY / WEB (PROJECT ROOT)\n" + generateTree(".", "");

const explanation = `
================================================================================
CƠ CHẾ ÁNH XẠ (MAPPING) ẢNH VỚI MÃ MẪU THIỆP (SLUG):
- File cấu hình trung tâm:
  1. src/features/templates/data/templates.ts: Định nghĩa danh sách 75 mẫu thiệp, ánh xạ giữa "slug" (URL web) và "id" (mã kỹ thuật templateId), kèm đường dẫn ảnh thumbnail/full preview tại TPL_CDN.
  2. src/features/templates/data/themeManifest.ts: Quản lý TEMPLATE_MANIFESTS và TEMPLATE_THEME_FOLDERS, ánh xạ templateId sang thư mục theme (/images/themes/<folder>) và backgroundPath cho thân thiệp chính.
  3. src/features/invitation/components/covers/coverConfigs.ts: Quản lý COVER_CONFIGS ánh xạ templateId sang cấu hình bì thư mở thiệp, bao gồm ảnh họa tiết bì thư (imgs: [{src, className}]), màu nền bì thư (bg), và vị trí dấu sáp (sealTop, sealType).
- Các hàm truy xuất chính:
  - templateByIdOrSlug(slugOrId: string): Tìm kiếm và trả về đối tượng mẫu thiệp Tpl tương ứng trong templates.ts.
  - getThemeBackgroundUrl(templateId: string): Trích xuất đường dẫn ảnh nền thiệp chính m?.backgroundPath từ TEMPLATE_MANIFESTS trong themeManifest.ts.
  - getCoverComponent(templateId: string): Trả về component bì thư mở thiệp tương ứng (BaseCoverCard kết hợp cấu hình COVER_CONFIGS[templateId]) trong src/features/invitation/components/covers/index.ts.
================================================================================
`;

const finalContent = tree + "\n" + explanation;

fs.writeFileSync("docs/qa-review/handoff/folder_structure.txt", finalContent, "utf8");
fs.writeFileSync("docs/handoff/folder_structure.txt", finalContent, "utf8");

console.log("Successfully generated folder_structure.txt!");
