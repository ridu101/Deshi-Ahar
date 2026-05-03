import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FoodGrid } from './components/FoodGrid';
import { CartSidebar } from './components/CartSidebar';
import { OrderTracking } from './components/OrderTracking';
import { AdminLayout } from './components/admin/AdminLayout';
import { 
  DashboardOverview, 
  OrdersPage, 
  MenuManagement, 
  AddItemPage, 
  ReportsPage 
} from './components/admin/DashboardPages';

const AuthGuard = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { user, isAdmin, loading } = useApp();
  
  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-primary">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary border-t-transparent"></div>
    </div>
  );

  if (!user) return <Navigate to="/" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;

  return <>{children}</>;
};

const RedirectAdmin = () => {
  const { user, isAdmin, loading } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, loading, navigate]);

  return null;
};

const CustomerUI = ({ onCartOpen }: { onCartOpen: () => void }) => (
  <main className="relative">
    <RedirectAdmin />
    <Hero />
    <FoodGrid />
    <footer className="bg-primary/95 backdrop-blur-xl text-white pt-20 pb-10 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-secondary shadow-lg">
              <span className="text-primary font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Deshi Ahar</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            The heart of Bengali flavors. We serve traditional dishes with a touch of elegance and premium taste since 2024.
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6 text-secondary italic">Quick Links</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="hover:text-secondary transition-colors cursor-pointer">Our Story</li>
            <li className="hover:text-secondary transition-colors cursor-pointer">Menu List</li>
            <li className="hover:text-secondary transition-colors cursor-pointer">Special Offers</li>
            <li className="hover:text-secondary transition-colors cursor-pointer">Order Tracking</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6 text-secondary italic">Contact Us</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li>info@deshiahar.com</li>
            <li>+880 1700 000000</li>
            <li>Banani, Dhaka, Bangladesh</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6 text-secondary italic">Newsletter</h4>
          <p className="text-sm text-white/60 mb-4">Get the latest updates and offers.</p>
          <div className="flex gap-2">
            <input type="text" placeholder="Email Address" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 ring-secondary/50" />
            <button className="bg-secondary text-primary font-bold px-4 rounded-xl text-sm">Join</button>
          </div>
        </div>
      </div>
      <div className="text-center pt-8 border-t border-white/5 text-[10px] uppercase font-bold text-white/40 tracking-[0.2em]">
        © 2026 Deshi Ahar - All Rights Reserved
      </div>
    </footer>
  </main>
);

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar onCartOpen={() => setIsCartOpen(true)} />
          <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<CustomerUI onCartOpen={() => setIsCartOpen(true)} />} />
            <Route path="/tracking" element={<OrderTracking />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <AuthGuard adminOnly>
                <AdminLayout />
              </AuthGuard>
            }>
              <Route index element={<DashboardOverview />} />
              <Route path="orders" element={<OrdersPage title="All Orders" />} />
              <Route path="ongoing" element={<OrdersPage title="Ongoing Orders" filter="Preparing" />} />
              <Route path="completed" element={<OrdersPage title="Completed Orders" filter="Delivered" />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="add-item" element={<AddItemPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="users" element={<div className="glass p-10 font-bold text-primary italic text-2xl text-center rounded-[2.5rem]">User Management Feature Coming Soon</div>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
