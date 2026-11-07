import { ArrowRight, CalendarCheck2, CircleCheck, Clock3, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const benefits = [
  { icon: Search, title: 'Tìm sân phù hợp', body: 'Lọc theo khu vực, loại sân và mức giá công khai.' },
  { icon: CalendarCheck2, title: 'Đặt lịch minh bạch', body: 'Chọn ngày và giờ; chủ sân xác nhận trực tiếp trên hệ thống.' },
  { icon: CircleCheck, title: 'Thông tin rõ ràng', body: 'Theo dõi trạng thái đặt sân và tổng tiền do backend tính.' },
]

export default function HomePage() {
  return (
    <>
      <section className="hero-grid relative overflow-hidden bg-pitch-900">
        <div className="absolute inset-0 bg-gradient-to-br from-pitch-900 via-pitch-900/95 to-pitch-700/80" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.1fr_.9fr] md:items-center md:py-28 lg:px-8">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-100"><span className="h-2 w-2 rounded-full bg-lime-300" />Sân bóng trong tầm tay</p>
            <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl">Chọn sân hay.<br /><span className="text-lime-300">Hẹn đội ra sân.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-emerald-50/80 sm:text-lg">Tìm kiếm sân bóng phù hợp, đặt lịch rõ ràng và theo dõi xác nhận từ chủ sân — tất cả trong một nơi.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/san" className="btn-lime">Khám phá sân bóng <ArrowRight size={18} /></Link>
              <Link to="/dang-ky" className="btn-outline-light">Tạo tài khoản miễn phí</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/70"><span className="flex items-center gap-2"><CircleCheck size={16} className="text-lime-300" />Giá do hệ thống xác nhận</span><span className="flex items-center gap-2"><Clock3 size={16} className="text-lime-300" />Đặt sân 24/7</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="pitch-lines relative aspect-[1.15] overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-emerald-500 to-pitch-700 p-5 shadow-2xl">
              <div className="absolute inset-5 rounded-3xl border-2 border-white/50" /><div className="absolute bottom-5 left-1/2 top-5 border-l-2 border-white/50" /><div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50" />
              <div className="absolute bottom-10 left-10 rounded-2xl border border-white/30 bg-slate-950/25 p-4 backdrop-blur"><p className="text-xs font-bold uppercase tracking-widest text-emerald-100">Sẵn sàng ra sân?</p><p className="mt-1 text-lg font-extrabold text-white">Bắt đầu từ một lịch hẹn</p></div>
            </div>
            <div className="absolute -right-3 -top-4 max-w-[260px] rounded-2xl bg-white p-4 shadow-card sm:-right-7"><p className="text-xs font-semibold text-slate-500">Đặt sân bóng đá</p><p className="mt-1 font-extrabold text-pitch-700">Tìm sân và chọn lịch phù hợp</p></div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-xl"><p className="eyebrow">Đơn giản từ đầu đến cuối</p><h2 className="section-title">Tập trung vào trận đấu</h2><p className="mt-3 text-slate-500">Các tính năng hiển thị theo đúng dữ liệu và nghiệp vụ của hệ thống đặt sân.</p></div>
        <div className="grid gap-5 md:grid-cols-3">{benefits.map(({ icon: Icon, title, body }, index) => <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-pitch-50 text-pitch-700"><Icon size={22} /></span><p className="mt-6 text-sm font-bold text-slate-400">0{index + 1}</p><h3 className="mt-1 text-xl font-extrabold text-slate-900">{title}</h3><p className="mt-3 leading-6 text-slate-500">{body}</p></article>)}</div>
      </section>
      <section className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-5 rounded-[2rem] bg-pitch-50 p-8 sm:p-10 md:flex-row md:items-center"><div><p className="eyebrow">Sẵn sàng chưa?</p><h2 className="mt-2 text-2xl font-black text-pitch-900 sm:text-3xl">Sân cỏ đang chờ bạn.</h2></div><Link to="/san" className="btn-primary w-fit">Tìm sân ngay <ArrowRight size={17} /></Link></div></section>
    </>
  )
}
