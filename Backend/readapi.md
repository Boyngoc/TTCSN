# FOOTBALL BOOKING API - TÀI LIỆU TOÀN BỘ ENDPOINT & HƯỚNG DẪN TEST

> **Base URL:** `http://localhost:8080`  
> **Swagger UI (Test trực quan trên trình duyệt):** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)  
> **OpenAPI JSON:** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

---

## 1. CÁCH TEST API NHANH NHẤT

### Cách 1: Test bằng Swagger UI (Khuyên Dùng)
1. Mở trình duyệt và truy cập: **[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)**
2. Tìm đến mục **Auth** -> `POST /api/auth/login` -> Nhấn **Try it out**.
3. Điền email & password (dùng tài khoản mẫu bên dưới) -> Nhấn **Execute**.
4. Copy chuỗi `accessToken` trong JSON trả về.
5. Kéo lên góc trên bên phải trang, nhấn nút **Authorize** (biểu tượng ổ khóa màu xanh).
6. Dán token vừa copy vào ô `Value` -> Nhấn **Authorize** -> Nhấn **Close**.
7. Từ bây giờ bạn có thể bấm **Try it out** và **Execute** bất kỳ API nào (hệ thống sẽ tự động gửi kèm JWT Token).

---

### Cách 2: Test bằng Postman / Thunder Client / Insomnia
* **Base URL:** `http://localhost:8080`
* **Header chung:** `Content-Type: application/json`
* **Header xác thực (đối với API yêu cầu đăng nhập):**
  * Vào tab **Authorization** -> Chọn type **Bearer Token** -> Dán `accessToken` lấy từ API Login.
  * Hoặc trong tab **Headers**, thêm:
    * Key: `Authorization`
    * Value: `Bearer <accessToken_của_bạn>`

---

## 2. TÀI KHOẢN TEST CÓ SẴN (PROFILE DEV)

| Vai trò | Email | Mật khẩu | Quyền hạn chính |
|---|---|---|---|
| **ADMIN** | `admin@footballbooking.com` | `Admin@123` | Quản trị toàn bộ user, sân, booking, xem thống kê |
| **OWNER** | `owner@footballbooking.com` | `Owner@123` | Quản lý sân của mình, xác nhận / từ chối đơn đặt sân |
| **USER** | `user@footballbooking.com` | `User@123` | Xem sân, tạo booking, hủy booking, viết đánh giá |

---

## 3. DANH SÁCH TOÀN BỘ API THEO MODULE

### 1. Hệ thống & Kiểm tra trạng thái (Health)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/health` | Public | Kiểm tra server backend có đang hoạt động hay không |

**Response mẫu (200 OK):**
```json
{
  "status": "UP",
  "service": "Football Booking Service"
}
```

---

### 2. Xác thực (Authentication)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Đăng ký tài khoản người dùng mới (vai trò mặc định: USER) |
| `POST` | `/api/auth/login` | Public | Đăng nhập hệ thống, trả về JWT Access Token |

#### Body `POST /api/auth/register`:
```json
{
  "fullName": "Nguyễn Văn A",
  "email": "nguyenvana@gmail.com",
  "password": "Password@123",
  "phone": "0912345678"
}
```

#### Body `POST /api/auth/login`:
```json
{
  "email": "user@footballbooking.com",
  "password": "User@123"
}
```

---

### 3. Thông tin người dùng (User Profile)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/users/me` | Đã đăng nhập | Xem thông tin tài khoản của chính mình |
| `PUT` | `/api/users/me` | Đã đăng nhập | Cập nhật họ tên, số điện thoại của mình |

#### Body `PUT /api/users/me`:
```json
{
  "fullName": "Nguyễn Văn A (Cập nhật)",
  "phone": "0987654321"
}
```

---

### 4. Loại sân bóng (Field Types)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/field-types` | Public | Danh sách các loại sân (Sân 5 người, 7 người, 11 người...) |

---

### 5. Sân bóng công khai (Fields - Dành cho khách tìm sân)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/fields` | Public | Tìm kiếm danh sách sân (hỗ trợ lọc từ khóa, loại sân, khoảng giá, phân trang) |
| `GET` | `/api/fields/{id}` | Public | Xem thông tin chi tiết một sân bóng kèm điểm đánh giá |
| `POST` | `/api/fields` | OWNER / ADMIN | Tạo mới một sân bóng |
| `PUT` | `/api/fields/{id}` | OWNER sở hữu sân | Cập nhật thông tin sân bóng của mình |
| `DELETE` | `/api/fields/{id}` | OWNER sở hữu sân | Xóa sân (nếu sân đã có booking sẽ yêu cầu chuyển INACTIVE) |

