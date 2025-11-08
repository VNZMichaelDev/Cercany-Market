export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'business' | 'delivery' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  businessId: string;
  businessName: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Business {
  id: string;
  name: string;
  owner: string;
  phone: string;
  category: string;
  address: string;
  description: string;
  image: string;
  verified: boolean;
  verificationCode?: string;
  rating: number;
}

export interface Order {
  id: string;
  userId: string;
  businessId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'sent' | 'completed' | 'cancelled';
  paymentMethod: 'mobile' | 'cash';
  includeDelivery: boolean;
  deliveryPrice: number;
  createdAt: string;
}

export type Category = 'Food' | 'Technology' | 'Groceries' | 'Spare Parts';
