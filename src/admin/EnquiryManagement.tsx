import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Calendar, 
  User, 
  MoreHorizontal, 
  ArrowRight,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Gem
} from 'lucide-react';
import { db } from '../lib/firebase';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  updateDoc 
} from 'firebase/firestore';

interface Enquiry {
  id: string;
  customerName: string;
  phone: string;
  productId?: string;
  productName?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Closed';
  createdAt: any;
}

export default function EnquiryManagement() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const fetchEnquiries = async () => {
    setLoading(true);
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    setEnquiries(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Enquiry)));
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    await updateDoc(doc(db, 'enquiries', id), { status: newStatus });
    fetchEnquiries();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'text-blue-600 bg-blue-50';
      case 'Contacted': return 'text-amber-600 bg-amber-50';
      case 'Converted': return 'text-green-600 bg-green-50';
      case 'Closed': return 'text-slate-400 bg-slate-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const filteredEnquiries = selectedStatus === 'All' 
    ? enquiries 
    : enquiries.filter(e => e.status === selectedStatus);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['All', 'New', 'Contacted', 'Converted'].map((status) => (
          <button 
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`p-6 rounded-2xl border transition-all text-left group ${
              selectedStatus === status 
                ? 'bg-brand-black text-white border-brand-black shadow-lg' 
                : 'bg-white text-brand-black border-brand-black/5 hover:border-brand-gold/30'
            }`}
          >
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-1">{status} Leads</p>
            <h4 className="text-2xl font-serif">
              {status === 'All' ? enquiries.length : enquiries.filter(e => e.status === status).length}
            </h4>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 py-2">
         <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
               <input 
                 type="text" 
                 placeholder="Search by name, phone or product..."
                 className="w-full bg-white border border-brand-black/5 pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none focus:border-brand-gold/50"
               />
            </div>
            <button className="glass p-2.5">
               <Filter size={18} className="text-brand-black/40" />
            </button>
         </div>
         <p className="text-xs text-brand-black/40 font-light">Showing {filteredEnquiries.length} results</p>
      </div>

      <div className="space-y-4">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-24 glass animate-pulse"></div>)
        ) : filteredEnquiries.length > 0 ? (
          filteredEnquiries.map((enq) => (
            <div key={enq.id} className="glass p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:border-brand-gold/30 transition-all border-l-4" style={{ borderColor: enq.status === 'New' ? '#D4AF37' : 'transparent' }}>
              <div className="flex items-center gap-4 md:w-64">
                <div className="h-12 w-12 rounded-full bg-brand-ivory flex items-center justify-center text-brand-gold shrink-0">
                  <User size={20} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-brand-black truncate">{enq.customerName}</h4>
                  <p className="text-xs text-brand-black/40 flex items-center gap-1">
                    <Phone size={10} /> {enq.phone}
                  </p>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-2 mb-1">
                    <Gem size={12} className="text-brand-gold" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60 truncate">
                       {enq.productName || 'General Enquiry'}
                    </span>
                 </div>
                 <p className="text-xs text-brand-black/60 line-clamp-2 italic font-light">
                   "{enq.message || 'I am interested in this piece...'}"
                 </p>
              </div>

              <div className="flex items-center gap-6 md:w-96 shrink-0">
                 <div className="hidden lg:block text-right flex-1">
                    <p className="text-[10px] text-brand-black/40 uppercase tracking-widest">Received On</p>
                    <p className="text-xs font-medium text-brand-black">
                      {enq.createdAt?.toDate ? enq.createdAt.toDate().toLocaleDateString() : 'Today'}
                    </p>
                 </div>

                 <div className="flex items-center gap-3">
                    <select 
                      className={`text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full outline-none cursor-pointer border-none ${getStatusColor(enq.status)}`}
                      value={enq.status}
                      onChange={(e) => updateStatus(enq.id, e.target.value)}
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Converted</option>
                      <option>Closed</option>
                    </select>

                    <a 
                      href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-[#25D366] text-white rounded-xl hover:scale-110 transition-transform shadow-lg shadow-green-500/20"
                      title="Reply on WhatsApp"
                    >
                      <MessageSquare size={18} fill="white" />
                    </a>
                 </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 glass">
             <MessageSquare className="mx-auto text-brand-black/10 mb-4" size={48} />
             <p className="text-sm text-brand-black/40 italic">No enquiries match the current filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
