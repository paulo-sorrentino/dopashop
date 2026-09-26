'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon, Order } from '@/types';
import { AVAILABLE_COUPONS } from '@/data/products';
import { soundManager } from '@/lib/soundEffects';

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  finalTotal: number;
  
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  orders: Order[];
  createOrder: (paymentMethod: string) => Order;
  currentTrackingOrder: Order | null;
  setCurrentTrackingOrder: (order: Order | null) => void;

  // Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWheelOpen: boolean;
  setIsWheelOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackerOpen: boolean;
  setIsTrackerOpen: (open: boolean) => void;
  isVaultOpen: boolean;
  setIsVaultOpen: (open: boolean) => void;

  // Audio
  isMuted: boolean;
  toggleMute: () => void;

  // Stats
  fakeBalance: number;
  realMoneySaved: number;
  conqueredImpulses: number;
  dopamineLevel: number;
  addDopamine: (amount: number) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentTrackingOrder, setCurrentTrackingOrder] = useState<Order | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  const [isMuted, setIsMuted] = useState(false);
  const [fakeBalance, setFakeBalance] = useState(999999999);
  const [realMoneySaved, setRealMoneySaved] = useState(0);
  const [conqueredImpulses, setConqueredImpulses] = useState(0);
  const [dopamineLevel, setDopamineLevel] = useState(75);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('dopashop_orders');
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        setOrders(parsed);
        const totalSaved = parsed.reduce((sum: number, o: Order) => sum + o.subtotal, 0);
        setRealMoneySaved(totalSaved);
        setConqueredImpulses(parsed.length);
      }

      const savedMute = localStorage.getItem('dopashop_muted');
      if (savedMute !== null) {
        const muted = JSON.parse(savedMute);
        setIsMuted(muted);
        soundManager.setMuted(muted);
      }
    } catch {
      // localstorage errors
    }
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      soundManager.setMuted(next);
      localStorage.setItem('dopashop_muted', JSON.stringify(next));
      return next;
    });
  };

  const addDopamine = (amount: number) => {
    setDopamineLevel((prev) => Math.min(100, Math.max(10, prev + amount)));
  };

  const addToCart = (product: Product) => {
    soundManager.playPop();
    soundManager.playChaChing();
    addDopamine(8);

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    soundManager.playWhoosh();
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    soundManager.playPop();
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === cleanCode);

    if (found) {
      setAppliedCoupon(found);
      soundManager.playFanfare();
      addDopamine(15);
      return { success: true, message: `Cupom ${found.code} aplicado com sucesso! ${found.discountPercent}% OFF!` };
    }

    return { success: false, message: 'Cupom inválido. Tente girar a Roleta da Dopamina!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    soundManager.playWhoosh();
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const discountAmount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  const createOrder = (paymentMethod: string): Order => {
    const trackingId = 'DOPA-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: 'ord_' + Date.now(),
      createdAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      totalPaid: finalTotal,
      realMoneySaved: cartSubtotal, // You saved 100% of real money because it's fake!
      paymentMethod,
      deliveryStatus: 'preparing',
      trackingCode: trackingId
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    setCurrentTrackingOrder(newOrder);

    // Update real savings
    const newTotalSaved = realMoneySaved + cartSubtotal;
    setRealMoneySaved(newTotalSaved);
    setConqueredImpulses((prev) => prev + 1);
    setFakeBalance((prev) => Math.max(0, prev - finalTotal));
    addDopamine(25);

    try {
      localStorage.setItem('dopashop_orders', JSON.stringify(updatedOrders));
    } catch {
      // localstorage errors
    }

    clearCart();
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        discountAmount,
        finalTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        createOrder,
        currentTrackingOrder,
        setCurrentTrackingOrder,
        isCartOpen,
        setIsCartOpen,
        isWheelOpen,
        setIsWheelOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackerOpen,
        setIsTrackerOpen,
        isVaultOpen,
        setIsVaultOpen,
        isMuted,
        toggleMute,
        fakeBalance,
        realMoneySaved,
        conqueredImpulses,
        dopamineLevel,
        addDopamine
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
