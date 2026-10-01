# Hệ thống quản lý và đặt sân bóng (Football Booking)

Đồ án môn **Phát triển phần mềm hướng dịch vụ (SOA)**. Hệ thống cho phép người dùng tìm và đặt
sân bóng trực tuyến, chủ sân quản lý sân của mình và duyệt đơn đặt, quản trị viên quản lý toàn
hệ thống và xem thống kê.

## 1. Trạng thái dự án

| Thành phần | Trạng thái | Ghi chú |
|---|---|---|
| Backend REST API | ✅ Hoàn thiện | Spring Boot, 23 test unit/integration (`mvn test`) |
| Cơ sở dữ liệu | ✅ Hoàn thiện | MySQL 8, 6 bảng, có script SQL import tay |
| Tài liệu API | ✅ Hoàn thiện | Swagger UI + tài liệu markdown |
| Frontend | 🚧 Chưa triển khai | Thư mục `Frontend/` hiện chỉ là chỗ đặt code |

## 2. Công nghệ

| Tầng | Công nghệ |
|---|---|
| Backend | Java 17, Spring Boot 3.3.5, Spring Web, Spring Data JPA (Hibernate), Spring Validation |
| Bảo mật | Spring Security + JWT (jjwt 0.12.6), BCrypt |
| Cơ sở dữ liệu | MySQL 8 (chạy thật) / H2 in-memory (test) |
| Tài liệu API | springdoc-openapi (Swagger UI) |
| Kiểm thử | JUnit 5, Mockito, Spring Boot Test (MockMvc) |
| Frontend (dự kiến) | React 18 + Vite 5, React Router, TanStack Query, Axios, Tailwind CSS |
| Build | Maven |

## 3. Cấu trúc repository

```
TTCSN/
├── Backend/            # Spring Boot REST API (đã hoàn thiện)
│   ├── src/main/java/com/example/footballbooking/
│   ├── src/main/resources/     # application.yml, application-dev.yml
│   ├── src/test/               # 23 test trên H2
│   ├── docs/                   # tài liệu chi tiết + database.sql
│   ├── readapi.md              # hướng dẫn test từng endpoint
│   └── README.md               # hướng dẫn cài đặt & chạy backend
├── Frontend/           # chưa có code
└── README.md           # tài liệu tổng quan (file này)
```

## 4. Vai trò và quyền

| Vai trò | Quyền chính |
|---|---|
| `USER` | Tìm/xem sân, tạo đơn đặt sân, xem và hủy đơn của mình, đánh giá sân đã đặt, sửa hồ sơ |
| `OWNER` | Quản lý (CRUD) sân của chính mình, xem đơn đặt vào sân của mình, xác nhận / từ chối đơn |
| `ADMIN` | Xem toàn bộ user / chủ sân / sân / đơn đặt, khóa-mở tài khoản, bật-tắt sân, xem thống kê |

Đăng ký qua API luôn tạo tài khoản `USER`. Tài khoản `OWNER` và `ADMIN` chỉ được tạo bằng
dữ liệu mẫu (profile `dev`) hoặc thao tác trực tiếp trong cơ sở dữ liệu.

## 5. Luồng nghiệp vụ

1. Người dùng **đăng ký** (`USER`) rồi **đăng nhập**, nhận về JWT và gửi kèm header
   `Authorization: Bearer <token>` cho các request cần xác thực.
2. Tìm sân theo từ khóa / địa chỉ / loại sân / khoảng giá, xem chi tiết và đánh giá của sân.
3. **Tạo đơn đặt sân**: chọn sân, ngày, giờ bắt đầu – giờ kết thúc. Đơn được tạo ở trạng thái
   `PENDING`, backend tự tính tổng tiền và tạo kèm một bản ghi thanh toán `PENDING` (mặc định `CASH`).
4. **Chủ sân** xem đơn vào sân của mình rồi **xác nhận** (`CONFIRMED`, thanh toán chuyển `PAID`)
   hoặc **từ chối** (`REJECTED`).
5. Người đặt có thể **hủy** đơn của mình khi đơn còn `PENDING` hoặc `CONFIRMED`
   (`CANCELLED`; nếu đã `PAID` thì thanh toán chuyển `REFUNDED`).
6. Với đơn `CONFIRMED` hoặc `COMPLETED`, người đặt được **đánh giá** sân một lần (1–5 sao).
7. **Admin** theo dõi toàn hệ thống và xem thống kê tổng hợp.

## 6. Quy tắc nghiệp vụ đang áp dụng

