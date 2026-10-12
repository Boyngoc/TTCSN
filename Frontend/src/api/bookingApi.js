import apiClient from './client';

export const bookingApi = {
  /**
   * Tạo lượt đặt sân mới. Backend tự tính tổng tiền và kiểm tra xung đột trùng lịch.
   * @param {{ fieldId: number, bookingDate: string, startTime: string, endTime: string }} data
   */
  createBooking: (data) => apiClient.post('/bookings', data),

  /**
   * Lấy danh sách lượt đặt của người dùng hiện tại
   * @param {{ page?: number, size?: number }} params
   */
  getMyBookings: (params = { page: 0, size: 10 }) =>
    apiClient.get('/bookings/my', { params }),

  /**
   * Xem chi tiết một lượt đặt sân
   * @param {number|string} id
   */
  getBookingById: (id) => apiClient.get(`/bookings/${id}`),

  /**
   * Hủy lượt đặt của người dùng hiện tại (khi trạng thái là PENDING hoặc CONFIRMED)
   * @param {number|string} id
   */
  cancelBooking: (id) => apiClient.post(`/bookings/${id}/cancel`),
};
