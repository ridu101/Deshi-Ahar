import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../AppContext';
import { useNavigate } from 'react-router-dom';

export const CartSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, user, login, placeOrder } = useApp();
  const [isPlacing, setIsPlacing] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      setIsPlacing(true);
      await placeOrder();
      onClose();
      navigate('/tracking');
    } catch (err) {
      alert('Order failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md glass backdrop-blur-xl z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg text-white">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="text-xl font-bold text-primary italic">Your Feast</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="text-slate-400 font-bold italic">Your cart is as empty as a <br />plate after a wedding feast.</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 text-primary font-bold hover:underline"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-white/50 border border-white/50 group shadow-sm">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-primary text-sm">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-secondary">৳{item.price}</span>
                        <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-full border border-primary/10">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-primary hover:text-secondary p-1"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-primary hover:text-secondary p-1"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-white/30 backdrop-blur-md border-t border-white/20">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold">৳{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Vat (5%)</span>
                  <span className="font-bold">৳{Math.round(cartTotal * 0.05)}</span>
                </div>
                <div className="flex justify-between text-lg text-primary pt-2 border-t border-primary/10">
                  <span className="font-bold">Total</span>
                  <span className="font-extrabold">৳{Math.round(cartTotal * 1.05)}</span>
                </div>
              </div>

              {user ? (
                <button 
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0 || isPlacing}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:shadow-xl group hover:scale-[1.02] active:scale-95 shadow-lg disabled:opacity-50 disabled:scale-100"
                >
                  {isPlacing ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <>
                      Confirm Order
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              ) : (
                <button 
                  onClick={login}
                  className="w-full py-4 bg-secondary text-primary rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/90 transition-all hover:shadow-xl shadow-lg active:scale-95"
                >
                  Login to Order
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

