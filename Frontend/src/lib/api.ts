import type { ApiResponse } from "@/lib/types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api").replace(/\/$/, "");
const TOKEN_KEY = "football-booking-token";

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string>;

  constructor(message: string, status: number, errors?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string | null;
};

export async function api<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body !== undefined) headers.set("Content-Type", "application/json");

  const token = options.token ?? (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Không thể kết nối máy chủ. Hãy kiểm tra Backend đang chạy.", 0);
  }

  if (response.status === 204) return undefined as T;
  const payload = await response.json().catch(() => null) as (ApiResponse<T> & {
    errors?: Record<string, string>;
    timestamp?: string;
  }) | null;

  if (!response.ok) {
    const validation = payload?.errors ? Object.values(payload.errors).join(" · ") : undefined;
    throw new ApiError(validation || payload?.message || "Đã xảy ra lỗi. Vui lòng thử lại.", response.status, payload?.errors);
  }

  if (payload && typeof payload === "object" && "data" in payload) return payload.data;
  return payload as T;
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function queryString(values: Record<string, string | number | undefined | null>) {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") params.set(key, String(value));
  });
  return params.toString();
}

export const formatPrice = (amount: number) => new Intl.NumberFormat("vi-VN").format(amount) + " đ";
export const formatDate = (date: string) => new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(`${date}T00:00:00`));

export function statusLabel(status: string) {
  const labels: Record<string, string> = {
    ACTIVE: "Đang hoạt động", INACTIVE: "Tạm ngưng", BLOCKED: "Đã khóa",
    PENDING: "Chờ xác nhận", CONFIRMED: "Đã xác nhận", CANCELLED: "Đã hủy",
    REJECTED: "Bị từ chối", COMPLETED: "Hoàn thành",
  };
  return labels[status] || status;
}