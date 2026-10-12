import apiClient from './client';

export const reviewApi = {
  /**
   * Tạo đánh giá cho lượt đặt sân (booking đã CONFIRMED hoặc COMPLETED)
   * @param {{ bookingId: number, rating: number, comment?: string }} data
   */
  createReview: (data) => apiClient.post('/reviews', data),
};
