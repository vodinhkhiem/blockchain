import React, { useState } from 'react';

export default function Dashboard() {
  const [studentName, setStudentName] = useState("");
  const [degree, setDegree] = useState("");

  const handleIssue = (e) => {
    e.preventDefault();
    alert(`Đang chuẩn bị cấp bằng cho: ${studentName}`);
  };

  const [hash, setHash] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    alert(`Đang kiểm tra hash: ${hash}`);
  };

  return (
    <div className="page-container">
      <div className="form-grid">
        <section className="card">
          <h2 className="page-title">Cấp chứng chỉ</h2>
          <form className="space-y-5" onSubmit={handleIssue}>
            <div className="input-group">
              <label className="block uppercase font-bold mb-2">Tên sinh viên</label>
              <input 
                type="text" 
                className="input"
                placeholder="Nhập tên sinh viên"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="block uppercase font-bold mb-2">Loại bằng</label>
              <input 
                type="text" 
                className="input"
                placeholder="VD: Cử nhân CNTT"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg">
              Cấp bằng lên Blockchain
            </button>
          </form>
        </section>

        <section className="card">
          <h2 className="page-title">Xác thực nhanh</h2>
          <form onSubmit={handleVerify}>
            <div className="input-group">
              <input 
                type="text" 
                className="input"
                placeholder="Dán mã Hash (0x...)"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg">
              Kiểm tra
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

