# Authentication và bảo mật giao diện

## Xác thực

- Đăng nhập: `POST /api/auth/login` body `{ email, password }`. Kết quả bọc trong `ApiResponse`; thông tin phiên nằm trong `data`, gồm `accessToken`, `tokenType`, và `user { id, fullName, role }`.
- Đăng ký: `POST /api/auth/register` body `{ fullName, email, password, phone }`. Backend luôn tạo `USER`; giao diện không cho chọn hoặc tự nâng vai trò.
- JWT được giữ trong React context và biến bộ nhớ của Axios client trong tab hiện tại. Không lưu token hoặc mật khẩu vào `localStorage`/`sessionStorage`, không ghi token vào log. Đóng hoặc tải lại trang sẽ cần đăng nhập lại.
- Axios request interceptor chỉ thêm `Authorization: Bearer <token>` khi có token. Backend hiện không có endpoint refresh token hay xác thực bằng cookie HttpOnly; frontend không giả định hai cơ chế này.

## Quyền và routes

| Route giao diện | Vai trò |
|---|---|
| `/`, `/san`, `/san/:id`, `/dang-nhap`, `/dang-ky` | Công khai |
| `/dat-san-cua-toi` | `USER` |
| `/tai-khoan` | `USER`, `OWNER`, `ADMIN` |
| `/chu-san` | `OWNER` |
| `/quan-tri` | `ADMIN` |

Route guard hỗ trợ UX và điều hướng; quyền thực sự được backend kiểm tra qua Spring Security và kiểm tra quyền sở hữu ở service. UI không phải lớp bảo mật thay thế server.

## Lỗi xác thực và phân quyền

- `401`: nếu có phiên đang hoạt động, Axios xóa token trong bộ nhớ và phát sự kiện để AuthContext đăng xuất; thông tin cache TanStack Query được xóa.
- `403`: request bị từ chối do không đủ quyền; hiển thị thông báo từ API và không tự thay đổi quyền.
- Các lỗi `400`/`404`/`409` hiển thị thông báo backend hoặc lỗi validation; lỗi không có response được nhận diện là lỗi kết nối.

Backend chặn `/api/admin/**` cho `ADMIN`, `/api/owner/**` cho `OWNER`; service còn kiểm tra quyền sở hữu tài nguyên. Đăng ký công khai không cho tạo tài khoản `OWNER`/`ADMIN`.
