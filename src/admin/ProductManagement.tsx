import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Package,
  CheckCircle2,
  AlertCircle,
  X,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { db } from '../lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  collection: string;
  price: number;
  metalType: string;
  purity: string;
  weight: number;
  stockStatus: 'In Stock' | 'Out of Stock' | 'Made to Order';
  images: string[];
  isTrending: boolean;
  isFeatured: boolean;
  isBridal: boolean;
  createdAt: any;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    category: 'Rings',
    collection: 'Bridal',
    price: 0,
    metalType: 'Gold',
    purity: '22K',
    weight: 0,
    stockStatus: 'In Stock',
    images: [''],
    isTrending: false,
    isFeatured: false,
    isBridal: false
  });

  const fetchProducts = async () => {
    setLoading(true);
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const prods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    setProducts(prods);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenDrawer = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        category: 'Rings',
        collection: 'Bridal',
        price: 0,
        metalType: 'Gold',
        purity: '22K',
        weight: 0,
        stockStatus: 'In Stock',
        images: [''],
        isTrending: false,
        isFeatured: false,
        isBridal: false
      });
    }
    setIsDrawerOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const docRef = doc(db, 'products', editingProduct.id);
        await updateDoc(docRef, {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'products'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setIsDrawerOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
            <input 
              type="text" 
              placeholder="Search products..."
              className="bg-white border-soft pl-10 pr-4 py-2.5 rounded-xl text-sm w-64 outline-none focus:border-brand-gold/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="glass p-2.5 hover:bg-brand-black/5 transition-all">
            <Filter size={18} className="text-brand-black/40" />
          </button>
        </div>
        <button 
          onClick={() => handleOpenDrawer()}
          className="btn-gold flex items-center gap-2"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      <div className="glass overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-ivory border-b border-brand-black/5">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Product</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Category</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Price</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Stock</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Status</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-black/5">
            {loading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-8"><div className="h-10 bg-brand-black/5 rounded w-48"></div></td>
                  <td className="px-6 py-8"><div className="h-4 bg-brand-black/5 rounded w-24"></div></td>
                  <td className="px-6 py-8"><div className="h-4 bg-brand-black/5 rounded w-16"></div></td>
                  <td className="px-6 py-8"><div className="h-4 bg-brand-black/5 rounded w-12"></div></td>
                  <td className="px-6 py-8"><div className="h-4 bg-brand-black/5 rounded w-20"></div></td>
                  <td className="px-6 py-8"></td>
                </tr>
              ))
            ) : filteredProducts.length > 0 ? filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-brand-black/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={p.images?.[0] || 'https://via.placeholder.com/40'} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-medium text-brand-black">{p.name}</p>
                      <p className="text-[10px] text-brand-black/40 uppercase tracking-tight">{p.collection} Collection</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-brand-black/60 bg-brand-ivory px-3 py-1 rounded-full">{p.category}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-brand-black">₹{p.price.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-brand-black/60">{p.weight}g</p>
                </td>
                <td className="px-6 py-4">
                   {p.stockStatus === 'In Stock' ? (
                     <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">
                       <CheckCircle2 size={12} /> {p.stockStatus}
                     </span>
                   ) : (
                     <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
                       <AlertCircle size={12} /> {p.stockStatus}
                     </span>
                   )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleOpenDrawer(p)}
                      className="p-2 hover:bg-brand-gold/10 text-brand-black/40 hover:text-brand-gold transition-all rounded-lg"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="p-2 hover:bg-red-50 text-brand-black/40 hover:text-red-600 transition-all rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <Package className="text-brand-black/10" size={48} />
                    <p className="text-sm font-light text-brand-black/40 italic">No products found in the catalog.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Quick Edit Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-brand-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-brand-black/5 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-2xl font-serif text-brand-black">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <p className="text-xs font-light text-brand-black/40">Specify details for the luxury jewellery piece.</p>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-brand-ivory rounded-full transition-colors"
                >
                  <X />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Visual Image Manager */}
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Product Images</label>
                  <div className="grid grid-cols-4 gap-4">
                    {formData.images?.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl bg-brand-ivory p-2 group overflow-hidden border border-dashed border-brand-black/10">
                        {url ? (
                          <>
                            <img src={url} alt="Prod" className="w-full h-full object-cover rounded-lg" />
                            <button 
                              type="button"
                              onClick={() => {
                                const newImgs = [...(formData.images || [])];
                                newImgs.splice(idx, 1);
                                setFormData({ ...formData, images: newImgs });
                              }}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={10} />
                            </button>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Upload className="text-brand-black/20" size={20} />
                          </div>
                        )}
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, images: [...(formData.images || []), ''] })}
                      className="aspect-square rounded-xl border border-dashed border-brand-black/10 flex flex-col items-center justify-center text-brand-black/20 hover:text-brand-gold hover:border-brand-gold/50 transition-all gap-1"
                    >
                      <Plus size={20} />
                      <span className="text-[8px] font-bold uppercase tracking-widest">Add more</span>
                    </button>
                  </div>
                  {(formData.images || []).map((url, idx) => (
                    <div key={idx} className="space-y-1">
                       <input 
                         className="w-full bg-brand-ivory border-none rounded-lg px-4 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-gold/20"
                         placeholder="Paste image URL here..."
                         value={url}
                         onChange={(e) => {
                           const newImgs = [...(formData.images || [])];
                           newImgs[idx] = e.target.value;
                           setFormData({ ...formData, images: newImgs });
                         }}
                       />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Product Title</label>
                    <input 
                      required
                      className="w-full bg-brand-ivory border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-gold/20"
                      placeholder="e.g. Maharani Kundan Set"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Category</label>
                    <select 
                      className="w-full bg-brand-ivory border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-gold/20"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option>Rings</option>
                      <option>Necklaces</option>
                      <option>Earrings</option>
                      <option>Bangles</option>
                      <option>Pendants</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Collection</label>
                    <select 
                      className="w-full bg-brand-ivory border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-gold/20"
                      value={formData.collection}
                      onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                    >
                      <option>Bridal</option>
                      <option>Engagement</option>
                      <option>Temple</option>
                      <option>Daily Wear</option>
                      <option>Premium</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Price (₹)</label>
                    <input 
                      type="number"
                      required
                      className="w-full bg-brand-ivory border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-gold/20"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Stock Status</label>
                    <select 
                      className="w-full bg-brand-ivory border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-gold/20"
                      value={formData.stockStatus}
                      onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value as any })}
                    >
                      <option>In Stock</option>
                      <option>Out of Stock</option>
                      <option>Made to Order</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Weight (grams)</label>
                    <input 
                      type="number" step="0.01"
                      className="w-full bg-brand-ivory border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-gold/20"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Metal Type & Purity</label>
                    <div className="flex gap-2">
                       <input 
                         className="w-2/3 bg-brand-ivory border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-gold/20"
                         placeholder="Gold"
                         value={formData.metalType}
                         onChange={(e) => setFormData({ ...formData, metalType: e.target.value })}
                       />
                       <input 
                         className="w-1/3 bg-brand-ivory border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-gold/20"
                         placeholder="22K"
                         value={formData.purity}
                         onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                       />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Description</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-brand-ivory border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-gold/20 resize-none"
                    placeholder="Describe the craftsmanship..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-brand-black/5">
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Product Highlights</h4>
                   <div className="flex gap-6">
                      <label className="flex items-center gap-3 cursor-pointer group">
                         <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${formData.isTrending ? 'bg-brand-gold border-brand-gold' : 'border-brand-black/20 group-hover:border-brand-gold'}`}>
                            {formData.isTrending && <CheckCircle2 size={12} className="text-white" />}
                            <input type="checkbox" className="hidden" checked={formData.isTrending} onChange={(e) => setFormData({...formData, isTrending: e.target.checked})} />
                         </div>
                         <span className="text-sm text-brand-black">Trending Now</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                         <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${formData.isFeatured ? 'bg-brand-gold border-brand-gold' : 'border-brand-black/20 group-hover:border-brand-gold'}`}>
                            {formData.isFeatured && <CheckCircle2 size={12} className="text-white" />}
                            <input type="checkbox" className="hidden" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} />
                         </div>
                         <span className="text-sm text-brand-black">Featured Piece</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                         <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${formData.isBridal ? 'bg-brand-gold border-brand-gold' : 'border-brand-black/20 group-hover:border-brand-gold'}`}>
                            {formData.isBridal && <CheckCircle2 size={12} className="text-white" />}
                            <input type="checkbox" className="hidden" checked={formData.isBridal} onChange={(e) => setFormData({...formData, isBridal: e.target.checked})} />
                         </div>
                         <span className="text-sm text-brand-black">Bridal Ready</span>
                      </label>
                   </div>
                </div>
                
                <div className="pt-8 flex gap-4">
                  <button 
                    type="submit"
                    className="flex-1 btn-gold py-4 flex items-center justify-center gap-2"
                  >
                    <Package size={18} /> {editingProduct ? 'Update Product' : 'Publish Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
