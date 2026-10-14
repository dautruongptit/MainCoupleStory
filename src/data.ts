export type Wish = { name: string; msg: string; at: string };
export type Gift = { kind: string; who: "groom" | "bride" | "custom"; account: string };
export type Ceremony = { title: string; date: string; time: string; place: string };

export interface Inv {
  groomFull: string;
  brideFull: string;
  groomNick: string;
  brideNick: string;
  groomRole: string;
  brideRole: string;
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
  schedOn: boolean;
  sched: { time: string; text: string }[];
  guestOn: boolean;
  wishes: Wish[];
  giftOn: boolean;
  giftTitle: string;
  gifts: Gift[];
  thanksOn: boolean;
  thanks: string;
  musicName: string;
  envelopeText: string;
  shareStyle: "envelope" | "photo";
}

export const defaultInv: Inv = {
  groomFull: "",
  brideFull: "",
  groomNick: "",
  brideNick: "",
  groomRole: "Chú rể",
  brideRole: "Cô dâu",
  order: "groom",
  albumOn: true,
  albumLayout: "grid",
  photos: [],
  familyOn: true,
  groomFamTitle: "Ông bà",
  brideFamTitle: "Ông bà",
  groomFather: "",
  groomMother: "",
  brideFather: "",
  brideMother: "",
  groomAddr: "",
  brideAddr: "",
  announceOn: true,
  announce: "Trân trọng kính mời bạn\nđến chung vui lễ cưới của chúng tôi",
  ceremonyTitle: "Thông tin lễ cưới",
  ceremonies: [],
  partyOn: true,
  banquetType: "wedding",
  banquetTitle: "Thông tin tiệc cưới",
  date: "",
  time: "",
  clock: "24h",
  hideWelcomeTimes: true,
  welcomeTime: "",
  startTime: "",
  countdown: true,
  locTitle: "Địa điểm tiệc cưới",
  address: "",
  showMap: true,
  mapUrl: "",
  rsvpOn: true,
  rsvpDisplay: "button",
  partyMode: "free",
  partyLimit: 2,
  questions: [],
  dressOn: false,
  dressText: "",
  schedOn: false,
  sched: [{ time: "17:00", text: "Đón khách" }],
  guestOn: true,
  wishes: [],
  giftOn: true,
  giftTitle: "Hộp quà",
  gifts: [],
  thanksOn: true,
  thanks: "Sự hiện diện của bạn là niềm vinh hạnh lớn nhất của chúng tôi!",
  musicName: "",
  envelopeText: "Trân trọng kính mời",
  shareStyle: "envelope",
};

/** Tên hiển thị: biệt danh nếu có, không thì họ tên đầy đủ. */
export const groomShown = (d: Inv) => d.groomNick || d.groomFull || "Tên chú rể";
export const brideShown = (d: Inv) => d.brideNick || d.brideFull || "Tên cô dâu";

export const WEEKDAYS_FULL = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
export const WEEKDAYS_SHORT = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export function parseDate(s: string) {
  if (!s) return new Date();
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

export function formatTime(t: string, clock: "24h" | "ampm") {
  if (!t || clock === "24h") return t;
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${ap}`;
}

export function buildIcs(inv: Inv) {
  const d = (inv.date || "").replace(/-/g, "");
  const t = (inv.time || "00:00").replace(":", "") + "00";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${d}T${t}`,
    `SUMMARY:Tiệc cưới ${groomShown(inv)} & ${brideShown(inv)}`,
    `LOCATION:${inv.address}`.trim(),
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
