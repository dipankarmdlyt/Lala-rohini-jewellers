import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  MessageSquare, 
  Heart, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  Search
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
import { db } from '../lib/firebase';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';

const data = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 30 },
  { name: 'Wed', value: 65 },
  { name: 'Thu', value: 45 },
  { name: 'Fri', value: 90 },
  { name: 'Sat', value: 70 },
  { name: 'Sun', value: 85 },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    enquiries: 0,
    wishlist: 0,
    activeCollections: 0
  });

  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStats() {
      // Mock stats for now if DB is empty
      const prodSnap = await getDocs(collection(db, 'products'));
      const enqSnap = await getDocs(collection(db, 'enquiries'));
      const collSnap = await getDocs(collection(db, 'collections'));
      
      setStats({
        products: prodSnap.size || 124,
        enquiries: enqSnap.size || 48,
        wishlist: 1205, // Mocked as it's harder to count without subcollections/aggregation doc
        activeCollections: collSnap.size || 8
      });

      const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'), limit(5));
      const recentSnap = await getDocs(q);
      setRecentEnquiries(recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchStats();
  }, []);

  const kpis = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'blue', change: '+12%' },
    { label: 'Active Enquiries', value: stats.enquiries, icon: MessageSquare, color: 'gold', change: '+24%' },
    { label: 'Wishlist Intent', value: stats.wishlist, icon: Heart, color: 'pink', change: '+8%' },
    { label: 'Collections', value: stats.activeCollections, icon: Sparkles, color: 'purple', change: '0%' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="glass p-6 group hover:border-brand-gold/40 transition-all cursor-default">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors`}>
                <kpi.icon className="text-brand-gold" size={24} />
              </div>
              <span className={`flex items-center text-[10px] font-bold px-2 py-1 rounded-full ${
                kpi.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {kpi.change.startsWith('+') ? <ArrowUpRight size={10} className="mr-1" /> : <ArrowDownRight size={10} className="mr-1" />}
                {kpi.change}
              </span>
            </div>
            <p className="text-sm font-light text-brand-black/40 mb-1">{kpi.label}</p>
            <h3 className="text-3xl font-serif text-brand-black">{kpi.value.toLocaleString()}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-serif text-brand-black">Conversion Signal</h3>
              <p className="text-xs text-brand-black/40 font-light">Daily enquiry traffic vs wishlist activity</p>
            </div>
            <select className="bg-brand-ivory border-none text-xs rounded-lg px-4 py-2 text-brand-black outline-none cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#666' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#D4AF37" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Mini-Dash */}
        <div className="space-y-8">
          <div className="glass p-6 bg-brand-black text-white overflow-hidden relative">
            <Sparkles className="absolute -right-4 -top-4 text-brand-gold/10 w-24 h-24 rotate-12" />
            <h3 className="text-xl font-serif mb-4 relative z-10">Sales Intelligence</h3>
            <p className="text-xs text-white/60 font-light mb-6 relative z-10">
              Your Bridal sets are trending at 40% higher enquiry rates this week. Consider boosting "Traditional Bridal" collection.
            </p>
            <button className="btn-gold w-full flex items-center justify-center gap-2 relative z-10">
              Optimize Bridal <TrendingUp size={14} />
            </button>
          </div>

          <div className="glass p-6">
            <h3 className="text-lg font-serif mb-6 flex items-center gap-2">
              Recent Leads <span className="bg-red-500 h-2 w-2 rounded-full animate-pulse"></span>
            </h3>
            <div className="space-y-4">
              {recentEnquiries.length > 0 ? recentEnquiries.map((enq) => (
                <div key={enq.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-black/5 transition-colors cursor-pointer border border-transparent hover:border-brand-black/5">
                  <div className="h-10 w-10 bg-brand-ivory rounded-full flex items-center justify-center text-brand-gold font-bold text-xs uppercase">
                    {enq.customerName?.charAt(0) || 'C'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-black truncate">{enq.customerName}</p>
                    <p className="text-[10px] text-brand-black/40 truncate">{enq.productName || 'General Enquiry'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-tighter">{enq.status}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                   <p className="text-xs text-brand-black/40 font-light italic">No recent enquiries found.</p>
                </div>
              )}
              <Link to="/admin/enquiries" className="block text-center text-[10px] uppercase tracking-widest font-bold text-brand-black/40 hover:text-brand-gold transition-colors pt-4 border-t border-brand-black/5">
                View All Enquiries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link({ children, to, className }: any) {
    return <a href={to} className={className}>{children}</a>;
}
