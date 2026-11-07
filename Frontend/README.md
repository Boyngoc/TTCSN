# Football Booking Frontend

Frontend React 18 + Vite 5 (JavaScript/JSX) cho backend Spring Boot hiện có. Yêu cầu Node.js 20 trở lên.

## Chạy local

1. Chạy backend tại `http://localhost:8080` và đảm bảo `/api/health` hoạt động.
2. Tại thư mục `Frontend`, chạy `npm install`.
3. Sao chép `.env.example` thành `.env` nếu cần thay đổi cấu hình.
4. Chạy `npm run dev`, sau đó mở `http://localhost:5173`.

Mặc định Vite chuyển tiếp `/api` tới backend; proxy bỏ header `Origin` để không vướng cấu hình CORS backend hiện chỉ cho phép `http://localhost:3000`. Khi gọi backend trực tiếp, hãy cập nhật CORS phía backend cho origin frontend.

JWT chỉ được giữ trong bộ nhớ của tab trình duyệt, không ghi vào `localStorage` hay `sessionStorage`. Tải lại trang sẽ yêu cầu đăng nhập lại; backend hiện chưa cung cấp refresh token hoặc cookie HttpOnly.

## Luồng được kết nối

- Tra cứu sân và loại sân, xem chi tiết, tìm kiếm theo từ khóa/địa chỉ/loại sân/khoảng giá.
- Đăng ký `USER`, đăng nhập JWT, hồ sơ người dùng.
- Tạo, xem, hủy booking; backend tính giá và xác nhận trạng thái cuối cùng.
- Chủ sân quản lý sân, xem booking và xác nhận/từ chối booking.
- Admin xem thống kê, quản lý trạng thái người dùng/sân và xem danh sách booking.
- Xem và tạo đánh giá theo booking đã xác nhận/hoàn thành.

Backend hiện không có API xem giao dịch/thanh toán, CRUD loại sân, hay thống kê riêng cho OWNER; frontend không tạo các luồng này.

## Dependency audit

`npm audit --omit=dev` hiện không báo lỗ hổng trong dependency runtime. Audit đầy đủ có cảnh báo ở một số dependency phục vụ build/dev của Vite 5 và Tailwind CSS 3; `npm audit fix --force` đề xuất nâng major vượt stack bắt buộc nên không được tự động áp dụng. Hãy đánh giá lại khi nhóm cho phép đổi major framework/tooling.
