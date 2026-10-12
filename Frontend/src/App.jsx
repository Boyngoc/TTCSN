import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Role } from './utils/status';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { UserLayout } from './layouts/UserLayout';
import { OwnerLayout } from './layouts/OwnerLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Route Guards
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicOnlyRoute } from './routes/PublicOnlyRoute';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { FieldsPage } from './pages/public/FieldsPage';
import { FieldDetailPage } from './pages/public/FieldDetailPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// User Pages
import { ProfilePage } from './pages/user/ProfilePage';
import { MyBookingsPage } from './pages/user/MyBookingsPage';

// Owner Pages
import { OwnerDashboardPage } from './pages/owner/OwnerDashboardPage';
import { OwnerFieldsPage } from './pages/owner/OwnerFieldsPage';
import { OwnerFieldFormPage } from './pages/owner/OwnerFieldFormPage';
import { OwnerBookingsPage } from './pages/owner/OwnerBookingsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminOwnersPage } from './pages/admin/AdminOwnersPage';
import { AdminFieldsPage } from './pages/admin/AdminFieldsPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';

// Error Pages
import { NotFoundPage } from './pages/errors/NotFoundPage';
import { ForbiddenPage } from './pages/errors/ForbiddenPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60 * 1000,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public & Guest Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/fields" element={<FieldsPage />} />
                <Route path="/fields/:id" element={<FieldDetailPage />} />

                {/* User Authenticated Profile & Bookings */}
                <Route element={<ProtectedRoute allowedRoles={[Role.USER, Role.OWNER, Role.ADMIN]} />}>
                  <Route element={<UserLayout />}>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/my-bookings" element={<MyBookingsPage />} />
                  </Route>
                </Route>
              </Route>

              {/* Guest Only Routes (Login, Register) */}
              <Route element={<PublicOnlyRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              {/* Owner Routes */}
              <Route element={<ProtectedRoute allowedRoles={[Role.OWNER]} />}>
                <Route path="/owner" element={<OwnerLayout />}>
                  <Route index element={<OwnerDashboardPage />} />
                  <Route path="fields" element={<OwnerFieldsPage />} />
                  <Route path="fields/new" element={<OwnerFieldFormPage />} />
                  <Route path="fields/:id/edit" element={<OwnerFieldFormPage />} />
                  <Route path="bookings" element={<OwnerBookingsPage />} />
                </Route>
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={[Role.ADMIN]} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="users" element={<AdminUsersPage />} />
                  <Route path="owners" element={<AdminOwnersPage />} />
                  <Route path="fields" element={<AdminFieldsPage />} />
                  <Route path="bookings" element={<AdminBookingsPage />} />
                </Route>
              </Route>

              {/* Error Routes */}
              <Route path="/forbidden" element={<ForbiddenPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
