import apiClient from './client';

export const healthApi = {
  /**
   * Kiểm tra tình trạng backend (trả về { status: "UP", service: "..." })
   */
  getHealth: () => apiClient.get('/health'),
};
