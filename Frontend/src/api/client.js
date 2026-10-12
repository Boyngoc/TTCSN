import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const AUTH_EVENTS = {
  UNAUTHORIZED: 'auth:unauthorized',
};

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor: đính kèm Bearer JWT Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: unwrap response data và xử lý 401
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Nếu token hết hạn (401) và đang ở route cần quyền, xóa session
    if (error.response?.status === 401) {
      const isAuthEndpoint = error.config?.url?.includes('/auth/');
      if (!isAuthEndpoint) {
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event(AUTH_EVENTS.UNAUTHORIZED));
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
