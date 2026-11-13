import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  LoaderCircle,
  LogIn,
  Mail,
  Phone,
  Trophy,
  UserRound,
  UserRoundPlus,
} from 'lucide-react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getErrorMessage } from '../services/api/client.js'
import { authApi } from '../services/api/resources.js'
import { ErrorMessage, Notice } from '../components/Feedback.jsx'
import { validateAuthForm } from './authValidation.js'

function FieldError({ id, children }) {
  return children ? <p id={id} className="auth-field-error">{children}</p> : null
}

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
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
    const errors = validateAuthForm(isRegister, payload)
    setFieldErrors(errors)
    if (Object.keys(errors).length) return
    if (isRegister && !payload.phone) payload.phone = null
    mutation.mutate(payload)
  }

  const inputClass = (name) => `auth-input${fieldErrors[name] ? ' auth-input-invalid' : ''}`

  return (
    <section className="auth-page">
      <div className="auth-card">
        <aside className="auth-visual">
          <div className="auth-visual-top">
            <Link to="/" className="auth-brand" aria-label="Football Booking - Trang chủ">
              <span className="auth-brand-icon"><Trophy size={21} strokeWidth={2.2} /></span>
              <span>
                <span className="auth-brand-name">Sân Nhà</span>
                <span className="auth-brand-caption">FOOTBALL BOOKING</span>
              </span>
            </Link>
            <Link to="/" className="auth-back-link"><ArrowLeft size={16} /> Về trang chủ</Link>
          </div>

          <div className="auth-visual-copy">
            <span className="auth-visual-kicker"><span /> Sẵn sàng cho trận đấu tiếp theo?</span>
            <h2>Sân tốt.<br />Trận cầu hay.</h2>
            <p>Tìm sân phù hợp và chủ động theo dõi lịch đặt của bạn trên Sân Nhà.</p>
            <div className="auth-visual-points">
              <span><Check size={16} /> Tìm sân bóng dễ dàng</span>
              <span><Check size={16} /> Quản lý lịch đặt tiện lợi</span>
            </div>
          </div>

          <p className="auth-visual-footnote"><Check size={15} /> Tìm sân phù hợp, sẵn sàng cho trận đấu tiếp theo</p>
        </aside>

        <div className="auth-form-panel">
          <div className="auth-form-content">
            <p className="auth-eyebrow">{isRegister ? 'Bắt đầu hành trình' : 'Chào mừng trở lại'}</p>
            <h1>{isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}</h1>
            <p className="auth-description">
              {isRegister
                ? 'Đăng ký tài khoản người chơi để tìm và đặt sân bóng.'
                : 'Đăng nhập để tiếp tục đặt sân và theo dõi lịch của bạn.'}
            </p>

            {location.state?.registered && (
              <div className="auth-notice">
                <Notice>Tạo tài khoản thành công. Hãy đăng nhập để tiếp tục.</Notice>
              </div>
            )}

            {mutation.isError && (
              <div className="auth-error" role="alert">
                <ErrorMessage message={getErrorMessage(mutation.error)} />
              </div>
            )}

            <form className="auth-form" onSubmit={submit} noValidate>
              {isRegister && (
                <div className="auth-field">
                  <label htmlFor="fullName">Họ và tên <span>*</span></label>
                  <div className="auth-input-wrap">
                    <UserRound className="auth-input-icon" size={18} />
                    <input
                      className={inputClass('fullName')}
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Nguyễn Văn A"
                      maxLength={100}
                      required
                      aria-invalid={Boolean(fieldErrors.fullName)}
                      aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
                    />
                  </div>
                  <FieldError id="fullName-error">{fieldErrors.fullName}</FieldError>
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="email">Email <span>*</span></label>
                <div className="auth-input-wrap">
                  <Mail className="auth-input-icon" size={18} />
                  <input
                    className={inputClass('email')}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="ten@email.com"
                    required
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  />
                </div>
                <FieldError id="email-error">{fieldErrors.email}</FieldError>
              </div>

              <div className="auth-field">
                <label htmlFor="password">Mật khẩu <span>*</span></label>
                <div className="auth-input-wrap">
                  <LockKeyhole className="auth-input-icon" size={18} />
                  <input
                    className={`${inputClass('password')} auth-password-input`}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    placeholder={isRegister ? 'Ít nhất 6 ký tự' : 'Nhập mật khẩu của bạn'}
                    minLength={isRegister ? 6 : undefined}
                    required
                    aria-invalid={Boolean(fieldErrors.password)}
                    aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <FieldError id="password-error">{fieldErrors.password}</FieldError>
              </div>

              {isRegister && (
                <div className="auth-field">
                  <label htmlFor="phone">Số điện thoại <span className="auth-optional">(không bắt buộc)</span></label>
                  <div className="auth-input-wrap">
                    <Phone className="auth-input-icon" size={18} />
                    <input
                      className={inputClass('phone')}
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="numeric"
                      pattern="0[0-9]{9}"
                      placeholder="0912345678"
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                    />
                  </div>
                  <FieldError id="phone-error">{fieldErrors.phone}</FieldError>
                </div>
              )}

              <button className="auth-submit" type="submit" disabled={mutation.isPending}>
                {mutation.isPending
                  ? <><LoaderCircle className="auth-spinner" size={19} /> Đang xử lý...</>
                  : isRegister
                    ? <><UserRoundPlus size={19} /> Tạo tài khoản</>
                    : <><LogIn size={19} /> Đăng nhập</>}
              </button>
            </form>

            <p className="auth-switch">
              {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}{' '}
              <Link to={isRegister ? '/dang-nhap' : '/dang-ky'}>
                {isRegister ? 'Đăng nhập' : 'Đăng ký ngay'}
              </Link>
            </p>
            <p className="auth-form-footnote">Các trường có dấu * là bắt buộc.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
