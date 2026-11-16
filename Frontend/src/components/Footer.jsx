import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Trophy, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50 text-slate-600 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      
      {/* Top Banner / Feature Highlights */}
      <div className="border-b border-slate-200/80 bg-white py-6 transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-pitch-200 bg-pitch-50 text-pitch-700 dark:border-pitch-700/50 dark:bg-pitch-900/40 dark:text-pitch-300">
                <Clock size={20} />
              </span>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">Đặt sân theo ca cố định</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">90 phút / ca linh hoạt từ 06:00 đến 23:00</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-pitch-200 bg-pitch-50 text-pitch-700 dark:border-pitch-700/50 dark:bg-pitch-900/40 dark:text-pitch-300">
                <Sparkles size={20} />
              </span>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">Giờ vàng minh bạch</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">17:00 - 21:30 chỉ 350.000 đ/giờ (525k/ca)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-pitch-200 bg-pitch-50 text-pitch-700 dark:border-pitch-700/50 dark:bg-pitch-900/40 dark:text-pitch-300">
                <ShieldCheck size={20} />
              </span>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">Xác nhận nhanh chóng</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Hệ thống đồng bộ lịch tức thì, tránh trùng sân</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand & Introduction */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-pitch-600 text-white shadow-md shadow-pitch-600/25 transition group-hover:bg-pitch-700">
                <Trophy size={20} />
              </span>
              <span>
                <span className="block text-xl font-black leading-5 tracking-tight text-slate-900 dark:text-white">
                  Sân Nhà
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-pitch-600 dark:text-pitch-400">
                  Football booking
                </span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Nền tảng đặt sân bóng đá công nghệ hàng đầu, kết nối cầu thủ đam mê với các cụm sân chất lượng cao tại Hà Nội và toàn quốc.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-pitch-200 bg-pitch-50 px-3 py-1.5 text-xs font-semibold text-pitch-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-pitch-600 animate-pulse dark:bg-emerald-400" />
              Hệ thống trực tuyến thời gian thực
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Khám Phá Sân
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/san" className="flex items-center gap-1.5 text-slate-600 hover:text-pitch-600 transition-colors dark:text-slate-400 dark:hover:text-pitch-300">
                  <ChevronRight size={14} className="text-slate-400" />
                  Tìm sân bóng gần bạn
                </Link>
              </li>
              <li>
                <Link to="/san" className="flex items-center gap-1.5 text-slate-600 hover:text-pitch-600 transition-colors dark:text-slate-400 dark:hover:text-pitch-300">
                  <ChevronRight size={14} className="text-slate-400" />
                  Sân cỏ nhân tạo 5 - 7 - 11 người
                </Link>
              </li>
              <li>
                <Link to="/dat-san-cua-toi" className="flex items-center gap-1.5 text-slate-600 hover:text-pitch-600 transition-colors dark:text-slate-400 dark:hover:text-pitch-300">
                  <ChevronRight size={14} className="text-slate-400" />
                  Lịch đặt sân của tôi
                </Link>
              </li>
              <li>
                <Link to="/tai-khoan" className="flex items-center gap-1.5 text-slate-600 hover:text-pitch-600 transition-colors dark:text-slate-400 dark:hover:text-pitch-300">
                  <ChevronRight size={14} className="text-slate-400" />
                  Thông tin tài khoản cá nhân
                </Link>
              </li>
              <li>
                <Link to="/dang-ky" className="flex items-center gap-1.5 text-slate-600 hover:text-pitch-600 transition-colors dark:text-slate-400 dark:hover:text-pitch-300">
                  <ChevronRight size={14} className="text-slate-400" />
                  Đăng ký tài khoản người chơi
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Booking Rules */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Quy Định Đặt Sân
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-pitch-600" />
                <span><strong className="text-slate-800 dark:text-slate-200">Đặt theo ca:</strong> Mỗi ca thi đấu chuẩn 90 phút (Ca 1 đến Ca 9).</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-pitch-600" />
                <span><strong className="text-slate-800 dark:text-slate-200">Giờ cao điểm:</strong> 17:00 - 21:30 áp dụng giá 350.000 đ/giờ.</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-pitch-600" />
                <span><strong className="text-slate-800 dark:text-slate-200">Thanh toán:</strong> Trực tiếp tại quầy khi đến nhận sân.</span>
              </li>
              <li>
                <Link to="/chu-san" className="flex items-center gap-1.5 text-pitch-600 hover:text-pitch-700 transition-colors pt-1 font-semibold dark:text-pitch-400 dark:hover:text-pitch-300">
                  <ChevronRight size={14} />
                  Kênh dành cho Chủ sân đối tác
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Liên Hệ & Hỗ Trợ
            </h4>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-pitch-600 dark:text-pitch-400" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">1900 6868 / 0901 234 567</p>
                  <p className="text-xs text-slate-500">Hỗ trợ khách hàng 06:00 - 23:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-pitch-600 dark:text-pitch-400" />
                <div>
                  <p className="text-slate-800 dark:text-slate-200">hotro@sannha.vn</p>
                  <p className="text-xs text-slate-500">support@footballbooking.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pitch-600 dark:text-pitch-400" />
                <div>
                  <p className="text-slate-800 dark:text-slate-200">Hà Nội & TP. Hồ Chí Minh</p>
                  <p className="text-xs text-slate-500">Các cụm sân liên kết trên toàn quốc</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-200 pt-6 transition-colors duration-200 dark:border-slate-800">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} <strong className="text-slate-800 dark:text-slate-200">Sân Nhà - Football Booking</strong>. Tất cả quyền được bảo lưu.
            </p>
            <p className="text-xs text-slate-500">
              Nền tảng quản lý & đặt lịch sân bóng đá trực tuyến uy tín.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
