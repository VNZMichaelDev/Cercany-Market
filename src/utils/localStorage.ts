import type { User, Product, CartItem, Business, Order } from '../types';

// Auth
export const saveUser = (user: User) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

// Users database
export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const registerUser = (user: Omit<User, 'id'>): User => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: `u${Date.now()}`,
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const loginUser = (email: string, password: string): User | null => {
  const users = getUsers();
  // En esta demo, cualquier email/password funciona si el usuario existe
  const user = users.find(u => u.email === email);
  return user || null;
};

// Cart
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (product: Product, quantity: number = 1) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.product.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  
  saveCart(cart);
};

export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.product.id !== productId);
  saveCart(updatedCart);
};

export const updateCartItemQuantity = (productId: string, quantity: number) => {
  const cart = getCart();
  const item = cart.find(item => item.product.id === productId);
  
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart(cart);
    }
  }
};

export const clearCart = () => {
  localStorage.removeItem('cart');
};

// Products
export const getProducts = (): Product[] => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};

// Businesses
export const getBusinesses = (): Business[] => {
  const businesses = localStorage.getItem('businesses');
  return businesses ? JSON.parse(businesses) : [];
};

export const saveBusinesses = (businesses: Business[]) => {
  localStorage.setItem('businesses', JSON.stringify(businesses));
};

// Orders
export const getOrders = (): Order[] => {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

export const saveOrders = (orders: Order[]) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

export const createOrder = (order: Omit<Order, 'id' | 'createdAt'>): Order => {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: `o${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
};

// Initialize demo data
export const initializeDemoData = () => {
  // Check if data already exists
  if (getProducts().length > 0) return;

  // Demo businesses
  const businesses: Business[] = [
    {
      id: 'b1',
      name: 'Bodegón El Trujillano',
      owner: 'Juan Pérez',
      phone: '+58 412 1112233',
      category: 'Groceries',
      address: 'Calle Bolívar, Monay',
      description: 'Tienda con productos de consumo diario',
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
      verified: true,
      rating: 4.5,
    },
    {
      id: 'b2',
      name: 'Tech Store',
      owner: 'María González',
      phone: '+58 414 2223344',
      category: 'Technology',
      address: 'Centro Comercial Monay',
      description: 'Tecnología de última generación',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      verified: true,
      rating: 4.8,
    },
  ];
  saveBusinesses(businesses);

  // Demo products
  const products: Product[] = [
    {
      id: 'p1',
      name: 'Cheeseburger',
      price: 5.00,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      category: 'Food',
      businessId: 'b1',
      businessName: 'Bodegón El Trujillano',
      description: 'Deliciosa hamburguesa con queso',
    },
    {
      id: 'p2',
      name: 'Smartphone',
      price: 299.00,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      category: 'Technology',
      businessId: 'b2',
      businessName: 'Tech Store',
      description: 'Smartphone de última generación',
    },
    {
      id: 'p3',
      name: 'Pizza Pepperoni',
      price: 8.50,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
      category: 'Food',
      businessId: 'b1',
      businessName: 'Bodegón El Trujillano',
      description: 'Pizza familiar con pepperoni',
    },
    {
      id: 'p4',
      name: 'Laptop',
      price: 899.00,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
      category: 'Technology',
      businessId: 'b2',
      businessName: 'Tech Store',
      description: 'Laptop para trabajo y gaming',
    },
    {
      id: 'p5',
      name: 'Arroz 1kg',
      price: 2.50,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      category: 'Groceries',
      businessId: 'b1',
      businessName: 'Bodegón El Trujillano',
      description: 'Arroz blanco de primera calidad',
    },
    {
      id: 'p6',
      name: 'Auriculares Bluetooth',
      price: 45.00,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      category: 'Technology',
      businessId: 'b2',
      businessName: 'Tech Store',
      description: 'Auriculares inalámbricos con cancelación de ruido',
    },
  ];
  saveProducts(products);

  console.log('✅ Demo data initialized');
};
