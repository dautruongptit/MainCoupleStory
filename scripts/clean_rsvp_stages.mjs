import fs from 'fs';
import path from 'path';

const AUDIT_DIR = 'docs/asset-audit';
const files = fs.readdirSync(AUDIT_DIR).filter(f => f.endsWith('.json'));

const sevenSlugs = new Set([
  "long-phung-do",
  "chibi-red",
  "thanh-diep-xanh",
  "long-phung-xanh",
  "song-long-xanh",
  "vuon-xuan-lam",
  "long-phung-huyen"
]);

const rsvpTexts = {
  "long-phung-do": "XÁC NHẬN / 確認出席",
  "chibi-red": "XÁC NHẬN / 確認出席",
  "thanh-diep-xanh": "XÁC NHẬN / CONFIRM",
  "long-phung-xanh": "CONFIRM ATTENDANCE",
  "song-long-xanh": "XÁC NHẬN / 참석 확인",
  "vuon-xuan-lam": "XÁC NHẬN / 참석 확인",
  "long-phung-huyen": "CONFIRM / XÁC NHẬN"
};

let cleanedCount = 0;

for (const file of files) {
  const filePath = path.join(AUDIT_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const slug = data.slug || file.replace('.json', '');

  const giftSet = new Set(data.stages?.giftbox || []);
  const oldRsvp = data.stages?.rsvp || [];

  // Filter out any URLs that were in giftbox
  const genuineRsvp = oldRsvp.filter(u => !giftSet.has(u));

  data.stages.rsvp = genuineRsvp;
  data.rsvpInfo = {
    verified: true,
    selector: '[data-landing-screenshot-id="invite-rsvp"] button',
    note: genuineRsvp.length > 0 
      ? `Có ${genuineRsvp.length} tài nguyên mới tải khi mở RSVP` 
      : "Mở form xác nhận tham dự thành công; không có tài nguyên ảnh/tệp mới phát sinh"
  };

  if (sevenSlugs.has(slug)) {
    data.rsvpInfo.buttonText = rsvpTexts[slug] || "XÁC NHẬN";
    data.rsvpInfo.screenshot = `rsvp_${slug}.png`;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  cleanedCount++;
}

console.log(`Cleaned and updated RSVP stage for all ${cleanedCount} json files.`);
