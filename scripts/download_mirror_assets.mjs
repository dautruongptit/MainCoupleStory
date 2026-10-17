import fs from "node:fs";
import path from "node:path";

function isMagicValid(buf, ext) {
  if (buf.length < 12) return false;
  // WebP
  if (buf.slice(0, 4).toString() === "RIFF" && buf.slice(8, 12).toString() === "WEBP") return true;
  // PNG
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true;
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return true;
  // MP3 / Audio
  if (buf.slice(0, 3).toString() === "ID3" || (buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0)) return true;
  // SVG
  const sample = buf.slice(0, 100).toString().toLowerCase();
  if (sample.includes("<svg") || sample.includes("<?xml")) return true;
  return false;
}

const planPath = "docs/asset-audit/local-mirror-plan.json";
const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));

console.log(`Loaded mirror plan with ${plan.length} items.`);

let alreadyExists = 0;
let downloaded = 0;
let failed = 0;
let cfBlocks = 0;

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  "Referer": "https://chungdoi.com/",
  "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
};

for (let i = 0; i < plan.length; i++) {
  const item = plan[i];
  const targetPath = item.targetFile;
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Check if file already exists and is valid
  if (fs.existsSync(targetPath)) {
    try {
      const existingBuf = fs.readFileSync(targetPath);
      if (isMagicValid(existingBuf, path.extname(targetPath))) {
        item.existsLocally = true;
        item.localPath = "/" + path.relative("public", targetPath).replace(/\\/g, "/");
        alreadyExists++;
        continue;
      }
    } catch {}
  }

  // Download file
  console.log(`[${i + 1}/${plan.length}] Downloading ${item.url}...`);
  try {
    const res = await fetch(item.url, { headers });
    if (!res.ok) {
      console.warn(`  -> HTTP ${res.status} ${res.statusText}`);
      if (res.status === 403 || res.status === 503) {
        cfBlocks++;
        if (cfBlocks >= 3) {
          console.error("Cloudflare blocked 3 consecutive requests! Stopping download as required.");
          item.error = `Cloudflare blocked (HTTP ${res.status})`;
          failed++;
          break;
        }
      } else {
        cfBlocks = 0;
      }
      item.error = `HTTP ${res.status}`;
      failed++;
    } else {
      cfBlocks = 0;
      const arrayBuf = await res.arrayBuffer();
      const buf = Buffer.from(arrayBuf);
      if (!isMagicValid(buf, path.extname(targetPath))) {
        console.warn(`  -> FAILED magic bytes check (len=${buf.length})`);
        item.error = "Invalid magic bytes";
        failed++;
      } else {
        fs.writeFileSync(targetPath, buf);
        item.existsLocally = true;
        item.localPath = "/" + path.relative("public", targetPath).replace(/\\/g, "/");
        item.fileSize = buf.length;
        delete item.error;
        downloaded++;
        console.log(`  -> Saved ${targetPath} (${buf.length} bytes)`);
      }
    }
  } catch (e) {
    console.error(`  -> Network error:`, e.message);
    item.error = e.message;
    failed++;
  }

  // Save progress to plan every 10 downloads
  if ((i + 1) % 10 === 0 || i === plan.length - 1) {
    fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));
  }

  // Wait ≥ 1.5 seconds between files
  await new Promise((r) => setTimeout(r, 1550));
}

fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));

console.log("\n=== TỔNG KẾT TẢI ASSETS ===");
console.log(`Đã có sẵn hợp lệ: ${alreadyExists}`);
console.log(`Tải mới thành công: ${downloaded}`);
console.log(`Thất bại / Bị chặn: ${failed}`);
