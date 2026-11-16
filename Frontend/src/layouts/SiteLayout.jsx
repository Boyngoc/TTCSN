import { CircleUserRound, Menu, Moon, Sun, Trophy, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useTheme } from '../contexts/ThemeContext.jsx'
import Footer from '../components/Footer.jsx'

function roleHome(role) {
  if (role === 'ADMIN') return '/quan-tri'
  if (role === 'OWNER') return '/chu-san'
  return '/dat-san-cua-toi'
}

export default function SiteLayout() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-pitch-50 text-pitch-700 dark:bg-pitch-950/70 dark:text-pitch-300'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
    }`

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 transition-colors duration-200 dark:bg-[#0b1120] dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-pitch-600 text-white shadow-md shadow-pitch-600/25">
              <Trophy size={20} />
            </span>
            <span>
              <span className="block text-lg font-black leading-5 tracking-tight text-slate-950 dark:text-white">
                Sân Nhà
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-pitch-600 dark:text-pitch-400">
                Football booking
              </span>
            </span>
          </Link>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button (Sáng / Tối) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white cursor-pointer"
              aria-label={isDark ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
              title={isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
            >
              {isDark ? (
                <Sun size={19} className="text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon size={19} className="text-slate-600 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              aria-label="Mở menu"
              className="rounded-xl p-2 text-slate-700 dark:text-slate-200 md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            {/* Navigation links */}
            <nav
              className={`${
                menuOpen
                  ? 'absolute left-0 right-0 top-[76px] flex border-b border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900'
                  : 'hidden'
              } flex-col gap-2 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
            >
              <NavLink to="/san" className={navClass} onClick={() => setMenuOpen(false)}>
                Tìm sân
              </NavLink>
              {user?.role === 'USER' && (
                <NavLink to="/dat-san-cua-toi" className={navClass} onClick={() => setMenuOpen(false)}>
                  Lịch đặt
                </NavLink>
              )}
              {user?.role === 'OWNER' && (
                <NavLink to="/chu-san" className={navClass} onClick={() => setMenuOpen(false)}>
                  Quản lý sân
                </NavLink>
              )}
              {user?.role === 'ADMIN' && (
                <NavLink to="/quan-tri" className={navClass} onClick={() => setMenuOpen(false)}>
                  Quản trị
                </NavLink>
              )}
              {user && (
                <NavLink to="/tai-khoan" className={navClass} onClick={() => setMenuOpen(false)}>
                  Hồ sơ
                </NavLink>
              )}
              {!user ? (
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <NavLink to="/dang-nhap" className={navClass} onClick={() => setMenuOpen(false)}>
                    Đăng nhập
                  </NavLink>
                  <Link
                    to="/dang-ky"
                    className="btn-primary text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Tạo tài khoản
                  </Link>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800 md:border-0 md:pt-0">
                  <Link
                    to={roleHome(user.role)}
                    className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <CircleUserRound size={17} />
                    <span className="max-w-32 truncate">{user.fullName || 'Tài khoản'}</span>
                  </Link>
                  <button
                    className="px-3 py-2 text-sm font-semibold text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                    onClick={logout}
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </nav>
          </div>

        </div>
      </header>

      <main className="min-h-[calc(100vh-220px)]">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
