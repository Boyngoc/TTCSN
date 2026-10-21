import axios from 'axios';

/**
 * Cấu hình Axios instance giao tiếp với Spring Boot Backend
 * - Base URL: ưu tiên biến môi trường VITE_API_BASE_URL hoặc mặc định proxy '/api'
 * - Timeout: 10 giây
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor: Tự động đính kèm JWT Bearer Token vào Header
 * nếu người dùng đã đăng nhập và lưu token trong localStorage
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor: Chuẩn hóa dữ liệu trả về từ ApiResponse<T> của Spring Boot
 * Cấu trúc Spring Boot trả về:
 * - Thành công: { status: 200/201, message: "...", data: {...} }
 * - Thất bại: { status: 400/401/404/409, message: "...", timestamp: "...", errors: {...} }
 */
api.interceptors.response.use(
  (response) => {
    // Trả về thẳng object ApiResponse { status, message, data }
    return response.data;
  },
  (error) => {
    const { response } = error;

    if (response) {
      // Backend trả về response có format ApiResponse lỗi
      const { status, data } = response;

      // Xử lý khi Token hết hạn hoặc không có quyền (401 Unauthorized)
      if (status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        // Không redirect tự động nếu đang ở trang login để tránh reload vòng lặp
        if (!window.location.pathname.includes('/login')) {
          window.dispatchEvent(new Event('auth:unauthorized'));
        }
      }

      // Ném lỗi đã được chuẩn hóa để UI hiển thị thông điệp tiếng Việt thân thiện
      const errorPayload = {
        status: status,
        message: data?.message || 'Có lỗi xảy ra từ máy chủ backend.',
        errors: data?.errors || null, // Map lỗi validation theo từng trường
      };
      return Promise.reject(errorPayload);
    }

    // Trường hợp mất kết nối mạng hoặc server không phản hồi
    return Promise.reject({
      status: 0,
      message: 'Không thể kết nối đến máy chủ Backend (Network Error). Vui lòng kiểm tra lại Spring Boot server!',
      errors: null,
    });
  }
);

export default api;
