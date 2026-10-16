package com.example.footballbooking.service;

import java.util.Map;

/**
 * Nghiệp vụ quản lý cài đặt hệ thống (thương hiệu, hotline, logo, chân trang...).
 */
public interface SystemSettingService {

    /** Lấy cấu hình website hiện tại (trả về giá trị mặc định nếu chưa lưu). */
    Map<String, Object> getSiteSettings();

    /** Cập nhật cấu hình website. */
    Map<String, Object> updateSiteSettings(Map<String, Object> settings);

    /** Khôi phục cấu hình website về mặc định gốc. */
    Map<String, Object> resetSiteSettings();
}
