'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { useTheme } from '@/context/ThemeContext';
import { 
  ShoppingBag, 
  Sparkles, 
  Dices, 
  TrendingDown, 
  Sun,
  Moon
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    cartCount, 
    setIsCartOpen, 
    setIsWheelOpen, 
    setIsVaultOpen, 
    realMoneySaved
  } = useShop();

  const { isDark, toggleTheme } = useTheme();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-theme-card/95 backdrop-blur-xl border-t border-theme-subtle px-3 py-1.5 flex items-center justify-around safe-bottom shadow-[0_-8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.6)] transition-colors duration-250">
      
      {/* Catalog */}
      <button
        onClick={scrollToCatalog}
        className="flex flex-col items-center gap-1 py-1 px-2 text-theme-muted hover:text-pink-500 active:scale-95 transition-all cursor-pointer"
      >
        <Sparkles className="w-5 h-5 text-pink-500 dark:text-pink-400" />
        <span className="text-[10px] font-semibold text-theme-body">Desejos</span>
      </button>

      {/* Wheel */}
      <button
        onClick={() => setIsWheelOpen(true)}
        className="flex flex-col items-center gap-1 py-1 px-2 text-theme-muted hover:text-amber-500 active:scale-95 transition-all cursor-pointer"
      >
        <Dices className="w-5 h-5 text-amber-500 dark:text-amber-400" />
        <span className="text-[10px] font-semibold text-theme-body">Roleta</span>
      </button>

      {/* Vault */}
      <button
        onClick={() => setIsVaultOpen(true)}
        className="relative flex flex-col items-center gap-1 py-1 px-2 text-theme-muted hover:text-emerald-500 active:scale-95 transition-all cursor-pointer"
      >
        <TrendingDown className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
        <span className="text-[10px] font-semibold text-theme-body">Cofre</span>
        {realMoneySaved > 0 && (
          <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        )}
      </button>

      {/* Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center gap-1 py-1 px-2 text-theme-muted hover:text-fuchsia-500 active:scale-95 transition-all cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-black bg-pink-500 text-white rounded-full animate-bounce shadow-xs">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-semibold text-theme-body">Carrinho</span>
      </button>

      {/* Mobile Quick Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="flex flex-col items-center gap-1 py-1 px-2 text-theme-muted hover:text-theme-heading active:scale-95 transition-all cursor-pointer"
        aria-label="Alternar Tema Claro / Escuro"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700" />
        )}
        <span className="text-[10px] font-semibold text-theme-body">{isDark ? 'Claro' : 'Escuro'}</span>
      </button>

    </nav>
  );
};
