import api from './api';

/**
 * Service xử lý Xác thực và Thông tin Người dùng
 * Giao tiếp với AuthController và UserController ở Backend Spring Boot
 */
export const authService = {
  /**
   * Đăng ký tài khoản người dùng mới (vai trò mặc định: USER)
   * Endpoint: POST /api/auth/register
   * Request Body theo RegisterRequest:
   * {
   *   "fullName": "Nguyễn Văn A",
   *   "email": "nguyenvana@gmail.com",
   *   "password": "Password@123",
   *   "phone": "0912345678"
   * }
   * @param {Object} data
   * @returns {Promise<ApiResponse<UserSummary>>}
   */
  register: async (data) => {
    return await api.post('/auth/register', data);
  },

  /**
   * Đăng nhập hệ thống lấy JWT Token
   * Endpoint: POST /api/auth/login
   * Request Body theo LoginRequest:
   * {
   *   "email": "user@footballbooking.com",
   *   "password": "User@123"
   * }
   * Response data: { accessToken, tokenType: "Bearer", user: { id, fullName, role } }
   * @param {Object} credentials
   * @returns {Promise<ApiResponse<LoginResponse>>}
   */
  login: async (credentials) => {
    return await api.post('/auth/login', credentials);
  },

  /**
   * Lấy thông tin tài khoản của chính mình từ Token
   * Endpoint: GET /api/users/me
   * @returns {Promise<ApiResponse<UserProfile>>}
   */
  getMe: async () => {
    return await api.get('/users/me');
  },

  /**
   * Cập nhật thông tin cá nhân (họ tên, số điện thoại)
   * Endpoint: PUT /api/users/me
   * @param {Object} data - { fullName, phone }
   * @returns {Promise<ApiResponse<UserProfile>>}
   */
  updateProfile: async (data) => {
    return await api.put('/users/me', data);
  },
};

export default authService;
