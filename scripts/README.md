# scripts/

Sắp lại ở giai đoạn A4 (docs/refactor-plan.md). Chạy mọi lệnh từ thư mục gốc `web/`.

| Thư mục | Dùng để | Ví dụ |
|---|---|---|
| `check/` | kiểm tra, so sánh với trang gốc / mốc | `npm run check` (nhanh), `npm run check -- --full`, `--baseline`; `node scripts/check/gift-modes.mjs --all`; `gift-geometry.mjs`; `editor-sync.mjs <id>`; `audit.mjs <id>`; `cmp_dumps.mjs`; `phase6_all.mjs`; `check-assets.mjs` |
| `clone/` | bộ sinh khối/spec/hộp quà từ dữ liệu đo, sổ đăng ký | `gen_<họ>.cjs`, `genkit.cjs`, `registry.mjs`, `gen_gift_sections.cjs`, `gift_assets.mjs` |
| `survey/` | đo trang gốc, chạy trong tab chungdoi.com hoặc headless | `collector.mjs`, `probe.js`, `run.js`, `dump.js`, `local_dump.mjs`, `diff_dump.mjs`, `gift_crawl.js`, `html2jsx.mjs` |
| `lib/` | thư viện dùng chung | `cdp_helper.mjs` (điều khiển Chrome) |
| `tools/` | tiện ích build/bảo trì | `build-invitation-css.mjs` (`npm run css:inv`), `find-unused.mjs`, `script-usage.mjs`, `reorg-scripts.mjs` (đã chạy một lần) |
| `archive/` | script chạy một lần, kết quả cũ, phân tích — **không dùng nữa**, giữ để tra cứu lịch sử | |

Quy tắc: script mới đặt đúng thư mục; script chạy một lần xong thì chuyển vào `archive/`. Tệp `scripts/_*` là nháp tạm (gitignore).
Import `cdp_helper`: `../lib/cdp_helper.mjs` (từ `check|clone|survey|tools`).
Quy trình đo trang gốc, tải chậm, tránh 403: xem `AGENTS.md`.
