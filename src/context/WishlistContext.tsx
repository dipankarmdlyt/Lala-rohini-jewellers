import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('lrj_wishlist');
    const initialWishlist = saved ? JSON.parse(saved) : [];
    
    // Check for shared wishlist in URL
    const params = new URLSearchParams(window.location.search);
    const sharedIds = params.get('wishlist');
    if (sharedIds) {
      const ids = sharedIds.split(',').map(Number).filter(id => !isNaN(id));
      // Merge with existing or just add unique ones
      const uniqueIds = Array.from(new Set([...initialWishlist, ...ids]));
      return uniqueIds;
    }
    
    return initialWishlist;
  });

  useEffect(() => {
    localStorage.setItem('lrj_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isInWishlist = (id: number) => wishlist.includes(id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
