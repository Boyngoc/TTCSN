"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarDays, LayoutDashboard, MapPinned, Shapes, UsersRound } from "lucide-react";
import type { ReactNode } from "react";
import { AuthGate } from "@/components/AuthGate";

const items = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/admin/users", label: "Người dùng", icon: UsersRound },
  { href: "/admin/fields", label: "Sân bóng", icon: MapPinned },
  { href: "/admin/field-types", label: "Loại sân", icon: Shapes },
  { href: "/admin/bookings", label: "Lượt đặt", icon: CalendarDays },
  { href: "/admin/statistics", label: "Thống kê", icon: BarChart3 },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <AuthGate roles={["ADMIN"]}><div className="page-wrap admin-layout"><aside className="admin-sidebar"><p>Quản trị hệ thống</p>{items.map(({ href, label, icon: Icon }) => <Link href={href} key={href} className={pathname === href || (href !== "/admin" && pathname.startsWith(href)) ? "admin-nav-active" : ""}><Icon size={16} />{label}</Link>)}</aside><main className="admin-main">{children}</main></div></AuthGate>;
}