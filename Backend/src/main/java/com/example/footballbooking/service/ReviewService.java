package com.example.footballbooking.service;

import com.example.footballbooking.dto.PageResponse;
import com.example.footballbooking.dto.review.CreateReviewRequest;
import com.example.footballbooking.dto.review.FieldReviewRequest;
import com.example.footballbooking.dto.review.ReviewResponse;
import org.springframework.data.domain.Pageable;

/**
 * Nghiệp vụ đánh giá sân.
 */
public interface ReviewService {

    /** Tạo đánh giá từ lượt đặt sân (booking). */
    ReviewResponse create(Long userId, CreateReviewRequest request);

    /** Tạo đánh giá trực tiếp cho một sân (mỗi user chỉ được đánh giá 1 lần). */
    ReviewResponse createFieldReview(Long userId, Long fieldId, FieldReviewRequest request);

    /** Chỉnh sửa đánh giá của người dùng trên một sân (chỉ được sửa tối đa 1 lần). */
    ReviewResponse updateFieldReview(Long userId, Long fieldId, FieldReviewRequest request);

    /** Lấy đánh giá của chính người dùng hiện tại trên sân (nếu có). */
    ReviewResponse getMyFieldReview(Long userId, Long fieldId);

    /** Danh sách đánh giá của một sân, có phân trang. */
    PageResponse<ReviewResponse> getFieldReviews(Long fieldId, Pageable pageable);

    /** Danh sách đánh giá của các sân thuộc chủ sân (OWNER), có thể lọc theo fieldId và số sao. */
    PageResponse<ReviewResponse> getOwnerReviews(Long ownerId, Long fieldId, Integer rating, Pageable pageable);
}
