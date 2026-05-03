import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Menu as MenuIcon, 
  PlusCircle, 
  BarChart3, 
  Users,
  LogOut,
  UtensilsCrossed
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/admin/orders', icon: ShoppingBag, label: 'All Orders' },
  { path: '/admin/ongoing', icon: Clock, label: 'Ongoing' },
  { path: '/admin/completed', icon: CheckCircle2, label: 'Completed' },
  { path: '/admin/menu', icon: MenuIcon, label: 'Menu Management' },
  { path: '/admin/add-item', icon: PlusCircle, label: 'Add Item' },
  { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
  { path: '/admin/users', icon: Users, label: 'Users' },
];

export const AdminSidebar = () => {
  return (
    <aside className="w-72 h-screen fixed left-0 top-0 glass backdrop-blur-3xl border-r border-white/20 flex flex-col z-50">
      <div className="p-8 flex items-center gap-3 border-b border-primary/10 mb-6">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center border-2 border-secondary overflow-hidden shadow-xl">
           <UtensilsCrossed size={20} className="text-secondary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-primary tracking-tight">Deshi Ahar</h1>
          <p className="text-[10px] uppercase tracking-widest font-bold text-secondary">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 group",
              isActive 
                ? "bg-primary text-white shadow-xl translate-x-2" 
                : "text-slate-500 hover:bg-primary/5 hover:text-primary"
            )}
          >
            <item.icon size={20} className={cn("transition-transform group-hover:scale-110")} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-primary/10">
        <NavLink 
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          Exit to Customer UI
        </NavLink>
      </div>
    </aside>
  );
};
