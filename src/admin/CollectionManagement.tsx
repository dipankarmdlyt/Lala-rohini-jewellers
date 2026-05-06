import { useState, useEffect } from 'react';
import { Layers, Plus, Search, MoreVertical, Edit, Trash2, FolderOpen } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function CollectionManagement() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      const snap = await getDocs(query(collection(db, 'collections'), orderBy('priority', 'asc')));
      setCollections(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchCollections();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
          <input 
            type="text" 
            placeholder="Search collections..."
            className="bg-white border-soft pl-10 pr-4 py-2.5 rounded-xl text-sm w-64 outline-none"
          />
        </div>
        <button className="btn-gold flex items-center gap-2">
          <Plus size={18} /> Create Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="glass animate-pulse flex flex-col p-6 space-y-4">
              <div className="aspect-video bg-brand-black/5 rounded-xl w-full" />
              <div className="h-4 bg-brand-black/5 w-1/2 rounded" />
              <div className="h-4 bg-brand-black/5 w-full rounded" />
            </div>
          ))
        ) : collections.length > 0 ? collections.map((coll) => (
          <div key={coll.id} className="glass group overflow-hidden hover:border-brand-gold/30 transition-all flex flex-col">
            <div className="aspect-video relative overflow-hidden">
               <img src={coll.bannerImage || 'https://images.unsplash.com/photo-1515562141207-7a88fb0ce338?auto=format'} alt={coll.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent flex items-end p-6">
                  <h4 className="text-xl font-serif text-white">{coll.name}</h4>
               </div>
               <div className="absolute top-4 right-4 flex gap-2 translate-y-12 group-hover:translate-y-0 transition-all opacity-0 group-hover:opacity-100">
                  <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white hover:text-brand-gold transition-all"><Edit size={14} /></button>
                  <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-red-500 transition-all"><Trash2 size={14} /></button>
               </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
               <p className="text-sm text-brand-black/60 font-light mb-4 line-clamp-2">{coll.description || 'No description provided.'}</p>
               <div className="mt-auto flex justify-between items-center">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${coll.isActive ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                    {coll.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-[10px] font-bold text-brand-black/20 uppercase tracking-widest">Priority: {coll.priority}</span>
               </div>
            </div>
          </div>
        )) : (
          <div className="lg:col-span-3 text-center py-20 glass">
             <FolderOpen className="mx-auto text-brand-black/10 mb-4" size={48} />
             <p className="text-sm text-brand-black/40 italic">No collections defined yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
