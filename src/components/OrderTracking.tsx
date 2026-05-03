import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Package, ChefHat, Truck, CheckCircle, ArrowLeft, MapPin, Phone, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useApp } from '../AppContext';
import { api } from '../services/api';

const steps = [
  { label: 'Order Placed', icon: Package, value: 'Pending' },
  { label: 'Preparing', icon: ChefHat, value: 'Preparing' },
  { label: 'Out for Delivery', icon: Truck, value: 'Out for Delivery' },
  { label: 'Delivered', icon: CheckCircle, value: 'Delivered' },
];

export const OrderTracking = () => {
  const { user } = useApp();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchLatestOrder = async () => {
    try {
      const orders = await api.getOrders();
      if (orders.length > 0) {
        setOrder(orders[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLatestOrder();
      const interval = setInterval(fetchLatestOrder, 15000); // Poll every 15s
      return () => clearInterval(interval);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center glass p-10 rounded-[2.5rem]">
          <h2 className="text-2xl font-bold text-primary mb-4 italic">Login Required</h2>
          <p className="text-slate-500 mb-6">Please login to track your active orders.</p>
          <Link to="/" className="px-8 py-3 bg-primary text-white rounded-2xl font-bold">Return Home</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-6 text-center">
        <div className="glass p-12 rounded-[2.5rem]">
          <Package size={64} className="mx-auto text-slate-200 mb-6" />
          <h2 className="text-2xl font-bold text-primary mb-2 italic">No Active Orders</h2>
          <p className="text-slate-500 mb-8">You don't have any active orders right now.</p>
          <Link to="/" className="inline-block px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl transition-all">Start Ordering</Link>
        </div>
      </div>
    );
  }

  const currentStep = steps.findIndex(s => s.value === order.status);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-accent/30">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary/60 hover:text-primary mb-8 font-bold transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Menu
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-12 rounded-[3rem] relative shadow-2xl border border-white/20"
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div>
              <h1 className="text-3xl font-black text-primary mb-2 italic tracking-tight">Tracking Your Feast</h1>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Order ID: <span className="text-secondary">#{order.id}</span></p>
            </div>
            <div className="px-6 py-4 bg-white/60 rounded-3xl border border-white shadow-xl">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Estimated Arrival</span>
              <span className="text-2xl font-black text-primary">25 - 30 Mins</span>
            </div>
          </div>

          <div className="relative mb-24 lg:px-10">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${(currentStep / 3) * 100}%` }}
                 className="h-full bg-secondary shadow-[0_0_15px_rgba(249,181,42,0.5)]"
               />
            </div>
            
            <div className="relative flex justify-between">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const status = idx < currentStep ? 'completed' : idx === currentStep ? 'current' : 'upcoming';
                
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <motion.div 
                      className={cn(
                        "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 shadow-xl border-4",
                        status === 'completed' ? "bg-primary text-white border-white scale-110" :
                        status === 'current' ? "bg-secondary text-white border-white scale-125 ring-[12px] ring-secondary/20" :
                        "bg-white text-slate-300 border-slate-50"
                      )}
                    >
                      <Icon size={idx === currentStep ? 28 : 24} />
                    </motion.div>
                    <div className="absolute -bottom-12 w-24 text-center">
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        status === 'completed' ? "text-primary" :
                        status === 'current' ? "text-secondary" :
                        "text-slate-400"
                      )}>
                        {step.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="p-8 rounded-[2.5rem] bg-white/40 border border-white/60 shadow-inner">
              <h3 className="text-sm font-black text-primary mb-6 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={18} className="text-secondary" /> Delivery Information
              </h3>
              <div className="text-slate-600 space-y-1 font-bold text-sm">
                <p className="text-primary font-black text-lg mb-2 italic">Home Office</p>
                <p>House 42, Road 15, Sector 7</p>
                <p>Uttara, Dhaka-1230</p>
                <div className="pt-6 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Phone size={18} />
                   </div>
                   <span className="text-primary font-black">+880 1712 345678</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-primary text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <h3 className="text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2 opacity-80">
                <Truck size={18} className="text-secondary" /> Rider Details
              </h3>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Rider" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xl italic">Rakibul Amin</h4>
                  <p className="text-[10px] uppercase font-bold text-secondary tracking-widest mt-1">Deshi Express Elite</p>
                </div>
              </div>
              <button className="mt-8 w-full py-4 bg-white text-primary rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-secondary hover:text-white transition-all shadow-xl active:scale-95">
                 Call Rider
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
