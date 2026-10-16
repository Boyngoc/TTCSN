-- ==========================================================================
-- FOOTBALL BOOKING - DỮ LIỆU SÂN BÓNG VÀ CHỦ SÂN TỰ ĐỘNG (165 SÂN)
-- Nguồn: C:\Users\viduc\Downloads\ScanDataSanBong\data.xlsx
-- Mỗi sân có 1 tài khoản chủ sân (OWNER) riêng biệt, mật khẩu băm BCrypt chuẩn.
-- ==========================================================================

SET NAMES utf8mb4;
USE football_booking;

-- Khởi tạo biến loại sân (tự động mapping theo bảng field_types hiện có)
SET @type_5 := (SELECT id FROM field_types WHERE name LIKE '%5%' LIMIT 1);
SET @type_7 := (SELECT id FROM field_types WHERE name LIKE '%7%' LIMIT 1);
SET @type_11 := (SELECT id FROM field_types WHERE name LIKE '%11%' LIMIT 1);
SET @type_5 := IFNULL(@type_5, 1);
SET @type_7 := IFNULL(@type_7, 2);
SET @type_11 := IFNULL(@type_11, 3);

-- --------------------------------------------------------------------------
-- Sân #1: Sân Bóng Hà Trì
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Võ Quang Sơn | SĐT: 0896860004
-- Tài khoản: owner.voquangson.1@footballbooking.com | Mật khẩu gốc: Owner@3286
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Quang Sơn', 'owner.voquangson.1@footballbooking.com', '$2a$10$H.HXnKzTecTKPhDQqCs1r.vFdtnyoET.PLtOxpdplfQcI1owwFCmm', '0896860004', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Hà Trì', 'Hà Trì, Hà Đông, Hà Nội, Việt Nam', 'Sân bóng phong trào hàng đầu khu vực, tổ chức giao lưu hàng tuần, có khu vực ngồi nghỉ và giải khát rộng rãi.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLd-A_y4eMy8cxBeRv5xBIOPsva0xGNmpBIdpdqJel2u3CxHzTL6dul_kJ5UmwiDwmsHWX3TCV-Fn-UyaLwrner4PKHFsKm9ymZqJX_hO5leCkNWtNhU7O7O9K3t-0sY8xONgMMs=w408-h306-k-no', '0896860004', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+H%C3%A0+Tr%C3%AC/data=!4m7!3m6!1s0x313452d4d2cbf1b3:0xffc5ad9e94285362!8m2!3d20.96432!4d105.7821698!16s%2Fg%2F11btrrny3r!19sChIJs_HL0tRSNDERYlMolJ6txf8?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #2: Sân bóng Coma 6
-- Loại: Sân 5 người | Giá: 350,000 đ/h
-- Chủ sân: Lâm Hải Long | SĐT: 0948791964
-- Tài khoản: owner.lamhailong.2@footballbooking.com | Mật khẩu gốc: Owner@1488
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lâm Hải Long', 'owner.lamhailong.2@footballbooking.com', '$2a$10$I.JOn1zifobvLOeepd5dN.lRhY/jJDk7GgQ4qquUWnljVOaFXQz4i', '0948791964', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng Coma 6', 'Ngõ 22 Nhuệ Giang, Xuân Phương, Hà Nội, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfXRlTXCwINhwrQbIdPxyi_me8Kk75sNj6IgKf0-MCigemHMpy7HyoWo-AKJO11LADYify2_J2MX1ddIwcVahCASMXCJYFMwRl5VJq2dGHss7WSG2eKozW9PBziVuyVNaG9Bzgsug=w426-h240-k-no', '0948791964', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Coma+6/data=!4m7!3m6!1s0x31345386236837ed:0x2ec97256059c99eb!8m2!3d21.016922!4d105.748833!16s%2Fg%2F11f794w6zb!19sChIJ7TdoI4ZTNDER65mcBVZyyS4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #3: Sân bóng Thành Công
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Trịnh Văn Hiếu | SĐT: 0906838383
-- Tài khoản: owner.trinhvanhieu.3@footballbooking.com | Mật khẩu gốc: Owner@4257
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trịnh Văn Hiếu', 'owner.trinhvanhieu.3@footballbooking.com', '$2a$10$uZqZG59o405ESkNwzgmNwOCRSUgVEWZYXCt7uFDjcB9JBdeIpYO3W', '0906838383', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Thành Công', '926 Đ. Kim Giang, Thanh Liệt, Hà Nội 100000, Việt Nam', 'Sân bóng nằm trong khuôn viên thoáng mát, an ninh tốt, có khán đài che mưa nắng cho khán giả cổ vũ.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLf0CRYI8fylHLPKz2DATaDyIereZkoLzPu808CTzaGd01w0nNV-zDCstB6-7BUPP5kAUxvZo71LdeNPo5ZqiZeihOPHhmCK6oH7dOfqFSkBNZvvjWyF9V-WvwwBZOIl8sY6h1QDL3VVxK5M=w408-h272-k-no', '0906838383', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Th%C3%A0nh+C%C3%B4ng/data=!4m7!3m6!1s0x3135ad006a658411:0x3c01cebcdb4eab9c!8m2!3d20.9576102!4d105.8099141!16s%2Fg%2F11y4hc0mhy!19sChIJEYRlagCtNTERnKtO27zOATw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #4: Sân bóng Thành Đô
-- Loại: Sân 5 người | Giá: 350,000 đ/h
-- Chủ sân: Vũ Trọng Tài | SĐT: 0966442424
-- Tài khoản: owner.vutrongtai.4@footballbooking.com | Mật khẩu gốc: Owner@5557
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Vũ Trọng Tài', 'owner.vutrongtai.4@footballbooking.com', '$2a$10$WTUMMpialTmmadyaRkPh9uPNbNdRD8iWqJwQmoCobAK6Gw64BJdr.', '0966442424', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng Thành Đô', 'Hoài Đức, Hà Nội, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcBpjMBuocSG2DSmv_NznTz1uNMkq06G9pecbZasp-TpdpuiAvWVw_gz8f2Q1w_BnmCVvKIrd4jJQhBEY7oCOB0xxoHhLePpnsl0TA1hwGV-ZB8mex6NudznlN4cJe5KKk3cDgO=w408-h306-k-no', '0966442424', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Th%C3%A0nh+%C4%90%C3%B4/data=!4m7!3m6!1s0x31345452a9b5605f:0xbcdd707681c12971!8m2!3d21.0653202!4d105.7234737!16s%2Fg%2F11fx7x7n4y!19sChIJX2C1qVJUNDERcSnBgXZw3bw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #5: Sân Bóng trường Cao Đẳng Công Nghệ Cao HN
-- Loại: Sân 5 người | Giá: 250,000 đ/h
-- Chủ sân: Ngô Tiến Thịnh | SĐT: 0966999060
-- Tài khoản: owner.ngotienthinh.5@footballbooking.com | Mật khẩu gốc: Owner@3547
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Ngô Tiến Thịnh', 'owner.ngotienthinh.5@footballbooking.com', '$2a$10$fQUc7w0OqEIM/4hjIKgBs.3m6g6YmFtg6UFuWPWTw2PI2za2DRTRS', '0966999060', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng trường Cao Đẳng Công Nghệ Cao HN', '2PCX+2W6, Nhuệ Giang, Xuân Phương, Hà Nội, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 250000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLclqRSQMt7McdstHC3zxcQpyg6FiKmjO7-LzWUMLSYX55IsJoeEE-y0mSF0sssQ7BUzHa_zPH-bRkwXnkIw3tjLd08xMCHcy1KYRBX73U1r0Ki5XX_pjqX40HcH784MSL0O17Q=w408-h306-k-no', '0966999060', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+tr%C6%B0%E1%BB%9Dng+Cao+%C4%90%E1%BA%B3ng+C%C3%B4ng+Ngh%E1%BB%87+Cao+HN/data=!4m7!3m6!1s0x313455007c5c63cd:0xcdcc0149414b327f!8m2!3d21.020031!4d105.7497577!16s%2Fg%2F11mcmh1fwt!19sChIJzWNcfABVNDERfzJLQUkBzM0?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #6: Sân Bóng Cường Quốc
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Lê Thành Thắng | SĐT: 0399053333
-- Tài khoản: owner.lethanhthang.6@footballbooking.com | Mật khẩu gốc: Owner@6881
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lê Thành Thắng', 'owner.lethanhthang.6@footballbooking.com', '$2a$10$o0UYRfsNI1cwisNS9oVr9.CTfVN8U/DfC3lQ88cDTg2AVVtMkCHtm', '0399053333', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Cường Quốc', 'XQ5J+GFM, Kiến Hưng, Hà Nội, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 450000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLesX8RuLKtxPEKW4V6ellBYK1YMZFEKj1lKt3uuTaHMxrezH5lqwJ-H-hkQ3b1kbzXglVrmgc9POaK9qTWFoobulOWs38g-pcJQeTk7_lwunCZbKrMxq4qXH3Os6pHr4nwGnoza=w408-h272-k-no', '0399053333', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+C%C6%B0%E1%BB%9Dng+Qu%E1%BB%91c/data=!4m7!3m6!1s0x313452d33cdce76b:0x6a31e1498a1c523!8m2!3d20.9588474!4d105.7811783!16s%2Fg%2F11g6ph1h3r!19sChIJa-fcPNNSNDERI8WhmBQeowY?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #7: Sân Bóng Đá Phúc Xá ( Hồng Hà 1)
-- Loại: Sân 5 người | Giá: 350,000 đ/h
-- Chủ sân: Trần Trọng Bách | SĐT: 0942418158
-- Tài khoản: owner.trantrongbach.7@footballbooking.com | Mật khẩu gốc: Owner@3045
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trần Trọng Bách', 'owner.trantrongbach.7@footballbooking.com', '$2a$10$WCJs0UyqM20Jbb0YGE75UOi1OyEe9y.eZ8uv06qirJ9EOnWBWyhlK', '0942418158', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng Đá Phúc Xá ( Hồng Hà 1)', '15 Hồng Hà, Hà Nội, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLf1DQL23NCxFg1jZfhus0Hn11qQzPqUPfAC-GDGXYPHBsfm4leOAQD6W31TcQV4jcK6oUNgrmRgNKr1OUaVlT32S-qp-WuU7Wxwkw4gVm5J8FzVwwGgOEF32ZUw84lY4J39g9ZN=w408-h306-k-no', '0942418158', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+Ph%C3%BAc+Xa%CC%81+%28+H%E1%BB%93ng+H%C3%A0+1%29/data=!4m7!3m6!1s0x3135ab3948d82887:0x75ea0c1a5482c2e3!8m2!3d21.0486704!4d105.8423486!16s%2Fg%2F11fmphqdg2!19sChIJhyjYSDmrNTER48KCVBoM6nU?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #8: Sân Bóng Phúc Xá
-- Loại: Sân 11 người | Giá: 1,000,000 đ/h
-- Chủ sân: Đoàn Duy Đông | SĐT: 02873075788
-- Tài khoản: owner.doanduydong.8@footballbooking.com | Mật khẩu gốc: Owner@6925
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đoàn Duy Đông', 'owner.doanduydong.8@footballbooking.com', '$2a$10$97HtHisl2VxtzCb5O0pCr.EbcpgLg5.kNianVWrQKjUzJXGn.bUXG', '02873075788', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Sân Bóng Phúc Xá', 'Hồng Hà, Hà Nội, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 1000000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdOHHORpxA1_XMZBe78hlLmUW2OZQkoA_TF90rPc9HxkF1J_rV486X_gTTO_8wtYNwFr0kcMaL4xkPVpeOcjq1E7CHepmChwdJDCE5DG-gxH1ic4KZsRjC64zUiob-e9UN8SazkQA=w408-h306-k-no', '02873075788', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Ph%C3%BAc+X%C3%A1/data=!4m7!3m6!1s0x3135abb1889100c5:0x83757969fea02fbf!8m2!3d21.0473918!4d105.8443556!16s%2Fg%2F1trsvh4p!19sChIJxQCRiLGrNTERvy-g_ml5dYM?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #9: Sân Bóng Đại Học Hà Nội
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Đào Quang Phát | SĐT: 0912094468
-- Tài khoản: owner.daoquangphat.9@footballbooking.com | Mật khẩu gốc: Owner@2307
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Quang Phát', 'owner.daoquangphat.9@footballbooking.com', '$2a$10$FdGB0YuQTUTeQnBZiJ82v.v7APC3LYVlJWc4S4kUq56YxhW8f.KbS', '0912094468', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đại Học Hà Nội', 'Đại Học Hà Nội, Đại Mỗ, Hà Nội, Việt Nam', 'Sân cỏ nhân tạo chất lượng cao đạt chuẩn, hệ thống đèn LED chiếu sáng hiện đại, bãi giữ xe rộng rãi.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcVIXPMxRFFndJ2yseZXLWRGvJ-nEc9V-A_But5tlEcn542GWIj9xkGkdIS4nSMGKBIWR2qlhobzWT9-XADGdG7tCmlmAbVSUFof5yf9UUmTj_56grjvD8QO0n3II8zdz7CuifZsw=w408-h306-k-no', '0912094468', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%E1%BA%A1i+H%E1%BB%8Dc+H%C3%A0+N%E1%BB%99i/data=!4m7!3m6!1s0x3135ad6a5e21a775:0xee7526a00fb5f3ed!8m2!3d20.9895645!4d105.795728!16s%2Fg%2F11h6nrp1fq!19sChIJdachXmqtNTER7fO1D6Amde4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #10: Sân bóng Viglacera
-- Loại: Sân 5 người | Giá: 250,000 đ/h
-- Chủ sân: Võ Trọng Bảo | SĐT: 0976883008
-- Tài khoản: owner.votrongbao.10@footballbooking.com | Mật khẩu gốc: Owner@3664
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Trọng Bảo', 'owner.votrongbao.10@footballbooking.com', '$2a$10$7si0VxO6BOoAcn8VsfqmZeySUXMrCwszBjXU7SBYqVeyTMDoqS2wW', '0976883008', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng Viglacera', '671 Đ. Hoàng Hoa Thám, Ngọc Hà, Hà Nội, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 250000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcc4hFfPcfhSreWEnczrrn2wqc0vPKQlL7Q2U27NgwSOQZP-PJipsrMtMJYUc0kYoIzn7qUt9tR5542NoU3D9IP6vg6Ff05i3rswi4QdA5DuEUvihfl6SynvDkXYz-91t_EOaQYoHvwmwVr=w408-h544-k-no', '0976883008', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Viglacera/data=!4m7!3m6!1s0x3135ab181eebc2bd:0x33774a5a9cbbbf5a!8m2!3d21.0465868!4d105.806806!16s%2Fg%2F1tt0nlt2!19sChIJvcLrHhirNTERWr-7nFpKdzM?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #11: Sân bóng cỏ nhân tạo Khu Gia Binh
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Võ Bảo Cường | SĐT: 0854710219
-- Tài khoản: owner.vobaocuong.11@footballbooking.com | Mật khẩu gốc: Owner@3803
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Bảo Cường', 'owner.vobaocuong.11@footballbooking.com', '$2a$10$YcjTbuNqbAYmz.pt5cmmQuEJLfFnAUUN4zcjlmRYeHf0w./zVYClK', '0854710219', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng cỏ nhân tạo Khu Gia Binh', 'Tổ 6, Nùng Trí Cao, Cao Bằng, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdtY37B6QHlzAm6Z7rFQt0xtSbaMBgGEzivsC8YWPXzLDnhvkmLwC3096RUpL2ARrUr0zncYRDrEQKpsqqDF_cSyLmw3Qjx5metUrFfms3TxEoWFl_ejzX4feAgfzTm6waWDQODHA=w408-h725-k-no', '0854710219', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+c%E1%BB%8F+nh%C3%A2n+t%E1%BA%A1o+Khu+Gia+Binh/data=!4m7!3m6!1s0x36ca65d4dbaff837:0xd4221d67f3b156dc!8m2!3d22.6825756!4d106.2556645!16s%2Fg%2F11f50snh6y!19sChIJN_iv29RlyjYR3Fax82cdItQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #12: Sân Bóng Toàn Thắng
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Dương Thành Thịnh | SĐT: 0941138888
-- Tài khoản: owner.duongthanhthinh.12@footballbooking.com | Mật khẩu gốc: Owner@4598
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Dương Thành Thịnh', 'owner.duongthanhthinh.12@footballbooking.com', '$2a$10$h9mi57SJH0ZvcfRFytlLQey8hMOQlURiKU6jJO4YQYnX1jQVLSwzm', '0941138888', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Toàn Thắng', 'Nàm Keo, Đoài Dương, Cao Bằng, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcp2B0VKRPuZ8Q4bv51WgnofhBr2Cgftu3HMCmJw0xtFzaIO3BYjwPCisSk1Tw3YRWiabqjp5wL9m5PilzADsXHjYSTdFkizISKB6Nfe3DKQaRypFQQ2z5LymjL2zyAX9nYvT_wxg=w408-h545-k-no', '0941138888', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+To%C3%A0n+Th%E1%BA%AFng/data=!4m7!3m6!1s0x36ca77e0776f769b:0xcf9b621161e2c34a!8m2!3d22.7779003!4d106.501807!16s%2Fg%2F11sb4y5gng!19sChIJm3Zvd-B3yjYRSsPiYRFim88?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #13: Sân Bóng Bằng B
-- Loại: Sân 5 người | Giá: 250,000 đ/h
-- Chủ sân: Trần Tiến Hải | SĐT: 0834682668
-- Tài khoản: owner.trantienhai.13@footballbooking.com | Mật khẩu gốc: Owner@5386
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trần Tiến Hải', 'owner.trantienhai.13@footballbooking.com', '$2a$10$cPKWKQu7QZm4PORvlgType5aXH1mDW6eyXbpJ/9PN11HdfvW2UEtO', '0834682668', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng Bằng B', 'Bằng B, Hoàng Liệt, Hà Nội, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 250000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLez8ApC7aSj-NF7aN7aEefmRpajrW3kB2vjj2vauMdSQfZIrXhHdWqmw7zj_LkpAFAWxc18wRTdnWY5e8nlM2AYW7XwGHkEOh8RCRAce1Z2ziGhJIjf82SfUsgHPfcYnG0b1D4=w408-h306-k-no', '0834682668', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+B%E1%BA%B1ng+B/data=!4m7!3m6!1s0x3135ada9b6b1225d:0x641c700d53587b9b!8m2!3d20.9547278!4d105.8307728!16s%2Fg%2F1hm52_hjt!19sChIJXSKxtqmtNTERm3tYUw1wHGQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #14: Sân Bóng Mễ Trì Thượng
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Bùi Tuấn Minh | SĐT: 0899084712
-- Tài khoản: owner.buituanminh.14@footballbooking.com | Mật khẩu gốc: Owner@7482
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Bùi Tuấn Minh', 'owner.buituanminh.14@footballbooking.com', '$2a$10$EMEZn9mILQUXcyVvqJgTV.WrJXxXKpCkn3NPEKJRWgINJBJZgUHZi', '0899084712', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Mễ Trì Thượng', 'KM1, CT03, Đại Mỗ, Hà Nội, Việt Nam', 'Sân bóng phong trào hàng đầu khu vực, tổ chức giao lưu hàng tuần, có khu vực ngồi nghỉ và giải khát rộng rãi.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfWpp5UHNG35TbeywD2HSf_TT3Rix7Uw9pDGYTG6kf5snPWrVaZbm6TixkRDRJqllGp9HEKZ9rfi7Q6YiRHwOOeJXyKvOgPmYrkvDSBEjTOs9vtA-2iyQXDFE7j3pKBtqqKS80OkA=w408-h306-k-no', '0899084712', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+M%E1%BB%85+Tr%C3%AC+Th%C6%B0%E1%BB%A3ng/data=!4m7!3m6!1s0x31345351d9d48d0b:0x7c3309259e9e77cc!8m2!3d21.0030901!4d105.7746398!16s%2Fg%2F11bw4zfm2q!19sChIJC43U2VFTNDERzHeeniUJM3w?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #15: Sân Bóng Thôn Lời
-- Loại: Sân 5 người | Giá: 320,000 đ/h
-- Chủ sân: Võ Minh Bình | SĐT: 0925106688
-- Tài khoản: owner.vominhbinh.15@footballbooking.com | Mật khẩu gốc: Owner@9830
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Minh Bình', 'owner.vominhbinh.15@footballbooking.com', '$2a$10$C0T6hApxszbzIt8segzqje/DKgWjEFq4RvpSKbRU1icwr0o7sN3km', '0925106688', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng Thôn Lời', '2XP4+9HH, thôn Lời, Thuận An, Hà Nội, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 320000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLd4fV4YTcnQnrkQ5brH3dIZ2mGHM4MHUsNbLCltVZab09DKZY97zVtg0wSvzuIDErA0axpG4m0MQSpHXvASf5gPIckho7NywnatgxNjH2ZmTmq11gm_rYr5-RSwIPLHuKPiMVcrAw=w408-h306-k-no', '0925106688', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Th%C3%B4n+L%E1%BB%9Di/data=!4m7!3m6!1s0x3135a92027a478bd:0x71b530299d17273b!8m2!3d21.0355883!4d105.9558529!16s%2Fg%2F11l25pxkl4!19sChIJvXikJyCpNTEROycXnSkwtXE?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #16: SÂN BÓNG QUỐC KHÁNH
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Lâm Thành Bảo | SĐT: 0366016635
-- Tài khoản: owner.lamthanhbao.16@footballbooking.com | Mật khẩu gốc: Owner@4593
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lâm Thành Bảo', 'owner.lamthanhbao.16@footballbooking.com', '$2a$10$1vxCzSY63eVowgwpSS4dVOktI8/a1ISJm9wYLaWE9QB0RgwsnDZX2', '0366016635', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'SÂN BÓNG QUỐC KHÁNH', 'Cai Kinh, Lạng Sơn 25000, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLftJEw9SoOYty1XSqhut9LvroJsxG8KzDhQejelpyGFABXp0ID213nIetmRriU89NXpO_4YOeOsEy2PRmBncXrxz1hMkGyWzlUQwX2CoGGszLjXFDm5WJVwJ_EnKD8K_5wgfto=w408-h306-k-no', '0366016635', 'https://www.google.com/maps/place/S%C3%82N+B%C3%93NG+QU%E1%BB%90C+KH%C3%81NH/data=!4m7!3m6!1s0x31355b5adcc99f43:0x5c35cfb43606f472!8m2!3d21.5887316!4d106.3708838!16s%2Fg%2F11m46j1rm_!19sChIJQ5_J3FpbNTERcvQGNrTPNVw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #17: Sân Bóng Đá Làng Lợn
-- Loại: Sân 11 người | Giá: 800,000 đ/h
-- Chủ sân: Lý Hữu Tuấn | SĐT: 0862312688
-- Tài khoản: owner.lyhuutuan.17@footballbooking.com | Mật khẩu gốc: Owner@2796
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lý Hữu Tuấn', 'owner.lyhuutuan.17@footballbooking.com', '$2a$10$tCbyCsyhvBdtVmWm9OT/zeUUpMGe/Usk827Bd6DTGBqbboPr.vpAy', '0862312688', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Sân Bóng Đá Làng Lợn', 'FC43+HX2, Tam Sơn, Phú Thọ, Việt Nam', 'Sân bóng nằm trong khuôn viên thoáng mát, an ninh tốt, có khán đài che mưa nắng cho khán giả cổ vũ.', 800000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLerr6EvFxubb3W5wPmcN0X18cZHVkn6jYJLPJXFfiA5RqY-ZXP_Q7-5OVBjzuTTckRSmRfFGMacq5giQ-SW1F1Z_dz16EznZ7gREbYe2UsJns983z3nPYkZCNXBJDzjCupfEYr9kw=w426-h240-k-no', '0862312688', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+L%C3%A0ng+L%E1%BB%A3n/data=!4m7!3m6!1s0x313494d290c1b1c9:0x3cdb2d2d632c204a!8m2!3d21.4563772!4d105.4048943!16s%2Fg%2F11dzdcf4v2!19sChIJybHBkNKUNDERSiAsYy0t2zw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #18: Sân Bóng Đá Nà Tăng ( Sân Cỏ Nhân Tạo )
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Ngô Khắc Cường | SĐT: 0978761200
-- Tài khoản: owner.ngokhaccuong.18@footballbooking.com | Mật khẩu gốc: Owner@7304
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Ngô Khắc Cường', 'owner.ngokhaccuong.18@footballbooking.com', '$2a$10$8rP3ZyCz9ZL..ZG0RZfIQesF0Z6UmSZgDGbT9Dx.wdXyTiwIuDY4S', '0978761200', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Nà Tăng ( Sân Cỏ Nhân Tạo )', 'G3PR+96C, Đình Lập, Lạng Sơn, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLc-7gkz1FDROfPMWf6r4trn5jgv1GJMqFeDiClrjri_q-mH2Lhth0bsOSIqOxl8Mhmxwn9ROoqP0eQI_TBp7O30lXK1f4KLDrEk6ALwTytNKZB9Hck9MsDDj5B0GdzZvvsH8nEk=w426-h240-k-no', '0978761200', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+N%C3%A0+T%C4%83ng+%28+S%C3%A2n+C%E1%BB%8F+Nh%C3%A2n+T%E1%BA%A1o+%29/data=!4m7!3m6!1s0x314acf7046063167:0x188b1a2220b6731d!8m2!3d21.5359298!4d107.0905105!16s%2Fg%2F11fkl9l3vv!19sChIJZzEGRnDPSjERHXO2ICIaixg?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #19: Karaoke Shanghai Club - Tây Sơn
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Võ Huy Nam | SĐT: 0964526293
-- Tài khoản: owner.vohuynam.19@footballbooking.com | Mật khẩu gốc: Owner@2876
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Huy Nam', 'owner.vohuynam.19@footballbooking.com', '$2a$10$KrHRUrnW/u/AjOMB2CNWQu08TlY8NWf6biTR89SplsaZGrAZNRiGK', '0964526293', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Karaoke Shanghai Club - Tây Sơn', '229 P. Tây Sơn, Kim Liên, Hà Nội 100000, Việt Nam', 'Sân bóng nằm trong khuôn viên thoáng mát, an ninh tốt, có khán đài che mưa nắng cho khán giả cổ vũ.', 500000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLd0IHXOLQkav-KI7ET1WXBOt4iIpiMMQg0H3zhCrGmT5xt_pQPuIBOFS8rGqXieBLjlQlmpeNlRmA_zMWHYOt-XlwydK0kfv1YFDF-5Ks-MO-RPRmQ9eMVlBhGwEkYUDD12W90EBGPH1PGe=w408-h304-k-no', '0964526293', 'https://www.google.com/maps/place/Karaoke+Shanghai+Club+-+T%C3%A2y+S%C6%A1n/data=!4m7!3m6!1s0x313565ccf262e9d7:0xcbb1df226543e616!8m2!3d21.0063597!4d105.823175!16s%2Fg%2F11cs9_ydnv!19sChIJ1-li8sxlNTERFuZDZSLfscs?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #20: CLB bóng đá trẻ Lạng Sơn
-- Loại: Sân 5 người | Giá: 350,000 đ/h
-- Chủ sân: Mai Tiến Đạt | SĐT: 0916352838
-- Tài khoản: owner.maitiendat.20@footballbooking.com | Mật khẩu gốc: Owner@5808
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Mai Tiến Đạt', 'owner.maitiendat.20@footballbooking.com', '$2a$10$hSbcRYHKmR.Wna83nDl/oOwhvAA83KxJypp81NC90Zf3o6LplQkh6', '0916352838', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'CLB bóng đá trẻ Lạng Sơn', 'Đ. Bà Triệu, Đông Kinh, Lạng Sơn, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcjXFmkVh5l3h1jkL3pmyY4aEKg_VRseRYfxsgLDLF6q6yXs7n0tjdyZmzTwa8bpkTniDIRUX9oCT7nvbkGNvJi6XLcVOGRPKRHDmMMPsxV-v3d9p19vYKkNtqC84kPclHyQTW5PQ=w408-h326-k-no', '0916352838', 'https://www.google.com/maps/place/CLB+b%C3%B3ng+%C4%91%C3%A1+tr%E1%BA%BB+L%E1%BA%A1ng+S%C6%A1n/data=!4m7!3m6!1s0x36b54feca72ba8d3:0x57371cdb53e4bb4c!8m2!3d21.8496208!4d106.7626997!16s%2Fg%2F11v3g_09n8!19sChIJ06grp-xPtTYRTLvkU9scN1c?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #21: Sân Bóng Quang Khải
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Võ Xuân Quân | SĐT: 0849465995
-- Tài khoản: owner.voxuanquan.21@footballbooking.com | Mật khẩu gốc: Owner@9317
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Xuân Quân', 'owner.voxuanquan.21@footballbooking.com', '$2a$10$.tiTXg81VYcKj80L1ZsrLutfaKhdERPEhMm/hRdluVE2peqzOoDye', '0849465995', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Quang Khải', 'Lương Văn Tri, Lạng Sơn 240000, Việt Nam', 'Sân bóng phong trào hàng đầu khu vực, tổ chức giao lưu hàng tuần, có khu vực ngồi nghỉ và giải khát rộng rãi.', 350000.00, 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&auto=format&fit=crop', '0849465995', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Quang+Kh%E1%BA%A3i/data=!4m7!3m6!1s0x36b54dff284de70b:0x89f3018a112325ed!8m2!3d21.8373601!4d106.740719!16s%2Fg%2F11s8jtvxrn!19sChIJC-dNKP9NtTYR7SUjEYoB84k?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #22: Sân Bóng Phú Lôc
-- Loại: Sân 11 người | Giá: 900,000 đ/h
-- Chủ sân: Đinh Khắc Hoàng | SĐT: 0336609904
-- Tài khoản: owner.dinhkhachoang.22@footballbooking.com | Mật khẩu gốc: Owner@3504
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đinh Khắc Hoàng', 'owner.dinhkhachoang.22@footballbooking.com', '$2a$10$5kUV5u90af5/SVLxd1xwW.GzOTppbLVJqmqVFnhlkVfpcrCAfzFrW', '0336609904', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Sân Bóng Phú Lôc', 'VQ58+M9G, Đông Kinh, Lạng Sơn, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 900000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfNjJuCSSXfSLxWJ3FQLU56UHDp7NWAeX_VmOQB_BVA5AG_gq89ZNwMqNHF_-CMEDWVvKaFyJCtzld1seZwCbXTZrYde_Z_9Dir6V0IJsOg3MhVDq7KEhWFOUHC9H3COemYHF9A=w424-h240-k-no', '0336609904', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Ph%C3%BA+L%C3%B4c/data=!4m7!3m6!1s0x36b54e63e1788cdf:0xd498587dc814a424!8m2!3d21.8591864!4d106.7659377!16s%2Fg%2F11hbjkz67f!19sChIJ34x44WNOtTYRJKQUyH1YmNQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #23: Sân Vận Động Đông Kinh
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Đinh Văn Thành | SĐT: 02873053088
-- Tài khoản: owner.dinhvanthanh.23@footballbooking.com | Mật khẩu gốc: Owner@6310
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đinh Văn Thành', 'owner.dinhvanthanh.23@footballbooking.com', '$2a$10$Gl6bPF0m6E9jO1QEhJELIOer33bxdG36FT8cq3kfA0p2oWmWCsX/i', '02873053088', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Vận Động Đông Kinh', 'VQ27+X4X, Đông Kinh, Lạng Sơn, Việt Nam', 'Sân bóng nằm trong khuôn viên thoáng mát, an ninh tốt, có khán đài che mưa nắng cho khán giả cổ vũ.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdkfR964fMTY0SXnfS7uUGilBpK90FKcjOjfFz3yWrdCSsMtEPdfLVkNyxUh0cCpt38O4Qrc0WCHkMrSL2XSfjKj5XC8tMlnQW95odM33deu4uISOUdKfgrbN7ncwV53rxQf3cSQFF0XaZs=w408-h260-k-no', '02873053088', 'https://www.google.com/maps/place/S%C3%A2n+V%E1%BA%ADn+%C4%90%E1%BB%99ng+%C4%90%C3%B4ng+Kinh/data=!4m7!3m6!1s0x36b54e7b22c8444f:0xa948f755eae4f64c!8m2!3d21.8524754!4d106.762861!16s%2Fg%2F1tdyz78z!19sChIJT0TIIntOtTYRTPbk6lX3SKk?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #24: Sân Vận động Minh Tiến
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Đặng Quang Tuấn | SĐT: 0974105888
-- Tài khoản: owner.dangquangtuan.24@footballbooking.com | Mật khẩu gốc: Owner@4946
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đặng Quang Tuấn', 'owner.dangquangtuan.24@footballbooking.com', '$2a$10$rFxD8C/8aKaJtw/kbVKCuO3k.fY1ixDl19DdH9FXllQRaKOQbCwM6', '0974105888', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Vận động Minh Tiến', 'Vũ Lễ, Lạng Sơn, Việt Nam', 'Khu liên hợp sân cỏ chất lượng cao, đèn chiếu sáng công suất lớn thi đấu ban đêm, bãi đỗ ô tô xe máy thoải mái.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLchtfxMUzeGJUWJUFpmUTxC6TeyfDq8xDGP4c9MNGjzOOpFf_A4vQV5MiV3wbGbHY8h_MitlPVPZBNtQz6CXqCYmqcR66k7uIs2jnzhFefMnuC5FQcGHh9PCaeeblmLn3NajrF3V7bYgRaL=w408-h408-k-no', '0974105888', 'https://www.google.com/maps/place/S%C3%A2n+V%E1%BA%ADn+%C4%91%E1%BB%99ng+Minh+Ti%E1%BA%BFn/data=!4m7!3m6!1s0x313535bb40d6e313:0x927517625f32a6a0!8m2!3d21.785402!4d106.1471202!16s%2Fg%2F11rj3qwlvt!19sChIJE-PWQLs1NTERoKYyX2IXdZI?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #25: Sân bóng đá Bắc Việt
-- Loại: Sân 5 người | Giá: 250,000 đ/h
-- Chủ sân: Lý Hữu Bách | SĐT: 0835110011
-- Tài khoản: owner.lyhuubach.25@footballbooking.com | Mật khẩu gốc: Owner@3060
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lý Hữu Bách', 'owner.lyhuubach.25@footballbooking.com', '$2a$10$z/5YbWFTqXFdGk8MuQDe4.n84F76UgC7QZOpQMWBTCdXe4U6K9iCq', '0835110011', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng đá Bắc Việt', 'Cuối Chiến Thắng, Phường, Hà Đông, Hà Nội, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 250000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLePLYta2iCqJ_8BCKlUd35Pm7LLXrsajO1NYbPIc3ADMOxaoQpM7IBBDKoJ49H1m8QmoS9CFTNdZWMHH2lFE5tNJ2hWaEmAKQsIXuIw8tT5IauQYML0ZIM6PmoqfmLqgQR7JBZqaU2K24Q=w408-h306-k-no', '0835110011', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+B%E1%BA%AFc+Vi%E1%BB%87t/data=!4m7!3m6!1s0x3135acd0a60d90f9:0xe35f445a9e8f9460!8m2!3d20.9730045!4d105.7935116!16s%2Fg%2F11ggdv6vg5!19sChIJ-ZANptCsNTERYJSPnlpEX-M?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #26: Sân bóng Picenza Thái Nguyên
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Huỳnh Ngọc An | SĐT: 0915973866
-- Tài khoản: owner.huynhngocan.26@footballbooking.com | Mật khẩu gốc: Owner@7932
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Huỳnh Ngọc An', 'owner.huynhngocan.26@footballbooking.com', '$2a$10$hvrT2s/nyhV8RYaxt4PqE.rGAOcoUvrmaI7CIXnBmKlPAr4gwn8tm', '0915973866', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Picenza Thái Nguyên', 'Khu đô thị Picenza, Plaza, Linh Sơn, Thái Nguyên, Việt Nam', 'Sân bóng nằm trong khuôn viên thoáng mát, an ninh tốt, có khán đài che mưa nắng cho khán giả cổ vũ.', 500000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfmQXBhobhq6eZaUHcJho8dPLQxM0bRiGumBmOPfnaJCjRPTP6zfDulnwecK3ooC5wE6wSmoKOO4kriS26aCw_GmDZLgvxl5A2TjHIwbweZXDXb7CZWfEkU3wtl7-Zhs-qP_Egsxw=w408-h272-k-no', '0915973866', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Picenza+Th%C3%A1i+Nguy%C3%AAn/data=!4m7!3m6!1s0x3135277092685e01:0xb28c20340c847342!8m2!3d21.606723!4d105.8378147!16s%2Fg%2F11j8hlk1lq!19sChIJAV5oknAnNTERQnOEDDQgjLI?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #27: Sân Bóng Núi Căng
-- Loại: Sân 11 người | Giá: 800,000 đ/h
-- Chủ sân: Đặng Thành Bảo | SĐT: 0973520397
-- Tài khoản: owner.dangthanhbao.27@footballbooking.com | Mật khẩu gốc: Owner@8177
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đặng Thành Bảo', 'owner.dangthanhbao.27@footballbooking.com', '$2a$10$gB1AxxZhNqCMXu5ra5wxmeVWBGveDV2Sli8AY.o.XVcoR7RFi6A.q', '0973520397', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Sân Bóng Núi Căng', 'FW68+89P, Điềm Thụy, Thái Nguyên, Việt Nam', 'Sân bóng phong trào hàng đầu khu vực, tổ chức giao lưu hàng tuần, có khu vực ngồi nghỉ và giải khát rộng rãi.', 800000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcLErMZlDPy3e9M6j8nUsEovNYk9M55NJGbFijG2j4f4nSI_8ArafbOZ3Wwuu7zd07wlFybEHibK2UAca0w4ieomkY4t9ftbtCtyVKtPHGVY3EtcRhETfDSjG173tSI2JkcvfQWBw=w408-h306-k-no', '0973520397', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+N%C3%BAi+C%C4%83ng/data=!4m7!3m6!1s0x31351919266e7693:0xe0f02254cddbff17!8m2!3d21.460837!4d105.915953!16s%2Fg%2F11k0tcp702!19sChIJk3ZuJhkZNTERF__bzVQi8OA?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #28: Sân cỏ nhân tạo Thái Hưng
-- Loại: Sân 5 người | Giá: 320,000 đ/h
-- Chủ sân: Vũ Quang Cường | SĐT: 0988222113
-- Tài khoản: owner.vuquangcuong.28@footballbooking.com | Mật khẩu gốc: Owner@6539
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Vũ Quang Cường', 'owner.vuquangcuong.28@footballbooking.com', '$2a$10$UCMJzw10OK9.wQ3WvF0R5uESqp5cZhhW0Cwrrcl95Iu30q.FZ15HC', '0988222113', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân cỏ nhân tạo Thái Hưng', 'HR9X+XPP, Gia Sàng, Thái Nguyên, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 320000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdXRwkEy9fjWWlSL5sahXWhzcGqfJo0SKxec0gAOoYd_IvJ1dUIX1EAOXsfVuz3i2SVetJGIs3VaUIy_J5uanscPANNjTXaTBxNZvZBfOKDbNzI5dM69uQWlGmy8DkuOWzrTK4c=w408-h272-k-no', '0988222113', 'https://www.google.com/maps/place/S%C3%A2n+c%E1%BB%8F+nh%C3%A2n+t%E1%BA%A1o+Th%C3%A1i+H%C6%B0ng/data=!4m7!3m6!1s0x313527d3e714fd27:0x5a14a9932e31f5c7!8m2!3d21.5699561!4d105.8493139!16s%2Fg%2F11f9ct71_f!19sChIJJ_0U59MnNTERx_UxLpOpFFo?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #29: Sân Bóng Quang Khánh (Sân Thiên Long Cũ)
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Lâm Quang Nam | SĐT: 0588666665
-- Tài khoản: owner.lamquangnam.29@footballbooking.com | Mật khẩu gốc: Owner@2163
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lâm Quang Nam', 'owner.lamquangnam.29@footballbooking.com', '$2a$10$jY0tM/1AhwBIEWlosfLyIO3hJiWsKJsorH2IkAYTKOxamUIiQqZrS', '0588666665', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Quang Khánh (Sân Thiên Long Cũ)', 'Ngõ 272 Đ. 3/2, Tích Lương, Thái Nguyên 240000, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcAb0GiXD3lgKU6LT0AuZBGe6JCjb-KhH-5-rpxexZY00YFh-2r6NFmK9rCc9rdJyvc6oup-YRD1u-kbuWpdp2Nm63RXuydwWEGhnUVZuU8Cxsw2qoPk5bnphzGmAzUq0ox3e3a_zRqEoU=w408-h306-k-no', '0588666665', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Quang+Kh%C3%A1nh+%28S%C3%A2n+Thi%C3%AAn+Long+C%C5%A9%29/data=!4m7!3m6!1s0x3135210144046ff5:0x2ed3af4356d8e9d5!8m2!3d21.5560696!4d105.8281442!16s%2Fg%2F11vc72g1sy!19sChIJ9W8ERAEhNTER1enYVkOv0y4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #30: Sân cỏ nhân tạo Gia Sàng
-- Loại: Sân 5 người | Giá: 250,000 đ/h
-- Chủ sân: Lê Đình Tú | SĐT: 0977324520
-- Tài khoản: owner.ledinhtu.30@footballbooking.com | Mật khẩu gốc: Owner@2160
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lê Đình Tú', 'owner.ledinhtu.30@footballbooking.com', '$2a$10$COJDfb39arr5H4xxiWNo6.MURFIRrj.8jXcvcBEA1uz30Eb5d6PaO', '0977324520', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân cỏ nhân tạo Gia Sàng', '463 Đ. Cách Mạng Tháng 8, Gia Sàng, Thái Nguyên, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 250000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdwHyhSQDdDmykrXhaJPjKKeXml6IX8YkFhKj42sJliYU32n0GAnjdmytB6O_B_konOuMNX_6rVG8PsDo5NV8L6U0SDF865nN7dYI7oKTSEQs2jmVy3lRnGArMPfwOBpn2ENN8=w408-h275-k-no', '0977324520', 'https://www.google.com/maps/place/S%C3%A2n+c%E1%BB%8F+nh%C3%A2n+t%E1%BA%A1o+Gia+S%C3%A0ng/data=!4m7!3m6!1s0x313526c12dcb8d5b:0x753c409958da7b2d!8m2!3d21.5818161!4d105.8497927!16s%2Fg%2F1tfk1xhz!19sChIJW43LLcEmNTERLXvaWJlAPHU?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #31: Hoàng Anh CLUB ( Sân bóng đá, CLB BiA, Gaming, Pickleball)
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Lý Tuấn Bách | SĐT: 0974024678
-- Tài khoản: owner.lytuanbach.31@footballbooking.com | Mật khẩu gốc: Owner@3167
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lý Tuấn Bách', 'owner.lytuanbach.31@footballbooking.com', '$2a$10$qfVC4jLkW9Z7g263/P.ciuMMTUvG40LxBYdsIb1URrlvrEgObOmu.', '0974024678', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Hoàng Anh CLUB ( Sân bóng đá, CLB BiA, Gaming, Pickleball)', 'Cổng phụ Trường Cao đẳng Kinh Tế, 167 Tân Thịnh, Quyết Thắng, Thái Nguyên, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 450000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcl8XJQ20ICG7DKtWYcxJvzI6CEnoYBP8exgqd0Ya7zu_jVscLGXdbFYhawQmF9ML_e0hwTsSdh-jJsC5H9Z71rixQxWPvFQ3OxURMz37aBuTQgDWcEkxQxx2r70nKa8AYZ7r0l=w408-h544-k-no', '0974024678', 'https://www.google.com/maps/place/Ho%C3%A0ng+Anh+CLUB+%28+S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1,+CLB+BiA,+Gaming,+Pickleball%29/data=!4m7!3m6!1s0x313521457348f04f:0x8fc5527370477593!8m2!3d21.5637051!4d105.825287!16s%2Fg%2F11sgns29xm!19sChIJT_BIc0UhNTERk3VHcHNSxY8?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #32: Nhà Thi Đấu Tỉnh Thái Nguyên
-- Loại: Sân 5 người | Giá: 350,000 đ/h
-- Chủ sân: Lý Quang Việt | SĐT: 02083756015
-- Tài khoản: owner.lyquangviet.32@footballbooking.com | Mật khẩu gốc: Owner@7669
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lý Quang Việt', 'owner.lyquangviet.32@footballbooking.com', '$2a$10$xL1TLMPt3.1.KIau6alwx.RxyWOtFkwwChMzukKsVWJ4f3OCntIrG', '02083756015', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Nhà Thi Đấu Tỉnh Thái Nguyên', 'HRXR+MV6, Đội Cấn, Phan Đình Phùng, Thái Nguyên, Việt Nam', 'Sân bóng trang bị dàn đèn cao áp siêu sáng, dịch vụ đồ uống đa dạng, cho thuê giày và phụ kiện thi đấu.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/ACvplmMXgttCcifcgLSymcx0Gwv4NmaMXCINNIUiMvpWTPJUZnD08HUKdwEZJpEhm0TjIu9lEUBYKygLl0JE2_qI-be3uUaP9WkBrwaB_f_BTYggZqLulQ62vUzYf65gUZtY-OAAmBpb=w408-h306-k-no', '02083756015', 'https://www.google.com/maps/place/Nh%C3%A0+Thi+%C4%90%E1%BA%A5u+T%E1%BB%89nh+Th%C3%A1i+Nguy%C3%AAn/data=!4m7!3m6!1s0x313526efe052b847:0x467de163b74ff93e!8m2!3d21.5991563!4d105.842154!16s%2Fg%2F11hzcy4hyp!19sChIJR7hS4O8mNTERPvlPt2PhfUY?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #33: Sân bóng An Phát - Tân Tiến
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Ngô Thế Tùng | SĐT: 0968823333
-- Tài khoản: owner.ngothetung.33@footballbooking.com | Mật khẩu gốc: Owner@7735
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Ngô Thế Tùng', 'owner.ngothetung.33@footballbooking.com', '$2a$10$UiKYXdbAqeaL2FeKNtdBM.YayO62e7MCWsMrz7dOHC1atKrtkOBt2', '0968823333', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng An Phát - Tân Tiến', 'tdp chùa 2, Vạn Xuân, Thái Nguyên, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfUjHFwMcpKzWziti9MGL8n8mom_hbHf18xMG-Op23_oYz5jPRyiYTl8uYDd-crTUhwo2Nhu4nGNek8GW-7-YfgzaQUb3_8BVD1vkvgarxVpHErz9AgeYGIyDkwIkrJlSnIiLL8Wg=w408-h306-k-no', '0968823333', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+An+Ph%C3%A1t+-+T%C3%A2n+Ti%E1%BA%BFn/data=!4m7!3m6!1s0x313519f52a4cf643:0x6993031b94dc7266!8m2!3d21.4076768!4d105.8835167!16s%2Fg%2F11j4k9ct5b!19sChIJQ_ZMKvUZNTERZnLclBsDk2k?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #34: Sân cỏ nhân tạo Quang Vinh
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Mai Gia Thắng | SĐT: 0963715930
-- Tài khoản: owner.maigiathang.34@footballbooking.com | Mật khẩu gốc: Owner@1993
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Mai Gia Thắng', 'owner.maigiathang.34@footballbooking.com', '$2a$10$62oBOZpMm09yWJ/BlZAW7eu33CjUwg/yUqepBVx0IKy/tu.1yXUW2', '0963715930', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân cỏ nhân tạo Quang Vinh', 'JR58+GPR, Quan Triều, Thái Nguyên, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdBTuP3cwdN9UMCq0zhvfS18ToEXCSeqEsYpjhS3Bv9Xrv_uajL5qwAJXQK5uQ11ZmmDnDsX7PrPq6IShRkVtBi6y18-JJIFRoSIkm0xp_kfzB2f1UQXtciGY_S9rPBmF7XmgAWLQ=w408-h306-k-no', '0963715930', 'https://www.google.com/maps/place/S%C3%A2n+c%E1%BB%8F+nh%C3%A2n+t%E1%BA%A1o+Quang+Vinh/data=!4m7!3m6!1s0x31352708bf3c275f:0x123aa78f554d88fc!8m2!3d21.6088707!4d105.8167624!16s%2Fg%2F1vlj_0k_!19sChIJXyc8vwgnNTER_IhNVY-nOhI?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #35: Nhà thi đấu thể thao ĐH Thái Nguyên
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Vũ Tuấn Hoàng | SĐT: 0912586525
-- Tài khoản: owner.vutuanhoang.35@footballbooking.com | Mật khẩu gốc: Owner@9786
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Vũ Tuấn Hoàng', 'owner.vutuanhoang.35@footballbooking.com', '$2a$10$ninWUjIKy60sZE74qFsAwODN6d.Sw.wgLEpmSyqFN.i2gbmvVcmWS', '0912586525', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Nhà thi đấu thể thao ĐH Thái Nguyên', 'HRW6+95M, đê, Quyết Thắng, Thái Nguyên, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 450000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLeGp2RuUh-R0RYr8aAoN-ALHJrkqC9fb-RdRC9-D7PvZRHFj5mDzNkJWtz6upfOwTZ-xAdaxAoo-0PiiQzw-ndUbGLjDXVT4kn83jVDKGm6G1Ia_u33lWvzb0jIXmycVXilwMClpA=w408-h306-k-no', '0912586525', 'https://www.google.com/maps/place/Nh%C3%A0+thi+%C4%91%E1%BA%A5u+th%E1%BB%83+thao+%C4%90H+Th%C3%A1i+Nguy%C3%AAn/data=!4m7!3m6!1s0x313527140dcc8317:0xc70716f973127a0!8m2!3d21.5959504!4d105.8104168!16s%2Fg%2F1vntgc9d!19sChIJF4PMDRQnNTERoCcxl29xcAw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #36: Sân bóng Đại Phúc
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Võ Trọng Bình | SĐT: 0868357976
-- Tài khoản: owner.votrongbinh.36@footballbooking.com | Mật khẩu gốc: Owner@2235
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Trọng Bình', 'owner.votrongbinh.36@footballbooking.com', '$2a$10$lI4sCZL0Ho9AzkP/bhNw6OrscHwlq0ZUYdg.1ZUfAzSGnTloL/kXO', '0868357976', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Đại Phúc', '53FJ+63J, Võ Cường, Bắc Ninh, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 500000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLe8Vs1o9Cz91w5pMGAjaOFJFlzKQK74YnR2csyopGo9uMPLOET0l5hmJADmdrtLR7ZXCEZI4CEgPhQQtVANkqwv0GLzfjDiUE5cwQYah9h3Zr0E6TlAqOMPrb_RI5VC_vruNT8Y=w408-h306-k-no', '0868357976', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%90%E1%BA%A1i+Ph%C3%BAc/data=!4m7!3m6!1s0x31350c09a28f4aeb:0xe19594aeb740b940!8m2!3d21.173097!4d106.0801327!16s%2Fg%2F1q5d5_042!19sChIJ60qPogkMNTERQLlAt66UleE?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #37: Sân Bóng Cỏ Nhân Tạo Hải Nam
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Trần Gia Bách | SĐT: 0978343784
-- Tài khoản: owner.trangiabach.37@footballbooking.com | Mật khẩu gốc: Owner@1241
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trần Gia Bách', 'owner.trangiabach.37@footballbooking.com', '$2a$10$NSxiFdT8aZyHojuOySL/JOq4SvVyit52dQYrgzqkbXlG/IGb8XhR6', '0978343784', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Cỏ Nhân Tạo Hải Nam', '52P2+4QV, Yên Phong, Bắc Ninh, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfC6N_GCSBrlx2juS2CfX2d4szurfGIJbeA2sQVFhR3NoONnrL7Ww1yYXcvalNeaCzJlvXNXeRjs8HBdOGPZ62aqIIL02L5U5m0gR6RO9fcffaEfV0GgBJL2KBr9wrsexB-5VLhUg=w408-h306-k-no', '0978343784', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+C%E1%BB%8F+Nh%C3%A2n+T%E1%BA%A1o+H%E1%BA%A3i+Nam/data=!4m7!3m6!1s0x31350f52bde751cf:0x42b7e8c8f8f1f83c!8m2!3d21.185372!4d106.001919!16s%2Fg%2F11flf5_42q!19sChIJz1HnvVIPNTERPPjx-Mjot0I?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #38: Sân Bóng Đá ĐẠI VĨ
-- Loại: Sân 11 người | Giá: 800,000 đ/h
-- Chủ sân: Ngô Bá Việt | SĐT: 0917504727
-- Tài khoản: owner.ngobaviet.38@footballbooking.com | Mật khẩu gốc: Owner@4502
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Ngô Bá Việt', 'owner.ngobaviet.38@footballbooking.com', '$2a$10$fau4Xk5fgUDTCtgwtg1/lOvnbFuefhxAeBKb2j3/yJN9LBv8YSduK', '0917504727', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Sân Bóng Đá ĐẠI VĨ', 'Mão Điền, Bắc Ninh 16000, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 800000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLc0xUukeCyHmGM60A44oI7MKxQe13X-kAJHTmTl0smLctHPMRYzNMrqoZW-j7Ip9P1dV8ySgKlgmLyett6GC5hAKJpQpTh_YA6A6UtkvJf3uevgj0rDIEIU_dVy7Iy_j-lSI0Jy=w426-h240-k-no', '0917504727', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+%C4%90%E1%BA%A0I+V%C4%A8/data=!4m7!3m6!1s0x3135a13dd2ef387f:0x448818c9bb1320ea!8m2!3d21.0681943!4d106.1020133!16s%2Fg%2F11krjy9108!19sChIJfzjv0j2hNTER6iATu8kYiEQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #39: Sân Bóng An Lạc Gia
-- Loại: Sân 5 người | Giá: 250,000 đ/h
-- Chủ sân: Hồ Văn Vũ | SĐT: 0988081834
-- Tài khoản: owner.hovanvu.39@footballbooking.com | Mật khẩu gốc: Owner@5345
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Hồ Văn Vũ', 'owner.hovanvu.39@footballbooking.com', '$2a$10$.1C1a7sz7QIu.YWY9s7iAe3ftVhcR.Aw23wktb8IlZLYXFu2Z.nSi', '0988081834', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng An Lạc Gia', 'Lương Tân, Yên Trung, Bắc Ninh, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 250000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLct2AWllZBD-t-umIcZB74Lk7C4V810ShlOxYMPDHQ4gOO198d-W1imZPcMR4ELpfEH6Yw_BiuxXaP4KObPexLd-7v9s42eYkO1pJ8csOAcwZHD7PH-wWTdf38C9xiHnWrbaLBY=w408-h306-k-no', '0988081834', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+An+L%E1%BA%A1c+Gia/data=!4m7!3m6!1s0x31350fd58e806f17:0x619b77ac5ac3507d!8m2!3d21.2194209!4d105.9821905!16s%2Fg%2F11f5t_kwg4!19sChIJF2-AjtUPNTERfVDDWqx3m2E?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #40: Sân Bóng Đá Hào Hiệp
-- Loại: Sân 11 người | Giá: 1,000,000 đ/h
-- Chủ sân: Ngô Huy Minh | SĐT: 0987844522
-- Tài khoản: owner.ngohuyminh.40@footballbooking.com | Mật khẩu gốc: Owner@3536
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Ngô Huy Minh', 'owner.ngohuyminh.40@footballbooking.com', '$2a$10$7lyPSsLXCVeKNGeJ5HdmWO9RqBKS3MgBVv3zIjOsS/lHAxaXG/zhu', '0987844522', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Sân Bóng Đá Hào Hiệp', '52P2+5W2, Yên Phong, Bắc Ninh, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 1000000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLem2OYtwrcW1w_iz8zEq0obzgn-GNHMIvhge28HbM2-XyFMcU9rXCk_9bG-vhw8f7Y-IAVtoFpT0OFI1fDi8LeX1gPmtm9eKTJfV1taE0yD88Y0eQ63FSOCIgFpHplRcmxmSDQFjQ=w408-h306-k-no', '0987844522', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+H%C3%A0o+Hi%E1%BB%87p/data=!4m7!3m6!1s0x31350f03429067b7:0xba536579948a2f7c!8m2!3d21.1858745!4d106.0025686!16s%2Fg%2F11kj_bdw9z!19sChIJt2eQQgMPNTERfC-KlHllU7o?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #41: Sân Phủi Tây Hồ (Dabaco)
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Lâm Huy Tuấn | SĐT: 0369378542
-- Tài khoản: owner.lamhuytuan.41@footballbooking.com | Mật khẩu gốc: Owner@6138
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lâm Huy Tuấn', 'owner.lamhuytuan.41@footballbooking.com', '$2a$10$7o/rw1xC72.lPQxdE2KfY.QjsF8.ywd0l7ICUWgoLcYDoDDfLO2je', '0369378542', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Phủi Tây Hồ (Dabaco)', 'Unnamed, Road, Phương Liễu, Bắc Ninh, Việt Nam', 'Sân cỏ nhân tạo chất lượng cao đạt chuẩn, hệ thống đèn LED chiếu sáng hiện đại, bãi giữ xe rộng rãi.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcsaf0WM_lXmBxrux8dEyjZmBlpidrG10Ft2FYuEx-1dyXVRGn_pTwkOz4Zx9rfPgi4UgjhoSIGryQUP-ZIb9sY8qD2GXeywkpdGk24BF2m1CJ24cOw4xsVRJZrW-1PZgZSfuih=w408-h306-k-no', '0369378542', 'https://www.google.com/maps/place/S%C3%A2n+Ph%E1%BB%A7i+T%C3%A2y+H%E1%BB%93+%28Dabaco%29/data=!4m7!3m6!1s0x31350b73b9580f19:0x4c918e525b505e0b!8m2!3d21.1582964!4d106.1428837!16s%2Fg%2F11j0hpkmk6!19sChIJGQ9YuXMLNTERC15QW1KOkUw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #42: Sân bóng bách Diệp
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Đinh Xuân Kiên | SĐT: 0972301689
-- Tài khoản: owner.dinhxuankien.42@footballbooking.com | Mật khẩu gốc: Owner@1931
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đinh Xuân Kiên', 'owner.dinhxuankien.42@footballbooking.com', '$2a$10$ImjTqeyeAH0/mPKFDu76zu6y75bujt5ZQUVOeEi2NjyXCgEzExWm.', '0972301689', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng bách Diệp', 'Phương Liễu, Bắc Ninh, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcOKXCt7DdhR0nmu__9LdE-5ISQaoTFc6uAhbqMPLLST9Ii37Mech-w5-5YwTVkE2fXA6fBZSB0Wk-LaDaCqUdvc-T1oDComUX1YUsPFcivTZ3N2rlBXY2YdAbQsnirv6Fw1ONiUg=w408-h306-k-no', '0972301689', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+b%C3%A1ch+Di%E1%BB%87p/data=!4m7!3m6!1s0x31350b659dae3f7b:0x6bec1f33484f83c9!8m2!3d21.155719!4d106.1258895!16s%2Fg%2F11dxbkmncv!19sChIJez-unWULNTERyYNPSDMf7Gs?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #43: Sân bóng Đạo Tú
-- Loại: Sân 11 người | Giá: 700,000 đ/h
-- Chủ sân: Lê Khắc Cường | SĐT: 0327779455
-- Tài khoản: owner.lekhaccuong.43@footballbooking.com | Mật khẩu gốc: Owner@4853
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lê Khắc Cường', 'owner.lekhaccuong.43@footballbooking.com', '$2a$10$01DAJGn5NRELkDY4.qnrg.x/2qvIfhwUO22ME/FADEbexclZOTBFO', '0327779455', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Sân bóng Đạo Tú', '337H+8J5, Đạo tú, Thuận Thành, Bắc Ninh, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 700000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdG9tu2nnT7epp7Q5JPISG2rNEQuSmstkoquqsDMarUuCUqt2Uk6qDuwnFhfjEvp52Xx27Oxbq9MQ73yg7barKqj21RLTahH-BfH1w_T_gagl1fAYVfGxf-CTxQdCK57S3A-qv7iMQ6K6s=w408-h544-k-no', '0327779455', 'https://www.google.com/maps/place/S%C3%A2n+bo%CC%81ng+%C4%90a%CC%A3o+Tu%CC%81/data=!4m7!3m6!1s0x3135a0b081cfa9a9:0xce58352e163b24c7!8m2!3d21.0632671!4d106.0790975!16s%2Fg%2F11c0w06d_q!19sChIJqanPgbCgNTERxyQ7Fi41WM4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #44: Sân Bóng Hoàng Yến
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Lâm Khắc Long | SĐT: 0352774896
-- Tài khoản: owner.lamkhaclong.44@footballbooking.com | Mật khẩu gốc: Owner@2343
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lâm Khắc Long', 'owner.lamkhaclong.44@footballbooking.com', '$2a$10$J3CzWP4F7LcXuGjHaXbA7Oinwwc6OIrOVof/MO9yC5yMyNp/n5Mfe', '0352774896', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Hoàng Yến', 'Unnamed, Road, Yên Phong, Bắc Ninh, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfpZOO6NQKHTGsW8USK3pQzFF4-ZrWyScJHeinpDB7d98cy4N_E-RNl6ZJ33A-vsSxoyyRpHOC2DGzfk2GZZ9Bm3v2LawtnJvPtHvCgYxXO1pIu_NkpbpKMf7-TC0VZSvMXfP1K=w408-h306-k-no', '0352774896', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Ho%C3%A0ng+Y%E1%BA%BFn/data=!4m7!3m6!1s0x31350f417768be23:0x2cfbc1dd25dcbace!8m2!3d21.2178137!4d105.9753741!16s%2Fg%2F11jk2qv3mm!19sChIJI75od0EPNTERzrrcJd3B-yw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #45: Sân Bóng Đá Khu Khả Lễ
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Đinh Tiến Phúc | SĐT: 0858836999
-- Tài khoản: owner.dinhtienphuc.45@footballbooking.com | Mật khẩu gốc: Owner@4346
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đinh Tiến Phúc', 'owner.dinhtienphuc.45@footballbooking.com', '$2a$10$kUNb3CN.Le3eCys9BizfV.OGnWiMS2G9uO3pw8/M7yQyFSgIuAL4.', '0858836999', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Khu Khả Lễ', 'Đ.Bình Than, Khả Lễ, Võ Cường, Bắc Ninh, Việt Nam', 'Sân bóng trang bị dàn đèn cao áp siêu sáng, dịch vụ đồ uống đa dạng, cho thuê giày và phụ kiện thi đấu.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfu6PYSlxkqm4QnnW-pZAtMKr295t20MmlQ1xF6yyylbIMs7MaZvuXiBKRnDCNWDT0vgwMEgeC2oc-J3dTaZaSOoj_-DaAid6LbmjD9_ITi7r7UTRt4IwPJkR7ybq9nQ4eXfC9x2A=w568-h240-k-no', '0858836999', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+Khu+Kh%E1%BA%A3+L%E1%BB%85/data=!4m7!3m6!1s0x31350940c5e0cc3d:0xf9a400f61d249025!8m2!3d21.1600613!4d106.0518961!16s%2Fg%2F11r2j_c2w1!19sChIJPczgxUAJNTERJZAkHfYApPk?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #46: Sân bóng đá Tu Hoàng Di Trạch
-- Loại: Sân 5 người | Giá: 300,000 đ/h
-- Chủ sân: Võ Thành Trung | SĐT: 0985335233
-- Tài khoản: owner.vothanhtrung.46@footballbooking.com | Mật khẩu gốc: Owner@5915
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Thành Trung', 'owner.vothanhtrung.46@footballbooking.com', '$2a$10$yth7t.Buan8kZ9z/AqpJbOirEHGekeZLGjBX/eSlwGMbvAWOqpOUe', '0985335233', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng đá Tu Hoàng Di Trạch', 'Tổ 8 P.Tu Hoàng, Xuân Phương, Hà Nội 10000, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 300000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLehIdDrDRCW-RYelad6GMmWrSBlSM4gpNO4g8WqrCRXgPcfIinllR1YeTLLZ7i_C_r2QSbo4Yme1URFz-ahLDCWaEwxWvuERa9YcpsfsxKFeZ3lvngX6ZoMPsJbdPzo2xkH1zBH=w408-h306-k-no', '0985335233', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+Tu+Ho%C3%A0ng+Di+Tr%E1%BA%A1ch/data=!4m7!3m6!1s0x3134553741541fa3:0x6da98c3f5379e9af!8m2!3d21.0493511!4d105.7284338!16s%2Fg%2F11w1r85cty!19sChIJox9UQTdVNDERr-l5Uz-MqW0?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #47: Sân bóng FIT MAX HUD
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Dương Khắc Nghĩa | SĐT: 0888883066
-- Tài khoản: owner.duongkhacnghia.47@footballbooking.com | Mật khẩu gốc: Owner@2638
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Dương Khắc Nghĩa', 'owner.duongkhacnghia.47@footballbooking.com', '$2a$10$czoAOf.xP2uVe1E5RBD0GeHzeoBjTQPrPfFlM7X95gxR1wmf2srVy', '0888883066', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng FIT MAX HUD', 'Khu đô thị, HUD Vân Canh, Khu chung cư CT Number One, Sơn Đồng, Hà Nội 10000, Việt Nam', 'Sân cỏ nhân tạo chất lượng cao đạt chuẩn, hệ thống đèn LED chiếu sáng hiện đại, bãi giữ xe rộng rãi.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLeN2ohAz8iiJ9EWJNZII9_lez3h128kLHvvHfZUAF2DUhoHjZ3sx7VkyGWzXhrQJf7hGHifxb5WeqsgFpux1hAzpOINP2lzoTWKF6BqDJX3hqLPgGIpEejwrCaw9VRowj2qiK0=w408-h306-k-no', '0888883066', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+FIT+MAX+HUD/data=!4m7!3m6!1s0x313455d8d71909f3:0x566eeea2a34f814f!8m2!3d21.0426971!4d105.7298256!16s%2Fg%2F11x8jvdwcd!19sChIJ8wkZ19hVNDERT4FPo6LublY?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #48: Sân Bóng Vân Canh
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Võ Minh Triết | SĐT: 0328992121
-- Tài khoản: owner.vominhtriet.48@footballbooking.com | Mật khẩu gốc: Owner@2127
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Minh Triết', 'owner.vominhtriet.48@footballbooking.com', '$2a$10$rEW2H/Qq0nDGyQkfI21U/OCRdLYG7rFYJ6W630ZjGHFODGCBdHrRi', '0328992121', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Vân Canh', '6 Ngõ 1 Đường Vân Canh, An Trai, Sơn Đồng, Hà Nội, Việt Nam', 'Sân bóng nằm trong khuôn viên thoáng mát, an ninh tốt, có khán đài che mưa nắng cho khán giả cổ vũ.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdObF9xc3WEE8QxnMvLWIlWl5CCtXleyDn4P6xNDf28MjH01M7ROHhQ6ZlHhm4ZpX5ocf-MK2DKl7yUkH7eda_luoraOTrbeZaLMTIexRueOwMeEpFL3TlmYw8vjWYjkOtIqk0=w408-h306-k-no', '0328992121', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+V%C3%A2n+Canh/data=!4m7!3m6!1s0x31345500509581d5:0xd1eeb618db002f6!8m2!3d21.0358074!4d105.73003!16s%2Fg%2F11y49x0m9n!19sChIJ1YGVUABVNDER9gKwjWHrHg0?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #49: Sân Bóng Đá Minh Khai
-- Loại: Sân 5 người | Giá: 300,000 đ/h
-- Chủ sân: Huỳnh Trọng Bách | SĐT: 0772229223
-- Tài khoản: owner.huynhtrongbach.49@footballbooking.com | Mật khẩu gốc: Owner@5956
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Huỳnh Trọng Bách', 'owner.huynhtrongbach.49@footballbooking.com', '$2a$10$YMAE1STQ.50jkdLiMe2CMeMz8GObXYUpjfvZQ6zAuIZY.UtQUXdWu', '0772229223', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng Đá Minh Khai', 'Ng. 136 Đ. Cầu Diễn Minh Khai, Quận, Tây Tựu, Hà Nội, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 300000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcGszkgLUSRSziGJOWLWp0y7zsMWoNVR-lc5I1padWBYqLasQlkOLw5jJBj4RXC4jCdPH3CnF13-hJa2epPtX6QYyu8fTVVmpWdXKMBIDgdPBzpnyTb_WNrq-XqhzTrQZIYsCNg5g2ClIME=w408-h306-k-no', '0772229223', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+Minh+Khai/data=!4m7!3m6!1s0x313454f0e3e3504d:0x509609de4b9a1e23!8m2!3d21.0498586!4d105.7427024!16s%2Fg%2F11c1s2bvtv!19sChIJTVDj4_BUNDERIx6aS94JllA?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #50: Sân bóng An Trai
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Đào Huy Toàn | SĐT: 0337400225
-- Tài khoản: owner.daohuytoan.50@footballbooking.com | Mật khẩu gốc: Owner@2697
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Huy Toàn', 'owner.daohuytoan.50@footballbooking.com', '$2a$10$qRQxSqvdkcDp.l3COUv28.nSd/90Awb8vUlxGWx.98btTYxYpExva', '0337400225', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng An Trai', '2PHM+G7F, Sơn Đồng, Hà Nội, Việt Nam', 'Sân cỏ nhân tạo chất lượng cao đạt chuẩn, hệ thống đèn LED chiếu sáng hiện đại, bãi giữ xe rộng rãi.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcJ3bNkiwSVkFvp3uzVrl98dWlY8Efcat3Kpupynzw8Ws68zrhS6o5x-Ne3Nr1iC-pfxv2A2j0F1BUPUJdE02_UdL41fnmyBe9iqJ6LipQTI0Nl354uWsWfgpixzaioNsFdUtLBbQ=w408-h843-k-no', '0337400225', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+An+Trai/data=!4m7!3m6!1s0x3134553e52be8799:0x503f5e4a197a86b2!8m2!3d21.0288082!4d105.7331803!16s%2Fg%2F11kpl1wysn!19sChIJmYe-Uj5VNDERsoZ6GUpeP1A?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #51: Sân bóng Khu công nghiệp Từ Liêm
-- Loại: Sân 11 người | Giá: 800,000 đ/h
-- Chủ sân: Phạm Quốc Hiếu | SĐT: 0983689091
-- Tài khoản: owner.phamquochieu.51@footballbooking.com | Mật khẩu gốc: Owner@3546
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Phạm Quốc Hiếu', 'owner.phamquochieu.51@footballbooking.com', '$2a$10$Y2ifKbaej9VhvvEmg7t1VenPV8Kjp.esUV.oKj8m5DPjlB4YvhtPu', '0983689091', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Sân bóng Khu công nghiệp Từ Liêm', 'Xuân Phương, Hà Nội, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 800000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLe7KXgzSRHB_E0tjqOvJLZwsRsmQpCUkdBqICbs-tQlvmLMQ6_zX6WmlrqnH3GoWm9iOfWd8HaaOPBLXO2hPVZOC4d3mMU-nhd_QXmmaplEzrB3FOdctbcU_6TwILFk3k1lqOIU0Q=w408-h306-k-no', '0983689091', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Khu+c%C3%B4ng+nghi%E1%BB%87p+T%E1%BB%AB+Li%C3%AAm/data=!4m7!3m6!1s0x313454f4206b89b5:0x9916c144166fd900!8m2!3d21.0468916!4d105.7394114!16s%2Fg%2F11g8wd68jh!19sChIJtYlrIPRUNDERANlvFkTBFpk?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #52: Sân bóng Trần Hữu Dực
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Bùi Tuấn Phúc | SĐT: 02873063788
-- Tài khoản: owner.buituanphuc.52@footballbooking.com | Mật khẩu gốc: Owner@9280
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Bùi Tuấn Phúc', 'owner.buituanphuc.52@footballbooking.com', '$2a$10$Ne86rQECM5GdP6uNcwlv8e.ShZJSrXm3Jb6g3A6CmSST7dm6HAgHS', '02873063788', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Trần Hữu Dực', 'Đường 70, gần trục đường, Trần Hữu Dực, Xuân Phương, Hà Nội, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcq4Ubpr0tCgR2crWXWiWBB2_f3FibJFpRNndwPE0tkzje540tiFCz8AH-1JAm8xi2fDoC7zaZJAGlOJjA12lcSHFZOmcdcn4rk9hC4Pu4DQd0BCORUHIWrUKjLp1Bw16X20gXwSw=w408-h306-k-no', '02873063788', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Tr%E1%BA%A7n+H%E1%BB%AFu+D%E1%BB%B1c/data=!4m7!3m6!1s0x313455e72aa2aca3:0xdbd93a7de504cfb2!8m2!3d21.032217!4d105.754074!16s%2Fg%2F11jp31k0wq!19sChIJo6yiKudVNDERss8E5X062ds?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #53: Sân bóng Xuân Phương
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Mai Hải Thịnh | SĐT: 0974064973
-- Tài khoản: owner.maihaithinh.53@footballbooking.com | Mật khẩu gốc: Owner@1722
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Mai Hải Thịnh', 'owner.maihaithinh.53@footballbooking.com', '$2a$10$UdxNkHaCIyXzlkZc5mIDZeTFIaeJECvC7P.o8RsaT3BmeXLiqOLKS', '0974064973', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Xuân Phương', '2PGQ+HJH, Đường XP 10, Xuân Phương, Hà Nội, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfj58ideyH1WyHfsZWDsMgFwgq1cbdDlOjCj8vWfvbQ50_sIADOxWVKboy8es3l7PP4N3py45uHf49nZidry2Ej7R_tRWAxQFb_sntqp7cfVqXhjddPZXif1YPybNL_IqPD1ZzE=w408-h725-k-no', '0974064973', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Xu%C3%A2n+Ph%C6%B0%C6%A1ng/data=!4m7!3m6!1s0x3134554cc220c4c5:0xb9e19f01a36537f2!8m2!3d21.0264413!4d105.739121!16s%2Fg%2F11mxzb6l8w!19sChIJxcQgwkxVNDER8jdlowGf4bk?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #54: Sân Bóng Quốc Vinh
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Võ Đức Lâm | SĐT: 0912789966
-- Tài khoản: owner.voduclam.54@footballbooking.com | Mật khẩu gốc: Owner@8007
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Đức Lâm', 'owner.voduclam.54@footballbooking.com', '$2a$10$Gu5Ig08LWE9P.kB6IxFk..AKb1w95XTY6A8UX92wTXNnzQlBUIJTC', '0912789966', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Quốc Vinh', 'Foresa 4B, Xuân Phương, Hà Nội, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLc7YTqStTblHqemcQhtmLEmGhZabEkdUkd3K0vuuHSyJK2C0AGl20y6fSfnbbDa-dQpHsXVOnsFW5lg8Ka2WplxcmcdZDhtxBMWcoDnX84r_Mdq6pUKrC4PUAQ-tgybXQSeSvE=w408-h544-k-no', '0912789966', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Qu%E1%BB%91c+Vinh/data=!4m7!3m6!1s0x313455a4a99491eb:0x6e10e9b487dac056!8m2!3d21.0308615!4d105.7481308!16s%2Fg%2F11jpgk2m2q!19sChIJ65GUqaRVNDERVsDah7TpEG4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #55: Sân Bóng Kiều Mai
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Hoàng Huy Long | SĐT: 0522491295
-- Tài khoản: owner.hoanghuylong.55@footballbooking.com | Mật khẩu gốc: Owner@7049
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Hoàng Huy Long', 'owner.hoanghuylong.55@footballbooking.com', '$2a$10$3UgYkLfaLsXras6PuxpKFeCqrkcfBJIdG4qhi0sIeZ./n2VZdwydK', '0522491295', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Kiều Mai', '2PRX+3G2, Unnamed, Road, Xuân Phương, Hà Nội, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcmaL3rV2FMuVsalvr0fKXaOyKYRQIZqu7XJx_NuXMySIoeum8-x5-Brlm-m0W9OKMc1mxywJhAIe2cJKuU2lNBaTefXN2oUtKI_6eWQf1kVDOV806PYIVQTdwW1fhhYu6hR4HH=w408-h306-k-no', '0522491295', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Ki%E1%BB%81u+Mai/data=!4m7!3m6!1s0x31345580bfa8ccf3:0xc2bdd7b3fa8876bc!8m2!3d21.0401464!4d105.7487773!16s%2Fg%2F11h_yrc40t!19sChIJ88yov4BVNDERvHaI-rPXvcI?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #56: Sân bóng TPG - Yên Mỹ
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Hoàng Đình Toàn | SĐT: 0836580111
-- Tài khoản: owner.hoangdinhtoan.56@footballbooking.com | Mật khẩu gốc: Owner@6974
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Hoàng Đình Toàn', 'owner.hoangdinhtoan.56@footballbooking.com', '$2a$10$yug0mhcaXXckeWmc3oSZSek9KcibCBM0lNU22mrrmpB1NuY0OQury', '0836580111', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng TPG - Yên Mỹ', 'V2RW+5W4, ĐT200, Yên Mỹ, Hưng Yên, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLesr4zkhhNqxxN1YywnX5h3C6abxTJ1grxTn6wTGnxcXlgzDEeTDh00bBXmttiOlfI0tZIeq616AJKEpUj41AlLwGXPDFBrNZbtO_PaxMEk6d_VVQ2SZcCbXatdUFX351LVe-E76g=w408-h306-k-no', '0836580111', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+TPG+-+Y%C3%AAn+M%E1%BB%B9/data=!4m7!3m6!1s0x3135bb07ae930d9b:0x9441bc4461b75a7a!8m2!3d20.89039!4d106.0473262!16s%2Fg%2F11q1q3l8ws!19sChIJmw2Trge7NTERelq3YUS8QZQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #57: Sân Bóng Đá Cỏ Nhân Tạo Chính Phương
-- Loại: Sân 5 người | Giá: 250,000 đ/h
-- Chủ sân: Phan Bảo Bình | SĐT: 0977441579
-- Tài khoản: owner.phanbaobinh.57@footballbooking.com | Mật khẩu gốc: Owner@2684
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Phan Bảo Bình', 'owner.phanbaobinh.57@footballbooking.com', '$2a$10$CymqLjpAR1YXdHn5bPrCz.uB2zm9yKNbP72VwVzvYJNLS8CJ8puE6', '0977441579', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng Đá Cỏ Nhân Tạo Chính Phương', 'W3G3+7CF, Thôn Thanh Xá, Xã Nghĩa Hiệp, Huyện Yên Mỹ, Tỉnh Hưng Yên, Nguyễn Văn Linh, Hưng Yên, Việt Nam', 'Khu liên hợp sân cỏ chất lượng cao, đèn chiếu sáng công suất lớn thi đấu ban đêm, bãi đỗ ô tô xe máy thoải mái.', 250000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcfrufojOc-vX6qqaspJXZLpSEKNTXz1AYoligvsi71XLdrTe_DtIllzVJvXccCX373nfUBErUrldBWJrpefaIIsH3Y341ZADBnzh_0F9fcD2Hitahc4cG5lK5iR1zmduRkPJ50qg=w520-h240-k-no', '0977441579', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+C%E1%BB%8F+Nh%C3%A2n+T%E1%BA%A1o+Ch%C3%ADnh+Ph%C6%B0%C6%A1ng/data=!4m7!3m6!1s0x3135a4a223a2cd29:0x72a3d6b3af2e0474!8m2!3d20.9256943!4d106.0535332!16s%2Fg%2F11c5sv0smh!19sChIJKc2iI6KkNTERdAQur7PWo3I?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #58: Sân bóng đá Ecopark
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Trịnh Minh Bình | SĐT: 0912588533
-- Tài khoản: owner.trinhminhbinh.58@footballbooking.com | Mật khẩu gốc: Owner@3662
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trịnh Minh Bình', 'owner.trinhminhbinh.58@footballbooking.com', '$2a$10$CBBu5Wp7f4E9mgIGK0N9yeWWFqdIBRENEq047/H4.VCVGgfxtYrQS', '0912588533', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá Ecopark', 'Khu đô thị Ecopark, Phụng Công, Hưng Yên, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLeaLKrrZ-aOpUxAnXVeXT3JE8T87Z-AI_uBj-kTTCFf154sPJS2cPcrEH_apTAZQpg9Sa4wmFfWhsLK0tPdWxBExdeZKk3DBPoWYdv0Pw5Wp5J_HQWD0nhJprh2oNyoA9e8yOD9=w408-h306-k-no', '0912588533', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+Ecopark/data=!4m7!3m6!1s0x3135af432a3d70c1:0x7b9037b4a0120023!8m2!3d20.9495244!4d105.9398853!16s%2Fg%2F11j02cthvq!19sChIJwXA9KkOvNTERIwASoLQ3kHs?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #59: Sân bóng Ninh Phong
-- Loại: Sân 11 người | Giá: 800,000 đ/h
-- Chủ sân: Nguyễn Đức Tú | SĐT: 0971410222
-- Tài khoản: owner.nguyenductu.59@footballbooking.com | Mật khẩu gốc: Owner@7745
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Nguyễn Đức Tú', 'owner.nguyenductu.59@footballbooking.com', '$2a$10$iw7yxBU.zAlVyGZxXjgL1O/bbhF6n3LES23gSfrNj7Ufw5UOEzmh2', '0971410222', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Sân bóng Ninh Phong', 'Việt Yên, Hưng Yên, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 800000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcawow-Hb5kP-mTLMXM_ZgrlqiBIXAEgiRv66yN6EGjGVZEVAHyGcSTY0L1n-J9tYxgiFSNuInVMD1ti7hs-yLjbuyHCQUTsL9ersZQIwSDzX_DPiMRNBiWPgZkBhluU30w3je4RQ_bJnjr=w408-h306-k-no', '0971410222', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Ninh+Phong/data=!4m7!3m6!1s0x3135bb5f53368d65:0xa609c1f56447c2d9!8m2!3d20.8873568!4d105.986717!16s%2Fg%2F11p9w49wwp!19sChIJZY02U1-7NTER2cJHZPXBCaY?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #60: Sân bóng Đoàn Kết, Ấp Bá Khê
-- Loại: Sân 5 người | Giá: 280,000 đ/h
-- Chủ sân: Huỳnh Quốc Vũ | SĐT: 0967049393
-- Tài khoản: owner.huynhquocvu.60@footballbooking.com | Mật khẩu gốc: Owner@1634
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Huỳnh Quốc Vũ', 'owner.huynhquocvu.60@footballbooking.com', '$2a$10$7Vk3BLlNhs7KmqipXbIFh.ccZ3v.ZuJdJnpg35.dv4tVizhrP0Go2', '0967049393', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng Đoàn Kết, Ấp Bá Khê', 'ấp, BÁ KHÊ, Văn Giang, Hưng Yên 10000, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 280000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdllujilkIvypUb5ClzLWgA_nssoGH224rzA7LgT3dZozxjuZn5rTpLtzrF6KxsoM5u9QusHmufeOSvarV__hhcmYo0evf7AwHiC0WZn-DVM6ZZRT4ATCeNfqP6HUs1DJucPbicrA=w408-h306-k-no', '0967049393', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%90o%C3%A0n+K%E1%BA%BFt,+%E1%BA%A4p+B%C3%A1+Kh%C3%AA/data=!4m7!3m6!1s0x3135af003db12433:0x57347bcc10a32576!8m2!3d20.9114241!4d105.945523!16s%2Fg%2F11vx6xftcl!19sChIJMySxPQCvNTERdiWjEMx7NFc?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #61: Trung tâm Đào tạo Bóng đá trẻ PVF
-- Loại: Sân 5 người | Giá: 280,000 đ/h
-- Chủ sân: Dương Thế Toàn | SĐT: 02213737087
-- Tài khoản: owner.duongthetoan.61@footballbooking.com | Mật khẩu gốc: Owner@4728
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Dương Thế Toàn', 'owner.duongthetoan.61@footballbooking.com', '$2a$10$gEQoDhsBDzhA5icpJPQbmeKpWIpm1FfFox7BfNcYbX6VTuNIxzTOm', '02213737087', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Trung tâm Đào tạo Bóng đá trẻ PVF', 'ĐT379, Nghĩa Trụ, Hưng Yên, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 280000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLemi6mzw1wOLJ0EcvrG841PfJnMRrlOt3ccvhGYGTd54uhuHUKwgk2KIV9e8FBSYGuj28hBjTgAK6kA6CacXeqvxfWwHMCXUqJHyLg_MScBVetgvs4Nc9A1RzdFxr9LLmswaTnY=w426-h240-k-no', '02213737087', 'https://www.google.com/maps/place/Trung+t%C3%A2m+%C4%90%C3%A0o+t%E1%BA%A1o+B%C3%B3ng+%C4%91%C3%A1+tr%E1%BA%BB+PVF/data=!4m7!3m6!1s0x3135af9558d23691:0xcaf88627c359bcc1!8m2!3d20.9274316!4d105.9443979!16s%2Fg%2F11g9q_kd6_!19sChIJkTbSWJWvNTERwbxZwyeG-Mo?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #62: Sân Bóng Hưng Sơn
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Bùi Ngọc Cường | SĐT: 0985222111
-- Tài khoản: owner.buingoccuong.62@footballbooking.com | Mật khẩu gốc: Owner@5573
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Bùi Ngọc Cường', 'owner.buingoccuong.62@footballbooking.com', '$2a$10$7E.DFAu0.G9H/tlg4v/0H.b59GQ5iIHYDWnGBkxtxvNpbAqGtp2AW', '0985222111', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Hưng Sơn', 'Dốc Đen, Trần Lãm, Hưng Yên, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdJhYpTojmFz0I8M1Px55PL2t0QTdysmQXTjcnb5n5O18j09t4wI6s-WUdF-FnHrPdMG21iFaqqXc2Ix8HQJUDyd9LPqd7AOELKwoYBQVgVeFI1vwoJ2a0WdQqI4gQ7wm59JZE=w430-h240-k-no', '0985222111', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+H%C6%B0ng+S%C6%A1n/data=!4m7!3m6!1s0x3135fb96d65e1f37:0xd2c50a2c5e157868!8m2!3d20.4388549!4d106.347216!16s%2Fg%2F11hyn5h2ch!19sChIJNx9e1pb7NTERaHgVXiwKxdI?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #63: Sân bóng Sinh Thái Vĩnh Hưng
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Đào Huy Tú | SĐT: 0901209678
-- Tài khoản: owner.daohuytu.63@footballbooking.com | Mật khẩu gốc: Owner@1452
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Huy Tú', 'owner.daohuytu.63@footballbooking.com', '$2a$10$JmQLArrWNcbb4Q/Lbd0LV.dQsjl.CUhzW8kTKYZa4aNsP9fimEUaa', '0901209678', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Sinh Thái Vĩnh Hưng', '315 P. Vĩnh Hưng, Vĩnh Hưng, Hà Nội, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfOs_zwN8dmaT8PSeDTIv_N3lwoAN0x3aCnF1vALy2ctjwOo-K7tiYUfbyf7sZx4fN7uVVOoeyWUhsODmlNNxou92bvhYPEdbEM-2cQ_IF3RRHRr4EeQASkeIBx7KDNaUop_e-x=w408-h544-k-no', '0901209678', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Sinh+Th%C3%A1i+V%C4%A9nh+H%C6%B0ng/data=!4m7!3m6!1s0x3135afe1cb95fd1d:0x8cb16abdd7ba5b69!8m2!3d20.9937268!4d105.878275!16s%2Fg%2F11tfn1qvrw!19sChIJHf2Vy-GvNTERaVu6171qsYw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #64: Sân Bóng Đá Đại An
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Lâm Ngọc Long | SĐT: 0838631991
-- Tài khoản: owner.lamngoclong.64@footballbooking.com | Mật khẩu gốc: Owner@2776
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lâm Ngọc Long', 'owner.lamngoclong.64@footballbooking.com', '$2a$10$YoOg1LiE6UPMKXs.Gfw.JuS4lKZkLfSkri0iN0pybbBx2LqUMAq.q', '0838631991', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Đại An', 'Nghĩa Trai, Như Quỳnh, Hưng Yên, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 450000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcu8JiAiBMJLojhPfNOFK8-sn9NIPHRrGzPqm81zt24dTGAETFLlkRBqjnn1pbf6duBIUQlcG4FxEt7v6gPgJU_xZMn5oG2n6UannLF_ZaM9l6egmoW7TQS5oKSAgBeap8bHn8=w408-h306-k-no', '0838631991', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+%C4%90%E1%BA%A1i+An/data=!4m7!3m6!1s0x3135a566d5103c99:0x9eb16c2dfca59069!8m2!3d20.97077!4d105.9821567!16s%2Fg%2F11jzhc3h6q!19sChIJmTwQ1WalNTERaZCl_C1ssZ4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #65: Sân Bóng Hoàng Anh
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Bùi Hải Thành | SĐT: 0987965983
-- Tài khoản: owner.buihaithanh.65@footballbooking.com | Mật khẩu gốc: Owner@9379
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Bùi Hải Thành', 'owner.buihaithanh.65@footballbooking.com', '$2a$10$SvK3dyDLTOtgvUHbcpWO8efqk9Z3WuW/ls8JMgBzUn25xX/iELUau', '0987965983', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Hoàng Anh', 'Lạc Đạo, Hưng Yên, Việt Nam', 'Sân bóng phong trào hàng đầu khu vực, tổ chức giao lưu hàng tuần, có khu vực ngồi nghỉ và giải khát rộng rãi.', 450000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLel22GIJrJAW5Q36FqYQDcr3_3QiNkPbJ9AFWI7TOjHoqJoKXRo-wI6b0n8hA5qWODUW_dmQj0mLLzLI2e-F7OWsGPA31I6MHMcfGed_KIiNkABW8YzCjckVjlMOC3HOmNQjt0PMA=w408-h272-k-no', '0987965983', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Ho%C3%A0ng+Anh/data=!4m7!3m6!1s0x3135a525c8934813:0xe4acfa8de02b0891!8m2!3d20.9858703!4d106.0302068!16s%2Fg%2F11mx3l3l9r!19sChIJE0iTyCWlNTERkQgr4I36rOQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #66: Sân bóng Anh Khoa 1
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Võ Đình Tùng | SĐT: 0868105333
-- Tài khoản: owner.vodinhtung.66@footballbooking.com | Mật khẩu gốc: Owner@1027
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Đình Tùng', 'owner.vodinhtung.66@footballbooking.com', '$2a$10$rSJHGBO.Mbt4i4MbKvoLX.oYPtWr4b/uITOxB6SVGxNk541HgOuKG', '0868105333', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Anh Khoa 1', 'Đ. Lê Thái Tổ, Hoa Lư, Ninh Bình, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdtqkwL98YPu5idq-E03KQfxW1eS-DUl7Y4Sg8-m8-r5fv1nkwdT7SrQALFdDqUbprecK3utVP81WJs7TJIarKxkujwNcAA2RIEIAONSw1RfAemLmQiO2jNwqlYqRcGht3ZXAJ1=w408-h544-k-no', '0868105333', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Anh+Khoa+1/data=!4m7!3m6!1s0x31367a03b65bf629:0x82c11516ca135918!8m2!3d20.2525386!4d105.9622657!16s%2Fg%2F11g6rlbyqd!19sChIJKfZbtgN6NjERGFkTyhYVwYI?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #67: Sân bóng An Ninh
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Đào Tuấn Bảo | SĐT: 0979928776
-- Tài khoản: owner.daotuanbao.67@footballbooking.com | Mật khẩu gốc: Owner@8066
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Tuấn Bảo', 'owner.daotuanbao.67@footballbooking.com', '$2a$10$fDYUV9TzpapmTjaepjaAnejwdLivslbYwAdka8LGzcDmUVBgarplq', '0979928776', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng An Ninh', '6VV3+637, Đồng Mốc, Sóc Sơn, Hà Nội, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLchPUg0fIaIhEYq_eAc0-rfMDp5SxIpRrw6B7HmKRHPc0wI018_SV7Vni7cYunczmMxWer9DqqnsotYq5EGlIabPwDMpOWuomVm-O9SD1I0rcFiuHdxkB5ag9s2ibASzkKyeO0=w426-h240-k-no', '0979928776', 'https://www.google.com/maps/place/S%C3%A2n+bo%CC%81ng+An+Ninh/data=!4m7!3m6!1s0x31350374cc83405b:0x8c3208d19de7ceab!8m2!3d21.243027!4d105.8526582!16s%2Fg%2F11hdb1x2n2!19sChIJW0CDzHQDNTERq87nndEIMow?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #68: Sân Bóng - Pickleball Ninh Khánh
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Bùi Bảo Đạt | SĐT: 0889361362
-- Tài khoản: owner.buibaodat.68@footballbooking.com | Mật khẩu gốc: Owner@5920
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Bùi Bảo Đạt', 'owner.buibaodat.68@footballbooking.com', '$2a$10$ek/F/UqZMxeu9MJrpdystuSp/jyO8Mim3sMHrVNGSUyL4FQCskdSW', '0889361362', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng - Pickleball Ninh Khánh', '151/36 Đ. Lê Thái Tổ, Hoa Lư, Ninh Bình, Việt Nam', 'Sân bóng trang bị dàn đèn cao áp siêu sáng, dịch vụ đồ uống đa dạng, cho thuê giày và phụ kiện thi đấu.', 450000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLc2RwJtRv2IywzWer-3-j0Ay6s7POj7Z3rSWBlfuSjgy3l3h5K4d6xzbW3kaqSLHCOJUaG4JzUcec6dhPADC8wEAgA7_87PjDcwxx49JZo-3HtYZu503rIAJVqyCagZ4V7HjrKNXUU0fgE=w408-h306-k-no', '0889361362', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+-+Pickleball+Ninh+Kh%C3%A1nh/data=!4m7!3m6!1s0x31367900791c5a11:0x32cb349934331a1f!8m2!3d20.2783222!4d105.9607734!16s%2Fg%2F11lzn7pqc9!19sChIJEVoceQB5NjERHxozNJk0yzI?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #69: Sân Bóng Hồng Minh
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Hồ Duy Hiếu | SĐT: 0966158159
-- Tài khoản: owner.hoduyhieu.69@footballbooking.com | Mật khẩu gốc: Owner@3085
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Hồ Duy Hiếu', 'owner.hoduyhieu.69@footballbooking.com', '$2a$10$KwhuC.flj.gd/2fah98hiesaaedQIVrMePJTfQyah06slLFd2j0/a', '0966158159', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Hồng Minh', '6XMH+C98, Lý Nhân Tông, Phúc Lộc, Nam Hoa Lư, Ninh Bình, Việt Nam', 'Khu liên hợp sân cỏ chất lượng cao, đèn chiếu sáng công suất lớn thi đấu ban đêm, bãi đỗ ô tô xe máy thoải mái.', 500000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLc-o1fIP1DmTTV9xpvSc7K41BFHXmZ320mZGPSjCFBYzVdxhoF9Kyzee4Qf5TPlHDCHA4nI-kgqL617ieivt3V11ztc6t842M8enSYM6GrTdL2b6KxIw64UbVKxHlKDu9sBt4T-=w408-h306-k-no', '0966158159', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+H%E1%BB%93ng+Minh/data=!4m7!3m6!1s0x313671de5289efa5:0x1fe49ad9322f19ac!8m2!3d20.2335347!4d105.978453!16s%2Fg%2F11nxt79b4j!19sChIJpe-JUt5xNjERrBkvMtma5B8?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #70: Sân bóng Chính Gấm Tam Điệp
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Huỳnh Khắc Nghĩa | SĐT: 0966228135
-- Tài khoản: owner.huynhkhacnghia.70@footballbooking.com | Mật khẩu gốc: Owner@5930
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Huỳnh Khắc Nghĩa', 'owner.huynhkhacnghia.70@footballbooking.com', '$2a$10$MOfUfUy2NCx5d6/fUjxMHu1uyf113xE1nOPYW4KnyZgR7tnZprnlC', '0966228135', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Chính Gấm Tam Điệp', '03 Ngô Văn Sở, Tam Điệp, Ninh Bình, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 500000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdvz-HGB9jtKIEYxvuWH-5RMCIoSPqUOpOZwANBu1shm7sqmA_TiZ2nvEvqQ7FtfcXFgcbPFMNymFZJpDerUYFDnGj619C2WLnqy_gfEkHpOGSH7wgbdeQTR4u0OZxWpN2FEDgK=w426-h240-k-no', '0966228135', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Ch%C3%ADnh+G%E1%BA%A5m+Tam+%C4%90i%E1%BB%87p/data=!4m7!3m6!1s0x31366583033f16a1:0x96858d61ad763b14!8m2!3d20.1627536!4d105.9247651!16s%2Fg%2F11r87dfvlt!19sChIJoRY_A4NlNjERFDt2rWGNhZY?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #71: Sân Bóng Tân Thành (Sân Bóng Gia Viên)
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Đặng Tuấn Tùng | SĐT: 0914356121
-- Tài khoản: owner.dangtuantung.71@footballbooking.com | Mật khẩu gốc: Owner@6279
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đặng Tuấn Tùng', 'owner.dangtuantung.71@footballbooking.com', '$2a$10$.xlbej0ewIhBe23yvA6vQO5AqeuVa0GFrROMXtGciqYLiA0vMYQ4.', '0914356121', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Tân Thành (Sân Bóng Gia Viên)', 'Lai Thành, Ninh Bình, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdinacXvwMaQALemtc0oAOxfFBNogPPd8JnlGx4NOTQyY-L-u68LVXT9dej-uWJoBkvpTgvGnjdctNt5viKOOn8L_RQYp25HLhThOJ5zRfcVLo2dPbs_9mLDneDjWzTNSxViGr4ZQ=w493-h240-k-no', '0914356121', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+T%C3%A2n+Th%C3%A0nh+%28S%C3%A2n+B%C3%B3ng+Gia+Vi%C3%AAn%29/data=!4m7!3m6!1s0x31366d37f1820985:0x29b6e17a866bcf4d!8m2!3d20.087762!4d106.0762791!16s%2Fg%2F11f710s634!19sChIJhQmC8TdtNjERTc9rhnrhtik?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #72: Sân Bóng Đá Đông Nội
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Phan Xuân Việt | SĐT: 0913338322
-- Tài khoản: owner.phanxuanviet.72@footballbooking.com | Mật khẩu gốc: Owner@3780
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Phan Xuân Việt', 'owner.phanxuanviet.72@footballbooking.com', '$2a$10$ZZj37.JiCo.0/uF9P1MBqe6BtBnCcvsYFhGLU2WLfb5fFXT4ZfBeK', '0913338322', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Đông Nội', 'TDP Đông Nội, Phường, Duy Tân, Ninh Bình, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 500000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfoc2k8v8i2S6D7KG4U6iRQieg92o2X0KLSLnrqqb-kU4Fy-o7DhwDLMYzpSnX_RCNyTiIQXtD-VXdC-kdg7dyiWBrq9ZBvPHp8Nj7_vFTvGorlGSiKEXUMr_CcQwKrs6277prM=w493-h240-k-no', '0913338322', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+%C4%90%C3%B4ng+N%E1%BB%99i/data=!4m7!3m6!1s0x3135c7900b910c01:0x276ce46f28679cc1!8m2!3d20.6559768!4d105.9875541!16s%2Fg%2F11qc4869m6!19sChIJAQyRC5DHNTERwZxnKG_kbCc?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #73: Sân bóng đá cỏ nhân tạo làng Tiền.
-- Loại: Sân 5 người | Giá: 300,000 đ/h
-- Chủ sân: Đào Gia Đông | SĐT: 0866086662
-- Tài khoản: owner.daogiadong.73@footballbooking.com | Mật khẩu gốc: Owner@6491
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Gia Đông', 'owner.daogiadong.73@footballbooking.com', '$2a$10$GA.aEHeZLk.zWPVl5EEkA.3z63KIB7yEb5egmKnIoq5sTZMW3o6we', '0866086662', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng đá cỏ nhân tạo làng Tiền.', '84P4+V38, Unnamed Road, Liên Minh, Ninh Bình, Việt Nam', 'Sân bóng nằm trong khuôn viên thoáng mát, an ninh tốt, có khán đài che mưa nắng cho khán giả cổ vũ.', 300000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfLAe6cZd0rrOGtUa7GPyJ_0r1hlZ3kQjZVE8qvDuZyCJzmAKsG4Vzk3MVPOf9uiM4MtKeyJRRXxkUtfxxZqGutzUIVvJs4xsBYYl2Scoa1lAUPayJO1TOK_t24lnR51FSbTXGdOg=w408-h306-k-no', '0866086662', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+c%E1%BB%8F+nh%C3%A2n+t%E1%BA%A1o+l%C3%A0ng+Ti%E1%BB%81n./data=!4m7!3m6!1s0x3135dfbe5eb488bf:0x5f48bcf546fab315!8m2!3d20.3371674!4d106.105209!16s%2Fg%2F11llwlhl3x!19sChIJv4i0Xr7fNTERFbP6RvW8SF8?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #74: Sân Bóng Bình Minh
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Đặng Quang Hoàng | SĐT: 0397014232
-- Tài khoản: owner.dangquanghoang.74@footballbooking.com | Mật khẩu gốc: Owner@3414
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đặng Quang Hoàng', 'owner.dangquanghoang.74@footballbooking.com', '$2a$10$5n4DHlW86V5ahHH7TM9Bweji9F8yviPP7Y8uTV3nG4XA75Ijc/syq', '0397014232', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Bình Minh', 'Khu P. Thú Y, Hoài Đức, Hà Nội, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdeTGqlF-eZ3CE7QryTrqZ1DWSJN62RlCvR7ciuei1i_DhtqWJB0DPP9vPTMe6VhKSgvvTKMkNCWYxkSQSnrbrcCP7l8s5WqIFRl7i-wDTYebsDHDUuaRJu8dDgPAQyRMRpAQ0q=w408-h544-k-no', '0397014232', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+B%C3%ACnh+Minh/data=!4m7!3m6!1s0x313455c4dc896bc7:0xdabdc63478e26834!8m2!3d21.0774771!4d105.6985941!16s%2Fg%2F11qm075rn1!19sChIJx2uJ3MRVNDERNGjieDTGvdo?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #75: Sân bóng đá cỏ nhân tạo
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Trịnh Hữu Quang | SĐT: 0375555963
-- Tài khoản: owner.trinhhuuquang.75@footballbooking.com | Mật khẩu gốc: Owner@7790
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trịnh Hữu Quang', 'owner.trinhhuuquang.75@footballbooking.com', '$2a$10$K62d2c6iXZGEAGB9jGsAI.V4NMVQxfh4M.//6NFzBGQJbDvjrnp76', '0375555963', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá cỏ nhân tạo', '6X2C+H54, Nam Hoa Lư, Ninh Bình, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLcTG7gDrBAR0PkuTUhCbMF8Cv5aTMRJdFXK25pLUFBvtMUCP4mZUKEhI9s8GXk_UjlIcjtK1JOfqGLurXY2KDRO4ZLlEM2yUzNnuRy5Xu5481fwT87JImd9kqr-86fa-WnW0Tpetw=w532-h240-k-no', '0375555963', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+c%E1%BB%8F+nh%C3%A2n+t%E1%BA%A1o/data=!4m7!3m6!1s0x3136716320e89e13:0x9bdac862bbbf1136!8m2!3d20.199954!4d105.971022!16s%2Fg%2F11tj1db577!19sChIJE57oIGNxNjERNhG_u2LI2ps?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #76: Sân bóng nhà văn hoá Thanh Xuân
-- Loại: Sân 5 người | Giá: 350,000 đ/h
-- Chủ sân: Hồ Bá Hải | SĐT: 0945697597
-- Tài khoản: owner.hobahai.76@footballbooking.com | Mật khẩu gốc: Owner@4997
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Hồ Bá Hải', 'owner.hobahai.76@footballbooking.com', '$2a$10$0he.9f6CPgBeR9k6TvVE7OhOwmCPzv2z0VbuX8VI5S6cboEb5kgDC', '0945697597', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng nhà văn hoá Thanh Xuân', '166 Khuất Duy Tiến, Thanh Xuân, Hà Nội, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdeoCQB30AclFPnjFqEKyf_nrJ7EYRzOVcx9wklvaZRl7XmKrTvBsbhtPjmEEZ9VN5Nf0PcFJodOj2CT4NvBF5IpXJfkMts2svZX_0HqmIoWx0WX3ztZAg96XVVN_qycszJICC6=w408-h725-k-no', '0945697597', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+nh%C3%A0+v%C4%83n+ho%C3%A1+Thanh+Xu%C3%A2n/data=!4m7!3m6!1s0x3135adc170ab23dd:0xe5d7641cf185c3bf!8m2!3d21.0013564!4d105.7979409!16s%2Fg%2F11sf0btvcz!19sChIJ3SOrcMGtNTERv8OF8Rxk1-U?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #77: Sân Bóng Thành Phát
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Ngô Quang Quân | SĐT: 0975611652
-- Tài khoản: owner.ngoquangquan.77@footballbooking.com | Mật khẩu gốc: Owner@9486
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Ngô Quang Quân', 'owner.ngoquangquan.77@footballbooking.com', '$2a$10$Ytpi.brLAYxpfDLG/0w9COS1QfsMS3T8onV0.EprcGqOyW/7g1i3O', '0975611652', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Thành Phát', '2 Đ. Hoàng Minh Giám, Tổ 22, Yên Hòa, Hà Nội, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfznco17UjXSjj00hfyp_iYbpHq8elYH0HHTCs7HcRdsIEhjlQbBqS4750Ti2mLPEHqlPO9BoVieIlxg_tmIioZNauGVIMDQxgV2Z79gct-oI2WfJpRuTfCrSmOzjQL9nJ4agQN=w408-h306-k-no', '0975611652', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Th%C3%A0nh+Ph%C3%A1t/data=!4m7!3m6!1s0x3135aca5bb9cfb5f:0xfe3fd2517ffcf89f!8m2!3d21.0050054!4d105.7961051!16s%2Fg%2F11g6qrjs5w!19sChIJX_ucu6WsNTERn_j8f1HSP_4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #78: Sân bóng Thành Lâm 3
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Phạm Trọng Trung | SĐT: 0977300429
-- Tài khoản: owner.phamtrongtrung.78@footballbooking.com | Mật khẩu gốc: Owner@8612
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Phạm Trọng Trung', 'owner.phamtrongtrung.78@footballbooking.com', '$2a$10$moRs46rU3LGwasa6.ktejezqIiYbck6zC2rMEo4JBxWFKXcHKtWLu', '0977300429', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Thành Lâm 3', 'Ng. 3 P. Tôn Thất thuyết, Cầu Giấy, Hà Nội 10000, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfgNp79I7bbZda-E4OhtlxrNejUdGO1K-CRe7Pmf5H5Zg3p6B75UYvIFNZUKBhIMInYPrZOTF1_41kqliY9TDK_2SbvAI9NjeCrZTNlBUY1wgDffxc4EW46wW5vcNN7If0UkWcGYw=w408-h306-k-no', '0977300429', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Th%C3%A0nh+L%C3%A2m+3/data=!4m7!3m6!1s0x3135ab86cb2c8729:0xee93ccd4066e274b!8m2!3d21.0263012!4d105.7855174!16s%2Fg%2F11pkjbh973!19sChIJKYcsy4arNTERSyduBtTMk-4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #79: Sân vận động Thanh Hóa
-- Loại: Sân 5 người | Giá: 350,000 đ/h
-- Chủ sân: Bùi Trọng Đông | SĐT: 02873046288
-- Tài khoản: owner.buitrongdong.79@footballbooking.com | Mật khẩu gốc: Owner@9270
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Bùi Trọng Đông', 'owner.buitrongdong.79@footballbooking.com', '$2a$10$YKqys7nFSXEWt5rpD3Tg3OIsPkTI/OC2XLUrPKRvG7AXLGYKC.YNS', '02873046288', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân vận động Thanh Hóa', '37 Lê Quý Đôn, Hạc Thành, Thanh Hóa, Việt Nam', 'Sân bóng trang bị dàn đèn cao áp siêu sáng, dịch vụ đồ uống đa dạng, cho thuê giày và phụ kiện thi đấu.', 350000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdVXmQLC3LkFt2Wgbkmq4iPYbqXYV1NqAXOfXGMJ0uoHn5SrHpvP-7tPCO6ZaLGoHBjrGW7DoT0ore61Z5VPxs7Dm9R_1jujjdYpCLTja3YTgIjlbQPB4d0JQSKxUnAVNDGXYUD-g=w412-h240-k-no', '02873046288', 'https://www.google.com/maps/place/S%C3%A2n+v%E1%BA%ADn+%C4%91%E1%BB%99ng+Thanh+H%C3%B3a/data=!4m7!3m6!1s0x3136f805707a3f03:0xb19a2c225f777060!8m2!3d19.7991863!4d105.7728035!16s%2Fm%2F051xf9r!19sChIJAz96cAX4NjERYHB3XyIsmrE?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #80: Sân Bóng Đá Thành Dũng
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Huỳnh Bá Lâm | SĐT: 0336106884
-- Tài khoản: owner.huynhbalam.80@footballbooking.com | Mật khẩu gốc: Owner@5246
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Huỳnh Bá Lâm', 'owner.huynhbalam.80@footballbooking.com', '$2a$10$Rz03CzJ42OQLOPwdQrYkTeVeHfG/qTw9An7f3X8cB8ZROL0ENrYIG', '0336106884', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Thành Dũng', '100 Phạm Tu, Thanh Liệt, Hà Nội, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 550000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLchZGlHclfoBP05Be71MbRy9sky7RMmdtgx0cM_nKR4Rm17NzIptNEXuVWB-4AB9SmCJr3zSe8RWaBGm7HyiNweGo_L21Mxv2lEpQcmiZNDfy_iJbFiOjvAsoZucQe-TWBK7Z1b0A=w408-h306-k-no', '0336106884', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+Th%C3%A0nh+D%C5%A9ng/data=!4m7!3m6!1s0x3135ad1b657af2a3:0x514b7d9ad57d5350!8m2!3d20.9665223!4d105.8037884!16s%2Fg%2F11lnh60gqf!19sChIJo_J6ZRutNTERUFN91Zp9S1E?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #81: Sân Bóng Akka Đại Thanh
-- Loại: Sân 5 người | Giá: 300,000 đ/h
-- Chủ sân: Lý Gia Bình | SĐT: 0919091636
-- Tài khoản: owner.lygiabinh.81@footballbooking.com | Mật khẩu gốc: Owner@5499
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lý Gia Bình', 'owner.lygiabinh.81@footballbooking.com', '$2a$10$LwKaEOSGoQ5QL6FsrhwSX.1SrBRRHMLzm6L20deVd8WTxGGANdkYi', '0919091636', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng Akka Đại Thanh', 'Tả Thanh Oai, Đường Bờ Sông, Đại Thanh, Hà Nội 100000, Việt Nam', 'Sân bóng nằm trong khuôn viên thoáng mát, an ninh tốt, có khán đài che mưa nắng cho khán giả cổ vũ.', 300000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdz2VgEHoOKWprpbWdBUANrObgfNbPvNB6yuoFB70FAlHourQYLeefeUD1l4zN8IhRwKEkCIOUSUSDcxc7ZpT8rb2Xtyfa7VUeZB9aibhdNHTGOWaXfpiaZ9P-nXVX4hitZGyYl=w426-h240-k-no', '0919091636', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Akka+%C4%90%E1%BA%A1i+Thanh/data=!4m7!3m6!1s0x3135ad7b6ea1da29:0x7c0d89d22475de51!8m2!3d20.9376997!4d105.8137371!16s%2Fg%2F11vbqq7qyv!19sChIJKdqhbnutNTERUd51JNKJDXw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #82: Sân Bóng La Thành
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Võ Tiến Huy | SĐT: 0968098686
-- Tài khoản: owner.votienhuy.82@footballbooking.com | Mật khẩu gốc: Owner@9849
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Tiến Huy', 'owner.votienhuy.82@footballbooking.com', '$2a$10$2g/S4a1SvzDOIsiROnAPre9NkGAmEQ2ISv6D2rEnywBTRzufB9L6K', '0968098686', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng La Thành', 'Ngõ 93 Hoàng Văn Thái, Phương Liệt, Hà Nội, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 450000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLe7TSodfcvJyZL9-uPRzW4u3-loccNHf8qYtz4vZhSyqw-MKqfgJ75pSNdhUFIGJo10W66LkGTyR13FHAZEIUb8VNO7g2nXhpSgSp1KWlIaSL76y-5hbd1kJpeWivhthM3vjY85=w408-h306-k-no', '0968098686', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+La+Th%C3%A0nh/data=!4m7!3m6!1s0x3135ad4fa9a1a181:0x1722d834ebd36edb!8m2!3d20.9919754!4d105.8264876!16s%2Fg%2F11gqqb9gp_!19sChIJgaGhqU-tNTER227T6zTYIhc?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #83: Sân Bóng Trung Kính Hạ
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Hồ Minh Khoa | SĐT: 0915144060
-- Tài khoản: owner.hominhkhoa.83@footballbooking.com | Mật khẩu gốc: Owner@2052
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Hồ Minh Khoa', 'owner.hominhkhoa.83@footballbooking.com', '$2a$10$UsdN3g02ZnjqHBpVufm7FuK.uXnoAht8JEoCW/24aYUxEKdpW/Jm2', '0915144060', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Trung Kính Hạ', 'Tú Mỡ, Yên Hòa, Hà Nội, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 400000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLdDbRhfthVOfuk9O11p5mdXm35ugQy5Ifd-zSFcGQ-m95D9SCqPp5WJf_-fxzCNhtpgiLykusah1X_7Pe2GcvKSJaeCJHDmN3eXysYdSjlVxH_5zvfIxxRFOtZK85tIN3RKgryn=w408-h306-k-no', '0915144060', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Trung+K%C3%ADnh+H%E1%BA%A1/data=!4m7!3m6!1s0x3135aca78d552277:0x161698ceeaba800f!8m2!3d21.011776!4d105.7955066!16s%2Fg%2F11c54cckzn!19sChIJdyJVjaesNTERD4C66s6YFhY?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #84: Sân bóng đá B5 Mai Dịch
-- Loại: Sân 5 người | Giá: 320,000 đ/h
-- Chủ sân: Bùi Huy Quang | SĐT: 0967958880
-- Tài khoản: owner.buihuyquang.84@footballbooking.com | Mật khẩu gốc: Owner@7812
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Bùi Huy Quang', 'owner.buihuyquang.84@footballbooking.com', '$2a$10$vFyEST57cxrzJ2is7PCvO.4AcjEaQr4eIy1T939DHtgBEXWWIeEG2', '0967958880', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng đá B5 Mai Dịch', 'Phú Diễn, Hà Nội, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 320000.00, 'https://lh3.googleusercontent.com/grass-cs/ACvplmMtZU2T_iWKsHtKrYV7u3pBZnTmD1s-w5J2oW_22xDDiuMw1phI30v0Yc0FoMWOBPGaVvjH-ET8BEimZW3EnnyCXoHSq3lY6eAnnZERSXCrFkKQdXpSxmDHibG7RuQLu-XIcX3wow=w408-h306-k-no', '0967958880', 'https://www.google.com/maps/place/S%C3%A2n+bo%CC%81ng+%C4%91a%CC%81+B5+Mai+Di%CC%A3ch/data=!4m7!3m6!1s0x313454cc5d553e91:0x8687a4956330a748!8m2!3d21.0437384!4d105.7776717!16s%2Fg%2F11f134pnzk!19sChIJkT5VXcxUNDERSKcwY5Wkh4Y?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #85: Sân bóng Thanh Anh
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Lâm Văn Nghĩa | SĐT: 0989534765
-- Tài khoản: owner.lamvannghia.85@footballbooking.com | Mật khẩu gốc: Owner@7232
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lâm Văn Nghĩa', 'owner.lamvannghia.85@footballbooking.com', '$2a$10$TMGkTHtt4IzawOYlQLOeWuzXRQmHeNrOe8AKWRYj4BKZ0jBImDv2u', '0989534765', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Thanh Anh', 'XG3R+FWR, Phú Cát, Hà Nội, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 500000.00, 'https://lh3.googleusercontent.com/grass-cs/AABkmLfYRNQqyUGWeQQDdTdmzOK26DrbxU-fRVWKaT0dItmoKjAvlxUTvoWEW04L4dNifa_AOGdwOpWs9D82jYa0_jKcQm6AeuvkQRWTkInfghxoZxY2ICRx2BBqRUFF88WKOy9N2x54=w408-h306-k-no', '0989534765', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Thanh+Anh/data=!4m7!3m6!1s0x31345b8e31eec6e9:0x10a4910c315939a6!8m2!3d20.9537381!4d105.542266!16s%2Fg%2F11r26jzdfv!19sChIJ6cbuMY5bNDERpjlZMQyRpBA?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNS4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #86: Sân bóng Toà Án Tỉnh
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Hồ Hải Bách | SĐT: 0971572555
-- Tài khoản: owner.hohaibach.86@footballbooking.com | Mật khẩu gốc: Owner@9947
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Hồ Hải Bách', 'owner.hohaibach.86@footballbooking.com', '$2a$10$mfMMVEB.L8Hum5ieePNdg.kIQTinfxuUZ3ieSQijThanNkm03eKwG', '0971572555', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Toà Án Tỉnh', '15 Đ. Phú Yên, Vinh Phú, Nghệ An, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RH0QKYADo1SJTfnXF3XtKacN-ckaRRlqNSFQOks-xUgyXlTU-6cCd0rpsvZcjcIeT8Ths7DjEAyyzxQXUIcpSpJkFdNxQzGTcb-AGjafUM8RZtlPsA98P0Z_d2x_uzephMUEXsAQ=w408-h285-k-no', '0971572555', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+To%C3%A0+%C3%81n+T%E1%BB%89nh/data=!4m7!3m6!1s0x3139cfda64e76edd:0xe32ea898aa673d3c!8m2!3d18.7010567!4d105.6876189!16s%2Fg%2F11n5v6hwk6!19sChIJ3W7nZNrPOTERPD1nqpioLuM?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #87: Sân bóng Trường dạy Nghề Số 01
-- Loại: Sân 5 người | Giá: 280,000 đ/h
-- Chủ sân: Vũ Ngọc Tùng | SĐT: 0986263214
-- Tài khoản: owner.vungoctung.87@footballbooking.com | Mật khẩu gốc: Owner@8956
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Vũ Ngọc Tùng', 'owner.vungoctung.87@footballbooking.com', '$2a$10$Oiicnu4iJPbKJ7mKqJxAcuIHNQYzRtbMt6VPcQX5nN4glw097xkWW', '0986263214', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng Trường dạy Nghề Số 01', '59-55 Tuệ Tĩnh, Vinh Phú, Nghệ An, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 280000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Qe97MB9jNFm_mj9QxfynKr-BVmLndSLu3OOCUvtZF8ub7HQvd-aJsrWdrlRLWCnokK1nCYG-XfZfHZSbp25lfdILc5iZQV7_aU11axaP0XmbV7si5OcVgZgu6N3DjJOfcUcj4Hz8QNmFFS=w408-h306-k-no', '0986263214', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Tr%C6%B0%E1%BB%9Dng+d%E1%BA%A1y+Ngh%E1%BB%81+S%E1%BB%91+01/data=!4m7!3m6!1s0x3139cd6e103a563d:0xc7ec986f6ed3ab11!8m2!3d18.6911302!4d105.6913707!16s%2Fg%2F11k1j1f22y!19sChIJPVY6EG7NOTEREavTbm-Y7Mc?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #88: Sân Bóng Đá Sara
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Đào Thành Kiên | SĐT: 0966053282
-- Tài khoản: owner.daothanhkien.88@footballbooking.com | Mật khẩu gốc: Owner@8657
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Thành Kiên', 'owner.daothanhkien.88@footballbooking.com', '$2a$10$fAmiWnolfr9pIfLVar1x1OhzdHk6qOeJcbj2G./RCv9Vmptk7fLpC', '0966053282', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Sara', 'MMWP+8JR, Vinh Phú, Nghệ An, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SROuF_69NOkmu-zfw70xtEP6HPlAGhkw6lfK-OUPFEzwC_Dtx2bPNnflyYCHVI-6LZe1FOOK1wzKJYN6e6ErZTdtpP-UG3EAzekWusaJM1-d_LTC6_A2hjrRc9znNzIE1HA8k=w408-h544-k-no', '0966053282', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+Sara/data=!4m7!3m6!1s0x3139ce086dbcd9cf:0x2bc81c963adbb1f9!8m2!3d18.6958556!4d105.6865!16s%2Fg%2F11c52byw3n!19sChIJz9m8bQjOOTER-bHbOpYcyCs?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #89: Câu lạc bộ Bóng đá Sông Lam Nghệ An
-- Loại: Sân 11 người | Giá: 700,000 đ/h
-- Chủ sân: Lâm Công Hùng | SĐT: 0826137137
-- Tài khoản: owner.lamconghung.89@footballbooking.com | Mật khẩu gốc: Owner@2375
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lâm Công Hùng', 'owner.lamconghung.89@footballbooking.com', '$2a$10$oZ1DR7qa51ltpdm1O8SDnuSMukPCev1ksKoAhRmZpLG6rsCc7X0lG', '0826137137', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Câu lạc bộ Bóng đá Sông Lam Nghệ An', 'Số 6 Đào Tấn, Thành Vinh, Nghệ An 460000, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 700000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TDbXfNfPe-oIFjPgfiq7XFXbEon8jmdyWffEJKRmUCBePcKJFCyVCWRLg4z8U3uSLeaJEuQrNKBKWV8WG5dFo3-1xQ7yQNtso2KzzR0tufKV6SeY09T0YRk6IXhHM0wuGK_u-X=w408-h544-k-no', '0826137137', 'https://www.google.com/maps/place/C%C3%A2u+l%E1%BA%A1c+b%E1%BB%99+B%C3%B3ng+%C4%91%C3%A1+S%C3%B4ng+Lam+Ngh%E1%BB%87+An/data=!4m7!3m6!1s0x3139ce667dc14671:0xee0bfb6724fce10e!8m2!3d18.671517!4d105.6681866!16s%2Fg%2F1vgq9knp!19sChIJcUbBfWbOOTERDuH8JGf7C-4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #90: Sân Cỏ Nhân Tạo Trang Bùi
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Huỳnh Đình Phúc | SĐT: 0919551357
-- Tài khoản: owner.huynhdinhphuc.90@footballbooking.com | Mật khẩu gốc: Owner@7211
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Huỳnh Đình Phúc', 'owner.huynhdinhphuc.90@footballbooking.com', '$2a$10$8NyA1nwGTQAUBevfjJb8/u6O.8vadGA79bS4z98.nWANReVGrBfJi', '0919551357', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Cỏ Nhân Tạo Trang Bùi', '80 Đường Hà Huy Tập, Vinh Phú, Nghệ An, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 400000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Slkt5zBdwroq2t707aSoljzHJH4LC17lXH-yFhmUeDqFuqssVkMRuhd2afqHkXFyKZasJK3WqHgOHFf9XVvsUnW6ygtzxV5VpwcaXQ9HFVZ8WOJKPFLAg-Y-bO246W6jsD2RcZ=w408-h306-k-no', '0919551357', 'https://www.google.com/maps/place/S%C3%A2n+C%E1%BB%8F+Nh%C3%A2n+T%E1%BA%A1o+Trang+B%C3%B9i/data=!4m7!3m6!1s0x3139ce0dc24c86e5:0xe40a2a7234714ac8!8m2!3d18.6900881!4d105.6780854!16s%2Fg%2F11c56f_x1n!19sChIJ5YZMwg3OOTERyEpxNHIqCuQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #91: Sân bóng đá Lê Trọng Tấn
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Bùi Thành Thịnh | SĐT: 0917688186
-- Tài khoản: owner.buithanhthinh.91@footballbooking.com | Mật khẩu gốc: Owner@7906
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Bùi Thành Thịnh', 'owner.buithanhthinh.91@footballbooking.com', '$2a$10$e4rKVXpvwTyJSmxlCqMzfeU15i5ZOwJK0hkUrhxYzIo/AuUFU3Lum', '0917688186', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá Lê Trọng Tấn', 'KĐT Geleximco, Dương Nội, Hà Nội, Việt Nam', 'Khu liên hợp sân cỏ chất lượng cao, đèn chiếu sáng công suất lớn thi đấu ban đêm, bãi đỗ ô tô xe máy thoải mái.', 500000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9R-hijWbT4lBv_ihIQtKN9n1L2lkUBPTej-YyKv-lIg4HV0Zrx_fqk-F3UdzwAc-i1vJvLCGY4ZNOTE-Uf4xC99mlQM61sFm1bgYOXr9d2_SAnXQOAiT69k-vxV-rU42trTmhQ_=w408-h306-k-no', '0917688186', 'https://www.google.com/maps/place/S%C3%A2n+bo%CC%81ng+%C4%91a%CC%81+L%C3%AA+Tr%E1%BB%8Dng+T%E1%BA%A5n/data=!4m7!3m6!1s0x313453d795798c91:0xf3d39f0895736c48!8m2!3d20.9819718!4d105.7416172!16s%2Fg%2F11km9dsh1w!19sChIJkYx5lddTNDERSGxzlQif0_M?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #92: Sân bóng Phú Vinh
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Nguyễn Huy Tuấn | SĐT: 0903458235
-- Tài khoản: owner.nguyenhuytuan.92@footballbooking.com | Mật khẩu gốc: Owner@6733
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Nguyễn Huy Tuấn', 'owner.nguyenhuytuan.92@footballbooking.com', '$2a$10$3xqVU.yUEatg6uasUFlzaeQjZdDpfzUHkoSa19Ks2i1WY0rUh3KVy', '0903458235', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Phú Vinh', '2P9C+JG2 Chân, Cầu vượt An Khánh, Sơn Đồng, Hà Nội, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 350000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Q7Miq8sMl1OyPjynDDXHXVwBQROhgGv5zQcwSHGmPUZItjP3eCfA91tkqJAh6Hs3tzXT2EvMwCU5c_T1g89Td-N_ewpKn5f3daFI-z3r_hPAeGotrLgb4AMMcKZgZTeT6IV-w-aA=w408-h306-k-no', '0903458235', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Ph%C3%BA+Vinh/data=!4m7!3m6!1s0x3134535fb362a445:0x4bf2d4f7fe5fbe13!8m2!3d21.019011!4d105.7212713!16s%2Fg%2F11flc05rwt!19sChIJRaRis19TNDERE75f_vfU8ks?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #93: Sân Bóng Cầu Đơ
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Trần Văn Bình | SĐT: 0356525327
-- Tài khoản: owner.tranvanbinh.93@footballbooking.com | Mật khẩu gốc: Owner@4266
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trần Văn Bình', 'owner.tranvanbinh.93@footballbooking.com', '$2a$10$mCEyj5Y7knfxmOyAUaOnl.Yi.7u6u.iVQQluqQaLnYFDF5xPL7aJq', '0356525327', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Cầu Đơ', 'XQ9G+6H5, Lê Hồng Phong, Hà Đông, Hà Nội, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 350000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QBREiuZYESaCxIFw8S68wyQGuvGMG3UPjeOFwJ_PM8cQ5BV75UJHQBjWwdvxoycYSIUki0LzYjcUJ12y4-bN-DOA1ALhqURonESmWWJoTLn-8qdgMIQqfxWr1vdsNKzl9BCnNH=w408-h306-k-no', '0356525327', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+C%E1%BA%A7u+%C4%90%C6%A1/data=!4m7!3m6!1s0x3134532a041421ad:0x3f665ee396f0c5e!8m2!3d20.9680001!4d105.776491!16s%2Fg%2F11c6l9tmm8!19sChIJrSEUBCpTNDERXgxvOe5l9gM?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #94: Sân Bóng Bách Nghệ
-- Loại: Sân 5 người | Giá: 350,000 đ/h
-- Chủ sân: Vũ Minh Việt | SĐT: 0974963966
-- Tài khoản: owner.vuminhviet.94@footballbooking.com | Mật khẩu gốc: Owner@2874
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Vũ Minh Việt', 'owner.vuminhviet.94@footballbooking.com', '$2a$10$qaN2Up7reHM3nTZniBOryuvRtYFBo2fLRyL3CG0WVBvSOeLkY6vLa', '0974963966', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng Bách Nghệ', 'Cụm 5 Hạ Hội, Tân Lập, 252 Đường Hạ Hội, Ô Diên, Hà Nội 10000, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 350000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TWzyGmJVcoQbadfiiohMlrjxfomu8lEvOEP_qM6wR4wAGIdFOUoJBX05_oQ50h2OU9JzhU_dSdvmC7Sfy2Iorw-SwrQTfKEn9Yc0wHRk9HtUvXkaBmLTi1aoAwPW6FXu3uzH5nJQ=w408-h725-k-no', '0974963966', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+B%C3%A1ch+Ngh%E1%BB%87/data=!4m7!3m6!1s0x313455bdc4f520dd:0x1638b081a3d7c5f5!8m2!3d21.0875322!4d105.7184306!16s%2Fg%2F1pp2vbcd0!19sChIJ3SD1xL1VNDER9cXXo4GwOBY?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #95: Sân Bóng đá Học Viện Tài Chính
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Võ Thế Kiên | SĐT: 0962801990
-- Tài khoản: owner.vothekien.95@footballbooking.com | Mật khẩu gốc: Owner@2876
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Thế Kiên', 'owner.vothekien.95@footballbooking.com', '$2a$10$oMGFgw1H5Zm7diNfdLHoBOlaF0Yg2mpB6rt7104TyeNkSuy77w6hm', '0962801990', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng đá Học Viện Tài Chính', '69 Đ. Đức Thắng, Đông Ngạc, Hà Nội, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 400000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Rv-1yugHKWVZcoLo3cyYxhh-MuR32WxAxdXx5w7JmFY-i9L18yU8APOgBHJ4YrszP7bZC31FrMZZtMoMs4dlgQQfymFHCMlGeIGlqrJLln3iA4qtynCTzUBGZUqnNareBCMYdV=w408-h306-k-no', '0962801990', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%91%C3%A1+H%E1%BB%8Dc+Vi%E1%BB%87n+T%C3%A0i+Ch%C3%ADnh/data=!4m7!3m6!1s0x3134553ace6ac633:0xbe19d882f13b7810!8m2!3d21.0797534!4d105.7803506!16s%2Fg%2F11mwm13smh!19sChIJM8ZqzjpVNDEREHg78YLYGb4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #96: Sân bóng Văn Quang
-- Loại: Sân 5 người | Giá: 280,000 đ/h
-- Chủ sân: Phạm Công Hùng | SĐT: 0911021633
-- Tài khoản: owner.phamconghung.96@footballbooking.com | Mật khẩu gốc: Owner@6111
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Phạm Công Hùng', 'owner.phamconghung.96@footballbooking.com', '$2a$10$skm5zBaqDt848ftsfCpfXuV5Wpq6xCuBfUE.BSLS5x82IzGbUerAi', '0911021633', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng Văn Quang', 'Đ. Mới, xóm Nội, Kiều Phú, Hà Nội, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 280000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RbyFMm0AZBySgod6cr4cRnh9afR-NL6iNSqkIA-rNb_wJGsX5ghc1Vz9Fd3LQcj3EQLTSjLs9xS77ysJFxrsVU0wk4jnXVtOSzXJQ2TYPD11iWsDpTvfN1seZwbrsYLTNfuWs6=w408-h260-k-no', '0911021633', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+V%C4%83n+Quang/data=!4m7!3m6!1s0x313451bf01c1a7fd:0x54e8cea8052b0b21!8m2!3d20.9728287!4d105.6057844!16s%2Fg%2F11k03zf15t!19sChIJ_afBAb9RNDERIQsrBajO6FQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #97: Sân bóng Hồng Quang
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Phan Hữu Tài | SĐT: 0979030550
-- Tài khoản: owner.phanhuutai.97@footballbooking.com | Mật khẩu gốc: Owner@4978
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Phan Hữu Tài', 'owner.phanhuutai.97@footballbooking.com', '$2a$10$DZEcU.zLDg3Zb96SWtE43.fLN/paY5jhjxOoswFb24yUv/8mD3SLa', '0979030550', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Hồng Quang', 'XRFJ+CPW, Định Công, Hà Nội, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 500000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TZgVFWu02TWQHIrwn2Aw39F3wvHV90TW3Amobk1RrLFi9OfNVZL8LpM3TRAs91jhoMJbTSGd5H7kVXs2S9tdPtlLVbH_fP0jNh-SOAI6eKi0zDlDLpL3VKxXBiIMpeCGCzEkTZ=w408-h306-k-no', '0979030550', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+H%E1%BB%93ng+Quang/data=!4m7!3m6!1s0x3135ad15c880f5a3:0x7173be7e7a490451!8m2!3d20.9736095!4d105.8318366!16s%2Fg%2F11vbg4sh0h!19sChIJo_WAyBWtNTERUQRJen6-c3E?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #98: Sân bóng Mỹ Đình 2
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Trịnh Quốc Nghĩa | SĐT: 0966116365
-- Tài khoản: owner.trinhquocnghia.98@footballbooking.com | Mật khẩu gốc: Owner@1672
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trịnh Quốc Nghĩa', 'owner.trinhquocnghia.98@footballbooking.com', '$2a$10$tm8n/buz/xA5LGaT/fl3Ges/dx8dnfTCVKXrPDZhDP/pAjGBd4OZy', '0966116365', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Mỹ Đình 2', '32 Đ. Mỹ Đình, Từ Liêm, Hà Nội, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TWR_k0mDNlt6zHxm12TivXqwizL-25p7u47pdaSP_5mcoNGhtgFzJbgsXoEeS4IwPyI6Ce4A9sUY6q3nMPn-nfU0PQm1P5FKnxYG5zLT7zLsyN7dg6NDeGBnDsKtKuwEXs7pgh=w426-h240-k-no', '0966116365', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+M%E1%BB%B9+%C4%90%C3%ACnh+2/data=!4m7!3m6!1s0x313455c2ee01a76b:0xb118ceaa0cb97f16!8m2!3d21.0262633!4d105.7707788!16s%2Fg%2F11fj3lrt6x!19sChIJa6cB7sJVNDERFn-5DKrOGLE?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #99: Sân Bóng Đá Phú Lãm
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Đỗ Hữu Khánh | SĐT: 0372916369
-- Tài khoản: owner.dohuukhanh.99@footballbooking.com | Mật khẩu gốc: Owner@6590
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đỗ Hữu Khánh', 'owner.dohuukhanh.99@footballbooking.com', '$2a$10$22fNYymfkLdRbJ3jBtelPOlteoinvU3fItux0sUmZJxgn.L5KHAs2', '0372916369', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Phú Lãm', 'Quang Lãm, Phú Lương, Hà Nội, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 500000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SLUvPdPhNdZOhofx5ndiA52ROoM5wKGHWTPQkk4qK_cFDNlWceLbWAmNn3yoAnpebI0sLhgGjInsnX4RMdBWGlSUlvBdLPk85ITuuQq1DrGdSCCWdMJmZNzD6heGfwyCo3eYCM7A=w408-h306-k-no', '0372916369', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+Ph%C3%BA+L%C3%A3m/data=!4m7!3m6!1s0x313452bfddc7b0c3:0xfbcf283646d36584!8m2!3d20.9449781!4d105.759063!16s%2Fg%2F1vd73clr!19sChIJw7DH3b9SNDERhGXTRjYoz_s?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #100: Sân Bóng Quang Minh
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Phạm Hải Bảo | SĐT: 0974198695
-- Tài khoản: owner.phamhaibao.100@footballbooking.com | Mật khẩu gốc: Owner@8532
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Phạm Hải Bảo', 'owner.phamhaibao.100@footballbooking.com', '$2a$10$IdV8lpf.kwB9cDUwRInHJe0/u.OTEmsIwzqejSQpLYmRsFo1WutRy', '0974198695', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Quang Minh', 'Quang Minh, Hà Nội 100000, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 500000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Shcy5v22UkSwdctviDVIdx7OT3hMLEgKcQwlnHWwqTlUo2ndBMcXWKeVnjExwqodH9HxtUw7hVLSAdSWrvhQsYsBk5xvZkQT9lK80p3yEad63_JwW3Uxfif4OO9i6cWURD96vJF1TSW0M=w408-h544-k-no', '0974198695', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Quang+Minh/data=!4m7!3m6!1s0x3134fd62bf567105:0x514343b7ec4b1095!8m2!3d21.2054905!4d105.7690652!16s%2Fg%2F11v0tg7n0s!19sChIJBXFWv2L9NDERlRBL7LdDQ1E?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #101: Sân Bóng Đá Trường Đại Học Luật Huế
-- Loại: Sân 5 người | Giá: 320,000 đ/h
-- Chủ sân: Đinh Gia Thịnh | SĐT: 0934897192
-- Tài khoản: owner.dinhgiathinh.101@footballbooking.com | Mật khẩu gốc: Owner@9817
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đinh Gia Thịnh', 'owner.dinhgiathinh.101@footballbooking.com', '$2a$10$BAOEcj7MCYCShF.DGcHthuFhYX8AoVeqBrbweMHhPaKwrfHM25PuS', '0934897192', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng Đá Trường Đại Học Luật Huế', 'CJP5+RJR, Võ Văn Kiệt, An Cựu, Huế, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 320000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RBo2MXlrbxe8kyiCUXhZ7vLNiY9Pf_j-DN64zk7yxsSrsk4L49baVO0EYXhGaqNESLnUW-ta1XUceAw67fl7xgXVYkHfsQziC-izVVoIkRlmOjgS0K1fnjzF59wYpc46iK98DPznfZ6NMe=w408-h295-k-no', '0934897192', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+H%E1%BB%8Dc+Lu%E1%BA%ADt+Hu%E1%BA%BF/data=!4m7!3m6!1s0x3141a162d7906a3b:0x72f2d33ad2bd3aa6!8m2!3d16.4371104!4d107.6090033!16s%2Fg%2F11c1rszfpv!19sChIJO2qQ12KhQTERpjq90jrT8nI?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #102: Sân bóng đá MONACO
-- Loại: Sân 5 người | Giá: 320,000 đ/h
-- Chủ sân: Lâm Ngọc Huy | SĐT: 0772506234
-- Tài khoản: owner.lamngochuy.102@footballbooking.com | Mật khẩu gốc: Owner@5022
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lâm Ngọc Huy', 'owner.lamngochuy.102@footballbooking.com', '$2a$10$gC4nDoeTu.0qazY1tIuFh.ocq2ZqTuDEbCA.YvXBPJASR6q7zJgvq', '0772506234', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng đá MONACO', 'FJJ2+M47, Vỹ Dạ, Huế, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 320000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QWBl9kZOevMr8ISHXYPrSnp36V7Qytby2DpYeqiYnmYlYQWN-IxhovcsgZGC1FHdJbwgCNWhmGzDyO6LdaBxlq1H50e3f-o-l4c80Ft3u4PhQE-rT9fIoJ5HFtdRIbLPk0Zc6vLg=w408-h306-k-no', '0772506234', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+MONACO/data=!4m7!3m6!1s0x3141a0e037b33a65:0xb00e985846fe8da1!8m2!3d16.4816635!4d107.6003037!16s%2Fg%2F11clm9yrnn!19sChIJZTqzN-CgQTERoY3-RliYDrA?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #103: Sân Bá Công
-- Loại: Sân 5 người | Giá: 250,000 đ/h
-- Chủ sân: Dương Quang Quang | SĐT: 0931291899
-- Tài khoản: owner.duongquangquang.103@footballbooking.com | Mật khẩu gốc: Owner@7209
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Dương Quang Quang', 'owner.duongquangquang.103@footballbooking.com', '$2a$10$kyyGARq9ziGph0THKgbNE.CUZHq3eUdTyk7T481azbI66mUaCtbCu', '0931291899', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bá Công', 'FJ4C+583, An Cựu, Huế, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 250000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SkLbCR0aWnC9RmXA0vdAAScKyc4uHXukwfORF1KxAFiLWc4z6x4c4SUTdekB58IEsJ4KtomU-D8aInCr3eNljeJjsCmjl3vWTZuOQNhaSJcFTO38g42mbYTEYW19xaOcLzFNQh=w408-h306-k-no', '0931291899', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%A1+C%C3%B4ng/data=!4m7!3m6!1s0x3141a1b608635299:0x8466938f265432b6!8m2!3d16.4553784!4d107.6207919!16s%2Fg%2F11nx0k8914!19sChIJmVJjCLahQTERtjJUJo-TZoQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #104: Sân bóng đá Đại Học Khoa Học Huế
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Huỳnh Bá Khoa | SĐT: 0943404455
-- Tài khoản: owner.huynhbakhoa.104@footballbooking.com | Mật khẩu gốc: Owner@6813
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Huỳnh Bá Khoa', 'owner.huynhbakhoa.104@footballbooking.com', '$2a$10$cIdcsj/lilg5IJYUEtISZ.g6h/4SW7KTQoY38vswHctkQGJeArbAy', '0943404455', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá Đại Học Khoa Học Huế', '77 Nguyễn Huệ, Thuận Hóa, Huế, Việt Nam', 'Khu liên hợp sân cỏ chất lượng cao, đèn chiếu sáng công suất lớn thi đấu ban đêm, bãi đỗ ô tô xe máy thoải mái.', 500000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Q911VP5IGluvXipOKDrYfakXduSxU4pCEmHItSbZiXZhDeNnjrfmTqatGh-lu3OgDMRKix-osmiqJfwJRtly3TIVe8eOEt_h7kIYsiH6HR0rtWHolByFCe9AXlziebXLZvJCM=w408-h306-k-no', '0943404455', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+%C4%90%E1%BA%A1i+H%E1%BB%8Dc+Khoa+H%E1%BB%8Dc+Hu%E1%BA%BF/data=!4m7!3m6!1s0x3141a1ddaa98b0d1:0x38ab949c82099826!8m2!3d16.4586468!4d107.5922765!16s%2Fg%2F11hyr12nlh!19sChIJ0bCYqt2hQTERJpgJgpyUqzg?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #105: Sân cỏ nhân tạo Lâm Hoằng
-- Loại: Sân 5 người | Giá: 300,000 đ/h
-- Chủ sân: Trịnh Ngọc Hiếu | SĐT: 0944009432
-- Tài khoản: owner.trinhngochieu.105@footballbooking.com | Mật khẩu gốc: Owner@1166
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trịnh Ngọc Hiếu', 'owner.trinhngochieu.105@footballbooking.com', '$2a$10$Fya5nqCEGvhA9wGnnKin1eVVhN43JJlCje/ckEx2pao/ZycPW0mRO', '0944009432', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân cỏ nhân tạo Lâm Hoằng', 'Vỹ Dạ, Huế, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 300000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T8-xMi2P8vf1FITF3E9QDLTVbA85S_jVuY3mfQAfdC8oThGspN75tkqj9yZqI2ijkHDERv_Xq8mvkEZwBHWnbEz0KPIfWYyYJbAxg6jHNWInI5Y0TznayApSkejkFFzleUBfvMgg=w408-h306-k-no', '0944009432', 'https://www.google.com/maps/place/S%C3%A2n+c%E1%BB%8F+nh%C3%A2n+t%E1%BA%A1o+L%C3%A2m+Ho%E1%BA%B1ng/data=!4m7!3m6!1s0x3141a0e0209bff5b:0xee5eb792d6fe057a!8m2!3d16.4804375!4d107.5996875!16s%2Fg%2F11g8bwmxz3!19sChIJW_-bIOCgQTERegX-1pK3Xu4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #106: Trung Tâm Thể Thao Đa Năng - Sân Bóng Cầu Đơ
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Vũ Hải Minh | SĐT: 0968545460
-- Tài khoản: owner.vuhaiminh.106@footballbooking.com | Mật khẩu gốc: Owner@4937
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Vũ Hải Minh', 'owner.vuhaiminh.106@footballbooking.com', '$2a$10$D5gjHY0HQrzxhU/y.ACCPuOIZWgY6fHZZAZGkpQT0gzJboBBLQgUG', '0968545460', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Trung Tâm Thể Thao Đa Năng - Sân Bóng Cầu Đơ', '46 Lê Hồng Phong, Hà Đông, Hà Nội, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 400000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T-CaVv4w9VDU299TGS_0Djcuf8brAGmUctUwXkVg6Cko6L7Xc3EiVyetakDTOco0zhmlb4n9bEABpsZnkXonpwn2uBqETQCLYqhiOoYO8RbYb-GoXiW7T0tFyxqG8bF6oKFCO5YA=w408-h544-k-no', '0968545460', 'https://www.google.com/maps/place/Trung+T%C3%A2m+Th%E1%BB%83+Thao+%C4%90a+N%C4%83ng+-+S%C3%A2n+B%C3%B3ng+C%E1%BA%A7u+%C4%90%C6%A1/data=!4m7!3m6!1s0x3134532a07dda4a9:0xa4f7df8809fa3bca!8m2!3d20.967934!4d105.7764142!16s%2Fg%2F11g9grkfq7!19sChIJqaTdBypTNDERyjv6CYjf96Q?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #107: Sân bóng đá Lê Sát
-- Loại: Sân 5 người | Giá: 320,000 đ/h
-- Chủ sân: Nguyễn Hữu Phát | SĐT: 0762656567
-- Tài khoản: owner.nguyenhuuphat.107@footballbooking.com | Mật khẩu gốc: Owner@4630
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Nguyễn Hữu Phát', 'owner.nguyenhuuphat.107@footballbooking.com', '$2a$10$owaffwVYAbOpeWJhcbekRu7PeSglq/p8sRntc83iorcxTXQ3DaWdi', '0762656567', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng đá Lê Sát', '103 Lê Sát, Hòa Cường, Đà Nẵng, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 320000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Qf-Kuk0Cjj8oP4_puQ1PvtFlybNjUJBcFn0yt2Uzsom7gEgeaR0xtWVbLliGEVR54K0U_ebU3kYIWOy6CWArMGoyj29JG2-hadvjHH_Y2M5PeNErHCXw0LdCeRT_2H9N1M2L_J0A=w408-h306-k-no', '0762656567', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+L%C3%AA+S%C3%A1t/data=!4m7!3m6!1s0x314219002cb44819:0x9a342588f615e798!8m2!3d16.027836!4d108.2209734!16s%2Fg%2F11vs2w46r1!19sChIJGUi0LAAZQjERmOcV9oglNJo?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #108: Sân Bóng Đá Lê Quý Đôn
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Đào Công Bảo | SĐT: 0935777403
-- Tài khoản: owner.daocongbao.108@footballbooking.com | Mật khẩu gốc: Owner@8753
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Công Bảo', 'owner.daocongbao.108@footballbooking.com', '$2a$10$.SRNJirFJU7qDmHuWaMBg.cQhGtcnPN7s1RAJom.BUWH0/H1/itfe', '0935777403', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Lê Quý Đôn', '364M+CM3, An Trung 3, An Hải, Đà Nẵng 550000, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 400000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SASQZCelVFBpy4ptwKo9lKgFrQiAJqXSnpCnT2rPF1fL3LDB0ekr6kRb-mxtIsheRua3XEz-IyFkOZrZAgiJ3aTfVv9uk-OdCoUPXfAr8JyQ_MyfxWDrXy-e4cNayvjze0U13GcgKTVAt3=w426-h240-k-no', '0935777403', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+L%C3%AA+Qu%C3%BD+%C4%90%C3%B4n/data=!4m7!3m6!1s0x3142196ca4d61fe5:0x614352d6bde11da5!8m2!3d16.0563435!4d108.2341273!16s%2Fg%2F11tf2px_bf!19sChIJ5R_WpGwZQjERpR3hvdZSQ2E?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #109: Sân bóng đá Chuyên Việt
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Đoàn Tiến Triết | SĐT: 02363638555
-- Tài khoản: owner.doantientriet.109@footballbooking.com | Mật khẩu gốc: Owner@8434
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đoàn Tiến Triết', 'owner.doantientriet.109@footballbooking.com', '$2a$10$8CPab7gg4rVq3yfmgn6Gi.hJnwq07c5bVjFd3ptCx5/WpHWf4EV3y', '02363638555', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá Chuyên Việt', '98 Tiểu La, Hòa Cường, Đà Nẵng 550000, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TlZiWbRbC5lP9icP6KvDtr34X9Y-rCYDRdPuSJOPY7g1gFEefT5Kiv5gqZDPT6NH7-FXdS4nUbrvwdiMtZeqCRwLILg2BCdJVxGgrkvIlgbqviYHRhUyWfguY-pJxekVM8X9EG=w408-h306-k-no', '02363638555', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+Chuy%C3%AAn+Vi%E1%BB%87t/data=!4m7!3m6!1s0x314219c0801817c3:0x1702bb03f6985b2f!8m2!3d16.0451026!4d108.214369!16s%2Fg%2F1v7thv9m!19sChIJwxcYgMAZQjERL1uY9gO7Ahc?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #110: Sân bóng đá Phan Tứ
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Phạm Tuấn Huy | SĐT: 0836939494
-- Tài khoản: owner.phamtuanhuy.110@footballbooking.com | Mật khẩu gốc: Owner@2958
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Phạm Tuấn Huy', 'owner.phamtuanhuy.110@footballbooking.com', '$2a$10$Y7fUsk58ksK0j.sFCFOmFOKmo4hBSxB6NhFdPyePpqbaBHCnOCnoK', '0836939494', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá Phan Tứ', '01 Phan Tứ, Ngũ Hành Sơn, Đà Nẵng 550000, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9StzZntp7oG4JY4AkPz8x-CKQmPjCsIJbf1-f687w2nRwx3GkUHhHoRoN4Xwi3KaWj3PfE5ISC36L2M66UNkN_KJ1rjcCInhNdMVQSigtPC6OGrDI-uJfVk22-CycEnN2yLQB4=w408-h306-k-no', '0836939494', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+Phan+T%E1%BB%A9/data=!4m7!3m6!1s0x31421795634a07ff:0x300d3ab120c3cdf3!8m2!3d16.0449859!4d108.2403993!16s%2Fg%2F11v04ttyq6!19sChIJ_wdKY5UXQjER883DILE6DTA?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #111: Sân Bóng Ngãi Cầu
-- Loại: Sân 5 người | Giá: 280,000 đ/h
-- Chủ sân: Phan Bá Thịnh | SĐT: 0946946888
-- Tài khoản: owner.phanbathinh.111@footballbooking.com | Mật khẩu gốc: Owner@9595
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Phan Bá Thịnh', 'owner.phanbathinh.111@footballbooking.com', '$2a$10$kiwA15turjNO6Di7LIx05e1Wjk1HWPH4f.Af/DTomnZF3pwRU6tWS', '0946946888', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng Ngãi Cầu', 'XPRF+5H8 Trường Thpt, An Khánh, Hà Nội, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 280000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Sdcd_cWtjafZAF9WXOVXYkTU4CaxnErBe5M2Hef70QbEoaW9enGRqbN6zC8ox6KBep1wJvBn_b3J5EQEfZQFhsY-6K-mm4OL9opOpltnZ0wBrLLHUdHVyOwG-nCcHdPyXNGKG0oQ=w408-h305-k-no', '0946946888', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Ng%C3%A3i+C%E1%BA%A7u/data=!4m7!3m6!1s0x313453042acd0d23:0xb93f87912a9f263e!8m2!3d20.9904221!4d105.7239662!16s%2Fg%2F11s5cz04rs!19sChIJIw3NKgRTNDERPiafKpGHP7k?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #112: Câu Lạc Bộ Bóng Đá Quảng Ngãi
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Đặng Quang Bảo | SĐT: 0779547539
-- Tài khoản: owner.dangquangbao.112@footballbooking.com | Mật khẩu gốc: Owner@3939
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đặng Quang Bảo', 'owner.dangquangbao.112@footballbooking.com', '$2a$10$uOio/0lqxPVaT6oRO4X8C.0TiU8slwZ7yBOwfb8RZupAAC0BBhH4m', '0779547539', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Câu Lạc Bộ Bóng Đá Quảng Ngãi', '220 Trường Chinh, Cẩm Thành, Quảng Ngãi 555555, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 350000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Q2UsPiPSHZgi-YdlLW6SVOItJ58IlC_UcMJiyuNW6b3CDbonlD8sMuDmYeh8sx-fQU8Sf951K9qfkHTTrjQHOE84aW4RUIP_Fp9phOsjHcaGWamlMrKKvso_YQJort6bOScDatS6jWkU-u=w408-h306-k-no', '0779547539', 'https://www.google.com/maps/place/C%C3%A2u+L%E1%BA%A1c+B%E1%BB%99+B%C3%B3ng+%C4%90%C3%A1+Qu%E1%BA%A3ng+Ng%C3%A3i/data=!4m7!3m6!1s0x316853c918446c1d:0x8b399c37a375b49f!8m2!3d15.1002874!4d108.8047353!16s%2Fg%2F11nk7y6ng3!19sChIJHWxEGMlTaDERn7R1ozecOYs?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #113: Sân bóng Phát Đạt
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Võ Đình Tuấn | SĐT: 0384220590
-- Tài khoản: owner.vodinhtuan.113@footballbooking.com | Mật khẩu gốc: Owner@5786
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Đình Tuấn', 'owner.vodinhtuan.113@footballbooking.com', '$2a$10$O7pfdpwogqYkoqor6t06iuPZs3lcx6T61zg0jrnKYi3ZZRzA..vNW', '0384220590', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Phát Đạt', '44 Trương Đăng Trinh, Cẩm Thành, Quảng Ngãi, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 550000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RSNTlEr89nMz_jc_BQA4G_RujGsFeBf7Vu9gleoWtXuOBQe_fndQtkzf_-QtkYOz--DRaIAQzVed4YqNNx0ge9y45h0vNJOfnkdn-8e8lvn6rPOCoPo524fZP1F0mFhLQFnswmrgO3IDI7=w426-h240-k-no', '0384220590', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Ph%C3%A1t+%C4%90%E1%BA%A1t/data=!4m7!3m6!1s0x3169acd263b7c437:0xc803d7000ea99a3c!8m2!3d15.1028293!4d108.8042918!16s%2Fg%2F11ckqn818v!19sChIJN8S3Y9KsaTERPJqpDgDXA8g?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #114: Sân Cỏ Nhân Tạo Phù Đổng
-- Loại: Sân 5 người | Giá: 280,000 đ/h
-- Chủ sân: Lý Quốc Nam | SĐT: 02552245678
-- Tài khoản: owner.lyquocnam.114@footballbooking.com | Mật khẩu gốc: Owner@5658
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lý Quốc Nam', 'owner.lyquocnam.114@footballbooking.com', '$2a$10$8kRbD3v4bOpTQvpZnDytNucnwaewlV1MTZDnobF9W/u8BuHrcc0K6', '02552245678', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Cỏ Nhân Tạo Phù Đổng', '38 Phan Đình Phùng, Cẩm Thành, Quảng Ngãi, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 280000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9S6kU0wG9MtnDp_QZjy-ey6BZTfxfU3qwfkwqqLD25f_nPjB_PaaMo-de2jrxFPy92kxHqT121JoIznT5amdd77TDOXKmmV03PlgabUB_C0_cvjXtWw1ZhftYQlDfOnV0PEEyft=w493-h240-k-no', '02552245678', 'https://www.google.com/maps/place/S%C3%A2n+C%E1%BB%8F+Nh%C3%A2n+T%E1%BA%A1o+Ph%C3%B9+%C4%90%E1%BB%95ng/data=!4m7!3m6!1s0x3169ad31f4e850f5:0xbf007d9c582733e6!8m2!3d15.1258262!4d108.8013196!16s%2Fg%2F1jkw99779!19sChIJ9VDo9DGtaTER5jMnWJx9AL8?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #115: Sân bóng VSIP
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Lý Quốc Cường | SĐT: 0944231019
-- Tài khoản: owner.lyquoccuong.115@footballbooking.com | Mật khẩu gốc: Owner@7565
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lý Quốc Cường', 'owner.lyquoccuong.115@footballbooking.com', '$2a$10$TEFNfD.FM6mXkyNTxPpUCu5ikoDWf.iBf7WeeW8dxC1WRkkpFWIHS', '0944231019', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng VSIP', 'Trương Quang Trọng, Quảng Ngãi, Việt Nam', 'Khu liên hợp sân cỏ chất lượng cao, đèn chiếu sáng công suất lớn thi đấu ban đêm, bãi đỗ ô tô xe máy thoải mái.', 500000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T-WE7_EBCqftQHCnSi3-tMrB44CllQbCdm0mdjMAnCEfGnWNyWXb3bSwHhwMqK3WjClHZ2Ekxv_1Aq3hNYa7bNbZVuAAL2yCGtBF3YiXb383WLSwARLxCPtN00vaqcXgncQMFl=w519-h240-k-no', '0944231019', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+VSIP/data=!4m7!3m6!1s0x3169ad597f684257:0x240dc5c3c9f2f3f5!8m2!3d15.1534754!4d108.7927151!16s%2Fg%2F11gbk1r_sr!19sChIJV0Jof1mtaTER9fPyycPFDSQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #116: Sân bóng đá C1
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Đào Đình Phong | SĐT: 0983830955
-- Tài khoản: owner.daodinhphong.116@footballbooking.com | Mật khẩu gốc: Owner@3444
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Đình Phong', 'owner.daodinhphong.116@footballbooking.com', '$2a$10$zB3tu37ZVL2lbeRpxeM1YO45NrHEv0jILk/bvLjPTwYzUOAurKm3O', '0983830955', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá C1', '1B Y Ngông, Buôn Ma Thuột, Đắk Lắk, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 550000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RiGSZv9y18qDPuxpuvZ4En05RuvhVfu5QgyUrJ24dM1IZ4CYaNpyr9V014Mv75MCeF256MVnPLfBPKkrRs13XuyGW-rjb9xC5DnuBdczEM-izwazJtr7Eo9jGJ_VqJEv2Hpvzg=w408-h306-k-no', '0983830955', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+C1/data=!4m7!3m6!1s0x31721d84be78fed1:0x85069d3eb6df5c16!8m2!3d12.6727133!4d108.0364007!16s%2Fg%2F11h6g4r5g2!19sChIJ0f54voQdcjERFlzftj6dBoU?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #117: Sân bóng đá Tân Thái Long
-- Loại: Sân 5 người | Giá: 300,000 đ/h
-- Chủ sân: Vũ Quốc Hiếu | SĐT: 02623601888
-- Tài khoản: owner.vuquochieu.117@footballbooking.com | Mật khẩu gốc: Owner@7818
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Vũ Quốc Hiếu', 'owner.vuquochieu.117@footballbooking.com', '$2a$10$ohWFEPt1Cz.qSbCJCpJTju0TlSPTkPTx3gPj2johtWCDjdS8LiORC', '02623601888', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng đá Tân Thái Long', '44 Y Moan Ênuôl, Buôn Ma Thuột, Đắk Lắk, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 300000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QbNwNFV7nX5p3sNtz-ohdfvfwzXfWgCrqpY1dYjrDSmG6RLlDhcPAEjsHJ3XNMSJgJj1qUNbRZS4ALRFrtcOTEFFX8dM5iOEwCGRt6GpuRRvdaBe7Mm5fqgohWsaOZxo5zQlgYu9SPULBc=w408-h306-k-no', '02623601888', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+T%C3%A2n+Th%C3%A1i+Long/data=!4m7!3m6!1s0x3171f7006b9bc81d:0x3ce7254502af8707!8m2!3d12.7007646!4d108.0551951!16s%2Fg%2F11y3qv2kjg!19sChIJHcibawD3cTERB4evAkUl5zw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #118: Sân bóng đá Manchester
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Đinh Thành Lâm | SĐT: 0941311168
-- Tài khoản: owner.dinhthanhlam.118@footballbooking.com | Mật khẩu gốc: Owner@8253
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đinh Thành Lâm', 'owner.dinhthanhlam.118@footballbooking.com', '$2a$10$zL9f5lAzpayw2UOXDv0.zO8WlOItUEGmyhiwNBWa5Pkw76Bn7xrIC', '0941311168', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá Manchester', '130 Y Ngông, Buôn Ma Thuột, Đắk Lắk, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 550000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9S6XzSXQbrSYI2Eti7kMRdu2EearA8S50GFSLNSHJrJHMeC8rt2PtQ_CrZAsf2OimRpMIg1tFEwdZMZ-GhqH93UASXhsr3hs8ukRaIwnxmLtqdAXeoCCBUbZi0rn33pPXYBmFWg=w426-h240-k-no', '0941311168', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+Manchester/data=!4m7!3m6!1s0x31721da5e3bb70c9:0xfb448f727a537008!8m2!3d12.6720297!4d108.0282289!16s%2Fg%2F11j4swk_pf!19sChIJyXC746UdcjERCHBTenKPRPs?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #119: Sân bóng đá Ruby
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Đặng Công Đông | SĐT: 0792000888
-- Tài khoản: owner.dangcongdong.119@footballbooking.com | Mật khẩu gốc: Owner@1986
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đặng Công Đông', 'owner.dangcongdong.119@footballbooking.com', '$2a$10$.FoyLBfxfIMZ.mpiLsS9x.M8ttiV0zv3M/CJuASRV7oQVE7j59nJy', '0792000888', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá Ruby', 'J43P+QGX, thôn 2, Ea Ktur, Đắk Lắk, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 550000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SvssLgJUUAlSQnH-OKZfWjVdRgkxxPp1cWpD167P1NxVYUyAcAL9grOsc9e4X1ipb89vxS7-ylGKND4uodL4iLGN3pq_lR58Ly1YgOqRpgzG4kvv57t6WSO8tjKAP_iNmvihxc3A=w408-h306-k-no', '0792000888', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+Ruby/data=!4m7!3m6!1s0x3171f6afe8adc3b1:0xd7ab84528ac0b218!8m2!3d12.6044845!4d108.1363548!16s%2Fg%2F1hhkbr607!19sChIJscOt6K_2cTERGLLAilKEq9c?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #120: Sân Vận Động Buôn Ma Thuột
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Mai Tuấn Phúc | SĐT: 02623857805
-- Tài khoản: owner.maituanphuc.120@footballbooking.com | Mật khẩu gốc: Owner@2330
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Mai Tuấn Phúc', 'owner.maituanphuc.120@footballbooking.com', '$2a$10$oNCRUhOR9RGH18sv0gEI2u1.e9EBnGNCaxrCo1ettyLDi6uPcAVb2', '02623857805', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Vận Động Buôn Ma Thuột', '2 Nguyễn Công Trứ, Buôn Ma Thuột, Đắk Lắk, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 350000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SaPsa9kRJ_YenMLt6wznVYOc7YdvWsu-pOtdKa4gJANrKtAmEmjK6yRwHPp-vQ77buLx_yJLBWnEhwctKxFy10PT1lFnVXLm6329lC3X_DPj0pIasIX8UY7lv51TpoKqNNIXsT=w408-h306-k-no', '02623857805', 'https://www.google.com/maps/place/S%C3%A2n+V%E1%BA%ADn+%C4%90%E1%BB%99ng+Bu%C3%B4n+Ma+Thu%E1%BB%99t/data=!4m7!3m6!1s0x31721d818ee5b055:0x729cbaf43bedfbda!8m2!3d12.6777897!4d108.0425639!16s%2Fg%2F11g6b31qw9!19sChIJVbDljoEdcjER2vvtO_S6nHI?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #121: Sân Bóng Đá Anh Em
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Lê Đức Nam | SĐT: 0968950825
-- Tài khoản: owner.leducnam.121@footballbooking.com | Mật khẩu gốc: Owner@7693
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lê Đức Nam', 'owner.leducnam.121@footballbooking.com', '$2a$10$HTzZ0qYOI.jOOtj/SXsp1O5XEn5MCNVKgeZnZMzSW7d8BPfIWhMz.', '0968950825', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Anh Em', '2MW8+QCW, Thôn 7, Dương Hòa, Hà Nội, Việt Nam', 'Sân bóng nằm trong khuôn viên thoáng mát, an ninh tốt, có khán đài che mưa nắng cho khán giả cổ vũ.', 400000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QvPGpcgPnSftAS9UPVyOfde2RbVmq7vyf2FSFKt82qZyM3U7Zs4w7DO8Gq3YQt_OrF_doH_qbie5NcaicGIrwYWqhvEl7StDHBLv1LgHEX8xbhx73nBB_ixMgNOtCCOAF-QsFXaSVNuao=w426-h240-k-no', '0968950825', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+Anh+Em/data=!4m7!3m6!1s0x313457dc3781184b:0xaf9cbe01359462e4!8m2!3d21.0469969!4d105.6660693!16s%2Fg%2F11ss7s0nn3!19sChIJSxiBN9xXNDER5GKUNQG-nK8?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #122: Sân cỏ nhân tạo Khánh An
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Đặng Đình Sơn | SĐT: 0976751990
-- Tài khoản: owner.dangdinhson.122@footballbooking.com | Mật khẩu gốc: Owner@5720
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đặng Đình Sơn', 'owner.dangdinhson.122@footballbooking.com', '$2a$10$c10dxW3RZFcXAhJ4ecnCJOfeUJaR./GwMWgd32oQFSglTSahmec8a', '0976751990', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân cỏ nhân tạo Khánh An', 'Thượng Hồng, Hưng Yên, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 550000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9S0wbKJCAXQIQDng5n65GmosyNZVJn2Jfd3hIUfbIjU2Xs2inQfvAdqbtn_yMmB-tREi2b9uD30oFxwlMWVBajgqdKP8_I2U2oQfxfUBh6994d1QH6grQS2t-U4Qrd9rDZfo2j5=w408-h306-k-no', '0976751990', 'https://www.google.com/maps/place/S%C3%A2n+c%E1%BB%8F+nh%C3%A2n+t%E1%BA%A1o+Kh%C3%A1nh+An/data=!4m7!3m6!1s0x3135a396994d0a91:0xe037280b68addc7e!8m2!3d20.934824!4d106.123941!16s%2Fg%2F11q57whxs0!19sChIJkQpNmZajNTERftytaAsoN-A?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #123: Sân Bóng An Khánh
-- Loại: Sân 5 người | Giá: 320,000 đ/h
-- Chủ sân: Đào Quang Phúc | SĐT: 0968861236
-- Tài khoản: owner.daoquangphuc.123@footballbooking.com | Mật khẩu gốc: Owner@4241
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Quang Phúc', 'owner.daoquangphuc.123@footballbooking.com', '$2a$10$DOSOKnj3MatcGMnRibZjUOIJ9Op/9SnePQjwvacIUIRTjwpmUfcXq', '0968861236', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng An Khánh', '1 Đ. Hoàng Minh Giám, Yên Hòa, Hà Nội, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 320000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9R9IEmUTM9zgXC9J1qutGIxlCcnS_Cv9qlb2quLZdCPZqBLupVJvSphaVilTXQQ59SvvgO7XQJ0CIi3U-nAvfjXbwrZt8_8VKw6OnK_ddEjIvHveQ-37LFicYkd9sVglcDAJkTcew=w426-h240-k-no', '0968861236', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+An+Kh%C3%A1nh/data=!4m7!3m6!1s0x3135aca5d0c17b47:0xb57482253b56b39!8m2!3d21.0057196!4d105.7956129!16s%2Fg%2F11b6p_g6_v!19sChIJR3vB0KWsNTEROWu1UyJIVws?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #124: Sân bóng mai lâm
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Mai Minh Thịnh | SĐT: 0962442385
-- Tài khoản: owner.maiminhthinh.124@footballbooking.com | Mật khẩu gốc: Owner@3330
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Mai Minh Thịnh', 'owner.maiminhthinh.124@footballbooking.com', '$2a$10$1n0rrjHagdfcBb09SUhhAelQDbhy6eRiXWrL1Qf7O3ASLHm/qNgVa', '0962442385', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng mai lâm', 'Đông Anh, Hà Nội, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 550000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QxL52aFjgxry2y9HKc5WSDT3V31Po4zNpvzZNIoG0S7sCiobos2sJiKUtpJVyXB2QKxLDZCI7NO3bE3bBtdCSIyKx7DDS6CXEGYcapK430uAj9OAkOEv7SCCw0ytDkqrPU76s-NQ=w408-h306-k-no', '0962442385', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+mai+l%C3%A2m/data=!4m7!3m6!1s0x3135a9439c90149d:0xd65c3a644d7e0ac7!8m2!3d21.0884054!4d105.8906722!16s%2Fg%2F11h4w23kkm!19sChIJnRSQnEOpNTERxwp-TWQ6XNY?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #125: Sân Bóng Thuần Mới
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Trịnh Công Phát | SĐT: 0903458235
-- Tài khoản: owner.trinhcongphat.125@footballbooking.com | Mật khẩu gốc: Owner@8195
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trịnh Công Phát', 'owner.trinhcongphat.125@footballbooking.com', '$2a$10$dZ27jZ7uCc2SDFLp3USqeuV.4KCBssZLqCXkG58uI.blbbvmv4Seu', '0903458235', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Thuần Mới', '2PC8+F74, Khu đô thị Bắc An Khánh, Sơn Đồng, Hà Nội, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 400000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TlODDz9_gDQof9LqWpj3sfG6UQ5lsLLkwWce40LBq1W6iGaFHCYcUaSNTvebVyPU3Zdqu_FdMoU5-3eUSXdee07vGjhEAFwPnDK_tzZQHEUrO9rdvAFa5WTqmhLW-gqpS4REbV=w408-h306-k-no', '0903458235', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Thu%E1%BA%A7n+M%E1%BB%9Bi/data=!4m7!3m6!1s0x31345500343966db:0x9d91803f261d3785!8m2!3d21.021127!4d105.715707!16s%2Fg%2F11vjtr5k31!19sChIJ22Y5NABVNDERhTcdJj-AkZ0?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #126: Sân Bóng Môi Trường
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Hồ Ngọc Khánh | SĐT: 0974414418
-- Tài khoản: owner.hongockhanh.126@footballbooking.com | Mật khẩu gốc: Owner@9847
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Hồ Ngọc Khánh', 'owner.hongockhanh.126@footballbooking.com', '$2a$10$Ta2j8fxVP.T6foGSZ5F.qec7LMhhxP8cElx2QkV/Lv21gyilz.biO', '0974414418', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Môi Trường', 'P. Phú Viên, Lâm Du, Bồ Đề, Hà Nội, Việt Nam', 'Sân bóng phong trào hàng đầu khu vực, tổ chức giao lưu hàng tuần, có khu vực ngồi nghỉ và giải khát rộng rãi.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RYkF1zVWkI8L_iEopEYa4RE1aP3Fz9yjHwZXX_g23neeaDLq7maafa6TKwFCGjA7zjPcARvQXnyW2tkMcYOnN-Na5nOkAA6VX2iolvsx5h-8dYh4YCUTLoZEygIM-DUljGkXxAVA=w408-h306-k-no', '0974414418', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+M%C3%B4i+Tr%C6%B0%E1%BB%9Dng/data=!4m7!3m6!1s0x3135abdf3aa8f7cf:0x7af8b4e928d24a32!8m2!3d21.0342477!4d105.87396!16s%2Fg%2F11dxm8g1jc!19sChIJz_eoOt-rNTERMkrSKOm0-Ho?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #127: Sân Bóng Xã Thượng Lâm
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Trần Hải Huy | SĐT: 0393548292
-- Tài khoản: owner.tranhaihuy.127@footballbooking.com | Mật khẩu gốc: Owner@5102
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trần Hải Huy', 'owner.tranhaihuy.127@footballbooking.com', '$2a$10$0qAAPWDReffN.h1BKW9S5O2LBKSyG23d0n5tjpno7rv3ucOv7Xti.', '0393548292', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Xã Thượng Lâm', 'QMWG+9CW, thôn Trì, Phúc Sơn, Hà Nội, Việt Nam', 'Sân bóng trang bị dàn đèn cao áp siêu sáng, dịch vụ đồ uống đa dạng, cho thuê giày và phụ kiện thi đấu.', 350000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RssOfOn1BT3FbFxjNqzXn6zfzA_qOYzu2elVOcbXWDGiMxa9NMK43EBMb_7G4I9b0iypVlyOwcu-VJGoCtpA5g5fMHA_oOUYAQGJ52NNXEPKh5vck_Z3rJgzkr71_OQHfXTTs=w408-h306-k-no', '0393548292', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+X%C3%A3+Th%C6%B0%E1%BB%A3ng+L%C3%A2m/data=!4m7!3m6!1s0x313449776406d7f3:0x386ea4573edc54bd!8m2!3d20.7959821!4d105.6760677!16s%2Fg%2F11f123y5jt!19sChIJ89cGZHdJNDERvVTcPlekbjg?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #128: Sân Bóng Đá Làng Đồng Lư
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Đào Ngọc Nghĩa | SĐT: 0983413086
-- Tài khoản: owner.daongocnghia.128@footballbooking.com | Mật khẩu gốc: Owner@1659
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Ngọc Nghĩa', 'owner.daongocnghia.128@footballbooking.com', '$2a$10$720mzyrLj2FrLxE7gFy5W.lXoEwJF08p8ezLEclk8S.vfFwJEBkVW', '0983413086', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Làng Đồng Lư', 'thôn, Đồng Lư, Hưng Đạo, Hà Nội, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 400000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9R88g9L0eI9czcw2xPDYeTwccOwvmc5kt1VZGawU3PUl721snjAmGpRBAhdYEj0aEXzlksE3qBXULMXhjg8cYTJ7L1HtnZWuf391fi8BBHdHC9gvp43DKX6rwqc5fIt-Es8ieaA=w426-h240-k-no', '0983413086', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+L%C3%A0ng+%C4%90%E1%BB%93ng+L%C6%B0/data=!4m7!3m6!1s0x313451827e71625b:0x53b34e8db092180f!8m2!3d20.9768061!4d105.6624866!16s%2Fg%2F11g0mhq62g!19sChIJW2JxfoJRNDERDxiSsI1Os1M?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #129: Sân bóng đá Ngày Mới
-- Loại: Sân 5 người | Giá: 280,000 đ/h
-- Chủ sân: Đinh Gia Lâm | SĐT: 0356048001
-- Tài khoản: owner.dinhgialam.129@footballbooking.com | Mật khẩu gốc: Owner@5557
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đinh Gia Lâm', 'owner.dinhgialam.129@footballbooking.com', '$2a$10$Dl.8Kzgr7hYlm4TlbhnE6e4lHrTKDA7R.xxBmDvcuN0RIJW0huGf6', '0356048001', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng đá Ngày Mới', '2V4C+2P5, Trảng Dài, Đồng Nai, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 280000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9ToJQMXqoz2N4O_fepNCRpjnHz62HGRxO7jpxqV9RXvxMBZSNb2s970ngdDVjkqa4TTdJyAFY2M3p9tIF1vG3BUBbv2eEmsRFf_dMsQ_u-6-P1o0babDkX_bv-hM5TCCzDfXSyS=w408-h306-k-no', '0356048001', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+Ng%C3%A0y+M%E1%BB%9Bi/data=!4m7!3m6!1s0x3174dd87bd3c650b:0x4b6c6f45c9a5c0c7!8m2!3d11.005136!4d106.8718736!16s%2Fg%2F11tn9jc4lh!19sChIJC2U8vYfddDERx8ClyUVvbEs?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #130: Sân Bóng Đá QUANG TRUNG
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Mai Bá Dũng | SĐT: 0967775070
-- Tài khoản: owner.maibadung.130@footballbooking.com | Mật khẩu gốc: Owner@8700
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Mai Bá Dũng', 'owner.maibadung.130@footballbooking.com', '$2a$10$M4t8NHcwY8HNJCjb.psM8OozytDKWSYdpNp4GTRwSEolcCivXXFUW', '0967775070', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá QUANG TRUNG', 'XW9X+737, Unnamed, Road, Hố Nai, Đồng Nai, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 550000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QAM7L9r5oc_rRKwoQXXCIOxeb4aYdO5_joiJ97D9Ca476MFDZKueNqvGwGznB3-svekBhKValZt3Grmte1c4iHYz2nbNJr8MnrKIX05OCUoeyQOxICeWkq0I_NVeEdQqmqR4I=w408-h306-k-no', '0967775070', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+QUANG+TRUNG/data=!4m7!3m6!1s0x3174e7e4e3ee3965:0x1187529070ec891!8m2!3d10.9681713!4d106.94766!16s%2Fg%2F11mwjkyhrm!19sChIJZTnu4-TndDERkcgOByl1GAE?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #131: Sân bóng đá Huyện Trảng Bom
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Đào Quốc Kiên | SĐT: 0903384573
-- Tài khoản: owner.daoquockien.131@footballbooking.com | Mật khẩu gốc: Owner@6403
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Quốc Kiên', 'owner.daoquockien.131@footballbooking.com', '$2a$10$qcpbBME/nVzf5Zd5tkic7e.Pabn4c6BF6tBU38CRj153uxj7QDHay', '0903384573', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá Huyện Trảng Bom', 'XX2W+29G, Trảng Bom, Đồng Nai, Việt Nam', 'Khu liên hợp sân cỏ chất lượng cao, đèn chiếu sáng công suất lớn thi đấu ban đêm, bãi đỗ ô tô xe máy thoải mái.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tz_AIlDgAtmUQSrP001ioyNL3sDsR2DMUJER96aSYcwVc9ZWt0umfxopKdEWSC1WsE8OUQMfNyz9GNjbElCrH9_cuNLOeIwevOGkUbaGjLFxt9dSC15cyHd3IfTLLhor-12i4FwQ=w408-h322-k-no', '0903384573', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+Huy%E1%BB%87n+Tr%E1%BA%A3ng+Bom/data=!4m7!3m6!1s0x3174e6ad9bc54d81:0xc0db82b92a341c4d!8m2!3d10.9500615!4d106.9959546!16s%2Fg%2F1tf55cgh!19sChIJgU3Fm63mdDERTRw0KrmC28A?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #132: Sân Banh Tỉnh Đội Đồng Nai
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Đào Thành Hiếu | SĐT: 0902677212
-- Tài khoản: owner.daothanhhieu.132@footballbooking.com | Mật khẩu gốc: Owner@1601
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Thành Hiếu', 'owner.daothanhhieu.132@footballbooking.com', '$2a$10$X4BCo.35tkPk40rBhiYpbubkUPWR9s9bxcCow6Q6wITwhRQU9WfLm', '0902677212', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Banh Tỉnh Đội Đồng Nai', '101 Nguyễn Ái Quốc, Tân Triều, Đồng Nai, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 500000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SGo1y0yut3yGgBo1OqBRFtGFG8VxrGSPUSpBBxdjQwXpyGWajRFd8ENVKt1AmEJbC8dTnByLOMToRlmAWQPVG4C6KUppx3GciQqVsTywic15_RcQ7vjdl3gkSL08pNEJ3HSrVg=w408-h306-k-no', '0902677212', 'https://www.google.com/maps/place/S%C3%A2n+Banh+T%E1%BB%89nh+%C4%90%E1%BB%99i+%C4%90%E1%BB%93ng+Nai/data=!4m7!3m6!1s0x3174dc1be8d602df:0x90c9451b4679120d!8m2!3d10.9624873!4d106.8345622!16s%2Fg%2F11c1tmnk12!19sChIJ3wLW6BvcdDERDRJ5RhtFyZA?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #133: Sân Bóng Đá Phạm Nguyễn
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Bùi Quốc Hải | SĐT: 0931744779
-- Tài khoản: owner.buiquochai.133@footballbooking.com | Mật khẩu gốc: Owner@9431
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Bùi Quốc Hải', 'owner.buiquochai.133@footballbooking.com', '$2a$10$B7ZPY6YuRooTykvOF2j0cu3wUGBiwTiudWj/tsv6iC8mHhH.obwda', '0931744779', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Phạm Nguyễn', 'XRHR+7V7, Tân Triều, Đồng Nai, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T_u6t19u1mrcABG9fZm0oY64d6y7ZeXOIiH9PSJdvZZ_uwo4vt1_ErD3seSU9L-1WyZ6ybAP2IcC3tTcTIcag3_c8lowyaHQ0VGqpnh4DXOIuUaEu27ZlLfrr_yK6bjRJR_Nst=w408-h306-k-no', '0931744779', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+Ph%E1%BA%A1m+Nguy%E1%BB%85n/data=!4m7!3m6!1s0x3174dd2405fea2f9:0xca0ab170c5b5386e!8m2!3d10.9778202!4d106.8419461!16s%2Fg%2F11k4156n40!19sChIJ-aL-BSTddDERbji1xXCxCso?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #134: Sân Bóng Đông Đô
-- Loại: Sân 5 người | Giá: 250,000 đ/h
-- Chủ sân: Đoàn Trọng Giang | SĐT: 0931502515
-- Tài khoản: owner.doantronggiang.134@footballbooking.com | Mật khẩu gốc: Owner@1888
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đoàn Trọng Giang', 'owner.doantronggiang.134@footballbooking.com', '$2a$10$1RPSwpu3bEs0299YrcUV7ufLlIQ6NvvlsHz/yAHr4723lwG7S3hse', '0931502515', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng Đông Đô', '3R5R+8F, Hồng Hà, Hà Nội, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 250000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QR8XzIYB30YWwWXX9OF-FWmTdNUcpL_2iHp23thpi92u0kHi-xGto3C1mXloe6mxI-0vWGQyKQ5fiqUVzsKsotGM2Tz4DRxaT6GHQgfUAsNUp3diWlq6B3dnFHzMknYB7Wi7uy=w408-h306-k-no', '0931502515', 'https://www.google.com/maps/place/S%C3%A2n+Bo%CC%81ng+%C4%90%C3%B4ng+%C4%90%C3%B4/data=!4m7!3m6!1s0x3135aa4d804dd315:0x2078d2e89d8d7253!8m2!3d21.0576935!4d105.8399184!16s%2Fg%2F11c1t5t8lz!19sChIJFdNNgE2qNTERU3KNnejSeCA?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #135: Sân Bóng Tây Hồ( nhà sàn công ty Tùng Bách)
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Lý Gia Lâm | SĐT: 0343073778
-- Tài khoản: owner.lygialam.135@footballbooking.com | Mật khẩu gốc: Owner@1845
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lý Gia Lâm', 'owner.lygialam.135@footballbooking.com', '$2a$10$dRWqIBnbWorrKvda8TSHz.ECzWjUnI6QICpJSeTL237JHrPS8o9Ri', '0343073778', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Tây Hồ( nhà sàn công ty Tùng Bách)', 'Unnamed, Road, Phương Liễu, Bắc Ninh, Việt Nam', 'Sân bóng trang bị dàn đèn cao áp siêu sáng, dịch vụ đồ uống đa dạng, cho thuê giày và phụ kiện thi đấu.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TmE_UQhmRR2N2rtMLaF99bsF229MfUkrFqlctfOh1w1F67VkkeA8ZTo1PHlQwKtwl-dHZ2iQCjw3NRwzdKgLFEYtKd_4XDwhJ-eq_XEnYrVybw8n-MZ4Th1fJcjZG44pO4kDoqadWTj5A=w408-h306-k-no', '0343073778', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+T%C3%A2y+H%E1%BB%93%28+nh%C3%A0+s%C3%A0n+c%C3%B4ng+ty+T%C3%B9ng+B%C3%A1ch%29/data=!4m7!3m6!1s0x31350bb4f67b8797:0xaf887859e16940dc!8m2!3d21.158707!4d106.142568!16s%2Fg%2F11jlkgxvnx!19sChIJl4d79rQLNTER3EBp4Vl4iK8?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #136: Sân Bóng Phúc Thanh
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Đặng Trọng Minh | SĐT: 0965451986
-- Tài khoản: owner.dangtrongminh.136@footballbooking.com | Mật khẩu gốc: Owner@2989
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đặng Trọng Minh', 'owner.dangtrongminh.136@footballbooking.com', '$2a$10$u3XXE3VHlbejIb1vAxm3MehBogNHwE01iVxekJXKJ.JnywOi5D/my', '0965451986', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Phúc Thanh', '2Q6M+7PH, Ng. 14 P. Mễ Trì Hạ, Từ Liêm, Hà Nội, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 550000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Sd4pfTtCNYsH7dVmpG4F6eZR0FCh8YEYgpjn_Ca7rRATKL6zBzM3ewNZQ5gufpKHYJkhad1P-Twg9SdQUuTpy4UfHV3WjeRvUY03WQ1X8MSTvaX22imb0N67iOPL1sUkSv_TaZ=w408-h306-k-no', '0965451986', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Ph%C3%BAc+Thanh/data=!4m7!3m6!1s0x3135ad8f570e06b5:0x9d726f650fad0de7!8m2!3d21.0106775!4d105.7843568!16s%2Fg%2F11hknp45x_!19sChIJtQYOV4-tNTER5w2tD2Vvcp0?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #137: Sân bóng đá Mai Anh
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Huỳnh Duy Hiếu | SĐT: 0906691930
-- Tài khoản: owner.huynhduyhieu.137@footballbooking.com | Mật khẩu gốc: Owner@1224
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Huỳnh Duy Hiếu', 'owner.huynhduyhieu.137@footballbooking.com', '$2a$10$/pazH.gDNFiDTAgyDVNyM.BJU1fwow.tCWiKWhTv9MFgvp6YJsgbW', '0906691930', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá Mai Anh', '168 Đ Đ. Nguyễn Chí Thanh, Khu phố 2, Tân Ninh, Tây Ninh, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 550000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QVPfRvNnAe3bNPWVwCkvzfZ0xMME_n99IMEkrdiy1UH-w0RI4PB0X6V_vBWhpsK8Qni1IcPW_9TJJL64AxbKwj80bIyLPLAk4XyM2x73ZVlFxaQthy4E1jeYsPCOGV93Ir9JzvlA=w408-h306-k-no', '0906691930', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+Mai+Anh/data=!4m7!3m6!1s0x310b6b3005fd925d:0x2c86b2dd887484b2!8m2!3d11.3201276!4d106.1094154!16s%2Fg%2F11f6krvl1z!19sChIJXZL9BTBrCzERsoR0iN2yhiw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #138: Sân bóng đá Trọng Phát
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Phạm Gia Phong | SĐT: 0985501743
-- Tài khoản: owner.phamgiaphong.138@footballbooking.com | Mật khẩu gốc: Owner@9165
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Phạm Gia Phong', 'owner.phamgiaphong.138@footballbooking.com', '$2a$10$B36tz62FBaB/smo.ON.UaeQ9GNz0l9me8.aj1.gd7KcRiGxfpUiXi', '0985501743', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá Trọng Phát', '31 Đường số 65 Phạm Hùng, Long Thới, Hòa Thành, Tây Ninh, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 350000.00, 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&auto=format&fit=crop', '0985501743', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+Tr%E1%BB%8Dng+Ph%C3%A1t/data=!4m7!3m6!1s0x310b6b459541ed71:0x96e574f54830cb7f!8m2!3d11.2781638!4d106.1252643!16s%2Fg%2F11sfh1yqj8!19sChIJce1BlUVrCzERf8swSPV05ZY?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #139: Sân bóng xã đồng tháp
-- Loại: Sân 11 người | Giá: 900,000 đ/h
-- Chủ sân: Võ Hải Việt | SĐT: 0362890611
-- Tài khoản: owner.vohaiviet.139@footballbooking.com | Mật khẩu gốc: Owner@8736
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Hải Việt', 'owner.vohaiviet.139@footballbooking.com', '$2a$10$zsO1KhL5hIFZDGnr1YidzuPerVuTNFnpoxSnpriPDJYM05qPHJmFC', '0362890611', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Sân bóng xã đồng tháp', '3JGW+VHC, Đan Phượng, Hà Nội, Việt Nam', 'Sân bóng nằm trong khuôn viên thoáng mát, an ninh tốt, có khán đài che mưa nắng cho khán giả cổ vũ.', 900000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RYUC86KJHSF6DZOqTzmyGRhimpOZP4f6W24ARJQ9vfcmwPZQcqRareCeBWMFvvhNIzasJlxpoLWYxPnNk0rP2-y1QwA-Rn-8zdke_xx2jRXy7-0n4npQIOPxmS6UCDwShPZufDxb5QRFCc=w408-h306-k-no', '0362890611', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+x%C3%A3+%C4%91%E1%BB%93ng+th%C3%A1p/data=!4m7!3m6!1s0x3134570053aca5ed:0xfe0d4faff86f5d26!8m2!3d21.0771938!4d105.6464007!16s%2Fg%2F11mcpc0s1_!19sChIJ7aWsUwBXNDERJl1v-K9PDf4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #140: Sân bóng trường thắng,thôn đại thần,xã đồng tháp,huyện đan phượng,hà nội
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Hồ Tuấn Thành | SĐT: 0915398127
-- Tài khoản: owner.hotuanthanh.140@footballbooking.com | Mật khẩu gốc: Owner@9327
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Hồ Tuấn Thành', 'owner.hotuanthanh.140@footballbooking.com', '$2a$10$KeYNb5pwVhCNnTm2jwKur.Pdm5Ta.aSD.DDEFZUXdAeQaYy9kVhra', '0915398127', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng trường thắng,thôn đại thần,xã đồng tháp,huyện đan phượng,hà nội', '3JGW+VHC, Đan Phượng, Hà Nội, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 550000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TD1BKxQjSICpEWAx9XE0hoobiHZodO8QXDZ-zOpPve8ckmTDGFjE3iMvjijCO0crcTIAuGeaWhPBwiWpsU-bgEjFVncYpgPpn6cyuY7BxJeRAisXfLd6x_DYQerQVFwSwKR-JMPQ=w408-h306-k-no', '0915398127', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+tr%C6%B0%E1%BB%9Dng+th%E1%BA%AFng,th%C3%B4n+%C4%91%E1%BA%A1i+th%E1%BA%A7n,x%C3%A3+%C4%91%E1%BB%93ng+th%C3%A1p,huy%E1%BB%87n+%C4%91an+ph%C6%B0%E1%BB%A3ng,h%C3%A0+n%E1%BB%99i/data=!4m7!3m6!1s0x31345700657bdde3:0xd96bb9bd6e14c068!8m2!3d21.0771775!4d105.6463961!16s%2Fg%2F11wn_2x81g!19sChIJ4917ZQBXNDERaMAUbr25a9k?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #141: Sân Bóng Vietnet
-- Loại: Sân 5 người | Giá: 280,000 đ/h
-- Chủ sân: Võ Hải Tú | SĐT: 0986197622
-- Tài khoản: owner.vohaitu.141@footballbooking.com | Mật khẩu gốc: Owner@9318
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Hải Tú', 'owner.vohaitu.141@footballbooking.com', '$2a$10$1P.Nxk2Z16vaLrkqfL7bwO6n/ZdzEXm.tuZxii10zx.J8Ptxns8Hu', '0986197622', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng Vietnet', '2V8Q+R4M, Long Biên, Hà Nội, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 280000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TuWNfvibhmpu2V2Q7MVNcwJDtrvXWzGYltmOjrJj1YvKeJtG96I8BxsakZcMqqpVevhTtbvGicd5WiCuzjpDCejIxRdEsH4GINtL7k_dnuO2My326fgTikTcvoZ4UYKZQsZDqx=w408-h306-k-no', '0986197622', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Vietnet/data=!4m7!3m6!1s0x3135a945490a0191:0x151b7c56d15f4800!8m2!3d21.0170773!4d105.8877954!16s%2Fg%2F11gh3bgw4q!19sChIJkQEKSUWpNTERAEhf0VZ8GxU?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #142: Sân bóng Làng Ích Vịnh
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Đặng Công Tài | SĐT: 0974027076
-- Tài khoản: owner.dangcongtai.142@footballbooking.com | Mật khẩu gốc: Owner@9022
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đặng Công Tài', 'owner.dangcongtai.142@footballbooking.com', '$2a$10$DZViugNm7szyq471XH5QueK3IYeQm/omBRQJhRuoiAytZvpJTxUYG', '0974027076', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Làng Ích Vịnh', 'Làng Ích Vịnh, Xóm Quyết Tâm, Liên Minh, Hà Nội, Việt Nam', 'Sân bóng vị trí thuận tiện di chuyển, mặt cỏ mới làm êm chân, bảo vệ chu đáo, miễn phí wifi và trà đá.', 350000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TOKLiROSL2Sep36KCdQqGTdSpawG7XW3z6Ms0tlwN5UPSeFpOCKAwcYQDoNEmSm-hHtw3taxM-eyH7sBn4iL_AHMvrAzZF10XeiEzqVdT2xx1btvGa1tAj7zROgvXXydHdMa9F1w=w408-h544-k-no', '0974027076', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+L%C3%A0ng+%C3%8Dch+V%E1%BB%8Bnh/data=!4m7!3m6!1s0x3134573a0051ad85:0x9e93ab8c01c1744b!8m2!3d21.0992107!4d105.6514917!16s%2Fg%2F11llnm3smv!19sChIJha1RADpXNDERS3TBAYyrk54?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #143: Sân bóng đá cầu vồng 24/7
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Đoàn Bá Triết | SĐT: 0827277727
-- Tài khoản: owner.doanbatriet.143@footballbooking.com | Mật khẩu gốc: Owner@6446
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đoàn Bá Triết', 'owner.doanbatriet.143@footballbooking.com', '$2a$10$p/liVRUAm5qMgaxX6c/CNetpMZL5EOeQEivoFqs.Wj.gl4B7NkxPy', '0827277727', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá cầu vồng 24/7', '6XP6+4FW, Phước Hậu, Vĩnh Long, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 400000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Rkf7JrxjTKwieTeq92LBC_jZvKMayC4GhY0Osi2PmrlQnVN0JN1t1vY4W2KHV3g3V2_r-IS82RwcMcMy5AdQmU7JZCGz8Mxo7AegODhhSB-AV-pjHKluYI62ePl2yHeWz6ND5a=w426-h240-k-no', '0827277727', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+c%E1%BA%A7u+v%E1%BB%93ng+24%2F7/data=!4m7!3m6!1s0x310a839852cb86e1:0x14026b842de6c20d!8m2!3d10.2353644!4d105.9612012!16s%2Fg%2F11j7q40g7b!19sChIJ4YbLUpiDCjERDcLmLYRrAhQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #144: Sân vận động Vĩnh Long
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Dương Tiến Hoàng | SĐT: 02703862071
-- Tài khoản: owner.duongtienhoang.144@footballbooking.com | Mật khẩu gốc: Owner@4912
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Dương Tiến Hoàng', 'owner.duongtienhoang.144@footballbooking.com', '$2a$10$4wmvy6Ybat7f.g6f9ipjf.YV9MXkJCl25HxD1Onhk87PGcsx43cJ2', '02703862071', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân vận động Vĩnh Long', 'Nguyễn Huệ, Long Châu, Vĩnh Long, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 550000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9S9bIcMfv1ZKD2U_HqgZrScaWbPzxEGbosJTMVSD38jEYDUf172ZzfMqZHJ0SclsSbKR_pCsKZp5KnhiKFLuFecopgN97P46IfcNmNErgSV5OriEG14GvBl4oFV3Gafz90wkEDQfecTXG5g=w408-h306-k-no', '02703862071', 'https://www.google.com/maps/place/S%C3%A2n+v%E1%BA%ADn+%C4%91%E1%BB%99ng+V%C4%A9nh+Long/data=!4m7!3m6!1s0x310a82cf2a967743:0xaed3982eb703bd7!8m2!3d10.2464312!4d105.9611523!16s%2Fg%2F1tp05kb_!19sChIJQ3eWKs-CCjER1ztw64I57Qo?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #145: SÂN BÓNG HOÀ BÌNH LONG BIÊN
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Trần Tiến Việt | SĐT: 0964870777
-- Tài khoản: owner.trantienviet.145@footballbooking.com | Mật khẩu gốc: Owner@7246
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trần Tiến Việt', 'owner.trantienviet.145@footballbooking.com', '$2a$10$qot7ryuUL3UEHhV/BhuKD.TrZWxkoF0bG3SV1G0ZpB/9IhbeKAnEm', '0964870777', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'SÂN BÓNG HOÀ BÌNH LONG BIÊN', '2V9V+VMJ, Long Biên, Hà Nội, Việt Nam', 'Mặt sân phẳng, cỏ mềm chống trơn trượt, giảm thiểu chấn thương, không gian thoáng đãng phù hợp giao lưu bóng đá.', 400000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RfoSJ8vTP6kHNI_ohqkK2QjSrW4ZMVz51wwzohcMvgSEkAa_e_U34tf4sCl8wIpQTnIz5DFzeNlkIXOGq1FPQT7BwSP586-sc7TLI-FbAnqzH60NmICzWpIzoiLIH6g6WwVR2l=w408-h306-k-no', '0964870777', 'https://www.google.com/maps/place/S%C3%82N+B%C3%93NG+HO%C3%80+B%C3%8CNH+LONG+BI%C3%8AN/data=!4m7!3m6!1s0x3135a9a1e005cae1:0x9e25a173ccd743f2!8m2!3d21.0203323!4d105.8940124!16s%2Fg%2F11k4w5qqpy!19sChIJ4coF4KGpNTER8kPXzHOhJZ4?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #146: Sân Bóng Đá QUẬN ĐỘI NINH KIỀU
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Trần Minh Khánh | SĐT: 0949668086
-- Tài khoản: owner.tranminhkhanh.146@footballbooking.com | Mật khẩu gốc: Owner@6439
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trần Minh Khánh', 'owner.tranminhkhanh.146@footballbooking.com', '$2a$10$H1To0LDjAmBBi94Y495viOQjiQoVzKnXsI0yA17r/q2LBppx.owhy', '0949668086', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá QUẬN ĐỘI NINH KIỀU', '369 TP Nguyễn Văn Cừ Nối Dài, Tân An, Cần Thơ, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 400000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TT8Z7lSKC3xM29G23FjYCD2gHYPO-9OjBguAw27FlOqGKu7TPL2YvQmdrs3NLQ-e89-bx-6Ica8FPYg1--gWT23ZJrm7sPGsOdTq1p5OQ47KMsoZSi_xMs2UUHt7YBZH0GiiRdBZIFsV2K=w408-h544-k-no', '0949668086', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+QU%E1%BA%ACN+%C4%90%E1%BB%98I+NINH+KI%E1%BB%80U/data=!4m7!3m6!1s0x31a089b8f8edab93:0x2d04fe2de92cf10!8m2!3d10.0322878!4d105.7536569!16s%2Fg%2F11kqw2n2wz!19sChIJk6vt-LiJoDEREM-S3uJP0AI?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #147: Sân bóng Nam Long
-- Loại: Sân 5 người | Giá: 320,000 đ/h
-- Chủ sân: Đinh Trọng Nam | SĐT: 0914790720
-- Tài khoản: owner.dinhtrongnam.147@footballbooking.com | Mật khẩu gốc: Owner@3361
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đinh Trọng Nam', 'owner.dinhtrongnam.147@footballbooking.com', '$2a$10$9wc7xsegqSsR9j8k/./Iq.yJpx8CQzG4sIgZCtqBksL5JhjzLnzpe', '0914790720', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng Nam Long', '2Q5P+72H, Cái Răng, Cần Thơ, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 320000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QeHadNTQu-QDIBPEMPnUFxxIRF_Y-870zJxbr0BB30GqepRMBqFmxKiOmqZNkgwrd9g2BlPw0gRoQvGXjhxs6aPRO4WEEeQ2aD4nq8iTvtA-VEHHKtqVAh0JG_4Z4zlK0mfxMu=w408-h306-k-no', '0914790720', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+Nam+Long/data=!4m7!3m6!1s0x31a063d1d61f0d65:0x31b39242bdfdda48!8m2!3d10.0081783!4d105.7851027!16s%2Fg%2F11h_clsr_1!19sChIJZQ0f1tFjoDERSNr9vUKSszE?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #148: Sân Bóng An Bình
-- Loại: Sân 7 người | Giá: 400,000 đ/h
-- Chủ sân: Lý Ngọc Tú | SĐT: 0903627171
-- Tài khoản: owner.lyngoctu.148@footballbooking.com | Mật khẩu gốc: Owner@7512
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lý Ngọc Tú', 'owner.lyngoctu.148@footballbooking.com', '$2a$10$TdgVUrgOfqsTmk8Pz/Ny8ODLTPYTIAvu05ZCsvpfWsa1MveO7/Nuy', '0903627171', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng An Bình', '2P6X+QXX, Hẻm 1, An Bình, Cần Thơ, Việt Nam', 'Mặt sân êm ái, thoát nước cực tốt không lo trời mưa, có căng tin nước giải khát và dịch vụ cho thuê đồ thi đấu.', 400000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9S1HVaAQ2DvAS7iM6NjUNpcyhKU6YReRwZNoSDytvdZcm2iSgvoevWmIUh37N7B6Ulz-cBU1IcErOcoUUrEOd62pwNKNwyUmjwFa9KPfd36unT4tTkFk1FkUXEbSCVMmTBoPwCC=w408-h306-k-no', '0903627171', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+An+B%C3%ACnh/data=!4m7!3m6!1s0x31a089b3237cf52d:0xe42299fcfc105723!8m2!3d10.0119813!4d105.7499716!16s%2Fg%2F11g70w_90q!19sChIJLfV8I7OJoDERI1cQ_PyZIuQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #149: Sân Banh cỏ nhân tạo 116
-- Loại: Sân 11 người | Giá: 700,000 đ/h
-- Chủ sân: Đào Huy Vũ | SĐT: 02923600694
-- Tài khoản: owner.daohuyvu.149@footballbooking.com | Mật khẩu gốc: Owner@6188
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đào Huy Vũ', 'owner.daohuyvu.149@footballbooking.com', '$2a$10$EEGhtfZsE4q2afcah9NBaeVzxPpVUZfJK14jm.58xSA97ms9ZrnH6', '02923600694', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Sân Banh cỏ nhân tạo 116', '2QHF+H73, 116, Ninh Kiều, Cần Thơ, Việt Nam', 'Khu liên hợp sân cỏ chất lượng cao, đèn chiếu sáng công suất lớn thi đấu ban đêm, bãi đỗ ô tô xe máy thoải mái.', 700000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RnnZRllJlpWke6oLQkr2aI69vaI6_s7CcenTqj-OrQkhUcHJYggBe0E5CqjwTHvUSFJ8ETBa6KAnRXPAiVcmC21PMY8GkpwskxzGSqBWZZu1sQRmDSTQMu-fIvMbeWHhV6EhWiug=w408-h306-k-no', '02923600694', 'https://www.google.com/maps/place/S%C3%A2n+Banh+c%E1%BB%8F+nh%C3%A2n+t%E1%BA%A1o+116/data=!4m7!3m6!1s0x31a088237345a3c1:0xcd83fc6d9ed7ad12!8m2!3d10.028897!4d105.7731716!16s%2Fg%2F1ptwrby4y!19sChIJwaNFcyOIoDEREq3Xnm38g80?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #150: Sân Bóng Đá Tấn Phát
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Trần Khắc Cường | SĐT: 0907449946
-- Tài khoản: owner.trankhaccuong.150@footballbooking.com | Mật khẩu gốc: Owner@4846
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trần Khắc Cường', 'owner.trankhaccuong.150@footballbooking.com', '$2a$10$gcMj3qlAaVd90tRdF.5F9eKuAaovcHP3ts96h.z53LVkk8ldz17Ga', '0907449946', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Tấn Phát', 'Khu nhà ở cán bộ giáo viên, Đường Số 1 Đại học, Tân An, Cần Thơ, Việt Nam', 'Sân bóng nằm trong khuôn viên thoáng mát, an ninh tốt, có khán đài che mưa nắng cho khán giả cổ vũ.', 500000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Qia6mAeibrI8e87VJwwVvlsPEvLsjHLuYwwhlGa_wUl27H7d4BsJVpxY4TiK53UWjeu0QUVYsJ2sOxMwNmL9GebM2laZluymu12wAyW6niZiVuthW_25IQMBqJKL-xfchiqrs=w408-h306-k-no', '0907449946', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+T%E1%BA%A5n+Ph%C3%A1t/data=!4m7!3m6!1s0x31a08935db30eb11:0x37058f70a0bbb5f!8m2!3d10.0273427!4d105.7614976!16s%2Fg%2F11t5crhhp0!19sChIJEesw2zWJoDERX7sLCvdYcAM?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #151: Sân bóng đá cỏ nhân tạo Minh Khôi
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Lê Hải Thắng | SĐT: 02963888818
-- Tài khoản: owner.lehaithang.151@footballbooking.com | Mật khẩu gốc: Owner@2646
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Lê Hải Thắng', 'owner.lehaithang.151@footballbooking.com', '$2a$10$mLlye5Dmk0lQXv5PrWli2O3TwlDFOicUZ9QBNZ8pgDe3HhHd8XJIS', '02963888818', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá cỏ nhân tạo Minh Khôi', 'Chợ Mới, An Giang, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T0pyv2MzvVcEoa_-7ptEEKJqsELJFurGUylOl2qMBBoenJSu5YXWewwFWVPiQG3uVuLA6IhuvnyoTKD3JOfYwx95hWc-rsG0vYB8phSaOwyLEr-Ia2HRlVzhjOPpBPw4IxK-e4=w426-h240-k-no', '02963888818', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+c%E1%BB%8F+nh%C3%A2n+t%E1%BA%A1o+Minh+Kh%C3%B4i/data=!4m7!3m6!1s0x310a6b2a6e01d6ff:0x26c81c73fa4dc6f8!8m2!3d10.5506159!4d105.4108212!16s%2Fg%2F11clpryhd3!19sChIJ_9YBbiprCjER-MZN-nMcyCY?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #152: Sân bóng đá Sao Mai
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Trần Tiến Tuấn | SĐT: 0868868836
-- Tài khoản: owner.trantientuan.152@footballbooking.com | Mật khẩu gốc: Owner@5806
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trần Tiến Tuấn', 'owner.trantientuan.152@footballbooking.com', '$2a$10$WY005M5yDzdvHu2doZF3euNXFPjCmW9K6plvK31J2o42Xvgn1oqfG', '0868868836', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá Sao Mai', '9C8W+C33, Long Xuyên, An Giang, Việt Nam', 'Sân cỏ nhân tạo chất lượng cao đạt chuẩn, hệ thống đèn LED chiếu sáng hiện đại, bãi giữ xe rộng rãi.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9R2q8_yKFFejG5sIRG7xh34OJEYm3AXOxIVCdyVl0T_BiyvIngPr6qSYTZeBoBF44aR-aVTXLssqwmuCS37LWD2KQfeViRdb3wKhu4oewYtLGPBKwnCm67oy1WutjWacvqa49hDFEfSZVGc=w426-h240-k-no', '0868868836', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+Sao+Mai/data=!4m7!3m6!1s0x310a730056833943:0x34239a3f1c839aa8!8m2!3d10.3660147!4d105.4451673!16s%2Fg%2F11m5s2fm0s!19sChIJQzmDVgBzCjERqJqDHD-aIzQ?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #153: Sân bóng đá 24H-Long Xuyên
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Vũ Xuân Giang | SĐT: 0973666660
-- Tài khoản: owner.vuxuangiang.153@footballbooking.com | Mật khẩu gốc: Owner@3950
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Vũ Xuân Giang', 'owner.vuxuangiang.153@footballbooking.com', '$2a$10$NYGJBqEgIX6T.tSM/Mg3d.9RY75hRZMZwb/YWyxO2jSMAmh4/yWSy', '0973666660', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá 24H-Long Xuyên', '10/1B Đông Thạnh A, Mỹ Thới, An Giang 90118, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 500000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9ST1fos0zSGMzlXUkEYZlYDMEdBN1NmzgCNfQWDhdZScR8fFlJWupW7RN-Mg8_aavhQhdRZa0ZTdY96NO7oq8eRwlxgczucbBCn1oiKgeUomk54kJn2v2tsNY6SJbm5GyzXBXFl=w408-h306-k-no', '0973666660', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+24H-Long+Xuy%C3%AAn/data=!4m7!3m6!1s0x310a73aa0ea5c373:0xd27fabb3406f26a7!8m2!3d10.3391177!4d105.4658669!16s%2Fg%2F11ss85tjsd!19sChIJc8OlDqpzCjERpyZvQLOrf9I?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #154: Sân Bóng Đá Phú Hòa ARENA
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Hồ Khắc Bình | SĐT: 0939771797
-- Tài khoản: owner.hokhacbinh.154@footballbooking.com | Mật khẩu gốc: Owner@9153
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Hồ Khắc Bình', 'owner.hokhacbinh.154@footballbooking.com', '$2a$10$NBUSJRzbOWo1WfFWqBMIDOUsyCy3ST77oSbAWj315snt5f23Vkid.', '0939771797', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đá Phú Hòa ARENA', 'Ấp Thanh Niên, Phú Hòa, An Giang, Việt Nam', 'Sân bóng trang bị dàn đèn cao áp siêu sáng, dịch vụ đồ uống đa dạng, cho thuê giày và phụ kiện thi đấu.', 350000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tx-4bwegPbR0TehJGkniH-sWjHAHY5TAWVY3q196C4E-90PzaPjDhjAWhd2mo0e_Nr28TqJUk-_RjDpfygN2hKiDoNkdHfXRWVhGEg8_xjRNhAGhdGJmFZ1a8BmIZQnwf4Xg36kw=w408-h271-k-no', '0939771797', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+Ph%C3%BA+H%C3%B2a+ARENA/data=!4m7!3m6!1s0x310a0d7a0ffe43f5:0x5c2171416098610e!8m2!3d10.3502589!4d105.3653559!16s%2Fg%2F11txc_bh69!19sChIJ9UP-D3oNCjERDmGYYEFxIVw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #155: Sân Bóng đá Ngọc Nghĩa
-- Loại: Sân 11 người | Giá: 800,000 đ/h
-- Chủ sân: Dương Gia Phúc | SĐT: 02966575191
-- Tài khoản: owner.duonggiaphuc.155@footballbooking.com | Mật khẩu gốc: Owner@8529
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Dương Gia Phúc', 'owner.duonggiaphuc.155@footballbooking.com', '$2a$10$1.KBJSvJc830PGgROFfHQu8x2pksVoySABxQRxdVuw3Qbh1UWdBES', '02966575191', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_11, 'Sân Bóng đá Ngọc Nghĩa', 'H4FX+CQM, Châu Phú, An Giang, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 800000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Rdem_mPztuiXuVKsmGqi9JZ4IsoM3wywYNoWMf2OfBO-whiJp8KOrsqXB-4boeGmc2k_KhcioymmDs5f08aU2sVZouGDRkzq-LkzVq6_wI7b0ueiZIeAmvjX8HcT7tGg7QBRg=w426-h240-k-no', '02966575191', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%91%C3%A1+Ng%E1%BB%8Dc+Ngh%C4%A9a/data=!4m7!3m6!1s0x310a17943f5e24a5:0xcfb66562228fbd3e!8m2!3d10.573587!4d105.1494136!16s%2Fg%2F11c5bf376c!19sChIJpSReP5QXCjERPr2PImJlts8?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #156: Sân bóng đá trường Múa
-- Loại: Sân 7 người | Giá: 350,000 đ/h
-- Chủ sân: Đặng Bảo Bách | SĐT: 0898223760
-- Tài khoản: owner.dangbaobach.156@footballbooking.com | Mật khẩu gốc: Owner@3588
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đặng Bảo Bách', 'owner.dangbaobach.156@footballbooking.com', '$2a$10$uMhXRIEYrGdEfGQw463nB.RVD42Hr16eEH9jlNhWiw8a69Fs1h7GK', '0898223760', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng đá trường Múa', 'Ngõ 100 Đ. Hồ Tùng Mậu, Phú Diễn, Hà Nội, Việt Nam', 'Sân bóng uy tín lâu năm, cỏ nhân tạo chuẩn FIFA, dịch vụ chu đáo, hỗ trợ đặt lịch cố định theo tháng.', 350000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TtgHibZKD2ekHvsH-otOaQCfuiuxOgycmSGAyV9ScFnNOEwE3WwwPMa084v2lNfykQoYhdej3EQtbbU9bPvAlbSCJOq7d-ytQP38Nl9VBs7KR6iNUH3cuyduBV54DkgpiGIHzY=w408-h306-k-no', '0898223760', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%91%C3%A1+tr%C6%B0%E1%BB%9Dng+M%C3%BAa/data=!4m7!3m6!1s0x313455024f56ab63:0xcde4e7eabb359c33!8m2!3d21.0382604!4d105.7753556!16s%2Fg%2F11ghncy0j_!19sChIJY6tWTwJVNDERM5w1u-rn5M0?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #157: Sân bóng Đông Đô
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Đặng Gia Tùng | SĐT: 0899234260
-- Tài khoản: owner.danggiatung.157@footballbooking.com | Mật khẩu gốc: Owner@5097
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đặng Gia Tùng', 'owner.danggiatung.157@footballbooking.com', '$2a$10$j2VEfdzxBeAY9UXYX/IM/.bkVs1v5j7mPcM9La1tbNB2mKkdc8KLq', '0899234260', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân bóng Đông Đô', 'Trần Thái Tông, Cầu Giấy, Hà Nội, Việt Nam', 'Sân bóng trang bị dàn đèn cao áp siêu sáng, dịch vụ đồ uống đa dạng, cho thuê giày và phụ kiện thi đấu.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SzpjAoKxdTt1MWZl7lLSnOEVNdBjKo_ZPCKWu6LaQVYVCgvqfFSsHZ1y5jDnFN9_TW8y5v_8TY7V6XTk8lHloVglTLWcXdT5wKP8L0ixDg9U7tq-0q254RzFfjUFUGO1rmkYLmhQ=w408-h306-k-no', '0899234260', 'https://www.google.com/maps/place/S%C3%A2n+b%C3%B3ng+%C4%90%C3%B4ng+%C4%90%C3%B4/data=!4m7!3m6!1s0x3135ab4e7ea62b4f:0xb500bb5cfd7eabca!8m2!3d21.0279437!4d105.7887218!16s%2Fg%2F11b7l4dzcn!19sChIJTyumfk6rNTERyqt-_Vy7ALU?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #158: Sân Bóng Quân Đội Hoàng Mai
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Hồ Bá Thắng | SĐT: 02873073788
-- Tài khoản: owner.hobathang.158@footballbooking.com | Mật khẩu gốc: Owner@4886
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Hồ Bá Thắng', 'owner.hobathang.158@footballbooking.com', '$2a$10$YXgnVH5FVIhUIyFwfANjhOP6rp1Ml4p51SnEpugw8w/HRSSkjBLlK', '02873073788', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Quân Đội Hoàng Mai', '1 Đ. Hoàng Mai, Tương Mai, Hà Nội, Việt Nam', 'Địa điểm tổ chức các giải đấu phong trào sôi nổi, hỗ trợ bóng thi đấu, áo bib và trọng tài chuyên nghiệp.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9S_UmoSyHOWPuQJJ2Fnq4PEcWnMu2jEVCGS5cn_M5IywEVKCcgr15sk__ZSXZA4bt3SfMZYz4QvB9EAGTkXdSgtlFkXmSVbZeF5v8YLAp6TAI-iSpiY2pc6InzQYJ4np8lYhxSmtQ=w408-h544-k-no', '02873073788', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+Qu%C3%A2n+%C4%90%E1%BB%99i+Ho%C3%A0ng+Mai/data=!4m7!3m6!1s0x3135ac16e60bdf45:0xb2ab41af0729b4b0!8m2!3d20.9872119!4d105.8603908!16s%2Fg%2F11b7stz798!19sChIJRd8L5hasNTERsLQpB69Bq7I?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #159: Sân Bóng Đa Sỹ
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Đặng Duy Hùng | SĐT: 0936999928
-- Tài khoản: owner.dangduyhung.159@footballbooking.com | Mật khẩu gốc: Owner@7484
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đặng Duy Hùng', 'owner.dangduyhung.159@footballbooking.com', '$2a$10$3p1lQeNxrEKHv.ObfnuWv.cc1Sb9HgP4bRXx7nj.NrcYPnv7cUeNu', '0936999928', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Đa Sỹ', 'Tổ 5 Đa Sỹ, Kiến Hưng, Hà Nội, Việt Nam', 'Sân bóng trang bị dàn đèn cao áp siêu sáng, dịch vụ đồ uống đa dạng, cho thuê giày và phụ kiện thi đấu.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SyGCy8TQp5a7nM3-7DhCX83JDAbx0V8__OvT0dn63gK9eO38yk2DVOZayphOsz4zyK-Omc3z6JdbY-OuQopIDdl4g4-HCqbKGSSiD_ll86pL90v2QrEiWHXuHuox3GmWLzW-eOUA=w408-h306-k-no', '0936999928', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90a+S%E1%BB%B9/data=!4m7!3m6!1s0x3135ad2d470b30a3:0x10397a273b374d05!8m2!3d20.9570028!4d105.7829208!16s%2Fg%2F11hf837jnl!19sChIJozALRy2tNTERBU03Oyd6ORA?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #160: Sân Bóng Văn Phú
-- Loại: Sân 7 người | Giá: 550,000 đ/h
-- Chủ sân: Trần Khắc Minh | SĐT: 0914277558
-- Tài khoản: owner.trankhacminh.160@footballbooking.com | Mật khẩu gốc: Owner@5689
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Trần Khắc Minh', 'owner.trankhacminh.160@footballbooking.com', '$2a$10$OLOQupHRSi5xCdq/tsUIJOzlkSBKzhSQj2uaC5f2ODDRZNYwBw9tu', '0914277558', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Bóng Văn Phú', 'Khu đô thị Văn Phú, Kiến Hưng, Hà Nội, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 550000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9ROOP8Vi-cBgTA-k_Bj03-DVfm_GDz4LB9Gk7PeZ7xXSt9GNQZUExznbJI1oJ90bfml4uDAbpgXBOOHD3zFpClFEwzQLY7UL6Q14NQdV4wSHSYUbzssLqW6Z8c6TMmVUehangdV_g=w408-h306-k-no', '0914277558', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+V%C4%83n+Ph%C3%BA/data=!4m7!3m6!1s0x313452da3682c25d:0xf967b5cb6e8638e1!8m2!3d20.9621056!4d105.7677238!16s%2Fg%2F11cm_qcb2z!19sChIJXcKCNtpSNDER4TiGbsu1Z_k?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #161: Sân Banh Chảo lửa
-- Loại: Sân 5 người | Giá: 280,000 đ/h
-- Chủ sân: Đỗ Quang Hoàng | SĐT: 0777700000
-- Tài khoản: owner.doquanghoang.161@footballbooking.com | Mật khẩu gốc: Owner@5106
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đỗ Quang Hoàng', 'owner.doquanghoang.161@footballbooking.com', '$2a$10$s1vGMsQW0PHg7WbccGQGHuAwnw//L5sNP2JMZ1eutmNFGjgKgI90S', '0777700000', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Banh Chảo lửa', '38 Đ. Phan Thúc Duyện, Tân Sơn Nhất, Hồ Chí Minh 700000, Việt Nam', 'Sân bóng trang bị dàn đèn cao áp siêu sáng, dịch vụ đồ uống đa dạng, cho thuê giày và phụ kiện thi đấu.', 280000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tjc33QdCp-P-GoTsPaCScYbLG3VBDxgSts6xLtsIW-PZuOrb_OVRE44GYo26k3vIImmiyrpkHA1-oOWOKmlSw3dOaQDRTfkk7AL2_nOmQsFrHYdh-_qVVTwhPR-uGBDdtaB0DQ=w408-h281-k-no', '0777700000', 'https://www.google.com/maps/place/S%C3%A2n+Banh+Ch%E1%BA%A3o+l%E1%BB%ADa/data=!4m7!3m6!1s0x3175293bd3699b07:0x940f9759f860b26a!8m2!3d10.8062194!4d106.6555175!16s%2Fg%2F11x9x1swh!19sChIJB5tp0zspdTERarJg-FmXD5Q?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #162: Sân Bóng Đá K34 | Sân Bóng Đá Quận Tân Bình TPHCM Có Mái Che - Sân Banh Cỏ Nhân Tạo Quận Tân Bình TPHCM
-- Loại: Sân 5 người | Giá: 280,000 đ/h
-- Chủ sân: Phạm Gia Long | SĐT: 0908787798
-- Tài khoản: owner.phamgialong.162@footballbooking.com | Mật khẩu gốc: Owner@6061
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Phạm Gia Long', 'owner.phamgialong.162@footballbooking.com', '$2a$10$LvTsZoS5l3iMCJKSx8GAgujKUBP7E/mli5Qg9wRBeRJQT966b4VwW', '0908787798', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân Bóng Đá K34 | Sân Bóng Đá Quận Tân Bình TPHCM Có Mái Che - Sân Banh Cỏ Nhân Tạo Quận Tân Bình TPHCM', 'Bạch Đằng, Tân Sơn Hòa, Hồ Chí Minh, Việt Nam', 'Khu vực sân bóng mới nâng cấp mặt cỏ, hệ thống lưới chắn bóng mới, bãi gửi xe có mái che an toàn.', 280000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SNau5ASuvOxhuG8UV3bm4f76TwbN0nvkjtkMbLPp09IG5GjU4Vy_Ki6OuA23Yr9mV5iDp2wTtUBIxbx9W-zIOdd0galN5_vRA2o6vngESASSL7Ukw9j157onyTnxjivJuLLpMEXA=w408-h408-k-no', '0908787798', 'https://www.google.com/maps/place/S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+K34+%7C+S%C3%A2n+B%C3%B3ng+%C4%90%C3%A1+Qu%E1%BA%ADn+T%C3%A2n+B%C3%ACnh+TPHCM+C%C3%B3+M%C3%A1i+Che+-+S%C3%A2n+Banh+C%E1%BB%8F+Nh%C3%A2n+T%E1%BA%A1o+Qu%E1%BA%ADn+T%C3%A2n+B%C3%ACnh+TPHCM/data=!4m7!3m6!1s0x3175291ef79fce35:0xdc394154e1f7b75c!8m2!3d10.8162745!4d106.6727026!16s%2Fg%2F11b6pzy4rg!19sChIJNc6f9x4pdTERXLf34VRBOdw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #163: Sân bóng Trường Đại học Ngân hàng TP. HCM
-- Loại: Sân 5 người | Giá: 250,000 đ/h
-- Chủ sân: Đỗ Minh Dũng | SĐT: 0965167499
-- Tài khoản: owner.dominhdung.163@footballbooking.com | Mật khẩu gốc: Owner@5835
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Đỗ Minh Dũng', 'owner.dominhdung.163@footballbooking.com', '$2a$10$Gy0iqijfTOx4KsGXrOXx0ed318TCrpEm.MfFrs64HKDHwSiZGWRfy', '0965167499', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_5, 'Sân bóng Trường Đại học Ngân hàng TP. HCM', '1060/11, Kha Vạn Cân, Thủ Đức, Hồ Chí Minh 700000, Việt Nam', 'Sân bóng trang bị dàn đèn cao áp siêu sáng, dịch vụ đồ uống đa dạng, cho thuê giày và phụ kiện thi đấu.', 250000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QwERai1hhv0Igmkkba54utVkU9G2_Y0uRnrbWi2Vli-tQ1Xm8aqavlWPReieW2nKmfV82vtXlQU7vAzdBxABoJbomtiuqa0KmisHRTHRpSi2kZyS7H7X3F4OeqYqxd4kwblGUY=w408-h306-k-no', '0965167499', 'https://www.google.com/maps/place/S%C3%A2n+bo%CC%81ng+Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+Ng%C3%A2n+h%C3%A0ng+TP.+HCM/data=!4m7!3m6!1s0x3175279985b8e4ef:0xad8b44e1b3abb5f6!8m2!3d10.8562409!4d106.7589696!16s%2Fg%2F11c4gl3yx4!19sChIJ7-S4hZkndTER9rWrs-FEi60?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #164: Sân Banh CHILL
-- Loại: Sân 7 người | Giá: 500,000 đ/h
-- Chủ sân: Phan Minh Bách | SĐT: 0937694569
-- Tài khoản: owner.phanminhbach.164@footballbooking.com | Mật khẩu gốc: Owner@6994
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Phan Minh Bách', 'owner.phanminhbach.164@footballbooking.com', '$2a$10$cKSMuPcvKCfi0i0GVWNWDeHE/aPfGElmqQj4I29rXcrybkl8YAiBa', '0937694569', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Sân Banh CHILL', '399/45 Bình Thành, Bình Tân, Hồ Chí Minh, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 500000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QmUuRAGZRbzBmEKRt-arKEQ5-MGUTrFdv9fa27JsgXqA3OQ69uV5GsnsNjMu1ULWE7n31_QTeZoCHNIeaku1pKfxK600IU6Erf_fHsENuEcePzSpqsfrzm6n4wbbDkaEaLC_JqMcedBvMj=w408-h272-k-no', '0937694569', 'https://www.google.com/maps/place/S%C3%A2n+Banh+CHILL/data=!4m7!3m6!1s0x31752b9ebf049fe1:0x2c755a768cf741d8!8m2!3d10.8132326!4d106.5863703!16s%2Fg%2F11g873r3hf!19sChIJ4Z8Ev54rdTER2EH3jHZadSw?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));

