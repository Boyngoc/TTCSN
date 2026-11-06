import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import PageHeading from '../components/PageHeading.jsx'
import { ErrorMessage, Loading, Notice } from '../components/Feedback.jsx'
import { useProfile, queryKeys } from '../hooks/useApi.js'
import { usersApi } from '../services/api/resources.js'
import { getErrorMessage } from '../services/api/client.js'
import { statusLabel } from '../utils/format.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function ProfilePage() {
  const profile = useProfile()
  const client = useQueryClient()
  const { updateUser } = useAuth()
  const [form, setForm] = useState({ fullName: '', phone: '' })
  const [saved, setSaved] = useState(false)
  useEffect(() => { if (profile.data) setForm({ fullName: profile.data.fullName || '', phone: profile.data.phone || '' }) }, [profile.data])
  const update = useMutation({ mutationFn: usersApi.updateMe, onSuccess: (data) => { client.setQueryData(queryKeys.profile, data); updateUser(data); setSaved(true) } })
  if (profile.isLoading) return <div className="page-wrap"><Loading /></div>
  if (profile.isError) return <div className="page-wrap"><ErrorMessage message={getErrorMessage(profile.error)} onRetry={profile.refetch} /></div>
  const user = profile.data
  return <div className="page-wrap max-w-4xl">
    <PageHeading eyebrow="Tài khoản" title="Thông tin cá nhân" description="Email, vai trò và trạng thái tài khoản do hệ thống quản lý." />
    {saved && <div className="mb-5"><Notice>Đã cập nhật hồ sơ thành công.</Notice></div>}
    {update.isError && <div className="mb-5"><ErrorMessage message={getErrorMessage(update.error)} /></div>}
    <div className="grid gap-6 md:grid-cols-[.8fr_1.2fr]">
      <section className="rounded-3xl bg-pitch-900 p-6 text-white"><p className="text-xs font-bold uppercase tracking-widest text-emerald-200">Thông tin hệ thống</p><p className="mt-6 text-2xl font-black">{user.fullName}</p><p className="mt-2 break-all text-sm text-emerald-100/75">{user.email}</p><div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{statusLabel(user.role)}</span><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{statusLabel(user.status)}</span></div></section>
      <form className="rounded-3xl border border-slate-200 bg-white p-6" onSubmit={(event) => { event.preventDefault(); setSaved(false); update.mutate(form) }}><h2 className="text-lg font-black text-slate-900">Cập nhật hồ sơ</h2><div className="mt-5 space-y-4"><label className="field-label">Họ và tên<input className="input-control" required value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} /></label><label className="field-label">Số điện thoại<input className="input-control" inputMode="numeric" pattern="0[0-9]{9}" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="0912345678" /></label><p className="text-xs leading-5 text-slate-400">API hồ sơ không hỗ trợ thay email, vai trò hoặc mật khẩu.</p><button className="btn-primary" disabled={update.isPending}>{update.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}</button></div></form>
    </div>
  </div>
}
