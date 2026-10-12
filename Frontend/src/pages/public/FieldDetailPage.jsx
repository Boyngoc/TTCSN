import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MapPin,
  Phone,
  ExternalLink,
  Star,
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { fieldApi } from '../../api/fieldApi';
import { bookingApi } from '../../api/bookingApi';
import { reviewApi } from '../../api/reviewApi';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatVND, formatDateTime, calculateDurationHours, estimateTotalPrice } from '../../utils/format';
import { DEFAULT_FIELD_IMAGE, Role } from '../../utils/status';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorState } from '../../components/common/ErrorState';

const bookingSchema = z
  .object({
    startTime: z.string().min(1, 'Vui lòng chọn thời gian bắt đầu'),
    endTime: z.string().min(1, 'Vui lòng chọn thời gian kết thúc'),
    note: z.string().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      return end > start;
    },
    {
      message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
      path: ['endTime'],
    }
  );

export const FieldDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { success, error: toastError } = useToast();
  const queryClient = useQueryClient();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Field details query
  const {
    data: field,
    isLoading: fieldLoading,
    error: fieldError,
    refetch: refetchField,
  } = useQuery({
    queryKey: ['field', id],
    queryFn: () => fieldApi.getFieldById(id),
  });

  // Reviews query
  const { data: reviews = [] } = useQuery({
    queryKey: ['field-reviews', id],
    queryFn: () => reviewApi.getReviewsByField(id),
    enabled: !!id,
  });

  // Booking Form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      startTime: '',
      endTime: '',
      note: '',
    },
  });

  const watchStartTime = watch('startTime');
  const watchEndTime = watch('endTime');
  const durationHours = calculateDurationHours(watchStartTime, watchEndTime);
  const estimatedTotal = field ? estimateTotalPrice(field.pricePerHour, durationHours) : 0;

  // Booking mutation
  const bookingMutation = useMutation({
    mutationFn: (data) =>
      bookingApi.createBooking({
        fieldId: Number(id),
        startTime: data.startTime,
        endTime: data.endTime,
        note: data.note,
      }),
    onSuccess: () => {
      success('Đặt sân thành công! Bạn có thể kiểm tra trạng thái trong mục Lịch đặt của tôi.');
      setBookingModalOpen(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
      navigate('/my-bookings');
    },
    onError: (err) => {
      toastError(err.message || 'Không thể đặt sân. Có thể khung giờ này đã bị trùng!');
    },
  });

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/fields/${id}` } } });
      return;
    }
    setBookingModalOpen(true);
  };

  const onBookingSubmit = (data) => {
    bookingMutation.mutate(data);
  };

  if (fieldLoading) {
    return <LoadingSpinner fullScreen message="Đang tải thông tin chi tiết sân bóng..." />;
  }

  if (fieldError || !field) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ErrorState
          title="Không thể tải thông tin sân bóng"
          message={fieldError?.message || 'Sân bóng không tồn tại'}
          onRetry={refetchField}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <Link
        to="/fields"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách sân
      </Link>

      {/* Main Grid: Gallery & Info + Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image */}
          <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
            <img
              src={field.imageUrl || DEFAULT_FIELD_IMAGE}
              alt={field.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_FIELD_IMAGE;
              }}
            />
            {field.typeName && (
              <span className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                {field.typeName}
              </span>
            )}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{field.averageRating ? field.averageRating.toFixed(1) : 'Mới'}</span>
              <span className="text-gray-400">({field.reviewCount || 0} đánh giá)</span>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                {field.name}
              </h1>
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{field.address}</span>
              </div>
            </div>

            {/* Quick Contact & Map links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100 text-sm">
              {field.phone && (
                <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">{field.phone}</span>
                </div>
              )}
              {field.mapLink && (
                <a
                  href={field.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Xem trên Google Maps
                </a>
              )}
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-2">Mô tả sân bóng</h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {field.description || 'Chủ sân chưa cung cấp mô tả chi tiết cho sân bóng này.'}
              </p>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Đánh giá từ khách hàng</h2>
                <p className="text-xs text-gray-400 mt-0.5">Nhận xét sau khi hoàn tất trận đấu</p>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-gray-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{field.averageRating ? field.averageRating.toFixed(1) : '5.0'} / 5.0</span>
              </div>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                Chưa có đánh giá nào cho sân bóng này.
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-gray-100">
                {reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                          {rev.userFullName?.charAt(0) || 'U'}
                        </div>
                        <span className="text-xs font-semibold text-gray-800">
                          {rev.userFullName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 pl-9 leading-relaxed">{rev.comment}</p>
                    <span className="block text-[10px] text-gray-400 pl-9">
                      {formatDateTime(rev.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Booking Action Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/50 p-6 sm:p-7 space-y-6">
            <div>
              <span className="text-xs text-gray-400 block mb-1">Giá thuê tiêu chuẩn</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-emerald-600">
                  {formatVND(field.pricePerHour)}
                </span>
                <span className="text-xs text-gray-400">/ 1 giờ</span>
              </div>
            </div>

            <div className="space-y-3 py-4 border-y border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Mặt cỏ nhân tạo tiêu chuẩn thi đấu</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Hệ thống chiếu sáng LED ban đêm</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Chủ sân xác nhận nhanh chóng qua hệ thống</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-lg shadow-emerald-500/20"
              icon={Calendar}
              onClick={handleBookingClick}
            >
              {isAuthenticated ? 'Đặt sân ngay' : 'Đăng nhập để đặt sân'}
            </Button>
            <p className="text-[11px] text-gray-400 text-center">
              Giá cuối cùng sẽ được tính chính xác dựa theo thời gian thi đấu thực tế
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title={`Đặt sân: ${field.name}`}
      >
        <form onSubmit={handleSubmit(onBookingSubmit)} className="space-y-4">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 flex items-start gap-2">
            <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              Giá thuê: <strong>{formatVND(field.pricePerHour)}/giờ</strong>. Vui lòng chọn khung giờ trống.
            </span>
          </div>

          <Input
            label="Thời gian bắt đầu"
            type="datetime-local"
            {...register('startTime')}
            error={errors.startTime?.message}
            required
          />

          <Input
            label="Thời gian kết thúc"
            type="datetime-local"
            {...register('endTime')}
            error={errors.endTime?.message}
            required
          />

          {durationHours > 0 && (
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Tổng thời gian dự kiến:</span>
                <span className="font-semibold text-gray-800">{durationHours.toFixed(1)} giờ</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Ước tính tạm tính:</span>
                <span className="font-bold text-emerald-600 text-sm">{formatVND(estimatedTotal)}</span>
              </div>
            </div>
          )}

          <Textarea
            label="Ghi chú thêm cho chủ sân (nếu có)"
            placeholder="Ví dụ: Đội cần mượn thêm áo pitch, bóng số 5..."
            {...register('note')}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button
              variant="secondary"
              onClick={() => setBookingModalOpen(false)}
              disabled={bookingMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={bookingMutation.isPending}
              icon={Calendar}
            >
              Xác nhận gửi đơn đặt
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
