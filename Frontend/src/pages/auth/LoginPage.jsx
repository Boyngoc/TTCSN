import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trophy, Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Role } from '../../utils/status';

const loginSchema = z.object({
  email: z.string().min(1, 'Email không được để trống').email('Email không đúng định dạng'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
});

export const LoginPage = () => {
  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const user = await login(data);
      success(`Đăng nhập thành công! Chào mừng ${user.fullName}`);

      // Redirect based on previous location or user role
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === Role.ADMIN) {
        navigate('/admin', { replace: true });
      } else if (user.role === Role.OWNER) {
        navigate('/owner', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      toastError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (email, password) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', password, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Trophy className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-gray-900">
            Football<span className="text-emerald-600">Booking</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Đăng nhập vào tài khoản
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-500">
            Đăng ký ngay
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-slate-200/50 rounded-2xl border border-gray-100">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Địa chỉ Email"
              type="email"
              icon={Mail}
              placeholder="name@example.com"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Mật khẩu"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={LogIn}
            >
              Đăng nhập
            </Button>
          </form>

          {/* 1-Click Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Tài khoản mẫu thử nghiệm
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => fillDemo('user@footballbooking.com', 'User@123')}
                className="px-2.5 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
              >
                Khách chơi
              </button>
              <button
                type="button"
                onClick={() => fillDemo('owner@footballbooking.com', 'Owner@123')}
                className="px-2.5 py-2 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
              >
                Chủ sân
              </button>
              <button
                type="button"
                onClick={() => fillDemo('admin@footballbooking.com', 'Admin@123')}
                className="px-2.5 py-2 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors"
              >
                Quản trị
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
