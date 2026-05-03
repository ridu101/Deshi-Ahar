import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, ArrowRight, LogOut, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useApp } from '../AppContext';

export const Navbar = ({ onCartOpen }: { onCartOpen: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, login, logout, cart } = useApp();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "glass py-2" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center border-2 border-secondary shadow-lg">
            <span className="text-secondary font-bold text-xl">D</span>
          </div>
          <span className={cn("text-2xl font-bold tracking-tight", isScrolled ? "text-primary" : "text-white")}>
            Deshi Ahar
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Menu', 'About', 'Contact'].map((item) => (
            <Link 
              key={item} 
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium hover:text-secondary transition-colors",
                isScrolled ? "text-primary/80" : "text-white/80"
              )}
            >
              {item}
            </Link>
          ))}
          {user && (
            <Link 
              to="/tracking"
              className={cn(
                "text-sm font-medium hover:text-secondary transition-colors",
                isScrolled ? "text-primary/80" : "text-white/80"
              )}
            >
              Track Order
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onCartOpen}
            className={cn(
              "p-2 rounded-full relative transition-all hover:scale-110",
              isScrolled ? "bg-primary text-white" : "bg-white/20 text-white backdrop-blur-md"
            )}
          >
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className={cn("text-xs font-bold leading-none", isScrolled ? "text-primary" : "text-white")}>
                  {user.displayName?.split(' ')[0]}
                </p>
              </div>
              <button 
                onClick={logout}
                className={cn(
                  "p-2 rounded-full transition-all hover:scale-110 hover:bg-red-500 hover:text-white",
                  isScrolled ? "bg-primary/10 text-primary" : "bg-white/20 text-white backdrop-blur-md"
                )}
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={login}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105 font-bold text-sm",
                isScrolled ? "bg-primary text-white" : "bg-secondary text-primary shadow-lg"
              )}
            >
              <LogIn size={18} />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
