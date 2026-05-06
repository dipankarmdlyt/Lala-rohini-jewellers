import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Crown, 
  Heart, 
  Image as ImageIcon, 
  Plus, 
  CheckCircle2,
  Settings,
  TrendingUp,
  Layout
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

export default function BridalControlCenter() {
  const [bridalProducts, setBridalProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCampaignActive, setIsCampaignActive] = useState(true);

  const fetchBridal = async () => {
    setLoading(true);
    const q = query(collection(db, 'products'), where('isBridal', '==', true));
    const snap = await getDocs(q);
    setBridalProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchBridal();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Campaign Toggle Banner */}
      <div className={`p-8 rounded-3xl border-2 transition-all overflow-hidden relative ${
        isCampaignActive ? 'border-brand-gold bg-brand-gold/5 shadow-luxury' : 'border-slate-200 bg-white'
      }`}>
        <Sparkles className={`absolute -right-8 -top-8 w-40 h-40 opacity-10 ${isCampaignActive ? 'text-brand-gold' : 'text-slate-200'}`} />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Crown className={isCampaignActive ? 'text-brand-gold' : 'text-slate-400'} size={20} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Campaign Status</span>
            </div>
            <h3 className="text-3xl font-serif text-brand-black mb-2">Bridal Season 2024</h3>
            <p className="text-sm text-brand-black/60 font-light max-w-lg">
              When active, bridal collections are prioritized in the main navbar, hero section, and search results.
            </p>
          </div>
          <button 
            onClick={() => setIsCampaignActive(!isCampaignActive)}
            className={`px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-all ${
              isCampaignActive ? 'bg-brand-gold text-white shadow-xl shadow-brand-gold/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {isCampaignActive ? 'Campaign Active' : 'Activate Campaign'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bridal Metrics */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8">
            <h4 className="text-lg font-serif mb-6 flex items-center gap-2">
              Featured Bridal Sets <span className="text-[10px] uppercase font-bold tracking-widest text-brand-black/40 bg-brand-ivory px-2 py-1 rounded">Top 5</span>
            </h4>
            <div className="space-y-4">
              {loading ? (
                 [1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-xl"></div>)
              ) : bridalProducts.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl border border-brand-black/5 hover:border-brand-gold/30 transition-all group p-2">
                  <img src={p.images?.[0] || 'https://via.placeholder.com/60'} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-black truncate">{p.name}</p>
                    <p className="text-[10px] text-brand-black/40">{p.category} • ₹{p.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                       <p className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Popular</p>
                       <p className="text-xs text-brand-black/40 flex items-center gap-1 justify-end"><Heart size={10} /> {Math.floor(Math.random() * 100)}</p>
                    </div>
                    <button className="p-2 text-brand-black/20 hover:text-brand-gold transition-colors opacity-0 group-hover:opacity-100">
                       <Settings size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <button className="w-full py-4 border border-dashed border-brand-black/10 rounded-2xl text-[10px] uppercase tracking-widest font-bold text-brand-black/40 hover:text-brand-gold hover:border-brand-gold/40 transition-all flex items-center justify-center gap-2">
                 <Plus size={16} /> Add to Featured Bridal
              </button>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-8">
          <div className="glass p-8 space-y-6">
            <h4 className="text-lg font-serif mb-4 flex items-center gap-2">
              Page Config <Layout size={18} className="text-brand-gold" />
            </h4>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-brand-ivory/50 space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Campaign Banner URL</label>
                <input 
                  type="text" 
                  className="w-full bg-white border border-brand-black/5 rounded-lg px-3 py-2 text-xs outline-none focus:border-brand-gold/50"
                  defaultValue="https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format"
                />
              </div>

              <div className="p-4 rounded-xl bg-brand-ivory/50 space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Segment Boosts</label>
                <div className="space-y-2">
                   {['Traditional', 'Lightweight', 'Premium'].map(s => (
                     <label key={s} className="flex items-center justify-between p-2 hover:bg-white rounded-lg cursor-pointer transition-colors">
                        <span className="text-xs text-brand-black/60">{s} Bridal</span>
                        <div className="w-8 h-4 bg-brand-gold rounded-full relative">
                           <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                        </div>
                     </label>
                   ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-ivory/50 space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Bridal Package Discount (%)</label>
                <input 
                  type="number" 
                  className="w-full bg-white border border-brand-black/5 rounded-lg px-3 py-2 text-xs outline-none focus:border-brand-gold/50"
                  defaultValue={5}
                />
                <p className="text-[9px] text-brand-black/40">Applied during checkout consultation enquiries.</p>
              </div>

              <button className="btn-gold w-full py-4 text-xs">Save Configuration</button>
            </div>
          </div>

          <div className="glass p-8 bg-brand-gold/10 overflow-hidden relative">
             <TrendingUp className="absolute -right-4 -bottom-4 w-20 h-20 opacity-10 text-brand-gold" />
             <h4 className="text-sm font-serif mb-2 relative z-10">Demand Signal</h4>
             <p className="text-[11px] text-brand-black/60 font-light relative z-10">
               Wishlist activity for Bridal sets is up 85% this weekend. 
               We recommend updating the hero banner to a high-contrast bridal shot.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
