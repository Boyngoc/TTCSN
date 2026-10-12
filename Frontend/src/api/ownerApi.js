import apiClient from './client';

export const ownerApi = {
  /**
   * Lấy danh sách sân của chủ sân hiện tại
   * @param {{ page?: number, size?: number }} params
   */
  getOwnerFields: (params = { page: 0, size: 10 }) =>
    apiClient.get('/owner/fields', { params }),

  /**
   * Tạo sân mới cho chủ sân
   * @param {{ fieldTypeId: number, name: string, address: string, description?: string, pricePerHour: number, imageUrl?: string, phone?: string, mapLink?: string }} data
   */
  createOwnerField: (data) => apiClient.post('/owner/fields', data),

  /**
   * Cập nhật sân của chủ sân
   * @param {number|string} id
   * @param {{ fieldTypeId: number, name: string, address: string, description?: string, pricePerHour: number, imageUrl?: string, status: string, phone?: string, mapLink?: string }} data
   */
  updateOwnerField: (id, data) => apiClient.put(`/owner/fields/${id}`, data),

  /**
   * Xóa sân của chủ sân
   * @param {number|string} id
   */
  deleteOwnerField: (id) => apiClient.delete(`/owner/fields/${id}`),

  /**
   * Lấy danh sách lượt đặt trên các sân của chủ sân
   * @param {{ page?: number, size?: number }} params
   */
  getOwnerBookings: (params = { page: 0, size: 10 }) =>
    apiClient.get('/owner/bookings', { params }),

  /**
   * Xác nhận lượt đặt
   * @param {number|string} id
   */
  confirmBooking: (id) => apiClient.post(`/owner/bookings/${id}/confirm`),

  /**
   * Từ chối lượt đặt
   * @param {number|string} id
   */
  rejectBooking: (id) => apiClient.post(`/owner/bookings/${id}/reject`),
};
