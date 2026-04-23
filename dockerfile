# Sử dụng Node.js bản mới nhất (có thể dùng alpine cho nhẹ)
FROM node:22-alpine

# Cài đặt một số công cụ hệ thống cần thiết cho việc compile
RUN apk add --no-cache git python3 make g++ 

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json để cài đặt thư viện trước (tận dụng Docker cache)
COPY package*.json ./
RUN npm install
RUN apk add --no-cache python3 make g++
# Copy toàn bộ code (contracts, scripts, hardhat.config.js...) vào container
COPY . .

# Mở port 8545 (port mặc định của mạng Hardhat local)
EXPOSE 8545

# Lệnh mặc định khi container chạy: khởi động mạng local của Hardhat
CMD ["npx", "hardhat", "node"]
# npx hardhat ignition deploy ./ignition/modules/Apollo.js --network localhost lenh chay code
# npx hardhat node kich hardhat