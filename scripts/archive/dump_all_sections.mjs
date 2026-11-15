import fs from 'fs';

const html = fs.readFileSync('docs/real_minimalism_nau_main.html', 'utf8');

// Function to find element by text or selector
function sliceBetween(startStr, endStr) {
  const s = html.indexOf(startStr);
  if (s === -1) return null;
  const e = html.indexOf(endStr, s);
  if (e === -1) return html.slice(s);
  return html.slice(s, e);
}

console.log('--- SECTION 3: ALBUM ---');
const albumSnippet = sliceBetween('Album Ảnh', 'THÔNG TIN TIỆC');
console.log(albumSnippet?.slice(0, 400));

console.log('--- SECTION 4: BANQUET ---');
const banquetSnippet = sliceBetween('THÔNG TIN TIỆC', 'Tiệc cưới sẽ tổ chức');
console.log(banquetSnippet?.slice(0, 400));

console.log('--- SECTION 5: MAP ---');
const mapSnippet = sliceBetween('Tiệc cưới sẽ tổ chức', 'DRESS CODE');
console.log(mapSnippet?.slice(0, 400));

console.log('--- SECTION 6: DRESS CODE ---');
const dressSnippet = sliceBetween('DRESS CODE', 'LỊCH TRÌNH NGÀY');
console.log(dressSnippet?.slice(0, 400));

console.log('--- SECTION 7: TIMELINE ---');
const timelineSnippet = sliceBetween('LỊCH TRÌNH NGÀY', 'Sổ lưu bút');
console.log(timelineSnippet?.slice(0, 400));

console.log('--- SECTION 8: GUESTBOOK ---');
const guestbookSnippet = sliceBetween('Sổ lưu bút', 'Hộp Quà');
console.log(guestbookSnippet?.slice(0, 400));

console.log('--- SECTION 9: GIFTBOX ---');
const giftboxSnippet = sliceBetween('Hộp Quà', 'Sự hiện diện của quý khách');
console.log(giftboxSnippet?.slice(0, 400));
