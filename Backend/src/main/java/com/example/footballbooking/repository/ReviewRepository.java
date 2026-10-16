package com.example.footballbooking.repository;

import com.example.footballbooking.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Truy cập dữ liệu đánh giá.
 */
public interface ReviewRepository extends JpaRepository<Review, Long> {

    /** Đánh giá của một sân, phân trang, mới nhất trước. */
    Page<Review> findByFieldIdOrderByCreatedAtDesc(Long fieldId, Pageable pageable);

    /** Một booking đã được đánh giá hay chưa (mỗi booking chỉ đánh giá 1 lần). */
    boolean existsByBookingId(Long bookingId);

    /** Kiểm tra xem một người dùng đã từng đánh giá sân này chưa. */
    boolean existsByUserIdAndFieldId(Long userId, Long fieldId);

    /** Tìm đánh giá của một người dùng trên sân cụ thể. */
    java.util.Optional<Review> findByUserIdAndFieldId(Long userId, Long fieldId);

    /** Điểm đánh giá trung bình của một sân (null nếu chưa có đánh giá). */
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.field.id = :fieldId")
    Double findAverageRatingByFieldId(@Param("fieldId") Long fieldId);

    /** Số lượng đánh giá của một sân. */
    long countByFieldId(Long fieldId);

    /**
     * Tìm kiếm và phân trang toàn bộ đánh giá cho Admin, nạp sẵn user và field.
     */
    @Query(value = "SELECT r FROM Review r JOIN FETCH r.user u JOIN FETCH r.field f " +
            "WHERE (:keyword IS NULL OR LOWER(u.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(r.comment) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "  AND (:rating IS NULL OR r.rating = :rating) " +
            "  AND (:fieldId IS NULL OR f.id = :fieldId) " +
            "ORDER BY r.createdAt DESC",
            countQuery = "SELECT COUNT(r) FROM Review r JOIN r.user u JOIN r.field f " +
            "WHERE (:keyword IS NULL OR LOWER(u.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(r.comment) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "  AND (:rating IS NULL OR r.rating = :rating) " +
            "  AND (:fieldId IS NULL OR f.id = :fieldId)")
    Page<Review> searchReviews(@Param("keyword") String keyword,
                               @Param("rating") Integer rating,
                               @Param("fieldId") Long fieldId,
                               Pageable pageable);

    /**
     * Lấy danh sách đánh giá của các sân thuộc về một chủ sân (OWNER), có thể lọc theo fieldId và số sao.
     */
    @Query(value = "SELECT r FROM Review r JOIN FETCH r.user u JOIN FETCH r.field f " +
            "WHERE f.owner.id = :ownerId " +
            "  AND (:fieldId IS NULL OR f.id = :fieldId) " +
            "  AND (:rating IS NULL OR r.rating = :rating) " +
            "ORDER BY r.createdAt DESC",
            countQuery = "SELECT COUNT(r) FROM Review r JOIN r.field f " +
            "WHERE f.owner.id = :ownerId " +
            "  AND (:fieldId IS NULL OR f.id = :fieldId) " +
            "  AND (:rating IS NULL OR r.rating = :rating)")
    Page<Review> findByOwnerIdAndFilters(@Param("ownerId") Long ownerId,
                                         @Param("fieldId") Long fieldId,
                                         @Param("rating") Integer rating,
                                         Pageable pageable);
}
