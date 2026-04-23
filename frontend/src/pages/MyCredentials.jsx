import React from 'react';
import { Building2, Calendar, ClipboardCopy, ExternalLink, CheckCircle2, Clock, Lock, Cloud, Filter, LayoutGrid } from 'lucide-react';

export default function MyCredentials() {
  const credentials = [
    {
      title: 'Cử nhân Khoa học Máy tính',
      institution: 'Đại học Công nghệ',
      date: '15/05/2023',
      txid: '0x8f7c...3a1b',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=200&h=150'
    },
    {
      title: 'Thạc sĩ Khoa học Dữ liệu',
      institution: 'Học viện Công nghệ Toàn cầu',
      date: '10/01/2025',
      txid: '0x4a2e...9c8f',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=200&h=150'
    },
    {
      title: 'Kỹ sư Giải pháp Đám mây',
      institution: 'Liên minh Đám mây',
      date: '20/11/2024',
      txid: '0x1b9d...f4e2',
      status: 'verified',
      icon: Cloud
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Đã sao chép TxID!");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Văn bằng của tôi</h1>
          <p className="text-slate-500 max-w-2xl">Mọi tài liệu hiển thị ở đây đều đã được xác thực mã hóa trên mạng lưới Blockchain.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 hover:border-[#88D8C0] hover:text-[#88D8C0] transition-all shadow-sm">
            <Filter size={16} /> Lọc
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {credentials.map((cred, index) => (
          <div key={index} className="bg-white border border-slate-100 rounded-[35px] p-6 shadow-sm hover:shadow-xl hover:border-[#88D8C0] transition-all group relative overflow-hidden">
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden shadow-inner">
                {cred.image ? (
                  <img src={cred.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={cred.title} />
                ) : (
                  <Cloud size={32} className="text-[#88D8C0]" />
                )}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#88D8C0]/10 text-[#88D8C0] rounded-full border border-[#88D8C0]/20 font-bold text-[10px] uppercase tracking-wider">
                <CheckCircle2 size={12} fill="currentColor" />
                Verified
              </div>
            </div>

            <div className="flex-1 mb-6 relative z-10">
              <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-[#88D8C0] transition-colors">{cred.title}</h3>
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Building2 size={16} className="text-slate-400" />
                <span className="text-sm font-medium">{cred.institution}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Cấp ngày: {cred.date}</span>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="bg-slate-50/50 rounded-2xl p-3 flex items-center justify-between border border-slate-100">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">TxID</span>
                <span className="font-mono text-[10px] text-slate-400 truncate w-24 mx-2">{cred.txid}</span>
                <button onClick={() => copyToClipboard(cred.txid)} className="text-[#88D8C0] hover:scale-110 transition-transform">
                  <ClipboardCopy size={14} />
                </button>
              </div>
              <button className="w-full bg-white border-2 border-[#88D8C0] text-[#88D8C0] py-3 rounded-2xl text-xs font-bold transition-all hover:bg-[#88D8C0] hover:text-white flex items-center justify-center gap-2">
                <ExternalLink size={16} /> Xem chi tiết
              </button>
            </div>
          </div>
        ))}

        {/* Pending Card - Giữ nguyên phong cách của Khiêm nhưng tút lại cho mượt */}
        <div className="bg-white/50 border border-slate-200 border-dashed rounded-[35px] p-6 flex flex-col grayscale opacity-60">
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center border border-dashed border-slate-300">
              <Clock size={32} className="text-slate-300" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-400 rounded-full border border-slate-200 font-bold text-[10px] uppercase tracking-wider">
              <Clock size={12} /> Pending
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-400 mb-2">Chứng chỉ Blockchain Dev</h3>
          <p className="text-[11px] text-slate-400 italic mb-6">Đang đợi xác thực từ mạng lưới...</p>
          <button disabled className="w-full bg-slate-100 text-slate-300 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-not-allowed">
            <Lock size={16} /> Đang khóa
          </button>
        </div>
      </div>
    </div>
  );
}