# Tích hợp API Frontend

Frontend gọi các REST API được triển khai trong Spring Boot tại `/api`. Cấu hình Axios dùng `VITE_API_BASE_URL`; mặc định development là `/api`, được Vite proxy tới backend. Response nghiệp vụ backend bọc trong `ApiResponse<T>` với payload tại `data`; service trong `src/services/api/resources.js` trả `response.data.data` cho hook và giao diện. `/api/health` là ngoại lệ không bọc `ApiResponse`.

Các response phân trang có dạng:

```json
{
  "content": [],
  "page": 0,
  "size": 10,
  "totalElements": 0,
  "totalPages": 0
}
```

## Endpoint đã xác minh và được gọi

| HTTP | Endpoint | Dữ liệu gửi / query | Mục đích, quyền |
|---|---|---|---|
| `POST` | `/api/auth/login` | `{ "email": "...", "password": "..." }` | Đăng nhập công khai; response data gồm `accessToken`, `tokenType`, `user { id, fullName, role }`. |
| `POST` | `/api/auth/register` | `{ "fullName": "...", "email": "...", "password": "...", "phone": "..." }` | Đăng ký công khai; backend luôn tạo vai trò `USER`. `phone` có thể là chuỗi rỗng hoặc số điện thoại 10 chữ số bắt đầu bằng 0. |
| `GET` | `/api/field-types` | — | Danh mục loại sân, công khai. |
| `GET` | `/api/fields` | `keyword`, `address`, `fieldType`, `minPrice`, `maxPrice`, `page`, `size` | Tìm kiếm sân công khai, có phân trang. `fieldType` là ID loại sân. |
| `GET` | `/api/fields/{id}` | — | Chi tiết sân công khai; trả thông tin sân/chủ sân, giá, trạng thái và rating nếu có. |
| `GET` | `/api/fields/{id}/reviews` | `page`, `size` | Đánh giá công khai, có phân trang. |
| `POST` | `/api/bookings` | `{ "fieldId": 1, "bookingDate": "YYYY-MM-DD", "startTime": "HH:mm", "endTime": "HH:mm" }` | Người dùng đã đăng nhập tạo booking. Backend tự tính `totalPrice`; client không gửi giá. |
| `GET` | `/api/bookings/my` | `page`, `size` | Danh sách booking của tài khoản đã đăng nhập. |
| `GET` | `/api/bookings/{id}` | — | Chi tiết booking; backend chỉ cho chủ booking, chủ sân liên quan hoặc ADMIN xem. |
| `POST` | `/api/bookings/{id}/cancel` | — | Hủy booking của người đặt nếu trạng thái là `PENDING` hoặc `CONFIRMED`. |
| `POST` | `/api/reviews` | `{ "bookingId": 1, "rating": 1, "comment": "..." }` | Tạo đánh giá khi booking của người dùng ở trạng thái `CONFIRMED` hoặc `COMPLETED`; mỗi booking đánh giá một lần. |
| `GET` | `/api/users/me` | — | Xem hồ sơ tài khoản đã đăng nhập. |
| `PUT` | `/api/users/me` | `{ "fullName": "...", "phone": "..." }` | Cập nhật hồ sơ; API không đổi email, vai trò hoặc trạng thái. |
| `GET` | `/api/owner/fields` | `page`, `size` | Chủ sân xem sân của mình. |
| `POST` | `/api/owner/fields` | `{ "fieldTypeId": 1, "name": "...", "address": "...", "description": "...", "pricePerHour": 300000, "imageUrl": "..." }` | Chủ sân tạo sân. Chủ sở hữu lấy từ JWT; trạng thái ban đầu do backend đặt thành `ACTIVE`. |
| `PUT` | `/api/owner/fields/{id}` | Trường tạo sân và `status` (`ACTIVE`/`INACTIVE`) | Cập nhật sân; backend kiểm tra quyền sở hữu. |
| `DELETE` | `/api/owner/fields/{id}` | — | Xóa sân; backend từ chối nếu sân đã có booking. |
| `GET` | `/api/owner/bookings` | `page`, `size` | Chủ sân xem booking thuộc sân của mình. |
| `POST` | `/api/owner/bookings/{id}/confirm` | — | Chủ sân xác nhận booking `PENDING`. |
| `POST` | `/api/owner/bookings/{id}/reject` | — | Chủ sân từ chối booking `PENDING`. |
| `GET` | `/api/admin/statistics` | — | Thống kê dành riêng cho ADMIN: số lượng người dùng/chủ sân/sân/booking, booking theo trạng thái và doanh thu. |
| `GET` | `/api/admin/users`, `/api/admin/owners`, `/api/admin/fields`, `/api/admin/bookings` | `page`, `size` | Danh sách quản trị dành riêng cho ADMIN. |
| `PUT` | `/api/admin/users/{id}/status` | `{ "status": "ACTIVE" \| "INACTIVE" \| "BLOCKED" }` | ADMIN cập nhật trạng thái tài khoản. |
| `PUT` | `/api/admin/fields/{id}/status` | `{ "status": "ACTIVE" \| "INACTIVE" }` | ADMIN cập nhật trạng thái sân. |

## Ánh xạ dữ liệu

- `FieldResponse`: `id`, `name`, `address`, `description`, `pricePerHour`, `imageUrl`, `status`, `fieldType`, `owner`, `averageRating`, `reviewCount`. Rating và số đánh giá có ở response chi tiết; có thể vắng mặt trên danh sách.
- `BookingResponse`: `id`, `fieldId`, `fieldName`, `userId`, `userFullName`, `bookingDate`, `startTime`, `endTime`, `totalPrice`, `status`, `createdAt`.
- Frontend hiển thị lỗi `message` và lỗi validation theo `errors` từ `ApiResponse`; lỗi kết nối được báo riêng.
- Các thao tác tạo/sửa/hủy/xác nhận/từ chối cập nhật cache bằng TanStack Query invalidation.

## Ngoài phạm vi API hiện có

- Không có endpoint xem chi tiết một payment/giao dịch, khởi tạo thanh toán điện tử hoặc xem lịch sử thanh toán. Backend chỉ tạo payment cơ bản cùng booking; giao diện không tuyên bố đã thu tiền.
- Admin có thể xem danh mục qua `GET /api/field-types`; backend không có API CRUD loại sân nên giao diện quản trị chỉ đọc.
- Không có endpoint thống kê riêng cho OWNER.
- Trang chủ chỉ giới thiệu dịch vụ; không tạo service/API riêng cho trang chủ.
- Không gửi trạng thái đặt chỗ giả định hoặc tự tính giá cuối cùng thay cho backend.
