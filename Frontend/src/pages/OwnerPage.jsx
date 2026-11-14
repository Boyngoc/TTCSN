import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Building2, CalendarCheck, Check, Plus, X } from 'lucide-react'
import PageHeading from '../components/PageHeading.jsx'
import { EmptyState, ErrorMessage, Loading, Notice } from '../components/Feedback.jsx'
import { useFieldTypes, useOwnerBookings, queryKeys } from '../hooks/useApi.js'
import { bookingsApi, fieldsApi } from '../services/api/resources.js'
import { getErrorMessage } from '../services/api/client.js'
import { formatDate, formatPrice, statusLabel } from '../utils/format.js'

function FieldForm({ field, types, onClose, onSaved }) {
  const [form, setForm] = useState({
    fieldTypeId: field?.fieldType?.id || '',
    name: field?.name || '',
    address: field?.address || '',
    description: field?.description || '',
    pricePerHour: field?.pricePerHour || '',
    imageUrl: field?.imageUrl || '',
    status: field?.status || 'ACTIVE',
  })
  const save = useMutation({ mutationFn: () => {
    const payload = {
      fieldTypeId: Number(form.fieldTypeId),
      name: form.name,
      address: form.address,
      description: form.description,
      pricePerHour: Number(form.pricePerHour),
      imageUrl: form.imageUrl,
    }
    if (field) payload.status = form.status
    return field ? fieldsApi.update(field.id, payload) : fieldsApi.create(payload)
  }, onSuccess: onSaved })
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  return <form className="mb-6 rounded-3xl border border-pitch-100 bg-pitch-50/50 p-5" onSubmit={(event) => { event.preventDefault(); save.mutate() }}>
    <div className="mb-4 flex items-center justify-between"><h3 className="font-black text-slate-900">{field ? 'Chỉnh sửa sân' : 'Thêm sân mới'}</h3><button type="button" onClick={onClose} aria-label="Đóng"><X size={19} /></button></div>
    {save.isError && <div className="mb-4"><ErrorMessage message={getErrorMessage(save.error)} /></div>}
    <div className="grid gap-3 sm:grid-cols-2"><label className="field-label">Tên sân<input className="input-control" required value={form.name} onChange={(e) => update('name', e.target.value)} /></label><label className="field-label">Loại sân<select className="input-control" required value={form.fieldTypeId} onChange={(e) => update('fieldTypeId', e.target.value)}><option value="">Chọn loại sân</option>{types.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}</select></label><label className="field-label">Địa chỉ<input className="input-control" required value={form.address} onChange={(e) => update('address', e.target.value)} /></label><label className="field-label">Giá thuê mỗi giờ (₫)<input className="input-control" type="number" min="1" required value={form.pricePerHour} onChange={(e) => update('pricePerHour', e.target.value)} /></label><label className="field-label sm:col-span-2">Mô tả<textarea className="input-control min-h-20" value={form.description} onChange={(e) => update('description', e.target.value)} /></label><label className="field-label sm:col-span-2">Đường dẫn hình ảnh (tùy chọn)<input className="input-control" type="url" value={form.imageUrl} onChange={(e) => update('imageUrl', e.target.value)} /></label>{field && <label className="field-label">Trạng thái<select className="input-control" value={form.status} onChange={(e) => update('status', e.target.value)}><option value="ACTIVE">Đang hoạt động</option><option value="INACTIVE">Tạm ngưng</option></select></label>}</div>
    <div className="mt-4 flex gap-2"><button className="btn-primary" disabled={save.isPending}>{save.isPending ? 'Đang lưu...' : 'Lưu sân'}</button><button type="button" className="btn-secondary" onClick={onClose}>Đóng</button></div>
  </form>
}

