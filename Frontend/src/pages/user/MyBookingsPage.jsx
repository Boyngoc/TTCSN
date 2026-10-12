import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  XCircle,
  MessageSquarePlus,
  AlertTriangle,
} from 'lucide-react';
import { bookingApi } from '../../api/bookingApi';
import { reviewApi } from '../../api/reviewApi';
import { useToast } from '../../context/ToastContext';
import { formatVND, formatDateTime } from '../../utils/format';
import { BookingStatus, BookingStatusBadge } from '../../utils/status';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Textarea } from '../../components/common/Textarea';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Pagination } from '../../components/common/Pagination';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';

const reviewSchema = z.object({
  rating: z.number().min(1, 'Vui lòng chọn số sao').max(5),
  comment: z.string().min(5, 'Đánh giá tối thiểu 5 ký tự'),
});

export const MyBookingsPage = () => {
  const { success, error: toastError } = useToast();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const pageSize = 6;

  // Selected booking for Cancellation
  const [cancellingBooking, setCancellingBooking] = useState(null);

  // Selected booking for Review
  const [reviewingBooking, setReviewingBooking] = useState(null);
  const [selectedRating, setSelectedRating] = useState(5);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: '',
    },
  });

  // Fetch my bookings
  const {
    data: bookingsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['my-bookings', page],
    queryFn: () => bookingApi.getMyBookings({ page, size: pageSize }),
  });

  // Cancel booking mutation
  const cancelMutation = useMutation({
    mutationFn: (bookingId) => bookingApi.cancelBooking(bookingId),
    onSuccess: () => {
      success('Hủy đơn đặt sân thành công!');
      setCancellingBooking(null);
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
    },
    onError: (err) => {
      toastError(err.message || 'Không thể hủy đơn đặt sân');
    },
  });

  // Review mutation
  const reviewMutation = useMutation({
    mutationFn: (data) =>
      reviewApi.createReview({
        bookingId: reviewingBooking.id,
        rating: selectedRating,
        comment: data.comment,
      }),
    onSuccess: () => {
      success('Gửi đánh giá thành công! Cảm ơn bạn đã phản hồi.');
      setReviewingBooking(null);
      reset();
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
    },
    onError: (err) => {
      toastError(err.message || 'Không thể gửi đánh giá cho đơn này');
    },
  });

  const handleOpenReview = (b) => {
    setReviewingBooking(b);
    setSelectedRating(5);
    reset({ rating: 5, comment: '' });
  };

  const bookings = bookingsData?.content || [];
  const totalPages = bookingsData?.totalPages || 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Danh sách lịch đặt sân</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Quản lý và theo dõi trạng thái các trận đấu của bạn
          </p>
        </div>
      </div>

      {isLoading && <LoadingSpinner message="Đang tải danh sách lịch đặt sân..." />}

      {error && (
        <ErrorState
          title="Không thể tải lịch đặt sân"
          message={error.message}
          onRetry={refetch}
        />
      )}

      {!isLoading && !error && bookings.length === 0 && (
        <EmptyState
          title="Chưa có lịch đặt sân nào"
          description="Bạn chưa đặt sân bóng nào. Hãy khám phá và đặt sân ngay hôm nay!"
        />
      )}

      {!isLoading && !error && bookings.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((b) => {
              const statusCfg = BookingStatusBadge[b.status] || {
                label: b.status,
                variant: 'gray',
              };
              const canCancel =
                b.status === BookingStatus.PENDING ||
                b.status === BookingStatus.CONFIRMED;
              const canReview =
                (b.status === BookingStatus.CONFIRMED ||
                  b.status === BookingStatus.COMPLETED) &&
                !b.hasReviewed;

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold text-gray-400 block mb-0.5">
                          MÃ ĐƠN: #{b.id}
                        </span>
                        <h3 className="font-bold text-base text-gray-900 line-clamp-1">
                          {b.fieldName}
                        </h3>
                      </div>
                      <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                    </div>

                    <div className="space-y-1.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Bắt đầu: <strong>{formatDateTime(b.startTime)}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                        <span>Kết thúc: <strong>{formatDateTime(b.endTime)}</strong></span>
                      </div>
                      {b.note && (
                        <div className="pt-1.5 text-gray-500 border-t border-gray-200/60 text-[11px]">
                          <em>Ghi chú: {b.note}</em>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 block">Tổng tiền</span>
                      <span className="text-base font-bold text-emerald-600">
                        {formatVND(b.totalPrice)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {canReview && (
                        <Button
                          variant="outline"
                          size="sm"
                          icon={MessageSquarePlus}
                          onClick={() => handleOpenReview(b)}
                        >
                          Đánh giá
                        </Button>
                      )}

                      {canCancel && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-red-600 hover:bg-red-50 hover:border-red-200"
                          icon={XCircle}
                          onClick={() => setCancellingBooking(b)}
                        >
                          Hủy đơn
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!cancellingBooking}
        onClose={() => setCancellingBooking(null)}
        onConfirm={() => cancelMutation.mutate(cancellingBooking.id)}
        title="Xác nhận hủy đặt sân"
        message={`Bạn có chắc chắn muốn hủy đơn đặt sân #${cancellingBooking?.id} (${cancellingBooking?.fieldName}) không? Thao tác này không thể hoàn tác.`}
        confirmText="Hủy đặt sân"
        isLoading={cancelMutation.isPending}
      />

      {/* Review Modal */}
      <Modal
        isOpen={!!reviewingBooking}
        onClose={() => setReviewingBooking(null)}
        title={`Đánh giá sân: ${reviewingBooking?.fieldName}`}
      >
        <form onSubmit={handleSubmit(reviewMutation.mutate)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chất lượng sân bóng
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= selectedRating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-sm font-semibold text-gray-700 ml-2">
                {selectedRating} / 5 sao
              </span>
            </div>
          </div>

          <Textarea
            label="Nhận xét chi tiết"
            placeholder="Chia sẻ trải nghiệm của bạn về mặt sân, hệ thống chiếu sáng, dịch vụ..."
            {...register('comment')}
            error={errors.comment?.message}
            required
          />

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <Button
              variant="secondary"
              onClick={() => setReviewingBooking(null)}
              disabled={reviewMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={reviewMutation.isPending}
              icon={Star}
            >
              Gửi nhận xét
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
