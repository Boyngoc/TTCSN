import { ArrowRight, CalendarCheck2, CircleCheck, MapPin, Search, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FieldCard from '../components/FieldCard.jsx'
import { EmptyState, ErrorMessage, Loading } from '../components/Feedback.jsx'
import { useFields } from '../hooks/useApi.js'

const benefits = [
  { icon: Search, title: 'Tìm sân phù hợp', body: 'Lọc sân theo khu vực, loại sân và mức giá đang được cung cấp.' },
  { icon: CalendarCheck2, title: 'Chọn lịch rõ ràng', body: 'Gửi yêu cầu đặt sân và theo dõi xác nhận từ chủ sân.' },
  { icon: CircleCheck, title: 'Theo dõi thuận tiện', body: 'Xem trạng thái lượt đặt và tổng tiền do hệ thống trả về.' },
]

export default function HomePage() {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const fields = useFields({ page: 0, size: 3 })

  const searchFields = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (keyword.trim()) params.set('keyword', keyword.trim())
    const query = params.toString()
    navigate(query ? `/san?${query}` : '/san')
  }

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="home-kicker"><span /> NỀN TẢNG ĐẶT SÂN BÓNG</p>
            <h1>Tìm sân phù hợp.<br /><span>Sẵn sàng nhập cuộc.</span></h1>
            <p className="home-hero-description">
              Khám phá sân bóng, chọn khung giờ và theo dõi lượt đặt của bạn trên Sân Nhà.
            </p>
            <form className="home-search" onSubmit={searchFields}>
              <label className="sr-only" htmlFor="home-field-search">Tên sân hoặc địa chỉ</label>
              <MapPin size={19} aria-hidden="true" />
              <input
                id="home-field-search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Nhập tên sân hoặc khu vực"
              />
              <button type="submit"><Search size={17} /> Tìm sân</button>
            </form>
            <div className="home-hero-links">
              <Link to="/san">Khám phá danh sách sân <ArrowRight size={16} /></Link>
              <span><ShieldCheck size={15} /> Thông tin từ hệ thống</span>
            </div>
          </div>

          <div className="home-hero-image" role="img" aria-label="Sân bóng cỏ xanh sẵn sàng cho trận đấu">
            <div className="home-image-caption">
              <span className="home-image-icon"><CalendarCheck2 size={18} /></span>
              <span><strong>Trận đấu tiếp theo</strong><small>Bắt đầu từ một lịch hẹn</small></span>
            </div>
            <span className="home-image-tag">Cùng nhau ra sân</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Sân bóng trong hệ thống</p>
            <h2 className="section-title">Khám phá sân bóng</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Một số sân hiện có, hiển thị theo dữ liệu trả về từ hệ thống.</p>
          </div>
          <Link to="/san" className="btn-secondary w-fit">Xem tất cả sân <ArrowRight size={16} /></Link>
        </div>

        {fields.isLoading ? <Loading label="Đang tải danh sách sân..." /> : fields.isError ? (
          <ErrorMessage message={fields.error?.response?.data?.message || 'Không tải được danh sách sân.'} onRetry={fields.refetch} />
        ) : fields.data?.content?.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fields.data.content.map((field) => <FieldCard key={field.id} field={field} />)}
          </div>
        ) : (
          <EmptyState title="Chưa có sân bóng để hiển thị">Bạn có thể quay lại sau hoặc mở danh sách sân để tìm kiếm.</EmptyState>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mb-7 max-w-2xl">
          <p className="eyebrow">Đơn giản từ đầu đến cuối</p>
          <h2 className="section-title">Tập trung vào trận đấu</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, body }, index) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-pitch-50 text-pitch-700"><Icon size={20} /></span>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">0{index + 1}</p>
              <h3 className="mt-1 text-lg font-extrabold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 rounded-3xl border border-pitch-100 bg-pitch-50 p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">Sẵn sàng chưa?</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">Sân cỏ đang chờ bạn.</h2>
            <p className="mt-2 text-sm text-slate-600">Tìm sân và xem thông tin lịch đặt ngay hôm nay.</p>
          </div>
          <Link to="/san" className="btn-primary w-fit">Tìm sân ngay <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  )
}
