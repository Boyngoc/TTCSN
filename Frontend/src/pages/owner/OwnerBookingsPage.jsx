import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  User,
  AlertCircle,
} from 'lucide-react';
import { ownerApi } from '../../api/ownerApi';
import { useToast } from '../../context/ToastContext';
import { formatVND, formatDateTime } from '../../utils/format';
import { BookingStatus, BookingStatusBadge } from '../../utils/status';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Pagination } from '../../components/common/Pagination';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';

export const OwnerBookingsPage = () => {
  const { success, error: toastError } = useToast();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const pageSize = 10;

  // Confirm/Reject action dialog state
  const [actionTarget, setActionTarget] = useState(null); // { type: 'confirm' | 'reject', booking }

  const {
    data: bookingsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['owner-bookings', { page, status: statusFilter }],
    queryFn: () =>
      ownerApi.getBookings({
        page,
        size: pageSize,
        status: statusFilter || undefined,
      }),
  });

  const confirmMutation = useMutation({
    mutationFn: (id) => ownerApi.confirmBooking(id),
    onSuccess: () => {
      success('Duyệt đơn đặt sân thành công!');
      setActionTarget(null);
      queryClient.invalidateQueries({ queryKey: ['owner-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['owner-stats'] });
    },
    onError: (err) => {
      toastError(err.message || 'Không thể duyệt đơn đặt này');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => ownerApi.rejectBooking(id),
    onSuccess: () => {
      success('Từ chối đơn đặt sân thành công!');
      setActionTarget(null);
      queryClient.invalidateQueries({ queryKey: ['owner-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['owner-stats'] });
    },
    onError: (err) => {
      toastError(err.message || 'Không thể từ chối đơn đặt này');
    },
  });

  const handleExecuteAction = () => {
    if (!actionTarget) return;
    if (actionTarget.type === 'confirm') {
      confirmMutation.mutate(actionTarget.booking.id);
    } else {
      rejectMutation.mutate(actionTarget.booking.id);
    }
  };

  const bookings = bookingsData?.content || [];
  const totalPages = bookingsData?.totalPages || 1;

  const filterTabs = [
    { label: 'Tất cả', value: '' },
    { label: 'Chờ duyệt', value: BookingStatus.PENDING },
    { label: 'Đã duyệt', value: BookingStatus.CONFIRMED },
    { label: 'Hoàn thành', value: BookingStatus.COMPLETED },
    { label: 'Từ chối', value: BookingStatus.REJECTED },
    { label: 'Đã hủy', value: BookingStatus.CANCELLED },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch đặt sân</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Theo dõi và phê duyệt các đơn đặt sân bóng từ khách hàng
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200 gap-2 overflow-x-auto pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setStatusFilter(tab.value);
              setPage(0);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              statusFilter === tab.value
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading && <LoadingSpinner message="Đang tải danh sách lịch đặt..." />}

      {error && (
        <ErrorState
          title="Không thể tải lịch đặt sân"
          message={error.message}
          onRetry={refetch}
        />
      )}

      {!isLoading && !error && bookings.length === 0 && (
        <EmptyState
          title="Không có lịch đặt nào"
          description="Hiện tại không có đơn đặt nào phù hợp với bộ lọc đã chọn."
        />
      )}

      {!isLoading && !error && bookings.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Mã đơn</th>
                  <th className="px-4 py-3">Sân bóng</th>
                  <th className="px-4 py-3">Khách hàng</th>
                  <th className="px-4 py-3">Khung giờ đặt</th>
                  <th className="px-4 py-3">Tổng tiền</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b) => {
                  const statusCfg = BookingStatusBadge[b.status] || {
                    label: b.status,
                    variant: 'gray',
                  };
                  const isPending = b.status === BookingStatus.PENDING;

                  return (
                    <tr key={b.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3.5 font-bold text-gray-900">#{b.id}</td>
                      <td className="px-4 py-3.5 font-medium text-gray-900">{b.fieldName}</td>
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-gray-800">{b.userFullName}</div>
                        {b.userPhone && (
                          <div className="text-[11px] text-gray-400">{b.userPhone}</div>
                        )}
                      </td>
                      <td className="px-4 py-3.5 space-y-0.5">
                        <div className="font-medium text-gray-800">
                          {formatDateTime(b.startTime)}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          đến {formatDateTime(b.endTime)}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-bold text-emerald-600">
                        {formatVND(b.totalPrice)}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {isPending ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="primary"
                              size="sm"
                              icon={CheckCircle2}
                              onClick={() => setActionTarget({ type: 'confirm', booking: b })}
                            >
                              Duyệt
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                              icon={XCircle}
                              onClick={() => setActionTarget({ type: 'reject', booking: b })}
                            >
                              Từ chối
                            </Button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-[11px]">Đã xử lý</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!actionTarget}
        onClose={() => setActionTarget(null)}
        onConfirm={handleExecuteAction}
        title={actionTarget?.type === 'confirm' ? 'Xác nhận duyệt đơn' : 'Xác nhận từ chối đơn'}
        message={
          actionTarget?.type === 'confirm'
            ? `Bạn có chắc muốn duyệt đơn đặt sân #${actionTarget?.booking?.id} (${actionTarget?.booking?.fieldName}) không?`
            : `Bạn có chắc muốn từ chối đơn đặt sân #${actionTarget?.booking?.id} (${actionTarget?.booking?.fieldName}) không?`
        }
        variant={actionTarget?.type === 'confirm' ? 'primary' : 'danger'}
        confirmText={actionTarget?.type === 'confirm' ? 'Duyệt đơn' : 'Từ chối đơn'}
        isLoading={confirmMutation.isPending || rejectMutation.isPending}
      />
    </div>
  );
};
