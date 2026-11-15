import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('docs/qa-review/audit_10_samples_raw.json', 'utf8'));
const scan75 = JSON.parse(fs.readFileSync('docs/qa-review/all_75_asset_scan.json', 'utf8'));

console.log('=== 75 SAMPLES ASSET SCAN SUMMARY ===');
console.log('Total templates:', scan75.length);
const missingBg = scan75.filter(x => !x.backgroundExists);
const missingCfg = scan75.filter(x => !x.hasCoverConfig);
console.log('Templates missing background file:', missingBg.length);
console.log('Templates missing cover config:', missingCfg.length);

console.log('\n=== DETAILED 10 SAMPLES AUDIT ===');
const issuesList = [];

// Track distinct issues
raw.forEach((s, idx) => {
  const rCovM = s.mobile?.cover?.real;
  const cCovM = s.mobile?.cover?.clone;
  const rOpM = s.mobile?.opened?.real;
  const cOpM = s.mobile?.opened?.clone;
  const rCovL = s.laptop?.cover?.real;
  const cCovL = s.laptop?.cover?.clone;
  const rOpL = s.laptop?.opened?.real;
  const cOpL = s.laptop?.opened?.clone;

  // 1. Mobile Cover Wax Seal
  if (rCovM?.coverSeal && cCovM?.coverSeal) {
    const topDiff = Math.abs(rCovM.coverSeal.rect.top - cCovM.coverSeal.rect.top);
    if (topDiff > 5) {
      issuesList.push({
        slug: s.slug,
        name: s.name,
        screen: "Màn Hộp Thư (Cover)",
        viewport: "Mobile (390x844)",
        desc: `Vị trí con dấu sáp (wax seal) bị lệch dọc (${topDiff}px)`,
        real: `top: ${rCovM.coverSeal.rect.top}px, left: ${rCovM.coverSeal.rect.left}px (${rCovM.coverSeal.rect.width}x${rCovM.coverSeal.rect.height}px)`,
        clone: `top: ${cCovM.coverSeal.rect.top}px, left: ${cCovM.coverSeal.rect.left}px (${cCovM.coverSeal.rect.width}x${cCovM.coverSeal.rect.height}px)`,
        severity: "TB",
        file: "src/features/invitation/components/CoverScreen.tsx",
        fix: `Cân chỉnh padding-top của container phong bì cover để con dấu đạt top: ${rCovM.coverSeal.rect.top}px.`
      });
    }
  }

  // 2. Mobile Opened Envelope / Belt
  if (rOpM?.envelope && cOpM?.envelope) {
    const wDiff = Math.abs(rOpM.envelope.rect.width - cOpM.envelope.rect.width);
    const hDiff = Math.abs(rOpM.envelope.rect.height - cOpM.envelope.rect.height);
    const topDiff = Math.abs(rOpM.envelope.rect.top - cOpM.envelope.rect.top);
    if (wDiff > 3 || hDiff > 3 || topDiff > 10) {
      issuesList.push({
        slug: s.slug,
        name: s.name,
        screen: "Thiệp Đã Mở (Header/Bì thư)",
        viewport: "Mobile (390x844)",
        desc: `Kích thước khối phong bì / đai lệch ${wDiff}px chiều rộng, ${hDiff}px chiều cao, top lệch ${topDiff}px`,
        real: `width: ${rOpM.envelope.rect.width}px, height: ${rOpM.envelope.rect.height}px, top: ${rOpM.envelope.rect.top}px`,
        clone: `width: ${cOpM.envelope.rect.width}px, height: ${cOpM.envelope.rect.height}px, top: ${cOpM.envelope.rect.top}px`,
        severity: "Cao",
        file: "src/features/invitation/components/generated/headers.tsx",
        fix: `Điều chỉnh padding px-9 / pt-15 của header và max-width bì thư để khớp kích thước chuẩn ${rOpM.envelope.rect.width}x${rOpM.envelope.rect.height}px.`
      });
    }
  }

  // 3. Mobile Opened Card Width / Margins
  if (rOpM?.card && cOpM?.card) {
    const wDiff = Math.abs(rOpM.card.rect.width - cOpM.card.rect.width);
    if (wDiff > 10) {
      issuesList.push({
        slug: s.slug,
        name: s.name,
        screen: "Thiệp Đã Mở (Thẻ Card)",
        viewport: "Mobile (390x844)",
        desc: `Thẻ nội dung tràn viền 100% thay vì có lề 2 bên (lệch ${wDiff}px)`,
        real: `width: ${rOpM.card.rect.width}px (padding: ${rOpM.card.computed.padding}, margin: ${rOpM.card.computed.margin})`,
        clone: `width: ${cOpM.card.rect.width}px (padding: ${cOpM.card.computed.padding}, margin: ${cOpM.card.computed.margin})`,
        severity: "Cao",
        file: "src/styles/styles.css",
        fix: `Thêm width: 88%; max-width: 420px; margin: 0 auto; cho card nội dung để có lề 2 bên 23px.`
      });
    }
  }

  // 4. Laptop Opened Container Width (Universal across templates)
  if (cOpL?.header) {
    const cloneW = cOpL.header.rect.width;
    if (cloneW <= 640) {
      issuesList.push({
        slug: s.slug,
        name: s.name,
        screen: "Thiệp Đã Mở (Container chính)",
        viewport: "Laptop (1440x900)",
        desc: `Container thiệp trên Laptop bị co cứng ở ${cloneW}px thay vì mở rộng 900px`,
        real: `max-w-[900px] (container mở rộng 900px trên desktop >= 768px)`,
        clone: `max-w: ${cOpL.header.computed.maxWidth || cloneW + 'px'} (bị styles.css ép cứng 480px / 640px !important)`,
        severity: "Cao",
        file: "src/styles/styles.css",
        fix: "Gỡ bỏ `max-width: 480px !important;` ở `@media (min-width: 768px)` để container bung ra `md:max-w-[900px]`."
      });
    }
  }
});

// Also universal issue: Floating navbar on clone
issuesList.push({
  slug: "chung (tất cả mẫu)",
  name: "Chung 75 mẫu",
  screen: "Toàn bộ màn hình demo",
  viewport: "Mobile & Laptop",
  desc: "Thanh menu demo 'Kho mẫu / Tạo thiệp' dạng fixed che khuất phần trên cùng của thiệp (chữ SAVE THE DATE hoặc đỉnh nắp bao thư)",
  real: "Không có thanh menu cố định đè lên nội dung thiệp khi xem demo",
  clone: "div.demo-floating-header cố định ở top: 14px đè trực tiếp lên phần đầu thiệp",
  severity: "Cao",
  file: "src/features/invitation/components/InvitationDemo.tsx",
  fix: "Chuyển thành floating widget thu nhỏ ở góc hoặc bán trong suốt, không đè lên vùng header thiệp."
});

console.log('Total issues logged:', issuesList.length);
fs.writeFileSync('docs/qa-review/detected_issues_summary.json', JSON.stringify(issuesList, null, 2));
