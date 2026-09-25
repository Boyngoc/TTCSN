Yêu cầu hệ thống quản lý đặt lịch sân bóng đá (QLSB)
Trạng thái: BẢN NHÁP để review. Chưa được duyệt. Đề tài: Xây dựng và phát triển hệ thống quản lý đặt lịch sân bóng đá.

1. Tổng quan
1.1 Mục đích
Website dành cho một chủ cơ sở sân bóng vận hành trực tiếp. Khách xem sân, tra lịch trống và đặt sân online. Chủ sân duyệt đơn, quản lý sân/giá và xem doanh thu.

1.2 Phạm vi
Đăng ký/đăng nhập, quản lý sân / loại sân / khung giờ / bảng giá, đặt và hủy sân, quản lý booking, quản lý khách hàng, dashboard thống kê.

1.3 Ngoài phạm vi (bản đầu)
Thanh toán online qua cổng thanh toán (chỉ hiển thị hướng dẫn chuyển khoản / QR tĩnh)
Nhiều cơ sở / chi nhánh
Gửi email / SMS
Ứng dụng mobile native
2. Vai trò
Vai trò	Quyền chính
CUSTOMER	Xem sân, tra lịch trống, đặt sân, xem lịch sử, hủy sân theo quy định, sửa hồ sơ, đổi mật khẩu
ADMIN	Dashboard, CRUD sân / loại sân / khung giờ, duyệt / hủy / hoàn thành booking, đặt sân hộ khách, quản lý khách hàng
3. Luồng nghiệp vụ
Khách đăng ký / đăng nhập → chọn sân → chọn ngày → xem lưới khung giờ (xanh: trống, xám/đỏ: đã đặt).
Khách chọn giờ, ghi chú, xác nhận → booking PENDING (đã giữ chỗ), hệ thống hiển thị hướng dẫn chuyển khoản.
Admin duyệt (CONFIRMED) hoặc hủy (CANCELLED).
Sau giờ đá, admin đánh dấu COMPLETED (tính vào doanh thu).
Khách được hủy trước giờ đá tối thiểu N giờ (mặc định N = 24, cấu hình được).
Khách gọi điện hoặc đến trực tiếp → admin đặt hộ (direct).
4. Yêu cầu chức năng
4.1 Xác thực & phân quyền
FR-01: Đăng ký (họ tên, email, SĐT, mật khẩu ≥ 8 ký tự). Role mặc định CUSTOMER.
FR-02: Đăng nhập, đăng xuất, lấy thông tin hiện tại (/me). Tài khoản is_active = false không đăng nhập được.
FR-03: Chặn CUSTOMER truy cập tài nguyên ADMIN (403). Chưa đăng nhập trả 401.
4.2 Sân & khung giờ
FR-04: Danh sách sân, lọc theo loại sân, trạng thái, khoảng giá. Xem chi tiết sân.
FR-05: Admin CRUD loại sân (Sân 5 / 7 / 11) và sân con (tên, loại, trạng thái ACTIVE / MAINTENANCE, giá/giờ).
FR-06: Admin CRUD khung giờ (06:00–23:00, mỗi ca 1 giờ, hệ số giá hoặc giá riêng). Không được xóa khung giờ / sân đã có booking (chuyển sang vô hiệu hóa).
FR-07: GET availability trả ma trận trạng thái từng khung giờ theo sân + ngày.
4.3 Đặt sân (cốt lõi)
FR-08: Khách tạo booking cho 1 sân, 1 ngày, gồm 1 hoặc nhiều khung giờ liên tiếp. Không được đặt ngày/giờ đã qua, không quá 30 ngày tới, không đặt sân đang bảo trì.
FR-09: Không bao giờ trùng lịch: hai booking đang hoạt động (PENDING / CONFIRMED / COMPLETED) không được chồng lấn cùng sân + ngày + giờ, kể cả khi hai người bấm cùng lúc. Trùng thì trả 409 Conflict.
FR-10: Tổng tiền = Σ (giá sân/giờ × hệ số hoặc giá riêng của từng khung giờ), tính ở server.
FR-11: Khách xem lịch sử đặt chỗ, hủy booking khi còn ≥ N giờ. Hủy xong khung giờ được giải phóng ngay.
FR-12: Admin xem tất cả booking (lọc theo ngày, sân, trạng thái), đổi trạng thái theo bảng chuyển hợp lệ, đặt hộ khách (khách có tài khoản hoặc khách vãng lai: tên + SĐT).
4.4 Khách hàng & hồ sơ
FR-13: Khách sửa họ tên, SĐT, đổi mật khẩu (nhập mật khẩu cũ).
FR-14: Admin xem danh sách khách, tìm kiếm, khóa / mở tài khoản, xem lịch sử đặt của từng khách.
4.5 Thống kê
FR-15: Dashboard: doanh thu hôm nay / tháng, số đơn mới, số sân đang sử dụng, tỷ lệ lấp đầy, biểu đồ doanh thu theo ngày / tháng, bảng booking gần nhất.
5. Quy tắc nghiệp vụ
Mã	Quy tắc
BR-01	Chuyển trạng thái hợp lệ: PENDING→CONFIRMED, PENDING→CANCELLED, CONFIRMED→CANCELLED, CONFIRMED→COMPLETED. Các chuyển khác bị từ chối.
BR-02	Booking CANCELLED không chiếm chỗ. Chỉ COMPLETED tính doanh thu.
BR-03	Khách chỉ hủy được booking PENDING / CONFIRMED của chính mình, trước giờ đá ≥ N giờ. Admin hủy không bị giới hạn.
BR-04	Mọi mốc thời gian theo múi giờ Asia/Ho_Chi_Minh.
BR-05	Mật khẩu luôn hash bcrypt, không bao giờ trả về qua API.
BR-06	Giá tại thời điểm đặt được lưu vào booking, đổi giá sau đó không ảnh hưởng đơn cũ.
6. Giao diện
Khách hàng: Trang chủ / danh sách sân (bộ lọc) → Chi tiết sân + DatePicker + lưới khung giờ → Modal xác nhận (tóm tắt, ghi chú, tổng tiền, QR VietQR minh họa) → Lịch sử đặt (badge trạng thái, nút "Hủy sân" có dialog xác nhận) → Hồ sơ → Đăng ký / Đăng nhập.

