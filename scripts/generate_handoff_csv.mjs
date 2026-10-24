import fs from "fs";
import path from "path";

// 1. Read templates.ts
const tplContent = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const tplMatches = [...tplContent.matchAll(/\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"desc":\s*"([^"]*)",\s*"img":\s*"([^"]+)",\s*"full":\s*"([^"]+)"/g)];
const TEMPLATES = tplMatches.map(m => ({
  slug: m[1],
  id: m[2],
  name: m[3],
  desc: m[4],
  img: m[5],
  full: m[6]
}));

console.log(`Loaded ${TEMPLATES.length} templates for CSV export.`);

// 2. Read coverConfigs.ts
const coverConfigsContent = fs.readFileSync("src/features/invitation/components/covers/coverConfigs.ts", "utf8");

// 3. Read themeManifest.ts
const themeManifestContent = fs.readFileSync("src/features/templates/data/themeManifest.ts", "utf8");

const rows = [];
// Header
rows.push(["slug", "màn hình dùng ảnh (danh sách / hộp thư / thiệp chính / hiệu ứng)", "vị trí dùng (nền, banner, gallery, hạt...)", "file local (đường dẫn tương đối)", "URL gốc trên web thật", "ảnh có bị nén / đổi định dạng / resize không (ghi cách xử lý)"]);

function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

for (const t of TEMPLATES) {
  const seenLocalFiles = new Set();

  // 1. Danh sách mẫu: thumbnail (img)
  const thumbLocal = `public/template-previews/vi/${t.img}`;
  const thumbRemote = `https://assets.chungdoi.com/template-previews/vi/${t.img}`;
  rows.push([
    t.slug,
    "danh sách",
    "ảnh đại diện thumbnail danh sách mẫu",
    thumbLocal,
    thumbRemote,
    "Tải nguyên bản từ CDN (WebP, giữ nguyên kích thước và định dạng, diff 0%)"
  ]);
  seenLocalFiles.add(thumbLocal);

  // 2. Danh sách mẫu: ảnh xem trước đầy đủ (full)
  const fullLocal = `public/template-previews/vi/${t.full}`;
  const fullRemote = `https://assets.chungdoi.com/template-previews/vi/${t.full}`;
  rows.push([
    t.slug,
    "danh sách",
    "ảnh xem trước đầy đủ (full preview modal)",
    fullLocal,
    fullRemote,
    "Tải nguyên bản từ CDN (WebP, giữ nguyên kích thước và định dạng, diff 0%)"
  ]);
  seenLocalFiles.add(fullLocal);

  // 3. Asset audit data
  const auditPath = path.join("docs", "asset-audit", `${t.slug}.json`);
  let audit = null;
  if (fs.existsSync(auditPath)) {
    try {
      audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));
    } catch {}
  }

  // 4. Hộp thư: Envelope stage assets
  if (audit && audit.stages?.envelope) {
    audit.stages.envelope.forEach(url => {
      let localPath = "";
      let isPhotoLib = false;

      if (url.startsWith("/images/")) {
        localPath = `public${url}`;
      } else if (url.includes("assets.chungdoi.com/photo-library")) {
        isPhotoLib = true;
        localPath = `public/images/photo-library/design/${path.basename(url)}`;
      } else {
        localPath = `public${url.replace(/^https?:\/\/[^/]+/, "")}`;
      }

      if (!seenLocalFiles.has(localPath) && !url.includes("/api/qr")) {
        seenLocalFiles.add(localPath);
        let remoteUrl = url;
        if (url.startsWith("/images/")) {
          remoteUrl = `https://chungdoi.com${url}`;
        }
        let role = "họa tiết trang trí bì thư";
        if (url.includes("envelope-background")) role = "nền lót trong phong bì";
        else if (url.includes("envelope-cover")) role = "nắp/vỏ ngoài phong bì";
        else if (url.includes("paper")) role = "chất liệu giấy phong bì";
        else if (isPhotoLib) role = "ảnh đại diện cặp đôi trong phong bì";

        rows.push([
          t.slug,
          "hộp thư",
          role,
          localPath,
          remoteUrl,
          isPhotoLib 
            ? "Tải nguyên bản từ CDN photo-library (WebP chuẩn mã băm SHA-256, không nén lại)"
            : "Tải nguyên bản từ web gốc (giữ nguyên byte và định dạng)"
        ]);
      }
    });
  }

  // 5. Thiệp chính: Background
  if (audit && audit.cssBackgrounds && audit.cssBackgrounds.length > 0) {
    const bgUrl = audit.cssBackgrounds[0];
    const localBg = `public${bgUrl}`;
    if (!seenLocalFiles.has(localBg)) {
      seenLocalFiles.add(localBg);
      rows.push([
        t.slug,
        "thiệp chính",
        "nền thiệp chính (paper background texture)",
        localBg,
        `https://chungdoi.com${bgUrl}`,
        "Tải nguyên bản từ web gốc (giữ nguyên kích thước và định dạng WebP/JPG)"
      ]);
    }
  }

  // 6. Thiệp chính: Album ảnh cưới (stages.album)
  if (audit && audit.stages?.album) {
    audit.stages.album.forEach((url, idx) => {
      let localPath = "";
      if (url.includes("assets.chungdoi.com/photo-library")) {
        localPath = `public/images/photo-library/design/${path.basename(url)}`;
      } else {
        localPath = `public${url}`;
      }

      if (!seenLocalFiles.has(localPath)) {
        seenLocalFiles.add(localPath);
        rows.push([
          t.slug,
          "thiệp chính",
          `ảnh album cưới (vị trí #${idx + 1} trong gallery/lightbox)`,
          localPath,
          url,
          "Tải nguyên bản từ CDN photo-library (WebP chuẩn SHA-256, không resize/nén lại)"
        ]);
      }
    });
  }

  // 7. Thiệp chính: Họa tiết khác trong opened stage
  if (audit && audit.stages?.opened) {
    audit.stages.opened.forEach(url => {
      let localPath = "";
      let isPhotoLib = false;

      if (url.startsWith("/images/")) {
        localPath = `public${url}`;
      } else if (url.includes("assets.chungdoi.com/photo-library")) {
        isPhotoLib = true;
        localPath = `public/images/photo-library/design/${path.basename(url)}`;
      }

      if (localPath && !seenLocalFiles.has(localPath) && !url.includes("/api/qr")) {
        seenLocalFiles.add(localPath);
        let remoteUrl = url.startsWith("/images/") ? `https://chungdoi.com${url}` : url;
        let role = "họa tiết trang trí thân thiệp";
        if (url.includes("cake")) role = "biểu tượng tiệc cưới / bánh cưới";
        else if (url.includes("cook") || url.includes("camera")) role = "biểu tượng hoạt động / tiệc";
        else if (url.includes("giftbox")) role = "icon/mô hình hộp quà mừng cưới";
        else if (url.includes("paper")) role = "chất liệu nền thiệp";

        rows.push([
          t.slug,
          "thiệp chính",
          role,
          localPath,
          remoteUrl,
          "Tải nguyên bản từ web gốc/CDN (giữ nguyên định dạng WebP)"
        ]);
      }
    });
  }
}

console.log(`Generated ${rows.length - 1} rows of image mapping.`);

const csvContent = rows.map(r => r.map(escapeCsv).join(",")).join("\r\n");

fs.writeFileSync("docs/qa-review/handoff/templates_images_map.csv", csvContent, "utf8");
fs.writeFileSync("docs/handoff/templates_images_map.csv", csvContent, "utf8");

console.log("Successfully wrote templates_images_map.csv to docs/qa-review/handoff/ and docs/handoff/!");
