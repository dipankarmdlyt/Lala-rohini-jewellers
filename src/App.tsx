import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { SoundProvider } from './context/SoundContext';
import HomePage from './pages/HomePage';
import AdminLayout from './admin/AdminLayout';

export default function App() {
  return (
    <WishlistProvider>
      <SoundProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/*" element={<AdminLayout />} />
          </Routes>
        </Router>
      </SoundProvider>
    </WishlistProvider>
  );
}
