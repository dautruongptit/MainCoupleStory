import { ChromeController } from "./cdp_helper.mjs";
import fs from "fs";
import path from "path";

const OUT_DIR = "docs/asset-audit/offline-screenshots";
fs.mkdirSync(OUT_DIR, { recursive: true });

const templates = [
  { slug: "bach-su-do", name: "Bạch Sứ - Đỏ" },
  { slug: "hoa-tinh-do", name: "Họa Tình - Đỏ" },
  { slug: "song-long-do", name: "Song Long - Đỏ" },
  { slug: "hoang-kim-lam", name: "Hoàng Kim - Lam" },
  { slug: "chibi-red", name: "Chibi - Red" },
  { slug: "minimalism-nau", name: "Minimalism - Nâu" },
  { slug: "minimalism-do-dam", name: "Minimalism - Đỏ Đậm" },
  { slug: "song-hy-do", name: "Song Hỷ - Đỏ" },
  { slug: "song-phung-do", name: "Song Phụng - Đỏ" },
  { slug: "long-phung-v2-do", name: "Long Phụng V2 - Đỏ" },
];

const c = new ChromeController();
await c.start();
await c.newPage();

// 1. Block any requests to assets.chungdoi.com to strictly simulate offline / external host block
await c.send("Network.setBlockedURLs", {
  urls: ["*assets.chungdoi.com*"]
});

console.log("=== BẮT ĐẦU KIỂM ĐỊNH NGOẠI TUYẾN 10 MẪU (NETWORK BLOCKED: assets.chungdoi.com) ===");

const results = [];

for (const t of templates) {
  const { slug, name } = t;
  const url = `http://localhost:5173/vi/mau-thiep/${slug}/demo?open=1`;

  await c.setViewport({ width: 390, height: 844, mobile: true });
  await c.navigate(url, 2000);

  // Cuộn trang để kích hoạt lazy load ảnh nếu có
  await c.eval(`
    window.scrollTo(0, document.body.scrollHeight / 2);
  `);
  await c.wait(1000);
  await c.eval(`
    window.scrollTo(0, 0);
  `);
  await c.wait(500);

  // Kiểm tra tình trạng ảnh trong DOM
  const stats = await c.eval(`
    (() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const total = imgs.length;
      const loaded = imgs.filter(i => i.complete && i.naturalWidth > 0).length;
      const broken = imgs.filter(i => i.complete && i.naturalWidth === 0).length;
      const sources = imgs.map(i => ({
        src: i.src,
        ok: i.complete && i.naturalWidth > 0,
        naturalWidth: i.naturalWidth,
        naturalHeight: i.naturalHeight
      }));
      return { total, loaded, broken, sources };
    })()
  `);

  const screenshotPath = path.join(OUT_DIR, `${slug}_offline.png`);
  await c.screenshot(screenshotPath);

  const res = {
    slug,
    name,
    totalImages: stats.total,
    loadedImages: stats.loaded,
    brokenImages: stats.broken,
    screenshotPath: `${OUT_DIR}/${slug}_offline.png`,
    status: stats.broken === 0 && stats.loaded > 0 ? "PASS" : "FAIL"
  };

  results.push(res);
  console.log(`[${slug}] ${name}: ${stats.loaded}/${stats.total} ảnh hiển thị tốt (${stats.broken} lỗi) -> ${res.status}`);
}

await c.close();

// Lưu tóm tắt kết quả JSON
fs.writeFileSync(path.join(OUT_DIR, "results.json"), JSON.stringify(results, null, 2), "utf8");
console.log("\nHoàn tất kiểm định ngoại tuyến! Kết quả lưu tại docs/asset-audit/offline-screenshots/results.json");
