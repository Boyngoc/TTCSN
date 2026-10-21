import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Component bảo vệ các tuyến đường yêu cầu đăng nhập
 * Nếu chưa đăng nhập, tự động chuyển hướng đến /login và ghi nhớ trang đang truy cập
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu route yêu cầu vai trò đặc biệt (ví dụ ADMIN, OWNER)
  if (allowedRoles.length > 0 && (!user || !allowedRoles.includes(user.role))) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Truy cập bị từ chối (403 Forbidden)</h2>
        <p className="text-slate-600 max-w-md">
          Tài khoản của bạn ({user?.role}) không có quyền truy cập vào chức năng này.
        </p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
