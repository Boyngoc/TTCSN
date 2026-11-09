package com.example.footballbooking.mapper;

import com.example.footballbooking.dto.PageResponse;
import com.example.footballbooking.dto.booking.BookingResponse;
import com.example.footballbooking.entity.Booking;
import org.springframework.data.domain.Page;

import java.util.Set;

/**
 * Chuyển đổi entity {@link Booking} sang DTO.
 */
public final class BookingMapper {

    private BookingMapper() {
    }

    public static BookingResponse toResponse(Booking booking, boolean reviewed) {
        return new BookingResponse(
                booking.getId(),
                booking.getField().getId(),
                booking.getField().getName(),
                booking.getUser().getId(),
                booking.getUser().getFullName(),
                booking.getBookingDate(),
                booking.getStartTime(),
                booking.getEndTime(),
                booking.getTotalPrice(),
                booking.getStatus(),
                booking.getCreatedAt(),
                reviewed
        );
    }

    /** Map một trang booking; {@code reviewedBookingIds} là id các booking đã được đánh giá. */
    public static PageResponse<BookingResponse> toPageResponse(Page<Booking> page, Set<Long> reviewedBookingIds) {
        return PageResponse.from(page, booking -> toResponse(booking, reviewedBookingIds.contains(booking.getId())));
    }
}
