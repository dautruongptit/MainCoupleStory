import { getGiftboxConfig } from "@/features/invitation/config/giftboxConfigs";
import { defaultGiftModeOf } from "@/features/invitation/shell/blocks/shared/giftDefaults";
import { TPL_CDN, introDefaultFor, type Tpl } from "@/features/templates/data/templates";
import type { Inv } from "@/types/invitation";
import type { Card } from "@/types/card";
import type { Guest } from "@/types/guest";
import { blankInv } from "@/features/editor/data/defaultData";
import { TEMPLATE_THEMES } from "@/features/invitation/config/templateThemes";
import { invitationApi } from "@/services/api/invitationApi";
import { getAccessToken } from "@/services/api/client";
import { uuid } from "@/utils/uuid";

export type { Card, Guest };

const KEY = "chungdoi.cards";
const SEED: Card[] = [];

export function loadCards(): Card[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Card[];
  } catch {
    /* ignore corrupt storage */
  }
  return SEED;
}

export function saveCards(cards: Card[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cards));
  } catch {
    /* storage unavailable */
  }
}

/** Đồng bộ danh sách thiệp từ Backend DB */
export async function syncCardsFromApi(): Promise<Card[]> {
  if (!getAccessToken()) return loadCards();
  try {
    const serverCards = collapseDrafts(await invitationApi.list("all"), true);
    saveCards(serverCards);
    return serverCards;
  } catch (err) {
    console.warn("Không thể đồng bộ thiệp từ server, dùng cache offline:", err);
    return loadCards();
  }
}

/**
 * Luôn chỉ tồn tại MỘT thiệp nháp. Danh sách có nhiều hơn một nháp (dữ liệu cũ / đồng bộ từ server) thì
 * giữ bản mới nhất, xóa các bản nháp thừa (nội dung, khách mời ở local và bản ghi trên server).
 * `newestFirst`: true với danh sách từ server (mới nhất đứng đầu), false với danh sách local (mới nhất đứng cuối).
 */
export function collapseDrafts(cards: Card[], newestFirst: boolean): Card[] {
  const drafts = cards.filter((c) => c.status === "draft");
  if (drafts.length <= 1) return cards;
  const keep = newestFirst ? drafts[0] : drafts[drafts.length - 1];
  for (const c of drafts) {
    if (c.id === keep.id) continue;
    removeInv(c.id);
    removeGuests(c.id);
    if (getAccessToken()) invitationApi.delete(c.id).catch(console.warn);
  }
  return cards.filter((c) => c.status !== "draft" || c.id === keep.id);
}

/**
 * Mở thiệp nháp cho một mẫu và trả về id để mở editor.
 * Đã có thiệp nháp: KHÔNG tạo thêm, áp mẫu mới vào nháp đó (giữ nguyên dữ liệu đã nhập).
 * Chưa có: tạo mới.
 */
