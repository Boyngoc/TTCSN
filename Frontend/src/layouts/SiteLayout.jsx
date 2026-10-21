import { CalendarDays, CircleUserRound, Menu, Shield, Trophy, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

function roleHome(role) {
  if (role === 'ADMIN') return '/quan-tri'
  if (role === 'OWNER') return '/chu-san'
  return '/dat-san-cua-toi'
}

export default function SiteLayout() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const navClass = ({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-pitch-50 text-pitch-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-pitch-700 text-white"><Trophy size={20} /></span>
            <span><span className="block text-lg font-black leading-5 tracking-tight text-slate-950">Sân Nhà</span><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-pitch-700">Football booking</span></span>
          </Link>
          <button aria-label="Mở menu" className="rounded-xl p-2 text-slate-700 md:hidden" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
          <nav className={`${menuOpen ? 'absolute left-0 right-0 top-[76px] flex border-b border-slate-200 bg-white p-4 shadow-lg' : 'hidden'} flex-col gap-2 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            <NavLink to="/san" className={navClass} onClick={() => setMenuOpen(false)}>Tìm sân</NavLink>
            {user?.role === 'USER' && <NavLink to="/dat-san-cua-toi" className={navClass} onClick={() => setMenuOpen(false)}>Lịch đặt</NavLink>}
            {user?.role === 'OWNER' && <NavLink to="/chu-san" className={navClass} onClick={() => setMenuOpen(false)}>Quản lý sân</NavLink>}
            {user?.role === 'ADMIN' && <NavLink to="/quan-tri" className={navClass} onClick={() => setMenuOpen(false)}>Quản trị</NavLink>}
            {user && <NavLink to="/tai-khoan" className={navClass} onClick={() => setMenuOpen(false)}>Hồ sơ</NavLink>}
            {!user ? <><NavLink to="/dang-nhap" className={navClass} onClick={() => setMenuOpen(false)}>Đăng nhập</NavLink><Link to="/dang-ky" className="btn-primary text-center" onClick={() => setMenuOpen(false)}>Tạo tài khoản</Link></> :
              <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 md:border-0 md:pt-0">
                <Link to={roleHome(user.role)} className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700"><CircleUserRound size={17} /><span className="max-w-32 truncate">{user.fullName || 'Tài khoản'}</span></Link>
                <button className="px-3 py-2 text-sm font-semibold text-slate-500 hover:text-red-600" onClick={logout}>Đăng xuất</button>
              </div>}
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-220px)]"><Outlet /></main>
      <footer className="mt-20 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-9 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div><p className="font-black text-slate-900">Sân Nhà</p><p className="mt-1 text-sm text-slate-500">Đặt sân nhanh, sẵn sàng cho trận đấu tiếp theo.</p></div>
          <p className="flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={16} />Đặt sân theo thời gian thực từ hệ thống</p>
        </div>
      </footer>
    </div>
  )
}
