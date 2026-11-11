import { apiFetch } from "./client";
import type { Card } from "@/types/card";
import type { Guest } from "@/types/guest";
import type { Inv } from "@/types/invitation";

export interface InvitationDetailResponse {
  id: string;
  name: string;
  slug: string;
  status: "draft" | "published";
  templateId: string;
  templateName: string;
  content: Inv;
  createdAt: string;
  updatedAt: string;
}

export interface RsvpItem {
  id: string;
  name: string;
  phone?: string;
  attending: "yes" | "no";
  guestCount: number;
  note?: string;
  createdAt: string;
}

export interface WishItem {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export const invitationApi = {
  async list(status: "all" | "draft" | "published" = "all"): Promise<Card[]> {
    const list = await apiFetch<any[]>(`/invitations?status=${status}`);
    return list.map((item) => ({
      id: String(item.id),
      name: item.name,
      template: item.template,
      color: item.color,
      status: item.status as "draft" | "published",
      created: item.created,
      tplId: item.tplId,
      slug: item.slug,
    }));
  },

  async create(templateId: string, name?: string): Promise<Card> {
    const item = await apiFetch<any>("/invitations", {
      method: "POST",
      body: JSON.stringify({ templateId, name }),
    });
    return {
      id: String(item.id),
      name: item.name,
      template: item.template,
      color: item.color,
      status: item.status as "draft" | "published",
      created: item.created,
      tplId: item.tplId,
      slug: item.slug,
    };
  },

  async getById(id: string): Promise<InvitationDetailResponse> {
    return apiFetch<InvitationDetailResponse>(`/invitations/${id}`);
  },

  async updateContent(id: string, name: string, status: "draft" | "published", content: Inv): Promise<InvitationDetailResponse> {
    return apiFetch<InvitationDetailResponse>(`/invitations/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, status, content }),
    });
  },

  async changeTemplate(id: string, templateId: string): Promise<InvitationDetailResponse> {
    return apiFetch<InvitationDetailResponse>(`/invitations/${id}/template`, {
      method: "PATCH",
      body: JSON.stringify({ templateId }),
    });
  },

  async delete(id: string): Promise<void> {
    await apiFetch(`/invitations/${id}`, {
      method: "DELETE",
    });
  },

  async listGuests(invitationId: string): Promise<Guest[]> {
    const list = await apiFetch<any[]>(`/invitations/${invitationId}/guests`);
    return list.map((g) => ({
      id: String(g.id),
      name: g.name,
      slug: g.slug,
      views: g.views || 0,
      added: g.added || "",
    }));
  },

  async createGuest(invitationId: string, name: string, phone?: string, groupName?: string): Promise<Guest> {
    const g = await apiFetch<any>(`/invitations/${invitationId}/guests`, {
      method: "POST",
      body: JSON.stringify({ name, phone, groupName }),
    });
    return {
      id: String(g.id),
      name: g.name,
      slug: g.slug,
      views: g.views || 0,
      added: g.added || "",
    };
  },

  async deleteGuest(invitationId: string, guestId: string): Promise<void> {
    await apiFetch(`/invitations/${invitationId}/guests/${guestId}`, {
      method: "DELETE",
    });
  },

  async listRsvps(invitationId: string): Promise<RsvpItem[]> {
    return apiFetch<RsvpItem[]>(`/invitations/${invitationId}/rsvps`);
  },

  async listWishes(invitationId: string): Promise<WishItem[]> {
    return apiFetch<WishItem[]>(`/invitations/${invitationId}/wishes`);
  },

  async deleteWish(invitationId: string, wishId: string): Promise<void> {
    await apiFetch(`/invitations/${invitationId}/wishes/${wishId}`, {
      method: "DELETE",
    });
  },
};