-- --------------------------------------------------------------------------
-- Sân #165: Câu lạc bộ Bóng đá Phú Nhuận
-- Loại: Sân 7 người | Giá: 450,000 đ/h
-- Chủ sân: Võ Bá Phát | SĐT: 02838477668
-- Tài khoản: owner.vobaphat.165@footballbooking.com | Mật khẩu gốc: Owner@6549
-- --------------------------------------------------------------------------
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at) VALUES ('Võ Bá Phát', 'owner.vobaphat.165@footballbooking.com', '$2a$10$j7ES64Cyq3mQ2.sBV6xGX.DZGdAcR6JSzXnD/Ik5ecGWVh.wFFWcq', '02838477668', 'OWNER', 'ACTIVE', NOW(6), NOW(6));
INSERT INTO fields (owner_id, field_type_id, name, address, description, price_per_hour, image_url, phone, map_link, status, created_at, updated_at) VALUES (LAST_INSERT_ID(), @type_7, 'Câu lạc bộ Bóng đá Phú Nhuận', '03 Hoàng Minh Giám, Đức Nhuận, Hồ Chí Minh 00008, Việt Nam', 'Cụm sân bóng đá tiêu chuẩn, hạt cao su đạt chuẩn an toàn, có khán đài mini và phòng thay đồ sạch sẽ.', 450000.00, 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SBrtnPqeB5HgxH9QXohwX3hJIccpCWIkFPZsBJwhJ_1TuUXCFmesDwUZDzLKPWXT3XQRGTq6AZGfi20hRBNjyzHXKQQyOyoUWEU9vwlnA2SeI73gloP8466QILtYX4J1BvBaFK3A=w408-h306-k-no', '02838477668', 'https://www.google.com/maps/place/C%C3%A2u+l%E1%BA%A1c+b%E1%BB%99+B%C3%B3ng+%C4%91%C3%A1+Ph%C3%BA+Nhu%E1%BA%ADn/data=!4m7!3m6!1s0x3175292077c7d70d:0x2df50a42185f5813!8m2!3d10.8105795!4d106.6759295!16s%2Fg%2F1tg32pyn!19sChIJDdfHdyApdTERE1hfGEIK9S0?authuser=0&hl=vi&g_ep=EgoyMDI2MTAwNy4wIJJjKgBIAVAD&rclk=1', 'ACTIVE', NOW(6), NOW(6));
