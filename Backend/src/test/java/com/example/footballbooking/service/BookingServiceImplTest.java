package com.example.footballbooking.service;

import com.example.footballbooking.dto.booking.BookingResponse;
import com.example.footballbooking.dto.booking.CreateBookingRequest;
import com.example.footballbooking.entity.Booking;
import com.example.footballbooking.dto.PageResponse;
import com.example.footballbooking.entity.Field;
import com.example.footballbooking.entity.Payment;
import com.example.footballbooking.entity.User;
import com.example.footballbooking.enums.ActiveStatus;
import com.example.footballbooking.enums.BookingStatus;
import com.example.footballbooking.enums.PaymentStatus;
import com.example.footballbooking.exception.BadRequestException;
import com.example.footballbooking.exception.ConflictException;
import com.example.footballbooking.exception.ForbiddenException;
import com.example.footballbooking.exception.ResourceNotFoundException;
import com.example.footballbooking.repository.BookingRepository;
import com.example.footballbooking.repository.FieldRepository;
import com.example.footballbooking.repository.PaymentRepository;
import com.example.footballbooking.repository.ReviewRepository;
import com.example.footballbooking.repository.UserRepository;
import com.example.footballbooking.service.impl.BookingServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Unit test cho nghiệp vụ đặt sân — phần logic quan trọng nhất của hệ thống.
 */
@ExtendWith(MockitoExtension.class)
class BookingServiceImplTest {

    @Mock
    private BookingRepository bookingRepository;
    @Mock
    private FieldRepository fieldRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private PaymentRepository paymentRepository;
    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private BookingServiceImpl bookingService;

    private static final Long USER_ID = 10L;
    private static final Long FIELD_ID = 1L;
    private static final LocalDate TOMORROW = LocalDate.now().plusDays(1);

    private User sampleUser() {
        User user = new User();
        user.setId(USER_ID);
        user.setFullName("Nguyen Van A");
        return user;
    }

    private Field sampleField(ActiveStatus status, String pricePerHour) {
        User owner = new User();
        owner.setId(99L);
        owner.setFullName("Chủ sân");
        Field field = new Field();
        field.setId(FIELD_ID);
        field.setName("Sân A");
        field.setOwner(owner);
        field.setPricePerHour(new BigDecimal(pricePerHour));
        field.setStatus(status);
        return field;
    }

    private CreateBookingRequest request(LocalTime start, LocalTime end) {
        return new CreateBookingRequest(FIELD_ID, TOMORROW, start, end);
    }

    /** Booking của USER_ID trên sân của chủ sân id 99. */
    private Booking sampleBooking(Long id, BookingStatus status) {
        Booking booking = new Booking();
        booking.setId(id);
        booking.setStatus(status);
        booking.setUser(sampleUser());
        booking.setField(sampleField(ActiveStatus.ACTIVE, "300000"));
        return booking;
    }

    private Payment samplePayment(PaymentStatus status) {
        Payment payment = new Payment();
        payment.setStatus(status);
        return payment;
    }

    @Test
    @DisplayName("Đặt sân hợp lệ: tự tính đúng tiền, trạng thái PENDING, có tạo thanh toán")
    void create_validBooking_success() {
        when(fieldRepository.findByIdForUpdate(FIELD_ID))
                .thenReturn(Optional.of(sampleField(ActiveStatus.ACTIVE, "300000")));
        when(bookingRepository.existsOverlappingBooking(eq(FIELD_ID), any(), any(), any(), any()))
                .thenReturn(false);
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(sampleUser()));
        when(bookingRepository.save(any(Booking.class))).thenAnswer(inv -> inv.getArgument(0));

        BookingResponse response = bookingService.create(USER_ID, request(LocalTime.of(14, 0), LocalTime.of(16, 0)));

