"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, Shield, UserRound, X } from "lucide-react";
import { useAuth } from "@/app/providers";

export function SiteHeader() {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = user?.role === "ADMIN";
  const isOwner = user?.role === "OWNER";
  const links = [
    { href: "/fields", label: "Tìm sân" },
    ...(user ? [{ href: "/bookings", label: "Lịch đặt" }] : []),
    ...(isOwner ? [{ href: "/owner", label: "Quản lý sân" }] : []),
    ...(isAdmin ? [{ href: "/admin", label: "Quản trị" }] : []),
  ];

  const logout = () => {
    signOut();
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Sân Nhà, trang chủ" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><span /></span>
          <span>SÂN NHÀ<span className="brand-period">.</span></span>
        </Link>
        <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Điều hướng chính">
          {links.map((link) => <Link key={link.href} href={link.href} className={pathname.startsWith(link.href) ? "nav-active" : ""} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}
          <div className="mobile-nav-actions">
            {user ? <><Link href="/profile" onClick={() => setMenuOpen(false)}><UserRound size={17} /> Hồ sơ</Link><button onClick={logout}>Đăng xuất</button></> : <Link href="/login" onClick={() => setMenuOpen(false)}>Đăng nhập</Link>}
          </div>
        </nav>
        <div className="header-actions">
          {!loading && (user ? <>
            {isAdmin && <Link href="/admin" className="admin-shortcut" aria-label="Khu vực quản trị"><Shield size={17} /></Link>}
            <Link href="/profile" className="account-link"><span className="account-avatar">{user.fullName.slice(0, 1).toLocaleUpperCase("vi-VN")}</span><span>{user.fullName.split(" ").at(-1)}</span></Link>
            <button className="button button-dark button-small" onClick={logout}>Đăng xuất</button>
          </> : <>
            <Link href="/login" className="login-link">Đăng nhập</Link>
            <Link href="/register" className="button button-primary button-small">Bắt đầu <ArrowUpRight size={15} /></Link>
          </>)}
        </div>
        <button className="menu-toggle" aria-label={menuOpen ? "Đóng menu" : "Mở menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}