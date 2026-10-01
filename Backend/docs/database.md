# Cơ sở dữ liệu (Database)

Database MySQL: **`football_booking`**. Ứng dụng đang để `ddl-auto: update` nên Hibernate tự tạo
bảng theo entity. Ngoài ra có sẵn **script SQL để import thủ công**:

> **File SQL: [database.sql](database.sql)** — CREATE DATABASE + toàn bộ bảng (khóa ngoại, index,
> ràng buộc) + dữ liệu mẫu (loại sân, tài khoản admin/owner/user, một sân mẫu).
> Import: `mysql -u root -p < docs/database.sql` (hoặc chạy trong phpMyAdmin/Workbench).
> Nếu import bằng file này, nên đặt `spring.jpa.hibernate.ddl-auto: validate` (hoặc `none`).

## Sơ đồ quan hệ
```
User  1───N  Booking        Owner(User) 1───N  Field
User  1───N  Review         FieldType   1───N  Field
Field 1───N  Booking        Field       1───N  Review
Booking 1───1 Payment
```

## Bảng `users`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | BIGINT PK | auto increment |
| full_name | VARCHAR | |
| email | VARCHAR | **UNIQUE** |
| password | VARCHAR | mã hóa **BCrypt** (không lưu plaintext) |
| phone | VARCHAR | |
| role | VARCHAR(20) | `USER`, `OWNER`, `ADMIN` |
| status | VARCHAR(20) | `ACTIVE`, `INACTIVE`, `BLOCKED` |
| created_at / updated_at | DATETIME | |

## Bảng `field_types`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | BIGINT PK | |
| name | VARCHAR | ví dụ: sân 5, sân 7, sân 11 |
| description | VARCHAR | |
| status | VARCHAR(20) | `ACTIVE` / `INACTIVE` |

## Bảng `fields`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | BIGINT PK | |
| owner_id | BIGINT FK → users | chủ sân |
| field_type_id | BIGINT FK → field_types | |
| name, address, description | VARCHAR | |
| price_per_hour | DECIMAL | dùng để Backend tự tính tiền |
| image_url | VARCHAR | |
| status | VARCHAR(20) | `ACTIVE` / `INACTIVE` — chỉ sân `ACTIVE` nhận đặt |
| created_at / updated_at | DATETIME | |

## Bảng `bookings`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | BIGINT PK | |
| user_id | BIGINT FK → users | |
| field_id | BIGINT FK → fields | |
| booking_date | DATE | |
| start_time / end_time | TIME | `start_time < end_time` |
| total_price | DECIMAL(12,2) | **Backend tự tính** (`price_per_hour` × số giờ), không tin Frontend |
| status | VARCHAR(20) | `PENDING`, `CONFIRMED`, `CANCELLED`, `REJECTED`, `COMPLETED` |
| created_at / updated_at | DATETIME | |

> **Lưu ý về `COMPLETED`:** trạng thái này có trong enum và được dùng khi tính doanh thu
> (`StatisticsServiceImpl`) cùng khi xét điều kiện đánh giá (`ReviewServiceImpl`), nhưng **chưa có
> endpoint nào chuyển đơn sang `COMPLETED`** — hiện phải cập nhật trực tiếp trong cơ sở dữ liệu.

### Chống double booking — đã hiện thực
Chỉ đơn ở trạng thái `PENDING` và `CONFIRMED` được coi là đang giữ chỗ. Cơ chế gồm hai bước,
chạy trong **cùng một transaction** (`BookingServiceImpl.create`):

1. **Khóa bi quan dòng sân.** `FieldRepository.findByIdForUpdate` dùng
   `@Lock(LockModeType.PESSIMISTIC_WRITE)` → sinh `SELECT ... FOR UPDATE` trên dòng `fields`.
   Nhờ đó mọi yêu cầu đặt **cùng một sân** bị tuần tự hóa, còn các sân khác vẫn chạy song song.
2. **Kiểm tra chồng lấn trong khóa.** `BookingRepository.existsOverlappingBooking` kiểm tra
   cùng `field_id` + `booking_date` và điều kiện giao nhau của hai khoảng `[s,e)`:
   `start_time < :endTime AND end_time > :startTime`. Nếu trùng thì rollback và trả **409 Conflict**.

Truy vấn này được hỗ trợ bởi index `idx_booking_field_date` trên `(field_id, booking_date)`,
khai báo sẵn ở entity `Booking`.

> **Hạn chế còn lại:** chưa có **UNIQUE constraint** ở tầng cơ sở dữ liệu làm chốt chặn cuối.
> Nếu sau này chạy nhiều instance backend hoặc có tiến trình ghi thẳng vào DB mà không qua
> service, hai bước trên không còn đủ. MySQL không có exclusion constraint cho khoảng thời gian,
> nên muốn có chốt chặn ở DB thì phải tách bảng khung giờ (mỗi giờ một dòng) rồi đặt
> UNIQUE trên `(field_id, booking_date, time_slot_id)`.

## Bảng `reviews`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | BIGINT PK | |
| user_id | BIGINT FK → users | |
| field_id | BIGINT FK → fields | |
| booking_id | BIGINT FK → bookings | **UNIQUE** trong `database.sql` — mỗi đơn chỉ đánh giá 1 lần |
| rating | INT | 1..5 (`CHECK` trong `database.sql`) |
| comment | VARCHAR(1000) | |
| created_at / updated_at | DATETIME | |

Chỉ đơn đã `CONFIRMED` hoặc `COMPLETED` của chính người đặt mới được đánh giá (`ReviewServiceImpl`).

## Bảng `payments` (thiết kế cơ bản)
Mỗi đơn đặt sinh kèm một bản ghi thanh toán `PENDING` / `CASH` lúc tạo đơn. Chủ sân xác nhận đơn
→ `PAID`; người đặt hủy đơn đã `PAID` → `REFUNDED`.

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | BIGINT PK | |
| booking_id | BIGINT FK → bookings | **UNIQUE** trong `database.sql` — quan hệ 1-1 với booking |
| amount | DECIMAL(12,2) | |
| payment_method | VARCHAR(20) | `CASH`, `BANK_TRANSFER` |
| status | VARCHAR(20) | `PENDING`, `PAID`, `FAILED`, `REFUNDED` |
| transaction_code | VARCHAR(100) | |
| created_at | DATETIME | |

> Chưa tích hợp cổng thanh toán thật cho đến khi có yêu cầu.

## Khác biệt giữa `database.sql` và schema do Hibernate sinh
`database.sql` **chặt hơn** schema mà `ddl-auto: update` tự tạo, vì script có thêm:

- `UNIQUE (booking_id)` trên `reviews` và `payments` — hai quy tắc này hiện chỉ được bảo đảm ở
  tầng Service, entity không khai báo nên Hibernate không tạo ràng buộc.
- `CHECK` constraint cho các cột trạng thái và cho `rating BETWEEN 1 AND 5`.

Vì vậy **nên import `database.sql`** rồi đặt `spring.jpa.hibernate.ddl-auto: validate` (hoặc `none`),
thay vì để Hibernate tự sinh schema. Các cột trạng thái dùng `VARCHAR(20)` + `CHECK` (không dùng
kiểu `ENUM` của MySQL) để khớp với `@Enumerated(EnumType.STRING)` của entity.
