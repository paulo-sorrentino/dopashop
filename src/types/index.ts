export interface Product {
  id: string;
  name: string;
  category: 'luxo' | 'tech' | 'hype' | 'conforto' | 'experiencia';
  price: number; // in BRL
  koreanWon: number; // approximate ₩
  originalPrice: number;
  image: string;
  description: string;
  dopamineLevel: number; // 1 to 100
  rating: number;
  reviewsCount: number;
  badge?: string;
  tagline: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  label: string;
  description: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  totalPaid: number;
  realMoneySaved: number;
  paymentMethod: string;
  deliveryStatus: 'preparing' | 'in_transit' | 'hyperspace' | 'delivered';
  trackingCode: string;
}
