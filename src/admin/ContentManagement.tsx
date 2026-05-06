import { useState } from 'react';
import { ImageIcon, Plus, Edit, Trash2, Eye, Layout, Monitor, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<'banners' | 'sections' | 'promotions'>('banners');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Tab Header */}
      <div className="flex gap-1 bg-white p-1.5 rounded-2xl border border-brand-black/5 w-fit">
        {[
          { id: 'banners', label: 'Banners', icon: ImageIcon },
          { id: 'sections', label: 'Section Visibility', icon: Layout },
          { id: 'promotions', label: 'Promotions', icon: Sparkles },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === tab.id 
                ? 'bg-brand-black text-white shadow-lg' 
                : 'text-brand-black/40 hover:text-brand-black/60 hover:bg-brand-ivory'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {activeTab === 'banners' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hero Banner Management */}
            <div className="glass p-8 space-y-6">
              <div className="flex justify-between items-center">
                 <h4 className="text-xl font-serif">Hero Slider Banners</h4>
                 <button className="p-2 bg-brand-gold text-white rounded-lg hover:scale-110 transition-transform"><Plus size={18} /></button>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'The Bridal Legacy', img: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format' },
                  { title: 'Timeless Elegance', img: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format' }
                ].map((banner, idx) => (
                  <div key={idx} className="group relative aspect-video rounded-3xl overflow-hidden border border-brand-black/5">
                    <img src={banner.img} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent flex items-end p-6">
                       <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-brand-gold mb-1">Banner #{idx+1}</p>
                          <h5 className="text-white font-serif">{banner.title}</h5>
                       </div>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                       <button className="p-2 bg-white rounded-xl text-brand-black hover:text-brand-gold transition-colors shadow-xl"><Edit size={16} /></button>
                       <button className="p-2 bg-red-500 rounded-xl text-white hover:bg-red-600 transition-colors shadow-xl"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Previews */}
            <div className="space-y-8">
              <div className="glass p-8 space-y-6">
                 <h4 className="text-xl font-serif">Bridal Campaign Overlay</h4>
                 <div className="p-6 rounded-3xl bg-brand-ivory border border-brand-black/5 space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-xs text-brand-black/60 font-medium">Auto-activation (Wedding Season)</span>
                       <div className="w-10 h-5 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div></div>
                    </div>
                    <div className="pt-4 border-t border-brand-black/5">
                       <p className="text-[10px] uppercase font-bold text-brand-black/40 mb-3 tracking-widest">Active Schedule</p>
                       <div className="flex items-center gap-2 text-xs text-brand-black">
                          <CheckCircle2 size={14} className="text-green-500" /> Oct 1st - Dec 31st
                       </div>
                    </div>
                 </div>
              </div>

              <div className="glass p-8">
                 <h4 className="text-xl font-serif mb-6">Device Previews</h4>
                 <div className="flex gap-4">
                    <button className="flex-1 p-4 rounded-2xl bg-brand-black text-white flex flex-col items-center gap-2">
                       <Monitor size={20} />
                       <span className="text-[10px] uppercase font-bold tracking-widest">Desktop</span>
                    </button>
                    <button className="flex-1 p-4 rounded-2xl bg-brand-ivory text-brand-black/40 hover:text-brand-black transition-colors flex flex-col items-center gap-2">
                       <Smartphone size={20} />
                       <span className="text-[10px] uppercase font-bold tracking-widest">Mobile</span>
                    </button>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sections' && (
          <div className="glass p-8">
             <h4 className="text-xl font-serif mb-8">Home Section Visibility</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'Trust strip', 'Category Grid', 'Bridal Featured', 'Trending Now', 'Testimonials', 'FAQ Section'
                ].map((s) => (
                  <div key={s} className="flex items-center justify-between p-4 rounded-2xl bg-brand-ivory/50 border border-brand-black/5 hover:bg-white transition-colors">
                     <span className="text-sm font-medium text-brand-black">{s}</span>
                     <div className="w-10 h-5 bg-brand-gold rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div></div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
