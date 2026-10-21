<<<<<<< Updated upstream
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';
import { AUTH_EVENTS } from '../api/client';
=======
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
>>>>>>> Stashed changes

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
<<<<<<< Updated upstream
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  // Listen to 401 unauthorized events emitted from Axios interceptor
=======
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  // Lắng nghe sự kiện 401 Unauthorized từ Axios Interceptor để tự động đăng xuất
>>>>>>> Stashed changes
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };
<<<<<<< Updated upstream
    window.addEventListener(AUTH_EVENTS.UNAUTHORIZED, handleUnauthorized);
    return () => {
      window.removeEventListener(AUTH_EVENTS.UNAUTHORIZED, handleUnauthorized);
    };
  }, [logout]);

  // Initial fetch of profile if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const profile = await userApi.getProfile();
        setUser(profile);
        localStorage.setItem('user', JSON.stringify(profile));
      } catch (err) {
        console.error('Failed to load user profile on startup:', err);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [token, logout]);

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    // backend returns AuthResponse: { token, type, id, email, fullName, role, ... }
    const accessToken = data.token;
    localStorage.setItem('token', accessToken);
    setToken(accessToken);

    const userInfo = {
      id: data.id,
      email: data.email,
      fullName: data.fullName,
      phone: data.phone,
      role: data.role,
    };
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
    return userInfo;
  };

  const register = async (userData) => {
    return await authApi.register(userData);
  };

  const updateCurrentUser = (partialUser) => {
    setUser((prev) => {
      const updated = { ...prev, ...partialUser };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
=======

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
>>>>>>> Stashed changes
  };

  const value = {
    user,
    token,
<<<<<<< Updated upstream
    isAuthenticated: !!token && !!user,
    role: user?.role || null,
    isLoading,
    login,
    register,
    logout,
    updateCurrentUser,
=======
    isAuthenticated: !!token,
    login,
    register,
    logout,
    loading,
>>>>>>> Stashed changes
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
<<<<<<< Updated upstream
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
=======
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
};

export default AuthContext;
>>>>>>> Stashed changes
