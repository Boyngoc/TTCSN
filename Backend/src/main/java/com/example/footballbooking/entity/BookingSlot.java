package com.example.footballbooking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Ô giữ chỗ theo từng khung giờ 1 tiếng của một lượt đặt sân.
 *
 * <p>Mỗi {@link Booking} kéo dài nhiều giờ sẽ sinh ra nhiều dòng {@code BookingSlot}
 * (ví dụ 18:00–20:00 → hai dòng 18:00 và 19:00). Đây là <b>chốt chặn cuối ở tầng
 * cơ sở dữ liệu</b> để chống đặt trùng, thay cho việc chỉ dựa vào khóa bi quan trong
 * mã nguồn — rất quan trọng khi tách thành các service độc lập (không còn transaction
 * và khóa dùng chung).</p>
 *
 * <p>Cơ chế {@code active_key}: bằng {@code 1} khi dòng đang giữ chỗ và {@code NULL}
 * khi lượt đặt đã bị hủy/từ chối. Ràng buộc UNIQUE gồm cả cột này; do SQL coi các giá
 * trị NULL là khác nhau nên các ô đã hủy KHÔNG chặn việc đặt lại đúng khung giờ đó,
 * còn tại mỗi thời điểm chỉ tồn tại đúng một ô đang hoạt động cho (sân, ngày, giờ).</p>
 *
 * <p>Các cột {@code field_id} và {@code booking_id} lưu dạng số nguyên (không phải quan
 * hệ JPA) để bảng này ít phụ thuộc, thuận tiện khi sau này tách sang booking-service
 * với cơ sở dữ liệu riêng.</p>
 */
@Entity
@Table(
        name = "booking_slots",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_slot_field_date_hour_active",
                columnNames = {"field_id", "booking_date", "slot_hour", "active_key"}
        )
)
public class BookingSlot {

    public static final int ACTIVE = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "field_id", nullable = false)
    private Long fieldId;

    @Column(name = "booking_id", nullable = false)
    private Long bookingId;

    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;

    /** Giờ bắt đầu của khung 1 tiếng, ví dụ 18:00 đại diện cho khung 18:00–19:00. */
    @Column(name = "slot_hour", nullable = false)
    private LocalTime slotHour;

    /** 1 khi đang giữ chỗ, NULL khi đã hủy/từ chối. */
    @Column(name = "active_key")
    private Integer activeKey;

    protected BookingSlot() {
    }

    public BookingSlot(Long fieldId, Long bookingId, LocalDate bookingDate, LocalTime slotHour) {
        this.fieldId = fieldId;
        this.bookingId = bookingId;
        this.bookingDate = bookingDate;
        this.slotHour = slotHour;
        this.activeKey = ACTIVE;
    }

    /** Đánh dấu ô không còn giữ chỗ (giải phóng khung giờ). */
    public void deactivate() {
        this.activeKey = null;
    }

    public Long getId() {
        return id;
    }

    public Long getFieldId() {
        return fieldId;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public LocalTime getSlotHour() {
        return slotHour;
    }

    public Integer getActiveKey() {
        return activeKey;
    }
}
