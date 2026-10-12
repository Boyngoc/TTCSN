/**
 * Trích xuất thông điệp lỗi thân thiện bằng tiếng Việt từ response Backend hoặc Exception mạng.
 * @param {any} error
 * @param {string} defaultMessage
 * @returns {string}
 */
export function extractErrorMessage(error, defaultMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại.') {
  if (!error) return defaultMessage;

  // Lỗi mạng hoặc server không phản hồi
  if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
    return 'Không thể kết nối đến máy chủ backend (Cổng 8080). Vui lòng kiểm tra dịch vụ Backend đã chạy chưa.';
  }

  const responseData = error.response?.data;

  if (responseData) {
    // Nếu có danh sách lỗi validation theo trường
    if (responseData.errors && typeof responseData.errors === 'object') {
      const fieldErrors = Object.values(responseData.errors);
      if (fieldErrors.length > 0) {
        return fieldErrors.join(', ');
      }
    }

    // Nếu có message chung từ backend
    if (responseData.message && typeof responseData.message === 'string') {
      return responseData.message;
    }
  }

  // Mã HTTP đặc thù nếu không có message từ backend
  if (error.response?.status === 401) {
    return 'Phiên đăng nhập đã hết hạn hoặc thông tin đăng nhập không chính xác.';
  }
  if (error.response?.status === 403) {
    return 'Bạn không có quyền thực hiện thao tác này.';
  }
  if (error.response?.status === 404) {
    return 'Không tìm thấy dữ liệu yêu cầu.';
  }
  if (error.response?.status === 409) {
    return 'Xung đột dữ liệu hoặc khung giờ bạn chọn đã bị trùng lịch đặt sân.';
  }
  if (error.response?.status >= 500) {
    return 'Lỗi hệ thống máy chủ. Vui lòng thử lại sau.';
  }

  return error.message || defaultMessage;
}
