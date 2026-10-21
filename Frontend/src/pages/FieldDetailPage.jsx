import { ArrowLeft, CalendarDays, MapPin, Star } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useCreateBooking, useField, useReviews } from '../hooks/useApi.js'
import { getErrorMessage } from '../services/api/client.js'
import { formatDate, formatPrice, localToday } from '../utils/format.js'
import { EmptyState, ErrorMessage, Loading, Notice } from '../components/Feedback.jsx'

export default function FieldDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const field = useField(id)
  const reviews = useReviews(id)
  const createBooking = useCreateBooking()
  const [booking, setBooking] = useState({ bookingDate: localToday(), startTime: '', endTime: '' })
  const [success, setSuccess] = useState(null)
  const canBook = user?.role === 'USER'
  const submitBooking = (event) => {
    event.preventDefault()
    setSuccess(null)
    if (!booking.startTime || !booking.endTime || booking.startTime >= booking.endTime) return
    createBooking.mutate({ fieldId: Number(id), bookingDate: booking.bookingDate, startTime: booking.startTime, endTime: booking.endTime }, {
      onSuccess: (created) => setSuccess(created),
    })
  }

  if (field.isLoading) return <div className="page-wrap"><Loading /></div>
  if (field.isError) return <div className="page-wrap"><ErrorMessage message={getErrorMessage(field.error, 'Không tìm thấy sân bóng.')} onRetry={field.refetch} /></div>
  const item = field.data

  return <div className="page-wrap">
    <Link to="/san" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-pitch-700"><ArrowLeft size={16} />Quay lại danh sách sân</Link>
    <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_.85fr]">
      <div>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pitch-700 to-emerald-400">
          {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="h-[340px] w-full object-cover sm:h-[460px]" /> : <div className="pitch-lines grid h-[340px] place-items-center sm:h-[460px]"><span className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white">Sân Nhà</span></div>}
        </div>
        <div className="mt-7"><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-pitch-50 px-3 py-1 text-xs font-bold text-pitch-700">{item.fieldType?.name || 'Sân bóng'}</span><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{item.status === 'ACTIVE' ? 'Đang nhận đặt' : 'Tạm ngưng'}</span></div>
          <h1 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">{item.name}</h1><p className="mt-3 flex items-center gap-2 text-slate-500"><MapPin size={18} />{item.address}</p>
          <p className="mt-5 whitespace-pre-line leading-7 text-slate-600">{item.description || 'Chủ sân chưa bổ sung mô tả cho sân này.'}</p>
          <div className="mt-6 flex flex-wrap gap-6 border-y border-slate-200 py-5"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Giá thuê theo giờ</p><p className="mt-1 text-2xl font-black text-pitch-700">{formatPrice(item.pricePerHour)}</p></div>{item.averageRating != null && <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Đánh giá</p><p className="mt-1 flex items-center gap-1 text-xl font-black text-amber-600"><Star size={18} fill="currentColor" />{Number(item.averageRating).toFixed(1)} <span className="text-sm font-medium text-slate-500">({item.reviewCount || 0})</span></p></div>}</div>
        </div>
        <section className="mt-10"><h2 className="text-xl font-black text-slate-900">Đánh giá từ người chơi</h2>{reviews.isLoading ? <Loading /> : reviews.isError ? <div className="mt-4"><ErrorMessage message={getErrorMessage(reviews.error, 'Không tải được đánh giá.')} onRetry={reviews.refetch} /></div> : reviews.data?.content?.length ? <div className="mt-4 space-y-3">{reviews.data.content.map((review) => <article key={review.id} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex justify-between gap-3"><p className="font-bold text-slate-900">{review.userFullName}</p><span className="flex items-center gap-1 text-sm font-bold text-amber-600"><Star size={14} fill="currentColor" />{review.rating}/5</span></div>{review.comment && <p className="mt-2 text-sm leading-6 text-slate-600">{review.comment}</p>}<p className="mt-3 text-xs text-slate-400">{formatDate(review.createdAt?.slice(0, 10))}</p></article>)}</div> : <div className="mt-4"><EmptyState title="Sân chưa có đánh giá" /></div>}</section>
      </div>
      <aside className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
        <p className="eyebrow">Đặt lịch sân</p><h2 className="mt-2 text-2xl font-black text-slate-950">Chọn ngày & giờ</h2><p className="mt-2 text-sm leading-6 text-slate-500">Tổng tiền và tình trạng khung giờ sẽ do backend xác nhận sau khi gửi yêu cầu.</p>
        {success && <div className="mt-5"><Notice>Đã gửi yêu cầu đặt sân #{success.id}. Tổng tiền backend xác nhận: <strong>{formatPrice(success.totalPrice)}</strong> · {success.status}</Notice></div>}
        {createBooking.isError && <div className="mt-5"><ErrorMessage message={getErrorMessage(createBooking.error)} /></div>}
        {canBook ? <form onSubmit={submitBooking} className="mt-6 space-y-4">
          <label className="field-label">Ngày đặt<input className="input-control" type="date" min={localToday()} required value={booking.bookingDate} onChange={(e) => setBooking({ ...booking, bookingDate: e.target.value })} /></label>
          <div className="grid grid-cols-2 gap-3"><label className="field-label">Giờ bắt đầu<input className="input-control" type="time" required value={booking.startTime} onChange={(e) => setBooking({ ...booking, startTime: e.target.value })} /></label><label className="field-label">Giờ kết thúc<input className="input-control" type="time" required value={booking.endTime} onChange={(e) => setBooking({ ...booking, endTime: e.target.value })} /></label></div>
          {booking.startTime && booking.endTime && booking.startTime >= booking.endTime && <p className="text-sm font-medium text-red-600">Giờ bắt đầu phải trước giờ kết thúc.</p>}
          <div className="rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800"><CalendarDays size={15} className="mr-1 inline" />Khung giờ chỉ được xác nhận khi backend chấp nhận đặt sân.</div>
          <button className="btn-primary w-full justify-center" disabled={createBooking.isPending || !item.status || item.status !== 'ACTIVE' || !booking.startTime || !booking.endTime || booking.startTime >= booking.endTime}>{createBooking.isPending ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu đặt sân'}</button>
        </form> : <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{user ? 'Tài khoản hiện tại không có quyền đặt sân.' : <>Đăng nhập tài khoản người chơi để đặt sân. <Link className="font-bold text-pitch-700 underline" to="/dang-nhap">Đăng nhập</Link></>}</div>}
        {item.status !== 'ACTIVE' && <p className="mt-3 text-center text-sm font-semibold text-amber-700">Sân hiện không nhận đặt.</p>}
      </aside>
    </div>
  </div>
}
