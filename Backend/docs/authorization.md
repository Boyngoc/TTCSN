# Phân quyền (Authorization)

> **Đã triển khai.** Chặn thô theo vai trò tại `SecurityConfig`, kiểm tra quyền sở hữu tại tầng Service.

## Ba vai trò
| Vai trò | Được phép |
|---|---|
| `USER` | Xem sân, đặt sân, xem/hủy booking của mình, đánh giá sân đã đặt, quản lý profile |
| `OWNER` | Quản lý sân của mình, xem booking sân của mình, confirm/reject |
| `ADMIN` | Quản lý toàn bộ hệ thống, khóa-mở tài khoản, bật-tắt sân, xem thống kê |

Thống kê (`GET /api/admin/statistics`) **chỉ dành cho `ADMIN`** — chưa có trang thống kê riêng cho `OWNER`.
Đăng ký qua API luôn tạo tài khoản `USER`; `OWNER` và `ADMIN` chỉ tạo bằng `DataSeeder` (profile `dev`)
hoặc thao tác trực tiếp trong cơ sở dữ liệu.

Không tự ý tạo thêm vai trò khác.

## Hai lớp kiểm soát
1. **Role-based** — chặn theo vai trò (ví dụ chỉ `ADMIN` gọi `/api/admin/**`).
2. **Resource ownership** — kiểm tra chủ sở hữu tài nguyên, chống **IDOR / Broken Access Control**:

```java
// KHÔNG chỉ kiểm tra ROLE_OWNER mà phải kiểm tra đúng chủ sở hữu
if (!field.getOwner().getId().equals(currentUserId)) {
    throw new ForbiddenException("Bạn không có quyền thao tác trên sân này");
}
```

`ForbiddenException` là exception của dự án (`exception/ForbiddenException.java`), được
`GlobalExceptionHandler` chuyển thành phản hồi `403`. Vai trò hiện tại lấy qua `SecurityUtils`.

Các chỗ đang kiểm tra quyền sở hữu:

| Nơi kiểm tra | Quy tắc |
|---|---|
| `FieldServiceImpl` | Chỉ chủ sân được sửa/xóa sân của mình |
| `BookingServiceImpl.getById` | Chỉ người đặt, chủ sân của đơn đó, hoặc `ADMIN` được xem |
| `BookingServiceImpl.cancel` | Chỉ người đặt được hủy đơn của chính mình |
| `BookingServiceImpl.confirm` / `reject` | Chỉ chủ sân của đơn đó |
| `ReviewServiceImpl` | Chỉ người đặt được đánh giá đơn của chính mình |

## Ví dụ tình huống bảo mật
- Owner B gọi `PUT /api/fields/1` (sân của Owner A) → `403 Forbidden`.
- USER gọi API `/api/admin/**` → `403 Forbidden`.
- Không có JWT trên endpoint bảo mật → `401 Unauthorized`.

## Điểm rà soát bảo mật bắt buộc
Authentication, Authorization, Resource ownership, IDOR, Broken Access Control,
Password exposure, JWT secret exposure.
