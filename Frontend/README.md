# Frontend — Football Booking (Hệ thống quản lý và đặt sân bóng)

Frontend hoàn chỉnh cho dự án học phần **Phát triển phần mềm hướng dịch vụ (SOA)**, kết nối trực tiếp với REST API Spring Boot tại [../Backend](../Backend).

---

## 1. Công nghệ sử dụng

| Hạng mục | Công nghệ & Thư viện | Vai trò |
|---|---|---|
| **Framework** | React 18 + Vite 5 | SPA hiệu năng cao, build nhanh chóng |
| **Routing** | React Router 6 | Điều hướng và phân quyền route bảo vệ |
| **State / Cache API** | TanStack Query 5 (React Query) | Fetching, caching, invalidate cache, optimistic updates |
| **HTTP Client** | Axios | Interceptor đính kèm JWT Bearer token và unwrap response |
| **Styling** | Tailwind CSS 3 | Giao diện chuẩn tông xanh cỏ sân bóng, responsive desktop & mobile |
| **Form & Validation** | React Hook Form + Zod | Quản lý form và validate dữ liệu chặt chẽ theo DTO |
| **Icons & Charts** | Lucide React + Recharts | Icon trực quan và biểu đồ thống kê cho Admin |

---

## 2. Cấu trúc thư mục nguồn

```text
Frontend/
├── public/                     # Static assets
├── src/
│   ├── api/                    # Tầng giao tiếp REST API qua Axios
│   │   ├── client.js           # Axios instance, Bearer token interceptor, unwrap response
│   │   ├── authApi.js          # POST /api/auth/login, POST /api/auth/register
│   │   ├── userApi.js          # GET /api/users/me, PUT /api/users/me
│   │   ├── fieldApi.js         # GET /api/fields, GET /api/fields/:id, GET /api/field-types, GET /api/fields/:id/reviews
│   │   ├── bookingApi.js       # POST /api/bookings, GET /api/bookings/my, POST /api/bookings/:id/cancel
│   │   ├── reviewApi.js        # POST /api/reviews
│   │   ├── ownerApi.js         # CRUD /api/owner/fields, duyệt /api/owner/bookings
│   │   ├── adminApi.js         # Thống kê, duyệt user, chủ sân, sân bóng, đơn đặt
│   │   └── healthApi.js        # GET /api/health
│   ├── components/
│   │   └── common/             # Button, Input, Select, Textarea, Modal, ConfirmDialog, Badge, Pagination, FieldCard...
│   ├── context/
│   │   ├── AuthContext.jsx     # Phiên đăng nhập, phân quyền, khôi phục session
│   │   └── ToastContext.jsx    # Hệ thống thông báo toast nổi tự động đóng
│   ├── layouts/
│   │   ├── PublicLayout.jsx    # Header, footer, thanh điều hướng công khai & mobile drawer
│   │   ├── UserLayout.jsx      # Tab chuyển đổi Hồ sơ & Lịch sử đơn đặt của User
│   │   ├── OwnerLayout.jsx     # Sidebar chuyên biệt cho Chủ sân (Owner portal)
│   │   └── AdminLayout.jsx     # Sidebar chuyên biệt cho Quản trị viên (Admin portal)
│   ├── pages/
│   │   ├── public/             # HomePage (/), FieldsPage (/fields), FieldDetailPage (/fields/:id)
│   │   ├── auth/               # LoginPage (/login), RegisterPage (/register)
│   │   ├── user/               # ProfilePage (/profile), MyBookingsPage (/my-bookings)
│   │   ├── owner/              # OwnerDashboardPage (/owner), OwnerFieldsPage, OwnerFieldFormPage, OwnerBookingsPage
│   │   ├── admin/              # AdminDashboardPage (/admin), AdminUsersPage, AdminOwnersPage, AdminFieldsPage, AdminBookingsPage
│   │   └── errors/             # NotFoundPage (404), ForbiddenPage (403)
│   ├── routes/
│   │   ├── ProtectedRoute.jsx  # Bảo vệ các route yêu cầu xác thực và kiểm tra vai trò
│   │   └── PublicOnlyRoute.jsx # Ngăn người đã đăng nhập quay lại login/register
│   ├── utils/
│   │   ├── format.js           # Format VND (đơn vị tiền tệ), format ngày giờ Việt Nam, tính giá dự kiến
│   │   ├── status.js           # Nhãn trạng thái, màu sắc badge, ảnh sân mặc định
│   │   └── error.js            # Trích xuất lỗi thân thiện từ backend
│   ├── App.jsx                 # Khai báo hệ thống routes React Router
│   ├── index.css               # Chỉ thị Tailwind và scrollbar tùy biến
│   └── main.jsx                # Điểm khởi động ứng dụng
├── .env                        # Cấu hình môi trường hiện tại
├── .env.example                # File mẫu biến môi trường
├── index.html                  # HTML template kèm font Be Vietnam Pro
├── package.json                # Dependencies và scripts
├── tailwind.config.js          # Cấu hình theme Tailwind
└── vite.config.js              # Cấu hình Vite & tối ưu chunk rollup
```

---

## 3. Cài đặt và Khởi chạy

### Bước 1: Cài đặt Dependencies
Mở terminal tại thư mục `Frontend/`:
```bash
npm install
```

### Bước 2: Cấu hình biến môi trường (.env)

Tạo file `.env` nằm trực tiếp trong thư mục `Frontend/` bằng cách sao chép từ file mẫu `.env.example`:

