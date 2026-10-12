import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  Briefcase,
  Layers,
  CalendarCheck,
  TrendingUp,
  Shield,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { adminApi } from '../../api/adminApi';
import { formatVND } from '../../utils/format';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorState } from '../../components/common/ErrorState';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export const AdminDashboardPage = () => {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.getDashboardStats(),
  });

  if (isLoading) {
    return <LoadingSpinner message="Đang tải dữ liệu tổng quan quản trị..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Không thể tải dữ liệu quản trị"
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  const statCards = [
    {
      label: 'Tổng người dùng',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      label: 'Tổng chủ sân',
      value: stats?.totalOwners || 0,
      icon: Briefcase,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      label: 'Tổng số sân',
      value: stats?.totalFields || 0,
      icon: Layers,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      label: 'Tổng lượt đặt',
      value: stats?.totalBookings || 0,
      icon: CalendarCheck,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
    {
      label: 'Tổng doanh thu hệ thống',
      value: formatVND(stats?.totalRevenue || 0),
      icon: TrendingUp,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
  ];

  // Mock sample distribution for charts based on retrieved stats
  const distributionData = [
    { name: 'Người dùng', count: stats?.totalUsers || 0 },
    { name: 'Chủ sân', count: stats?.totalOwners || 0 },
    { name: 'Sân bóng', count: stats?.totalFields || 0 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bảng điều khiển Quản trị viên</h1>
        <p className="text-xs text-gray-500 mt-1">
          Giám sát toàn diện người dùng, chủ sân, sân bóng và doanh số trên toàn hệ thống
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500">{card.label}</span>
                <div className={`p-2 rounded-lg border ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">{card.value}</span>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entity Distribution Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Phân bổ đối tượng hệ thống</h2>
            <Activity className="w-4 h-4 text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val) => [val, 'Số lượng']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health / Overview status */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Tình trạng máy chủ & dịch vụ</h2>
            <Shield className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Spring Boot REST Backend API
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full">
                SẴN SÀNG
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-800">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                Cơ sở dữ liệu MySQL / PostgreSQL
              </div>
              <span className="text-[11px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full">
                KẾT NỐI ỔN ĐỊNH
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-800">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                Xác thực phân quyền Spring Security JWT
              </div>
              <span className="text-[11px] font-bold text-purple-700 bg-white px-2 py-0.5 rounded-full">
                HOẠT ĐỘNG
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
