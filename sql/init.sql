-- Bật extension để tạo UUID (cần quyền superuser)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tạo bảng danh sách Công việc (Tasks)
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Thêm thử vài dòng dữ liệu mẫu để API có cái mà hiển thị
INSERT INTO tasks (title, description) 
VALUES 
('Cấu hình Docker', 'Đã chạy thành công PostgREST'),
('Viết Smart Contract', 'Sử dụng Solidity và Hardhat');