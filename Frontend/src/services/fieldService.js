import api from './api';
import { MOCK_FIELDS, MOCK_FIELD_TYPES, MOCK_REVIEWS, MOCK_BOOKED_SLOTS } from './mockData';

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
    const cleanParams = {};
    Object.keys(params).forEach((key) => {
      if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
        cleanParams[key] = params[key];
      }
    });

    try {
      return await api.get('/fields', { params: cleanParams });
    } catch (error) {
      console.warn('[fieldService] Dùng fallback mock data cho getFields:', error?.message);
      let list = [...MOCK_FIELDS];

      if (cleanParams.keyword) {
        const kw = cleanParams.keyword.toLowerCase();
        list = list.filter((f) => f.name.toLowerCase().includes(kw) || f.address.toLowerCase().includes(kw));
      }
      if (cleanParams.address) {
        const addr = cleanParams.address.toLowerCase();
        list = list.filter((f) => f.address.toLowerCase().includes(addr));
      }
      if (cleanParams.fieldTypeId) {
        list = list.filter((f) => f.fieldType?.id === Number(cleanParams.fieldTypeId));
      }
      if (cleanParams.minPrice) {
        list = list.filter((f) => f.pricePerHour >= Number(cleanParams.minPrice));
      }
      if (cleanParams.maxPrice) {
        list = list.filter((f) => f.pricePerHour <= Number(cleanParams.maxPrice));
      }

      const page = cleanParams.page ? Number(cleanParams.page) : 0;
      const size = cleanParams.size ? Number(cleanParams.size) : 9;
      const start = page * size;
      const paged = list.slice(start, start + size);

      return {
        status: 200,
        message: 'Thành công (Fallback)',
        data: {
          content: paged,
          page,
          size,
          totalElements: list.length,
          totalPages: Math.ceil(list.length / size) || 1,
        },
      };
    }
  },

  /**
   * Lấy thông tin chi tiết một sân bóng theo ID
   * Endpoint: GET /api/fields/{id}
   */
  getFieldById: async (id) => {
    try {
      return await api.get(`/fields/${id}`);
    } catch (error) {
      console.warn('[fieldService] Dùng fallback mock data cho getFieldById:', error?.message);
      const found = MOCK_FIELDS.find((f) => f.id === Number(id)) || MOCK_FIELDS[0];
      return {
        status: 200,
        message: 'Thành công (Fallback)',
        data: found,
      };
    }
  },

  /**
   * Lấy danh sách các loại sân (Sân 5, Sân 7, Sân 11)
   * Endpoint: GET /api/field-types
   */
  getFieldTypes: async () => {
    try {
      return await api.get('/field-types');
    } catch (error) {
      console.warn('[fieldService] Dùng fallback mock data cho getFieldTypes:', error?.message);
      return {
        status: 200,
        message: 'Thành công (Fallback)',
        data: MOCK_FIELD_TYPES,
      };
    }
  },

  /**
   * Lấy các khung giờ đã được đặt của sân (công khai) để tránh đặt trùng lịch
   * Endpoint: GET /api/fields/{id}/booked-slots
   */
  getBookedSlots: async (fieldId, params = {}) => {
    try {
      return await api.get(`/fields/${fieldId}/booked-slots`, { params });
    } catch (error) {
      console.warn('[fieldService] Dùng fallback mock data cho getBookedSlots:', error?.message);
      return {
        status: 200,
        message: 'Thành công (Fallback)',
        data: MOCK_BOOKED_SLOTS,
      };
    }
  },

  /**
   * Lấy danh sách đánh giá của sân
   * Endpoint: GET /api/fields/{id}/reviews
   */
  getFieldReviews: async (fieldId) => {
    try {
      return await api.get(`/fields/${fieldId}/reviews`);
    } catch (error) {
      console.warn('[fieldService] Dùng fallback mock data cho getFieldReviews:', error?.message);
      return {
        status: 200,
        message: 'Thành công (Fallback)',
        data: MOCK_REVIEWS,
      };
    }
  },
};

export default fieldService;
