"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingState } from "@/components/PageState";
import { useAuth } from "@/app/providers";
import type { Role } from "@/lib/types";

export function AuthGate({ children, roles }: { children: React.ReactNode; roles?: Role[] }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const permitted = !!user && (!roles || roles.includes(user.role));

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    else if (roles && !roles.includes(user.role)) router.replace("/");
  }, [loading, user, roles, router]);

  return loading || !permitted ? <LoadingState label="Đang xác thực tài khoản" /> : children;
}