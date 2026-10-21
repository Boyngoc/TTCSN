import api from './api';

/**
 * Service xử lý các API liên quan đến Sân bóng và Loại sân
 * Giao tiếp với FieldController và FieldTypeController ở Backend Spring Boot
 */
export const fieldService = {
  /**
   * Lấy danh sách sân bóng kèm bộ lọc tìm kiếm và phân trang
   * Endpoint: GET /api/fields
   * @param {Object} params - { keyword, address, fieldTypeId, minPrice, maxPrice, page, size }
   * @returns {Promise<ApiResponse<PageResponse<FieldResponse>>>}
   */
  getFields: async (params = {}) => {
    // Lọc bỏ các tham số rỗng/undefined trước khi gửi query
    const cleanParams = {};
    Object.keys(params).forEach((key) => {
      if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
        cleanParams[key] = params[key];
      }
    });

    return await api.get('/fields', { params: cleanParams });
  },

  /**
   * Lấy thông tin chi tiết một sân bóng theo ID (kèm đánh giá trung bình & lượt review)
   * Endpoint: GET /api/fields/{id}
   * @param {number|string} id
   * @returns {Promise<ApiResponse<FieldResponse>>}
   */
  getFieldById: async (id) => {
    return await api.get(`/fields/${id}`);
  },

  /**
   * Lấy danh sách các loại sân (Sân 5, Sân 7, Sân 11)
   * Endpoint: GET /api/field-types
   * @returns {Promise<ApiResponse<FieldTypeResponse[]>>}
   */
  getFieldTypes: async () => {
    return await api.get('/field-types');
  },

  /**
   * Lấy các khung giờ đã được đặt của sân (công khai) để tránh đặt trùng lịch
   * Endpoint: GET /api/fields/{id}/booked-slots
   * @param {number|string} fieldId
   * @param {Object} params - { date, fromDate, toDate } (định dạng YYYY-MM-DD)
   * @returns {Promise<ApiResponse<BookedSlotResponse[]>>}
   */
  getBookedSlots: async (fieldId, params = {}) => {
    return await api.get(`/fields/${fieldId}/booked-slots`, { params });
  },

  /**
   * Lấy danh sách đánh giá của sân
   * Endpoint: GET /api/fields/{id}/reviews
   * @param {number|string} fieldId
   * @returns {Promise<ApiResponse<ReviewResponse[]>>}
   */
  getFieldReviews: async (fieldId) => {
    return await api.get(`/fields/${fieldId}/reviews`);
  },
};

export default fieldService;
