import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../api/adminApi';
import { formatVND, formatDateTime } from '../../utils/format';
import { BookingStatus, BookingStatusBadge } from '../../utils/status';
import { Badge } from '../../components/common/Badge';
import { Pagination } from '../../components/common/Pagination';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';

export const AdminBookingsPage = () => {
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const pageSize = 10;

  const {
    data: bookingsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin-bookings', { page, status: statusFilter }],
    queryFn: () =>
      adminApi.getBookings({
        page,
        size: pageSize,
        status: statusFilter || undefined,
      }),
  });

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
        <h1 className="text-2xl font-bold text-gray-900">Quản lý toàn bộ lịch đặt sân</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Theo dõi và kiểm soát tất cả giao dịch đặt sân trên toàn hệ thống
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
                ? 'bg-purple-600 text-white shadow-sm shadow-purple-200'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading && <LoadingSpinner message="Đang tải danh sách lịch đặt toàn hệ thống..." />}

      {error && (
        <ErrorState
          title="Không thể tải danh sách lịch đặt"
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
                  <th className="px-4 py-3">Thời gian thi đấu</th>
                  <th className="px-4 py-3">Tổng tiền</th>
                  <th className="px-4 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b) => {
                  const statusCfg = BookingStatusBadge[b.status] || {
                    label: b.status,
                    variant: 'gray',
                  };

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
    </div>
  );
};
