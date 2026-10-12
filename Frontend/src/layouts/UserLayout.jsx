import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { User, Calendar, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UserLayout = () => {
  const { user } = useAuth();

  const tabs = [
    { name: 'Lịch Đặt Của Tôi', path: '/my-bookings', icon: Calendar },
    { name: 'Thông Tin Cá Nhân', path: '/profile', icon: User },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner / Heading */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-emerald-200">
            {user?.fullName?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user?.fullName}</h1>
            <p className="text-sm text-gray-500">{user?.email} • {user?.phone || 'Chưa cập nhật SĐT'}</p>
          </div>
        </div>
        <Link
          to="/fields"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Tiếp tục tìm sân
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-8 gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  isActive
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {tab.name}
            </NavLink>
          );
        })}
      </div>

      {/* Outlet */}
      <Outlet />
    </div>
  );
};
