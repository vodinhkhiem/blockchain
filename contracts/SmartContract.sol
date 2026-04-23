// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AcademicCredential {
    address public universityAdmin;
    
    // Struct giống như 1 cái Form đăng ký thông tin
    struct Certificate {
        bytes32 hash;          // Mã hash của bằng cấp
        string studentId;       // MSSV
        uint256 issuedAt;       // Ngày cấp (timestamp)
        bool isValid;           // Còn hiệu lực không?
    }

    // Mapping giống như 1 cuốn từ điển, tra cứu bằng hash
    mapping(bytes32 => Certificate) public certificates;

    // Event để ghi log ra Blockchain (phục vụ frontend)
    event Issued(bytes32 indexed hash, string studentId);
    event Revoked(bytes32 indexed hash);

    // Khi deploy contract, người deploy sẽ là Admin (Trường ĐH)
    constructor() {
        universityAdmin = msg.sender;
    }

    // Kiểm tra xem ai đang gọi hàm có phải Admin không
    modifier onlyAdmin() {
        require(msg.sender == universityAdmin, "Ban khong phai la nha truong");
        _;
    }

    // Hàm Cấp Bằng (Chỉ Admin mới dùng được)
    function issueCertificate(bytes32 _hash, string memory _studentId) public onlyAdmin {
        // Kiểm tra xem bằng này đã tồn tại chưa
        require(certificates[_hash].issuedAt == 0, "Bang da ton tai");
        
        certificates[_hash] = Certificate({
            hash: _hash,
            studentId: _studentId,
            issuedAt: block.timestamp,
            isValid: true
        });
        
        emit Issued(_hash, _studentId);
    }

    // Hàm Xác Thực (Ai cũng dùng được, không tốn phí Gas)
    function verifyCertificate(bytes32 _hash) public view returns (string memory, uint256, bool) {
        Certificate memory cert = certificates[_hash];
        require(cert.issuedAt != 0, "Khong tim thay bang");
        return (cert.studentId, cert.issuedAt, cert.isValid);
    }

    // Hàm Thu Hồi Bằng (Chỉ Admin)
    function revokeCertificate(bytes32 _hash) public onlyAdmin {
        require(certificates[_hash].issuedAt != 0, "Khong tim thay bang");
        certificates[_hash].isValid = false;
        emit Revoked(_hash);
    }
}