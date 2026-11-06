export function formatPrice(value) {
  if (value == null || value === '') return '—'
  return `${new Intl.NumberFormat('vi-VN').format(Number(value))} ₫`
}

export function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(new Date(`${value}T00:00:00`))
}

export function statusLabel(status) {
  const labels = {
    ACTIVE: 'Đang hoạt động',
    INACTIVE: 'Tạm ngưng',
    PENDING: 'Chờ xác nhận',
    CONFIRMED: 'Đã xác nhận',
    CANCELLED: 'Đã hủy',
    REJECTED: 'Đã từ chối',
    COMPLETED: 'Đã hoàn thành',
    BLOCKED: 'Đã khóa',
    USER: 'Người chơi',
    OWNER: 'Chủ sân',
    ADMIN: 'Quản trị viên',
  }
  return labels[status] || status || 'Không rõ'
}

export function localToday() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}