#### Query Parameters cho `GET /api/fields`:
* `keyword`: Từ khóa tìm kiếm theo tên/mô tả sân (ví dụ: `Ngôi Sao`)
* `address`: Lọc theo địa chỉ (ví dụ: `Hà Nội`)
* `fieldTypeId`: Lọc theo ID loại sân (ví dụ: `1`)
* `minPrice`: Giá thấp nhất (ví dụ: `200000`)
* `maxPrice`: Giá cao nhất (ví dụ: `500000`)
* `page`: Trang hiện tại (mặc định: `0`)
* `size`: Số lượng mỗi trang (mặc định: `10`)

#### Body `POST /api/fields` (hoặc `POST /api/owner/fields`):
```json
{
  "fieldTypeId": 1,
  "name": "Sân bóng Chảo Lửa Tân Bình",
  "address": "30 Phan Thúc Duyện, Tân Bình, TP.HCM",
  "description": "Sân cỏ nhân tạo chất lượng cao, có mái che, dàn đèn LED",
  "pricePerHour": 350000,
  "imageUrl": "https://example.com/san-chao-lua.jpg",
  "phone": "0987654321",
  "mapLink": "https://maps.google.com/?q=30+Phan+Thuc+Duyen+Tan+Binh"
}
```

#### Body `PUT /api/fields/{id}` (hoặc `PUT /api/owner/fields/{id}`):
```json
{
  "fieldTypeId": 1,
  "name": "Sân bóng Chảo Lửa Tân Bình (Đổi tên)",
  "address": "30 Phan Thúc Duyện, Tân Bình, TP.HCM",
  "description": "Sân cỏ nhân tạo vừa bảo dưỡng mặt cỏ mới",
  "pricePerHour": 400000,
  "imageUrl": "https://example.com/san-chao-lua.jpg",
  "status": "ACTIVE",
  "phone": "0987654321",
  "mapLink": "https://maps.google.com/?q=30+Phan+Thuc+Duyen+Tan+Binh"
}
```

---

### 6. Quản lý sân dành cho Chủ sân (Owner Fields)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/owner/fields` | OWNER | Lấy danh sách toàn bộ các sân thuộc sở hữu của chủ sân hiện tại |
| `POST` | `/api/owner/fields` | OWNER | Tạo sân mới cho chủ sân hiện tại |
| `PUT` | `/api/owner/fields/{id}` | OWNER (chính chủ) | Sửa sân của mình |
| `DELETE` | `/api/owner/fields/{id}` | OWNER (chính chủ) | Xóa sân của mình |

---

### 7. Đặt sân bóng (Bookings - Dành cho khách đặt sân)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `POST` | `/api/bookings` | USER | Tạo lượt đặt sân mới (Backend tự tính tổng tiền, kiểm tra trùng lịch) |
| `GET` | `/api/bookings/my` | USER | Xem danh sách các lượt đặt sân của chính mình |
| `GET` | `/api/bookings/{id}` | Người đặt / Chủ sân / ADMIN | Xem chi tiết một lượt đặt sân cụ thể |
| `POST` | `/api/bookings/{id}/cancel` | Người đặt | Hủy lượt đặt sân của mình (chỉ hủy được khi PENDING/CONFIRMED) |

#### Body `POST /api/bookings`:
> **Lưu ý:** Ngày đặt `bookingDate` phải từ hôm nay trở đi (`YYYY-MM-DD`). Giờ bắt đầu/kết thúc dạng `HH:mm`.
```json
{
  "fieldId": 1,
  "bookingDate": "2026-10-01",
  "startTime": "18:00",
  "endTime": "20:00"
}
```

---

### 8. Quản lý đặt sân dành cho Chủ sân (Owner Bookings)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/owner/bookings` | OWNER | Danh sách các đơn đặt sân trên tất cả các sân của chủ sân này |
| `POST` | `/api/owner/bookings/{id}/confirm` | OWNER của sân đó | Chủ sân chấp nhận / xác nhận đơn đặt sân |
| `POST` | `/api/owner/bookings/{id}/reject` | OWNER của sân đó | Chủ sân từ chối đơn đặt sân |

---

