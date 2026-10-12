import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Trophy,
  User,
  LogOut,
  Calendar,
  LayoutDashboard,
  Shield,
  Menu,
  X,
  Search,
} from 'lucide-react';
import { Role } from '../utils/status';

export const PublicLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Danh sách sân', path: '/fields' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-200">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-gray-900">
                  Football<span className="text-emerald-600">Booking</span>
                </span>
                <span className="block text-[10px] text-gray-400 font-medium -mt-1">
                  Hệ thống đặt sân bóng
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-emerald-600 border-b-2 border-emerald-600 py-5'
                        : 'text-gray-600 hover:text-emerald-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Auth Buttons / User Menu */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  {user?.role === Role.ADMIN && (
                    <Link
                      to="/admin"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Trang Quản Trị
                    </Link>
                  )}
                  {user?.role === Role.OWNER && (
                    <Link
                      to="/owner"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      Quản Lý Sân
                    </Link>
                  )}
                  {user?.role === Role.USER && (
                    <Link
                      to="/my-bookings"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Lịch Đặt Của Tôi
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 pl-3 border-l border-gray-200 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs group-hover:ring-2 group-hover:ring-emerald-500 transition-all">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-semibold text-gray-800 line-clamp-1 group-hover:text-emerald-600">
                        {user?.fullName}
                      </span>
                      <span className="block text-[10px] text-gray-400 capitalize">
                        {user?.role?.toLowerCase()}
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    title="Đăng xuất"
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-lg transition-colors"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg shadow-sm shadow-emerald-200 transition-colors"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-gray-700 hover:text-emerald-600"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-gray-100">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user?.fullName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-gray-700 hover:text-emerald-600"
                  >
                    Thông tin cá nhân
                  </Link>

                  {user?.role === Role.USER && (
                    <Link
                      to="/my-bookings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-gray-700 hover:text-emerald-600"
                    >
                      Lịch đặt của tôi
                    </Link>
                  )}

                  {user?.role === Role.OWNER && (
                    <Link
                      to="/owner"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-blue-600 font-semibold"
                    >
                      Bảng điều khiển Chủ sân
                    </Link>
                  )}

                  {user?.role === Role.ADMIN && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-purple-600 font-semibold"
                    >
                      Bảng điều khiển Quản trị viên
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left py-2 text-sm text-red-600 font-medium"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Page Body */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 text-gray-600 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                  <Trophy className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-base text-gray-900">
                  Football<span className="text-emerald-600">Booking</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                Nền tảng đặt sân bóng đá trực tuyến hàng đầu, kết nối người chơi với các sân bóng chất lượng cao nhanh chóng, minh bạch và tiện lợi.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 text-xs tracking-wider uppercase mb-4">
                Liên kết nhanh
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-500">
                <li><Link to="/" className="hover:text-emerald-600">Trang chủ</Link></li>
                <li><Link to="/fields" className="hover:text-emerald-600">Tìm sân bóng</Link></li>
                <li><Link to="/login" className="hover:text-emerald-600">Đăng nhập</Link></li>
                <li><Link to="/register" className="hover:text-emerald-600">Đăng ký chủ sân</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 text-xs tracking-wider uppercase mb-4">
                Hỗ trợ kỹ thuật
              </h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>Hotline: 1900 6868</li>
                <li>Email: support@footballbooking.com</li>
                <li>Thời gian: 06:00 - 23:00 hàng ngày</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Football Booking SOA Project. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
