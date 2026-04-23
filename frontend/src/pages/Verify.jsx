import React, { useState } from 'react';

export default function Verify() {
  const [hash, setHash] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    // Mock blockchain verify
    setResult({
      valid: true,
      studentId: 'STU-2024-001',
      name: 'Nguyen Van A',
      degree: 'Cử nhân CNTT',
      date: '2024-01-15'
    });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Xác thực chứng chỉ</h1>
      <div className="verify-container">
        <section className="card">
          <form onSubmit={handleVerify}>
            <div className="input-group">
              <label className="block uppercase font-bold mb-2">Certificate Hash</label>
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
            <h2 className="page-title text-green-600">✓ Chứng chỉ HỢP LỆ</h2>
            <div className="result-details">
              <div className="input-group">
                <label>Mã SV:</label>
                <span>{result.studentId}</span>
              </div>
              <div className="input-group">
                <label>Tên:</label>
                <span>{result.name}</span>
              </div>
              <div className="input-group">
                <label>Bằng cấp:</label>
                <span>{result.degree}</span>
              </div>
              <div className="input-group">
                <label>Ngày cấp:</label>
                <span>{result.date}</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

