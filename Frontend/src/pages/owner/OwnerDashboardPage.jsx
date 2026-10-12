import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Layers,
  CalendarCheck,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  Clock,
  Star,
} from 'lucide-react';
import { ownerApi } from '../../api/ownerApi';
import { formatVND, formatDateTime } from '../../utils/format';
import { BookingStatusBadge } from '../../utils/status';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorState } from '../../components/common/ErrorState';

export const OwnerDashboardPage = () => {
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch,
  } = useQuery({
    queryKey: ['owner-stats'],
    queryFn: () => ownerApi.getDashboardStats(),
  });

  const { data: bookingsData } = useQuery({
    queryKey: ['owner-recent-bookings'],
    queryFn: () => ownerApi.getBookings({ page: 0, size: 5 }),
  });

  if (statsLoading) {
    return <LoadingSpinner message="Đang tải dữ liệu tổng quan chủ sân..." />;
  }

  if (statsError) {
    return (
      <ErrorState
        title="Không thể tải dữ liệu tổng quan"
        message={statsError.message}
        onRetry={refetch}
      />
    );
  }

  const statCards = [
    {
      label: 'Tổng số sân',
      value: stats?.totalFields || 0,
      icon: Layers,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      label: 'Tổng lượt đặt',
      value: stats?.totalBookings || 0,
      icon: CalendarCheck,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
    {
      label: 'Đơn chờ duyệt',
      value: stats?.pendingBookings || 0,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      label: 'Tổng doanh thu',
      value: formatVND(stats?.totalRevenue || 0),
      icon: TrendingUp,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
  ];

  const recentBookings = bookingsData?.content || [];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tổng quan sân bóng của bạn</h1>
          <p className="text-xs text-gray-500 mt-1">
            Theo dõi tình hình kinh doanh và quản lý các lịch đặt gần đây
          </p>
        </div>
        <Link to="/owner/fields/new">
          <Button variant="primary" icon={PlusCircle}>
            Thêm sân bóng mới
          </Button>
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-medium text-gray-500 block mb-1">
                  {card.label}
                </span>
                <span className="text-2xl font-bold text-gray-900">{card.value}</span>
              </div>
              <div className={`p-3 rounded-xl border ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">Lịch đặt sân gần đây</h2>
          <Link
            to="/owner/bookings"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            Xem tất cả
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <p className="text-xs text-gray-400 py-6 text-center">Chưa có lịch đặt nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Mã đơn</th>
                  <th className="px-4 py-3">Sân bóng</th>
                  <th className="px-4 py-3">Khách hàng</th>
                  <th className="px-4 py-3">Thời gian</th>
                  <th className="px-4 py-3">Tổng tiền</th>
                  <th className="px-4 py-3 rounded-r-lg">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBookings.map((b) => {
                  const statusCfg = BookingStatusBadge[b.status] || {
                    label: b.status,
                    variant: 'gray',
                  };
                  return (
                    <tr key={b.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3.5 font-bold text-gray-900">#{b.id}</td>
                      <td className="px-4 py-3.5 font-medium text-gray-900">{b.fieldName}</td>
                      <td className="px-4 py-3.5">{b.userFullName}</td>
                      <td className="px-4 py-3.5">{formatDateTime(b.startTime)}</td>
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
        )}
      </div>
    </div>
  );
};
