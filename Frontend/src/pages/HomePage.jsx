import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Flame, 
  Headphones, 
  HelpCircle, 
  Mail, 
  MapPin, 
  Phone, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Trophy, 
  Users, 
  Zap 
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FieldCard from '../components/FieldCard.jsx'
import { useFields, useFieldTypes } from '../hooks/useApi.js'

// Phân loại các quy mô sân bóng đá (Chuyên biệt 100% cho bóng đá)
const FOOTBALL_TYPES = [
  { id: '', name: 'Tất cả sân bóng', icon: '⚽', desc: '160+ cụm sân phủ khắp Hà Nội' },
  { id: '1', name: 'Sân 5 người', icon: '🏃', desc: 'Mini phong trào, tốc độ cao' },
  { id: '2', name: 'Sân 7 người', icon: '🏆', desc: 'Quy mô phổ biến nhất bóng đá phủi' },
  { id: '3', name: 'Sân 11 người', icon: '🏟️', desc: 'Tiêu chuẩn thi đấu giải lớn' },
]

// Quy trình đặt sân bóng trong 3 bước
const THREE_STEPS = [
  {
    num: '1',
    title: 'Tìm kiếm & Chọn sân bóng',
    desc: 'Lọc sân bóng theo quận gần bạn, quy mô 5/7/11 người và xem hình ảnh mặt cỏ thực tế.',
  },
  {
    num: '2',
    title: 'Chọn ngày & Ca đá 90 phút',
    desc: 'Xem chính xác 9 ca giờ còn trống, giờ vàng 17:00 – 21:30 hiển thị giá 350k/h minh bạch.',
  },
  {
    num: '3',
    title: 'Xác nhận giữ chỗ & Ra sân',
    desc: 'Hệ thống tự động khóa ca thời gian thực chống trùng lịch. Đến sân đá bóng và thanh toán tại quầy.',
  },
]

// 4 Tính năng vượt trội của hệ thống Sân Nhà
const WHY_US = [
  {
    title: 'Đặt sân tức thì 30s',
    desc: 'Thao tác trực tuyến nhanh chóng, hệ thống gửi phiếu giữ chỗ trực tiếp đến chủ sân không cần gọi điện hỏi giờ.',
    icon: Zap,
  },
  {
    title: 'Chống trùng lịch 100%',
    desc: 'Ngay khi bạn bấm đặt, ca thi đấu được khóa tức thì trên toàn hệ thống, đảm bảo không có hai đội trùng giờ.',
    icon: ShieldCheck,
  },
  {
    title: 'Giá giờ vàng minh bạch',
    desc: 'Đơn giá niêm yết rõ ràng theo từng ca. Khung giờ cao điểm 17:00 – 21:30 chỉ 350.000 đ/giờ (525.000 đ/ca 90p).',
    icon: CheckCircle2,
  },
  {
    title: 'Hỗ trợ cáp kèo 24/7',
    desc: 'Đội ngũ hỗ trợ nhiệt tình, giải quyết sự cố, hỗ trợ đổi lịch và kết nối giao lưu giữa các đội bóng cùng trình độ.',
    icon: Headphones,
  },
]

