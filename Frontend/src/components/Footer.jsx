import { ChevronRight, Clock3, Mail, MapPin, Phone, ShieldCheck, Sparkles, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

const highlights = [
  { icon: Clock3, title: 'Đặt sân theo ca cố định', description: '90 phút / ca từ 06:00 đến 23:00' },
  { icon: Sparkles, title: 'Giờ vàng minh bạch', description: '17:00 - 21:30 áp dụng giá 350.000 đ/giờ' },
  { icon: ShieldCheck, title: 'Xác nhận nhanh chóng', description: 'Theo dõi trạng thái lượt đặt trên hệ thống' },
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-slate-600">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-pitch-100 bg-pitch-50 text-pitch-700">
                <Icon size={19} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-800">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-pitch-600 text-white"><Trophy size={19} /></span>
              <span>
                <span className="block text-lg font-extrabold leading-5 text-slate-950">Sân Nhà</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-pitch-700">Football Booking</span>
              </span>
            </Link>
            <p className="text-sm leading-6 text-slate-500">
              Nền tảng kết nối cầu thủ với các sân bóng, giúp tìm sân và theo dõi lịch đặt thuận tiện.
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-pitch-100 bg-pitch-50 px-3 py-1.5 text-xs font-semibold text-pitch-700">
              <span className="h-2 w-2 rounded-full bg-pitch-500" /> Đặt sân trực tuyến
            </span>
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-slate-900">Khám phá sân</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/san" className="inline-flex items-center gap-1.5 text-slate-500 transition hover:text-pitch-700"><ChevronRight size={14} />Tìm sân bóng gần bạn</Link></li>
              <li><Link to="/san" className="inline-flex items-center gap-1.5 text-slate-500 transition hover:text-pitch-700"><ChevronRight size={14} />Sân cỏ nhân tạo 5 - 7 - 11 người</Link></li>
              <li><Link to="/dat-san-cua-toi" className="inline-flex items-center gap-1.5 text-slate-500 transition hover:text-pitch-700"><ChevronRight size={14} />Lịch đặt sân của tôi</Link></li>
              <li><Link to="/tai-khoan" className="inline-flex items-center gap-1.5 text-slate-500 transition hover:text-pitch-700"><ChevronRight size={14} />Thông tin tài khoản</Link></li>
              <li><Link to="/dang-ky" className="inline-flex items-center gap-1.5 text-slate-500 transition hover:text-pitch-700"><ChevronRight size={14} />Đăng ký tài khoản</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-slate-900">Quy định đặt sân</h2>
            <ul className="mt-4 space-y-3 text-sm leading-5 text-slate-500">
              <li><strong className="text-slate-700">Đặt theo ca:</strong> Mỗi ca thi đấu chuẩn 90 phút (Ca 1 đến Ca 9).</li>
              <li><strong className="text-slate-700">Giờ cao điểm:</strong> 17:00 - 21:30 áp dụng giá 350.000 đ/giờ.</li>
              <li><strong className="text-slate-700">Thanh toán:</strong> Trực tiếp tại quầy khi đến nhận sân.</li>
              <li><Link to="/chu-san" className="inline-flex items-center gap-1.5 font-semibold text-pitch-700 hover:text-pitch-900"><ChevronRight size={14} />Kênh dành cho chủ sân</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-slate-900">Liên hệ & hỗ trợ</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-pitch-600" /><div><p className="font-semibold text-slate-700">1900 6868 / 0901 234 567</p><p className="mt-1 text-xs text-slate-500">Hỗ trợ khách hàng 06:00 - 23:00</p></div></div>
              <div className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-pitch-600" /><div><p className="text-slate-700">hotro@sannha.vn</p><p className="mt-1 text-xs text-slate-500">support@footballbooking.com</p></div></div>
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pitch-600" /><div><p className="text-slate-700">Hà Nội & TP. Hồ Chí Minh</p><p className="mt-1 text-xs text-slate-500">Các cụm sân liên kết trên toàn quốc</p></div></div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} <strong className="text-slate-700">Sân Nhà - Football Booking</strong>. Tất cả quyền được bảo lưu.</p>
          <p>Nền tảng quản lý & đặt lịch sân bóng đá trực tuyến.</p>
        </div>
      </div>
    </footer>
  )
}
