package com.example.footballbooking.controller;

import com.example.footballbooking.dto.ApiResponse;
import com.example.footballbooking.service.SystemSettingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * REST API quản lý cấu hình giao diện & cài đặt toàn hệ thống.
 */
@RestController
@Tag(name = "Settings", description = "Cấu hình website và thông tin hệ thống")
public class SettingController {

    private final SystemSettingService systemSettingService;

    public SettingController(SystemSettingService systemSettingService) {
        this.systemSettingService = systemSettingService;
    }

    /**
     * Lấy thông tin cấu hình website (công khai cho toàn bộ người dùng, không cần đăng nhập).
     */
    @GetMapping("/api/settings")
    @Operation(summary = "Lấy cấu hình website (công khai)")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPublicSettings() {
        return ResponseEntity.ok(ApiResponse.success(systemSettingService.getSiteSettings()));
    }

    /**
     * Admin lấy cấu hình website.
     */
    @GetMapping("/api/admin/settings")
    @Operation(summary = "Lấy cấu hình website cho Admin")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAdminSettings() {
        return ResponseEntity.ok(ApiResponse.success(systemSettingService.getSiteSettings()));
    }

    /**
     * Admin cập nhật cấu hình website (lưu vào database MySQL).
     */
    @PutMapping("/api/admin/settings")
    @Operation(summary = "Cập nhật cấu hình website (Chỉ Admin)")
    public ResponseEntity<ApiResponse<Map<String, Object>>> updateSettings(@RequestBody Map<String, Object> settings) {
        Map<String, Object> updated = systemSettingService.updateSiteSettings(settings);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật cài đặt website thành công", updated));
    }

    /**
     * Admin khôi phục cấu hình website về mặc định.
     */
    @PostMapping("/api/admin/settings/reset")
    @Operation(summary = "Khôi phục cấu hình website về mặc định (Chỉ Admin)")
    public ResponseEntity<ApiResponse<Map<String, Object>>> resetSettings() {
        Map<String, Object> reset = systemSettingService.resetSiteSettings();
        return ResponseEntity.ok(ApiResponse.success("Đã khôi phục cài đặt gốc mặc định", reset));
    }
}
