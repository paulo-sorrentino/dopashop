'use client';

import React from 'react';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';
import { X, Star, ShoppingBag, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen } = useShop();

  if (!product) return null;

  const handleAddAndClose = () => {
    addToCart(product);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}
    onClose();
    setIsCartOpen(true);
  };

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-theme-card border border-theme-subtle rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-theme-elevated text-theme-muted hover:text-theme-heading transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-slate-950 min-h-48 sm:min-h-60 md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:hidden" />
          
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-fuchsia-500/40 text-[10px] sm:text-xs font-bold text-pink-300">
              +{product.dopamineLevel}% Dopamina
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-pink-600 dark:text-pink-400 font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{product.category}</span>
            </div>

            <h2 className="text-base sm:text-xl font-black text-theme-heading leading-tight">
              {product.name}
            </h2>

            <div className="mt-1.5 flex items-center gap-1 text-amber-500 dark:text-amber-400 text-xs">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-theme-heading text-xs">{product.rating}</span>
              <span className="text-theme-muted text-[11px]">({product.reviewsCount})</span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-theme-body leading-relaxed">
              {product.description}
            </p>

            {/* Psychological Benefits */}
            <div className="mt-3.5 p-3 rounded-2xl bg-theme-elevated border border-theme-subtle space-y-1.5 text-[11px] sm:text-xs">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Impacto bancário real: R$ 0,00</span>
              </div>
              <div className="flex items-center gap-1.5 text-pink-600 dark:text-pink-400 font-semibold">
                <Heart className="w-3.5 h-3.5 shrink-0" />
                <span>Satisfação imediata: 10/10</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="mt-3.5 pt-2.5 border-t border-theme-subtle">
              <div className="text-[10px] sm:text-xs text-theme-muted">Preço Fictício:</div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg sm:text-2xl font-black text-theme-heading font-mono">
                  {formatBRL(product.price)}
                </span>
                <span className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  100% OFF REAL
                </span>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="mt-4 pt-2">
            <button
              onClick={handleAddAndClose}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-amber-500 hover:from-fuchsia-500 hover:to-amber-400 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-pink-600/30 active:scale-98 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>COLOCAR NO CARRINHO!</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
