export type Role = "USER" | "OWNER" | "ADMIN";
export type ActiveStatus = "ACTIVE" | "INACTIVE";
export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "REJECTED" | "COMPLETED";

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  role: Role;
  status: UserStatus;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  user: Pick<User, "id" | "fullName" | "role">;
}

export interface FieldType {
  id: number;
  name: string;
  description: string | null;
  status: ActiveStatus;
}

export interface Field {
  id: number;
  name: string;
  address: string;
  description: string | null;
  pricePerHour: number;
  imageUrl: string | null;
  status: ActiveStatus;
  fieldType: FieldType;
  owner: { id: number; fullName: string };
  averageRating: number | null;
  reviewCount: number | null;
}

export interface Booking {
  id: number;
  fieldId: number;
  fieldName: string;
  userId: number;
  userFullName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export interface Review {
  id: number;
  fieldId: number;
  userId: number;
  userFullName: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface Statistics {
  totalUsers: number;
  totalOwners: number;
  totalFields: number;
  totalBookings: number;
  bookingsByStatus: Partial<Record<BookingStatus, number>>;
  totalRevenue: number;
}