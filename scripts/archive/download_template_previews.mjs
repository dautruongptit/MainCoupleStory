import fs from "node:fs";
import path from "node:path";

function isMagicValid(buf) {
  if (buf.length < 12) return false;
  // WebP
  if (buf.slice(0, 4).toString() === "RIFF" && buf.slice(8, 12).toString() === "WEBP") return true;
  // PNG
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true;
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return true;
  return false;
}

// 1. Read templates.ts to get all 75 templates
const content = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const regex = /"img":\s*"([^"]+)",\s*"full":\s*"([^"]+)"/g;

const items = [];
let m;
while ((m = regex.exec(content)) !== null) {
  const imgRel = m[1]; // e.g. "listing/minimalism_darkred.d60d4ed8.webp"
  const fullRel = m[2]; // e.g. "full/minimalism_darkred.4496816d.webp"

  items.push({
    url: `https://assets.chungdoi.com/template-previews/vi/${imgRel}`,
    targetFile: `public/images/template-previews/vi/${imgRel}`,
  });
  items.push({
    url: `https://assets.chungdoi.com/template-previews/vi/${fullRel}`,
    targetFile: `public/images/template-previews/vi/${fullRel}`,
  });
}

console.log(`Loaded ${items.length} preview images to download (75 listing + 75 full).`);

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  "Referer": "https://chungdoi.com/",
  "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
};

let alreadyExists = 0;
let downloaded = 0;
let failed = 0;
let cfBlocks = 0;

for (let i = 0; i < items.length; i++) {
  const item = items[i];
  const targetPath = item.targetFile;
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Check if file already exists and is valid
  if (fs.existsSync(targetPath)) {
    try {
      const existingBuf = fs.readFileSync(targetPath);
      if (isMagicValid(existingBuf)) {
        alreadyExists++;
        continue;
      }
    } catch {}
  }

  // Download file
  console.log(`[${i + 1}/${items.length}] Downloading ${item.url}...`);
  try {
    const res = await fetch(item.url, { headers });

    if (res.status === 403 || res.status === 503) {
      const text = await res.text();
      if (text.includes("Cloudflare") || text.includes("Attention Required")) {
        cfBlocks++;
        console.error(`  -> Cloudflare blocked! (consecutive: ${cfBlocks})`);
        if (cfBlocks >= 3) {
          console.error("DỪNG: Đã bị Cloudflare chặn 3 lần liên tiếp!");
          break;
        }
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
    }

    cfBlocks = 0; // reset if not blocked

    if (!res.ok) {
      console.error(`  -> HTTP ${res.status} ${res.statusText}`);
      failed++;
      await new Promise((r) => setTimeout(r, 1500));
      continue;
    }

    const arrayBuf = await res.arrayBuffer();
    const buf = Buffer.from(arrayBuf);

    if (!isMagicValid(buf)) {
      console.error(`  -> Invalid magic bytes for ${item.url}`);
      failed++;
      await new Promise((r) => setTimeout(r, 1500));
      continue;
    }

    fs.writeFileSync(targetPath, buf);
    console.log(`  -> Saved ${targetPath} (${buf.length} bytes)`);
    downloaded++;
  } catch (err) {
    console.error(`  -> Fetch error: ${err.message}`);
    failed++;
  }

  // Delay >= 1.5s between downloads
  await new Promise((r) => setTimeout(r, 1500));
}

console.log("\n=== TỔNG KẾT TẢI PREVIEWS ===");
console.log(`Đã có sẵn hợp lệ: ${alreadyExists}`);
console.log(`Tải mới thành công: ${downloaded}`);
console.log(`Thất bại / Bị chặn: ${failed}`);
