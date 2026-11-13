import { useState } from 'react'
import {
  Activity,
  BarChart3,
  Building2,
  CalendarDays,
  CircleDollarSign,
  Eye,
  LogOut,
  Menu,
  Shapes,
  ShieldCheck,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeading from '../components/PageHeading.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { EmptyState, ErrorMessage, Loading } from '../components/Feedback.jsx'
import { useAdminData, useAdminMutation, useFieldTypes, queryKeys } from '../hooks/useApi.js'
import { adminApi } from '../services/api/resources.js'
import { getErrorMessage } from '../services/api/client.js'
import { formatDate, formatPrice } from '../utils/format.js'
import { useAuth } from '../contexts/AuthContext.jsx'

const tabs = [
  ['overview', 'Tổng quan', BarChart3],
  ['users', 'Người chơi', Users],
  ['owners', 'Chủ sân', ShieldCheck],
  ['fields', 'Sân bóng', Building2],
  ['fieldTypes', 'Loại sân', Shapes],
  ['bookings', 'Đơn đặt sân', CalendarDays],
]

const tabDescriptions = {
  overview: 'Các số liệu tổng quan được cung cấp bởi API quản trị.',
  users: 'Theo dõi tài khoản người chơi và trạng thái hiện tại.',
  owners: 'Theo dõi tài khoản chủ sân và trạng thái hiện tại.',
  fields: 'Xem thông tin sân bóng và trạng thái hoạt động.',
  fieldTypes: 'Danh mục loại sân hiện chỉ hỗ trợ xem.',
  bookings: 'Theo dõi lịch đặt và thông tin đơn theo dữ liệu backend.',
}

function SummaryCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-pitch-50 text-pitch-700"><Icon size={20} /></span>
      <p className="mt-5 text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950">{value ?? '—'}</p>
      {detail && <p className="mt-2 text-xs text-slate-400">{detail}</p>}
    </article>
  )
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const statistics = useAdminData(queryKeys.statistics, adminApi.statistics, tab === 'overview')
  const users = useAdminData([...queryKeys.adminUsers, listPage], () => adminApi.users({ page: listPage, size: 10 }), tab === 'users')
  const owners = useAdminData([...queryKeys.adminOwners, listPage], () => adminApi.owners({ page: listPage, size: 10 }), tab === 'owners')
  const fields = useAdminData([...queryKeys.adminFields, listPage], () => adminApi.fields({ page: listPage, size: 10 }), tab === 'fields')
  const bookings = useAdminData([...queryKeys.adminBookings, listPage], () => adminApi.bookings({ page: listPage, size: 10 }), tab === 'bookings')
  const fieldTypes = useFieldTypes(tab === 'fieldTypes')
  const updateUser = useAdminMutation(({ id, status }) => adminApi.updateUserStatus(id, status), [queryKeys.adminUsers, queryKeys.adminOwners])
  const updateField = useAdminMutation(({ id, status }) => adminApi.updateFieldStatus(id, status), [queryKeys.adminFields])
  const data = statistics.data
  const activeTab = tabs.find(([key]) => key === tab)
  const navigateTab = (value) => {
    setError('')
    setListPage(0)
    setTab(value)
    setSidebarOpen(false)
  }

  const renderUsers = (query, empty) => (
    <Result query={query} empty={empty}>
      <AdminTable
        rows={query.data?.content}
        kind="user"
        pending={updateUser.isPending}
        action={(person) => {
          const next = person.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'
          if (window.confirm(`${next === 'BLOCKED' ? 'Khóa' : 'Mở khóa'} tài khoản ${person.email}?`)) {
            updateUser.mutate({ id: person.id, status: next }, { onError: (reason) => setError(getErrorMessage(reason)) })
          }
        }}
      />
    </Result>
  )

  return (
    <div className="admin-page">
      <div className="admin-shell">
        {sidebarOpen && <button type="button" className="admin-sidebar-backdrop" aria-label="Đóng menu quản trị" onClick={() => setSidebarOpen(false)} />}
        <aside className={`admin-sidebar${sidebarOpen ? ' admin-sidebar-open' : ''}`}>
          <Link to="/" className="admin-brand">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-pitch-600 text-white"><Trophy size={19} /></span>
            <span><strong>Sân Nhà</strong><small>Football Booking</small></span>
          </Link>
          <div className="admin-sidebar-label">KHÔNG GIAN QUẢN TRỊ</div>
          <nav className="admin-side-nav" aria-label="Điều hướng quản trị">
            {tabs.map(([key, label, Icon]) => (
              <button
                type="button"
                key={key}
                aria-current={tab === key ? 'page' : undefined}
                onClick={() => navigateTab(key)}
                className={`admin-nav-item${tab === key ? ' admin-nav-item-active' : ''}`}
              >
                <Icon size={18} />{label}
              </button>
            ))}
          </nav>
          <div className="admin-sidebar-account">
            <div className="admin-account-avatar">{(user?.fullName || 'A').trim().charAt(0).toUpperCase()}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-800">{user?.fullName || 'Quản trị viên'}</p>
              <StatusBadge status={user?.role} className="mt-1" />
            </div>
            <button type="button" aria-label="Đăng xuất" title="Đăng xuất" className="admin-logout" onClick={logout}><LogOut size={17} /></button>
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-topbar">
            <button type="button" className="admin-menu-toggle" aria-label={sidebarOpen ? 'Đóng menu quản trị' : 'Mở menu quản trị'} aria-expanded={sidebarOpen} onClick={() => setSidebarOpen((open) => !open)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Quản trị hệ thống</p>
              <p className="truncate text-sm font-extrabold text-slate-900">{activeTab?.[1]}</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden text-right sm:block"><span className="block text-sm font-bold text-slate-800">{user?.fullName || 'Quản trị viên'}</span><span className="text-xs text-slate-500">Quản trị viên</span></span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-pitch-50 font-extrabold text-pitch-700">{(user?.fullName || 'A').trim().charAt(0).toUpperCase()}</span>
            </div>
          </header>

          <div className="admin-content">
            <PageHeading eyebrow="Khu vực quản trị" title={activeTab?.[1] || 'Tổng quan'} description={tabDescriptions[tab]} />
            {error && <div className="mb-5"><ErrorMessage message={error} /></div>}

            {tab === 'overview' && (statistics.isLoading ? <Loading /> : statistics.isError ? <ErrorMessage message={getErrorMessage(statistics.error)} onRetry={statistics.refetch} /> : <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard icon={Users} label="Người chơi" value={data.totalUsers} />
                <SummaryCard icon={ShieldCheck} label="Chủ sân" value={data.totalOwners} />
                <SummaryCard icon={Building2} label="Sân bóng" value={data.totalFields} />
                <SummaryCard icon={CalendarDays} label="Lượt đặt" value={data.totalBookings} />
              </div>
              <section className="mt-5 grid gap-5 xl:grid-cols-[.7fr_1.3fr]">
                <article className="rounded-2xl bg-pitch-900 p-6 text-white shadow-sm">
                  <CircleDollarSign className="text-green-200" size={24} />
                  <p className="mt-5 text-sm font-semibold text-green-100/75">Doanh thu thống kê</p>
                  <p className="mt-2 text-3xl font-extrabold">{formatPrice(data.totalRevenue)}</p>
                  <p className="mt-3 text-xs leading-5 text-green-100/65">Theo quy tắc backend: booking CONFIRMED và COMPLETED.</p>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center gap-2"><Activity size={19} className="text-pitch-600" /><h2 className="font-extrabold text-slate-900">Booking theo trạng thái</h2></div>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {Object.entries(data.bookingsByStatus || {}).map(([status, count]) => (
                      <div key={status} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <StatusBadge status={status} />
                        <p className="mt-2 text-2xl font-extrabold text-slate-900">{count}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </section>
            </>)}

            {tab === 'users' && <section className="admin-panel"><PanelHeading title="Tài khoản người chơi" /><div className="admin-panel-content">{renderUsers(users, 'Chưa có người chơi')}<AdminPagination data={users.data} page={listPage} setPage={setListPage} /></div></section>}
            {tab === 'owners' && <section className="admin-panel"><PanelHeading title="Tài khoản chủ sân" /><div className="admin-panel-content">{renderUsers(owners, 'Chưa có chủ sân')}<AdminPagination data={owners.data} page={listPage} setPage={setListPage} /></div></section>}
            {tab === 'fields' && <section className="admin-panel">
              <PanelHeading title="Toàn bộ sân bóng" />
              <div className="admin-panel-content">
                <Result query={fields} empty="Chưa có sân bóng">
                  <AdminTable
                    rows={fields.data?.content}
                    kind="field"
                    pending={updateField.isPending}
                    action={(field) => {
                      const next = field.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
                      if (window.confirm(`${next === 'ACTIVE' ? 'Mở hoạt động' : 'Tạm ngưng'} sân "${field.name}"?`)) {
                        updateField.mutate({ id: field.id, status: next }, { onError: (reason) => setError(getErrorMessage(reason)) })
                      }
                    }}
                  />
                </Result>
                <AdminPagination data={fields.data} page={listPage} setPage={setListPage} />
              </div>
            </section>}
            {tab === 'fieldTypes' && <section className="admin-panel">
              <PanelHeading title="Danh mục loại sân" description="Danh mục chỉ đọc: backend hiện chỉ cung cấp API lấy danh sách loại sân." />
              <div className="admin-panel-content">
                {fieldTypes.isLoading ? <Loading /> : fieldTypes.isError ? <ErrorMessage message={getErrorMessage(fieldTypes.error, 'Không tải được danh mục loại sân.')} onRetry={fieldTypes.refetch} /> : fieldTypes.data?.length ? (
                  <div className="overflow-x-auto">
                    <table className="admin-table min-w-[620px]">
                      <thead><tr><th>Mã</th><th>Tên loại sân</th><th>Mô tả</th><th>Trạng thái</th></tr></thead>
                      <tbody>{fieldTypes.data.map((type) => <tr key={type.id}><td className="text-slate-500">#{type.id}</td><td className="font-bold text-slate-900">{type.name}</td><td>{type.description || '—'}</td><td><StatusBadge status={type.status} /></td></tr>)}</tbody>
                    </table>
                  </div>
                ) : <EmptyState title="Chưa có loại sân" />}
              </div>
            </section>}
            {tab === 'bookings' && <section className="admin-panel"><PanelHeading title="Danh sách lượt đặt" /><div className="admin-panel-content"><Result query={bookings} empty="Chưa có lượt đặt"><AdminTable rows={bookings.data?.content} kind="booking" /></Result><AdminPagination data={bookings.data} page={listPage} setPage={setListPage} /></div></section>}
            {(updateUser.isError || updateField.isError) && <p className="mt-4 text-sm text-red-700">Không thể cập nhật trạng thái. Vui lòng tải lại và thử lại.</p>}
          </div>
        </main>
      </div>
    </div>
  )
}

function PanelHeading({ title, description }) {
  return (
    <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
      <h2 className="text-base font-extrabold text-slate-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    </div>
  )
}

function AdminPagination({ data, page, setPage }) {
  if (!data || data.totalPages < 2) return null
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-3 border-t border-slate-100 pt-4">
      <button type="button" className="btn-secondary" disabled={page === 0} onClick={() => setPage((current) => current - 1)}>Trang trước</button>
      <span className="text-sm text-slate-500">Trang {data.page + 1} / {data.totalPages}</span>
      <button type="button" className="btn-secondary" disabled={page + 1 >= data.totalPages} onClick={() => setPage((current) => current + 1)}>Trang sau</button>
    </div>
  )
}

function AdminTable({ rows = [], kind, action, pending = false }) {
  return (
    <div className="overflow-x-auto">
      <table className="admin-table min-w-[720px]">
        <thead>
          {kind === 'user' && <tr><th>Tài khoản</th><th>Liên hệ</th><th>Vai trò & trạng thái</th><th className="text-right">Thao tác</th></tr>}
          {kind === 'field' && <tr><th>Sân bóng</th><th>Địa chỉ & loại sân</th><th>Giá/giờ</th><th>Trạng thái</th><th className="text-right">Thao tác</th></tr>}
          {kind === 'booking' && <tr><th>Đơn đặt</th><th>Khách hàng & lịch</th><th>Tổng tiền</th><th>Trạng thái</th><th className="text-right">Chi tiết</th></tr>}
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {kind === 'user' && <>
                <td><p className="font-bold text-slate-900">{row.fullName || '—'}</p><p className="mt-1 text-xs text-slate-500">#{row.id}</p></td>
                <td><p>{row.email}</p><p className="mt-1 text-xs text-slate-500">{row.phone || 'Chưa có số điện thoại'}</p></td>
                <td><div className="flex flex-wrap gap-1.5">{row.role && <StatusBadge status={row.role} />}<StatusBadge status={row.status} /></div></td>
                <td className="text-right">{action && <button type="button" className={row.status === 'ACTIVE' ? 'btn-danger' : 'btn-secondary'} disabled={pending} onClick={() => action(row)}>{row.status === 'ACTIVE' ? 'Khóa' : 'Mở khóa'}</button>}</td>
              </>}
              {kind === 'field' && <>
                <td><div className="flex items-center gap-3">{row.imageUrl ? <img src={row.imageUrl} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover" /> : <span className="grid h-12 w-16 shrink-0 place-items-center rounded-lg bg-pitch-50 text-[10px] font-bold text-pitch-700">Sân bóng</span>}<div><p className="font-bold text-slate-900">{row.name}</p><p className="mt-1 text-xs text-slate-500">#{row.id}</p></div></div></td>
                <td>{row.address}<p className="mt-1 text-xs text-slate-500">{row.fieldType?.name || '—'}</p></td>
                <td className="font-bold text-slate-800">{formatPrice(row.pricePerHour)}</td>
                <td><StatusBadge status={row.status} /></td>
                <td className="text-right"><button type="button" className="btn-secondary" disabled={pending} onClick={() => action(row)}>{row.status === 'ACTIVE' ? 'Tạm ngưng' : 'Kích hoạt'}</button></td>
              </>}
              {kind === 'booking' && <>
                <td><p className="font-bold text-slate-900">#{row.id} · {row.fieldName}</p><p className="mt-1 text-xs text-slate-500">{formatDate(row.bookingDate)}</p></td>
                <td><p>{row.userFullName || '—'}</p><p className="mt-1 text-xs text-slate-500">{row.startTime}–{row.endTime}</p></td>
                <td className="font-bold text-pitch-700">{formatPrice(row.totalPrice)}</td>
                <td><StatusBadge status={row.status} /></td>
                <td className="text-right"><Link to={`/luot-dat/${row.id}`} className="btn-secondary"><Eye size={16} />Chi tiết</Link></td>
              </>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
