import { Tpl } from "./templates";
import type { Inv } from "./data";

export type Card = {
  id: string;
  name: string;
  template: string;
  color: string;
  status: "draft" | "published";
  created: string;
  tplId?: string;
};

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
    /* storage unavailable (private mode) – state still lives in memory */
  }
}

/** Tạo thiệp nháp từ một mẫu và trả về id để mở editor. */
export function createDraft(t: Tpl): string {
  const id = crypto.randomUUID();
  const cards = loadCards();
  const [template, ...rest] = t.name.split(" - ");
  const d = new Date();
  const created = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  saveCards([...cards, { id, name: `Thiệp ${cards.length + 1}`, template, color: rest.join(" - "), status: "draft", created, tplId: t.id }]);
  return id;
}

const INV_KEY = (cardId: string) => `chungdoi.inv.${cardId}`;

/** Nội dung editor của một thiệp (chỉ lưu trong trình duyệt này). */
export function loadInv(cardId: string): Inv | null {
  try {
    const raw = localStorage.getItem(INV_KEY(cardId));
    if (raw) return JSON.parse(raw) as Inv;
  } catch {
    /* ignore corrupt storage */
  }
  return null;
}

export function saveInv(cardId: string, inv: Inv) {
  try {
    localStorage.setItem(INV_KEY(cardId), JSON.stringify(inv));
  } catch {
    /* quota hoặc private mode: dữ liệu vẫn nằm trong state */
  }
}

export function removeInv(cardId: string) {
  try {
    localStorage.removeItem(INV_KEY(cardId));
  } catch {
    /* ignore */
  }
}