Admin: Layout riêng (Sidebar + Topbar), Dashboard, Quản lý sân & khung giờ, Master Calendar / Timeline (mọi sân theo ngày), Quản lý booking, Quản lý khách hàng.

UX chung: responsive, loading (spinner / skeleton), toast, trạng thái lỗi (không trắng trang).

7. Yêu cầu phi chức năng
Chống race condition (xem technical_architecture.md, mục 5).
Validate cả client (Zod) và server (class-validator). Lỗi API trả cùng một cấu trúc.
Chạy bằng Docker Compose, seed tự động và chạy lặp lại được (idempotent).
Có test tự động cho luồng đặt sân và test đồng thời.
8. Mô hình dữ liệu
User(id, email UQ, phone, password_hash, full_name, role, is_active, created_at)
FieldType(id, name UQ, description)
FootballField(id, field_type_id FK, name UQ, status, price_per_hour, description, image_url)
TimeSlot(id, start_time, end_time, price_multiplier, custom_price?, is_active)   UQ(start_time, end_time)
Booking(id, user_id FK?, guest_name?, guest_phone?, field_id FK, booking_date,
        start_time, end_time, total_price, status, note, created_by FK, created_at)
BookingSlot(id, booking_id FK, field_id, booking_date, time_slot_id FK,
            active_key TINYINT NULL)     UQ(field_id, booking_date, time_slot_id, active_key)
Booking.user_id cho phép NULL để hỗ trợ khách vãng lai do admin đặt hộ.

9. API (tóm tắt)
Nhóm	Endpoint
Auth	POST /api/auth/register, /login, /logout, GET /api/auth/me
Public	GET /api/fields, /api/fields/:id, /api/field-types, /api/time-slots, /api/availability?field_id=&date=
Customer	POST /api/bookings, GET /api/bookings/my-history, PATCH /api/bookings/:id/cancel, PATCH /api/users/me, PATCH /api/users/me/password
Admin	CRUD /api/admin/fields, /api/admin/field-types, /api/admin/time-slots; GET /api/admin/bookings; PATCH /api/admin/bookings/:id/status; POST /api/admin/bookings/direct; GET /api/admin/customers, /api/admin/customers/:id/bookings, PATCH /api/admin/customers/:id/active; GET /api/admin/statistics
10. Tiêu chí nghiệm thu chính
Đăng ký → đăng nhập → /me thành công. Customer gọi API admin nhận 403.
Đặt slot trống thành công. Đặt lại đúng slot đó nhận 409, không sinh bản ghi trùng.
20 request đặt cùng slot đồng thời: đúng 1 thành công, 19 nhận 409.
Hủy trước giờ đá < N giờ bị từ chối. Hủy hợp lệ giải phóng slot.
Dashboard hiển thị số liệu khớp với dữ liệu seed.
11. Câu hỏi mở (cần người review cho ý kiến)
Đăng nhập bằng email + mật khẩu (thay vì username / SĐT). Đồng ý không?
Đơn mới ở trạng thái PENDING và giữ chỗ ngay, admin duyệt sau. Hay tự CONFIRMED?
N mặc định = 24 giờ, giới hạn đặt trước tối đa 30 ngày. Có muốn đổi không?
Một booking được đặt nhiều khung giờ liên tiếp, hay chỉ 1 khung giờ mỗi đơn?
PENDING quá lâu không được duyệt có tự hủy sau X phút không? (Đề xuất: chưa làm ở bản đầu.)
------------------------------------------------------------------------------------------------
Technical Architecture: Hệ thống đặt lịch sân bóng đá (QLSB)
Trạng thái: BẢN NHÁP để review. Chưa được duyệt. Môi trường: Docker, chạy localhost, hệ thống nội bộ cho một cơ sở sân bóng.

