import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Mail, Phone, UserRound } from 'lucide-react'
import PageHeading from '../components/PageHeading.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { ErrorMessage, Loading, Notice } from '../components/Feedback.jsx'
import { useProfile, queryKeys } from '../hooks/useApi.js'
import { usersApi } from '../services/api/resources.js'
import { getErrorMessage } from '../services/api/client.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function ProfilePage() {
  const profile = useProfile()
  const client = useQueryClient()
  const { updateUser } = useAuth()
  const [form, setForm] = useState({ fullName: '', phone: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (profile.data) setForm({ fullName: profile.data.fullName || '', phone: profile.data.phone || '' })
  }, [profile.data])

  const update = useMutation({
    mutationFn: usersApi.updateMe,
    onSuccess: (data) => {
      client.setQueryData(queryKeys.profile, data)
      updateUser(data)
      setSaved(true)
    },
  })

  if (profile.isLoading) return <div className="page-wrap"><Loading /></div>
  if (profile.isError) return <div className="page-wrap"><ErrorMessage message={getErrorMessage(profile.error)} onRetry={profile.refetch} /></div>

  const user = profile.data
  const initials = (user.fullName || 'S').trim().charAt(0).toUpperCase()

  return (
    <div className="page-wrap max-w-5xl">
      <PageHeading eyebrow="Tài khoản" title="Thông tin cá nhân" description="Quản lý thông tin hồ sơ đang được hỗ trợ bởi hệ thống." />
      {saved && <div className="mb-5"><Notice>Đã cập nhật hồ sơ thành công.</Notice></div>}
      {update.isError && <div className="mb-5"><ErrorMessage message={getErrorMessage(update.error)} /></div>}

      <div className="grid items-start gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-pitch-50 text-xl font-extrabold text-pitch-700">{initials}</span>
            <div className="min-w-0">
              <p className="truncate text-lg font-extrabold text-slate-900">{user.fullName}</p>
              <p className="mt-1 flex items-center gap-1.5 break-all text-sm text-slate-500"><Mail size={14} className="shrink-0" />{user.email}</p>
            </div>
          </div>
          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Thông tin tài khoản</p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={user.role} />
              <StatusBadge status={user.status} />
            </div>
            {user.phone && <p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><Phone size={15} className="text-slate-400" />{user.phone}</p>}
          </div>
        </section>

        <form
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
          onSubmit={(event) => { event.preventDefault(); setSaved(false); update.mutate(form) }}
        >
          <div className="mb-5">
            <p className="eyebrow">Chỉnh sửa hồ sơ</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900">Thông tin liên hệ</h2>
            <p className="mt-1 text-sm text-slate-500">Chỉ các trường được hỗ trợ bởi API mới có thể chỉnh sửa.</p>
          </div>
          <div className="space-y-4">
            <label className="field-label">
              Họ và tên
              <span className="relative block">
                <UserRound size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input className="input-control pl-10" required value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
              </span>
            </label>
            <label className="field-label">
              Số điện thoại
              <span className="relative block">
                <Phone size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input className="input-control pl-10" inputMode="numeric" pattern="0[0-9]{9}" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="0912345678" />
              </span>
              <span className="text-xs font-normal text-slate-400">Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.</span>
            </label>
            <p className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">Email, vai trò, mật khẩu và ảnh đại diện hiện không có API cập nhật trong hệ thống.</p>
            <button className="btn-primary w-full sm:w-auto" disabled={update.isPending}>{update.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
