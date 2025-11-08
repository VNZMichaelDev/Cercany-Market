import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Package, MapPin, Settings as SettingsIcon } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { getUser, logout, getOrders } from '../utils/localStorage';
import type { Order } from '../types';

export default function Profile() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    
    if (currentUser) {
      const userOrders = getOrders().filter(order => order.userId === currentUser.id);
      setOrders(userOrders);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Si no hay usuario, mostrar perfil demo
  const displayUser = user || {
    name: 'Usuario Demo',
    email: 'demo@cercany.com',
    id: 'demo',
    phone: '+58 424 0000000',
    role: 'client' as const
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Profile</h1>
      </header>

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {displayUser.name.charAt(0).toUpperCase()}
          </div>
          <h2>{displayUser.name}</h2>
          <p>{displayUser.email}</p>
        </div>

        <div className="profile-menu">
          <button className="menu-item" onClick={() => alert('Órdenes: ' + orders.length + ' pedidos realizados')}>
            <div className="menu-item-content">
              <Package size={20} />
              <span>Orders</span>
            </div>
            <ChevronRight size={20} />
          </button>

          <button className="menu-item" onClick={() => alert('Direcciones guardadas')}>
            <div className="menu-item-content">
              <MapPin size={20} />
              <span>Addresses</span>
            </div>
            <ChevronRight size={20} />
          </button>

          <button className="menu-item" onClick={() => alert('Configuración')}>
            <div className="menu-item-content">
              <SettingsIcon size={20} />
              <span>Settings</span>
            </div>
            <ChevronRight size={20} />
          </button>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
