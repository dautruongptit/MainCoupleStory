import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_showcase_all.html', 'utf8');

function inspectChunk(name, startPattern, endPattern) {
  const s = html.indexOf(startPattern);
  if (s === -1) {
    console.log(`[${name}] NOT FOUND: ${startPattern}`);
    return;
  }
  const e = endPattern ? html.indexOf(endPattern, s) : s + 2000;
  console.log(`\n=================== [${name}] ===================`);
  console.log(html.slice(s, e !== -1 ? e : s + 2000));
}

inspectChunk('Banquet Card', 'THÔNG TIN TIỆC', 'Tiệc cưới sẽ tổ chức');
inspectChunk('Map Section', 'Tiệc cưới sẽ tổ chức', 'DRESS CODE');
inspectChunk('Dress Code', 'DRESS CODE', 'LỊCH TRÌNH NGÀY');
inspectChunk('Timeline', 'LỊCH TRÌNH NGÀY', 'Sổ lưu bút');
inspectChunk('Guestbook', 'Sổ lưu bút', 'Hộp Quà');
inspectChunk('Giftbox', 'Hộp Quà', '<footer');
inspectChunk('Footer & Modal', '<footer', null);
