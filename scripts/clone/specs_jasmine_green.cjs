// Sinh specs/jasmine_green/{theme,capabilities,demo}.json từ dữ liệu đo thật (docs/survey/blocks/jasmine_green).
// Chạy: node scripts/clone/specs_jasmine_green.cjs
const fs = require("fs");
const path = require("path");

const SRC = "docs/survey/blocks/jasmine_green/main";
const DIR = "src/features/invitation/templates/jasmine_green";
const read = (n) => fs.readFileSync(path.join(SRC, n + ".jsx"), "utf8");
fs.mkdirSync(DIR, { recursive: true });
const write = (name, obj) => fs.writeFileSync(path.join(DIR, name), JSON.stringify(obj, null, 2) + "\n");

// ---- theme ----
write("theme.json", {
  assets: "/images/themes/jasmine-green",
  colors: {
    ink: "rgb(46, 71, 51)",
    inkRgb: "46, 71, 51",
    sub: "rgb(169, 135, 78)",
    muted: "rgb(169, 135, 78)",
    paper: "rgb(245, 244, 242)",
    text: "rgb(169, 135, 78)",
    line: "rgba(169, 135, 78, 0.4)",
    accent: "rgb(169, 135, 78)",
    edge: "#2e473322",
  },
  tokens: { scheduleIcons: "bird,alcohol,ring" },
});

// ---- capabilities ----
write("capabilities.json", {
  id: "jasmine_green",
  family: "jasmine_green",
  testId: "jasmine-green-template",
  innerClass: "relative z-10 flex flex-col items-center gap-[23px] py-[34px] md:gap-[30px] md:py-[44px]",
  blocks: ["Paper", "Hero", "Family", "Album", "Banquet", "Venue", "Dress", "Schedule", "Guestbook", "Gifts", "Footer", "Lightbox"],
  cover: { seal: "heart", ambient: "fall", particle: "blossom", skin: "card" },
  gift: { widget: "box3d" },
  hero: { kind: "none", introLine: false, shape: "none" },
  album: { indicator: "counter", defaultLayout: "3d" },
  countdown: true,
  layout: { contentMaxMd: 900, behaviorMd: "padded", parallaxDecor: false },
  editor: { albumCardAfter: "ceremony", cards: { hero: false, coupleHero: false, introLine: false } },
});

// ---- demo ----
const photos = [...new Set([...read("02").matchAll(/src="(https:\/\/assets\.chungdoi\.com\/photo-library\/design\/[0-9a-f]+(?:\.webp)?)"/g)].map((m) => (m[1].endsWith(".webp") ? m[1] : m[1] + ".webp")))];

const g8 = read("08");
const wishes = [...g8.matchAll(/<span className="font-semibold"[^>]*>([^<]*)<\/span><span className="text-xs opacity-70">([^<]*)<\/span><\/div><p className="mt-2 leading-relaxed">([^<]*)<\/p>/g)].map((m) => ({ name: m[1], msg: m[3], at: m[2] }));

const g7 = read("07");
const sched = [...g7.matchAll(/<li className="contents">([\s\S]*?)<\/li>/g)].map((m) => {
  const body = m[1];
  const time = /(\d{2}:\d{2})<\/span>/.exec(body)[1];
  const text = />([^<>]+)<\/span><\/span>$/.exec(body)[1];
  return { time, text };
});

write("demo.json", {
  _note: "Dữ liệu demo của jasmine_green (Mai Lan - Xanh) đo từ chungdoi.com/vi/mau-thiep/mai-lan-xanh/demo",
  order: "groom",
  envelopeInviteMessage: "",
  groomNick: "Quốc Bảo",
  brideNick: "Tuệ Anh",
  groomFull: "Ngô Quốc Bảo",
  brideFull: "Dương Tuệ Anh",
  groomRole: "",
  brideRole: "",
  heroOn: false,
  heroPhoto: "",
  introCustom: false,
  albumOn: true,
  photos,
  familyOn: true,
  groomFamTitle: "Ông Bà",
  brideFamTitle: "Ông Bà",
  groomFather: "Ngô Thanh Tùng",
  groomMother: "Ngô Minh Nguyệt",
  groomAddr: "Số 86 Núi Thành,\nphường Hòa Cường, Đà Nẵng",
  brideFather: "Dương Quang Huy",
  brideMother: "Dương Như Khuê",
  brideAddr: "Số 31 Lê Văn Hiến,\nphường Ngũ Hành Sơn, Đà Nẵng",
  announceOn: true,
  announcementLine1: "TRÂN TRỌNG BÁO TIN",
  announcementLine2: "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI",
  ceremonyTitle: "",
  ceremonies: [{ title: "LỄ THÀNH HÔN", date: "2027-08-02", time: "19:00", place: "Trung tâm Tiệc cưới Sun Palace", lunar: "Tức ngày 1 tháng 7 năm Đinh Mùi" }],
  partyOn: true,
  banquetTitle: "",
  date: "2027-08-02",
  time: "19:00",
  hideWelcomeTimes: false,
  welcomeTime: "18:00",
  startTime: "20:30",
  countdown: true,
  locTitle: "Tiệc cưới sẽ tổ chức tại",
  address: "Trung tâm Tiệc cưới Sun Palace\nĐà Nẵng",
  showMap: true,
  mapUrl: "",
  rsvpOn: true,
  dressOn: true,
  dressText: "Trang phục dự tiệc",
  dressColors: ["#2f2a26", "#a08b74", "#f4efe7"],
  schedOn: true,
  sched,
  guestOn: true,
  wishes,
  giftOn: true,
  giftTitle: "",
  giftDisplayMode: "gift_box",
  gifts: [{ id: "g1", who: "groom", bankName: "Vietcombank", bankCode: "VCB", bankBin: "970436", accountNumber: "0000000000", accountName: "THIEP CUOI DEMO", qrUrl: "" }],
  thanksOn: true,
  thanks: "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!",
});
console.log("ok", { photos: photos.length, wishes: wishes.length, sched: sched.length });
