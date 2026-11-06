import api from './api';
import { MOCK_FIELDS, MOCK_OWNER_BOOKINGS } from './mockData';

// State mock in-memory để test tương tác khi backend chưa chạy
let localOwnerFields = [...MOCK_FIELDS.filter((f) => f.owner?.id === 2 || f.id <= 3)];
let localOwnerBookings = [...MOCK_OWNER_BOOKINGS];

/**
 * Service xử lý các API dành riêng cho Chủ sân (OWNER)
 * Giao tiếp với OwnerFieldController & OwnerBookingController
 */
export const ownerService = {
  /**
   * Lấy danh sách sân của chủ sân đang đăng nhập
   * Endpoint: GET /api/owner/fields?page=0&size=10
   */
  getOwnerFields: async (page = 0, size = 10) => {
    try {
      const res = await api.get('/owner/fields', { params: { page, size } });
      return res;
    } catch (error) {
      console.warn('[ownerService] Dùng fallback mock data cho getOwnerFields:', error?.message);
      return {
        status: 200,
        message: 'Thành công (Fallback)',
        data: {
          content: localOwnerFields,
          page,
          size,
          totalElements: localOwnerFields.length,
          totalPages: Math.ceil(localOwnerFields.length / size) || 1,
        },
      };
    }
  },

  /**
   * Tạo mới sân bóng cho chủ sân
   * Endpoint: POST /api/owner/fields
   */
  createOwnerField: async (fieldData) => {
    try {
      return await api.post('/owner/fields', fieldData);
    } catch (error) {
      console.warn('[ownerService] Dùng fallback mock data cho createOwnerField:', error?.message);
      const newField = {
        id: Date.now(),
        name: fieldData.name,
        fieldType: { id: fieldData.fieldTypeId, name: fieldData.fieldTypeId === 1 ? 'Sân 5 người' : fieldData.fieldTypeId === 2 ? 'Sân 7 người' : 'Sân 11 người' },
        address: fieldData.address,
        description: fieldData.description || '',
        pricePerHour: Number(fieldData.pricePerHour),
        imageUrl: fieldData.imageUrl || 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1000&q=80',
        phone: fieldData.phone || '',
        mapLink: fieldData.mapLink || '',
        status: 'ACTIVE',
        averageRating: 5.0,
        reviewCount: 0,
      };
      localOwnerFields.unshift(newField);
      return { status: 201, message: 'Tạo sân thành công (Chế độ xem trước)', data: newField };
    }
  },

  /**
   * Cập nhật thông tin sân bóng của chủ sân
   * Endpoint: PUT /api/owner/fields/{id}
   */
  updateOwnerField: async (id, fieldData) => {
    try {
      return await api.put(`/owner/fields/${id}`, fieldData);
    } catch (error) {
      console.warn('[ownerService] Dùng fallback mock data cho updateOwnerField:', error?.message);
      const index = localOwnerFields.findIndex((f) => f.id === Number(id));
      if (index !== -1) {
        localOwnerFields[index] = {
          ...localOwnerFields[index],
          ...fieldData,
          pricePerHour: Number(fieldData.pricePerHour),
          fieldType: { id: fieldData.fieldTypeId, name: fieldData.fieldTypeId === 1 ? 'Sân 5 người' : fieldData.fieldTypeId === 2 ? 'Sân 7 người' : 'Sân 11 người' },
        };
        return { status: 200, message: 'Cập nhật sân thành công (Chế độ xem trước)', data: localOwnerFields[index] };
      }
      throw error;
    }
  },

  /**
   * Xóa hoặc chuyển trạng thái sân của chủ sân
   * Endpoint: DELETE /api/owner/fields/{id}
   */
  deleteOwnerField: async (id) => {
    try {
      return await api.delete(`/owner/fields/${id}`);
    } catch (error) {
      console.warn('[ownerService] Dùng fallback mock data cho deleteOwnerField:', error?.message);
      localOwnerFields = localOwnerFields.filter((f) => f.id !== Number(id));
      return { status: 200, message: 'Đã xóa sân (Chế độ xem trước)', data: null };
    }
  },

  /**
   * Lấy danh sách tất cả các lượt đặt sân trên sân của chủ sân này
   * Endpoint: GET /api/owner/bookings?page=0&size=10
   */
  getOwnerBookings: async (page = 0, size = 10, status = 'ALL') => {
    try {
      const res = await api.get('/owner/bookings', { params: { page, size } });
      return res;
    } catch (error) {
      console.warn('[ownerService] Dùng fallback mock data cho getOwnerBookings:', error?.message);
      let filtered = [...localOwnerBookings];
      if (status && status !== 'ALL') {
        filtered = filtered.filter((b) => b.status === status);
      }
      return {
        status: 200,
        message: 'Thành công (Fallback)',
        data: {
          content: filtered,
          page,
          size,
          totalElements: filtered.length,
          totalPages: Math.ceil(filtered.length / size) || 1,
        },
      };
    }
  },

  /**
   * Xác nhận lượt đặt sân (Chuyển sang CONFIRMED)
   * Endpoint: POST /api/owner/bookings/{id}/confirm
   */
  confirmBooking: async (id) => {
    try {
      return await api.post(`/owner/bookings/${id}/confirm`);
    } catch (error) {
      console.warn('[ownerService] Dùng fallback mock data cho confirmBooking:', error?.message);
      const index = localOwnerBookings.findIndex((b) => b.id === Number(id));
      if (index !== -1) {
        localOwnerBookings[index].status = 'CONFIRMED';
        localOwnerBookings[index].paymentStatus = 'PAID';
        return { status: 200, message: 'Đã xác nhận lượt đặt thành công', data: localOwnerBookings[index] };
      }
      throw error;
    }
  },

  /**
   * Từ chối lượt đặt sân (Chuyển sang REJECTED)
   * Endpoint: POST /api/owner/bookings/{id}/reject
   */
  rejectBooking: async (id) => {
    try {
      return await api.post(`/owner/bookings/${id}/reject`);
    } catch (error) {
      console.warn('[ownerService] Dùng fallback mock data cho rejectBooking:', error?.message);
      const index = localOwnerBookings.findIndex((b) => b.id === Number(id));
      if (index !== -1) {
        localOwnerBookings[index].status = 'REJECTED';
        return { status: 200, message: 'Đã từ chối lượt đặt', data: localOwnerBookings[index] };
      }
      throw error;
    }
  },
};

export default ownerService;

