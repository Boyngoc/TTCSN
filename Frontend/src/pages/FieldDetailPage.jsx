import { ArrowLeft, Check, Clock, MapPin, Star } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useCreateBooking, useField, useReviews } from '../hooks/useApi.js'
import { getErrorMessage } from '../services/api/client.js'
import { formatDate, formatPrice, localToday } from '../utils/format.js'
import { EmptyState, ErrorMessage, Loading, Notice } from '../components/Feedback.jsx'

// Danh sách các ca đá cố định trong ngày, mỗi ca 90 phút (1h30m)
const BOOKING_SLOTS = [
  { id: 'slot-1', label: 'Ca 1', start: '06:00', end: '07:30' },
  { id: 'slot-2', label: 'Ca 2', start: '07:30', end: '09:00' },
  { id: 'slot-3', label: 'Ca 3', start: '09:00', end: '10:30' },
  { id: 'slot-4', label: 'Ca 4', start: '14:00', end: '15:30' },
  { id: 'slot-5', label: 'Ca 5', start: '15:30', end: '17:00' },
  { id: 'slot-6', label: 'Ca 6 (Giờ vàng)', start: '17:00', end: '18:30' },
  { id: 'slot-7', label: 'Ca 7 (Giờ vàng)', start: '18:30', end: '20:00' },
  { id: 'slot-8', label: 'Ca 8 (Giờ vàng)', start: '20:00', end: '21:30' },
  { id: 'slot-9', label: 'Ca 9', start: '21:30', end: '23:00' },
]

// Khung giờ cao điểm từ 17:00 đến 21:30 áp dụng giá 350.000đ/giờ
const PEAK_START = '17:00'
const PEAK_END = '21:30'
const PEAK_PRICE_PER_HOUR = 350000

const isPeakSlot = (start, end) => start >= PEAK_START && end <= PEAK_END

