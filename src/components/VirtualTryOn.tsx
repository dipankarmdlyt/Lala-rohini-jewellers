import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Image as ImageIcon, X, ChevronRight, MessageCircle, RefreshCw, Maximize2, Move } from 'lucide-react';
import { ALL_PRODUCTS } from '../constants';

interface TryOnItem {
  id: number;
  name: string;
  image: string;
  type: 'necklace' | 'earrings';
}

const ITEMS: TryOnItem[] = ALL_PRODUCTS
  .filter(p => p.category === 'Bridal' || p.category === 'Diamond')
  .slice(0, 4)
  .map(p => ({
    id: p.id,
    name: p.name,
    image: p.image,
    type: p.name.toLowerCase().includes('earring') || p.name.toLowerCase().includes('jhumka') ? 'earrings' : 'necklace'
  }));

export default function VirtualTryOn() {
  const [isOpen, setIsOpen] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<TryOnItem | null>(null);
  const [itemStyles, setItemStyles] = useState({ scale: 1, x: 0, y: 0 });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (f) => setUserImage(f.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="try-on" className="section-padding bg-brand-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <span className="accent-label text-brand-gold mb-6 block">Innovation</span>
            <h2 className="text-5xl md:text-7xl heading-bold italic mb-8">Virtual <br /> Jewelry Studio</h2>
            <p className="text-brand-gray/60 text-lg font-light leading-relaxed mb-10 max-w-md">
              Experience our masterpieces from the comfort of your home. Upload a portrait and visualize how our heritage pieces complement your style.
            </p>
            
            <button 
              onClick={() => setIsOpen(true)}
              className="btn-gold !px-12 flex gap-3"
            >
              <Camera size={20} />
              Launch Try-On Studio
            </button>
          </div>

          <div className="lg:w-1/2 relative group">
            <div className="aspect-[3/4] bg-brand-gray/10 border border-white/5 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000"
                alt="Studio Demo"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 glass-dark text-center">
                  <p className="accent-label mb-2">Live Visualization</p>
                  <p className="text-sm font-light">Interactive AR Simulation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Try-On Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-brand-black flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center glass-dark sticky top-0 z-10">
              <h3 className="text-xl font-serif tracking-tighter uppercase font-bold text-brand-gold">
                Lala Rohini <span className="text-white">Studio</span>
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-brand-gold transition-colors p-2 glass rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden italic">
              {/* Main Canvas Area */}
              <div className="flex-1 relative bg-[#050505] flex items-center justify-center p-8">
                <div className="relative aspect-[3/4] h-full max-h-[80vh] bg-brand-gray/5 border border-white/5 overflow-hidden">
                  {userImage ? (
                    <img src={userImage} className="w-full h-full object-cover" alt="User Portrait" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center opacity-40">
                      <ImageIcon size={48} className="mb-4" />
                      <p className="text-xs uppercase tracking-widest font-bold">No Portrait Uploaded</p>
                      <p className="text-[10px] mt-2">Use the controls to upload or use a model</p>
                    </div>
                  )}

                  {/* Dynamic Jewelry Overlay */}
                  {selectedItem && (
                    <motion.div 
                      drag
                      dragConstraints={{ left: -100, right: 100, top: -200, bottom: 200 }}
                      className="absolute inset-x-0 top-[30%] flex justify-center pointer-events-none"
                      style={{ 
                        scale: itemStyles.scale,
                        x: itemStyles.x,
                        y: itemStyles.y
                      }}
                    >
                      <img 
                        src={selectedItem.image} 
                        className="w-48 h-auto mix-blend-multiply brightness-110 pointer-events-auto cursor-move drop-shadow-2xl"
                        alt="Jewelry Piece"
                      />
                    </motion.div>
                  )}

                  {/* UI Hints on Image */}
                  <div className="absolute bottom-6 left-6 flex gap-3">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white/10 backdrop-blur-md p-3 hover:bg-white hover:text-brand-black transition-all"
                    >
                      <Camera size={18} />
                    </button>
                    <input 
                      type="file" 
                      hidden 
                      ref={fileInputRef} 
                      accept="image/*" 
                      onChange={handleUpload} 
                    />
                    {userImage && (
                      <button 
                        onClick={() => setUserImage(null)}
                        className="bg-white/10 backdrop-blur-md p-3 hover:bg-red-500 transition-all font-bold text-[10px] uppercase tracking-widest"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls Sidebar */}
              <div className="w-full lg:w-96 bg-brand-black border-l border-white/10 p-8 flex flex-col">
                <div className="mb-10">
                  <h4 className="accent-label text-brand-gold mb-6 block">1. Select Piece</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {ITEMS.map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`aspect-square border p-2 transition-all ${
                          selectedItem?.id === item.id ? 'border-brand-gold bg-brand-gold/5' : 'border-white/10'
                        }`}
                      >
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-10 flex-1">
                  <h4 className="accent-label text-brand-gold mb-6 block">2. Fine Tuning</h4>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest">
                        <span>Scale</span>
                        <span>{Math.round(itemStyles.scale * 100)}%</span>
                      </div>
                      <input 
                        type="range" min="0.5" max="2" step="0.1" 
                        value={itemStyles.scale}
                        onChange={(e) => setItemStyles({...itemStyles, scale: parseFloat(e.target.value)})}
                        className="w-full accent-brand-gold"
                      />
                    </div>
                    <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest opacity-50">
                      <Move size={14} /> Drag piece on image to position
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 space-y-4">
                  <h4 className="text-lg font-serif">Love this look?</h4>
                  <a 
                    href={`https://wa.me/910000000000?text=Hi, I tried on the ${selectedItem?.name} in your Virtual Studio and I love the look!`}
                    className="btn-gold w-full flex gap-3 text-sm"
                  >
                    <MessageCircle size={18} />
                    Enquire for this Look
                  </a>
                  <p className="text-[9px] text-brand-gray/40 text-center uppercase tracking-widest italic">
                    Images are for visualization purposes only.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
