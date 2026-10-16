package com.example.footballbooking.controller;

import com.example.footballbooking.dto.ApiResponse;
import com.example.footballbooking.dto.PageResponse;
import com.example.footballbooking.dto.review.CreateReviewRequest;
import com.example.footballbooking.dto.review.FieldReviewRequest;
import com.example.footballbooking.dto.review.ReviewResponse;
import com.example.footballbooking.security.SecurityUtils;
import com.example.footballbooking.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST API đánh giá sân.
 */
@RestController
@Tag(name = "Review", description = "Đánh giá sân")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/api/reviews")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Tạo đánh giá theo lượt đặt (booking)")
    public ResponseEntity<ApiResponse<ReviewResponse>> create(@Valid @RequestBody CreateReviewRequest request) {
        ReviewResponse created = reviewService.create(SecurityUtils.getCurrentUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Đánh giá thành công", created));
    }

    @PostMapping("/api/fields/{id}/reviews")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Đánh giá sân trực tiếp (mỗi user chỉ được đánh giá 1 lần)")
    public ResponseEntity<ApiResponse<ReviewResponse>> createFieldReview(
            @PathVariable Long id,
            @Valid @RequestBody FieldReviewRequest request) {
        ReviewResponse created = reviewService.createFieldReview(SecurityUtils.getCurrentUserId(), id, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Đánh giá thành công", created));
    }

    @PutMapping("/api/fields/{id}/reviews")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Chỉnh sửa đánh giá của người dùng trên sân (chỉ sửa tối đa 1 lần)")
    public ResponseEntity<ApiResponse<ReviewResponse>> updateFieldReview(
            @PathVariable Long id,
            @Valid @RequestBody FieldReviewRequest request) {
        ReviewResponse updated = reviewService.updateFieldReview(SecurityUtils.getCurrentUserId(), id, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật đánh giá thành công", updated));
    }

    @GetMapping("/api/fields/{id}/my-review")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Lấy đánh giá của chính người dùng hiện tại trên sân (nếu có)")
    public ResponseEntity<ApiResponse<ReviewResponse>> getMyFieldReview(@PathVariable Long id) {
        ReviewResponse myReview = reviewService.getMyFieldReview(SecurityUtils.getCurrentUserId(), id);
        return ResponseEntity.ok(ApiResponse.success(myReview));
    }

    @GetMapping("/api/fields/{id}/reviews")
    @Operation(summary = "Danh sách đánh giá của một sân")
    public ResponseEntity<ApiResponse<PageResponse<ReviewResponse>>> fieldReviews(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<ReviewResponse> result = reviewService.getFieldReviews(id, pageable);
        return ResponseEntity.ok(ApiResponse.success(result));
    }
}
