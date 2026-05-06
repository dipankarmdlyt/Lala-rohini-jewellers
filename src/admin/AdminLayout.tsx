import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Gem, 
  Layers, 
  Heart, 
  MessageSquare, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Dashboard from './Dashboard';
import ProductManagement from './ProductManagement';
import CollectionManagement from './CollectionManagement';
import EnquiryManagement from './EnquiryManagement';
import ContentManagement from './ContentManagement';
import BridalControlCenter from './BridalControlCenter';

export default function AdminLayout() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        if (adminDoc.exists()) {
          setUser(user);
          setIsAdmin(true);
        } else {
          // Check if this is the bootstrap email
          if (user.email === 'dipankarmdl443@gmail.com') {
             setUser(user);
             setIsAdmin(true);
          } else {
            signOut(auth);
            setIsAdmin(false);
          }
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-brand-ivory flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full glass p-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-center">
            <div className="h-20 w-20 bg-brand-gold/10 rounded-full flex items-center justify-center">
              <Gem className="text-brand-gold" size={40} />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-serif text-brand-black">Admin Access</h1>
            <p className="text-brand-black/60 font-light">Please sign in to manage Lala Rohini Jewellers.</p>
          </div>
          <button 
            onClick={handleLogin}
            className="w-full btn-gold py-4 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
          >
            Sign in with Google
          </button>
          <Link to="/" className="block text-sm text-brand-gold hover:underline">Back to Website</Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Gem, label: 'Products', path: '/admin/products' },
    { icon: Layers, label: 'Collections', path: '/admin/collections' },
    { icon: Sparkles, label: 'Bridal Center', path: '/admin/bridal' },
    { icon: MessageSquare, label: 'Enquiries', path: '/admin/enquiries' },
    { icon: ImageIcon, label: 'Content/Banners', path: '/admin/content' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-brand-black text-white transition-all duration-300 flex flex-col fixed h-screen z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <Gem className="text-brand-gold shrink-0" size={24} />
              <span className="font-serif text-sm tracking-widest uppercase">Admin Panel</span>
            </div>
          ) : (
            <Gem className="text-brand-gold mx-auto" size={24} />
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                location.pathname === item.path 
                  ? 'bg-brand-gold text-white' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className="shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              {isSidebarOpen && location.pathname === item.path && (
                <ChevronRight size={14} className="ml-auto opacity-50" />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-500 transition-all group"
          >
            <LogOut size={20} className="shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 bg-brand-gold text-white p-1 rounded-full shadow-lg border-2 border-slate-50 md:flex hidden"
        >
          {isSidebarOpen ? <X size={12} /> : <Menu size={12} />}
        </button>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'} p-4 md:p-8`}>
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-serif text-brand-black">
                {menuItems.find(i => i.path === location.pathname)?.label || 'Overview'}
              </h2>
              <p className="text-sm font-light text-brand-black/40">Manage your luxury jewellery store operations.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-brand-black">{user.displayName || 'Admin'}</p>
                  <p className="text-[10px] text-brand-black/40 uppercase tracking-widest">{user.email}</p>
               </div>
               <img 
                 src={user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'} 
                 alt="Profile" 
                 className="w-10 h-10 rounded-full border-2 border-brand-gold/20"
               />
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<ProductManagement />} />
                <Route path="/collections" element={<CollectionManagement />} />
                <Route path="/bridal" element={<BridalControlCenter />} />
                <Route path="/enquiries" element={<EnquiryManagement />} />
                <Route path="/content" element={<ContentManagement />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
