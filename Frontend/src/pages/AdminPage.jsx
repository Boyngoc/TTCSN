import { useState } from 'react'
import { Activity, BarChart3, Building2, CalendarDays, CircleDollarSign, Eye, Shapes, ShieldCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeading from '../components/PageHeading.jsx'
import { EmptyState, ErrorMessage, Loading } from '../components/Feedback.jsx'
import { useAdminData, useAdminMutation, useFieldTypes, queryKeys } from '../hooks/useApi.js'
import { adminApi } from '../services/api/resources.js'
import { getErrorMessage } from '../services/api/client.js'
import { formatDate, formatPrice, statusLabel } from '../utils/format.js'

const tabs = [
  ['overview', 'Tổng quan', BarChart3],
  ['users', 'Người chơi', Users],
  ['owners', 'Chủ sân', ShieldCheck],
  ['fields', 'Sân bóng', Building2],
  ['fieldTypes', 'Loại sân', Shapes],
  ['bookings', 'Đơn đặt sân', CalendarDays],
]

function SummaryCard({ icon: Icon, label, value, detail }) {
  return <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-pitch-50 text-pitch-700"><Icon size={20} /></span><p className="mt-5 text-sm font-semibold text-slate-500">{label}</p><p className="mt-1 text-3xl font-black tracking-tight text-slate-950">{value ?? '—'}</p>{detail && <p className="mt-2 text-xs text-slate-400">{detail}</p>}</article>
}

function Result({ query, children, empty }) {
  if (query.isLoading) return <Loading />
  if (query.isError) return <ErrorMessage message={getErrorMessage(query.error)} onRetry={query.refetch} />
  return query.data?.content?.length ? children : <EmptyState title={empty} />
}

export default function AdminPage() {
  const [tab, setTab] = useState('overview')
  const [listPage, setListPage] = useState(0)
  const [error, setError] = useState('')
  const statistics = useAdminData(queryKeys.statistics, adminApi.statistics, tab === 'overview')
  const users = useAdminData([...queryKeys.adminUsers, listPage], () => adminApi.users({ page: listPage, size: 10 }), tab === 'users')
  const owners = useAdminData([...queryKeys.adminOwners, listPage], () => adminApi.owners({ page: listPage, size: 10 }), tab === 'owners')
  const fields = useAdminData([...queryKeys.adminFields, listPage], () => adminApi.fields({ page: listPage, size: 10 }), tab === 'fields')
  const bookings = useAdminData([...queryKeys.adminBookings, listPage], () => adminApi.bookings({ page: listPage, size: 10 }), tab === 'bookings')
  const fieldTypes = useFieldTypes(tab === 'fieldTypes')
  const updateUser = useAdminMutation(({ id, status }) => adminApi.updateUserStatus(id, status), [queryKeys.adminUsers, queryKeys.adminOwners])
  const updateField = useAdminMutation(({ id, status }) => adminApi.updateFieldStatus(id, status), [queryKeys.adminFields])
  const data = statistics.data
  const navigateTab = (value) => { setError(''); setListPage(0); setTab(value) }

  return <div className="page-wrap">
    <PageHeading eyebrow="Khu vực quản trị" title="Tổng quan hệ thống" description="Số liệu và danh sách được truy xuất từ API quản trị backend." />
    <div className="mb-7 flex flex-wrap gap-2">{tabs.map(([key, label, Icon]) => <button key={key} onClick={() => navigateTab(key)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${tab === key ? 'bg-pitch-700 text-white' : 'bg-white text-slate-600'}`}><Icon size={16} />{label}</button>)}</div>
    {error && <div className="mb-5"><ErrorMessage message={error} /></div>}
    {tab === 'overview' && (statistics.isLoading ? <Loading /> : statistics.isError ? <ErrorMessage message={getErrorMessage(statistics.error)} onRetry={statistics.refetch} /> : <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard icon={Users} label="Người chơi" value={data.totalUsers} />
        <SummaryCard icon={ShieldCheck} label="Chủ sân" value={data.totalOwners} />
        <SummaryCard icon={Building2} label="Sân bóng" value={data.totalFields} />
        <SummaryCard icon={CalendarDays} label="Lượt đặt" value={data.totalBookings} />
      </div>
      <section className="mt-6 grid gap-5 lg:grid-cols-[.7fr_1.3fr]">
        <article className="rounded-3xl bg-pitch-900 p-6 text-white"><CircleDollarSign className="text-lime-300" size={24} /><p className="mt-5 text-sm font-semibold text-emerald-100/70">Doanh thu thống kê</p><p className="mt-2 text-3xl font-black">{formatPrice(data.totalRevenue)}</p><p className="mt-3 text-xs leading-5 text-emerald-100/60">Theo quy tắc backend: booking CONFIRMED và COMPLETED.</p></article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6"><div className="flex items-center gap-2"><Activity size={19} className="text-pitch-600" /><h2 className="font-black text-slate-900">Booking theo trạng thái</h2></div><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{Object.entries(data.bookingsByStatus || {}).map(([status, count]) => <div key={status} className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-semibold text-slate-500">{statusLabel(status)}</p><p className="mt-1 text-2xl font-black text-slate-900">{count}</p></div>)}</div></article>
      </section>
    </>)}
    {tab === 'users' && <section className="rounded-3xl border border-slate-200 bg-white p-5"><h2 className="mb-4 text-lg font-black">Tài khoản người chơi</h2><Result query={users} empty="Chưa có người chơi"><Rows rows={users.data?.content} kind="user" action={(person) => {
      const next = person.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'
      if (window.confirm(`${next === 'BLOCKED' ? 'Khóa' : 'Mở khóa'} tài khoản ${person.email}?`)) updateUser.mutate({ id: person.id, status: next }, { onError: (reason) => setError(getErrorMessage(reason)) })
    }} /></Result><AdminPagination data={users.data} page={listPage} setPage={setListPage} /></section>}
    {tab === 'owners' && <section className="rounded-3xl border border-slate-200 bg-white p-5"><h2 className="mb-4 text-lg font-black">Tài khoản chủ sân</h2><Result query={owners} empty="Chưa có chủ sân"><Rows rows={owners.data?.content} kind="user" action={(person) => {
      const next = person.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'
      if (window.confirm(`${next === 'BLOCKED' ? 'Khóa' : 'Mở khóa'} tài khoản ${person.email}?`)) updateUser.mutate({ id: person.id, status: next }, { onError: (reason) => setError(getErrorMessage(reason)) })
    }} /></Result><AdminPagination data={owners.data} page={listPage} setPage={setListPage} /></section>}
    {tab === 'fields' && <section className="rounded-3xl border border-slate-200 bg-white p-5"><h2 className="mb-4 text-lg font-black">Toàn bộ sân bóng</h2><Result query={fields} empty="Chưa có sân bóng"><Rows rows={fields.data?.content} kind="field" action={(field) => {
      const next = field.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      if (window.confirm(`${next === 'ACTIVE' ? 'Mở hoạt động' : 'Tạm ngưng'} sân "${field.name}"?`)) updateField.mutate({ id: field.id, status: next }, { onError: (reason) => setError(getErrorMessage(reason)) })
    }} /></Result><AdminPagination data={fields.data} page={listPage} setPage={setListPage} /></section>}
    {tab === 'fieldTypes' && <section className="rounded-3xl border border-slate-200 bg-white p-5"><h2 className="mb-2 text-lg font-black">Danh mục loại sân</h2><p className="mb-4 text-sm text-slate-500">Danh mục chỉ đọc: backend hiện chỉ cung cấp API lấy danh sách loại sân.</p>{fieldTypes.isLoading ? <Loading /> : fieldTypes.isError ? <ErrorMessage message={getErrorMessage(fieldTypes.error, 'Không tải được danh mục loại sân.')} onRetry={fieldTypes.refetch} /> : fieldTypes.data?.length ? <div className="overflow-hidden rounded-2xl border border-slate-100"><div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500"><span>Mã</span><span>Tên loại sân</span><span>Mô tả</span><span>Trạng thái</span></div>{fieldTypes.data.map((type) => <div key={type.id} className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-4 border-t border-slate-100 px-4 py-4 text-sm"><span className="text-slate-500">#{type.id}</span><span className="font-bold text-slate-900">{type.name}</span><span className="text-slate-600">{type.description || '—'}</span><span className={`rounded-full px-3 py-1 text-xs font-bold ${type.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{statusLabel(type.status)}</span></div>)}</div> : <EmptyState title="Chưa có loại sân" />}</section>}
    {tab === 'bookings' && <section className="rounded-3xl border border-slate-200 bg-white p-5"><h2 className="mb-4 text-lg font-black">Danh sách booking</h2><Result query={bookings} empty="Chưa có lượt đặt"><Rows rows={bookings.data?.content} kind="booking" /></Result><AdminPagination data={bookings.data} page={listPage} setPage={setListPage} /></section>}
    {(updateUser.isError || updateField.isError) && <p className="mt-4 text-sm text-red-700">Không thể cập nhật trạng thái. Vui lòng tải lại và thử lại.</p>}
  </div>
}

function AdminPagination({ data, page, setPage }) {
  if (!data || data.totalPages < 2) return null
  return <div className="mt-5 flex items-center justify-center gap-3 border-t border-slate-100 pt-4"><button className="btn-secondary" disabled={page === 0} onClick={() => setPage((current) => current - 1)}>Trang trước</button><span className="text-sm text-slate-500">Trang {data.page + 1} / {data.totalPages}</span><button className="btn-secondary" disabled={page + 1 >= data.totalPages} onClick={() => setPage((current) => current + 1)}>Trang sau</button></div>
}

function Rows({ rows = [], kind, action }) {
  return <div className="divide-y divide-slate-100">{rows.map((row) => <article key={row.id} className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
    {kind === 'user' && <><div><p className="font-bold text-slate-900">{row.fullName}</p><p className="mt-1 text-sm text-slate-500">{row.email} · {row.phone || 'Chưa có số điện thoại'}</p></div><div className="flex items-center gap-3"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">{statusLabel(row.status)}</span>{action && <button className={row.status === 'ACTIVE' ? 'btn-danger' : 'btn-secondary'} onClick={() => action(row)}>{row.status === 'ACTIVE' ? 'Khóa' : 'Mở khóa'}</button>}</div></>}
    {kind === 'field' && <><div><p className="font-bold text-slate-900">{row.name}</p><p className="mt-1 text-sm text-slate-500">{row.address} · {row.fieldType?.name} · {formatPrice(row.pricePerHour)}/giờ</p></div><div className="flex items-center gap-3"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">{statusLabel(row.status)}</span><button className="btn-secondary" onClick={() => action(row)}>{row.status === 'ACTIVE' ? 'Tạm ngưng' : 'Kích hoạt'}</button></div></>}
    {kind === 'booking' && <><div><p className="font-bold text-slate-900">#{row.id} · {row.fieldName}</p><p className="mt-1 text-sm text-slate-500">{row.userFullName} · {formatDate(row.bookingDate)} · {row.startTime}–{row.endTime}</p></div><div className="flex items-center gap-4"><div className="sm:text-right"><p className="font-bold text-pitch-700">{formatPrice(row.totalPrice)}</p><p className="mt-1 text-xs text-slate-500">{statusLabel(row.status)}</p></div><Link to={`/luot-dat/${row.id}`} className="btn-secondary"><Eye size={16} />Chi tiết</Link></div></>}
  </article>)}</div>
}