| Mã | Quy tắc |
|---|---|
| BR-01 | Chuyển trạng thái hợp lệ: `PENDING`→`CONFIRMED` / `REJECTED` (chủ sân), `PENDING`/`CONFIRMED`→`CANCELLED` (người đặt). Chuyển khác bị từ chối (409). |
| BR-02 | Chỉ đơn `PENDING` và `CONFIRMED` giữ chỗ khung giờ. Đơn `CANCELLED` / `REJECTED` không chiếm chỗ. |
| BR-03 | Không cho trùng lịch: hai đơn đang giữ chỗ không được chồng lấn cùng sân + ngày. Trùng thì trả **409**. Cơ chế: khóa bi quan dòng sân (`PESSIMISTIC_WRITE`) trong transaction, rồi kiểm tra chồng lấn `start < :end AND end > :start`. |
| BR-04 | Tổng tiền = `price_per_hour` × số giờ, **tính ở server**, không tin giá do client gửi. |
| BR-05 | Không nhận đặt sân ở trạng thái `INACTIVE`; không đặt ngày quá khứ; nếu đặt trong hôm nay thì giờ bắt đầu phải ở tương lai. |
| BR-06 | Mật khẩu luôn hash BCrypt, không bao giờ trả về qua API. |
| BR-07 | Ngoài kiểm tra vai trò còn kiểm tra **quyền sở hữu tài nguyên** ở tầng Service (chống IDOR): chủ sân chỉ tác động lên sân/đơn của mình, người đặt chỉ xem/hủy đơn của mình. |
| BR-08 | Mỗi đơn đặt chỉ được đánh giá một lần, và chỉ khi đơn đã `CONFIRMED` hoặc `COMPLETED`. |
| BR-09 | Không xóa được sân đã có lượt đặt (409) — chuyển sang `INACTIVE` thay vì xóa. |

## 7. Mô hình dữ liệu

Sáu bảng: `users`, `field_types`, `fields`, `bookings`, `reviews`, `payments`.

```
User  1───N  Booking          Owner(User) 1───N  Field
User  1───N  Review           FieldType   1───N  Field
Field 1───N  Booking          Field       1───N  Review
Booking 1───1 Payment
```

Các tập giá trị enum:

- `Role`: `USER`, `OWNER`, `ADMIN`
- `UserStatus`: `ACTIVE`, `INACTIVE`, `BLOCKED`
- `ActiveStatus` (sân, loại sân): `ACTIVE`, `INACTIVE`
- `BookingStatus`: `PENDING`, `CONFIRMED`, `CANCELLED`, `REJECTED`, `COMPLETED`
- `PaymentMethod`: `CASH`, `BANK_TRANSFER` — `PaymentStatus`: `PENDING`, `PAID`, `FAILED`, `REFUNDED`

Chi tiết từng cột, khóa ngoại và script SQL: **[Backend/docs/database.md](Backend/docs/database.md)**.

## 8. API

Tiền tố `/api`. Mọi phản hồi bọc trong `ApiResponse<T>` (trừ `/api/health`):

```json
{ "status": 200, "message": "Thành công", "data": {} }
```

Lỗi trả `{ "status", "message", "timestamp" }`, kèm `errors` theo từng trường khi lỗi validation.
Mã dùng: `200` `201` `204` `400` `401` `403` `404` `409` `500`.

| Nhóm | Endpoint | Quyền |
|---|---|---|
| Health | `GET /api/health` | Public |
| Auth | `POST /api/auth/register`, `POST /api/auth/login` | Public |
| User | `GET /api/users/me`, `PUT /api/users/me` | Đã đăng nhập |
| FieldType | `GET /api/field-types` | Public |
| Field | `GET /api/fields`, `GET /api/fields/{id}` | Public |
| Field | `POST /api/fields`, `PUT`/`DELETE /api/fields/{id}` | `OWNER`/`ADMIN` + chủ sở hữu |
| Owner Field | `GET`/`POST /api/owner/fields`, `PUT`/`DELETE /api/owner/fields/{id}` | `OWNER` (chủ sở hữu) |
| Booking | `POST /api/bookings`, `GET /api/bookings/my`, `GET /api/bookings/{id}`, `POST /api/bookings/{id}/cancel` | Đã đăng nhập |
| Owner Booking | `GET /api/owner/bookings`, `POST /api/owner/bookings/{id}/confirm`, `.../reject` | `OWNER` (chủ sân) |
| Review | `POST /api/reviews`, `GET /api/fields/{id}/reviews` | Tạo: đã đăng nhập · Xem: public |
| Admin | `GET /api/admin/users\|owners\|fields\|bookings\|statistics`, `PUT /api/admin/users/{id}/status`, `PUT /api/admin/fields/{id}/status` | `ADMIN` |

Tham số tìm kiếm sân: `keyword`, `address`, `fieldType`, `minPrice`, `maxPrice`, `page`, `size`.
Thống kê trả về: `totalUsers`, `totalOwners`, `totalFields`, `totalBookings`,
`bookingsByStatus`, `totalRevenue` (tổng tiền các đơn `CONFIRMED` + `COMPLETED`).

Tài liệu đầy đủ: **[Backend/docs/api.md](Backend/docs/api.md)** · hướng dẫn test từng endpoint:
**[Backend/readapi.md](Backend/readapi.md)** · Swagger UI: `http://localhost:8080/swagger-ui.html`.

## 9. Cách chạy

Yêu cầu: **Java 17+**, **Maven**, **MySQL 8** đang chạy.

```bash
cd Backend
cp .env.example .env     # sửa DB_USERNAME / DB_PASSWORD cho khớp máy bạn
mvn spring-boot:run
```

