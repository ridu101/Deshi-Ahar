import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Search, Bell, User } from 'lucide-react';

export const AdminLayout = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen relative font-sans">
      <AdminSidebar />
      <main className="flex-1 ml-72 p-10 relative">
        <header className="flex items-center justify-between mb-10">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search orders, menu, or users..." 
                className="pl-12 pr-6 py-3 bg-white/70 backdrop-blur-md border border-primary/5 rounded-2xl w-96 text-sm font-medium focus:ring-2 ring-primary/20 outline-none transition-all shadow-sm"
              />
           </div>

           <div className="flex items-center gap-4">
              <button className="p-3 bg-white shadow-sm border border-primary/5 rounded-2xl text-slate-500 hover:text-primary transition-colors relative">
                 <Bell size={20} />
                 <span className="absolute top-3 right-3 w-2 h-2 bg-secondary rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center gap-3 p-1.5 bg-white shadow-sm border border-primary/5 rounded-2xl pr-4 cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black">
                   A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-bold text-primary leading-tight">Admin User</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manager</p>
                </div>
              </div>
           </div>
        </header>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           <Outlet />
        </section>
      </main>
    </div>
  );
};
