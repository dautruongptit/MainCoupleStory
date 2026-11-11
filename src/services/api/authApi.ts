import { apiFetch, setAuthSession, clearAuthSession, getCurrentUser, type ApiUser } from "./client";

export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  user: ApiUser;
}

export interface GoogleLoginPayload {
  idToken?: string;
  email?: string;
  fullName?: string;
  avatarUrl?: string;
}

export const authApi = {
  async register(email: string, password: string, fullName?: string): Promise<AuthResponseData> {
    const data = await apiFetch<AuthResponseData>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName }),
    });
    setAuthSession(data.accessToken, data.refreshToken, data.user);
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponseData> {
    const data = await apiFetch<AuthResponseData>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setAuthSession(data.accessToken, data.refreshToken, data.user);
    return data;
  },

  async loginWithGoogle(payload: GoogleLoginPayload): Promise<AuthResponseData> {
    const data = await apiFetch<AuthResponseData>("/auth/google", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setAuthSession(data.accessToken, data.refreshToken, data.user);
    return data;
  },

  async getMe(): Promise<ApiUser> {
    return apiFetch<ApiUser>("/users/me");
  },

  logout() {
    clearAuthSession();
  },

  getCurrentUser,
};
