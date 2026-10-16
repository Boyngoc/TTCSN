package com.example.footballbooking.service.impl;

import com.example.footballbooking.entity.SystemSetting;
import com.example.footballbooking.repository.SystemSettingRepository;
import com.example.footballbooking.service.SystemSettingService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Hiện thực nghiệp vụ cài đặt hệ thống lưu trong bảng {@code system_settings}.
 */
@Service
public class SystemSettingServiceImpl implements SystemSettingService {

    private static final Logger log = LoggerFactory.getLogger(SystemSettingServiceImpl.class);
    private static final String SITE_SETTINGS_KEY = "site_settings";

    private final SystemSettingRepository systemSettingRepository;
    private final ObjectMapper objectMapper;

    public SystemSettingServiceImpl(SystemSettingRepository systemSettingRepository, ObjectMapper objectMapper) {
        this.systemSettingRepository = systemSettingRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getSiteSettings() {
        Map<String, Object> merged = new LinkedHashMap<>(getDefaultSiteSettings());
        systemSettingRepository.findById(SITE_SETTINGS_KEY).ifPresent(setting -> {
            try {
                if (setting.getSettingValue() != null && !setting.getSettingValue().isBlank()) {
                    Map<String, Object> saved = objectMapper.readValue(
                            setting.getSettingValue(),
                            new TypeReference<Map<String, Object>>() {}
                    );
                    merged.putAll(saved);
                }
            } catch (Exception e) {
                log.error("Không thể giải mã cấu hình site_settings từ cơ sở dữ liệu: {}", e.getMessage());
            }
        });
        return merged;
    }

    @Override
    @Transactional
    public Map<String, Object> updateSiteSettings(Map<String, Object> settings) {
        Map<String, Object> current = new LinkedHashMap<>(getDefaultSiteSettings());
        if (settings != null) {
            current.putAll(settings);
        }

        try {
            String json = objectMapper.writeValueAsString(current);
            SystemSetting entity = systemSettingRepository.findById(SITE_SETTINGS_KEY)
                    .orElseGet(() -> new SystemSetting(SITE_SETTINGS_KEY, json));
            entity.setSettingValue(json);
            systemSettingRepository.save(entity);
            log.info("Đã cập nhật cài đặt site_settings vào cơ sở dữ liệu MySQL.");
        } catch (Exception e) {
            log.error("Lỗi khi lưu site_settings vào DB: {}", e.getMessage(), e);
            throw new RuntimeException("Không thể lưu cấu hình hệ thống: " + e.getMessage());
        }

        return current;
    }

    @Override
    @Transactional
    public Map<String, Object> resetSiteSettings() {
        systemSettingRepository.deleteById(SITE_SETTINGS_KEY);
        log.info("Đã xóa cấu hình tùy chỉnh site_settings trong DB và trả về mặc định.");
        return getDefaultSiteSettings();
    }

    private Map<String, Object> getDefaultSiteSettings() {
        Map<String, Object> defaults = new LinkedHashMap<>();
        defaults.put("siteName", "SANBONG");
        defaults.put("siteBadge", "PRO");
        defaults.put("siteTitle", "SANBONG PRO - Hệ Thống Đặt Sân Bóng Đá Trực Tuyến");
        defaults.put("siteDescription", "Nền tảng kết nối trực tiếp cầu thủ và chủ sân bóng đá. Đặt sân tức thì, tra cứu số điện thoại chủ sân và xem định vị chính xác.");
        defaults.put("logoType", "icon");
        defaults.put("logoUrl", "");
        defaults.put("phone", "0912 345 678");
        defaults.put("email", "hotro@sanbongpro.vn");
        defaults.put("address", "Hà Nội / TP. Hồ Chí Minh / Đà Nẵng");
        defaults.put("workingHours", "06:00 - 23:00 (Tất cả các ngày)");
        defaults.put("zaloUrl", "https://zalo.me/0912345678");
        defaults.put("facebookUrl", "https://facebook.com/sanbongpro");
        defaults.put("footerDescription", "Nền tảng kết nối trực tiếp cầu thủ và chủ sân bóng đá. Đặt sân tức thì, tra cứu số điện thoại chủ sân và xem định vị chính xác.");
        defaults.put("copyrightText", "Bản quyền thuộc về hệ thống đặt sân bóng trực tuyến.");
        defaults.put("announcementText", "🎉 Chào mừng bạn đến với hệ thống đặt sân bóng trực tuyến! Đặt sân nhanh chóng & tiện lợi.");
        defaults.put("announcementEnabled", false);
        return defaults;
    }
}
