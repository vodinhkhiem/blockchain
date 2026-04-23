import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './Topbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#f9f9ff]">
      <Sidebar />
      <div className="md:ml-64 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}