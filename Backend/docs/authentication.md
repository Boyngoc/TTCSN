# Xác thực (Authentication)

> **Đã triển khai.** JWT stateless + Spring Security + BCrypt.

## Đăng ký — `POST /api/auth/register`
Request:
```json
{ "fullName": "Nguyen Van A", "email": "user@gmail.com", "password": "123456", "phone": "0901234567" }
```
- Mật khẩu **bắt buộc** mã hóa bằng **BCrypt** trước khi lưu (không lưu plaintext).
- Email trùng → `409 Conflict`.
- Ràng buộc đầu vào: `fullName` không rỗng, `email` đúng định dạng, `password` tối thiểu **6 ký tự**,
  `phone` (không bắt buộc) phải gồm 10 chữ số bắt đầu bằng `0`. Sai → `400` kèm `errors` theo từng trường.
- Đăng ký **luôn** tạo tài khoản `role = USER`, `status = ACTIVE`. Client không thể tự chọn vai trò.

## Đăng nhập — `POST /api/auth/login`
Response khi thành công:
```json
{
  "status": 200,
  "message": "Đăng nhập thành công",
  "data": {
    "accessToken": "<JWT>",
    "tokenType": "Bearer",
    "user": { "id": 1, "fullName": "Nguyen Van A", "role": "USER" }
  }
}
```

## JWT
- Frontend gửi kèm mọi request cần xác thực: `Authorization: Bearer <JWT>`.
- **Khóa ký (`JWT_SECRET`) không hard-code** — đọc từ biến môi trường.
- Filter `JwtAuthenticationFilter` đọc token, xác thực và nạp thông tin người dùng vào `SecurityContext`.
- Thiếu/hết hạn token trên endpoint bảo mật → `401 Unauthorized`. Sai mật khẩu khi đăng nhập → `401`.
- Thời hạn token: **24 giờ** (`JWT_EXPIRATION_MS`, mặc định `86400000`).
- API **stateless**: `SessionCreationPolicy.STATELESS`, CSRF đã tắt vì không dùng cookie phiên.
  Token được lưu và gắn vào request bởi Frontend.

## Chưa có
- **Refresh token** — token hết hạn thì phải đăng nhập lại.
- **Endpoint `logout`** — do token là stateless và không có danh sách thu hồi (blacklist),
  việc đăng xuất do Frontend tự xử lý bằng cách xóa token đã lưu.
- **Đổi mật khẩu** — `PUT /api/users/me` chỉ sửa `fullName` và `phone`.
