package com.example.footballbooking.service;

import com.example.footballbooking.dto.PageResponse;
import com.example.footballbooking.dto.review.CreateReviewRequest;
import com.example.footballbooking.dto.review.ReviewResponse;
import org.springframework.data.domain.Pageable;

/**
 * Nghiệp vụ đánh giá sân.
 */
public interface ReviewService {

    /** Tạo đánh giá; chỉ người có lượt đặt hợp lệ trên sân mới được đánh giá. */
    ReviewResponse create(Long userId, CreateReviewRequest request);

    /** Danh sách đánh giá của một sân, có phân trang. */
    PageResponse<ReviewResponse> getFieldReviews(Long fieldId, Pageable pageable);

    /** Danh sách đánh giá của các sân thuộc chủ sân (OWNER), có thể lọc theo fieldId và số sao. */
    PageResponse<ReviewResponse> getOwnerReviews(Long ownerId, Long fieldId, Integer rating, Pageable pageable);
}
