import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Phone, Mail, Shield, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { userApi } from '../../api/userApi';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên ít nhất 2 ký tự'),
  phone: z.string().min(10, 'Số điện thoại từ 10 số').max(11, 'Số điện thoại tối đa 11 số'),
});

export const ProfilePage = () => {
  const { user, updateCurrentUser } = useAuth();
  const { success, error: toastError } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      phone: user?.phone || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const updated = await userApi.updateProfile(data);
      updateCurrentUser(updated);
      success('Cập nhật thông tin cá nhân thành công!');
    } catch (err) {
      toastError(err.message || 'Không thể cập nhật hồ sơ cá nhân');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 max-w-2xl">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Thông tin tài khoản</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Cập nhật họ tên và số điện thoại liên lạc của bạn
          </p>
        </div>
        <Badge variant="green" size="md">
          {user?.role}
        </Badge>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email tài khoản
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="text"
              disabled
              value={user?.email || ''}
              className="block w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Email được sử dụng để đăng nhập và không thể thay đổi
          </p>
        </div>

        <Input
          label="Họ và tên"
          type="text"
          icon={User}
          {...register('fullName')}
          error={errors.fullName?.message}
          required
        />

        <Input
          label="Số điện thoại"
          type="tel"
          icon={Phone}
          {...register('phone')}
          error={errors.phone?.message}
          required
        />

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            icon={Save}
          >
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  );
};
