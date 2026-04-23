import React, { useState } from "react";
import {
  connectWalletAndGetContract,
  issueCertificate,
  verifyCertificate,
} from "../utils/contractInteract";
import { ethers } from "ethers";
import { uploadImageToDB, fetchImageFromDB } from "../utils/imageStorage";

export default function Dashboard() {
  const [studentName, setStudentName] = useState("");
  const [degree, setDegree] = useState("");
  const [issueFile, setIssueFile] = useState(null);
  const [issuePreview, setIssuePreview] = useState(null); // URL object để preview ảnh
  const [issueFileType, setIssueFileType] = useState(""); // 'image' hoặc 'pdf'
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  // Xác thực nhanh
  const [quickHash, setQuickHash] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);

  const handleConnect = async () => {
    const result = await connectWalletAndGetContract();
    if (result) {
      setContract(result.contract);
      setAccount(result.address);
      alert(`Đã kết nối ví: ${result.address}`);
    }
  };

  // Hàm tính hash của file
  const computeFileHash = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    return ethers.utils.keccak256(uint8Array);
  };

  const handleIssueFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIssueFile(file);
      // Xác định loại file
      if (file.type.startsWith("image/")) {
        setIssueFileType("image");
        setIssuePreview(URL.createObjectURL(file));
      } else if (file.type === "application/pdf") {
        setIssueFileType("pdf");
        setIssuePreview(null); // PDF không preview trực tiếp được bằng img
      } else {
        alert("Vui lòng chọn file ảnh (JPG/PNG) hoặc PDF");
        e.target.value = "";
        setIssueFile(null);
        setIssuePreview(null);
        setIssueFileType("");
      }
    }
  };

  // Cấp bằng
  const handleIssue = async (e) => {
    e.preventDefault();
    if (!contract) return alert("Hãy kết nối ví trước!");
    if (!issueFile) return alert("Vui lòng chọn file bằng cấp!");
    if (!studentName) return alert("Nhập tên sinh viên!");

    try {
      const certHash = await computeFileHash(issueFile);
      const result = await issueCertificate(contract, certHash, studentName);
      if (result.success) {
        // Chuyển ảnh thành base64
        const reader = new FileReader();
        reader.onload = async () => {
          const base64 = reader.result; // data:image/png;base64,...
          await uploadImageToDB(certHash, base64);
        };
        reader.readAsDataURL(issueFile);

        alert(`Cấp bằng thành công!\nHash file: ${certHash}`);
        // Reset form...
      } else {
        alert("Lỗi: " + result.error);
      }
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };
  // Xác thực nhanh
  const handleQuickVerify = async (e) => {
    e.preventDefault();
    if (!contract) return alert("Hãy kết nối ví trước!");
    // ... xác thực hash như cũ

    const res = await verifyCertificate(contract, quickHash);
    if (res) {
      // Lấy ảnh từ DB
      const imageBase64 = await fetchImageFromDB(quickHash);
      setVerifyResult({
        valid: res.isValid,
        studentId: res.studentId,
        date: res.issuedAt,
        hash: quickHash,
        image: imageBase64, // có thể null nếu không có ảnh
      });
    } else {
      setVerifyResult({ error: "Không tìm thấy chứng chỉ trên blockchain!" });
    }
  };

  return (
    <div className="page-container">
      <div className="mb-4">
        {!account ? (
          <button onClick={handleConnect} className="btn btn-secondary">
            🔌 Kết nối ví
          </button>
        ) : (
          <span className="text-sm">
            ✅ Ví: {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        )}
      </div>

      <div className="form-grid">
        {/* CẤP CHỨNG CHỈ */}
        <section className="card">
          <h2 className="page-title">Cấp chứng chỉ</h2>
          <form className="space-y-5" onSubmit={handleIssue}>
            <div className="input-group">
              <label className="block uppercase font-bold mb-2">
                Tên sinh viên
              </label>
              <input
                type="text"
                className="input"
                placeholder="Nhập tên sinh viên"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label className="block uppercase font-bold mb-2">
                Loại bằng
              </label>
              <input
                type="text"
                className="input"
                placeholder="VD: Cử nhân CNTT"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="block uppercase font-bold mb-2">
                File bằng cấp (JPG, PNG, PDF)
              </label>
              <input
                id="issue-file-input"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleIssueFileChange}
                required
              />
              {/* Preview ảnh nếu là file ảnh */}
              {issueFileType === "image" && issuePreview && (
                <img
                  src={issuePreview}
                  alt="Preview"
                  className="mt-2 max-h-48 rounded-lg border"
                />
              )}
              {/* Thông báo nếu là PDF */}
              {issueFileType === "pdf" && (
                <p className="mt-2 text-sm text-gray-600">
                  📄 {issueFile.name} (PDF)
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg">
              Cấp bằng lên Blockchain
            </button>
          </form>
        </section>

        {/* XÁC THỰC NHANH */}
        <section className="card">
          <h2 className="page-title">Xác thực nhanh</h2>
          <form onSubmit={handleQuickVerify}>
            <div className="input-group">
              <label className="block uppercase font-bold mb-2">
                Certificate Hash
              </label>
              <input
                type="text"
                className="input"
                placeholder="0x..."
                value={quickHash}
                onChange={(e) => setQuickHash(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg">
              Kiểm tra
            </button>
          </form>

          {verifyResult && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
              {verifyResult.error ? (
                <p className="text-red-500">{verifyResult.error}</p>
              ) : (
                <>
                  <p>
                    <strong>Mã SV:</strong> {verifyResult.studentId}
                  </p>
                  <p>
                    <strong>Ngày cấp:</strong> {verifyResult.date}
                  </p>
                  <p
                    className={
                      verifyResult.valid ? "text-green-600" : "text-red-600"
                    }
                  >
                    <strong>Trạng thái:</strong>{" "}
                    {verifyResult.valid ? "Hợp lệ" : "Đã thu hồi"}
                  </p>
                  <p className="text-xs break-all mt-2">
                    <strong>Hash:</strong> {verifyResult.hash}
                  </p>

                  {/* ✅ Hiển thị ảnh nếu có */}
                  {verifyResult.image && (
                    <div className="mt-4">
                      <p className="font-bold mb-2">Ảnh chứng chỉ:</p>
                      <img
                        src={verifyResult.image}
                        alt="Chứng chỉ"
                        className="max-w-full rounded-lg border"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
