'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Gift
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    discountAmount,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    setCouponFeedback({
      text: res.message,
      error: !res.success
    });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  const bonusThreshold = 500000000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / bonusThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      {/* Drawer */}
      <div 
        className="relative w-full sm:max-w-md h-full bg-theme-card border-l border-theme-subtle shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-theme-subtle flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-theme-heading flex items-center gap-1.5 sm:gap-2">
                <span>Carrinho da Dopamina</span>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-theme-elevated text-pink-600 dark:text-pink-400 border border-theme-subtle">
                  {cartCount} item{cartCount !== 1 ? 'ns' : ''}
                </span>
              </h2>
              <p className="text-[11px] text-theme-muted">0% de gasto na vida real</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl bg-theme-elevated hover:bg-slate-200 dark:hover:bg-slate-700 text-theme-muted hover:text-theme-heading transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gamified progress bar */}
        <div className="px-4 py-2.5 sm:px-5 sm:py-3 bg-theme-elevated border-b border-theme-subtle text-xs">
          <div className="flex items-center justify-between font-semibold mb-1">
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-300 text-[11px] sm:text-xs">
              <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{progressPercent >= 100 ? '🎉 Bônus Supremo Desbloqueado!' : 'Meta de Luxo Cósmico'}</span>
            </span>
            <span className="text-theme-muted font-mono text-[10px] sm:text-xs">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-400 via-pink-500 to-fuchsia-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 text-theme-muted">
              <div className="w-14 h-14 rounded-full bg-theme-elevated flex items-center justify-center mb-3 text-theme-muted">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-theme-heading mb-1">Seu carrinho está vazio!</h3>
              <p className="text-xs text-theme-muted max-w-xs mb-5">
                Não seja tímido! Escolha iates, ilhas ou setups gamer. Aqui você é bilionário e não custa nada.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Explorar Desejos Agora
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-theme-elevated border border-theme-subtle hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                {/* Product thumbnail */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 bg-slate-200 dark:bg-slate-900"
                />

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1.5">
                    <h4 className="text-xs font-bold text-theme-heading truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-theme-muted hover:text-red-500 p-1 transition-colors cursor-pointer shrink-0"
                      title="Remover"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-xs font-black text-pink-600 dark:text-pink-400 font-mono">
                    {formatBRL(item.product.price * item.quantity)}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center border border-theme-subtle rounded-lg bg-theme-card">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="p-1 hover:bg-theme-elevated text-theme-muted hover:text-theme-heading rounded-l transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-1.5 text-xs font-bold text-theme-heading font-mono min-w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="p-1 hover:bg-theme-elevated text-theme-muted hover:text-theme-heading rounded-r transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-[10px] text-theme-muted font-medium">
                      +{item.product.dopamineLevel * item.quantity}% Dopa
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Calculations */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-theme-card border-t border-theme-subtle space-y-3">
            
            {/* Coupon form */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Código (ex: DOPAMINA99)"
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-xl bg-theme-input border border-theme-subtle text-theme-heading placeholder:text-theme-muted focus:outline-hidden focus:border-pink-500 uppercase font-mono shadow-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold bg-theme-elevated hover:bg-slate-200 dark:hover:bg-slate-700 text-theme-heading rounded-xl border border-theme-subtle transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>

              {couponFeedback && (
                <p className={`text-[10px] mt-1 font-medium ${couponFeedback.error ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {couponFeedback.text}
                </p>
              )}

              {/* Applied coupon badge */}
              {appliedCoupon && (
                <div className="mt-1.5 flex items-center justify-between p-1.5 sm:p-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-[11px] sm:text-xs">
                  <span className="flex items-center gap-1 text-pink-600 dark:text-pink-300 font-bold truncate">
                    <Sparkles className="w-3 h-3 text-pink-500 shrink-0" />
                    <span className="truncate">{appliedCoupon.label} ({appliedCoupon.code})</span>
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-theme-muted hover:text-red-500 font-semibold cursor-pointer shrink-0 ml-1"
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-theme-muted">
                <span>Subtotal Fictício:</span>
                <span className="font-mono text-theme-body">{formatBRL(cartSubtotal)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-pink-600 dark:text-pink-400 font-semibold">
                  <span>Desconto de Dopamina:</span>
                  <span className="font-mono">-{formatBRL(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Frete Espacial:</span>
                <span>GRÁTIS (0,00)</span>
              </div>

              <div className="pt-2 border-t border-theme-subtle flex justify-between items-baseline">
                <span className="text-xs sm:text-sm font-bold text-theme-heading">Total Fictício:</span>
                <div className="text-right">
                  <div className="text-lg sm:text-xl font-black text-theme-heading font-mono">
                    {formatBRL(finalTotal)}
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Cobrança Real: R$ 0,00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3 sm:py-3.5 px-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-amber-500 hover:from-fuchsia-500 hover:to-amber-400 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xl shadow-pink-600/30 active:scale-98 transition-all cursor-pointer"
            >
              <span>IR PARA PAGAMENTO FICTÍCIO</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
