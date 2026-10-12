import apiClient from './client';

export const authApi = {
  /**
   * Đăng nhập hệ thống
   * @param {{ email: string, password: string }} data
   * @returns {Promise<{ status: number, message: string, data: { accessToken: string, tokenType: string, user: { id: number, fullName: string, role: string } } }>}
   */
  login: (data) => apiClient.post('/auth/login', data),

  /**
   * Đăng ký tài khoản mới (vai trò USER)
   * @param {{ fullName: string, email: string, password: string, phone: string }} data
   * @returns {Promise<{ status: number, message: string, data: any }>}
   */
  register: (data) => apiClient.post('/auth/register', data),
};
