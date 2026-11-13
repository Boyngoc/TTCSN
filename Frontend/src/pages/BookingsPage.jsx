import { CalendarClock, Eye, MapPin, Star, XCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeading from '../components/PageHeading.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { EmptyState, ErrorMessage, Loading, Notice } from '../components/Feedback.jsx'
import { useBookingAction, useCreateReview, useMyBookings } from '../hooks/useApi.js'
import { bookingsApi } from '../services/api/resources.js'
import { getErrorMessage } from '../services/api/client.js'
import { formatDate, formatPrice } from '../utils/format.js'

const canCancel = (status) => ['PENDING', 'CONFIRMED'].includes(status)
const canReview = (status) => ['CONFIRMED', 'COMPLETED'].includes(status)

function ReviewForm({ booking, onDone }) {
  const [rating, setRating] = useState('5')
  const [comment, setComment] = useState('')
  const review = useCreateReview(booking.fieldId)
  return <form className="mt-4 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:grid-cols-[140px_1fr_auto]" onSubmit={(event) => {
    event.preventDefault()
    review.mutate({ bookingId: booking.id, rating: Number(rating), comment: comment.trim() || null }, { onSuccess: onDone })
  }}>
    <label className="field-label">Điểm đánh giá<select className="input-control" value={rating} onChange={(event) => setRating(event.target.value)}>{[5, 4, 3, 2, 1].map((score) => <option key={score} value={score}>{score} sao</option>)}</select></label>
    <label className="field-label">Nhận xét<input className="input-control" value={comment} maxLength={1000} onChange={(event) => setComment(event.target.value)} placeholder="Chia sẻ trải nghiệm của bạn" /></label>
    <button className="btn-primary self-end" disabled={review.isPending}>{review.isPending ? 'Đang gửi...' : 'Gửi đánh giá'}</button>
    {review.isError && <div className="sm:col-span-3"><ErrorMessage message={getErrorMessage(review.error)} /></div>}
  </form>
}

export default function BookingsPage() {
  const [page, setPage] = useState(0)
  const query = useMyBookings(page)
  const cancel = useBookingAction(bookingsApi.cancel)
  const [reviewing, setReviewing] = useState(null)
  const [message, setMessage] = useState('')
  if (query.isLoading) return <div className="page-wrap"><Loading /></div>
  if (query.isError) return <div className="page-wrap"><ErrorMessage message={getErrorMessage(query.error, 'Không tải được lịch đặt.')} onRetry={query.refetch} /></div>

  const bookings = query.data?.content || []
  return <div className="page-wrap">
    <PageHeading eyebrow="Tài khoản người chơi" title="Lịch đặt của tôi" description="Theo dõi trạng thái, thời gian và tổng tiền do backend trả về." action={<Link to="/san" className="btn-primary">Tìm sân bóng</Link>} />
    {message && <div className="mb-5"><Notice>{message}</Notice></div>}
    {cancel.isError && <div className="mb-5"><ErrorMessage message={getErrorMessage(cancel.error)} /></div>}
    {bookings.length ? <><div className="space-y-4">{bookings.map((booking) => <article key={booking.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-card sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-400">Đơn #{booking.id}</span><StatusBadge status={booking.status} /></div><h2 className="mt-3 text-xl font-extrabold text-slate-900">{booking.fieldName}</h2><p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><CalendarClock size={16} />{formatDate(booking.bookingDate)} · {booking.startTime}–{booking.endTime}</p></div>
        <div className="sm:text-right"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tổng tiền</p><p className="mt-1 text-xl font-extrabold text-pitch-700">{formatPrice(booking.totalPrice)}</p></div></div>
      <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-4">
        <Link to={`/luot-dat/${booking.id}`} className="btn-secondary"><Eye size={16} />Chi tiết đơn</Link>
        {canCancel(booking.status) && <button className="btn-danger" disabled={cancel.isPending} onClick={() => { if (window.confirm('Bạn có chắc muốn hủy lượt đặt này?')) cancel.mutate(booking.id, { onSuccess: () => setMessage(`Đã gửi yêu cầu hủy đơn #${booking.id}.`) }) }}><XCircle size={16} />Hủy lượt đặt</button>}
        {canReview(booking.status) && <button className="btn-secondary" onClick={() => setReviewing(reviewing === booking.id ? null : booking.id)}><Star size={16} />Viết đánh giá</button>}
        <Link to={`/san/${booking.fieldId}`} className="btn-secondary"><MapPin size={16} />Xem sân</Link>
      </div>
      {reviewing === booking.id && <ReviewForm booking={booking} onDone={() => { setReviewing(null); setMessage('Cảm ơn bạn đã gửi đánh giá.') }} />}
    </article>)}</div>{query.data.totalPages > 1 && <div className="mt-7 flex items-center justify-center gap-3"><button className="btn-secondary" disabled={page === 0} onClick={() => setPage((current) => current - 1)}>Trang trước</button><span className="text-sm text-slate-500">Trang {query.data.page + 1} / {query.data.totalPages}</span><button className="btn-secondary" disabled={page + 1 >= query.data.totalPages} onClick={() => setPage((current) => current + 1)}>Trang sau</button></div>}</> : <EmptyState title="Bạn chưa có lượt đặt sân nào">Hãy tìm một sân phù hợp để bắt đầu trận đấu tiếp theo.</EmptyState>}
  </div>
}
