import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Utensils, Monitor, Wheat, Settings } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { getProducts, getBusinesses, addToCart } from '../utils/localStorage';
import type { Product, Business, Category } from '../types';

const categoryIcons = {
  Food: Utensils,
  Technology: Monitor,
  Groceries: Wheat,
  'Spare Parts': Settings,
};

const categoryColors = {
  Food: '#2d7a5e',
  Technology: '#4a90e2',
  Groceries: '#f5a623',
  'Spare Parts': '#7ed6b8',
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(getProducts());
    setBusinesses(getBusinesses());
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    alert(`${product.name} agregado al carrito`);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: Category[] = ['Food', 'Technology', 'Groceries', 'Spare Parts'];

  return (
    <div className="page-container">
      <header className="app-header">
        <div className="logo">
          <ShoppingCart size={32} strokeWidth={2.5} />
          <h1>Cercany Market</h1>
        </div>
        <button className="btn-outline" onClick={() => navigate('/auth')}>
          Log in
        </button>
      </header>

      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="categories">
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          return (
            <button
              key={category}
              className={`category-card ${selectedCategory === category ? 'active' : ''}`}
              style={{ backgroundColor: categoryColors[category] }}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            >
              <Icon size={32} color="white" />
              <span>{category}</span>
            </button>
          );
        })}
      </div>

      <section className="section">
        <h2>Popular products</h2>
        <div className="products-grid">
          {filteredProducts.slice(0, 6).map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <button className="btn-add" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Stores near you</h2>
        <div className="stores-list">
          {businesses.map((business) => (
            <div key={business.id} className="store-card">
              <img src={business.image} alt={business.name} />
              <div className="store-info">
                <h3>{business.name}</h3>
                <p>⭐ {business.rating.toFixed(1)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
