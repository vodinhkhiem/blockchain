import React, { useState } from 'react';
import { Bell, Search, Menu, Wallet } from 'lucide-react';

export default function TopBar() {
  // Trạng thái giả lập ví. Người 5 sẽ truyền account thật từ ethers.js vào đây
  const [account, setAccount] = useState(null);

  const handleConnectWallet = () => {
    setAccount("0x1b08...C871"); 
  };

  return (
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-40 flex items-center justify-between px-8 transition-all">
      {/* Mobile Menu */}
      <div className="flex items-center gap-4">
        <Menu className="md:hidden text-slate-600 cursor-pointer hover:text-[#88D8C0] transition-colors" size={24} />
        <span className="text-xl font-black text-slate-900 md:hidden tracking-tight">AuthChain</span>
      </div>

      {/* Thanh tìm kiếm Glassmorphism */}
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#88D8C0] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm bằng mã Hash hoặc ID chứng chỉ..." 
            className="w-full bg-slate-50/50 border border-slate-100 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#88D8C0] focus:ring-2 focus:ring-[#88D8C0]/20 transition-all font-sans shadow-inner"
          />
        </div>
      </div>

      {/* Cụm chức năng bên phải */}
      <div className="flex items-center gap-6">
        {/* Nút Thông báo */}
        <button className="relative p-2 text-slate-400 hover:text-[#88D8C0] hover:bg-slate-50 rounded-full transition-all">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#88D8C0] rounded-full border-2 border-white animate-pulse"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-100 mx-1 hidden sm:block"></div>
        
        {/* Nút Kết nối Ví (Web3 Ready) */}
        {!account ? (
          <button 
            onClick={handleConnectWallet}
            className="flex items-center gap-2 bg-[#88D8C0] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-[#88D8C0]/30 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Wallet size={16} />
            Kết nối ví
          </button>
        ) : (
          <button 
            onClick={() => setAccount(null)} // Giả lập ngắt kết nối
            className="flex items-center gap-3 bg-white border border-slate-100 px-2 py-1.5 pr-5 rounded-full hover:border-[#88D8C0] hover:shadow-md transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-[#88D8C0]/10 flex items-center justify-center text-[#88D8C0] group-hover:bg-[#88D8C0] group-hover:text-white transition-colors">
              <Wallet size={16} />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Đã kết nối</p>
              <p className="text-xs font-mono font-bold text-slate-700 leading-none">{account}</p>
            </div>
          </button>
        )}
      </div>
    </header>
  );
}