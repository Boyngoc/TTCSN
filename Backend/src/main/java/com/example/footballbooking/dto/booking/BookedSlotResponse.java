package com.example.footballbooking.dto.booking;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Thông tin khung giờ đã được đặt của sân (công khai cho người dùng tra cứu lịch trống).
 */
public record BookedSlotResponse(
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate bookingDate,

        @JsonFormat(pattern = "HH:mm")
        LocalTime startTime,

        @JsonFormat(pattern = "HH:mm")
        LocalTime endTime
) {
}