export default function FieldDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const field = useField(id)
  const reviews = useReviews(id)
  const createBooking = useCreateBooking()
  const [booking, setBooking] = useState({ bookingDate: localToday(), startTime: '', endTime: '' })
  const [success, setSuccess] = useState(null)
  const canBook = user?.role === 'USER'

  // Kiểm tra xem ca giờ này đã trôi qua trong ngày hôm nay chưa
  const isPastSlot = (slotDate, startTime) => {
    if (slotDate !== localToday()) return false
    const now = new Date()
    const [h, m] = startTime.split(':').map(Number)
    const slotTime = new Date()
    slotTime.setHours(h, m, 0, 0)
    return slotTime <= now
  }

  const submitBooking = (event) => {
    event.preventDefault()
    setSuccess(null)
    if (!booking.startTime || !booking.endTime) return
    createBooking.mutate({ 
      fieldId: Number(id), 
      bookingDate: booking.bookingDate, 
      startTime: booking.startTime, 
      endTime: booking.endTime 
    }, {
      onSuccess: (created) => {
        setSuccess(created)
        setBooking((prev) => ({ ...prev, startTime: '', endTime: '' }))
      },
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
        <p className="eyebrow">Đặt lịch sân</p><h2 className="mt-2 text-2xl font-black text-slate-950">Chọn ca thi đấu</h2><p className="mt-2 text-sm leading-6 text-slate-500">Đặt sân theo ca cố định (90 phút/ca). Giá tạm tính sẽ theo số giờ thực tế.</p>
        {success && <div className="mt-5"><Notice>Đã gửi yêu cầu đặt sân #{success.id}. Tổng tiền: <strong>{formatPrice(success.totalPrice)}</strong> ({success.startTime?.slice(0, 5)} - {success.endTime?.slice(0, 5)}) · Trạng thái: {success.status}</Notice></div>}
        {createBooking.isError && <div className="mt-5"><ErrorMessage message={getErrorMessage(createBooking.error)} /></div>}
        {canBook ? <form onSubmit={submitBooking} className="mt-6 space-y-5">
          <label className="field-label">
            Ngày đặt
            <input 
              className="input-control" 
              type="date" 
              min={localToday()} 
              required 
              value={booking.bookingDate} 
              onChange={(e) => setBooking({ ...booking, bookingDate: e.target.value })} 
            />
          </label>

          {/* Chọn theo ca (90 phút/ca) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Chọn ca giờ đá (1h30m / ca)</span>
              <span className="text-slate-400">9 ca trong ngày</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
              {BOOKING_SLOTS.map((slot) => {
                const isSelected = booking.startTime === slot.start && booking.endTime === slot.end
                const isPast = isPastSlot(booking.bookingDate, slot.start)
                const isPeak = isPeakSlot(slot.start, slot.end)
                const ratePerHour = isPeak ? PEAK_PRICE_PER_HOUR : Number(item.pricePerHour || 0)
                const slotPrice = Math.round(ratePerHour * 1.5)

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={isPast}
                    onClick={() => setBooking({ ...booking, startTime: slot.start, endTime: slot.end })}
                    className={`relative flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all ${
                      isSelected
                        ? 'border-pitch-600 bg-pitch-50 text-pitch-900 ring-2 ring-pitch-600 shadow-sm'
                        : isPast
                        ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400 opacity-50'
                        : isPeak
                        ? 'border-amber-200 bg-amber-50/30 hover:border-amber-400 hover:bg-amber-50/60 text-slate-800'
                        : 'border-slate-200 bg-white hover:border-pitch-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-pitch-600 text-white">
                        <Check size={11} strokeWidth={3} />
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-slate-500">{slot.label}</span>
                    <span className="text-sm font-black tracking-tight">{slot.start} - {slot.end}</span>
                    <span className="mt-0.5 text-[11px] font-bold text-pitch-700">{formatPrice(slotPrice)}</span>
                    {isPeak ? (
                      <span className="mt-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">
                        17h-21h30 (350k/h)
                      </span>
                    ) : (
                      <span className="mt-0.5 text-[10px] text-slate-400">
                        {formatPrice(item.pricePerHour)}/h
                      </span>
                    )}
                    {isPast && <span className="mt-0.5 text-[10px] text-slate-400">Đã qua giờ</span>}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Thông tin tóm tắt ca đã chọn */}
          {booking.startTime && booking.endTime ? (
            (() => {
              const isPeakSelected = isPeakSlot(booking.startTime, booking.endTime)
              const currentRate = isPeakSelected ? PEAK_PRICE_PER_HOUR : Number(item.pricePerHour || 0)
              const currentTotal = Math.round(currentRate * 1.5)
              return (
                <div className="rounded-2xl border border-pitch-200 bg-pitch-50/70 p-3.5 text-xs text-pitch-900 flex items-center justify-between">
                  <div>
                    <p className="font-bold flex items-center gap-1.5">
                      <Clock size={14} /> Ca: {booking.startTime} – {booking.endTime} (90 phút)
                    </p>
                    <p className="text-[11px] text-pitch-700 mt-1">
                      Đơn giá: <strong>{formatPrice(currentRate)}/giờ</strong> {isPeakSelected && <span className="rounded-full bg-amber-100 px-1.5 py-0.5 font-bold text-amber-800 ml-1">17h00 - 21h30</span>}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Ngày: {formatDate(booking.bookingDate)}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 block">Thành tiền (1.5h)</span>
                    <span className="text-lg font-black text-pitch-800">{formatPrice(currentTotal)}</span>
                  </div>
                </div>
              )
            })()
          ) : (
            <div className="rounded-xl bg-slate-50 p-3 text-center text-xs text-slate-500">
              Vui lòng bấm chọn một ca giờ ở trên để đặt sân.
            </div>
          )}

          <button 
            type="submit"
            className="btn-primary w-full justify-center" 
            disabled={createBooking.isPending || !item.status || item.status !== 'ACTIVE' || !booking.startTime || !booking.endTime}
          >
            {createBooking.isPending ? 'Đang gửi yêu cầu...' : booking.startTime ? `Đặt ca (${booking.startTime} - ${booking.endTime})` : 'Chọn ca để đặt sân'}
          </button>
        </form> : <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{user ? 'Tài khoản hiện tại không có quyền đặt sân.' : <>Đăng nhập tài khoản người chơi để đặt sân. <Link className="font-bold text-pitch-700 underline" to="/dang-nhap">Đăng nhập</Link></>}</div>}
        {item.status !== 'ACTIVE' && <p className="mt-3 text-center text-sm font-semibold text-amber-700">Sân hiện không nhận đặt.</p>}
      </aside>
    </div>
  </div>
}
