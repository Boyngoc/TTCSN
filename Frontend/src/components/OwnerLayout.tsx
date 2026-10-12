"use client";

import type { ReactNode } from "react";
import { AuthGate } from "@/components/AuthGate";

export function OwnerLayout({ children }: { children: ReactNode }) {
  return <AuthGate roles={["OWNER"]}>{children}</AuthGate>;
}