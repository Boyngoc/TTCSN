# Luồng đặt sân và lưu dữ liệu

Luồng dưới đây phản ánh `BookingController`, `BookingServiceImpl`, DTO, repository và entity của backend. Browser không kết nối trực tiếp MySQL.

1. Người chơi đăng nhập bằng `POST /api/auth/login`; backend trả JWT ở `data.accessToken`. Frontend gửi JWT bằng header `Authorization: Bearer <token>`.
2. Người dùng tải danh sách/chi tiết sân qua `GET /api/fields` và `GET /api/fields/{id}`. Chỉ gửi yêu cầu đặt sân nếu sân hiển thị `ACTIVE`.
3. Người dùng chọn `fieldId`, `bookingDate`, `startTime`, `endTime`. Frontend kiểm tra ngày, trường bắt buộc và giờ bắt đầu trước giờ kết thúc; không tính hoặc gửi `totalPrice`.
4. Frontend gửi `POST /api/bookings` với `{ fieldId, bookingDate, startTime, endTime }`.
5. Backend kiểm tra ngày/giờ, khóa bản ghi sân bằng `findByIdForUpdate`, xác nhận sân tồn tại và `ACTIVE`, kiểm tra khung giờ giao nhau của booking `PENDING`/`CONFIRMED`, rồi lấy giá sân.
6. Backend tự tính tiền từ giá theo giờ và thời lượng. Nếu có lỗi, API trả HTTP/status phù hợp (ví dụ `400`, `404`, `409`); UI hiển thị lỗi backend, không giả lập thành công.
7. Trong transaction, backend tạo booking `PENDING` với tổng tiền đã tính và tạo bản ghi payment cơ bản có số tiền tương ứng, phương thức `CASH`, trạng thái `PENDING`; cả hai được lưu thông qua repository.
8. Chỉ sau response thành công từ backend, UI hiển thị booking ID, `totalPrice` và `status` từ response. Frontend invalidate cache danh sách booking.
9. Chủ sân tải booking của mình qua `GET /api/owner/bookings`; xác nhận/từ chối booking `PENDING` bằng các API tương ứng. Backend kiểm tra quyền sở hữu sân. Người đặt có thể hủy booking `PENDING` hoặc `CONFIRMED` bằng `POST /api/bookings/{id}/cancel`.

Khóa và kiểm tra lịch ở backend là nguồn quyết định cuối cùng khi nhiều người gửi cùng khung giờ. Validation phía trình duyệt chỉ hỗ trợ nhập liệu, không giữ chỗ, không bảo đảm không trùng lịch. Backend hiện không cung cấp API thanh toán trực tuyến hoặc tra cứu giao dịch cho người dùng; payment được tạo tự động ở mức cơ bản, không đồng nghĩa với thanh toán đã hoàn tất.
