import { apiFetch } from "./client";
import type { Inv } from "@/types/invitation";

export interface PublicInvitationResponse {
  id: string;
  name: string;
  slug: string;
  templateId: string;
  templateName: string;
  content: Inv;
  guestName?: string;
  guestSlug?: string;
}

export interface SubmitRsvpPayload {
  name: string;
  phone?: string;
  attending: "yes" | "no";
  guestCount?: number;
  note?: string;
}

export interface SubmitWishPayload {
  name: string;
  message: string;
}

export const publicApi = {
  async getInvitation(slug: string, guestSlug?: string): Promise<PublicInvitationResponse> {
    const path = guestSlug
      ? `/public/invitations/${slug}/guest/${guestSlug}`
      : `/public/invitations/${slug}`;
    return apiFetch<PublicInvitationResponse>(path);
  },

  async submitRsvp(slug: string, payload: SubmitRsvpPayload): Promise<void> {
    await apiFetch(`/public/invitations/${slug}/rsvp`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async submitWish(slug: string, payload: SubmitWishPayload): Promise<void> {
    await apiFetch(`/public/invitations/${slug}/wishes`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getWishes(slug: string): Promise<Array<{ id: string; name: string; message: string; createdAt: string }>> {
    return apiFetch(`/public/invitations/${slug}/wishes`);
  },
};
