import type { Inv } from "@/types/invitation";
import { defaultInv } from "@/features/editor/data/defaultData";
import { TPL_CDN, type Tpl } from "@/features/templates/data/templates";
import { loadTemplateDemo } from "@/features/invitation/shell/specs";

/**
 * Dữ liệu thiệp của màn demo = dữ liệu chung dưới đây + `specs/<id>/demo.json` của mẫu (ghi đè).
 * Mọi khác biệt theo mẫu (tên cặp đôi, ngày, lời mời trên bìa, ảnh, dress code, kiểu hộp quà…) nằm trong `demo.json`;
 * không viết `if (tpl.id === …)` ở đây. Kiểm tra sau khi đổi: `node scripts/check/demo-data.mjs --compare <mốc>`.
 */

const photo = (hash: string) => `/images/photo-library/design/${hash}.webp`;

/** Ảnh cưới trung tính (không gắn phong cách truyền thống/đỏ như `defaultInv`) cho mẫu chưa có ảnh riêng. */
const NEUTRAL_PHOTOS = [
  "1e0986014ff4206f135df254987fb52eb45ae964e8cce6f0dba29a905e0e0b67",
  "cea4d58014368af2908a492045ec39a91ab5ed17d4544eb6520733a40beb078a",
  "6c5d0a317cc97ce46cf6798f0248ceb3d97739840e1f27fc5040798c21ad55c6",
  "3f8b94b89026dc3738bb80e625b8ee993ce93949e595ef9539b9c41d17898671",
  "6f6851cc63126158d802563c047297dd76ba3f532c1e3809a556ab617c312000",
  "1c177f9721cd1802abf4fa62e6f22113bb477130cbc30b138c7a42cd995bb670",
].map(photo);

/** Phần dữ liệu demo giống nhau ở mọi mẫu (trước khi `demo.json` ghi đè). */
export const DEMO_COMMON: Partial<Inv> = {
  heroOn: true,
  heroPhoto: NEUTRAL_PHOTOS[0],
  photos: NEUTRAL_PHOTOS,
  introCustom: false,
  introText: "",
  groomFull: "Trần Thế Bảo",
  groomNick: "Thế Bảo",
  brideFull: "Lê Ngọc Ánh",
  brideNick: "Ngọc Ánh",
  dressColors: ["#542e08", "#9c7653", "#d6c5b3", "#ece5dd"],
  envelopeGuest: "Thân Mời",
  envelopeInviteMessage: "đến dự buổi tiệc chung vui cùng gia đình chúng tôi",
  giftDisplayMode: "gift_box",
  date: "2026-11-28",
  time: "18:00",
  welcomeTime: "17:30",
  startTime: "18:00",
  locTitle: "TIỆC CƯỚI SẼ DIỄN RA VÀO LÚC:",
  address: "Trung tâm Hội nghị Tiệc cưới Riverside Palace, 360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh",
};

/** Phần chung + thông tin mẫu, CHƯA áp `demo.json` (bộ chuyển dữ liệu dùng để tính phần khác biệt). */
export function demoBase(tpl: Tpl): Inv {
  return { ...defaultInv, ...DEMO_COMMON, templateId: tpl.id, templateName: tpl.name, templateThumb: TPL_CDN + tpl.img } as Inv;
}

/** Ghép phần chung với `demo.json` đã tải của mẫu. */
export function buildDemoInv(tpl: Tpl, demo: Partial<Inv> | null): Inv {
  // Đường dẫn ảnh giữ nguyên như trong JSON (kể cả URL máy chủ ảnh gốc); các khối tự đổi qua `assetUrl` lúc vẽ.
  return { ...demoBase(tpl), ...(demo ?? {}) } as Inv;
}

/** Tải `demo.json` của mẫu (theo nhu cầu) rồi dựng dữ liệu thiệp demo. */
export async function loadDemoInv(tpl: Tpl): Promise<Inv> {
  return buildDemoInv(tpl, await loadTemplateDemo(tpl.id));
}
