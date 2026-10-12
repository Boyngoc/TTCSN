import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trophy, Mail, Lock, User, Phone, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Role } from '../../utils/status';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên ít nhất 2 ký tự'),
  email: z.string().min(1, 'Email không được để trống').email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
  phone: z.string().min(10, 'Số điện thoại từ 10 số').max(11, 'Số điện thoại tối đa 11 số'),
  role: z.enum([Role.USER, Role.OWNER], { required_error: 'Vui lòng chọn vai trò' }),
});

export const RegisterPage = () => {
  const { register: registerAuth } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      role: Role.USER,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await registerAuth(data);
      success('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (err) {
      toastError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
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
          Tạo tài khoản mới
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Đã có tài khoản?{' '}
          <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-500">
            Đăng nhập
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-slate-200/50 rounded-2xl border border-gray-100">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Họ và tên"
              type="text"
              icon={User}
              placeholder="Nguyễn Văn A"
              {...register('fullName')}
              error={errors.fullName?.message}
              required
            />

            <Input
              label="Địa chỉ Email"
              type="email"
              icon={Mail}
              placeholder="name@example.com"
              {...register('email')}
              error={errors.email?.message}
              required
            />

            <Input
              label="Số điện thoại"
              type="tel"
              icon={Phone}
              placeholder="0987654321"
              {...register('phone')}
              error={errors.phone?.message}
              required
            />

            <Input
              label="Mật khẩu"
              type="password"
              icon={Lock}
              placeholder="Tối thiểu 6 ký tự"
              {...register('password')}
              error={errors.password?.message}
              required
            />

            <Select
              label="Vai trò đăng ký"
              placeholder=""
              options={[
                { value: Role.USER, label: 'Khách hàng (Đặt sân bóng)' },
                { value: Role.OWNER, label: 'Chủ sân bóng (Đăng và quản lý sân)' },
              ]}
              {...register('role')}
              error={errors.role?.message}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              isLoading={isLoading}
              icon={UserPlus}
            >
              Đăng ký tài khoản
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