1. Công nghệ (giữ stack hiện có của repo)
Tầng	Công nghệ
Frontend	React 18 + Vite 5, React Router 6, TanStack Query 5, Axios, React Hook Form + Zod, Tailwind CSS 3
Backend	Node 20, NestJS 10, Prisma 5, @nestjs/jwt (không Passport), bcrypt (cost 12), class-validator, Swagger (/api/docs)
Database	MySQL 8.0 (InnoDB, REPEATABLE READ)
Hạ tầng	Docker Compose: mysql, backend, frontend
Biểu đồ doanh thu dùng SVG / Tailwind tự vẽ, không thêm thư viện. Repo đang cấm thêm thư viện ngoài danh sách trên.

2. Cấu trúc thư mục
backend/src/{auth,users,field-types,fields,time-slots,availability,bookings,statistics,common}
backend/prisma/{schema.prisma,migrations,seed.ts}
frontend/src/{pages/{customer,admin},components/{layout,ui},hooks,lib,schemas,types}
docker-compose.yml   docs/   specs/
3. Xác thực & phân quyền
Access token 1h, refresh token 7d, lưu trong cookie HttpOnly (SameSite=Lax). Đăng xuất xóa cookie.
JwtAuthGuard xác thực. RolesGuard + @Roles('ADMIN') phân quyền. Mọi route /api/admin/* bắt buộc ADMIN.
Định danh đăng nhập: email + mật khẩu (SĐT là thông tin hồ sơ bắt buộc).
4. Quy ước API
Tiền tố /api.
Lỗi trả dạng { statusCode, error, message, details? }.
Mã dùng: 400 validate, 401, 403, 404, 409 trùng lịch, 422 vi phạm quy tắc nghiệp vụ (ví dụ hủy quá hạn).
Phân trang ?page=&pageSize= cho danh sách admin.
5. Chống trùng lịch (thiết kế cốt lõi)
Dùng ba lớp bảo vệ:

Transaction + khóa bi quan. Trong prisma.$transaction, chạy SELECT id FROM football_field WHERE id = ? FOR UPDATE. Việc này tuần tự hóa mọi đặt chỗ của cùng một sân, còn sân khác vẫn chạy song song.
Kiểm tra nghiệp vụ trong khóa: sân tồn tại, ACTIVE, ngày / giờ hợp lệ, các slot liên tiếp, chưa có BookingSlot hoạt động nào trùng. Nếu trùng thì rollback và trả 409.
Ràng buộc DB làm chốt chặn cuối. Bảng BookingSlot có UNIQUE(field_id, booking_date, time_slot_id, active_key). active_key = 1 khi booking đang hoạt động và NULL khi bị hủy. MySQL coi NULL là khác nhau nên slot của đơn đã hủy không chặn đặt lại. Lỗi P2002 của Prisma được ánh xạ thành 409.
Mỗi booking sinh các dòng BookingSlot tương ứng. Khi hủy thì đặt active_key = NULL. Cách này tránh phải xử lý khoảng thời gian chồng lấn phức tạp, vì MySQL không có exclusion constraint.

6. Tính giá và múi giờ
Server tính total_price và lưu vào booking (BR-06).
booking_date là kiểu DATE, giờ là TIME. So sánh "trước giờ đá N giờ" tính theo Asia/Ho_Chi_Minh (TZ được đặt trong Docker).
7. Seed (idempotent, dùng upsert)
1 Admin, 2 Customer.
3 loại sân (5 / 7 / 11) và 4 sân con (2 sân 5, 1 sân 7, 1 sân 11).
Khung giờ 06:00–23:00, mỗi ca 1 giờ, giờ cao điểm 17:00–21:00 hệ số 1.5.
Vài booking mẫu ở các trạng thái khác nhau (không trùng lịch).
Tài khoản và mật khẩu dùng thử hardcode trong seed và ghi trong README.
8. Docker và cấu hình
Giữ chính sách "không dùng .env, hardcode trong docker-compose.yml" như tài liệu của dự án trước.
Backend khởi động: prisma migrate deploy → prisma db seed → start:dev.
9. Kiểm thử
Backend: Jest, gồm unit test tính giá và chuyển trạng thái, và integration test luồng đặt sân, kể cả test đồng thời (Promise.all 20 request → đúng 1 thành công).
Chạy lint, type-check và build cả hai phía trước khi báo hoàn thành.
