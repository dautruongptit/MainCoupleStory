const TOKEN_KEY = "chungdoi.access_token";
const REFRESH_TOKEN_KEY = "chungdoi.refresh_token";
const USER_KEY = "chungdoi.user";

export interface ApiUser {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role: string;
}

export function getAccessToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
}

export function getRefreshToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
}

export function getCurrentUser(): ApiUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setAuthSession(accessToken: string, refreshToken: string, user: ApiUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem("chungdoi.logged_in", "true");
  window.dispatchEvent(new Event("auth_change"));
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("chungdoi.logged_in");
  window.dispatchEvent(new Event("auth_change"));
}

export class ApiError extends Error {
  code?: string;
  status: number;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `/api/v1${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers = new Headers(options.headers || {});
  const token = getAccessToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle unauthorized with potential refresh
  if (response.status === 401 && getRefreshToken() && !endpoint.includes("/auth/")) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      headers.set("Authorization", `Bearer ${getAccessToken()}`);
      const retryResponse = await fetch(url, { ...options, headers });
      return handleResponse<T>(retryResponse);
    } else {
      clearAuthSession();
    }
  }

  return handleResponse<T>(response);
}

async function handleResponse<T>(response: Response): Promise<T> {
  let json: any = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      json = await response.json();
    } catch {
      json = null;
    }
  }

  if (!response.ok) {
    const errorMsg = json?.error?.message || response.statusText || "Lỗi yêu cầu";
    const errorCode = json?.error?.code;
    throw new ApiError(errorMsg, response.status, errorCode);
  }

  if (json && typeof json === "object" && "data" in json) {
    return json.data as T;
  }

  return json as T;
}

let isRefreshing = false;
async function tryRefreshToken(): Promise<boolean> {
  if (isRefreshing) return false;
  isRefreshing = true;
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    const res = await fetch("/api/v1/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return false;
    const json = await res.json();
    if (json.success && json.data) {
      localStorage.setItem(TOKEN_KEY, json.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, json.data.refreshToken);
      if (json.data.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(json.data.user));
      }
      return true;
    }
    return false;
  } catch {
    return false;
  } finally {
    isRefreshing = false;
  }
}