// Đánh giá từ đội trưởng các đội bóng đá phong trào
const TESTIMONIALS = [
  {
    name: 'Anh Trần Minh Đức',
    role: 'Đội trưởng FC AE Xã Đàn',
    comment:
      'Giao diện sáng sủa, đặt sân bóng cực nhanh. Trước đây mỗi lần đặt sân chiều thứ 7 phải gọi cả chục cuộc hỏi chủ sân, giờ chỉ 30 giây là xong cả đội an tâm ra sân.',
    rating: 5,
  },
  {
    name: 'Nguyễn Tiến Hưng',
    role: 'Quản lý FC IT Cầu Giấy',
    comment:
      'Rất thích tính năng hiển thị ca giờ vàng minh bạch và hệ thống chống trùng lịch. Đội mình đá ca 7 cố định chưa bao giờ bị trùng kèo hay hủy giờ.',
    rating: 5,
  },
  {
    name: 'Lê Hoàng Nam',
    role: 'Thành viên FC Kiến Trúc',
    comment:
      'Mặt cỏ nhân tạo các sân đối tác đều rất êm, có ảnh thực tế và định vị Google Maps chuẩn xác. Trải nghiệm từ lúc tìm sân đến khi ra sân so tài đều rất mượt mà.',
    rating: 5,
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState('')

  // State form tìm kiếm nhanh
  const [keyword, setKeyword] = useState('')
  const [fieldType, setFieldType] = useState('')
  const [bookingDate, setBookingDate] = useState('')

  // State form liên hệ đối tác chủ sân
  const [contactForm, setContactForm] = useState({
    fullName: '',
    phone: '',
    role: 'OWNER',
    message: '',
  })
  const [contactSubmitted, setContactSubmitted] = useState(false)

  // API sân bóng thực tế (3 sân đầu tiên hiển thị nổi bật như ảnh mẫu)
  const { data: fieldsData, isLoading } = useFields({ page: 0, size: 3 })
  const { data: typesData } = useFieldTypes()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword.trim()) params.set('keyword', keyword.trim())
    if (fieldType) params.set('fieldType', fieldType)
    navigate(`/san?${params.toString()}`)
  }

  const handleTypeSelect = (id) => {
    setSelectedType(id)
    const params = new URLSearchParams()
    if (id) params.set('fieldType', id)
    navigate(`/san?${params.toString()}`)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
    setTimeout(() => {
      setContactForm({ fullName: '', phone: '', role: 'OWNER', message: '' })
      setContactSubmitted(false)
    }, 4000)
  }

  return (
    <div className="flex flex-col bg-white text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      
      {/* =========================================================================
          1. HERO BANNER: Tông màu sáng sủa, tươi mát, chuyên nghiệp
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf7ef] via-[#f3faf5] to-white pt-14 pb-16 sm:pt-20 sm:pb-20 border-b border-emerald-100/70 dark:from-[#0a1f14] dark:via-[#0b1610] dark:to-[#0b1120] dark:border-slate-800">
        
        {/* Họa tiết lưới sân bóng mờ nhẹ trang nhã */}
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-10" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-3xl">
            
            {/* Tag nhỏ trên cùng */}
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-white/90 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-pitch-700 shadow-sm backdrop-blur dark:border-emerald-800/60 dark:bg-slate-900/80 dark:text-emerald-300">
              NỀN TẢNG ĐẶT SÂN BÓNG ĐÁ TRỰC TUYẾN 2026
            </div>

            {/* Tiêu đề chính lớn */}
            <h1 className="mt-5 text-4xl sm:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.12]">
              Đặt sân bóng đá<br />
              <span className="text-pitch-600 dark:text-pitch-400">trong 30 giây</span>
            </h1>

            {/* Mô tả: Chuyên biệt 100% cho bóng đá */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-2xl">
              Hệ thống kết nối hơn 160 cụm sân bóng đá cỏ nhân tạo và sân tiêu chuẩn khắp Hà Nội. Đặt lịch online nhanh chóng, ca 90 phút cố định, không lo trùng lịch, nhận xác nhận tức thì.
            </p>

            {/* 2 Nút hành động */}
            <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <a
                href="#tim-san-nhanh"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-pitch-600 px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-pitch-600/30 transition hover:bg-pitch-700 active:scale-95 cursor-pointer"
              >
                <span>Tìm sân & Đặt ngay</span>
                <ArrowRight size={16} />
              </a>
              <Link
                to="/san"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-400 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Xem tất cả 161 sân bóng
              </Link>
            </div>

            {/* Thanh thống kê uy tín */}
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-emerald-200/80 pt-8 sm:grid-cols-4 max-w-xl dark:border-slate-800">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">160+</span>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">Sân bóng Hà Nội</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">9 Ca</span>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">90 phút cố định/ngày</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-pitch-600 dark:text-pitch-400">350k/h</span>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">Giờ vàng minh bạch</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-amber-500 flex items-center justify-center sm:justify-start gap-1">
                  4.8 <Star size={18} fill="currentColor" />
                </span>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">Đánh giá thực tế</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. KHU VỰC TÌM KIẾM & QUY MÔ SÂN BÓNG (NỀN XÁM NHẸ / TRẮNG ĐẬM: bg-slate-100/90)
         ========================================================================= */}
      <section className="w-full bg-slate-100/90 py-16 sm:py-20 border-b border-slate-200/90 dark:bg-slate-950/80 dark:border-slate-800">
        
        {/* Hộp tìm sân nhanh (Tách rời độc lập, cách khoảng thoáng đãng với Hero phía trên) */}
        <div id="tim-san-nhanh" className="mx-auto max-w-5xl w-full px-4 sm:px-6">
          <form
            onSubmit={handleSearchSubmit}
            className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-6">
              <h2 className="text-xl font-black text-slate-950 dark:text-white">Tìm sân bóng nhanh</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tra cứu sân bóng theo khu vực và quy mô thi đấu mong muốn</p>
            </div>

            <div className="space-y-4">
              {/* Tên sân bóng hoặc khu vực */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 dark:text-slate-300">
                  Tên sân bóng hoặc khu vực quận
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pitch-600" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Ví dụ: Sân Hà Trì, Cầu Giấy, Nam Từ Liêm, Xuân Phương, Thanh Liệt..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-pitch-600 focus:bg-white focus:ring-4 focus:ring-pitch-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-pitch-950/50"
                  />
                </div>
              </div>

              {/* Quy mô loại sân bóng */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 dark:text-slate-300">
                  Quy mô sân bóng đá
                </label>
                <select
                  value={fieldType}
                  onChange={(e) => setFieldType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pitch-600 focus:bg-white focus:ring-4 focus:ring-pitch-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white cursor-pointer"
                >
                  <option value="">Tất cả quy mô (Sân 5, Sân 7, Sân 11 người)</option>
                  {typesData?.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.description || 'Sân bóng đá tiêu chuẩn'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Chọn ngày đá bóng */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 dark:text-slate-300">
                  Chọn ngày đá bóng
                </label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pitch-600" />
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pitch-600 focus:bg-white focus:ring-4 focus:ring-pitch-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Nút Tìm kiếm sân bóng ngay */}
              <button
                type="submit"
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-pitch-600 py-3.5 text-sm font-black text-white shadow-lg shadow-pitch-600/25 transition hover:bg-pitch-700 active:scale-[0.99] cursor-pointer"
              >
                <Search size={18} strokeWidth={2.5} />
                <span>Tìm sân bóng ngay</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quy mô thi đấu */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 border-t border-slate-200/70 pt-16 dark:border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <p className="eyebrow">QUY MÔ THI ĐẤU</p>
            <h2 className="section-title">Bạn cần tìm loại sân nào?</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Lựa chọn quy mô sân bóng phù hợp với quân số và mục đích của đội bóng
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {FOOTBALL_TYPES.map((type) => {
              const isSelected = selectedType === type.id
              return (
                <button
                  key={type.name}
                  type="button"
                  onClick={() => handleTypeSelect(type.id)}
                  className={`flex flex-col text-left rounded-2xl border p-5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-pitch-600 bg-pitch-50 shadow-md ring-2 ring-pitch-500/20 dark:bg-pitch-950/60 dark:border-pitch-500'
                      : 'border-slate-200/90 bg-white hover:border-pitch-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl mb-3">{type.icon}</span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white">
                    {type.name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {type.desc}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SÂN BÓNG ĐÁ HÀNG ĐẦU (NỀN TRẮNG: bg-white)
         ========================================================================= */}
      <section className="w-full bg-white py-20 sm:py-24 border-b border-slate-200/90 dark:bg-slate-900 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="eyebrow">DANH MỤC NỔI BẬT</p>
            <h2 className="section-title">Sân bóng đá hàng đầu</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Những cụm sân bóng được đặt nhiều nhất và nhận đánh giá cao nhất từ các cầu thủ phong trào
            </p>
          </div>

          {/* Lưới 3 sân bóng mẫu */}
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
                  <div className="aspect-[16/10] rounded-2xl bg-slate-200 dark:bg-slate-700 mb-4" />
                  <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700 mb-2" />
                  <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fieldsData?.content?.slice(0, 3).map((field) => (
                <FieldCard key={field.id} field={field} />
              ))}
            </div>
          )}

          {/* Nút Xem tất cả sân ở giữa */}
          <div className="mt-10 text-center">
            <Link
              to="/san"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50/80 px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-100 hover:border-pitch-600 hover:text-pitch-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-pitch-400 dark:hover:text-pitch-400"
            >
              <span>Xem tất cả 161 sân bóng</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. ĐẶT SÂN BÓNG TRONG 3 BƯỚC (NỀN XÁM NHẸ / TRẮNG ĐẬM: bg-slate-100/90)
         ========================================================================= */}
      <section className="w-full bg-slate-100/90 py-20 sm:py-24 border-b border-slate-200/90 dark:bg-slate-950/80 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow">QUY TRÌNH ĐƠN GIẢN</p>
            <h2 className="section-title">Đặt sân bóng trong 3 bước</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Chỉ mất vài phút để hoàn tất quy trình đặt sân và sẵn sàng ra sân so tài cùng đồng đội.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 relative">
            {THREE_STEPS.map((st) => (
              <div
                key={st.num}
                className="relative flex flex-col items-center text-center rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Vòng tròn số xanh lá tươi tắn */}
                <span className="grid h-14 w-14 place-items-center rounded-full bg-pitch-600 text-xl font-black text-white shadow-lg shadow-pitch-600/30 mb-6">
                  {st.num}
                </span>
                <h3 className="text-lg font-black text-slate-950 dark:text-white mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-6">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. TRẢI NGHIỆM ĐẶT SÂN TỐT NHẤT (NỀN TRẮNG: bg-white)
         ========================================================================= */}
      <section className="w-full bg-white py-20 sm:py-24 border-b border-slate-200/90 dark:bg-slate-900 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow">TÍNH NĂNG VƯỢT TRỘI</p>
            <h2 className="section-title">Trải nghiệm đặt sân tốt nhất</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Hệ thống được thiết kế để mang lại sự tiện lợi, minh bạch và an tâm tuyệt đối cho các đội bóng.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {WHY_US.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-6 sm:p-7 shadow-sm transition hover:bg-white hover:border-pitch-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-pitch-50 text-pitch-700 border border-pitch-100 mb-4 dark:bg-pitch-950/70 dark:text-pitch-300 dark:border-pitch-900/60">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CÁC ĐỘI BÓNG NÓI GÌ (NỀN XÁM NHẸ / TRẮNG ĐẬM: bg-slate-100/90)
         ========================================================================= */}
      <section className="w-full bg-slate-100/90 py-20 sm:py-24 border-b border-slate-200/90 dark:bg-slate-950/80 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow">ĐỒNG HÀNH CÙNG ĐAM MÊ</p>
            <h2 className="section-title">Cộng đồng cầu thủ nói gì?</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Hàng trăm đội bóng phong trào tin tưởng và sử dụng Sân Nhà mỗi tuần để đặt lịch thi đấu
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => (
              <article
                key={idx}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm leading-6 text-slate-600 dark:text-slate-300 italic">
                    "{t.comment}"
                  </p>
                </div>
                <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. TRỞ THÀNH ĐỐI TÁC CHỦ SÂN HOẶC CẦN HỖ TRỢ? (NỀN TRẮNG: bg-white)
         ========================================================================= */}
      <section className="w-full bg-white py-20 sm:py-24 border-b border-slate-200/90 dark:bg-slate-900 dark:border-slate-800">
        <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-slate-200/90 bg-slate-50/80 p-8 sm:p-12 shadow-sm dark:border-slate-800 dark:bg-slate-800/60">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              
              {/* Cột trái: Thông tin liên hệ */}
              <div className="lg:col-span-5">
                <p className="eyebrow">HỢP TÁC & HỖ TRỢ</p>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white leading-tight">
                  Trở thành đối tác<br />hoặc cần hỗ trợ?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-3 leading-6">
                  Liên hệ với ban quản trị Sân Nhà để đưa cụm sân bóng của bạn lên hệ thống hoặc giải đáp bất kỳ thắc mắc nào về lịch đặt sân.
                </p>

                <div className="mt-8 space-y-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pitch-50 text-pitch-700 border border-pitch-100 dark:bg-pitch-950/70 dark:text-pitch-300 dark:border-pitch-900/60">
                      <Phone size={17} />
                    </span>
                    <div>
                      <span className="text-slate-400 text-xs block">Hotline hỗ trợ:</span>
                      <a href="tel:19006868" className="font-extrabold text-slate-900 hover:text-pitch-600 dark:text-white dark:hover:text-pitch-400">
                        1900 6868 / 0901 234 567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pitch-50 text-pitch-700 border border-pitch-100 dark:bg-pitch-950/70 dark:text-pitch-300 dark:border-pitch-900/60">
                      <Mail size={17} />
                    </span>
                    <div>
                      <span className="text-slate-400 text-xs block">Email tiếp nhận:</span>
                      <a href="mailto:hotro@sannha.vn" className="font-extrabold text-slate-900 hover:text-pitch-600 dark:text-white dark:hover:text-pitch-400">
                        hotro@sannha.vn
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cột phải: Form gửi thông tin liên hệ */}
              <div className="lg:col-span-7">
                {contactSubmitted ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200">
                    <CheckCircle2 size={32} className="mx-auto text-emerald-600 dark:text-emerald-400 mb-2" />
                    <p className="font-bold text-sm">Đã gửi thông tin thành công!</p>
                    <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80 mt-1">Đội ngũ Sân Nhà sẽ liên hệ lại với bạn trong vòng 24 giờ làm việc.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 dark:text-slate-300">
                          Họ tên *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.fullName}
                          onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                          placeholder="Nguyễn Văn A"
                          className="input-control"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 dark:text-slate-300">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="0912 345 678"
                          className="input-control"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 dark:text-slate-300">
                        Bạn là:
                      </label>
                      <select
                        value={contactForm.role}
                        onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
                        className="input-control cursor-pointer"
                      >
                        <option value="OWNER">Chủ sân bóng đá (muốn đăng ký đối tác cụm sân)</option>
                        <option value="USER">Khách đặt sân (cần hỗ trợ đặt chỗ/đổi lịch)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 dark:text-slate-300">
                        Nội dung tin nhắn
                      </label>
                      <textarea
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Nhập thông tin sân bóng hoặc nội dung cần giải đáp..."
                        className="input-control"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full py-3.5 text-sm font-bold shadow-md shadow-pitch-600/25 cursor-pointer"
                    >
                      Gửi thông tin liên hệ
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. BANNER CHỦ SÂN: Bạn là chủ sân? Gia nhập hệ thống ngay (NỀN XÁM NHẸ: bg-slate-100/90)
         ========================================================================= */}
      <section className="w-full bg-slate-100/90 py-16 sm:py-20 border-b border-slate-200/90 dark:bg-slate-950/80 dark:border-slate-800">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-gradient-to-r from-pitch-700 via-pitch-600 to-emerald-600 p-8 sm:p-12 text-center text-white shadow-xl shadow-pitch-900/10">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Bạn là chủ sân bóng đá? Gia nhập hệ thống ngay
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-xs sm:text-sm text-emerald-50 leading-6 font-medium">
              Tăng doanh thu 30%, quản lý lịch đặt sân thông minh và tiếp cận hàng nghìn đội bóng phong trào đang tìm sân mỗi ngày.
            </p>
            <div className="mt-7">
              <Link
                to="/dang-ky"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-black text-pitch-700 shadow-lg transition hover:bg-emerald-50 active:scale-95"
              >
                <span>Đăng ký đối tác chủ sân</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
