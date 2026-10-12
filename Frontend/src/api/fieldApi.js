import apiClient from './client';

export const fieldApi = {
  /**
   * Lấy danh sách các loại sân bóng (Sân 5, Sân 7, Sân 11...)
   */
  getFieldTypes: () => apiClient.get('/field-types'),

  /**
   * Tìm kiếm sân bóng có phân trang và bộ lọc
   * Lưu ý backend nhận tham số lọc loại sân là `fieldType` (Long)
   * @param {{ keyword?: string, address?: string, fieldType?: number|string, minPrice?: number|string, maxPrice?: number|string, page?: number, size?: number }} params
   */
  getFields: (params = {}) => {
    const cleanedParams = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        cleanedParams[key] = value;
      }
    });
    return apiClient.get('/fields', { params: cleanedParams });
  },

  /**
   * Lấy chi tiết sân bóng theo ID
   * @param {number|string} id
   */
  getFieldById: (id) => apiClient.get(`/fields/${id}`),

  /**
   * Lấy danh sách đánh giá của sân bóng có phân trang
   * @param {number|string} id
   * @param {{ page?: number, size?: number }} params
   */
  getFieldReviews: (id, params = { page: 0, size: 10 }) =>
    apiClient.get(`/fields/${id}/reviews`, { params }),
};
