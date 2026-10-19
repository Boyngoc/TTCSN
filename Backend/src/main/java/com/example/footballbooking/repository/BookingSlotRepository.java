package com.example.footballbooking.repository;

import com.example.footballbooking.entity.BookingSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Truy cập dữ liệu ô giữ chỗ theo khung giờ.
 */
public interface BookingSlotRepository extends JpaRepository<BookingSlot, Long> {

    /**
     * Giải phóng toàn bộ khung giờ của một lượt đặt (đặt {@code active_key = NULL})
     * khi lượt đặt bị hủy hoặc từ chối. Nhờ {@code active_key} chuyển sang NULL,
     * khung giờ đó có thể được đặt lại ngay mà không vi phạm ràng buộc UNIQUE.
     */
    @Modifying
    @Query("UPDATE BookingSlot s SET s.activeKey = NULL WHERE s.bookingId = :bookingId")
    int deactivateByBookingId(@Param("bookingId") Long bookingId);
}
