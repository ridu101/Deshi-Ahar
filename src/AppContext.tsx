import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, googleProvider } from './services/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { FoodItem } from './data';
import { api } from './services/api';

interface CartItem extends FoodItem {
  quantity: number;
}

interface AppContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  cart: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  placeOrder: () => Promise<any>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('deshi_ahar_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAdmin(u?.email === 'ridu116540@gmail.com');
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    localStorage.setItem('deshi_ahar_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === itemId) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const login = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const placeOrder = async () => {
    if (!user) throw new Error('Must be logged in to order');
    const orderData = {
      customerName: user.displayName || 'Guest',
      customerEmail: user.email,
      total: Math.round(cartTotal * 1.05),
      items: cart
    };
    const order = await api.createOrder(orderData);
    clearCart();
    return order;
  };

  return (
    <AppContext.Provider value={{
      user,
      isAdmin,
      loading,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      login,
      logout,
      placeOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
