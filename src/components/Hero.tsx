import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-black/40 to-black/80 z-10" />
      </div>
      
      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-secondary text-xs uppercase tracking-widest font-bold mb-6"
        >
          <Star size={14} className="fill-secondary" />
          Authentic Bengali Cuisine
          <Star size={14} className="fill-secondary" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Taste the Pure <br />
          <span className="text-secondary italic">Bengali Tradition</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-white/70 max-w-2xl mx-auto mb-10"
        >
          Experience the richness of Bangladeshi spices and flavors. We bring the heritage of Desi food right to your table with a premium touch.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="px-8 py-4 bg-secondary text-primary font-bold rounded-full flex items-center gap-2 hover:bg-secondary/90 transition-all hover:scale-105 shadow-xl group">
            Explore Menu
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-full hover:bg-white/20 transition-all">
            Our Story
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
        <span className="text-white/50 text-xs uppercase tracking-widest mb-2 font-bold">Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-secondary to-transparent" />
      </div>
    </section>
  );
};