Kiểm tra: `curl http://localhost:8080/api/health` → `{"status":"UP","service":"Football Booking Service"}`

Cấu hình đọc từ `.env` hoặc biến môi trường hệ điều hành (xem bảng đầy đủ trong
[Backend/README.md](Backend/README.md) mục 9). Khi làm Frontend bằng Vite, nhớ mở CORS cho cổng của Vite:

```bash
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

Chạy với profile `dev` (mặc định), hệ thống tự tạo dữ liệu mẫu — 3 loại sân, 1 sân mẫu và 3 tài khoản:

| Vai trò | Email | Mật khẩu |
|---|---|---|
| ADMIN | `admin@footballbooking.com` | `Admin@123` |
| OWNER | `owner@footballbooking.com` | `Owner@123` |
| USER | `user@footballbooking.com` | `User@123` |

## 10. Kiểm thử

```bash
cd Backend
mvn test
```

23 test (unit + integration) chạy trên H2 in-memory (profile `test`), **không cần MySQL**.
Chi tiết phạm vi: [Backend/docs/testing.md](Backend/docs/testing.md).

## 11. Tài liệu chi tiết

| Tài liệu | Nội dung |
|---|---|
| [Backend/README.md](Backend/README.md) | Cài đặt, biến môi trường, cách chạy backend |
| [Backend/docs/architecture.md](Backend/docs/architecture.md) | Kiến trúc phân tầng, nguyên tắc bắt buộc |
| [Backend/docs/database.md](Backend/docs/database.md) | Schema chi tiết · [database.sql](Backend/docs/database.sql) |
| [Backend/docs/api.md](Backend/docs/api.md) | Quy ước API, danh sách endpoint |
| [Backend/readapi.md](Backend/readapi.md) | Hướng dẫn test từng endpoint (Swagger / Postman / curl) |
| [Backend/docs/authentication.md](Backend/docs/authentication.md) | Cơ chế JWT |
| [Backend/docs/authorization.md](Backend/docs/authorization.md) | Phân quyền và quyền sở hữu tài nguyên |
| [Backend/docs/testing.md](Backend/docs/testing.md) | Chiến lược kiểm thử |
| [Backend/docs/code-review.md](Backend/docs/code-review.md) | Báo cáo review tự động theo từng mốc |

## 12. Việc còn lại (roadmap)

Những mục dưới đây **chưa có trong code**, ghi lại để không nhầm là đã làm:

- **Frontend** — toàn bộ giao diện (React 18 + Vite).
- **Lưới khung giờ / availability** — hiện client tự gửi `startTime`–`endTime` tự do. Chưa có bảng
  khung giờ cố định, chưa có hệ số giá giờ cao điểm, chưa có endpoint trả ma trận giờ trống theo sân + ngày.
- **Quy tắc hạn hủy** — hiện hủy được bất cứ lúc nào miễn đơn còn `PENDING`/`CONFIRMED`,
  chưa có ràng buộc "chỉ hủy trước giờ đá N giờ". Admin cũng chưa có quyền hủy đơn hộ khách.
- **Trạng thái `COMPLETED`** — có trong enum và được dùng khi tính doanh thu / xét điều kiện đánh giá,
  nhưng **chưa có endpoint nào chuyển đơn sang `COMPLETED`**.
- **Đổi mật khẩu** — `PUT /api/users/me` chỉ sửa `fullName` và `phone`.
- **Ràng buộc chống trùng ở tầng DB** — hiện chỉ dựa vào khóa bi quan + truy vấn kiểm tra,
  chưa có UNIQUE constraint làm chốt chặn cuối.
- **Test đồng thời** — chưa có test bắn N request đặt cùng khung giờ để chứng minh đúng 1 đơn thành công.
- **Đặt hộ khách vãng lai** — `Booking.user` bắt buộc, chưa hỗ trợ khách không có tài khoản.
- **Thanh toán thật** — bảng `payments` chỉ ở mức cơ bản, chưa tích hợp cổng thanh toán.
- **Docker Compose**, **Postman collection**, và **múi giờ**: cấu hình JDBC dùng `serverTimezone=UTC`
  trong khi kiểm tra "giờ ở tương lai" dựa vào giờ mặc định của JVM — nên chốt thống nhất `Asia/Ho_Chi_Minh`.
- **Trùng chức năng cần dọn** — `POST/PUT/DELETE /api/fields` và `/api/owner/fields` cùng làm một việc.

> **Ghi chú về tài liệu.** Bản README trước đây của repo là một **bản nháp chưa duyệt**, đặc tả hệ
> thống một-cơ-sở với NestJS + Prisma, hai vai trò `CUSTOMER`/`ADMIN` và các bảng `TimeSlot`/`BookingSlot`.
> Bản nháp đó không phản ánh code đang có (Spring Boot, ba vai trò, nhiều chủ sân, có `Review`/`Payment`)
> nên đã được thay bằng tài liệu này. Các yêu cầu còn giá trị từ bản nháp được giữ lại ở mục 12.
