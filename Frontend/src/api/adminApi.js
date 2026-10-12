import apiClient from './client';

export const adminApi = {
  /**
   * Lấy số liệu thống kê tổng quan hệ thống
   */
  getStatistics: () => apiClient.get('/admin/statistics'),

  /**
   * Lấy danh sách người dùng (USER) có phân trang
   * @param {{ page?: number, size?: number }} params
   */
  getUsers: (params = { page: 0, size: 10 }) =>
    apiClient.get('/admin/users', { params }),

  /**
   * Lấy danh sách chủ sân (OWNER) có phân trang
   * @param {{ page?: number, size?: number }} params
   */
  getOwners: (params = { page: 0, size: 10 }) =>
    apiClient.get('/admin/owners', { params }),

  /**
   * Lấy danh sách tất cả các sân bóng
   * @param {{ page?: number, size?: number }} params
   */
  getFields: (params = { page: 0, size: 10 }) =>
    apiClient.get('/admin/fields', { params }),

  /**
   * Lấy danh sách tất cả các lượt đặt sân
   * @param {{ page?: number, size?: number }} params
   */
  getBookings: (params = { page: 0, size: 10 }) =>
    apiClient.get('/admin/bookings', { params }),

  /**
   * Cập nhật trạng thái người dùng (ACTIVE, INACTIVE, BLOCKED)
   * @param {number|string} id
   * @param {'ACTIVE'|'INACTIVE'|'BLOCKED'} status
   */
  updateUserStatus: (id, status) =>
    apiClient.put(`/admin/users/${id}/status`, { status }),

  /**
   * Cập nhật trạng thái sân (ACTIVE, INACTIVE)
   * @param {number|string} id
   * @param {'ACTIVE'|'INACTIVE'} status
   */
  updateFieldStatus: (id, status) =>
    apiClient.put(`/admin/fields/${id}/status`, { status }),
};
