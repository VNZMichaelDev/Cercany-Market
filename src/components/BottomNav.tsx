import { Home, ShoppingCart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    console.log('🔄 NAVEGANDO A:', path);
    console.log('📍 Ubicación actual:', location.pathname);
    navigate(path);
    console.log('✅ Navigate ejecutado');
  };

  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${isActive('/') ? 'active' : ''}`}
        onClick={() => handleNavigation('/')}
      >
        <Home size={24} />
        <span>Home</span>
      </button>
      <button 
        className={`nav-item ${isActive('/cart') ? 'active' : ''}`}
        onClick={() => handleNavigation('/cart')}
      >
        <ShoppingCart size={24} />
        <span>Cart</span>
      </button>
      <button 
        className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
        onClick={() => handleNavigation('/profile')}
      >
        <User size={24} />
        <span>Profile</span>
      </button>
    </nav>
  );
}
