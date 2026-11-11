import { useState, useEffect } from "react";
import { authApi, type GoogleLoginPayload } from "@/services/api/authApi";
import { getCurrentUser, getAccessToken, type ApiUser } from "@/services/api/client";

export function useAuth() {
  const [user, setUser] = useState<ApiUser | null>(getCurrentUser);
  const [loggedIn, setLoggedIn] = useState<boolean>(() => !!getAccessToken());

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(getCurrentUser());
      setLoggedIn(!!getAccessToken());
    };

    window.addEventListener("auth_change", handleAuthChange);
    return () => window.removeEventListener("auth_change", handleAuthChange);
  }, []);

  return {
    loggedIn,
    user,
    async login(email: string, password: string) {
      const resp = await authApi.login(email, password);
      setUser(resp.user);
      setLoggedIn(true);
      return resp;
    },
    async register(email: string, password: string, fullName?: string) {
      const resp = await authApi.register(email, password, fullName);
      setUser(resp.user);
      setLoggedIn(true);
      return resp;
    },
    async loginWithGoogle(payload: GoogleLoginPayload) {
      const resp = await authApi.loginWithGoogle(payload);
      setUser(resp.user);
      setLoggedIn(true);
      return resp;
    },
    logout() {
      authApi.logout();
      setUser(null);
      setLoggedIn(false);
    },
  };
}
