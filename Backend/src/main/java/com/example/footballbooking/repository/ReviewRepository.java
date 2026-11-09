package com.example.footballbooking.repository;

import com.example.footballbooking.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.Set;

/**
 * Truy cập dữ liệu đánh giá.
 */
public interface ReviewRepository extends JpaRepository<Review, Long> {

    /** Đánh giá của một sân, phân trang, mới nhất trước. */
    Page<Review> findByFieldIdOrderByCreatedAtDesc(Long fieldId, Pageable pageable);

    /** Một booking đã được đánh giá hay chưa (mỗi booking chỉ đánh giá 1 lần). */
    boolean existsByBookingId(Long bookingId);

    /** Trong các booking cho trước, những booking nào đã được đánh giá (1 truy vấn cho cả trang, tránh N+1). */
    @Query("SELECT r.booking.id FROM Review r WHERE r.booking.id IN :bookingIds")
    Set<Long> findReviewedBookingIds(@Param("bookingIds") Collection<Long> bookingIds);

    /** Điểm đánh giá trung bình của một sân (null nếu chưa có đánh giá). */
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.field.id = :fieldId")
    Double findAverageRatingByFieldId(@Param("fieldId") Long fieldId);

    /** Số lượng đánh giá của một sân. */
    long countByFieldId(Long fieldId);
}
