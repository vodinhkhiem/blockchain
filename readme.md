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


=== === === LENH TUONG TAC VOI GIT === === === 
<!-- cai nay co tac dung tao duong dan den git-->
git remote add origin https://github.com/vodinhkhiem/blockchain.git
<!-- cai nay co tac dung chuyen sang nhanh main -->
git branch -M main
<!-- cai nay dung de up code truc tiep len nhanh main -->
git push -u origin main
<!-- cai nay dung de tao file README.md va khoi tao git -->
echo "# blockchain" >> README.md
<!-- cai nay dung de khoi tao git -->
git init
<!-- cai nay dung de them file README.md vao git -->
git add README.md
<!-- cai nay dung de commit file README.md -->
git commit -m "first commit"
<!-- cai nay dung de tao nhanh main -->
git branch -M main
<!-- cai nay dung de push code len nhanh main -->
git push -u origin main
<!-- cai nay dung de them tat ca file vao git -->
git add .
<!-- cai nay dung de them nhung file hoac folder chi dinh vao git -->
git add <file_or_folder>

=== === === CAC BUOC THUC HIEN LAN DAU === === ===
buoc 1: cai dat git tren may tinh
buoc 2: tao tai khoan github
buoc 3: tao repository tren github
buoc 4: mo terminal, di chuyen den thu muc chua code cua ban
buoc 5: chay lenh "git init" de khoi tao git trong thu muc do
buoc 6: chay lenh "git add ." de them tat ca file vao git
<!-- git status de kiem tra xem co file nao chua duoc them vao git khong -->
buoc 7: chay lenh "git commit -m 'first commit'" de commit file vao git
buoc 8: chay lenh "git branch -M main" de tao nhanh
buoc 9: chay lenh "git remote add origin https://github.com/vodinhkhiem/blockchain.git" de them remote repository tren github
buoc 10: chay lenh "git push -u origin main" de push code len github

=== === === CAC BUOC THUC HIEN LAN SAU === === ===
buoc 1: mo terminal, di chuyen den thu muc chua code cua ban
buoc 2: chay lenh "git add ." de them tat ca file vao git co the ghi ten file hoac folder chi dinh vao git
buoc 3: chay lenh "git status" de kiem tra xem co file nao chua duoc them vao git khong
buoc 4: chay lenh "git commit -m 'ghi lai thay doi'" de commit file vao git
buoc 5: chay lenh "git push" de push code len github

=== === === CACH KEO CODE TU GITHUB VE MAY TINH === === ===
buoc 1: mo terminal, di chuyen den thu muc ma ban muon luu code ve may tinh
buoc 2: chay lenh "git clone <repository_url>" de keo code tu github ve may tinh
buoc 3: chay lenh "cd <repository_name>" de di chuyen vao thu muc code vua keo ve
buoc 4: chay lenh "git pull" de cap nhat code moi nhat tu github ve may tinh
