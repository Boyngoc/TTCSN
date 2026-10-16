package com.example.footballbooking.service.impl;

import com.example.footballbooking.dto.PageResponse;
import com.example.footballbooking.dto.review.CreateReviewRequest;
import com.example.footballbooking.dto.review.FieldReviewRequest;
import com.example.footballbooking.dto.review.ReviewResponse;
import com.example.footballbooking.entity.Booking;
import com.example.footballbooking.entity.Field;
import com.example.footballbooking.entity.Review;
import com.example.footballbooking.entity.User;
import com.example.footballbooking.enums.BookingStatus;
import com.example.footballbooking.exception.BadRequestException;
import com.example.footballbooking.exception.ConflictException;
import com.example.footballbooking.exception.ForbiddenException;
import com.example.footballbooking.exception.ResourceNotFoundException;
import com.example.footballbooking.mapper.ReviewMapper;
import com.example.footballbooking.repository.BookingRepository;
import com.example.footballbooking.repository.FieldRepository;
import com.example.footballbooking.repository.ReviewRepository;
import com.example.footballbooking.repository.UserRepository;
import com.example.footballbooking.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Hiện thực nghiệp vụ đánh giá sân.
 */
@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;
    private final FieldRepository fieldRepository;
    private final UserRepository userRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository,
                             BookingRepository bookingRepository,
                             FieldRepository fieldRepository,
                             UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.bookingRepository = bookingRepository;
        this.fieldRepository = fieldRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public ReviewResponse create(Long userId, CreateReviewRequest request) {
        Booking booking = bookingRepository.findById(request.bookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lượt đặt để đánh giá"));

        // Chỉ được đánh giá lượt đặt của chính mình
        if (!booking.getUser().getId().equals(userId)) {
            throw new ForbiddenException("Bạn chỉ được đánh giá lượt đặt của chính mình");
        }

        // Chỉ lượt đặt hợp lệ (đã xác nhận hoặc đã hoàn thành) mới được đánh giá
        if (booking.getStatus() != BookingStatus.CONFIRMED && booking.getStatus() != BookingStatus.COMPLETED) {
            throw new BadRequestException("Chỉ có thể đánh giá lượt đặt đã được xác nhận hoặc đã hoàn thành");
        }

        // Mỗi lượt đặt chỉ được đánh giá một lần
        if (reviewRepository.existsByBookingId(booking.getId())) {
            throw new ConflictException("Lượt đặt này đã được đánh giá");
        }

        Review review = new Review();
        review.setUser(booking.getUser());
        review.setField(booking.getField());
        review.setBooking(booking);
        review.setRating(request.rating());
        review.setComment(request.comment());
        review.setEditCount(0);

        return ReviewMapper.toResponse(reviewRepository.save(review));
    }

    @Override
    @Transactional
    public ReviewResponse createFieldReview(Long userId, Long fieldId, FieldReviewRequest request) {
        Field field = fieldRepository.findById(fieldId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sân bóng"));

        // Quy tắc: 1 user chỉ được đánh giá 1 lần cho mỗi sân
        if (reviewRepository.existsByUserIdAndFieldId(userId, fieldId)) {
            throw new ConflictException("Bạn đã đánh giá sân này rồi. Mỗi người chỉ được đánh giá 1 lần.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));

        Review review = new Review();
        review.setUser(user);
        review.setField(field);
        review.setRating(request.rating());
        review.setComment(request.comment());
        review.setEditCount(0);

        return ReviewMapper.toResponse(reviewRepository.save(review));
    }

    @Override
    @Transactional
    public ReviewResponse updateFieldReview(Long userId, Long fieldId, FieldReviewRequest request) {
        Review review = reviewRepository.findByUserIdAndFieldId(userId, fieldId)
                .orElseThrow(() -> new ResourceNotFoundException("Bạn chưa có đánh giá nào cho sân này để chỉnh sửa"));

        // Quy tắc: sửa lượt đánh giá cũng chỉ 1 lần
        if (review.getEditCount() >= 1) {
            throw new BadRequestException("Bạn chỉ được chỉnh sửa đánh giá tối đa 1 lần");
        }

        review.setRating(request.rating());
        review.setComment(request.comment());
        review.setEditCount(review.getEditCount() + 1);

        return ReviewMapper.toResponse(reviewRepository.save(review));
    }

    @Override
    @Transactional(readOnly = true)
    public ReviewResponse getMyFieldReview(Long userId, Long fieldId) {
        return reviewRepository.findByUserIdAndFieldId(userId, fieldId)
                .map(ReviewMapper::toResponse)
                .orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ReviewResponse> getFieldReviews(Long fieldId, Pageable pageable) {
        if (!fieldRepository.existsById(fieldId)) {
            throw new ResourceNotFoundException("Không tìm thấy sân bóng");
        }
        Page<Review> page = reviewRepository.findByFieldIdOrderByCreatedAtDesc(fieldId, pageable);
        return PageResponse.from(page, ReviewMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ReviewResponse> getOwnerReviews(Long ownerId, Long fieldId, Integer rating, Pageable pageable) {
        Page<Review> page = reviewRepository.findByOwnerIdAndFilters(ownerId, fieldId, rating, pageable);
        return PageResponse.from(page, ReviewMapper::toResponse);
    }
}
