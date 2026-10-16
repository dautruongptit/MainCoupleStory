export type Wish = { name: string; msg: string; at: string };
export type GiftMethod = {
  id: string;
  who: "groom" | "bride" | "custom";
  type?: string;
  bankName: string;
  bankCode: string;
  bankBin?: string;
  bankLogo?: string;
  accountNumber: string;
  accountName: string;
  customLabel?: string;
  qrUrl?: string;
};
export type Gift = GiftMethod;
export type Ceremony = {
  title: string;
  date: string;
  time: string;
  place: string;
  lunar?: string;
};
export type TimelineEvent = {
  time: string;
  text: string;
};

export interface Inv {
  templateId: string;
  templateName: string;
  templateThumb: string;
  photoCrops: Record<string, { z: number; x: number; y: number }>;
  heroOn: boolean;
  heroPhoto: string;
  heroZoom: number;
  heroX: number;
  heroY: number;
  introCustom: boolean;
  introText: string;
  groomFull: string;
  brideFull: string;
  groomNick: string;
  brideNick: string;
  groomRole: string; // e.g. "Út Nam" or "Chú rể"
  brideRole: string; // e.g. "Út Nữ" or "Cô dâu"
  order: "groom" | "bride";
  albumOn: boolean;
  albumLayout: "grid" | "collage" | "3d";
  photos: string[];
  familyOn: boolean;
  groomFamTitle: string;
  brideFamTitle: string;
  groomFather: string;
  groomMother: string;
  brideFather: string;
  brideMother: string;
  groomAddr: string;
  brideAddr: string;
  announceOn: boolean;
  announcementLine1: string;
  announcementLine2: string;
  announce: string;
  ceremonyTitle: string;
  ceremonies: Ceremony[];
  partyOn: boolean;
  banquetType: "wedding" | "reception" | "engagement";
  banquetTitle: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  clock: "24h" | "ampm";
  hideWelcomeTimes: boolean;
  welcomeTime: string;
  startTime: string;
  countdown: boolean;
  locTitle: string;
  address: string;
  showMap: boolean;
  mapUrl: string;
  rsvpOn: boolean;
  rsvpDisplay: "button" | "inline";
  partyMode: "free" | "limit";
  partyLimit: number;
  questions: string[];
  dressOn: boolean;
  dressText: string;
  dressColors: string[];
  schedOn: boolean;
  sched: TimelineEvent[];
  guestOn: boolean;
  wishes: Wish[];
  giftOn: boolean;
  giftTitle: string;
  giftDisplayMode: "gift_box" | "envelope" | "qr_inline";
  gifts: GiftMethod[];
  thanksOn: boolean;
  thanks: string;
  musicName: string;
  musicUrl: string;
  musicAutoPlay: boolean;
  envelopeGuest: string;
  envelopeInviteMessage: string;
  envelopeText: string;
  shareStyle: "envelope" | "photo";
}

