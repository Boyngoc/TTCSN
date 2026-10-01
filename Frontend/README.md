# Frontend — Hệ thống đặt sân bóng

> **Trạng thái: chưa triển khai.** Thư mục này hiện chưa có code, chỉ là chỗ đặt Frontend.
> Backend đã hoàn thiện và sẵn sàng phục vụ — xem [../Backend/README.md](../Backend/README.md).

## Stack đã chốt

| Hạng mục | Lựa chọn |
|---|---|
| Framework | React 18 + Vite 5 |
| Routing | React Router 6 |
| Gọi API / cache | TanStack Query 5 + Axios |
| Form & validate | React Hook Form + Zod |
| Giao diện | Tailwind CSS 3 |

## Kết nối Backend

- Base URL: `http://localhost:8080/api`
- Xác thực: đăng nhập qua `POST /api/auth/login`, lưu `accessToken` rồi gửi kèm header
  `Authorization: Bearer <accessToken>` cho mọi request cần đăng nhập.
- Mọi phản hồi bọc trong `{ status, message, data }`; lỗi trả `{ status, message, timestamp }`
  kèm `errors` theo từng trường khi lỗi validation.

**Quan trọng:** backend mặc định chỉ cho phép CORS từ `http://localhost:3000`. Vite chạy cổng
`5173`, nên phải đặt biến sau trong `Backend/.env` trước khi phát triển:

```bash
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

## Tài khoản demo (profile `dev`)

| Vai trò | Email | Mật khẩu |
|---|---|---|
| ADMIN | `admin@footballbooking.com` | `Admin@123` |
| OWNER | `owner@footballbooking.com` | `Owner@123` |
| USER | `user@footballbooking.com` | `User@123` |

## Màn hình cần làm

**Người dùng (`USER`)** — đăng ký / đăng nhập · danh sách sân kèm bộ lọc (từ khóa, địa chỉ,
loại sân, khoảng giá) · chi tiết sân + đánh giá · đặt sân (chọn ngày, giờ bắt đầu – kết thúc) ·
lịch sử đơn của mình + hủy đơn · viết đánh giá · hồ sơ cá nhân.

**Chủ sân (`OWNER`)** — quản lý sân của mình (thêm / sửa / xóa) · danh sách đơn đặt vào sân của
mình + xác nhận / từ chối.

**Quản trị (`ADMIN`)** — danh sách user / chủ sân / sân / đơn đặt · khóa-mở tài khoản ·
bật-tắt sân · trang thống kê.

Danh sách endpoint và quyền tương ứng: [../Backend/docs/api.md](../Backend/docs/api.md).
Hướng dẫn gọi thử từng endpoint: [../Backend/readapi.md](../Backend/readapi.md).

## Lưu ý khi làm giao diện đặt sân

Backend **chưa có** endpoint trả lưới giờ trống (availability) và **không có** bảng khung giờ cố
định — client tự gửi `startTime`/`endTime` tự do, backend chỉ trả `409` khi trùng lịch. Nếu muốn
dựng lưới khung giờ như thiết kế ban đầu thì cần bổ sung API ở backend trước
(xem mục 12 "Việc còn lại" trong [../README.md](../README.md)).
