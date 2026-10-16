package com.example.footballbooking.controller;

import com.example.footballbooking.dto.ApiResponse;
import com.example.footballbooking.dto.PageResponse;
import com.example.footballbooking.dto.review.ReviewResponse;
import com.example.footballbooking.security.SecurityUtils;
import com.example.footballbooking.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST API cho chủ sân (OWNER) xem danh sách đánh giá của các sân thuộc quyền sở hữu của mình.
 *
 * <p>Quy tắc bảo mật: Chủ sân chỉ có quyền xem phản hồi của khách hàng, KHÔNG CÓ quyền xóa
 * đánh giá (chức năng xóa chỉ dành riêng cho ADMIN ở /api/admin/reviews/{id}).</p>
 */
@RestController
@RequestMapping("/api/owner/reviews")
@Tag(name = "Owner - Review", description = "Chủ sân xem đánh giá và bình luận các sân của mình")
@SecurityRequirement(name = "bearerAuth")
public class OwnerReviewController {

    private final ReviewService reviewService;

    public OwnerReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    /**
     * Lấy danh sách đánh giá các sân của chủ sân đang đăng nhập (chỉ xem, không xóa).
     */
    @GetMapping
    @Operation(summary = "Danh sách đánh giá các sân của tôi (chỉ xem, không xóa)")
    public ResponseEntity<ApiResponse<PageResponse<ReviewResponse>>> myFieldReviews(
            @RequestParam(required = false) Long fieldId,
            @RequestParam(required = false) Integer rating,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<ReviewResponse> result = reviewService.getOwnerReviews(
                SecurityUtils.getCurrentUserId(), fieldId, rating, pageable);
        return ResponseEntity.ok(ApiResponse.success(result));
    }
}
