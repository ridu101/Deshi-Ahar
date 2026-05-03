import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Star,
  Check,
  RotateCcw,
  Loader2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { CATEGORIES } from '../../data';
import { cn } from '../../lib/utils';
import { useApp } from '../../AppContext';
import { api } from '../../services/api';

export const DashboardOverview = () => {
  const [report, setReport] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.getSalesReport().then(setReport);
    api.getOrders().then(data => setOrders(data.slice(0, 5)));
  }, []);

  const stats = [
    { label: 'Total Revenue', value: `৳${report?.sales?.reduce((acc: number, s: any) => acc + (s._sum.total || 0), 0).toLocaleString() || 0}`, icon: DollarSign, trend: '+12%', color: 'from-emerald-500 to-teal-600' },
    { label: 'Total Orders', value: report?.sales?.reduce((acc: number, s: any) => acc + s._count.id, 0) || 0, icon: ShoppingBag, trend: '+8%', color: 'from-amber-500 to-orange-600' },
    { label: 'Recent Orders', value: orders.length, icon: Users, trend: '+24%', color: 'from-blue-500 to-indigo-600' },
    { label: 'Delivered', value: report?.sales?.find((s: any) => s.status === 'Delivered')?._count.id || 0, icon: TrendingUp, trend: '+0.2', color: 'from-rose-500 to-pink-600' },
  ];

  const chartData = report?.dailyRev?.map((r: any) => ({
    name: new Date(r.createdAt).toLocaleDateString('en-US', { weekday: 'short' }),
    sales: r.total
  })) || [];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-dark p-6 rounded-[2rem] border border-white/10 group hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-4 rounded-2xl bg-gradient-to-br shadow-lg", stat.color)}>
                <stat.icon className="text-white" size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-extrabold text-white mt-1 tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-[2.5rem] border border-white/20">
          <h3 className="text-xl font-bold text-primary mb-6 italic">Recent Sales Revenue</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a4d2e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1a4d2e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#1a4d2e" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border border-white/20">
          <h3 className="text-xl font-bold text-primary mb-6 italic">Recent Orders</h3>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-white/40 rounded-2xl border border-white/60 hover:bg-white/60 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold">
                    {order.customerName[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm">{order.customerName}</h4>
                    <p className="text-[10px] text-slate-500 font-bold">{order.id} • {new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-primary">৳{order.total}</p>
                  <span className={cn(
                    "text-[8px] uppercase tracking-widest font-black px-2 py-0.5 rounded-full",
                    order.status === 'Delivered' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                  )}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrdersPage = ({ title, filter }: { title: string, filter?: string }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    api.getOrders().then(data => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const displayOrders = filter 
    ? orders.filter(o => o.status === filter)
    : orders;

  const updateStatus = async (orderId: string, newStatus: string) => {
    await api.updateOrderStatus(orderId, newStatus);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    setActiveMenu(null);
  };

  if (loading) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="glass p-8 rounded-[2.5rem] border border-white/20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-primary italic">{title}</h2>
      </div>
      
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-primary/5">
              <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
              <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
              <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Items</th>
              <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Total</th>
              <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            {displayOrders.map((order) => (
              <tr key={order.id} className="group hover:bg-primary/5 transition-colors">
                <td className="py-4 font-bold text-primary text-sm">{order.id}</td>
                <td className="py-4">
                  <div className="text-sm font-bold text-slate-700">{order.customerName}</div>
                  <div className="text-[10px] text-slate-400 font-bold">{order.customerEmail}</div>
                </td>
                <td className="py-4 text-sm font-medium text-slate-600">
                  {order.items.map((i: any) => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                </td>
                <td className="py-4">
                  <span className={cn(
                    "text-[9px] uppercase tracking-widest font-black px-3 py-1 rounded-full",
                    order.status === 'Delivered' ? "bg-emerald-100 text-emerald-600" : 
                    order.status === 'Preparing' ? "bg-amber-100 text-amber-600" :
                    order.status === 'Out for Delivery' ? "bg-blue-100 text-blue-600" :
                    "bg-slate-100 text-slate-600"
                  )}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 font-black text-primary">৳{order.total}</td>
                <td className="py-4 relative">
                  <button 
                    onClick={() => setActiveMenu(activeMenu === order.id ? null : order.id)}
                    className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                  >
                    <MoreVertical size={16} />
                  </button>
                  {activeMenu === order.id && (
                    <div className="absolute right-0 top-full mt-1 w-48 glass backdrop-blur-xl border border-primary/10 p-2 rounded-2xl shadow-2xl z-50">
                      <p className="text-[10px] uppercase font-bold text-slate-400 px-3 py-2">Update Status</p>
                      {['Pending', 'Preparing', 'Out for Delivery', 'Delivered'].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(order.id, status)}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors flex items-center justify-between"
                        >
                          {status}
                          {order.status === status && <Check size={14} className="text-emerald-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const MenuManagement = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = () => {
    api.getMenu().then(data => {
      setItems(data);
      setLoading(false);
    });
  };

  useEffect(() => fetchMenu(), []);

  const deleteItem = async (id: string) => {
    if (confirm('Are you sure you want to remove this dish?')) {
      await api.deleteMenuItem(id);
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  if (loading) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="glass p-8 rounded-[2.5rem] border border-white/20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-primary italic">Menu Management</h2>
        <button className="px-6 py-3 bg-secondary text-primary rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-secondary/90 transition-all hover:shadow-xl shadow-lg">
          <Plus size={18} /> Add New Dish
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 bg-white/40 rounded-3xl border border-white/60 hover:bg-white/60 transition-all group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-primary leading-tight text-sm">{item.name}</h4>
                  <p className="text-[10px] uppercase font-bold text-secondary tracking-widest">{item.category}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="p-1.5 bg-white rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-black text-primary">৳{item.price}</span>
                <div className="flex items-center gap-1">
                  <Star size={12} className="fill-secondary stroke-secondary" />
                  <span className="text-xs font-bold text-slate-600">{item.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AddItemPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Biryani',
    description: '',
    image: 'https://images.unsplash.com/photo-1589302188045-391db6ffb8c4?w=500&q=80'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.addMenuItem({ ...formData, price: Number(formData.price) });
      alert('Dish added successfully!');
      setFormData({ name: '', price: '', category: 'Biryani', description: '', image: formData.image });
    } catch (err) {
      alert('Failed to add dish');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto glass p-10 rounded-[2.5rem] border border-white/20">
      <h2 className="text-2xl font-bold text-primary italic mb-8 text-center">Create New Culinary Masterpiece</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 md:col-span-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">Dish Name</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-white/50 border border-primary/10 rounded-2xl px-6 py-4 text-primary font-bold focus:ring-2 ring-primary/20 outline-none transition-all" placeholder="e.g. Imperial Beef Rezala" 
          />
        </div>
        
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">Price (৳)</label>
          <input 
            type="number" 
            required
            value={formData.price}
            onChange={e => setFormData({...formData, price: e.target.value})}
            className="w-full bg-white/50 border border-primary/10 rounded-2xl px-6 py-4 text-primary font-bold focus:ring-2 ring-primary/20 outline-none transition-all" placeholder="00.00" 
          />
        </div>
        
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">Category</label>
          <select 
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
            className="w-full bg-white/50 border border-primary/10 rounded-2xl px-6 py-4 text-primary font-bold focus:ring-2 ring-primary/20 outline-none transition-all appearance-none"
          >
             {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        
        <div className="space-y-4 md:col-span-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">Description</label>
          <textarea 
            rows={4} 
            required
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full bg-white/50 border border-primary/10 rounded-2xl px-6 py-4 text-primary font-bold focus:ring-2 ring-primary/20 outline-none transition-all resize-none" placeholder="Tell us about the ingredients and flavors..."
          ></textarea>
        </div>
        
        <div className="md:col-span-2 mt-4">
          <button 
            disabled={loading}
            className="w-full py-5 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all hover:shadow-xl shadow-lg hover:scale-[1.01] active:scale-95 flex items-center justify-center"
          >
             {loading ? <Loader2 className="animate-spin" /> : 'Add to Menu'}
          </button>
        </div>
      </form>
    </div>
  );
};

export const ReportsPage = () => {
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    api.getSalesReport().then(setReport);
  }, []);

  const chartData = report?.dailyRev?.map((r: any) => ({
    name: new Date(r.createdAt).toLocaleDateString('en-US', { weekday: 'short' }),
    sales: r.total
  })) || [];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-primary italic">Revenue Analytics</h3>
            <div className="flex gap-1 p-1 bg-primary/5 rounded-xl">
               <button className="px-4 py-2 bg-white text-primary rounded-lg text-xs font-bold shadow-sm">Sales</button>
            </div>
          </div>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '16px', border: 'none' }} />
                <Bar dataKey="sales" fill="#1a4d2e" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="glass-gold p-8 rounded-[2.5rem] border border-secondary/20">
            <h4 className="text-secondary font-black uppercase tracking-widest text-[10px] mb-2">Overall Performance</h4>
            <div className="text-4xl font-black text-primary mb-4 leading-tight">Growth <br /> +12.4%</div>
            <p className="text-xs font-medium text-primary/70 leading-relaxed">Your restaurant is seeing steady growth in orders and revenue this week.</p>
          </div>
          
          <div className="glass p-8 rounded-[2.5rem] border border-white/20">
            <h3 className="text-lg font-bold text-primary italic mb-6">Popular Status</h3>
            <div className="space-y-6">
              {report?.sales?.map((item: any, id: number) => (
                <div key={id} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>{item.status}</span>
                    <span>{item._count.id} Orders</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
