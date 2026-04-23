-- Bật extension để tạo UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bảng tasks
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO tasks (title, description) 
VALUES 
('Cấu hình Docker', 'Đã chạy thành công PostgREST'),
('Viết Smart Contract', 'Sử dụng Solidity và Hardhat');

-- Bảng lưu ảnh chứng chỉ
CREATE TABLE IF NOT EXISTS certificate_images (
    hash TEXT PRIMARY KEY,
    image_base64 TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cấp quyền cho role admin
GRANT SELECT, INSERT ON certificate_images TO admin;