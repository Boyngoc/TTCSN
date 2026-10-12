import apiClient from './client';

export const userApi = {
  /**
   * Lấy hồ sơ người dùng hiện tại
   */
  getMe: () => apiClient.get('/users/me'),

  /**
   * Cập nhật thông tin cá nhân (họ tên, số điện thoại)
   * @param {{ fullName: string, phone: string }} data
   */
  updateMe: (data) => apiClient.put('/users/me', data),
};