### 9. Đánh giá sân bóng (Reviews)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `POST` | `/api/reviews` | USER đã đặt sân | Gửi đánh giá và chấm điểm cho sân (chỉ đánh giá được khi booking đã CONFIRMED hoặc COMPLETED) |
| `GET` | `/api/fields/{id}/reviews` | Public | Xem danh sách đánh giá của một sân bóng cụ thể |

#### Body `POST /api/reviews`:
```json
{
  "bookingId": 1,
  "rating": 5,
  "comment": "Sân đẹp, mặt cỏ êm, chủ sân nhiệt tình hỗ trợ nước uống!"
}
```

---

### 10. Quản trị hệ thống (Admin)
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/admin/users` | ADMIN | Danh sách tất cả người dùng thường (USER) có phân trang |
| `GET` | `/api/admin/owners` | ADMIN | Danh sách tất cả các chủ sân (OWNER) có phân trang |
| `GET` | `/api/admin/fields` | ADMIN | Danh sách tất cả các sân trong toàn hệ thống |
| `GET` | `/api/admin/bookings` | ADMIN | Danh sách tất cả các lượt đặt sân trong toàn hệ thống |
| `PUT` | `/api/admin/users/{id}/status` | ADMIN | Khóa hoặc kích hoạt tài khoản (`ACTIVE`, `INACTIVE`, `BLOCKED`) |
| `PUT` | `/api/admin/fields/{id}/status` | ADMIN | Kích hoạt hoặc ẩn sân bóng (`ACTIVE`, `INACTIVE`) |
| `GET` | `/api/admin/statistics` | ADMIN | Thống kê số lượng user, owner, sân, booking theo trạng thái và tổng doanh thu |

#### Body `PUT /api/admin/users/{id}/status`:
```json
{
  "status": "BLOCKED"
}
```

#### Body `PUT /api/admin/fields/{id}/status`:
```json
{
  "status": "INACTIVE"
}
```

---

## 4. LUỒNG TEST MẪU TỪ ĐẦU ĐẾN CUỐI (END-TO-END WORKFLOW)

Để kiểm tra toàn bộ hệ thống hoạt động trơn tru, bạn có thể thực hiện theo quy trình 6 bước sau trên Swagger UI:

1. **Bước 1 (User Đăng nhập):**
   * Gọi `POST /api/auth/login` với:
     ```json
     { "email": "user@footballbooking.com", "password": "User@123" }
     ```
   * Copy `accessToken` và bấm **Authorize** ở góc trên Swagger để kích hoạt quyền USER.
2. **Bước 2 (Tìm sân):**
   * Gọi `GET /api/fields` để lấy danh sách sân và chọn `id` của sân muốn đặt (mặc định sân mẫu có `id = 1`).
3. **Bước 3 (Tạo đơn đặt sân):**
   * Gọi `POST /api/bookings` với:
     ```json
     {
       "fieldId": 1,
       "bookingDate": "2026-10-05",
       "startTime": "18:00",
       "endTime": "20:00"
     }
     ```
   * Nhận kết quả: Trạng thái đơn là `PENDING`, tổng tiền tự động tính = 2 giờ $\times$ 300.000đ = 600.000đ. Lưu lại `id` của booking vừa tạo (ví dụ `bookingId = 1`).
4. **Bước 4 (Chủ sân xác nhận đơn):**
   * Nhấn **Logout** ở nút Authorize.
   * Gọi lại `POST /api/auth/login` với tài khoản Chủ sân:
     ```json
     { "email": "owner@footballbooking.com", "password": "Owner@123" }
     ```
   * Copy token của Owner và bấm **Authorize**.
   * Gọi `POST /api/owner/bookings/1/confirm`. Đơn đặt sân chuyển sang trạng thái `CONFIRMED`.
5. **Bước 5 (User viết đánh giá):**
   * Đổi Authorize lại sang token của `user@footballbooking.com`.
   * Gọi `POST /api/reviews` với:
     ```json
     { "bookingId": 1, "rating": 5, "comment": "Sân rất chất lượng!" }
     ```
   * Gọi `GET /api/fields/1/reviews` để thấy đánh giá vừa đăng xuất hiện công khai.
6. **Bước 6 (Admin xem thống kê):**
   * Đổi Authorize sang token của `admin@footballbooking.com / Admin@123`.
   * Gọi `GET /api/admin/statistics` -> Sẽ thấy thống kê tổng doanh thu đã được cộng thêm 600.000đ từ đơn CONFIRMED trên!
