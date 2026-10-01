# Kiểm thử (Testing)

## Công cụ
JUnit 5, Mockito, Spring Boot Test (MockMvc). Test dùng **H2 in-memory** (profile `test`)
nên chạy độc lập, không cần MySQL thật.

## Cách chạy
```bash
mvn test
```

## Phân loại
- **Unit test** (`@ExtendWith(MockitoExtension.class)`): kiểm tra Service, mock Repository —
  hiện có cho `AuthServiceImpl`, `BookingServiceImpl`, `FieldServiceImpl`.
- **Integration test** (`@SpringBootTest` + `@ActiveProfiles("test")`): kiểm tra luồng thật qua
  nhiều tầng (filter bảo mật → controller → service → JPA), dùng H2.

Chưa dùng slice test `@WebMvcTest`; các controller được kiểm qua integration test.

## Test hiện có (23 test, PASS)
| Test | Loại | Nội dung |
|---|---|---|
| `HealthControllerTest` | `@SpringBootTest` | `GET /api/health` → 200, đúng JSON |
| `FootballBookingApplicationTests` | `@SpringBootTest` | Spring context nạp thành công trên H2 |
| `GlobalExceptionHandlerIntegrationTest` | `@SpringBootTest` | Đường dẫn lạ → 404 (không phải 500) |
| `BookingServiceImplTest` | Unit (Mockito) | Booking hợp lệ, sai giờ, field không tồn tại, field inactive, trùng lịch (409), tính tiền, hủy |
| `FieldServiceImplTest` | Unit (Mockito) | Quyền sở hữu (403), cập nhật, xóa sân đã có booking (409) |
| `AuthServiceImplTest` | Unit (Mockito) | Trùng email (409), mã hóa mật khẩu, đăng nhập trả JWT, sai mật khẩu (401) |
| `AuthApiIntegrationTest` | `@SpringBootTest` + MockMvc | Đăng ký→đăng nhập→xem hồ sơ, 401 khi thiếu token, 403 khi USER gọi ADMIN, 400 validation |

Chạy: `mvn test`. Tất cả dùng H2 in-memory (profile `test`), không cần MySQL.

## Chưa được bao phủ
- **Test đồng thời** — chưa có test bắn N request đặt cùng một khung giờ để chứng minh đúng một đơn
  thành công và phần còn lại nhận `409`. Đây là điểm cần bổ sung quan trọng nhất, vì cơ chế chống
  trùng lịch (khóa bi quan) chỉ thực sự được chứng minh bằng loại test này. Lưu ý H2 không mô phỏng
  giống hệt hành vi khóa của MySQL/InnoDB, nên test đồng thời nên chạy trên MySQL thật.
- **Service chưa có unit test**: `UserServiceImpl`, `ReviewServiceImpl`, `AdminServiceImpl`,
  `StatisticsServiceImpl`, `FieldTypeServiceImpl`.
- **Smoke test trên MySQL thật** — toàn bộ test hiện chạy trên H2.
