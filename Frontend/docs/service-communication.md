# Luồng giao tiếp Frontend–Backend

```text
React page/component
    → TanStack Query hook
    → service theo nghiệp vụ (services/api/resources.js)
    → Axios instance (services/api/client.js)
    → HTTP REST /api
    → Spring Controller
    → Spring Service (nghiệp vụ/transaction)
    → Spring Data Repository
    → MySQL
```

Response đi ngược qua REST API về Axios; service lấy `ApiResponse.data`, TanStack Query quản lý trạng thái tải/lỗi/cache, rồi UI hiển thị dữ liệu.

## Trách nhiệm

- **Page/component:** thu thập dữ liệu nhập, gọi hook/mutation, hiển thị loading/error/empty/success. Không chứa cấu hình URL backend hoặc tự truy cập MySQL.
- **TanStack Query:** `useQuery` đọc dữ liệu, `useMutation` ghi dữ liệu; query key dùng chung trong `src/hooks/useApi.js`. Khi dữ liệu liên quan bị thay đổi, các query tương ứng được invalidate.
- **Axios service:** `src/services/api/resources.js` gom request theo nghiệp vụ; `src/services/api/client.js` cấu hình base URL, timeout, header JWT và chuyển thông điệp lỗi API/mạng sang thông báo tiếng Việt.
- **Vite development proxy:** chuyển tiếp `/api` đến `VITE_BACKEND_PROXY_TARGET` (mặc định `http://localhost:8080`). Proxy dùng trong dev để frontend cùng origin với server Vite; nó không thay đổi code hoặc tạo backend mới.
- **Spring Controller:** ánh xạ HTTP method/path, đọc tham số/body, gọi service và bọc kết quả theo `ApiResponse<T>` (trừ `/api/health`).
- **Spring Service:** xác thực nghiệp vụ, phân quyền/quyền sở hữu và transaction; ví dụ `BookingServiceImpl` khóa sân, kiểm tra booking chồng giờ và tính giá.
- **Repository:** Spring Data JPA được service sử dụng để đọc/ghi entity qua MySQL. React không kết nối trực tiếp tới repository hoặc database.

## URL và CORS

Trong development, giữ `VITE_API_BASE_URL=/api`; Vite chuyển tiếp đến `VITE_BACKEND_PROXY_TARGET`. Nếu frontend được cấu hình gọi thẳng `http://localhost:8080/api` (đặc biệt khi build/deploy), backend phải cho phép chính xác origin của frontend trong `CORS_ALLOWED_ORIGINS`. Backend hiện có mặc định CORS `http://localhost:3000`, không phải cổng Vite 5173; hãy điều chỉnh cấu hình môi trường backend khi không dùng proxy. Không nhúng secret backend vào biến `VITE_*`.
