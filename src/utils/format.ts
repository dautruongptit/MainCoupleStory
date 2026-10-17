import type { Inv } from "@/types/invitation";

export const groomShown = (d: Inv) => d.groomNick || d.groomFull || "Chú Rể";
export const brideShown = (d: Inv) => d.brideNick || d.brideFull || "Cô Dâu";
