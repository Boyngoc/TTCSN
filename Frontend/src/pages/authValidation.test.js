import { describe, expect, it } from 'vitest'
import { validateAuthForm } from './authValidation.js'

describe('validateAuthForm', () => {
  it('requires an email and password for login', () => {
    expect(validateAuthForm(false, {})).toEqual({
      email: 'Email không được để trống.',
      password: 'Mật khẩu không được để trống.',
    })
  })

  it('checks registration fields and an optional phone number', () => {
    expect(validateAuthForm(true, {
      fullName: ' ',
      email: 'not-an-email',
      password: '123',
      phone: '123',
    })).toEqual({
      fullName: 'Họ và tên không được để trống.',
      email: 'Email không đúng định dạng.',
      password: 'Mật khẩu phải có ít nhất 6 ký tự.',
      phone: 'Số điện thoại phải gồm 10 chữ số bắt đầu bằng 0.',
    })
  })

  it('accepts a valid registration without a phone number', () => {
    expect(validateAuthForm(true, {
      fullName: 'Nguyễn Văn A',
      email: 'a@example.com',
      password: '123456',
      phone: '',
    })).toEqual({})
  })
})
