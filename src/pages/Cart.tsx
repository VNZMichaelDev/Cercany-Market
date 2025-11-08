import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { getCart, updateCartItemQuantity, removeFromCart, getBusinesses, getUser, clearCart, createOrder } from '../utils/localStorage';
import type { CartItem, Business } from '../types';

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'cash'>('mobile');
  const [includeDelivery, setIncludeDelivery] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  const deliveryPrice = 2.00;

  useEffect(() => {
    loadCart();
    setBusinesses(getBusinesses());
  }, []);

  const loadCart = () => {
    setCartItems(getCart());
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove(productId);
    } else {
      updateCartItemQuantity(productId, newQuantity);
      loadCart();
    }
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    loadCart();
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return subtotal + (includeDelivery ? deliveryPrice : 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    // Create order (demo - no requiere usuario)
    const businessId = cartItems[0]?.product.businessId || 'b1';
    createOrder({
      userId: user?.id || 'demo-user',
      businessId,
      items: cartItems,
      total: calculateTotal(),
      status: 'pending',
      paymentMethod,
      includeDelivery,
      deliveryPrice: includeDelivery ? deliveryPrice : 0,
    });

    clearCart();
    setCartItems([]);
    alert('¡Pedido realizado con éxito! El negocio verificará tu pago.');
    setShowCheckout(false);
  };

  if (showCheckout) {
    return (
      <div className="page-container">
        <header className="page-header">
          <button className="btn-back" onClick={() => setShowCheckout(false)}>← Volver</button>
          <h1>Checkout</h1>
        </header>

        <div className="checkout-container">
          <div className="checkout-section">
            <h3>Método de Pago</h3>
            <div className="payment-methods">
              <label className={`payment-option ${paymentMethod === 'mobile' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="mobile"
                  checked={paymentMethod === 'mobile'}
                  onChange={() => setPaymentMethod('mobile')}
                />
                <span>Pago Móvil</span>
              </label>
              <label className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                <span>Efectivo</span>
              </label>
            </div>
          </div>

          <div className="checkout-section">
            <label className="delivery-option">
              <input
                type="checkbox"
                checked={includeDelivery}
                onChange={(e) => setIncludeDelivery(e.target.checked)}
              />
              <span>Incluir delivery (+${deliveryPrice.toFixed(2)})</span>
            </label>
          </div>

          <div className="checkout-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${(calculateTotal() - (includeDelivery ? deliveryPrice : 0)).toFixed(2)}</span>
            </div>
            {includeDelivery && (
              <div className="summary-row">
                <span>Delivery:</span>
                <span>${deliveryPrice.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <button className="btn-primary" onClick={handleCheckout}>
            Confirmar Pedido
          </button>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Cart</h1>
      </header>

      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Tu carrito está vacío</p>
            <button className="btn-primary" onClick={() => navigate('/')}>
              Ver Productos
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <p className="price">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                    <button className="btn-remove" onClick={() => handleRemove(item.product.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="total-row">
                <span>Total</span>
                <span className="total-amount">${calculateTotal().toFixed(2)}</span>
              </div>
              <button className="btn-checkout" onClick={() => setShowCheckout(true)}>
                Checkout
              </button>
            </div>
          </>
        )}

        <section className="section">
          <h2>Stores near you</h2>
          <div className="stores-list">
            {businesses.map((business) => (
              <div key={business.id} className="store-card">
                <img src={business.image} alt={business.name} />
                <div className="store-info">
                  <h3>{business.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
