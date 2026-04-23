import React from "react";
import {
  LayoutDashboard,
  ShieldCheck,
  BookOpen,
  Building2,
  HelpCircle,
  Settings,
  PlusCircle,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Bảng điều khiển",
      text: "Dashboard",
      to: "/",
    },
    {
      icon: ShieldCheck,
      label: "Xác thực bằng",
      text: "Verify Credential",
      to: "/verify",
    },
    {
      icon: BookOpen,
      label: "Văn bằng của tôi",
      text: "My Credentials",
      to: "/my-credentials",
    },
    {
      icon: Building2,
      label: "Đơn vị cấp bằng",
      text: "Institutions",
      to: "/institutions",
    },
  ];

  const footerItems = [
    { icon: HelpCircle, label: "Hỗ trợ", to: "/support" },
    { icon: Settings, label: "Cài đặt", to: "/settings" },
  ];

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-slate-100 flex flex-col fixed inset-y-0 left-0 z-50">
      <div className="p-6">
        {/* Logo Section */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-[18px] bg-[#88D8C0]/20 flex items-center justify-center text-[#88D8C0] shadow-inner">
            <Building2 size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
              AuthChain
            </h1>
            <p className="text-[9px] text-[#88D8C0] uppercase tracking-[0.2em] font-black">
              Institutional Vault
            </p>
          </div>
        </div>

        {/* Nút Call-to-Action */}
        <button
          onClick={() => navigate("/verify")}
          className="w-full bg-[#88D8C0] text-white py-3.5 rounded-[20px] shadow-lg shadow-[#88D8C0]/30 font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mb-8"
        >
          <PlusCircle size={18} strokeWidth={2.5} />
          Xác thực ngay
        </button>

        {/* Menu Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-[20px] transition-all duration-300 group ${
                  isActive
                    ? "bg-[#88D8C0] text-white font-bold shadow-md shadow-[#88D8C0]/20"
                    : "text-slate-500 hover:text-[#88D8C0] hover:bg-slate-50 font-medium"
                }`
              }
            >
              <item.icon
                size={20}
                className="transition-transform group-hover:scale-110"
              />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Navigation */}
      <div className="mt-auto p-6 border-t border-slate-50/50">
        <nav className="space-y-2">
          {footerItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-[#88D8C0] hover:bg-slate-50 rounded-[20px] transition-all font-medium group"
            >
              <item.icon
                size={18}
                className="transition-transform group-hover:rotate-12"
              />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
