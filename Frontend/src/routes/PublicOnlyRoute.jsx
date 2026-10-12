import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../utils/status';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const PublicOnlyRoute = () => {
  const { isAuthenticated, isLoading, role } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Đang tải..." />;
  }

  if (isAuthenticated) {
    if (role === Role.ADMIN) return <Navigate to="/admin" replace />;
    if (role === Role.OWNER) return <Navigate to="/owner" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
