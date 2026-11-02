import api from './api';

/**
 * Service xử lý Xác thực và Thông tin Người dùng
 * Giao tiếp với AuthController và UserController ở Backend Spring Boot
 */
export const authService = {
  /**
   * Đăng ký tài khoản người dùng mới (vai trò mặc định: USER)
   * Endpoint: POST /api/auth/register
   */
  register: async (data) => {
    try {
      return await api.post('/auth/register', data);
    } catch (error) {
      if (error.status === 0) {
        // Fallback demo khi server chưa bật
        console.warn('[authService] Backend offline, mô phỏng đăng ký thành công');
        return {
          status: 201,
          message: 'Đăng ký tài khoản thành công! (Chế độ xem trước)',
          data: { id: Date.now(), fullName: data.fullName, email: data.email, role: 'USER' },
        };
      }
      throw error;
    }
  },

  /**
   * Đăng nhập hệ thống lấy JWT Token
   * Endpoint: POST /api/auth/login
   */
  login: async (credentials) => {
    try {
      return await api.post('/auth/login', credentials);
    } catch (error) {
      // Nếu server chưa chạy (status = 0), hỗ trợ đăng nhập với các tài khoản demo chuẩn
      if (error.status === 0) {
        console.warn('[authService] Backend offline, kiểm tra tài khoản demo fallback');
        const email = credentials.email?.toLowerCase();
        const pwd = credentials.password;

        if (email === 'owner@footballbooking.com' && pwd === 'Owner@123') {
          return {
            status: 200,
            message: 'Đăng nhập thành công với vai trò Chủ sân (Chế độ xem trước)',
            data: {
              accessToken: 'mock-jwt-owner-token-for-demo',
              tokenType: 'Bearer',
              user: { id: 2, fullName: 'Chủ Sân Hoàng Gia', email: 'owner@footballbooking.com', role: 'OWNER' },
            },
          };
        }

        if (email === 'admin@footballbooking.com' && pwd === 'Admin@123') {
          return {
            status: 200,
            message: 'Đăng nhập thành công với vai trò Admin (Chế độ xem trước)',
            data: {
              accessToken: 'mock-jwt-admin-token-for-demo',
              tokenType: 'Bearer',
              user: { id: 1, fullName: 'Quản Trị Viên', email: 'admin@footballbooking.com', role: 'ADMIN' },
            },
          };
        }

        if (email === 'user@footballbooking.com' && pwd === 'User@123') {
          return {
            status: 200,
            message: 'Đăng nhập thành công với vai trò Khách hàng (Chế độ xem trước)',
            data: {
              accessToken: 'mock-jwt-user-token-for-demo',
              tokenType: 'Bearer',
              user: { id: 3, fullName: 'Nguyễn Văn Đạt', email: 'user@footballbooking.com', role: 'USER' },
            },
          };
        }
      }
      throw error;
    }
  },

  /**
   * Lấy thông tin tài khoản của chính mình từ Token
   * Endpoint: GET /api/users/me
   */
  getMe: async () => {
    try {
      return await api.get('/users/me');
    } catch (error) {
      console.warn('[authService] Dùng fallback getMe');
      const savedUser = localStorage.getItem('user');
      return {
        status: 200,
        data: savedUser ? JSON.parse(savedUser) : { fullName: 'Người dùng', role: 'USER' },
      };
    }
  },

  /**
   * Cập nhật thông tin cá nhân
   * Endpoint: PUT /api/users/me
   */
  updateProfile: async (data) => {
    return await api.put('/users/me', data);
  },
};

export default authService;
