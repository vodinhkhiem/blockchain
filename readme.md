=== === === CAU TRUC SRC CODE === === ===
BLOCKCHAIN/
├── backend/                <-- Folder chứa Backend (Cấu trúc rời)
│   ├── src/
│   │   ├── api/            <-- Controllers, Middleware
│   │   ├── domain/         <-- Entities, Logic nghiệp vụ
│   │   ├── infrastructure/ <-- Database, Repositories, Models
│   │   ├── services/       <-- Xử lý logic trung gian
│   │   ├── app.py         <-- Điểm vào chính của app
│   │   └── config.py      <-- Cấu hình chung (DB, Secret Keys)
│   ├── tests/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/               <-- Folder chứa React (Cấu trúc rời)
│   ├── public/
│   ├── src/
│   │   ├── assets/         <-- Images, Icons, CSS toàn cục
│   │   ├── components/     <-- Các mảnh ghép UI (Button, Card,...)
│   │   ├── hooks/          <-- Logic React tùy chỉnh (useAuth, useSocket)
│   │   ├── layouts/        <-- Khung sườn (Navbar, Sidebar)
│   │   ├── pages/          <-- Các trang hoàn chỉnh (Login, Dashboard)
│   │   ├── services/       <-- Gọi API đến Backend (Axios/Fetch)
│   │   ├── store/          <-- Quản lý trạng thái (Zustand/Redux)
│   │   └── utils/          <-- Hàm bổ trợ (Format date, validate)
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml      <-- Kết nối cả 2 chạy cùng lúc
└── README.md