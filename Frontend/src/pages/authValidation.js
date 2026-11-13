const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateAuthForm(isRegister, { fullName = '', email = '', password = '', phone = '' }) {
  const errors = {}

  if (isRegister && !fullName.trim()) errors.fullName = 'Họ và tên không được để trống.'
  if (!email.trim()) errors.email = 'Email không được để trống.'
  else if (!emailPattern.test(email)) errors.email = 'Email không đúng định dạng.'
  if (!password) errors.password = 'Mật khẩu không được để trống.'
  else if (isRegister && password.length < 6) errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.'
  if (isRegister && phone && !/^0\d{9}$/.test(phone)) {
    errors.phone = 'Số điện thoại phải gồm 10 chữ số bắt đầu bằng 0.'
  }

  return errors
}