export function createDraft(t: Tpl): string {
  const existing = getDraftCard();
  if (existing) return applyTemplateToDraft(existing, t);

  const id = uuid();
  const cards = loadCards();
  const [template, ...rest] = t.name.split(" - ");
  const d = new Date();
  const created = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  const newCard: Card = {
    id,
    name: `Thiệp ${cards.length + 1}`,
    template,
    color: rest.join(" - "),
    status: "draft",
    created,
    tplId: t.id,
  };
  saveCards([...cards, newCard]);

  const initialInv: Inv = {
    ...blankInv,
    templateId: t.id,
    templateName: t.name,
    templateThumb: TPL_CDN + t.img,
    introText: introDefaultFor(t.id),
    dressColors: defaultDressColors(t.id),
    giftDisplayMode: defaultGiftMode(t.id),
  };

  saveInv(id, initialInv);

  // Nếu đã đăng nhập, tự động tạo thiệp trên Server DB
  if (getAccessToken()) {
    invitationApi.create(t.id, newCard.name).then((serverCard) => {
      // Cập nhật card ID và nội dung nếu backend sinh ID mới
      if (serverCard && serverCard.id !== id) {
        // Server chỉ cho một nháp: nếu user đã có nháp ở server (vd tạo từ thiết bị khác) thì server trả về
        // nháp đó (đã áp mẫu). Lấy nội dung thật của nháp, chỉ dùng initialInv khi nháp còn trống.
        const adopt = (content: Inv) => {
          const currentCards = loadCards().filter((c) => c.id !== id && c.id !== serverCard.id);
          saveCards([...currentCards, serverCard]);
          saveInv(serverCard.id, content);
          removeInv(id);
          if (window.location.pathname === `/edit/${id}`) {
            window.location.replace(`/edit/${serverCard.id}?template=${t.id}`);
          }
        };
        invitationApi.getById(serverCard.id)
          .then((detail) => {
            const c = detail?.content as Inv | undefined;
            adopt(c && Object.keys(c).length > 0 ? { ...initialInv, ...c, templateId: t.id, templateName: t.name, templateThumb: TPL_CDN + t.img } : initialInv);
          })
          .catch(() => adopt(initialInv));
      }
    }).catch(console.warn);
  }

  return id;
}

const INV_KEY = (cardId: string) => `chungdoi.inv.${cardId}`;

/** Nội dung editor của một thiệp (đọc từ cache local). */
export function loadInv(cardId: string): Inv | null {
  try {
    const raw = localStorage.getItem(INV_KEY(cardId));
    if (raw) return JSON.parse(raw) as Inv;
  } catch {
    /* ignore */
  }
  return null;
}

/** Tải nội dung thiệp trực tiếp từ Backend DB */
export async function fetchInvFromApi(cardId: string): Promise<Inv | null> {
  if (!getAccessToken()) return loadInv(cardId);
  try {
    const detail = await invitationApi.getById(cardId);
    if (detail && detail.content) {
      saveInv(cardId, detail.content);
      return detail.content;
    }
  } catch (err) {
    console.warn("Không thể tải nội dung thiệp từ server:", err);
  }
  return loadInv(cardId);
}

const saveTimeouts = new Map<string, any>();

/** Lưu nội dung thiệp: lưu local cache và tự động đồng bộ (auto-save debounce) lên Backend DB */
export function saveInv(cardId: string, inv: Inv) {
  try {
    localStorage.setItem(INV_KEY(cardId), JSON.stringify(inv));
  } catch {
    /* ignore */
  }

  // Tự động đẩy lên Backend DB nếu đã đăng nhập (debounce 800ms)
  if (getAccessToken()) {
    if (saveTimeouts.has(cardId)) {
      clearTimeout(saveTimeouts.get(cardId));
    }
    const timer = setTimeout(async () => {
      try {
        const card = loadCards().find((c) => c.id === cardId);
        const name = card?.name || "Thiệp cưới";
        const status = card?.status || "draft";
        await invitationApi.updateContent(cardId, name, status, inv);
      } catch (err) {
        console.warn("Auto-save lên server thất bại:", err);
      } finally {
        saveTimeouts.delete(cardId);
      }
    }, 800);
    saveTimeouts.set(cardId, timer);
  }
}

export function removeInv(cardId: string) {
  try {
    localStorage.removeItem(INV_KEY(cardId));
  } catch {
    /* ignore */
  }
}

const GUESTS_KEY = (cardId: string) => `chungdoi.guests.${cardId}`;

export function loadGuests(cardId: string): Guest[] {
  try {
    const raw = localStorage.getItem(GUESTS_KEY(cardId));
    if (raw) return JSON.parse(raw) as Guest[];
  } catch {
    /* ignore corrupt storage */
  }
  return [];
}

export async function fetchGuestsFromApi(cardId: string): Promise<Guest[]> {
  if (!getAccessToken()) return loadGuests(cardId);
  try {
    const list = await invitationApi.listGuests(cardId);
    saveGuests(cardId, list);
    return list;
  } catch {
    return loadGuests(cardId);
  }
}

