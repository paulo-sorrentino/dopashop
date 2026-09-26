'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';
import { Plus, Check, Star, Zap, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenQuickView }) => {
  const { addToCart, setIsCartOpen } = useShop();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsCartOpen(true);
  };

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatWon = (val: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div 
      onClick={() => onOpenQuickView(product)}
      className="group relative flex flex-col rounded-2xl sm:rounded-3xl bg-theme-card border border-theme-subtle hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 overflow-hidden cursor-pointer w-full shadow-xs"
    >
      {/* Badge Top Left */}
      {product.badge && (
        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] font-bold text-amber-300 shadow-md">
          {product.badge}
        </div>
      )}

      {/* Dopamine Level Pill Top Right */}
      <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-pink-500/20 dark:bg-fuchsia-950/80 backdrop-blur-md border border-pink-500/40 text-[10px] sm:text-[11px] font-bold text-pink-600 dark:text-pink-300 shadow-md">
        <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-pink-500 dark:text-pink-400 fill-pink-400" />
        <span>+{product.dopamineLevel}%</span>
      </div>

      {/* Product Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70" />
        
        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-xs">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-xs font-semibold text-white border border-slate-700 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-pink-400" />
            Ver Detalhes do Sonho
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-5">
        
        {/* Rating and category */}
        <div className="flex items-center justify-between text-xs text-theme-muted mb-1.5 sm:mb-2">
          <span className="uppercase tracking-wider font-semibold text-[9px] sm:text-[10px] text-pink-600 dark:text-pink-400">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-theme-heading text-xs">{product.rating.toFixed(1)}</span>
            <span className="text-[10px] sm:text-[11px] text-theme-muted">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-sm sm:text-base font-bold text-theme-heading group-hover:text-pink-600 dark:group-hover:text-pink-300 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="mt-1 text-xs text-theme-muted line-clamp-2 min-h-7 sm:min-h-8">
          {product.tagline}
        </p>

        {/* Price Section */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-theme-subtle flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl font-black text-theme-heading font-mono">
                {formatBRL(product.price)}
              </span>
              <span className="text-[10px] sm:text-xs text-theme-muted line-through font-mono">
                {formatBRL(product.originalPrice)}
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-theme-muted font-mono">
              ou {formatWon(product.koreanWon)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-theme-elevated hover:bg-slate-200 dark:hover:bg-slate-700 text-theme-body border border-theme-subtle'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>No Carrinho!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400" />
                <span>+ Carrinho</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white text-[11px] sm:text-xs font-bold shadow-md shadow-pink-600/20 active:scale-98 transition-all cursor-pointer"
          >
            <span>Quero Já! ⚡</span>
          </button>
        </div>

      </div>
    </div>
  );
};
