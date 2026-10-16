package com.example.footballbooking.dto.review;

import java.time.LocalDateTime;

/**
 * Thông tin đánh giá trả về cho Client.
 */
public record ReviewResponse(
        Long id,
        Long fieldId,
        String fieldName,
        Long userId,
        String userFullName,
        String userEmail,
        Integer rating,
        String comment,
        Integer editCount,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
