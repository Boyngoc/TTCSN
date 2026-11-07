# Cài đặt và chạy Frontend

## Yêu cầu

- Node.js 20 trở lên và npm.
- Backend Spring Boot chạy tại `http://localhost:8080` để kiểm tra các luồng nghiệp vụ.
- Frontend dùng React 18, Vite 5, JavaScript/JSX, Tailwind CSS, Axios, TanStack Query v5 và React Router DOM.

## Cài dependencies

Từ thư mục `Frontend`:

```powershell
npm install
```

## Cấu hình môi trường

Tùy chọn sao chép `.env.example` thành `.env`:

```powershell
Copy-Item .env.example .env
```

- `VITE_API_BASE_URL=/api`: base path REST dùng ở frontend.
- `VITE_BACKEND_PROXY_TARGET=http://localhost:8080`: đích Vite proxy ở development.

Hai giá trị mẫu không phải credentials. Không đặt JWT secret, mật khẩu database hoặc bí mật backend trong biến `VITE_*`; giá trị `VITE_*` được đóng gói và có thể đọc bởi trình duyệt.

## Chạy, build và preview

```powershell
npm run dev
npm run build
npm run preview
```

Vite dev server mặc định mở tại `http://localhost:5173`. Frontend không cần thêm CORS origin khi gọi `/api` cùng origin qua Vite proxy. Nếu đổi sang gọi API trực tiếp, cấu hình `CORS_ALLOWED_ORIGINS` ở backend cho origin chính xác của frontend.

## Kiểm tra tích hợp

1. Khởi chạy backend và database theo tài liệu backend.
2. Kiểm tra `http://localhost:8080/api/health`.
3. Khởi động Vite và mở `http://localhost:5173/san`.
4. Xác nhận danh sách sân/loại sân được trả từ API. Nếu backend dừng, frontend hiển thị lỗi kết nối và không thay bằng dữ liệu giả.
5. Đăng nhập bằng tài khoản đã được cấp trong môi trường của bạn để thử các chức năng tương ứng với vai trò.

Vite proxy chỉ dành cho development; khi triển khai, cung cấp base URL phù hợp và cấu hình CORS ở backend hoặc proxy/reverse proxy của môi trường triển khai. API nghiệp vụ và quy tắc truy cập được mô tả trong `frontend-api-integration.md`.
