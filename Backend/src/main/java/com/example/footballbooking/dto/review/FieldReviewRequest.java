package com.example.footballbooking.dto.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Dữ liệu đánh giá sân trực tiếp từ trang chi tiết sân.
 */
public record FieldReviewRequest(

        @NotNull(message = "Vui lòng chọn số sao đánh giá")
        @Min(value = 1, message = "Điểm đánh giá tối thiểu là 1 sao")
        @Max(value = 5, message = "Điểm đánh giá tối đa là 5 sao")
        Integer rating,

        @Size(max = 1000, message = "Nội dung nhận xét tối đa 1000 ký tự")
        String comment
) {
}
