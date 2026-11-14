import { ArrowLeft, CalendarClock, MapPin, ReceiptText } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState, ErrorMessage, Loading, Notice } from '../components/Feedback.jsx'
import PageHeading from '../components/PageHeading.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useBooking, useBookingAction } from '../hooks/useApi.js'
import { bookingsApi } from '../services/api/resources.js'
import { getErrorMessage } from '../services/api/client.js'
import { formatDate, formatPrice, statusLabel } from '../utils/format.js'

export default function BookingDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const booking = useBooking(id)
  const cancel = useBookingAction(bookingsApi.cancel)
  const [message, setMessage] = useState('')
  const backPath = user?.role === 'ADMIN' ? '/quan-tri' : user?.role === 'OWNER' ? '/chu-san' : '/dat-san-cua-toi'

  if (booking.isLoading) return <div className="page-wrap"><Loading label="Đang tải chi tiết lượt đặt..." /></div>
  if (booking.isError) {
    return <div className="page-wrap">
      <Link to={backPath} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-pitch-700"><ArrowLeft size={16} />Quay lại</Link>
      <ErrorMessage message={getErrorMessage(booking.error, 'Không tải được chi tiết lượt đặt.')} onRetry={booking.refetch} />
    </div>
  }

  const item = booking.data
  if (!item) return <div className="page-wrap"><EmptyState title="Không tìm thấy lượt đặt." /></div>

  const canCancel = user?.id === item.userId && ['PENDING', 'CONFIRMED'].includes(item.status)
  return <div className="page-wrap max-w-4xl">
    <Link to={backPath} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-pitch-700"><ArrowLeft size={16} />Quay lại</Link>
    <PageHeading eyebrow={`Chi tiết lượt đặt #${item.id}`} title={item.fieldName} description="Thông tin được tải từ booking API của backend." />
    {message && <div className="mb-5"><Notice>{message}</Notice></div>}
    {cancel.isError && <div className="mb-5"><ErrorMessage message={getErrorMessage(cancel.error)} /></div>}
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Đơn đặt sân #{item.id}</span>
        <span className="rounded-full bg-pitch-50 px-3 py-1 text-xs font-bold text-pitch-700 dark:bg-pitch-950/70 dark:text-pitch-300">{statusLabel(item.status)}</span>
      </div>
      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        <div><dt className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400"><CalendarClock size={16} />Ngày và giờ</dt><dd className="mt-2 font-bold text-slate-900 dark:text-white">{formatDate(item.bookingDate)} · {item.startTime}–{item.endTime}</dd></div>
        <div><dt className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400"><ReceiptText size={16} />Tổng tiền backend xác nhận</dt><dd className="mt-2 font-black text-pitch-600 dark:text-pitch-400">{formatPrice(item.totalPrice)}</dd></div>
        <div><dt className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400"><MapPin size={16} />Sân bóng</dt><dd className="mt-2"><Link to={`/san/${item.fieldId}`} className="font-bold text-pitch-600 dark:text-pitch-400 hover:underline">{item.fieldName}</Link></dd></div>
        <div><dt className="text-sm font-semibold text-slate-500 dark:text-slate-400">Người đặt</dt><dd className="mt-2 font-bold text-slate-900 dark:text-white">{item.userFullName || '—'}</dd></div>
        <div><dt className="text-sm font-semibold text-slate-500 dark:text-slate-400">Thời điểm tạo</dt><dd className="mt-2 font-medium text-slate-700 dark:text-slate-300">{item.createdAt ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.createdAt)) : '—'}</dd></div>
      </dl>
      {canCancel && <div className="mt-7 border-t border-slate-100 dark:border-slate-800 pt-5"><button className="btn-danger" disabled={cancel.isPending} onClick={() => {
        if (window.confirm('Bạn có chắc muốn hủy lượt đặt này?')) {
          cancel.mutate(item.id, { onSuccess: () => setMessage(`Đã hủy lượt đặt #${item.id}.`) })
        }
      }}>{cancel.isPending ? 'Đang hủy...' : 'Hủy lượt đặt'}</button></div>}
    </section>
  </div>
}
