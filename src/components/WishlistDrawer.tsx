import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, MessageCircle, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { ALL_PRODUCTS } from '../constants';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { wishlist, toggleWishlist } = useWishlist();
  const items = ALL_PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[120] bg-brand-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[130] w-full max-w-xl bg-brand-ivory flex flex-col shadow-2xl"
          >
            <div className="p-8 border-b border-brand-black/10 flex justify-between items-center glass sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <Heart className="text-brand-gold fill-brand-gold" size={24} />
                <h2 className="text-2xl font-serif">Your Wishlist</h2>
                <span className="text-xs bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded font-bold">{items.length}</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-brand-black/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <Heart size={64} className="stroke-1" />
                  <div>
                    <h3 className="text-xl font-serif">Your vault is empty</h3>
                    <p className="text-sm italic">Pieces you love will appear here</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="btn-outline px-8 py-3 text-xs"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <div className="grid gap-8">
                  {items.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex gap-6 group relative bg-white p-4 border-soft"
                    >
                      <div className="w-32 h-40 shrink-0 bg-brand-ivory overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <p className="text-[9px] text-brand-gold uppercase tracking-widest font-bold mb-1">{item.metal} • {item.category}</p>
                          <h4 className="text-xl font-serif mb-2">{item.name}</h4>
                          <p className="text-[10px] text-brand-black/40 italic line-clamp-2 leading-relaxed mb-4">{item.description}</p>
                        </div>
                        
                        <div className="flex gap-3">
                          <button 
                            onClick={() => toggleWishlist(item.id)}
                            className="text-[10px] uppercase font-bold tracking-widest text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                          <div className="w-px h-3 bg-brand-black/10 self-center" />
                          <a 
                            href={`https://wa.me/917699078709?text=Hi, I have the ${item.name} in my wishlist and would like to enquire about its price and availability.`}
                            className="text-[10px] uppercase font-bold tracking-widest text-brand-gold hover:underline flex items-center gap-1"
                          >
                            <MessageCircle size={12} /> Enquire
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-brand-black/10 bg-white">
                <a 
                  href={`https://wa.me/917699078709?text=Hi, I am interested in these items from my wishlist: ${items.map(i => i.name).join(', ')}`}
                  className="btn-gold w-full flex items-center justify-center gap-3 py-4"
                >
                  <MessageCircle size={20} />
                  Enquire About All Items
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
