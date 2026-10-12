export const Role = {
  USER: 'USER',
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
};

export const BookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REJECTED: 'REJECTED',
};

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED',
};

export const ActiveStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const BookingStatusBadge = {
  PENDING: { label: 'Chờ duyệt', variant: 'yellow' },
  CONFIRMED: { label: 'Đã duyệt', variant: 'green' },
  COMPLETED: { label: 'Hoàn thành', variant: 'blue' },
  CANCELLED: { label: 'Đã hủy', variant: 'gray' },
  REJECTED: { label: 'Từ chối', variant: 'red' },
};

export const UserStatusBadge = {
  ACTIVE: { label: 'Hoạt động', variant: 'green' },
  INACTIVE: { label: 'Chưa kích hoạt', variant: 'gray' },
  BLOCKED: { label: 'Bị khóa', variant: 'red' },
};

export const ActiveStatusBadge = {
  ACTIVE: { label: 'Đang hoạt động', variant: 'green' },
  INACTIVE: { label: 'Tạm ngừng', variant: 'gray' },
};

/**
 * Cấu hình hiển thị trạng thái lượt đặt sân (BookingStatus)
 */
export const BOOKING_STATUS_CONFIG = {
  PENDING: {
    label: 'Chờ xác nhận',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    dotColor: 'bg-amber-500',
    description: 'Chờ chủ sân duyệt đơn',
  },
  CONFIRMED: {
    label: 'Đã xác nhận',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    dotColor: 'bg-emerald-500',
    description: 'Chủ sân đã chấp nhận lịch đặt',
  },
  COMPLETED: {
    label: 'Đã hoàn thành',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    dotColor: 'bg-blue-500',
    description: 'Lượt đá bóng đã diễn ra',
  },
  CANCELLED: {
    label: 'Đã hủy',
    color: 'bg-slate-100 text-slate-700 border-slate-300',
    dotColor: 'bg-slate-500',
    description: 'Khách đã chủ động hủy đơn',
  },
  REJECTED: {
    label: 'Đã từ chối',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    dotColor: 'bg-rose-500',
    description: 'Chủ sân đã từ chối lượt đặt',
  },
};

/**
 * Cấu hình trạng thái tài khoản (UserStatus)
 */
export const USER_STATUS_CONFIG = {
  ACTIVE: {
    label: 'Hoạt động',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    dotColor: 'bg-emerald-500',
  },
  INACTIVE: {
    label: 'Chưa kích hoạt',
    color: 'bg-slate-100 text-slate-700 border-slate-300',
    dotColor: 'bg-slate-500',
  },
  BLOCKED: {
    label: 'Bị khóa',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    dotColor: 'bg-rose-500',
  },
};

/**
 * Cấu hình trạng thái sân (ActiveStatus)
 */
export const ACTIVE_STATUS_CONFIG = {
  ACTIVE: {
    label: 'Đang hoạt động',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    dotColor: 'bg-emerald-500',
  },
  INACTIVE: {
    label: 'Tạm dừng hoạt động',
    color: 'bg-slate-100 text-slate-700 border-slate-300',
    dotColor: 'bg-slate-500',
  },
};

/**
 * Cấu hình vai trò người dùng (Role)
 */
export const ROLE_CONFIG = {
  USER: {
    label: 'Người dùng',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  OWNER: {
    label: 'Chủ sân',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  ADMIN: {
    label: 'Quản trị viên',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
  },
};

export const DEFAULT_FIELD_IMAGE =
  'https://images.unsplash.com/photo-1529900248061-5652ab58872f?auto=format&fit=crop&w=800&q=80';
