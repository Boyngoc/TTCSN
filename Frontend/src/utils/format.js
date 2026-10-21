/**
 * Định dạng tiền tệ theo chuẩn Việt Nam (VND).
 * @param {number|string} amount
 * @returns {string}
 */
export function formatVND(amount) {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return '0 ₫';
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

/**
 * Bí danh của formatVND, dùng trong các component hiển thị giá sân.
 * @param {number|string} amount
 * @returns {string}
 */
export const formatPrice = formatVND;

/**
 * Định dạng ngày (YYYY-MM-DD hoặc ISO string) sang dd/MM/yyyy.
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('T')[0].split('-');
    if (year && month && day) {
      return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    }
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN');
  } catch {
    return dateStr;
  }
}

/**
 * Định dạng giờ (HH:mm:ss hoặc HH:mm) sang HH:mm.
 * @param {string} timeStr
 * @returns {string}
 */
export function formatTime(timeStr) {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length >= 2) {
    return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
  }
  return timeStr;
}

/**
 * Định dạng ngày giờ đầy đủ (HH:mm - dd/MM/yyyy).
 * @param {string} dateTimeStr
 * @returns {string}
 */
export function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return '';
  try {
    const d = new Date(dateTimeStr);
    if (isNaN(d.getTime())) return dateTimeStr;
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  } catch {
    return dateTimeStr;
  }
}

/**
 * Tính số giờ giữa startTime và endTime (định dạng HH:mm).
 * @param {string} startTime
 * @param {string} endTime
 * @returns {number} Số giờ (ví dụ: 1.5, 2) hoặc 0 nếu không hợp lệ
 */
export function calculateDurationHours(startTime, endTime) {
  if (!startTime || !endTime) return 0;
  try {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const startTotalMin = startH * 60 + startM;
    const endTotalMin = endH * 60 + endM;
    if (endTotalMin <= startTotalMin) return 0;
    return (endTotalMin - startTotalMin) / 60;
  } catch {
    return 0;
  }
}

/**
 * Ước tính tổng tiền dựa vào giá mỗi giờ và thời gian đặt.
 * @param {number|string} pricePerHour
 * @param {string} startTime
 * @param {string} endTime
 * @returns {number}
 */
export function estimateTotalPrice(pricePerHour, startTime, endTime) {
  const hours = calculateDurationHours(startTime, endTime);
  if (hours <= 0 || !pricePerHour) return 0;
  return Math.round(Number(pricePerHour) * hours);
}
