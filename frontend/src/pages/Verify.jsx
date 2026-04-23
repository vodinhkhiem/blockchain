import React, { useState } from "react";
import {
  connectWalletAndGetContract,
  verifyCertificate,
} from "../utils/contractInteract";
import { fetchImageFromDB } from "../utils/imageStorage";
import { ethers } from "ethers";

export default function Verify() {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  const handleConnect = async () => {
    const res = await connectWalletAndGetContract();
    if (res) {
      setContract(res.contract);
      setAccount(res.address);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!contract) return alert("Hãy kết nối ví trước!");
    if (!hash) return alert("Vui lòng nhập hash!");

    if (!ethers.utils.isHexString(hash, 32)) {
      alert("Hash không hợp lệ (phải là 32 bytes hex)");
      return;
    }

    const res = await verifyCertificate(contract, hash);
    if (res) {
      // ✅ Lấy ảnh từ database (nếu có)
      const imageBase64 = await fetchImageFromDB(hash);
      setResult({
        valid: res.isValid,
        studentId: res.studentId,
        date: res.issuedAt,
        image: imageBase64,
      });
    } else {
      alert("Không tìm thấy chứng chỉ hoặc lỗi xác thực!");
      setResult(null);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Xác thực chứng chỉ</h1>
      <div className="mb-4">
        {!account ? (
          <button onClick={handleConnect} className="btn btn-secondary">
            🔌 Kết nối ví
          </button>
        ) : (
          <span>
            ✅ Ví: {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        )}
      </div>
      <div className="verify-container">
        <section className="card">
          <form onSubmit={handleVerify}>
            <div className="input-group">
              <label className="block uppercase font-bold mb-2">
                Certificate Hash
              </label>
              <input
                type="text"
                className="input"
                placeholder="0x..."
                value={hash}
                onChange={(e) => setHash(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg">
              Xác thực trên Blockchain
            </button>
          </form>
        </section>
        {result && (
          <section className="card">
            <h2
              className="page-title"
              style={{ color: result.valid ? "green" : "red" }}
            >
              {result.valid ? "✓ Chứng chỉ HỢP LỆ" : "✗ Chứng chỉ KHÔNG HỢP LỆ"}
            </h2>
            <div className="result-details">
              <div className="input-group">
                <label>Mã SV:</label>
                <span>{result.studentId}</span>
              </div>
              <div className="input-group">
                <label>Ngày cấp:</label>
                <span>{result.date}</span>
              </div>
              {/* ✅ Hiển thị ảnh nếu có */}
              {result.image && (
                <div className="mt-4">
                  <p className="font-bold mb-2">Ảnh chứng chỉ:</p>
                  <img
                    src={result.image}
                    alt="Chứng chỉ"
                    className="max-w-full rounded-lg border"
                  />
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
