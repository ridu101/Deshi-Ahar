import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingCart, Search, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../data';
import { cn } from '../lib/utils';
import { useApp } from '../AppContext';
import { api } from '../services/api';

export const FoodCard: React.FC<{ item: any }> = ({ item }) => {
  const { addToCart } = useApp();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="glass overflow-hidden flex flex-col group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <Star size={14} className="fill-secondary stroke-secondary" />
          <span className="text-xs font-bold text-primary">{item.rating}</span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-secondary">{item.category}</span>
          <span className="text-sm font-bold text-primary">৳{item.price}</span>
        </div>
        <h3 className="text-lg font-bold text-primary mb-1">{item.name}</h3>
        <p className="text-xs text-slate-600 mb-4 line-clamp-2">{item.description}</p>
        
        <div className="mt-auto">
          <button 
            onClick={() => addToCart(item)}
            className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:shadow-lg active:scale-95"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const FoodGrid = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    api.getMenu().then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let result = items;

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [items, activeCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const paginatedItems = filteredAndSortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="py-20 px-6 bg-accent/50 relative overflow-hidden" id="menu">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 italic">Our Special Menu</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-8" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 bg-white/40 p-4 rounded-3xl border border-white">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
              <input 
                type="text" 
                placeholder="Search for dishes..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 bg-white border border-primary/5 rounded-2xl text-sm font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {['default', 'price-low', 'price-high', 'rating'].map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize",
                    sortBy === sort 
                      ? "bg-primary text-white" 
                      : "bg-white text-primary/60 border border-primary/5 hover:bg-primary/5"
                  )}
                >
                  {sort.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all",
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-xl scale-105" 
                    : "bg-white text-primary/60 border border-primary/10 hover:border-primary/20"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            <AnimatePresence mode="popLayout">
              {paginatedItems.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-3 bg-white rounded-2xl border border-primary/10 disabled:opacity-30 hover:bg-primary/5 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <span className="text-sm font-bold text-primary">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-3 bg-white rounded-2xl border border-primary/10 disabled:opacity-30 hover:bg-primary/5 transition-all"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
