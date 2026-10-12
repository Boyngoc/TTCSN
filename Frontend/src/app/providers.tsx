"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, clearToken, getToken, saveToken } from "@/lib/api";
import type { LoginResponse, User } from "@/lib/types";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (input: { fullName: string; email: string; password: string; phone: string }) => Promise<User>;
  signOut: () => void;
  refreshProfile: () => Promise<void>;
};

type ToastItem = { id: number; message: string; kind: "success" | "error" | "info" };
type ToastContextValue = { notify: (message: string, kind?: ToastItem["kind"]) => void };

const AuthContext = createContext<AuthContextValue | null>(null);
const ToastContext = createContext<ToastContextValue | null>(null);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const notify = (message: string, kind: ToastItem["kind"] = "info") => {
    const id = Date.now() + Math.random();
    setToasts((items) => [...items, { id, message, kind }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 3600);
  };

  const refreshProfile = async () => {
    const profile = await api<User>("/users/me");
    setUser(profile);
  };

  useEffect(() => {
    const stored = getToken();
    if (!stored) {
      setLoading(false);
      return;
    }
    setToken(stored);
    api<User>("/users/me", { token: stored })
      .then(setUser)
      .catch(() => {
        clearToken();
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await api<LoginResponse>("/auth/login", {
      method: "POST", body: { email, password }, token: null,
    });
    saveToken(result.accessToken);
    setToken(result.accessToken);
    const profile = await api<User>("/users/me", { token: result.accessToken });
    setUser(profile);
    return profile;
  };

  const signUp = async (input: { fullName: string; email: string; password: string; phone: string }) =>
    api<User>("/auth/register", { method: "POST", body: input, token: null });

  const signOut = () => {
    clearToken();
    setToken(null);
    setUser(null);
  };

  const authValue = useMemo(() => ({ user, token, loading, signIn, signUp, signOut, refreshProfile }), [user, token, loading]);
  const toastValue = useMemo(() => ({ notify }), []);

  return (
    <AuthContext.Provider value={authValue}>
      <ToastContext.Provider value={toastValue}>
        {children}
        <div className="toast-stack" aria-live="polite" aria-atomic="false">
          {toasts.map((toast) => <div className={`toast toast-${toast.kind}`} key={toast.id}>{toast.message}</div>)}
        </div>
      </ToastContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AppProviders");
  return value;
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used inside AppProviders");
  return value;
}