export function saveGuests(cardId: string, guests: Guest[]) {
  try {
    localStorage.setItem(GUESTS_KEY(cardId), JSON.stringify(guests));
  } catch {
    /* storage unavailable */
  }
}

export function removeGuests(cardId: string) {
  try {
    localStorage.removeItem(GUESTS_KEY(cardId));
  } catch {
    /* ignore */
  }
}

/** Link xem thiệp riêng của khách mời */
export const guestUrl = (cardId: string, g: Guest) => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/i/${cardId.slice(0, 8)}/${g.slug}`;
};

/** Thiệp nháp hiện có */
export function getDraftCard(): Card | undefined {
  const cards = loadCards();
  const kept = collapseDrafts(cards, false);
  if (kept.length !== cards.length) saveCards(kept);
  return kept.filter((c) => c.status === "draft")[0];
}

/** Bảng màu Dress code mặc định của một mẫu (khi tạo thiệp hoặc khi chưa chỉnh). */
export function defaultDressColors(templateId: string): string[] {
  const palette = TEMPLATE_THEMES[templateId];
  return palette ? [palette.ink, palette.bg, "#d6c5b3", "#ece5dd"] : ["#542e08", "#9c7653", "#d6c5b3", "#ece5dd"];
}

/** Kiểu hiển thị hộp quà mặc định theo mẫu (phong bì hay hộp 3D). */
export function defaultGiftMode(templateId: string): Inv["giftDisplayMode"] {
  // ưu tiên dữ liệu đo thật từ trang gốc; chưa có thì theo cấu hình cũ
  return defaultGiftModeOf(templateId) ?? (getGiftboxConfig(templateId).giftboxType === "envelope" ? "envelope" : "gift_box");
}

const sameColors = (a: string[] | undefined, b: string[]) =>
  !!a && a.length === b.length && a.every((c, i) => c.toLowerCase() === b[i].toLowerCase());

/**
 * Phần dữ liệu đổi theo mẫu khi chuyển mẫu. Mọi thông tin người dùng đã nhập được giữ nguyên.
 * Kiểu hộp quà (phong bì / hộp 3D / ...) luôn được giữ suốt khi đổi mẫu (chỉ lấy mặc định của mẫu khi chưa có).
 * Dress code chỉ đổi sang mặc định của mẫu mới khi đang là mặc định của mẫu cũ (người dùng chưa tự chỉnh).
 */
export function templatePatch(
  t: Tpl,
  d: Pick<Inv, "introCustom" | "introText" | "dressColors" | "templateId" | "giftDisplayMode">,
): Partial<Inv> {
  const prevId = d.templateId;
  const dressUntouched = !d.dressColors?.length || (!!prevId && sameColors(d.dressColors, defaultDressColors(prevId)));
  return {
    templateId: t.id,
    templateName: t.name,
    templateThumb: TPL_CDN + t.img,
    introText: d.introCustom ? d.introText : introDefaultFor(t.id),
    dressColors: dressUntouched ? defaultDressColors(t.id) : d.dressColors,
    giftDisplayMode: d.giftDisplayMode || defaultGiftMode(t.id),
  };
}

/** Áp mẫu mới vào thiệp nháp: lưu local và đồng bộ backend */
export function applyTemplateToDraft(card: Card, t: Tpl): string {
  const [template, ...rest] = t.name.split(" - ");
  saveCards(loadCards().map((c) => (c.id === card.id ? { ...c, template, color: rest.join(" - "), tplId: t.id } : c)));
  const inv = loadInv(card.id);
  if (inv) saveInv(card.id, { ...inv, ...templatePatch(t, inv) });

  if (getAccessToken()) {
    invitationApi.changeTemplate(card.id, t.id).catch(console.warn);
  }

  return card.id;
}