export const defaultInv: Inv = {
  templateId: "double_phoenix_red",
  templateName: "Song Phụng - Đỏ",
  templateThumb: "https://assets.chungdoi.com/template-previews/vi/landscape/double_phoenix_red.d0f325f5.webp",
  photoCrops: {},
  heroOn: true,
  heroPhoto: "https://assets.chungdoi.com/photo-library/design/2e494e0b7ab193dde9575183fa33982e4df2c2a69e3424edb4864146fcd797c6.webp",
  heroZoom: 1,
  heroX: 50,
  heroY: 50,
  introCustom: false,
  introText: "",
  groomFull: "Trần Thế Bảo",
  brideFull: "Lê Ngọc Ánh",
  groomNick: "Thế Bảo",
  brideNick: "Ngọc Ánh",
  groomRole: "Út Nam",
  brideRole: "Út Nữ",
  order: "bride", // ChungDoi template demo shows bride first
  albumOn: true,
  albumLayout: "grid",
  photos: [
    "https://assets.chungdoi.com/photo-library/design/2e494e0b7ab193dde9575183fa33982e4df2c2a69e3424edb4864146fcd797c6.webp",
    "https://assets.chungdoi.com/photo-library/design/7f27e96680eccfbd182328d905e010b578c1b76ed0a9ee445b6c3a818ee6da57.webp",
    "https://assets.chungdoi.com/photo-library/design/596b5a4ff72736f3ae4a8624d4a1573e5f004ff495cf30886c432952f9ffb9fc.webp",
    "https://assets.chungdoi.com/photo-library/design/97bddbcf70cd875d4db4568f834d4111d3ba12890db5c2b9f5ee70c1727c7357.webp",
    "https://assets.chungdoi.com/photo-library/design/c71480efa8c5887d03104838aba953649f8a81a10c8627382b6cca402f0bf7e5.webp",
    "https://assets.chungdoi.com/photo-library/design/401453036f4cd5ae1052719dc61b1caf9e0b51df93614839217ac4a380db3bfd.webp",
  ],
  familyOn: true,
  groomFamTitle: "Ông Bà",
  brideFamTitle: "Ông Bà",
  groomFather: "Trần Văn Tuấn",
  groomMother: "Lê Thị Hương",
  brideFather: "Lê Văn Khoa",
  brideMother: "Phạm Thị Kim Oanh",
  groomAddr: "123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  brideAddr: "456 Lê Lợi, Quận 3, TP. Hồ Chí Minh",
  announceOn: true,
  announcementLine1: "TRÂN TRỌNG BÁO TIN",
  announcementLine2: "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI",
  announce: "Trân trọng kính mời bạn\nđến chung vui lễ cưới của chúng tôi",
  ceremonyTitle: "THÔNG TIN LỄ CƯỚI",
  ceremonies: [
    {
      title: "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA",
      date: "2026-05-03",
      time: "09:00",
      place: "TƯ GIA",
      lunar: "Nhằm ngày 17 tháng 03 năm Bính Ngọ",
    },
  ],
  partyOn: true,
  banquetType: "wedding",
  banquetTitle: "THÔNG TIN TIỆC CƯỚI",
  date: "2026-05-03",
  time: "18:00",
  clock: "24h",
  hideWelcomeTimes: false,
  welcomeTime: "17:30",
  startTime: "18:00",
  countdown: true,
  locTitle: "ĐỊA ĐIỂM TIỆC CƯỚI",
  address: "White Palace Convention Center, 194 Hoàng Văn Thụ, Phú Nhuận, Hồ Chí Minh",
  showMap: true,
  mapUrl: "https://www.google.com/maps/search/?api=1&query=White+Palace+Convention+Center+194+Hoang+Van+Thu",
  rsvpOn: true,
  rsvpDisplay: "button",
  partyMode: "free",
  partyLimit: 2,
  questions: [],
  dressOn: true,
  dressText: "Trang phục trang nhã, lịch sự",
  dressColors: ["#651212", "#8d3a3a", "#ffb2b2"],
  schedOn: true,
  sched: [
    { time: "17:30", text: "Đón khách" },
    { time: "18:30", text: "Khai tiệc" },
    { time: "18:45", text: "Rót rượu, cắt bánh" },
    { time: "19:00", text: "Phục vụ món chính" },
    { time: "21:00", text: "Kết thúc tiệc" },
  ],
  guestOn: true,
  wishes: [
    {
      name: "An",
      msg: "Chúc Thế Bảo và Ngọc Ánh luôn khỏe mạnh, bình an và tràn đầy niềm vui, để cùng nhau xây dựng một tương lai tốt đẹp!",
      at: "15:31 24/01/2026",
    },
    {
      name: "Ngọc Quyên",
      msg: "Chúc hai bạn luôn nắm tay nhau qua mọi chặng đường hạnh phúc!",
      at: "03:07 19/12/2025",
    },
    {
      name: "Chị Tâm",
      msg: "Về chung một nhà, cùng nhau già đi nhé!",
      at: "03:06 19/12/2025",
    },
    {
      name: "Phúc Hân",
      msg: "Kính chúc tân lang tân nương trăm năm hạnh phúc 😘",
      at: "03:05 19/12/2025",
    },
    {
      name: "Bách cầu lông",
      msg: "Chúc tổ ấm mới ngập tràn niềm vui và tiếng cười!",
      at: "03:04 19/12/2025",
    },
  ],
  giftOn: true,
  giftTitle: "HỘP MỪNG CƯỚI",
  giftDisplayMode: "envelope",
  gifts: [
    {
      id: "g1",
      who: "groom",
      bankName: "VietinBank",
      bankCode: "ICB",
      bankBin: "970415",
      bankLogo: "https://api.vietqr.io/img/ICB.png",
      accountNumber: "0399554682",
      accountName: "TRẦN THẾ BẢO",
      qrUrl: "https://api.vietqr.io/image/970415-0399554682-print.png?accountName=TRAN%20THE%20BAO",
    },
    {
      id: "g2",
      who: "bride",
      bankName: "Vietcombank",
      bankCode: "VCB",
      bankBin: "970436",
      bankLogo: "https://api.vietqr.io/img/VCB.png",
      accountNumber: "099996586323",
      accountName: "LÊ NGỌC ÁNH",
      qrUrl: "https://api.vietqr.io/image/970436-099996586323-print.png?accountName=LE%20NGOC%20ANH",
    },
    {
      id: "g3",
      who: "custom",
      customLabel: "Gia đình",
      bankName: "MB Bank",
      bankCode: "MB",
      bankBin: "970422",
      bankLogo: "https://api.vietqr.io/img/MB.png",
      accountNumber: "888866669999",
      accountName: "GIA ĐÌNH CHÚ RỂ",
      qrUrl: "https://api.vietqr.io/image/970422-888866669999-print.png?accountName=GIA%20DINH%20CHU%20RE",
    },
  ],
  thanksOn: true,
  thanks: "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!",
  musicName: "Beautiful in White - Shane Filan",
  musicUrl: "https://assets.chungdoi.com/music/romantic-001.mp3",
  musicAutoPlay: true,
  envelopeGuest: "Gia đình Anh Mạnh",
  envelopeInviteMessage: "đến dự buổi tiệc chung vui cùng gia đình",
  envelopeText: "Trân trọng kính mời",
  shareStyle: "envelope",
};

