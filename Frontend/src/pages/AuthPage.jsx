import { ArrowLeft, LockKeyhole, LogIn, UserRoundPlus } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getErrorMessage } from '../services/api/client.js'
import { authApi } from '../services/api/resources.js'
import { ErrorMessage } from '../components/Feedback.jsx'

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const mutation = useMutation({
    mutationFn: (payload) => isRegister ? authApi.register(payload) : authApi.login(payload),
    onSuccess: (response) => {
      if (isRegister) navigate('/dang-nhap', { replace: true, state: { registered: true } })
      else {
        login(response)
        const role = response.data.data.user.role
        navigate(location.state?.from || (role === 'ADMIN' ? '/quan-tri' : role === 'OWNER' ? '/chu-san' : '/san'), { replace: true })
      }
    },
  })
  const submit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = Object.fromEntries(form.entries())
    if (isRegister && !payload.phone) payload.phone = null
    mutation.mutate(payload)
  }

  return <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
    <div className="hidden rounded-[2rem] bg-pitch-900 p-10 text-white md:block"><Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-100"><ArrowLeft size={16} />Sân Nhà</Link><div className="pitch-lines mt-8 grid aspect-square place-items-center rounded-3xl border border-white/20"><div className="max-w-xs text-center"><LockKeyhole className="mx-auto text-lime-300" size={44} /><p className="mt-5 text-3xl font-black">Tài khoản của bạn, lịch sân của bạn.</p><p className="mt-3 text-emerald-100/70">Đăng nhập để quản lý các lượt đặt và cập nhật hồ sơ.</p></div></div></div>
    <div className="mx-auto w-full max-w-md"><p className="eyebrow">{isRegister ? 'Bắt đầu miễn phí' : 'Chào mừng trở lại'}</p><h1 className="mt-2 text-3xl font-black text-slate-950">{isRegister ? 'Tạo tài khoản người chơi' : 'Đăng nhập'}</h1><p className="mt-2 text-slate-500">{isRegister ? 'Đăng ký tạo tài khoản USER. Vai trò OWNER/ADMIN không thể tự đăng ký.' : 'Đăng nhập để tiếp tục đặt sân và theo dõi lịch.'}</p>
      {location.state?.registered && <p className="mt-5 rounded-xl bg-pitch-50 p-3 text-sm text-pitch-700">Tạo tài khoản thành công. Hãy đăng nhập để tiếp tục.</p>}
      {mutation.isError && <div className="mt-5"><ErrorMessage message={getErrorMessage(mutation.error)} /></div>}
      <form className="mt-7 space-y-4" onSubmit={submit}>
        {isRegister && <label className="field-label">Họ và tên<input className="input-control" name="fullName" autoComplete="name" required maxLength={100} /></label>}
        <label className="field-label">Email<input className="input-control" type="email" name="email" autoComplete="email" required /></label>
        <label className="field-label">Mật khẩu<input className="input-control" type="password" name="password" autoComplete={isRegister ? 'new-password' : 'current-password'} minLength={isRegister ? 6 : undefined} required /></label>
        {isRegister && <label className="field-label">Số điện thoại <span className="font-normal text-slate-400">(không bắt buộc)</span><input className="input-control" type="tel" name="phone" inputMode="numeric" pattern="0[0-9]{9}" placeholder="0912345678" /></label>}
        <button className="btn-primary mt-2 w-full justify-center" disabled={mutation.isPending}>{isRegister ? <UserRoundPlus size={17} /> : <LogIn size={17} />}{mutation.isPending ? 'Đang xử lý...' : isRegister ? 'Tạo tài khoản USER' : 'Đăng nhập'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">{isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'} <Link className="font-bold text-pitch-700 hover:underline" to={isRegister ? '/dang-nhap' : '/dang-ky'}>{isRegister ? 'Đăng nhập' : 'Đăng ký USER'}</Link></p>
    </div>
  </div>
}
