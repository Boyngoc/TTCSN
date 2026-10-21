import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  // Lắng nghe sự kiện 401 Unauthorized từ Axios Interceptor để tự động đăng xuất
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  /**
   * Đăng nhập: Gọi authService.login, lưu token & user vào localStorage và state
   */
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      // Spring Boot ApiResponse bọc dữ liệu trong field `data`
      const { accessToken, user: userData } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setToken(accessToken);
      setUser(userData);

      return { success: true, message: response.message || 'Đăng nhập thành công' };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Email hoặc mật khẩu không chính xác',
        errors: error.errors || null,
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Đăng ký tài khoản người dùng mới
   */
  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      return { success: true, message: response.message || 'Đăng ký tài khoản thành công! Hãy đăng nhập.' };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.',
        errors: error.errors || null,
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Đăng xuất: Xóa token và user khỏi state và localStorage
   */
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
};

export default AuthContext;