/** Tên hiển thị: biệt danh nếu có, không thì họ tên đầy đủ. */
export const groomShown = (d: Inv) => d.groomNick || d.groomFull || "Thế Bảo";
export const brideShown = (d: Inv) => d.brideNick || d.brideFull || "Ngọc Ánh";

export const WEEKDAYS_FULL = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];
export const WEEKDAYS_SHORT = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export function parseDate(s: string) {
  if (!s) return new Date(2026, 4, 3);
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function monthGrid(s: string) {
  const dt = parseDate(s);
  const y = dt.getFullYear();
  const m = dt.getMonth();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7; // Monday first
  const days = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = Array(offset).fill(null);
  for (let i = 1; i <= days; i++) cells.push(i);
  return { y, m, selected: dt.getDate(), cells };
}

export function formatTime(t: string, clock: "24h" | "ampm" = "24h") {
  if (!t || clock === "24h") return t;
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${ap}`;
}

export function buildIcs(inv: Inv) {
  const d = (inv.date || "20260503").replace(/-/g, "");
  const t = (inv.time || "18:00").replace(":", "") + "00";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${d}T${t}`,
    `SUMMARY:Tiệc cưới ${brideShown(inv)} & ${groomShown(inv)}`,
    `LOCATION:${inv.address}`.trim(),
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
