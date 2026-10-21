import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, UserPlus, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Xóa lỗi của trường khi người dùng gõ lại
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
    setGeneralError('');
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Họ tên không được để trống';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email không đúng định dạng';
    }
    if (!formData.password) {
      errors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    if (formData.phone && !/^0\d{9}$/.test(formData.phone)) {
      errors.phone = 'Số điện thoại phải gồm 10 chữ số bắt đầu bằng 0';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMessage('');

    if (!validate()) return;

    setSubmitting(true);
    const result = await register(formData);
    setSubmitting(false);

    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } else {
      setGeneralError(result.message);
      if (result.errors) {
        setFieldErrors(result.errors);
      }
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mb-1">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Tạo Tài Khoản Mới
          </h2>
          <p className="text-xs text-slate-500">
            Đăng ký để trải nghiệm dịch vụ tìm và giữ chỗ sân bóng trực tuyến
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage} Đang chuyển sang trang đăng nhập...</span>
          </div>
        )}

        {/* General Error Alert */}
        {generalError && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{generalError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Họ và Tên <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 font-medium ${
                  fieldErrors.fullName
                    ? 'border-red-400 focus:ring-red-400/20'
                    : 'border-slate-300 focus:ring-emerald-500/20 focus:border-emerald-600'
                }`}
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {fieldErrors.fullName && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Địa chỉ Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 font-medium ${
                  fieldErrors.email
                    ? 'border-red-400 focus:ring-red-400/20'
                    : 'border-slate-300 focus:ring-emerald-500/20 focus:border-emerald-600'
                }`}
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Ít nhất 6 ký tự"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 font-medium ${
                  fieldErrors.password
                    ? 'border-red-400 focus:ring-red-400/20'
                    : 'border-slate-300 focus:ring-emerald-500/20 focus:border-emerald-600'
                }`}
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {fieldErrors.password && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Số điện thoại liên hệ
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder="Ví dụ: 0912345678"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 font-medium ${
                  fieldErrors.phone
                    ? 'border-red-400 focus:ring-red-400/20'
                    : 'border-slate-300 focus:ring-emerald-500/20 focus:border-emerald-600'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {fieldErrors.phone && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed mt-2"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting ? 'Đang Đăng Ký...' : 'TẠO TÀI KHOẢN'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600">
          Đã có tài khoản?{' '}
          <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-700">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
