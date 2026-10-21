import api from './api';

/**
 * Service xử lý các API Đặt sân (Booking)
 * Giao tiếp với BookingController ở Backend Spring Boot
 */
export const bookingService = {
  /**
   * Tạo lượt đặt sân mới
   * Endpoint: POST /api/bookings
   * Request Body theo CreateBookingRequest:
   * {
   *   "fieldId": 1,
   *   "bookingDate": "2026-10-25",
   *   "startTime": "18:00",
   *   "endTime": "20:00"
   * }
   * Lưu ý: Không gửi totalPrice, Backend tự tính dựa trên pricePerHour * duration
   * @param {Object} bookingData
   * @returns {Promise<ApiResponse<BookingResponse>>}
   */
  createBooking: async (bookingData) => {
    return await api.post('/bookings', bookingData);
  },

  /**
   * Lấy danh sách lượt đặt sân của tài khoản người dùng hiện tại
   * Endpoint: GET /api/bookings/my?page=0&size=10
   * @param {number} page
   * @param {number} size
   * @returns {Promise<ApiResponse<PageResponse<BookingResponse>>>}
   */
  getMyBookings: async (page = 0, size = 10) => {
    return await api.get('/bookings/my', {
      params: { page, size },
    });
  },

  /**
   * Xem chi tiết một lượt đặt sân cụ thể
   * Endpoint: GET /api/bookings/{id}
   * @param {number|string} id
   * @returns {Promise<ApiResponse<BookingResponse>>}
   */
  getBookingById: async (id) => {
    return await api.get(`/bookings/${id}`);
  },

  /**
   * Hủy lượt đặt sân của mình (chỉ hủy được khi trạng thái PENDING hoặc CONFIRMED)
   * Endpoint: POST /api/bookings/{id}/cancel
   * @param {number|string} id
   * @returns {Promise<ApiResponse<BookingResponse>>}
   */
  cancelBooking: async (id) => {
    return await api.post(`/bookings/${id}/cancel`);
  },
};

export default bookingService;
