import { CircleUserRound, LogOut, Menu, Trophy, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import Footer from '../components/Footer.jsx'

function roleHome(role) {
  if (role === 'ADMIN') return '/quan-tri'
  if (role === 'OWNER') return '/chu-san'
  return '/dat-san-cua-toi'
}

export default function SiteLayout() {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const navClass = ({ isActive }) => `rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-pitch-50 text-pitch-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`

  const closeMenu = () => setMenuOpen(false)

  if (pathname === '/quan-tri') return <Outlet />

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3" onClick={closeMenu}>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-pitch-600 text-white shadow-sm shadow-pitch-600/20">
              <Trophy size={20} />
            </span>
            <span>
              <span className="block text-base font-extrabold leading-5 tracking-tight text-slate-950 sm:text-lg">Sân Nhà</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-pitch-700">Football Booking</span>
            </span>
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-100 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <nav
            id="site-navigation"
            className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-[72px] z-40 flex-col gap-1 border-b border-slate-200 bg-white p-4 shadow-lg md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            <NavLink to="/san" className={navClass} onClick={closeMenu}>Tìm sân</NavLink>
            {user?.role === 'USER' && <NavLink to="/dat-san-cua-toi" className={navClass} onClick={closeMenu}>Lịch đặt</NavLink>}
            {user?.role === 'OWNER' && <NavLink to="/chu-san" className={navClass} onClick={closeMenu}>Quản lý sân</NavLink>}
            {user?.role === 'ADMIN' && <NavLink to="/quan-tri" className={navClass} onClick={closeMenu}>Quản trị</NavLink>}
            {user && <NavLink to="/tai-khoan" className={navClass} onClick={closeMenu}>Hồ sơ</NavLink>}
            {!user ? (
              <>
                <NavLink to="/dang-nhap" className={navClass} onClick={closeMenu}>Đăng nhập</NavLink>
                <Link to="/dang-ky" className="btn-primary justify-center md:ml-1" onClick={closeMenu}>Tạo tài khoản</Link>
              </>
            ) : (
              <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 md:ml-2 md:mt-0 md:border-0 md:pt-0">
                <Link to={roleHome(user.role)} className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700" onClick={closeMenu}>
                  <CircleUserRound size={17} className="shrink-0 text-pitch-600" />
                  <span className="max-w-36 truncate">{user.fullName || 'Tài khoản'}</span>
                </Link>
                <button type="button" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-700" onClick={() => { logout(); closeMenu() }}>
                  <LogOut size={16} /> Đăng xuất
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-220px)]"><Outlet /></main>
      <Footer />
    </div>
  )
}
