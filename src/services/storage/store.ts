import { getGiftboxConfig } from "@/features/invitation/config/giftboxConfigs";
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
    const serverCards = await invitationApi.list("all");
    saveCards(serverCards);
    return serverCards;
  } catch (err) {
    console.warn("Không thể đồng bộ thiệp từ server, dùng cache offline:", err);
    return loadCards();
  }
}

/** Tạo thiệp nháp từ một mẫu và trả về id để mở editor. */
export function createDraft(t: Tpl): string {
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

  const palette = TEMPLATE_THEMES[t.id];
  const dressColors = palette
    ? [palette.ink, palette.bg, "#d6c5b3", "#ece5dd"]
    : ["#542e08", "#9c7653", "#d6c5b3", "#ece5dd"];

  const initialInv: Inv = {
    ...blankInv,
    templateId: t.id,
    templateName: t.name,
    templateThumb: TPL_CDN + t.img,
    introText: introDefaultFor(t.id),
    dressColors,
    giftDisplayMode: getGiftboxConfig(t.id).giftboxType === "envelope" ? "envelope" : "gift_box",
  };

  saveInv(id, initialInv);

  // Nếu đã đăng nhập, tự động tạo thiệp trên Server DB
  if (getAccessToken()) {
    invitationApi.create(t.id, newCard.name).then((serverCard) => {
      // Cập nhật card ID và nội dung nếu backend sinh ID mới
      if (serverCard && serverCard.id !== id) {
        const currentCards = loadCards().filter((c) => c.id !== id);
        saveCards([...currentCards, serverCard]);
        saveInv(serverCard.id, initialInv);
        removeInv(id);
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
  return loadCards().find((c) => c.status === "draft");
}

/** Phần dữ liệu đổi theo mẫu khi chuyển mẫu */
export function templatePatch(t: Tpl, d: Pick<Inv, "introCustom" | "introText" | "dressColors">): Partial<Inv> {
  const palette = TEMPLATE_THEMES[t.id];
  return {
    templateId: t.id,
    templateName: t.name,
    templateThumb: TPL_CDN + t.img,
    introText: d.introCustom ? d.introText : introDefaultFor(t.id),
    dressColors: palette ? [palette.ink, palette.bg, "#d6c5b3", "#ece5dd"] : d.dressColors,
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
