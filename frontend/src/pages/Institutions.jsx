import React from 'react';
import { Building2, Search, Filter, SortAsc, MapPin, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Institutions() {
  const institutions = [
    {
      name: 'Đại học Stanford',
      location: 'Stanford, CA',
      totalIssued: '142,859',
      joinDate: 'Tháng 8, 2021',
      icon: Building2
    },
    {
      name: 'MIT',
      location: 'Cambridge, MA',
      totalIssued: '89,204',
      joinDate: 'Tháng 1, 2022',
      icon: Building2
    },
    {
      name: 'Google Cloud Certifications',
      location: 'Toàn cầu',
      totalIssued: '1,250,000+',
      joinDate: 'Tháng 11, 2020',
      icon: Building2
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Đơn vị cấp bằng</h1>
          <p className="text-slate-500 max-w-2xl">Danh bạ các trường học và tổ chức đã được xác thực trên mạng lưới AuthChain.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:border-[#88D8C0] hover:text-[#88D8C0] transition-all shadow-sm">
            <Filter size={18} />
            Bộ lọc
          </button>
        </div>
      </div>

      {/* Thanh tìm kiếm Glassmorphism */}
      <div className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo tên hoặc ID đơn vị..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:border-[#88D8C0] focus:ring-1 focus:ring-[#88D8C0] transition-all"
          />
        </div>
      </div>

      {/* Grid danh sách đơn vị */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {institutions.map((inst, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-[30px] p-6 shadow-sm hover:border-[#88D8C0] hover:shadow-lg transition-all group relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#88D8C0]/10 text-[#88D8C0] px-3 py-1 rounded-full border border-[#88D8C0]/20 flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider">
              <CheckCircle2 size={12} fill="currentColor" />
              Verified
            </div>

            <div className="flex items-center gap-4 mb-6 mt-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-50 group-hover:bg-[#88D8C0]/5 transition-colors">
                <inst.icon size={32} className="text-[#88D8C0]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-[#88D8C0] transition-colors">{inst.name}</h3>
                <div className="flex items-center gap-1 text-slate-400 mt-1">
                  <MapPin size={12} />
                  <span className="text-[11px] font-bold">{inst.location}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 mb-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tổng cấp</p>
                <p className="text-sm font-bold text-slate-900">{inst.totalIssued}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tham gia</p>
                <p className="text-sm font-bold text-slate-900">{inst.joinDate}</p>
              </div>
            </div>

            <button className="w-full py-3 bg-white border-2 border-[#88D8C0] text-[#88D8C0] rounded-2xl font-bold text-sm hover:bg-[#88D8C0] hover:text-white transition-all transform active:scale-95">
              Xem hồ sơ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}