        // 300.000đ/giờ × 2 giờ = 600.000đ (Backend tự tính khung giờ thường)
        assertThat(response.totalPrice()).isEqualByComparingTo("600000");
        assertThat(response.status()).isEqualTo(BookingStatus.PENDING);
        assertThat(response.reviewed()).isFalse();
        verify(paymentRepository).save(any());
    }

    @Test
    @DisplayName("Đặt sân khung giờ cao điểm 17h00 - 21h30: tự tính theo 350.000đ/giờ")
    void create_peakHoursBooking_calculatesPeakPrice() {
        when(fieldRepository.findByIdForUpdate(FIELD_ID))
                .thenReturn(Optional.of(sampleField(ActiveStatus.ACTIVE, "300000")));
        when(bookingRepository.existsOverlappingBooking(eq(FIELD_ID), any(), any(), any(), any()))
                .thenReturn(false);
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(sampleUser()));
        when(bookingRepository.save(any(Booking.class))).thenAnswer(inv -> inv.getArgument(0));

        // Ca 17:00 - 18:30 (1.5 giờ) × 350.000đ = 525.000đ
        BookingResponse response = bookingService.create(USER_ID, request(LocalTime.of(17, 0), LocalTime.of(18, 30)));

        assertThat(response.totalPrice()).isEqualByComparingTo("525000");
    }

    @Test
    @DisplayName("Giờ bắt đầu không trước giờ kết thúc → 400, không chạm database")
    void create_invalidTimeRange_throwsBadRequest() {
        assertThatThrownBy(() -> bookingService.create(USER_ID, request(LocalTime.of(20, 0), LocalTime.of(18, 0))))
                .isInstanceOf(BadRequestException.class);
        verify(fieldRepository, never()).findByIdForUpdate(anyLong());
    }

    @Test
    @DisplayName("Sân không tồn tại → 404")
    void create_fieldNotFound_throwsNotFound() {
        when(fieldRepository.findByIdForUpdate(FIELD_ID)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> bookingService.create(USER_ID, request(LocalTime.of(18, 0), LocalTime.of(20, 0))))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("Sân không ACTIVE → 400")
    void create_inactiveField_throwsBadRequest() {
        when(fieldRepository.findByIdForUpdate(FIELD_ID))
                .thenReturn(Optional.of(sampleField(ActiveStatus.INACTIVE, "300000")));
        assertThatThrownBy(() -> bookingService.create(USER_ID, request(LocalTime.of(18, 0), LocalTime.of(20, 0))))
                .isInstanceOf(BadRequestException.class);
    }

    @Test
    @DisplayName("Trùng khung giờ → 409 CONFLICT")
    void create_overlappingBooking_throwsConflict() {
        when(fieldRepository.findByIdForUpdate(FIELD_ID))
                .thenReturn(Optional.of(sampleField(ActiveStatus.ACTIVE, "300000")));
        when(bookingRepository.existsOverlappingBooking(eq(FIELD_ID), any(), any(), any(), any()))
                .thenReturn(true);
        assertThatThrownBy(() -> bookingService.create(USER_ID, request(LocalTime.of(18, 0), LocalTime.of(20, 0))))
                .isInstanceOf(ConflictException.class);
        verify(bookingRepository, never()).save(any());
    }

    @Test
    @DisplayName("Hủy lượt đặt của người khác → 403 FORBIDDEN")
    void cancel_notOwner_throwsForbidden() {
        Booking booking = new Booking();
        booking.setId(5L);
        booking.setStatus(BookingStatus.PENDING);
        booking.setUser(sampleUser()); // thuộc USER_ID
        when(bookingRepository.findById(5L)).thenReturn(Optional.of(booking));

        Long otherUserId = 999L;
        assertThatThrownBy(() -> bookingService.cancel(otherUserId, 5L))
                .isInstanceOf(ForbiddenException.class);
    }

    @Test
    @DisplayName("Hủy lượt đặt hợp lệ → chuyển trạng thái CANCELLED")
    void cancel_validOwner_setsCancelled() {
        Field field = sampleField(ActiveStatus.ACTIVE, "300000");
        Booking booking = new Booking();
        booking.setId(5L);
        booking.setStatus(BookingStatus.PENDING);
        booking.setUser(sampleUser());
        booking.setField(field);
        when(bookingRepository.findById(5L)).thenReturn(Optional.of(booking));
        when(paymentRepository.findByBookingId(5L)).thenReturn(Optional.empty());

        BookingResponse response = bookingService.cancel(USER_ID, 5L);

        assertThat(response.status()).isEqualTo(BookingStatus.CANCELLED);
    }

    @Test
    @DisplayName("Hủy lượt đặt chưa thanh toán → payment PENDING chuyển FAILED (không thu nữa)")
    void cancel_pendingPayment_marksFailed() {
        Payment payment = samplePayment(PaymentStatus.PENDING);
        when(bookingRepository.findById(5L)).thenReturn(Optional.of(sampleBooking(5L, BookingStatus.PENDING)));
        when(paymentRepository.findByBookingId(5L)).thenReturn(Optional.of(payment));

        bookingService.cancel(USER_ID, 5L);

        assertThat(payment.getStatus()).isEqualTo(PaymentStatus.FAILED);
    }

    @Test
    @DisplayName("Hủy lượt đặt đã thanh toán → payment PAID chuyển REFUNDED")
    void cancel_paidPayment_marksRefunded() {
        Payment payment = samplePayment(PaymentStatus.PAID);
        when(bookingRepository.findById(5L)).thenReturn(Optional.of(sampleBooking(5L, BookingStatus.CONFIRMED)));
        when(paymentRepository.findByBookingId(5L)).thenReturn(Optional.of(payment));

        bookingService.cancel(USER_ID, 5L);

        assertThat(payment.getStatus()).isEqualTo(PaymentStatus.REFUNDED);
    }

    @Test
    @DisplayName("Chủ sân từ chối lượt đặt → booking REJECTED, payment PENDING chuyển FAILED")
    void reject_pendingPayment_marksFailed() {
        Payment payment = samplePayment(PaymentStatus.PENDING);
        when(bookingRepository.findById(5L)).thenReturn(Optional.of(sampleBooking(5L, BookingStatus.PENDING)));
        when(paymentRepository.findByBookingId(5L)).thenReturn(Optional.of(payment));

        BookingResponse response = bookingService.reject(99L, 5L);

        assertThat(response.status()).isEqualTo(BookingStatus.REJECTED);
        assertThat(payment.getStatus()).isEqualTo(PaymentStatus.FAILED);
    }

    @Test
    @DisplayName("Danh sách lượt đặt đánh dấu đúng booking đã được đánh giá (1 truy vấn cho cả trang)")
    void getMyBookings_marksReviewedBookings() {
        Booking reviewedBooking = sampleBooking(1L, BookingStatus.COMPLETED);
        Booking notReviewedBooking = sampleBooking(2L, BookingStatus.CONFIRMED);
        when(bookingRepository.findByUserIdOrderByCreatedAtDesc(eq(USER_ID), any()))
                .thenReturn(new PageImpl<>(List.of(reviewedBooking, notReviewedBooking), PageRequest.of(0, 10), 2));
        when(reviewRepository.findReviewedBookingIds(List.of(1L, 2L))).thenReturn(Set.of(1L));

        PageResponse<BookingResponse> page = bookingService.getMyBookings(USER_ID, PageRequest.of(0, 10));

        assertThat(page.content()).extracting(BookingResponse::id, BookingResponse::reviewed)
                .containsExactly(tuple(1L, true), tuple(2L, false));
        verify(reviewRepository, never()).existsByBookingId(anyLong());
    }

    @Test
    @DisplayName("Trạng thái booking theo giờ vẫn giữ đủ 5 giá trị hợp lệ")
    void bookingStatus_hasExpectedValues() {
        assertThat(List.of(BookingStatus.values())).hasSize(5);
    }
}
