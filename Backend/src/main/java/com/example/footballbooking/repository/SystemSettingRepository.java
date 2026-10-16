package com.example.footballbooking.repository;

import com.example.footballbooking.entity.SystemSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository thao tác bảng cài đặt hệ thống {@link SystemSetting}.
 */
@Repository
public interface SystemSettingRepository extends JpaRepository<SystemSetting, String> {
}
