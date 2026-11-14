import {
  AlertCircle,
  Building2,
  CalendarDays,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
} from 'lucide-react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getErrorMessage } from '../services/api/client.js'
import { authApi } from '../services/api/resources.js'

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  // State form
  const [role, setRole] = useState('USER')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [generalError, setGeneralError] = useState('')

  const mutation = useMutation({
    mutationFn: (payload) => (isRegister ? authApi.register(payload) : authApi.login(payload)),
    onSuccess: (response) => {
      if (isRegister) {
        navigate('/dang-nhap', { replace: true, state: { registered: true } })
      } else {
        login(response)
        const userRole = response.data.data.user.role
        navigate(
          location.state?.from ||
            (userRole === 'ADMIN' ? '/quan-tri' : userRole === 'OWNER' ? '/chu-san' : '/san'),
          { replace: true }
        )
      }
    },
    onError: (err) => {
      setGeneralError(getErrorMessage(err, 'Đã xảy ra lỗi. Vui lòng thử lại.'))
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }))
    }
    setGeneralError('')
  }

  const validate = () => {
    const errors = {}

    if (isRegister) {
      if (!formData.fullName.trim()) {
        errors.fullName = 'Họ và tên không được để trống'
      }

      if (!formData.email.trim()) {
        errors.email = 'Email không được để trống'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.email = 'Email không đúng định dạng'
      }

      if (!formData.phone.trim()) {
        errors.phone = 'Số điện thoại không được để trống'
      } else if (!/^0\d{9}$/.test(formData.phone.trim())) {
        errors.phone = 'Số điện thoại gồm 10 chữ số bắt đầu bằng 0'
      }

      if (!formData.password) {
        errors.password = 'Mật khẩu không được để trống'
      } else if (formData.password.length < 6) {
        errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Mật khẩu xác nhận không khớp'
      }
    } else {
      if (!formData.email.trim()) {
        errors.email = 'Vui lòng nhập email'
      }
      if (!formData.password) {
        errors.password = 'Vui lòng nhập mật khẩu'
      }
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setGeneralError('')

    if (!validate()) return

    if (isRegister) {
      mutation.mutate({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: role,
      })
    } else {
      mutation.mutate({
        email: formData.email.trim(),
        password: formData.password,
      })
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
        
        {/* Cột trái: Khối màu xanh sân cỏ chuẩn thiết kế */}
        <div className="pitch-panel pitch-lines relative flex min-h-[580px] flex-col justify-between rounded-3xl p-8 sm:p-10 lg:col-span-5 lg:p-12 text-white shadow-xl shadow-pitch-900/10 overflow-hidden">
          {/* Header thương hiệu */}
          <Link to="/" className="inline-flex items-center gap-3 w-fit group">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/25 bg-white/15 text-white backdrop-blur transition group-hover:scale-105">
              <Trophy size={20} />
            </span>
            <div>
              <span className="block text-lg font-black tracking-tight leading-tight text-white">
                Sân Bóng Online
              </span>
              <span className="text-[11px] font-semibold text-emerald-100/85">
                Đặt sân nhanh · Không trùng lịch
              </span>
            </div>
          </Link>

          {/* Nội dung chính */}
          <div className="my-10 space-y-8">
            <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl text-white">
              {isRegister
                ? 'Sân bóng của bạn, đặt trước chỉ trong vài phút.'
                : 'Chào mừng trở lại với Sân Bóng Online.'}
            </h1>

            <div className="space-y-6">
              {/* Tính năng 1 */}
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/15 text-white backdrop-blur">
                  <CalendarDays size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">Lịch trống theo thời gian thực</h3>
                  <p className="mt-1 text-xs leading-relaxed text-emerald-100/85">
                    Xem chính xác khung giờ còn trống của từng sân, không cần gọi điện hỏi chủ sân.
                  </p>
                </div>
              </div>

              {/* Tính năng 2 */}
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/15 text-white backdrop-blur">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">Chống trùng lịch tuyệt đối</h3>
                  <p className="mt-1 text-xs leading-relaxed text-emerald-100/85">
                    Khung giờ được khóa ngay khi bạn giữ chỗ, không lo hai đội trùng giờ.
                  </p>
                </div>
              </div>

              {/* Tính năng 3 */}
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/15 text-white backdrop-blur">
                  <Sparkles size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">Quản lý sân trong một trang</h3>
                  <p className="mt-1 text-xs leading-relaxed text-emerald-100/85">
                    Chủ sân duyệt đơn, khóa giờ bảo trì và theo dõi doanh thu ở cùng một nơi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chân trang cột trái */}
          <p className="text-xs text-emerald-100/75">
            © 2026 Sân Bóng Online · Hệ thống đặt lịch sân bóng đá trực tuyến
          </p>
        </div>

        {/* Cột phải: Form tạo tài khoản / đăng nhập */}
        <div className="flex flex-col justify-center rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 lg:col-span-7">
          <div className="mx-auto w-full max-w-xl">
            {/* Header form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}
              </h2>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                {isRegister
                  ? 'Đăng ký để bắt đầu đặt sân hoặc trở thành đối tác chủ sân.'
                  : 'Đăng nhập để tiếp tục đặt sân và theo dõi lịch của bạn.'}
              </p>
            </div>

            {/* Thông báo thành công từ trang đăng ký chuyển sang */}
            {location.state?.registered && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-pitch-100 bg-pitch-50 p-3.5 text-xs font-semibold text-pitch-700 dark:border-pitch-800 dark:bg-pitch-950/60 dark:text-pitch-300">
                <CheckCircle2 size={16} className="shrink-0 text-pitch-600 dark:text-pitch-400" />
                <span>Tạo tài khoản thành công! Vui lòng đăng nhập để bắt đầu.</span>
              </div>
            )}

            {/* Thông báo lỗi tổng quát */}
            {generalError && (
              <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" />
                <span>{generalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              
              {/* Lựa chọn vai trò (Khách hàng / Chủ sân) */}
              {isRegister && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Bạn đăng ký với vai trò
                  </label>
                  <div className="grid grid-cols-2 gap-3.5">
                    {/* Nút chọn Khách hàng */}
                    <button
                      type="button"
                      onClick={() => setRole('USER')}
                      className={`flex items-start gap-3 rounded-2xl p-3.5 text-left transition-all cursor-pointer ${
                        role === 'USER'
                          ? 'border-2 border-pitch-600 bg-pitch-50 shadow-sm dark:border-pitch-500 dark:bg-pitch-950/70'
                          : 'border border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-slate-600'
                      }`}
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition ${
                          role === 'USER' ? 'bg-pitch-600 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                        }`}
                      >
                        <UserRound size={18} />
                      </span>
                      <div>
                        <p
                          className={`text-sm font-extrabold leading-tight ${
                            role === 'USER' ? 'text-pitch-900 dark:text-pitch-200' : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          Khách hàng
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Tìm và đặt sân</p>
                      </div>
                    </button>

                    {/* Nút chọn Chủ sân */}
                    <button
                      type="button"
                      onClick={() => setRole('OWNER')}
                      className={`flex items-start gap-3 rounded-2xl p-3.5 text-left transition-all cursor-pointer ${
                        role === 'OWNER'
                          ? 'border-2 border-pitch-600 bg-pitch-50 shadow-sm dark:border-pitch-500 dark:bg-pitch-950/70'
                          : 'border border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-slate-600'
                      }`}
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition ${
                          role === 'OWNER' ? 'bg-pitch-600 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                        }`}
                      >
                        <Building2 size={18} />
                      </span>
                      <div>
                        <p
                          className={`text-sm font-extrabold leading-tight ${
                            role === 'OWNER' ? 'text-pitch-900 dark:text-pitch-200' : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          Chủ sân
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Cho thuê sân của bạn</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Họ và tên */}
              {isRegister && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 dark:text-slate-300">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <UserRound size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={handleChange}
                      maxLength={100}
                      className={`w-full rounded-xl border bg-white pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${
                        fieldErrors.fullName
                          ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30'
                          : 'border-slate-200 focus:border-pitch-600 focus:ring-4 focus:ring-pitch-100 dark:focus:border-pitch-400 dark:focus:ring-pitch-900/40'
                      }`}
                    />
                  </div>
                  {fieldErrors.fullName && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.fullName}</p>
                  )}
                </div>
              )}

              {/* Email & Số điện thoại */}
              <div className={`grid grid-cols-1 gap-4 ${isRegister ? 'sm:grid-cols-2' : ''}`}>
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 dark:text-slate-300">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="ban@vidu.vn"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className={`w-full rounded-xl border bg-white pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${
                        fieldErrors.email
                          ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30'
                          : 'border-slate-200 focus:border-pitch-600 focus:ring-4 focus:ring-pitch-100 dark:focus:border-pitch-400 dark:focus:ring-pitch-900/40'
                      }`}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Số điện thoại */}
                {isRegister && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 dark:text-slate-300">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="0912345678"
                        value={formData.phone}
                        onChange={handleChange}
                        inputMode="numeric"
                        autoComplete="tel"
                        className={`w-full rounded-xl border bg-white pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${
                          fieldErrors.phone
                            ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30'
                            : 'border-slate-200 focus:border-pitch-600 focus:ring-4 focus:ring-pitch-100 dark:focus:border-pitch-400 dark:focus:ring-pitch-900/40'
                        }`}
                      />
                    </div>
                    {fieldErrors.phone && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.phone}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Mật khẩu & Xác nhận mật khẩu */}
              <div className={`grid grid-cols-1 gap-4 ${isRegister ? 'sm:grid-cols-2' : ''}`}>
                {/* Mật khẩu */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 dark:text-slate-300">
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <LockKeyhole size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete={isRegister ? 'new-password' : 'current-password'}
                      className={`w-full rounded-xl border bg-white pl-10 pr-10 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${
                        fieldErrors.password
                          ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30'
                          : 'border-slate-200 focus:border-pitch-600 focus:ring-4 focus:ring-pitch-100 dark:focus:border-pitch-400 dark:focus:ring-pitch-900/40'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-1"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {isRegister && <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Ít nhất 6 ký tự</p>}
                  {fieldErrors.password && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.password}</p>
                  )}
                </div>

                {/* Xác nhận mật khẩu (Chỉ hiển thị khi đăng ký) */}
                {isRegister && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 dark:text-slate-300">
                      Xác nhận mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <LockKeyhole size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                        className={`w-full rounded-xl border bg-white pl-10 pr-10 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${
                          fieldErrors.confirmPassword
                            ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30'
                            : 'border-slate-200 focus:border-pitch-600 focus:ring-4 focus:ring-pitch-100 dark:focus:border-pitch-400 dark:focus:ring-pitch-900/40'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-1"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.confirmPassword}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Nút gửi form */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="btn-primary mt-6 w-full py-3.5 text-sm font-bold shadow-md shadow-pitch-600/25 transition active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {mutation.isPending ? (
                  <>
                    <LoaderCircle className="animate-spin" size={18} />
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <span>{isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}</span>
                )}
              </button>
            </form>

            {/* Chuyển hướng đăng nhập / đăng ký */}
            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}{' '}
              <Link
                to={isRegister ? '/dang-nhap' : '/dang-ky'}
                className="font-bold text-pitch-600 hover:text-pitch-700 hover:underline dark:text-pitch-400 dark:hover:text-pitch-300"
              >
                {isRegister ? 'Đăng nhập' : 'Tạo tài khoản'}
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
