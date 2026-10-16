INSERT INTO bookings (user_id, field_id, booking_date, start_time, end_time, total_price, status, created_at, updated_at)
VALUES (3, 1, '2026-10-10', '17:00:00', '18:30:00', 450000.00, 'COMPLETED', NOW(6), NOW(6));

INSERT INTO reviews (user_id, field_id, booking_id, rating, comment, created_at, updated_at)
VALUES (3, 1, LAST_INSERT_ID(), 5, 'Sân cỏ rất mới và êm, hệ thống đèn chiếu sáng ban đêm cực kỳ sáng rõ. Chủ sân nhiệt tình, có chỗ gửi xe rộng rãi!', NOW(6), NOW(6));

INSERT INTO bookings (user_id, field_id, booking_date, start_time, end_time, total_price, status, created_at, updated_at)
VALUES (3, 2, '2026-10-09', '19:00:00', '20:30:00', 400000.00, 'COMPLETED', NOW(6), NOW(6));

INSERT INTO reviews (user_id, field_id, booking_id, rating, comment, created_at, updated_at)
VALUES (3, 2, LAST_INSERT_ID(), 4, 'Chất lượng mặt cỏ tương đối tốt, giá cả hợp lý. Tuy nhiên giờ cao điểm hơi đông người, cần đặt trước sớm.', NOW(6), NOW(6));