- **Trên Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```
- **Trên Linux / macOS / Git Bash:**
  ```bash
  cp .env.example .env
  ```
- **Hoặc tạo thủ công:** Tạo một file mới tên là `.env` trong thư mục `Frontend/`.

Nội dung bên trong file `.env`:
```env
# URL gốc trỏ tới Backend Football Booking REST API
VITE_API_BASE_URL=http://localhost:8080/api
```

#### Giải thích chi tiết các thông số:
- `VITE_API_BASE_URL`: Là tiền tố URL mà lớp giao tiếp Axios (`src/api/client.js`) sử dụng để gửi toàn bộ các HTTP request (đăng nhập, lấy danh sách sân, đặt sân, thống kê...).
  - Khi Backend chạy cục bộ (local): Mặc định là `http://localhost:8080/api`.
  - Nếu sau này triển khai lên server hoặc thay đổi cổng: Bạn chỉ cần cập nhật duy nhất giá trị biến này tại đây mà không cần sửa code giao diện.

> [!IMPORTANT]
> **ĐỒNG BỘ CẤU HÌNH CORS Ở PHÍA BACKEND:**
> - Ứng dụng Frontend (Vite) mặc định chạy trên cổng **`5173`** (`http://localhost:5173`).
> - Trong khi đó, Backend Spring Boot mặc định chỉ mở quyền truy cập CORS cho cổng `3000`.
> - Do đó, để trình duyệt không bị chặn bởi lỗi **CORS Policy** khi gọi API, bạn **BẮT BUỘC** phải kiểm tra/tạo file `Backend/.env` (từ `Backend/.env.example`) và đảm bảo có dòng cấu hình:
>   ```properties
>   CORS_ALLOWED_ORIGINS=http://localhost:5173
>   ```
>   *(Hoặc nếu muốn cho phép cả hai cổng: `CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000`)*

---

### Bước 3: Khởi chạy môi trường phát triển (Development)

Chạy lệnh sau tại thư mục `Frontend/`:
```bash
npm run dev
```

Sau khi khởi chạy thành công, terminal sẽ hiển thị địa chỉ truy cập:
```text
  VITE v5.4.11  ready in ... ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

- Mở trình duyệt web và truy cập vào: **[http://localhost:5173](http://localhost:5173)**
- **Tính năng Hot Module Replacement (HMR):** Mọi thay đổi trong mã nguồn (`.jsx`, `.css`) sẽ được Vite tự động cập nhật ngay lập tức lên trình duyệt mà không cần phải tải lại trang (F5).
- **Trạng thái kết nối API:**
  - Nếu Backend (`http://localhost:8080`) đã được khởi chạy: Dữ liệu sân bóng, loại sân và thống kê sẽ hiển thị ngay lập tức.
  - Nếu Backend chưa bật: Giao diện sẽ hiển thị thông báo lỗi thân thiện (màu đỏ) kèm nút **"Thử lại"** để bạn nhấn tải lại ngay khi bật Backend xong.

---

### Bước 4: Kiểm tra build Production và Xem trước (Preview)

Khi chuẩn bị đóng gói sản phẩm hoặc kiểm tra tính toàn vẹn của mã nguồn:

1. **Biên dịch mã nguồn (Build):**
   ```bash
   npm run build
   ```
   Lệnh này sẽ kiểm tra cú pháp, loại bỏ mã thừa, nén và đóng gói toàn bộ ứng dụng thành các file tĩnh (`.html`, `.js`, `.css`) được tối ưu hóa trong thư mục `Frontend/dist/`. Các file thư viện lớn (`recharts`, `react-vendor`, `@tanstack/react-query`) được tự động tách thành các file chunk độc lập giúp tăng tốc độ tải trang.

2. **Chạy thử bản đóng gói (Preview):**
   ```bash
   npm run preview
   ```
   Vite sẽ tạo một web server cục bộ (thường là cổng `4173`) để bạn trải nghiệm và kiểm tra ứng dụng y hệt như khi đã được đưa lên môi trường sản xuất thực tế.

---

## 4. Tài khoản kiểm thử nhanh (Demo Profile `dev`)

Hệ thống đã tích hợp sẵn nút bấm **Điền nhanh tài khoản (1-Click)** trên giao diện màn hình Đăng nhập:

| Vai trò | Email | Mật khẩu | Chức năng chính |
|---|---|---|---|
| **USER** | `user@footballbooking.com` | `User@123` | Tìm sân, xem chi tiết, đặt sân theo ngày/giờ, xem lịch sử đơn, hủy đơn, đánh giá sân |
| **OWNER** | `owner@footballbooking.com` | `Owner@123` | Dashboard, thêm/sửa/xóa sân bóng của mình, duyệt hoặc từ chối các đơn đặt sân |
| **ADMIN** | `admin@footballbooking.com` | `Admin@123` | Xem thống kê số lượng & doanh thu, biểu đồ đơn đặt, quản lý trạng thái User/Owner/Sân |

---

## 5. Lưu ý tích hợp Backend & Nghiệp vụ

1. **CORS Backend:**
   Vite chạy cổng mặc định `5173`. Nếu chạy Backend Spring Boot, hãy bảo đảm file `Backend/.env` cấu hình:
   ```properties
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   ```
2. **Tham số lọc loại sân bóng:**
   Code backend `FieldController.java` sử dụng `@RequestParam(required = false) Long fieldType`. Do đó Frontend truyền đúng tham số `fieldType` lên endpoint `GET /api/fields`.
3. **Đặt sân & Trùng lịch (Availability):**
   Backend tự tính tổng tiền (không nhận `totalPrice` từ client). Khi khách chọn khung giờ đã có người đặt, backend trả về mã lỗi HTTP `409 Conflict`, giao diện sẽ hiển thị thông báo rõ ràng để người dùng đổi sang khung giờ khác.
4. **Điều kiện đánh giá sân:**
   Khách hàng chỉ có thể gửi đánh giá cho các đơn ở trạng thái `CONFIRMED` hoặc `COMPLETED`.
