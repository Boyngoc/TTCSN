import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save, Layers } from 'lucide-react';
import { ownerApi } from '../../api/ownerApi';
import { fieldApi } from '../../api/fieldApi';
import { useToast } from '../../context/ToastContext';
import { ActiveStatus } from '../../utils/status';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Textarea } from '../../components/common/Textarea';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

const fieldSchema = z.object({
  name: z.string().min(2, 'Tên sân phải có ít nhất 2 ký tự'),
  fieldTypeId: z.coerce.number().min(1, 'Vui lòng chọn loại sân'),
  address: z.string().min(5, 'Địa chỉ chi tiết ít nhất 5 ký tự'),
  description: z.string().optional(),
  pricePerHour: z.coerce.number().min(10000, 'Giá thuê tối thiểu 10,000 VNĐ/giờ'),
  imageUrl: z.string().optional(),
  phone: z.string().min(10, 'Số điện thoại từ 10 số').max(11, 'Số điện thoại tối đa 11 số'),
  mapLink: z.string().optional(),
  status: z.enum([ActiveStatus.ACTIVE, ActiveStatus.INACTIVE]).optional(),
});

export const OwnerFieldFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();
  const queryClient = useQueryClient();

  // Load field types
  const { data: fieldTypes = [] } = useQuery({
    queryKey: ['field-types'],
    queryFn: () => fieldApi.getFieldTypes(),
  });

  // Load existing field if edit mode
  const { data: existingField, isLoading: fieldLoading } = useQuery({
    queryKey: ['owner-field-detail', id],
    queryFn: () => ownerApi.getFieldById(id),
    enabled: isEdit,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      name: '',
      fieldTypeId: '',
      address: '',
      description: '',
      pricePerHour: '',
      imageUrl: '',
      phone: '',
      mapLink: '',
      status: ActiveStatus.ACTIVE,
    },
  });

  useEffect(() => {
    if (existingField) {
      reset({
        name: existingField.name || '',
        fieldTypeId: existingField.fieldTypeId || existingField.typeId || '',
        address: existingField.address || '',
        description: existingField.description || '',
        pricePerHour: existingField.pricePerHour || '',
        imageUrl: existingField.imageUrl || '',
        phone: existingField.phone || '',
        mapLink: existingField.mapLink || '',
        status: existingField.status || ActiveStatus.ACTIVE,
      });
    }
  }, [existingField, reset]);

  const saveMutation = useMutation({
    mutationFn: (data) => {
      if (isEdit) {
        return ownerApi.updateField(id, data);
      }
      return ownerApi.createField(data);
    },
    onSuccess: () => {
      success(isEdit ? 'Cập nhật sân bóng thành công!' : 'Tạo sân bóng mới thành công!');
      queryClient.invalidateQueries({ queryKey: ['owner-fields'] });
      queryClient.invalidateQueries({ queryKey: ['owner-stats'] });
      navigate('/owner/fields');
    },
    onError: (err) => {
      toastError(err.message || 'Không thể lưu thông tin sân bóng');
    },
  });

  const onSubmit = (data) => {
    saveMutation.mutate(data);
  };

  if (isEdit && fieldLoading) {
    return <LoadingSpinner fullScreen message="Đang tải dữ liệu sân bóng..." />;
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Back button & title */}
      <div>
        <Link
          to="/owner/fields"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-600 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách sân
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Chỉnh sửa thông tin sân bóng' : 'Thêm sân bóng mới'}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Điền các thông tin để người chơi dễ dàng tìm kiếm và đặt lịch
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Tên sân bóng"
            placeholder="Ví dụ: Sân bóng Chuyên Việt 1"
            {...register('name')}
            error={errors.name?.message}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Loại sân"
              options={fieldTypes.map((t) => ({ value: t.id.toString(), label: t.name }))}
              {...register('fieldTypeId')}
              error={errors.fieldTypeId?.message}
              required
            />

            <Input
              label="Giá thuê mỗi giờ (VNĐ)"
              type="number"
              placeholder="300000"
              {...register('pricePerHour')}
              error={errors.pricePerHour?.message}
              required
            />
          </div>

          <Input
            label="Địa chỉ chi tiết"
            placeholder="Số nhà, đường, phường, quận/huyện, thành phố..."
            {...register('address')}
            error={errors.address?.message}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Số điện thoại liên hệ"
              type="tel"
              placeholder="0912345678"
              {...register('phone')}
              error={errors.phone?.message}
              required
            />

            {isEdit && (
              <Select
                label="Trạng thái hoạt động"
                options={[
                  { value: ActiveStatus.ACTIVE, label: 'Đang hoạt động (ACTIVE)' },
                  { value: ActiveStatus.INACTIVE, label: 'Tạm ngừng đón khách (INACTIVE)' },
                ]}
                {...register('status')}
                error={errors.status?.message}
              />
            )}
          </div>

          <Input
            label="Link ảnh đại diện (URL)"
            placeholder="https://images.unsplash.com/photo-..."
            helperText="Nếu bỏ trống, hệ thống sẽ sử dụng ảnh mặc định của sân bóng"
            {...register('imageUrl')}
            error={errors.imageUrl?.message}
          />

          <Input
            label="Đường dẫn Google Maps (URL)"
            placeholder="https://maps.google.com/..."
            {...register('mapLink')}
            error={errors.mapLink?.message}
          />

          <Textarea
            label="Mô tả & Tiện ích sân bóng"
            rows={4}
            placeholder="Giới thiệu về chất lượng cỏ, hệ thống đèn, căn tin, phòng thay đồ..."
            {...register('description')}
            error={errors.description?.message}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Link to="/owner/fields">
              <Button variant="secondary" disabled={saveMutation.isPending}>
                Hủy
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              isLoading={saveMutation.isPending}
              icon={Save}
            >
              {isEdit ? 'Lưu cập nhật' : 'Tạo sân bóng'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
