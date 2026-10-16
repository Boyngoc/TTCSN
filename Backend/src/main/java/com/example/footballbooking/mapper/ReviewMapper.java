package com.example.footballbooking.mapper;

import com.example.footballbooking.dto.review.ReviewResponse;
import com.example.footballbooking.entity.Review;

/**
 * Chuyển đổi entity {@link Review} sang DTO.
 */
public final class ReviewMapper {

    private ReviewMapper() {
    }

    public static ReviewResponse toResponse(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getField() != null ? review.getField().getId() : null,
                review.getField() != null ? review.getField().getName() : null,
                review.getUser() != null ? review.getUser().getId() : null,
                review.getUser() != null ? review.getUser().getFullName() : null,
                review.getUser() != null ? review.getUser().getEmail() : null,
                review.getRating(),
                review.getComment(),
                review.getEditCount(),
                review.getCreatedAt(),
                review.getUpdatedAt()
        );
    }
}
