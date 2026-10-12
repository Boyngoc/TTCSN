import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';
import { AUTH_EVENTS } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
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
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };
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
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    role: user?.role || null,
    isLoading,
    login,
    register,
    logout,
    updateCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
