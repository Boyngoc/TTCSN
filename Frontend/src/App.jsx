import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import FieldListPage from './pages/FieldListPage';
import FieldDetailPage from './pages/FieldDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyBookingsPage from './pages/MyBookingsPage';

const NotFoundPage = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
    <h1 className="text-6xl font-black text-slate-300">404</h1>
    <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy trang yêu cầu</h2>
    <p className="text-slate-500 text-sm max-w-sm">
      Đường dẫn bạn truy cập có thể đã bị xóa hoặc không tồn tại trong hệ thống.
    </p>
    <Link
      to="/"
      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
    >
      Về Trang Chủ
    </Link>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* TUẦN 2 & 3: Trang chủ & Danh sách sân */}
              <Route path="/" element={<HomePage />} />
              <Route path="/fields" element={<FieldListPage />} />

              {/* TUẦN 4: Chi tiết sân & luồng Đặt sân */}
              <Route path="/fields/:id" element={<FieldDetailPage />} />

              {/* TUẦN 5: Xác thực Auth & Protected routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute>
                    <MyBookingsPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