export default function OwnerPage() {
  const [tab, setTab] = useState('fields')
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [bookingsPage, setBookingsPage] = useState(0)
  const [fieldsPage, setFieldsPage] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const types = useFieldTypes()
  const bookings = useOwnerBookings(bookingsPage, tab === 'bookings')
  const queryClient = useQueryClient()
  const fields = useQuery({ queryKey: ['owner', 'fields', fieldsPage], queryFn: () => fieldsApi.owner({ page: fieldsPage, size: 10 }), enabled: tab === 'fields' })
  const mutation = useMutation({ mutationFn: bookingsApi.confirm })
  const reject = useMutation({ mutationFn: bookingsApi.reject })
  const deleteField = useMutation({ mutationFn: fieldsApi.remove, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['owner', 'fields'] }) })
  const typesData = types.data || []
  const nav = (value, label, Icon) => <button onClick={() => setTab(value)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition cursor-pointer ${tab === value ? 'bg-pitch-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}><Icon size={16} />{label}</button>
  return <div className="page-wrap">
    <PageHeading eyebrow="Không gian chủ sân" title="Quản lý sân bóng" description="Quản lý sân của bạn và xử lý các yêu cầu đặt chỗ." />
    <div className="mb-6 flex flex-wrap gap-2">{nav('fields', 'Sân của tôi', Building2)}{nav('bookings', 'Đơn đặt sân', CalendarCheck)}</div>
    {message && <div className="mb-5"><Notice>{message}</Notice></div>}
    {error && <div className="mb-5"><ErrorMessage message={error} /></div>}
    {tab === 'fields' && <>
      <div className="mb-4 flex justify-end"><button className="btn-primary" onClick={() => { setEditing(null); setShowForm(true) }}><Plus size={17} />Thêm sân</button></div>
      {(showForm || editing) && types.isError && <div className="mb-4"><ErrorMessage message={getErrorMessage(types.error, 'Không tải được danh sách loại sân.')} onRetry={types.refetch} /></div>}
      {(showForm || editing) && <FieldForm key={editing?.id ?? 'new'} field={editing} types={typesData.filter((item) => item.status === 'ACTIVE' || item.id === editing?.fieldType?.id)} onClose={() => { setShowForm(false); setEditing(null) }} onSaved={() => { setShowForm(false); setEditing(null); queryClient.invalidateQueries({ queryKey: ['owner', 'fields'] }); setMessage('Đã lưu thông tin sân.') }} />}
      {fields.isLoading ? <Loading /> : fields.isError ? <ErrorMessage message={getErrorMessage(fields.error, 'Không tải được danh sách sân.')} onRetry={fields.refetch} /> : fields.data?.content?.length ? <><div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">{fields.data.content.map((field) => <article key={field.id} className="flex flex-col gap-4 border-b border-slate-100 dark:border-slate-800 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-extrabold text-slate-900 dark:text-white">{field.name}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{field.address} · {formatPrice(field.pricePerHour)}/giờ · {field.fieldType?.name}</p><span className="mt-2 inline-block text-xs font-bold text-pitch-600 dark:text-pitch-400">{statusLabel(field.status)}</span></div><div className="flex flex-wrap gap-2"><button className="btn-secondary" onClick={() => { setEditing(field); setShowForm(false) }}>Chỉnh sửa</button><button className="btn-danger" disabled={deleteField.isPending} onClick={() => { if (window.confirm(`Xóa sân "${field.name}"? Nếu sân có booking, backend sẽ từ chối.`)) deleteField.mutate(field.id, { onSuccess: () => setMessage('Đã xóa sân.'), onError: (reason) => setError(getErrorMessage(reason)) }) }}>Xóa sân</button></div></article>)}</div>{fields.data.totalPages > 1 && <div className="mt-6 flex items-center justify-center gap-3"><button className="btn-secondary" disabled={fieldsPage === 0} onClick={() => setFieldsPage((current) => current - 1)}>Trang trước</button><span className="text-sm text-slate-500">Trang {fields.data.page + 1} / {fields.data.totalPages}</span><button className="btn-secondary" disabled={fieldsPage + 1 >= fields.data.totalPages} onClick={() => setFieldsPage((current) => current + 1)}>Trang sau</button></div>}</> : <EmptyState title="Bạn chưa có sân nào">Thêm sân để bắt đầu quản lý lịch đặt.</EmptyState>}
      {deleteField.isError && <div className="mt-4"><ErrorMessage message={getErrorMessage(deleteField.error)} /></div>}
    </>}
    {tab === 'bookings' && (bookings.isLoading ? <Loading /> : bookings.isError ? <ErrorMessage message={getErrorMessage(bookings.error)} onRetry={bookings.refetch} /> : bookings.data?.content?.length ? <><div className="space-y-4">{bookings.data.content.map((booking) => <article key={booking.id} className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><span className="text-xs font-bold text-slate-400">ĐƠN #{booking.id} · {statusLabel(booking.status)}</span><h3 className="mt-2 text-lg font-black text-slate-900 dark:text-white">{booking.fieldName}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{booking.userFullName} · {formatDate(booking.bookingDate)} · {booking.startTime}–{booking.endTime}</p></div><p className="font-black text-pitch-600 dark:text-pitch-400">{formatPrice(booking.totalPrice)}</p></div>{booking.status === 'PENDING' && <div className="mt-4 flex gap-2 border-t border-slate-100 dark:border-slate-800 pt-4"><button className="btn-primary" disabled={mutation.isPending} onClick={() => mutation.mutate(booking.id, { onSuccess: () => { queryClient.invalidateQueries({ queryKey: queryKeys.ownerBookings }); setMessage(`Đã xác nhận đơn #${booking.id}.`) }, onError: (reason) => setError(getErrorMessage(reason)) })}><Check size={16} />Xác nhận</button><button className="btn-danger" disabled={reject.isPending} onClick={() => { if (window.confirm('Bạn có chắc muốn từ chối đơn đặt này?')) reject.mutate(booking.id, { onSuccess: () => { queryClient.invalidateQueries({ queryKey: queryKeys.ownerBookings }); setMessage(`Đã từ chối đơn #${booking.id}.`) }, onError: (reason) => setError(getErrorMessage(reason)) }) }}><X size={16} />Từ chối</button></div>}</article>)}</div>{bookings.data.totalPages > 1 && <div className="mt-7 flex items-center justify-center gap-3"><button className="btn-secondary" disabled={bookingsPage === 0} onClick={() => setBookingsPage((current) => current - 1)}>Trang trước</button><span className="text-sm text-slate-500">Trang {bookings.data.page + 1} / {bookings.data.totalPages}</span><button className="btn-secondary" disabled={bookingsPage + 1 >= bookings.data.totalPages} onClick={() => setBookingsPage((current) => current + 1)}>Trang sau</button></div>}</> : <EmptyState title="Chưa có yêu cầu đặt sân" />)}
  </div>
}
